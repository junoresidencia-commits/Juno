import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatDuration, formatPercent } from '@/lib/format';
import { formatRankingScoreExplanation } from '@/lib/exams/scoring';
import {
  canStudentSeeExamGabarito,
  studentGabaritoBeforeWindowMessage,
} from '@/lib/exams/ranking-visibility';
import type { Question, OptionLetter } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoAttemptAnswers, getDemoAttemptById, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { getDemoRanking } from '@/lib/demo/presenters';
import { GabaritoReview, type GabaritoRow } from '@/components/exam/GabaritoReview';

function ResultStats({
  totalCorrect,
  totalWrong,
  percentage,
  durationSeconds,
}: {
  totalCorrect: number;
  totalWrong: number;
  percentage: number | null;
  durationSeconds: number;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Acertos</p>
        <p className="text-3xl font-bold text-emerald-700">{totalCorrect}</p>
      </div>
      <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Erros / em branco</p>
        <p className="text-3xl font-bold text-red-600">{totalWrong}</p>
      </div>
      <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Percentual</p>
        <p className="text-3xl font-bold text-slate-900">{formatPercent(percentage)}</p>
      </div>
      <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Tempo</p>
        <p className="text-3xl font-bold text-slate-900">{formatDuration(durationSeconds)}</p>
      </div>
    </div>
  );
}

export default async function ResultadoPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const { userId } = await requireAuth();

  if (usesDemoStore()) {
    const attempt = getDemoAttemptById(attemptId);
    if (!attempt?.finished_at) redirect('/aluno');
    const exam = getDemoExams().find((item) => item.id === attempt.exam_id);
    const { rankings } = getDemoRanking('daily', exam?.date_available);
    const ranking = rankings.find((r) => r.user_id === userId);
    const questions = new Map(getDemoQuestionsForAttempt(attemptId).map((q) => [q.id, q]));
    const gabaritoRows: GabaritoRow[] = [];
    for (const answer of getDemoAttemptAnswers(attemptId)) {
      const q = questions.get(answer.question_id);
      if (!q) continue;
      gabaritoRows.push({
        id: answer.id,
        selected_option: answer.selected_option,
        is_correct:
          !!answer.selected_option && answer.selected_option === q.correct_option,
        questions: q,
      });
    }

    const totalWrong = (attempt.total_questions ?? 0) - (attempt.total_correct ?? 0);
    const showGabarito = canStudentSeeExamGabarito(exam ?? null, true);

    return (
      <div className="mx-auto max-w-lg px-4 py-6 text-slate-900">
        <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Seu resultado</h1>
        <p className="text-slate-600">{exam?.title}</p>
        <p className="mt-2 text-xs text-slate-600">{formatRankingScoreExplanation()}</p>
        <ResultStats
          totalCorrect={attempt.total_correct ?? 0}
          totalWrong={totalWrong}
          percentage={attempt.percentage}
          durationSeconds={attempt.duration_seconds ?? 0}
        />
        {ranking?.position && (
          <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-100">
            <p className="text-lg font-semibold text-emerald-900">{ranking.position}º no ranking de hoje</p>
            <p className="text-sm text-emerald-800">{attempt.score} pts · atualiza conforme outros terminam</p>
          </div>
        )}
        {attempt.submitted_automatically && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-100">
            Prova enviada automaticamente ao fim do tempo.
          </p>
        )}
        {showGabarito ? (
          <GabaritoReview rows={gabaritoRows} />
        ) : (
          <p className="mt-8 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
            {studentGabaritoBeforeWindowMessage()}
          </p>
        )}
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
    total_questions: number;
  };

  const showGabarito = canStudentSeeExamGabarito(exam, true);

  const { data: ranking } = await supabase
    .from('rankings')
    .select('position')
    .eq('user_id', userId)
    .eq('period_type', 'daily')
    .eq('period_start', exam.date_available)
    .maybeSingle();

  const { data: examQuestions } = await supabase
    .from('exam_questions')
    .select('order_number, questions(*)')
    .eq('exam_id', attempt.exam_id)
    .order('order_number');

  const { data: savedAnswers } = await supabase
    .from('attempt_answers')
    .select('*')
    .eq('attempt_id', attemptId);

  const answerByQuestion = new Map(
    (savedAnswers ?? []).map((a) => [a.question_id, a])
  );

  const gabaritoRows: GabaritoRow[] = [];
  for (const eq of examQuestions ?? []) {
    const q = eq.questions as unknown as Question;
    if (!q?.id) continue;
    const saved = answerByQuestion.get(q.id);
    gabaritoRows.push({
      id: saved?.id ?? `${attemptId}-${q.id}`,
      selected_option: (saved?.selected_option as OptionLetter | null) ?? null,
      is_correct: !!saved?.selected_option && !!saved?.is_correct,
      questions: q,
    });
  }

  const totalWrong = (attempt.total_questions ?? 0) - (attempt.total_correct ?? 0);

  return (
    <div className="mx-auto max-w-lg px-4 py-6 text-slate-900">
      <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Seu resultado</h1>
      <p className="text-slate-600">{exam.title}</p>
      <ResultStats
        totalCorrect={attempt.total_correct ?? 0}
        totalWrong={totalWrong}
        percentage={attempt.percentage}
        durationSeconds={attempt.duration_seconds ?? 0}
      />
      {ranking?.position && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center ring-1 ring-emerald-100">
          <p className="text-lg font-semibold text-emerald-900">{ranking.position}º no ranking de hoje</p>
          <p className="text-sm text-emerald-800">{attempt.score} pts · atualiza conforme outros terminam</p>
        </div>
      )}
      {attempt.submitted_automatically && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-100">
          Prova enviada automaticamente ao fim do tempo.
        </p>
      )}
      {showGabarito ? (
        <GabaritoReview rows={gabaritoRows} />
      ) : (
        <p className="mt-8 rounded-lg bg-slate-100 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
          {studentGabaritoBeforeWindowMessage()}
        </p>
      )}
    </div>
  );
}
