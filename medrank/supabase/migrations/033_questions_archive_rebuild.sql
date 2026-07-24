-- Arquivo histórico do banco antes de rebuild só com provas oficiais públicas.
-- Não apaga tentativas antigas: questões referenciadas ficam disabled no ativo.

CREATE TABLE IF NOT EXISTS public.questions_archive (
  archive_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archived_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archive_reason TEXT NOT NULL DEFAULT 'rebuild_official_only',
  archived_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  question_snapshot JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS questions_archive_archived_at_idx
  ON public.questions_archive (archived_at DESC);

ALTER TABLE public.questions_archive ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages questions_archive" ON public.questions_archive;
CREATE POLICY "Admin manages questions_archive" ON public.questions_archive
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT, INSERT ON public.questions_archive TO authenticated;
GRANT ALL ON public.questions_archive TO service_role;

-- Tipo de prova (acesso direto / pré-requisito)
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS exam_track TEXT
    CHECK (
      exam_track IS NULL
      OR exam_track IN ('acesso_direto', 'pre_requisito', 'titulo', 'revalida', 'outro')
    );

CREATE INDEX IF NOT EXISTS questions_exam_track_idx
  ON public.questions (exam_track);

COMMENT ON TABLE public.questions_archive IS
  'Backup JSON de questões antes de limpar o banco ativo (rebuild oficial).';
