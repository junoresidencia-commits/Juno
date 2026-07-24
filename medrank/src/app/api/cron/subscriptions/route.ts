import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isDemoMode } from '@/lib/demo-auth';
import {
  blockExpiredSubscriptions,
  isSubscriptionExpired,
} from '@/lib/billing/subscription';
import { readDemoStore, writeDemoStore } from '@/lib/demo-store';

/**
 * Vercel Cron diário: bloqueia alunos com assinatura vencida (não pagaram o mês).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization') ?? '';
  const headerSecret = request.headers.get('x-cron-secret') ?? '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (secret) {
    if (bearer !== secret && headerSecret !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === 'production' && process.env.DEMO_MODE !== 'true') {
    return NextResponse.json(
      { error: 'CRON_SECRET nao configurado na Vercel.' },
      { status: 503 }
    );
  }

  if (isDemoMode()) {
    const store = readDemoStore();
    let blocked = 0;
    for (const s of store.students) {
      if (s.active && isSubscriptionExpired(s.subscriptionExpiresAt)) {
        s.active = false;
        blocked += 1;
      }
    }
    writeDemoStore(store);
    return NextResponse.json({ ok: true, blocked, mode: 'demo' });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  try {
    const result = await blockExpiredSubscriptions(admin);
    return NextResponse.json({
      ok: true,
      blocked: result.blocked,
      ids: result.ids,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erro ao bloquear assinaturas';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
