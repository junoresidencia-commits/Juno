import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

function generatePassword(length = 10): string {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = await request.json();
  const { name, email } = body as { name: string; email: string };

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Nome e e-mail são obrigatórios' }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY não configurada. Cadastre o aluno manualmente no Supabase Auth.',
    }, { status: 503 });
  }

  const tempPassword = generatePassword();

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email: email.trim(),
    password: tempPassword,
    email_confirm: true,
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    name: name.trim(),
    email: email.trim(),
    role: 'student',
    active: true,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(authUser.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, tempPassword });
}
