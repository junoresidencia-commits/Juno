import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { OptionLetter } from '@/types/database';

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

  const tags = body.tags
    ? String(body.tags).split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  const { error } = await supabase.from('questions').insert({
    statement: body.statement,
    option_a: body.option_a,
    option_b: body.option_b,
    option_c: body.option_c,
    option_d: body.option_d,
    option_e: body.option_e,
    correct_option: body.correct_option as OptionLetter,
    explanation: body.explanation || null,
    source: body.source || null,
    year: body.year ? Number(body.year) : null,
    specialty: body.specialty || null,
    topic: body.topic || null,
    subtopic: body.subtopic || null,
    difficulty: body.difficulty || null,
    tags,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
