import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { StudentForm } from '@/components/admin/StudentForm';
import { StudentActions } from '@/components/admin/StudentActions';

export default async function AlunosPage() {
  await requireRole('admin');
  const supabase = await createClient();

  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('name');

  const activeCount = students?.filter((s) => s.active).length ?? 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold">Alunos</h1>
      <p className="text-sm text-slate-600">{activeCount}/10 alunos ativos</p>

      <div className="mt-6">
        <StudentForm disabled={activeCount >= 10} />
      </div>

      <div className="mt-8 space-y-3">
        {(students ?? []).length === 0 ? (
          <p className="text-slate-500">Nenhum aluno cadastrado.</p>
        ) : (
          students!.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-slate-500">{s.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {s.active ? 'Ativo' : 'Bloqueado'}
                </span>
                <StudentActions studentId={s.id} name={s.name} active={s.active} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
