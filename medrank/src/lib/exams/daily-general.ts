import 'server-only';
import type { Exam, Question } from '@/types/database';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { defaultExamReleaseFields } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { pickDailyExamQuestions } from '@/lib/question-bank/daily-selection';
import { mixDifficulty } from '@/lib/treino/progress';
import {
  addCalendarDaysBrazil,
  DAILY_EXAM_DURATION_MINUTES,
  DAILY_EXAM_HORIZON_DAYS,
  DAILY_EXAM_QUESTION_COUNT,
} from '@/lib/exams/daily-schedule';

export interface EnsureGeneralExamResult {
  date: string;
  audience: 'general';
  created: boolean;
  exam: Pick<Exam, 'id' | 'title' | 'date_available' | 'total_questions' | 'duration_minutes' | 'status'> | null;
  error?: string;
}

function titleForGeneral(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `Disputa do dia · Residência · ${d}/${m}`;
}

/** Só trilha da Liga de Nefrologia — não confundir com banco-expert de residência geral. */
function isNephrologyTagged(q: Question): boolean {
  const tags = q.tags ?? [];
  return (
    tags.includes('nefrologia-avancada') ||
    tags.includes('nefropediatria') ||
    tags.includes('titulo-nefrologia') ||
    tags.includes('estilo-SBNPed')
  );
}

function isResidenciaExpert(q: Question): boolean {
  const tags = q.tags ?? [];
  return tags.includes('banco-expert') && tags.includes('residencia-expert') && !isNephrologyTagged(q);
}

async function recentGeneralQuestionIds(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  beforeDate: string,
  lookbackDays = 45
): Promise<string[]> {
  const from = addCalendarDaysBrazil(beforeDate, -lookbackDays);
  const { data: exams } = await admin
    .from('exams')
    .select('id')
    .eq('exam_kind', 'daily')
    .eq('audience', 'general')
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

async function pickGeneralQuestions(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  count: number,
  dateStr: string
): Promise<Question[]> {
  const { data, error } = await admin.from('questions').select('*');
  if (error) throw new Error(error.message);

  let pool = ((data ?? []) as Question[]).filter((q) => !isNephrologyTagged(q));

  // Preferir banco expert de residência (CM/Ped/Cirurgia/GO/…) quando houver volume
  const expert = pool.filter(isResidenciaExpert);
  if (expert.length >= count) pool = expert;

  const avoid = new Set(await recentGeneralQuestionIds(admin, dateStr));
  const fresh = pool.filter((q) => !avoid.has(q.id));
  if (fresh.length >= count) pool = fresh;

  if (pool.length < count) {
    throw new Error(
      `Questões insuficientes para disputa geral (${pool.length}/${count}). Admin → Questões → Importar banco completo.`
    );
  }

  const seed = Number(dateStr.replace(/-/g, '')) || 1;
  const picked = pickDailyExamQuestions(pool, count, seed);
  if (picked.length >= count) return picked.slice(0, count);
  return mixDifficulty(pool, count);
}

/** Disputa diária geral (outras ligas / quem não está na Liga de Nefrologia). */
export async function ensureDailyGeneralExam(
  dateStr = todayDateStringBrazil()
): Promise<EnsureGeneralExamResult> {
  if (usesDemoStore()) {
    return {
      date: dateStr,
      audience: 'general',
      created: false,
      exam: {
        id: `demo-exam-general-${dateStr}`,
        title: titleForGeneral(dateStr),
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
      audience: 'general',
      created: false,
      exam: null,
      error: 'SUPABASE_SERVICE_ROLE_KEY necessária para gerar a disputa diária.',
    };
  }

  const { data: existing } = await admin
    .from('exams')
    .select('id, title, date_available, total_questions, duration_minutes, status')
    .eq('date_available', dateStr)
    .eq('audience', 'general')
    .maybeSingle();

  if (existing) {
    return { date: dateStr, audience: 'general', created: false, exam: existing };
  }

  let selected: Question[];
  try {
    selected = await pickGeneralQuestions(admin, DAILY_EXAM_QUESTION_COUNT, dateStr);
  } catch (err) {
    return {
      date: dateStr,
      audience: 'general',
      created: false,
      exam: null,
      error: err instanceof Error ? err.message : 'Falha ao sortear questões',
    };
  }

  const release = defaultExamReleaseFields(dateStr);
  const { data: exam, error: examError } = await admin
    .from('exams')
    .insert({
      title: titleForGeneral(dateStr),
      date_available: dateStr,
      duration_minutes: DAILY_EXAM_DURATION_MINUTES,
      total_questions: DAILY_EXAM_QUESTION_COUNT,
      show_answers_after_submit: false,
      show_answers_when_all_done: false,
      selection_mode: 'auto',
      status: 'published',
      exam_kind: 'daily',
      audience: 'general',
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
    if (examError.code === '23505' || /duplicate|unique/i.test(examError.message)) {
      const { data: raced } = await admin
        .from('exams')
        .select('id, title, date_available, total_questions, duration_minutes, status')
        .eq('date_available', dateStr)
        .eq('audience', 'general')
        .maybeSingle();
      return { date: dateStr, audience: 'general', created: false, exam: raced };
    }
    return { date: dateStr, audience: 'general', created: false, exam: null, error: examError.message };
  }

  const examQuestions = selected.map((q, i) => ({
    exam_id: exam.id,
    question_id: q.id,
    order_number: i + 1,
  }));

  const { error: eqError } = await admin.from('exam_questions').insert(examQuestions);
  if (eqError) {
    await admin.from('exams').delete().eq('id', exam.id);
    return { date: dateStr, audience: 'general', created: false, exam: null, error: eqError.message };
  }

  return { date: dateStr, audience: 'general', created: true, exam };
}

export async function ensureDailyGeneralHorizon(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil()
): Promise<EnsureGeneralExamResult[]> {
  const results: EnsureGeneralExamResult[] = [];
  const n = Math.max(1, Math.min(31, days));
  for (let i = 0; i < n; i++) {
    results.push(await ensureDailyGeneralExam(addCalendarDaysBrazil(fromDate, i)));
  }
  return results;
}
