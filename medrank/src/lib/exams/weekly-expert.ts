/** Desafio Expert: 5 casos clínicos difíceis criados pelo professor. */

export const WEEKLY_EXPERT_QUESTION_COUNT = 5;
export const WEEKLY_EXPERT_DURATION_MINUTES = 25;
/** Janela no dia que o professor escolher (não é dia fixo da semana). */
export const WEEKLY_EXPERT_WINDOW_START_HOUR = 20;
/** Fecha 2h depois — só dá para realizar nesse intervalo. */
export const WEEKLY_EXPERT_WINDOW_END_HOUR = 22;
export const WEEKLY_EXPERT_WINDOW_HOURS =
  WEEKLY_EXPERT_WINDOW_END_HOUR - WEEKLY_EXPERT_WINDOW_START_HOUR;
/** Acertos valem o dobro no ranking. */
export const WEEKLY_EXPERT_SCORE_MULTIPLIER = 2;
export const WEEKLY_EXPERT_AUDIENCE = 'general' as const;

export function weeklyExpertWindowLabel(
  start = WEEKLY_EXPERT_WINDOW_START_HOUR,
  end = WEEKLY_EXPERT_WINDOW_END_HOUR
): string {
  return `${start}h–${end}h`;
}

export function weeklyExpertTitle(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `Desafio Expert · ${d}/${m}`;
}

export function weeklyExpertLoteTag(dateStr: string): string {
  return `MEDRANK_EXPERT_${dateStr.replace(/-/g, '')}`;
}
