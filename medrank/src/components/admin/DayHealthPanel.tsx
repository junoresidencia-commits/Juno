import Link from 'next/link';
import { getDayHealthReport } from '@/lib/exams/day-health';
import { ResetAttemptButton } from '@/components/admin/ResetAttemptButton';
import {
  qualityStatusLabel,
  qualityStatusTone,
  shortExamLabel,
} from '@/lib/exams/admin-labels';

export async function DayHealthPanel({
  showLinkToProvas = true,
}: {
  showLinkToProvas?: boolean;
}) {
  const report = await getDayHealthReport();

  return (
    <section
      className={`mb-8 rounded-2xl p-5 ring-1 ${
        report.ok ? 'bg-emerald-50 ring-emerald-200' : 'bg-amber-50 ring-amber-300'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Hoje</h2>
          <p className="mt-1 text-sm text-slate-700">
            {report.exams.length === 0
              ? 'Nenhuma disputa gerada ainda.'
              : `${report.exams.length} disputa(s) · ${report.ok ? 'tudo certo' : 'precisa de atenção'}`}
          </p>
        </div>
        {showLinkToProvas && (
          <Link
            href="/admin/provas"
            className="rounded-lg bg-teal-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-900"
          >
            Ver Provas
          </Link>
        )}
      </div>

      {report.issues.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-amber-950">
          {report.issues.slice(0, 3).map((issue) => (
            <li key={issue}>• {issue}</li>
          ))}
        </ul>
      )}

      {report.exams.length > 0 && (
        <ul className="mt-4 space-y-2">
          {report.exams.map((exam) => (
            <li
              key={exam.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-200"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900">
                  {shortExamLabel(exam.title, exam.audience)}
                </p>
                <p className="text-xs text-slate-600">
                  {exam.questionCount} questões · {exam.finishedCount} finalizaram
                  {exam.forfeitedCount > 0 ? ` · ${exam.forfeitedCount} encerrada(s)` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${qualityStatusTone(exam.quality_status)}`}
                >
                  {qualityStatusLabel(exam.quality_status)}
                </span>
                <Link
                  href={`/admin/provas/${exam.id}/amostra`}
                  className="text-xs font-semibold text-teal-800 hover:underline"
                >
                  Ver
                </Link>
              </div>
              {exam.forfeitedCount > 0 && (
                <div className="w-full border-t border-slate-100 pt-2">
                  <p className="mb-2 text-xs font-medium text-red-800">
                    Aluno com prova encerrada — liberar se foi erro técnico:
                  </p>
                  <ResetAttemptButton examId={exam.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

    </section>
  );
}
