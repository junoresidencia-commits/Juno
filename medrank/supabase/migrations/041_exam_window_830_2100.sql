-- Disputa diária: 8h30 → 21h (Brasília). PDF libera após o fim da janela.
-- Desafio Expert (weekly_expert) mantém 20h–22h.

ALTER TABLE public.exams
  ALTER COLUMN window_start_hour SET DEFAULT 8,
  ALTER COLUMN window_end_hour SET DEFAULT 21;

COMMENT ON COLUMN public.exams.window_start_hour IS
  'Hora de abertura (America/Sao_Paulo). Disputa diária: 8 (+ minuto 30 no app).';
COMMENT ON COLUMN public.exams.window_end_hour IS
  'Hora de encerramento (America/Sao_Paulo). Disputa diária: 21. PDF libera depois.';

UPDATE public.exams
SET
  window_start_hour = 8,
  window_end_hour = 21
WHERE COALESCE(exam_kind, 'daily') = 'daily'
  AND (
    window_start_hour IS DISTINCT FROM 8
    OR window_end_hour IS DISTINCT FROM 21
  );
