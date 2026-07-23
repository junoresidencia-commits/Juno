-- Módulos/trilhas que o admin liga ou desliga por aluno
-- Ex.: nephrology, general (residência), mri (futuro)

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS enabled_tracks TEXT[] NOT NULL DEFAULT '{}'::text[];

COMMENT ON COLUMN public.profiles.enabled_tracks IS
  'Trilhas liberadas pelo admin: nephrology, general, mri… Controla disputas diárias e treinos.';

-- Backfill a partir dos grupos atuais (não apaga se já tiver tracks)
UPDATE public.profiles p
SET enabled_tracks = (
  SELECT ARRAY(
    SELECT DISTINCT t
    FROM (
      SELECT CASE
        WHEN g.exam_audience = 'nephrology'
          OR lower(g.name) LIKE '%nefrologia%'
        THEN 'nephrology'
        ELSE 'general'
      END AS t
      FROM public.study_group_members m
      JOIN public.study_groups g ON g.id = m.group_id
      WHERE m.user_id = p.id AND g.active = true
    ) s
  )
)
WHERE p.role = 'student'
  AND coalesce(cardinality(p.enabled_tracks), 0) = 0
  AND EXISTS (
    SELECT 1 FROM public.study_group_members m
    JOIN public.study_groups g ON g.id = m.group_id
    WHERE m.user_id = p.id AND g.active = true
  );
