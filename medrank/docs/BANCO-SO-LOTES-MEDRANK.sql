-- Banco ativo = SÓ lotes MedRank 01–27.
-- Desativa oficiais ENARE, sintéticas e qualquer coisa fora desses lotes.
-- Rode no SQL Editor do Supabase.

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

-- Contagem do que vale
SELECT bank_status, count(*)
FROM public.questions
WHERE lote_importacao LIKE 'MEDRANK_AUTORAL_2026_LOTE_%'
   OR lote_importacao LIKE 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%'
   OR lote_importacao LIKE 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'
GROUP BY 1
ORDER BY 1;
