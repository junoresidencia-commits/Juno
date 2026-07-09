import Link from 'next/link';
import type { ChallengeProgress } from '@/lib/challenges-progress';

interface Props {
  challenges: ChallengeProgress[];
}

export function WeeklyChallengesCard({ challenges }: Props) {
  if (challenges.length === 0) return null;

  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold">Desafios da semana</h2>
      <div className="mt-4 space-y-4">
        {challenges.map(({ challenge, currentValue, completed, description }) => {
          const pct = Math.min(100, Math.round((currentValue / challenge.target_value) * 100));
          return (
            <div key={challenge.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{challenge.title}</span>
                {completed ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                    ✓ Concluído +{challenge.bonus_points} pts
                  </span>
                ) : (
                  <span className="text-slate-500">
                    {currentValue}/{challenge.target_value}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{description}</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${completed ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  style={{ width: `${completed ? 100 : pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Link href="/aluno/desafios" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
        Ver todos os desafios →
      </Link>
    </section>
  );
}
