import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isDemoMode } from '@/lib/demo-auth';
import { approveDemoStudent, readDemoStore, writeDemoStore } from '@/lib/demo-store';
import { requireAdminApi } from '@/lib/api-auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  const body = await request.json();
  const action = (body as { action: string }).action;

  if (isDemoMode() || auth.demo) {
    const store = readDemoStore();
    const student = store.students.find((s) => s.id === id);
    if (!student) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }

    if (action === 'approve') {
      if (!approveDemoStudent(id)) {
        return NextResponse.json({ error: 'Não foi possível liberar (turma cheia?)' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, active: true });
    }

    if (action === 'block') {
      student.active = false;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, active: false });
    }

    if (action === 'unblock') {
      const activeCount = store.students.filter((s) => s.active && s.id !== id).length;
      if (activeCount >= 10) {
        return NextResponse.json({ error: 'Limite de 10 alunos ativos' }, { status: 400 });
      }
      student.active = true;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, active: true });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  }

  const { data: student } = await auth.supabase
    .from('profiles')
    .select('id, role, active, approved_at')
    .eq('id', id)
    .eq('role', 'student')
    .single();

  if (!student) {
    return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
  }

  if (action === 'approve') {
    const { error } = await auth.supabase
      .from('profiles')
      .update({ active: true, approved_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: true });
  }

  if (action === 'block') {
    const { error } = await auth.supabase.from('profiles').update({ active: false }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: false });
  }

  if (action === 'unblock') {
    const { error } = await auth.supabase.from('profiles').update({ active: true }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: true });
  }

  return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  if (isDemoMode() || auth.demo) {
    const store = readDemoStore();
    store.students = store.students.filter((s) => s.id !== id);
    writeDemoStore(store);
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
