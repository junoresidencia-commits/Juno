import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { createDemoStudentByAdmin } from '@/lib/demo-store';
import { requireAdminApi } from '@/lib/api-auth';
import { parseRequestFields } from '@/lib/parse-request-body';
import { getRequestOrigin } from '@/lib/app-url';
import { createAdminClient } from '@/lib/supabase/admin';

function redirectAlunos(request: Request, params: Record<string, string>) {
  const url = new URL('/admin/alunos', getRequestOrigin(request));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth && auth.error) return auth.error;

  const { values, formSubmit } = await parseRequestFields(request, ['name', 'email', 'password', 'confirm']);
  const name = values.name;
  const email = values.email.trim().toLowerCase();
  const password = values.password;
  const confirm = values.confirm;

  if (formSubmit && password !== confirm) {
    return redirectAlunos(request, { error: 'As senhas não coincidem.' });
  }

  if (!name || !email || !password) {
    const message = 'Preencha nome, e-mail e senha.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (password.length < 4) {
    const message = 'Senha com no mínimo 4 caracteres.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (isDemoMode() || auth.demo) {
    const result = createDemoStudentByAdmin(name, email, password);
    if (!result.ok) {
      if (formSubmit) return redirectAlunos(request, { error: result.error ?? 'Erro ao cadastrar' });
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    if (formSubmit) {
      return redirectAlunos(request, { ok: '1', email, name });
    }
    return NextResponse.json({ ok: true, id: result.id });
  }

  const admin = createAdminClient();
  if (!admin) {
    const message = 'Service role necessária para criar alunos.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: name.trim() },
  });

  if (authError) {
    if (formSubmit) return redirectAlunos(request, { error: authError.message });
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const now = new Date().toISOString();
  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    name: name.trim(),
    email,
    role: 'student',
    active: true,
    approved_at: now,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    if (formSubmit) return redirectAlunos(request, { error: profileError.message });
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  if (formSubmit) {
    return redirectAlunos(request, { ok: '1', email, name });
  }

  return NextResponse.json({ ok: true });
}
