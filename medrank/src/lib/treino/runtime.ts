import { createHash, randomUUID } from 'crypto';
import type { OptionLetter, Question } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { calculateExamScoreFromAnswers, getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';
import {
  durationForCount,
  getTrackQuestionsFromFile,
  leagueTopicBias,
  listTrackTopics,
  NEFROPEDIATRIA_TRACK,
  shufflePick,
  TRACK_CONFIG,
  type TreinoSize,
  type TreinoTrack,
} from '@/lib/treino/bank';
import {
  applySrsResult,
  bumpSessionCount,
  computeTreinoStats,
  dueSrsQuestionIds,
  emptyTreinoProgress,
  mixDifficulty,
  type TreinoProgressStore,
} from '@/lib/treino/progress';
import {
  getDemoTreinoById,
  getDemoTreinoProgress,
  getDemoTreinos,
  saveDemoTreino,
  saveDemoTreinoProgress,
  type StoredTreino,
} from '@/lib/demo-store';

export type TreinoMode = 'prova' | 'tema' | 'srs' | 'liga';

export interface TreinoSession {
  id: string;
  user_id: string;
  track: string;
  title: string;
  mode: TreinoMode;
  topic_filter: string | null;
  liga: string | null;
  question_ids: string[];
  duration_minutes: number;
  started_at: string;
  finished_at: string | null;
  duration_seconds: number | null;
  score: number | null;
  total_correct: number;
  total_questions: number;
  percentage: number | null;
  submitted_automatically: boolean;
}

export interface CreateTreinoOptions {
  userId: string;
  track?: TreinoTrack;
  count?: TreinoSize | number;
  mode?: TreinoMode;
  topic?: string | null;
  liga?: string | null;
}

function mapStored(stored: StoredTreino): TreinoSession {
  return {
    id: stored.id,
    user_id: stored.userId,
    track: stored.track,
    title: stored.title,
    mode: (stored.mode as TreinoMode) || 'prova',
    topic_filter: stored.topicFilter ?? null,
    liga: stored.liga ?? null,
    question_ids: stored.questionIds,
    duration_minutes: stored.durationMinutes,
    started_at: stored.startedAt,
    finished_at: stored.finishedAt,
    duration_seconds: stored.durationSeconds,
    score: stored.score,
    total_correct: stored.totalCorrect,
    total_questions: stored.totalQuestions,
    percentage: stored.percentage,
    submitted_automatically: stored.submittedAutomatically,
  };
}

function mapDbRow(row: Record<string, unknown>): TreinoSession {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    track: String(row.track ?? NEFROPEDIATRIA_TRACK),
    title: String(row.title),
    mode: (row.mode as TreinoMode) || 'prova',
    topic_filter: (row.topic_filter as string | null) ?? null,
    liga: (row.liga as string | null) ?? null,
    question_ids: (row.question_ids as string[]) ?? [],
    duration_minutes: Number(row.duration_minutes),
    started_at: String(row.started_at),
    finished_at: (row.finished_at as string | null) ?? null,
    duration_seconds: (row.duration_seconds as number | null) ?? null,
    score: (row.score as number | null) ?? null,
    total_correct: Number(row.total_correct ?? 0),
    total_questions: Number(row.total_questions),
    percentage: (row.percentage as number | null) ?? null,
    submitted_automatically: Boolean(row.submitted_automatically),
  };
}

async function loadProgress(userId: string): Promise<TreinoProgressStore> {
  if (usesDemoStore()) {
    return getDemoTreinoProgress(userId) ?? emptyTreinoProgress();
  }
  const admin = createAdminClient();
  if (!admin) return emptyTreinoProgress();
  const { data } = await admin
    .from('practice_progress')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();
  if (!data?.data || typeof data.data !== 'object') return emptyTreinoProgress();
  return { ...emptyTreinoProgress(), ...(data.data as TreinoProgressStore) };
}

async function saveProgress(userId: string, progress: TreinoProgressStore): Promise<void> {
  if (usesDemoStore()) {
    saveDemoTreinoProgress(userId, progress);
    return;
  }
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from('practice_progress').upsert({
    user_id: userId,
    data: progress,
    updated_at: new Date().toISOString(),
  });
}

