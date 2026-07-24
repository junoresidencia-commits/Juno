import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { isDemoMode } from '@/lib/demo-auth';
import { listDemoInvites } from '@/lib/demo-store';
import { createClient } from '@/lib/supabase/server';
import { getServerOrigin, buildInviteLinkFromOrigin } from '@/lib/app-url';
import { GeneratePaidInviteForm } from '@/components/admin/GeneratePaidInviteForm';
import { getPaidAccessCopy } from '@/lib/billing/pix';
import { PixPaymentCard } from '@/components/billing/PixPaymentCard';

export default async function PagamentosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; email?: string; link?: string; error?: string }>;
}) {
  await requireRole('admin');
  const params = await searchParams;
  const copy = getPaidAccessCopy();
  const origin = await getServerOrigin();

  type InviteRow = {
    id: string;
    token: string;
    email: string | null;
    note: string | null;
    expires_at: string;
    used_at: string | null;
    created_at?: string;
    link: string;
  };

  let invites: InviteRow[] = [];

  if (isDemoMode()) {
    invites = listDemoInvites().map((i) => ({
      id: i.token,
      token: i.token,
      email: i.email,
      note: i.note ?? null,
      expires_at: i.expiresAt,
      used_at: i.usedAt,
      link: buildInviteLinkFromOrigin(origin, i.token),
    }));
  } else {
    const supabase = await createClient();
    const { data } = await supabase
      .from('invite_tokens')
      .select('id, token, email, note, expires_at, used_at, created_at')
      .order('created_at', { ascending: false })
      .limit(40);
    invites = (data ?? []).map((i) => ({
      ...i,
      link: buildInviteLinkFromOrigin(origin, i.token),
    }));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">
        ← Painel
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Pagamentos · PIX</h1>
      <p className="mt-2 text-sm text-slate-600">
        Assinatura {copy.priceLabel}/mês. Você gera o link → aluno cria login → paga PIX → você
        libera em <Link href="/admin/alunos" className="font-semibold text-emerald-700 underline">Alunos</Link>.
      </p>

      {params.error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{params.error}</p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <GeneratePaidInviteForm />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            O que o aluno vê
          </p>
          <PixPaymentCard compact />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold text-slate-900">Links gerados</h2>
        <div className="mt-3 space-y-2">
          {invites.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum link ainda.</p>
          ) : (
            invites.map((i) => (
              <div
                key={i.id}
                className="rounded-xl bg-white p-4 text-sm ring-1 ring-slate-200"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900">{i.email || '—'}</p>
                    <p className="mt-1 break-all text-xs text-slate-500">{i.link}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      i.used_at
                        ? 'bg-slate-100 text-slate-700'
                        : new Date(i.expires_at) < new Date()
                          ? 'bg-red-50 text-red-800'
                          : 'bg-amber-50 text-amber-900'
                    }`}
                  >
                    {i.used_at
                      ? 'Usado — aguardando PIX/liberação'
                      : new Date(i.expires_at) < new Date()
                        ? 'Expirado'
                        : 'Aberto'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <p className="mt-8 text-xs text-slate-500">
        Fluxo sem gateway automático: confira o PIX no extrato do banco e use{' '}
        <strong>Liberar acesso</strong> em Alunos. Depois use <strong>Renovar mês</strong> a cada
        pagamento.
      </p>
    </div>
  );
}
