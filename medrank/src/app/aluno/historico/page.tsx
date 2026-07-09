import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatDateBR, formatDuration, formatPercent } from '@/lib/format';

export default async function HistoricoPage() {
  const { userId } = await requireAuth();
  const supabase = await createClient();

  const { data: attempts } = await supabase
    .from('attempts')
    .select('*, exams(title, date_available)')
    .eq('user_id', userId)
    .not('finished_at', 'is', null)
    .order('finished_at', { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Histórico de provas</h1>

      <div className="mt-6 space-y-3">
        {(attempts ?? []).length === 0 ? (
          <p className="text-slate-500">Nenhuma prova finalizada ainda.</p>
        ) : (
          attempts!.map((a) => {
            const exam = a.exams as { title: string; date_available: string };
            return (
              <Link
                key={a.id}
                href={`/aluno/resultado/${a.id}`}
                className="block rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:ring-emerald-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-slate-500">{formatDateBR(exam.date_available)}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-emerald-700">
                      {a.total_correct}/{a.total_questions} acertos
                    </p>
                    <p className="text-slate-500">
                      {formatPercent(a.percentage)} · {formatDuration(a.duration_seconds ?? 0)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
