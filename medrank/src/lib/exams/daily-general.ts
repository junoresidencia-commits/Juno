import 'server-only';
import type { Exam, Question } from '@/types/database';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { defaultExamReleaseFields } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { pickDailyExamQuestions } from '@/lib/question-bank/daily-selection';
import { mixDifficulty } from '@/lib/treino/progress';
import { isStructurallySound } from '@/lib/question-bank/polish-options';
import {
  filterApprovedBank,
  isMedRankLotQuestion,
  isOfficialOrigin,
  isStaleOfficial,
  sortByBankPriority,
} from '@/lib/question-bank/provenance';
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
} from '@/lib/exams/daily-schedule';

export interface EnsureGeneralExamResult {
  date: string;
  audience: 'general';
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

/** Prova real (ENARE/Revalida/USP/import oficial) — prioridade na disputa. */
function isOfficialExamQuestion(q: Question): boolean {
  return isOfficialOrigin(q);
}

/** Expert MedRank curto/óvio — só fallback se faltar prova real. */
function isWeakSynthetic(q: Question): boolean {
  if (isOfficialExamQuestion(q)) return false;
  const stem = String(q.statement || '').trim();
  return stem.length < 180 || /qual prioridade na 1ª hora\?/i.test(stem);
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

/** Colunas necessárias para montar a disputa — evita select('*') em milhares de linhas. */
const DAILY_QUESTION_COLUMNS =
  'id, statement, option_a, option_b, option_c, option_d, option_e, correct_option, explanation, source, year, specialty, topic, subtopic, difficulty, tags, bank_status, question_origin, institution, exam_name, lote_importacao, created_at';

async function fetchApprovedQuestionsByTag(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  tag: string,
  pageSize = 500,
  maxPages = 6
): Promise<Question[]> {
  const out: Question[] = [];
  for (let page = 0; page < maxPages; page++) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await admin
      .from('questions')
      .select(DAILY_QUESTION_COLUMNS)
      .contains('tags', [tag])
      .eq('bank_status', 'approved')
      .range(from, to);
    if (error) {
      // Fallback se bank_status ainda não existir no schema cache
      if (/bank_status|schema cache/i.test(error.message)) {
        const retry = await admin
          .from('questions')
          .select(DAILY_QUESTION_COLUMNS.replace(', bank_status', ''))
          .contains('tags', [tag])
          .range(from, to);
        if (retry.error) throw new Error(retry.error.message);
        const rows = (retry.data ?? []) as unknown as Question[];
        out.push(...rows);
        if (rows.length < pageSize) break;
        continue;
      }
      throw new Error(error.message);
    }
    const rows = (data ?? []) as unknown as Question[];
    out.push(...rows);
    if (rows.length < pageSize) break;
  }
  return out;
}

async function fetchApprovedOfficialRecent(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  pageSize = 500,
  maxPages = 4
): Promise<Question[]> {
  const out: Question[] = [];
  for (let page = 0; page < maxPages; page++) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await admin
      .from('questions')
      .select(DAILY_QUESTION_COLUMNS)
      .eq('question_origin', 'official')
      .eq('bank_status', 'approved')
      .gte('year', 2024)
      .order('year', { ascending: false })
      .range(from, to);
    if (error) break;
    const rows = (data ?? []) as unknown as Question[];
    out.push(...rows);
    if (rows.length < pageSize) break;
  }
  return out;
}

