-- Simulados: metadados para provas on-demand (prática, não competitiva)

ALTER TABLE exams
  ADD COLUMN IF NOT EXISTS exam_kind TEXT NOT NULL DEFAULT 'daily'
    CHECK (exam_kind IN ('daily', 'simulado'));

ALTER TABLE exams
  ADD COLUMN IF NOT EXISTS simulado_mode TEXT,
  ADD COLUMN IF NOT EXISTS area_filter TEXT,
  ADD COLUMN IF NOT EXISTS theme_filter TEXT;

COMMENT ON COLUMN exams.exam_kind IS 'daily = prova diária competitiva; simulado = prática on-demand';
COMMENT ON COLUMN exams.simulado_mode IS 'geral, enare, usp, area, tema, revisao_erros';
