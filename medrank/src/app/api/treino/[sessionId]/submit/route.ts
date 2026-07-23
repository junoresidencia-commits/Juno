import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { getTreinoSession, submitTreinoSession } from '@/lib/treino/runtime';
import { canAccessNephrologyTreino } from '@/lib/treino/access';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  if (!(await canAccessNephrologyTreino(session.userId, session.profile))) {
    return NextResponse.json({ error: 'Treino exclusivo da Liga de Nefrologia' }, { status: 403 });
  }

  const treino = await getTreinoSession(sessionId);
  if (!treino || treino.user_id !== session.userId) {
    return NextResponse.json({ error: 'Treino indisponível' }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const auto = Boolean((body as { auto?: boolean }).auto);

  try {
    const data = await submitTreinoSession(sessionId, auto);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro' },
      { status: 400 }
    );
  }
}
