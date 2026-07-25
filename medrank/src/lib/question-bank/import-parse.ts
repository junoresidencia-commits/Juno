import type { Difficulty, OptionLetter } from '@/types/database';
import type { QuestionOrigin } from '@/lib/question-bank/provenance';
import { statementFingerprint } from '@/lib/question-bank/provenance';

export type ParsedImportQuestion = {
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: OptionLetter;
  explanation: string | null;
  specialty: string | null;
  topic: string | null;
  subtopic: string | null;
  difficulty: Difficulty | null;
  year: number | null;
  source: string | null;
  statement_fingerprint: string;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

export type ParseTextOptions = {
  /** Se false, aceita questões sem "Gabarito: X" (para juntar com arquivo de gabarito). */
  requireGabarito?: boolean;
};

/**
 * Parseia bloco de texto no formato:
 * 1. Enunciado...
 * A) ...
 * B) ...
 * C) ...
 * D) ...
 * E) ...
 * Gabarito: C   ← opcional se requireGabarito=false
 * (opcional) Explicacao: ...
 */
export function parseTextExamBlocks(
  raw: string,
  opts: ParseTextOptions = {}
): {
  questions: ParsedImportQuestion[];
  errors: string[];
  missingGabarito: number[];
} {
  const requireGabarito = opts.requireGabarito !== false;
  const errors: string[] = [];
  const questions: ParsedImportQuestion[] = [];
  const missingGabarito: number[] = [];
  const text = String(raw || '').replace(/\r\n/g, '\n').trim();
  if (!text) return { questions, errors: ['Texto vazio'], missingGabarito };

  // Aceita "1.", "1)", "QUESTÃO 1", "Questao 1 -"
  const normalized = text.replace(
    /(?:^|\n)\s*(?:quest[aã]o|q)\s*(\d{1,3})\s*[\).\-:]\s*/gi,
    '\n$1. '
  );

  const chunks = normalized
    .split(/\n(?=\s*\d{1,3}[\).\:\-]\s+)/)
    .filter((c) => c.trim());

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i].trim();
    try {
      const { question, hasGabarito } = parseOneBlock(chunk, requireGabarito);
      if (!hasGabarito) missingGabarito.push(questions.length + 1);
      questions.push(question);
    } catch (e) {
      errors.push(`Bloco ${i + 1}: ${e instanceof Error ? e.message : 'erro'}`);
    }
  }

  // Fallback: um unico bloco sem numeracao
  if (questions.length === 0 && /A\)|A\./i.test(normalized)) {
    try {
      const { question, hasGabarito } = parseOneBlock(normalized, requireGabarito);
      if (!hasGabarito) missingGabarito.push(1);
      questions.push(question);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Falha no parse');
    }
  }

  return { questions, errors, missingGabarito };
}

function parseOneBlock(
  chunk: string,
  requireGabarito: boolean
): { question: ParsedImportQuestion; hasGabarito: boolean } {
  const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length < 5) throw new Error('bloco curto demais');

  let statement = lines[0].replace(/^\d{1,3}[\).\:\-]\s*/, '').trim();
  const opts: Record<string, string> = {};
  let correct: OptionLetter | null = null;
  let explanation: string | null = null;

  for (const line of lines.slice(1)) {
    const opt = line.match(/^([A-Ea-e])[\)\.\-:]\s*(.+)$/);
    if (opt) {
      opts[opt[1].toUpperCase()] = opt[2].trim();
      continue;
    }
    const gab = line.match(/^(gabarito|resposta|alternativa\s*correta)\s*[:\-]\s*([A-Ea-e])\b/i);
    if (gab) {
      correct = gab[2].toUpperCase() as OptionLetter;
      continue;
    }
    const expl = line.match(/^(explica[cç][aã]o|coment[aá]rio|justificativa)\s*[:\-]\s*(.+)$/i);
    if (expl) {
      explanation = expl[2].trim();
      continue;
    }
    // Continuacao do enunciado se ainda nao temos opcoes
    if (Object.keys(opts).length === 0) {
      statement = `${statement} ${line}`.trim();
    }
  }

  for (const L of LETTERS) {
    if (!opts[L]) throw new Error(`falta alternativa ${L}`);
  }
  const hasGabarito = Boolean(correct && LETTERS.includes(correct));
  if (!hasGabarito && requireGabarito) {
    throw new Error('gabarito A-E nao encontrado (envie o arquivo de gabarito ou "Gabarito: X")');
  }

  return {
    hasGabarito,
    question: {
      statement,
      option_a: opts.A,
      option_b: opts.B,
      option_c: opts.C,
      option_d: opts.D,
      option_e: opts.E,
      // Placeholder até applyGabaritoMap
      correct_option: hasGabarito ? (correct as OptionLetter) : ('A' as OptionLetter),
      explanation,
      specialty: null,
      topic: null,
      subtopic: null,
      difficulty: null,
      year: null,
      source: null,
      statement_fingerprint: statementFingerprint(statement),
    },
  };
}

