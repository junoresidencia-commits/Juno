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
  groups: string[];
};

function daysLeftLabel(expiresAt: string | null): string | null {
  if (!expiresAt) return null;
  const ms = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
  if (days < 0) return 'vencido';
  if (days === 0) return 'vence hoje';
  if (days === 1) return '1 dia restante';
  return `${days} dias restantes`;
}

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
  const left = daysLeftLabel(subscriptionExpiresAt ?? null);

  if (!active && !approvedAt) {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
        Aguardando PIX — liberar ou não
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
          Liberado{left ? ` · ${left}` : ''}
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
    enabled_tracks:
      extras.enabled_tracks ??
      (Array.isArray(s.enabled_tracks) ? (s.enabled_tracks as string[]) : []),
    subscription_expires_at:
      extras.subscription_expires_at !== undefined
        ? extras.subscription_expires_at
        : ((s.subscription_expires_at as string | null) ?? null),
    groups: [],
  }));
}

function sortByName(a: StudentRow, b: StudentRow) {
  return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
}

async function loadStudentsFromSupabase(): Promise<{
  students: StudentRow[];
  loadError: string | null;
}> {
  // Prefer service_role: evita lista vazia quando RLS/is_admin falha na sessão do cookie
  const supabase = createAdminClient() ?? (await createClient());

  const full = await supabase
    .from('profiles')
    .select('id, name, email, active, approved_at, league_admin, enabled_tracks, subscription_expires_at')
    .eq('role', 'student')
    .order('name', { ascending: true })
    .limit(2000);

  let students: StudentRow[] = [];
  let loadError: string | null = null;

  if (!full.error) {
    students = mapStudentRows(full.data as Array<Record<string, unknown>>);
  } else {
    const msg = full.error.message ?? '';
    console.error('[admin/alunos] list error:', msg);

    if (/subscription_expires_at|enabled_tracks|league_admin|schema cache/i.test(msg)) {
      const mid = await supabase
        .from('profiles')
        .select('id, name, email, active, approved_at, league_admin')
        .eq('role', 'student')
        .order('name', { ascending: true })
        .limit(2000);

      if (!mid.error) {
        students = mapStudentRows(mid.data as Array<Record<string, unknown>>, {
          enabled_tracks: [],
          subscription_expires_at: null,
        });
      } else {
        const basic = await supabase
          .from('profiles')
          .select('id, name, email, active, approved_at')
          .eq('role', 'student')
          .order('name', { ascending: true })
          .limit(2000);

        if (!basic.error) {
          students = mapStudentRows(basic.data as Array<Record<string, unknown>>, {
            league_admin: false,
            enabled_tracks: [],
            subscription_expires_at: null,
          });
        } else {
          loadError = basic.error.message || mid.error.message || msg;
        }
      }
    } else {
      loadError = msg || 'Não foi possível carregar os alunos.';
    }
  }

  if (students.length > 0) {
    const ids = students.map((s) => s.id);
    const { data: memberships } = await supabase
      .from('study_group_members')
      .select('user_id, study_groups(name)')
      .in('user_id', ids);

    if (memberships?.length) {
      const byUser = new Map<string, string[]>();
      for (const row of memberships as Array<{
        user_id: string;
        study_groups: { name?: string } | { name?: string }[] | null;
      }>) {
        const g = row.study_groups;
        const name = Array.isArray(g) ? g[0]?.name : g?.name;
        if (!name) continue;
        const list = byUser.get(row.user_id) ?? [];
        list.push(name);
        byUser.set(row.user_id, list);
      }
      students = students.map((s) => ({
        ...s,
        groups: byUser.get(s.id) ?? [],
      }));
    }
  }

  return { students, loadError };
}

