import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Todos os membros ativos do grupo já finalizaram a disputa?
 * (quem nunca iniciou conta como “não terminou” → ranking espera a janela fechar)
 */
export async function areAllGroupMembersFinished(
  admin: SupabaseClient,
  examId: string,
  groupId: string
): Promise<boolean> {
  const { data: members, error: memErr } = await admin
    .from('study_group_members')
    .select('user_id, profiles!inner(active)')
    .eq('group_id', groupId);

  if (memErr || !members?.length) return false;

  const activeIds = members
    .filter((m) => {
      const p = m.profiles as unknown as { active?: boolean } | { active?: boolean }[] | null;
      const row = Array.isArray(p) ? p[0] : p;
      return row?.active !== false;
    })
    .map((m) => m.user_id as string);

  if (activeIds.length === 0) return false;

  const { data: attempts, error: attErr } = await admin
    .from('attempts')
    .select('user_id, finished_at, forfeited')
    .eq('exam_id', examId)
    .in('user_id', activeIds);

  if (attErr) return false;

  const done = new Set(
    (attempts ?? [])
      .filter((a) => a.finished_at)
      .map((a) => a.user_id as string)
  );

  return activeIds.every((id) => done.has(id));
}
