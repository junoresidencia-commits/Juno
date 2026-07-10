import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import { requireAuth } from '@/lib/auth';
import {
  createDemoAttempt,
  forfeitDemoAttempt,
  getDemoAttemptByExam,
} from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { canStartExam } from '@/lib/exams/release';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const { userId } = await requireAuth();

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam || !canStartExam(exam)) {
      return NextResponse.json({ error: 'Prova não disponível neste horário (7h–22h)' }, { status: 404 });
    }

    const existing = getDemoAttemptByExam(examId, userId);
    if (existing?.finished_at) {
      return NextResponse.json(
        { error: 'Prova já finalizada', attemptId: existing.id },
        { status: 400 }
      );
    }

    if (existing && !existing.finished_at) {
      forfeitDemoAttempt(existing.id);
      return NextResponse.json(
        { error: 'Você saiu da prova. Perdeu o dia.', forfeited: true },
        { status: 403 }
      );
    }

    const attempt = createDemoAttempt(examId, userId);
    return NextResponse.json({ attempt });
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

  if (!exam || !canStartExam(exam)) {
    return NextResponse.json({ error: 'Prova não disponível' }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from('attempts')
    .select('*')
    .eq('exam_id', examId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing?.finished_at) {
    return NextResponse.json(
      { error: 'Prova já finalizada', attemptId: existing.id },
      { status: 400 }
    );
  }

  if (existing && !existing.finished_at) {
    await supabase.rpc('submit_attempt', { p_attempt_id: existing.id, p_auto: true });
    return NextResponse.json(
      { error: 'Você saiu da prova. Perdeu o dia.', forfeited: true },
      { status: 403 }
    );
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
