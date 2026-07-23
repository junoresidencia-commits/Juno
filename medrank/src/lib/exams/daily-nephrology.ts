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
  addCalendarDaysBrazil,
  DAILY_EXAM_DURATION_MINUTES,
  DAILY_EXAM_HORIZON_DAYS,
  DAILY_EXAM_QUESTION_COUNT,
  titleForDailyTrack,
  trackForDate,
  type DailyExamTrack,
} from '@/lib/exams/daily-schedule';

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

function filterExpertPool(pool: Question[], count: number): Question[] {
  const cleaned = pool.filter((q) => {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c ?? ''}\n${q.option_d ?? ''}\n${q.option_e ?? ''}`;
    return !WEAK_DISTRACTOR.some((re) => re.test(blob)) && isStructurallySound(q);
  });
  // Liga de Nefrologia: SOMENTE banco-expert (padrão título)
  const expert = cleaned.filter((q) => q.tags?.includes('banco-expert'));
  if (expert.length < count) {
    throw new Error(
      `Banco expert insuficiente (${expert.length}/${count}). Admin → Questões → Importar banco completo.`
    );
  }
  return expert;
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
  dateStr: string
): Promise<Question[]> {
  const tag = TRACK_CONFIG[track].tag;
  const { data, error } = await admin.from('questions').select('*').contains('tags', [tag]);
  if (error) throw new Error(error.message);

  let pool = filterExpertPool((data ?? []) as Question[], count);
  const avoid = new Set(await recentQuestionIds(admin, dateStr));
  const fresh = pool.filter((q) => !avoid.has(q.id));
  if (fresh.length >= count) pool = fresh;

  if (pool.length < count) {
    throw new Error(
      `Questões insuficientes de ${TRACK_CONFIG[track].label} (${pool.length}/${count}). Admin → Questões → Importar banco completo.`
    );
  }

  return mixDifficulty(pool, count);
}

/**
 * Garante prova diária competitiva para a data (Nefrologia ↔ Nefropediatria).
 * Idempotente: se já existir prova published/draft na data, retorna ela.
 */
export async function ensureDailyNephrologyExam(
  dateStr = todayDateStringBrazil()
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
    .select('id, title, date_available, total_questions, duration_minutes, status')
    .eq('date_available', dateStr)
    .eq('audience', 'nephrology')
    .maybeSingle();

  if (existing) {
    return { date: dateStr, track, audience: 'nephrology', created: false, exam: existing };
  }

  let selected: Question[];
  try {
    selected = await pickTrackQuestions(admin, track, DAILY_EXAM_QUESTION_COUNT, dateStr);
  } catch (err) {
    return {
      date: dateStr,
      track,
      audience: 'nephrology',
      created: false,
      exam: null,
      error: err instanceof Error ? err.message : 'Falha ao sortear questões',
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
      status: 'published',
      exam_kind: 'daily',
      audience: 'nephrology',
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

  return { date: dateStr, track, audience: 'nephrology', created: true, exam };
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
