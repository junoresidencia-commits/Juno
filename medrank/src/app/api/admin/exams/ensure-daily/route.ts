import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import {
  ensureBothDailyExams,
  ensureBothDailyHorizons,
  resolveDailyMode,
} from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { MAX_HORIZON_DAYS } from '@/lib/exams/daily-schedule';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { getAiPaidSettings } from '@/lib/exams/ai-paid-settings';

/** Horizonte (até 31 dias × 2 audiências). Banco é rápido; IA só para 1 dia. */
export const maxDuration = 300;

/**
 * Gera disputa(s) diária(s).
 * body.force=true apaga e regenera (só o 1º dia / hoje).
 * body.mode='bank' | 'ai' (default bank).
 * body.days=7|14|30|… → pré-gera hoje + futuros (máx. 31). Com days>1 força banco.
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  let force = false;
  let mode: 'ai' | 'bank' | undefined;
  let days = 1;
  try {
    const body = (await request.json().catch(() => null)) as {
      force?: boolean;
      mode?: 'ai' | 'bank';
      days?: number;
      horizon?: number;
    } | null;
    force = Boolean(body?.force);
    mode = body?.mode;
    const rawDays = Number(body?.days ?? body?.horizon ?? 1);
    days = Number.isFinite(rawDays) ? Math.floor(rawDays) : 1;
  } catch {
    force = false;
    days = 1;
  }

  if (days < 1 || days > MAX_HORIZON_DAYS) {
    return NextResponse.json(
      { error: `Informe days entre 1 e ${MAX_HORIZON_DAYS} (ex.: 7, 14 ou 30).` },
      { status: 400 }
    );
  }

  const resolved = resolveDailyMode(mode);

  if (days > 1 && resolved === 'ai') {
    // Horizonte longo com IA seria caro e lento — só banco
  }

  if (resolved === 'ai' && days === 1) {
    const ai = await getAiPaidSettings();
    if (!ai.enabled) {
      return NextResponse.json(
        {
          error:
            'IA paga desativada no painel. Ative em Admin → Provas (com confirmação de custo) ou use Gerar do banco (grátis).',
          estimate_usd_per_day: { min: 0.5, max: 5 },
        },
        { status: 403 }
      );
    }
    if (!process.env.OPENAI_API_KEY?.trim()) {
      return NextResponse.json(
        {
          error:
            'Modo IA exige OPENAI_API_KEY com credito. Use mode=bank (Gerar do banco) — gratis, sem OpenAI.',
        },
        { status: 503 }
      );
    }
  }

  const league = await ensureNephrologyLeague();
  const today = todayDateStringBrazil();

  try {
    if (days === 1) {
      const result = await ensureBothDailyExams(today, {
        force,
        mode: resolved,
      });
      const err = result.general.error || result.nephrology.error;
      return NextResponse.json({
        ok: !err,
        force,
        days: 1,
        league,
        ...result,
        error: err || undefined,
      });
    }

    const horizon = await ensureBothDailyHorizons(days, today, {
      force,
      mode: 'bank',
    });
    const created =
      horizon.createdGeneral + horizon.createdNephrology;
    const message =
      created > 0
        ? `Pronto — ${horizon.days} dia(s) (${horizon.fromDate} → ${horizon.toDate}): ${horizon.createdGeneral} geral + ${horizon.createdNephrology} nefro criadas. ${horizon.alreadyOk} dia(s) já existiam.`
        : `Nada novo — as ${horizon.days} disputa(s) de ${horizon.fromDate} a ${horizon.toDate} já estavam prontas.`;

    return NextResponse.json({
      ok: horizon.errors.length === 0,
      force: false,
      days: horizon.days,
      fromDate: horizon.fromDate,
      toDate: horizon.toDate,
      createdGeneral: horizon.createdGeneral,
      createdNephrology: horizon.createdNephrology,
      alreadyOk: horizon.alreadyOk,
      league,
      mode: 'bank',
      results: horizon.results.map((r) => ({
        date: r.date,
        generalCreated: r.general.created,
        nephrologyCreated: r.nephrology.created,
        generalId: r.general.exam?.id ?? null,
        nephrologyId: r.nephrology.exam?.id ?? null,
        error: r.general.error || r.nephrology.error || null,
      })),
      message,
      error: horizon.errors[0],
      errors: horizon.errors.length ? horizon.errors : undefined,
    });
  } catch (e) {
    const raw = e instanceof Error ? e.message : 'Falha ao gerar disputa';
    const error = /ByteString|8230|greater than 255/i.test(raw)
      ? 'Falha de encoding na chamada OpenAI. Prefira Gerar do banco (sem IA) ou corrija a OPENAI_API_KEY.'
      : /quota|429|insufficient/i.test(raw)
        ? 'OpenAI sem credito (429). Use Gerar do banco (sem IA) — gratis.'
        : raw.replace(/[\u0100-\uFFFF]/g, '?');
    return NextResponse.json({ error }, { status: 500 });
  }
}
