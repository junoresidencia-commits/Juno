-- Scores/meta da revisão IA obrigatória por questão da disputa
ALTER TABLE public.exam_question_reviews
  ADD COLUMN IF NOT EXISTS meta JSONB NOT NULL DEFAULT '{}'::jsonb;

-- status draft já existe no enum/check de exams; garantir que draft não aparece para aluno
-- (app filtra status=published)
