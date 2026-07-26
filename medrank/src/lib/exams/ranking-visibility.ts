import type { Exam } from '@/types/database';
import {
  EXAM_WINDOW_END_HOUR,
  EXAM_WINDOW_END_MINUTE,
  boundsFromExamHours,
  getBrazilClock,
  getExamWindowPhase,
  todayDateStringBrazil,
} from '@/lib/exams/window';
import { formatDateBR } from '@/lib/format';

/**
 * Ranking diário visível:
 * - Quem terminou a prova: vê o ranking (atualiza conforme outros terminam)
 * - Após o fim da janela (21h): todos veem
 */
export function canStudentSeeTodayRanking(
  exam: Pick<Exam, 'date_available' | 'window_start_hour' | 'window_end_hour'> | null,
  hasFinishedAttempt: boolean,
  now = new Date()
): boolean {
  if (!exam) return false;

  const b = boundsFromExamHours(exam.window_start_hour, exam.window_end_hour);
  const phase = getExamWindowPhase(
    exam.date_available,
    now,
    b.startHour,
    b.endHour,
    b.startMinute,
    b.endMinute
  );
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
  return `Ranking liberado após o horário da disputa (${EXAM_WINDOW_END_HOUR}h).`;
}

/** Gabarito logo após terminar — reforço imediato do aprendizado */
export function canStudentSeeExamGabarito(
  exam: Pick<Exam, 'date_available'> | null,
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
 * - liberado depois que a janela fecha (21h) no dia da prova, ou em dias seguintes
 */
export function canStudentDownloadExamPdf(
  exam: Pick<Exam, 'date_available' | 'window_start_hour' | 'window_end_hour'> | null,
  hasFinishedAttempt: boolean,
  now = new Date()
): boolean {
  if (!exam || !hasFinishedAttempt) return false;
  const clock = getBrazilClock(now);
  if (clock.date > exam.date_available) return true;
  if (clock.date < exam.date_available) return false;
  const b = boundsFromExamHours(exam.window_start_hour, exam.window_end_hour);
  const phase = getExamWindowPhase(
    exam.date_available,
    now,
    b.startHour,
    b.endHour,
    b.startMinute,
    b.endMinute
  );
  return phase === 'after';
}

export function studentExamPdfBeforeReleaseMessage(
  exam?: Pick<Exam, 'window_end_hour'> | null
): string {
  const end =
    exam?.window_end_hour === EXAM_WINDOW_END_HOUR || exam?.window_end_hour == null
      ? `${EXAM_WINDOW_END_HOUR}h${EXAM_WINDOW_END_MINUTE === 0 ? '' : String(EXAM_WINDOW_END_MINUTE).padStart(2, '0')}`
      : `${exam.window_end_hour}h`;
  return `O PDF da prova libera às ${end} (Brasília), depois que a disputa fecha — e você já tiver terminado.`;
}

export function getTodayRankingDate(now = new Date()): string {
  return todayDateStringBrazil(now);
}

/** Ranking visível no resultado logo após enviar a prova */
export function canShowRankingOnResult(hasFinishedAttempt: boolean): boolean {
  return hasFinishedAttempt;
}
