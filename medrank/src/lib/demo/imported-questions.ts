import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { Question } from '@/types/database';

interface ImportedQuestionBank {
  meta: {
    total: number;
    sources: string[];
  };
  questions: Question[];
}

let cache: Question[] | null = null;

export function getImportedQuestions(): Question[] {
  if (cache) return cache;

  const bankPath = join(process.cwd(), 'data', 'imported-questions.json');
  if (!existsSync(bankPath)) {
    cache = [];
    return cache;
  }

  const raw = JSON.parse(readFileSync(bankPath, 'utf-8')) as ImportedQuestionBank;
  cache = raw.questions ?? [];
  return cache;
}

export function getImportedQuestionBankMeta() {
  const bankPath = join(process.cwd(), 'data', 'imported-questions.json');
  if (!existsSync(bankPath)) {
    return { total: 0, sources: [] as string[] };
  }

  const raw = JSON.parse(readFileSync(bankPath, 'utf-8')) as ImportedQuestionBank;
  return raw.meta ?? { total: raw.questions?.length ?? 0, sources: [] };
}
