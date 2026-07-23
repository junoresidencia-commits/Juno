import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export default async function ExamSamplePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole('admin');
  const { id } = await params;

  if (usesDemoStore()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm text-slate-600">Amostra indisponível no demo.</p>
      </div>
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-red-700">
        Service role necessária.
      </div>
    );
  }

  const { data: exam } = await admin
    .from('exams')
    .select('id, title, quality_status, quality_summary, status, audience')
    .eq('id', id)
    .maybeSingle();

  const { data: eqs } = await admin
    .from('exam_questions')
    .select(
      'order_number, questions(id, statement, option_a, option_b, option_c, option_d, option_e, correct_option)'
    )
    .eq('exam_id', id)
    .order('order_number')
    .limit(5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/provas" className="text-sm text-emerald-700 hover:underline">
        ← Provas
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Amostra da disputa</h1>
      <p className="mt-1 text-sm text-slate-600">
        {exam?.title} · {exam?.audience} · {exam?.status} · qualidade={exam?.quality_status}
      </p>
      {exam?.quality_summary && (
        <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700 ring-1 ring-slate-200">
          {exam.quality_summary}
        </p>
      )}
      <p className="mt-4 text-sm text-slate-600">
        Conferência rápida (5 primeiras). Gabarito só para você — o aluno não vê.
      </p>
      <div className="mt-4 space-y-4">
        {(eqs ?? []).map((row) => {
          const raw = row.questions as unknown;
          const q = (Array.isArray(raw) ? raw[0] : raw) as {
            statement?: string;
            option_a?: string;
            option_b?: string;
            option_c?: string;
            option_d?: string;
            option_e?: string;
            correct_option?: string;
          } | null;
          if (!q) return null;
          return (
            <article key={row.order_number} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
              <p className="text-xs font-semibold text-slate-500">Q{row.order_number}</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{q.statement}</p>
              <ul className="mt-3 space-y-1 text-xs text-slate-700">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((letter) => {
                  const text = q[`option_${letter.toLowerCase()}` as keyof typeof q] as
                    | string
                    | undefined;
                  if (!text) return null;
                  const ok = q.correct_option === letter;
                  return (
                    <li key={letter} className={ok ? 'font-semibold text-emerald-800' : ''}>
                      {letter}) {text}
                      {ok ? ' ← gabarito' : ''}
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
