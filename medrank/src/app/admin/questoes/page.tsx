import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { DIFFICULTY_LABELS } from '@/lib/format';

export default async function QuestoesPage() {
  await requireRole('admin');
  const supabase = await createClient();

  const { data: questions } = await supabase
    .from('questions')
    .select('id, statement, source, topic, difficulty, year')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
          <h1 className="mt-2 text-2xl font-bold">Banco de questões</h1>
        </div>
        <Link
          href="/admin/questoes/nova"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Nova questão
        </Link>
      </div>

      <div className="space-y-3">
        {(questions ?? []).length === 0 ? (
          <p className="text-slate-500">Nenhuma questão cadastrada.</p>
        ) : (
          questions!.map((q) => (
            <div key={q.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4">
                <p className="line-clamp-2 text-sm">{q.statement}</p>
                <div className="shrink-0 text-right text-xs text-slate-500">
                  <p>{q.source} {q.year}</p>
                  <p>{q.topic}</p>
                  {q.difficulty && <p>{DIFFICULTY_LABELS[q.difficulty] ?? q.difficulty}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