/**
 * Lê gabarito oficial separado, formatos comuns:
 * 1 C | 1-C | 1. C | 01) C | Questão 1: C | 1:A
 * Também sequências: "1A 2B 3C" ou linhas "A B C D E" na ordem.
 */
export function parseGabaritoMap(raw: string): {
  map: Map<number, OptionLetter>;
  errors: string[];
} {
  const map = new Map<number, OptionLetter>();
  const errors: string[] = [];
  const text = String(raw || '')
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .trim();
  if (!text) return { map, errors: ['Gabarito vazio'] };

  // Pares "N Letra" em qualquer lugar
  const pairRe =
    /(?:quest[aã]o|q\.?|n[uú]mero)?\s*(\d{1,3})\s*[\).\-:]\s*([A-Ea-e])\b/gi;
  let m: RegExpExecArray | null;
  while ((m = pairRe.exec(text)) !== null) {
    const n = Number(m[1]);
    const L = m[2].toUpperCase() as OptionLetter;
    if (n >= 1 && n <= 300 && LETTERS.includes(L)) map.set(n, L);
  }

  // Compacto: 1A 2B 3C ou 1-A 2-B
  const compactRe = /(\d{1,3})\s*[-:]?\s*([A-Ea-e])\b/g;
  while ((m = compactRe.exec(text)) !== null) {
    const n = Number(m[1]);
    const L = m[2].toUpperCase() as OptionLetter;
    if (n >= 1 && n <= 300 && LETTERS.includes(L) && !map.has(n)) map.set(n, L);
  }

  // Só letras em ordem: "A B C D E A ..." (1 resposta por linha ou espaço)
  if (map.size === 0) {
    const lettersOnly = text
      .split(/\s+/)
      .map((t) => t.replace(/[^A-Ea-e]/g, '').toUpperCase())
      .filter((t) => t.length === 1 && LETTERS.includes(t as OptionLetter));
    if (lettersOnly.length >= 5) {
      lettersOnly.forEach((L, i) => map.set(i + 1, L as OptionLetter));
    }
  }

  if (map.size === 0) {
    errors.push(
      'Não li o gabarito. Use linhas como: 1 C  |  1-C  |  Questão 1: C'
    );
  }

  return { map, errors };
}

/** Aplica mapa de gabarito (1→C) nas questões na ordem do arquivo. */
export function applyGabaritoMap(
  questions: ParsedImportQuestion[],
  map: Map<number, OptionLetter>,
  alreadyHad: Set<number> = new Set()
): {
  questions: ParsedImportQuestion[];
  applied: number;
  missing: number[];
} {
  const missing: number[] = [];
  const out = questions.map((q, i) => {
    const n = i + 1;
    const letter = map.get(n);
    if (letter) {
      return {
        ...q,
        correct_option: letter,
        explanation: q.explanation || `Gabarito oficial: ${letter}`,
      };
    }
    if (alreadyHad.has(n)) return q;
    missing.push(n);
    return q;
  });
  return {
    questions: out,
    applied: out.length - missing.length,
    missing,
  };
}

