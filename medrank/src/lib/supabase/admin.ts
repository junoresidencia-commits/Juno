import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';

export function createAdminClient() {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? '';

  if (!isSupabaseEnvConfigured() || !key || key.includes('sua-service-role')) {
    return null;
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
