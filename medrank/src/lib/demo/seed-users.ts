import { readDemoStore, writeDemoStore } from '@/lib/demo-store';
import { DEMO_ACCESS } from '@/lib/demo/credentials';

const SEED_STUDENT = {
  id: 'demo-student-aluno',
  name: 'Aluno',
  email: 'aluno@medrank.com',
  password: DEMO_ACCESS.aluno.password,
  active: true,
  approvedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

export function ensureDemoSeedUsers(): void {
  const store = readDemoStore();
  const hasAluno = store.students.some((s) => s.email === SEED_STUDENT.email);
  if (!hasAluno) {
    store.students.push(SEED_STUDENT);
    writeDemoStore(store);
  }
}
