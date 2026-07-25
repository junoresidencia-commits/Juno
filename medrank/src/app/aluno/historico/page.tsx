import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { formatDateBR, formatDuration, formatPercent } from '@/lib/format';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoHistory } from '@/lib/demo/presenters';
import { StudyPdfDownloadButton } from '@/components/exam/StudyPdfDownloadButton';

function HistoryCard({
  id,
  title,
  date,
  totalCorrect,
  totalQuestions,
  percentage,
  durationSeconds,
}: {
  id: string;
  title: string;
  date: string;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number | null;
  durationSeconds: number;
}) {
  return (
    <div className="rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-slate-600">{formatDateBR(date)}</p>
        </div>
        <div className="shrink-0 text-right text-sm">
          <p className="font-semibold text-emerald-700">
            {totalCorrect}/{totalQuestions} acertos
          </p>
          <p className="text-slate-600">
            {formatPercent(percentage)} · {formatDuration(durationSeconds)}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={`/aluno/resultado/${id}`}
          className="exam-tap rounded-xl bg-slate-100 px-3 py-2.5 text-center text-sm font-semibold text-slate-800 hover:bg-slate-200"
        >
          Ver resultado
        </Link>
        <StudyPdfDownloadButton attemptId={id} compact />
      </div>
    </div>
  );
}

export default async function HistoricoPage() {
  const { userId } = await requireAuth();

  if (usesDemoStore()) {
    const attempts = getDemoHistory();
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/aluno" className="text-sm text-emerald-700 hover:underline">
          ← Voltar
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Histórico de provas</h1>
        <p className="mt-1 text-sm text-slate-600">
          Toque em <strong>Baixar PDF</strong> para estudar com gabarito e certo/errado.
        </p>
        <div className="mt-6 space-y-3">
          {attempts.map((a) => (
            <HistoryCard
              key={a.id}
              id={a.id}
              title={a.exams?.title ?? 'Disputa'}
              date={a.exams?.date_available ?? ''}
              totalCorrect={a.total_correct ?? 0}
              totalQuestions={a.total_questions ?? 0}
              percentage={a.percentage}
              durationSeconds={a.duration_seconds ?? 0}
            />
          ))}
        </div>
      </div>
    );
  }

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
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Histórico de provas</h1>
      <p className="mt-1 text-sm text-slate-600">
        Toque em <strong>Baixar PDF</strong> para estudar com gabarito e certo/errado.
      </p>

      <div className="mt-6 space-y-3">
        {(attempts ?? []).length === 0 ? (
          <p className="text-slate-600">Nenhuma prova finalizada ainda.</p>
        ) : (
          attempts!.map((a) => {
            const exam = a.exams as { title: string; date_available: string };
            return (
              <HistoryCard
                key={a.id}
                id={a.id}
                title={exam.title}
                date={exam.date_available}
                totalCorrect={a.total_correct ?? 0}
                totalQuestions={a.total_questions ?? 0}
                percentage={a.percentage}
                durationSeconds={a.duration_seconds ?? 0}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
