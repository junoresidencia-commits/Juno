import Link from 'next/link';
import type { ResultInsights } from '@/lib/exams/result-analysis';

interface Props {
  score: number;
  maxScore: number;
  position: number | null;
  insights: ResultInsights;
  showGabarito: boolean;
}

export function ResultInsightsPanel({ score, maxScore, position, insights, showGabarito }: Props) {
  const beatAverage =
    insights.averageScore != null ? score >= insights.averageScore : null;
  const scorePct = maxScore ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div className="mt-6 space-y-4">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg shadow-emerald-900/20">
        <p className="text-sm font-medium text-emerald-100">Sua pontuação</p>
        <p className="mt-1 text-5xl font-bold tabular-nums tracking-tight">{score}</p>
        <p className="mt-1 text-emerald-100">de {maxScore} pts · {scorePct}% do máximo</p>
        {position != null && (
          <p className="mt-4 text-lg font-semibold">
            {position === 1 ? '🏆 1º lugar no ranking de hoje!' : `${position}º no ranking de hoje`}
          </p>
        )}
        {insights.pointsToFirst != null && insights.pointsToFirst > 0 && (
          <p className="mt-1 text-sm text-emerald-100">
            Faltam <strong className="text-white">{insights.pointsToFirst} pts</strong> para o 1º lugar
          </p>
        )}
        {beatAverage != null && (
          <p className="mt-2 text-sm text-emerald-100">
            {beatAverage
              ? `Acima da média do dia (${insights.averageScore} pts) 🎯`
              : `Média do dia: ${insights.averageScore} pts — amanhã é nova chance`}
          </p>
        )}
      </div>

      {insights.finishedToday > 0 && (
        <div className="rounded-xl bg-white p-4 text-center ring-1 ring-slate-200">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-900">{insights.finishedToday}</strong>{' '}
            {insights.finishedToday === 1 ? 'aluno já disputou' : 'alunos já disputaram'} hoje
          </p>
        </div>
      )}

      {insights.byArea.length > 0 && (
        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="font-semibold text-slate-900">Desempenho por área</h2>
          <p className="mt-1 text-sm text-slate-600">Onde você foi forte e onde revisar.</p>
          <div className="mt-4 space-y-3">
            {insights.byArea.map((area) => (
              <div key={area.area}>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-slate-800">{area.area}</span>
                  <span className="text-slate-600">
                    {area.correct}/{area.total} · {area.percentage}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all ${
                      area.percentage >= 75
                        ? 'bg-emerald-500'
                        : area.percentage >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.max(area.percentage, area.total > 0 ? 6 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {insights.weakestAreas.length > 0 && showGabarito && (
        <section className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <h2 className="font-semibold text-amber-900">Foco de revisão</h2>
          <p className="mt-1 text-sm text-amber-800">
            Reforce: {insights.weakestAreas.map((a) => a.area).join(' e ')}.
          </p>
          <Link
            href="/aluno/simulados"
            className="mt-3 inline-block text-sm font-semibold text-amber-900 underline-offset-2 hover:underline"
          >
            Treinar por área →
          </Link>
        </section>
      )}
    </div>
  );
}
