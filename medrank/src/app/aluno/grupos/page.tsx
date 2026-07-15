import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoGroupsForUser } from '@/lib/groups/demo';
import { createClient } from '@/lib/supabase/server';

export default async function AlunoGruposPage() {
  const { userId } = await requireAuth();

  let groups: { id: string; name: string; description: string | null }[] = [];

  if (usesDemoStore()) {
    groups = getDemoGroupsForUser(userId);
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('study_group_members')
      .select('group_id, study_groups(id, name, description, active)')
      .eq('user_id', userId);

    groups = (data ?? [])
      .map((row) => {
        const g = row.study_groups as unknown as {
          id: string;
          name: string;
          description: string | null;
          active: boolean;
        } | null;
        if (!g || !g.active) return null;
        return { id: g.id, name: g.name, description: g.description };
      })
      .filter((g): g is { id: string; name: string; description: string | null } => !!g);
  }

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Meus grupos</h1>
      <p className="mt-1 text-sm text-slate-600">
        Rankings e desafios exclusivos entre os membros de cada grupo.
      </p>

      <div className="mt-6 space-y-3">
        {groups.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-600 ring-1 ring-slate-200">
            Você ainda não participa de nenhum grupo. Peça ao professor para te adicionar.
          </div>
        ) : (
          groups.map((g) => (
            <Link
              key={g.id}
              href={`/aluno/grupos/${g.id}`}
              className="block rounded-2xl bg-white px-5 py-4 ring-1 ring-slate-200 hover:ring-emerald-300"
            >
              <p className="font-semibold text-slate-900">{g.name}</p>
              {g.description ? <p className="mt-1 text-sm text-slate-600">{g.description}</p> : null}
              <p className="mt-2 text-sm font-medium text-emerald-700">Ver ranking do grupo →</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
