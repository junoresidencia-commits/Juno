import Link from 'next/link';
import { requireRole } from '@/lib/auth';

export default async function RelatoriosPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Relatórios</h1>
      <p className="mt-4 text-slate-600">
        Exportação em Excel e PDF será implementada na Fase 2.
        Por enquanto, utilize o painel de ranking e o banco de questões.
      </p>
    </div>
  );
}
