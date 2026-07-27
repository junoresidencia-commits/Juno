import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { profileMustChangePassword } from '@/lib/auth/must-change-password';
import { ChangePasswordForm } from '@/components/aluno/ChangePasswordForm';

export default async function ContaAlunoPage() {
  const session = await requireAuth();
  const mustChange = profileMustChangePassword(session.profile);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {!mustChange ? (
        <Link href="/aluno" className="text-sm font-semibold text-teal-800 hover:underline">
          ← Início
        </Link>
      ) : null}

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-teal-950">
        {mustChange ? 'Primeiro acesso' : 'Minha conta'}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        {session.profile.name}
        {session.profile.email ? ` · ${session.profile.email}` : ''}
      </p>

      {mustChange ? (
        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
          Antes de usar disputas e ranking, defina uma senha nova. Depois você segue para o início.
        </p>
      ) : null}

      <div className="mt-6">
        <ChangePasswordForm required={mustChange} />
      </div>
    </div>
  );
}
