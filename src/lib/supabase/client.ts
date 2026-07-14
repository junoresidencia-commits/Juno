import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';

export function createClient() {
  if (!isSupabaseEnvConfigured()) {
    throw new Error(
      'Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) com valores reais do projeto.'
    );
  }

  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
