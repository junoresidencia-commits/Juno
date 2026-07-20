import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { isDemoMode } from '@/lib/demo-auth';
import { listDemoStudents } from '@/lib/demo-store';
import { createClient } from '@/lib/supabase/server';
import { StudentActions } from '@/components/admin/StudentActions';
import { CreateStudentForm } from '@/components/admin/CreateStudentForm';

function StudentStatus({
  active,
  approvedAt,
  leagueAdmin,
}: {
  active: boolean;
  approvedAt: string | null;
  leagueAdmin?: boolean;
}) {
  if (!active && !approvedAt) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
        Aguardando liberação
      </span>
    );
  }
  if (active) {
    return (
      <span className="inline-flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          Ativo
        </span>
        {leagueAdmin ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
            Admin de liga
          </span>
        ) : null}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
      Bloqueado
    </span>
  );
}

export default async function AlunosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; name?: string; email?: string; error?: string }>;
}) {
  await requireRole('admin');
  const params = await searchParams;

  let students: {
    id: string;
    name: string;
    email: string;
    active: boolean;
    approved_at: string | null;
    league_admin: boolean;
  }[] = [];

  if (isDemoMode()) {
    students = listDemoStudents().map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      active: s.active,
      approved_at: s.approvedAt,
      league_admin: !!s.leagueAdmin,
    }));
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('profiles')
      .select('id, name, email, active, approved_at, league_admin')
      .eq('role', 'student')
      .order('created_at', { ascending: false });
    students = (data ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      active: s.active,
      approved_at: s.approved_at,
      league_admin: !!s.league_admin,
    }));
  }

  const pending = students.filter((s) => !s.active && !s.approved_at);
  const others = students.filter((s) => s.active || s.approved_at);
  const activeCount = students.filter((s) => s.active).length;

  const initialSuccess =
    params.ok === '1' && params.name && params.email
      ? { name: params.name, email: params.email }
      : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-slate-900">Alunos</h1>
        <p className="text-sm text-slate-600">{activeCount} ativos · {students.length} cadastrados</p>
      </div>

      <div className="mt-6">
        <CreateStudentForm initialError={params.error} initialSuccess={initialSuccess} />
      </div>

      {pending.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold text-amber-800">Aguardando sua liberação ({pending.length})</h2>
          <div className="mt-4 space-y-3">
            {pending.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">{s.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StudentStatus
                    active={s.active}
                    approvedAt={s.approved_at}
                    leagueAdmin={s.league_admin}
                  />
                  <StudentActions studentId={s.id} name={s.name} active={s.active} pending />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-semibold text-slate-900">Alunos cadastrados</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use <span className="font-medium">Tornar admin de liga</span> para autorizar um aluno a
          criar ligas.
        </p>
        <div className="mt-4 space-y-3">
          {others.length === 0 && pending.length === 0 ? (
            <p className="text-slate-600">Nenhum aluno ainda. Crie o primeiro login acima.</p>
          ) : (
            others.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">{s.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StudentStatus
                    active={s.active}
                    approvedAt={s.approved_at}
                    leagueAdmin={s.league_admin}
                  />
                  <StudentActions
                    studentId={s.id}
                    name={s.name}
                    active={s.active}
                    pending={!s.active && !s.approved_at}
                    leagueAdmin={s.league_admin}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
