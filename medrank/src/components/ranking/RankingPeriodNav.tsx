import Link from 'next/link';
import type { PeriodType } from '@/types/database';
import { PERIOD_OPTIONS } from '@/lib/periods';

interface Props {
  basePath: string;
  current: PeriodType;
}

export function RankingPeriodNav({ basePath, current }: Props) {
  return (
    <nav className="mt-4 flex flex-wrap gap-2">
      {PERIOD_OPTIONS.map((p) => (
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
  );
}
