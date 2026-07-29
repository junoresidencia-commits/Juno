import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName, isDemoMode, parseDemoSession } from '@/lib/demo-auth';
import { isSkipAuth } from '@/lib/skip-auth';

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

export type AdminApiAuth =
  | { error: NextResponse }
  | { demo: true; supabase: null }
  | { demo: false; supabase: SupabaseServerClient };

export async function requireAdminApi(): Promise<AdminApiAuth> {
  if (isSkipAuth()) {
    return { supabase: null, demo: true };
  }

  if (isDemoMode()) {
    const cookieStore = await cookies();
    const demoProfile = parseDemoSession(cookieStore.get(demoCookieName())?.value);
    if (demoProfile?.role === 'admin') {
      return { supabase: null, demo: true };
    }
    if (demoProfile) {
      return { error: NextResponse.json({ error: 'Acesso negado' }, { status: 403 }) };
    }
    return { error: NextResponse.json({ error: 'Não autenticado' }, { status: 401 }) };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: 'Não autenticado' }, { status: 401 }) };
  }

  // Prefer service_role para ler o papel — evita 403 se RLS/is_admin falhar na sessão
  const { createAdminClient } = await import('@/lib/supabase/admin');
  const admin = createAdminClient();
  const roleClient = admin ?? supabase;
  const { data: profile } = await roleClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profile?.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Acesso negado' }, { status: 403 }) };
  }

  return { supabase, demo: false };
}
