import Link from 'next/link';
import { requireRole } from '@/lib/auth';
import { InviteGenerator } from '@/components/admin/InviteGenerator';
import { isDemoMode } from '@/lib/demo-auth';
import { listDemoInvites } from '@/lib/demo-store';
import { buildInviteLink } from '@/lib/app-url';
import { createClient } from '@/lib/supabase/server';
import { formatDateBR } from '@/lib/format';

export default async function ConvitesPage() {
  await requireRole('admin');

  let invites: {
    token: string;
    email?: string | null;
    expires_at: string;
    used_at: string | null;
    link: string;
  }[] = [];

  if (isDemoMode()) {
    invites = listDemoInvites().map((i) => ({
      token: i.token,
      email: i.email,
      expires_at: i.expiresAt,
      used_at: i.usedAt,
      link: buildInviteLink(i.token),
    }));
  } else {
    const supabase = await createClient();
    const { data } = await supabase.from('invite_tokens').select('*').order('created_at', { ascending: false }).limit(20);
    invites = (data ?? []).map((i) => ({ ...i, link: buildInviteLink(i.token) }));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin" className="text-sm text-emerald-700 hover:underline">← Painel</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Convites</h1>
      <p className="text-sm text-slate-600">Cada convite é para um e-mail específico. Você libera o acesso depois do cadastro.</p>

      <div className="mt-6">
        <InviteGenerator />
      </div>

      <section className="mt-8">
        <h2 className="font-semibold text-slate-900">Links gerados</h2>
        <div className="mt-4 space-y-3">
          {invites.length === 0 ? (
            <p className="text-sm text-slate-600">Nenhum convite ainda.</p>
          ) : (
            invites.map((i) => (
              <div key={i.token} className="rounded-xl bg-white p-4 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200">
                {i.email && <p className="font-medium text-slate-900">{i.email}</p>}
                <p className="mt-1 break-all text-slate-700">{i.link}</p>
                <p className="mt-2 text-xs text-slate-600">
                  Expira: {formatDateBR(i.expires_at.split('T')[0])}
                  {' · '}
                  {i.used_at ? '✓ Usado' : 'Disponível'}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
