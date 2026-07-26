-- Aprova o Banco Adicional (depois de importar pelo painel)
UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = 'aprovada',
  quality_notes = COALESCE(quality_notes, '') || ' | Banco Adicional aprovado'
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_ADICIONAL';

UPDATE public.question_import_batches
SET
  status = 'published',
  title = 'Banco Adicional',
  approved_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_ADICIONAL'
      AND bank_status = 'approved'
  ),
  question_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_ADICIONAL'
  )
WHERE lote_codigo = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_ADICIONAL';

SELECT count(*) AS banco_adicional_aprovadas
FROM public.questions
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_BANCO_ADICIONAL'
  AND bank_status = 'approved';
