import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isSkipAuth } from '@/lib/skip-auth';
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseEnvConfigured } from '@/lib/supabase/env';

export async function updateSession(request: NextRequest) {
  if (isSkipAuth()) {
    if (request.nextUrl.pathname === '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
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
      const url = request.nextUrl.clone();
      url.pathname = '/aluno';
      return NextResponse.redirect(url);
    }

    if (isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // Demo / env incompleto: nunca cria client Supabase (evita crash com URL vazia).
  if (isDemoMode() || !isSupabaseEnvConfigured()) {
    if (isProtected) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);

  if (!isAuthenticated && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
