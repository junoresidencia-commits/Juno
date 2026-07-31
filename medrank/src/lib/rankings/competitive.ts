import type { SupabaseClient } from '@supabase/supabase-js';
import { getMonthEnd, getMonthStart, listPastMonthStarts, monthLabelPt } from '@/lib/periods';

export type HallOfFameEntry = {
  periodStart: string;
  periodEnd: string;
  monthLabel: string;
  champions: Array<{
    position: number;
    userId: string;
    name: string;
    totalScore: number;
  }>;
};

export type MonthlyParticipation = {
  finishedCount: number;
  totalScore: number;
  /** Dias com pelo menos uma disputa finalizada no mês. */
  activeDays: number;
};

/**
 * Hall da fama: top 3 dos meses anteriores (ranking mensal salvo).
 */
export async function fetchGroupHallOfFame(
  client: SupabaseClient,
  groupId: string,
  months = 6
): Promise<HallOfFameEntry[]> {
  const pastStarts = listPastMonthStarts(months);
  if (pastStarts.length === 0) return [];

  const { data, error } = await client
    .from('study_group_rankings')
    .select('period_start, period_end, position, total_score, user_id, profiles(name)')
    .eq('group_id', groupId)
    .eq('period_type', 'monthly')
    .in('period_start', pastStarts)
    .lte('position', 3)
    .order('period_start', { ascending: false })
    .order('position', { ascending: true });

  if (error || !data?.length) return [];

  const byMonth = new Map<string, HallOfFameEntry>();
  for (const row of data) {
    const start = row.period_start as string;
    if (!byMonth.has(start)) {
      byMonth.set(start, {
        periodStart: start,
        periodEnd: (row.period_end as string) || getMonthEnd(new Date(start + 'T00:00:00Z')),
        monthLabel: monthLabelPt(start),
        champions: [],
      });
    }
    const profileData = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    const name = (profileData as { name?: string } | null)?.name ?? 'Aluno';
    byMonth.get(start)!.champions.push({
      position: row.position as number,
      userId: row.user_id as string,
      name,
      totalScore: Number(row.total_score ?? 0),
    });
  }

  return pastStarts
    .map((s) => byMonth.get(s))
    .filter((e): e is HallOfFameEntry => Boolean(e && e.champions.length > 0));
}

/**
 * Quantas disputas o aluno terminou no mês atual (participação).
 */
export async function fetchMonthlyParticipation(
  client: SupabaseClient,
  userId: string,
  now = new Date()
): Promise<MonthlyParticipation> {
  const start = getMonthStart(now);
  const end = getMonthEnd(now);

  const { data: attempts } = await client
    .from('attempts')
    .select('id, score, finished_at, forfeited, exams!inner(date_available)')
    .eq('user_id', userId)
    .not('finished_at', 'is', null)
    .gte('exams.date_available', start)
    .lte('exams.date_available', end);

  const rows = (attempts ?? []).filter((a) => !(a as { forfeited?: boolean }).forfeited);
  const days = new Set(
    rows.map((a) => {
      const exam = Array.isArray(a.exams) ? a.exams[0] : a.exams;
      return (exam as { date_available?: string } | null)?.date_available ?? '';
    }).filter(Boolean)
  );

  return {
    finishedCount: rows.length,
    totalScore: rows.reduce((sum, a) => sum + Number(a.score ?? 0), 0),
    activeDays: days.size,
  };
}
