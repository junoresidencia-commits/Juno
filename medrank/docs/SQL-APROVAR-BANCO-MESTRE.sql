-- Aprova o Banco Mestre (depois de importar pelo painel)
UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = 'aprovada',
  quality_notes = COALESCE(quality_notes, '') || ' | Banco Mestre aprovado'
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_MESTRE';

UPDATE public.question_import_batches
SET
  status = 'published',
  title = 'Banco Mestre',
  approved_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_MESTRE'
      AND bank_status = 'approved'
  ),
  question_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_MESTRE'
  )
WHERE lote_codigo = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_MESTRE';

SELECT count(*) AS banco_mestre_aprovadas
FROM public.questions
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_MESTRE'
  AND bank_status = 'approved';
