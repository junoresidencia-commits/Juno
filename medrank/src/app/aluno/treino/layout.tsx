import { requireAuth } from '@/lib/auth';
import { requireNephrologyTreinoAccess } from '@/lib/treino/access';

export default async function TreinoLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  await requireNephrologyTreinoAccess(session.userId, session.profile);
  return <>{children}</>;
}
