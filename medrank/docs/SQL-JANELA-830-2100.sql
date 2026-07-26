-- Rodar no SQL Editor do Supabase (se a migration automática não aplicou).
-- Atualiza provas diárias para 8h30–21h. Expert (20h–22h) não é alterado.

ALTER TABLE public.exams
  ALTER COLUMN window_start_hour SET DEFAULT 8,
  ALTER COLUMN window_end_hour SET DEFAULT 21;

UPDATE public.exams
SET
  window_start_hour = 8,
  window_end_hour = 21
WHERE COALESCE(exam_kind, 'daily') = 'daily'
  AND (
    window_start_hour IS DISTINCT FROM 8
    OR window_end_hour IS DISTINCT FROM 21
  );
