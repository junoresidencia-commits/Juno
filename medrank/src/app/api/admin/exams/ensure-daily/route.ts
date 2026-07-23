import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { DAILY_EXAM_HORIZON_DAYS } from '@/lib/exams/daily-schedule';
import { ensureBothDailyExams, ensureBothDailyHorizons } from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Pipeline IA (gerar + revisar + trocar) pode levar vários minutos. */
export const maxDuration = 300;

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  let days = DAILY_EXAM_HORIZON_DAYS;
  let onlyToday = false;
  try {
    const body = await request.json();
    if (typeof body.days === 'number') days = body.days;
    if (body.today === true) onlyToday = true;
  } catch {
    // body vazio
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          'OPENAI_API_KEY obrigatória: a disputa só publica após revisão clínica IA (gerar → revisar → trocar → 20/20). Configure na Vercel.',
      },
      { status: 503 }
    );
  }

  const league = await ensureNephrologyLeague();

  try {
    if (onlyToday) {
      const result = await ensureBothDailyExams(todayDateStringBrazil());
      const err = result.general.error || result.nephrology.error;
      return NextResponse.json({
        ok: !err,
        league,
        ...result,
        error: err || undefined,
      });
    }

    const results = await ensureBothDailyHorizons(days);
    const created =
      results.filter((r) => r.general.created).length +
      results.filter((r) => r.nephrology.created).length;
    const errors = results.flatMap((r) =>
      [r.general.error, r.nephrology.error].filter(Boolean)
    );

    return NextResponse.json({
      ok: errors.length === 0,
      league,
      created,
      checked: results.length * 2,
      results,
      error: errors[0] || undefined,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha no pipeline IA da disputa' },
      { status: 500 }
    );
  }
}
