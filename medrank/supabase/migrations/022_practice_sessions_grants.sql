-- Corrige: permission denied for table practice_sessions / practice_progress
-- O app usa service_role para ler/gravar treinos.

GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_progress TO authenticated;
GRANT ALL ON public.practice_sessions TO service_role;
GRANT ALL ON public.practice_progress TO service_role;

-- Garante coluna liga (caso tabela tenha sido criada antes)
ALTER TABLE public.practice_sessions
  ADD COLUMN IF NOT EXISTS liga TEXT;
