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

export function getYearStart(date = new Date()): string {
  return toDateString(new Date(Date.UTC(date.getFullYear(), 0, 1)));
}

export function getYearEnd(date = new Date()): string {
  return toDateString(new Date(Date.UTC(date.getFullYear(), 11, 31)));
}

/** Dias restantes no mês civil (incluindo hoje). */
export function daysLeftInMonth(date = new Date()): number {
  const end = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
  const today = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return Math.max(0, Math.round((end.getTime() - today.getTime()) / 86400000) + 1);
}

/** Últimos N meses (sem o mês atual), do mais recente ao mais antigo. */
export function listPastMonthStarts(count = 6, date = new Date()): string[] {
  const out: string[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth() - i, 1));
    out.push(getMonthStart(d));
  }
  return out;
}

export function monthLabelPt(periodStart: string): string {
  const [y, m] = periodStart.split('-').map(Number);
  const d = new Date(Date.UTC(y, (m || 1) - 1, 1));
  const label = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return label.charAt(0).toUpperCase() + label.slice(1);
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
    case 'yearly':
      return {
        type,
        start: getYearStart(date),
        end: getYearEnd(date),
        label: 'Ano',
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
  { value: 'monthly', label: 'Mensal' },
  { value: 'yearly', label: 'Anual' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'daily', label: 'Diário' },
  { value: 'general', label: 'Geral' },
];

/** Períodos do aluno — mensal primeiro (disputa que zera todo mês). */
export const STUDENT_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'yearly', label: 'Anual' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'daily', label: 'Diário' },
];

/** Rankings internos de grupo */
export const GROUP_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'yearly', label: 'Anual' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'daily', label: 'Diário' },
];

export const DEFAULT_STUDENT_RANKING_PERIOD: PeriodType = 'monthly';
