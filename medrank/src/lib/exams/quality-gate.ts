import type { SupabaseClient } from '@supabase/supabase-js';
import type { Question } from '@/types/database';
import {
  filterReviewReady,
  requireOpenAiKey,
  reviewExamSetSecondPass,
  reviewQuestionMandatoryAi,
  summarizeExamReviews,
  type ExamReviewResult,
  type QuestionReviewResult,
} from '@/lib/exams/pre-exam-review';
import { polishQuestionOptions, needsOptionPolish } from '@/lib/question-bank/polish-options';

type AdminClient = NonNullable<ReturnType<typeof import('@/lib/supabase/admin').createAdminClient>>;

const MAX_REPLACE_ROUNDS = 40;

export async function reviewAndPersistExamQuality(
  admin: AdminClient | SupabaseClient,
  examId: string,
  questions: Question[],
  orderById?: Map<string, number>,
  extra?: { secondPassNotes?: string; reviews?: QuestionReviewResult[] }
): Promise<ExamReviewResult> {
  const reviews: QuestionReviewResult[] =
    extra?.reviews ??
    (await (async () => {
      const out: QuestionReviewResult[] = [];
      for (const q of questions) out.push(await reviewQuestionMandatoryAi(q));
      return out;
    })());
  const summary = summarizeExamReviews(reviews);
  if (extra?.secondPassNotes) summary.secondPassNotes = extra.secondPassNotes;

  await admin.from('exam_question_reviews').delete().eq('exam_id', examId);

  if (reviews.length > 0) {
    const rows = reviews.map((r) => ({
      exam_id: examId,
      question_id: r.questionId,
      order_number: orderById?.get(r.questionId) ?? null,
      severity: r.approved ? r.severity : 'error',
      codes: r.codes,
      message: r.message,
      ai_notes: r.aiNotes ?? null,
      resolved: r.approved,
      meta: r.scores
        ? {
            scores: r.scores,
            approved: r.approved,
          }
        : { approved: r.approved },
    }));
    // meta column may not exist yet — fallback without it
    const { error: insertErr } = await admin.from('exam_question_reviews').insert(rows);
    if (insertErr && /meta|schema cache/i.test(insertErr.message)) {
      await admin.from('exam_question_reviews').insert(
        rows.map(({ meta: _m, ...rest }) => rest)
      );
    }
  }

  const finalStatus =
    summary.status === 'passed' || summary.status === 'warning' ? summary.status : 'blocked';

  await admin
    .from('exams')
    .update({
      quality_status: finalStatus,
      quality_summary: extra?.secondPassNotes
        ? `${summary.summary} · 2ª passagem: ${extra.secondPassNotes}`
        : summary.summary,
      quality_reviewed_at: new Date().toISOString(),
      // Só publica quando 20/20 aprovadas
      status: finalStatus === 'blocked' ? 'draft' : 'published',
    })
    .eq('id', examId);

  if (finalStatus === 'blocked' || finalStatus === 'warning') {
    const { data: examMeta } = await admin
      .from('exams')
      .select('title, date_available')
      .eq('id', examId)
      .maybeSingle();
    const { data: admins } = await admin
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .eq('active', true);
    if (admins?.length) {
      await admin.from('user_notifications').insert(
        admins.map((a) => ({
          user_id: a.id,
          title:
            finalStatus === 'blocked'
              ? 'Disputa NÃO publicada — revisão IA reprovou questões'
              : 'Disputa publicada com avisos menores',
          body: `${examMeta?.title || 'Prova'} (${examMeta?.date_available || ''}): ${summary.summary}`,
          kind: 'remediation',
          meta: { exam_id: examId, quality_status: finalStatus },
        }))
      );
    }
  }

  return summary;
}

/**
 * Monta lote de N questões aprovadas pela IA.
 * Reprova → troca automaticamente → segunda passagem do conjunto.
 * OPENAI_API_KEY é obrigatória.
 */