async function pickGeneralQuestions(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  count: number,
  dateStr: string,
  mode: 'ai' | 'bank' = 'bank'
) {
  // 1) Oficiais/universidade 2024+ (preferência 2026/2025 no sort)
  // 2) Lotes MedRank novos (residencia-expert)
  // Nunca varre o banco inteiro com select('*').
  const [officialRecent, residencia] = await Promise.all([
    fetchApprovedOfficialRecent(admin),
    fetchApprovedQuestionsByTag(admin, 'residencia-expert'),
  ]);

  const byId = new Map<string, Question>();
  for (const q of officialRecent) {
    if (!isNephrologyTagged(q) && !isStaleOfficial(q)) byId.set(q.id, q);
  }
  for (const q of residencia) {
    if (!isNephrologyTagged(q) && !isStaleOfficial(q)) byId.set(q.id, q);
  }

  let pool = [...byId.values()];

  if (pool.length < count) {
    const expert = await fetchApprovedQuestionsByTag(admin, 'banco-expert');
    for (const q of expert) {
      if (!isNephrologyTagged(q) && !isStaleOfficial(q)) byId.set(q.id, q);
    }
    pool = [...byId.values()];
  }

  pool = filterApprovedBank(pool).filter((q) => !isStaleOfficial(q));

  // Preferir oficiais 2025/2026 se houver volume; senão oficiais 2024+ + lotes MedRank
  const y2026 = pool.filter((q) => isOfficialExamQuestion(q) && q.year === 2026);
  const y2025 = pool.filter((q) => isOfficialExamQuestion(q) && q.year === 2025);
  const y2024 = pool.filter((q) => isOfficialExamQuestion(q) && q.year === 2024);
  const lots = pool.filter((q) => isMedRankLotQuestion(q) && !isOfficialExamQuestion(q));
  const preferred = [...y2026, ...y2025, ...y2024, ...lots];
  if (preferred.length >= count) {
    pool = preferred;
  } else {
    const official = pool.filter(isOfficialExamQuestion);
    if (official.length >= count) {
      pool = official;
    } else {
      const strong = pool.filter((q) => !isWeakSynthetic(q));
      if (strong.length >= count) pool = strong;
    }
  }

  const sound = pool.filter((q) => isOfficialExamQuestion(q) || isStructurallySound(q));
  if (sound.length >= count) pool = sound;

  const prefer = pool.filter(
    (q) => isOfficialExamQuestion(q) || isResidenciaExpert(q) || isMedRankLotQuestion(q)
  );
  if (prefer.length >= count) pool = prefer;

  pool = sortByBankPriority(pool);

  const avoid = new Set(await recentGeneralQuestionIds(admin, dateStr));
  const fresh = pool.filter((q) => !avoid.has(q.id));
  if (fresh.length >= count) pool = fresh;

  if (pool.length < count) {
    throw new Error(
      `Questoes insuficientes para disputa geral (${pool.length}/${count}). Admin -> Questoes -> Importar banco completo.`
    );
  }

  const seed = Number(dateStr.replace(/-/g, '')) || 1;
  const pick = (candidates: Question[], n: number) => {
    const prioritized = sortByBankPriority(candidates);
    const picked = pickDailyExamQuestions(prioritized, n, seed);
    if (picked.length >= n) return picked.slice(0, n);
    return mixDifficulty(prioritized, n);
  };

  if (mode === 'ai') {
    return buildAiApprovedExamSet(pool, count, pick);
  }
  return buildBankOnlyExamSet(pool, count, pick);
}

/** Disputa diária geral (outras ligas / quem não está na Liga de Nefrologia). */
export async function ensureDailyGeneralExam(
  dateStr = todayDateStringBrazil(),
  opts?: { force?: boolean; mode?: 'ai' | 'bank' }
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
    .select(
      'id, title, date_available, total_questions, duration_minutes, status, quality_status, quality_summary'
    )
    .eq('date_available', dateStr)
    .eq('audience', 'general')
    .maybeSingle();

  if (existing && !opts?.force) {
    // Não re-roda IA a cada pageview (custo). Só retorna; geração nova faz a revisão.
    return { date: dateStr, audience: 'general', created: false, exam: existing };
  }

  if (existing && opts?.force) {
    const { deleteDailyExamForRegen } = await import('@/lib/exams/delete-daily');
    const wiped = await deleteDailyExamForRegen(admin, existing.id);
    if (!wiped.ok) {
      return {
        date: dateStr,
        audience: 'general',
        created: false,
        exam: existing,
        error: wiped.error || 'Falha ao apagar disputa antiga para regenerar',
      };
    }
  }

  let selected: Question[] = [];
  let builtMeta: Awaited<ReturnType<typeof buildAiApprovedExamSet>>;
  const mode = opts?.mode ?? 'bank';
  try {
    builtMeta = await pickGeneralQuestions(admin, DAILY_EXAM_QUESTION_COUNT, dateStr, mode);
    selected = builtMeta.questions;
  } catch (err) {
    return {
      date: dateStr,
      audience: 'general',
      created: false,
      exam: null,
      error: err instanceof Error ? err.message : 'Falha ao sortear/revisar questões com IA',
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
      status: 'draft',
      exam_kind: 'daily',
      audience: 'general',
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

  // Upsert questões polidas (se o polish mudou opções em memória)
  for (const q of selected) {
    await admin
      .from('questions')
      .upsert(
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
      audience: 'general',
      created: true,
      exam,
      error: err instanceof Error ? err.message : 'Falha na revisão IA',
    };
  }

  const { data: refreshed } = await admin
    .from('exams')
    .select('id, title, date_available, total_questions, duration_minutes, status, quality_status, quality_summary')
    .eq('id', exam.id)
    .single();

  return {
    date: dateStr,
    audience: 'general',
    created: true,
    exam: refreshed ?? exam,
    progress: builtMeta.progress,
  };
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
