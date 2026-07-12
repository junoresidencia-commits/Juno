import type { Question } from '@/types/database';
import type { SimuladoMode } from '@/types/simulado';
import {
  RESIDENCY_AREAS,
  SIMULADO_QUESTION_COUNT,
} from '@/lib/question-bank/areas';
import { classifyQuestionArea } from '@/lib/question-bank/classify';
import { filterBank } from '@/lib/question-bank/pool';
import { pickDailyExamQuestions } from '@/lib/question-bank/daily-selection';
import { getMixedDisputeDescription, normalizeQuestionForDispute } from '@/lib/question-bank/presentation';

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleUnique(pool: Question[], count: number, used: Set<string>): Question[] {
  const available = shuffle(pool.filter((q) => !used.has(q.id)));
  const picked = available.slice(0, count);
  picked.forEach((q) => used.add(q.id));
  return picked;
}

function pickMixedDispute(pool: Question[], count: number, seed: number): Question[] {
  return pickDailyExamQuestions(pool, count, seed).map(normalizeQuestionForDispute);
}

export function buildSimuladoQuestions(options: {
  mode: SimuladoMode;
  area?: string;
  theme?: string;
  wrongQuestionIds?: string[];
  count?: number;
  seed?: number;
}): Question[] {
  const count = options.count ?? SIMULADO_QUESTION_COUNT;
  const seed = options.seed ?? Date.now();

  if (options.mode === 'revisao_erros') {
    const reviewPool = filterBank({ questionIds: options.wrongQuestionIds });
    if (reviewPool.length === 0) return [];
    return shuffle(reviewPool)
      .slice(0, Math.min(count, reviewPool.length))
      .map(normalizeQuestionForDispute);
  }

  let pool: Question[];

  switch (options.mode) {
    case 'enare':
    case 'usp':
    case 'geral':
      pool = filterBank({});
      return pickMixedDispute(pool, count, seed);
    case 'area':
      pool = filterBank({ area: options.area });
      return sampleUnique(pool.length ? pool : filterBank({}), count, new Set()).map(
        normalizeQuestionForDispute
      );
    case 'tema':
      pool = filterBank({ theme: options.theme });
      return sampleUnique(pool.length ? pool : filterBank({}), count, new Set()).map(
        normalizeQuestionForDispute
      );
    default:
      pool = filterBank({});
      return pickMixedDispute(pool, count, seed);
  }
}

export function getSimuladoTitle(mode: SimuladoMode, area?: string, theme?: string): string {
  switch (mode) {
    case 'geral':
    case 'enare':
    case 'usp':
      return 'Disputa mista';
    case 'area':
      return `Disputa — ${area ?? 'Área'}`;
    case 'tema':
      return `Disputa — ${theme ?? 'Tema'}`;
    case 'revisao_erros':
      return 'Revisão de questões erradas';
    default:
      return 'Disputa';
  }
}

export function getSimuladoDescription(mode: SimuladoMode): string {
  if (mode === 'geral' || mode === 'enare' || mode === 'usp') {
    return getMixedDisputeDescription();
  }
  if (mode === 'revisao_erros') {
    return 'Somente questões que você errou em disputas anteriores.';
  }
  return '20 questões para treino focado.';
}

export function listAvailableThemes(): string[] {
  const themes = new Set<string>();
  for (const area of RESIDENCY_AREAS) {
    themes.add(area);
  }
  return [...themes];
}
