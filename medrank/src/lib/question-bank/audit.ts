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

/** Distratores/templates genéricos reutilizados — reprovação automática. */
const WEAK_DISTRACTOR = [
  /Terapia empírica sem fisiopatologia/i,
  /Suspender nefroproteção sem motivo/i,
  /Integrar achados clínicos\/labs e seguir guideline/i,
  /Intervenção agressiva sem indicação/i,
  /Observação sem seguimento em risco alto/i,
  /Labs e contexto compatíveis/i,
  /Conduta alinhada a guidelines/i,
  /Conduta alinhada à vinheta/i,
  /conduta alinhada a(o)? (vinheta|caso|guidelines?)/i,
  /Tipo de cobrança/i,
  /\{\{[a-z0-9_]+\}\}/i,
  /\banos anos\b/i,
  /em avaliação de .+ — foco:/i,
  /Labs e contexto compatíveis/i,
];

/**
 * Meta-texto de banca / pista de gabarito — NUNCA pode aparecer para o aluno
 * no enunciado ou nas alternativas.
 */
const BANNED_META_COPY = [
  { re: /\bgabarito\b/i, code: 'banned_gabarito', msg: 'Contém a palavra "gabarito" (pista/meta)' },
  {
    re: /racioc[ií]nio t[ií]pico de bancas?/i,
    code: 'banned_banca_meta',
    msg: 'Meta-texto de banca ("raciocínio típico de bancas")',
  },
  {
    re: /bancas? competitivas?/i,
    code: 'banned_banca_meta',
    msg: 'Meta-texto "banca competitiva"',
  },
  {
    re: /item\s+medrank/i,
    code: 'banned_medrank_item',
    msg: 'Meta-texto "item MedRank" no enunciado/opções',
  },
  {
    re: /quest[aã]o\s+estilo\s+usp/i,
    code: 'banned_style_label',
    msg: 'Meta-texto "questão estilo USP"',
  },
  { re: /\bUSP-?\s*\d+\b/i, code: 'banned_style_label', msg: 'Rótulo USP-N no texto do aluno' },
  {
    re: /\bestilo[- ]?(USP|ENARE|SBN|HCPA)\b/i,
    code: 'banned_style_label',
    msg: 'Rótulo de estilo de banca no texto do aluno',
  },
  { re: /\bENARE\b/i, code: 'banned_enare_label', msg: 'Menção a ENARE no enunciado/opções' },
  {
    re: /justificativa\s*(da\s*)?(resposta|alternativa|correta)/i,
    code: 'banned_justification_in_option',
    msg: 'Justificativa embutida na alternativa',
  },
  {
    re: /\b(resposta\s+correta|alternativa\s+correta)\b/i,
    code: 'banned_correct_label',
    msg: 'Marca explícita de resposta correta',
  },
  {
    re: /esta abordagem atrasa/i,
    code: 'banned_error_leak',
    msg: 'Alternativa denuncia o erro ("Esta abordagem atrasa…")',
  },
  {
    re: /sem excluir contraindica/i,
    code: 'banned_error_leak',
    msg: 'Pista de erro nas alternativas ("sem excluir contraindicações")',
  },
  {
    re: /iniciar .{0,50}empiricamente/i,
    code: 'banned_error_leak',
    msg: 'Pista de erro ("iniciar… empiricamente")',
  },
  {
    re: /apenas observar sem investigar/i,
    code: 'banned_error_leak',
    msg: 'Distrator caricaturesco ("apenas observar sem investigar")',
  },
];

