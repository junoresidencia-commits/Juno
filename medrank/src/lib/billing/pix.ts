/**
 * Assinatura MedRank — PIX manual (sem gateway no MVP).
 * Chave PIX = CPF do administrador. Conta só libera após confirmação no admin.
 *
 * Preços:
 * - Só 1 mês: R$ 30
 * - Promo mensal (R$ 19,90/mês na promo de 3 meses)
 * - 3 meses à vista: de R$ 60 por R$ 50 (−R$ 10)
 * - Semestral R$ 100 / anual R$ 180 (paga o período de uma vez)
 */

/** Preço cheio de 1 mês avulso. */
export const FULL_MONTHLY_CENTS = 3000;

/** Promo: R$ 19,90/mês. */
export const PROMO_MONTHLY_CENTS = 1990;

/** 3 meses “cheio” da promo (arredondado): R$ 60. */
export const QUARTER_LIST_CENTS = 6000;

/** Desconto da promo à vista (3 meses): −R$ 10. */
export const QUARTER_PROMO_OFF_CENTS = 1000;

/** 3 meses à vista com promo −R$ 10 → R$ 50. */
export const QUARTER_PRICE_CENTS = QUARTER_LIST_CENTS - QUARTER_PROMO_OFF_CENTS; // 5000

/** Semestral à vista (arredondado). */
export const SEMESTER_PRICE_CENTS = 10000;

/** Anual à vista. */
export const YEAR_PRICE_CENTS = 18000;

/** Compat: preço mensal de referência (promo). */
export const MONTHLY_PRICE_CENTS = PROMO_MONTHLY_CENTS;

/** Dias do plano mensal (compat). */
export const SUBSCRIPTION_DAYS = 30;

export type SubscriptionPlanId =
  | 'month'
  | 'promo_month'
  | 'quarter'
  | 'semester'
  | 'year';

export type SubscriptionPlan = {
  id: SubscriptionPlanId;
  /** Nome curto no admin / lista. */
  label: string;
  /** Dias de acesso ao liberar/renovar. */
  days: number;
  /** Valor do PIX em centavos. */
  priceCents: number;
  /** Valor “de” (riscado), se houver promo. */
  compareAtCents?: number;
  /** Destaque comercial. */
  highlight?: boolean;
  /** Texto auxiliar curto. */
  note?: string;
  /** Como pagar (mensal / à vista). */
  payHint?: string;
};

/**
 * Planos oficiais (valores redondos no PIX):
 * - 1 mês avulso: R$ 30
 * - Promo mensal: R$ 19,90 (1 mês na promo de 3)
 * - 3 meses à vista: R$ 50 (de R$ 60 · −R$ 10)
 * - Semestral: R$ 100
 * - Anual: R$ 180
 */
export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlan> = {
  month: {
    id: 'month',
    label: '1 mês',
    days: 30,
    priceCents: FULL_MONTHLY_CENTS,
    note: 'Só 1 mês',
    payHint: 'Avulso — sem promo',
  },
  promo_month: {
    id: 'promo_month',
    label: 'Promo mensal',
    days: 30,
    priceCents: PROMO_MONTHLY_CENTS,
    compareAtCents: FULL_MONTHLY_CENTS,
    note: 'R$ 19,90/mês',
    payHint: 'Na promo de 3 meses',
  },
  quarter: {
    id: 'quarter',
    label: '3 meses',
    days: 90,
    priceCents: QUARTER_PRICE_CENTS,
    compareAtCents: QUARTER_LIST_CENTS,
    highlight: true,
    note: 'Promo −R$ 10',
    payHint: 'Ou R$ 19,90/mês por 3 meses',
  },
  semester: {
    id: 'semester',
    label: 'Semestral',
    days: 180,
    priceCents: SEMESTER_PRICE_CENTS,
    compareAtCents: FULL_MONTHLY_CENTS * 6,
    note: '6 meses à vista',
    payHint: 'Paga o semestre de uma vez',
  },
  year: {
    id: 'year',
    label: 'Anual',
    days: 365,
    priceCents: YEAR_PRICE_CENTS,
    compareAtCents: FULL_MONTHLY_CENTS * 12,
    note: 'Paga o ano inteiro',
    payHint: 'Melhor para o ano todo',
  },
};

