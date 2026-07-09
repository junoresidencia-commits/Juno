import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { getRemainingSeconds } from '@/lib/utils';
import { ExamRunner } from '@/components/exam/ExamRunner';
import type { OptionLetter, Question } from '@/types/database';

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const { userId } = await requireAuth();
  const supabase = await createClient();

  const { data: exam } = await supabase
    .from('exams')
    .select('*')
    .eq('id', examId)
    .eq('status', 'published')
    .single();

  if (!exam) redirect('/aluno');

  let { data: attempt } = await supabase
    .from('attempts')
    .select('*')
    .eq('exam_id', examId)
    .eq('user_id', userId)
    .maybeSingle();

  if (attempt?.finished_at) {
    redirect(`/aluno/resultado/${attempt.id}`);
  }

  if (!attempt) {
    const { data: newAttempt, error } = await supabase
      .from('attempts')
      .insert({
        exam_id: examId,
        user_id: userId,
        total_questions: exam.total_questions,
      })
      .select()
      .single();

    if (error || !newAttempt) redirect('/aluno');
    attempt = newAttempt;
  }

  const remaining = getRemainingSeconds(attempt.started_at, exam.duration_minutes);
  if (remaining <= 0 && !attempt.finished_at) {
    await supabase.rpc('submit_attempt', {
      p_attempt_id: attempt.id,
      p_auto: true,
    });
    redirect(`/aluno/resultado/${attempt.id}`);
  }

  const { data: examQuestions } = await supabase
    .from('exam_questions')
    .select('order_number, questions(*)')
    .eq('exam_id', examId)
    .order('order_number');

  const questions = (examQuestions ?? [])
    .map((eq) => {
      const q = eq.questions as unknown as Question;
      return { ...q, order_number: eq.order_number };
    })
    .filter((q) => q.id);

  const { data: savedAnswers } = await supabase
    .from('attempt_answers')
    .select('question_id, selected_option')
    .eq('attempt_id', attempt.id);

  const initialAnswers: Record<string, OptionLetter> = {};
  for (const a of savedAnswers ?? []) {
    if (a.selected_option) {
      initialAnswers[a.question_id] = a.selected_option as OptionLetter;
    }
  }

  return (
    <div>
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
        A prova não pode ser pausada. Tempo restante exibido no cronômetro.
      </div>
      <ExamRunner
        attemptId={attempt.id}
        examId={examId}
        durationMinutes={exam.duration_minutes}
        startedAt={attempt.started_at}
        questions={questions}
        initialAnswers={initialAnswers}
      />
    </div>
  );
}
