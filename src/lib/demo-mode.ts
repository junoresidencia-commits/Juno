export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === 'true') return true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return url.includes('seu-projeto.supabase.co');
}
