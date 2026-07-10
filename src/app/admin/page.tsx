import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { formatPercent } from '@/lib/format';
import { fetchStudentPerformance } from '@/lib/reports/data';
import { isSkipAuth } from '@/lib/skip-auth';
import { getDemoReportData, getDemoRanking } from '@/lib/demo/presenters';
import { RankingPreviewList, mapRankingPreviewRows } from '@/components/ranking/RankingPreviewList';
import { getPeriodBounds } from '@/lib/periods';
import { MAX_STUDENTS } from '@/lib/exams/release';

export default async function AdminDashboard() {
  await requireRole('admin');

  if (isSkipAuth()) {
    const demo = getDemoReportData();
    const { rankings: weeklyRankings } = getDemoRanking('weekly');
    const menu = [
      { href: '/admin/alunos', label: 'Alunos', desc: `0/${MAX_STUDENTS} — liberar convites` },
      { href: '/admin/convites', label: 'Convites', desc: 'Gerar link de cadastro' },
      { href: '/admin/questoes', label: 'Banco de questões', desc: `${demo.questionCount} questões ENARE reais` },
      { href: '/admin/provas', label: 'Provas', desc: `${demo.examCount} provas diárias (5 meses)` },
      { href: '/admin/importar', label: 'Importar questões', desc: 'Excel / CSV' },
      { href: '/admin/ranking', label: 'Rankings', desc: 'Diário, semanal, mensal, geral' },
      { href: '/admin/desafios', label: 'Desafios semanais', desc: `${demo.challenges.length} metas ativas` },
      { href: '/admin/relatorios', label: 'Relatórios', desc: 'Excel e PDF' },
    ];
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Painel do Professor</h1>
          <p className="text-sm text-slate-600">Preparatório ENARE/USP com 5 meses de provas e questões reais importadas.</p>
        </header>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Alunos ativos</p><p className="text-3xl font-bold text-emerald-700">0</p></div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Questões</p><p className="text-3xl font-bold">{demo.questionCount}</p></div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Provas</p><p className="text-3xl font-bold">{demo.examCount}</p></div>
        </div>
        <div className="mb-8 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200"><p className="text-sm text-amber-800">Conteúdo demo autoral criado para visualização imediata: provas diárias por 150 dias, ranking e desafios.</p></div>
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ranking da semana</h2>
            <Link href="/admin/ranking?period=weekly" className="text-sm text-emerald-700 hover:underline">
              Ver completo →
            </Link>
          </div>
          <div className="mt-4">
            <RankingPreviewList rankings={weeklyRankings} />
          </div>
        </section>
        <div className="grid gap-4 sm:grid-cols-2">
          {menu.map((item) => <Link key={item.href} href={item.href} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-emerald-300"><h2 className="font-semibold">{item.label}</h2><p className="mt-1 text-sm text-slate-600">{item.desc}</p></Link>)}
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  const [
    { count: studentCount },
    { count: questionCount },
    { count: examCount },
    students,
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student').eq('active', true),
    supabase.from('questions').select('*', { count: 'exact', head: true }),
    supabase.from('exams').select('*', { count: 'exact', head: true }),
    fetchStudentPerformance(supabase),
  ]);

  const topStudent = [...students].sort((a, b) => b.pontuacao - a.pontuacao)[0];

  const weekBounds = getPeriodBounds('weekly');
  const { data: weeklyRankings } = await supabase
    .from('rankings')
    .select('id, position, total_score, user_id, profiles(name)')
    .eq('period_type', 'weekly')
    .eq('period_start', weekBounds.start)
    .order('position', { ascending: true })
    .limit(15);

  const menu = [
    { href: '/admin/alunos', label: 'Alunos', desc: `${studentCount ?? 0}/${MAX_STUDENTS} — liberar convites` },
    { href: '/admin/convites', label: 'Convites', desc: 'Gerar link de cadastro' },
    { href: '/admin/questoes', label: 'Banco de questões', desc: `${questionCount ?? 0} questões` },
    { href: '/admin/provas', label: 'Provas', desc: `${examCount ?? 0} provas criadas` },
    { href: '/admin/importar', label: 'Importar questões', desc: 'Excel / CSV' },
    { href: '/admin/ranking', label: 'Rankings', desc: 'Diário, semanal, mensal, geral' },
    { href: '/admin/desafios', label: 'Desafios semanais', desc: 'Metas e gamificação' },
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

      {topStudent && topStudent.provas > 0 && (
        <div className="mb-8 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-sm text-amber-800">
            Melhor pontuação geral: <strong>{topStudent.name}</strong> ({topStudent.pontuacao} pts · média {formatPercent(topStudent.mediaPercentual)})
          </p>
        </div>
      )}

      <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ranking da semana</h2>
          <Link href="/admin/ranking?period=weekly" className="text-sm text-emerald-700 hover:underline">
            Ver completo →
          </Link>
        </div>
        <div className="mt-4">
          <RankingPreviewList rankings={mapRankingPreviewRows(weeklyRankings)} />
        </div>
      </section>

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
