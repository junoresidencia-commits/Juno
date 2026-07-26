import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getAllDemoAttempts, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { generateExamPdfBuffer } from '@/lib/exams/exam-pdf';
import { canStudentDownloadExamPdf } from '@/lib/exams/ranking-visibility';
import { formatDateBR } from '@/lib/format';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import type { Question } from '@/types/database';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ examId: string }> }
) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { examId } = await params;

  if (usesDemoStore()) {
    const exam = getDemoExams().find((e) => e.id === examId);
    if (!exam) {
      return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
    }
    const finished = getAllDemoAttempts().some(
      (a) => a.exam_id === examId && a.user_id === session.userId && !!a.finished_at
    );
    if (!canStudentDownloadExamPdf(exam, finished)) {
      return NextResponse.json(
        { error: 'PDF ainda não liberado. Termine a prova e aguarde as 21h.' },
        { status: 403 }
      );
    }
    const attempt = getAllDemoAttempts().find(
      (a) => a.exam_id === examId && a.user_id === session.userId && !!a.finished_at
    );
    const questions = attempt
      ? getDemoQuestionsForAttempt(attempt.id)
      : [];
    const buffer = generateExamPdfBuffer({
      title: exam.title,
      dateLabel: formatDateBR(exam.date_available),
      questions,
    });
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="medrank-prova-${exam.date_available}.pdf"`,
      },
    });
  }

  const supabase = await createClient();
  const admin = createAdminClient() ?? supabase;

  const { data: exam, error: examError } = await admin
    .from('exams')
    .select('id, title, date_available, window_start_hour, window_end_hour')
    .eq('id', examId)
    .maybeSingle();

  if (examError) {
    return NextResponse.json({ error: examError.message }, { status: 500 });
  }
  if (!exam) {
    return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
  }

  const { data: attempt } = await admin
    .from('attempts')
    .select('id, finished_at')
    .eq('exam_id', examId)
    .eq('user_id', session.userId)
    .not('finished_at', 'is', null)
    .order('finished_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!canStudentDownloadExamPdf(exam, !!attempt?.finished_at)) {
    return NextResponse.json(
      { error: 'PDF ainda não liberado. Termine a prova e aguarde as 21h.' },
      { status: 403 }
    );
  }

  const { data: examQuestions, error: qError } = await admin
    .from('exam_questions')
    .select('order_number, questions(statement, option_a, option_b, option_c, option_d, option_e)')
    .eq('exam_id', examId)
    .order('order_number');

  if (qError) {
    return NextResponse.json({ error: qError.message }, { status: 500 });
  }

  const questions = (examQuestions ?? [])
    .map((row) => row.questions as unknown as Pick<
      Question,
      'statement' | 'option_a' | 'option_b' | 'option_c' | 'option_d' | 'option_e'
    > | null)
    .filter((q): q is NonNullable<typeof q> => !!q);

  const buffer = generateExamPdfBuffer({
    title: exam.title,
    dateLabel: formatDateBR(exam.date_available),
    questions,
  });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="medrank-prova-${exam.date_available}.pdf"`,
    },
  });
}
