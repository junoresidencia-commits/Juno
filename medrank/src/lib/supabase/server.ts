import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';

export async function createClient() {
  if (!isSupabaseEnvConfigured()) {
    throw new Error(
      'Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY (ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) com valores reais do projeto.'
    );
  }

  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookies são definidos no middleware
          }
        },
      },
    }
  );
}
