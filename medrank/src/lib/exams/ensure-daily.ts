import 'server-only';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { DAILY_EXAM_HORIZON_DAYS, addCalendarDaysBrazil } from '@/lib/exams/daily-schedule';
import { ensureDailyNephrologyExam, type EnsureDailyExamResult } from '@/lib/exams/daily-nephrology';
import { ensureDailyGeneralExam, type EnsureGeneralExamResult } from '@/lib/exams/daily-general';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { getAiPaidSettings } from '@/lib/exams/ai-paid-settings';
import {
  notifyStudentsExamReady,
  type ExamReadyNotifyResult,
} from '@/lib/email/exam-ready';

export type DualEnsureResult = {
  date: string;
  mode: 'ai' | 'bank';
  general: EnsureGeneralExamResult;
  nephrology: EnsureDailyExamResult;
  notify?: ExamReadyNotifyResult;
};

export type EnsureDailyOpts = {
  force?: boolean;
  /** ai = OpenAI (pago); bank = só banco local (gratis). Default: bank. */
  mode?: 'ai' | 'bank';
  /** Se false, não envia e-mail/notificação (default true). */
  notifyStudents?: boolean;
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

  const result: DualEnsureResult = { date: dateStr, mode, general, nephrology };

  if (opts?.notifyStudents !== false) {
    try {
      result.notify = await notifyStudentsExamReady(result);
      if (result.notify.error) {
        console.error('[ensure-daily] exam-ready email:', result.notify.error);
      } else if (result.notify.emailed > 0 || result.notify.inApp > 0) {
        console.info(
          `[ensure-daily] avisos: email=${result.notify.emailed} app=${result.notify.inApp}`
        );
      }
    } catch (err) {
      console.error('[ensure-daily] notifyStudentsExamReady failed', err);
      result.notify = {
        emailed: 0,
        inApp: 0,
        recipients: 0,
        error: err instanceof Error ? err.message : 'Falha ao avisar alunos',
      };
    }
  }

  return result;
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
