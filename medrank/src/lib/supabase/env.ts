/** Chave pública do Supabase (anon / publishable — mesmo valor no dashboard) */

const PLACEHOLDER_URL_SNIPPETS = [
  'seu-projeto.supabase.co',
  'xxx.supabase.co',
  'placeholder.supabase.co',
  'api.example.com',
];

const PLACEHOLDER_KEYS = ['sua-anon-key', 'sua-publishable-key', 'placeholder', 'your-anon-key'];

export function getSupabaseAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    ''
  );
}

export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
}

function looksLikePlaceholderUrl(url: string): boolean {
  const normalized = url.trim().toLowerCase();
  if (!normalized) return true;
  return PLACEHOLDER_URL_SNIPPETS.some((snippet) => normalized.includes(snippet));
}

function looksLikePlaceholderKey(key: string): boolean {
  const normalized = key.trim().toLowerCase();
  if (!normalized) return true;
  return PLACEHOLDER_KEYS.some((snippet) => normalized === snippet || normalized.includes(snippet));
}

/** URL + chave reais presentes (não vazias, não placeholder de exemplo). */
export function isSupabaseEnvConfigured(): boolean {
  const url = getSupabaseUrl().trim();
  const key = getSupabaseAnonKey().trim();

  if (!url || !key) return false;
  if (looksLikePlaceholderUrl(url)) return false;
  if (looksLikePlaceholderKey(key)) return false;
  if (!/^https:\/\//i.test(url)) return false;

  return true;
}
