-- Apaga disputas diárias de hoje em diante (pré-montadas com banco antigo).
-- NÃO apaga tentativas históricas de datas passadas.
-- Depois: no app, Provas → Gerar do banco / ou o botão de reset regenera.

-- Ajuste a data se necessário (hoje BRT ≈ date no app)
-- Exemplo: apagar tudo a partir de 2026-07-24

WITH doomed AS (
  SELECT id
  FROM public.exams
  WHERE exam_kind = 'daily'
    AND date_available >= CURRENT_DATE
)
DELETE FROM public.attempt_answers
WHERE attempt_id IN (
  SELECT a.id FROM public.attempts a
  WHERE a.exam_id IN (SELECT id FROM doomed)
);

WITH doomed AS (
  SELECT id FROM public.exams
  WHERE exam_kind = 'daily' AND date_available >= CURRENT_DATE
)
DELETE FROM public.attempt_violations
WHERE attempt_id IN (
  SELECT a.id FROM public.attempts a WHERE a.exam_id IN (SELECT id FROM doomed)
);

WITH doomed AS (
  SELECT id FROM public.exams
  WHERE exam_kind = 'daily' AND date_available >= CURRENT_DATE
)
DELETE FROM public.attempts WHERE exam_id IN (SELECT id FROM doomed);

WITH doomed AS (
  SELECT id FROM public.exams
  WHERE exam_kind = 'daily' AND date_available >= CURRENT_DATE
)
DELETE FROM public.exam_question_reviews WHERE exam_id IN (SELECT id FROM doomed);

WITH doomed AS (
  SELECT id FROM public.exams
  WHERE exam_kind = 'daily' AND date_available >= CURRENT_DATE
)
DELETE FROM public.exam_question_overrides WHERE exam_id IN (SELECT id FROM doomed);

WITH doomed AS (
  SELECT id FROM public.exams
  WHERE exam_kind = 'daily' AND date_available >= CURRENT_DATE
)
DELETE FROM public.exam_questions WHERE exam_id IN (SELECT id FROM doomed);

DELETE FROM public.exams
WHERE exam_kind = 'daily'
  AND date_available >= CURRENT_DATE;
