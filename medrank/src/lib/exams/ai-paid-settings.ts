import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { usesDemoStore } from '@/lib/demo-data';

export type AiPaidSettings = {
  enabled: boolean;
  daily_budget_usd: number;
  monthly_budget_usd: number;
  require_confirm: boolean;
};

export const DEFAULT_AI_PAID: AiPaidSettings = {
  enabled: false,
  daily_budget_usd: 0,
  monthly_budget_usd: 0,
  require_confirm: true,
};

/** Lê toggle de IA paga (padrão: desligada). */
export async function getAiPaidSettings(): Promise<AiPaidSettings> {
  if (usesDemoStore()) return { ...DEFAULT_AI_PAID };

  const admin = createAdminClient();
  if (!admin) return { ...DEFAULT_AI_PAID };

  const { data, error } = await admin
    .from('app_settings')
    .select('value')
    .eq('key', 'ai_paid')
    .maybeSingle();

  if (error || !data?.value) return { ...DEFAULT_AI_PAID };
  return { ...DEFAULT_AI_PAID, ...(data.value as Partial<AiPaidSettings>) };
}
