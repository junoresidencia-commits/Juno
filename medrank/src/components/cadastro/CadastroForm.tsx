import Link from 'next/link';

interface Props {
  token: string;
  valid: boolean;
  error?: string;
  inviteEmail?: string;
  success?: boolean;
}

export function CadastroForm({ token, valid, error, inviteEmail, success }: Props) {
  if (!valid) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center">
        <p className="text-red-800">{error || 'Link inválido'}</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
          Ir para login
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">Cadastro realizado!</p>
        <p className="mt-2 text-sm text-emerald-700">
          Aguarde o professor liberar seu acesso. Depois entre com seu e-mail e senha.
        </p>
        <Link href="/login" className="exam-tap mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
          Ir para login →
        </Link>
      </div>
    );
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  return (
    <form action={`/api/cadastro/${token}`} method="POST" className="space-y-4">
      <p className="text-sm text-slate-600">
        Você foi convidado(a) para o MedRank. Crie seu login — o professor liberará seu acesso em seguida.
      </p>

      <div>
        <label htmlFor="cadastro-name" className="block text-sm font-medium">Nome completo *</label>
        <input id="cadastro-name" name="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="cadastro-email" className="block text-sm font-medium">E-mail *</label>
        <input
          id="cadastro-email"
          name="email"
          type="email"
          defaultValue={inviteEmail ?? ''}
          readOnly={Boolean(inviteEmail)}
          required
          className={`${inputClass}${inviteEmail ? ' bg-slate-50' : ''}`}
        />
        {inviteEmail && (
          <p className="mt-1 text-xs text-slate-600">Este convite é exclusivo para este e-mail.</p>
        )}
      </div>
      <div>
        <label htmlFor="cadastro-password" className="block text-sm font-medium">Senha *</label>
        <input id="cadastro-password" name="password" type="password" required minLength={4} className={inputClass} />
      </div>
      <div>
        <label htmlFor="cadastro-confirm" className="block text-sm font-medium">Confirmar senha *</label>
        <input id="cadastro-confirm" name="confirm" type="password" required className={inputClass} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="exam-tap w-full rounded-lg bg-emerald-600 py-3 text-base font-semibold text-white hover:bg-emerald-700"
      >
        Criar minha conta
      </button>
    </form>
  );
}
