import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isDemoMode } from '@/lib/demo-auth';
import {
  approveDemoStudent,
  readDemoStore,
  setDemoLeagueAdmin,
  writeDemoStore,
} from '@/lib/demo-store';
import { requireAdminApi } from '@/lib/api-auth';
import { normalizeTracks } from '@/lib/tracks/config';
import { syncTrackGroupMembership } from '@/lib/exams/audience';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

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
        return NextResponse.json({ error: 'Não foi possível liberar o aluno.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, active: true });
    }

    if (action === 'block') {
      student.active = false;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, active: false });
    }

    if (action === 'unblock') {
      student.active = true;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, active: true });
    }

    if (action === 'make_league_admin') {
      setDemoLeagueAdmin(id, true);
      return NextResponse.json({ ok: true, league_admin: true });
    }

    if (action === 'revoke_league_admin') {
      setDemoLeagueAdmin(id, false);
      return NextResponse.json({ ok: true, league_admin: false });
    }

    if (action === 'set_tracks') {
      const tracks = normalizeTracks((body as { tracks?: string[] }).tracks);
      (student as { enabled_tracks?: string[] }).enabled_tracks = tracks;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, enabled_tracks: tracks });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data: student } = await admin
    .from('profiles')
    .select('id, role, active, approved_at, league_admin, enabled_tracks')
    .eq('id', id)
    .eq('role', 'student')
    .single();

  if (!student) {
    return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
  }

  if (action === 'approve') {
    const { error } = await admin
      .from('profiles')
      .update({ active: true, approved_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: true });
  }

  if (action === 'block') {
    const { error } = await admin.from('profiles').update({ active: false }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: false });
  }

  if (action === 'unblock') {
    const { error } = await admin.from('profiles').update({ active: true }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: true });
  }

  if (action === 'make_league_admin') {
    const { error } = await admin.from('profiles').update({ league_admin: true }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, league_admin: true });
  }

  if (action === 'revoke_league_admin') {
    const { error } = await admin.from('profiles').update({ league_admin: false }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, league_admin: false });
  }

  if (action === 'set_tracks') {
    const tracks = normalizeTracks((body as { tracks?: string[] }).tracks);
    const { error } = await admin
      .from('profiles')
      .update({ enabled_tracks: tracks })
      .eq('id', id);
    if (error) {
      if (/enabled_tracks|schema cache/i.test(error.message)) {
        return NextResponse.json(
          {
            error:
              'Migration 030 ainda não aplicada no Supabase (coluna enabled_tracks). Rode o SQL e tente de novo.',
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    await syncTrackGroupMembership(id, tracks, createAdminClient());
    return NextResponse.json({ ok: true, enabled_tracks: tracks });
  }

  return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

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
