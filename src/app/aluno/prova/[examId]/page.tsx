import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { getEffectiveExamRemainingSeconds } from '@/lib/utils';
import { canStartExam, getExamWindowStatus } from '@/lib/exams/release';
import { formatExamWindowLabel } from '@/lib/exams/window';
import { ExamRunner } from '@/components/exam/ExamRunner';
import type { OptionLetter, Question } from '@/types/database';
import { isSkipAuth } from '@/lib/skip-auth';
import { createDemoAttempt, getDemoAttemptByExam, getDemoAttemptAnswers, submitDemoAttempt } from '@/lib/demo/runtime';
import { getDemoExamQuestions, getDemoExams } from '@/lib/demo/content';

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const { userId } = await requireAuth();

  if (isSkipAuth()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam) redirect('/aluno');

    let attempt = getDemoAttemptByExam(examId, userId);
    if (attempt?.finished_at) {
      redirect(`/aluno/resultado/${attempt.id}`);
    }

    const windowPhase = getExamWindowStatus(exam);

    if (!attempt) {
      if (!canStartExam(exam)) redirect('/aluno');
      attempt = createDemoAttempt(examId, userId);
    } else if (windowPhase === 'after' && getEffectiveExamRemainingSeconds(attempt.started_at, exam.duration_minutes) <= 0) {
      const submitted = submitDemoAttempt(attempt.id, true);
      redirect(`/aluno/resultado/${submitted.id}`);
    }

    const questions = getDemoExamQuestions(examId);
    const savedAnswers = getDemoAttemptAnswers(attempt.id);
    const initialAnswers: Record<string, OptionLetter> = {};
    for (const a of savedAnswers) {
      if (a.selected_option) initialAnswers[a.question_id] = a.selected_option;
    }

    return (
      <div>
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">
          {formatExamWindowLabel()}. A prova encerra automaticamente às 22h.
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

  if (!attempt) {
    if (!canStartExam(exam)) redirect('/aluno');
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

  const remaining = getEffectiveExamRemainingSeconds(attempt.started_at, exam.duration_minutes);
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
        {formatExamWindowLabel()}. A prova encerra automaticamente às 22h.
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
