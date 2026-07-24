import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

type Ctx = { params: Promise<{ id: string; requestId: string }> };

async function canManageGroup(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  groupId: string,
  userId: string,
  isPlatformAdmin: boolean
): Promise<boolean> {
  if (isPlatformAdmin) return true;
  const { data: group } = await admin
    .from('study_groups')
    .select('created_by')
    .eq('id', groupId)
    .maybeSingle();
  return group?.created_by === userId;
}

/** Aceitar ou recusar solicitação. */
export async function PATCH(request: Request, { params }: Ctx) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { id: groupId, requestId } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    action?: 'approve' | 'reject';
  };
  const action = body.action;
  if (action !== 'approve' && action !== 'reject') {
    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ ok: true, status: action === 'approve' ? 'approved' : 'rejected' });
  }

  const admin = createAdminClient() ?? (await createClient());
  const allowed = await canManageGroup(
    admin,
    groupId,
    session.userId,
    session.profile.role === 'admin'
  );
  if (!allowed) {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });
  }

  const { data: joinReq, error: fetchErr } = await admin
    .from('study_group_join_requests')
    .select('id, group_id, user_id, status')
    .eq('id', requestId)
    .eq('group_id', groupId)
    .maybeSingle();

  if (fetchErr || !joinReq) {
    return NextResponse.json({ error: 'Solicitação não encontrada' }, { status: 404 });
  }
  if (joinReq.status !== 'pending') {
    return NextResponse.json({ error: 'Solicitação já resolvida' }, { status: 400 });
  }

  const now = new Date().toISOString();
  if (action === 'approve') {
    const { error: memberErr } = await admin.from('study_group_members').upsert(
      { group_id: groupId, user_id: joinReq.user_id },
      { onConflict: 'group_id,user_id' }
    );
    if (memberErr) {
      return NextResponse.json({ error: memberErr.message }, { status: 500 });
    }
    await admin
      .from('study_group_join_requests')
      .update({
        status: 'approved',
        resolved_at: now,
        resolved_by: session.userId,
      })
      .eq('id', requestId);

    await admin.rpc('recalculate_group_rankings_for_group', {
      p_group_id: groupId,
      p_date: new Date().toISOString().slice(0, 10),
    });

    return NextResponse.json({ ok: true, status: 'approved' });
  }

  await admin
    .from('study_group_join_requests')
    .update({
      status: 'rejected',
      resolved_at: now,
      resolved_by: session.userId,
    })
    .eq('id', requestId);

  return NextResponse.json({ ok: true, status: 'rejected' });
}

/** Aluno cancela a própria solicitação pendente. */
export async function DELETE(_request: Request, { params }: Ctx) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { id: groupId, requestId } = await params;
  if (usesDemoStore()) {
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient() ?? (await createClient());
  const { data: joinReq } = await admin
    .from('study_group_join_requests')
    .select('id, user_id, status')
    .eq('id', requestId)
    .eq('group_id', groupId)
    .maybeSingle();

  if (!joinReq || joinReq.user_id !== session.userId) {
    return NextResponse.json({ error: 'Solicitação não encontrada' }, { status: 404 });
  }
  if (joinReq.status !== 'pending') {
    return NextResponse.json({ error: 'Só é possível cancelar pendentes' }, { status: 400 });
  }

  await admin
    .from('study_group_join_requests')
    .update({
      status: 'cancelled',
      resolved_at: new Date().toISOString(),
      resolved_by: session.userId,
    })
    .eq('id', requestId);

  return NextResponse.json({ ok: true });
}
