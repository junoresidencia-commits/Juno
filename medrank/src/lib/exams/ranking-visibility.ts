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

export type RankingVisibilityOpts = {
  /** Todos os membros ativos do grupo já finalizaram a disputa de hoje. */
  allGroupFinished?: boolean;
  now?: Date;
};

/**
 * Ranking diário liberado só quando:
 * - a janela da disputa fechou (21h), ou
 * - todos do grupo já terminaram
 *
 * Quem termina cedo NÃO vê o placar — evita vazar posição/nota para quem ainda faz a prova.
 */
export function canStudentSeeTodayRanking(
  exam: Pick<Exam, 'date_available' | 'window_start_hour' | 'window_end_hour'> | null,
  _hasFinishedAttempt: boolean,
  opts: RankingVisibilityOpts = {}
): boolean {
  if (!exam) return false;

  const now = opts.now ?? new Date();
  const today = todayDateStringBrazil(now);
  if (exam.date_available !== today && today < exam.date_available) return false;
  // Dias anteriores: ranking histórico ok
  if (today > exam.date_available) return true;

  if (opts.allGroupFinished) return true;

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

export function studentDailyRankingLabel(date: string): string {
  const today = todayDateStringBrazil();
  if (date === today) return 'Ranking de hoje';
  return `Ranking de ${formatDateBR(date)}`;
}

export function studentRankingBeforeFinishMessage(): string {
  return 'Ranking libera quando todos do grupo terminarem a disputa (ou após o horário, às 21h).';
}

export function studentRankingAfterWindowMessage(): string {
  return `Ranking liberado após o horário da disputa (${EXAM_WINDOW_END_HOUR}h) ou quando todos terminarem.`;
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

/**
 * Gabarito + PDF de estudo: SOMENTE após a janela (21h).
 * Não libera quando o grupo termina cedo — evita cola (quem acabou vaza respostas).
 */
export function canStudentSeeExamGabarito(
  exam: Pick<Exam, 'date_available' | 'window_start_hour' | 'window_end_hour'> | null,
  hasFinishedAttempt: boolean,
  opts: RankingVisibilityOpts = {}
): boolean {
  return canStudentDownloadExamPdf(exam, hasFinishedAttempt, opts.now);
}

export function studentGabaritoBeforeWindowMessage(): string {
  return 'Pontuação, acertos, gabarito e PDF liberam só às 21h (Brasília), quando a disputa fecha. Até lá só o tempo (e o ranking do grupo, se todos já terminaram) ficam visíveis.';
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

/** Posição no ranking no resultado: mesma regra do placar do dia. */
export function canShowRankingOnResult(
  exam: Pick<Exam, 'date_available' | 'window_start_hour' | 'window_end_hour'> | null,
  hasFinishedAttempt: boolean,
  opts: RankingVisibilityOpts = {}
): boolean {
  return canStudentSeeTodayRanking(exam, hasFinishedAttempt, opts);
}
