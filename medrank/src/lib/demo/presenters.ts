import type { Ranking } from '@/types/database';
import { getDemoExams, getDemoQuestions, getDemoRankings, getDemoWeeklyChallenges } from '@/lib/demo/content';
import { getExamReadyQuestionBank } from '@/lib/question-bank/pool';
import { getAllDemoAttempts, getDemoAttemptByExam, getDemoAttemptAnswers, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getWeekEnd, getWeekStart, getMonthStart, getMonthEnd } from '@/lib/periods';
import { getTodaysExam, todayDateString, getExamWindowStatus } from '@/lib/exams/release';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
} from '@/lib/exams/ranking-visibility';
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

function computeStreakDays(userId: string): number {
  const examsByDate = new Map(getDemoExams().map((e) => [e.date_available, e.id]));
  const finishedDates = new Set(
    getAllDemoAttempts()
      .filter((a) => a.user_id === userId && a.finished_at && !(a as { forfeited?: boolean }).forfeited)
      .map((a) => {
        for (const [date, examId] of examsByDate) {
          if (examId === a.exam_id) return date;
        }
        return null;
      })
      .filter((d): d is string => !!d)
  );

  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 365; i++) {
    const date = cursor.toISOString().split('T')[0];
    if (finishedDates.has(date)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function withProfileNames(rankings: Ranking[]): (Ranking & { profiles: { name: string } })[] {
  return rankings.map((ranking) => ({
    ...ranking,
    profiles: { name: studentName(ranking.user_id) },
  }));
}

export function getDemoDashboardData(userId = 'guest-student') {
  const todayExam = getTodaysExam(getDemoExams(), new Date());
  const windowPhase = todayExam ? getExamWindowStatus(todayExam) : null;
  const attempt = todayExam ? getDemoAttemptByExam(todayExam.id, userId) : null;
  const hasFinished = Boolean(attempt?.finished_at);
  const allAttempts = getAllDemoAttempts().filter((a) => !a.id.startsWith('seed-'));
  const finishedToday = todayExam
    ? countFinishedAttempts(allAttempts, todayExam.id)
    : 0;
  const activeStudents = countActiveStudents();
  const allGroupFinished = Boolean(todayExam) && finishedToday >= activeStudents;
  const showRanking = canStudentSeeTodayRanking(todayExam, hasFinished, { allGroupFinished });
  const rankingDate = getTodayRankingDate();
  const { rankings: todayRankings } = showRanking
    ? getDemoRanking('daily', rankingDate)
    : { rankings: [] };

  const streakDays = computeStreakDays(userId);

  return {
    todayExam,
    attempt,
    todayRankings,
    windowPhase,
    showRanking,
    rankingDate,
    finishedToday,
    streakDays,
  };
}

export function getDemoAdminExamStatus() {
  const today = todayDateString();
  const exams = getDemoExams();
  const todayExam = getTodaysExam(exams, new Date());
  const attempts = getAllDemoAttempts().filter((a) => !a.id.startsWith('seed-'));
  const finishedCount = todayExam ? countFinishedAttempts(attempts, todayExam.id) : 0;
  const activeStudents = countActiveStudents();
  const rankingReady = todayExam ? isRankingVisibleToTeachers(todayExam, attempts, new Date()) : false;
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

export function getDemoRanking(
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'general',
  rankingDate?: string
) {
  const today = todayDateString();
  const date = rankingDate ?? today;
  const attempts = getAllDemoAttempts().filter((a) => !a.id.startsWith('seed-'));
  const resolved =
    period === 'yearly' || period === 'quarterly' ? 'general' : period;

  let rankings: Ranking[];
  if (resolved === 'daily') {
    const exam = getDemoExams().find((e) => e.date_available === date);
    if (exam) {
      const real = buildExamRankings(attempts, exam);
      rankings = real.length > 0 ? real : getDemoRankings('daily', date);
    } else {
      rankings = getDemoRankings('daily', date);
    }
  } else {
    rankings = getDemoRankings(resolved, today);
  }

  const rankingsWithNames = withProfileNames(rankings);
  const now = new Date();
  const qMonth = Math.floor(now.getUTCMonth() / 3) * 3;
  const bounds = {
    daily: { start: date, end: date, label: date === today ? 'Hoje' : `Dia ${date}` },
    weekly: { start: getWeekStart(now), end: getWeekEnd(now), label: 'Semana atual' },
    monthly: { start: getMonthStart(now), end: getMonthEnd(now), label: 'Mês atual' },
    quarterly: {
      start: getMonthStart(new Date(Date.UTC(now.getUTCFullYear(), qMonth, 1))),
      end: getMonthEnd(new Date(Date.UTC(now.getUTCFullYear(), qMonth + 2, 1))),
      label: 'Trimestre atual',
    },
    yearly: {
      start: `${now.getUTCFullYear()}-01-01`,
      end: `${now.getUTCFullYear()}-12-31`,
      label: 'Ano atual',
    },
    general: { start: '2026-07-09', end: today, label: 'Geral' },
  }[period];
  return { rankings: rankingsWithNames, bounds };
}

export function getDemoReportData() {
  const { rankings } = getDemoRanking('weekly');
  return {
    questionCount: getExamReadyQuestionBank().length,
    examCount: getDemoExams().length,
    rankings,
    challenges: getDemoWeeklyChallenges(),
  };
}
