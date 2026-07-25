import Link from 'next/link';
import { requireRole } from '@/lib/auth';

export default async function ImportarPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Importar</h1>
      <p className="mt-2 text-sm text-slate-600">
        Manda do jeito que for — PDF, Word, pasta, ZIP, link, texto ou JSON.
      </p>

      <div className="mt-8 space-y-4">
        <Link
          href="/admin/importar/prova"
          className="block rounded-2xl bg-teal-800 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar prova (tudo)</span>
          <span className="mt-2 block text-sm text-teal-100">
            PDF · Word · gabarito · pasta · ZIP · link · template
          </span>
          <span className="mt-3 block text-xs text-teal-200/90">
            USP, ENARE e similares → questões prontas → revisão
          </span>
        </Link>

        <Link
          href="/admin/importar/lote"
          className="block rounded-2xl bg-white px-5 py-5 text-center ring-1 ring-slate-200"
        >
          <span className="block text-base font-bold text-slate-900">Importar lote MedRank</span>
          <span className="mt-1 block text-sm text-slate-600">
            JSON dos lotes 01–27 (banco autoral)
          </span>
        </Link>
      </div>
    </div>
  );
}
