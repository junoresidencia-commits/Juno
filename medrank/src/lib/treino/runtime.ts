import { createHash, randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import type { OptionLetter, Question } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { calculateExamScoreFromAnswers, getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';
import {
  getNefropediatriaQuestionsFromFile,
  NEFROPEDIATRIA_TRACK,
  shufflePick,
  TREINO_DURATION_MINUTES,
  TREINO_QUESTION_COUNT,
} from '@/lib/treino/bank';
import {
  getDemoTreinoById,
  getDemoTreinos,
  saveDemoTreino,
  type StoredTreino,
} from '@/lib/demo-store';

export interface TreinoSession {
  id: string;
  user_id: string;
  track: string;
  title: string;
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

const COOKIE_PREFIX = 'medrank_treino_';
const MAX_COOKIE_AGE = 60 * 60 * 4; // 4h

type CookiePayload = {
  id: string;
  userId: string;
  track: string;
  title: string;
  questionIds: string[];
  durationMinutes: number;
  startedAt: string;
  finishedAt: string | null;
  durationSeconds: number | null;
  score: number | null;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number | null;
  submittedAutomatically: boolean;
  answers: Record<string, OptionLetter>;
  answerTimes: Record<string, number>;
};

function signingSecret(): string {
  return (
    process.env.TREINO_SESSION_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    'medrank-treino-dev-secret'
  );
}

function sign(payload: string): string {
  return createHash('sha256').update(`${signingSecret()}:${payload}`).digest('hex').slice(0, 32);
}

function encodePayload(data: CookiePayload): string {
  const body = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
  return `${body}.${sign(body)}`;
}

function decodePayload(raw: string | undefined): CookiePayload | null {
  if (!raw) return null;
  const [body, sig] = raw.split('.');
  if (!body || !sig || sign(body) !== sig) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as CookiePayload;
  } catch {
    return null;
  }
}

function mapStored(stored: StoredTreino): TreinoSession {
  return {
    id: stored.id,
    user_id: stored.userId,
    track: stored.track,
    title: stored.title,
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

function mapCookie(data: CookiePayload): TreinoSession {
  return {
    id: data.id,
    user_id: data.userId,
    track: data.track,
    title: data.title,
    question_ids: data.questionIds,
    duration_minutes: data.durationMinutes,
    started_at: data.startedAt,
    finished_at: data.finishedAt,
    duration_seconds: data.durationSeconds,
    score: data.score,
    total_correct: data.totalCorrect,
    total_questions: data.totalQuestions,
    percentage: data.percentage,
    submitted_automatically: data.submittedAutomatically,
  };
}

async function pickProductionQuestions(count: number): Promise<Question[]> {
  const admin = createAdminClient();
  if (!admin) {
    throw new Error('Supabase não configurado para treino. Peça ao admin para importar o banco.');
  }

  const { data, error } = await admin
    .from('questions')
    .select('*')
    .contains('tags', ['nefropediatria']);

  if (error) throw new Error(error.message);

  let pool = (data ?? []) as Question[];
  if (pool.length < count) {
    const { data: sbnPool } = await admin
      .from('questions')
      .select('*')
      .contains('tags', ['estilo-SBN']);
    const { data: sbnPedPool } = await admin
      .from('questions')
      .select('*')
      .contains('tags', ['estilo-SBNPed']);
    const seen = new Set(pool.map((q) => q.id));
    for (const q of [...(sbnPool ?? []), ...(sbnPedPool ?? [])] as Question[]) {
      if (!seen.has(q.id)) {
        pool.push(q);
        seen.add(q.id);
      }
    }
  }

  if (pool.length < count) {
    throw new Error(
      `Questões de nefropediatria insuficientes no banco (${pool.length}/${count}). Admin → Questões → Importar banco completo.`
    );
  }

  return shufflePick(pool, count);
}

function pickDemoQuestions(count: number): Question[] {
  const pool = getNefropediatriaQuestionsFromFile();
  if (pool.length < count) {
    throw new Error('Banco de nefropediatria não encontrado no deploy.');
  }
  return shufflePick(pool, count);
}

export async function createTreinoSession(userId: string): Promise<TreinoSession> {
  const title = 'Treino Nefropediatria (SBN / SBNPed)';
  const questions = usesDemoStore()
    ? pickDemoQuestions(TREINO_QUESTION_COUNT)
    : await pickProductionQuestions(TREINO_QUESTION_COUNT);

  if (usesDemoStore()) {
    const stored: StoredTreino = {
      id: `treino-${randomUUID()}`,
      userId,
      track: NEFROPEDIATRIA_TRACK,
      title,
      questionIds: questions.map((q) => q.id),
      durationMinutes: TREINO_DURATION_MINUTES,
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
    };
    saveDemoTreino(stored);
    return mapStored(stored);
  }

  const payload: CookiePayload = {
    id: `treino-${randomUUID()}`,
    userId,
    track: NEFROPEDIATRIA_TRACK,
    title,
    questionIds: questions.map((q) => q.id),
    durationMinutes: TREINO_DURATION_MINUTES,
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
  };

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_PREFIX + payload.id, encodePayload(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_COOKIE_AGE,
  });

  return mapCookie(payload);
}

async function readCookieSession(sessionId: string): Promise<CookiePayload | null> {
  const cookieStore = await cookies();
  return decodePayload(cookieStore.get(COOKIE_PREFIX + sessionId)?.value);
}

async function writeCookieSession(payload: CookiePayload): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_PREFIX + payload.id, encodePayload(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_COOKIE_AGE,
  });
}

export async function getTreinoSession(sessionId: string): Promise<TreinoSession | null> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    return stored ? mapStored(stored) : null;
  }
  const payload = await readCookieSession(sessionId);
  return payload ? mapCookie(payload) : null;
}

