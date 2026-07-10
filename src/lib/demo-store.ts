import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';
import type { Question } from '@/types/database';
import type { SimuladoMode } from '@/types/simulado';

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
  attempts?: {
    id: string;
    examId: string;
    userId: string;
    startedAt: string;
    finishedAt: string | null;
    durationSeconds: number | null;
    score: number | null;
    totalCorrect: number;
    totalQuestions: number;
    percentage: number | null;
    submittedAutomatically: boolean;
    answers: Record<string, string>;
  }[];
  customQuestions?: Question[];
  simulados?: StoredSimulado[];
  wrongQuestions?: Record<string, string[]>;
}

export interface StoredSimulado {
  id: string;
  userId: string;
  mode: SimuladoMode;
  title: string;
  areaFilter: string | null;
  themeFilter: string | null;
  questionIds: string[];
  durationMinutes: number;
  startedAt: string;
  finishedAt: string | null;
  durationSeconds: number | null;
  score: number | null;
  totalCorrect: number;
  totalQuestions: number;
  percentage: number | null;
  submittedAutomatically: boolean;
  answers: Record<string, string>;
}

const STORE_PATH = join(process.cwd(), 'data', 'demo-store.json');

function defaultStore(): DemoStore {
  return { invites: [], students: [], attempts: [], customQuestions: [], simulados: [], wrongQuestions: {} };
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

export function getDemoAttempts() {
  return readDemoStore().attempts ?? [];
}

export function saveDemoAttempt(attempt: NonNullable<DemoStore['attempts']>[number]) {
  const store = readDemoStore();
  const attempts = store.attempts ?? [];
  const index = attempts.findIndex((item) => item.id === attempt.id);
  if (index >= 0) {
    attempts[index] = attempt;
  } else {
    attempts.push(attempt);
  }
  store.attempts = attempts;
  writeDemoStore(store);
}

export function deleteDemoAttempt(attemptId: string) {
  const store = readDemoStore();
  store.attempts = (store.attempts ?? []).filter((item) => item.id !== attemptId);
  writeDemoStore(store);
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

type ImportableQuestion = {
  statement?: string | null;
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  option_e?: string | null;
  correct_option: Question['correct_option'];
  explanation?: string | null;
  source?: string | null;
  year?: number | null;
  specialty?: string | null;
  topic?: string | null;
  subtopic?: string | null;
  difficulty?: Question['difficulty'];
  tags?: string[];
};

export function getDemoCustomQuestions(): Question[] {
  return readDemoStore().customQuestions ?? [];
}

export function appendDemoImportedQuestions(rows: ImportableQuestion[]): number {
  const store = readDemoStore();
  const current = store.customQuestions ?? [];
  const now = new Date().toISOString();

  for (const row of rows) {
    current.push({
      id: `custom-q-${randomBytes(4).toString('hex')}`,
      statement: row.statement ?? '',
      option_a: row.option_a ?? '',
      option_b: row.option_b ?? '',
      option_c: row.option_c ?? '',
      option_d: row.option_d ?? '',
      option_e: row.option_e ?? '',
      correct_option: row.correct_option,
      explanation: row.explanation ?? null,
      source: row.source ?? null,
      year: row.year ?? null,
      specialty: row.specialty ?? null,
      topic: row.topic ?? null,
      subtopic: row.subtopic ?? null,
      difficulty: row.difficulty ?? 'medio',
      tags: row.tags ?? ['importado'],
      image_url: null,
      bibliography: null,
      created_at: now,
    });
  }

  store.customQuestions = current;
  writeDemoStore(store);
  return rows.length;
}

export function getDemoSimulados(userId?: string): StoredSimulado[] {
  const simulados = readDemoStore().simulados ?? [];
  return userId ? simulados.filter((s) => s.userId === userId) : simulados;
}

export function getDemoSimuladoById(id: string): StoredSimulado | null {
  return getDemoSimulados().find((s) => s.id === id) ?? null;
}

export function saveDemoSimulado(simulado: StoredSimulado): void {
  const store = readDemoStore();
  const simulados = store.simulados ?? [];
  const index = simulados.findIndex((s) => s.id === simulado.id);
  if (index >= 0) {
    simulados[index] = simulado;
  } else {
    simulados.push(simulado);
  }
  store.simulados = simulados;
  writeDemoStore(store);
}

export function getWrongQuestionIds(userId: string): string[] {
  return readDemoStore().wrongQuestions?.[userId] ?? [];
}

export function addWrongQuestionIds(userId: string, questionIds: string[]): void {
  const store = readDemoStore();
  const current = new Set(store.wrongQuestions?.[userId] ?? []);
  questionIds.forEach((id) => current.add(id));
  store.wrongQuestions = { ...(store.wrongQuestions ?? {}), [userId]: [...current] };
  writeDemoStore(store);
}

export function removeCorrectFromWrong(userId: string, questionIds: string[]): void {
  const store = readDemoStore();
  const current = (store.wrongQuestions?.[userId] ?? []).filter((id) => !questionIds.includes(id));
  store.wrongQuestions = { ...(store.wrongQuestions ?? {}), [userId]: current };
  writeDemoStore(store);
}
