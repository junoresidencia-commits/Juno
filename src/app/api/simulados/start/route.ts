import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { isSkipAuth } from '@/lib/skip-auth';
import { createSimuladoSession } from '@/lib/simulados/runtime';
import type { SimuladoMode } from '@/types/simulado';

export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const mode = (body as { mode?: SimuladoMode }).mode ?? 'geral';
  const area = (body as { area?: string }).area;
  const theme = (body as { theme?: string }).theme;

  if (!isSkipAuth()) {
    return NextResponse.json(
      { error: 'Simulados disponíveis no modo demo. Conecte o Supabase para produção.' },
      { status: 501 }
    );
  }

  try {
    const simulado = createSimuladoSession({
      userId: session.userId,
      mode,
      area,
      theme,
    });
    return NextResponse.json(simulado);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao criar simulado' },
      { status: 400 }
    );
  }
}
