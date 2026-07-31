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
  // 303: após POST do formulário, o browser deve abrir a página com GET
  // (307 reenvia POST e quebra /cadastro com erro).
  return NextResponse.redirect(url, 303);
}

function friendlyAuthError(message: string): string {
  if (/already|registered|exists|duplicate/i.test(message)) {
    return 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.';
  }
  if (/password|senha/i.test(message) && /(?:6|least|mín|min)/i.test(message)) {
    return 'A senha precisa ter no mínimo 6 caracteres.';
  }
  if (/password|senha/i.test(message) && /weak|forte|strong/i.test(message)) {
    return 'Senha muito fraca. Use letras e números (mín. 6 caracteres).';
  }
  if (/invalid.*email|email.*invalid|valid email/i.test(message)) {
    return 'E-mail inválido. Confira e tente de novo.';
  }
  return message;
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

  if (!name || !email || !password || password.length < 6) {
    const message = 'Preencha nome, e-mail e senha (mín. 6 caracteres).';
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
    const msg = friendlyAuthError(authError.message);
    if (formSubmit) return cadastroRedirect(request, { error: msg });
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (!authUser.user?.id) {
    const message = 'Não foi possível criar a conta. Tente de novo.';
    if (formSubmit) return cadastroRedirect(request, { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const tracks = ensureGeneralTrack([]);
  const baseProfile = {
    id: authUser.user.id,
    name: name.trim(),
    email: emailNorm,
    role: 'student' as const,
    active: false,
    approved_at: null as null,
  };

  let profileError = (
    await admin.from('profiles').insert({
      ...baseProfile,
      enabled_tracks: tracks,
    })
  ).error;

  if (profileError && /enabled_tracks|schema cache/i.test(profileError.message)) {
    profileError = (await admin.from('profiles').insert(baseProfile)).error;
  }

  if (profileError && /duplicate|unique|already exists/i.test(profileError.message)) {
    // Perfil já existia (retry / corrida): atualiza dados e segue.
    const { error: updateErr } = await admin
      .from('profiles')
      .update({
        name: name.trim(),
        email: emailNorm,
        role: 'student',
        active: false,
        approved_at: null,
        enabled_tracks: tracks,
      })
      .eq('id', authUser.user.id);
    profileError = updateErr;
  }

  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    const msg = friendlyAuthError(profileError.message);
    if (formSubmit) return cadastroRedirect(request, { error: msg });
    return NextResponse.json({ error: msg }, { status: 500 });
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
