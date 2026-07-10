import { NextResponse } from 'next/server';
import { usesDemoStore } from '@/lib/demo-data';
import { submitSimuladoSession } from '@/lib/simulados/runtime';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const body = await request.json().catch(() => ({}));
  const auto = Boolean((body as { auto?: boolean }).auto);

  if (!usesDemoStore()) {
    return NextResponse.json({ error: 'Não disponível' }, { status: 501 });
  }

  try {
    const data = submitSimuladoSession(sessionId, auto);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro' },
      { status: 400 }
    );
  }
}
