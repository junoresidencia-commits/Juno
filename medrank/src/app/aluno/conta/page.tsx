import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { ChangePasswordForm } from '@/components/aluno/ChangePasswordForm';

export default async function ContaAlunoPage() {
  const session = await requireAuth();

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Link href="/aluno" className="text-sm font-semibold text-teal-800 hover:underline">
        ← Início
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-teal-950">Minha conta</h1>
      <p className="mt-1 text-sm text-slate-600">
        {session.profile.name}
        {session.profile.email ? ` · ${session.profile.email}` : ''}
      </p>

      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
