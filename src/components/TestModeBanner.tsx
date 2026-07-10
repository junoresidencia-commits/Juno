import Link from 'next/link';
import { isDemoMode } from '@/lib/demo-auth';
import { DEMO_ACCESS } from '@/lib/demo/credentials';
import { isSkipAuth } from '@/lib/skip-auth';

export function TestModeBanner() {
  if (isSkipAuth()) {
    return (
      <div className="border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
        <strong>Modo teste</strong> — sem login.{' '}
        <Link href="/admin" className="font-medium underline">Professor</Link>
        {' · '}
        <Link href="/aluno" className="font-medium underline">Aluno</Link>
      </div>
    );
  }

  if (!isDemoMode()) return null;

  return (
    <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 text-center text-xs text-slate-800 sm:text-sm">
      <strong>MedRank pronto para uso</strong> —{' '}
      <Link href="/login" className="font-medium text-emerald-800 underline">Entrar</Link>
      {' · '}
      Professor: <code className="rounded bg-white px-1">{DEMO_ACCESS.professor.user}</code> /{' '}
      <code className="rounded bg-white px-1">{DEMO_ACCESS.professor.password}</code>
      {' · '}
      Aluno: <code className="rounded bg-white px-1">{DEMO_ACCESS.aluno.user}</code> /{' '}
      <code className="rounded bg-white px-1">{DEMO_ACCESS.aluno.password}</code>
    </div>
  );
}
