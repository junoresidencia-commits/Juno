-- Classificação de qualidade do banco + log de auditoria admin
-- Suspende uso em disputa via bank_status (disabled/annulled)

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS quality_label TEXT
    CHECK (
      quality_label IS NULL
      OR quality_label IN (
        'aprovada',
        'precisa_de_correcao',
        'muito_facil',
        'enunciado_mal_construido',
        'alternativa_ambigua',
        'gabarito_duvidoso',
        'questao_repetida',
        'deve_ser_excluida',
        'anulada'
      )
    ),
  ADD COLUMN IF NOT EXISTS quality_notes TEXT,
  ADD COLUMN IF NOT EXISTS quality_reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS quality_reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS questions_quality_label_idx
  ON public.questions (quality_label);

CREATE INDEX IF NOT EXISTS questions_origin_status_idx
  ON public.questions (question_origin, bank_status);

-- Histórico de ações do admin no banco (não só remediação por prova)
CREATE TABLE IF NOT EXISTS public.question_bank_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN (
    'approve',
    'suspend',
    'exclude',
    'restore',
    'edit',
    'fix_gabarito',
    'classify',
    'annul_official',
    'bulk_suspend_synthetic',
    'bulk_classify'
  )),
  old_bank_status TEXT,
  new_bank_status TEXT,
  old_quality_label TEXT,
  new_quality_label TEXT,
  old_correct_option CHAR(1),
  new_correct_option CHAR(1),
  reason TEXT NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS question_bank_audit_log_q_idx
  ON public.question_bank_audit_log (question_id, created_at DESC);

CREATE INDEX IF NOT EXISTS question_bank_audit_log_created_idx
  ON public.question_bank_audit_log (created_at DESC);

ALTER TABLE public.question_bank_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages question_bank_audit_log" ON public.question_bank_audit_log;
CREATE POLICY "Admin manages question_bank_audit_log" ON public.question_bank_audit_log
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE, DELETE ON public.question_bank_audit_log TO authenticated;
GRANT ALL ON public.question_bank_audit_log TO service_role;

-- Suspende sintéticas MedRank expert ainda não revisadas (não oficiais)
-- Oficiais (ENARE/Revalida) permanecem approved
UPDATE public.questions
SET
  bank_status = 'disabled',
  quality_label = CASE
    WHEN length(trim(statement)) < 140 THEN 'muito_facil'
    ELSE 'precisa_de_correcao'
  END,
  quality_notes = COALESCE(
    quality_notes,
    'Suspensa automaticamente: questão sintética/expert aguardando revisão. Prioridade: provas oficiais 2020–2026.'
  )
WHERE COALESCE(question_origin, 'original') <> 'official'
  AND COALESCE(reproduction_allowed, false) = false
  AND bank_status = 'approved'
  AND (
    'banco-expert' = ANY (tags)
    OR 'residencia-expert' = ANY (tags)
    OR source ILIKE 'MedRank%'
    OR source ILIKE '%Expert%'
  );

-- Marca oficiais já no banco como aprovadas (se ainda sem label)
UPDATE public.questions
SET
  quality_label = COALESCE(quality_label, 'aprovada'),
  bank_status = 'approved'
WHERE question_origin = 'official'
  AND bank_status IN ('approved', 'pending_review');
