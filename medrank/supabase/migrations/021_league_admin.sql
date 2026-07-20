-- Administrador de liga: aluno autorizado a criar ligas (grupos de estudo).
-- Não dá acesso ao painel do professor — só à criação/gestão das próprias ligas.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS league_admin BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN public.profiles.league_admin IS
  'Se true, o aluno pode criar ligas (study groups) e apagar as que criou.';
