import Link from 'next/link';
import { PixPaymentCard } from '@/components/billing/PixPaymentCard';
import {
  formatPriceBrl,
  formatWhatsAppDisplay,
  getWhatsAppProofUrl,
} from '@/lib/billing/pix';

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
  const whatsappUrl = getWhatsAppProofUrl(emailForPix);
  const whatsappDisplay = formatWhatsAppDisplay();

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
          <p className="text-lg font-semibold text-emerald-900">Conta criada</p>
          <p className="mt-2 text-sm text-emerald-800">
            1) Pague {formatPriceBrl()} no PIX abaixo
            <br />
            2) Me manda no WhatsApp <strong>{whatsappDisplay}</strong> pra eu liberar (com o
            comprovante)
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="exam-tap flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-4 text-center text-base font-bold text-white hover:bg-emerald-700"
        >
          Me manda no WhatsApp pra liberar →
        </a>
        <p className="text-center text-xs text-slate-600">
          Abre o WhatsApp com a mensagem pronta. Anexe o comprovante do PIX.
        </p>

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
          ? `Crie seu login. Depois pague ${formatPriceBrl()}/mês no PIX e me manda no WhatsApp ${whatsappDisplay} pra eu liberar.`
          : `Crie seu login. Em seguida você verá o PIX de ${formatPriceBrl()}/mês. Depois me manda no WhatsApp pra liberar.`}
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
          minLength={6}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-slate-500">Mínimo 6 caracteres.</p>
      </div>
      <div>
        <label htmlFor="cadastro-confirm" className="block text-sm font-medium">
          Confirmar senha *
        </label>
        <input
          id="cadastro-confirm"
          name="confirm"
          type="password"
          required
          minLength={6}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="exam-tap w-full rounded-lg bg-teal-800 py-3 text-base font-semibold text-white hover:bg-teal-900"
      >
        Criar conta e ver PIX
      </button>
    </form>
  );
}
