import { createHmac, timingSafeEqual } from 'crypto';
import type { Profile, UserRole } from '@/types/database';
import { findDemoStudentByEmail } from '@/lib/demo-store';

const COOKIE_NAME = 'medrank_demo_session';

export interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
  active?: boolean;
}

const DEMO_ADMIN: DemoUser = {
  id: 'demo-admin-001',
  email: 'admin@medrank.com',
  name: 'Professor Admin',
  role: 'admin',
  password: 'admin',
  active: true,
};

export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === 'true') return true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return url.includes('seu-projeto.supabase.co');
}

function getSecret(): string {
  return process.env.DEMO_AUTH_SECRET ?? 'medrank-demo-dev-secret';
}

export function normalizeDemoEmail(input: string): string {
  const value = input.trim().toLowerCase();
  if (value === 'admin') return 'admin@medrank.com';
  return value;
}

export function verifyDemoCredentials(email: string, password: string): DemoUser | null {
  const normalized = normalizeDemoEmail(email);

  if (normalized === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    return DEMO_ADMIN;
  }

  const student = findDemoStudentByEmail(normalized);
  if (!student || student.password !== password) return null;

  return {
    id: student.id,
    email: student.email,
    name: student.name,
    role: 'student',
    password: student.password,
    active: student.active,
  };
}

export function signDemoSession(user: DemoUser): string {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      active: user.active !== false,
    })
  ).toString('base64url');
  const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function parseDemoSession(token: string | undefined): Profile | null {
  if (!token || !isDemoMode()) return null;

  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;

  const expected = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      active?: boolean;
    };

    if (data.role === 'student' && data.active === false) return null;

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      active: data.active !== false,
      created_at: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function demoCookieName(): string {
  return COOKIE_NAME;
}

export const demoCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};
