import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { setQuestionExplanationOverride } from '@/lib/demo-store';
import { invalidateQuestionBankCache } from '@/lib/question-bank/pool';

export async function PUT(request: Request) {
  const session = await getSessionProfile();
  if (!session || session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const questionId = (body as { questionId?: string }).questionId;
  const explanation = (body as { explanation?: string }).explanation?.trim();

  if (!questionId || !explanation) {
    return NextResponse.json({ error: 'questionId e explanation são obrigatórios' }, { status: 400 });
  }

  if (explanation.length < 50) {
    return NextResponse.json({ error: 'Comentário deve ter pelo menos 50 caracteres' }, { status: 400 });
  }

  if (usesDemoStore()) {
    setQuestionExplanationOverride(questionId, explanation);
    invalidateQuestionBankCache();
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const { error } = await supabase.from('questions').update({ explanation }).eq('id', questionId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
