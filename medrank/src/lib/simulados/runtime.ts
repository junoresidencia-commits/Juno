import { randomUUID } from 'crypto';
import type { OptionLetter, Question } from '@/types/database';
import type { SimuladoMode, SimuladoSession } from '@/types/simulado';
import {
  addWrongQuestionIds,
  getDemoSimuladoById,
  getDemoSimulados,
  getWrongQuestionIds,
  removeCorrectFromWrong,
  saveDemoSimulado,
  type StoredSimulado,
} from '@/lib/demo-store';
import { getQuestionById } from '@/lib/question-bank/pool';
import { SIMULADO_DURATION_MINUTES } from '@/lib/question-bank/areas';
import { buildSimuladoQuestions, getSimuladoTitle } from '@/lib/simulados/selection';
import { normalizeQuestionForDispute } from '@/lib/question-bank/presentation';
import { calculateExamScoreFromAnswers, getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';

function mapSession(stored: StoredSimulado): SimuladoSession {
  return {
    id: stored.id,
    user_id: stored.userId,
    mode: stored.mode,
    title: stored.title,
    area_filter: stored.areaFilter,
    theme_filter: stored.themeFilter,
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
    created_at: stored.startedAt,
  };
}

export function createSimuladoSession(options: {
  userId: string;
  mode: SimuladoMode;
  area?: string;
  theme?: string;
}): SimuladoSession {
  const wrongIds = options.mode === 'revisao_erros' ? getWrongQuestionIds(options.userId) : [];
  const questions = buildSimuladoQuestions({
    mode: options.mode,
    area: options.area,
    theme: options.theme,
    wrongQuestionIds: wrongIds,
  });

  if (questions.length === 0) {
    throw new Error(
      options.mode === 'revisao_erros'
        ? 'Você ainda não tem questões erradas para revisar. Faça um simulado primeiro.'
        : 'Não há questões suficientes no banco para este filtro.'
    );
  }

  const stored: StoredSimulado = {
    id: `simulado-${randomUUID()}`,
    userId: options.userId,
    mode: options.mode,
    title: getSimuladoTitle(options.mode, options.area, options.theme),
    areaFilter: options.area ?? null,
    themeFilter: options.theme ?? null,
    questionIds: questions.map((q) => q.id),
    durationMinutes: SIMULADO_DURATION_MINUTES,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    durationSeconds: null,
    score: null,
    totalCorrect: 0,
    totalQuestions: questions.length,
    percentage: null,
    submittedAutomatically: false,
    answers: {},
  };

  saveDemoSimulado(stored);
  return mapSession(stored);
}

export function getSimuladoSession(id: string): SimuladoSession | null {
  const stored = getDemoSimuladoById(id);
  return stored ? mapSession(stored) : null;
}

export function getSimuladoQuestions(sessionId: string): (Question & { order_number: number })[] {
  const stored = getDemoSimuladoById(sessionId);
  if (!stored) return [];

  return stored.questionIds
    .map((id, index) => {
      const question = getQuestionById(id);
      if (!question) return null;
      return { ...normalizeQuestionForDispute(question), order_number: index + 1 };
    })
    .filter((q): q is Question & { order_number: number } => q != null);
}

export function saveSimuladoAnswer(
  sessionId: string,
  questionId: string,
  option: OptionLetter | null,
  timeSpentSeconds?: number
) {
  const stored = getDemoSimuladoById(sessionId);
  if (!stored || stored.finishedAt) return false;

  if (!stored.answerTimes) stored.answerTimes = {};

  if (option) {
    stored.answers[questionId] = option;
    if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
  } else {
    delete stored.answers[questionId];
    if (timeSpentSeconds != null) stored.answerTimes[questionId] = timeSpentSeconds;
  }

  saveDemoSimulado(stored);
  return true;
}

export function submitSimuladoSession(sessionId: string, auto = false): SimuladoSession {
  const stored = getDemoSimuladoById(sessionId);
  if (!stored) throw new Error('Simulado não encontrado');
  if (stored.finishedAt) return mapSession(stored);

  const questions = getSimuladoQuestions(sessionId);
  const wrongIds: string[] = [];
  const correctIds: string[] = [];

  let totalCorrect = 0;
  for (const question of questions) {
    const selected = stored.answers[question.id] as OptionLetter | undefined;
    if (selected === question.correct_option) {
      totalCorrect++;
      correctIds.push(question.id);
    } else if (selected) {
      wrongIds.push(question.id);
    } else {
      wrongIds.push(question.id);
    }
  }

  const startedAt = new Date(stored.startedAt).getTime();
  const durationSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const totalQuestions = questions.length;
  const percentage = Math.round((totalCorrect / totalQuestions) * 1000) / 10;
  const questionLimit = getQuestionTimeLimitSeconds(stored.durationMinutes, totalQuestions);
  const scoreResults = questions.map((question) => {
    const selected = stored.answers[question.id] as OptionLetter | undefined;
    const isCorrect = selected === question.correct_option;
    const timeSpent = stored.answerTimes?.[question.id] ?? questionLimit;
    return { isCorrect, timeSpentSeconds: timeSpent };
  });
  const score = calculateExamScoreFromAnswers(scoreResults, questionLimit);

  stored.finishedAt = new Date().toISOString();
  stored.durationSeconds = durationSeconds;
  stored.totalCorrect = totalCorrect;
  stored.totalQuestions = totalQuestions;
  stored.percentage = percentage;
  stored.score = score;
  stored.submittedAutomatically = auto;
  saveDemoSimulado(stored);

  addWrongQuestionIds(stored.userId, wrongIds);
  removeCorrectFromWrong(stored.userId, correctIds);

  return mapSession(stored);
}

export function getSimuladoRanking(userId = 'guest-student') {
  const finished = getDemoSimulados()
    .filter((s) => s.finishedAt)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 10);

  return finished.map((s, index) => ({
    position: index + 1,
    user_id: s.userId,
    title: s.title,
    score: s.score ?? 0,
    percentage: s.percentage ?? 0,
    finished_at: s.finishedAt,
    isCurrentUser: s.userId === userId,
  }));
}

export function getSimuladoHistory(userId: string) {
  return getDemoSimulados(userId)
    .filter((s) => s.finishedAt)
    .sort((a, b) => new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime());
}
