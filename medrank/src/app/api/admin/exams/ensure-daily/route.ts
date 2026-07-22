import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { DAILY_EXAM_HORIZON_DAYS } from '@/lib/exams/daily-schedule';
import { ensureBothDailyExams, ensureBothDailyHorizons } from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { todayDateStringBrazil } from '@/lib/exams/window';

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

  const league = await ensureNephrologyLeague();

  if (onlyToday) {
    const result = await ensureBothDailyExams(todayDateStringBrazil());
    return NextResponse.json({
      ok: !result.general.error && !result.nephrology.error,
      league,
      ...result,
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
  });
}
