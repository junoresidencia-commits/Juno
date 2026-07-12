import type { Question } from '@/types/database';

/** Instituições usadas só para variar o sorteio interno — não exibidas ao aluno. */
export const MIXED_EXAM_POOLS = [
  'USP',
  'UNIFESP',
  'Unicamp',
  'UFRJ',
  'UFMG',
  'SUS-SP',
  'AMRIGS',
  'UFPR',
  'UFRGS',
  'HC-FMUSP',
  'ENARE',
] as const;

const OFFICIAL_GABARITO_ENARE =
  /gabarito oficial\s*enare[^.]*\.?\s*(prova pública ebserh\/aocp\.?)?/gi;

const ENARE_BRANDING = /\benare\b/gi;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

/** Remove menções ao ENARE em comentários exibidos ao aluno. */
export function sanitizeExplanation(explanation: string | null | undefined): string | null {
  if (!explanation?.trim()) return null;
  const cleaned = explanation
    .replace(OFFICIAL_GABARITO_ENARE, '')
    .replace(ENARE_BRANDING, 'prova pública')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return cleaned || null;
}

/** Rótulo interno para equilibrar variedade no sorteio (não mostrado na prova). */
export function getQuestionPoolKey(question: Question, seed = 0): string {
  const hash = hashString(`${question.id}:${seed}`);
  return MIXED_EXAM_POOLS[hash % MIXED_EXAM_POOLS.length];
}

export function getDailyExamTitle(dayNumber: number): string {
  return `Disputa do dia ${dayNumber}`;
}

export function getMixedDisputeDescription(): string {
  return '20 questões novas misturando todas as áreas e provas de residência.';
}

/** Questão pronta para prova/simulado: sem branding ENARE no comentário. */
export function normalizeQuestionForDispute(question: Question): Question {
  const explanation = sanitizeExplanation(question.explanation);
  return {
    ...question,
    explanation,
    source: null,
  };
}

export function formatStudentSourceLabel(): null {
  return null;
}

export function formatBankSourcesLabel(sources: string[]): string {
  if (sources.length === 0) return 'Provas públicas de residência';
  const hasOnlyEnare = sources.every((s) => s.toLowerCase().includes('enare'));
  if (hasOnlyEnare) {
    return 'Provas públicas de residência (acesso direto e multidisciplinares)';
  }
  return 'Provas públicas de residência';
}
