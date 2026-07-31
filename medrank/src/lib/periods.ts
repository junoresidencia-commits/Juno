import type { CollectivePeriodType, PeriodType } from '@/types/database';

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

/** Trimestre civil (igual date_trunc('quarter') no Postgres): Jan–Mar, Abr–Jun, Jul–Set, Out–Dez. */
export function getQuarterStart(date = new Date()): string {
  const q = Math.floor(date.getUTCMonth() / 3) * 3;
  return toDateString(new Date(Date.UTC(date.getFullYear(), q, 1)));
}

export function getQuarterEnd(date = new Date()): string {
  const q = Math.floor(date.getUTCMonth() / 3) * 3;
  return toDateString(new Date(Date.UTC(date.getFullYear(), q + 3, 0)));
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

/** Dias restantes no trimestre civil (incluindo hoje). */
export function daysLeftInQuarter(date = new Date()): number {
  const end = new Date(getQuarterEnd(date) + 'T00:00:00Z');
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

export function collectivePeriodLabel(period: CollectivePeriodType): string {
  switch (period) {
    case 'weekly':
      return 'Semana';
    case 'monthly':
      return 'Mês';
    case 'quarterly':
      return 'Trimestre';
    case 'yearly':
      return 'Ano';
  }
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
    case 'quarterly':
      return {
        type,
        start: getQuarterStart(date),
        end: getQuarterEnd(date),
        label: 'Trimestre',
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
  { value: 'weekly', label: 'Semanal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'yearly', label: 'Anual' },
  { value: 'daily', label: 'Diário' },
  { value: 'general', label: 'Geral' },
];

/** Abas principais do aluno — poucas, foco na disputa. */
export const STUDENT_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'yearly', label: 'Anual' },
];

/** Links secundários (não competem visualmente com as abas). */
export const STUDENT_RANKING_SECONDARY_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'daily', label: 'Só hoje' },
];

/** Todos os períodos que o aluno pode abrir via URL. */
export const STUDENT_RANKING_ALL_PERIODS: { value: PeriodType; label: string }[] = [
  ...STUDENT_RANKING_PERIODS,
  ...STUDENT_RANKING_SECONDARY_PERIODS,
];

/** Rankings internos de grupo — mesmos períodos principais do aluno. */
export const GROUP_RANKING_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'monthly', label: 'Mensal' },
  { value: 'weekly', label: 'Semanal' },
  { value: 'yearly', label: 'Anual' },
];

export const GROUP_RANKING_SECONDARY_PERIODS: { value: PeriodType; label: string }[] = [
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'daily', label: 'Só hoje' },
];

export function studentPeriodLabel(period: PeriodType): string {
  return (
    STUDENT_RANKING_ALL_PERIODS.find((p) => p.value === period)?.label ??
    PERIOD_OPTIONS.find((p) => p.value === period)?.label ??
    'Ranking'
  );
}

/** Ranking entre ligas (coletivo) */
export const COLLECTIVE_RANKING_PERIODS: { value: CollectivePeriodType; label: string }[] = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'yearly', label: 'Anual' },
];

export const DEFAULT_STUDENT_RANKING_PERIOD: PeriodType = 'monthly';
export const DEFAULT_COLLECTIVE_RANKING_PERIOD: CollectivePeriodType = 'weekly';
