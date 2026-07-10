import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { canStartExam } from '@/lib/exams/release';
import { formatExamWindowLabel } from '@/lib/exams/window';
import { ExamSession } from '@/components/exam/ExamSession';
import type { Question } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoExamQuestions, getDemoExams } from '@/lib/demo/content';
import { createClient } from '@/lib/supabase/server';

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  await requireAuth();

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam || !canStartExam(exam)) redirect('/aluno');

    const questions = getDemoExamQuestions(examId);

    return (
      <div>
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          {formatExamWindowLabel()}. 30 min no total · até 1 min 30 s por questão · uma de cada vez.
        </div>
        <ExamSession
          examId={examId}
          durationMinutes={exam.duration_minutes}
          questions={questions}
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

  if (!exam || !canStartExam(exam)) redirect('/aluno');

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

  return (
    <div>
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
        {formatExamWindowLabel()}. 30 min no total · até 1 min 30 s por questão · uma de cada vez.
      </div>
      <ExamSession
        examId={examId}
        durationMinutes={exam.duration_minutes}
        questions={questions}
      />
    </div>
  );
}
