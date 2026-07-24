import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export default async function QuestoesPage() {
  await requireRole('admin');

  let activeOfficial = 0;
  let authorialApproved = 0;
  let draftLots = 0;

  if (!usesDemoStore()) {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());
    const [officialRes, authorialRes, draftsRes] = await Promise.all([
      client
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('bank_status', 'approved')
        .eq('question_origin', 'official'),
      client
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('bank_status', 'approved')
        .in('question_kind', ['authorial_guideline', 'authorial_prediction']),
      client
        .from('question_import_batches')
        .select('*', { count: 'exact', head: true })
        .eq('batch_kind', 'authorial')
        .in('status', ['draft', 'pending_review', 'partially_approved']),
    ]);
    activeOfficial = officialRes.count ?? 0;
    authorialApproved = authorialRes.count ?? 0;
    draftLots = draftsRes.count ?? 0;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Questões</h1>
      <p className="mt-2 text-sm text-slate-600">
        A disputa sorteia do banco (oficiais + lotes publicados). Escolha só o que quer
        importar:
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {activeOfficial} oficiais · {authorialApproved} autorais publicadas
        {draftLots > 0 ? ` · ${draftLots} lote(s) em rascunho` : ''}
      </p>

      <div className="mt-8 space-y-4">
        <Link
          href="/admin/importar/lote"
          className="block rounded-2xl bg-teal-800 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar lote</span>
          <span className="mt-1 block text-sm text-teal-100">
            JSON dos lotes 20–27 · carregar / baixar / publicar todos
          </span>
        </Link>

        <Link
          href="/admin/importar/prova"
          className="block rounded-2xl bg-teal-700 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar prova</span>
          <span className="mt-1 block text-sm text-teal-100">
            Prova oficial (texto/JSON) com autorização
          </span>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Depois de publicar lotes →{' '}
        <Link href="/admin/provas" className="font-semibold text-emerald-700 underline">
          Provas → Forçar regenerar
        </Link>
      </p>
    </div>
  );
}
