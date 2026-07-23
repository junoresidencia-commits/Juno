import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { ensureBothDailyExams } from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Pipeline IA do dia (2 audiências) — timeout longo. */
export const maxDuration = 300;

/**
 * Gera/revisa a disputa de HOJE.
 * body.force=true apaga as de hoje e regenera com IA (admin only).
 */
export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          'OPENAI_API_KEY obrigatória: a disputa só publica após revisão clínica IA (gerar → revisar → trocar → 20/20). Configure na Vercel.',
      },
      { status: 503 }
    );
  }

  let force = false;
  try {
    const body = (await request.json().catch(() => null)) as { force?: boolean } | null;
    force = Boolean(body?.force);
  } catch {
    force = false;
  }

  const league = await ensureNephrologyLeague();

  try {
    const result = await ensureBothDailyExams(todayDateStringBrazil(), { force });
    const err = result.general.error || result.nephrology.error;
    return NextResponse.json({
      ok: !err,
      force,
      league,
      ...result,
      error: err || undefined,
    });
  } catch (e) {
    const raw = e instanceof Error ? e.message : 'Falha no pipeline IA da disputa';
    const error = /ByteString|8230|greater than 255/i.test(raw)
      ? 'Falha de encoding na chamada OpenAI (caractere invalido na OPENAI_API_KEY ou header). Na Vercel: apague a OPENAI_API_KEY, crie de novo colando so sk-..., Redeploy, e tente Forcar regenerar.'
      : raw.replace(/[\u0100-\uFFFF]/g, '?');
    return NextResponse.json({ error }, { status: 500 });
  }
}
