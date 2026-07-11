import { AlunoShell } from '@/components/layout/AlunoShell';

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return <AlunoShell>{children}</AlunoShell>;
}
