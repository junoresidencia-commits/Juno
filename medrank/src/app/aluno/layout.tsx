import { AlunoShell } from '@/components/layout/AlunoShell';
import { requireAuth } from '@/lib/auth';
import { canAccessNephrologyTreino } from '@/lib/treino/access';

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  const showTreinoNav = await canAccessNephrologyTreino(session.userId, session.profile);

  return <AlunoShell showTreinoNav={showTreinoNav}>{children}</AlunoShell>;
}
