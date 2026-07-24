-- Índices para acelerar contagem/sorteio por lote e especialidade
CREATE INDEX IF NOT EXISTS idx_questions_bank_lote
  ON public.questions (bank_status, lote_importacao)
  WHERE bank_status = 'approved';

CREATE INDEX IF NOT EXISTS idx_questions_bank_specialty
  ON public.questions (bank_status, specialty)
  WHERE bank_status = 'approved';

CREATE INDEX IF NOT EXISTS idx_questions_bank_origin_year
  ON public.questions (bank_status, question_origin, year)
  WHERE bank_status = 'approved';
