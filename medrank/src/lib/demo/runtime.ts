import { randomUUID } from 'crypto';
import type { Attempt, AttemptAnswer, OptionLetter, Question } from '@/types/database';
import { getDemoAttempts, saveDemoAttempt, readDemoStore, writeDemoStore } from '@/lib/demo-store';
import { getDemoExamQuestions, getDemoExams, getDemoRankings, getSeededAttemptAnswers, getSeededAttempts } from '@/lib/demo/content';
import { calculateExamScoreFromAnswers, getQuestionTimeLimitSeconds } from '@/lib/exams/scoring';

type StoredAttempt = ReturnType<typeof getDemoAttempts>[number];

export function getAllDemoAttempts() {
  return [...getSeededAttempts(), ...getDemoAttempts().map(mapStoredAttempt)];
}

function mapStoredAttempt(item: StoredAttempt): Attempt {
  return {
    id: item.id,
    exam_id: item.examId,
    user_id: item.userId,
    started_at: item.startedAt,
    finished_at: item.finishedAt,
    duration_seconds: item.durationSeconds,
    score: item.score,
    total_correct: item.totalCorrect,
    total_questions: item.totalQuestions,
    percentage: item.percentage,
    submitted_automatically: item.submittedAutomatically,
    created_at: item.startedAt,
    forfeited: item.forfeited ?? false,
  };
}

export function getDemoAttemptByExam(examId: string, userId = 'guest-student'): Attempt | null {
  const attempt = getAllDemoAttempts().find((item) => item.exam_id === examId && item.user_id === userId);
  return attempt ?? null;
}

export function getDemoAttemptById(attemptId: string) {
  return getAllDemoAttempts().find((item) => item.id === attemptId) ?? null;
}

export function createDemoAttempt(examId: string, userId = 'guest-student'): Attempt {
  const existing = getDemoAttemptByExam(examId, userId);
  if (existing?.finished_at) return existing;
  if (existing && !existing.finished_at) {
    throw new Error('Prova já iniciada');
  }

  const exam = getDemoExams().find((item) => item.id === examId);
  if (!exam) {
    throw new Error('Prova não encontrada');
  }

  const attempt: StoredAttempt = {
    id: `demo-attempt-${randomUUID()}`,
    examId,
    userId,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    durationSeconds: null,
    score: null,
    totalCorrect: 0,
    totalQuestions: exam.total_questions,
    percentage: null,
    submittedAutomatically: false,
    answers: {},
  };

  saveDemoAttempt(attempt);
  return mapStoredAttempt(attempt);
}

export function saveDemoAnswer(
  attemptId: string,
  questionId: string,
  option: OptionLetter | null,
  timeSpentSeconds?: number
) {
  const attempt = (getDemoAttempts() ?? []).find((item) => item.id === attemptId);
  if (!attempt) return false;
  if (attempt.finishedAt) return false;

  if (!attempt.answerTimes) attempt.answerTimes = {};

  if (option) {
    attempt.answers[questionId] = option;
    if (timeSpentSeconds != null) {
      attempt.answerTimes[questionId] = timeSpentSeconds;
    }
  } else {
    delete attempt.answers[questionId];
    if (timeSpentSeconds != null) {
      attempt.answerTimes[questionId] = timeSpentSeconds;
    }
  }
  saveDemoAttempt(attempt);
  return true;
}

export function getDemoAttemptAnswers(attemptId: string): AttemptAnswer[] {
  const seeded = getSeededAttemptAnswers(attemptId);
  if (seeded.length > 0) return seeded;

  const attempt = (getDemoAttempts() ?? []).find((item) => item.id === attemptId);
  if (!attempt) return [];
  const questions = getDemoExamQuestions(attempt.examId);

  return questions.map((question) => {
    const selected = (attempt.answers[question.id] ?? null) as OptionLetter | null;
    return {
      id: `${attemptId}-${question.id}`,
      attempt_id: attemptId,
      question_id: question.id,
      selected_option: selected,
      is_correct: selected ? selected === question.correct_option : false,
      answered_at: attempt.finishedAt ?? null,
    };
  });
}

export function forfeitDemoAttempt(attemptId: string) {
  const attempt = (getDemoAttempts() ?? []).find((item) => item.id === attemptId);
  if (!attempt) throw new Error('Tentativa não encontrada');
  if (attempt.finishedAt) return mapStoredAttempt(attempt);
  attempt.forfeited = true;
  saveDemoAttempt(attempt);
  return submitDemoAttempt(attemptId, true);
}

export function forfeitAbandonedDemoAttempt(examId: string, userId: string): Attempt | null {
  const attempt = getDemoAttemptByExam(examId, userId);
  if (!attempt || attempt.finished_at) return attempt;
  return forfeitDemoAttempt(attempt.id);
}

export function submitDemoAttempt(attemptId: string, auto = false) {
  const attempt = (getDemoAttempts() ?? []).find((item) => item.id === attemptId);
  if (!attempt) throw new Error('Tentativa não encontrada');
  if (attempt.finishedAt) return mapStoredAttempt(attempt);

  const questions = getDemoExamQuestions(attempt.examId);
  const answers = questions.map((question) => ({
    question,
    selected: attempt.answers[question.id] as OptionLetter | undefined,
  }));
  const totalCorrect = answers.filter((item) => item.selected === item.question.correct_option).length;
  const totalQuestions = questions.length;
  const startedAt = new Date(attempt.startedAt).getTime();
  const now = Date.now();
  const durationSeconds = Math.max(1, Math.floor((now - startedAt) / 1000));
  const percentage = Math.round((totalCorrect / totalQuestions) * 1000) / 10;
  const questionLimit = getQuestionTimeLimitSeconds(
    getDemoExams().find((e) => e.id === attempt.examId)?.duration_minutes ?? 30,
    totalQuestions
  );
  const scoreResults = questions.map((question) => {
    const selected = attempt.answers[question.id] as OptionLetter | undefined;
    const isCorrect = selected === question.correct_option;
    const timeSpent = attempt.answerTimes?.[question.id] ?? questionLimit;
    return { isCorrect, timeSpentSeconds: timeSpent };
  });
  const score = calculateExamScoreFromAnswers(scoreResults, questionLimit);

  attempt.finishedAt = new Date().toISOString();
  attempt.durationSeconds = durationSeconds;
  attempt.totalCorrect = totalCorrect;
  attempt.totalQuestions = totalQuestions;
  attempt.percentage = percentage;
  attempt.score = score;
  attempt.submittedAutomatically = auto;
  saveDemoAttempt(attempt);
  return mapStoredAttempt(attempt);
}

export function resetDemoAttempt(examId: string, userId: string): boolean {
  const store = readDemoStore();
  const before = (store.attempts ?? []).length;
  store.attempts = (store.attempts ?? []).filter(
    (item) => !(item.examId === examId && item.userId === userId)
  );
  if (store.attempts.length === before) return false;
  writeDemoStore(store);
  return true;
}

export function getDemoRankingForDate(date: string) {
  return getDemoRankings('daily', date);
}

export function getDemoQuestionMap() {
  return new Map(getDemoExamQuestions(getDemoExams()[0].id).map((q) => [q.id, q]));
}

export function getDemoQuestionsForAttempt(attemptId: string): Question[] {
  const attempt = getDemoAttemptById(attemptId);
  if (!attempt) return [];
  return getDemoExamQuestions(attempt.exam_id);
}

