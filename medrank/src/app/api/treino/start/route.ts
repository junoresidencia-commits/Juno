import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createTreinoSession, type TreinoMode } from '@/lib/treino/runtime';
import { TREINO_SIZE_OPTIONS } from '@/lib/treino/bank';

export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const count = Number((body as { count?: number }).count) || 20;
  const mode = ((body as { mode?: TreinoMode }).mode ?? 'prova') as TreinoMode;
  const topic = (body as { topic?: string }).topic ?? null;

  if (!TREINO_SIZE_OPTIONS.includes(count as (typeof TREINO_SIZE_OPTIONS)[number])) {
    return NextResponse.json(
      { error: 'Tamanho inválido. Use 20, 30 ou 60 questões.' },
      { status: 400 }
    );
  }

  try {
    const treino = await createTreinoSession({
      userId: session.userId,
      count,
      mode: mode === 'tema' && topic ? 'tema' : mode === 'srs' ? 'srs' : 'prova',
      topic,
    });
    return NextResponse.json(treino);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao iniciar treino' },
      { status: 400 }
    );
  }
}
