import Link from 'next/link';
import type { CollectivePeriodType, PeriodType } from '@/types/database';
import { PERIOD_OPTIONS } from '@/lib/periods';

type NavPeriod = PeriodType | CollectivePeriodType;

interface Props {
  basePath: string;
  current: NavPeriod;
  periods?: { value: NavPeriod; label: string }[];
  /** Links discretos abaixo das abas (ex.: trimestral, só hoje). */
  secondaryPeriods?: { value: NavPeriod; label: string }[];
}

export function RankingPeriodNav({
  basePath,
  current,
  periods = PERIOD_OPTIONS,
  secondaryPeriods,
}: Props) {
  return (
    <div className="mt-4">
      <nav className="flex flex-wrap gap-2">
        {periods.map((p) => (
          <Link
            key={p.value}
            href={`${basePath}?period=${p.value}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              current === p.value
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-emerald-300'
            }`}
          >
            {p.label}
          </Link>
        ))}
      </nav>
      {secondaryPeriods && secondaryPeriods.length > 0 ? (
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span className="text-slate-400">Mais:</span>
          {secondaryPeriods.map((p) => (
            <Link
              key={p.value}
              href={`${basePath}?period=${p.value}`}
              className={
                current === p.value
                  ? 'font-semibold text-emerald-700 underline underline-offset-2'
                  : 'text-slate-600 underline-offset-2 hover:text-emerald-700 hover:underline'
              }
            >
              {p.label}
            </Link>
          ))}
        </p>
      ) : null}
    </div>
  );
}
