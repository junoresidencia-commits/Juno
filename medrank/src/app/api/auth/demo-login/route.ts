import { NextResponse } from 'next/server';
import {
  demoCookieName,
  demoCookieOptions,
  isDemoMode,
  signDemoSession,
  verifyDemoCredentials,
} from '@/lib/demo-auth';

export async function POST(request: Request) {
  if (!isDemoMode()) {
    return NextResponse.json({ error: 'Modo demonstração desativado' }, { status: 403 });
  }

  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  const user = verifyDemoCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: 'E-mail ou senha inválidos' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(demoCookieName(), signDemoSession(user), demoCookieOptions);
  return response;
}
