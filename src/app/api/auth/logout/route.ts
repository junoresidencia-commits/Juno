import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { demoCookieName } from '@/lib/demo-auth';
import { getRequestOrigin } from '@/lib/app-url';

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const response = NextResponse.redirect(new URL('/login', getRequestOrigin(request)));
  response.cookies.set(demoCookieName(), '', { path: '/', maxAge: 0 });
  return response;
}
