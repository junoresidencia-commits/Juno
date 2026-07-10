import type { Ranking } from '@/types/database';
import { getDemoExams, getDemoQuestions, getDemoRankings, getDemoWeeklyChallenges } from '@/lib/demo/content';
import { getAllDemoAttempts, getDemoAttemptByExam, getDemoAttemptAnswers, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getWeekEnd, getWeekStart, getMonthStart, getMonthEnd } from '@/lib/periods';
import { getTodaysExam, todayDateString } from '@/lib/exams/release';
import { buildExamRankings, isRankingVisibleToTeachers, countFinishedAttempts, countActiveStudents } from '@/lib/exams/ranking';
import { listDemoStudents } from '@/lib/demo-store';

const DEMO_NAMES: Record<string, string> = {
  'guest-student': 'Você',
  r1: 'Larissa',
  r2: 'Mateus',
  r4: 'Helena',
  r5: 'Daniel',
};

function studentName(userId: string): string {
  const student = listDemoStudents().find((s) => s.id === userId);
  if (student) return student.name;
  return DEMO_NAMES[userId] ?? 'Aluno';
}

function withProfileNames(rankings: Ranking[]): (Ranking & { profiles: { name: string } })[] {
  return rankings.map((ranking) => ({
    ...ranking,
    profiles: { name: studentName(ranking.user_id) },
  }));
}

export function getDemoDashboardData(userId = 'guest-student') {
  const today = todayDateString();
  const todayExam = getTodaysExam(getDemoExams(), today);
  const attempt = todayExam ? getDemoAttemptByExam(todayExam.id, userId) : null;
  const streak = { current_streak: 7 };
  const challenges = getDemoWeeklyChallenges().map((challenge) => ({
    challenge,
    currentValue:
      challenge.challenge_type === 'min_exams' ? 3 :
      challenge.challenge_type === 'min_accuracy' ? 78 :
      72,
    completed: false,
    description: challenge.description ?? '',
  }));

  return { todayExam, attempt, streak, challenges };
}

export function getDemoAdminExamStatus() {
  const today = todayDateString();
  const exams = getDemoExams();
  const todayExam = getTodaysExam(exams, today);
  const attempts = getAllDemoAttempts().filter((a) => !a.id.startsWith('seed-'));
  const finishedCount = todayExam ? countFinishedAttempts(attempts, todayExam.id) : 0;
  const activeStudents = countActiveStudents();
  const rankingReady = todayExam ? isRankingVisibleToTeachers(todayExam, attempts, today) : false;
  const rankings = todayExam && rankingReady
    ? withProfileNames(buildExamRankings(attempts, todayExam))
    : withProfileNames(getDemoRankings('daily', today));

  return {
    todayExam,
    finishedCount,
    activeStudents,
    rankingReady,
    rankings,
  };
}

export function getDemoPerformanceByTopic() {
  const attempts = getAllDemoAttempts().filter((a) => a.finished_at && !a.id.startsWith('seed-'));
  const byTopic: Record<string, { correct: number; total: number }> = {};

  for (const attempt of attempts) {
    const answers = getDemoAttemptAnswers(attempt.id);
    const questions = new Map(getDemoQuestionsForAttempt(attempt.id).map((q) => [q.id, q]));
    for (const answer of answers) {
      const question = questions.get(answer.question_id);
      const topic = question?.topic ?? 'Sem tema';
      byTopic[topic] ??= { correct: 0, total: 0 };
      byTopic[topic].total += 1;
      if (answer.is_correct) byTopic[topic].correct += 1;
    }
  }

  return Object.entries(byTopic).sort(([, a], [, b]) => a.correct / a.total - b.correct / b.total);
}

export function getDemoHistory() {
  const exams = new Map(getDemoExams().map((e) => [e.id, e]));
  return getAllDemoAttempts()
    .filter((attempt) => attempt.finished_at && !attempt.id.startsWith('seed-'))
    .map((attempt) => ({
      ...attempt,
      exams: exams.get(attempt.exam_id),
    }))
    .sort((a, b) => (b.finished_at ?? '').localeCompare(a.finished_at ?? ''));
}

export function getDemoRanking(period: 'daily' | 'weekly' | 'monthly' | 'general') {
  const today = todayDateString();
  const attempts = getAllDemoAttempts().filter((a) => !a.id.startsWith('seed-'));
  const todayExam = getTodaysExam(getDemoExams(), today);

  let rankings: Ranking[];
  if (period === 'daily' && todayExam) {
    const real = buildExamRankings(attempts, todayExam);
    rankings = real.length > 0 ? real : getDemoRankings('daily', today);
  } else {
    rankings = getDemoRankings(period, today);
  }

  const rankingsWithNames = withProfileNames(rankings);
  const bounds = {
    daily: { start: today, end: today, label: 'Hoje' },
    weekly: { start: getWeekStart(new Date()), end: getWeekEnd(new Date()), label: 'Semana atual' },
    monthly: { start: getMonthStart(new Date()), end: getMonthEnd(new Date()), label: 'Mês atual' },
    general: { start: '2026-07-09', end: today, label: 'Geral' },
  }[period];
  return { rankings: rankingsWithNames, bounds };
}

export function getDemoReportData() {
  const { rankings } = getDemoRanking('weekly');
  return {
    questionCount: getDemoQuestions().length,
    examCount: getDemoExams().length,
    rankings,
    challenges: getDemoWeeklyChallenges(),
  };
}
