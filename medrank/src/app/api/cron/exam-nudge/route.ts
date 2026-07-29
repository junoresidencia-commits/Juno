import { NextResponse } from 'next/server';
import { assertCronAuthorized } from '@/lib/cron/auth';
import { sendExamNudges } from '@/lib/email/exam-nudge';

export const maxDuration = 120;

/**
 * Vercel Cron: empurra alunos que ainda não fizeram a prova de hoje.
 * Dispara várias vezes ao dia; só envia às 9h / 13h / 17h / 19h (Brasília).
 * Query opcional: ?phase=morning|midday|afternoon|evening
 */
export async function GET(request: Request) {
  const denied = assertCronAuthorized(request);
  if (denied) return denied;

  const url = new URL(request.url);
  const phase = url.searchParams.get('phase');

  try {
    const result = await sendExamNudges({ phase });
    return NextResponse.json({ ok: !result.error, ...result });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Falha no lembrete de prova',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