/** Junta texto da prova + texto do gabarito → questões prontas. */
export function mergeExamWithGabarito(
  examText: string,
  gabaritoText: string
): {
  questions: ParsedImportQuestion[];
  errors: string[];
  applied: number;
  missing: number[];
  readyText: string;
} {
  const parsed = parseTextExamBlocks(examText, { requireGabarito: false });
  const alreadyHad = new Set(parsed.questions.map((_, i) => i + 1).filter((n) => !parsed.missingGabarito.includes(n)));
  const { map, errors: gabErrors } = parseGabaritoMap(gabaritoText);
  const merged = applyGabaritoMap(parsed.questions, map, alreadyHad);
  const errors = [...parsed.errors, ...gabErrors];
  if (merged.missing.length) {
    errors.push(
      `Sem gabarito para as questões: ${merged.missing.slice(0, 20).join(', ')}${
        merged.missing.length > 20 ? '…' : ''
      }`
    );
  }

  const ready = merged.questions.filter((_, i) => !merged.missing.includes(i + 1));
  const readyText = ready
    .map(
      (q, i) =>
        `${i + 1}. ${q.statement}\nA) ${q.option_a}\nB) ${q.option_b}\nC) ${q.option_c}\nD) ${q.option_d}\nE) ${q.option_e}\nGabarito: ${q.correct_option}${
          q.explanation ? `\nExplicacao: ${q.explanation}` : ''
        }`
    )
    .join('\n\n');

  return {
    questions: ready,
    errors,
    applied: ready.length,
    missing: merged.missing,
    readyText,
  };
}

export function parseJsonQuestions(raw: string): {
  questions: ParsedImportQuestion[];
  errors: string[];
} {
  const errors: string[] = [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { questions: [], errors: ['JSON invalido'] };
  }
  const list = Array.isArray(data)
    ? data
    : Array.isArray((data as { questions?: unknown[] })?.questions)
      ? (data as { questions: unknown[] }).questions
      : null;
  if (!list) return { questions: [], errors: ['JSON deve ser array ou { questions: [] }'] };

  const questions: ParsedImportQuestion[] = [];
  for (let i = 0; i < list.length; i++) {
    const row = list[i] as Record<string, unknown>;
    try {
      const statement = String(row.statement || row.stem || row.enunciado || '').trim();
      if (!statement) throw new Error('sem enunciado');
      const correct = String(
        row.correct_option || row.gabarito || row.answer || 'A'
      )
        .toUpperCase()
        .slice(0, 1) as OptionLetter;
      if (!LETTERS.includes(correct)) throw new Error('gabarito invalido');
      const q: ParsedImportQuestion = {
        statement,
        option_a: String(row.option_a || row.A || ''),
        option_b: String(row.option_b || row.B || ''),
        option_c: String(row.option_c || row.C || ''),
        option_d: String(row.option_d || row.D || ''),
        option_e: String(row.option_e || row.E || ''),
        correct_option: correct,
        explanation: row.explanation ? String(row.explanation) : null,
        specialty: row.specialty ? String(row.specialty) : null,
        topic: row.topic ? String(row.topic) : null,
        subtopic: row.subtopic ? String(row.subtopic) : null,
        difficulty: (row.difficulty as Difficulty) || null,
        year: row.year ? Number(row.year) : null,
        source: row.source ? String(row.source) : null,
        statement_fingerprint: statementFingerprint(statement),
      };
      for (const L of ['option_a', 'option_b', 'option_c', 'option_d', 'option_e'] as const) {
        if (!q[L]) throw new Error(`falta ${L}`);
      }
      questions.push(q);
    } catch (e) {
      errors.push(`Item ${i + 1}: ${e instanceof Error ? e.message : 'erro'}`);
    }
  }
  return { questions, errors };
}

export type ImportMeta = {
  title: string;
  institution?: string;
  exam_name?: string;
  year?: number;
  source_url?: string;
  reproduction_allowed?: boolean;
  question_origin?: QuestionOrigin;
  notes?: string;
};
