import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import {
  createDemoStudyGroup,
  listDemoStudyGroups,
} from '@/lib/groups/demo';

export async function GET() {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ groups: listDemoStudyGroups() });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data: groups, error } = await admin
    .from('study_groups')
    .select('id, name, description, active, created_by, created_at, exam_audience, study_group_members(count)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mapped = (groups ?? []).map((g) => {
    const countRaw = (g as { study_group_members?: { count: number }[] }).study_group_members;
    const member_count = Array.isArray(countRaw) ? Number(countRaw[0]?.count ?? 0) : 0;
    return {
      id: g.id,
      name: g.name,
      description: g.description,
      active: g.active,
      created_by: g.created_by,
      created_at: g.created_at,
      exam_audience: (g as { exam_audience?: string }).exam_audience ?? 'general',
      member_count,
    };
  });

  return NextResponse.json({ groups: mapped });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    description?: string | null;
    exam_audience?: 'general' | 'nephrology';
  };

  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: 'Nome do grupo é obrigatório' }, { status: 400 });
  }

  const examAudience =
    body.exam_audience === 'nephrology' || name.toLowerCase().includes('nefrologia')
      ? 'nephrology'
      : 'general';

  if (usesDemoStore() || auth.demo) {
    const group = createDemoStudyGroup({
      name,
      description: body.description ?? null,
      createdBy: 'demo-admin',
      examAudience,
    });
    return NextResponse.json({ group });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data: userData } = await auth.supabase.auth.getUser();

  const { data, error } = await admin
    .from('study_groups')
    .insert({
      name,
      description: body.description?.trim() || null,
      created_by: userData.user?.id ?? null,
      active: true,
      exam_audience: examAudience,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ group: data });
}
