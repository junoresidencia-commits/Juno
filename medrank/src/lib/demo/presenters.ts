import type { Ranking, WeeklyChallenge } from '@/types/database';
import { getDemoExams, getDemoQuestions, getDemoRankings, getDemoWeeklyChallenges } from '@/lib/demo/content';
import { getAllDemoAttempts, getDemoAttemptByExam, getDemoAttemptById, getDemoAttemptAnswers, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getWeekEnd, getWeekStart, getMonthStart, getMonthEnd } from '@/lib/periods';

export function getDemoDashboardData() {
  const today = new Date().toISOString().split('T')[0];
  const exams = getDemoExams();
  const todayExam = exams.find((exam) => exam.date_available === today) ?? exams[0];
  const attempt = todayExam ? getDemoAttemptByExam(todayExam.id) : null;
  const rankings = getDemoRankings('daily', todayExam?.date_available ?? today);
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

  return { todayExam, attempt, rankings, streak, challenges };
}

export function getDemoPerformanceByTopic() {
  const attempts = getAllDemoAttempts().filter((a) => a.finished_at);
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
    .filter((attempt) => attempt.finished_at)
    .map((attempt) => ({
      ...attempt,
      exams: exams.get(attempt.exam_id),
    }))
    .sort((a, b) => (b.finished_at ?? '').localeCompare(a.finished_at ?? ''));
}

export function getDemoRanking(period: 'daily' | 'weekly' | 'monthly' | 'general') {
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const rankings = getDemoRankings(period, date).map((ranking) => ({
    ...ranking,
    profiles: { name: ranking.user_id === 'guest-student' ? 'Você' : ({
      r1: 'Larissa', r2: 'Mateus', r4: 'Helena', r5: 'Daniel',
    } as Record<string, string>)[ranking.user_id] ?? 'Aluno' },
  }));
  const bounds = {
    daily: { start: date, end: date },
    weekly: { start: getWeekStart(today), end: getWeekEnd(today) },
    monthly: { start: getMonthStart(today), end: getMonthEnd(today) },
    general: { start: '2026-07-09', end: date },
  }[period];
  return { rankings, bounds };
}

export function getDemoReportData() {
  const rankings = getDemoRankings('weekly');
  return {
    questionCount: getDemoQuestions().length,
    examCount: getDemoExams().length,
    rankings,
    challenges: getDemoWeeklyChallenges(),
  };
}

