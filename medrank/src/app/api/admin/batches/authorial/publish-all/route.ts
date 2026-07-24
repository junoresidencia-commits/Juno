import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { publishAllAuthorialDrafts } from '@/lib/question-bank/publish-authorial-batch';

export const maxDuration = 60;

/**
 * Publica todos os lotes autorais em rascunho de uma vez (rápido).
 * body: { confirm: true }
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ error: 'Indisponível no demo' }, { status: 501 });
  }

  const body = (await request.json().catch(() => null)) as { confirm?: boolean } | null;
  if (!body?.confirm) {
    return NextResponse.json(
      { error: 'Envie { confirm: true } para publicar todos os rascunhos.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const userId =
    'supabase' in auth && auth.supabase
      ? (await auth.supabase.auth.getUser()).data.user?.id ?? null
      : null;

  const result = await publishAllAuthorialDrafts(admin, {
    userId,
    reason: 'Publicação em massa de lotes autorais',
  });

  if (result.error && result.published === 0) {
    return NextResponse.json(
      { error: result.error, batches: result.batches, published: 0 },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: !result.error,
    batches: result.batches,
    published: result.published,
    warning: result.error,
    message: result.message,
  });
}
