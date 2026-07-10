-- Convite vinculado ao e-mail do aluno + turma sem limite fixo de alunos

ALTER TABLE public.invite_tokens
  ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_invite_tokens_email ON public.invite_tokens(email);

-- Remove limite de 15 alunos ativos (convites por e-mail controlam quem entra)
DROP TRIGGER IF EXISTS enforce_student_limit ON public.profiles;
DROP FUNCTION IF EXISTS check_student_limit();
