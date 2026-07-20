import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import {
  buildDemoGroupRankings,
  deleteDemoStudyGroup,
  getDemoStudyGroup,
  listDemoGroupMembers,
  updateDemoStudyGroup,
} from '@/lib/groups/demo';
import { todayDateStringBrazil } from '@/lib/exams/window';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id } = await params;

  if (usesDemoStore() || auth.demo) {
    const group = getDemoStudyGroup(id);
    if (!group) return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
    const members = listDemoGroupMembers(id);
    const rankings = {
      daily: buildDemoGroupRankings(id, 'daily'),
      weekly: buildDemoGroupRankings(id, 'weekly'),
      monthly: buildDemoGroupRankings(id, 'monthly'),
    };
    return NextResponse.json({
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        active: group.active,
        created_by: group.created_by,
        created_at: group.created_at,
      },
      members,
      rankings,
    });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data: group, error } = await admin
    .from('study_groups')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!group) return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });

  const { data: members } = await admin
    .from('study_group_members')
    .select('group_id, user_id, joined_at, profiles(name, email)')
    .eq('group_id', id)
    .order('joined_at', { ascending: true });

  const today = todayDateStringBrazil();
  const periods = ['daily', 'weekly', 'monthly'] as const;
  const rankings: Record<string, unknown[]> = {};
  for (const period of periods) {
    const { data } = await admin
      .from('study_group_rankings')
      .select('*, profiles(name)')
      .eq('group_id', id)
      .eq('period_type', period)
      .order('position', { ascending: true });
    rankings[period] = data ?? [];
  }

  return NextResponse.json({
    group,
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
    rankings,
    asOf: today,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    description?: string | null;
    active?: boolean;
  };

  if (usesDemoStore() || auth.demo) {
    const group = updateDemoStudyGroup(id, body);
    if (!group) return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
    return NextResponse.json({ group });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const patch: Record<string, unknown> = {};
  if (body.name != null) patch.name = body.name.trim();
  if (body.description !== undefined) patch.description = body.description;
  if (body.active != null) patch.active = body.active;

  const { data, error } = await admin
    .from('study_groups')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ group: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id } = await params;

  if (usesDemoStore() || auth.demo) {
    deleteDemoStudyGroup(id);
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient() ?? auth.supabase;

  // Limpa desafios do grupo antes (defensivo se FK antiga não cascatear)
  await admin.from('weekly_challenges').delete().eq('group_id', id);

  const { error } = await admin.from('study_groups').delete().eq('id', id);
  if (error) {
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
