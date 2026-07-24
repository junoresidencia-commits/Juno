-- Lotes autorais (JSON/CSV externos) — rascunho até revisão admin
-- Nunca confundir com questão oficial de residência

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS external_id TEXT,
  ADD COLUMN IF NOT EXISTS question_kind TEXT
    CHECK (
      question_kind IS NULL
      OR question_kind IN (
        'official_residency',
        'authorial_guideline',
        'authorial_prediction',
        'in_review'
      )
    ),
  ADD COLUMN IF NOT EXISTS area TEXT,
  ADD COLUMN IF NOT EXISTS option_a_rationale TEXT,
  ADD COLUMN IF NOT EXISTS option_b_rationale TEXT,
  ADD COLUMN IF NOT EXISTS option_c_rationale TEXT,
  ADD COLUMN IF NOT EXISTS option_d_rationale TEXT,
  ADD COLUMN IF NOT EXISTS option_e_rationale TEXT,
  ADD COLUMN IF NOT EXISTS guideline_name TEXT,
  ADD COLUMN IF NOT EXISTS guideline_institution TEXT,
  ADD COLUMN IF NOT EXISTS guideline_year INTEGER,
  ADD COLUMN IF NOT EXISTS question_version TEXT,
  ADD COLUMN IF NOT EXISTS lote_importacao TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS questions_external_id_uidx
  ON public.questions (external_id)
  WHERE external_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS questions_lote_importacao_idx
  ON public.questions (lote_importacao);

CREATE INDEX IF NOT EXISTS questions_question_kind_idx
  ON public.questions (question_kind);

-- Amplia status dos lotes
ALTER TABLE public.question_import_batches
  DROP CONSTRAINT IF EXISTS question_import_batches_status_check;

ALTER TABLE public.question_import_batches
  ADD CONSTRAINT question_import_batches_status_check
  CHECK (status IN (
    'draft',
    'pending_review',
    'partially_approved',
    'completed',
    'published',
    'suspended',
    'rejected',
    'undone'
  ));

ALTER TABLE public.question_import_batches
  ADD COLUMN IF NOT EXISTS batch_kind TEXT NOT NULL DEFAULT 'official_exam'
    CHECK (batch_kind IN ('official_exam', 'authorial', 'mixed')),
  ADD COLUMN IF NOT EXISTS lote_codigo TEXT,
  ADD COLUMN IF NOT EXISTS payload_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS undone_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS question_import_batches_lote_codigo_uidx
  ON public.question_import_batches (lote_codigo)
  WHERE lote_codigo IS NOT NULL;

-- Marca oficiais existentes
UPDATE public.questions
SET question_kind = 'official_residency'
WHERE question_origin = 'official'
  AND question_kind IS NULL;
