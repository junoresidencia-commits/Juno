-- Janela diária da prova: 7h às 22h (horário de Brasília)

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS window_start_hour SMALLINT NOT NULL DEFAULT 7,
  ADD COLUMN IF NOT EXISTS window_end_hour SMALLINT NOT NULL DEFAULT 22;

COMMENT ON COLUMN public.exams.window_start_hour IS 'Hora de abertura da prova (America/Sao_Paulo)';
COMMENT ON COLUMN public.exams.window_end_hour IS 'Hora de encerramento da prova (America/Sao_Paulo)';
