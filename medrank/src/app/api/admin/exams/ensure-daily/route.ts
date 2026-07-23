import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { ensureBothDailyExams } from '@/lib/exams/ensure-daily';
import { ensureNephrologyLeague } from '@/lib/exams/audience';
import { todayDateStringBrazil } from '@/lib/exams/window';

/** Pipeline IA do dia (2 audiências) — timeout longo. */
export const maxDuration = 300;

/**
 * Gera/revisa apenas a disputa de HOJE (1×/dia).
 * Não aceita horizonte de vários dias — custo OpenAI.
 */
export async function POST(_request: Request) {
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

  const league = await ensureNephrologyLeague();

  try {
    const result = await ensureBothDailyExams(todayDateStringBrazil());
    const err = result.general.error || result.nephrology.error;
    return NextResponse.json({
      ok: !err,
      league,
      ...result,
      error: err || undefined,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Falha no pipeline IA da disputa' },
      { status: 500 }
    );
  }
}
