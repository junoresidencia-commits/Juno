import type { Ranking } from '@/types/database';

export type RankingPreviewRow = Pick<Ranking, 'id' | 'user_id' | 'position' | 'total_score'> & {
  profiles?: { name?: string };
};

export function mapRankingPreviewRows(
  rows: {
    id: string;
    user_id: string;
    position: number | null;
    total_score: number;
    profiles?: { name: string } | { name: string }[] | null;
  }[] | null
): RankingPreviewRow[] {
  return (rows ?? []).map((r) => {
    const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
    return {
      id: r.id,
      user_id: r.user_id,
      position: r.position,
      total_score: r.total_score,
      profiles: { name: profileData?.name ?? 'Aluno' },
    };
  });
}

export function RankingPreviewList({
  rankings,
  userId,
  emptyLabel = 'Sem dados ainda.',
}: {
  rankings: RankingPreviewRow[];
  userId?: string;
  emptyLabel?: string;
}) {
  if (rankings.length === 0) {
    return <p className="text-sm text-slate-600">{emptyLabel}</p>;
  }

  return (
    <ol className="space-y-2">
      {rankings.map((r) => (
        <li key={r.id} className="flex justify-between text-sm text-slate-800">
          <span>
            {r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `${r.position}º`}
            {' '}{r.profiles?.name ?? 'Aluno'}
            {userId && r.user_id === userId ? ' (você)' : ''}
          </span>
          <span className="font-medium text-slate-900">{r.total_score} pts</span>
        </li>
      ))}
    </ol>
  );
}
