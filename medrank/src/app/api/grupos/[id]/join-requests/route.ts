import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { NEPHROLOGY_LEAGUE_NAME } from '@/lib/exams/audience';

type Ctx = { params: Promise<{ id: string }> };

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

/** Aluno solicita entrada; admin/dono lista pendentes. */
export async function GET(_request: Request, { params }: Ctx) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { id: groupId } = await params;

  if (usesDemoStore()) {
    return NextResponse.json({ requests: [] });
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

  const { data, error } = await admin
    .from('study_group_join_requests')
    .select('id, user_id, status, message, created_at, profiles(name, email)')
    .eq('group_id', groupId)
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ requests: data ?? [] });
}

/** Solicitar entrada no grupo. */
export async function POST(request: Request, { params }: Ctx) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  if (session.profile.role === 'admin') {
    return NextResponse.json(
      { error: 'Admin adiciona membros direto no painel.' },
      { status: 400 }
    );
  }

  const { id: groupId } = await params;
  const body = (await request.json().catch(() => ({}))) as { message?: string };

  if (usesDemoStore()) {
    return NextResponse.json({ ok: true, status: 'pending' });
  }

  const admin = createAdminClient() ?? (await createClient());

  const { data: group } = await admin
    .from('study_groups')
    .select('id, name, active, exam_audience')
    .eq('id', groupId)
    .maybeSingle();

  if (!group || !group.active) {
    return NextResponse.json({ error: 'Grupo não encontrado' }, { status: 404 });
  }

  if (
    group.exam_audience === 'nephrology' ||
    group.name.toLowerCase() === NEPHROLOGY_LEAGUE_NAME.toLowerCase()
  ) {
    return NextResponse.json(
      {
        error:
          'A prova de Nefrologia é acesso exclusivo. Peça ao administrador principal para autorizar.',
      },
      { status: 403 }
    );
  }

  const { data: already } = await admin
    .from('study_group_members')
    .select('user_id')
    .eq('group_id', groupId)
    .eq('user_id', session.userId)
    .maybeSingle();

  if (already) {
    return NextResponse.json({ error: 'Você já participa deste grupo.' }, { status: 400 });
  }

  const { data: existing } = await admin
    .from('study_group_join_requests')
    .select('id, status')
    .eq('group_id', groupId)
    .eq('user_id', session.userId)
    .maybeSingle();

  if (existing?.status === 'pending') {
    return NextResponse.json({ ok: true, status: 'pending', id: existing.id });
  }

  if (existing) {
    const { data, error } = await admin
      .from('study_group_join_requests')
      .update({
        status: 'pending',
        message: body.message?.trim() || null,
        created_at: new Date().toISOString(),
        resolved_at: null,
        resolved_by: null,
      })
      .eq('id', existing.id)
      .select('id, status')
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, ...data });
  }

  const { data, error } = await admin
    .from('study_group_join_requests')
    .insert({
      group_id: groupId,
      user_id: session.userId,
      status: 'pending',
      message: body.message?.trim() || null,
    })
    .select('id, status')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, ...data });
}