/** Planos na tela do aluno (card PIX). */
export const SUBSCRIPTION_PLAN_LIST: SubscriptionPlan[] = [
  SUBSCRIPTION_PLANS.month,
  SUBSCRIPTION_PLANS.promo_month,
  SUBSCRIPTION_PLANS.quarter,
  SUBSCRIPTION_PLANS.semester,
  SUBSCRIPTION_PLANS.year,
];

/** Plano recomendado na tela do aluno (3 meses à vista com −R$ 10). */
export const RECOMMENDED_PLAN_ID: SubscriptionPlanId = 'quarter';

export function isSubscriptionPlanId(value: unknown): value is SubscriptionPlanId {
  return (
    value === 'month' ||
    value === 'promo_month' ||
    value === 'quarter' ||
    value === 'semester' ||
    value === 'year'
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

export type WhatsAppProofOpts = {
  emailHint?: string;
  nameHint?: string;
  /** Plano escolhido — inclui valor na mensagem. */
  planId?: SubscriptionPlanId | null;
  /** Se true, mensagem de “conta criada, falta PIX”. */
  afterSignup?: boolean;
};

/** Link wa.me: aluno manda mensagem pedindo liberação + comprovante. */
export function getWhatsAppProofUrl(opts: WhatsAppProofOpts | string = {}): string {
  // Compat: getWhatsAppProofUrl(email) antigo
  const options: WhatsAppProofOpts =
    typeof opts === 'string' ? { emailHint: opts } : opts ?? {};

  const digits = getWhatsAppDigits();
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  const namePart = options.nameHint?.trim() ? ` Nome: ${options.nameHint.trim()}.` : '';
  const emailPart = options.emailHint?.trim() ? ` E-mail: ${options.emailHint.trim()}.` : '';

  const plan = options.planId ? getSubscriptionPlan(options.planId) : null;
  const planPart = plan
    ? ` Paguei ${formatPriceBrl(plan.priceCents)} no plano ${plan.label}.`
    : '';

  const opener = options.afterSignup
    ? 'Olá! Acabei de criar minha conta no MedRank.'
    : 'Olá! Acabei de me cadastrar no MedRank e já paguei o PIX.';

  const closer = options.afterSignup
    ? `${planPart}${namePart}${emailPart} Vou pagar o PIX e envio o comprovante. Pode liberar meu acesso?`
    : `${planPart}${namePart}${emailPart} Pode liberar meu acesso? Segue o comprovante.`;

  const text = `${opener}${closer}`;
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
  const fullMonth = formatPriceBrl(FULL_MONTHLY_CENTS);
  const promoMonth = formatPriceBrl(PROMO_MONTHLY_CENTS);
  const quarterList = formatPriceBrl(QUARTER_LIST_CENTS);
  const quarterPromo = formatPriceBrl(QUARTER_PRICE_CENTS);
  const semester = formatPriceBrl(SEMESTER_PRICE_CENTS);
  const yearPromo = formatPriceBrl(YEAR_PRICE_CENTS);

  return {
    priceCents: PROMO_MONTHLY_CENTS,
    priceLabel: promoMonth,
    periodLabel: 'por mês · promo 3 meses',
    fullMonthlyLabel: fullMonth,
    promoMonthlyLabel: promoMonth,
    promoQuarterLabel: quarterPromo,
    quarterListLabel: quarterList,
    promoHeadline: `${promoMonth}/mês por 3 meses`,
    promoDeal: `3 meses à vista: de ${quarterList} por ${quarterPromo} (−R$ 10)`,
    fullMonthLine: `Só 1 mês: ${fullMonth}`,
    yearLine: `Quer o ano todo? Pague de uma vez ${yearPromo}`,
    plans: SUBSCRIPTION_PLAN_LIST,
    recommendedPlanId: RECOMMENDED_PLAN_ID,
    pixKeyDigits: digits,
    pixKeyDisplay: formatPixKeyDisplay(digits),
    pixKeyType: 'CPF' as const,
    whatsappDigits: getWhatsAppDigits(),
    whatsappDisplay,
    whatsappUrl: getWhatsAppProofUrl(),
    instructions: [
      `Só 1 mês: ${fullMonth}.`,
      `Promo 3 meses: ${promoMonth}/mês — ou pague de uma vez ${quarterPromo} (de ${quarterList}, −R$ 10).`,
      `Semestral ${semester} ou anual ${yearPromo}: pague o período de uma vez.`,
      'Na descrição do PIX, coloque seu nome e e-mail de cadastro.',
      `Depois, toque em “Me manda no WhatsApp pra liberar” (${whatsappDisplay}) e envie o comprovante.`,
    ],
  };
}
