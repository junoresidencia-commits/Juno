import type { TreinoTrack } from '@/lib/treino/config';
import {
  NEFROLOGIA_AVANCADA_TRACK,
  NEFROPEDIATRIA_TRACK,
} from '@/lib/treino/config';

export type DailyExamTrack = TreinoTrack;

/** Modo da disputa de Nefrologia do dia. */
export type NephrologyExamMode =
  | 'mixed' // 10 adulto + 10 ped (padrão)
  | 'adult'
  | 'pediatric'
  | 'thematic';

export type NephrologyDayPlan = {
  mode: NephrologyExamMode;
  /** Track principal (compat / título). Em mixed = adulto. */
  track: DailyExamTrack;
  adultCount: number;
  pediatricCount: number;
  themeLabel?: string;
};

/**
 * Plano do dia para Nefrologia.
 * - Maioria dos dias: 10 adulto + 10 pediátrica (spec §3).
 * - A cada 7º dia (índice % 7 === 6): só adulto ou só ped, alternando.
 */
export function nephrologyPlanForDate(dateStr: string): NephrologyDayPlan {
  const ms = Date.parse(`${dateStr}T12:00:00-03:00`);
  const dayIndex = Math.floor(ms / 86_400_000);
  const slot = dayIndex % 7;

  if (slot === 5) {
    return {
      mode: 'adult',
      track: NEFROLOGIA_AVANCADA_TRACK,
      adultCount: DAILY_EXAM_QUESTION_COUNT,
      pediatricCount: 0,
      themeLabel: 'somente Nefrologia',
    };
  }
  if (slot === 6) {
    return {
      mode: 'pediatric',
      track: NEFROPEDIATRIA_TRACK,
      adultCount: 0,
      pediatricCount: DAILY_EXAM_QUESTION_COUNT,
      themeLabel: 'somente Nefropediatria',
    };
  }

  return {
    mode: 'mixed',
    track: NEFROLOGIA_AVANCADA_TRACK,
    adultCount: 10,
    pediatricCount: 10,
  };
}

/** Compat: track “principal” do dia (usado em títulos legados). */
export function trackForDate(dateStr: string): DailyExamTrack {
  return nephrologyPlanForDate(dateStr).track;
}

export function titleForDailyTrack(track: DailyExamTrack, dateStr: string): string {
  const plan = nephrologyPlanForDate(dateStr);
  const [y, m, d] = dateStr.split('-');
  let label: string;
  if (plan.mode === 'mixed') {
    label = 'Nefrologia + Nefropediatria';
  } else if (plan.themeLabel) {
    label = plan.themeLabel;
  } else {
    label =
      track === NEFROPEDIATRIA_TRACK || plan.mode === 'pediatric'
        ? 'Nefrologia Pediátrica'
        : 'Nefrologia';
  }
  return `Disputa do dia · ${label} · ${d}/${m}/${y}`;
}

export function shortTrackLabel(track: DailyExamTrack, dateStr?: string): string {
  if (dateStr) {
    const plan = nephrologyPlanForDate(dateStr);
    if (plan.mode === 'mixed') return 'Nefrologia + Nefropediatria';
    if (plan.themeLabel) return plan.themeLabel;
  }
  return track === NEFROPEDIATRIA_TRACK ? 'Nefrologia Pediátrica' : 'Nefrologia';
}

export function addCalendarDaysBrazil(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T12:00:00-03:00`);
  date.setDate(date.getDate() + days);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const DAILY_EXAM_QUESTION_COUNT = 20;
export const DAILY_EXAM_DURATION_MINUTES = 30;
/**
 * Pipeline IA (revisar + trocar) é caro — só gera a disputa de HOJE (1×/dia).
 * Não pré-gerar horizonte longo.
 */
export const DAILY_EXAM_HORIZON_DAYS = 1;
