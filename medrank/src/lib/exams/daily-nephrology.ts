import 'server-only';
import type { Exam, Question } from '@/types/database';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { defaultExamReleaseFields } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { mixDifficulty } from '@/lib/treino/progress';
import { TRACK_CONFIG } from '@/lib/treino/config';
import { isStructurallySound } from '@/lib/question-bank/polish-options';
import {
  filterApprovedBank,
  sortByBankPriority,
} from '@/lib/question-bank/provenance';
import {
  fetchApprovedNefroLotsBySpecialty,
  NEFRO_ADULT_SPECIALTY,
  NEFRO_PED_SPECIALTY,
} from '@/lib/question-bank/lot-pool';
import {
  reviewAndPersistExamQuality,
  buildAiApprovedExamSet,
  buildBankOnlyExamSet,
} from '@/lib/exams/quality-gate';
import {
  addCalendarDaysBrazil,
  DAILY_EXAM_DURATION_MINUTES,
  DAILY_EXAM_HORIZON_DAYS,
  DAILY_EXAM_QUESTION_COUNT,
  nephrologyPlanForDate,
  titleForDailyTrack,
  trackForDate,
  type DailyExamTrack,
} from '@/lib/exams/daily-schedule';
import {
  NEFROLOGIA_AVANCADA_TRACK,
  NEFROPEDIATRIA_TRACK,
} from '@/lib/treino/config';

export {
  shortTrackLabel,
  titleForDailyTrack,
  trackForDate,
  DAILY_EXAM_DURATION_MINUTES,
  DAILY_EXAM_HORIZON_DAYS,
  DAILY_EXAM_QUESTION_COUNT,
  type DailyExamTrack,
} from '@/lib/exams/daily-schedule';

export interface EnsureDailyExamResult {
  date: string;
  track: DailyExamTrack;
  audience: 'nephrology';
  created: boolean;
  exam: Pick<Exam, 'id' | 'title' | 'date_available' | 'total_questions' | 'duration_minutes' | 'status'> | null;
  error?: string;
  progress?: {
    poolSize: number;
    selected: number;
    approved: number;
    rejected: number;
    target: number;
  };
}

