import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';

export const NEFROPEDIATRIA_TRACK = 'nefropediatria';
export const NEFROPEDIATRIA_TAGS = [
  'nefropediatria',
  'estilo-SBN',
  'estilo-SBNPed',
  'treino-sbn',
  'titulo-nefropediatria',
] as const;

export const TREINO_SIZE_OPTIONS = [20, 30, 60] as const;
export type TreinoSize = (typeof TREINO_SIZE_OPTIONS)[number];

/** ~3 min/questão (prova teórica SBN = 60 Q em 3 h) */
export function durationForCount(count: number): number {
  return Math.max(30, count * 3);
}

export const SRS_INTERVALS_DAYS = [1, 7, 30, 90] as const;

let cache: Question[] | null = null;
let topicsCache: string[] | null = null;

export function getNefropediatriaQuestionsFromFile(): Question[] {
  if (cache) return cache;

  const path = join(process.cwd(), 'data', 'nefropediatria-questions.json');
  if (!existsSync(path)) {
    cache = [];
    return cache;
  }

  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions?: Question[] } | Question[];
  cache = Array.isArray(raw) ? raw : (raw.questions ?? []);
  return cache;
}

export function listNefropediatriaTopics(): string[] {
  if (topicsCache) return topicsCache;
  const set = new Set<string>();
  for (const q of getNefropediatriaQuestionsFromFile()) {
    if (q.subtopic) set.add(q.subtopic);
  }
  topicsCache = [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  return topicsCache;
}

export function shufflePick<T>(items: T[], count: number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

export function stripAnswerFields(question: Question): Question {
  return {
    ...question,
    correct_option: 'A',
    explanation: null,
  };
}
