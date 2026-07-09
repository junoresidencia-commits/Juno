import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSkipAuth } from '@/lib/skip-auth';
import { submitDemoAttempt } from '@/lib/demo/runtime';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await request.json().catch(() => ({}));
  const auto = Boolean((body as { auto?: boolean }).auto);

  if (isSkipAuth()) {
    try {
      const data = submitDemoAttempt(attemptId, auto);
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro' }, { status: 400 });
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data, error } = await supabase.rpc('submit_attempt', {
    p_attempt_id: attemptId,
    p_auto: auto,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
