import 'server-only';
import { todayDateStringBrazil } from '@/lib/exams/window';
import {
  DAILY_EXAM_HORIZON_DAYS,
  MAX_HORIZON_DAYS,
  addCalendarDaysBrazil,
} from '@/lib/exams/daily-schedule';
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

export type HorizonEnsureSummary = {
  days: number;
  fromDate: string;
  toDate: string;
  results: DualEnsureResult[];
  createdGeneral: number;
  createdNephrology: number;
  alreadyOk: number;
  errors: string[];
};

export function resolveDailyMode(requested?: 'ai' | 'bank'): 'ai' | 'bank' {
  if (requested === 'ai' || requested === 'bank') return requested;
  const env = process.env.MEDRANK_DAILY_MODE?.trim().toLowerCase();
  if (env === 'ai' || env === 'bank') return env;
  // Sem credito OpenAI: padrao banco local
  return 'bank';
}

function clampHorizonDays(days: number): number {
  if (!Number.isFinite(days)) return 1;
  return Math.max(1, Math.min(MAX_HORIZON_DAYS, Math.floor(days)));
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

/**
 * Pré-gera hoje + próximos (days-1) dias.
 * Por padrão não força: dias que já existem são pulados.
 * Horizonte longo (≥2 dias) usa modo banco (IA seria cara demais).
 */
export async function ensureBothDailyHorizons(
  days = DAILY_EXAM_HORIZON_DAYS,
  fromDate = todayDateStringBrazil(),
  opts?: EnsureDailyOpts
): Promise<HorizonEnsureSummary> {
  await ensureNephrologyLeague();
  const n = clampHorizonDays(days);
  let mode = resolveDailyMode(opts?.mode);
  if (n > 1) {
    // Pré-gerar 7/14/30 dias só faz sentido no banco (grátis e previsível)
    mode = 'bank';
  } else if (mode === 'ai') {
    const ai = await getAiPaidSettings();
    if (!ai.enabled) mode = 'bank';
  }

  const results: DualEnsureResult[] = [];
  for (let i = 0; i < n; i++) {
    const date = addCalendarDaysBrazil(fromDate, i);
    results.push(
      await ensureBothDailyExams(date, {
        force: opts?.force && i === 0 ? opts.force : false,
        mode,
      })
    );
  }

  const createdGeneral = results.filter((r) => r.general.created).length;
  const createdNephrology = results.filter((r) => r.nephrology.created).length;
  const alreadyOk = results.filter(
    (r) =>
      !r.general.created &&
      !r.nephrology.created &&
      r.general.exam &&
      r.nephrology.exam &&
      !r.general.error &&
      !r.nephrology.error
  ).length;
  const errors = results
    .flatMap((r) => [
      r.general.error ? `${r.date} geral: ${r.general.error}` : null,
      r.nephrology.error ? `${r.date} nefro: ${r.nephrology.error}` : null,
    ])
    .filter(Boolean) as string[];

  return {
    days: n,
    fromDate,
    toDate: addCalendarDaysBrazil(fromDate, n - 1),
    results,
    createdGeneral,
    createdNephrology,
    alreadyOk,
    errors,
  };
}
