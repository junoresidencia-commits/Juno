import { NextResponse } from 'next/server';
import { isSkipAuth } from '@/lib/skip-auth';
import { requireAuth } from '@/lib/auth';
import { resetDemoAttempt } from '@/lib/demo/runtime';
import { getTodaysExam } from '@/lib/exams/release';
import { getDemoExams } from '@/lib/demo/content';

export async function POST() {
  if (!isSkipAuth()) {
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
