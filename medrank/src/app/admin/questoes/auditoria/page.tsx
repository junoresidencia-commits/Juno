import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { QuestionAuditPanel } from '@/components/admin/QuestionAuditPanel';

export default async function QuestoesAuditoriaPage() {
  await requireRole('admin');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/admin/questoes" className="text-sm text-emerald-700 hover:underline">
        ← Questões
      </Link>
      <header className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Auditoria do banco</h1>
        <p className="mt-1 text-sm text-slate-600">
          Classifique, suspenda e exclua questões ruins. Prioridade: provas oficiais reais. Menos
          questões e melhor qualidade. Remediação (zerar/devolver pontos) também está em cada
          questão e em Provas → Remediação.
        </p>
      </header>
      <QuestionAuditPanel />
    </div>
  );
}
