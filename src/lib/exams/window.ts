export const EXAM_TIMEZONE = 'America/Sao_Paulo';
export const EXAM_WINDOW_START_HOUR = 7;
export const EXAM_WINDOW_END_HOUR = 22;

export type ExamWindowPhase = 'before' | 'open' | 'after' | 'wrong_day';

export interface BrazilClock {
  date: string;
  hour: number;
  minute: number;
  second: number;
}

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

export function isWithinExamHours(now = new Date()): boolean {
  const mins = minutesSinceMidnightBrazil(now);
  return mins >= EXAM_WINDOW_START_HOUR * 60 && mins < EXAM_WINDOW_END_HOUR * 60;
}

export function getSecondsUntilWindowClose(now = new Date()): number {
  const { hour, minute, second } = getBrazilClock(now);
  const nowSeconds = hour * 3600 + minute * 60 + second;
  const closeSeconds = EXAM_WINDOW_END_HOUR * 3600;
  if (nowSeconds >= closeSeconds) return 0;
  return closeSeconds - nowSeconds;
}

export function getExamWindowPhase(examDate: string, now = new Date()): ExamWindowPhase {
  const clock = getBrazilClock(now);
  if (clock.date < examDate) return 'wrong_day';
  if (clock.date > examDate) return 'after';
  if (!isWithinExamHours(now)) {
    return minutesSinceMidnightBrazil(now) < EXAM_WINDOW_START_HOUR * 60 ? 'before' : 'after';
  }
  return 'open';
}

export function formatExamWindowLabel(): string {
  return `Das ${EXAM_WINDOW_START_HOUR}h às ${EXAM_WINDOW_END_HOUR}h (horário de Brasília)`;
}

export function formatExamWindowShort(): string {
  return `${EXAM_WINDOW_START_HOUR}h–${EXAM_WINDOW_END_HOUR}h`;
}
