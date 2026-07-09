import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export interface DemoInvite {
  token: string;
  createdAt: string;
  expiresAt: string;
  usedAt: string | null;
  usedBy: string | null;
  note: string | null;
}

export interface DemoStudent {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  approvedAt: string | null;
  createdAt: string;
}

interface DemoStore {
  invites: DemoInvite[];
  students: DemoStudent[];
}

const STORE_PATH = join(process.cwd(), 'data', 'demo-store.json');

function defaultStore(): DemoStore {
  return { invites: [], students: [] };
}

export function readDemoStore(): DemoStore {
  try {
    if (!existsSync(STORE_PATH)) {
      mkdirSync(join(process.cwd(), 'data'), { recursive: true });
      writeFileSync(STORE_PATH, JSON.stringify(defaultStore(), null, 2));
      return defaultStore();
    }
    return JSON.parse(readFileSync(STORE_PATH, 'utf-8')) as DemoStore;
  } catch {
    return defaultStore();
  }
}

export function writeDemoStore(store: DemoStore): void {
  mkdirSync(join(process.cwd(), 'data'), { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export function generateInviteToken(): string {
  return randomBytes(16).toString('hex');
}

export function createDemoInvite(note?: string): DemoInvite {
  const store = readDemoStore();
  const token = generateInviteToken();
  const now = new Date();
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const invite: DemoInvite = {
    token,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    usedAt: null,
    usedBy: null,
    note: note ?? null,
  };

  store.invites.unshift(invite);
  writeDemoStore(store);
  return invite;
}

export function validateDemoInvite(token: string): { valid: boolean; error?: string } {
  const store = readDemoStore();
  const invite = store.invites.find((i) => i.token === token);

  if (!invite) return { valid: false, error: 'Link inválido ou expirado.' };
  if (invite.usedAt) return { valid: false, error: 'Este link já foi utilizado.' };
  if (new Date(invite.expiresAt) < new Date()) {
    return { valid: false, error: 'Este link expirou. Peça um novo ao professor.' };
  }

  const activeCount = store.students.filter((s) => s.active).length;
  if (activeCount >= 10) return { valid: false, error: 'Turma cheia (10 alunos). Peça ao professor.' };

  return { valid: true };
}

export function registerDemoStudent(
  token: string,
  name: string,
  email: string,
  password: string
): { ok: boolean; error?: string } {
  const validation = validateDemoInvite(token);
  if (!validation.valid) return { ok: false, error: validation.error };

  const store = readDemoStore();
  const emailNorm = email.trim().toLowerCase();

  if (store.students.some((s) => s.email === emailNorm)) {
    return { ok: false, error: 'Este e-mail já está cadastrado.' };
  }

  const id = `demo-student-${randomBytes(4).toString('hex')}`;
  const student: DemoStudent = {
    id,
    name: name.trim(),
    email: emailNorm,
    password,
    active: false,
    approvedAt: null,
    createdAt: new Date().toISOString(),
  };

  const inviteIdx = store.invites.findIndex((i) => i.token === token);
  store.invites[inviteIdx].usedAt = new Date().toISOString();
  store.invites[inviteIdx].usedBy = id;
  store.students.push(student);
  writeDemoStore(store);

  return { ok: true };
}

export function findDemoStudentByEmail(email: string): DemoStudent | null {
  const store = readDemoStore();
  return store.students.find((s) => s.email === email.trim().toLowerCase()) ?? null;
}

export function approveDemoStudent(id: string): boolean {
  const store = readDemoStore();
  const student = store.students.find((s) => s.id === id);
  if (!student) return false;

  const activeCount = store.students.filter((s) => s.active && s.id !== id).length;
  if (activeCount >= 10) return false;

  student.active = true;
  student.approvedAt = new Date().toISOString();
  writeDemoStore(store);
  return true;
}

export function listDemoStudents(): DemoStudent[] {
  return readDemoStore().students;
}

export function listDemoInvites(): DemoInvite[] {
  return readDemoStore().invites;
}
