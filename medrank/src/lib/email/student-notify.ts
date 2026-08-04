import 'server-only';
import { getAppBaseUrl } from '@/lib/app-url';
import { isEmailSendingConfigured } from '@/lib/email/config';
import { sendEmail } from '@/lib/email/send';
import {
  formatPriceBrl,
  formatWhatsAppDisplay,
  FULL_MONTHLY_CENTS,
  getPaidAccessCopy,
  getWhatsAppProofUrl,
  QUARTER_PRICE_CENTS,
  RECOMMENDED_PLAN_ID,
  YEAR_PRICE_CENTS,
} from '@/lib/billing/pix';

/**
 * Avisa o aluno: conta criada — falta PIX + comprovante no WhatsApp.
 */
export async function notifyStudentSignupPending(opts: {
  name: string;
  email: string;
}): Promise<{ emailed: boolean; error?: string }> {
  const loginUrl = `${getAppBaseUrl()}/login`;
  const cadastroOkUrl = `${getAppBaseUrl()}/cadastro?ok=1&email=${encodeURIComponent(opts.email)}`;
  const copy = getPaidAccessCopy();
  const fullMonth = formatPriceBrl(FULL_MONTHLY_CENTS);
  const promoMonth = formatPriceBrl();
  const quarter = formatPriceBrl(QUARTER_PRICE_CENTS);
  const year = formatPriceBrl(YEAR_PRICE_CENTS);
  const whatsappDisplay = formatWhatsAppDisplay();
  const whatsappUrl = getWhatsAppProofUrl({
    emailHint: opts.email,
    nameHint: opts.name,
    planId: RECOMMENDED_PLAN_ID,
    afterSignup: true,
  });

  const subject = 'MedRank: conta criada — pague o PIX e envie o comprovante';
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
      <p>Olá, <strong>${opts.name}</strong>!</p>
      <p>Sua conta no MedRank foi criada. Para liberar o acesso:</p>
      <ol>
        <li>Pague o PIX (chave CPF <strong>${copy.pixKeyDisplay}</strong>)</li>
        <li>Envie o comprovante no WhatsApp <strong>${whatsappDisplay}</strong></li>
      </ol>
      <p><strong>Valores:</strong> 1 mês ${fullMonth} · promo ${promoMonth}/mês por 3 meses · 3 meses à vista ${quarter} (−R$ 10) · anual ${year}.</p>
      <p><a href="${whatsappUrl}">Abrir WhatsApp pra liberar</a></p>
      <p><a href="${cadastroOkUrl}">Ver PIX de novo</a> · <a href="${loginUrl}">Ir para o login</a></p>
      <p style="font-size:12px;color:#64748b">Se entrar antes da liberação, verá “Aguardando liberação”.</p>
    </div>
  `.trim();
  const text = [
    `Olá, ${opts.name}!`,
    'Sua conta no MedRank foi criada. Para liberar:',
    `1) PIX chave CPF ${copy.pixKeyDisplay}`,
    `2) Comprovante no WhatsApp ${whatsappDisplay}`,
    `Valores: 1 mês ${fullMonth} · promo ${promoMonth}/mês · 3 meses ${quarter} · anual ${year}.`,
    `WhatsApp: ${whatsappUrl}`,
    `Login: ${loginUrl}`,
  ].join('\n');

  if (!isEmailSendingConfigured()) {
    return { emailed: false, error: 'RESEND_API_KEY não configurada' };
  }

  const result = await sendEmail({
    to: opts.email,
    subject,
    html,
    text,
  });

  return { emailed: result.ok, error: result.ok ? undefined : result.error };
}
