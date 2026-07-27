import { NextResponse } from 'next/server';
import { getSessionProfile } from '@/lib/auth';
import { isDemoMode } from '@/lib/demo-auth';
import { changeDemoStudentPassword } from '@/lib/demo-store';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env';
import { createClient as createSupabaseJs } from '@supabase/supabase-js';

async function clearMustChangePassword(userId: string): Promise<void> {
  if (isDemoMode()) return;
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from('profiles').update({ must_change_password: false }).eq('id', userId);
}

/**
 * Aluno troca a própria senha.
 * body: { currentPassword, newPassword, confirm }
 */
export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  if (session.profile.role !== 'student' && session.profile.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: string;
    newPassword?: string;
    confirm?: string;
  } | null;

  const currentPassword = String(body?.currentPassword ?? '');
  const newPassword = String(body?.newPassword ?? '');
  const confirm = String(body?.confirm ?? '');

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Preencha a senha atual e a nova.' }, { status: 400 });
  }
  if (newPassword.length < 4) {
    return NextResponse.json({ error: 'Nova senha: mínimo 4 caracteres.' }, { status: 400 });
  }
  if (newPassword !== confirm) {
    return NextResponse.json({ error: 'A confirmação não coincide.' }, { status: 400 });
  }
  if (newPassword === currentPassword) {
    return NextResponse.json({ error: 'A nova senha deve ser diferente da atual.' }, { status: 400 });
  }

  if (isDemoMode()) {
    const ok = changeDemoStudentPassword(session.userId, currentPassword, newPassword);
    if (!ok) {
      return NextResponse.json({ error: 'Senha atual incorreta.' }, { status: 400 });
    }
    return NextResponse.json({ ok: true, message: 'Senha alterada.' });
  }

  const email = session.profile.email;
  if (!email) {
    return NextResponse.json({ error: 'E-mail da conta não encontrado.' }, { status: 400 });
  }

  // Confirma senha atual
  const verifier = createSupabaseJs(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (verifyError) {
    return NextResponse.json({ error: 'Senha atual incorreta.' }, { status: 400 });
  }

  const supabase = await createClient();
  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

  if (updateError) {
    // Fallback service role (alguns projetos bloqueiam updateUser sem reauth recente)
    const admin = createAdminClient();
    if (admin) {
      const { error: adminErr } = await admin.auth.admin.updateUserById(session.userId, {
        password: newPassword,
      });
      if (adminErr) {
        return NextResponse.json({ error: adminErr.message }, { status: 500 });
      }
      await clearMustChangePassword(session.userId);
      return NextResponse.json({ ok: true, message: 'Senha alterada.' });
    }
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  await clearMustChangePassword(session.userId);
  return NextResponse.json({ ok: true, message: 'Senha alterada.' });
}
