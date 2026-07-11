import type { Question } from '@/types/database';
import type { SimuladoMode } from '@/types/simulado';
import {
  ENARE_AREA_WEIGHTS,
  RESIDENCY_AREAS,
  SIMULADO_QUESTION_COUNT,
  type ResidencyArea,
} from '@/lib/question-bank/areas';
import { classifyQuestionArea } from '@/lib/question-bank/classify';
import { filterBank } from '@/lib/question-bank/pool';

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

function pickMultidisciplinary(pool: Question[], count: number): Question[] {
  const used = new Set<string>();
  const byArea = new Map<ResidencyArea, Question[]>();

  for (const question of pool) {
    const area = classifyQuestionArea(question);
    if (!byArea.has(area)) byArea.set(area, []);
    byArea.get(area)!.push(question);
  }

  const areas = shuffle([...byArea.keys()]);
  const selected: Question[] = [];
  let areaIndex = 0;

  while (selected.length < count && areas.length > 0) {
    const area = areas[areaIndex % areas.length];
    const areaPool = byArea.get(area) ?? [];
    const next = areaPool.find((q) => !used.has(q.id));
    if (next) {
      selected.push(next);
      used.add(next.id);
    } else {
      areas.splice(areaIndex % areas.length, 1);
      if (areas.length === 0) break;
      continue;
    }
    areaIndex++;
  }

  if (selected.length < count) {
    selected.push(...sampleUnique(pool, count - selected.length, used));
  }

  return shuffle(selected).slice(0, count);
}

function pickEnareStyle(pool: Question[], count: number): Question[] {
  const used = new Set<string>();
  const selected: Question[] = [];
  const slotsPerArea = Math.floor(count / ENARE_AREA_WEIGHTS.length);

  for (const { area, slots } of ENARE_AREA_WEIGHTS) {
    const areaPool = pool.filter((q) => classifyQuestionArea(q) === area);
    selected.push(...sampleUnique(areaPool, Math.min(slots, slotsPerArea), used));
  }

  if (selected.length < count) {
    selected.push(...sampleUnique(pool, count - selected.length, used));
  }

  return shuffle(selected).slice(0, count);
}

export function buildSimuladoQuestions(options: {
  mode: SimuladoMode;
  area?: string;
  theme?: string;
  wrongQuestionIds?: string[];
  count?: number;
}): Question[] {
  const count = options.count ?? SIMULADO_QUESTION_COUNT;

  if (options.mode === 'revisao_erros') {
    const reviewPool = filterBank({ questionIds: options.wrongQuestionIds });
    if (reviewPool.length === 0) return [];
    return shuffle(reviewPool).slice(0, Math.min(count, reviewPool.length));
  }

  let pool: Question[];

  switch (options.mode) {
    case 'enare':
      pool = filterBank({ mode: 'enare' });
      return pickEnareStyle(pool, count);
    case 'usp':
      pool = filterBank({ mode: 'usp' });
      return pickMultidisciplinary(pool.length >= count ? pool : filterBank({}), count);
    case 'area':
      pool = filterBank({ area: options.area });
      return sampleUnique(pool.length ? pool : filterBank({}), count, new Set());
    case 'tema':
      pool = filterBank({ theme: options.theme });
      return sampleUnique(pool.length ? pool : filterBank({}), count, new Set());
    case 'geral':
    default:
      pool = filterBank({});
      return pickMultidisciplinary(pool, count);
  }
}

export function getSimuladoTitle(mode: SimuladoMode, area?: string, theme?: string): string {
  switch (mode) {
    case 'geral':
      return 'Simulado Geral Multidisciplinar';
    case 'enare':
      return 'Simulado Estilo ENARE';
    case 'usp':
      return 'Simulado Estilo USP';
    case 'area':
      return `Simulado — ${area ?? 'Área'}`;
    case 'tema':
      return `Simulado — ${theme ?? 'Tema'}`;
    case 'revisao_erros':
      return 'Revisão de Questões Erradas';
    default:
      return 'Simulado';
  }
}

export function listAvailableThemes(): string[] {
  const themes = new Set<string>();
  for (const area of RESIDENCY_AREAS) {
    themes.add(area);
  }
  return [...themes];
}
