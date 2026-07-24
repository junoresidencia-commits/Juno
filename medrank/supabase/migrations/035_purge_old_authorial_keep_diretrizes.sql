-- Limpa lotes AUTORAIS antigos e mantém só DIRETRIZES 20–27.
-- NÃO apaga oficiais ENARE/Revalida.
-- Rode no SQL Editor do Supabase.

-- 1) Desativa autorais antigas que já entraram em prova/resposta
UPDATE public.questions q
SET
  bank_status = 'disabled',
  quality_notes = COALESCE(quality_notes, '') || ' | purge: autoral antigo'
WHERE COALESCE(q.question_kind, '') IN (
    'authorial_guideline',
    'authorial_prediction',
    'in_review'
  )
  AND COALESCE(q.question_origin, '') <> 'official'
  AND (
    q.lote_importacao IS NULL
    OR q.lote_importacao NOT LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
  )
  AND (
    EXISTS (SELECT 1 FROM public.exam_questions eq WHERE eq.question_id = q.id)
    OR EXISTS (SELECT 1 FROM public.attempt_answers aa WHERE aa.question_id = q.id)
  );

-- 2) Apaga autorais antigas sem uso em prova
DELETE FROM public.questions q
WHERE COALESCE(q.question_kind, '') IN (
    'authorial_guideline',
    'authorial_prediction',
    'in_review'
  )
  AND COALESCE(q.question_origin, '') <> 'official'
  AND (
    q.lote_importacao IS NULL
    OR q.lote_importacao NOT LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
  )
  AND NOT EXISTS (SELECT 1 FROM public.exam_questions eq WHERE eq.question_id = q.id)
  AND NOT EXISTS (SELECT 1 FROM public.attempt_answers aa WHERE aa.question_id = q.id);

-- 3) Marca lotes autorais antigos como rejected
UPDATE public.question_import_batches
SET
  status = 'rejected',
  undone_at = now(),
  notes = COALESCE(notes, '') || ' | purge: manter só DIR 20-27'
WHERE batch_kind = 'authorial'
  AND (
    lote_codigo IS NULL
    OR lote_codigo NOT LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
  );
