import { NextResponse } from 'next/server';
import { getQuestionBankStats } from '@/lib/question-bank/pool';
import { getWrongQuestionIds } from '@/lib/demo-store';
import { getSessionProfile } from '@/lib/auth';

export async function GET() {
  const session = await getSessionProfile();
  const stats = getQuestionBankStats();
  const wrongCount = session ? getWrongQuestionIds(session.userId).length : 0;

  return NextResponse.json({ ...stats, wrongCount });
}
