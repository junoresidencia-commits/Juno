-- Aprova o Banco Nefro (depois de importar pelo painel)
UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = 'aprovada',
  quality_notes = COALESCE(quality_notes, '') || ' | Banco Nefro aprovado'
WHERE lote_importacao = 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_BANCO_NEFRO';

UPDATE public.question_import_batches
SET
  status = 'published',
  title = 'Banco Nefro',
  approved_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_BANCO_NEFRO'
      AND bank_status = 'approved'
  ),
  question_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_BANCO_NEFRO'
  )
WHERE lote_codigo = 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_BANCO_NEFRO';

SELECT
  specialty,
  count(*) AS qtd
FROM public.questions
WHERE lote_importacao = 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_BANCO_NEFRO'
  AND bank_status = 'approved'
GROUP BY specialty
ORDER BY specialty;
