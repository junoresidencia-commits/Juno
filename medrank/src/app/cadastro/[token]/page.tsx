import Link from 'next/link';
import { CadastroForm } from '@/components/cadastro/CadastroForm';
import { isDemoMode } from '@/lib/demo-auth';
import { validateDemoInvite } from '@/lib/demo-store';
import { isSupabaseConfigured } from '@/lib/app-url';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatPriceBrl } from '@/lib/billing/pix';

export default async function CadastroPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ ok?: string; error?: string; email?: string; name?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;

  let valid = false;
  let error: string | undefined = query.error;
  let inviteEmail: string | undefined;
  const success = query.ok === '1';
  const successEmail = query.email || undefined;
  const successName = query.name || undefined;

  if (success) {
    // Convite já foi marcado como usado no POST — ainda assim mostramos PIX
    valid = true;
  } else if (isDemoMode()) {
    const result = validateDemoInvite(token);
    valid = result.valid;
    if (!error) error = result.error;
    inviteEmail = result.email;
  } else if (isSupabaseConfigured()) {
    const admin = createAdminClient();
    const { data: invite } = admin
      ? await admin.from('invite_tokens').select('*').eq('token', token).maybeSingle()
      : { data: null };

    if (!invite) {
      error = error ?? 'Link inválido ou expirado.';
    } else if (invite.used_at) {
      error = error ?? 'Este link já foi utilizado.';
    } else if (new Date(invite.expires_at) < new Date()) {
      error = error ?? 'Este link expirou.';
    } else {
      valid = true;
      inviteEmail = invite.email ?? undefined;
    }
  } else {
    error = error ?? 'Sistema indisponível no momento.';
  }

  // Em sucesso, tenta recuperar e-mail do convite (usado) para a descrição do PIX
  if (success && !inviteEmail && isSupabaseConfigured()) {
    const admin = createAdminClient();
    if (admin) {
      const { data: invite } = await admin
        .from('invite_tokens')
        .select('email')
        .eq('token', token)
        .maybeSingle();
      inviteEmail = invite?.email ?? undefined;
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-teal-900">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">
            Cadastro · assinatura {formatPriceBrl()}/mês
          </p>
        </div>
        <CadastroForm
          token={token}
          valid={valid || success}
          error={success ? undefined : error}
          inviteEmail={inviteEmail}
          success={success}
          successEmail={successEmail || inviteEmail}
          successName={successName}
        />
        <p className="mt-6 text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link href="/login" className="text-emerald-700 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
