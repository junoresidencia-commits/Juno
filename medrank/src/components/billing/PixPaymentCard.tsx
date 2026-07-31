'use client';

import { useState } from 'react';
import {
  formatWhatsAppDisplay,
  getPaidAccessCopy,
  getWhatsAppProofUrl,
} from '@/lib/billing/pix';

type Props = {
  /** E-mail do aluno — sugerido na descrição do PIX e na msg do WhatsApp */
  emailHint?: string;
  compact?: boolean;
};

export function PixPaymentCard({ emailHint, compact }: Props) {
  const copy = getPaidAccessCopy();
  const [copied, setCopied] = useState(false);
  const descricao = emailHint
    ? `MedRank ${emailHint}`
    : 'MedRank — coloque seu e-mail na descrição';
  const whatsappUrl = getWhatsAppProofUrl(emailHint);
  const whatsappDisplay = formatWhatsAppDisplay(copy.whatsappDigits);

  async function copyKey() {
    try {
      await navigator.clipboard.writeText(copy.pixKeyDigits);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={`rounded-2xl bg-teal-900 p-5 text-white ${compact ? '' : 'ring-1 ring-teal-950'}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">Pagamento</p>
      <p className="mt-1 text-2xl font-bold">
        {copy.priceLabel}{' '}
        <span className="text-base font-medium text-teal-100">{copy.periodLabel}</span>
      </p>
      <p className="mt-3 text-sm text-teal-50">
        PIX · chave CPF · {copy.pixKeyDisplay}
      </p>
      <button
        type="button"
        onClick={() => void copyKey()}
        className="exam-tap mt-3 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-teal-950"
      >
        {copied ? 'Copiado!' : 'Copiar chave PIX'}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-teal-100">
        Valor: <strong className="text-white">{copy.priceLabel}</strong>
        <br />
        Descrição sugerida: <strong className="text-white">{descricao}</strong>
      </p>

      <div className="mt-4 rounded-xl bg-emerald-500/20 p-3 ring-1 ring-emerald-300/40">
        <p className="text-center text-sm font-semibold text-emerald-50">
          Pagou? Me manda no WhatsApp pra eu liberar
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="exam-tap mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-bold text-teal-950 hover:bg-emerald-300"
        >
          Abrir WhatsApp {whatsappDisplay}
        </a>
        <p className="mt-2 text-center text-xs text-teal-50">
          A mensagem já vem pronta: peça a liberação e anexe o comprovante.
        </p>
      </div>

      {!compact && (
        <ol className="mt-4 list-decimal space-y-1 pl-4 text-sm text-teal-50">
          {copy.instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
