import { NextResponse } from 'next/server';
import { usesDemoStore } from '@/lib/demo-data';
import { releaseDemoExam } from '@/lib/demo-store';
import { getDemoExams } from '@/lib/demo/content';
import { applyReleaseWindow } from '@/lib/exams/release';
import { requireAdminApi } from '@/lib/api-auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const body = await request.json();
  const releaseDays = body.release_days === 2 ? 2 : 1;

  if (usesDemoStore()) {
    const exam = getDemoExams().find((item) => item.id === id);
    if (!exam) {
      return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
    }
    releaseDemoExam(id, releaseDays);
    const updated = getDemoExams().find((item) => item.id === id);
    return NextResponse.json({ exam: updated });
  }

  if (auth.demo) {
    return NextResponse.json({ error: 'Supabase não configurado' }, { status: 503 });
  }

  const supabase = auth.supabase;
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

  const { data: exam } = await supabase.from('exams').select('*').eq('id', id).single();
  if (!exam) {
    return NextResponse.json({ error: 'Prova não encontrada' }, { status: 404 });
  }

  await supabase
    .from('exams')
    .update({ status: 'closed' })
    .eq('status', 'published')
    .neq('id', id);

  const patch = applyReleaseWindow(exam, releaseDays);
  const { data: updated, error } = await supabase
    .from('exams')
    .update({
      status: patch.status,
      date_available: patch.date_available,
      date_closes: patch.date_closes,
      release_days: patch.release_days,
      show_answers_after_submit: patch.show_answers_after_submit,
      show_answers_when_all_done: patch.show_answers_when_all_done,
      ranking_visible_to_students: patch.ranking_visible_to_students,
      ranking_release: patch.ranking_release,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ exam: updated });
}
