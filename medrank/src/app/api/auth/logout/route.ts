import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName } from '@/lib/demo-auth';

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const response = NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')
  );
  response.cookies.set(demoCookieName(), '', { path: '/', maxAge: 0 });
  return response;
}