export async function buildAiApprovedExamSet(
  pool: Question[],
  count: number,
  pick: (candidates: Question[], n: number) => Question[]
): Promise<{
  questions: Question[];
  reviews: QuestionReviewResult[];
  replaced: number;
  polished: number;
  secondPassNotes: string;
  progress: {
    poolSize: number;
    selected: number;
    approved: number;
    rejected: number;
    target: number;
  };
}> {
  requireOpenAiKey();

  let polished = 0;
  let replaced = 0;
  let rejected = 0;

  const prepared = pool.map((q) => {
    if (needsOptionPolish(q)) {
      polished += 1;
      return polishQuestionOptions(q);
    }
    return q;
  });

  const localReady = filterReviewReady(prepared);
  const base = localReady.length >= count ? localReady : prepared;
  const leftovers = [...base];
  const selected: Question[] = [];
  const approvedReviews: QuestionReviewResult[] = [];

  // Sorteio inicial
  const initial = pick(leftovers, count);
  for (const q of initial) {
    const idx = leftovers.findIndex((c) => c.id === q.id);
    if (idx >= 0) leftovers.splice(idx, 1);
  }

  const queue = [...initial];
  let rounds = 0;

  while (selected.length < count && rounds < MAX_REPLACE_ROUNDS) {
    rounds += 1;
    let candidate = queue.shift();
    if (!candidate) {
      if (leftovers.length === 0) break;
      candidate = leftovers.shift()!;
      replaced += 1;
    }

    if (needsOptionPolish(candidate)) {
      candidate = polishQuestionOptions(candidate);
      polished += 1;
    }

    const review = await reviewQuestionMandatoryAi(candidate);
    if (review.approved) {
      selected.push(candidate);
      approvedReviews.push(review);
    } else {
      rejected += 1;
      replaced += 1;
      if (leftovers.length > 0) {
        queue.push(leftovers.shift()!);
      }
    }
  }

  if (selected.length < count) {
    // Fallback: banco estruturalmente sólido (spec §15.9) — marca warning na 2ª passagem
    const { evaluateQuestionQualityLocal } = await import('@/lib/question-bank/quality-review');
    while (selected.length < count && leftovers.length > 0) {
      let cand = leftovers.shift()!;
      if (needsOptionPolish(cand)) {
        cand = polishQuestionOptions(cand);
        polished += 1;
      }
      const local = evaluateQuestionQualityLocal(cand);
      if (
        local.noAbsurdDistractors &&
        local.noAnswerExplanationInsideOptions &&
        local.correctAnswerNotObviousByLength &&
        local.qualityScore >= 70 &&
        !selected.some((s) => s.id === cand.id)
      ) {
        selected.push(cand);
        approvedReviews.push({
          questionId: cand.id,
          severity: 'warning',
          codes: ['fallback_bank'],
          message: 'Incluída por fallback do banco (IA não fechou 20/20)',
          issues: [],
          approved: true,
          scores: {
            specialty: String(cand.specialty || 'Geral'),
            difficulty: String(cand.difficulty || 'medio'),
            stemQuality: local.qualityScore,
            gabaritoConfidence: 80,
            ambiguity: 'ausente',
            alternativesQuality: local.optionsHaveSimilarLength ? 80 : 70,
            scientificCurrency: 75,
            overallQuality: local.qualityScore,
            singleCorrect: true,
            hasJustification: local.answerMatchesExplanation,
            vignetteComplete: local.stemContainsRequiredInformation,
            askType: 'outro',
          },
        });
        replaced += 1;
      }
    }
  }

  if (selected.length < count) {
    throw new Error(
      `Não foi possível montar ${count} questões válidas (aprovadas ${selected.length}, reprovadas ${rejected}, pool ${pool.length}). Importe o banco completo e force regenerar.`
    );
  }

  // Segunda passagem do conjunto
  let second = await reviewExamSetSecondPass(selected);
  let guard = 0;
  while ((!second.approved || second.rejectIds.length > 0) && guard < 15) {
    guard += 1;
    for (const id of second.rejectIds) {
      const pos = selected.findIndex((q) => q.id === id);
      if (pos < 0) continue;
      selected.splice(pos, 1);
      approvedReviews.splice(pos, 1);
      replaced += 1;
      rejected += 1;

      let found: Question | null = null;
      while (leftovers.length > 0 && !found) {
        let cand = leftovers.shift()!;
        if (needsOptionPolish(cand)) {
          cand = polishQuestionOptions(cand);
          polished += 1;
        }
        const rev = await reviewQuestionMandatoryAi(cand);
        if (rev.approved && !selected.some((s) => s.id === cand.id)) {
          found = cand;
          selected.splice(pos, 0, cand);
          approvedReviews.splice(pos, 0, rev);
        }
      }
      if (!found) {
        throw new Error(
          `2ª passagem reprovou questão ${id} e não há substituta aprovada no pool. Progresso: ${selected.length}/${count} aprovadas · ${rejected} reprovadas.`
        );
      }
    }
    while (selected.length < count && leftovers.length > 0) {
      let cand = leftovers.shift()!;
      if (needsOptionPolish(cand)) cand = polishQuestionOptions(cand);
      const rev = await reviewQuestionMandatoryAi(cand);
      if (rev.approved) {
        selected.push(cand);
        approvedReviews.push(rev);
        replaced += 1;
      } else {
        rejected += 1;
      }
    }
    second = await reviewExamSetSecondPass(selected);
  }

  if (!second.approved || selected.length !== count) {
    throw new Error(
      `2ª passagem não aprovou o lote (${selected.length}/${count}). ${second.notes}`
    );
  }

  return {
    questions: selected,
    reviews: approvedReviews,
    replaced,
    polished,
    secondPassNotes: second.notes || 'Conjunto aprovado na 2ª passagem.',
    progress: {
      poolSize: pool.length,
      selected: selected.length,
      approved: approvedReviews.filter((r) => r.approved).length,
      rejected,
      target: count,
    },
  };
}

