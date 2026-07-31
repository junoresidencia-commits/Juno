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
import {
  getSubscriptionPlan,
  isSubscriptionPlanId,
  nextSubscriptionExpiry,
  subscriptionExpiresAt,
} from '@/lib/billing/pix';

type StudentLookup = {
  id: string;
  role: string;
  active: boolean;
  approved_at: string | null;
  league_admin?: boolean;
  enabled_tracks?: string[] | null;
  subscription_expires_at?: string | null;
};

function resolvePlanDays(body: { plan?: string; days?: number }): number {
  if (isSubscriptionPlanId(body.plan)) {
    return getSubscriptionPlan(body.plan).days;
  }
  if (typeof body.days === 'number' && body.days > 0 && body.days <= 400) {
    return Math.floor(body.days);
  }
  return getSubscriptionPlan('quarter').days;
}

function nextExpiryIso(
  currentExpires: string | null | undefined,
  days: number
): string {
  return nextSubscriptionExpiry(currentExpires, days).toISOString();
}

async function loadStudent(
  admin: NonNullable<ReturnType<typeof createAdminClient>>,
  id: string
): Promise<{ student: StudentLookup | null; error: string | null }> {
  const full = await admin
    .from('profiles')
    .select('id, role, active, approved_at, league_admin, enabled_tracks, subscription_expires_at')
    .eq('id', id)
    .eq('role', 'student')
    .maybeSingle();

  if (!full.error) {
    return { student: (full.data as StudentLookup | null) ?? null, error: null };
  }

  const msg = full.error.message ?? '';
  if (!/subscription_expires_at|enabled_tracks|league_admin|schema cache/i.test(msg)) {
    return { student: null, error: msg };
  }

  const mid = await admin
    .from('profiles')
    .select('id, role, active, approved_at, league_admin')
    .eq('id', id)
    .eq('role', 'student')
    .maybeSingle();

  if (!mid.error) {
    return {
      student: mid.data
        ? {
            ...(mid.data as StudentLookup),
            enabled_tracks: null,
            subscription_expires_at: null,
          }
        : null,
      error: null,
    };
  }

  const basic = await admin
    .from('profiles')
    .select('id, role, active, approved_at')
    .eq('id', id)
    .eq('role', 'student')
    .maybeSingle();

  if (basic.error) {
    return { student: null, error: basic.error.message || mid.error.message || msg };
  }

  return {
    student: basic.data
      ? {
          ...(basic.data as StudentLookup),
          league_admin: false,
          enabled_tracks: null,
          subscription_expires_at: null,
        }
      : null,
    error: null,
  };
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
  const planDays = resolvePlanDays(body as { plan?: string; days?: number });

  if (isDemoMode() || auth.demo) {
    const store = readDemoStore();
    const student = store.students.find((s) => s.id === id);
    if (!student) {
      return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
    }

    if (action === 'approve') {
      if (!approveDemoStudent(id, planDays)) {
        return NextResponse.json({ error: 'Não foi possível liberar o aluno.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, active: true, days: planDays });
    }

    if (action === 'renew') {
      if (!renewDemoStudent(id, planDays)) {
        return NextResponse.json({ error: 'Não foi possível renovar.' }, { status: 400 });
      }
      return NextResponse.json({ ok: true, renewed: true, days: planDays });
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

  // Liberar / renovar / bloquear exige service role (não depender de RLS/is_admin na sessão)
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: 'Service role necessária para liberar / gerenciar alunos.' },
      { status: 503 }
    );
  }

  const { student, error: loadError } = await loadStudent(admin, id);
  if (loadError) {
    return NextResponse.json({ error: loadError }, { status: 500 });
  }
  if (!student) {
    return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 });
  }

  if (action === 'approve') {
    const expires = subscriptionExpiresAt(new Date(), planDays).toISOString();
    const { error } = await admin
      .from('profiles')
      .update({
        active: true,
        approved_at: new Date().toISOString(),
        subscription_expires_at: expires,
      })
      .eq('id', id)
      .eq('role', 'student');
    if (error) {
      if (/subscription_expires_at|schema cache/i.test(error.message)) {
        const { error: fallback } = await admin
          .from('profiles')
          .update({ active: true, approved_at: new Date().toISOString() })
          .eq('id', id)
          .eq('role', 'student');
        if (fallback) return NextResponse.json({ error: fallback.message }, { status: 500 });
        return NextResponse.json({
          ok: true,
          active: true,
          warning: 'Rode a migration 039 no Supabase para gravar validade da assinatura.',
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      active: true,
      subscription_expires_at: expires,
      days: planDays,
    });
  }

  if (action === 'renew') {
    const expires = nextExpiryIso(student.subscription_expires_at, planDays);
    const { error } = await admin
      .from('profiles')
      .update({
        active: true,
        approved_at: student.approved_at ?? new Date().toISOString(),
        subscription_expires_at: expires,
      })
      .eq('id', id)
      .eq('role', 'student');
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
    return NextResponse.json({
      ok: true,
      subscription_expires_at: expires,
      days: planDays,
    });
  }

  if (action === 'block') {
    const { error } = await admin
      .from('profiles')
      .update({ active: false })
      .eq('id', id)
      .eq('role', 'student');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: false });
  }

  if (action === 'unblock') {
    const { error } = await admin
      .from('profiles')
      .update({ active: true })
      .eq('id', id)
      .eq('role', 'student');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, active: true });
  }

  if (action === 'make_league_admin') {
    const { error } = await admin
      .from('profiles')
      .update({ league_admin: true })
      .eq('id', id)
      .eq('role', 'student');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, league_admin: true });
  }

  if (action === 'revoke_league_admin') {
    const { error } = await admin
      .from('profiles')
      .update({ league_admin: false })
      .eq('id', id)
      .eq('role', 'student');
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
      .eq('id', id)
      .eq('role', 'student');
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
    await syncTrackGroupMembership(id, tracks, admin);
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
