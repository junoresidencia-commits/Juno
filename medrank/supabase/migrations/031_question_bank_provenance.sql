-- Proveniência / revisão do banco permanente (provas públicas + importação)
-- Não apaga questões existentes: default bank_status = approved

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS bank_status TEXT NOT NULL DEFAULT 'approved'
    CHECK (bank_status IN (
      'draft',
      'pending_review',
      'approved',
      'rejected',
      'disabled',
      'annulled'
    )),
  ADD COLUMN IF NOT EXISTS question_origin TEXT NOT NULL DEFAULT 'original'
    CHECK (question_origin IN (
      'official',
      'original_based_on_exam',
      'original',
      'guideline'
    )),
  ADD COLUMN IF NOT EXISTS institution TEXT,
  ADD COLUMN IF NOT EXISTS exam_name TEXT,
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS official_answer TEXT,
  ADD COLUMN IF NOT EXISTS reproduction_allowed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS statement_fingerprint TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS import_batch_id UUID,
  ADD COLUMN IF NOT EXISTS appears_in_exams TEXT[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS questions_bank_status_idx
  ON public.questions (bank_status);

CREATE INDEX IF NOT EXISTS questions_origin_idx
  ON public.questions (question_origin);

CREATE INDEX IF NOT EXISTS questions_fingerprint_idx
  ON public.questions (statement_fingerprint);

CREATE INDEX IF NOT EXISTS questions_institution_year_idx
  ON public.questions (institution, year);

-- Lotes de importação (PDF/CSV/texto) — nunca publicam sozinhos
CREATE TABLE IF NOT EXISTS public.question_import_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  institution TEXT,
  exam_name TEXT,
  year INTEGER,
  source_url TEXT,
  reproduction_allowed BOOLEAN NOT NULL DEFAULT false,
  file_name TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review'
    CHECK (status IN ('pending_review', 'partially_approved', 'completed', 'rejected')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  question_count INTEGER NOT NULL DEFAULT 0,
  approved_count INTEGER NOT NULL DEFAULT 0,
  rejected_count INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.questions
  DROP CONSTRAINT IF EXISTS questions_import_batch_fk;
ALTER TABLE public.questions
  ADD CONSTRAINT questions_import_batch_fk
  FOREIGN KEY (import_batch_id) REFERENCES public.question_import_batches(id) ON DELETE SET NULL;

ALTER TABLE public.question_import_batches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages question_import_batches" ON public.question_import_batches;
CREATE POLICY "Admin manages question_import_batches" ON public.question_import_batches
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_import_batches TO authenticated;
GRANT ALL ON public.question_import_batches TO service_role;

-- Configuração do app (IA paga desligada por padrão)
CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages app_settings" ON public.app_settings;
CREATE POLICY "Admin manages app_settings" ON public.app_settings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;

INSERT INTO public.app_settings (key, value)
VALUES (
  'ai_paid',
  jsonb_build_object(
    'enabled', false,
    'daily_budget_usd', 0,
    'monthly_budget_usd', 0,
    'require_confirm', true
  )
)
ON CONFLICT (key) DO NOTHING;

-- Fingerprint simples para questões já existentes (dedupe futuro)
UPDATE public.questions
SET statement_fingerprint = md5(lower(regexp_replace(trim(statement), '\s+', ' ', 'g')))
WHERE statement_fingerprint IS NULL;
