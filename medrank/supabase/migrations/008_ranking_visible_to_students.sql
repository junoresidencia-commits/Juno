-- Ranking diário visível para alunos (competição)

ALTER TABLE public.exams
  ALTER COLUMN ranking_visible_to_students SET DEFAULT true;

UPDATE public.exams
SET ranking_visible_to_students = true,
    ranking_release = 'immediate'
WHERE ranking_visible_to_students = false;
