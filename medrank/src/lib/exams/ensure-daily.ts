import 'server-only';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { DAILY_EXAM_HORIZON_DAYS, addCalendarDaysBrazil } from '@/lib/exams/daily-schedule';
import { ensureDailyNephrologyExam, type EnsureDailyExamResult } from '@/lib/exams/daily-nephrology';
import { ensureDailyGeneralExam, type EnsureGeneralExamResult } from '@/lib/exams/daily-general';
import { ensureNephrologyLeague } from '@/lib/exams/audience';

export type DualEnsureResult = {
  date: string;
  general: EnsureGeneralExamResult;
  nephrology: EnsureDailyExamResult;
};

/** Garante disputa geral + disputa da Liga de Nefrologia para a data. */
export async function ensureBothDailyExams(
  dateStr = todayDateStringBrazil()
): Promise<DualEnsureResult> {
  await ensureNephrologyLeague();
  const [general, nephrology] = await Promise.all([
    ensureDailyGeneralExam(dateStr),
    ensureDailyNephrologyExam(dateStr),
  ]);
  return { date: dateStr, general, nephrology };
}

export async function ensureBothDailyHorizons(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil()
): Promise<DualEnsureResult[]> {
  await ensureNephrologyLeague();
  const results: DualEnsureResult[] = [];
  const n = Math.max(1, Math.min(31, days));
  for (let i = 0; i < n; i++) {
    const date = addCalendarDaysBrazil(fromDate, i);
    results.push(await ensureBothDailyExams(date));
  }
  return results;
}
