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
  return NextResponse.redirect(url);
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

  if (!name || !email || !password || password.length < 4) {
    const message = 'Preencha nome, e-mail e senha (mín. 4 caracteres).';
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

    const message =
      'Cadastro realizado! Pague o PIX de R$ 10 e aguarde o professor liberar seu acesso.';
    if (formSubmit) {
      return cadastroRedirect(request, token, { ok: '1' });
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
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: authError.message });
    }
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    name: name.trim(),
    email: emailNorm,
    role: 'student',
    active: false,
    approved_at: null,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    if (formSubmit) {
      return cadastroRedirect(request, token, { error: profileError.message });
    }
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  await admin
    .from('invite_tokens')
    .update({ used_at: new Date().toISOString(), used_by: authUser.user.id })
    .eq('token', token);

  const message =
    'Cadastro realizado! Pague o PIX de R$ 10 e aguarde o professor liberar seu acesso.';
  if (formSubmit) {
    return cadastroRedirect(request, token, { ok: '1' });
  }

  return NextResponse.json({ ok: true, message });
}
