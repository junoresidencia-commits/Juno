import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { canStartExam } from '@/lib/exams/release';
import { formatExamWindowLabel } from '@/lib/exams/window';
import { ExamRunner } from '@/components/exam/ExamRunner';
import type { OptionLetter, Question } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import {
  createDemoAttempt,
  forfeitDemoAttempt,
  getDemoAttemptAnswers,
  getDemoAttemptByExam,
} from '@/lib/demo/runtime';
import { getDemoExamQuestions, getDemoExams } from '@/lib/demo/content';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function mapDemoAnswers(attemptId: string): Record<string, OptionLetter> {
  const initial: Record<string, OptionLetter> = {};
  for (const row of getDemoAttemptAnswers(attemptId)) {
    if (row.selected_option) initial[row.question_id] = row.selected_option;
  }
  return initial;
}

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const { userId } = await requireAuth();

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === examId);
    if (!exam || !canStartExam(exam)) redirect('/aluno');

    let attempt = getDemoAttemptByExam(examId, userId);
    if (attempt?.finished_at) {
      redirect(`/aluno/resultado/${attempt.id}`);
    }

    // Sessão abandonada = forfeit (não retoma)
    if (attempt && !attempt.finished_at) {
      attempt = forfeitDemoAttempt(attempt.id, { violationType: 'abandoned_session' });
      redirect(`/aluno/resultado/${attempt.id}`);
    }

    attempt = createDemoAttempt(examId, userId);
    const questions = getDemoExamQuestions(examId);
    const initialAnswers = mapDemoAnswers(attempt.id);

    return (
      <div>
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          {formatExamWindowLabel()}. Antifraude ativo · 30 min · até 1 min 30 s por questão.
        </div>
        <ExamRunner
          attemptId={attempt.id}
          examId={examId}
          durationMinutes={exam.duration_minutes}
          startedAt={attempt.started_at}
          questions={questions}
          initialAnswers={initialAnswers}
          antiFraud
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

  const qualityStatus = (exam as { quality_status?: string }).quality_status ?? null;
  const qualitySummary = (exam as { quality_summary?: string }).quality_summary ?? null;
  if (qualityStatus === 'blocked' || qualityStatus === 'pending') {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-red-900">
          {qualityStatus === 'pending' ? 'Revisão IA em andamento' : 'Disputa não publicada'}
        </h1>
        <p className="mt-3 text-sm text-red-800">
          {qualitySummary ||
            (qualityStatus === 'pending'
              ? 'A disputa só libera depois que as 20 questões forem aprovadas automaticamente.'
              : 'A revisão automática reprovou questões. O administrador foi avisado.')}
        </p>
        <a href="/aluno" className="mt-6 inline-block text-sm font-semibold text-emerald-700 hover:underline">
          ← Voltar ao início
        </a>
      </div>
    );
  }

  let { data: attempt } = await supabase
    .from('attempts')
    .select('*')
    .eq('exam_id', examId)
    .eq('user_id', userId)
    .maybeSingle();

  if (attempt?.finished_at) {
    redirect(`/aluno/resultado/${attempt.id}`);
  }

  // Tentativa aberta = abandonou a sessão → forfeit (0 pts)
  if (attempt && !attempt.finished_at) {
    const admin = createAdminClient();
    const client = admin ?? supabase;
    await client.rpc('forfeit_attempt', {
      p_attempt_id: attempt.id,
      p_violation_type: 'abandoned_session',
      p_question_id: null,
      p_elapsed_seconds: null,
      p_ip: null,
      p_device: null,
      p_browser: null,
      p_os: null,
      p_user_agent: null,
      p_metadata: {},
    });
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
        {formatExamWindowLabel()}. Antifraude ativo · 30 min · até 1 min 30 s por questão.
      </div>
      {(qualityStatus === 'warning' || qualityStatus === 'approved_override') && (
        <div
          className={`border-b px-4 py-2 text-center text-sm ${
            qualityStatus === 'warning'
              ? 'border-amber-300 bg-amber-50 text-amber-950'
              : 'border-sky-200 bg-sky-50 text-sky-950'
          }`}
        >
          {qualityStatus === 'warning'
            ? qualitySummary || 'Aviso da revisão automática: alertas menores nesta prova.'
            : 'Prova liberada pelo professor após revisão.'}
        </div>
      )}
      <ExamRunner
        attemptId={attempt.id}
        examId={examId}
        durationMinutes={exam.duration_minutes}
        startedAt={attempt.started_at}
        questions={questions}
        initialAnswers={{}}
        antiFraud
      />
    </div>
  );
}
