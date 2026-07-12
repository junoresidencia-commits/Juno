import type { Question } from '@/types/database';
import { classifyQuestionArea } from '@/lib/question-bank/classify';
import { ENARE_AREA_WEIGHTS, type ResidencyArea } from '@/lib/question-bank/areas';
import { getQuestionPoolKey } from '@/lib/question-bank/presentation';

/** Embaralhamento determinístico por semente (mesma prova = mesmas questões) */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  let state = Math.abs(seed) || 1;
  const rand = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleUnique(pool: Question[], count: number, used: Set<string>): Question[] {
  const available = pool.filter((q) => !used.has(q.id));
  const picked = available.slice(0, count);
  picked.forEach((q) => used.add(q.id));
  return picked;
}

function groupBy<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return map;
}

/** Garante variedade de anos e “pools” de prova na disputa diária. */
function diversifyByYearAndPool(
  pool: Question[],
  count: number,
  used: Set<string>,
  seed: number
): Question[] {
  const available = pool.filter((q) => !used.has(q.id));
  if (available.length === 0) return [];

  const byYear = groupBy(available, (q) => String(q.year ?? 'sem-ano'));
  const years = seededShuffle([...byYear.keys()], seed + 11);
  const picked: Question[] = [];
  let yearIndex = 0;

  while (picked.length < count && years.length > 0) {
    const year = years[yearIndex % years.length];
    const yearPool = seededShuffle(byYear.get(year) ?? [], seed + yearIndex);
    const byPool = groupBy(yearPool, (q) => getQuestionPoolKey(q, seed));
    const pools = seededShuffle([...byPool.keys()], seed + yearIndex + 3);

    let added = false;
    for (const poolKey of pools) {
      const next = byPool.get(poolKey)?.find((q) => !used.has(q.id));
      if (!next) continue;
      picked.push(next);
      used.add(next.id);
      added = true;
      if (picked.length >= count) break;
    }

    if (!added) {
      years.splice(yearIndex % years.length, 1);
      if (years.length === 0) break;
      continue;
    }
    yearIndex++;
  }

  return picked;
}

/** Sorteio diário equilibrado por área, com mistura de provas e anos. */
export function pickDailyExamQuestions(pool: Question[], count: number, seed: number): Question[] {
  if (pool.length === 0) return [];
  if (pool.length <= count) {
    return seededShuffle(pool, seed).slice(0, count);
  }

  const used = new Set<string>();
  const byArea = new Map<ResidencyArea, Question[]>();
  for (const question of pool) {
    const area = classifyQuestionArea(question);
    if (!byArea.has(area)) byArea.set(area, []);
    byArea.get(area)!.push(question);
  }

  for (const [, areaPool] of byArea) {
    areaPool.sort((a, b) => a.id.localeCompare(b.id));
  }

  const selected: Question[] = [];
  const weights =
    ENARE_AREA_WEIGHTS.length > 0
      ? ENARE_AREA_WEIGHTS
      : [{ area: 'Clínica Médica' as ResidencyArea, slots: count }];

  for (const { area, slots } of weights) {
    const areaPool = seededShuffle(byArea.get(area) ?? [], seed + area.length);
    const areaPicked = diversifyByYearAndPool(
      areaPool,
      Math.min(slots, Math.ceil(count / weights.length)),
      used,
      seed + area.length * 7
    );
    selected.push(...areaPicked);
  }

  if (selected.length < count) {
    const rest = diversifyByYearAndPool(
      pool.filter((q) => !used.has(q.id)),
      count - selected.length,
      used,
      seed + 99
    );
    selected.push(...rest);
  }

  if (selected.length < count) {
    const fallback = seededShuffle(pool.filter((q) => !used.has(q.id)), seed + 199);
    selected.push(...sampleUnique(fallback, count - selected.length, used));
  }

  return seededShuffle(selected, seed + 7).slice(0, count);
}
