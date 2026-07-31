import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { registerDemoStudent, validateDemoInvite } from '@/lib/demo-store';
import { getRequestOrigin, isSupabaseConfigured } from '@/lib/app-url';
import { parseRequestFields } from '@/lib/parse-request-body';
import { createAdminClient } from '@/lib/supabase/admin';

async function validateSupabaseInvite(token: string) {
  const admin = createAdminClient();
  if (!admin) return { valid: false as const, error: 'Sistema indisponível' };

  const { data: invite } = await admin
    .from('invite_tokens')
    .select('*')
    .eq('token', token)
    .maybeSingle();

  if (!invite) return { valid: false as const, error: 'Link inválido ou expirado.' };
  if (invite.used_at) return { valid: false as const, error: 'Este link já foi utilizado.' };
  if (new Date(invite.expires_at) < new Date()) {
    return { valid: false as const, error: 'Este link expirou.' };
  }
  return { valid: true as const, email: invite.email as string | null };
}

function cadastroRedirect(request: Request, token: string, params: Record<string, string>) {
  const url = new URL(`/cadastro/${token}`, getRequestOrigin(request));
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
  if (/invalid.*email|email.*invalid|valid email/i.test(message)) {
    return 'E-mail inválido. Confira e tente de novo.';
  }
  return message;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (isDemoMode()) {
    const result = validateDemoInvite(token);
    return NextResponse.json({ valid: result.valid, error: result.error, email: result.email });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ valid: false, error: 'Sistema indisponível' });
  }

  const result = await validateSupabaseInvite(token);
  return NextResponse.json(result);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { values, formSubmit } = await parseRequestFields(request, ['name', 'email', 'password', 'confirm']);
  const name = values.name;
  const email = values.email;
  const password = values.password;
  const confirm = values.confirm;

  if (formSubmit && password !== confirm) {
    return cadastroRedirect(request, token, { error: 'As senhas não coincidem.' });
  }

  if (!name || !email || !password || password.length < 6) {
    const message = 'Preencha nome, e-mail e senha (mín. 6 caracteres).';
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: message });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (isDemoMode()) {
    const result = registerDemoStudent(token, name, email, password);
    if (!result.ok) {
      if (formSubmit) {
        return cadastroRedirect(request, token, { error: result.error ?? 'Erro ao cadastrar' });
      }
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    try {
      const { notifyAdminNewSignup } = await import('@/lib/email/admin-notify');
      await notifyAdminNewSignup({ name: name.trim(), email: email.trim().toLowerCase() });
    } catch {
      /* ignore */
    }
    try {
      const { notifyStudentSignupPending } = await import('@/lib/email/student-notify');
      await notifyStudentSignupPending({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });
    } catch {
      /* ignore */
    }

    const message =
      'Cadastro realizado! Pague o PIX (1 mês R$ 30 · promo R$ 19,90/mês · 3 meses R$ 50 com −R$ 10), envie o comprovante no WhatsApp e aguarde a liberação.';
    if (formSubmit) {
      return cadastroRedirect(request, token, {
        ok: '1',
        email: email.trim().toLowerCase(),
        name: name.trim(),
      });
    }
    return NextResponse.json({ ok: true, message });
  }

  if (!isSupabaseConfigured()) {
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: 'Sistema indisponível' });
    }
    return NextResponse.json({ error: 'Sistema indisponível' }, { status: 503 });
  }

  const validation = await validateSupabaseInvite(token);
  if (!validation.valid) {
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: validation.error ?? 'Link inválido' });
    }
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const emailNorm = email.trim().toLowerCase();
  if (validation.email && emailNorm !== validation.email.trim().toLowerCase()) {
    const message = 'Use o mesmo e-mail para o qual o convite foi enviado.';
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: message });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: 'Sistema indisponível' });
    }
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
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: msg });
    }
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (!authUser.user?.id) {
    const message = 'Não foi possível criar a conta. Tente de novo.';
    if (formSubmit) return cadastroRedirect(request, token, { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }

  let profileError = (
    await admin.from('profiles').insert({
      id: authUser.user.id,
      name: name.trim(),
      email: emailNorm,
      role: 'student',
      active: false,
      approved_at: null,
    })
  ).error;

  if (profileError && /duplicate|unique|already exists/i.test(profileError.message)) {
    const { error: updateErr } = await admin
      .from('profiles')
      .update({
        name: name.trim(),
        email: emailNorm,
        role: 'student',
        active: false,
        approved_at: null,
      })
      .eq('id', authUser.user.id);
    profileError = updateErr;
  }

  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    const msg = friendlyAuthError(profileError.message);
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: msg });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  await admin
    .from('invite_tokens')
    .update({ used_at: new Date().toISOString(), used_by: authUser.user.id })
    .eq('token', token);

  try {
    const { notifyAdminNewSignup } = await import('@/lib/email/admin-notify');
    await notifyAdminNewSignup({
      name: name.trim(),
      email: emailNorm,
      userId: authUser.user.id,
    });
  } catch (err) {
    console.error('[cadastro/token] notify admin failed', err);
  }

  try {
    const { notifyStudentSignupPending } = await import('@/lib/email/student-notify');
    await notifyStudentSignupPending({ name: name.trim(), email: emailNorm });
  } catch (err) {
    console.error('[cadastro/token] notify student failed', err);
  }

  const message =
    'Cadastro realizado! Pague o PIX (1 mês R$ 30 · promo R$ 19,90/mês · 3 meses R$ 50 com −R$ 10), envie o comprovante no WhatsApp e aguarde a liberação.';
  if (formSubmit) {
    return cadastroRedirect(request, token, {
      ok: '1',
      email: emailNorm,
      name: name.trim(),
    });
  }

  return NextResponse.json({ ok: true, message });
}
