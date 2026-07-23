import type { Difficulty } from '@/types/database';

export type SrsEntry = {
  dueAt: string;
  intervalDays: number;
  wrongCount: number;
  correctStreak: number;
  lastResult: 'correct' | 'wrong';
  topic: string | null;
  avgConfidence: number | null;
  updatedAt: string;
};

export type TreinoProgressStore = {
  srs: Record<string, SrsEntry>;
  recentQuestionIds: string[];
  topicStats: Record<
    string,
    { correct: number; total: number; timeSum: number; confidenceSum: number; confidenceN: number }
  >;
  weekly: { week: string; correct: number; total: number }[];
  sessions: number;
  confidenceSum: number;
  confidenceN: number;
};

export function emptyTreinoProgress(): TreinoProgressStore {
  return {
    srs: {},
    recentQuestionIds: [],
    topicStats: {},
    weekly: [],
    sessions: 0,
    confidenceSum: 0,
    confidenceN: 0,
  };
}

function weekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function addDaysIso(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/** Revisão espaçada: 1 · 7 · 15 · 30 · 90 dias */
export const SRS_INTERVALS_DAYS = [1, 7, 15, 30, 90] as const;

export function applySrsResult(
  progress: TreinoProgressStore,
  questionId: string,
  correct: boolean,
  topic: string | null,
  timeSpentSeconds?: number,
  confidence?: number | null
): TreinoProgressStore {
  const now = new Date().toISOString();
  const prev = progress.srs[questionId];
  let intervalDays = 1;
  let correctStreak = prev?.correctStreak ?? 0;
  let wrongCount = prev?.wrongCount ?? 0;

  if (correct) {
    correctStreak += 1;
    const idx = Math.min(SRS_INTERVALS_DAYS.length - 1, correctStreak - 1);
    intervalDays = SRS_INTERVALS_DAYS[idx];
  } else {
    wrongCount += 1;
    correctStreak = 0;
    intervalDays = 1;
  }

  const conf =
    confidence != null && confidence >= 1 && confidence <= 5 ? confidence : null;
  const prevConf = prev?.avgConfidence;
  const avgConfidence =
    conf == null
      ? prevConf ?? null
      : prevConf == null
        ? conf
        : Math.round(((prevConf + conf) / 2) * 10) / 10;

  const srs = {
    ...progress.srs,
    [questionId]: {
      dueAt: addDaysIso(intervalDays),
      intervalDays,
      wrongCount,
      correctStreak,
      lastResult: correct ? ('correct' as const) : ('wrong' as const),
      topic,
      avgConfidence,
      updatedAt: now,
    },
  };

  const recent = [questionId, ...progress.recentQuestionIds.filter((id) => id !== questionId)].slice(
    0,
    300
  );

  const topicStats = { ...progress.topicStats };
  if (topic) {
    const cur = topicStats[topic] ?? {
      correct: 0,
      total: 0,
      timeSum: 0,
      confidenceSum: 0,
      confidenceN: 0,
    };
    topicStats[topic] = {
      correct: cur.correct + (correct ? 1 : 0),
      total: cur.total + 1,
      timeSum: cur.timeSum + (timeSpentSeconds ?? 0),
      confidenceSum: cur.confidenceSum + (conf ?? 0),
      confidenceN: cur.confidenceN + (conf != null ? 1 : 0),
    };
  }

  const wk = weekKey();
  const weekly = [...progress.weekly];
  const wi = weekly.findIndex((w) => w.week === wk);
  if (wi >= 0) {
    weekly[wi] = {
      week: wk,
      correct: weekly[wi].correct + (correct ? 1 : 0),
      total: weekly[wi].total + 1,
    };
  } else {
    weekly.push({ week: wk, correct: correct ? 1 : 0, total: 1 });
  }

  return {
    srs,
    recentQuestionIds: recent,
    topicStats,
    weekly: weekly.slice(-12),
    sessions: progress.sessions,
    confidenceSum: progress.confidenceSum + (conf ?? 0),
    confidenceN: progress.confidenceN + (conf != null ? 1 : 0),
  };
}

export function bumpSessionCount(progress: TreinoProgressStore): TreinoProgressStore {
  return { ...progress, sessions: progress.sessions + 1 };
}

export function dueSrsQuestionIds(progress: TreinoProgressStore, now = new Date()): string[] {
  const t = now.getTime();
  return Object.entries(progress.srs)
    .filter(([, e]) => new Date(e.dueAt).getTime() <= t && e.lastResult === 'wrong')
    .sort((a, b) => new Date(a[1].dueAt).getTime() - new Date(b[1].dueAt).getTime())
    .map(([id]) => id);
}

export function computeTreinoStats(progress: TreinoProgressStore) {
  let correct = 0;
  let total = 0;
  let timeSum = 0;
  for (const s of Object.values(progress.topicStats)) {
    correct += s.correct;
    total += s.total;
    timeSum += s.timeSum;
  }

  const accuracy = total > 0 ? Math.round((correct / total) * 1000) / 10 : null;
  const avgSeconds = total > 0 ? Math.round(timeSum / total) : null;
  const avgConfidence =
    progress.confidenceN > 0
      ? Math.round((progress.confidenceSum / progress.confidenceN) * 10) / 10
      : null;

  const worstTopics = Object.entries(progress.topicStats)
    .filter(([, s]) => s.total >= 3)
    .map(([topic, s]) => ({
      topic,
      accuracy: Math.round((s.correct / s.total) * 1000) / 10,
      total: s.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  const hardPenalty = worstTopics[0]?.accuracy != null ? (100 - worstTopics[0].accuracy) * 0.15 : 10;
  const confBoost = avgConfidence != null ? (avgConfidence - 3) * 2 : 0;
  const base = accuracy ?? 40;
  const approvalChance = Math.max(
    5,
    Math.min(95, Math.round(base * 0.85 + 10 - hardPenalty + confBoost))
  );

  return {
    accuracy,
    avgSeconds,
    avgConfidence,
    totalAnswered: total,
    sessions: progress.sessions,
    dueReview: dueSrsQuestionIds(progress).length,
    worstTopics,
    weekly: progress.weekly,
    approvalChance,
  };
}

export function mixDifficulty<T extends { difficulty?: Difficulty | null; statement?: string }>(
  pool: T[],
  count: number
): T[] {
  const facil = pool.filter((q) => q.difficulty === 'facil');
  const medio = pool.filter((q) => q.difficulty === 'medio');
  const dificil = pool.filter((q) => q.difficulty === 'dificil');
  const other = pool.filter((q) => !q.difficulty);
  // "Avançada" (15%): entre as difíceis, prioriza vinhetas mais longas
  const avancado = [...dificil].sort(
    (a, b) => String(b.statement || '').length - String(a.statement || '').length
  );

  // Spec MedRank: 10% fácil · 40% intermediária · 35% difícil · 15% avançada
  const nFacil = Math.max(0, Math.round(count * 0.1));
  const nMedio = Math.max(0, Math.round(count * 0.4));
  const nAvancado = Math.max(0, Math.round(count * 0.15));
  const nDificil = Math.max(0, count - nFacil - nMedio - nAvancado);

  const pick = (arr: T[], n: number) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  };

  let selected = [
    ...pick(facil.length ? facil : other.length ? other : pool, nFacil),
    ...pick(medio.length ? medio : other.length ? other : pool, nMedio),
    ...pick(dificil.length ? dificil : pool, nDificil),
    ...pick(avancado.length ? avancado : dificil.length ? dificil : pool, nAvancado),
  ];

  // Dedup
  const seen = new Set<T>();
  selected = selected.filter((q) => {
    if (seen.has(q)) return false;
    seen.add(q);
    return true;
  });

  if (selected.length < count) {
    selected = selected.concat(
      pick(
        pool.filter((q) => !seen.has(q)),
        count - selected.length
      )
    );
  }

  return selected.slice(0, count);
}
