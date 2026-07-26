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

/** Ano mínimo de provas oficiais/universidade na disputa diária. */
export const MIN_OFFICIAL_EXAM_YEAR = 2024;

/**
 * Preferência de ano nas provas criadas:
 * 2026 → 2025 → 2024 → demais (lotes MedRank sem ano ficam no meio da fila).
 * Menor = mais preferido.
 */
export function yearPreferenceRank(year: number | null | undefined): number {
  if (year === 2026) return 0;
  if (year === 2025) return 1;
  if (year === 2024) return 2;
  if (typeof year === 'number' && year > 2026) return 0; // futuro
  if (typeof year === 'number' && year >= MIN_OFFICIAL_EXAM_YEAR) return 3;
  if (year == null) return 4; // lotes MedRank / sem ano
  return 10 + (MIN_OFFICIAL_EXAM_YEAR - year); // antigas: bem atrás
}

export function isMedRankLotQuestion(q: {
  lote_importacao?: string | null;
  import_batch_id?: string | null;
  tags?: string[] | null;
}): boolean {
  const c = String(q.lote_importacao || '');
  if (
    c.startsWith('MEDRANK_AUTORAL_2026_LOTE_') ||
    c.startsWith('MEDRANK_NEFRO_NEFROPED_2026_LOTE_') ||
    c.startsWith('MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_')
  ) {
    return true;
  }
  const tags = q.tags ?? [];
  return tags.some((t) => /^medrank-lote-/i.test(String(t)));
}

/** Bancos novos (Mestre / Adicional) — preferidos na disputa diária. */
export function isPremiumBankQuestion(q: {
  lote_importacao?: string | null;
  tags?: string[] | null;
}): boolean {
  const c = String(q.lote_importacao || '');
  if (c.includes('BANCO_MESTRE') || c.includes('BANCO_ADICIONAL')) return true;
  const tags = q.tags ?? [];
  return tags.includes('banco-mestre') || tags.includes('banco-adicional');
}

/** Menor = mais preferido (Mestre → Adicional → outros). */
export function premiumBankRank(q: {
  lote_importacao?: string | null;
  tags?: string[] | null;
}): number {
  const c = String(q.lote_importacao || '');
  const tags = q.tags ?? [];
  if (c.includes('BANCO_MESTRE') || tags.includes('banco-mestre')) return 0;
  if (c.includes('BANCO_ADICIONAL') || tags.includes('banco-adicional')) return 1;
  return 9;
}

export function isOfficialOrigin(q: {
  question_origin?: string | null;
  tags?: string[] | null;
  source?: string | null;
}): boolean {
  if (q.question_origin === 'official') return true;
  const tags = q.tags ?? [];
  if (tags.includes('official') || tags.includes('real')) return true;
  const src = String(q.source || '').toLowerCase();
  return (
    src === 'enare' ||
    src === 'revalida' ||
    src.includes('usp') ||
    src.includes('unicamp') ||
    src.includes('unesp') ||
    src.includes('ufmg') ||
    src.includes('ufrj')
  );
}

/** Oficiais/universidade com ano antigo demais — fora da disputa. */
export function isStaleOfficial(q: {
  question_origin?: string | null;
  tags?: string[] | null;
  source?: string | null;
  year?: number | null;
}): boolean {
  if (!isOfficialOrigin(q)) return false;
  if (typeof q.year !== 'number') return false;
  return q.year < MIN_OFFICIAL_EXAM_YEAR;
}

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

/**
 * Ordena o pool da disputa:
 * 1) Banco Mestre / Adicional (provas novas)
 * 2) demais lotes MedRank
 * 3) oficiais/universidade recentes (2026 → 2025 → 2024)
 * 4) demais originais
 * Oficiais &lt; 2024 ficam no fim (e devem ser filtrados antes).
 */
export function sortByBankPriority<
  T extends {
    question_origin?: string | null;
    year?: number | null;
    created_at?: string;
    lote_importacao?: string | null;
    tags?: string[] | null;
    source?: string | null;
  },
>(pool: T[]): T[] {
  return [...pool].sort((a, b) => {
    const aOfficial = isOfficialOrigin(a);
    const bOfficial = isOfficialOrigin(b);
    const aLot = isMedRankLotQuestion(a);
    const bLot = isMedRankLotQuestion(b);
    const aPremium = isPremiumBankQuestion(a);
    const bPremium = isPremiumBankQuestion(b);

    // Bucket: premium (0) > lote MedRank (1) > official recente (2) > outro (3+) > official velho (9)
    const bucket = (q: T, official: boolean, lot: boolean, premium: boolean) => {
      if (premium) return 0;
      if (lot) return 1;
      if (official && !isStaleOfficial(q)) return 2;
      if (official && isStaleOfficial(q)) return 9;
      const origin =
        ORIGIN_PRIORITY[(q.question_origin as QuestionOrigin) || 'original'] ?? 9;
      return 3 + Math.min(origin, 3);
    };

    const ba = bucket(a, aOfficial, aLot, aPremium);
    const bb = bucket(b, bOfficial, bLot, bPremium);
    if (ba !== bb) return ba - bb;

    if (aPremium || bPremium) {
      const pa = premiumBankRank(a);
      const pb = premiumBankRank(b);
      if (pa !== pb) return pa - pb;
    }

    const ya = yearPreferenceRank(a.year);
    const yb = yearPreferenceRank(b.year);
    if (ya !== yb) return ya - yb;

    if (aLot !== bLot) return aLot ? -1 : 1;
    if (aOfficial !== bOfficial) return aOfficial ? -1 : 1;
    return 0;
  });
}
