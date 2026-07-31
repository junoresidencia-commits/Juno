/**
 * Assinatura MedRank — PIX manual (sem gateway no MVP).
 * Chave PIX = CPF do administrador. Conta só libera após confirmação no admin.
 */

/** Promo: R$ 19,90/mês (referência do pacote de 3 meses). */
export const PROMO_MONTHLY_CENTS = 1990;

/** Compat: preço mensal de referência (= promo). */
export const MONTHLY_PRICE_CENTS = PROMO_MONTHLY_CENTS;

/** Dias do plano mensal (compat). */
export const SUBSCRIPTION_DAYS = 30;

export type SubscriptionPlanId = 'month' | 'quarter' | 'semester' | 'year';

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  /** Nome curto no admin / lista. */
  label: string;
  /** Dias de acesso ao liberar/renovar. */
  days: number;
  /** Valor do PIX em centavos. */
  priceCents: number;
  /** Destaque comercial (ex.: promo à vista). */
  highlight?: boolean;
  /** Texto auxiliar. */
  note?: string;
};

/**
 * Planos oficiais:
 * - 1 mês: R$ 19,90
 * - 3 meses à vista (promo): R$ 50
 * - Semestral: R$ 90
 * - Anual: R$ 160
 */
export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  month: {
    id: 'month',
    label: '1 mês',
    days: 30,
    priceCents: 1990,
    note: 'R$ 19,90',
  },
  quarter: {
    id: 'quarter',
    label: '3 meses',
    days: 90,
    priceCents: 5000,
    highlight: true,
    note: 'Promo à vista — R$ 50',
  },
  semester: {
    id: 'semester',
    label: 'Semestral',
    days: 180,
    priceCents: 9000,
    note: '6 meses — R$ 90',
  },
  year: {
    id: 'year',
    label: 'Anual',
    days: 365,
    priceCents: 16000,
    note: '12 meses — R$ 160',
  },
};

export const SUBSCRIPTION_PLAN_LIST: SubscriptionPlan[] = [
  SUBSCRIPTION_PLANS.month,
  SUBSCRIPTION_PLANS.quarter,
  SUBSCRIPTION_PLANS.semester,
  SUBSCRIPTION_PLANS.year,
];

/** Plano recomendado na tela do aluno (promo 3 meses à vista). */
export const RECOMMENDED_PLAN_ID: SubscriptionPlanId = 'quarter';

export function isSubscriptionPlanId(value: unknown): value is SubscriptionPlanId {
  return (
    value === 'month' || value === 'quarter' || value === 'semester' || value === 'year'
  );
}

export function getSubscriptionPlan(id?: string | null): SubscriptionPlan {
  if (isSubscriptionPlanId(id)) return SUBSCRIPTION_PLANS[id];
  return SUBSCRIPTION_PLANS[RECOMMENDED_PLAN_ID];
}

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

export function formatPriceBrl(cents = PROMO_MONTHLY_CENTS): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function addSubscriptionDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

/** Expira após N dias (padrão = plano mensal). */
export function subscriptionExpiresAt(from = new Date(), days = SUBSCRIPTION_DAYS): Date {
  return addSubscriptionDays(from, days);
}

/** Soma dias a partir de agora ou do fim atual (renovação). */
export function nextSubscriptionExpiry(
  currentExpires: string | null | undefined,
  days: number,
  now = new Date()
): Date {
  const current = currentExpires ? new Date(currentExpires) : now;
  const from = !Number.isNaN(current.getTime()) && current > now ? current : now;
  return addSubscriptionDays(from, days);
}

export function getPaidAccessCopy() {
  const digits = getPixKeyDigits();
  const whatsappDisplay = formatWhatsAppDisplay();
  const quarter = SUBSCRIPTION_PLANS.quarter;
  const monthlyLabel = formatPriceBrl(PROMO_MONTHLY_CENTS);
  const quarterLabel = formatPriceBrl(quarter.priceCents);

  return {
    priceCents: PROMO_MONTHLY_CENTS,
    priceLabel: monthlyLabel,
    periodLabel: 'por mês · promo 3 meses',
    promoMonthlyLabel: monthlyLabel,
    promoQuarterLabel: quarterLabel,
    promoHeadline: `${monthlyLabel}/mês por 3 meses`,
    promoDeal: `Pague de uma vez ${quarterLabel} e leve 3 meses`,
    plans: SUBSCRIPTION_PLAN_LIST,
    recommendedPlanId: RECOMMENDED_PLAN_ID,
    pixKeyDigits: digits,
    pixKeyDisplay: formatPixKeyDisplay(digits),
    pixKeyType: 'CPF' as const,
    whatsappDigits: getWhatsAppDigits(),
    whatsappDisplay,
    whatsappUrl: getWhatsAppProofUrl(),
    instructions: [
      `Promo: ${monthlyLabel}/mês por 3 meses — ou pague de uma vez ${quarterLabel} (3 meses).`,
      'Na descrição do PIX, coloque seu nome e e-mail de cadastro.',
      `Depois, toque em “Me manda no WhatsApp pra liberar” (${whatsappDisplay}) e envie o comprovante.`,
      'O professor confere a mensagem e libera sua conta no app.',
    ],
  };
}
