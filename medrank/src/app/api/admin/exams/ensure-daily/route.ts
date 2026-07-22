import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import {
  DAILY_EXAM_HORIZON_DAYS,
  ensureDailyNephrologyExam,
  ensureDailyNephrologyHorizon,
} from '@/lib/exams/daily-nephrology';
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
    // body vazio = horizonte padrão
  }

  if (onlyToday) {
    const result = await ensureDailyNephrologyExam(todayDateStringBrazil());
    return NextResponse.json({
      ok: !result.error,
      ...result,
    });
  }

  const results = await ensureDailyNephrologyHorizon(days);
  const created = results.filter((r) => r.created).length;
  const errors = results.filter((r) => r.error);

  return NextResponse.json({
    ok: errors.length === 0,
    created,
    checked: results.length,
    results,
  });
}
