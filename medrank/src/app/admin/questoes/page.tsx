import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { BankReadinessPanel } from '@/components/admin/BankReadinessPanel';

export default async function QuestoesPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Questões</h1>
      <p className="mt-2 text-sm text-slate-600">
        Banco ativo = <strong>lotes MedRank (01–27)</strong> +{' '}
        <strong>oficiais ENARE/USP 2024+</strong>. Confira o checklist antes da semana de provas.
      </p>

      <div className="mt-6">
        <BankReadinessPanel />
      </div>

      <div className="mt-8 space-y-4">
        <Link
          href="/admin/importar/lote"
          className="block rounded-2xl bg-teal-800 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar lote</span>
          <span className="mt-1 block text-sm text-teal-100">
            Lotes 01–27 · publicar · limpar antigas
          </span>
        </Link>

        <Link
          href="/admin/importar/prova"
          className="block rounded-2xl bg-teal-700 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar prova</span>
          <span className="mt-1 block text-sm text-teal-100">
            Oficial ENARE/USP (prefira 2024+)
          </span>
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
