import { NextResponse } from 'next/server';
import { isSkipAuth } from '@/lib/skip-auth';
import { saveSimuladoAnswer } from '@/lib/simulados/runtime';
import type { OptionLetter } from '@/types/database';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  if (!isSkipAuth()) {
    return NextResponse.json({ error: 'Não disponível' }, { status: 501 });
  }

  const body = await request.json();
  const questionId = (body as { questionId?: string }).questionId;
  const selectedOption = (body as { selectedOption?: OptionLetter | null }).selectedOption ?? null;
  const timeSpentSeconds = (body as { timeSpentSeconds?: number }).timeSpentSeconds;

  if (!questionId) {
    return NextResponse.json({ error: 'Questão inválida' }, { status: 400 });
  }

  const ok = saveSimuladoAnswer(sessionId, questionId, selectedOption, timeSpentSeconds);
  if (!ok) {
    return NextResponse.json({ error: 'Simulado indisponível' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
