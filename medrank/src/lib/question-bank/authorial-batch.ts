import type { Difficulty, OptionLetter } from '@/types/database';
import { statementFingerprint } from '@/lib/question-bank/provenance';

export type AuthorialQuestionKind =
  | 'official_residency'
  | 'authorial_guideline'
  | 'authorial_prediction'
  | 'in_review';

export type AuthorialBatchItem = {
  id_externo: string;
  lote_importacao: string;
  tipo_da_questao: AuthorialQuestionKind | string;
  especialidade: string | null;
  area: string | null;
  tema: string | null;
  subtema: string | null;
  nivel_dificuldade: Difficulty | null;
  enunciado: string;
  alternativa_A: string;
  alternativa_B: string;
  alternativa_C: string;
  alternativa_D: string;
  alternativa_E: string;
  resposta_correta: OptionLetter;
  comentario_do_gabarito: string;
  justificativa_da_alternativa_A: string | null;
  justificativa_da_alternativa_B: string | null;
  justificativa_da_alternativa_C: string | null;
  justificativa_da_alternativa_D: string | null;
  justificativa_da_alternativa_E: string | null;
  referencia_principal: string;
  instituicao_responsavel_pela_diretriz: string | null;
  ano_da_diretriz: number | null;
  tags: string[];
  data_criacao: string | null;
  status: string;
  versao_da_questao: string | null;
  statement_fingerprint: string;
};

export type AuthorialParseIssue = {
  index: number;
  id_externo?: string;
  severity: 'error' | 'warning';
  code: string;
  message: string;
};

const KIND_MAP: Record<string, AuthorialQuestionKind> = {
  official_residency: 'official_residency',
  '1': 'official_residency',
  oficial: 'official_residency',
  official: 'official_residency',
  questao_oficial_de_prova_de_residencia: 'official_residency',
  'questão_oficial_de_prova_de_residência': 'official_residency',
  authorial_guideline: 'authorial_guideline',
  '2': 'authorial_guideline',
  autoral_diretriz: 'authorial_guideline',
  guideline: 'authorial_guideline',
  questao_autoral_baseada_em_diretriz: 'authorial_guideline',
  'questão_autoral_baseada_em_diretriz': 'authorial_guideline',
  questao_autoral_baseada_em_diretriz_vigente: 'authorial_guideline',
  'questão_autoral_baseada_em_diretriz_vigente': 'authorial_guideline',
  autoral_diretriz_vigente: 'authorial_guideline',
  diretriz_vigente: 'authorial_guideline',
  authorial_prediction: 'authorial_prediction',
  '3': 'authorial_prediction',
  autoral_previsao: 'authorial_prediction',
  prediction: 'authorial_prediction',
  questao_autoral_de_previsao_para_residencia: 'authorial_prediction',
  'questão_autoral_de_previsão_para_residência': 'authorial_prediction',
  in_review: 'in_review',
  '4': 'in_review',
  revisao: 'in_review',
  em_revisao: 'in_review',
  questao_em_revisao: 'in_review',
  'questão_em_revisão': 'in_review',
};

const DIFF_MAP: Record<string, Difficulty> = {
  facil: 'facil',
  fácil: 'facil',
  easy: 'facil',
  medio: 'medio',
  médio: 'medio',
  media: 'medio',
  média: 'medio',
  medium: 'medio',
  dificil: 'dificil',
  difícil: 'dificil',
  hard: 'dificil',
};

function pick(row: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (row[k] != null && String(row[k]).trim() !== '') return row[k];
    const found = Object.keys(row).find((rk) => rk.toLowerCase() === k.toLowerCase());
    if (found && row[found] != null && String(row[found]).trim() !== '') return row[found];
  }
  return null;
}

function asStr(v: unknown): string {
  return String(v ?? '').trim();
}

function normalizeKind(raw: string): AuthorialQuestionKind | null {
  const key = raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
  // match with and without accents in map keys
  for (const [k, v] of Object.entries(KIND_MAP)) {
    const nk = k
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_');
    if (nk === key) return v;
  }
  if (KIND_MAP[key] || KIND_MAP[raw.trim()]) return KIND_MAP[key] || KIND_MAP[raw.trim()];
  if (key.includes('oficial') && key.includes('residencia')) return 'official_residency';
  if (key.includes('diretriz')) return 'authorial_guideline';
  if (key.includes('previsao') || key.includes('preparacao') || key.includes('autoral')) {
    return 'authorial_prediction';
  }
  if (key.includes('revisao')) return 'in_review';
  return null;
}

