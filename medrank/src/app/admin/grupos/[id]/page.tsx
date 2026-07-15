import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import { listDemoStudents } from '@/lib/demo-store';
import {
  buildDemoGroupRankings,
  getDemoStudyGroup,
  listDemoGroupMembers,
} from '@/lib/groups/demo';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWeekEnd, getWeekStart, getPeriodBounds } from '@/lib/periods';
import { GroupDetailManager } from '@/components/admin/GroupDetailManager';
import { todayDateStringBrazil } from '@/lib/exams/window';

export default async function AdminGrupoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole('admin');
  const { id } = await params;
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  if (usesDemoStore()) {
    const group = getDemoStudyGroup(id);
    if (!group) notFound();
    const members = listDemoGroupMembers(id);
    const students = listDemoStudents().map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      active: s.active,
    }));

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/admin/grupos" className="text-sm text-emerald-700 hover:underline">
          ← Grupos
        </Link>
        <div className="mt-4">
          <GroupDetailManager
            groupId={group.id}
            groupName={group.name}
            groupDescription={group.description}
            members={members}
            students={students}
            rankings={{
              daily: buildDemoGroupRankings(id, 'daily'),
              weekly: buildDemoGroupRankings(id, 'weekly'),
              monthly: buildDemoGroupRankings(id, 'monthly'),
            }}
            challenges={[]}
            weekStart={weekStart}
            weekEnd={weekEnd}
          />
        </div>
      </div>
    );
  }

  // Prefer service_role: evita 404 quando RLS/is_admin falha na sessão
  const supabase = createAdminClient() ?? (await createClient());
  const { data: group, error: groupError } = await supabase
    .from('study_groups')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (groupError) {
    console.error('[admin/grupos/id]', groupError.message);
  }
  if (!group) notFound();

  const [{ data: members }, { data: students }, { data: challenges }] = await Promise.all([
    supabase
      .from('study_group_members')
      .select('group_id, user_id, joined_at, profiles(name, email)')
      .eq('group_id', id)
      .order('joined_at', { ascending: true }),
    supabase
      .from('profiles')
      .select('id, name, email, active')
      .eq('role', 'student')
      .order('name'),
    supabase
      .from('weekly_challenges')
      .select('*, weekly_challenge_completions(user_id)')
      .eq('group_id', id)
      .eq('week_start', weekStart)
      .order('created_at', { ascending: false }),
  ]);

  const today = todayDateStringBrazil();
  const rankingPeriods = {
    daily: getPeriodBounds('daily', new Date(`${today}T12:00:00`)),
    weekly: getPeriodBounds('weekly', new Date(`${today}T12:00:00`)),
    monthly: getPeriodBounds('monthly', new Date(`${today}T12:00:00`)),
  };

  const rankingResults = await Promise.all(
    (['daily', 'weekly', 'monthly'] as const).map(async (period) => {
      const bounds = rankingPeriods[period];
      const { data } = await supabase
        .from('study_group_rankings')
        .select('user_id, position, total_score, profiles(name)')
        .eq('group_id', id)
        .eq('period_type', period)
        .eq('period_start', bounds.start)
        .order('position', { ascending: true });
      return [period, data ?? []] as const;
    })
  );

  const rankingMap = Object.fromEntries(rankingResults);
  const rankings = {
    daily: (rankingMap.daily ?? []) as {
      user_id: string;
      position: number | null;
      total_score: number;
      profiles?: { name?: string } | null;
    }[],
    weekly: (rankingMap.weekly ?? []) as {
      user_id: string;
      position: number | null;
      total_score: number;
      profiles?: { name?: string } | null;
    }[],
    monthly: (rankingMap.monthly ?? []) as {
      user_id: string;
      position: number | null;
      total_score: number;
      profiles?: { name?: string } | null;
    }[],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/grupos" className="text-sm text-emerald-700 hover:underline">
        ← Grupos
      </Link>
      <div className="mt-4">
        <GroupDetailManager
          groupId={group.id}
          groupName={group.name}
          groupDescription={group.description}
          members={(members ?? []).map((m) => {
            const profile = m.profiles as unknown as { name?: string; email?: string } | null;
            return {
              group_id: m.group_id,
              user_id: m.user_id,
              joined_at: m.joined_at,
              name: profile?.name ?? 'Aluno',
              email: profile?.email ?? '',
            };
          })}
          students={students ?? []}
          rankings={rankings}
          challenges={(challenges ?? []) as never[]}
          weekStart={weekStart}
          weekEnd={weekEnd}
        />
      </div>
    </div>
  );
}
