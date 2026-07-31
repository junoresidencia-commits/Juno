import Link from 'next/link';
import { PixPaymentCard } from '@/components/billing/PixPaymentCard';
import {
  formatPriceBrl,
  formatWhatsAppDisplay,
  FULL_MONTHLY_CENTS,
  getPaidAccessCopy,
  getWhatsAppProofUrl,
  QUARTER_PRICE_CENTS,
  RECOMMENDED_PLAN_ID,
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
  successName?: string;
}

export function CadastroForm({
  token,
  valid = true,
  error,
  inviteEmail,
  success,
  successEmail,
  successName,
}: Props) {
  const emailForPix = successEmail || inviteEmail;
  const publicSignup = !token;
  const pricing = getPaidAccessCopy();
  const quarterPrice = formatPriceBrl(QUARTER_PRICE_CENTS);
  const fullMonth = formatPriceBrl(FULL_MONTHLY_CENTS);
  const whatsappDisplay = formatWhatsAppDisplay();
  const whatsappUrl = getWhatsAppProofUrl({
    emailHint: emailForPix,
    nameHint: successName,
    planId: RECOMMENDED_PLAN_ID,
    afterSignup: true,
  });

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
          <p className="text-lg font-semibold text-emerald-900">Conta criada</p>
          <p className="mt-2 text-sm text-emerald-800">
            1) Escolha o plano e pague o PIX abaixo
            <br />
            2) Me manda no WhatsApp <strong>{whatsappDisplay}</strong> com o comprovante pra
            liberar
          </p>
          <p className="mt-2 text-xs text-emerald-900/80">
            Promo {pricing.promoHeadline}. Só 1 mês: {fullMonth}. À vista 3 meses: {quarterPrice}{' '}
            (−R$ 10).
          </p>
        </div>

        <PixPaymentCard
          emailHint={emailForPix}
          nameHint={successName}
          afterSignup
        />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="exam-tap flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-4 text-center text-base font-bold text-white hover:bg-emerald-700"
        >
          Me manda no WhatsApp pra liberar →
        </a>
        <p className="text-center text-xs text-slate-600">
          Abre o WhatsApp com plano e valor. Anexe o comprovante do PIX.
        </p>

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
        Crie seu login primeiro. Depois você vê o PIX (promo {formatPriceBrl()}/mês · 1 mês{' '}
        {fullMonth} · 3 meses {quarterPrice}). WhatsApp {whatsappDisplay} pra liberar.
      </p>

      <div className="rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-950 ring-1 ring-teal-200">
        <p className="font-semibold">Valores (PIX depois de criar a conta)</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-xs text-teal-900">
          <li>Só 1 mês: {fullMonth}</li>
          <li>Promo: {formatPriceBrl()}/mês por 3 meses</li>
          <li>3 meses à vista: {quarterPrice} (−R$ 10)</li>
          <li>Semestral / anual: paga o período de uma vez</li>
        </ul>
      </div>

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
