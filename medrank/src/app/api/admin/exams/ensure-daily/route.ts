import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { ensureBothDailyExams, resolveDailyMode } from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Pipeline do dia (2 audiencias). Modo banco e rapido; modo IA precisa de timeout longo. */
export const maxDuration = 300;

/**
 * Gera disputa de HOJE.
 * body.force=true apaga e regenera.
 * body.mode='bank' | 'ai' (default bank — sem custo OpenAI).
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  let force = false;
  let mode: 'ai' | 'bank' | undefined;
  try {
    const body = (await request.json().catch(() => null)) as {
      force?: boolean;
      mode?: 'ai' | 'bank';
    } | null;
    force = Boolean(body?.force);
    mode = body?.mode;
  } catch {
    force = false;
  }

  const resolved = resolveDailyMode(mode);
  if (resolved === 'ai' && !process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          'Modo IA exige OPENAI_API_KEY com credito. Use mode=bank (Gerar do banco) — gratis, sem OpenAI.',
      },
      { status: 503 }
    );
  }

  const league = await ensureNephrologyLeague();

  try {
    const result = await ensureBothDailyExams(todayDateStringBrazil(), {
      force,
      mode: resolved,
    });
    const err = result.general.error || result.nephrology.error;
    return NextResponse.json({
      ok: !err,
      force,
      league,
      ...result,
      error: err || undefined,
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
