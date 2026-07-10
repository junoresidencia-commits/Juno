import Link from 'next/link';
import { CadastroForm } from '@/components/cadastro/CadastroForm';
import { isDemoMode } from '@/lib/demo-auth';
import { validateDemoInvite } from '@/lib/demo-store';
import { isSupabaseConfigured } from '@/lib/app-url';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function CadastroPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let valid = false;
  let error: string | undefined;
  let inviteEmail: string | undefined;

  if (isDemoMode()) {
    const result = validateDemoInvite(token);
    valid = result.valid;
    error = result.error;
    inviteEmail = result.email;
  } else if (isSupabaseConfigured()) {
    const admin = createAdminClient();
    const { data: invite } = admin
      ? await admin.from('invite_tokens').select('*').eq('token', token).maybeSingle()
      : { data: null };

    if (!invite) {
      error = 'Link inválido ou expirado.';
    } else if (invite.used_at) {
      error = 'Este link já foi utilizado.';
    } else if (new Date(invite.expires_at) < new Date()) {
      error = 'Este link expirou.';
    } else {
      valid = true;
      inviteEmail = invite.email ?? undefined;
    }
  } else {
    error = 'Sistema indisponível no momento.';
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-emerald-700">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">Cadastro por convite</p>
        </div>
        <CadastroForm token={token} valid={valid} error={error} inviteEmail={inviteEmail} />
        <p className="mt-6 text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link href="/login" className="text-emerald-700 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
