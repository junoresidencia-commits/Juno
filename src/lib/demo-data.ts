import { isDemoMode } from '@/lib/demo-mode';
import { isSkipAuth } from '@/lib/skip-auth';

/** Dados locais (JSON) em vez de Supabase — demo ou modo sem banco */
export function usesDemoStore(): boolean {
  return isSkipAuth() || isDemoMode();
}
