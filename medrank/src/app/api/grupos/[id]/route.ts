import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { deleteDemoStudyGroup, getDemoStudyGroup } from '@/lib/groups/demo';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

/**
 * Apaga o grupo se o usuário for o criador ou admin.
 * Cascata: membros, rankings e desafios do grupo.
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { id } = await params;

  if (usesDemoStore()) {
    const group = getDemoStudyGroup(id);
    if (!group) {
      return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
    }
    const isCreator = group.created_by === session.userId;
    const isAdmin = session.profile.role === 'admin';
    if (!isCreator && !isAdmin) {
      return NextResponse.json(
        { error: 'Só o criador do grupo (ou o professor) pode apagar.' },
        { status: 403 }
      );
    }
    deleteDemoStudyGroup(id);
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient() ?? (await createClient());
  const { data: group, error: fetchError } = await admin
    .from('study_groups')
    .select('id, name, created_by')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  if (!group) {
    return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
  }

  const isCreator = group.created_by === session.userId;
  const isAdmin = session.profile.role === 'admin';
  if (!isCreator && !isAdmin) {
    return NextResponse.json(
      { error: 'Só o criador do grupo (ou o professor) pode apagar.' },
      { status: 403 }
    );
  }

  // Desafios do grupo primeiro (garante limpeza mesmo se FK antiga não cascatear)
  await admin.from('weekly_challenges').delete().eq('group_id', id);

  const { error } = await admin.from('study_groups').delete().eq('id', id);
  if (error) {
    // Fallback: arquivar se o hard delete falhar (ex.: FK legada)
    const { error: softError } = await admin
      .from('study_groups')
      .update({ active: false })
      .eq('id', id);
    if (softError) {
      return NextResponse.json(
        { error: error.message || softError.message },
        { status: 500 }
      );
    }
    return NextResponse.json({
      ok: true,
      archived: true,
      message: 'Grupo arquivado (não foi possível apagar por completo).',
    });
  }

  return NextResponse.json({ ok: true });
}
