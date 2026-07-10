import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR } from '@/lib/format';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoExams } from '@/lib/demo/content';
import { getTodaysExam, todayDateString, formatExamWindowShort } from '@/lib/exams/release';
import { getDemoAdminExamStatus } from '@/lib/demo/presenters';

export default async function ProvasPage() {
  await requireRole('admin');
  const today = todayDateString();

  if (isSkipAuth()) {
    const exams = getDemoExams().slice().reverse();
    const { todayExam, finishedCount, activeStudents, rankings } = getDemoAdminExamStatus();

    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
            <p className="mt-1 text-sm text-slate-600">
              Uma prova por dia, publicada automaticamente · {formatExamWindowShort()} (horário de Brasília)
            </p>
          </div>
          <Link
            href="/admin/provas/nova"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Nova prova
          </Link>
        </div>

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
            <div key={e.id} className="flex items-center justify-between rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-600">
                  {formatDateBR(e.date_available)} · {e.total_questions} questões · {e.duration_minutes} min
                  {e.selection_mode === 'manual' ? ' · manual' : ''}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                e.date_available === today ? 'bg-emerald-100 text-emerald-800' :
                e.status === 'closed' ? 'bg-slate-100 text-slate-600' :
                'bg-blue-100 text-blue-800'
              }`}>
                {e.date_available === today ? 'Hoje' : e.status === 'closed' ? 'Encerrada' : 'Publicada'}
              </span>
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

  const todayExam = getTodaysExam(exams ?? []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Provas</h1>
        </div>
        <Link
          href="/admin/provas/nova"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Nova prova
        </Link>
      </div>

      {todayExam && (
        <section className="mb-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
          <h2 className="text-lg font-semibold text-emerald-900">Prova de hoje</h2>
          <p className="mt-1 font-medium">{todayExam.title}</p>
          <p className="mt-2 text-sm text-emerald-800">{formatDateBR(todayExam.date_available)}</p>
        </section>
      )}

      <div className="space-y-3">
        {(exams ?? []).length === 0 ? (
          <p className="text-slate-600">Nenhuma prova criada.</p>
        ) : (
          exams!.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-600">
                  {formatDateBR(e.date_available)} · {e.total_questions} questões · {e.duration_minutes} min
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                e.date_available === today ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {e.date_available === today ? 'Hoje' : 'Publicada'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
