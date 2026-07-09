import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { OptionLetter } from '@/types/database';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await request.json();
  const { questionId, selectedOption } = body as {
    questionId: string;
    selectedOption: OptionLetter | null;
  };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: attempt } = await supabase
    .from('attempts')
    .select('id, finished_at')
    .eq('id', attemptId)
    .eq('user_id', user.id)
    .single();

  if (!attempt) {
    return NextResponse.json({ error: 'Tentativa não encontrada' }, { status: 404 });
  }

  if (attempt.finished_at) {
    return NextResponse.json({ error: 'Prova já finalizada' }, { status: 400 });
  }

  if (selectedOption) {
    const { error } = await supabase
      .from('attempt_answers')
      .upsert(
        {
          attempt_id: attemptId,
          question_id: questionId,
          selected_option: selectedOption,
          answered_at: new Date().toISOString(),
        },
        { onConflict: 'attempt_id,question_id' }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    await supabase
      .from('attempt_answers')
      .delete()
      .eq('attempt_id', attemptId)
      .eq('question_id', questionId);
  }

  return NextResponse.json({ ok: true });
}
