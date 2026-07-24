import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { ReleaseForfeitedPanel } from '@/components/admin/ReleaseForfeitedPanel';

export default async function LiberacoesPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin/provas" className="text-sm text-emerald-700 hover:underline">
        ← Provas
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Liberar provas</h1>
      <p className="mt-2 text-sm text-slate-600">
        Quando o aluno cai em “PROVA ENCERRADA” por ligação, notificação ou bug, use{' '}
        <strong>Liberar prova</strong>. Ele poderá iniciar de novo a disputa de hoje.
      </p>
      <div className="mt-6">
        <ReleaseForfeitedPanel autoLoad />
      </div>
    </div>
  );
}
