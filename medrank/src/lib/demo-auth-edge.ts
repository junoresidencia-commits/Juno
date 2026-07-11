import type { Profile, UserRole } from '@/types/database';

const COOKIE_NAME = 'medrank_demo_session';

export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === 'true') return true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return url.includes('seu-projeto.supabase.co');
}

export function demoCookieName(): string {
  return COOKIE_NAME;
}

/** Parser leve para middleware (Edge Runtime) — sem verificação HMAC */
export function parseDemoSessionLite(token: string | undefined): Profile | null {
  if (!token || !isDemoMode()) return null;

  const [payload] = token.split('.');
  if (!payload) return null;

  try {
    const json = typeof atob !== 'undefined'
      ? atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      : Buffer.from(payload, 'base64url').toString();
    const data = JSON.parse(json) as {
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