/** Na alternativa correta: vazamento de explicação. */
const CORRECT_OPTION_LEAK = [
  /\bporque\b/i,
  /\bpois\b/i,
  /\bjá que\b/i,
  /\bvisto que\b/i,
  /\bgabarito\b/i,
  /\bjustific/i,
  /\bconforme (a )?diretriz\b/i,
  /\bé a (melhor|única) (conduta|resposta)\b/i,
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
  const explanation = String(q.explanation ?? '').trim();

  // Vinheta: erro só se realmente artificial; expert banks usam stems ~100–180
  if (statement.length < 80) {
    issues.push({
      code: 'stem_short',
      severity: 'error',
      message: `Enunciado curto demais (${statement.length} chars) — exige vinheta clínica`,
    });
  } else if (statement.length < 140) {
    issues.push({
      code: 'stem_short',
      severity: 'warning',
      message: `Enunciado curto (${statement.length} chars) — preferível expandir a vinheta`,
    });
  }

  const hasAge = /\b\d{1,3}\s*(anos?|ano|meses?|dias?)\b/i.test(statement);
  const hasClinicalCue =
    /(PA|press[aã]o|exame|lab|creatinina|ureia|Hb|hemat|dor|febre|edema|diurese|ultrassom|TC|ECG|hist[oó]ria|LRA|IRA|K |HCO)/i.test(
      statement
    );
  if (statement.length >= 140 && (!hasAge || !hasClinicalCue)) {
    issues.push({
      code: 'vignette_thin',
      severity: 'warning',
      message: 'Vinheta sem idade e/ou dados clínicos suficientes',
    });
  }

  if (opts.length < 4) {
    issues.push({
      code: 'options_missing',
      severity: 'error',
      message: `Exige pelo menos 4 alternativas (há ${opts.length})`,
    });
  } else if (opts.length < 5) {
    issues.push({
      code: 'options_missing',
      severity: 'warning',
      message: `Preferível 5 alternativas A–E (há ${opts.length})`,
    });
  }

  if (!opts.some((o) => o.letter === correct)) {
    issues.push({
      code: 'gabarito_invalid',
      severity: 'error',
      message: `Gabarito ${correct} sem texto correspondente`,
    });
  }

  if (explanation.length < 80) {
    issues.push({
      code: 'explanation_thin',
      severity: 'error',
      message: `Justificativa ausente/fraca (${explanation.length} chars) — obrigatória após a resposta`,
    });
  }

  const lens = opts.map((o) => o.text.length);
  if (lens.length >= 4) {
    const mx = Math.max(...lens);
    const mn = Math.min(...lens);
    if (mn < 30) {
      issues.push({
        code: 'option_too_short',
        severity: 'error',
        message: `Alternativa muito curta (mín ${mn} chars) — risco de gabarito óbvio`,
      });
    }
    if (mx > mn * 2.2) {
      issues.push({
        code: 'options_unbalanced',
        severity: 'error',
        message: `Tamanhos desbalanceados (${lens.join('/')}) — gabarito pode saltar aos olhos`,
      });
    }
    if (correctText && correctText.length >= mx && correctText.length > mn * 1.6) {
      issues.push({
        code: 'correct_longest',
        severity: 'error',
        message: 'Alternativa correta é a mais longa/detalhada (pista visual)',
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

  // Meta-texto / pistas no enunciado + opções (nunca no aluno)
  const studentVisible = `${statement}\n${opts.map((o) => o.text).join('\n')}`;
  for (const ban of BANNED_META_COPY) {
    if (ban.re.test(studentVisible)) {
      issues.push({ code: ban.code, severity: 'error', message: ban.msg });
    }
  }

  // "gabarito" ou justificativa só nas opções (ainda mais grave)
  for (const o of opts) {
    if (/\bgabarito\b/i.test(o.text)) {
      issues.push({
        code: 'gabarito_in_option',
        severity: 'error',
        message: `Alternativa ${o.letter} contém a palavra "gabarito"`,
      });
    }
  }

  if (correctText) {
    for (const re of CORRECT_OPTION_LEAK) {
      if (re.test(correctText)) {
        issues.push({
          code: 'correct_leaks_rationale',
          severity: 'error',
          message: 'Alternativa correta contém justificativa/explicação (deve ir só no comentário)',
        });
        break;
      }
    }
  }

  const blob = `${statement}\n${opts.map((o) => o.text).join('\n')}\n${explanation}`;
  for (const re of WEAK_DISTRACTOR) {
    if (re.test(blob)) {
      issues.push({
        code: 'weak_template',
        severity: 'error',
        message: `Padrão fraco/template genérico detectado`,
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
