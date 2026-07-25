'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/admin', label: 'Painel', exact: true },
  { href: '/admin/alunos', label: 'Alunos' },
  { href: '/admin/pagamentos', label: 'PIX' },
  { href: '/admin/grupos', label: 'Grupos' },
  { href: '/admin/questoes', label: 'Questões' },
  { href: '/admin/provas', label: 'Provas' },
  { href: '/admin/liberacoes', label: 'Liberar' },
  { href: '/admin/importar', label: 'Importar' },
  { href: '/admin/ranking', label: 'Ranking' },
  { href: '/admin/desafios', label: 'Desafios' },
  { href: '/admin/desafio-expert', label: 'Expert' },
  { href: '/admin/relatorios', label: 'Relatórios' },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/admin" className="shrink-0 text-lg font-bold text-emerald-700">
              MedRank <span className="hidden font-normal text-slate-500 sm:inline">· Professor</span>
            </Link>
            <form action="/api/auth/logout" method="post" className="shrink-0">
              <button
                type="submit"
                className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                Sair
              </button>
            </form>
          </div>
          <nav
            className="mt-2 flex gap-1 overflow-x-auto pb-1 md:flex-wrap md:gap-2"
            aria-label="Menu do professor"
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
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl">{children}</main>
    </div>
  );
}
