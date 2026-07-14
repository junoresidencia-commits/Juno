import type { Exam } from '@/types/database';
import { getExamWindowPhase } from '@/lib/exams/window';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { formatDateBR } from '@/lib/format';

/**
 * Ranking diário visível:
 * - Quem terminou a prova: vê o ranking (atualiza conforme outros terminam)
 * - Após 23h59: todos veem (quem fez e quem não fez)
 */
export function canStudentSeeTodayRanking(
  exam: Pick<Exam, 'date_available'> | null,
  hasFinishedAttempt: boolean,
  now = new Date()
): boolean {
  if (!exam) return false;

  const phase = getExamWindowPhase(exam.date_available, now);
  const today = todayDateStringBrazil(now);

  if (exam.date_available !== today) return false;

  if (hasFinishedAttempt) return true;

  return phase === 'after';
}

export function studentDailyRankingLabel(date: string): string {
  const today = todayDateStringBrazil();
  if (date === today) return 'Ranking de hoje';
  return `Ranking de ${formatDateBR(date)}`;
}

export function studentRankingBeforeFinishMessage(): string {
  return 'Termine a disputa de hoje para ver o ranking.';
}

export function studentRankingAfterWindowMessage(): string {
  return 'Ranking liberado após o horário da disputa (23h59).';
}

/** Gabarito logo após terminar — reforço imediato do aprendizado */
export function canStudentSeeExamGabarito(
  exam: Pick<import('@/types/database').Exam, 'date_available'> | null,
  hasFinishedAttempt: boolean,
  _now = new Date()
): boolean {
  if (!exam || !hasFinishedAttempt) return false;
  return true;
}

export function studentGabaritoBeforeWindowMessage(): string {
  return 'Finalize a disputa para ver o gabarito comentado.';
}

export function getTodayRankingDate(now = new Date()): string {
  return todayDateStringBrazil(now);
}

/** Ranking visível no resultado logo após enviar a prova */
export function canShowRankingOnResult(hasFinishedAttempt: boolean): boolean {
  return hasFinishedAttempt;
}
