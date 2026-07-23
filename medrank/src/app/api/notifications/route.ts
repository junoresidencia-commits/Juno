import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';

export async function GET() {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ notifications: [], unread: 0 });
  }

  const admin = createAdminClient();
  const client = admin ?? (await createClient());

  const { data, error } = await client
    .from('user_notifications')
    .select('id, title, body, kind, meta, read_at, created_at')
    .eq('user_id', session.userId)
    .order('created_at', { ascending: false })
    .limit(30);

  if (error) {
    // Tabela ainda não migrada
    if (/user_notifications|schema cache/i.test(error.message)) {
      return NextResponse.json({ notifications: [], unread: 0, pendingMigration: true });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const notifications = data ?? [];
  const unread = notifications.filter((n) => !n.read_at).length;
  return NextResponse.json({ notifications, unread });
}

export async function PATCH(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  if (usesDemoStore()) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json().catch(() => ({}))) as { id?: string; markAll?: boolean };
  const admin = createAdminClient();
  const client = admin ?? (await createClient());

  if (body.markAll) {
    const { error } = await client
      .from('user_notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', session.userId)
      .is('read_at', null);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (!body.id) {
    return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
  }

  const { error } = await client
    .from('user_notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', body.id)
    .eq('user_id', session.userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
