type Props = {
  periodLabel: string;
  subtitle: string;
  myPosition?: number | null;
  myScore?: number | null;
  daysLeft?: number | null;
  finishedCount?: number | null;
  activeDays?: number | null;
};

export function RankingCompetitiveHero({
  periodLabel,
  subtitle,
  myPosition,
  myScore,
  daysLeft,
  finishedCount,
  activeDays,
}: Props) {
  return (
    <div className="mt-4 rounded-2xl bg-gradient-to-br from-teal-900 to-emerald-800 p-5 text-white shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">{periodLabel}</p>
      <p className="mt-1 text-lg font-bold leading-snug">{subtitle}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white/10 px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-wide text-teal-100">Sua posição</p>
          <p className="mt-0.5 text-xl font-bold">
            {myPosition != null ? `${myPosition}º` : '—'}
          </p>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-wide text-teal-100">Pontos</p>
          <p className="mt-0.5 text-xl font-bold">{myScore != null ? myScore : '—'}</p>
        </div>
        {daysLeft != null ? (
          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-teal-100">Dias no mês</p>
            <p className="mt-0.5 text-xl font-bold">{daysLeft}</p>
          </div>
        ) : null}
        {finishedCount != null ? (
          <div className="rounded-xl bg-white/10 px-3 py-2.5">
            <p className="text-[11px] uppercase tracking-wide text-teal-100">Disputas / mês</p>
            <p className="mt-0.5 text-xl font-bold">
              {finishedCount}
              {activeDays != null ? (
                <span className="ml-1 text-sm font-medium text-teal-100">· {activeDays}d</span>
              ) : null}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
