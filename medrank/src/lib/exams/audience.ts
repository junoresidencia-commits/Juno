import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export type ExamAudience = 'general' | 'nephrology';

export const NEPHROLOGY_LEAGUE_NAME = 'Liga de Nefrologia';

export interface UserExamContext {
  audience: ExamAudience;
  leagueId: string | null;
  leagueName: string | null;
}

/** Membro da Liga de Nefrologia → disputa nephrology; senão → geral. */
export async function resolveUserExamAudience(userId: string): Promise<UserExamContext> {
  if (usesDemoStore()) {
    const { getDemoGroupsForUser } = await import('@/lib/groups/demo');
    const groups = getDemoGroupsForUser(userId);
    const nefro = groups.find(
      (g) =>
        (g as { exam_audience?: string }).exam_audience === 'nephrology' ||
        g.name.toLowerCase().includes('nefrologia')
    );
    if (nefro) {
      return { audience: 'nephrology', leagueId: nefro.id, leagueName: nefro.name };
    }
    return { audience: 'general', leagueId: null, leagueName: null };
  }

  const admin = createAdminClient();
  if (!admin) {
    return { audience: 'general', leagueId: null, leagueName: null };
  }

  const { data } = await admin
    .from('study_group_members')
    .select('group_id, study_groups(id, name, active, exam_audience)')
    .eq('user_id', userId);

  for (const row of data ?? []) {
    const g = row.study_groups as unknown as {
      id: string;
      name: string;
      active: boolean;
      exam_audience?: string;
    } | null;
    if (!g || !g.active) continue;
    if (g.exam_audience === 'nephrology' || g.name.toLowerCase() === 'liga de nefrologia') {
      return { audience: 'nephrology', leagueId: g.id, leagueName: g.name };
    }
  }

  return { audience: 'general', leagueId: null, leagueName: null };
}

/** Cria/atualiza a Liga de Nefrologia (idempotente). */
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
          'Disputa diária exclusiva da liga: um dia Nefrologia, outro Nefropediatria. Quem faz ganha pontos; quem não faz, fica sem pontos.',
      })
      .eq('id', existing.id);
    return { id: existing.id, name: existing.name, created: false };
  }

  const { data: created, error } = await client
    .from('study_groups')
    .insert({
      name: NEPHROLOGY_LEAGUE_NAME,
      description:
        'Disputa diária exclusiva da liga: um dia Nefrologia, outro Nefropediatria. Quem faz ganha pontos; quem não faz, fica sem pontos.',
      active: true,
      exam_audience: 'nephrology',
    })
    .select('id, name')
    .single();

  if (error || !created) return null;
  return { id: created.id, name: created.name, created: true };
}

export function audienceLabel(audience: ExamAudience): string {
  return audience === 'nephrology' ? 'Liga de Nefrologia' : 'Disputa geral';
}