async function pickProductionQuestions(
  track: TreinoTrack,
  count: number,
  opts: { topic?: string | null; preferIds?: string[]; avoidIds?: string[]; liga?: string | null }
): Promise<Question[]> {
  const admin = createAdminClient();
  if (!admin) {
    throw new Error('Supabase não configurado para treino. Peça ao admin para importar o banco.');
  }

  const tag = TRACK_CONFIG[track].tag;
  let query = admin.from('questions').select('*').contains('tags', [tag]);
  if (opts.topic) {
    query = query.eq('topic', opts.topic);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  let pool = (data ?? []) as Question[];

  // Descarta templates ruins de bancos antigos (se ainda existirem no DB)
  const badStem = [
    /em avaliação de .+ — foco:/i,
    /Labs e contexto compatíveis/i,
    /Conduta alinhada a guidelines/i,
    /Tipo de cobrança/i,
    /\(i % \d+/,
    /\banos anos\b/i,
    /\{\{[a-z0-9_]+\}\}/i,
  ];
  pool = pool.filter((q) => {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c ?? ''}\n${q.option_d ?? ''}\n${q.option_e ?? ''}`;
    return !badStem.some((re) => re.test(blob));
  });
  // Preferir banco expert (título SBN/SBP-Nefroped) quando disponível
  const expert = pool.filter((q) => q.tags?.includes('banco-expert'));
  if (expert.length >= count) pool = expert;

  const bias = leagueTopicBias(opts.liga);
  if (bias?.length && !opts.topic) {
    const boosted = pool.filter((q) =>
      bias.some((b) => q.topic?.includes(b) || q.subtopic?.includes(b) || q.tags?.some((t) => t.includes(b)))
    );
    if (boosted.length >= Math.ceil(count * 0.5)) {
      pool = [...boosted, ...pool.filter((q) => !boosted.includes(q))];
    }
  }

  if (opts.preferIds?.length) {
    const prefer = pool.filter((q) => opts.preferIds!.includes(q.id));
    const rest = pool.filter((q) => !opts.preferIds!.includes(q.id));
    pool = [...prefer, ...rest];
  }

  if (opts.avoidIds?.length) {
    const avoid = new Set(opts.avoidIds);
    const filtered = pool.filter((q) => !avoid.has(q.id));
    if (filtered.length >= count) pool = filtered;
  }

  if (pool.length < count) {
    throw new Error(
      `Questões insuficientes (${pool.length}/${count}). Admin → Questões → Importar banco completo.`
    );
  }

  if (opts.preferIds?.length) {
    const preferred = shufflePick(
      pool.filter((q) => opts.preferIds!.includes(q.id)),
      count
    );
    if (preferred.length > 0) {
      if (preferred.length >= count) return preferred.slice(0, count);
      const fill = mixDifficulty(
        pool.filter((q) => !preferred.some((p) => p.id === q.id)),
        count - preferred.length
      );
      return [...preferred, ...fill];
    }
  }

  if (bias?.length && !opts.topic) {
    const preferred = mixDifficulty(
      pool.filter((q) =>
        bias.some((b) => q.topic?.includes(b) || q.subtopic?.includes(b))
      ),
      Math.min(count, Math.ceil(count * 0.6))
    );
    const fill = mixDifficulty(
      pool.filter((q) => !preferred.some((p) => p.id === q.id)),
      count - preferred.length
    );
    return shufflePick([...preferred, ...fill], count);
  }

  return mixDifficulty(pool, count);
}

function pickDemoQuestions(
  track: TreinoTrack,
  count: number,
  opts: { topic?: string | null; preferIds?: string[]; avoidIds?: string[]; liga?: string | null }
): Question[] {
  let pool = getTrackQuestionsFromFile(track);
  if (opts.topic) {
    pool = pool.filter((q) => q.topic === opts.topic || q.subtopic === opts.topic);
  }
  if (pool.length < count) {
    throw new Error(
      opts.topic
        ? `Poucas questões no tema "${opts.topic}" (${pool.length}/${count}).`
        : `Banco ${TRACK_CONFIG[track].label} não encontrado no deploy.`
    );
  }

  const bias = leagueTopicBias(opts.liga);

  if (opts.preferIds?.length) {
    const preferred = shufflePick(
      pool.filter((q) => opts.preferIds!.includes(q.id)),
      count
    );
    if (preferred.length > 0) {
      if (preferred.length >= count) return preferred.slice(0, count);
      const fill = mixDifficulty(
        pool.filter((q) => !preferred.some((p) => p.id === q.id)),
        count - preferred.length
      );
      return [...preferred, ...fill];
    }
  }

  if (opts.avoidIds?.length) {
    const avoid = new Set(opts.avoidIds);
    const filtered = pool.filter((q) => !avoid.has(q.id));
    if (filtered.length >= count) pool = filtered;
  }

  if (bias?.length && !opts.topic) {
    const preferred = mixDifficulty(
      pool.filter((q) =>
        bias.some((b) => q.topic?.includes(b) || q.subtopic?.includes(b))
      ),
      Math.min(count, Math.ceil(count * 0.6))
    );
    const fill = mixDifficulty(
      pool.filter((q) => !preferred.some((p) => p.id === q.id)),
      count - preferred.length
    );
    return shufflePick([...preferred, ...fill], count);
  }

  return mixDifficulty(pool, count);
}

function titleFor(
  track: TreinoTrack,
  mode: TreinoMode,
  count: number,
  topic?: string | null,
  liga?: string | null
): string {
  const label = TRACK_CONFIG[track].label;
  if (mode === 'srs') return `${label} · Revisão espaçada · ${count} Q`;
  if (mode === 'liga' && liga) return `${liga} · ${count} Q`;
  if (mode === 'tema' && topic) return `${label} · ${topic} · ${count} Q`;
  if (count === 100) return `${label} · Simulado 100 questões`;
  if (count === 60) return `${label} · Simulado 60 questões`;
  if (count === 30) return `${label} · Treino 30 questões`;
  return `${label} · Treino 20 questões`;
}

export async function createTreinoSession(options: CreateTreinoOptions): Promise<TreinoSession> {
  const track: TreinoTrack = options.track ?? 'nefropediatria';
  const count = Number(options.count) || 20;
  const mode: TreinoMode = options.mode ?? 'prova';
  const topic = options.topic?.trim() || null;
  const liga = options.liga?.trim() || null;
  const progress = await loadProgress(options.userId);

  if (!TRACK_CONFIG[track].sizes.includes(count)) {
    throw new Error(`Tamanho inválido para este banco. Use: ${TRACK_CONFIG[track].sizes.join(', ')}`);
  }

  const preferIds = mode === 'srs' ? dueSrsQuestionIds(progress) : [];
  const avoidIds = progress.recentQuestionIds.slice(0, 120);

  const pickOpts = {
    topic: mode === 'tema' ? topic : null,
    preferIds,
    avoidIds,
    liga: mode === 'liga' ? liga : null,
  };

  const questions = usesDemoStore()
    ? pickDemoQuestions(track, count, pickOpts)
    : await pickProductionQuestions(track, count, pickOpts);

  const title = titleFor(track, mode, count, topic, liga);
  const durationMinutes = durationForCount(count);

  if (usesDemoStore()) {
    const stored: StoredTreino = {
      id: `treino-${randomUUID()}`,
      userId: options.userId,
      track,
      title,
      mode,
      topicFilter: topic,
      liga,
      questionIds: questions.map((q) => q.id),
      durationMinutes,
      startedAt: new Date().toISOString(),
      finishedAt: null,
      durationSeconds: null,
      score: null,
      totalCorrect: 0,
      totalQuestions: questions.length,
      percentage: null,
      submittedAutomatically: false,
      answers: {},
      answerTimes: {},
      confidences: {},
    };
    saveDemoTreino(stored);
    return mapStored(stored);
  }

  const admin = createAdminClient();
  if (!admin) {
    throw new Error('Supabase service role necessária para treino em produção.');
  }

  const id = randomUUID();
  const row = {
    id,
    user_id: options.userId,
    track,
    title,
    mode,
    topic_filter: topic,
    liga,
    question_ids: questions.map((q) => q.id),
    answers: {},
    answer_times: {},
    confidences: {},
    duration_minutes: durationMinutes,
    started_at: new Date().toISOString(),
    finished_at: null,
    duration_seconds: null,
    score: null,
    total_correct: 0,
    total_questions: questions.length,
    percentage: null,
    submitted_automatically: false,
  };

  const { data, error } = await admin.from('practice_sessions').insert(row).select('*').single();
  if (error) {
    throw new Error(
      error.message.includes('liga')
        ? `${error.message} — rode a migration 020 atualizada (coluna liga).`
        : error.message
    );
  }

  return mapDbRow(data as Record<string, unknown>);
}

export async function getTreinoSession(sessionId: string): Promise<TreinoSession | null> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    return stored ? mapStored(stored) : null;
  }
  const admin = createAdminClient();
  if (!admin) return null;
  const { data } = await admin.from('practice_sessions').select('*').eq('id', sessionId).maybeSingle();
  return data ? mapDbRow(data as Record<string, unknown>) : null;
}

export async function getTreinoQuestions(
  sessionId: string,
  opts?: { includeAnswers?: boolean }
): Promise<(Question & { order_number: number })[]> {
  const includeAnswers = opts?.includeAnswers ?? false;
  const session = await getTreinoSession(sessionId);
  if (!session) return [];

  let byId: Map<string, Question>;

  if (usesDemoStore()) {
    byId = new Map(getTrackQuestionsFromFile(session.track as TreinoTrack).map((q) => [q.id, q]));
  } else {
    const admin = createAdminClient();
    if (!admin) return [];
    const { data } = await admin.from('questions').select('*').in('id', session.question_ids);
    byId = new Map(((data ?? []) as Question[]).map((q) => [q.id, q]));
  }

  return session.question_ids
    .map((id, index) => {
      const q = byId.get(id);
      if (!q) return null;
      const base = includeAnswers
        ? q
        : { ...q, correct_option: 'A' as OptionLetter, explanation: null };
      return { ...base, order_number: index + 1 };
    })
    .filter((q): q is Question & { order_number: number } => q != null);
}

async function readAnswersAndTimes(sessionId: string): Promise<{
  answers: Record<string, OptionLetter>;
  answerTimes: Record<string, number>;
  confidences: Record<string, number>;
}> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    return {
      answers: Object.fromEntries(
        Object.entries(stored?.answers ?? {}).map(([k, v]) => [k, v as OptionLetter])
      ),
      answerTimes: { ...(stored?.answerTimes ?? {}) },
      confidences: { ...(stored?.confidences ?? {}) },
    };
  }
  const admin = createAdminClient();
  if (!admin) return { answers: {}, answerTimes: {}, confidences: {} };
  const { data } = await admin
    .from('practice_sessions')
    .select('answers, answer_times, confidences')
    .eq('id', sessionId)
    .maybeSingle();
  return {
    answers: (data?.answers as Record<string, OptionLetter>) ?? {},
    answerTimes: (data?.answer_times as Record<string, number>) ?? {},
    confidences: (data?.confidences as Record<string, number>) ?? {},
  };
}

export async function getTreinoAnswers(sessionId: string): Promise<Record<string, OptionLetter>> {
  const { answers } = await readAnswersAndTimes(sessionId);
  return answers;
}

export async function saveTreinoAnswer(
  sessionId: string,
  questionId: string,
  option: OptionLetter | null,
  timeSpentSeconds?: number,
  confidence?: number | null
): Promise<boolean> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    if (!stored || stored.finishedAt) return false;
    if (!stored.answerTimes) stored.answerTimes = {};
    if (!stored.confidences) stored.confidences = {};
    if (option) {
      stored.answers[questionId] = option;
      if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
      if (confidence != null) stored.confidences[questionId] = confidence;
    } else {
      delete stored.answers[questionId];
      if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
    }
    saveDemoTreino(stored);
    return true;
  }

  const admin = createAdminClient();
  if (!admin) return false;
  const { data } = await admin
    .from('practice_sessions')
    .select('answers, answer_times, confidences, finished_at')
    .eq('id', sessionId)
    .maybeSingle();
  if (!data || data.finished_at) return false;

  const answers = { ...((data.answers as Record<string, OptionLetter>) ?? {}) };
  const answerTimes = { ...((data.answer_times as Record<string, number>) ?? {}) };
  const confidences = { ...((data.confidences as Record<string, number>) ?? {}) };
  if (option) {
    answers[questionId] = option;
    if (timeSpentSeconds != null) answerTimes[questionId] = timeSpentSeconds;
    if (confidence != null) confidences[questionId] = confidence;
  } else {
    delete answers[questionId];
    if (timeSpentSeconds != null) answerTimes[questionId] = timeSpentSeconds;
  }

  const { error } = await admin
    .from('practice_sessions')
    .update({ answers, answer_times: answerTimes, confidences })
    .eq('id', sessionId);
  return !error;
}

export async function submitTreinoSession(
  sessionId: string,
  auto = false
): Promise<TreinoSession> {
  const questions = await getTreinoQuestions(sessionId, { includeAnswers: true });
  if (questions.length === 0) throw new Error('Sessão de treino não encontrada');

  const session = await getTreinoSession(sessionId);
  if (!session) throw new Error('Sessão de treino não encontrada');
  if (session.finished_at) return session;

  const { answers, answerTimes, confidences } = await readAnswersAndTimes(sessionId);

  let totalCorrect = 0;
  const questionLimit = getQuestionTimeLimitSeconds(session.duration_minutes, questions.length);
  const scoreRows = questions.map((question) => {
    const isCorrect = answers[question.id] === question.correct_option;
    if (isCorrect) totalCorrect++;
    return {
      isCorrect,
      timeSpentSeconds: answerTimes[question.id] ?? questionLimit,
    };
  });

  const startedAt = new Date(session.started_at).getTime();
  const durationSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const percentage = Math.round((totalCorrect / questions.length) * 1000) / 10;
  const score = calculateExamScoreFromAnswers(scoreRows, questionLimit);
  const finishedAt = new Date().toISOString();

  let progress = await loadProgress(session.user_id);
  for (const question of questions) {
    const isCorrect = answers[question.id] === question.correct_option;
    progress = applySrsResult(
      progress,
      question.id,
      isCorrect,
      question.topic ?? question.subtopic,
      answerTimes[question.id],
      confidences[question.id] ?? null
    );
  }
  progress = bumpSessionCount(progress);
  await saveProgress(session.user_id, progress);

  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    if (!stored) throw new Error('Sessão de treino não encontrada');
    stored.finishedAt = finishedAt;
    stored.durationSeconds = durationSeconds;
    stored.totalCorrect = totalCorrect;
    stored.totalQuestions = questions.length;
    stored.percentage = percentage;
    stored.score = score;
    stored.submittedAutomatically = auto;
    saveDemoTreino(stored);
    return mapStored(stored);
  }

  const admin = createAdminClient();
  if (!admin) throw new Error('Supabase não configurado');
  const { data, error } = await admin
    .from('practice_sessions')
    .update({
      finished_at: finishedAt,
      duration_seconds: durationSeconds,
      total_correct: totalCorrect,
      total_questions: questions.length,
      percentage,
      score,
      submitted_automatically: auto,
    })
    .eq('id', sessionId)
    .select('*')
    .single();
  if (error || !data) throw new Error(error?.message ?? 'Falha ao finalizar');
  return mapDbRow(data as Record<string, unknown>);
}

export async function getTreinoHistory(userId: string): Promise<TreinoSession[]> {
  if (usesDemoStore()) {
    return getDemoTreinos(userId)
      .filter((s) => s.finishedAt)
      .sort((a, b) => new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime())
      .map(mapStored);
  }
  const admin = createAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from('practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .not('finished_at', 'is', null)
    .order('finished_at', { ascending: false })
    .limit(10);
  return (data ?? []).map((row) => mapDbRow(row as Record<string, unknown>));
}

export async function getTreinoUserStats(userId: string) {
  const progress = await loadProgress(userId);
  return computeTreinoStats(progress);
}

export async function getTreinoRanking(userId: string, track?: TreinoTrack) {
  const trackFilter = track ?? NEFROPEDIATRIA_TRACK;
  if (usesDemoStore()) {
    return getDemoTreinos()
      .filter((s) => s.finishedAt && s.totalQuestions >= 20 && s.track === trackFilter)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, 10)
      .map((s, index) => ({
        position: index + 1,
        user_id: s.userId,
        title: s.title,
        score: s.score ?? 0,
        percentage: s.percentage ?? 0,
        finished_at: s.finishedAt,
        isCurrentUser: s.userId === userId,
      }));
  }

  const admin = createAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from('practice_sessions')
    .select('user_id, title, score, percentage, finished_at, total_questions')
    .eq('track', trackFilter)
    .not('finished_at', 'is', null)
    .gte('total_questions', 20)
    .order('score', { ascending: false })
    .limit(10);

  return (data ?? []).map((row, index) => ({
    position: index + 1,
    user_id: String(row.user_id),
    title: String(row.title),
    score: Number(row.score ?? 0),
    percentage: Number(row.percentage ?? 0),
    finished_at: row.finished_at as string | null,
    isCurrentUser: String(row.user_id) === userId,
  }));
}

export function getTrackBankCount(track: TreinoTrack): number {
  return getTrackQuestionsFromFile(track).length;
}

export function getNefropediatriaBankCount(): number {
  return getTrackBankCount('nefropediatria');
}

export function getNefropediatriaTopics(): string[] {
  return listTrackTopics('nefropediatria');
}

export function getTrackTopics(track: TreinoTrack): string[] {
  return listTrackTopics(track);
}

/** @deprecated */
export const TREINO_QUESTION_COUNT = 20;
/** @deprecated */
export const TREINO_DURATION_MINUTES = 60;

export function deterministicUuid(seed: string): string {
  const hex = createHash('sha256').update(`medrank-q:${seed}`).digest('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `4${hex.slice(13, 16)}`,
    `a${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}
