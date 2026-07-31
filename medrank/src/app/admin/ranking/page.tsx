import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR, formatPercent } from '@/lib/format';
import { DEFAULT_STUDENT_RANKING_PERIOD, getPeriodBounds, PERIOD_OPTIONS } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { RankingCompetitiveHero } from '@/components/ranking/RankingCompetitiveHero';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoRanking } from '@/lib/demo/presenters';
import { daysLeftInMonth, daysLeftInQuarter } from '@/lib/periods';

export default async function AdminRankingPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requireRole('admin');
  const { period: periodParam } = await searchParams;
  const allowed = PERIOD_OPTIONS.map((p) => p.value);
  const period = allowed.includes(periodParam as PeriodType)
    ? (periodParam as PeriodType)
    : DEFAULT_STUDENT_RANKING_PERIOD;

  const periodTitle: Record<PeriodType, string> = {
    daily: 'Hoje',
    weekly: 'Semana',
    monthly: 'Mês (zera todo dia 1)',
    quarterly: 'Trimestre (3 meses)',
    yearly: 'Ano (acumulado)',
    general: 'Geral (todo o histórico)',
  };

  if (usesDemoStore()) {
    const { rankings, bounds } = getDemoRanking(period);
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
          ← Painel
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Rankings</h1>
        <p className="text-sm text-slate-600">
          {periodTitle[period]} — {formatDateBR(bounds.start)}
          {bounds.start !== bounds.end ? ` a ${formatDateBR(bounds.end)}` : ''}
        </p>
        <RankingPeriodNav basePath="/admin/ranking" current={period} periods={PERIOD_OPTIONS} />
        <RankingCompetitiveHero
          periodLabel={PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? 'Ranking'}
          subtitle={
            period === 'monthly'
              ? 'Disputa do mês — reinicia todo dia 1.'
              : period === 'quarterly'
                ? 'Aposta de 3 meses.'
                : period === 'yearly'
                  ? 'Quem fez mais no ano.'
                  : 'Visão admin entre todas as ligas.'
          }
          daysLeft={
            period === 'monthly'
              ? daysLeftInMonth()
              : period === 'quarterly'
                ? daysLeftInQuarter()
                : null
          }
        />
        <ol className="mt-6 space-y-2">
          {rankings.map((r) => {
            const name = (r as { profiles?: { name?: string } }).profiles?.name ?? 'Aluno';
            return (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 text-lg font-bold text-slate-900">
                    {r.position === 1
                      ? '🥇'
                      : r.position === 2
                        ? '🥈'
                        : r.position === 3
                          ? '🥉'
                          : `${r.position}º`}
                  </span>
                  <span
                    className={
                      r.position && r.position <= 3
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-800'
                    }
                  >
                    {name}
                  </span>
                </span>
                <span className="text-right text-sm text-slate-600">
                  <span className="block">
                    {r.total_correct} acertos · {formatPercent(r.average_percentage)}
                  </span>
                  <span className="text-xs text-slate-600">
                    {r.total_score} pts · streak {r.streak_days}d
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const supabase = await createClient();
  const bounds = getPeriodBounds(period);

  const { data: rankings, error } = await supabase
    .from('rankings')
    .select('*, profiles(name)')
    .eq('period_type', period)
    .eq('period_start', bounds.start)
    .order('position', { ascending: true });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Ranking geral</h1>
      <p className="mt-1 text-sm text-slate-600">
        Visão só do administrador — entre todas as ligas/grupos. Alunos veem apenas o ranking do
        próprio grupo. Mensal zera todo mês; anual acumula o ano.
      </p>
      <p className="text-sm text-slate-600">
        {periodTitle[period]} — {formatDateBR(bounds.start)}
        {bounds.start !== bounds.end ? ` a ${formatDateBR(bounds.end)}` : ''}
      </p>

      <RankingPeriodNav basePath="/admin/ranking" current={period} periods={PERIOD_OPTIONS} />

      <RankingCompetitiveHero
        periodLabel={PERIOD_OPTIONS.find((p) => p.value === period)?.label ?? 'Ranking'}
        subtitle={
          period === 'monthly'
            ? 'Disputa do mês — reinicia todo dia 1.'
            : period === 'quarterly'
              ? 'Aposta de 3 meses.'
              : period === 'yearly'
                ? 'Quem fez mais no ano.'
                : 'Visão admin entre todas as ligas.'
        }
        daysLeft={
          period === 'monthly'
            ? daysLeftInMonth()
            : period === 'quarterly'
              ? daysLeftInQuarter()
              : null
        }
      />

      {error && period === 'yearly' ? (
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200">
          Rode a migration <code>047_ranking_yearly_competitive.sql</code> no Supabase para ativar o
          ranking anual.
        </p>
      ) : null}

      <ol className="mt-6 space-y-2">
        {(rankings ?? []).length === 0 ? (
          <li className="text-slate-600">Nenhum dado para este período.</li>
        ) : (
          rankings!.map((r) => {
            const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
            return (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 text-lg font-bold">
                    {r.position === 1
                      ? '🥇'
                      : r.position === 2
                        ? '🥈'
                        : r.position === 3
                          ? '🥉'
                          : `${r.position}º`}
                  </span>
                  <span
                    className={
                      r.position && r.position <= 3
                        ? 'font-semibold text-slate-900'
                        : 'text-slate-800'
                    }
                  >
                    {name}
                  </span>
                </span>
                <span className="text-right text-sm text-slate-600">
                  <span className="block">
                    {r.total_correct} acertos · {formatPercent(r.average_percentage)}
                  </span>
                  <span className="text-xs">
                    {r.total_score} pts · streak {r.streak_days}d
                  </span>
                </span>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}
