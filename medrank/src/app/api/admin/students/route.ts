import { NextResponse } from 'next/server';
import { isDemoMode } from '@/lib/demo-auth';
import { createDemoStudentByAdmin } from '@/lib/demo-store';
import { requireAdminApi } from '@/lib/api-auth';
import { getRequestOrigin } from '@/lib/app-url';
import { createAdminClient } from '@/lib/supabase/admin';
import { ACTIVE_TRACK_IDS, normalizeTracks, type AppTrackId } from '@/lib/tracks/config';
import { ensureGeneralTrack, syncTrackGroupMembership } from '@/lib/exams/audience';

function redirectAlunos(request: Request, params: Record<string, string>) {
  const url = new URL('/admin/alunos', getRequestOrigin(request));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if ('error' in auth) return auth.error;

  const contentType = request.headers.get('content-type') ?? '';
  let name = '';
  let email = '';
  let password = '';
  let confirm = '';
  let tracks: AppTrackId[] = [];
  let formSubmit = false;

  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    name = String(body.name ?? '').trim();
    email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    password = String(body.password ?? '');
    confirm = String(body.confirm ?? password);
    tracks = normalizeTracks(body.tracks);
  } else {
    formSubmit = true;
    const form = await request.formData();
    name = String(form.get('name') ?? '').trim();
    email = String(form.get('email') ?? '')
      .trim()
      .toLowerCase();
    password = String(form.get('password') ?? '');
    confirm = String(form.get('confirm') ?? '');
    for (const id of ACTIVE_TRACK_IDS) {
      if (form.get(`track_${id}`) === 'on') tracks.push(id);
    }
  }

  if (formSubmit && password !== confirm) {
    return redirectAlunos(request, { error: 'As senhas não coincidem.' });
  }

  if (!name || !email || !password) {
    const message = 'Preencha nome, e-mail e senha.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (password.length < 4) {
    const message = 'Senha com no mínimo 4 caracteres.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Spec: Residência Geral é acesso padrão de todo aluno.
  tracks = ensureGeneralTrack(tracks);

  if (isDemoMode() || auth.demo) {
    const result = createDemoStudentByAdmin(name, email, password, tracks);
    if (!result.ok) {
      if (formSubmit) return redirectAlunos(request, { error: result.error ?? 'Erro ao cadastrar' });
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    if (formSubmit) {
      return redirectAlunos(request, { ok: '1', email, name });
    }
    return NextResponse.json({ ok: true, id: result.id });
  }

  const admin = createAdminClient();
  if (!admin) {
    const message = 'Service role necessária para criar alunos.';
    if (formSubmit) return redirectAlunos(request, { error: message });
    return NextResponse.json({ error: message }, { status: 503 });
  }

  const { data: authUser, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: name.trim() },
  });

  if (authError) {
    if (formSubmit) return redirectAlunos(request, { error: authError.message });
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const { error: profileError } = await admin.from('profiles').insert({
    id: authUser.user.id,
    name: name.trim(),
    email,
    role: 'student',
    // Aguarda PIX: professor libera em /admin/alunos → Liberar após PIX (+30 dias)
    active: false,
    approved_at: null,
    enabled_tracks: tracks,
    must_change_password: true,
  });

  if (profileError) {
    if (/enabled_tracks|schema cache/i.test(profileError.message)) {
      const { error: retryErr } = await admin.from('profiles').insert({
        id: authUser.user.id,
        name: name.trim(),
        email,
        role: 'student',
        active: false,
        approved_at: null,
        must_change_password: true,
      });
      if (retryErr) {
        await admin.auth.admin.deleteUser(authUser.user.id);
        if (formSubmit) return redirectAlunos(request, { error: retryErr.message });
        return NextResponse.json({ error: retryErr.message }, { status: 500 });
      }
    } else if (/must_change_password/i.test(profileError.message)) {
      const { error: retryErr } = await admin.from('profiles').insert({
        id: authUser.user.id,
        name: name.trim(),
        email,
        role: 'student',
        active: false,
        approved_at: null,
        enabled_tracks: tracks,
      });
      if (retryErr) {
        await admin.auth.admin.deleteUser(authUser.user.id);
        if (formSubmit) return redirectAlunos(request, { error: retryErr.message });
        return NextResponse.json({ error: retryErr.message }, { status: 500 });
      }
    } else {
      await admin.auth.admin.deleteUser(authUser.user.id);
      if (formSubmit) return redirectAlunos(request, { error: profileError.message });
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }
  }

  await syncTrackGroupMembership(authUser.user.id, tracks, admin);

  if (formSubmit) {
    return redirectAlunos(request, { ok: '1', email, name });
  }

  return NextResponse.json({ ok: true, tracks });
}
