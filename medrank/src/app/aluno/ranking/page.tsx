import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import {
  daysLeftInMonth,
  daysLeftInQuarter,
  DEFAULT_STUDENT_RANKING_PERIOD,
  getPeriodBounds,
  STUDENT_RANKING_PERIODS,
} from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { RankingCompetitiveHero } from '@/components/ranking/RankingCompetitiveHero';
import { RankingHallOfFame } from '@/components/ranking/RankingHallOfFame';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoDashboardData, getDemoRanking } from '@/lib/demo/presenters';
import {
  canStudentSeeTodayRanking,
  getTodayRankingDate,
  studentDailyRankingLabel,
  studentRankingBeforeFinishMessage,
} from '@/lib/exams/ranking-visibility';
import { todayDateStringBrazil } from '@/lib/exams/window';
import {
  fetchGroupHallOfFame,
  fetchMonthlyParticipation,
} from '@/lib/rankings/competitive';

function periodSubtitle(period: PeriodType): string {
  if (period === 'monthly') return 'Disputa do mês — zera todo dia 1. Quem pontua mais leva.';
  if (period === 'weekly') return 'Semana atual — ritmo curto e competitivo.';
  if (period === 'quarterly') return 'Trimestre — aposta mais longa (3 meses).';
  if (period === 'yearly') return 'Acumulado do ano — quem fez mais ao longo do ano.';
  if (period === 'daily') return 'Só a disputa de hoje no seu grupo.';
  return 'Ranking do grupo';
}

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
    : DEFAULT_STUDENT_RANKING_PERIOD;

  if (usesDemoStore()) {
    const { showRanking, streakDays } = getDemoDashboardData(userId);
    const canSeeDaily = period !== 'daily' || showRanking;

    const { rankings } =
      period === 'daily'
        ? getDemoRanking('daily', getTodayRankingDate())
        : getDemoRanking(period);
    const myRanking = rankings.find((r) => r.user_id === userId);
    const daysLeft =
      period === 'monthly'
        ? daysLeftInMonth()
        : period === 'quarterly'
          ? daysLeftInQuarter()
          : null;

    return (
      <div className="mx-auto w-full px-4 py-6 md:px-6">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Ranking do grupo</h1>
        <p className="mt-1 text-sm text-slate-600">
          Mensal e semanal são apostas curtas; trimestral e anual premiam quem joga mais tempo.
        </p>
        <RankingPeriodNav
          basePath="/aluno/ranking"
          current={period}
          periods={STUDENT_RANKING_PERIODS}
        />
        {canSeeDaily ? (
          <RankingCompetitiveHero
            periodLabel={STUDENT_RANKING_PERIODS.find((p) => p.value === period)?.label ?? 'Ranking'}
            subtitle={periodSubtitle(period)}
            myPosition={myRanking?.position}
            myScore={myRanking?.total_score}
            daysLeft={daysLeft}
            finishedCount={period === 'monthly' ? Math.max(streakDays, 1) : null}
            activeDays={period === 'monthly' ? streakDays : null}
          />
        ) : null}
        {period === 'daily' && !canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
        )}
        {period === 'daily' && canSeeDaily && (
          <p className="mt-3 text-sm text-slate-600">
            {studentDailyRankingLabel(getTodayRankingDate())} — só quem está no seu grupo.
          </p>
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
                      isMe
                        ? 'bg-emerald-50 ring-1 ring-emerald-200'
                        : 'bg-white text-slate-900 ring-1 ring-slate-200'
                    }`}
                  >
                    <span className="font-medium text-slate-900">
                      {r.position === 1
                        ? '🥇'
                        : r.position === 2
                          ? '🥈'
                          : r.position === 3
                            ? '🥉'
                            : `${r.position}º`}{' '}
                      {name}
                      {isMe ? ' (você)' : ''}
                    </span>
                    <span className="text-sm text-slate-600">{r.total_score} pts</span>
                  </li>
                );
              })
            )}
          </ol>
        )}
        <RankingHallOfFame
          entries={[
            {
              periodStart: '2026-06-01',
              periodEnd: '2026-06-30',
              monthLabel: 'Junho de 2026',
              champions: [
                { position: 1, userId: 'r1', name: 'Larissa', totalScore: 420 },
                { position: 2, userId: 'r2', name: 'Mateus', totalScore: 390 },
                { position: 3, userId: userId, name: 'Você', totalScore: 360 },
              ],
            },
          ]}
          currentUserId={userId}
        />
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

  let rankings: Array<{
    user_id: string;
    position: number;
    total_score: number;
    profiles?: { name?: string } | { name?: string }[] | null;
  }> | null = null;
  let myRanking: { position: number; total_score: number } | null = null;
  let yearlyFallback = false;

  if (canSee) {
    const { data, error } = await supabase
      .from('study_group_rankings')
      .select('user_id, position, total_score, profiles(name)')
      .eq('group_id', ctx.rankingGroupId)
      .eq('period_type', period)
      .eq('period_start', bounds.start)
      .order('position', { ascending: true });

    if (error && period === 'yearly') {
      yearlyFallback = true;
    } else {
      rankings = data;
    }

    if (!yearlyFallback) {
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
  }

  const [hallOfFame, participation] = await Promise.all([
    fetchGroupHallOfFame(supabase, ctx.rankingGroupId, 6),
    period === 'monthly' || period === 'yearly'
      ? fetchMonthlyParticipation(supabase, userId)
      : Promise.resolve(null),
  ]);

  const daysLeft =
    period === 'monthly'
      ? daysLeftInMonth()
      : period === 'quarterly'
        ? daysLeftInQuarter()
        : null;

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Ranking · {ctx.rankingGroupName}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
          Mensal e semanal são apostas curtas; trimestral e anual premiam quem joga mais tempo. Só o
        seu grupo vê este ranking.
      </p>
      <RankingPeriodNav
        basePath="/aluno/ranking"
        current={period}
        periods={STUDENT_RANKING_PERIODS}
      />

      {canSee ? (
        <RankingCompetitiveHero
          periodLabel={STUDENT_RANKING_PERIODS.find((p) => p.value === period)?.label ?? 'Ranking'}
          subtitle={periodSubtitle(period)}
          myPosition={myRanking?.position}
          myScore={myRanking?.total_score}
          daysLeft={daysLeft}
          finishedCount={participation?.finishedCount ?? null}
          activeDays={participation?.activeDays ?? null}
        />
      ) : null}

      {period === 'daily' && !canSee && (
        <p className="mt-3 text-sm text-slate-600">{studentRankingBeforeFinishMessage()}</p>
      )}
      {period === 'daily' && canSee && (
        <p className="mt-3 text-sm text-slate-600">
          {studentDailyRankingLabel(getTodayRankingDate())} — atualiza conforme o grupo termina.
        </p>
      )}
      {yearlyFallback && (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200">
          Ranking anual ainda não está ativo no banco. Peça ao professor para rodar a migration{' '}
          <code>047_ranking_yearly_competitive.sql</code>.
        </p>
      )}

      {canSee && !yearlyFallback && (
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
                    isMe
                      ? 'bg-emerald-50 ring-1 ring-emerald-200'
                      : 'bg-white text-slate-900 ring-1 ring-slate-200'
                  }`}
                >
                  <span className="font-medium text-slate-900">
                    {r.position === 1
                      ? '🥇'
                      : r.position === 2
                        ? '🥈'
                        : r.position === 3
                          ? '🥉'
                          : `${r.position}º`}{' '}
                    {name}
                    {isMe ? ' (você)' : ''}
                  </span>
                  <span className="text-sm text-slate-600">{r.total_score} pts</span>
                </li>
              );
            })
          )}
        </ol>
      )}

      <RankingHallOfFame entries={hallOfFame} currentUserId={userId} />

      <p className="mt-6 text-sm">
        <Link href="/aluno/grupos" className="font-semibold text-emerald-700 hover:underline">
          Outros grupos →
        </Link>
      </p>
    </div>
  );
}
