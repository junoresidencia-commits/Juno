import type { Question } from '@/types/database';
import { auditQuestion } from '@/lib/question-bank/audit';

/** Classificação pedagógica do banco (painel de auditoria). */
export type QualityLabel =
  | 'aprovada'
  | 'precisa_de_correcao'
  | 'muito_facil'
  | 'enunciado_mal_construido'
  | 'alternativa_ambigua'
  | 'gabarito_duvidoso'
  | 'questao_repetida'
  | 'deve_ser_excluida'
  | 'anulada';

export const QUALITY_LABELS: { value: QualityLabel; label: string }[] = [
  { value: 'aprovada', label: 'Aprovada' },
  { value: 'precisa_de_correcao', label: 'Precisa de correção' },
  { value: 'muito_facil', label: 'Muito fácil' },
  { value: 'enunciado_mal_construido', label: 'Enunciado mal construído' },
  { value: 'alternativa_ambigua', label: 'Alternativa ambígua' },
  { value: 'gabarito_duvidoso', label: 'Gabarito duvidoso' },
  { value: 'questao_repetida', label: 'Questão repetida' },
  { value: 'deve_ser_excluida', label: 'Deve ser excluída' },
  { value: 'anulada', label: 'Anulada (oficial)' },
];

export function isOfficialQuestion(q: Pick<Question, 'question_origin' | 'tags' | 'source' | 'reproduction_allowed'>): boolean {
  if (q.question_origin === 'official' || q.reproduction_allowed) return true;
  const tags = q.tags ?? [];
  if (tags.includes('official') || tags.includes('real')) return true;
  const src = String(q.source || '').toLowerCase();
  return src === 'enare' || src === 'revalida';
}

export function isSyntheticExpert(q: Pick<Question, 'tags' | 'source' | 'question_origin'>): boolean {
  if (isOfficialQuestion(q)) return false;
  const tags = q.tags ?? [];
  if (tags.includes('banco-expert') || tags.includes('residencia-expert')) return true;
  const src = String(q.source || '');
  return /medrank|expert/i.test(src);
}

export type ClassifyResult = {
  quality_label: QualityLabel;
  /** Se true, questão não deve entrar na disputa até revisão humana. */
  suspend: boolean;
  notes: string;
  codes: string[];
};

/**
 * Classifica questão por regras locais (sem OpenAI).
 * Oficiais com estrutura ok → aprovada.
 * Sintéticas fracas → suspender.
 */
export function classifyQuestionQuality(q: Question): ClassifyResult {
  if (q.bank_status === 'annulled' || q.quality_label === 'anulada') {
    return {
      quality_label: 'anulada',
      suspend: true,
      notes: 'Questão oficialmente anulada — sem gabarito próprio.',
      codes: ['annulled'],
    };
  }

  const official = isOfficialQuestion(q);
  const issues = auditQuestion(q);
  // Oficiais: "Gabarito oficial…" conta como explicação mínima aceitável
  const filtered = official
    ? issues.filter((i) => {
        if (i.code === 'explanation_thin' && /gabarito oficial/i.test(String(q.explanation || ''))) {
          return false;
        }
        // Menção ENARE no texto aluno — em oficiais o enunciado pode citar prova; ignore ban no classification
        if (i.code === 'banned_enare_label' || i.code === 'banned_style_label') return false;
        return true;
      })
    : issues;

  const codes = filtered.map((i) => i.code);
  const errors = filtered.filter((i) => i.severity === 'error');
  const stemLen = String(q.statement || '').trim().length;

  if (codes.includes('duplicate_options') || codes.some((c) => c.startsWith('banned_'))) {
    return {
      quality_label: 'deve_ser_excluida',
      suspend: true,
      notes: `Excluir: ${filtered
        .filter((i) => i.code.startsWith('banned_') || i.code === 'duplicate_options')
        .map((i) => i.message)
        .join('; ')}`,
      codes,
    };
  }

  if (codes.includes('gabarito_invalid') || codes.includes('correct_option_leak')) {
    return {
      quality_label: 'gabarito_duvidoso',
      suspend: true,
      notes: 'Gabarito inválido ou vazamento na alternativa correta.',
      codes,
    };
  }

  if (
    codes.includes('options_unbalanced') ||
    codes.includes('correct_longest') ||
    codes.includes('option_too_short')
  ) {
    return {
      quality_label: 'alternativa_ambigua',
      suspend: !official, // oficiais: manter texto, mas marcar
      notes: 'Alternativas desbalanceadas, curtas ou gabarito óbvio por tamanho.',
      codes,
    };
  }

  if (codes.includes('stem_short') || (stemLen < 160 && !official)) {
    return {
      quality_label: stemLen < 100 ? 'enunciado_mal_construido' : 'muito_facil',
      suspend: !official,
      notes: `Enunciado curto/óbvio (${stemLen} chars) — inadequado para disputa de residência.`,
      codes,
    };
  }

  if (codes.includes('vignette_thin') && !official) {
    return {
      quality_label: 'enunciado_mal_construido',
      suspend: true,
      notes: 'Vinheta sem dados clínicos suficientes.',
      codes,
    };
  }

  if (official && errors.length === 0) {
    return {
      quality_label: 'aprovada',
      suspend: false,
      notes: 'Prova oficial com estrutura válida — prioridade na disputa.',
      codes,
    };
  }

  if (official) {
    return {
      quality_label: 'precisa_de_correcao',
      suspend: false,
      notes: `Oficial com avisos: ${filtered.map((i) => i.message).join('; ') || 'revisar metadados'}`,
      codes,
    };
  }

  // Sintética sem erro grave estrutural — ainda assim fora da disputa até revisão humana
  if (isSyntheticExpert(q)) {
    return {
      quality_label: errors.length ? 'precisa_de_correcao' : 'precisa_de_correcao',
      suspend: true,
      notes:
        'Sintética/expert suspensa até o banco oficial estar consolidado e revisão humana.',
      codes,
    };
  }

  if (errors.length > 0) {
    return {
      quality_label: 'precisa_de_correcao',
      suspend: true,
      notes: errors.map((e) => e.message).join('; '),
      codes,
    };
  }

  return {
    quality_label: 'aprovada',
    suspend: false,
    notes: 'Aprovada automaticamente (sem problemas estruturais).',
    codes,
  };
}

export function bankStatusForClassify(result: ClassifyResult, current?: string | null): string {
  if (result.quality_label === 'anulada') return 'annulled';
  if (result.quality_label === 'deve_ser_excluida') return 'disabled';
  if (result.suspend) return 'disabled';
  if (result.quality_label === 'aprovada') return 'approved';
  return current === 'pending_review' ? 'pending_review' : 'approved';
}