/** Aceita alternativas/justificativas aninhadas do lote MedRank. */
function flattenAuthorialRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...row };
  const alts = row.alternativas;
  if (alts && typeof alts === 'object' && !Array.isArray(alts)) {
    const a = alts as Record<string, unknown>;
    out.alternativa_A = a.A ?? a.a ?? out.alternativa_A;
    out.alternativa_B = a.B ?? a.b ?? out.alternativa_B;
    out.alternativa_C = a.C ?? a.c ?? out.alternativa_C;
    out.alternativa_D = a.D ?? a.d ?? out.alternativa_D;
    out.alternativa_E = a.E ?? a.e ?? out.alternativa_E;
  }
  const just = row.justificativas;
  if (just && typeof just === 'object' && !Array.isArray(just)) {
    const j = just as Record<string, unknown>;
    out.justificativa_da_alternativa_A = j.A ?? j.a ?? out.justificativa_da_alternativa_A;
    out.justificativa_da_alternativa_B = j.B ?? j.b ?? out.justificativa_da_alternativa_B;
    out.justificativa_da_alternativa_C = j.C ?? j.c ?? out.justificativa_da_alternativa_C;
    out.justificativa_da_alternativa_D = j.D ?? j.d ?? out.justificativa_da_alternativa_D;
    out.justificativa_da_alternativa_E = j.E ?? j.e ?? out.justificativa_da_alternativa_E;
  }
  if (out.instituicao_responsavel && !out.instituicao_responsavel_pela_diretriz) {
    out.instituicao_responsavel_pela_diretriz = out.instituicao_responsavel;
  }
  if (out.versao != null && out.versao_da_questao == null) {
    out.versao_da_questao = String(out.versao);
  }
  return out;
}

function parseTags(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((t) => String(t).trim()).filter(Boolean);
  const s = asStr(v);
  if (!s) return [];
  try {
    const j = JSON.parse(s);
    if (Array.isArray(j)) return j.map((t) => String(t).trim()).filter(Boolean);
  } catch {
    /* csv */
  }
  return s.split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
}

export function parseAuthorialBatchJson(raw: string): {
  items: AuthorialBatchItem[];
  issues: AuthorialParseIssue[];
  loteHint: string | null;
} {
  const issues: AuthorialParseIssue[] = [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { items: [], issues: [{ index: -1, severity: 'error', code: 'json', message: 'JSON inválido' }], loteHint: null };
  }

  const obj = data as {
    questions?: unknown[];
    questoes?: unknown[];
    itens?: unknown[];
    metadados?: { nome_lote?: string };
  };
  const list = Array.isArray(data)
    ? data
    : Array.isArray(obj.questions)
      ? obj.questions
      : Array.isArray(obj.questoes)
        ? obj.questoes
        : Array.isArray(obj.itens)
          ? obj.itens
          : null;

  if (!list) {
    return {
      items: [],
      issues: [
        {
          index: -1,
          severity: 'error',
          code: 'shape',
          message: 'JSON deve ser array ou { questions|questoes: [] }',
        },
      ],
      loteHint: null,
    };
  }

  const items: AuthorialBatchItem[] = [];
  let loteHint: string | null = null;

  for (let i = 0; i < list.length; i++) {
    const row = flattenAuthorialRow(list[i] as Record<string, unknown>);
    const parsed = mapAuthorialRow(row, i);
    if (parsed.item) {
      items.push(parsed.item);
      loteHint = loteHint || parsed.item.lote_importacao;
    }
    issues.push(...parsed.issues);
  }

  // nome amigável do metadados só como fallback se o arquivo não trouxer lote_importacao
  if (!loteHint && typeof obj?.metadados?.nome_lote === 'string') {
    loteHint = obj.metadados.nome_lote;
  }

  return { items, issues, loteHint };
}

