import type { Question } from '@/types/database';
import { classifyQuestionArea } from '@/lib/question-bank/classify';
import { ENARE_AREA_WEIGHTS, type ResidencyArea } from '@/lib/question-bank/areas';

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

/** Sorteio diário equilibrado por área (estilo ENARE) */
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
  const weights = ENARE_AREA_WEIGHTS.length > 0 ? ENARE_AREA_WEIGHTS : [{ area: 'Clínica Médica' as ResidencyArea, slots: count }];

  for (const { area, slots } of weights) {
    const areaPool = seededShuffle(byArea.get(area) ?? [], seed + area.length);
    selected.push(...sampleUnique(areaPool, Math.min(slots, Math.ceil(count / weights.length)), used));
  }

  if (selected.length < count) {
    const rest = seededShuffle(pool.filter((q) => !used.has(q.id)), seed + 99);
    selected.push(...rest.slice(0, count - selected.length));
  }

  return seededShuffle(selected, seed + 7).slice(0, count);
}
