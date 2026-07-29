import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { isDemoMode } from '@/lib/demo-auth';
import { listDemoStudents } from '@/lib/demo-store';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { StudentActions } from '@/components/admin/StudentActions';
import { CreateStudentForm } from '@/components/admin/CreateStudentForm';
import type { AppTrackId } from '@/lib/tracks/config';

type StudentRow = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  approved_at: string | null;
  league_admin: boolean;
  enabled_tracks: string[];
  subscription_expires_at: string | null;
};

function StudentStatus({
  active,
  approvedAt,
  leagueAdmin,
  subscriptionExpiresAt,
}: {
  active: boolean;
  approvedAt: string | null;
  leagueAdmin?: boolean;
  subscriptionExpiresAt?: string | null;
}) {
  const expired =
    Boolean(subscriptionExpiresAt) &&
    new Date(subscriptionExpiresAt as string).getTime() < Date.now();

  if (!active && !approvedAt) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
        Aguardando 1º PIX
      </span>
    );
  }
  if (expired || (!active && approvedAt)) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
        {expired ? 'Mês vencido — renovar' : 'Bloqueado'}
      </span>
    );
  }
  if (active) {
    return (
      <span className="inline-flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          Ativo
        </span>
        {leagueAdmin ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
            Admin de liga
          </span>
        ) : null}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
      Bloqueado
    </span>
  );
}

function mapStudentRows(
  rows: Array<Record<string, unknown>> | null | undefined,
  extras: Partial<Pick<StudentRow, 'enabled_tracks' | 'subscription_expires_at' | 'league_admin'>> = {}
): StudentRow[] {
  return (rows ?? []).map((s) => ({
    id: String(s.id),
    name: String(s.name ?? ''),
    email: String(s.email ?? ''),
    active: Boolean(s.active),
    approved_at: (s.approved_at as string | null) ?? null,
    league_admin: extras.league_admin ?? Boolean(s.league_admin),
    enabled_tracks: extras.enabled_tracks ??
      (Array.isArray(s.enabled_tracks) ? (s.enabled_tracks as string[]) : []),
    subscription_expires_at:
      extras.subscription_expires_at !== undefined
        ? extras.subscription_expires_at
        : ((s.subscription_expires_at as string | null) ?? null),
  }));
}

async function loadStudentsFromSupabase(): Promise<{ students: StudentRow[]; loadError: string | null }> {
  // Prefer service_role: evita lista vazia quando RLS/is_admin falha na sessão do cookie
  const supabase = createAdminClient() ?? (await createClient());

  const full = await supabase
    .from('profiles')
    .select('id, name, email, active, approved_at, league_admin, enabled_tracks, subscription_expires_at')
    .eq('role', 'student')
    .order('created_at', { ascending: false });

  if (!full.error) {
    return { students: mapStudentRows(full.data as Array<Record<string, unknown>>), loadError: null };
  }

  const msg = full.error.message ?? '';
  console.error('[admin/alunos] list error:', msg);

  // Colunas novas podem faltar se a migration ainda não rodou — tenta gradualmente
  if (/subscription_expires_at|enabled_tracks|league_admin|schema cache/i.test(msg)) {
    const mid = await supabase
      .from('profiles')
      .select('id, name, email, active, approved_at, league_admin')
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (!mid.error) {
      return {
        students: mapStudentRows(mid.data as Array<Record<string, unknown>>, {
          enabled_tracks: [],
          subscription_expires_at: null,
        }),
        loadError: null,
      };
    }

    const basic = await supabase
      .from('profiles')
      .select('id, name, email, active, approved_at')
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (!basic.error) {
      return {
        students: mapStudentRows(basic.data as Array<Record<string, unknown>>, {
          league_admin: false,
          enabled_tracks: [],
          subscription_expires_at: null,
        }),
        loadError: null,
      };
    }

    return {
      students: [],
      loadError: basic.error.message || mid.error.message || msg,
    };
  }

  return { students: [], loadError: msg || 'Não foi possível carregar os alunos.' };
}

