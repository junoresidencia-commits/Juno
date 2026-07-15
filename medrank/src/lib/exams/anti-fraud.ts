export const VIOLATION_TYPES = [
  'tab_blur',
  'visibility_hidden',
  'window_blur',
  'page_hide',
  'devtools',
  'copy',
  'cut',
  'select_text',
  'context_menu',
  'screenshot_shortcut',
  'screen_capture',
  'abandoned_session',
  'other',
] as const;

export type ViolationType = (typeof VIOLATION_TYPES)[number];

export function isViolationType(value: string): value is ViolationType {
  return (VIOLATION_TYPES as readonly string[]).includes(value);
}

export const EXAM_TERMINATED_TITLE = 'PROVA ENCERRADA';

export const EXAM_TERMINATED_BODY = [
  'Foi detectada uma violação das regras de segurança (saída da tela da prova ou tentativa de interação não permitida).',
  'Conforme as regras da plataforma, sua prova foi encerrada automaticamente.',
  'Uma nova tentativa estará disponível somente no próximo dia.',
].join('\n\n');

export type ClientDeviceInfo = {
  device: string;
  browser: string;
  os: string;
  userAgent: string;
};

export function parseUserAgent(ua: string): Omit<ClientDeviceInfo, 'userAgent'> {
  const value = ua || 'unknown';
  let os = 'Desconhecido';
  if (/Windows NT/i.test(value)) os = 'Windows';
  else if (/Mac OS X|Macintosh/i.test(value)) os = 'macOS';
  else if (/Android/i.test(value)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(value)) os = 'iOS';
  else if (/Linux/i.test(value)) os = 'Linux';
  else if (/CrOS/i.test(value)) os = 'Chrome OS';

  let browser = 'Desconhecido';
  if (/Edg\//i.test(value)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(value)) browser = 'Opera';
  else if (/Chrome\//i.test(value) && !/Edg\//i.test(value)) browser = 'Chrome';
  else if (/Safari\//i.test(value) && !/Chrome\//i.test(value)) browser = 'Safari';
  else if (/Firefox\//i.test(value)) browser = 'Firefox';

  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPod/i.test(value)) device = 'Mobile';
  else if (/iPad|Tablet/i.test(value)) device = 'Tablet';

  return { device, browser, os };
}

export function getClientDeviceInfo(): ClientDeviceInfo {
  if (typeof navigator === 'undefined') {
    return { device: 'unknown', browser: 'unknown', os: 'unknown', userAgent: '' };
  }
  const userAgent = navigator.userAgent || '';
  return { ...parseUserAgent(userAgent), userAgent };
}

export function clientIpFromHeaders(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-client-ip') ||
    null
  );
}
