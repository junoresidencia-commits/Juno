import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAppBaseUrl } from '@/lib/app-url';
import { getAdminNotifyEmail, isEmailSendingConfigured } from '@/lib/email/config';
import { sendEmail } from '@/lib/email/send';
import {
  formatPriceBrl,
  formatWhatsAppDisplay,
  FULL_MONTHLY_CENTS,
  QUARTER_PRICE_CENTS,
  SUBSCRIPTION_PLANS,
} from '@/lib/billing/pix';
import { usesDemoStore } from '@/lib/demo-data';

/**
 * Avisa o professor: novo aluno se cadastrou e aguarda PIX / liberação.
 */
export async function notifyAdminNewSignup(opts: {
  name: string;
  email: string;
  userId?: string;
}): Promise<{ emailed: boolean; inApp: number; error?: string }> {
  const alunosUrl = `${getAppBaseUrl()}/admin/alunos`;
  const promoMonth = formatPriceBrl();
  const fullMonth = formatPriceBrl(FULL_MONTHLY_CENTS);
  const quarter = formatPriceBrl(QUARTER_PRICE_CENTS);
  const year = formatPriceBrl(SUBSCRIPTION_PLANS.year.priceCents);
  const subject = `MedRank: novo cadastro — ${opts.name} aguarda PIX`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
      <p><strong>${opts.name}</strong> (${opts.email}) criou a conta no MedRank.</p>
      <p>Status: <strong>aguardando PIX</strong>.</p>
      <p>Valores: 1 mês ${fullMonth} · promo ${promoMonth}/mês por 3 meses · 3 meses à vista ${quarter} (−R$ 10) · anual ${year}.</p>
      <p>Quando o comprovante chegar no WhatsApp (${formatWhatsAppDisplay()}), libere em Alunos no plano certo.</p>
      <p><a href="${alunosUrl}">Abrir Alunos → Liberar após PIX</a></p>
    </div>
  `.trim();
  const text = [
    `${opts.name} (${opts.email}) criou a conta no MedRank.`,
    `Aguardando PIX: 1 mês ${fullMonth} · promo ${promoMonth}/mês · 3 meses ${quarter} (−R$ 10) · anual ${year}.`,
    `WhatsApp comprovante: ${formatWhatsAppDisplay()}.`,
    `Liberar: ${alunosUrl}`,
  ].join('\n');

  let emailed = false;
  let error: string | undefined;

  if (isEmailSendingConfigured()) {
    const result = await sendEmail({
      to: getAdminNotifyEmail(),
      subject,
      html,
      text,
    });
    emailed = result.ok;
    if (!result.ok && !result.skipped) error = result.error;
  }

  let inApp = 0;
  if (!usesDemoStore()) {
    const admin = createAdminClient();
    if (admin) {
      const { data: admins } = await admin
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .eq('active', true);
      if (admins?.length) {
        const { error: insertErr } = await admin.from('user_notifications').insert(
          admins.map((a) => ({
            user_id: a.id,
            title: 'Novo cadastro aguardando PIX',
            body: `${opts.name} (${opts.email}) — liberar após comprovante no WhatsApp.`,
            kind: 'system',
            meta: {
              kind: 'signup_pending',
              student_email: opts.email,
              student_id: opts.userId ?? null,
            },
          }))
        );
        if (insertErr) {
          console.error('[signup-notify] in-app:', insertErr.message);
        } else {
          inApp = admins.length;
        }
      }
    }
  }

  return { emailed, inApp, error };
}
