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
  dateStr = todayDateStringBrazil(),
  opts?: { force?: boolean }
): Promise<DualEnsureResult> {
  await ensureNephrologyLeague();
  // Sequencial: cada trilha faz dezenas de chamadas OpenAI (revisão + trocas).
  const general = await ensureDailyGeneralExam(dateStr, opts);
  const nephrology = await ensureDailyNephrologyExam(dateStr, opts);
  return { date: dateStr, general, nephrology };
}

export async function ensureBothDailyHorizons(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil()
): Promise<DualEnsureResult[]> {
  // Mantido para testes; em produção o cron/admin usam só hoje (days=1).
  await ensureNephrologyLeague();
  const results: DualEnsureResult[] = [];
  const n = Math.max(1, Math.min(1, days)); // forçar no máx. 1 dia
  for (let i = 0; i < n; i++) {
    const date = addCalendarDaysBrazil(fromDate, i);
    results.push(await ensureBothDailyExams(date));
  }
  return results;
}
