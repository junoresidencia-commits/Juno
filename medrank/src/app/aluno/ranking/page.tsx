import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatPercent } from '@/lib/format';
import { getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoRanking } from '@/lib/demo/presenters';

export default async function RankingAlunoPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { userId } = await requireAuth();
  const { period: periodParam } = await searchParams;
  const period = (periodParam ?? 'daily') as PeriodType;

  if (isSkipAuth()) {
    const { rankings } = getDemoRanking(period);
    const myRanking = rankings.find((r) => r.user_id === userId);
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">← Voltar</Link>
        <h1 className="mt-4 text-2xl font-bold">Ranking</h1>
        <RankingPeriodNav basePath="/aluno/ranking" current={period} />
        {myRanking && <div className="mt-4 rounded-xl bg-emerald-50 p-4"><p className="font-semibold text-emerald-800">Sua posição: {myRanking.position}º · {myRanking.total_score} pts</p><p className="text-sm text-emerald-600">Sequência: {myRanking.streak_days} dias</p></div>}
        <ol className="mt-6 space-y-2">
          {rankings.map((r) => {
            const name = (r as { profiles?: { name?: string } }).profiles?.name ?? 'Aluno';
            const isMe = r.user_id === userId;
            return <li key={r.id} className={`flex items-center justify-between rounded-lg px-4 py-3 ${isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white ring-1 ring-slate-200'}`}><span className="flex items-center gap-3"><span className="w-8 text-lg font-bold text-slate-400">{r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}</span><span className={r.position && r.position <= 3 ? 'font-semibold' : ''}>{name}{isMe ? ' (você)' : ''}</span></span><span className="text-sm text-slate-600">{r.total_correct} acertos · {formatPercent(r.average_percentage)}</span></li>;
          })}
        </ol>
      </div>
    );
  }

  const supabase = await createClient();
  const bounds = getPeriodBounds(period);

  const { data: rankings } = await supabase
    .from('rankings')
    .select('user_id, position, total_score, total_correct, average_percentage, streak_days, profiles(name)')
    .eq('period_type', period)
    .eq('period_start', bounds.start)
    .order('position', { ascending: true })
    .limit(10);

  const { data: myRanking } = await supabase
    .from('rankings')
    .select('position, total_score, streak_days')
    .eq('user_id', userId)
    .eq('period_type', period)
    .eq('period_start', bounds.start)
    .maybeSingle();

  const { data: badges } = await supabase
    .from('user_badges')
    .select('badge_type, period_start')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })
    .limit(5);

  const badgeLabel: Record<string, string> = {
    gold: '🥇 Ouro',
    silver: '🥈 Prata',
    bronze: '🥉 Bronze',
    streak: '🔥 Streak',
    weekly_best: '⭐ Melhor da semana',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Ranking</h1>

      <RankingPeriodNav basePath="/aluno/ranking" current={period} />

      {myRanking && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Sua posição: {myRanking.position}º · {myRanking.total_score} pts
          </p>
          {myRanking.streak_days > 0 && (
            <p className="text-sm text-emerald-600">Sequência: {myRanking.streak_days} dias</p>
          )}
        </div>
      )}

      {(badges ?? []).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges!.map((b, i) => (
            <span key={i} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
              {badgeLabel[b.badge_type] ?? b.badge_type}
            </span>
          ))}
        </div>
      )}

      <ol className="mt-6 space-y-2">
        {(rankings ?? []).length === 0 ? (
          <li className="text-sm text-slate-500">Sem dados para este período.</li>
        ) : (
          rankings!.map((r) => {
            const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
            const isMe = r.user_id === userId;
            return (
              <li
                key={r.position}
                className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                  isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white ring-1 ring-slate-200'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 text-lg font-bold text-slate-400">
                    {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                  </span>
                  <span className={r.position && r.position <= 3 ? 'font-semibold' : ''}>
                    {name}{isMe ? ' (você)' : ''}
                  </span>
                </span>
                <span className="text-sm text-slate-600">
                  {r.total_correct} acertos · {formatPercent(r.average_percentage)}
                </span>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}
