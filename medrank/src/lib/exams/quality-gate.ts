import type { SupabaseClient } from '@supabase/supabase-js';
import type { Question } from '@/types/database';
import {
  filterReviewReady,
  reviewQuestionWithOptionalAi,
  summarizeExamReviews,
  type ExamReviewResult,
  type QuestionReviewResult,
} from '@/lib/exams/pre-exam-review';
import { polishQuestionOptions, needsOptionPolish } from '@/lib/question-bank/polish-options';

type AdminClient = NonNullable<ReturnType<typeof import('@/lib/supabase/admin').createAdminClient>>;

export async function reviewAndPersistExamQuality(
  admin: AdminClient | SupabaseClient,
  examId: string,
  questions: Question[],
  orderById?: Map<string, number>
): Promise<ExamReviewResult> {
  const reviews: QuestionReviewResult[] = [];
  for (const q of questions) {
    reviews.push(await reviewQuestionWithOptionalAi(q));
  }
  const summary = summarizeExamReviews(reviews);

  await admin.from('exam_question_reviews').delete().eq('exam_id', examId);

  if (reviews.length > 0) {
    const rows = reviews.map((r) => ({
      exam_id: examId,
      question_id: r.questionId,
      order_number: orderById?.get(r.questionId) ?? null,
      severity: r.severity,
      codes: r.codes,
      message: r.message,
      ai_notes: r.aiNotes ?? null,
      resolved: r.severity === 'ok',
    }));
    await admin.from('exam_question_reviews').insert(rows);
  }

  await admin
    .from('exams')
    .update({
      quality_status: summary.status,
      quality_summary: summary.summary,
      quality_reviewed_at: new Date().toISOString(),
    })
    .eq('id', examId);

  if (summary.status === 'blocked' || summary.status === 'warning') {
    const { data: examMeta } = await admin.from('exams').select('title, date_available').eq('id', examId).maybeSingle();
    const { data: admins } = await admin.from('profiles').select('id').eq('role', 'admin').eq('active', true);
    if (admins?.length) {
      await admin.from('user_notifications').insert(
        admins.map((a) => ({
          user_id: a.id,
          title:
            summary.status === 'blocked'
              ? 'Disputa bloqueada — revisão de qualidade'
              : 'Aviso na disputa de hoje',
          body: `${examMeta?.title || 'Prova'} (${examMeta?.date_available || ''}): ${summary.summary}`,
          kind: 'remediation',
          meta: { exam_id: examId, quality_status: summary.status },
        }))
      );
    }
  }

  return summary;
}

/**
 * Seleciona questões já “passando” na revisão.
 * Se alguma falhar, tenta polir e/ou trocar por outra do pool.
 */
export async function selectReviewReadyQuestions(
  pool: Question[],
  count: number,
  pick: (candidates: Question[], n: number) => Question[]
): Promise<{ questions: Question[]; replaced: number; polished: number }> {
  let polished = 0;
  const readyPool = filterReviewReady(
    pool.map((q) => {
      if (needsOptionPolish(q)) {
        polished += 1;
        return polishQuestionOptions(q);
      }
      return q;
    })
  ).filter((q) => filterReviewReady([q]).length === 1);

  const base = readyPool.length >= count ? readyPool : pool;
  let selected = pick(base, count);
  let replaced = 0;

  const used = new Set(selected.map((q) => q.id));
  const leftovers = base.filter((q) => !used.has(q.id));

  for (let i = 0; i < selected.length; i++) {
    let q = selected[i];
    if (needsOptionPolish(q)) {
      q = polishQuestionOptions(q);
      polished += 1;
      selected[i] = q;
    }
    const rev = await reviewQuestionWithOptionalAi(q);
    if (rev.severity === 'error') {
      const swap = leftovers.find((c) => {
        const r = filterReviewReady([needsOptionPolish(c) ? polishQuestionOptions(c) : c]);
        return r.length === 1;
      });
      if (swap) {
        const idx = leftovers.findIndex((c) => c.id === swap.id);
        if (idx >= 0) leftovers.splice(idx, 1);
        selected[i] = needsOptionPolish(swap) ? polishQuestionOptions(swap) : swap;
        replaced += 1;
      }
    }
  }

  return { questions: selected, replaced, polished };
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

  await admin
    .from('exams')
    .update({
      quality_status: 'approved_override',
      quality_approved_by: adminId,
      quality_approved_at: new Date().toISOString(),
      quality_summary: `${exam?.quality_summary || 'Revisão com pendências'} · Liberada manualmente pelo professor${
        note ? `: ${note}` : ''
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
  if (s === 'blocked') {
    return {
      allowed: false,
      blocking: true,
      label:
        'A disputa de hoje ainda está em revisão de qualidade. O professor foi avisado — tente novamente em instantes.',
    };
  }
  if (s === 'pending') {
    return {
      allowed: true,
      blocking: false,
      label: 'Revisão de qualidade em andamento.',
    };
  }
  if (s === 'warning') {
    return {
      allowed: true,
      blocking: false,
      label:
        'Aviso: a revisão automática encontrou alertas menores nesta prova. Você pode iniciar; o professor foi notificado.',
    };
  }
  if (s === 'approved_override') {
    return {
      allowed: true,
      blocking: false,
      label: 'Prova liberada pelo professor após revisão.',
    };
  }
  return { allowed: true, blocking: false, label: 'Revisão de qualidade: ok.' };
}
