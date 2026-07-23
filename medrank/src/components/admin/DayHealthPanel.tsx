import Link from 'next/link';
import { getDayHealthReport } from '@/lib/exams/day-health';
import { ResetAttemptButton } from '@/components/admin/ResetAttemptButton';

export async function DayHealthPanel() {
  const report = await getDayHealthReport();

  return (
    <section
      className={`mb-8 rounded-2xl p-5 ring-1 ${
        report.ok ? 'bg-emerald-50 ring-emerald-200' : 'bg-amber-50 ring-amber-300'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Saúde do dia · {report.date}</h2>
          <p className="mt-1 text-sm text-slate-700">
            OpenAI:{' '}
            {report.openaiConfigured ? (
              <span className="font-semibold text-emerald-800">ok</span>
            ) : (
              <span className="font-semibold text-red-700">faltando</span>
            )}
            {' · '}
            {report.exams.length} disputa(s)
          </p>
        </div>
        <Link
          href="/admin/provas"
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 ring-1 ring-slate-300"
        >
          Ir para Provas
        </Link>
      </div>

      {report.issues.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-amber-950">
          {report.issues.map((issue) => (
            <li key={issue}>• {issue}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-3">
        {report.exams.map((exam) => (
          <div key={exam.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{exam.title}</p>
                <p className="text-xs text-slate-600">
                  {exam.audience} · status={exam.status} · qualidade=
                  {exam.quality_status || '—'} · {exam.questionCount} Q ·{' '}
                  {exam.finishedCount} finalizaram · {exam.forfeitedCount} forfeits
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/provas/${exam.id}/remediar`}
                  className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200"
                >
                  Remediação
                </Link>
                <Link
                  href={`/admin/provas/${exam.id}/amostra`}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200"
                >
                  Amostra
                </Link>
              </div>
            </div>
            {exam.sampleStems.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amostra (3 primeiras)
                </p>
                {exam.sampleStems.map((stem, i) => (
                  <p key={i} className="text-xs text-slate-700">
                    <span className="font-semibold">Q{i + 1}.</span> {stem}
                    {stem.length >= 140 ? '…' : ''}
                  </p>
                ))}
              </div>
            )}
            {exam.forfeitedCount > 0 && (
              <div className="mt-3">
                <ResetAttemptButton examId={exam.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
