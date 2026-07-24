-- Banco ativo = lotes MedRank 01–27 + oficiais year >= 2024
UPDATE public.questions
SET
  bank_status = 'disabled',
  quality_notes = COALESCE(quality_notes, '') || ' | oficial <2024 desatualizada'
WHERE question_origin = 'official'
  AND (year IS NULL OR year < 2024)
  AND bank_status IN ('approved', 'draft', 'pending_review');

UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = COALESCE(quality_label, 'aprovada')
WHERE question_origin = 'official'
  AND year >= 2024
  AND bank_status IN ('disabled', 'draft', 'pending_review', 'approved');

UPDATE public.questions
SET
  bank_status = 'disabled',
  quality_notes = COALESCE(quality_notes, '') || ' | fora lotes / oficial antiga'
WHERE bank_status IN ('approved', 'draft', 'pending_review')
  AND NOT (
    lote_importacao LIKE 'MEDRANK_AUTORAL_2026_LOTE_%'
    OR lote_importacao LIKE 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%'
    OR lote_importacao LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
  )
  AND NOT (question_origin = 'official' AND year >= 2024);
