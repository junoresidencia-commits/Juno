import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName, isDemoMode } from '@/lib/demo-auth';
import { getRequestOrigin } from '@/lib/app-url';
import { isSupabaseEnvConfigured } from '@/lib/supabase/env';

export async function POST(request: Request) {
  if (isSupabaseEnvConfigured() && !isDemoMode()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // ignora — logout demo / env incompleto
    }
  }

  const response = NextResponse.redirect(new URL('/login', getRequestOrigin(request)));
  response.cookies.set(demoCookieName(), '', { path: '/', maxAge: 0 });
  return response;
}
