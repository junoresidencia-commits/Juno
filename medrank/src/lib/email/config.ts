import 'server-only';

export function getResendApiKey(): string {
  return process.env.RESEND_API_KEY?.trim() ?? '';
}

/** Ex.: MedRank <prova@seudominio.com> — em teste use onboarding@resend.dev */
export function getEmailFrom(): string {
  const from = process.env.EMAIL_FROM?.trim();
  if (from) return from;
  return 'MedRank <onboarding@resend.dev>';
}

export function isEmailSendingConfigured(): boolean {
  return Boolean(getResendApiKey());
}