export default async function AlunosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; name?: string; email?: string; error?: string }>;
}) {
  await requireRole('admin');
  const params = await searchParams;

  let students: StudentRow[] = [];
  let loadError: string | null = null;

  if (isDemoMode()) {
    students = listDemoStudents().map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      active: s.active,
      approved_at: s.approvedAt,
      league_admin: !!s.leagueAdmin,
      enabled_tracks: s.enabled_tracks ?? [],
      subscription_expires_at: s.subscriptionExpiresAt ?? null,
    }));
  } else {
    const loaded = await loadStudentsFromSupabase();
    students = loaded.students;
    loadError = loaded.loadError;
  }

  const pending = students.filter((s) => !s.active && !s.approved_at);
  const expired = students.filter(
    (s) =>
      s.approved_at &&
      s.subscription_expires_at &&
      new Date(s.subscription_expires_at).getTime() < Date.now()
  );
  const others = students.filter(
    (s) => (s.active || s.approved_at) && !expired.some((e) => e.id === s.id)
  );
  const activeCount = students.filter((s) => s.active).length;

  const initialSuccess =
    params.ok === '1' && params.name && params.email
      ? { name: params.name, email: params.email }
      : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alunos</h1>
          <p className="text-sm text-slate-600">{activeCount} ativos · {students.length} cadastrados</p>
        </div>
        <Link
          href="/admin/pagamentos"
          className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900"
        >
          Gerar link PIX →
        </Link>
      </div>

      {loadError ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          Erro ao carregar alunos: {loadError}
        </p>
      ) : null}

      <div className="mt-6">
        <CreateStudentForm initialError={params.error} initialSuccess={initialSuccess} />
      </div>

      {pending.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold text-amber-800">
            Aguardando PIX / liberação ({pending.length})
          </h2>
          <p className="mt-1 text-sm text-amber-900/80">
            Confira o PIX de R$ 10 no extrato e toque em Liberar após PIX.
          </p>
          <div className="mt-4 space-y-3">
            {pending.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">{s.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StudentStatus
                    active={s.active}
                    approvedAt={s.approved_at}
                    leagueAdmin={s.league_admin}
                    subscriptionExpiresAt={s.subscription_expires_at}
                  />
                  <StudentActions
                    studentId={s.id}
                    name={s.name}
                    active={s.active}
                    pending
                    subscriptionExpiresAt={s.subscription_expires_at}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold text-red-800">
            Assinatura vencida — precisa renovar ({expired.length})
          </h2>
          <p className="mt-1 text-sm text-red-900/80">
            Conta bloqueada automaticamente. Confirme o PIX do mês e toque em Renovar mês.
          </p>
          <div className="mt-4 space-y-3">
            {expired.map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">{s.email}</p>
                  <div className="mt-2">
                    <StudentStatus
                      active={s.active}
                      approvedAt={s.approved_at}
                      leagueAdmin={s.league_admin}
                      subscriptionExpiresAt={s.subscription_expires_at}
                    />
                  </div>
                </div>
                <StudentActions
                  studentId={s.id}
                  name={s.name}
                  active={s.active}
                  pending={false}
                  leagueAdmin={s.league_admin}
                  enabledTracks={s.enabled_tracks as AppTrackId[]}
                  subscriptionExpiresAt={s.subscription_expires_at}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-semibold text-slate-900">Alunos cadastrados</h2>
        <p className="mt-1 text-sm text-slate-600">
          Em cada aluno, ligue ou desligue os módulos (Nefrologia, Residência, RM…). Isso define
          quais disputas e treinos aparecem para ele. Todo mês: confirmar PIX → Renovar.
        </p>
        <div className="mt-4 space-y-3">
          {others.length === 0 && pending.length === 0 && expired.length === 0 ? (
            <p className="text-slate-600">
              {loadError
                ? 'Não foi possível listar os alunos.'
                : 'Nenhum aluno ainda. Crie o primeiro login acima.'}
            </p>
          ) : (
            others.map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-3 rounded-xl bg-white p-4 text-slate-900 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">{s.email}</p>
                  <div className="mt-2">
                    <StudentStatus
                      active={s.active}
                      approvedAt={s.approved_at}
                      leagueAdmin={s.league_admin}
                      subscriptionExpiresAt={s.subscription_expires_at}
                    />
                  </div>
                </div>
                <StudentActions
                  studentId={s.id}
                  name={s.name}
                  active={s.active}
                  pending={!s.active && !s.approved_at}
                  leagueAdmin={s.league_admin}
                  enabledTracks={s.enabled_tracks as AppTrackId[]}
                  subscriptionExpiresAt={s.subscription_expires_at}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
