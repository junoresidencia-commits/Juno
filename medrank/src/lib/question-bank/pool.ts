import type { Question } from '@/types/database';
import { getImportedQuestions } from '@/lib/demo/imported-questions';
import { getDemoCustomQuestions } from '@/lib/demo-store';
import { getSupplementQuestions } from '@/lib/question-bank/supplement';
import { classifyQuestionArea, isEnareStyleQuestion, isUspStyleQuestion } from '@/lib/question-bank/classify';
import type { ResidencyArea } from '@/lib/question-bank/areas';
import type { QuestionBankStats } from '@/types/simulado';

let cache: Question[] | null = null;

function mergeQuestionBank(): Question[] {
  const base = [...getImportedQuestions(), ...getDemoCustomQuestions(), ...getSupplementQuestions()];
  const seen = new Set<string>();
  const merged: Question[] = [];

  for (const question of base) {
    const key = question.statement.slice(0, 100).toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(question);
  }

  return merged;
}

export function getQuestionBank(): Question[] {
  if (!cache) {
    cache = mergeQuestionBank();
  }
  return cache;
}

export function getQuestionById(id: string): Question | undefined {
  return getQuestionBank().find((q) => q.id === id);
}

export function getQuestionsByArea(area: ResidencyArea): Question[] {
  return getQuestionBank().filter((q) => classifyQuestionArea(q) === area);
}

export function getQuestionBankStats(): QuestionBankStats {
  const bank = getQuestionBank();
  const byAreaMap = new Map<string, number>();

  for (const question of bank) {
    const area = classifyQuestionArea(question);
    byAreaMap.set(area, (byAreaMap.get(area) ?? 0) + 1);
  }

  const years = bank.map((q) => q.year).filter((y): y is number => y != null);
  const sources = [...new Set(bank.map((q) => q.source).filter(Boolean) as string[])];

  return {
    total: bank.length,
    byArea: [...byAreaMap.entries()]
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count),
    sources,
    yearRange: years.length ? [Math.min(...years), Math.max(...years)] : null,
  };
}

export function filterBank(options: {
  mode?: 'enare' | 'usp' | 'area' | 'tema' | 'revisao';
  area?: string;
  theme?: string;
  questionIds?: string[];
}): Question[] {
  let pool = getQuestionBank();

  if (options.questionIds?.length) {
    const idSet = new Set(options.questionIds);
    pool = pool.filter((q) => idSet.has(q.id));
    return pool;
  }

  if (options.mode === 'enare') {
    pool = pool.filter((q) => isEnareStyleQuestion(q) || !isUspStyleQuestion(q));
  }

  if (options.mode === 'usp') {
    const usp = pool.filter((q) => isUspStyleQuestion(q));
    pool = usp.length >= 20 ? usp : pool;
  }

  if (options.area) {
    pool = pool.filter((q) => classifyQuestionArea(q) === options.area);
  }

  if (options.theme) {
    const theme = options.theme.toLowerCase();
    pool = pool.filter(
      (q) =>
        q.topic?.toLowerCase().includes(theme) ||
        q.subtopic?.toLowerCase().includes(theme) ||
        q.tags?.some((t) => t.toLowerCase().includes(theme))
    );
  }

  return pool;
}

export function invalidateQuestionBankCache() {
  cache = null;
}
