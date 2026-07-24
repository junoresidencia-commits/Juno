import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { normalizeTracks, type AppTrackId } from '@/lib/tracks/config';

export type ExamAudience = 'general' | 'nephrology';

export const NEPHROLOGY_LEAGUE_NAME = 'Liga de Nefrologia';

export interface UserExamContext {
  /**
   * Audiência “principal” (compat): nefro se liberado; senão geral.
   */
  audience: ExamAudience;
  /** Disputas do dia liberadas. Residência Geral é sempre padrão. */
  audiences: ExamAudience[];
  hasNephrology: boolean;
  hasGeneral: boolean;
  /** Tracks ligados pelo admin (nephrology, general, mri…). */
  enabledTracks: AppTrackId[];
  leagueId: string | null;
  leagueName: string | null;
  generalGroupId: string | null;
  generalGroupName: string | null;
  rankingGroupId: string | null;
  rankingGroupName: string | null;
}

type GroupRow = {
  id: string;
  name: string;
  active: boolean;
  exam_audience?: string;
};

/** Grupo oficial da disputa de Nefrologia (não confundir com grupo social). */
function isOfficialNephrologyLeague(g: GroupRow): boolean {
  return (
    g.exam_audience === 'nephrology' ||
    g.name.toLowerCase() === 'liga de nefrologia'
  );
}

/**
 * Resolve disputas a partir dos tracks do admin.
 * - Residência Geral: sempre liberada (padrão da plataforma).
 * - Nefrologia: SOMENTE se `enabled_tracks` incluir `nephrology`.
 *   Grupo social (mesmo com “Nefrologia” no nome) NÃO libera a prova.
 */
function buildContext(
  enabledTracks: AppTrackId[],
  activeGroups: GroupRow[]
): UserExamContext {
  const tracks = normalizeTracks(enabledTracks);
  const hasNephrology = tracks.includes('nephrology');
  // Spec: todo aluno tem Residência Geral — inclusive sem track explícito.
  const hasGeneral = true;
  const inferred: AppTrackId[] = [
    'general',
    ...(hasNephrology ? (['nephrology'] as AppTrackId[]) : []),
    ...tracks.filter((t) => t !== 'general' && t !== 'nephrology'),
  ];

  const audiences: ExamAudience[] = ['general'];
  if (hasNephrology) audiences.push('nephrology');

  const nefro = activeGroups.find(isOfficialNephrologyLeague) ?? null;
  const general = activeGroups.find((g) => !isOfficialNephrologyLeague(g)) ?? null;
  const ranking = nefro ?? general;

  return {
    audience: hasNephrology ? 'nephrology' : 'general',
    audiences,
    hasNephrology,
    hasGeneral,
    enabledTracks: inferred,
    leagueId: nefro?.id ?? null,
    leagueName: nefro?.name ?? null,
    generalGroupId: general?.id ?? null,
    generalGroupName: general?.name ?? null,
    rankingGroupId: ranking?.id ?? null,
    rankingGroupName: ranking?.name ?? null,
  };
}

/**
 * Resolve disputas diárias a partir dos tracks que o admin ligou no aluno.
 * Grupos continuam para ranking interno — sem liberar Nefro sozinhos.
 */
export async function resolveUserExamAudience(userId: string): Promise<UserExamContext> {
  if (usesDemoStore()) {
    const { getDemoGroupsForUser } = await import('@/lib/groups/demo');
    const { readDemoStore } = await import('@/lib/demo-store');
    const groups = getDemoGroupsForUser(userId).map((g) => ({
      id: g.id,
      name: g.name,
      active: true,
      exam_audience: (g as { exam_audience?: string }).exam_audience,
    }));
    const student = readDemoStore().students.find((s) => s.id === userId);
    const tracks = normalizeTracks(
      (student as { enabled_tracks?: string[] } | undefined)?.enabled_tracks
    );
    return buildContext(tracks, groups);
  }

  const admin = createAdminClient();
  if (!admin) {
    return buildContext(['general'], []);
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('enabled_tracks')
    .eq('id', userId)
    .maybeSingle();

  const tracks = normalizeTracks(
    (profile as { enabled_tracks?: string[] } | null)?.enabled_tracks
  );

  const { data } = await admin
    .from('study_group_members')
    .select('group_id, study_groups(id, name, active, exam_audience)')
    .eq('user_id', userId);

  const activeGroups: GroupRow[] = [];
  for (const row of data ?? []) {
    const g = row.study_groups as unknown as GroupRow | null;
    if (!g || !g.active) continue;
    activeGroups.push(g);
  }

  return buildContext(tracks, activeGroups);
}

export function userCanAccessExamAudience(
  ctx: UserExamContext,
  examAudience: string | null | undefined
): boolean {
  const a = (examAudience ?? 'general') as ExamAudience;
  return ctx.audiences.includes(a);
}

/** Ao ligar Nefrologia, garante membro da Liga oficial (ranking + conteúdo). */
export async function syncTrackGroupMembership(
  userId: string,
  tracks: AppTrackId[],
  admin?: SupabaseClient | null
): Promise<void> {
  const client = admin ?? createAdminClient();
  if (!client) return;

  if (tracks.includes('nephrology')) {
    const league = await ensureNephrologyLeague(client);
    if (league) {
      await client.from('study_group_members').upsert(
        { group_id: league.id, user_id: userId },
        { onConflict: 'group_id,user_id' }
      );
    }
  }
}

export async function ensureNephrologyLeague(
  admin?: SupabaseClient | null
): Promise<{ id: string; name: string; created: boolean } | null> {
  const client = admin ?? createAdminClient();
  if (!client) return null;

  const { data: existing } = await client
    .from('study_groups')
    .select('id, name')
    .or('exam_audience.eq.nephrology,name.ilike.Liga de Nefrologia')
    .limit(1)
    .maybeSingle();

  if (existing) {
    await client
      .from('study_groups')
      .update({
        exam_audience: 'nephrology',
        active: true,
        description:
          'Disputa diária da liga + treinos livres. Quem faz a disputa ganha pontos; quem não faz, fica sem pontos no dia. Entrada somente com autorização do admin.',
      })
      .eq('id', existing.id);
    return { id: existing.id, name: existing.name, created: false };
  }

  const { data: created, error } = await client
    .from('study_groups')
    .insert({
      name: NEPHROLOGY_LEAGUE_NAME,
      description:
        'Disputa diária da liga + treinos livres. Quem faz a disputa ganha pontos; quem não faz, fica sem pontos no dia. Entrada somente com autorização do admin.',
      active: true,
      exam_audience: 'nephrology',
    })
    .select('id, name')
    .single();

  if (error || !created) return null;
  return { id: created.id, name: created.name, created: true };
}

export function audienceLabel(audience: ExamAudience): string {
  return audience === 'nephrology' ? 'Nefrologia' : 'Residência Geral';
}

/** Garante Residência Geral no array de tracks (não removível). */
export function ensureGeneralTrack(tracks: AppTrackId[]): AppTrackId[] {
  const normalized = normalizeTracks(tracks);
  if (normalized.includes('general')) return normalized;
  return ['general', ...normalized];
}
