import { NextResponse } from 'next/server';
import { usesDemoStore } from '@/lib/demo-data';
import { requireAuth } from '@/lib/auth';
import { resetDemoAttempt } from '@/lib/demo/runtime';
import { getTodaysExam } from '@/lib/exams/release';
import { getDemoExams } from '@/lib/demo/content';

export async function POST() {
  if (!usesDemoStore()) {
    return NextResponse.json({ error: 'Disponível só no modo demo' }, { status: 403 });
  }

  const { userId } = await requireAuth();
  const todayExam = getTodaysExam(getDemoExams(), new Date());
  if (!todayExam) {
    return NextResponse.json({ error: 'Sem prova de hoje' }, { status: 400 });
  }

  resetDemoAttempt(todayExam.id, userId);
  return NextResponse.json({ ok: true });
}
