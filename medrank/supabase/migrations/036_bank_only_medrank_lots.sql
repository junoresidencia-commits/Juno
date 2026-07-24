-- Banco ativo = SÓ lotes MedRank 01–27 (desativa o resto).
UPDATE public.questions
SET
  bank_status = 'disabled',
  quality_notes = COALESCE(quality_notes, '') || ' | fora dos lotes MedRank 01-27'
WHERE bank_status IN ('approved', 'draft', 'pending_review')
  AND NOT (
    lote_importacao LIKE 'MEDRANK_AUTORAL_2026_LOTE_%'
    OR lote_importacao LIKE 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%'
    OR lote_importacao LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
  );
