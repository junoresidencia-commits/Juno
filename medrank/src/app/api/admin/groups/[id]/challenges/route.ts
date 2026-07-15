import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import type { ChallengeType } from '@/types/database';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id: groupId } = await params;
  const weekStart = getWeekStart();

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json({ challenges: [], weekStart, weekEnd: getWeekEnd() });
  }

  const admin = createAdminClient() ?? auth.supabase;
  const { data, error } = await admin
    .from('weekly_challenges')
    .select('*, weekly_challenge_completions(user_id, profiles(name))')
    .eq('group_id', groupId)
    .eq('week_start', weekStart)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ challenges: data ?? [], weekStart, weekEnd: getWeekEnd() });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;
  const { id: groupId } = await params;
  const body = await request.json().catch(() => ({}));

  if (usesDemoStore() || auth.demo) {
    return NextResponse.json(
      { error: 'Desafios de grupo requerem Supabase (modo demo limitado).' },
      { status: 501 }
    );
  }

  const weekStart = body.week_start ?? getWeekStart();
  const weekEnd = body.week_end ?? getWeekEnd();
  const admin = createAdminClient() ?? auth.supabase;

  const { data, error } = await admin
    .from('weekly_challenges')
    .insert({
      title: body.title,
      description: body.description || null,
      week_start: weekStart,
      week_end: weekEnd,
      challenge_type: body.challenge_type as ChallengeType,
      target_value: Number(body.target_value),
      topic: body.topic || null,
      bonus_points: Number(body.bonus_points ?? 50),
      active: true,
      group_id: groupId,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ challenge: data });
}
