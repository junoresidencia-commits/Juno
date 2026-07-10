import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoDashboardData, getDemoRanking } from '@/lib/demo/presenters';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
  studentDailyRankingLabel,
  studentRankingBeforeFinishMessage,
} from '@/lib/exams/ranking-visibility';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { STUDENT_RANKING_PERIODS } from '@/lib/periods';

export default async function RankingAlunoPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { userId } = await requireAuth();
  const { period: periodParam } = await searchParams;
  const allowedPeriods = STUDENT_RANKING_PERIODS.map((p) => p.value);
  const period = allowedPeriods.includes(periodParam as PeriodType)
    ? (periodParam as PeriodType)
    : 'daily';

  if (isSkipAuth()) {
    const { showRanking } = getDemoDashboardData(userId);
    const canSeeDaily = period === 'weekly' || showRanking;

    const { rankings } = period === 'daily'
      ? getDemoRanking('daily', getTodayRankingDate())
      : getDemoRanking(period);
    const myRanking = rankings.find((r) => r.user_id === userId);

    return (
      <div className="mx-auto max-w-lg px-4 py-6">
        <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Ranking</h1>
        <RankingPeriodNav basePath="/aluno/ranking" current={period} periods={STUDENT_RANKING_PERIODS} />
        {period === 'daily' && !canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
        )}
        {period === 'daily' && canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">
            {studentDailyRankingLabel(getTodayRankingDate())} — atualiza conforme os alunos terminam.
          </p>
        )}
        {canSeeDaily && myRanking && (
          <div className="mt-4 rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">
              Você: {myRanking.position}º · {myRanking.total_score} pts
            </p>
          </div>
        )}
        {canSeeDaily && (
          <ol className="mt-6 space-y-2">
            {rankings.length === 0 ? (
              <li className="text-sm text-slate-600">Aguardando primeiros resultados…</li>
            ) : (
              rankings.map((r) => {
                const name = (r as { profiles?: { name?: string } }).profiles?.name ?? 'Aluno';
                const isMe = r.user_id === userId;
                return (
                  <li
                    key={r.id}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white text-slate-900 ring-1 ring-slate-200'
                    }`}
                  >
                    <span className="font-medium text-slate-900">
                      {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                      {' '}{name}{isMe ? ' (você)' : ''}
                    </span>
                    <span className="text-sm text-slate-600">{r.total_score} pts</span>
                  </li>
                );
              })
            )}
          </ol>
        )}
      </div>
    );
  }

  const supabase = await createClient();
  const today = todayDateStringBrazil();
  const { data: todayExam } = await supabase
    .from('exams')
    .select('id, date_available')
    .eq('date_available', today)
    .eq('status', 'published')
    .maybeSingle();

  const { data: attempt } = todayExam
    ? await supabase
        .from('attempts')
        .select('finished_at')
        .eq('exam_id', todayExam.id)
        .eq('user_id', userId)
        .maybeSingle()
    : { data: null };

  const showRanking = canStudentSeeTodayRanking(todayExam, Boolean(attempt?.finished_at));
  const canSeeDaily = period === 'weekly' || showRanking;

  const bounds = period === 'daily'
    ? { start: getTodayRankingDate(), end: getTodayRankingDate() }
    : getPeriodBounds(period);

  const { data: rankings } = canSeeDaily
    ? await supabase
        .from('rankings')
        .select('user_id, position, total_score, profiles(name)')
        .eq('period_type', period)
        .eq('period_start', bounds.start)
        .order('position', { ascending: true })
        .limit(15)
    : { data: null };

  const { data: myRanking } = canSeeDaily
    ? await supabase
        .from('rankings')
        .select('position, total_score')
        .eq('user_id', userId)
        .eq('period_type', period)
        .eq('period_start', bounds.start)
        .maybeSingle()
    : { data: null };

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <Link href="/aluno" className="text-sm text-emerald-700">← Voltar</Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Ranking</h1>
      <RankingPeriodNav basePath="/aluno/ranking" current={period} periods={STUDENT_RANKING_PERIODS} />
      {period === 'daily' && !canSeeDaily && (
        <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
      )}
      {period === 'daily' && canSeeDaily && (
        <p className="mt-3 text-sm text-slate-600">
          {studentDailyRankingLabel(getTodayRankingDate())} — atualiza conforme os alunos terminam.
        </p>
      )}

      {canSeeDaily && myRanking && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Você: {myRanking.position}º · {myRanking.total_score} pts
          </p>
        </div>
      )}

      {canSeeDaily && (
        <ol className="mt-6 space-y-2">
          {(rankings ?? []).length === 0 ? (
            <li className="text-sm text-slate-600">Aguardando primeiros resultados…</li>
          ) : (
            rankings!.map((r) => {
              const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
              const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
              const isMe = r.user_id === userId;
              return (
                <li
                  key={r.position}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                    isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white text-slate-900 ring-1 ring-slate-200'
                  }`}
                >
                  <span className="font-medium text-slate-900">
                    {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                    {' '}{name}{isMe ? ' (você)' : ''}
                  </span>
                  <span className="text-sm text-slate-600">{r.total_score} pts</span>
                </li>
              );
            })
          )}
        </ol>
      )}
    </div>
  );
}
