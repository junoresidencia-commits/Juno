import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');
  const topic = searchParams.get('topic');
  const search = searchParams.get('search');
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 100);

  let query = supabase
    .from('questions')
    .select('id, statement, source, topic, subtopic, difficulty, year')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (source) query = query.eq('source', source);
  if (topic) query = query.eq('topic', topic);
  if (search) query = query.ilike('statement', `%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions: data ?? [] });
}
