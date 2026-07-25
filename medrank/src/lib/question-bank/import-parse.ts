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

/**
 * Parseia bloco de texto no formato:
 * 1. Enunciado...
 * A) ...
 * B) ...
 * C) ...
 * D) ...
 * E) ...
 * Gabarito: C
 * (opcional) Explicacao: ...
 */
export function parseTextExamBlocks(raw: string): {
  questions: ParsedImportQuestion[];
  errors: string[];
} {
  const errors: string[] = [];
  const questions: ParsedImportQuestion[] = [];
  const text = String(raw || '').replace(/\r\n/g, '\n').trim();
  if (!text) return { questions, errors: ['Texto vazio'] };

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
      const q = parseOneBlock(chunk);
      questions.push(q);
    } catch (e) {
      errors.push(`Bloco ${i + 1}: ${e instanceof Error ? e.message : 'erro'}`);
    }
  }

  // Fallback: um unico bloco sem numeracao
  if (questions.length === 0 && /A\)|A\./i.test(normalized)) {
    try {
      questions.push(parseOneBlock(normalized));
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Falha no parse');
    }
  }

  return { questions, errors };
}

function parseOneBlock(chunk: string): ParsedImportQuestion {
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
  if (!correct || !LETTERS.includes(correct)) {
    throw new Error('gabarito A-E nao encontrado (linha "Gabarito: X")');
  }

  return {
    statement,
    option_a: opts.A,
    option_b: opts.B,
    option_c: opts.C,
    option_d: opts.D,
    option_e: opts.E,
    correct_option: correct,
    explanation,
    specialty: null,
    topic: null,
    subtopic: null,
    difficulty: null,
    year: null,
    source: null,
    statement_fingerprint: statementFingerprint(statement),
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
