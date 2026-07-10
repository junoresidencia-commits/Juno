import type { Exam, Ranking } from '@/types/database';
import type { Attempt } from '@/types/database';
import { calculateRankingScore } from '@/lib/utils';
import { getMonthEnd, getMonthStart, getWeekEnd, getWeekStart } from '@/lib/periods';
import { listDemoStudents } from '@/lib/demo-store';
import { isExamWindowClosed } from '@/lib/exams/release';

export function countActiveStudents(): number {
  const active = listDemoStudents().filter((s) => s.active).length;
  return active > 0 ? active : 1;
}

export function countFinishedAttempts(attempts: Attempt[], examId: string): number {
  return attempts.filter((a) => a.exam_id === examId && a.finished_at).length;
}

export function allStudentsFinished(attempts: Attempt[], exam: Exam): boolean {
  const activeStudents = countActiveStudents();
  if (activeStudents === 0) return false;
  return countFinishedAttempts(attempts, exam.id) >= activeStudents;
}

export function isRankingVisibleToTeachers(exam: Exam, attempts: Attempt[], now = new Date()): boolean {
  if (exam.ranking_release === 'immediate') return true;
  if (exam.ranking_release === 'after_window') {
    return isExamWindowClosed(exam, now);
  }
  return allStudentsFinished(attempts, exam);
}

export function buildExamRankings(
  attempts: Attempt[],
  exam: Exam
): Ranking[] {
  const finished = attempts
    .filter((a) => a.exam_id === exam.id && a.finished_at && a.score != null)
    .sort((a, b) => {
      if (b.total_correct !== a.total_correct) return b.total_correct - a.total_correct;
      if ((a.duration_seconds ?? 0) !== (b.duration_seconds ?? 0)) {
        return (a.duration_seconds ?? 0) - (b.duration_seconds ?? 0);
      }
      return (b.score ?? 0) - (a.score ?? 0);
    });

  return finished.map((attempt, index) => ({
    id: `exam-rank-${exam.id}-${attempt.user_id}`,
    user_id: attempt.user_id,
    period_type: 'daily' as const,
    period_start: exam.date_available,
    period_end: exam.date_closes,
    total_score: attempt.score ?? 0,
    total_correct: attempt.total_correct,
    total_questions: attempt.total_questions ?? exam.total_questions,
    average_percentage: attempt.percentage ?? 0,
    total_time_seconds: attempt.duration_seconds ?? 0,
    streak_days: 0,
    position: index + 1,
  }));
}

export function buildPeriodRankings(
  attempts: Attempt[],
  period: 'daily' | 'weekly' | 'monthly' | 'general',
  date: string
): Ranking[] {
  const ref = new Date(`${date}T12:00:00`);
  const bounds = {
    daily: { start: date, end: date },
    weekly: { start: getWeekStart(ref), end: getWeekEnd(ref) },
    monthly: { start: getMonthStart(ref), end: getMonthEnd(ref) },
    general: { start: '2026-07-09', end: date },
  }[period];

  const byUser: Record<string, { correct: number; total: number; time: number; scores: number[] }> = {};

  for (const attempt of attempts) {
    if (!attempt.finished_at) continue;
    const examDate = attempt.started_at.split('T')[0];
    if (examDate < bounds.start || examDate > bounds.end) continue;

    byUser[attempt.user_id] ??= { correct: 0, total: 0, time: 0, scores: [] };
    byUser[attempt.user_id].correct += attempt.total_correct;
    byUser[attempt.user_id].total += attempt.total_questions ?? 0;
    byUser[attempt.user_id].time += attempt.duration_seconds ?? 0;
    byUser[attempt.user_id].scores.push(attempt.score ?? 0);
  }

  const rows = Object.entries(byUser).map(([userId, stats]) => ({
    userId,
    totalScore: stats.scores.reduce((a, b) => a + b, 0),
    totalCorrect: stats.correct,
    totalQuestions: stats.total,
    averagePercentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 1000) / 10 : 0,
    totalTime: stats.time,
  }));

  rows.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return a.totalTime - b.totalTime;
  });

  return rows.map((row, index) => ({
    id: `period-${period}-${row.userId}`,
    user_id: row.userId,
    period_type: period,
    period_start: bounds.start,
    period_end: bounds.end,
    total_score: row.totalScore,
    total_correct: row.totalCorrect,
    total_questions: row.totalQuestions,
    average_percentage: row.averagePercentage,
    total_time_seconds: row.totalTime,
    streak_days: 0,
    position: index + 1,
  }));
}

export function aggregateAttemptScore(
  totalCorrect: number,
  totalQuestions: number,
  durationSeconds: number
): number {
  return calculateRankingScore(totalCorrect, totalQuestions, durationSeconds);
}
