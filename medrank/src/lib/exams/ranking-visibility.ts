import type { Exam } from '@/types/database';
import { getBrazilClock, getExamWindowPhase, todayDateStringBrazil } from '@/lib/exams/window';
import { formatDateBR } from '@/lib/format';

/** Após 22h (Brasília) do dia da prova, libera PDF sem comentários. */
export const EXAM_PDF_RELEASE_HOUR = 22;

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

/**
 * PDF da prova (só enunciados/alternativas, sem gabarito/comentários):
 * - aluno precisa ter terminado a disputa
 * - liberado a partir das 22h do dia da prova (horário de Brasília), ou em dias seguintes
 */
export function canStudentDownloadExamPdf(
  exam: Pick<Exam, 'date_available'> | null,
  hasFinishedAttempt: boolean,
  now = new Date()
): boolean {
  if (!exam || !hasFinishedAttempt) return false;
  const clock = getBrazilClock(now);
  if (clock.date > exam.date_available) return true;
  if (clock.date < exam.date_available) return false;
  return clock.hour >= EXAM_PDF_RELEASE_HOUR;
}

export function studentExamPdfBeforeReleaseMessage(): string {
  return `O PDF da prova (sem comentários) libera às ${EXAM_PDF_RELEASE_HOUR}h (horário de Brasília), depois que você terminar.`;
}

export function getTodayRankingDate(now = new Date()): string {
  return todayDateStringBrazil(now);
}

/** Ranking visível no resultado logo após enviar a prova */
export function canShowRankingOnResult(hasFinishedAttempt: boolean): boolean {
  return hasFinishedAttempt;
}
