-- Ranking diário visível no dia seguinte

ALTER TABLE public.exams DROP CONSTRAINT IF EXISTS exams_ranking_release_check;

ALTER TABLE public.exams
  ADD CONSTRAINT exams_ranking_release_check
  CHECK (ranking_release IN ('after_all_done', 'after_window', 'immediate', 'next_day'));

UPDATE public.exams
SET ranking_release = 'next_day'
WHERE ranking_release = 'immediate';
