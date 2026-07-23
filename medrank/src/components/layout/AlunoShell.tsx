'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StudentNotificationsBell } from '@/components/aluno/StudentNotificationsBell';

const NAV = [
  { href: '/aluno', label: 'Início', exact: true },
  { href: '/aluno/ranking', label: 'Ranking' },
  { href: '/aluno/grupos', label: 'Grupos' },
  { href: '/aluno/historico', label: 'Histórico' },
  { href: '/aluno/simulados', label: 'Disputas' },
  { href: '/aluno/treino', label: 'Treino' },
  { href: '/aluno/desempenho', label: 'Desempenho' },
  { href: '/aluno/desafios', label: 'Desafios' },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AlunoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const hideNav =
    pathname.startsWith('/aluno/prova/') ||
    (/^\/aluno\/treino\/[^/]+\/[^/]+/.test(pathname) && !pathname.includes('/resultado/'));

  if (hideNav) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/aluno" className="shrink-0 text-lg font-bold text-emerald-700">
            MedRank
          </Link>
          <nav
            className="flex flex-1 items-center justify-end gap-1 overflow-x-auto pb-0.5 md:gap-2"
            aria-label="Menu do aluno"
          >
            {NAV.map((item) => {
              const active = isActive(pathname, item.href, 'exact' in item ? item.exact : false);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <StudentNotificationsBell />
          <form action="/api/auth/logout" method="post" className="shrink-0">
            <button
              type="submit"
              className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl">{children}</main>
    </div>
  );
}
