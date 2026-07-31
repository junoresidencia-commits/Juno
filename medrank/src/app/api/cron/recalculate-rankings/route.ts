import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Após a janela da disputa (21h BRT) — recalcula rankings do dia. */
export const maxDuration = 300;

/**
 * Vercel Cron (~21:05 America/Sao_Paulo):
 * recalcula ranking individual, de grupos e entre ligas.
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

  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({
      ok: true,
      mode: 'demo',
      skipped: true,
      reason: 'DEMO_MODE — sem RPC de ranking',
    });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });
  }

  const date = todayDateStringBrazil();

  const person = await admin.rpc('recalculate_rankings_for_date', { p_date: date });
  if (person.error) {
    return NextResponse.json(
      { ok: false, date, step: 'recalculate_rankings_for_date', error: person.error.message },
      { status: 500 }
    );
  }

  const groups = await admin.rpc('recalculate_group_rankings_for_date', { p_date: date });
  if (groups.error) {
    return NextResponse.json(
      {
        ok: false,
        date,
        step: 'recalculate_group_rankings_for_date',
        error: groups.error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    date,
    person: true,
    groups: true,
    note: 'Grupos também disparam ranking coletivo (semanal/mensal/trimestral/anual).',
  });
}

export async function POST(request: Request) {
  return GET(request);
}
