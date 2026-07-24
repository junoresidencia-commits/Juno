/**
 * Trilhas/módulos que o admin liga ou desliga por aluno.
 * Novas especialidades (ex.: RM) entram aqui depois.
 */

export type AppTrackId = 'nephrology' | 'general' | 'mri';

export type AppTrackDef = {
  id: AppTrackId;
  label: string;
  shortLabel: string;
  description: string;
  /** Disputa diária associada (null = ainda sem disputa). */
  dailyAudience: 'nephrology' | 'general' | null;
  /** Libera treinos livres Nefro/Nefroped. */
  unlocksNephrologyTreino: boolean;
  comingSoon?: boolean;
};

export const APP_TRACKS: AppTrackDef[] = [
  {
    id: 'general',
    label: 'Residência Geral (acesso padrão)',
    shortLabel: 'Residência Geral',
    description:
      'Prova diária padrão de todo aluno — 20 questões, 30 min, banco aprovado. Sempre ligada.',
    dailyAudience: 'general',
    unlocksNephrologyTreino: false,
  },
  {
    id: 'nephrology',
    label: 'Nefrologia (acesso exclusivo)',
    shortLabel: 'Nefrologia',
    description:
      'Só com autorização do admin. Libera disputa diária nefro/nefroped + treinos. Grupo social NÃO libera.',
    dailyAudience: 'nephrology',
    unlocksNephrologyTreino: true,
  },
  {
    id: 'mri',
    label: 'Ressonância / RM',
    shortLabel: 'RM',
    description: 'Em breve — você liga quando o módulo estiver pronto.',
    dailyAudience: null,
    unlocksNephrologyTreino: false,
    comingSoon: true,
  },
];

export const ACTIVE_TRACK_IDS = APP_TRACKS.filter((t) => !t.comingSoon).map((t) => t.id);

export function normalizeTracks(raw: unknown): AppTrackId[] {
  if (!Array.isArray(raw)) return [];
  const allowed = new Set(APP_TRACKS.map((t) => t.id));
  return [...new Set(raw.map(String).filter((id): id is AppTrackId => allowed.has(id as AppTrackId)))];
}

export function parseTracksFromForm(values: Record<string, string | string[]>): AppTrackId[] {
  const raw = values.tracks ?? values.enabled_tracks;
  if (Array.isArray(raw)) return normalizeTracks(raw);
  if (typeof raw === 'string' && raw.trim()) {
    return normalizeTracks(raw.split(',').map((s) => s.trim()));
  }
  // checkboxes: track_nephrology=on
  const out: AppTrackId[] = [];
  for (const t of APP_TRACKS) {
    if (t.comingSoon) continue;
    const v = values[`track_${t.id}`];
    if (v === 'on' || v === '1' || v === 'true') out.push(t.id);
  }
  return out;
}

export function trackLabels(tracks: AppTrackId[]): string {
  return tracks
    .map((id) => APP_TRACKS.find((t) => t.id === id)?.shortLabel ?? id)
    .join(' · ');
}
