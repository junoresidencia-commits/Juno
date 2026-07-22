import type { TreinoTrack } from '@/lib/treino/config';
import {
  NEFROLOGIA_AVANCADA_TRACK,
  NEFROPEDIATRIA_TRACK,
} from '@/lib/treino/config';

export type DailyExamTrack = TreinoTrack;

/** Dia par (epoch BRT) → Nefrologia adulta; ímpar → Nefropediatria. */
export function trackForDate(dateStr: string): DailyExamTrack {
  const ms = Date.parse(`${dateStr}T12:00:00-03:00`);
  const dayIndex = Math.floor(ms / 86_400_000);
  return dayIndex % 2 === 0 ? NEFROLOGIA_AVANCADA_TRACK : NEFROPEDIATRIA_TRACK;
}

export function titleForDailyTrack(track: DailyExamTrack, dateStr: string): string {
  const label =
    track === NEFROPEDIATRIA_TRACK ? 'Nefrologia Pediátrica' : 'Nefrologia';
  const [y, m, d] = dateStr.split('-');
  return `Disputa do dia · ${label} · ${d}/${m}/${y}`;
}

export function shortTrackLabel(track: DailyExamTrack): string {
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
