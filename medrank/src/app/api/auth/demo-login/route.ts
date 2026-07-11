import { NextResponse } from 'next/server';
import {
  demoCookieName,
  demoCookieOptions,
  isDemoMode,
  normalizeDemoEmail,
  signDemoSession,
  verifyDemoCredentials,
} from '@/lib/demo-auth';
import { getRequestOrigin } from '@/lib/app-url';
import { ensureDemoSeedUsers } from '@/lib/demo/seed-users';
import { findDemoStudentByEmail } from '@/lib/demo-store';

function loginRedirect(request: Request, path: string, params?: Record<string, string>) {
  const url = new URL(path, getRequestOrigin(request));
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return NextResponse.redirect(url);
}

async function readCredentials(request: Request): Promise<{
  email: string;
  password: string;
  formSubmit: boolean;
}> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    return {
      email: String(body.email ?? ''),
      password: String(body.password ?? ''),
      formSubmit: false,
    };
  }

  const form = await request.formData();
  return {
    email: String(form.get('email') ?? ''),
    password: String(form.get('password') ?? ''),
    formSubmit: true,
  };
}

export async function POST(request: Request) {
  const { email, password, formSubmit } = await readCredentials(request);

  if (!isDemoMode()) {
    if (formSubmit) {
      return loginRedirect(request, '/login', { error: 'unavailable' });
    }
    return NextResponse.json({ error: 'Use login com Supabase' }, { status: 403 });
  }

  ensureDemoSeedUsers();

  const normalized = normalizeDemoEmail(email);
  const pending = findDemoStudentByEmail(normalized);
  if (pending && pending.password === password && !pending.active) {
    const message = 'Cadastro recebido! Aguarde o professor liberar seu acesso.';
    if (formSubmit) {
      return loginRedirect(request, '/login', { error: 'pending' });
    }
    return NextResponse.json({ error: message, pending: true }, { status: 403 });
  }

  const user = verifyDemoCredentials(email, password);
  if (!user) {
    if (formSubmit) {
      return loginRedirect(request, '/login', { error: 'invalid' });
    }
    return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });
  }

  if (user.role === 'student' && user.active === false) {
    const message = 'Seu acesso ainda não foi liberado pelo professor.';
    if (formSubmit) {
      return loginRedirect(request, '/login', { error: 'pending' });
    }
    return NextResponse.json({ error: message, pending: true }, { status: 403 });
  }

  const target = user.role === 'admin' ? '/admin' : '/aluno';

  if (formSubmit) {
    const response = loginRedirect(request, target);
    response.cookies.set(demoCookieName(), signDemoSession(user), demoCookieOptions);
    return response;
  }

  const response = NextResponse.json({ ok: true, role: user.role });
  response.cookies.set(demoCookieName(), signDemoSession(user), demoCookieOptions);
  return response;
}
