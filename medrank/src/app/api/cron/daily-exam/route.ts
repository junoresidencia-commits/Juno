import { NextResponse } from 'next/server';
import { ensureBothDailyExams } from '@/lib/exams/ensure-daily';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Só a disputa de hoje — 1×/dia via cron. */
export const maxDuration = 300;

/**
 * Vercel Cron: gera e revisa com IA apenas a disputa de HOJE
 * (geral + Liga de Nefrologia). Se já existir, não reprocessa.
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

  const date = todayDateStringBrazil();
  const result = await ensureBothDailyExams(date);
  const errors = [result.general.error, result.nephrology.error].filter(Boolean);
  const created =
    (result.general.created ? 1 : 0) + (result.nephrology.created ? 1 : 0);

  return NextResponse.json({
    ok: errors.length === 0,
    mode: 'today_only',
    date,
    created,
    checked: 2,
    general: {
      created: result.general.created,
      examId: result.general.exam?.id ?? null,
      title: result.general.exam?.title ?? null,
      error: result.general.error ?? null,
      quality: (result.general.exam as { quality_status?: string } | null)?.quality_status ?? null,
    },
    nephrology: {
      track: result.nephrology.track,
      created: result.nephrology.created,
      examId: result.nephrology.exam?.id ?? null,
      title: result.nephrology.exam?.title ?? null,
      error: result.nephrology.error ?? null,
      quality:
        (result.nephrology.exam as { quality_status?: string } | null)?.quality_status ?? null,
    },
  });
}

export async function POST(request: Request) {
  return GET(request);
}
