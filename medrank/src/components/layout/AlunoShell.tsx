'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StudentNotificationsBell } from '@/components/aluno/StudentNotificationsBell';

/** Menu principal — poucos itens para o celular não ficar pesado. */
const PRIMARY_NAV = [
  { href: '/aluno', label: 'Início', exact: true },
  { href: '/aluno/grupos', label: 'Grupos' },
  { href: '/aluno/ranking', label: 'Ranking' },
  { href: '/aluno/historico', label: 'Histórico' },
] as const;

const MORE_NAV = [
  { href: '/aluno/ranking/grupos', label: 'Entre grupos' },
  { href: '/aluno/simulados', label: 'Disputas' },
  { href: '/aluno/treino', label: 'Treino', nefroOnly: true },
  { href: '/aluno/desempenho', label: 'Desempenho' },
  { href: '/aluno/desafios', label: 'Desafios' },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AlunoShell({
  children,
  showTreinoNav = false,
}: {
  children: React.ReactNode;
  /** Só quem tem Nefrologia autorizada vê Treino. */
  showTreinoNav?: boolean;
}) {
  const pathname = usePathname() ?? '';
  const hideNav =
    pathname.startsWith('/aluno/prova/') ||
    (/^\/aluno\/treino\/[^/]+\/[^/]+/.test(pathname) && !pathname.includes('/resultado/'));

  if (hideNav) {
    return <>{children}</>;
  }

  const more = MORE_NAV.filter((item) => !('nefroOnly' in item && item.nefroOnly) || showTreinoNav);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2.5 sm:px-4">
          <Link href="/aluno" className="shrink-0 text-base font-bold tracking-tight text-emerald-800 sm:text-lg">
            MedRank
          </Link>
          <nav
            className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Menu do aluno"
          >
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href, 'exact' in item ? item.exact : false);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-2.5 py-2 text-sm font-medium transition sm:px-3 ${
                    active
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <StudentNotificationsBell />
          <details className="relative shrink-0">
            <summary className="cursor-pointer list-none rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
              Mais
            </summary>
            <div className="absolute right-0 z-50 mt-1 min-w-[11rem] rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-slate-200">
              {more.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm ${
                      active ? 'bg-emerald-50 font-semibold text-emerald-900' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <form action="/api/auth/logout" method="post" className="mt-1 border-t border-slate-100 pt-1">
                <button
                  type="submit"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                >
                  Sair
                </button>
              </form>
            </div>
          </details>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl">{children}</main>
    </div>
  );
}
