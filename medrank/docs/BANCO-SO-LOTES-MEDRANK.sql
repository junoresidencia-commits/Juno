-- Banco ativo:
--   1) Lotes MedRank 01–27
--   2) Oficiais ENARE / Revalida / USP com year >= 2024
-- Desativa oficiais antigas (<2024) e o resto sem lote.

-- Oficiais antigas
UPDATE public.questions
SET
  bank_status = 'disabled',
  quality_notes = COALESCE(quality_notes, '') || ' | oficial <2024 desatualizada'
WHERE question_origin = 'official'
  AND (year IS NULL OR year < 2024)
  AND bank_status IN ('approved', 'draft', 'pending_review');

-- Reativa oficiais 2024+ (se tinham sido desligadas por engano)
UPDATE public.questions
SET
  bank_status = 'approved',
  quality_label = COALESCE(quality_label, 'aprovada'),
  quality_notes = COALESCE(quality_notes, '') || ' | oficial 2024+ ativa'
WHERE question_origin = 'official'
  AND year >= 2024
  AND bank_status IN ('disabled', 'draft', 'pending_review', 'approved');

-- Fora de lote MedRank e não oficial 2024+
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

-- Contagem
SELECT
  CASE
    WHEN lote_importacao LIKE 'MEDRANK_%' THEN 'lote_medrank'
    WHEN question_origin = 'official' AND year >= 2024 THEN 'oficial_2024_plus'
    ELSE 'outro'
  END AS grupo,
  bank_status,
  count(*)
FROM public.questions
GROUP BY 1, 2
ORDER BY 1, 2;
