/**
 * Assinatura mensal MedRank — PIX manual (sem gateway no MVP).
 * Chave PIX = CPF do administrador. Conta só libera após confirmação no admin.
 */
export const MONTHLY_PRICE_CENTS = 1000; // R$ 10,00
export const SUBSCRIPTION_DAYS = 30;

/** Dígitos da chave PIX (CPF). Override: NEXT_PUBLIC_MEDRANK_PIX_KEY ou MEDRANK_PIX_KEY */
export function getPixKeyDigits(): string {
  const raw = (
    process.env.NEXT_PUBLIC_MEDRANK_PIX_KEY ??
    process.env.MEDRANK_PIX_KEY ??
    '01695189574'
  ).replace(/\D/g, '');
  return raw || '01695189574';
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
  return {
    priceCents: MONTHLY_PRICE_CENTS,
    priceLabel: formatPriceBrl(),
    periodLabel: 'por mês',
    pixKeyDigits: digits,
    pixKeyDisplay: formatPixKeyDisplay(digits),
    pixKeyType: 'CPF' as const,
    instructions: [
      `Pague ${formatPriceBrl()} via PIX (chave CPF).`,
      'Na descrição do PIX, coloque seu nome e e-mail de cadastro.',
      'Depois do pagamento, o professor libera sua conta (em geral no mesmo dia).',
    ],
  };
}
