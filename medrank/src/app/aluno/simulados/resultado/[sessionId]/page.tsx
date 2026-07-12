import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getSimuladoQuestions, getSimuladoSession } from '@/lib/simulados/runtime';
import { getDemoSimuladoById } from '@/lib/demo-store';
import { formatDuration, formatPercent } from '@/lib/format';
import { getExamMaxScore } from '@/lib/exams/scoring';
import { formatQuestionExplanation } from '@/lib/question-bank/quality';
import type { OptionLetter, Question } from '@/types/database';

export default async function SimuladoResultadoPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const { userId } = await requireAuth();

  if (!usesDemoStore()) redirect('/aluno/simulados');

  const session = getSimuladoSession(sessionId);
  if (!session || session.user_id !== userId || !session.finished_at) {
    redirect('/aluno/simulados');
  }

  const stored = getDemoSimuladoById(sessionId);
  const questions = getSimuladoQuestions(sessionId);
  const totalWrong = session.total_questions - session.total_correct;
  const maxScore = getExamMaxScore(session.total_questions);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno/simulados" className="text-sm text-emerald-700 hover:underline">← Simulados</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Resultado do simulado</h1>
      <p className="text-slate-600">{session.title}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Acertos</p>
          <p className="text-3xl font-bold text-emerald-700">{session.total_correct}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Erros</p>
          <p className="text-3xl font-bold text-red-600">{totalWrong}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Percentual</p>
          <p className="text-3xl font-bold text-slate-900">{formatPercent(session.percentage)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Tempo</p>
          <p className="text-3xl font-bold text-slate-900">{formatDuration(session.duration_seconds ?? 0)}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center">
        <p className="text-lg font-semibold text-emerald-800">
          Pontuação: {session.score} de {maxScore} pts
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Gabarito comentado</h2>
        <div className="mt-4 space-y-6">
          {questions.map((q, i) => {
            const selected = stored?.answers[q.id] as OptionLetter | undefined;
            const isCorrect = selected === q.correct_option;
            return (
              <QuestionReview key={q.id} index={i + 1} question={q} selected={selected} isCorrect={isCorrect} />
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <Link
          href="/aluno/simulados"
          className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Novo simulado
        </Link>
        <Link href="/aluno/banco" className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm">
          Banco de questões
        </Link>
      </div>
    </div>
  );
}

function QuestionReview({
  index,
  question,
  selected,
  isCorrect,
}: {
  index: number;
  question: Question;
  selected?: OptionLetter;
  isCorrect: boolean;
}) {
  return (
    <div className={`rounded-xl p-5 ring-1 ${isCorrect ? 'bg-emerald-50 ring-emerald-200' : 'bg-red-50 ring-red-200'}`}>
      <p className="text-xs font-medium text-slate-600">
        Questão {index} · {question.topic}{question.subtopic ? ` · ${question.subtopic}` : ''}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-sm">{question.statement}</p>
      <div className="mt-3 space-y-1 text-sm">
        {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
          const text = question[`option_${letter.toLowerCase()}` as keyof Question] as string;
          const correct = question.correct_option === letter;
          const isSelected = selected === letter;
          return (
            <p
              key={letter}
              className={`rounded px-2 py-1 ${correct ? 'bg-emerald-200 font-semibold' : isSelected ? 'bg-red-200' : ''}`}
            >
              {letter}) {text}
              {correct && ' ✓'}
              {isSelected && !correct && ' ✗'}
            </p>
          );
        })}
      </div>
      <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-slate-700">
        <strong>Comentário:</strong>
        <span className="mt-1 block whitespace-pre-wrap">{formatQuestionExplanation(question)}</span>
      </p>
      {question.difficulty && (
        <p className="mt-2 text-xs text-slate-600">{question.difficulty}</p>
      )}
    </div>
  );
}
