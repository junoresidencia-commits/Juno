import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName, isDemoMode, parseDemoSession } from '@/lib/demo-auth';
import { isSkipAuth } from '@/lib/skip-auth';

export async function requireAdminApi() {
  if (isSkipAuth()) {
    return { supabase: await createClient(), demo: true as const };
  }

  if (isDemoMode()) {
    const cookieStore = await cookies();
    const demoProfile = parseDemoSession(cookieStore.get(demoCookieName())?.value);
    if (demoProfile?.role === 'admin') {
      return { supabase: await createClient(), demo: true as const };
    }
    if (demoProfile) {
      return { error: NextResponse.json({ error: 'Acesso negado' }, { status: 403 }) };
    }
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: 'Não autenticado' }, { status: 401 }) };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Acesso negado' }, { status: 403 }) };
  }

  return { supabase, demo: false as const };
}
