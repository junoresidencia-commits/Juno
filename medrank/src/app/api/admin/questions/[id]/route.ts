import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';
import { getDemoQuestions } from '@/lib/demo/content';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const { id } = await ctx.params;

  if (usesDemoStore()) {
    const q = getDemoQuestions().find((x) => x.id === id);
    if (!q) return NextResponse.json({ error: 'Não encontrada' }, { status: 404 });
    return NextResponse.json({ question: q, log: [] });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role necessária' }, { status: 503 });

  const [{ data: question, error }, { data: log }] = await Promise.all([
    admin.from('questions').select('*').eq('id', id).maybeSingle(),
    admin
      .from('question_bank_audit_log')
      .select('*')
      .eq('question_id', id)
      .order('created_at', { ascending: false })
      .limit(30),
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!question) return NextResponse.json({ error: 'Não encontrada' }, { status: 404 });

  return NextResponse.json({ question, log: log ?? [] });
}
