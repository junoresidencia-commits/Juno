import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import {
  getDemoAttemptAnswers,
  getDemoAttemptById,
  getDemoQuestionsForAttempt,
} from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { generateStudyPdfBuffer } from '@/lib/exams/exam-pdf';
import { canStudentSeeExamGabarito } from '@/lib/exams/ranking-visibility';
import { formatQuestionExplanation } from '@/lib/question-bank/quality';
import { formatDateBR } from '@/lib/format';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import type { OptionLetter, Question } from '@/types/database';

/**
 * PDF de estudo após a disputa: questões + sua resposta + gabarito + certo/errado.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { attemptId } = await params;

  if (usesDemoStore()) {
    const attempt = getDemoAttemptById(attemptId);
    if (!attempt || attempt.user_id !== session.userId || !attempt.finished_at) {
      return NextResponse.json({ error: 'Resultado não encontrado' }, { status: 404 });
    }
    const exam = getDemoExams().find((e) => e.id === attempt.exam_id);
    if (!exam || !canStudentSeeExamGabarito(exam, true)) {
      return NextResponse.json(
        {
          error:
            'PDF com gabarito bloqueado até as 21h (Brasília), quando a disputa fecha.',
        },
        { status: 403 }
      );
    }

    const questions = getDemoQuestionsForAttempt(attemptId);
    const answers = getDemoAttemptAnswers(attemptId);
    const byQ = new Map(answers.map((a) => [a.question_id, a]));

    const rows = questions.map((q) => {
      const a = byQ.get(q.id);
      const selected = (a?.selected_option as OptionLetter | null) ?? null;
      return {
        statement: q.statement,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        option_e: q.option_e,
        correct_option: q.correct_option,
        selected_option: selected,
        is_correct: Boolean(selected && selected === q.correct_option),
        explanation: formatQuestionExplanation(q),
      };
    });

    const buffer = generateStudyPdfBuffer({
      title: exam.title,
      dateLabel: formatDateBR(exam.date_available),
      studentName: session.profile.name,
      scoreLabel: `${attempt.total_correct ?? 0}/${attempt.total_questions ?? rows.length} acertos`,
      questions: rows,
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="medrank-estudo-${exam.date_available}.pdf"`,
      },
    });
  }

  const supabase = await createClient();
  const admin = createAdminClient() ?? supabase;

  const { data: attempt } = await admin
    .from('attempts')
    .select(
      'id, user_id, exam_id, finished_at, total_correct, total_questions, score, exams(id, title, date_available, window_start_hour, window_end_hour)'
    )
    .eq('id', attemptId)
    .eq('user_id', session.userId)
    .maybeSingle();

  if (!attempt?.finished_at) {
    return NextResponse.json({ error: 'Finalize a disputa para baixar o PDF de estudo.' }, { status: 403 });
  }

  const exam = attempt.exams as unknown as {
    id: string;
    title: string;
    date_available: string;
    window_start_hour?: number;
    window_end_hour?: number;
  } | null;

  if (!exam || !canStudentSeeExamGabarito(exam, true)) {
    return NextResponse.json(
      {
        error:
          'PDF com gabarito bloqueado até as 21h (Brasília), quando a disputa fecha.',
      },
      { status: 403 }
    );
  }

  const { data: examQuestions, error: qError } = await admin
    .from('exam_questions')
    .select('order_number, questions(*)')
    .eq('exam_id', attempt.exam_id)
    .order('order_number');

  if (qError) {
    return NextResponse.json({ error: qError.message }, { status: 500 });
  }

  const { data: savedAnswers } = await admin
    .from('attempt_answers')
    .select('question_id, selected_option, is_correct')
    .eq('attempt_id', attemptId);

  const answerByQuestion = new Map(
    (savedAnswers ?? []).map((a) => [a.question_id, a])
  );

  const rows = [];
  for (const eq of examQuestions ?? []) {
    const q = eq.questions as unknown as Question | null;
    if (!q?.id) continue;
    const saved = answerByQuestion.get(q.id);
    const selected = (saved?.selected_option as OptionLetter | null) ?? null;
    rows.push({
      statement: q.statement,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      option_e: q.option_e,
      correct_option: q.correct_option,
      selected_option: selected,
      is_correct: Boolean(selected && (saved?.is_correct || selected === q.correct_option)),
      explanation: formatQuestionExplanation(q),
    });
  }

  const buffer = generateStudyPdfBuffer({
    title: exam.title,
    dateLabel: formatDateBR(exam.date_available),
    studentName: session.profile.name,
    scoreLabel: `${attempt.total_correct ?? 0}/${attempt.total_questions ?? rows.length} acertos`,
    questions: rows,
  });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="medrank-estudo-${exam.date_available}.pdf"`,
    },
  });
}
