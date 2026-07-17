import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { ExamRunner } from '@/components/exam/ExamRunner';
import {
  getTreinoAnswers,
  getTreinoQuestions,
  getTreinoSession,
} from '@/lib/treino/runtime';

export default async function NefropediatriaSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const { userId } = await requireAuth();

  const session = await getTreinoSession(sessionId);
  if (!session || session.user_id !== userId) {
    redirect('/aluno/treino/nefropediatria');
  }
  if (session.finished_at) {
    redirect(`/aluno/treino/nefropediatria/resultado/${sessionId}`);
  }

  const questions = await getTreinoQuestions(sessionId);
  const initialAnswers = await getTreinoAnswers(sessionId);

  return (
    <div>
      <div className="border-b border-teal-200 bg-teal-50 px-4 py-3 text-slate-900">
        <Link
          href="/aluno/treino/nefropediatria"
          className="text-sm text-teal-800 hover:underline"
        >
          ← Treino Nefropediatria
        </Link>
        <h1 className="mt-1 text-lg font-semibold">{session.title}</h1>
        <p className="text-xs text-slate-600">
          {session.total_questions} questões · {session.duration_minutes} min · não conta no ranking
        </p>
      </div>
      <ExamRunner
        attemptId={sessionId}
        examId={sessionId}
        durationMinutes={session.duration_minutes}
        startedAt={session.started_at}
        questions={questions}
        initialAnswers={initialAnswers}
        resultPath={`/aluno/treino/nefropediatria/resultado/${sessionId}`}
        apiBase="/api/treino"
        finishLabel="Finalizar treino"
        collectConfidence
      />
    </div>
  );
}
