import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { createDemoInvite, listDemoInvites } from '@/lib/demo-store';
import { buildInviteLink, isSupabaseConfigured } from '@/lib/app-url';
import { requireAdminApi } from '@/lib/api-auth';
import { randomBytes } from 'crypto';

export async function GET() {
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  if (isDemoMode() || auth.demo) {
    const invites = listDemoInvites().map((i) => ({
      id: i.token,
      token: i.token,
      email: i.email,
      expires_at: i.expiresAt,
      used_at: i.usedAt,
      note: i.note,
      link: buildInviteLink(i.token),
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
    link: buildInviteLink(i.token),
  }));

  return NextResponse.json({ invites });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  const body = await request.json().catch(() => ({}));
  const note = (body as { note?: string }).note ?? null;
  const email = (body as { email?: string }).email?.trim().toLowerCase() ?? '';

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Informe o e-mail do aluno.' }, { status: 400 });
  }

  if (isDemoMode() || auth.demo) {
    try {
      const invite = createDemoInvite(email, note ?? undefined);
      return NextResponse.json({
        invite: {
          token: invite.token,
          email: invite.email,
          link: buildInviteLink(invite.token),
          expires_at: invite.expiresAt,
        },
      });
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : 'Erro ao gerar convite' }, { status: 400 });
    }
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const { createAdminClient } = await import('@/lib/supabase/admin');
  const admin = createAdminClient();
  if (!admin) {
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

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    invite: { ...data, link: buildInviteLink(token) },
  });
}
