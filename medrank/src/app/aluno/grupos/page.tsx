import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoGroupsForUser } from '@/lib/groups/demo';
import { canCreateLeague } from '@/lib/groups/permissions';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { StudentGroupsPanel } from '@/components/aluno/StudentGroupsPanel';
import { GroupJoinBrowser } from '@/components/aluno/GroupJoinBrowser';
import { NEPHROLOGY_LEAGUE_NAME } from '@/lib/exams/audience';
import Link from 'next/link';

export default async function AlunoGruposPage() {
  const { userId, profile } = await requireAuth();

  let groups: {
    id: string;
    name: string;
    description: string | null;
    created_by: string | null;
  }[] = [];

  let leagueAdmin = canCreateLeague(profile);
  let available: { id: string; name: string; description: string | null }[] = [];
  let pending: {
    id: string;
    group_id: string;
    study_groups?: { id: string; name: string } | null;
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
    const admin = createAdminClient();
    const client = admin ?? supabase;

    const [{ data }, freshProfile, { data: allGroups }, { data: requests }] =
      await Promise.all([
        supabase
          .from('study_group_members')
          .select('group_id, study_groups(id, name, description, active, created_by)')
          .eq('user_id', userId),
        admin
          ? admin.from('profiles').select('league_admin, role').eq('id', userId).maybeSingle()
          : Promise.resolve({ data: null }),
        client
          .from('study_groups')
          .select('id, name, description, exam_audience, active')
          .eq('active', true)
          .order('name'),
        client
          .from('study_group_join_requests')
          .select('id, group_id, status, study_groups(id, name)')
          .eq('user_id', userId)
          .eq('status', 'pending'),
      ]);

    if (freshProfile.data) {
      leagueAdmin = canCreateLeague({
        role: (freshProfile.data.role as 'admin' | 'student') ?? profile.role,
        league_admin: !!freshProfile.data.league_admin,
      });
    }

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

    const memberIds = new Set(groups.map((g) => g.id));
    pending = ((requests ?? []) as unknown as typeof pending);
    available = (allGroups ?? [])
      .filter((g) => {
        if (memberIds.has(g.id)) return false;
        if (
          g.exam_audience === 'nephrology' ||
          g.name.toLowerCase() === NEPHROLOGY_LEAGUE_NAME.toLowerCase()
        ) {
          return false;
        }
        return true;
      })
      .map((g) => ({
        id: g.id,
        name: g.name,
        description: g.description,
      }));
  }

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Grupos</h1>
          <p className="mt-1 text-sm text-slate-600">
            Grupos sociais/equipes para ranking e competição. A prova de Nefrologia é autorização
            separada.
          </p>
        </div>
        <Link
          href="/aluno/ranking/grupos"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          Ranking entre grupos →
        </Link>
      </div>

      <div className="mt-6">
        <GroupJoinBrowser available={available} pending={pending} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
          Meus grupos
        </h2>
        <StudentGroupsPanel
          userId={userId}
          initialGroups={groups}
          canCreate={leagueAdmin}
        />
      </div>
    </div>
  );
}
