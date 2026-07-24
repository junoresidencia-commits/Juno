import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';
import { getRequestOrigin } from '@/lib/app-url';

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<NextResponse['cookies']['set']>[2];
};

function redirectLogin(request: Request, error: string) {
  const url = new URL('/login', getRequestOrigin(request));
  url.searchParams.set('error', error);
  return NextResponse.redirect(url, 303);
}

async function readBody(request: Request): Promise<{
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

export async function POST(request: NextRequest) {
  if (!isSupabaseEnvConfigured()) {
    return redirectLogin(
      request,
      'Supabase não configurado na Vercel (URL e ANON key). Faça Redeploy.'
    );
  }

  const { email: emailRaw, password, formSubmit } = await readBody(request);
  const trimmed = emailRaw.trim().toLowerCase();
  const email = trimmed.includes('@') ? trimmed : `${trimmed}@medrank.com`;

  if (!trimmed || !password) {
    if (formSubmit) return redirectLogin(request, 'Preencha e-mail e senha.');
    return NextResponse.json({ error: 'Preencha e-mail e senha.' }, { status: 400 });
  }

  const pendingCookies: CookieToSet[] = [];

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        pendingCookies.push(...cookiesToSet);
      },
    },
  });

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    const msg = authError?.message?.toLowerCase() ?? '';
    let error = authError?.message ?? 'Falha no login';
    if (msg.includes('email not confirmed')) {
      error = 'E-mail não confirmado no Supabase Auth (Users → confirme o usuário).';
    } else if (msg.includes('invalid') || msg.includes('credentials')) {
      error = 'E-mail ou senha inválidos.';
    }
    if (formSubmit) return redirectLogin(request, error);
    return NextResponse.json({ error }, { status: 401 });
  }

  // Prefer sessão do usuário; se RLS/grants falharem, cai no service_role.
  let profile: {
    active: boolean;
    approved_at: string | null;
    role: string;
  } | null = null;
  let profileErrorMessage: string | null = null;

  {
    const { data, error } = await supabase
      .from('profiles')
      .select('active, approved_at, role')
      .eq('id', authData.user.id)
      .maybeSingle();
    if (!error && data) {
      profile = data;
    } else {
      profileErrorMessage = error?.message ?? null;
      const { createAdminClient } = await import('@/lib/supabase/admin');
      const admin = createAdminClient();
      if (!admin) {
        await supabase.auth.signOut();
        const errorText =
          profileErrorMessage ??
          'SUPABASE_SERVICE_ROLE_KEY ausente na Vercel. Adicione a service_role e Redeploy.';
        if (formSubmit) return redirectLogin(request, `Perfil: ${errorText}`);
        return NextResponse.json({ error: `Perfil: ${errorText}` }, { status: 503 });
      }
      const adminResult = await admin
        .from('profiles')
        .select('active, approved_at, role')
        .eq('id', authData.user.id)
        .maybeSingle();
      if (adminResult.error) {
        await supabase.auth.signOut();
        const errorText = adminResult.error.message;
        if (formSubmit) return redirectLogin(request, `Perfil: ${errorText}`);
        return NextResponse.json({ error: `Perfil: ${errorText}` }, { status: 500 });
      }
      profile = adminResult.data;
    }
  }

  if (!profile) {
    await supabase.auth.signOut();
    const error = 'Sem profile de professor. Rode o SQL do admin de novo.';
    if (formSubmit) return redirectLogin(request, error);
    return NextResponse.json({ error }, { status: 403 });
  }

  if (!profile.active) {
    await supabase.auth.signOut();
    const error = profile.approved_at
      ? 'Acesso bloqueado.'
      : 'Aguardando liberação. Pague o PIX de R$ 10 e aguarde o professor confirmar.';
    if (formSubmit) return redirectLogin(request, error);
    return NextResponse.json({ error }, { status: 403 });
  }

  const destination = profile.role === 'admin' ? '/admin' : '/aluno';

  const response = formSubmit
    ? NextResponse.redirect(new URL(destination, getRequestOrigin(request)), 303)
    : NextResponse.json({ ok: true, redirect: destination });

  for (const { name, value, options } of pendingCookies) {
    response.cookies.set(name, value, options);
  }

  return response;
}
