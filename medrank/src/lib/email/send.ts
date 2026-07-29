import 'server-only';
import { getEmailFrom, getResendApiKey, isEmailSendingConfigured } from '@/lib/email/config';

export type OutboundEmail = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type SendEmailResult = {
  ok: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
};

/** Envia 1 e-mail via Resend. Sem RESEND_API_KEY → skip silencioso. */
export async function sendEmail(message: OutboundEmail): Promise<SendEmailResult> {
  if (!isEmailSendingConfigured()) {
    return { ok: false, skipped: true, error: 'RESEND_API_KEY não configurada' };
  }

  const to = message.to.trim().toLowerCase();
  if (!to.includes('@')) {
    return { ok: false, error: 'E-mail inválido' };
  }

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

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!res.ok) {
      return {
        ok: false,
        error: data.message || data.name || `Resend HTTP ${res.status}`,
      };
    }

    return { ok: true, id: data.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Falha ao enviar e-mail',
    };
  }
}

/** Envia até 100 e-mails por chamada (Resend batch). */
export async function sendEmailBatch(
  messages: OutboundEmail[],
  idempotencyKey?: string
): Promise<{ sent: number; failed: number; error?: string; skipped?: boolean }> {
  if (!messages.length) return { sent: 0, failed: 0 };
  if (!isEmailSendingConfigured()) {
    return { sent: 0, failed: 0, skipped: true, error: 'RESEND_API_KEY não configurada' };
  }

  const payload = messages
    .filter((m) => m.to.includes('@'))
    .map((m) => ({
      from: getEmailFrom(),
      to: [m.to.trim().toLowerCase()],
      subject: m.subject,
      html: m.html,
      text: m.text,
    }));

  if (!payload.length) return { sent: 0, failed: 0 };

  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${getResendApiKey()}`,
      'Content-Type': 'application/json',
    };
    if (idempotencyKey) {
      headers['Idempotency-Key'] = idempotencyKey.slice(0, 256);
    }

    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as {
      data?: { id: string }[];
      message?: string;
      name?: string;
    };

    if (!res.ok) {
      return {
        sent: 0,
        failed: payload.length,
        error: data.message || data.name || `Resend batch HTTP ${res.status}`,
      };
    }

    const sent = Array.isArray(data.data) ? data.data.length : payload.length;
    return { sent, failed: Math.max(0, payload.length - sent) };
  } catch (err) {
    return {
      sent: 0,
      failed: payload.length,
      error: err instanceof Error ? err.message : 'Falha no batch de e-mail',
    };
  }
}
