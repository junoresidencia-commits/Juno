import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatDateBR } from '@/lib/format';

export default async function ProvasPage() {
  await requireRole('admin');
  const supabase = await createClient();

  const { data: exams } = await supabase
    .from('exams')
    .select('*')
    .order('date_available', { ascending: false });

  const statusLabel: Record<string, string> = {
    draft: 'Rascunho',
    published: 'Publicada',
    closed: 'Encerrada',
  };

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

      <div className="space-y-3">
        {(exams ?? []).length === 0 ? (
          <p className="text-slate-500">Nenhuma prova criada.</p>
        ) : (
          exams!.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-slate-500">
                  {formatDateBR(e.date_available)} · {e.total_questions} questões · {e.duration_minutes} min
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                e.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                e.status === 'closed' ? 'bg-slate-100 text-slate-600' :
                'bg-amber-100 text-amber-800'
              }`}>
                {statusLabel[e.status]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
