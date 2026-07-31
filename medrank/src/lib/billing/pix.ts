/**
 * Assinatura mensal MedRank — PIX manual (sem gateway no MVP).
 * Chave PIX = CPF do administrador. Conta só libera após confirmação no admin.
 */
export const MONTHLY_PRICE_CENTS = 1000; // R$ 10,00
export const SUBSCRIPTION_DAYS = 30;

/** WhatsApp do professor para enviar comprovante (DDD+número). Override: NEXT_PUBLIC_MEDRANK_WHATSAPP */
export const DEFAULT_WHATSAPP_DIGITS = '73999052933';

/** Dígitos da chave PIX (CPF). Override: NEXT_PUBLIC_MEDRANK_PIX_KEY ou MEDRANK_PIX_KEY */
export function getPixKeyDigits(): string {
  const raw = (
    process.env.NEXT_PUBLIC_MEDRANK_PIX_KEY ??
    process.env.MEDRANK_PIX_KEY ??
    '01695189574'
  ).replace(/\D/g, '');
  return raw || '01695189574';
}

export function getWhatsAppDigits(): string {
  const raw = (
    process.env.NEXT_PUBLIC_MEDRANK_WHATSAPP ??
    process.env.MEDRANK_WHATSAPP ??
    DEFAULT_WHATSAPP_DIGITS
  ).replace(/\D/g, '');
  return raw || DEFAULT_WHATSAPP_DIGITS;
}

/** Exibe 739-9905-2933 (padrão do professor). */
export function formatWhatsAppDisplay(digits = getWhatsAppDigits()): string {
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

/** Link wa.me: aluno manda mensagem pedindo liberação + comprovante. */
export function getWhatsAppProofUrl(emailHint?: string, nameHint?: string): string {
  const digits = getWhatsAppDigits();
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  const namePart = nameHint?.trim() ? ` Nome: ${nameHint.trim()}.` : '';
  const emailPart = emailHint?.trim() ? ` E-mail: ${emailHint.trim()}.` : '';
  const text =
    `Olá! Acabei de me cadastrar no MedRank e já paguei o PIX.` +
    `${namePart}${emailPart}` +
    ` Pode liberar meu acesso? Segue o comprovante.`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(text)}`;
}

export function formatPixKeyDisplay(digits = getPixKeyDigits()): string {
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }
  return digits;
}

export function formatPriceBrl(cents = MONTHLY_PRICE_CENTS): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function subscriptionExpiresAt(from = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + SUBSCRIPTION_DAYS);
  return d;
}

export function getPaidAccessCopy() {
  const digits = getPixKeyDigits();
  const whatsappDisplay = formatWhatsAppDisplay();
  return {
    priceCents: MONTHLY_PRICE_CENTS,
    priceLabel: formatPriceBrl(),
    periodLabel: 'por mês',
    pixKeyDigits: digits,
    pixKeyDisplay: formatPixKeyDisplay(digits),
    pixKeyType: 'CPF' as const,
    whatsappDigits: getWhatsAppDigits(),
    whatsappDisplay,
    whatsappUrl: getWhatsAppProofUrl(),
    instructions: [
      `Pague ${formatPriceBrl()} via PIX (chave CPF).`,
      'Na descrição do PIX, coloque seu nome e e-mail de cadastro.',
      `Depois, toque em “Me manda no WhatsApp pra liberar” (${whatsappDisplay}) e envie o comprovante.`,
      'O professor confere a mensagem e libera sua conta no app.',
    ],
  };
}
