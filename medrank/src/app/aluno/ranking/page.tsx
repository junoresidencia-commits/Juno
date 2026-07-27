import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { usesDemoStore } from '@/lib/demo-data';
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

  if (usesDemoStore()) {
    const { showRanking } = getDemoDashboardData(userId);
    const canSeeDaily = period !== 'daily' || showRanking;

    const { rankings } = period === 'daily'
      ? getDemoRanking('daily', getTodayRankingDate())
      : getDemoRanking(period);
    const myRanking = rankings.find((r) => r.user_id === userId);

    return (
      <div className="mx-auto w-full px-4 py-6 md:px-6">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Ranking do grupo</h1>
        <RankingPeriodNav basePath="/aluno/ranking" current={period} periods={STUDENT_RANKING_PERIODS} />
        {period === 'daily' && !canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
        )}
        {period === 'daily' && canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">
            {studentDailyRankingLabel(getTodayRankingDate())} — só quem está no seu grupo.
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
  const { resolveUserExamAudience } = await import('@/lib/exams/audience');
  const ctx = await resolveUserExamAudience(userId);

  if (!ctx.rankingGroupId) {
    return (
      <div className="mx-auto w-full px-4 py-6 md:px-6">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Ranking do grupo</h1>
        <p className="mt-4 text-sm text-slate-600">
          Você ainda não está em nenhum grupo. Peça ao professor para te adicionar (ex.: Liga de
          Nefrologia, Endo…). Só membros do grupo veem o ranking interno.
        </p>
        <Link href="/aluno/grupos" className="mt-4 inline-block text-sm font-semibold text-emerald-700">
          Ver grupos →
        </Link>
      </div>
    );
  }

  const { data: todayExam } = await supabase
    .from('exams')
    .select('id, date_available, audience, window_start_hour, window_end_hour')
    .eq('date_available', today)
    .eq('audience', ctx.audience)
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

  let allGroupFinished = false;
  if (todayExam?.id && ctx.rankingGroupId) {
    const { areAllGroupMembersFinished } = await import('@/lib/exams/group-finished');
    const { createAdminClient } = await import('@/lib/supabase/admin');
    const admin = createAdminClient() ?? supabase;
    allGroupFinished = await areAllGroupMembersFinished(
      admin,
      todayExam.id,
      ctx.rankingGroupId
    );
  }

  const showRanking = canStudentSeeTodayRanking(todayExam, Boolean(attempt?.finished_at), {
    allGroupFinished,
  });
  const canSee = period !== 'daily' || showRanking;

  const bounds =
    period === 'daily'
      ? { start: getTodayRankingDate(), end: getTodayRankingDate() }
      : getPeriodBounds(period);

  let rankings = null;
  let myRanking = null;
  if (canSee) {
    const { data } = await supabase
      .from('study_group_rankings')
      .select('user_id, position, total_score, profiles(name)')
      .eq('group_id', ctx.rankingGroupId)
      .eq('period_type', period)
      .eq('period_start', bounds.start)
      .order('position', { ascending: true });
    rankings = data;

    const { data: mine } = await supabase
      .from('study_group_rankings')
      .select('position, total_score')
      .eq('group_id', ctx.rankingGroupId)
      .eq('user_id', userId)
      .eq('period_type', period)
      .eq('period_start', bounds.start)
      .maybeSingle();
    myRanking = mine;
  }

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Ranking · {ctx.rankingGroupName}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Só quem participa deste grupo vê este ranking. O ranking geral entre todas as ligas é
        exclusivo do administrador.
      </p>
      <RankingPeriodNav basePath="/aluno/ranking" current={period} periods={STUDENT_RANKING_PERIODS} />
      {period === 'daily' && !canSee && (
        <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
      )}
      {period === 'daily' && canSee && (
        <p className="mt-3 text-sm text-slate-600">
          {studentDailyRankingLabel(getTodayRankingDate())} — atualiza conforme o grupo termina.
        </p>
      )}

      {canSee && myRanking && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Você: {myRanking.position}º · {myRanking.total_score} pts
          </p>
        </div>
      )}

      {canSee && (
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
      <p className="mt-6 text-sm">
        <Link href="/aluno/grupos" className="font-semibold text-emerald-700 hover:underline">
          Outros grupos →
        </Link>
      </p>
    </div>
  );
}
