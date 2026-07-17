import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';

export const NEFROPEDIATRIA_TRACK = 'nefropediatria';
export const NEFROPEDIATRIA_TAGS = ['nefropediatria', 'estilo-SBN', 'estilo-SBNPed', 'treino-sbn'] as const;
export const TREINO_QUESTION_COUNT = 20;
export const TREINO_DURATION_MINUTES = 30;

let cache: Question[] | null = null;

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