export async function getTreinoQuestions(
  sessionId: string,
  opts?: { includeAnswers?: boolean }
): Promise<(Question & { order_number: number })[]> {
  const includeAnswers = opts?.includeAnswers ?? false;

  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    if (!stored) return [];
    const byId = new Map(getNefropediatriaQuestionsFromFile().map((q) => [q.id, q]));
    return stored.questionIds
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

  const payload = await readCookieSession(sessionId);
  if (!payload) return [];

  const admin = createAdminClient();
  if (!admin) return [];

  const { data } = await admin.from('questions').select('*').in('id', payload.questionIds);
  const byId = new Map(((data ?? []) as Question[]).map((q) => [q.id, q]));

  return payload.questionIds
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

export async function getTreinoAnswers(sessionId: string): Promise<Record<string, OptionLetter>> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    return Object.fromEntries(
      Object.entries(stored?.answers ?? {}).map(([k, v]) => [k, v as OptionLetter])
    );
  }
  const payload = await readCookieSession(sessionId);
  return { ...(payload?.answers ?? {}) };
}

export async function saveTreinoAnswer(
  sessionId: string,
  questionId: string,
  option: OptionLetter | null,
  timeSpentSeconds?: number
): Promise<boolean> {
  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    if (!stored || stored.finishedAt) return false;
    if (!stored.answerTimes) stored.answerTimes = {};
    if (option) {
      stored.answers[questionId] = option;
      if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
    } else {
      delete stored.answers[questionId];
      if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
    }
    saveDemoTreino(stored);
    return true;
  }

  const payload = await readCookieSession(sessionId);
  if (!payload || payload.finishedAt) return false;
  if (option) {
    payload.answers[questionId] = option;
    if (timeSpentSeconds != null) payload.answerTimes[questionId] = timeSpentSeconds;
  } else {
    delete payload.answers[questionId];
    if (timeSpentSeconds != null) payload.answerTimes[questionId] = timeSpentSeconds;
  }
  await writeCookieSession(payload);
  return true;
}

export async function submitTreinoSession(
  sessionId: string,
  auto = false
): Promise<TreinoSession> {
  const questions = await getTreinoQuestions(sessionId, { includeAnswers: true });
  if (questions.length === 0) throw new Error('Sessão de treino não encontrada');

  if (usesDemoStore()) {
    const stored = getDemoTreinoById(sessionId);
    if (!stored) throw new Error('Sessão de treino não encontrada');
    if (stored.finishedAt) return mapStored(stored);

    let totalCorrect = 0;
    for (const question of questions) {
      if (stored.answers[question.id] === question.correct_option) totalCorrect++;
    }

    const startedAt = new Date(stored.startedAt).getTime();
    const durationSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
    const percentage = Math.round((totalCorrect / questions.length) * 1000) / 10;
    const questionLimit = getQuestionTimeLimitSeconds(stored.durationMinutes, questions.length);
    const score = calculateExamScoreFromAnswers(
      questions.map((question) => ({
        isCorrect: stored.answers[question.id] === question.correct_option,
        timeSpentSeconds: stored.answerTimes?.[question.id] ?? questionLimit,
      })),
      questionLimit
    );

    stored.finishedAt = new Date().toISOString();
    stored.durationSeconds = durationSeconds;
    stored.totalCorrect = totalCorrect;
    stored.totalQuestions = questions.length;
    stored.percentage = percentage;
    stored.score = score;
    stored.submittedAutomatically = auto;
    saveDemoTreino(stored);
    return mapStored(stored);
  }

  const payload = await readCookieSession(sessionId);
  if (!payload) throw new Error('Sessão de treino não encontrada');
  if (payload.finishedAt) return mapCookie(payload);

  let totalCorrect = 0;
  for (const question of questions) {
    if (payload.answers[question.id] === question.correct_option) totalCorrect++;
  }

  const startedAt = new Date(payload.startedAt).getTime();
  const durationSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const percentage = Math.round((totalCorrect / questions.length) * 1000) / 10;
  const questionLimit = getQuestionTimeLimitSeconds(payload.durationMinutes, questions.length);
  const score = calculateExamScoreFromAnswers(
    questions.map((question) => ({
      isCorrect: payload.answers[question.id] === question.correct_option,
      timeSpentSeconds: payload.answerTimes[question.id] ?? questionLimit,
    })),
    questionLimit
  );

  payload.finishedAt = new Date().toISOString();
  payload.durationSeconds = durationSeconds;
  payload.totalCorrect = totalCorrect;
  payload.totalQuestions = questions.length;
  payload.percentage = percentage;
  payload.score = score;
  payload.submittedAutomatically = auto;
  await writeCookieSession(payload);
  return mapCookie(payload);
}

export async function getTreinoHistory(userId: string): Promise<TreinoSession[]> {
  if (usesDemoStore()) {
    return getDemoTreinos(userId)
      .filter((s) => s.finishedAt)
      .sort((a, b) => new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime())
      .map(mapStored);
  }
  // Produção: histórico fica na sessão atual (cookie). Sem tabela dedicada.
  return [];
}

export function getNefropediatriaBankCount(): number {
  return getNefropediatriaQuestionsFromFile().length;
}
