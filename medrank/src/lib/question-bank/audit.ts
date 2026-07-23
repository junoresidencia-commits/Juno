import type { OptionLetter, Question } from '@/types/database';

export type QuestionAuditSeverity = 'error' | 'warning';

export type QuestionAuditIssue = {
  code: string;
  severity: QuestionAuditSeverity;
  message: string;
};

export type QuestionAuditRow = {
  id: string;
  source: string | null;
  year: number | null;
  specialty: string | null;
  correct_option: OptionLetter;
  statementPreview: string;
  issues: QuestionAuditIssue[];
};

const WEAK_DISTRACTOR = [
  /Terapia empírica sem fisiopatologia/i,
  /Suspender nefroproteção sem motivo/i,
  /Integrar achados clínicos\/labs e seguir guideline/i,
  /Intervenção agressiva sem indicação/i,
  /Observação sem seguimento em risco alto/i,
  /Labs e contexto compatíveis/i,
  /Conduta alinhada a guidelines/i,
  /Tipo de cobrança/i,
  /\{\{[a-z0-9_]+\}\}/i,
  /\banos anos\b/i,
];

function optionsOf(q: Question): { letter: OptionLetter; text: string }[] {
  const letters: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];
  return letters
    .map((letter) => ({
      letter,
      text: String(q[`option_${letter.toLowerCase()}` as keyof Question] ?? '').trim(),
    }))
    .filter((o) => o.text.length > 0);
}

/** Auditoria estática de qualidade (não valida conteúdo clínico absoluto). */
export function auditQuestion(q: Question): QuestionAuditIssue[] {
  const issues: QuestionAuditIssue[] = [];
  const statement = String(q.statement ?? '').trim();
  const opts = optionsOf(q);
  const correct = q.correct_option;
  const correctText = opts.find((o) => o.letter === correct)?.text ?? '';

  if (statement.length < 70) {
    issues.push({
      code: 'stem_short',
      severity: 'error',
      message: `Enunciado curto (${statement.length} chars)`,
    });
  }

  if (opts.length < 4) {
    issues.push({
      code: 'options_missing',
      severity: 'error',
      message: `Menos de 4 alternativas (${opts.length})`,
    });
  }

  if (!opts.some((o) => o.letter === correct)) {
    issues.push({
      code: 'gabarito_invalid',
      severity: 'error',
      message: `Gabarito ${correct} sem texto correspondente`,
    });
  }

  const explanation = String(q.explanation ?? '').trim();
  if (explanation.length < 80) {
    issues.push({
      code: 'explanation_thin',
      severity: 'warning',
      message: `Explicação fraca/ausente (${explanation.length} chars)`,
    });
  }

  const lens = opts.map((o) => o.text.length);
  if (lens.length >= 4) {
    const mx = Math.max(...lens);
    const mn = Math.min(...lens);
    if (mn < 25) {
      issues.push({
        code: 'option_too_short',
        severity: 'error',
        message: `Alternativa muito curta (mín ${mn} chars) — risco de gabarito óbvio`,
      });
    }
    if (mx > mn * 2.8) {
      issues.push({
        code: 'options_unbalanced',
        severity: 'error',
        message: `Tamanhos desbalanceados (${lens.join('/')}) — gabarito pode saltar aos olhos`,
      });
    }
    if (correctText && correctText.length >= mx && correctText.length > mn * 2) {
      issues.push({
        code: 'correct_longest',
        severity: 'warning',
        message: 'Alternativa correta é a mais longa (possível vazamento visual)',
      });
    }
  }

  const uniq = new Set(opts.map((o) => o.text.toLowerCase()));
  if (uniq.size < opts.length) {
    issues.push({
      code: 'duplicate_options',
      severity: 'error',
      message: 'Há alternativas duplicadas',
    });
  }

  const blob = `${statement}\n${opts.map((o) => o.text).join('\n')}\n${explanation}`;
  for (const re of WEAK_DISTRACTOR) {
    if (re.test(blob)) {
      issues.push({
        code: 'weak_template',
        severity: 'error',
        message: `Padrão fraco/template detectado: ${re}`,
      });
      break;
    }
  }

  return issues;
}

export function auditQuestionBank(questions: Question[]): {
  scanned: number;
  flagged: number;
  errors: number;
  warnings: number;
  rows: QuestionAuditRow[];
} {
  const rows: QuestionAuditRow[] = [];
  let errors = 0;
  let warnings = 0;

  for (const q of questions) {
    const issues = auditQuestion(q);
    if (issues.length === 0) continue;
    for (const i of issues) {
      if (i.severity === 'error') errors += 1;
      else warnings += 1;
    }
    rows.push({
      id: q.id,
      source: q.source,
      year: q.year,
      specialty: q.specialty,
      correct_option: q.correct_option,
      statementPreview: String(q.statement ?? '').replace(/\s+/g, ' ').slice(0, 160),
      issues,
    });
  }

  rows.sort((a, b) => {
    const ae = a.issues.filter((i) => i.severity === 'error').length;
    const be = b.issues.filter((i) => i.severity === 'error').length;
    return be - ae || b.issues.length - a.issues.length;
  });

  return {
    scanned: questions.length,
    flagged: rows.length,
    errors,
    warnings,
    rows,
  };
}
