import type { Question, OptionLetter } from '@/types/database';
import { sanitizeExplanation } from '@/lib/question-bank/presentation';

const GENERIC_DISTRACTOR_PATTERNS = [
  'observação ambulatorial sem investigação',
  'solicitar apenas exames de rotina e retorno em 30 dias',
  'iniciar antibiótico de amplo espectro sem indicação',
  'encaminhar para cirurgia eletiva sem estabilização',
  'conduta ou diagnóstico prioritário conforme diretriz e raciocínio clínico',
];

const OFFICIAL_GABARITO_PATTERN = /gabarito oficial/i;

function optionTexts(question: Question): string[] {
  return (['A', 'B', 'C', 'D', 'E'] as const)
    .map((letter) => question[`option_${letter.toLowerCase()}` as keyof Question] as string)
    .filter((text) => Boolean(text?.trim()));
}

/** Alternativa possivelmente cortada na extração do PDF */
export function looksTruncatedOption(text: string | null | undefined): boolean {
  if (!text?.trim()) return true;
  const trimmed = text.trim();
  if (trimmed.length < 8) return true;
  // Final com vírgula ou ponto-e-vírgula costuma indicar corte no PDF
  if (/[,;]$/.test(trimmed)) return true;
  return false;
}

export function hasTruncatedOptions(question: Question): boolean {
  return optionTexts(question).some((text) => looksTruncatedOption(text));
}

export function hasGenericDistractors(question: Question): boolean {
  const lowered = optionTexts(question).map((t) => t.toLowerCase());
  const hits = lowered.filter((text) =>
    GENERIC_DISTRACTOR_PATTERNS.some((pattern) => text.includes(pattern))
  );
  return hits.length >= 2;
}

export function isThinExplanation(explanation: string | null | undefined): boolean {
  const cleaned = sanitizeExplanation(explanation);
  if (!cleaned) return true;
  if (OFFICIAL_GABARITO_PATTERN.test(cleaned)) return true;
  return cleaned.trim().length < 50;
}

export type QuestionQualityIssue =
  | 'truncated_options'
  | 'generic_distractors'
  | 'short_statement'
  | 'supplement_template';

export function getQuestionQualityIssues(question: Question): QuestionQualityIssue[] {
  const issues: QuestionQualityIssue[] = [];
  if ((question.statement?.trim().length ?? 0) < 40) issues.push('short_statement');
  if (hasTruncatedOptions(question)) issues.push('truncated_options');
  if (hasGenericDistractors(question)) issues.push('generic_distractors');
  if (question.id.startsWith('supplement-') && hasGenericDistractors(question)) {
    issues.push('supplement_template');
  }
  return issues;
}

export function isExamReadyQuestion(question: Question): boolean {
  const issues = getQuestionQualityIssues(question);
  if (issues.includes('truncated_options')) return false;
  if (issues.includes('generic_distractors') || issues.includes('supplement_template')) return false;
  if (issues.includes('short_statement')) return false;
  return true;
}

export function formatQuestionExplanation(question: Question): string {
  const letter = question.correct_option as OptionLetter;
  const correctText = question[`option_${letter.toLowerCase()}` as keyof Question] as string;
  const explanation = sanitizeExplanation(question.explanation);

  if (explanation && !isThinExplanation(explanation)) {
    return explanation;
  }

  const parts = [`Alternativa correta (${letter}): ${correctText}`];
  if (explanation) {
    parts.push(explanation);
  }
  return parts.join('\n\n');
}

export function auditQuestionBank(questions: Question[]) {
  const issueCounts: Record<QuestionQualityIssue, number> = {
    truncated_options: 0,
    generic_distractors: 0,
    short_statement: 0,
    supplement_template: 0,
  };

  let examReady = 0;
  for (const question of questions) {
    if (isExamReadyQuestion(question)) examReady++;
    for (const issue of getQuestionQualityIssues(question)) {
      issueCounts[issue]++;
    }
  }

  return {
    total: questions.length,
    examReady,
    excluded: questions.length - examReady,
    thinExplanations: questions.filter((q) => isThinExplanation(q.explanation)).length,
    issues: issueCounts,
  };
}
