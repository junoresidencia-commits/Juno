import Link from 'next/link';
import { isSkipAuth } from '@/lib/skip-auth';

export function TestModeBanner() {
  if (!isSkipAuth()) return null;

  return (
    <div className="border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">
      <strong>Modo teste</strong> — sem login.{' '}
      <Link href="/admin" className="font-medium underline">Professor</Link>
      {' · '}
      <Link href="/aluno" className="font-medium underline">Aluno</Link>
    </div>
  );
}
