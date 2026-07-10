import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import { canStartExam } from '@/lib/exams/release';
import { formatExamWindowLabel } from '@/lib/exams/window';
import { ExamRunner } from '@/components/exam/ExamRunner';
import type { OptionLetter, Question } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { createDemoAttempt, forfeitDemoAttempt, getDemoAttemptByExam } from '@/lib/demo/runtime';
import { getDemoExamQuestions, getDemoExams } from '@/lib/demo/content';

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const { userId } = await requireAuth();

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam) redirect('/aluno');

    let attempt = getDemoAttemptByExam(examId, userId);
    if (attempt?.finished_at) {
      redirect(`/aluno/resultado/${attempt.id}`);
    }

    if (attempt && !attempt.finished_at) {
      forfeitDemoAttempt(attempt.id);
      redirect('/aluno');
    }

    if (!canStartExam(exam)) redirect('/aluno');
    attempt = createDemoAttempt(examId, userId);

    const questions = getDemoExamQuestions(examId);
    const initialAnswers: Record<string, OptionLetter> = {};

    return (
      <div>
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          {formatExamWindowLabel()}. 30 min no total · até 1 min 30 s por questão · uma de cada vez.
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

  if (attempt && !attempt.finished_at) {
    await supabase.rpc('submit_attempt', {
      p_attempt_id: attempt.id,
      p_auto: true,
    });
    redirect('/aluno');
  }

  if (!canStartExam(exam)) redirect('/aluno');

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

  const remaining = getEffectiveExamRemainingSeconds(attempt.started_at, exam.duration_minutes);
  if (remaining <= 0) {
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

  const initialAnswers: Record<string, OptionLetter> = {};

  return (
    <div>
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
        {formatExamWindowLabel()}. 30 min no total · até 1 min 30 s por questão · uma de cada vez.
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
