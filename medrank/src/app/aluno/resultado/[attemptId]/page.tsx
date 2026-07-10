import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatDuration, formatPercent } from '@/lib/format';
import type { Question, OptionLetter } from '@/types/database';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoAttemptAnswers, getDemoAttemptById, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { studentRankingAvailableTomorrowMessage } from '@/lib/exams/ranking-visibility';

export default async function ResultadoPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const { userId } = await requireAuth();

  if (isSkipAuth()) {
    const attempt = getDemoAttemptById(attemptId);
    if (!attempt?.finished_at) redirect('/aluno');
    const exam = getDemoExams().find((item) => item.id === attempt.exam_id);
    const questions = new Map(getDemoQuestionsForAttempt(attemptId).map((q) => [q.id, q]));
    const answers = getDemoAttemptAnswers(attemptId).map((answer) => ({
      ...answer,
      questions: questions.get(answer.question_id),
    }));
    const totalWrong = (attempt.total_questions ?? 0) - (attempt.total_correct ?? 0);

    return (
      <div className="mx-auto max-w-lg px-4 py-6">
        <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold">Seu resultado</h1>
        <p className="text-slate-600">{exam?.title}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Acertos</p><p className="text-3xl font-bold text-emerald-700">{attempt.total_correct}</p></div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Erros</p><p className="text-3xl font-bold text-red-600">{totalWrong}</p></div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Percentual</p><p className="text-3xl font-bold">{formatPercent(attempt.percentage)}</p></div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Tempo</p><p className="text-3xl font-bold">{formatDuration(attempt.duration_seconds ?? 0)}</p></div>
        </div>
        <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm text-slate-600">
          {studentRankingAvailableTomorrowMessage()}
        </p>
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Gabarito comentado</h2>
          <div className="mt-4 space-y-6">
            {answers.map((a, i) => {
              const q = a.questions as Question;
              return (
                <div key={a.id} className={`rounded-xl p-5 ring-1 ${a.is_correct ? 'bg-emerald-50 ring-emerald-200' : 'bg-red-50 ring-red-200'}`}>
                  <p className="text-xs font-medium text-slate-500">Questão {i + 1}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{q.statement}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
                      const text = q[`option_${letter.toLowerCase()}` as keyof Question] as string;
                      const isCorrect = q.correct_option === letter;
                      const isSelected = a.selected_option === letter;
                      return <p key={letter} className={`rounded px-2 py-1 ${isCorrect ? 'bg-emerald-200 font-semibold' : isSelected ? 'bg-red-200' : ''}`}>{letter}) {text}{isCorrect && ' ✓'}{isSelected && !isCorrect && ' ✗'}</p>;
                    })}
                  </div>
                  {q.explanation && <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-slate-700"><strong>Comentário:</strong> {q.explanation}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  const supabase = await createClient();

  const { data: attempt } = await supabase
    .from('attempts')
    .select('*, exams(*)')
    .eq('id', attemptId)
    .eq('user_id', userId)
    .single();

  if (!attempt?.finished_at) redirect('/aluno');

  const exam = attempt.exams as {
    title: string;
    date_available: string;
    show_answers_after_submit: boolean;
    show_answers_when_all_done: boolean;
    ranking_visible_to_students: boolean;
    total_questions: number;
  };

  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student')
    .eq('active', true);

  const { count: finishedCount } = await supabase
    .from('attempts')
    .select('*', { count: 'exact', head: true })
    .eq('exam_id', attempt.exam_id)
    .not('finished_at', 'is', null);

  const allFinished = (finishedCount ?? 0) >= (totalStudents ?? 0);
  const showAnswers =
    exam.show_answers_after_submit || (exam.show_answers_when_all_done && allFinished);

  const { data: answers } = await supabase
    .from('attempt_answers')
    .select('*, questions(*)')
    .eq('attempt_id', attemptId);

  const totalWrong = (attempt.total_questions ?? 0) - (attempt.total_correct ?? 0);

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>

      <h1 className="mt-4 text-2xl font-bold">Seu resultado</h1>
      <p className="text-slate-600">{exam.title}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Acertos</p>
          <p className="text-3xl font-bold text-emerald-700">{attempt.total_correct}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Erros</p>
          <p className="text-3xl font-bold text-red-600">{totalWrong}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Percentual</p>
          <p className="text-3xl font-bold">{formatPercent(attempt.percentage)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Tempo</p>
          <p className="text-3xl font-bold">{formatDuration(attempt.duration_seconds ?? 0)}</p>
        </div>
      </div>

      <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm text-slate-600">
        {studentRankingAvailableTomorrowMessage()}
      </p>

      {attempt.submitted_automatically && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Prova enviada automaticamente ao fim do tempo.
        </p>
      )}

      {showAnswers ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Gabarito comentado</h2>
          <div className="mt-4 space-y-6">
            {(answers ?? []).map((a, i) => {
              const q = a.questions as unknown as Question;
              return (
                <div
                  key={a.id}
                  className={`rounded-xl p-5 ring-1 ${
                    a.is_correct
                      ? 'bg-emerald-50 ring-emerald-200'
                      : 'bg-red-50 ring-red-200'
                  }`}
                >
                  <p className="text-xs font-medium text-slate-500">Questão {i + 1}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{q.statement}</p>
                  <div className="mt-3 space-y-1 text-sm">
                    {(['A', 'B', 'C', 'D', 'E'] as OptionLetter[]).map((letter) => {
                      const text = q[`option_${letter.toLowerCase()}` as keyof Question] as string;
                      const isCorrect = q.correct_option === letter;
                      const isSelected = a.selected_option === letter;
                      return (
                        <p
                          key={letter}
                          className={`rounded px-2 py-1 ${
                            isCorrect
                              ? 'bg-emerald-200 font-semibold'
                              : isSelected
                                ? 'bg-red-200'
                                : ''
                          }`}
                        >
                          {letter}) {text}
                          {isCorrect && ' ✓'}
                          {isSelected && !isCorrect && ' ✗'}
                        </p>
                      );
                    })}
                  </div>
                  {q.explanation && (
                    <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-slate-700">
                      <strong>Comentário:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <p className="mt-8 rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
          O gabarito comentado será liberado pelo professor
          {exam.show_answers_when_all_done && !allFinished
            ? ' quando todos os alunos terminarem.'
            : '.'}
        </p>
      )}
    </div>
  );
}
