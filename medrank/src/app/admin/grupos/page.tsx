import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { listDemoStudyGroups } from '@/lib/groups/demo';
import { createClient } from '@/lib/supabase/server';
import { GroupsManager } from '@/components/admin/GroupsManager';

export default async function AdminGruposPage() {
  await requireRole('admin');

  let groups: {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    member_count: number;
  }[] = [];

  if (usesDemoStore()) {
    groups = listDemoStudyGroups();
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('study_groups')
      .select('id, name, description, active, created_at, study_group_members(count)')
      .order('created_at', { ascending: false });

    groups = (data ?? []).map((g) => {
      const countRaw = (g as { study_group_members?: { count: number }[] }).study_group_members;
      return {
        id: g.id,
        name: g.name,
        description: g.description,
        active: g.active,
        member_count: Array.isArray(countRaw) ? Number(countRaw[0]?.count ?? 0) : 0,
      };
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Grupos</h1>
        <p className="text-sm text-slate-600">
          Crie ligas, turmas e cohorts com ranking e desafios exclusivos. Um aluno pode estar em vários
          grupos.
        </p>
      </div>
      <GroupsManager initialGroups={groups} />
    </div>
  );
}
