import { createHash } from 'crypto';

export type BankStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'disabled'
  | 'annulled';

export type QuestionOrigin =
  | 'official'
  | 'original_based_on_exam'
  | 'original'
  | 'guideline';

/** Prioridade na montagem da disputa (menor = primeiro). */
export const ORIGIN_PRIORITY: Record<QuestionOrigin, number> = {
  official: 0,
  original_based_on_exam: 1,
  original: 2,
  guideline: 3,
};

export function statementFingerprint(statement: string): string {
  const norm = String(statement || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return createHash('md5').update(norm).digest('hex');
}

export function isApprovedForDaily(q: {
  bank_status?: string | null;
}): boolean {
  const s = q.bank_status ?? 'approved';
  return s === 'approved';
}

/** Remove pending/rejected/disabled; sem coluna (pré-migration) trata como aprovada. */
export function filterApprovedBank<T extends { bank_status?: string | null }>(pool: T[]): T[] {
  return pool.filter((q) => isApprovedForDaily(q));
}

export function sortByBankPriority<
  T extends { question_origin?: string | null; year?: number | null; created_at?: string },
>(pool: T[]): T[] {
  return [...pool].sort((a, b) => {
    const pa =
      ORIGIN_PRIORITY[(a.question_origin as QuestionOrigin) || 'original'] ?? 9;
    const pb =
      ORIGIN_PRIORITY[(b.question_origin as QuestionOrigin) || 'original'] ?? 9;
    if (pa !== pb) return pa - pb;
    const ya = a.year ?? 0;
    const yb = b.year ?? 0;
    if (ya !== yb) return yb - ya;
    return 0;
  });
}
