import { NextResponse } from 'next/server';
import { assertCronAuthorized } from '@/lib/cron/auth';
import { ensureBothDailyExams, resolveDailyMode } from '@/lib/exams/ensure-daily';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Só a disputa de hoje — 1×/dia via cron. */
export const maxDuration = 300;

/**
 * Vercel Cron: gera a disputa de HOJE (geral + Nefro).
 * Padrao: modo banco (sem OpenAI). MEDRANK_DAILY_MODE=ai para pipeline pago.
 */
export async function GET(request: Request) {
  const denied = assertCronAuthorized(request);
  if (denied) return denied;

  const mode = resolveDailyMode();
  if (mode === 'ai' && !process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          'MEDRANK_DAILY_MODE=ai exige OPENAI_API_KEY. Remova a var ou use mode bank (padrao).',
      },
      { status: 503 }
    );
  }

  const date = todayDateStringBrazil();
  const result = await ensureBothDailyExams(date, { mode });
  const errors = [result.general.error, result.nephrology.error].filter(Boolean);
  const created =
    (result.general.created ? 1 : 0) + (result.nephrology.created ? 1 : 0);

  return NextResponse.json({
    ok: errors.length === 0,
    mode: result.mode,
    date,
    created,
    checked: 2,
    notify: result.notify ?? null,
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
