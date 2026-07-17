import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { getTreinoSession, saveTreinoAnswer } from '@/lib/treino/runtime';
import type { OptionLetter } from '@/types/database';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const treino = await getTreinoSession(sessionId);
  if (!treino || treino.user_id !== session.userId) {
    return NextResponse.json({ error: 'Treino indisponível' }, { status: 404 });
  }

  const body = await request.json();
  const questionId = (body as { questionId?: string }).questionId;
  const selectedOption = (body as { selectedOption?: OptionLetter | null }).selectedOption ?? null;
  const timeSpentSeconds = (body as { timeSpentSeconds?: number }).timeSpentSeconds;
  const confidence = (body as { confidence?: number | null }).confidence ?? null;

  if (!questionId) {
    return NextResponse.json({ error: 'Questão inválida' }, { status: 400 });
  }

  const ok = await saveTreinoAnswer(
    sessionId,
    questionId,
    selectedOption,
    timeSpentSeconds,
    confidence
  );
  if (!ok) {
    return NextResponse.json({ error: 'Treino indisponível' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
