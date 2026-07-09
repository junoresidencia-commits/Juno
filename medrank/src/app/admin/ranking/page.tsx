import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR, formatPercent } from '@/lib/format';
import { getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';

export default async function AdminRankingPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  await requireRole('admin');
  const supabase = await createClient();
  const { period: periodParam } = await searchParams;
  const period = (periodParam ?? 'daily') as PeriodType;
  const bounds = getPeriodBounds(period);

  const { data: rankings } = await supabase
    .from('rankings')
    .select('*, profiles(name)')
    .eq('period_type', period)
    .eq('period_start', bounds.start)
    .order('position', { ascending: true });

  const periodTitle: Record<PeriodType, string> = {
    daily: `Hoje — ${formatDateBR(bounds.start)}`,
    weekly: `Semana — ${formatDateBR(bounds.start)} a ${formatDateBR(bounds.end)}`,
    monthly: `Mês — ${formatDateBR(bounds.start)} a ${formatDateBR(bounds.end)}`,
    general: 'Geral (acumulado)',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Rankings</h1>
      <p className="text-sm text-slate-600">{periodTitle[period]}</p>

      <RankingPeriodNav basePath="/admin/ranking" current={period} />

      <ol className="mt-6 space-y-2">
        {(rankings ?? []).length === 0 ? (
          <li className="text-slate-500">Nenhum dado para este período.</li>
        ) : (
          rankings!.map((r) => {
            const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
            return (
              <li key={r.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span className="flex items-center gap-3">
                  <span className="w-8 text-lg font-bold">
                    {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
                  </span>
                  <span className={r.position && r.position <= 3 ? 'font-semibold' : ''}>{name}</span>
                </span>
                <span className="text-right text-sm text-slate-600">
                  <span className="block">{r.total_correct} acertos · {formatPercent(r.average_percentage)}</span>
                  <span className="text-xs">{r.total_score} pts · streak {r.streak_days}d</span>
                </span>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}
