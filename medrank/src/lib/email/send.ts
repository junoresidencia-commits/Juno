import 'server-only';
import { getEmailFrom, getResendApiKey, isEmailSendingConfigured } from '@/lib/email/config';

export type OutboundEmail = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(
  message: OutboundEmail
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!isEmailSendingConfigured()) {
    return { ok: false, skipped: true, error: 'RESEND_API_KEY não configurada' };
  }

  const to = message.to.trim().toLowerCase();
  if (!to.includes('@')) return { ok: false, error: 'E-mail inválido' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getResendApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getEmailFrom(),
        to: [to],
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { message?: string; name?: string };
    if (!res.ok) {
      return { ok: false, error: data.message || data.name || `Resend HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Falha ao enviar e-mail' };
  }
}