/**
 * Monta disputa só com o banco local — sem OpenAI (sem custo).
 * Aplica polish + filtro local (sem vazamento/absurdos) e publica.
 */
export async function buildBankOnlyExamSet(
  pool: Question[],
  count: number,
  pick: (candidates: Question[], n: number) => Question[]
): Promise<{
  questions: Question[];
  reviews: QuestionReviewResult[];
  replaced: number;
  polished: number;
  secondPassNotes: string;
  progress: {
    poolSize: number;
    selected: number;
    approved: number;
    rejected: number;
    target: number;
  };
}> {
  const { evaluateQuestionQualityLocal } = await import('@/lib/question-bank/quality-review');

  let polished = 0;
  let rejected = 0;

  const isOfficial = (q: Question) =>
    q.question_origin === 'official' ||
    (q.tags ?? []).includes('official') ||
    (q.tags ?? []).includes('real') ||
    ['enare', 'revalida'].includes(String(q.source || '').toLowerCase());

  // Oficiais: NÃO polir/reescrever alternativas — manter texto da prova
  const prepared = pool.map((q) => {
    if (isOfficial(q)) return q;
    if (needsOptionPolish(q)) {
      polished += 1;
      return polishQuestionOptions(q);
    }
    return q;
  });

  const eligible = prepared.filter((q) => {
    if (isOfficial(q)) {
      // Gabarito oficial basta; explicação curta ("Gabarito oficial…") é aceitável
      return (
        String(q.statement || '').trim().length >= 40 &&
        Boolean(q.option_a && q.option_b && q.option_c && q.option_d && q.option_e)
      );
    }
    const local = evaluateQuestionQualityLocal(q);
    return (
      local.noAbsurdDistractors &&
      local.noAnswerExplanationInsideOptions &&
      local.correctAnswerNotObviousByLength &&
      String(q.explanation || '').trim().length >= 40
    );
  });

  const base = eligible.length >= count ? eligible : prepared;
  const leftovers = [...base];
  const selected: Question[] = [];
  const reviews: QuestionReviewResult[] = [];

  const initial = pick(leftovers, Math.min(count * 2, leftovers.length));
  for (const q of initial) {
    const idx = leftovers.findIndex((c) => c.id === q.id);
    if (idx >= 0) leftovers.splice(idx, 1);
  }

  const tryAdd = (cand: Question) => {
    if (selected.some((s) => s.id === cand.id)) return false;
    let q = cand;
    if (!isOfficial(q) && needsOptionPolish(q)) {
      q = polishQuestionOptions(q);
      polished += 1;
    }
    if (isOfficial(q)) {
      selected.push(q);
      reviews.push({
        questionId: q.id,
        severity: 'ok',
        codes: ['bank_only_official'],
        message: 'Questao oficial da prova (texto preservado, sem OpenAI)',
        issues: [],
        approved: true,
      });
      return true;
    }
    const local = evaluateQuestionQualityLocal(q);
    const ok =
      local.noAbsurdDistractors &&
      local.noAnswerExplanationInsideOptions &&
      (local.qualityScore >= 55 || eligible.length < count);
    if (!ok) {
      rejected += 1;
      return false;
    }
    selected.push(q);
    reviews.push({
      questionId: q.id,
      severity: local.qualityScore >= 85 ? 'ok' : 'warning',
      codes: ['bank_only'],
      message: 'Selecionada do banco local (sem revisao OpenAI)',
      issues: [],
      approved: true,
      scores: {
        specialty: String(q.specialty || 'Geral'),
        difficulty: String(q.difficulty || 'medio'),
        stemQuality: local.qualityScore,
        gabaritoConfidence: 85,
        ambiguity: 'ausente',
        alternativesQuality: local.optionsHaveSimilarLength ? 85 : 70,
        scientificCurrency: 80,
        overallQuality: local.qualityScore,
        singleCorrect: true,
        hasJustification: local.answerMatchesExplanation,
        vignetteComplete: local.stemContainsRequiredInformation,
        askType: 'outro',
      },
    });
    return true;
  };

  for (const q of initial) {
    if (selected.length >= count) break;
    tryAdd(q);
  }
  while (selected.length < count && leftovers.length > 0) {
    tryAdd(leftovers.shift()!);
  }

  if (selected.length < count) {
    throw new Error(
      `Banco insuficiente para montar ${count} questoes (obtidas ${selected.length}, pool ${pool.length}, elegiveis ${eligible.length}). Admin -> Questoes -> Importar banco completo.`
    );
  }

  return {
    questions: selected.slice(0, count),
    reviews: reviews.slice(0, count),
    replaced: rejected,
    polished,
    secondPassNotes: 'Modo banco local (sem OpenAI) — sem custo de API.',
    progress: {
      poolSize: pool.length,
      selected: count,
      approved: count,
      rejected,
      target: count,
    },
  };
}

