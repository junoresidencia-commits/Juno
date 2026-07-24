import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { usesDemoStore } from '@/lib/demo-data';
import {
  buildDemoGroupRankings,
  getDemoGroupsForUser,
  getDemoStudyGroup,
} from '@/lib/groups/demo';
import { createClient } from '@/lib/supabase/server';
import { GROUP_RANKING_PERIODS, getPeriodBounds } from '@/lib/periods';
import type { PeriodType } from '@/types/database';
import { RankingPeriodNav } from '@/components/ranking/RankingPeriodNav';
import { todayDateStringBrazil } from '@/lib/exams/window';
import { CHALLENGE_TYPE_LABELS } from '@/lib/challenges';
import { DeleteOwnGroupButton } from '@/components/aluno/DeleteOwnGroupButton';
import { GroupJoinRequestsPanel } from '@/components/aluno/GroupJoinRequestsPanel';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function AlunoGrupoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const { userId } = await requireAuth();
  const { id } = await params;
  const { period: periodParam } = await searchParams;
  const allowed = GROUP_RANKING_PERIODS.map((p) => p.value);
  const period = allowed.includes(periodParam as PeriodType)
    ? (periodParam as PeriodType)
    : 'daily';

  if (usesDemoStore()) {
    const mine = getDemoGroupsForUser(userId).some((g) => g.id === id);
    const group = getDemoStudyGroup(id);
    if (!group || !mine) notFound();
    const rankings = buildDemoGroupRankings(id, period);
    const mineRow = rankings.find((r) => r.user_id === userId);

    const isCreator = group.created_by === userId;

    return (
      <div className="mx-auto w-full px-4 py-6 md:px-6">
        <Link href="/aluno/grupos" className="text-sm text-emerald-700">
          ← Meus grupos
        </Link>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
            {group.description ? <p className="text-slate-600">{group.description}</p> : null}
          </div>
          {isCreator ? (
            <DeleteOwnGroupButton groupId={id} groupName={group.name} />
          ) : null}
        </div>
        <RankingPeriodNav
          basePath={`/aluno/grupos/${id}`}
          current={period}
          periods={GROUP_RANKING_PERIODS}
        />
        {mineRow ? (
          <div className="mt-4 rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">
              Você: {mineRow.position}º · {mineRow.total_score} pts
            </p>
          </div>
        ) : null}
        <ol className="mt-6 space-y-2">
          {rankings.map((r) => {
            const isMe = r.user_id === userId;
            return (
              <li
                key={r.user_id}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white ring-1 ring-slate-200'
                }`}
              >
                <span className="font-medium text-slate-900">
                  {r.position}º {r.profiles?.name}
                  {isMe ? ' (você)' : ''}
                </span>
                <span className="text-sm text-slate-600">{r.total_score} pts</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: membership } = await supabase
    .from('study_group_members')
    .select('group_id, study_groups(*)')
    .eq('group_id', id)
    .eq('user_id', userId)
    .maybeSingle();

  if (!membership) notFound();
  const group = membership.study_groups as unknown as {
    id: string;
    name: string;
    description: string | null;
    active: boolean;
    created_by: string | null;
  };
  if (!group?.active) notFound();
  const isCreator = group.created_by === userId;

  const today = todayDateStringBrazil();
  const bounds = getPeriodBounds(period, new Date(`${today}T12:00:00`));

  const admin = createAdminClient();
  const [{ data: rankings }, { data: challenges }, joinRequestsRes] = await Promise.all([
    supabase
      .from('study_group_rankings')
      .select('id, user_id, position, total_score, profiles(name)')
      .eq('group_id', id)
      .eq('period_type', period)
      .eq('period_start', bounds.start)
      .order('position', { ascending: true }),
    supabase
      .from('weekly_challenges')
      .select('id, title, description, challenge_type, target_value, bonus_points, topic, weekly_challenge_completions(user_id)')
      .eq('group_id', id)
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(8),
    isCreator && admin
      ? admin
          .from('study_group_join_requests')
          .select('id, user_id, created_at, profiles(name, email)')
          .eq('group_id', id)
          .eq('status', 'pending')
          .order('created_at', { ascending: true })
      : Promise.resolve({ data: [] as { id: string; user_id: string; created_at: string; profiles: unknown }[] }),
  ]);

  const mineRow = (rankings ?? []).find((r) => r.user_id === userId);
  const joinRequests = (joinRequestsRes.data ?? []).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    created_at: r.created_at,
    profiles: r.profiles as { name?: string; email?: string } | null,
  }));

  return (
    <div className="mx-auto w-full px-4 py-6 md:px-6">
      <Link href="/aluno/grupos" className="text-sm text-emerald-700">
        ← Meus grupos
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
          {group.description ? <p className="text-slate-600">{group.description}</p> : null}
        </div>
        {isCreator ? (
          <DeleteOwnGroupButton groupId={id} groupName={group.name} />
        ) : null}
      </div>

      {isCreator && joinRequests.length > 0 ? (
        <div className="mt-4">
          <GroupJoinRequestsPanel groupId={id} initialRequests={joinRequests} />
        </div>
      ) : null}

      <RankingPeriodNav
        basePath={`/aluno/grupos/${id}`}
        current={period}
        periods={GROUP_RANKING_PERIODS}
      />

      {mineRow ? (
        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Você: {mineRow.position}º · {mineRow.total_score} pts
          </p>
        </div>
      ) : null}

      <ol className="mt-6 space-y-2">
        {(rankings ?? []).length === 0 ? (
          <li className="text-sm text-slate-600">Aguardando resultados neste período…</li>
        ) : (
          (rankings ?? []).map((r) => {
            const name =
              (r.profiles as unknown as { name?: string } | null)?.name ?? 'Aluno';
            const isMe = r.user_id === userId;
            return (
              <li
                key={r.id}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                  isMe ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-white ring-1 ring-slate-200'
                }`}
              >
                <span className="font-medium text-slate-900">
                  {r.position}º {name}
                  {isMe ? ' (você)' : ''}
                </span>
                <span className="text-sm text-slate-600">{r.total_score} pts</span>
              </li>
            );
          })
        )}
      </ol>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Desafios do grupo</h2>
        <div className="mt-3 space-y-2">
          {(challenges ?? []).length === 0 ? (
            <p className="text-sm text-slate-600">Nenhum desafio exclusivo neste grupo.</p>
          ) : (
            (challenges ?? []).map((c) => {
              const done = (c.weekly_challenge_completions ?? []).some(
                (row: { user_id: string }) => row.user_id === userId
              );
              return (
                <div key={c.id} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{c.title}</p>
                      <p className="text-sm text-slate-600">
                        {CHALLENGE_TYPE_LABELS[c.challenge_type as keyof typeof CHALLENGE_TYPE_LABELS]}{' '}
                        · meta {c.target_value}
                        {c.topic ? ` · ${c.topic}` : ''}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
                        done ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {done ? 'Concluído' : 'Em andamento'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
