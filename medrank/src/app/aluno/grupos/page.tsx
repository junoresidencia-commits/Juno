import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoGroupsForUser } from '@/lib/groups/demo';
import { createClient } from '@/lib/supabase/server';
import { StudentGroupsPanel } from '@/components/aluno/StudentGroupsPanel';

export default async function AlunoGruposPage() {
  const { userId } = await requireAuth();

  let groups: {
    id: string;
    name: string;
    description: string | null;
    created_by: string | null;
  }[] = [];

  if (usesDemoStore()) {
    groups = getDemoGroupsForUser(userId).map((g) => ({
      id: g.id,
      name: g.name,
      description: g.description,
      created_by: g.created_by,
    }));
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('study_group_members')
      .select('group_id, study_groups(id, name, description, active, created_by)')
      .eq('user_id', userId);

    groups = (data ?? [])
      .map((row) => {
        const g = row.study_groups as unknown as {
          id: string;
          name: string;
          description: string | null;
          active: boolean;
          created_by: string | null;
        } | null;
        if (!g || !g.active) return null;
        return {
          id: g.id,
          name: g.name,
          description: g.description,
          created_by: g.created_by,
        };
      })
      .filter(
        (g): g is {
          id: string;
          name: string;
          description: string | null;
          created_by: string | null;
        } => !!g
      );
  }

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Meus grupos</h1>
      <p className="mt-1 text-sm text-slate-600">
        Crie um grupo, veja rankings e desafios exclusivos entre os membros.
      </p>

      <div className="mt-6">
        <StudentGroupsPanel userId={userId} initialGroups={groups} />
      </div>
    </div>
  );
}
