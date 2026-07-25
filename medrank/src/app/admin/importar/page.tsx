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
      <p className="mt-2 text-sm text-slate-600">Escolha uma opção. A disputa puxa dos lotes/provas publicados.</p>

      <div className="mt-8 space-y-4">
        <Link
          href="/admin/importar/lote"
          className="block rounded-2xl bg-teal-800 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar lote</span>
          <span className="mt-1 block text-sm text-teal-100">
            Lotes JSON 20–27 · publicar todos
          </span>
        </Link>

        <Link
          href="/admin/importar/prova"
          className="block rounded-2xl bg-teal-700 px-5 py-6 text-center shadow-sm"
        >
          <span className="block text-lg font-bold text-white">Importar prova</span>
          <span className="mt-1 block text-sm text-teal-100">
            PDF · Word · pasta/ZIP · template → revisão
          </span>
        </Link>
      </div>
    </div>
  );
}
