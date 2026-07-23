import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { formatDuration, formatPercent } from '@/lib/format';
import { getExamMaxScore } from '@/lib/exams/scoring';
import { formatQuestionExplanation } from '@/lib/question-bank/quality';
import {
  getTreinoAnswers,
  getTreinoQuestions,
  getTreinoSession,
} from '@/lib/treino/runtime';
import type { OptionLetter, Question } from '@/types/database';

export default async function NefropediatriaResultadoPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const { userId } = await requireAuth();

  const session = await getTreinoSession(sessionId);
  if (!session || session.user_id !== userId || !session.finished_at) {
    redirect('/aluno/treino/nefropediatria');
  }

  const questions = await getTreinoQuestions(sessionId, { includeAnswers: true });
  const answers = await getTreinoAnswers(sessionId);
  const totalWrong = session.total_questions - session.total_correct;
  const maxScore = getExamMaxScore(session.total_questions);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno/treino/nefropediatria" className="text-sm text-teal-700 hover:underline">
        ← Treino Nefropediatria
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Resultado do treino</h1>
      <p className="text-slate-600">{session.title}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">Acertos</p>
          <p className="text-3xl font-bold text-teal-800">{session.total_correct}</p>
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
          <p className="text-3xl font-bold text-slate-900">
            {formatDuration(session.duration_seconds ?? 0)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-teal-50 p-4 text-center">
        <p className="text-lg font-semibold text-teal-900">
          Pontuação: {session.score} de {maxScore} pts
        </p>
        <p className="mt-1 text-xs text-teal-800">Treino — não entra no ranking diário</p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Gabarito comentado</h2>
        <div className="mt-4 space-y-6">
          {questions.map((q, i) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correct_option;
            return (
              <QuestionReview
                key={q.id}
                index={i + 1}
                question={q}
                selected={selected}
                isCorrect={isCorrect}
              />
            );
          })}
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <Link
          href="/aluno/treino/nefropediatria"
          className="rounded-lg bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Novo treino
        </Link>
        <Link href="/aluno" className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm">
          Início
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
    <div
      className={`rounded-xl p-5 ring-1 ${
        isCorrect ? 'bg-emerald-50 ring-emerald-200' : 'bg-red-50 ring-red-200'
      }`}
    >
      <p className="text-xs font-medium text-slate-600">
        Questão {index}
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
              className={`rounded px-2 py-1 ${
                correct ? 'bg-emerald-200 font-semibold' : isSelected ? 'bg-red-200' : ''
              }`}
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
    </div>
  );
}
