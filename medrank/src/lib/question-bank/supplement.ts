import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';

let cache: Question[] | null = null;

export function getSupplementQuestions(): Question[] {
  if (cache) return cache;

  const path = join(process.cwd(), 'data', 'supplement-questions.json');
  if (!existsSync(path)) {
    cache = [];
    return cache;
  }

  const raw = JSON.parse(readFileSync(path, 'utf-8')) as { questions: Question[] };
  cache = raw.questions ?? [];
  return cache;
}
