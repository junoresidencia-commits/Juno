import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoQuestions } from '@/lib/demo/content';
import { SeedQuestionBankButton } from '@/components/admin/SeedQuestionBankButton';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function QuestoesPage() {
  await requireRole('admin');

  let questions:
    | {
        id: string;
        statement: string;
        source: string | null;
        year: number | null;
      }[]
    | null = null;
  let totalCount = 0;

  if (usesDemoStore()) {
    const demo = getDemoQuestions();
    questions = demo.slice(0, 120);
    totalCount = demo.length;
  } else {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());
    const [{ data }, countRes] = await Promise.all([
      client
        .from('questions')
        .select('id, statement, source, year')
        .order('created_at', { ascending: false })
        .limit(100),
      client.from('questions').select('*', { count: 'exact', head: true }),
    ]);
    questions = data;
    totalCount = countRes.count ?? data?.length ?? 0;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
            ← Painel
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Banco de questões</h1>
          <p className="mt-1 text-sm text-slate-600">{totalCount} questões no banco</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/importar/prova"
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Importar prova
          </Link>
          <Link
            href="/admin/questoes/revisao"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
          >
            Revisão de importação
          </Link>
          <Link
            href="/admin/questoes/comentarios"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
          >
            Fila de comentários
          </Link>
          <Link
            href="/admin/questoes/nova"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Nova questão
          </Link>
          <Link
            href="/admin/questoes/auditoria"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Auditoria do banco
          </Link>
        </div>
      </div>

      {!usesDemoStore() ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="mb-3 text-sm text-emerald-950">
            {totalCount < 500
              ? 'Banco vazio ou incompleto. Importe ENARE + Revalida (abertos) e originais MedRank com tags estilo-USP/UNICAMP/SUS-SP/etc. (sem copiar prova oficial).'
              : 'Reinstalar: botão abaixo (upsert). Tags estilo-* permitem filtrar por banca pedagógica.'}{' '}
            Política: docs/BANCO-QUESTOES.md.
          </p>
          <SeedQuestionBankButton />
        </div>
      ) : null}

      <div className="space-y-3">
        {(questions ?? []).map((q) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="line-clamp-2 text-sm text-slate-900">{q.statement}</p>
            <p className="mt-2 text-xs text-slate-500">
              {[q.source, q.year].filter(Boolean).join(' · ')}
            </p>
          </div>
        ))}
        {(questions ?? []).length === 0 ? (
          <p className="text-sm text-slate-500">Nenhuma questão ainda.</p>
        ) : null}
      </div>
    </div>
  );
}
