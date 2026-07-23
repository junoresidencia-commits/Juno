import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export type ExamAudience = 'general' | 'nephrology';

export const NEPHROLOGY_LEAGUE_NAME = 'Liga de Nefrologia';

export interface UserExamContext {
  /**
   * Audiência “principal” (compat): nefro se membro da liga; senão geral.
   * Use `audiences` / `hasNephrology` / `hasGeneral` para liberar 1 ou 2 disputas.
   */
  audience: ExamAudience;
  /** Disputas do dia que o aluno pode fazer (1 ou 2). */
  audiences: ExamAudience[];
  hasNephrology: boolean;
  hasGeneral: boolean;
  /** Liga/grupo nefro (se membro). */
  leagueId: string | null;
  leagueName: string | null;
  /** Grupo geral (ex.: NAD, Endo) — disputa residência USP/ENARE. */
  generalGroupId: string | null;
  generalGroupName: string | null;
  /**
   * Grupo cujo ranking aparece na home (preferência: liga nefro; senão geral).
   * Ranking entre todas as ligas = só admin.
   */
  rankingGroupId: string | null;
  rankingGroupName: string | null;
}

type GroupRow = {
  id: string;
  name: string;
  active: boolean;
  exam_audience?: string;
};

function isNephrologyGroup(g: GroupRow): boolean {
  return (
    g.exam_audience === 'nephrology' ||
    g.name.toLowerCase() === 'liga de nefrologia' ||
    g.name.toLowerCase().includes('nefrologia')
  );
}

function buildContext(activeGroups: GroupRow[]): UserExamContext {
  const nefroGroups = activeGroups.filter(isNephrologyGroup);
  const generalGroups = activeGroups.filter((g) => !isNephrologyGroup);
  const nefro = nefroGroups[0] ?? null;
  const general = generalGroups[0] ?? null;

  const hasNephrology = Boolean(nefro);
  // Sem grupo nenhum: mantém disputa geral (alunos já ativos).
  const hasGeneral = Boolean(general) || activeGroups.length === 0;

  const audiences: ExamAudience[] = [];
  if (hasNephrology) audiences.push('nephrology');
  if (hasGeneral) audiences.push('general');

  const ranking = nefro ?? general;

  return {
    audience: hasNephrology ? 'nephrology' : 'general',
    audiences,
    hasNephrology,
    hasGeneral,
    leagueId: nefro?.id ?? null,
    leagueName: nefro?.name ?? null,
    generalGroupId: general?.id ?? null,
    generalGroupName: general?.name ?? null,
    rankingGroupId: ranking?.id ?? null,
    rankingGroupName: ranking?.name ?? null,
  };
}

/**
 * Resolve quais disputas diárias o aluno vê:
 * - Só Liga de Nefrologia → 1 disputa (nefro/nefroped)
 * - Só grupo de residência (NAD, Endo…) → 1 disputa geral (USP/ENARE)
 * - Nos dois → 2 disputas no mesmo dia
 */
export async function resolveUserExamAudience(userId: string): Promise<UserExamContext> {
  if (usesDemoStore()) {
    const { getDemoGroupsForUser } = await import('@/lib/groups/demo');
    const groups = getDemoGroupsForUser(userId).map((g) => ({
      id: g.id,
      name: g.name,
      active: true,
      exam_audience: (g as { exam_audience?: string }).exam_audience,
    }));
    return buildContext(groups);
  }

  const admin = createAdminClient();
  if (!admin) {
    return buildContext([]);
  }

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

  return buildContext(activeGroups);
}

export function userCanAccessExamAudience(
  ctx: UserExamContext,
  examAudience: string | null | undefined
): boolean {
  const a = (examAudience ?? 'general') as ExamAudience;
  return ctx.audiences.includes(a);
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
          'Disputa diária da liga: um dia Nefrologia, outro Nefropediatria. Quem faz ganha pontos; quem não faz, fica sem pontos. Membros também podem estar em grupos de residência e fazer a disputa geral no mesmo dia.',
      })
      .eq('id', existing.id);
    return { id: existing.id, name: existing.name, created: false };
  }

  const { data: created, error } = await client
    .from('study_groups')
    .insert({
      name: NEPHROLOGY_LEAGUE_NAME,
      description:
        'Disputa diária da liga: um dia Nefrologia, outro Nefropediatria. Quem faz ganha pontos; quem não faz, fica sem pontos.',
      active: true,
      exam_audience: 'nephrology',
    })
    .select('id, name')
    .single();

  if (error || !created) return null;
  return { id: created.id, name: created.name, created: true };
}

export function audienceLabel(audience: ExamAudience): string {
  return audience === 'nephrology' ? 'Liga de Nefrologia' : 'Disputa geral (residência)';
}
