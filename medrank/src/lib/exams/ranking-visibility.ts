import { addDays } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { formatDateBR } from '@/lib/format';

/** Data do ranking diário que o aluno pode ver (sempre o dia anterior). */
export function getStudentDailyRankingDate(now = new Date()): string {
  return addDays(todayDateStringBrazil(now), -1);
}

export function canStudentSeeDailyRanking(examDate: string, now = new Date()): boolean {
  return todayDateStringBrazil(now) > examDate;
}

export function studentDailyRankingLabel(date: string): string {
  return `Ranking de ${formatDateBR(date)}`;
}

export function studentRankingAvailableTomorrowMessage(): string {
  return 'O ranking de hoje sai amanhã, a partir das 7h.';
}
