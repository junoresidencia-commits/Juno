-- Confere / força aprovação do Lote 04 (caso o import diga "duplicada")
-- Rode no Supabase SQL Editor.

-- 1) Quantas tem?
SELECT bank_status, count(*) AS qtd
FROM public.questions
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
GROUP BY bank_status
ORDER BY bank_status;

-- 2) Aprova todas do lote 04
UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = 'aprovada',
  quality_notes = COALESCE(quality_notes, '') || ' | aprovado lote 04'
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
  AND bank_status IN ('draft', 'pending_review', 'approved', 'disabled');

-- 3) Marca o batch como publicado (se existir)
UPDATE public.question_import_batches
SET
  status = 'published',
  approved_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
      AND bank_status = 'approved'
  ),
  question_count = (
    SELECT count(*) FROM public.questions
    WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
  )
WHERE lote_codigo = 'MEDRANK_AUTORAL_2026_LOTE_04';

-- 4) Resultado final
SELECT count(*) AS lote_04_aprovadas
FROM public.questions
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
  AND bank_status = 'approved';
