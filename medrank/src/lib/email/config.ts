import 'server-only';

export function getResendApiKey(): string {
  return process.env.RESEND_API_KEY?.trim() ?? '';
}

export function getEmailFrom(): string {
  return process.env.EMAIL_FROM?.trim() || 'MedRank <onboarding@resend.dev>';
}

/** E-mail do professor que recebe aviso de novo cadastro. */
export function getAdminNotifyEmail(): string {
  return (
    process.env.ADMIN_NOTIFY_EMAIL?.trim() ||
    process.env.MEDRANK_ADMIN_EMAIL?.trim() ||
    'junoresidencia@gmail.com'
  );
}

export function isEmailSendingConfigured(): boolean {
  return Boolean(getResendApiKey());
}
