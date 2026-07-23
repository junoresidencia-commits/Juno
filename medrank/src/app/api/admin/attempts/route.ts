import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';

/** Lista tentativas de uma prova (ex.: forfeits do dia). */
export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role indisponível' }, { status: 503 });

  const url = new URL(request.url);
  const examId = url.searchParams.get('examId');
  const forfeitedOnly = url.searchParams.get('forfeited') === '1';
  if (!examId) return NextResponse.json({ error: 'examId obrigatório' }, { status: 400 });

  let q = admin
    .from('attempts')
    .select('id, user_id, forfeited, finished_at, profiles(name)')
    .eq('exam_id', examId)
    .order('started_at', { ascending: false });

  if (forfeitedOnly) q = q.eq('forfeited', true);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    attempts: (data ?? []).map((row) => {
      const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
      return {
        id: row.id,
        user_id: row.user_id,
        forfeited: Boolean(row.forfeited),
        finished_at: row.finished_at,
        name: (profile as { name?: string } | null)?.name ?? 'Aluno',
      };
    }),
  });
}