/** CSV simples: cabeçalho na 1ª linha, vírgula ou ; */
export function parseAuthorialBatchCsv(raw: string): {
  items: AuthorialBatchItem[];
  issues: AuthorialParseIssue[];
  loteHint: string | null;
} {
  const issues: AuthorialParseIssue[] = [];
  const lines = raw.replace(/\r\n/g, '\n').split('\n').filter((l) => l.trim());
  if (lines.length < 2) {
    return {
      items: [],
      issues: [{ index: -1, severity: 'error', code: 'csv', message: 'CSV vazio ou sem dados' }],
      loteHint: null,
    };
  }

  const sep = lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';
  const headers = splitCsvLine(lines[0], sep).map((h) => h.trim());
  const items: AuthorialBatchItem[] = [];
  let loteHint: string | null = null;

  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i], sep);
    const row: Record<string, unknown> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? '';
    });
    const parsed = mapAuthorialRow(row, i - 1);
    if (parsed.item) {
      items.push(parsed.item);
      loteHint = loteHint || parsed.item.lote_importacao;
    }
    issues.push(...parsed.issues);
  }

  return { items, issues, loteHint };
}

function splitCsvLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQ = !inQ;
      continue;
    }
    if (c === sep && !inQ) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out;
}

function mapAuthorialRow(
  row: Record<string, unknown>,
  index: number
): { item: AuthorialBatchItem | null; issues: AuthorialParseIssue[] } {
  const issues: AuthorialParseIssue[] = [];
  const idExterno = asStr(pick(row, 'id_externo', 'external_id', 'id'));
  const lote = asStr(pick(row, 'lote_importacao', 'lote', 'batch'));
  const kindRaw = asStr(pick(row, 'tipo_da_questao', 'tipo', 'question_kind', 'kind'));
  const kind = normalizeKind(kindRaw);

  const enunciado = asStr(pick(row, 'enunciado', 'statement', 'stem'));
  const A = asStr(pick(row, 'alternativa_A', 'alternativa_a', 'option_a', 'A'));
  const B = asStr(pick(row, 'alternativa_B', 'alternativa_b', 'option_b', 'B'));
  const C = asStr(pick(row, 'alternativa_C', 'alternativa_c', 'option_c', 'C'));
  const D = asStr(pick(row, 'alternativa_D', 'alternativa_d', 'option_d', 'D'));
  const E = asStr(pick(row, 'alternativa_E', 'alternativa_e', 'option_e', 'E'));
  const correct = asStr(pick(row, 'resposta_correta', 'correct_option', 'gabarito', 'answer'))
    .toUpperCase()
    .slice(0, 1) as OptionLetter;
  const comentario = asStr(
    pick(row, 'comentario_do_gabarito', 'comentario', 'explanation', 'comment')
  );
  const referencia = asStr(
    pick(row, 'referencia_principal', 'referencia', 'bibliography', 'reference')
  );

  if (!kind) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'error',
      code: 'tipo',
      message: 'tipo_da_questao inválido (use official_residency | authorial_guideline | authorial_prediction | in_review)',
    });
  }
  if (!idExterno) {
    issues.push({ index, severity: 'error', code: 'id', message: 'id_externo obrigatório' });
  }
  if (!lote) {
    issues.push({ index, id_externo: idExterno || undefined, severity: 'error', code: 'lote', message: 'lote_importacao obrigatório' });
  }
  if (!enunciado || enunciado.length < 40) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'error',
      code: 'enunciado',
      message: 'enunciado incompleto (mín. 40 chars)',
    });
  }
  for (const [L, text] of [
    ['A', A],
    ['B', B],
    ['C', C],
    ['D', D],
    ['E', E],
  ] as const) {
    if (!text) {
      issues.push({
        index,
        id_externo: idExterno || undefined,
        severity: 'error',
        code: 'alternativa',
        message: `Falta alternativa_${L}`,
      });
    }
  }
  if (!['A', 'B', 'C', 'D', 'E'].includes(correct)) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'error',
      code: 'gabarito',
      message: 'resposta_correta deve ser A–E',
    });
  } else {
    const map = { A, B, C, D, E };
    if (!map[correct]) {
      issues.push({
        index,
        id_externo: idExterno || undefined,
        severity: 'error',
        code: 'gabarito',
        message: 'Gabarito não corresponde a uma alternativa preenchida',
      });
    }
  }
  if (!referencia) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'error',
      code: 'referencia',
      message: 'referencia_principal obrigatória',
    });
  }
  if (!comentario) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'warning',
      code: 'comentario',
      message: 'comentario_do_gabarito vazio',
    });
  }

  // Autoral nunca pode se passar por oficial de instituição de prova
  if (
    kind &&
    kind !== 'official_residency' &&
    /\b(USP|ENARE|UNIFESP|UNICAMP|UERJ|UFRJ)\b/i.test(enunciado) &&
    /quest[aã]o\s+(da|oficial)/i.test(enunciado)
  ) {
    issues.push({
      index,
      id_externo: idExterno || undefined,
      severity: 'error',
      code: 'falsificacao',
      message: 'Questão autoral não pode se apresentar como oficial de banca',
    });
  }

  const hasError = issues.some((x) => x.severity === 'error' && x.index === index);
  if (hasError || !kind) return { item: null, issues };

  const diffRaw = asStr(pick(row, 'nivel_dificuldade', 'dificuldade', 'difficulty'))
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const yearRaw = pick(row, 'ano_da_diretriz', 'guideline_year', 'ano');
  const diffKey = diffRaw.replace(/\s+/g, '');

  const item: AuthorialBatchItem = {
    id_externo: idExterno,
    lote_importacao: lote,
    tipo_da_questao: kind,
    especialidade: asStr(pick(row, 'especialidade', 'specialty')) || null,
    area: asStr(pick(row, 'area', 'área')) || null,
    tema: asStr(pick(row, 'tema', 'topic')) || null,
    subtema: asStr(pick(row, 'subtema', 'subtopic')) || null,
    nivel_dificuldade: DIFF_MAP[diffRaw] || DIFF_MAP[diffKey] || null,
    enunciado,
    alternativa_A: A,
    alternativa_B: B,
    alternativa_C: C,
    alternativa_D: D,
    alternativa_E: E,
    resposta_correta: correct,
    comentario_do_gabarito: comentario,
    justificativa_da_alternativa_A:
      asStr(pick(row, 'justificativa_da_alternativa_A', 'justificativa_A', 'rationale_a')) || null,
    justificativa_da_alternativa_B:
      asStr(pick(row, 'justificativa_da_alternativa_B', 'justificativa_B', 'rationale_b')) || null,
    justificativa_da_alternativa_C:
      asStr(pick(row, 'justificativa_da_alternativa_C', 'justificativa_C', 'rationale_c')) || null,
    justificativa_da_alternativa_D:
      asStr(pick(row, 'justificativa_da_alternativa_D', 'justificativa_D', 'rationale_d')) || null,
    justificativa_da_alternativa_E:
      asStr(pick(row, 'justificativa_da_alternativa_E', 'justificativa_E', 'rationale_e')) || null,
    referencia_principal: referencia,
    instituicao_responsavel_pela_diretriz:
      asStr(
        pick(
          row,
          'instituicao_responsavel_pela_diretriz',
          'instituicao_responsavel',
          'guideline_institution',
          'instituicao'
        )
      ) || null,
    ano_da_diretriz: yearRaw != null && String(yearRaw).trim() !== '' ? Number(yearRaw) : null,
    tags: parseTags(pick(row, 'tags')),
    data_criacao: asStr(pick(row, 'data_criacao', 'created_at')) || null,
    status: asStr(pick(row, 'status')) || 'rascunho',
    versao_da_questao: asStr(pick(row, 'versao_da_questao', 'version', 'versao')) || '1',
    // aviso do arquivo é preservado nas tags quando presente
    statement_fingerprint: statementFingerprint(enunciado),
  };

  return { item, issues };
}

/** Detecta duplicatas internas do arquivo (mesmo fingerprint). */
export function findInternalDuplicates(items: AuthorialBatchItem[]): AuthorialParseIssue[] {
  const seen = new Map<string, string>();
  const issues: AuthorialParseIssue[] = [];
  items.forEach((item, index) => {
    const prev = seen.get(item.statement_fingerprint);
    if (prev) {
      issues.push({
        index,
        id_externo: item.id_externo,
        severity: 'error',
        code: 'duplicata',
        message: `Enunciado duplicado no arquivo (igual a ${prev})`,
      });
    } else {
      seen.set(item.statement_fingerprint, item.id_externo);
    }
  });
  return issues;
}

export function originFromKind(kind: AuthorialQuestionKind): 'official' | 'guideline' | 'original_based_on_exam' | 'original' {
  if (kind === 'official_residency') return 'official';
  if (kind === 'authorial_guideline') return 'guideline';
  if (kind === 'authorial_prediction') return 'original_based_on_exam';
  return 'original';
}
