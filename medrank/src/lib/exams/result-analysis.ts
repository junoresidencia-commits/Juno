import type { Question } from '@/types/database';
import { classifyQuestionArea } from '@/lib/question-bank/classify';
import type { ResidencyArea } from '@/lib/question-bank/areas';

export type AreaPerformance = {
  area: ResidencyArea;
  correct: number;
  total: number;
  percentage: number;
};

export type ResultInsights = {
  byArea: AreaPerformance[];
  weakestAreas: AreaPerformance[];
  averageScore: number | null;
  pointsToFirst: number | null;
  leaderScore: number | null;
  finishedToday: number;
};

export function analyzeAttemptByArea(
  rows: { question: Question; isCorrect: boolean }[]
): AreaPerformance[] {
  const map = new Map<ResidencyArea, { correct: number; total: number }>();

  for (const { question, isCorrect } of rows) {
    const area = classifyQuestionArea(question);
    const current = map.get(area) ?? { correct: 0, total: 0 };
    current.total += 1;
    if (isCorrect) current.correct += 1;
    map.set(area, current);
  }

  return [...map.entries()]
    .map(([area, stats]) => ({
      area,
      correct: stats.correct,
      total: stats.total,
      percentage: stats.total ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

export function buildResultInsights(options: {
  rows: { question: Question; isCorrect: boolean }[];
  userScore: number;
  rankings: { position: number | null; total_score: number; user_id: string }[];
  userId: string;
  finishedToday: number;
}): ResultInsights {
  const byArea = analyzeAttemptByArea(options.rows);
  const weakestAreas = [...byArea].filter((a) => a.total > 0).sort((a, b) => a.percentage - b.percentage).slice(0, 2);

  const scores = options.rankings.map((r) => r.total_score);
  const averageScore = scores.length
    ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
    : null;

  const leader = options.rankings.find((r) => r.position === 1);
  const leaderScore = leader?.total_score ?? null;
  const pointsToFirst =
    leader && leader.user_id !== options.userId
      ? Math.max(0, leader.total_score - options.userScore)
      : null;

  return {
    byArea,
    weakestAreas,
    averageScore,
    pointsToFirst,
    leaderScore,
    finishedToday: options.finishedToday,
  };
}
