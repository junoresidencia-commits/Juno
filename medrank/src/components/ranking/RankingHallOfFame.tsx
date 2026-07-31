import type { HallOfFameEntry } from '@/lib/rankings/competitive';

type Props = {
  entries: HallOfFameEntry[];
  currentUserId?: string;
};

function medal(position: number): string {
  if (position === 1) return '🥇';
  if (position === 2) return '🥈';
  if (position === 3) return '🥉';
  return `${position}º`;
}

export function RankingHallOfFame({ entries, currentUserId }: Props) {
  if (entries.length === 0) {
    return (
      <section className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <h2 className="text-lg font-bold text-slate-900">Hall da fama</h2>
        <p className="mt-1 text-sm text-slate-600">
          Os campeões de cada mês ficam salvos aqui. Quando o mês virar, o 1º / 2º / 3º entram no
          hall.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-slate-900">Hall da fama</h2>
      <p className="mt-1 text-sm text-slate-600">
        Ranking mensal anterior — quem dominou o mês continua no quadro.
      </p>
      <div className="mt-4 space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.periodStart}
            className="rounded-2xl bg-white p-4 ring-1 ring-slate-200"
          >
            <p className="text-sm font-semibold text-teal-900">{entry.monthLabel}</p>
            <ul className="mt-2 space-y-1.5">
              {entry.champions.map((c) => {
                const isMe = currentUserId === c.userId;
                return (
                  <li
                    key={`${entry.periodStart}-${c.position}`}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm ${
                      isMe ? 'bg-emerald-50 font-semibold text-emerald-900' : 'text-slate-800'
                    }`}
                  >
                    <span>
                      {medal(c.position)} {c.name}
                      {isMe ? ' (você)' : ''}
                    </span>
                    <span className="text-slate-500">{c.totalScore} pts</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
