import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

const LOT_OR =
  'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%,lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%,lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%';

export default async function QuestoesPage() {
  await requireRole('admin');

  let approvedLots = 0;
  let draftLotsQs = 0;
  let draftBatches = 0;

  if (!usesDemoStore()) {
    const admin = createAdminClient();
    const client = admin ?? (await createClient());
    const [approvedRes, draftRes, batchesRes] = await Promise.all([
      client.from('questions').select('*', { count: 'exact', head: true }).eq('bank_status', 'approved').or(LOT_OR),
      client.from('questions').select('*', { count: 'exact', head: true }).eq('bank_status', 'draft').or(LOT_OR),
      client
        .from('question_import_batches')
        .select('*', { count: 'exact', head: true })
        .eq('batch_kind', 'authorial')
        .in('status', ['draft', 'pending_review', 'partially_approved']),
    ]);
    approvedLots = approvedRes.count ?? 0;
    draftLotsQs = draftRes.count ?? 0;
    draftBatches = batchesRes.count ?? 0;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Questões</h1>
      <p className="mt-2 text-sm text-slate-600">
        Banco ativo = <strong>só os lotes MedRank (01–27)</strong> que você importou. A disputa
        sorteia daqui.
      </p>

      <div className="mt-4 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
        <p className="text-3xl font-bold text-emerald-900">{approvedLots}</p>
        <p className="text-sm text-emerald-800">questões publicadas nos lotes</p>
        <p className="mt-2 text-xs text-emerald-700">
          {draftLotsQs} em rascunho
          {draftBatches > 0 ? ` · ${draftBatches} lote(s) ainda não publicados` : ''}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Link
          href="/admin/importar/lote"
          className="block rounded-2xl bg-teal-800 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar lote</span>
          <span className="mt-1 block text-sm text-teal-100">
            Lotes 01–27 · carregar · publicar todos · limpar antigas
          </span>
        </Link>

        <Link
          href="/admin/importar/prova"
          className="block rounded-2xl bg-teal-700 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar prova</span>
          <span className="mt-1 block text-sm text-teal-100">Prova oficial (se precisar)</span>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Depois de publicar →{' '}
        <Link href="/admin/provas" className="font-semibold text-emerald-700 underline">
          Provas → regenerar
        </Link>
      </p>
    </div>
  );
}
