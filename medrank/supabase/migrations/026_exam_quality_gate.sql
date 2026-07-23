-- Gate de qualidade pré-prova diária: revisão + aviso/bloqueio antes de iniciar.

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS quality_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (quality_status IN ('pending', 'passed', 'warning', 'blocked', 'approved_override')),
  ADD COLUMN IF NOT EXISTS quality_summary TEXT,
  ADD COLUMN IF NOT EXISTS quality_reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS quality_approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS quality_approved_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.exam_question_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  order_number INTEGER,
  severity TEXT NOT NULL CHECK (severity IN ('ok', 'warning', 'error')),
  codes TEXT[] NOT NULL DEFAULT '{}',
  message TEXT NOT NULL DEFAULT '',
  ai_notes TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (exam_id, question_id)
);

CREATE INDEX IF NOT EXISTS exam_question_reviews_exam_idx
  ON public.exam_question_reviews (exam_id, severity);

ALTER TABLE public.exam_question_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages exam_question_reviews" ON public.exam_question_reviews;
CREATE POLICY "Admin manages exam_question_reviews" ON public.exam_question_reviews
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Students read exam_question_reviews summary" ON public.exam_question_reviews;
CREATE POLICY "Students read exam_question_reviews summary" ON public.exam_question_reviews
  FOR SELECT USING (auth.role() = 'authenticated');

GRANT SELECT ON public.exam_question_reviews TO authenticated;
