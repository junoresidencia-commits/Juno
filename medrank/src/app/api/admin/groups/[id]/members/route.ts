import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import {
  addDemoGroupMember,
  listDemoGroupMembers,
  removeDemoGroupMember,
} from '@/lib/groups/demo';
import { todayDateStringBrazil } from '@/lib/exams/window';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id: groupId } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    userId?: string;
    userIds?: string[];
  };

  const userIds = [
    ...(body.userId ? [body.userId] : []),
    ...(Array.isArray(body.userIds) ? body.userIds : []),
  ].filter(Boolean);

  if (userIds.length === 0) {
    return NextResponse.json({ error: 'Informe userId ou userIds' }, { status: 400 });
  }

  if (usesDemoStore() || auth.demo) {
    for (const userId of userIds) addDemoGroupMember(groupId, userId);
    return NextResponse.json({ members: listDemoGroupMembers(groupId) });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const rows = userIds.map((user_id) => ({ group_id: groupId, user_id }));
  const { error } = await admin.from('study_group_members').upsert(rows, {
    onConflict: 'group_id,user_id',
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.rpc('recalculate_group_rankings_for_group', {
    p_group_id: groupId,
    p_date: todayDateStringBrazil(),
  });

  const { data: members } = await admin
    .from('study_group_members')
    .select('group_id, user_id, joined_at, profiles(name, email)')
    .eq('group_id', groupId);

  return NextResponse.json({
    members: (members ?? []).map((m) => {
      const profile = m.profiles as unknown as { name?: string; email?: string } | null;
      return {
        group_id: m.group_id,
        user_id: m.user_id,
        joined_at: m.joined_at,
        name: profile?.name ?? 'Aluno',
        email: profile?.email ?? '',
      };
    }),
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id: groupId } = await params;
  const body = (await request.json().catch(() => ({}))) as { userId?: string };
  if (!body.userId) {
    return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 });
  }

  if (usesDemoStore() || auth.demo) {
    removeDemoGroupMember(groupId, body.userId);
    return NextResponse.json({ members: listDemoGroupMembers(groupId) });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { error } = await admin
    .from('study_group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', body.userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await admin.rpc('recalculate_group_rankings_for_group', {
    p_group_id: groupId,
    p_date: todayDateStringBrazil(),
  });

  return NextResponse.json({ ok: true });
}
