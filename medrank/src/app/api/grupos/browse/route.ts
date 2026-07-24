import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { NEPHROLOGY_LEAGUE_NAME } from '@/lib/exams/audience';

/**
 * Lista grupos disponíveis para solicitar entrada + pendências do aluno.
 * A Liga oficial de Nefrologia NÃO aparece aqui — só via autorização do admin.
 */
export async function GET() {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ available: [], pending: [], mine: [] });
  }

  const admin = createAdminClient() ?? (await createClient());
  const userId = session.userId;

  const [{ data: allGroups }, { data: memberships }, { data: requests }] =
    await Promise.all([
      admin
        .from('study_groups')
        .select('id, name, description, created_by, exam_audience, active')
        .eq('active', true)
        .order('name'),
      admin
        .from('study_group_members')
        .select('group_id')
        .eq('user_id', userId),
      admin
        .from('study_group_join_requests')
        .select('id, group_id, status, created_at, study_groups(id, name)')
        .eq('user_id', userId)
        .eq('status', 'pending'),
    ]);

  const memberIds = new Set((memberships ?? []).map((m) => m.group_id));

  const available = (allGroups ?? []).filter((g) => {
    if (memberIds.has(g.id)) return false;
    // Nefrologia exclusiva: não aparece na lista pública de solicitação
    if (
      g.exam_audience === 'nephrology' ||
      g.name.toLowerCase() === NEPHROLOGY_LEAGUE_NAME.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    available,
    pending: requests ?? [],
    mine: [...memberIds],
  });
}
