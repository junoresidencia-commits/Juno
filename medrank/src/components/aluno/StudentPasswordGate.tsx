'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const ALLOWED_PREFIXES = ['/aluno/conta', '/api/auth/logout'];

/** Redireciona aluno que ainda não trocou a senha para /aluno/conta. */
export function StudentPasswordGate({
  mustChange,
  children,
}: {
  mustChange: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const allowed = ALLOWED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  useEffect(() => {
    if (mustChange && !allowed) {
      router.replace('/aluno/conta?primeiro=1');
    }
  }, [mustChange, allowed, router]);

  if (mustChange && !allowed) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-sm text-slate-600">
        Redirecionando para definir sua senha…
      </div>
    );
  }

  return <>{children}</>;
}
