import { NextResponse } from 'next/server';
import {
  DAILY_EXAM_HORIZON_DAYS,
  ensureDailyNephrologyHorizon,
} from '@/lib/exams/daily-nephrology';

/**
 * Vercel Cron: gera a disputa diária (Nefrologia ↔ Nefropediatria).
 * Auth: Authorization Bearer CRON_SECRET (Vercel injeta automaticamente)
 * ou header x-cron-secret.
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
      { error: 'CRON_SECRET não configurado na Vercel.' },
      { status: 503 }
    );
  }

  const results = await ensureDailyNephrologyHorizon(DAILY_EXAM_HORIZON_DAYS);
  const created = results.filter((r) => r.created).length;
  const errors = results.filter((r) => r.error);

  return NextResponse.json({
    ok: errors.length === 0,
    created,
    checked: results.length,
    results: results.map((r) => ({
      date: r.date,
      track: r.track,
      created: r.created,
      examId: r.exam?.id ?? null,
      title: r.exam?.title ?? null,
      error: r.error ?? null,
    })),
  });
}

export async function POST(request: Request) {
  return GET(request);
}
