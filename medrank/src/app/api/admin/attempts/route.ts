import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/api-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { todayDateStringBrazil } from '@/lib/exams/window';

/**
 * Lista tentativas.
 * - ?examId=…&forfeited=1 → forfeits daquela prova
 * - ?forfeited=1&date=YYYY-MM-DD → todos os forfeits do dia (padrão: hoje)
 * - ?userId=…&forfeited=1 → forfeits de um aluno
 */
export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Service role indisponível' }, { status: 503 });

  const url = new URL(request.url);
  const examId = url.searchParams.get('examId');
  const userId = url.searchParams.get('userId');
  const forfeitedOnly = url.searchParams.get('forfeited') === '1';
  const date = url.searchParams.get('date') || todayDateStringBrazil();
  const qName = (url.searchParams.get('q') || '').trim().toLowerCase();

  if (examId) {
    let q = admin
      .from('attempts')
      .select('id, user_id, forfeited, finished_at, started_at, exams(id, title, audience, date_available), profiles(name, email)')
      .eq('exam_id', examId)
      .order('started_at', { ascending: false });

    if (forfeitedOnly) q = q.eq('forfeited', true);

    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      attempts: mapRows(data ?? [], qName),
    });
  }

  // Forfeits do dia (todas as provas) — painel principal de liberação
  const { data: exams, error: examErr } = await admin
    .from('exams')
    .select('id, title, audience, date_available')
    .eq('date_available', date)
    .eq('exam_kind', 'daily');

  if (examErr) return NextResponse.json({ error: examErr.message }, { status: 500 });
  const examIds = (exams ?? []).map((e) => e.id);
  if (examIds.length === 0) {
    return NextResponse.json({ date, attempts: [] });
  }

  let q = admin
    .from('attempts')
    .select('id, user_id, forfeited, finished_at, started_at, exam_id, exams(id, title, audience, date_available), profiles(name, email)')
    .in('exam_id', examIds)
    .order('finished_at', { ascending: false });

  if (forfeitedOnly) q = q.eq('forfeited', true);
  if (userId) q = q.eq('user_id', userId);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    date,
    attempts: mapRows(data ?? [], qName),
  });
}

function mapRows(
  data: Array<Record<string, unknown>>,
  qName: string
) {
  const rows = data.map((row) => {
    const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
    const exam = Array.isArray(row.exams) ? row.exams[0] : row.exams;
    const p = profile as { name?: string; email?: string } | null;
    const e = exam as {
      id?: string;
      title?: string;
      audience?: string;
      date_available?: string;
    } | null;
    return {
      id: String(row.id),
      user_id: String(row.user_id),
      forfeited: Boolean(row.forfeited),
      finished_at: row.finished_at as string | null,
      started_at: row.started_at as string | null,
      name: p?.name ?? 'Aluno',
      email: p?.email ?? '',
      exam_id: e?.id ?? (row.exam_id as string | undefined) ?? null,
      exam_title: e?.title ?? 'Prova',
      exam_audience: e?.audience ?? null,
      exam_date: e?.date_available ?? null,
    };
  });

  if (!qName) return rows;
  return rows.filter(
    (r) =>
      r.name.toLowerCase().includes(qName) ||
      r.email.toLowerCase().includes(qName)
  );
}
