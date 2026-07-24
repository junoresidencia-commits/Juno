import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isDemoMode } from '@/lib/demo-auth';
import {
  approveDemoStudent,
  readDemoStore,
  renewDemoStudent,
  setDemoLeagueAdmin,
  writeDemoStore,
} from '@/lib/demo-store';
import { requireAdminApi } from '@/lib/api-auth';
import { normalizeTracks } from '@/lib/tracks/config';
import { ensureGeneralTrack, syncTrackGroupMembership } from '@/lib/exams/audience';
import { subscriptionExpiresAt } from '@/lib/billing/pix';

function nextExpiryIso(currentExpires: string | null | undefined): string {
  const now = new Date();
  const current = currentExpires ? new Date(currentExpires) : now;
  const from = current > now ? current : now;
  return subscriptionExpiresAt(from).toISOString();
}

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

    if (action === 'renew') {
      if (!renewDemoStudent(id)) {
        return NextResponse.json({ error: 'Não foi possível renovar.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, renewed: true });
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
      const tracks = ensureGeneralTrack(
        normalizeTracks((body as { tracks?: string[] }).tracks)
      );
      (student as { enabled_tracks?: string[] }).enabled_tracks = tracks;
      writeDemoStore(store);
      return NextResponse.json({ ok: true, enabled_tracks: tracks });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data: student } = await admin
    .from('profiles')
    .select('id, role, active, approved_at, league_admin, enabled_tracks, subscription_expires_at')
    .eq('id', id)
    .eq('role', 'student')
    .single();

  if (!student) {
    return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
  }

  if (action === 'approve') {
    const expires = subscriptionExpiresAt().toISOString();
    const { error } = await admin
      .from('profiles')
      .update({
        active: true,
        approved_at: new Date().toISOString(),
        subscription_expires_at: expires,
      })
      .eq('id', id);
    if (error) {
      if (/subscription_expires_at|schema cache/i.test(error.message)) {
        const { error: fallback } = await admin
          .from('profiles')
          .update({ active: true, approved_at: new Date().toISOString() })
          .eq('id', id);
        if (fallback) return NextResponse.json({ error: fallback.message }, { status: 500 });
        return NextResponse.json({
          ok: true,
          active: true,
          warning: 'Rode a migration 039 no Supabase para gravar validade de 30 dias.',
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, active: true, subscription_expires_at: expires });
  }

  if (action === 'renew') {
    const expires = nextExpiryIso(
      (student as { subscription_expires_at?: string | null }).subscription_expires_at
    );
    const { error } = await admin
      .from('profiles')
      .update({
        active: true,
        approved_at:
          (student as { approved_at?: string | null }).approved_at ?? new Date().toISOString(),
        subscription_expires_at: expires,
      })
      .eq('id', id);
    if (error) {
      if (/subscription_expires_at|schema cache/i.test(error.message)) {
        return NextResponse.json(
          {
            error:
              'Migration 039 ainda não aplicada no Supabase (subscription_expires_at). Rode o SQL e tente de novo.',
          },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, subscription_expires_at: expires });
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
    const tracks = ensureGeneralTrack(
      normalizeTracks((body as { tracks?: string[] }).tracks)
    );
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
