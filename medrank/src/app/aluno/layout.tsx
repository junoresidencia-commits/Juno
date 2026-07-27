import { AlunoShell } from '@/components/layout/AlunoShell';
import { StudentPasswordGate } from '@/components/aluno/StudentPasswordGate';
import { requireAuth } from '@/lib/auth';
import { profileMustChangePassword } from '@/lib/auth/must-change-password';
import { canAccessNephrologyTreino } from '@/lib/treino/access';

export default async function AlunoLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  const showTreinoNav = await canAccessNephrologyTreino(session.userId, session.profile);
  const mustChange = profileMustChangePassword(session.profile);

  return (
    <StudentPasswordGate mustChange={mustChange}>
      <AlunoShell showTreinoNav={showTreinoNav}>{children}</AlunoShell>
    </StudentPasswordGate>
  );
}
