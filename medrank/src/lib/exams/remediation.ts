import type { OptionLetter } from '@/types/database';

export type RemediationAction =
  | 'annul'
  | 'zero_score'
  | 'change_gabarito'
  | 'recalculate_only'
  | 'restore';

export type ApplyRemediationInput = {
  examId: string;
  questionId: string;
  action: RemediationAction;
  reason: string;
  newCorrectOption?: OptionLetter | null;
  bankWide?: boolean;
  notifyUsers?: boolean;
};

export type ApplyRemediationResult = {
  remediation_id?: string;
  exam_id: string;
  question_id: string;
  action: RemediationAction;
  old_correct_option?: string | null;
  new_correct_option?: string | null;
  attempts_updated: number;
  rankings_recalculated: boolean;
  notified_count: number;
  rescore?: Record<string, unknown>;
};

export const REMEDIATION_ACTION_LABELS: Record<RemediationAction, string> = {
  annul: 'Anular / excluir da prova',
  zero_score: 'Zerar pontuação desta questão',
  change_gabarito: 'Alterar gabarito e redistribuir pontos',
  recalculate_only: 'Só recalcular ranking/pontuação',
  restore: 'Restaurar questão (desfazer anulação)',
};

export function validateRemediationInput(input: ApplyRemediationInput): string | null {
  if (!input.examId || !input.questionId) return 'examId e questionId são obrigatórios';
  if (!input.reason || input.reason.trim().length < 8) {
    return 'Informe um motivo com pelo menos 8 caracteres';
  }
  const actions: RemediationAction[] = [
    'annul',
    'zero_score',
    'change_gabarito',
    'recalculate_only',
    'restore',
  ];
  if (!actions.includes(input.action)) return 'Ação inválida';
  if (input.action === 'change_gabarito') {
    const opt = input.newCorrectOption;
    if (!opt || !['A', 'B', 'C', 'D', 'E'].includes(opt)) {
      return 'Novo gabarito (A–E) é obrigatório para alterar gabarito';
    }
  }
  return null;
}
