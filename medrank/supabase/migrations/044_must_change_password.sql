-- Primeiro acesso: aluno criado pelo professor deve trocar a senha.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.profiles.must_change_password IS
  'true = redirecionar para trocar senha no primeiro login (contas criadas pelo admin).';
