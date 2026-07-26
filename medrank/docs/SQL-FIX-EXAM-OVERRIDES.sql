-- FIX URGENTE: finalizar prova
-- Erro: relation "public.exam_question_overrides" does not exist
-- Rodar no SQL Editor do Supabase. Seguro repetir (IF NOT EXISTS / OR REPLACE).

CREATE TABLE IF NOT EXISTS public.exam_question_overrides (
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'annulled')),
  correct_option_override CHAR(1)
    CHECK (correct_option_override IS NULL OR correct_option_override IN ('A','B','C','D','E')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (exam_id, question_id)
);

ALTER TABLE public.exam_question_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages exam_question_overrides" ON public.exam_question_overrides;
CREATE POLICY "Admin manages exam_question_overrides" ON public.exam_question_overrides
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated read exam_question_overrides" ON public.exam_question_overrides;
CREATE POLICY "Authenticated read exam_question_overrides" ON public.exam_question_overrides
  FOR SELECT USING (auth.role() = 'authenticated');

GRANT SELECT ON public.exam_question_overrides TO authenticated;

ALTER TABLE public.attempt_answers
  ADD COLUMN IF NOT EXISTS excluded_from_score BOOLEAN NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.effective_correct_option(
  p_exam_id UUID,
  p_question_id UUID
)
RETURNS CHAR(1)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT o.correct_option_override
      FROM public.exam_question_overrides o
      WHERE o.exam_id = p_exam_id
        AND o.question_id = p_question_id
        AND o.status = 'active'
        AND o.correct_option_override IS NOT NULL
    ),
    (SELECT q.correct_option FROM public.questions q WHERE q.id = p_question_id)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_exam_question_annulled(
  p_exam_id UUID,
  p_question_id UUID
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.exam_question_overrides o
    WHERE o.exam_id = p_exam_id
      AND o.question_id = p_question_id
      AND o.status = 'annulled'
  );
$$;

GRANT EXECUTE ON FUNCTION public.effective_correct_option(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_exam_question_annulled(UUID, UUID) TO authenticated;
