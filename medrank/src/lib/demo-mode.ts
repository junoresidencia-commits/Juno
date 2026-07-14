import { isSupabaseEnvConfigured } from '@/lib/supabase/env';

export function isDemoMode(): boolean {
  if (process.env.DEMO_MODE === 'true') return true;
  // Sem env real → opera em demo (evita crash com URL/chave vazia ou placeholder)
  return !isSupabaseEnvConfigured();
}
