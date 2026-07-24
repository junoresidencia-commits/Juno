import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { createDemoInvite, listDemoInvites } from '@/lib/demo-store';
import { buildInviteLinkFromOrigin, getRequestOrigin, isSupabaseConfigured } from '@/lib/app-url';
import { requireAdminApi } from '@/lib/api-auth';
import { parseRequestFields } from '@/lib/parse-request-body';
import { randomBytes } from 'crypto';

function inviteRedirect(request: Request, params: Record<string, string>) {
  const url = new URL('/admin/pagamentos', getRequestOrigin(request));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const origin = getRequestOrigin(request);

  if (isDemoMode() || auth.demo) {
    const invites = listDemoInvites().map((i) => ({
      id: i.token,
      token: i.token,
      email: i.email,
      expires_at: i.expiresAt,
      used_at: i.usedAt,
      note: i.note,
      link: buildInviteLinkFromOrigin(origin, i.token),
    }));
    return NextResponse.json({ invites });
  }

  const { data, error } = await auth.supabase
    .from('invite_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const invites = (data ?? []).map((i) => ({
    ...i,
    link: buildInviteLinkFromOrigin(origin, i.token),
  }));

  return NextResponse.json({ invites });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const { values, formSubmit } = await parseRequestFields(request, ['email', 'note']);
  const note = values.note || null;
  const email = values.email.trim().toLowerCase();

  if (!email || !email.includes('@')) {
    if (formSubmit) {
      return inviteRedirect(request, { error: 'Informe o e-mail do aluno.' });
    }
    return NextResponse.json({ error: 'Informe o e-mail do aluno.' }, { status: 400 });
  }

  if (isDemoMode() || auth.demo) {
    try {
      const origin = getRequestOrigin(request);
      const invite = createDemoInvite(email, note ?? undefined);
      const link = buildInviteLinkFromOrigin(origin, invite.token);

      if (formSubmit) {
        return inviteRedirect(request, { ok: '1', email: invite.email ?? email, link });
      }

      return NextResponse.json({
        invite: {
          token: invite.token,
          email: invite.email,
          link,
          expires_at: invite.expiresAt,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar convite';
      if (formSubmit) {
        return inviteRedirect(request, { error: message });
      }
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  if (!isSupabaseConfigured()) {
    if (formSubmit) {
      return inviteRedirect(request, { error: 'Supabase não configurado' });
    }
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const { createAdminClient } = await import('@/lib/supabase/admin');
  const admin = createAdminClient();
  if (!admin) {
    if (formSubmit) {
      return inviteRedirect(request, { error: 'Service role necessária' });
    }
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const token = randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const session = await import('@/lib/auth').then((m) => m.getSessionProfile());

  const { data, error } = await admin.from('invite_tokens').insert({
    token,
    email,
    created_by: session?.userId,
    expires_at: expiresAt,
    note,
  }).select().single();

  if (error) {
    if (formSubmit) {
      return inviteRedirect(request, { error: error.message });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const link = buildInviteLinkFromOrigin(getRequestOrigin(request), token);

  if (formSubmit) {
    return inviteRedirect(request, { ok: '1', email, link });
  }

  return NextResponse.json({
    invite: { ...data, link },
  });
}