function StudentCard({ s }: { s: StudentRow }) {
  const pending = !s.active && !s.approved_at;
  const expiresLabel = s.subscription_expires_at
    ? new Date(s.subscription_expires_at).toLocaleDateString('pt-BR')
    : null;

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl p-4 text-slate-900 shadow-sm ring-1 sm:flex-row sm:items-start sm:justify-between ${
        pending
          ? 'border border-amber-200 bg-amber-50 ring-amber-100'
          : 'bg-white ring-slate-200'
      }`}
    >
      <div className="min-w-0">
        <p className="text-lg font-bold text-slate-900">{s.name || '(sem nome)'}</p>
        <p className="text-sm text-slate-600">{s.email}</p>
        {expiresLabel ? (
          <p className="mt-1 text-xs text-slate-500">
            Assinatura até <strong className="text-slate-800">{expiresLabel}</strong>
            {daysLeftLabel(s.subscription_expires_at)
              ? ` · ${daysLeftLabel(s.subscription_expires_at)}`
              : ''}
          </p>
        ) : pending ? (
          <p className="mt-1 text-xs text-amber-900/80">
            Ainda sem acesso. Confirme o PIX e libere (+30 dias) — ou não libere / exclua.
          </p>
        ) : null}
        {s.groups.length > 0 ? (
          <p className="mt-1 text-xs text-slate-500">
            Grupos: {s.groups.join(', ')}
          </p>
        ) : null}
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
        pending={pending}
        leagueAdmin={s.league_admin}
        enabledTracks={s.enabled_tracks as AppTrackId[]}
        subscriptionExpiresAt={s.subscription_expires_at}
      />
    </div>
  );
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
    students = listDemoStudents()
      .map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        active: s.active,
        approved_at: s.approvedAt,
        league_admin: !!s.leagueAdmin,
        enabled_tracks: s.enabled_tracks ?? [],
        subscription_expires_at: s.subscriptionExpiresAt ?? null,
        groups: [],
      }))
      .sort(sortByName);
  } else {
    const loaded = await loadStudentsFromSupabase();
    students = loaded.students.sort(sortByName);
    loadError = loaded.loadError;
  }

  const pending = students.filter((s) => !s.active && !s.approved_at);
  const expired = students.filter(
    (s) =>
      s.approved_at &&
      s.subscription_expires_at &&
      new Date(s.subscription_expires_at).getTime() < Date.now()
  );
  const liberated = students.filter(
    (s) =>
      s.active &&
      s.approved_at &&
      !expired.some((e) => e.id === s.id)
  );
  const blocked = students.filter(
    (s) =>
      !pending.some((p) => p.id === s.id) &&
      !expired.some((e) => e.id === s.id) &&
      !liberated.some((l) => l.id === s.id)
  );
  const activeCount = students.filter((s) => s.active).length;

  const initialSuccess =
    params.ok === '1' && params.name && params.email
      ? { name: params.name, email: params.email }
      : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alunos</h1>
          <p className="text-sm text-slate-600">
            {students.length} cadastrados · {activeCount} liberados · {pending.length} aguardando
            PIX
          </p>
        </div>
        <Link
          href="/admin/pagamentos"
          className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900"
        >
          Gerar link PIX →
        </Link>
      </div>

      <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
        Fluxo: cadastre pelo <strong>nome</strong> → aluno paga PIX → você{' '}
        <strong>libera (+30 dias)</strong> ou <strong>não libera</strong>. Quem já está liberado
        mantém os dias restantes; só renova quando pagar o próximo mês.
      </p>

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
          <h2 className="text-lg font-bold text-amber-900">
            Liberar ou não? — Aguardando PIX ({pending.length})
          </h2>
          <p className="mt-1 text-sm text-amber-900/80">
            Confira o PIX de R$ 10 no extrato. Em cada nome: liberar (+30 dias) ou não liberar /
            excluir.
          </p>
          <div className="mt-4 space-y-3">
            {pending.map((s) => (
              <StudentCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-red-900">
            Mês vencido — renovar ({expired.length})
          </h2>
          <p className="mt-1 text-sm text-red-900/80">
            Confirme o PIX do mês e toque em Renovar (+30 dias a partir de hoje ou do fim atual).
          </p>
          <div className="mt-4 space-y-3">
            {expired.map((s) => (
              <StudentCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">
          Liberados — mantêm os 30 dias ({liberated.length})
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Já pagos/liberados. A validade atual não é resetada ao abrir esta página. Renove só
          depois do próximo PIX.
        </p>
        <div className="mt-4 space-y-3">
          {liberated.length === 0 ? (
            <p className="text-sm text-slate-600">Nenhum aluno liberado no momento.</p>
          ) : (
            liberated.map((s) => <StudentCard key={s.id} s={s} />)
          )}
        </div>
      </section>

      {blocked.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Bloqueados ({blocked.length})</h2>
          <div className="mt-4 space-y-3">
            {blocked.map((s) => (
              <StudentCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-bold text-slate-900">
          Todos os alunos por nome ({students.length})
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Lista completa — os mesmos cadastros que entram em grupos aparecem aqui.
        </p>
        <div className="mt-4 space-y-3">
          {students.length === 0 ? (
            <p className="text-slate-600">
              {loadError
                ? 'Não foi possível listar os alunos.'
                : 'Nenhum aluno ainda. Crie o primeiro login acima.'}
            </p>
          ) : (
            students.map((s) => <StudentCard key={`all-${s.id}`} s={s} />)
          )}
        </div>
      </section>
    </div>
  );
}
