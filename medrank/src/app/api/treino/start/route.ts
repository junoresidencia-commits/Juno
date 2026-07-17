import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { createTreinoSession, type TreinoMode } from '@/lib/treino/runtime';
import { TRACK_CONFIG, type TreinoTrack } from '@/lib/treino/bank';

export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const track = ((body as { track?: TreinoTrack }).track ?? 'nefropediatria') as TreinoTrack;
  const count = Number((body as { count?: number }).count) || 20;
  const mode = ((body as { mode?: TreinoMode }).mode ?? 'prova') as TreinoMode;
  const topic = (body as { topic?: string }).topic ?? null;
  const liga = (body as { liga?: string }).liga ?? null;

  if (!TRACK_CONFIG[track]) {
    return NextResponse.json({ error: 'Track inválido' }, { status: 400 });
  }

  if (!TRACK_CONFIG[track].sizes.includes(count)) {
    return NextResponse.json(
      { error: `Tamanho inválido. Use: ${TRACK_CONFIG[track].sizes.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const treino = await createTreinoSession({
      userId: session.userId,
      track,
      count,
      mode,
      topic,
      liga,
    });
    return NextResponse.json(treino);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao iniciar treino' },
      { status: 400 }
    );
  }
}