/** Templates genéricos do banco-vivo antigo — nunca entram na disputa. */
const WEAK_DISTRACTOR = [
  /Terapia empírica sem fisiopatologia/i,
  /Suspender nefroproteção sem motivo/i,
  /Integrar achados clínicos\/labs e seguir guideline/i,
  /Intervenção agressiva sem indicação/i,
  /Observação sem seguimento em risco alto/i,
  /em HD, K .+ ECG com alterações\. Conduta imediata\?/i,
  /em avaliação de .+ — foco:/i,
  /Labs e contexto compatíveis/i,
  /Conduta alinhada a guidelines/i,
  /Tipo de cobrança/i,
  /\(i % \d+/,
  /\banos anos\b/i,
  /\{\{[a-z0-9_]+\}\}/i,
];

function filterExpertPool(pool: Question[], count: number, strictExpert: boolean): Question[] {
  const cleaned = pool.filter((q) => {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c ?? ''}\n${q.option_d ?? ''}\n${q.option_e ?? ''}`;
    return !WEAK_DISTRACTOR.some((re) => re.test(blob)) && isStructurallySound(q);
  });
  const expert = cleaned.filter((q) => q.tags?.includes('banco-expert'));
  if (expert.length >= count) return expert;
  // Modo banco: lotes MedRank publicados bastam (não exige tag banco-expert)
  if (!strictExpert && cleaned.length >= count) return cleaned;
  if (!strictExpert && cleaned.length > 0) return cleaned;
  // Último recurso: pool bruto aprovado (ainda sem limpeza estrutural)
  if (!strictExpert && pool.length >= count) return pool;
  if (!strictExpert && pool.length > 0) return pool;
  throw new Error(
    `Banco Nefrologia insuficiente (${expert.length} expert / ${cleaned.length} limpas / ${pool.length} no pool; precisa ${count}). Confira se os lotes NEFRO foram publicados e use “Corrigir tags dos lotes” em Questões.`
  );
}

async function recentQuestionIds(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  beforeDate: string,
  lookbackDays = 45
): Promise<string[]> {
  const from = addCalendarDaysBrazil(beforeDate, -lookbackDays);
  const { data: exams } = await admin
    .from('exams')
    .select('id')
    .eq('exam_kind', 'daily')
    .eq('audience', 'nephrology')
    .gte('date_available', from)
    .lt('date_available', beforeDate);

  const examIds = (exams ?? []).map((e) => e.id);
  if (examIds.length === 0) return [];

  const { data: eqs } = await admin
    .from('exam_questions')
    .select('question_id')
    .in('exam_id', examIds);

  return (eqs ?? []).map((row) => String(row.question_id));
}

async function pickTrackQuestions(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  track: DailyExamTrack,
  count: number,
  dateStr: string,
  mode: 'ai' | 'bank' = 'bank'
) {
  const tag = TRACK_CONFIG[track].tag;
  const specialty =
    track === 'nefropediatria' ? NEFRO_PED_SPECIALTY : NEFRO_ADULT_SPECIALTY;
  const columns =
    'id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, source, year, specialty, topic, subtopic, difficulty, tags, bank_status, question_origin, institution, exam_name, lote_importacao, area, created_at';
  const byId = new Map<string, Question>();
  const pageSize = 500;

  // 1) PRINCIPAL: lotes MedRank Nefro pela especialidade do arquivo (Nefrologia / Nefropediatria)
  const fromSpecialty = await fetchApprovedNefroLotsBySpecialty(admin, specialty);
  for (const q of fromSpecialty) byId.set(q.id, q);

  // 2) Tag de trilha (se ainda existir)
  if (byId.size < count) {
    for (let page = 0; page < 6; page++) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      let { data, error } = await admin
        .from('questions')
        .select(columns)
        .contains('tags', [tag])
        .eq('bank_status', 'approved')
        .range(from, to);
      if (error && /bank_status|schema cache/i.test(error.message)) {
        const retry = await admin
          .from('questions')
          .select(columns.replace(', bank_status', ''))
          .contains('tags', [tag])
          .range(from, to);
        data = retry.data as typeof data;
        error = retry.error;
      }
      if (error) break;
      const rows = (data ?? []) as unknown as Question[];
      for (const q of rows) byId.set(q.id, q);
      if (rows.length < pageSize) break;
    }
  }

  // 3) Fallback: qualquer questão aprovada com essa especialidade (mesmo fora do prefixo NEFRO)
  if (byId.size < count) {
    for (let page = 0; page < 6; page++) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      const { data, error } = await admin
        .from('questions')
        .select(columns)
        .eq('bank_status', 'approved')
        .ilike('specialty', specialty)
        .range(from, to);
      if (error) break;
      const rows = (data ?? []) as unknown as Question[];
      for (const q of rows) byId.set(q.id, q);
      if (rows.length < pageSize) break;
    }
  }

  // 4) Fallback amplo: lote NEFRO inteiro
  if (byId.size < count) {
    for (let page = 0; page < 6; page++) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      const { data, error } = await admin
        .from('questions')
        .select(columns)
        .eq('bank_status', 'approved')
        .like('lote_importacao', 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%')
        .range(from, to);
      if (error) break;
      const rows = (data ?? []) as unknown as Question[];
      for (const q of rows) byId.set(q.id, q);
      if (rows.length < pageSize) break;
    }
  }

  const allTagged = [...byId.values()];
  const approvedTagged = filterApprovedBank(allTagged);
  let pool = filterExpertPool(approvedTagged, count, mode === 'ai');
  pool = sortByBankPriority(pool);
  const avoid = new Set(await recentQuestionIds(admin, dateStr));
  const fresh = pool.filter((q) => !avoid.has(q.id));
  if (fresh.length >= count) pool = fresh;

  if (pool.length < count) {
    if (mode === 'bank' && approvedTagged.length >= count) {
      pool = sortByBankPriority(approvedTagged);
    } else {
      throw new Error(
        `Questoes insuficientes de ${TRACK_CONFIG[track].label} / especialidade ${specialty} (${pool.length}/${count}; ${approvedTagged.length} no lote). Publique os lotes NEFRO e regenere.`
      );
    }
  }

  const pick = (candidates: Question[], n: number) =>
    mixDifficulty(sortByBankPriority(candidates), n);
  if (mode === 'ai') {
    return buildAiApprovedExamSet(pool, count, pick);
  }
  return buildBankOnlyExamSet(pool, count, pick);
}

/**
 * Garante prova diária competitiva para a data (Nefrologia ↔ Nefropediatria).
 * Idempotente: se já existir prova published/draft na data, retorna ela.
 */
export async function ensureDailyNephrologyExam(
  dateStr = todayDateStringBrazil(),
  opts?: { force?: boolean; mode?: 'ai' | 'bank' }
): Promise<EnsureDailyExamResult> {
  const track = trackForDate(dateStr);

  if (usesDemoStore()) {
    return {
      date: dateStr,
      track,
      audience: 'nephrology',
      created: false,
      exam: {
        id: `demo-exam-nefro-${dateStr}`,
        title: titleForDailyTrack(track, dateStr),
        date_available: dateStr,
        total_questions: DAILY_EXAM_QUESTION_COUNT,
        duration_minutes: DAILY_EXAM_DURATION_MINUTES,
        status: 'published',
      },
    };
  }

  const admin = createAdminClient();
  if (!admin) {
    return {
      date: dateStr,
      track,
      audience: 'nephrology',
      created: false,
      exam: null,
      error: 'SUPABASE_SERVICE_ROLE_KEY necessária para gerar a disputa diária.',
    };
  }

  const { data: existing } = await admin
    .from('exams')
    .select(
      'id, title, date_available, total_questions, duration_minutes, status, quality_status, quality_summary'
    )
    .eq('date_available', dateStr)
    .eq('audience', 'nephrology')
    .maybeSingle();

  if (existing && !opts?.force) {
    return { date: dateStr, track, audience: 'nephrology', created: false, exam: existing };
  }

  if (existing && opts?.force) {
    const { deleteDailyExamForRegen } = await import('@/lib/exams/delete-daily');
    const wiped = await deleteDailyExamForRegen(admin, existing.id);
    if (!wiped.ok) {
      return {
        date: dateStr,
        track,
        audience: 'nephrology',
        created: false,
        exam: existing,
        error: wiped.error || 'Falha ao apagar disputa antiga para regenerar',
      };
    }
  }

  let selected: Question[] = [];
  let builtMeta: Awaited<ReturnType<typeof buildAiApprovedExamSet>>;
  const mode = opts?.mode ?? 'bank';
  const plan = nephrologyPlanForDate(dateStr);
  try {
    if (plan.mode === 'mixed') {
      const adult = await pickTrackQuestions(
        admin,
        NEFROLOGIA_AVANCADA_TRACK,
        plan.adultCount,
        dateStr,
        mode
      );
      const ped = await pickTrackQuestions(
        admin,
        NEFROPEDIATRIA_TRACK,
        plan.pediatricCount,
        dateStr,
        mode
      );
      const merged = [...adult.questions, ...ped.questions];
      // Embaralha ordem final para não ficar bloco adulto/ped previsível
      for (let i = merged.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [merged[i], merged[j]] = [merged[j], merged[i]];
      }
      builtMeta = {
        questions: merged,
        reviews: [...(adult.reviews ?? []), ...(ped.reviews ?? [])],
        replaced: (adult.replaced ?? 0) + (ped.replaced ?? 0),
        polished: (adult.polished ?? 0) + (ped.polished ?? 0),
        secondPassNotes: [adult.secondPassNotes, ped.secondPassNotes]
          .filter(Boolean)
          .join(' · '),
        progress: {
          poolSize: (adult.progress?.poolSize ?? 0) + (ped.progress?.poolSize ?? 0),
          selected: merged.length,
          approved:
            (adult.progress?.approved ?? 0) + (ped.progress?.approved ?? 0),
          rejected:
            (adult.progress?.rejected ?? 0) + (ped.progress?.rejected ?? 0),
          target: DAILY_EXAM_QUESTION_COUNT,
        },
      };
      selected = merged;
    } else {
      const onlyTrack =
        plan.mode === 'pediatric' ? NEFROPEDIATRIA_TRACK : NEFROLOGIA_AVANCADA_TRACK;
      builtMeta = await pickTrackQuestions(
        admin,
        onlyTrack,
        DAILY_EXAM_QUESTION_COUNT,
        dateStr,
        mode
      );
      selected = builtMeta.questions;
    }
  } catch (err) {
    return {
      date: dateStr,
      track,
      audience: 'nephrology',
      created: false,
      exam: null,
      error: err instanceof Error ? err.message : 'Falha ao sortear/revisar questões com IA',
    };
  }

  const release = defaultExamReleaseFields(dateStr);
  const title = titleForDailyTrack(track, dateStr);

  const { data: exam, error: examError } = await admin
    .from('exams')
    .insert({
      title,
      date_available: dateStr,
      duration_minutes: DAILY_EXAM_DURATION_MINUTES,
      total_questions: DAILY_EXAM_QUESTION_COUNT,
      show_answers_after_submit: false,
      show_answers_when_all_done: false,
      selection_mode: 'auto',
      status: 'draft',
      exam_kind: 'daily',
      audience: 'nephrology',
      quality_status: 'pending',
      quality_summary: 'Revisao IA em andamento...',
      date_closes: release.date_closes,
      release_days: release.release_days,
      ranking_visible_to_students: release.ranking_visible_to_students,
      ranking_release: release.ranking_release,
      window_start_hour: 7,
      window_end_hour: 24,
    })
    .select('id, title, date_available, total_questions, duration_minutes, status')
    .single();

  if (examError) {
    // Corrida: outra requisição criou no mesmo instante
    if (examError.code === '23505' || /duplicate|unique/i.test(examError.message)) {
      const { data: raced } = await admin
        .from('exams')
        .select('id, title, date_available, total_questions, duration_minutes, status')
        .eq('date_available', dateStr)
        .eq('audience', 'nephrology')
        .maybeSingle();
      return { date: dateStr, track, audience: 'nephrology', created: false, exam: raced };
    }
    return { date: dateStr, track, audience: 'nephrology', created: false, exam: null, error: examError.message };
  }

  const examQuestions = selected.map((q, i) => ({
    exam_id: exam.id,
    question_id: q.id,
    order_number: i + 1,
  }));

  const { error: eqError } = await admin.from('exam_questions').insert(examQuestions);
  if (eqError) {
    await admin.from('exams').delete().eq('id', exam.id);
    return { date: dateStr, track, audience: 'nephrology', created: false, exam: null, error: eqError.message };
  }

  for (const q of selected) {
    await admin.from('questions').upsert(
      {
        id: q.id,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        option_e: q.option_e ?? '',
        correct_option: q.correct_option,
        explanation: q.explanation,
      },
      { onConflict: 'id' }
    );
  }

  const orderById = new Map(selected.map((q, i) => [q.id, i + 1]));
  try {
    await reviewAndPersistExamQuality(admin, exam.id, selected, orderById, {
      secondPassNotes: `${builtMeta.secondPassNotes} · trocas=${builtMeta.replaced} · polish=${builtMeta.polished}`,
      reviews: builtMeta.reviews,
    });
  } catch (err) {
    await admin
      .from('exams')
      .update({
        status: 'draft',
        quality_status: 'blocked',
        quality_summary: err instanceof Error ? err.message : 'Falha na revisão IA',
      })
      .eq('id', exam.id);
    return {
      date: dateStr,
      track,
      audience: 'nephrology',
      created: true,
      exam,
      error: err instanceof Error ? err.message : 'Falha na revisão IA',
    };
  }

  const { data: refreshed } = await admin
    .from('exams')
    .select(
      'id, title, date_available, total_questions, duration_minutes, status, quality_status, quality_summary'
    )
    .eq('id', exam.id)
    .single();

  return {
    date: dateStr,
    track,
    audience: 'nephrology',
    created: true,
    exam: refreshed ?? exam,
    progress: builtMeta.progress,
  };
}

/** Garante hoje + próximos N-1 dias. */
export async function ensureDailyNephrologyHorizon(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil()
): Promise<EnsureDailyExamResult[]> {
  const results: EnsureDailyExamResult[] = [];
  const n = Math.max(1, Math.min(31, days));
  for (let i = 0; i < n; i++) {
    const date = addCalendarDaysBrazil(fromDate, i);
    results.push(await ensureDailyNephrologyExam(date));
  }
  return results;
}
