import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import { createDemoAttempt, getDemoAttemptByExam } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { canStartExam, getExamWindowStatus } from '@/lib/exams/release';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam || !canStartExam(exam)) {
      return NextResponse.json({ error: 'Prova não disponível neste horário (7h–22h)' }, { status: 404 });
    }
    const existing = getDemoAttemptByExam(examId);
    if (existing?.finished_at) {
      return NextResponse.json({ error: 'Prova já finalizada', attemptId: existing.id }, { status: 400 });
    }
    return NextResponse.json({ attempt: existing ?? createDemoAttempt(examId) });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: exam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', examId)
    .eq('status', 'published')
    .single();

  if (!exam) {
    return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
  }

  if (!canStartExam(exam)) {
    const phase = getExamWindowStatus(exam);
    const message =
      phase === 'before'
        ? 'A prova abre às 7h (horário de Brasília)'
        : 'O prazo de hoje encerrou às 22h. Você perdeu os pontos do dia.';
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const { data: existing } = await supabase
    .from('attempts')
    .select('*')
    .eq('exam_id', examId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing?.finished_at) {
    return NextResponse.json({ error: 'Prova já finalizada', attemptId: existing.id }, { status: 400 });
  }

  if (existing) {
    return NextResponse.json({ attempt: existing });
  }

  const { data: attempt, error } = await supabase
    .from('attempts')
    .insert({
      exam_id: examId,
      user_id: user.id,
      total_questions: exam.total_questions,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ attempt });
}
