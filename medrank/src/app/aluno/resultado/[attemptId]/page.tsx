import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatDuration, formatPercent } from '@/lib/format';
import { formatRankingScoreExplanation, getExamMaxScore } from '@/lib/exams/scoring';
import { buildResultInsights } from '@/lib/exams/result-analysis';
import {
  canStudentSeeExamGabarito,
  canStudentDownloadExamPdf,
  studentGabaritoBeforeWindowMessage,
  studentExamPdfBeforeReleaseMessage,
} from '@/lib/exams/ranking-visibility';
import type { Question, OptionLetter } from '@/types/database';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoAttemptAnswers, getDemoAttemptById, getDemoQuestionsForAttempt } from '@/lib/demo/runtime';
import { getDemoExams } from '@/lib/demo/content';
import { getDemoRanking, getDemoAdminExamStatus } from '@/lib/demo/presenters';
import { GabaritoReview, type GabaritoRow } from '@/components/exam/GabaritoReview';
import { ResultInsightsPanel } from '@/components/exam/ResultInsightsPanel';
import { ExamPdfDownloadButton } from '@/components/exam/ExamPdfDownloadButton';

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
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Acertos</p>
        <p className="text-2xl font-bold text-emerald-700">{totalCorrect}</p>
      </div>
      <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Erros / em branco</p>
        <p className="text-2xl font-bold text-red-600">{totalWrong}</p>
      </div>
      <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Percentual</p>
        <p className="text-2xl font-bold text-slate-900">{formatPercent(percentage)}</p>
      </div>
      <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">Tempo</p>
        <p className="text-2xl font-bold text-slate-900">{formatDuration(durationSeconds)}</p>
      </div>
    </div>
  );
}

function buildAnalysisRows(gabaritoRows: GabaritoRow[]) {
  return gabaritoRows.map((row) => ({
    question: row.questions,
    isCorrect: !!row.is_correct,
  }));
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
    const { finishedCount } = getDemoAdminExamStatus();
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
    const maxScore = getExamMaxScore(attempt.total_questions ?? exam?.total_questions ?? 20);
    const showGabarito = canStudentSeeExamGabarito(exam ?? null, true);
    const showPdf = canStudentDownloadExamPdf(exam ?? null, true);
    const insights = buildResultInsights({
      rows: buildAnalysisRows(gabaritoRows),
      userScore: attempt.score ?? 0,
      rankings: rankings.map((r) => ({
        position: r.position,
        total_score: r.total_score,
        user_id: r.user_id,
      })),
      userId,
      finishedToday: finishedCount,
    });

    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6">
        <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Resultado da disputa</h1>
        <p className="text-slate-600">{exam?.title}</p>
        <p className="mt-2 text-xs text-slate-600">
          {formatRankingScoreExplanation(attempt.total_questions ?? exam?.total_questions ?? 20)}
        </p>
        <ResultInsightsPanel
          score={attempt.score ?? 0}
          maxScore={maxScore}
          position={ranking?.position ?? null}
          insights={insights}
          showGabarito={showGabarito}
        />
        <ResultStats
          totalCorrect={attempt.total_correct ?? 0}
          totalWrong={totalWrong}
          percentage={attempt.percentage}
          durationSeconds={attempt.duration_seconds ?? 0}
        />
        {attempt.submitted_automatically && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-100">
            Disputa enviada automaticamente ao fim do tempo.
          </p>
        )}
        <ExamPdfDownloadButton
          examId={attempt.exam_id}
          available={showPdf}
          lockedMessage={studentExamPdfBeforeReleaseMessage()}
        />
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
  const showPdf = canStudentDownloadExamPdf(exam, true);

  const { resolveUserExamAudience } = await import('@/lib/exams/audience');
  const ctx = await resolveUserExamAudience(userId);

  let ranking: { position: number | null } | null = null;
  let allRankings: Array<{ position: number | null; total_score: number; user_id: string }> = [];

  if (ctx.rankingGroupId) {
    const { data: mine } = await supabase
      .from('study_group_rankings')
      .select('position')
      .eq('group_id', ctx.rankingGroupId)
      .eq('user_id', userId)
      .eq('period_type', 'daily')
      .eq('period_start', exam.date_available)
      .maybeSingle();
    ranking = mine;

    const { data: peers } = await supabase
      .from('study_group_rankings')
      .select('position, total_score, user_id')
      .eq('group_id', ctx.rankingGroupId)
      .eq('period_type', 'daily')
      .eq('period_start', exam.date_available);
    allRankings = peers ?? [];
  }

  const { count: finishedToday } = await supabase
    .from('attempts')
    .select('id', { count: 'exact', head: true })
    .eq('exam_id', attempt.exam_id)
    .not('finished_at', 'is', null);

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
  const maxScore = getExamMaxScore(attempt.total_questions ?? exam.total_questions);
  const insights = buildResultInsights({
    rows: buildAnalysisRows(gabaritoRows),
    userScore: attempt.score ?? 0,
    rankings: (allRankings ?? []).map((r) => ({
      position: r.position,
      total_score: r.total_score,
      user_id: r.user_id,
    })),
    userId,
    finishedToday: finishedToday ?? 0,
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 text-slate-900">
      <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Resultado da disputa</h1>
      <p className="text-slate-600">{exam.title}</p>
      <p className="mt-2 text-xs text-slate-600">
        {formatRankingScoreExplanation(attempt.total_questions ?? exam.total_questions)}
      </p>
      <ResultInsightsPanel
        score={attempt.score ?? 0}
        maxScore={maxScore}
        position={ranking?.position ?? null}
        insights={insights}
        showGabarito={showGabarito}
      />
      <ResultStats
        totalCorrect={attempt.total_correct ?? 0}
        totalWrong={totalWrong}
        percentage={attempt.percentage}
        durationSeconds={attempt.duration_seconds ?? 0}
      />
      {attempt.submitted_automatically && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-100">
          Disputa enviada automaticamente ao fim do tempo.
        </p>
      )}
      <ExamPdfDownloadButton
        examId={attempt.exam_id}
        available={showPdf}
        lockedMessage={studentExamPdfBeforeReleaseMessage()}
      />
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
