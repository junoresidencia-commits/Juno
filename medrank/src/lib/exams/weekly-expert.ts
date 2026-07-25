/** Desafio Expert: 5 casos clínicos difíceis criados pelo professor. */

export const WEEKLY_EXPERT_QUESTION_COUNT = 5;
export const WEEKLY_EXPERT_DURATION_MINUTES = 25;
/** Abre às 20h (Brasília) no dia escolhido. */
export const WEEKLY_EXPERT_WINDOW_START_HOUR = 20;
export const WEEKLY_EXPERT_WINDOW_END_HOUR = 24;
/** Acertos valem o dobro no ranking. */
export const WEEKLY_EXPERT_SCORE_MULTIPLIER = 2;
export const WEEKLY_EXPERT_AUDIENCE = 'general' as const;

export function weeklyExpertTitle(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `Desafio Expert · ${d}/${m}`;
}

export function weeklyExpertLoteTag(dateStr: string): string {
  return `MEDRANK_EXPERT_${dateStr.replace(/-/g, '')}`;
}
