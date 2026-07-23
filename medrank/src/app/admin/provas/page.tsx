import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR } from '@/lib/format';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoExams } from '@/lib/demo/content';
import { todayDateString, formatExamWindowShort } from '@/lib/exams/release';
import { getDemoAdminExamStatus } from '@/lib/demo/presenters';
import { EnsureDailyExamsButton } from '@/components/admin/EnsureDailyExamsButton';
import { ExamQualityAdminCard } from '@/components/admin/ExamQualityAdminCard';
import { DayHealthPanel } from '@/components/admin/DayHealthPanel';
import { shortTrackLabel, trackForDate } from '@/lib/exams/daily-schedule';

export default async function ProvasPage() {
  await requireRole('admin');
  const today = todayDateString();
  const todayTrack = shortTrackLabel(trackForDate(today));

  if (usesDemoStore()) {
    const exams = getDemoExams().slice().reverse();
    const { todayExam, finishedCount, activeStudents, rankings } = getDemoAdminExamStatus();

    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
            <p className="mt-1 text-sm text-slate-600">
              Disputa diária automática · alterna Nefrologia / Nefropediatria · {formatExamWindowShort()}
            </p>
          </div>
          <Link
            href="/admin/provas/nova"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Nova prova
          </Link>
        </div>

        <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="font-semibold text-slate-900">Geração automática</h2>
          <p className="mt-1 text-sm text-slate-600">
            Hoje seria: <strong>{todayTrack}</strong>. O cron cria às 6h (BRT); você também pode gerar agora.
          </p>
          <div className="mt-3">
            <EnsureDailyExamsButton />
          </div>
        </section>

        {todayExam && (
          <section className="mb-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-900">Prova de hoje</h2>
            <p className="mt-1 font-medium">{todayExam.title}</p>
            <p className="mt-2 text-sm text-emerald-800">
              {formatDateBR(todayExam.date_available)} · {todayExam.total_questions} questões · {todayExam.duration_minutes} min · {formatExamWindowShort()}
            </p>
            <p className="mt-2 text-sm text-emerald-700">
              {finishedCount}/{activeStudents} alunos finalizaram hoje
            </p>
            {rankings.length > 0 && (
              <ol className="mt-4 space-y-2">
                {rankings.map((r) => (
                  <li key={r.id} className="flex justify-between rounded-lg bg-white px-4 py-2 text-sm text-slate-900">
                    <span>{r.position}º {(r as { profiles?: { name?: string } }).profiles?.name}</span>
                    <span className="font-medium">{r.total_score} pts</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        )}

        <div className="space-y-3">
          {exams.slice(0, 20).map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <div className="min-w-0">
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-600">
                  {formatDateBR(e.date_available)} · {e.total_questions} questões · {e.duration_minutes} min
                  {e.selection_mode === 'manual' ? ' · manual' : ''}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/provas/${e.id}/amostra`}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Amostra
                </Link>
                <Link
                  href={`/admin/provas/${e.id}/remediar`}
                  className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                >
                  Remediação
                </Link>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  e.date_available === today ? 'bg-emerald-100 text-emerald-800' :
                  e.status === 'closed' ? 'bg-slate-100 text-slate-600' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {e.date_available === today ? 'Hoje' : e.status === 'closed' ? 'Encerrada' : 'Publicada'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .order('date_available', { ascending: false });

  const todayExams = (exams ?? []).filter((e) => e.date_available === today);
  const todayGeneral = todayExams.find((e) => (e as { audience?: string }).audience !== 'nephrology');
  const todayNefro = todayExams.find((e) => (e as { audience?: string }).audience === 'nephrology');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
          <p className="mt-1 text-sm text-slate-600">
            Duas disputas por dia: geral (outras ligas) + Liga de Nefrologia · {formatExamWindowShort()}
          </p>
        </div>
        <Link
          href="/admin/provas/nova"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Nova prova
        </Link>
      </div>

      <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="font-semibold text-slate-900">Geração automática</h2>
        <p className="mt-1 text-sm text-slate-600">
          Liga de Nefrologia hoje: <strong>{todayTrack}</strong>. Outras ligas: disputa geral.
        </p>
        <div className="mt-3">
          <EnsureDailyExamsButton />
        </div>
      </section>

      <DayHealthPanel />

      {(todayGeneral || todayNefro) && (
        <section className="mb-8 space-y-3 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
          <h2 className="text-lg font-semibold text-emerald-900">Provas de hoje</h2>
          {todayNefro && (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-teal-800">Liga de Nefrologia</p>
                <p className="font-medium">{todayNefro.title}</p>
              </div>
              <ExamQualityAdminCard
                examId={todayNefro.id}
                initialStatus={(todayNefro as { quality_status?: string }).quality_status}
                initialSummary={(todayNefro as { quality_summary?: string }).quality_summary}
              />
            </div>
          )}
          {todayGeneral && (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-600">Disputa geral</p>
                <p className="font-medium">{todayGeneral.title}</p>
              </div>
              <ExamQualityAdminCard
                examId={todayGeneral.id}
                initialStatus={(todayGeneral as { quality_status?: string }).quality_status}
                initialSummary={(todayGeneral as { quality_summary?: string }).quality_summary}
              />
            </div>
          )}
        </section>
      )}

      <div className="space-y-3">
        {(exams ?? []).length === 0 ? (
          <p className="text-slate-600">Nenhuma prova criada — use os botões acima.</p>
        ) : (
          exams!.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <div className="min-w-0">
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-600">
                  {formatDateBR(e.date_available)} · {e.total_questions} questões · {e.duration_minutes} min
                  {' · '}
                  {(e as { audience?: string }).audience === 'nephrology' ? 'Liga Nefrologia' : 'Geral'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/provas/${e.id}/amostra`}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Amostra
                </Link>
                <Link
                  href={`/admin/provas/${e.id}/remediar`}
                  className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                >
                  Remediação
                </Link>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  e.date_available === today ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {e.date_available === today ? 'Hoje' : 'Publicada'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
