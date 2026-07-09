import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { demoCookieName, isDemoMode, parseDemoSessionLite } from '@/lib/demo-auth-edge';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const demoToken = request.cookies.get(demoCookieName())?.value;
  const demoProfile = isDemoMode() ? parseDemoSessionLite(demoToken) : null;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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

  const isAuthenticated = Boolean(user || demoProfile);
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAlunoRoute = request.nextUrl.pathname.startsWith('/aluno');
  const isProtected = isAdminRoute || isAlunoRoute;

  if (!isAuthenticated && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (demoProfile && isAdminRoute && demoProfile.role !== 'admin') {
    const url = request.nextUrl.clone();
    url.pathname = '/aluno';
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
