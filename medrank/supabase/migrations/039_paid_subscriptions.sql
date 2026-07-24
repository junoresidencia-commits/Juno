-- Assinatura mensal (PIX manual): validade após liberação pelo admin
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ;

COMMENT ON COLUMN public.profiles.subscription_expires_at IS
  'Fim do período pago (30 dias após Liberar acesso / Renovar). Null = sem assinatura registrada.';

CREATE INDEX IF NOT EXISTS idx_profiles_subscription_expires
  ON public.profiles (subscription_expires_at)
  WHERE role = 'student';
