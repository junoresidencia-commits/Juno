import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: studentCount },
    { count: questionCount },
    { count: examCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student').eq('active', true),
    supabase.from('questions').select('*', { count: 'exact', head: true }),
    supabase.from('exams').select('*', { count: 'exact', head: true }),
  ]);

  const menu = [
    { href: '/admin/alunos', label: 'Alunos', desc: `${studentCount ?? 0}/10 cadastrados` },
    { href: '/admin/questoes', label: 'Banco de questões', desc: `${questionCount ?? 0} questões` },
    { href: '/admin/provas', label: 'Provas', desc: `${examCount ?? 0} provas criadas` },
    { href: '/admin/importar', label: 'Importar questões', desc: 'Excel / CSV' },
    { href: '/admin/ranking', label: 'Rankings', desc: 'Diário, semanal, geral' },
    { href: '/admin/relatorios', label: 'Relatórios', desc: 'Excel e PDF' },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel do Professor</h1>
          <p className="text-sm text-slate-600">MedRank — administração</p>
        </div>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className="text-sm text-slate-500 hover:text-slate-700">
            Sair
          </button>
        </form>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Alunos ativos</p>
          <p className="text-3xl font-bold text-emerald-700">{studentCount ?? 0}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Questões</p>
          <p className="text-3xl font-bold">{questionCount ?? 0}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Provas</p>
          <p className="text-3xl font-bold">{examCount ?? 0}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-emerald-300"
          >
            <h2 className="font-semibold">{item.label}</h2>
            <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
