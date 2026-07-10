import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { isSkipAuth } from '@/lib/skip-auth';
import { getSimuladoQuestions, getSimuladoSession } from '@/lib/simulados/runtime';
import { getDemoSimuladoById } from '@/lib/demo-store';
import { ExamRunner } from '@/components/exam/ExamRunner';
import type { OptionLetter } from '@/types/database';

export default async function SimuladoSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const { userId } = await requireAuth();

  if (!isSkipAuth()) redirect('/aluno/simulados');

  const session = getSimuladoSession(sessionId);
  if (!session || session.user_id !== userId) redirect('/aluno/simulados');
  if (session.finished_at) redirect(`/aluno/simulados/resultado/${sessionId}`);

  const stored = getDemoSimuladoById(sessionId);
  const questions = getSimuladoQuestions(sessionId);
  const initialAnswers = Object.fromEntries(
    Object.entries(stored?.answers ?? {}).map(([k, v]) => [k, v as OptionLetter])
  );

  return (
    <div>
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <Link href="/aluno/simulados" className="text-sm text-emerald-700 hover:underline">← Simulados</Link>
        <h1 className="mt-1 text-lg font-semibold">{session.title}</h1>
        <p className="text-xs text-slate-500">{session.total_questions} questões · {session.duration_minutes} min</p>
      </div>
      <ExamRunner
        attemptId={sessionId}
        examId={sessionId}
        durationMinutes={session.duration_minutes}
        startedAt={session.started_at}
        questions={questions}
        initialAnswers={initialAnswers}
        resultPath={`/aluno/simulados/resultado/${sessionId}`}
        apiBase="/api/simulados"
        finishLabel="Finalizar simulado"
      />
    </div>
  );
}
