import 'server-only';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { DAILY_EXAM_HORIZON_DAYS, addCalendarDaysBrazil } from '@/lib/exams/daily-schedule';
import { ensureDailyNephrologyExam, type EnsureDailyExamResult } from '@/lib/exams/daily-nephrology';
import { ensureDailyGeneralExam, type EnsureGeneralExamResult } from '@/lib/exams/daily-general';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { getAiPaidSettings } from '@/lib/exams/ai-paid-settings';

export type DualEnsureResult = {
  date: string;
  mode: 'ai' | 'bank';
  general: EnsureGeneralExamResult;
  nephrology: EnsureDailyExamResult;
};

export type EnsureDailyOpts = {
  force?: boolean;
  /** ai = OpenAI (pago); bank = só banco local (gratis). Default: bank. */
  mode?: 'ai' | 'bank';
};

export function resolveDailyMode(requested?: 'ai' | 'bank'): 'ai' | 'bank' {
  if (requested === 'ai' || requested === 'bank') return requested;
  const env = process.env.MEDRANK_DAILY_MODE?.trim().toLowerCase();
  if (env === 'ai' || env === 'bank') return env;
  // Sem credito OpenAI: padrao banco local
  return 'bank';
}

/** Garante disputa geral + disputa da Liga de Nefrologia para a data. */
export async function ensureBothDailyExams(
  dateStr = todayDateStringBrazil(),
  opts?: EnsureDailyOpts
): Promise<DualEnsureResult> {
  await ensureNephrologyLeague();
  let mode = resolveDailyMode(opts?.mode);

  if (mode === 'ai') {
    const ai = await getAiPaidSettings();
    if (!ai.enabled) {
      // Fallback seguro: nunca gastar OpenAI se o toggle estiver off
      mode = 'bank';
    }
  }

  const general = await ensureDailyGeneralExam(dateStr, { force: opts?.force, mode });
  const nephrology = await ensureDailyNephrologyExam(dateStr, { force: opts?.force, mode });
  return { date: dateStr, mode, general, nephrology };
}

export async function ensureBothDailyHorizons(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil()
): Promise<DualEnsureResult[]> {
  await ensureNephrologyLeague();
  const results: DualEnsureResult[] = [];
  const n = Math.max(1, Math.min(1, days));
  for (let i = 0; i < n; i++) {
    const date = addCalendarDaysBrazil(fromDate, i);
    results.push(await ensureBothDailyExams(date));
  }
  return results;
}
