import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoQuestions } from '@/lib/demo/content';
import { SeedQuestionBankButton } from '@/components/admin/SeedQuestionBankButton';
import { RebuildOfficialBankButton } from '@/components/admin/RebuildOfficialBankButton';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function QuestoesPage() {
  await requireRole('admin');

  let questions:
    | {
        id: string;
        statement: string;
        source: string | null;
        year: number | null;
        institution?: string | null;
        bank_status?: string | null;
      }[]
    | null = null;
  let totalCount = 0;
  let activeOfficial = 0;

  if (usesDemoStore()) {
    const demo = getDemoQuestions();
    questions = demo.slice(0, 120);
    totalCount = demo.length;
    activeOfficial = demo.length;
  } else {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());
    const [{ data }, countRes, officialRes] = await Promise.all([
      client
        .from('questions')
        .select('id, statement, source, year, institution, bank_status')
        .eq('bank_status', 'approved')
        .eq('question_origin', 'official')
        .order('year', { ascending: false })
        .limit(100),
      client.from('questions').select('*', { count: 'exact', head: true }),
      client
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('bank_status', 'approved')
        .eq('question_origin', 'official'),
    ]);
    questions = data;
    totalCount = countRes.count ?? data?.length ?? 0;
    activeOfficial = officialRes.count ?? 0;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
            ← Painel
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Banco de questões</h1>
          <p className="mt-1 text-sm text-slate-600">
            {activeOfficial} oficiais ativas · {totalCount} registros totais (inclui arquivo/suspensas)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/importar/lote"
            className="rounded-lg bg-teal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-900"
          >
            Importar lote (JSON)
          </Link>
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
        <div className="mb-6 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-950">
            Banco ativo = <strong>somente provas oficiais públicas</strong> (ENARE/Revalida CC-BY,
            2020–2026). Sem IA. USP/UNIFESP/etc. só via Importar prova com autorização. Ver{' '}
            docs/REFAZER-BANCO-OFICIAL.md.
          </p>
          <RebuildOfficialBankButton />
          <SeedQuestionBankButton />
          <p className="text-xs text-emerald-900">
            Depois do rebuild: Auditoria → Provas → Forçar regenerar (banco).
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        {(questions ?? []).map((q) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="line-clamp-2 text-sm text-slate-900">{q.statement}</p>
            <p className="mt-2 text-xs text-slate-500">
              {[q.institution || q.source, q.year, q.bank_status].filter(Boolean).join(' · ')}
              {' · '}
              <Link href={`/admin/questoes/${q.id}`} className="text-emerald-700 underline">
                auditar
              </Link>
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
