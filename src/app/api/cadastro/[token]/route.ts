import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { registerDemoStudent, validateDemoInvite } from '@/lib/demo-store';
import { isSupabaseConfigured } from '@/lib/app-url';
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
  const body = await request.json();
  const { name, email, password } = body as { name: string; email: string; password: string };

  if (!name?.trim() || !email?.trim() || !password || password.length < 4) {
    return NextResponse.json({ error: 'Preencha nome, e-mail e senha (mín. 4 caracteres).' }, { status: 400 });
  }

  if (isDemoMode()) {
    const result = registerDemoStudent(token, name, email, password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({
      ok: true,
      message: 'Cadastro realizado! Aguarde o professor liberar seu acesso.',
    });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Sistema indisponível' }, { status: 503 });
  }

  const validation = await validateSupabaseInvite(token);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const emailNorm = email.trim().toLowerCase();
  if (validation.email && emailNorm !== validation.email.trim().toLowerCase()) {
    return NextResponse.json(
      { error: 'Use o mesmo e-mail para o qual o convite foi enviado.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'Sistema indisponível' }, { status: 503 });
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email: emailNorm,
    password,
    email_confirm: true,
    user_metadata: { name: name.trim() },
  });

  if (authError) {
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
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  await admin
    .from('invite_tokens')
    .update({ used_at: new Date().toISOString(), used_by: authUser.user.id })
    .eq('token', token);

  return NextResponse.json({
    ok: true,
    message: 'Cadastro realizado! Aguarde o professor liberar seu acesso.',
  });
}
