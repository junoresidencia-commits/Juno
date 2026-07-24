import type { SupabaseClient } from '@supabase/supabase-js';
import { formatPriceBrl } from '@/lib/billing/pix';

export function isSubscriptionExpired(
  expiresAt: string | null | undefined,
  now = new Date()
): boolean {
  if (!expiresAt) return false;
  const end = new Date(expiresAt);
  if (Number.isNaN(end.getTime())) return false;
  return end.getTime() < now.getTime();
}

/** Mensagens de login / bloqueio por pagamento. */
export function accessDeniedMessage(profile: {
  active: boolean;
  approved_at?: string | null;
  subscription_expires_at?: string | null;
}): string {
  if (profile.active && !isSubscriptionExpired(profile.subscription_expires_at)) {
    return '';
  }

  if (!profile.approved_at) {
    return `Aguardando liberação. Pague o PIX de ${formatPriceBrl()} e aguarde o professor confirmar.`;
  }

  if (isSubscriptionExpired(profile.subscription_expires_at) || !profile.active) {
    if (isSubscriptionExpired(profile.subscription_expires_at)) {
      return `Assinatura vencida. Pague ${formatPriceBrl()} via PIX e o professor renova o mês.`;
    }
    return 'Acesso bloqueado.';
  }

  return 'Acesso bloqueado.';
}

/**
 * Se a assinatura venceu, desativa a conta.
 * Retorna true se bloqueou agora (ou já estava vencida e inativa).
 */
export async function deactivateIfSubscriptionExpired(
  admin: SupabaseClient,
  userId: string,
  expiresAt: string | null | undefined,
  currentlyActive: boolean
): Promise<boolean> {
  if (!isSubscriptionExpired(expiresAt)) return false;
  if (!currentlyActive) return true;

  const { error } = await admin
    .from('profiles')
    .update({ active: false })
    .eq('id', userId)
    .eq('role', 'student');

  if (error && /subscription_expires_at|schema cache/i.test(error.message)) {
    // Coluna pode faltar — ainda assim tratamos como vencido no login
    return true;
  }
  return true;
}

/** Cron: bloqueia todos os alunos ativos com assinatura vencida. */
export async function blockExpiredSubscriptions(
  admin: SupabaseClient,
  now = new Date()
): Promise<{ blocked: number; ids: string[] }> {
  const iso = now.toISOString();

  const { data: expired, error } = await admin
    .from('profiles')
    .select('id')
    .eq('role', 'student')
    .eq('active', true)
    .not('subscription_expires_at', 'is', null)
    .lt('subscription_expires_at', iso);

  if (error) {
    if (/subscription_expires_at|schema cache/i.test(error.message)) {
      return { blocked: 0, ids: [] };
    }
    throw new Error(error.message);
  }

  const ids = (expired ?? []).map((r) => r.id as string);
  if (ids.length === 0) return { blocked: 0, ids: [] };

  const { error: upd } = await admin
    .from('profiles')
    .update({ active: false })
    .in('id', ids);

  if (upd) throw new Error(upd.message);
  return { blocked: ids.length, ids };
}
