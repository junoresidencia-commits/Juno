import { NextResponse } from 'next/server';
import { DAILY_EXAM_HORIZON_DAYS } from '@/lib/exams/daily-schedule';
import { ensureBothDailyHorizons } from '@/lib/exams/ensure-daily';

/** Pipeline IA por dia × 2 audiências — precisa de timeout longo. */
export const maxDuration = 300;

/**
 * Vercel Cron: gera disputa geral + disputa da Liga de Nefrologia.
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

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          'OPENAI_API_KEY obrigatória no cron: sem ela a disputa não passa pela revisão clínica e não publica.',
      },
      { status: 503 }
    );
  }

  const results = await ensureBothDailyHorizons(DAILY_EXAM_HORIZON_DAYS);
  const created =
    results.filter((r) => r.general.created).length +
    results.filter((r) => r.nephrology.created).length;
  const errors = results.flatMap((r) =>
    [r.general.error, r.nephrology.error].filter(Boolean)
  );

  return NextResponse.json({
    ok: errors.length === 0,
    created,
    checked: results.length * 2,
    results: results.map((r) => ({
      date: r.date,
      general: {
        created: r.general.created,
        examId: r.general.exam?.id ?? null,
        title: r.general.exam?.title ?? null,
        error: r.general.error ?? null,
        quality: (r.general.exam as { quality_status?: string } | null)?.quality_status ?? null,
      },
      nephrology: {
        track: r.nephrology.track,
        created: r.nephrology.created,
        examId: r.nephrology.exam?.id ?? null,
        title: r.nephrology.exam?.title ?? null,
        error: r.nephrology.error ?? null,
        quality: (r.nephrology.exam as { quality_status?: string } | null)?.quality_status ?? null,
      },
    })),
  });
}

export async function POST(request: Request) {
  return GET(request);
}
