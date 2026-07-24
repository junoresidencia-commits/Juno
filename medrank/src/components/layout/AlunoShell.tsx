'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StudentNotificationsBell } from '@/components/aluno/StudentNotificationsBell';

const PRIMARY_NAV = [
  { href: '/aluno', label: 'Início', exact: true },
  { href: '/aluno/grupos', label: 'Grupos' },
  { href: '/aluno/ranking', label: 'Ranking' },
  { href: '/aluno/historico', label: 'Histórico' },
] as const;

const MORE_NAV = [
  { href: '/aluno/ranking/grupos', label: 'Entre grupos' },
  { href: '/aluno/simulados', label: 'Outras disputas' },
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
    <div className="aluno-shell min-h-screen">
      {/* Top bar — só marca + avisos (leve no celular) */}
      <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-[#f3f7f5]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
          <Link href="/aluno" className="text-lg font-bold tracking-tight text-teal-900">
            MedRank
          </Link>
          <div className="flex items-center gap-1">
            <StudentNotificationsBell />
            <details className="relative">
              <summary className="cursor-pointer list-none rounded-lg px-2.5 py-2 text-sm font-medium text-teal-900/70 hover:bg-teal-900/5 [&::-webkit-details-marker]:hidden">
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
                        active
                          ? 'bg-teal-50 font-semibold text-teal-900'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <form action="/api/auth/logout" method="post" className="mt-1 border-t border-slate-100 pt-1">
                  <button
                    type="submit"
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-50"
                  >
                    Sair
                  </button>
                </form>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl pb-24">{children}</main>

      {/* Bottom tabs — navegação principal no polegar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-900/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
        aria-label="Menu principal"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-1 px-2 py-1.5">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(pathname, item.href, 'exact' in item ? item.exact : false);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center rounded-xl px-2 py-2 text-center text-xs font-semibold transition ${
                  active ? 'bg-teal-800 text-white' : 'text-teal-900/70 hover:bg-teal-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
