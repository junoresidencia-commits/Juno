export const EXAM_TIMEZONE = 'America/Sao_Paulo';

/** Disputa diária: 8h30 → 21h (Brasília). */
export const EXAM_WINDOW_START_HOUR = 8;
export const EXAM_WINDOW_START_MINUTE = 30;
export const EXAM_WINDOW_END_HOUR = 21;
export const EXAM_WINDOW_END_MINUTE = 0;

export type ExamWindowPhase = 'before' | 'open' | 'after' | 'wrong_day';

export interface BrazilClock {
  date: string;
  hour: number;
  minute: number;
  second: number;
}

export type ExamWindowBounds = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

export function getBrazilClock(now = new Date()): BrazilClock {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: EXAM_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const year = get('year');
  const month = String(get('month')).padStart(2, '0');
  const day = String(get('day')).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

export function todayDateStringBrazil(now = new Date()): string {
  return getBrazilClock(now).date;
}

export function minutesSinceMidnightBrazil(now = new Date()): number {
  const { hour, minute } = getBrazilClock(now);
  return hour * 60 + minute;
}

export function defaultExamWindowBounds(): ExamWindowBounds {
  return {
    startHour: EXAM_WINDOW_START_HOUR,
    startMinute: EXAM_WINDOW_START_MINUTE,
    endHour: EXAM_WINDOW_END_HOUR,
    endMinute: EXAM_WINDOW_END_MINUTE,
  };
}

/** Converte hora do DB (+ minuto padrão da disputa 8h30 quando start=8). */
export function boundsFromExamHours(
  startHour?: number | null,
  endHour?: number | null
): ExamWindowBounds {
  const start = startHour ?? EXAM_WINDOW_START_HOUR;
  const end = endHour ?? EXAM_WINDOW_END_HOUR;
  return {
    startHour: start,
    startMinute: start === EXAM_WINDOW_START_HOUR ? EXAM_WINDOW_START_MINUTE : 0,
    endHour: end,
    endMinute: end === EXAM_WINDOW_END_HOUR ? EXAM_WINDOW_END_MINUTE : 0,
  };
}

function toMinutes(hour: number, minute: number): number {
  return hour * 60 + minute;
}

export function isWithinExamHours(
  now = new Date(),
  bounds: ExamWindowBounds = defaultExamWindowBounds()
): boolean {
  const mins = minutesSinceMidnightBrazil(now);
  return (
    mins >= toMinutes(bounds.startHour, bounds.startMinute) &&
    mins < toMinutes(bounds.endHour, bounds.endMinute)
  );
}

export function getSecondsUntilWindowClose(
  now = new Date(),
  bounds: ExamWindowBounds = defaultExamWindowBounds()
): number {
  const { hour, minute, second } = getBrazilClock(now);
  const nowSeconds = hour * 3600 + minute * 60 + second;
  const closeSeconds = bounds.endHour * 3600 + bounds.endMinute * 60;
  if (nowSeconds >= closeSeconds) return 0;
  return closeSeconds - nowSeconds;
}

export function getExamWindowPhase(
  examDate: string,
  now = new Date(),
  windowStartHour = EXAM_WINDOW_START_HOUR,
  windowEndHour = EXAM_WINDOW_END_HOUR,
  windowStartMinute = EXAM_WINDOW_START_MINUTE,
  windowEndMinute = EXAM_WINDOW_END_MINUTE
): ExamWindowPhase {
  const clock = getBrazilClock(now);
  if (clock.date < examDate) return 'wrong_day';
  if (clock.date > examDate) return 'after';
  const mins = minutesSinceMidnightBrazil(now);
  const start = toMinutes(windowStartHour, windowStartMinute);
  const end = toMinutes(windowEndHour, windowEndMinute);
  if (mins < start) return 'before';
  if (mins >= end) return 'after';
  return 'open';
}

function formatClock(hour: number, minute: number): string {
  if (minute === 0) return `${hour}h`;
  return `${hour}h${String(minute).padStart(2, '0')}`;
}

export function formatExamWindowLabel(
  startHour = EXAM_WINDOW_START_HOUR,
  endHour = EXAM_WINDOW_END_HOUR,
  startMinute = EXAM_WINDOW_START_MINUTE,
  endMinute = EXAM_WINDOW_END_MINUTE
): string {
  return `Das ${formatClock(startHour, startMinute)} às ${formatClock(endHour, endMinute)} (horário de Brasília)`;
}

export function formatExamWindowShort(
  startHour = EXAM_WINDOW_START_HOUR,
  endHour = EXAM_WINDOW_END_HOUR,
  startMinute = EXAM_WINDOW_START_MINUTE,
  endMinute = EXAM_WINDOW_END_MINUTE
): string {
  return `${formatClock(startHour, startMinute)}–${formatClock(endHour, endMinute)}`;
}
