import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth';

export default async function RankingAlunoPage() {
  await requireAuth();
  redirect('/aluno');
}
