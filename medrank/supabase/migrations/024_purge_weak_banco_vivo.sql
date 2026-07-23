-- Purge questões genéricas do banco-vivo antigo + regenerar disputa da Liga.
-- Rodar no SQL Editor DEPOIS do deploy do antifraude/expert-only.

-- 1) Tira questões fracas das provas (incluindo as de hoje)
DELETE FROM public.exam_questions eq
USING public.questions q
WHERE eq.question_id = q.id
  AND (
    q.option_a ILIKE '%Terapia empírica sem fisiopatologia%'
    OR q.option_b ILIKE '%Suspender nefroproteção sem motivo%'
    OR q.option_c ILIKE '%Integrar achados clínicos/labs e seguir guideline%'
    OR q.option_d ILIKE '%Intervenção agressiva sem indicação%'
    OR q.option_e ILIKE '%Observação sem seguimento em risco alto%'
    OR q.statement ILIKE '%ECG com alterações. Conduta imediata?%'
    OR (q.tags @> ARRAY['banco-vivo']::text[])
  );

-- 2) Apaga questões fracas sem respostas de alunos
DELETE FROM public.questions q
WHERE (
    q.option_a ILIKE '%Terapia empírica sem fisiopatologia%'
    OR q.option_b ILIKE '%Suspender nefroproteção sem motivo%'
    OR q.option_c ILIKE '%Integrar achados clínicos/labs e seguir guideline%'
    OR q.option_d ILIKE '%Intervenção agressiva sem indicação%'
    OR q.option_e ILIKE '%Observação sem seguimento em risco alto%'
    OR q.statement ILIKE '%ECG com alterações. Conduta imediata?%'
    OR (q.tags @> ARRAY['banco-vivo']::text[])
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.attempt_answers aa WHERE aa.question_id = q.id
  );

-- 3) Remove provas de hoje da Liga (para regenerar só com banco-expert)
DELETE FROM public.exams
WHERE date_available = (now() AT TIME ZONE 'America/Sao_Paulo')::date
  AND COALESCE(audience, 'general') = 'nephrology';

-- Depois: Admin → Questões → Importar banco completo
-- Depois: Admin → Provas → Gerar disputa de hoje
