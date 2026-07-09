import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getWeekEnd, getWeekStart } from '@/lib/periods';
import type { ChallengeType } from '@/types/database';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();

  const { data, error } = await supabase
    .from('weekly_challenges')
    .select('*, weekly_challenge_completions(user_id, profiles(name))')
    .eq('week_start', weekStart)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ challenges: data ?? [], weekStart, weekEnd });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = await request.json();
  const weekStart = body.week_start ?? getWeekStart();
  const weekEnd = body.week_end ?? getWeekEnd();

  const { data, error } = await supabase
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
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ challenge: data });
}
