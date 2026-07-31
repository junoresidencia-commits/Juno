import Link from 'next/link';
import { PixPaymentCard } from '@/components/billing/PixPaymentCard';
import { formatPriceBrl, formatWhatsAppDisplay } from '@/lib/billing/pix';

interface Props {
  /** Se omitido, cadastro público (sem convite). */
  token?: string;
  valid?: boolean;
  error?: string;
  inviteEmail?: string;
  success?: boolean;
  /** E-mail usado no sucesso (público ou convite). */
  successEmail?: string;
}

export function CadastroForm({
  token,
  valid = true,
  error,
  inviteEmail,
  success,
  successEmail,
}: Props) {
  const emailForPix = successEmail || inviteEmail;
  const publicSignup = !token;

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
          <p className="text-lg font-semibold text-emerald-900">Conta criada</p>
          <p className="mt-2 text-sm text-emerald-800">
            Agora pague {formatPriceBrl()} via PIX e envie o comprovante no WhatsApp{' '}
            <strong>{formatWhatsAppDisplay()}</strong>. Só depois liberamos o acesso.
          </p>
        </div>
        <PixPaymentCard emailHint={emailForPix} />
        <Link
          href="/login"
          className="exam-tap block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Ir para login →
        </Link>
        <p className="text-center text-xs text-slate-500">
          Se entrar antes da liberação, verá “Aguardando liberação”.
        </p>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center">
        <p className="text-red-800">{error || 'Link inválido'}</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-emerald-700 hover:underline">
          Ir para login
        </Link>
        <p className="mt-3 text-sm text-slate-600">
          Ou{' '}
          <Link href="/cadastro" className="font-semibold text-emerald-700 hover:underline">
            crie sua conta aqui
          </Link>
          .
        </p>
      </div>
    );
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';

  const action = publicSignup ? '/api/cadastro' : `/api/cadastro/${token}`;

  return (
    <form action={action} method="POST" className="space-y-4">
      <p className="text-sm text-slate-600">
        {publicSignup
          ? `Crie seu login. Depois pague ${formatPriceBrl()}/mês no PIX e envie o comprovante no WhatsApp ${formatWhatsAppDisplay()}. O professor libera no app.`
          : `Crie seu login. Em seguida você verá o PIX de ${formatPriceBrl()}/mês. A conta só libera após o pagamento confirmado.`}
      </p>

      <PixPaymentCard emailHint={inviteEmail} compact />

      <div>
        <label htmlFor="cadastro-name" className="block text-sm font-medium">
          Nome completo *
        </label>
        <input id="cadastro-name" name="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="cadastro-email" className="block text-sm font-medium">
          E-mail *
        </label>
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
          <p className="mt-1 text-xs text-slate-600">Este link é exclusivo para este e-mail.</p>
        )}
      </div>
      <div>
        <label htmlFor="cadastro-password" className="block text-sm font-medium">
          Senha *
        </label>
        <input
          id="cadastro-password"
          name="password"
          type="password"
          required
          minLength={4}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="cadastro-confirm" className="block text-sm font-medium">
          Confirmar senha *
        </label>
        <input id="cadastro-confirm" name="confirm" type="password" required className={inputClass} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="exam-tap w-full rounded-lg bg-teal-800 py-3 text-base font-semibold text-white hover:bg-teal-900"
      >
        Criar conta e ver PIX
      </button>
    </form>
  );
}
