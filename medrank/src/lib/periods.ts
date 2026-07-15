import type { PeriodType } from '@/types/database';

export interface PeriodBounds {
  type: PeriodType;
  start: string;
  end: string;
  label: string;
}

function toDateString(d: Date): string {
  return d.toISOString().split('T')[0];
}

/** Segunda-feira da semana ISO (compatível com date_trunc('week') do PostgreSQL) */
export function getWeekStart(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return toDateString(d);
}

export function getWeekEnd(date = new Date()): string {
  const start = new Date(getWeekStart(date) + 'T00:00:00Z');
  start.setUTCDate(start.getUTCDate() + 6);
  return toDateString(start);
}

export function getMonthStart(date = new Date()): string {
  return toDateString(new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1)));
}

export function getMonthEnd(date = new Date()): string {
  return toDateString(new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)));
}

export function getPeriodBounds(type: PeriodType, date = new Date()): PeriodBounds {
  const today = toDateString(date);

  switch (type) {
    case 'daily':
      return { type, start: today, end: today, label: 'Hoje' };
    case 'weekly':
      return {
        type,
        start: getWeekStart(date),
        end: getWeekEnd(date),
        label: 'Semana',
      };
    case 'monthly':
      return {
        type,
        start: getMonthStart(date),
        end: getMonthEnd(date),
        label: 'Mês',
      };
    case 'general':
      return {
        type,
        start: '2000-01-01',
        end: today,
        label: 'Geral',
      };
  }
}

export const PERIOD_OPTIONS: { value: PeriodType; label: string }[] = [
  { value: 'daily', label: 'Diário' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'general', label: 'Geral' },
];

/** Períodos visíveis para alunos (competição diária + semanal) */
export const STUDENT_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'daily', label: 'Diário' },
  { value: 'weekly', label: 'Semanal' },
];

/** Rankings internos de grupo (inclui mensal) */
export const GROUP_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'daily', label: 'Diário' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
];
