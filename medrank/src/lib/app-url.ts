import { isDemoMode } from '@/lib/demo-mode';

export function getAppBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function buildInviteLink(token: string): string {
  return `${getAppBaseUrl()}/cadastro/${token}`;
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  return !isDemoMode() && url.includes('supabase.co') && !key.includes('sua-anon-key');
}
