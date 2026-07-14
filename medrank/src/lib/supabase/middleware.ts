import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isSkipAuth } from '@/lib/skip-auth';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';

function redirectWithCookies(
  request: NextRequest,
  pathname: string,
  from: NextResponse
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const redirectResponse = NextResponse.redirect(url);
  from.cookies.getAll().forEach(({ name, value }) => {
    redirectResponse.cookies.set(name, value);
  });
  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  if (isSkipAuth()) {
    if (request.nextUrl.pathname === '/login') {
      return redirectWithCookies(request, '/admin', NextResponse.next({ request }));
    }
    return NextResponse.next({ request });
  }

  const { demoCookieName, isDemoMode, parseDemoSessionLite } = await import('@/lib/demo-auth-edge');

  let supabaseResponse = NextResponse.next({ request });

  const demoToken = request.cookies.get(demoCookieName())?.value;
  const demoProfile = isDemoMode() ? parseDemoSessionLite(demoToken) : null;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAlunoRoute = request.nextUrl.pathname.startsWith('/aluno');
  const isProtected = isAdminRoute || isAlunoRoute;

  if (demoProfile) {
    if (isAdminRoute && demoProfile.role !== 'admin') {
      return redirectWithCookies(request, '/aluno', supabaseResponse);
    }

    if (isAuthPage) {
      return redirectWithCookies(request, '/', supabaseResponse);
    }

    return supabaseResponse;
  }

  // Demo / env incompleto: nunca cria client Supabase (evita crash com URL vazia).
  if (isDemoMode() || !isSupabaseEnvConfigured()) {
    if (isProtected) {
      return redirectWithCookies(request, '/login', supabaseResponse);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);

  if (!isAuthenticated && isProtected) {
    return redirectWithCookies(request, '/login', supabaseResponse);
  }

  // Não redirecionar /login → / aqui.
  // Usuário autenticado sem profile (ou cookie quebrado) gerava ERR_TOO_MANY_REDIRECTS.
  // A página /login decide o destino depois de validar o perfil.

  return supabaseResponse;
}
