import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { isDemoMode } from '@/lib/demo-auth';
import { listDemoStudents, MAX_STUDENTS } from '@/lib/demo-store';
import { createClient } from '@/lib/supabase/server';
import { StudentActions } from '@/components/admin/StudentActions';

function StudentStatus({ active, approvedAt }: { active: boolean; approvedAt: string | null }) {
  if (!active && !approvedAt) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
        Aguardando liberação
      </span>
    );
  }
  if (active) {
    return (
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
        Ativo
      </span>
    );
  }
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
      Bloqueado
    </span>
  );
}

export default async function AlunosPage() {
  await requireRole('admin');

  let students: {
    id: string;
    name: string;
    email: string;
    active: boolean;
    approved_at: string | null;
  }[] = [];

  if (isDemoMode()) {
    students = listDemoStudents().map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      active: s.active,
      approved_at: s.approvedAt,
    }));
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('profiles')
      .select('id, name, email, active, approved_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false });
    students = data ?? [];
  }

  const pending = students.filter((s) => !s.active && !s.approved_at);
  const others = students.filter((s) => s.active || s.approved_at);
  const activeCount = students.filter((s) => s.active).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alunos</h1>
          <p className="text-sm text-slate-600">{activeCount}/{MAX_STUDENTS} alunos ativos</p>
        </div>
        <Link
          href="/admin/convites"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Gerar convite
        </Link>
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
                  <StudentStatus active={s.active} approvedAt={s.approved_at} />
                  <StudentActions studentId={s.id} name={s.name} active={s.active} pending />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-semibold">Alunos cadastrados</h2>
        <div className="mt-4 space-y-3">
          {others.length === 0 && pending.length === 0 ? (
            <p className="text-slate-500">Nenhum aluno ainda. Gere um link de convite.</p>
          ) : (
            others.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-500">{s.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StudentStatus active={s.active} approvedAt={s.approved_at} />
                  <StudentActions
                    studentId={s.id}
                    name={s.name}
                    active={s.active}
                    pending={!s.active && !s.approved_at}
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