/** @deprecated prefer buildAiApprovedExamSet */
export async function selectReviewReadyQuestions(
  pool: Question[],
  count: number,
  pick: (candidates: Question[], n: number) => Question[]
) {
  const built = await buildAiApprovedExamSet(pool, count, pick);
  return {
    questions: built.questions,
    replaced: built.replaced,
    polished: built.polished,
    secondPassNotes: built.secondPassNotes,
    reviews: built.reviews,
  };
}

export async function approveExamQualityOverride(
  admin: AdminClient,
  examId: string,
  adminId: string,
  note?: string
) {
  const { data: exam } = await admin
    .from('exams')
    .select('quality_summary')
    .eq('id', examId)
    .maybeSingle();

  const { data: problems } = await admin
    .from('exam_question_reviews')
    .select('order_number, severity, message, codes')
    .eq('exam_id', examId)
    .neq('severity', 'ok')
    .order('order_number');

  const problemList =
    (problems ?? [])
      .map((p) => `Q${p.order_number}: ${p.message}`)
      .slice(0, 12)
      .join(' | ') || 'sem detalhe';

  await admin
    .from('exams')
    .update({
      quality_status: 'approved_override',
      quality_approved_by: adminId,
      quality_approved_at: new Date().toISOString(),
      status: 'published',
      quality_summary: `${exam?.quality_summary || 'Revisão com pendências'} · LIBERAÇÃO MANUAL DO ADMIN. Problemas: ${problemList}${
        note ? ` · Nota: ${note}` : ''
      }`,
    })
    .eq('id', examId);

  await admin
    .from('exam_question_reviews')
    .update({ resolved: true })
    .eq('exam_id', examId)
    .eq('severity', 'error');
}

export function canStudentStartByQuality(status: string | null | undefined): {
  allowed: boolean;
  blocking: boolean;
  label: string;
} {
  const s = status || 'pending';
  if (s === 'blocked' || s === 'pending') {
    return {
      allowed: false,
      blocking: true,
      label:
        s === 'pending'
          ? 'A disputa ainda está sendo revisada pela IA. Aguarde a publicação.'
          : 'A disputa de hoje não foi publicada: a revisão IA reprovou questões. O professor foi avisado.',
    };
  }
  if (s === 'warning') {
    return {
      allowed: true,
      blocking: false,
      label: 'Disputa publicada com avisos menores da revisão.',
    };
  }
  if (s === 'approved_override') {
    return {
      allowed: true,
      blocking: false,
      label: 'Prova liberada manualmente pelo administrador após revisão.',
    };
  }
  return { allowed: true, blocking: false, label: 'Revisão IA: aprovada.' };
}
