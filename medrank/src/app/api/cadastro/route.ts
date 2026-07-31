import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { registerDemoStudentPublic } from '@/lib/demo-store';
import { getRequestOrigin, isSupabaseConfigured } from '@/lib/app-url';
import { parseRequestFields } from '@/lib/parse-request-body';
import { createAdminClient } from '@/lib/supabase/admin';
import { notifyAdminNewSignup } from '@/lib/email/admin-notify';
import { ensureGeneralTrack } from '@/lib/exams/audience';

function cadastroRedirect(request: Request, params: Record<string, string>) {
  const url = new URL('/cadastro', getRequestOrigin(request));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url);
}

/** Cadastro público (sem convite): cria aluno inativo até liberar após PIX. */
export async function POST(request: Request) {
  const { values, formSubmit } = await parseRequestFields(request, [
    'name',
    'email',
    'password',
    'confirm',
  ]);
  const name = values.name;
  const email = values.email;
  const password = values.password;
  const confirm = values.confirm;

  if (formSubmit && password !== confirm) {
    return cadastroRedirect(request, { error: 'As senhas não coincidem.' });
  }

  if (!name || !email || !password || password.length < 4) {
    const message = 'Preencha nome, e-mail e senha (mín. 4 caracteres).';
    if (formSubmit) return cadastroRedirect(request, { error: message });
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const emailNorm = email.trim().toLowerCase();

  if (isDemoMode()) {
    const result = registerDemoStudentPublic(name, emailNorm, password);
    if (!result.ok) {
      if (formSubmit) return cadastroRedirect(request, { error: result.error ?? 'Erro ao cadastrar' });
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    await notifyAdminNewSignup({ name: name.trim(), email: emailNorm, userId: result.id });
    if (formSubmit) return cadastroRedirect(request, { ok: '1', email: emailNorm });
    return NextResponse.json({ ok: true });
  }

  if (!isSupabaseConfigured()) {
    if (formSubmit) return cadastroRedirect(request, { error: 'Sistema indisponível' });
    return NextResponse.json({ error: 'Sistema indisponível' }, { status: 503 });
  }

  const admin = createAdminClient();
  if (!admin) {
    if (formSubmit) return cadastroRedirect(request, { error: 'Sistema indisponível' });
    return NextResponse.json({ error: 'Sistema indisponível' }, { status: 503 });
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email: emailNorm,
    password,
    email_confirm: true,
    user_metadata: { name: name.trim() },
  });

  if (authError) {
    const msg = /already|registered|exists/i.test(authError.message)
      ? 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.'
      : authError.message;
    if (formSubmit) return cadastroRedirect(request, { error: msg });
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const tracks = ensureGeneralTrack([]);
  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    name: name.trim(),
    email: emailNorm,
    role: 'student',
    active: false,
    approved_at: null,
    enabled_tracks: tracks,
  });

  if (profileError) {
    if (/enabled_tracks|schema cache/i.test(profileError.message)) {
      const { error: retryErr } = await admin.from('profiles').insert({
        id: authUser.user.id,
        name: name.trim(),
        email: emailNorm,
        role: 'student',
        active: false,
        approved_at: null,
      });
      if (retryErr) {
        await admin.auth.admin.deleteUser(authUser.user.id);
        if (formSubmit) return cadastroRedirect(request, { error: retryErr.message });
        return NextResponse.json({ error: retryErr.message }, { status: 500 });
      }
    } else {
      await admin.auth.admin.deleteUser(authUser.user.id);
      if (formSubmit) return cadastroRedirect(request, { error: profileError.message });
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }
  }

  try {
    await notifyAdminNewSignup({
      name: name.trim(),
      email: emailNorm,
      userId: authUser.user.id,
    });
  } catch (err) {
    console.error('[cadastro] notify admin failed', err);
  }

  if (formSubmit) return cadastroRedirect(request, { ok: '1', email: emailNorm });
  return NextResponse.json({ ok: true });
}
