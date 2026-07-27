-- Coluna para obrigar troca de senha no primeiro login (aluno criado pelo admin).
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT false;
