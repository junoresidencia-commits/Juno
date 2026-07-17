import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createTreinoSession } from '@/lib/treino/runtime';

export async function POST() {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  try {
    const treino = await createTreinoSession(session.userId);
    return NextResponse.json(treino);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao iniciar treino' },
      { status: 400 }
    );
  }
}
