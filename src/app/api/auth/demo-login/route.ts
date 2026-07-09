import { NextResponse } from 'next/server';
import {
  demoCookieName,
  demoCookieOptions,
  isDemoMode,
  normalizeDemoEmail,
  signDemoSession,
  verifyDemoCredentials,
} from '@/lib/demo-auth';
import { findDemoStudentByEmail } from '@/lib/demo-store';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  if (!isDemoMode()) {
    return NextResponse.json({ error: 'Use login com Supabase' }, { status: 403 });
  }

  const normalized = normalizeDemoEmail(email);
  const pending = findDemoStudentByEmail(normalized);
  if (pending && pending.password === password && !pending.active) {
    return NextResponse.json({
      error: 'Cadastro recebido! Aguarde o professor liberar seu acesso.',
      pending: true,
    }, { status: 403 });
  }

  const user = verifyDemoCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });
  }

  if (user.role === 'student' && user.active === false) {
    return NextResponse.json({
      error: 'Seu acesso ainda não foi liberado pelo professor.',
      pending: true,
    }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(demoCookieName(), signDemoSession(user), demoCookieOptions);
  return response;
}
