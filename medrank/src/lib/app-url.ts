import { isDemoMode } from '@/lib/demo-mode';
import { headers } from 'next/headers';
import { isSupabaseEnvConfigured } from '@/lib/supabase/env';

export function getAppBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

/** Origin público da requisição (túnel/proxy), não o host interno do servidor */
export function getRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, '');
  }

  const host = request.headers.get('host');
  if (host && !host.startsWith('0.0.0.0') && host !== 'localhost:3000') {
    const proto = host.includes('localhost') ? 'http' : 'https';
    return `${proto}://${host}`.replace(/\/$/, '');
  }

  return getAppBaseUrl();
}

/** Origin em Server Components (usa headers do request atual) */
export async function getServerOrigin(): Promise<string> {
  const h = await headers();
  const forwardedHost = h.get('x-forwarded-host');
  const forwardedProto = h.get('x-forwarded-proto') ?? 'https';
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, '');
  }

  const host = h.get('host');
  if (host && !host.startsWith('0.0.0.0') && host !== 'localhost:3000') {
    const proto = host.includes('localhost') ? 'http' : 'https';
    return `${proto}://${host}`.replace(/\/$/, '');
  }

  return getAppBaseUrl();
}

export function buildInviteLinkFromOrigin(origin: string, token: string): string {
  return `${origin.replace(/\/$/, '')}/cadastro/${token}`;
}

export function buildInviteLink(token: string): string {
  return buildInviteLinkFromOrigin(getAppBaseUrl(), token);
}

export function isSupabaseConfigured(): boolean {
  return !isDemoMode() && isSupabaseEnvConfigured();
}
