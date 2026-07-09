import { redirect } from 'next/navigation';
import { isSkipAuth } from '@/lib/skip-auth';
import { getSessionProfile } from '@/lib/auth';

export default async function Home() {
  if (isSkipAuth()) {
    redirect('/admin');
  }

  const session = await getSessionProfile();

  if (!session) {
    redirect('/login');
  }

  if (session.profile.role === 'admin') {
    redirect('/admin');
  }

  redirect('/aluno');
}
