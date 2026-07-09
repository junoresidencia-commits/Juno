import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = await request.json();
  const mode = body.selection_mode ?? 'auto';
  const totalQuestions = Number(body.total_questions);
  const sourceFilter = body.source_filter || null;
  const topicFilter = body.topic_filter || null;
  const manualIds: string[] = body.question_ids ?? [];

  let selected: { id: string }[] = [];

  if (mode === 'manual') {
    if (manualIds.length !== totalQuestions) {
      return NextResponse.json({
        error: `Selecione exatamente ${totalQuestions} questões. Selecionadas: ${manualIds.length}`,
      }, { status: 400 });
    }
    selected = manualIds.map((id) => ({ id }));
  } else {
    let query = supabase.from('questions').select('id');
    if (sourceFilter) query = query.eq('source', sourceFilter);
    if (topicFilter) query = query.eq('topic', topicFilter);

    const { data: allQuestions, error: qError } = await query;

    if (qError) {
      return NextResponse.json({ error: qError.message }, { status: 500 });
    }

    if (!allQuestions || allQuestions.length < totalQuestions) {
      return NextResponse.json({
        error: `Questões insuficientes. Disponíveis: ${allQuestions?.length ?? 0}, necessárias: ${totalQuestions}`,
      }, { status: 400 });
    }

    selected = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
  }

  const { data: exam, error: examError } = await supabase
    .from('exams')
    .insert({
      title: body.title,
      date_available: body.date_available,
      duration_minutes: Number(body.duration_minutes),
      total_questions: totalQuestions,
      show_answers_after_submit: Boolean(body.show_answers_after_submit),
      show_answers_when_all_done: Boolean(body.show_answers_when_all_done),
      selection_mode: mode,
      status: body.publish ? 'published' : 'draft',
    })
    .select()
    .single();

  if (examError) {
    return NextResponse.json({ error: examError.message }, { status: 500 });
  }

  const examQuestions = selected.map((q, i) => ({
    exam_id: exam.id,
    question_id: q.id,
    order_number: i + 1,
  }));

  const { error: eqError } = await supabase.from('exam_questions').insert(examQuestions);

  if (eqError) {
    await supabase.from('exams').delete().eq('id', exam.id);
    return NextResponse.json({ error: eqError.message }, { status: 500 });
  }

  return NextResponse.json({ exam });
}
