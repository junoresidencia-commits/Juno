import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR } from '@/lib/format';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoExams } from '@/lib/demo/content';
import { getActivePublishedExam, formatReleaseWindow, todayDateString } from '@/lib/exams/release';
import { getDemoAdminExamStatus } from '@/lib/demo/presenters';
import { ReleaseExamButton } from '@/components/admin/ReleaseExamButton';

export default async function ProvasPage() {
  await requireRole('admin');
  const today = todayDateString();

  if (isSkipAuth()) {
    const exams = getDemoExams().slice().reverse();
    const { activeExam, finishedCount, activeStudents, rankingReady, rankings, windowLabel } =
      getDemoAdminExamStatus();
    const nextDraft = exams.find((e) => e.status === 'draft');

    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
            <h1 className="mt-2 text-2xl font-bold">Provas</h1>
            <p className="mt-1 text-sm text-slate-600">
              Mesma prova para todos os alunos. Libere com janela de 1 ou 2 dias.
            </p>
          </div>
          <Link
            href="/admin/provas/nova"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Nova prova
          </Link>
        </div>

        {activeExam ? (
          <section className="mb-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-900">Prova liberada agora</h2>
            <p className="mt-1 font-medium">{activeExam.title}</p>
            <p className="mt-2 text-sm text-emerald-800">
              Janela: {windowLabel} · {activeExam.total_questions} questões · {activeExam.duration_minutes} min
            </p>
            <p className="mt-2 text-sm text-emerald-700">
              {finishedCount}/{activeStudents} alunos finalizaram
              {!rankingReady && ' · ranking do professor após todos terminarem ou ao fechar a janela'}
            </p>
            {rankingReady && rankings.length > 0 && (
              <ol className="mt-4 space-y-2">
                {rankings.map((r) => (
                  <li key={r.id} className="flex justify-between rounded-lg bg-white px-4 py-2 text-sm">
                    <span>{r.position}º {(r as { profiles?: { name?: string } }).profiles?.name}</span>
                    <span className="font-medium">{r.total_score} pts</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ) : (
          <section className="mb-8 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
            <h2 className="text-lg font-semibold text-amber-900">Nenhuma prova liberada</h2>
            <p className="mt-2 text-sm text-amber-800">
              Escolha uma prova abaixo e clique em &quot;Liberar prova&quot; para os alunos começarem.
            </p>
            {nextDraft && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-4">
                <div>
                  <p className="font-medium">{nextDraft.title}</p>
                  <p className="text-sm text-slate-500">{nextDraft.total_questions} questões · 30 min</p>
                </div>
                <ReleaseExamButton examId={nextDraft.id} />
              </div>
            )}
          </section>
        )}

        <div className="space-y-3">
          {exams.slice(0, 20).map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-500">
                  {e.status === 'published'
                    ? formatReleaseWindow(e)
                    : formatDateBR(e.date_available)}
                  {' · '}{e.total_questions} questões · {e.duration_minutes} min
                </p>
              </div>
              <div className="flex items-center gap-3">
                {e.status === 'draft' && !activeExam && (
                  <ReleaseExamButton examId={e.id} />
                )}
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  e.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                  e.status === 'closed' ? 'bg-slate-100 text-slate-600' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {e.status === 'published' ? 'Liberada' : e.status === 'closed' ? 'Encerrada' : 'Rascunho'}
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

  const activeExam = getActivePublishedExam(exams ?? [], today);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
          <h1 className="mt-2 text-2xl font-bold">Provas</h1>
        </div>
        <Link
          href="/admin/provas/nova"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Nova prova
        </Link>
      </div>

      {activeExam && (
        <section className="mb-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
          <h2 className="text-lg font-semibold text-emerald-900">Prova liberada agora</h2>
          <p className="mt-1 font-medium">{activeExam.title}</p>
          <p className="mt-2 text-sm text-emerald-800">{formatReleaseWindow(activeExam)}</p>
        </section>
      )}

      <div className="space-y-3">
        {(exams ?? []).length === 0 ? (
          <p className="text-slate-500">Nenhuma prova criada.</p>
        ) : (
          exams!.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-500">
                  {e.status === 'published' ? formatReleaseWindow(e) : formatDateBR(e.date_available)}
                  {' · '}{e.total_questions} questões · {e.duration_minutes} min
                </p>
              </div>
              <div className="flex items-center gap-3">
                {e.status === 'draft' && !activeExam && <ReleaseExamButton examId={e.id} />}
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  e.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                  e.status === 'closed' ? 'bg-slate-100 text-slate-600' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {e.status === 'published' ? 'Liberada' : e.status === 'closed' ? 'Encerrada' : 'Rascunho'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
