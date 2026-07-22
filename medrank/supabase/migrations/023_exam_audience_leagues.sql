-- Duas disputas por dia: geral (outras ligas) e nefrologia (Liga de Nefrologia).
-- study_groups.exam_audience define qual disputa a liga acompanha.

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS audience TEXT NOT NULL DEFAULT 'general'
    CHECK (audience IN ('general', 'nephrology'));

COMMENT ON COLUMN public.exams.audience IS
  'general = disputa aberta / outras ligas; nephrology = Liga de Nefrologia (adulto ↔ pediátrica)';

-- Remove UNIQUE antigo em date_available e passa a ser (date, audience)
DO $$
DECLARE
  cname TEXT;
BEGIN
  SELECT conname INTO cname
  FROM pg_constraint
  WHERE conrelid = 'public.exams'::regclass
    AND contype = 'u'
    AND pg_get_constraintdef(oid) ILIKE '%date_available%'
    AND pg_get_constraintdef(oid) NOT ILIKE '%audience%'
  LIMIT 1;

  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.exams DROP CONSTRAINT %I', cname);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS exams_date_available_audience_uidx
  ON public.exams (date_available, audience);

-- Marca provas já geradas com título de Nefrologia
UPDATE public.exams
SET audience = 'nephrology'
WHERE audience = 'general'
  AND (
    title ILIKE '%Nefrologia%'
    OR title ILIKE '%Nefropediat%'
  );

ALTER TABLE public.study_groups
  ADD COLUMN IF NOT EXISTS exam_audience TEXT NOT NULL DEFAULT 'general'
    CHECK (exam_audience IN ('general', 'nephrology'));

COMMENT ON COLUMN public.study_groups.exam_audience IS
  'Qual disputa diária a liga usa: general ou nephrology';

-- Liga de Nefrologia (idempotente)
INSERT INTO public.study_groups (name, description, active, exam_audience)
SELECT
  'Liga de Nefrologia',
  'Disputa diária exclusiva: um dia Nefrologia adulta, outro Nefrologia Pediátrica. Quem faz ganha pontos; quem não faz, fica sem pontos no dia.',
  true,
  'nephrology'
WHERE NOT EXISTS (
  SELECT 1 FROM public.study_groups
  WHERE exam_audience = 'nephrology'
     OR lower(name) = 'liga de nefrologia'
);

UPDATE public.study_groups
SET exam_audience = 'nephrology',
    description = COALESCE(
      NULLIF(description, ''),
      'Disputa diária: Nefrologia ↔ Nefropediatria'
    )
WHERE lower(name) = 'liga de nefrologia';

-- Ranking global: só disputa geral (não mistura com Liga de Nefrologia)
CREATE OR REPLACE FUNCTION public.recalculate_period_ranking(
  p_period_type TEXT,
  p_period_start DATE,
  p_period_end DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
  pos INTEGER := 1;
  has_forfeited BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'attempts' AND column_name = 'forfeited'
  ) INTO has_forfeited;

  DELETE FROM rankings
  WHERE period_type = p_period_type AND period_start = p_period_start;

  FOR r IN
    SELECT
      a.user_id,
      SUM(a.score) AS total_score,
      SUM(a.total_correct) AS total_correct,
      SUM(a.total_questions) AS total_questions,
      ROUND(AVG(a.percentage), 2) AS average_percentage,
      SUM(a.duration_seconds) AS total_time_seconds,
      COALESCE(us.current_streak, 0) AS streak_days
    FROM attempts a
    JOIN exams e ON e.id = a.exam_id
    LEFT JOIN user_streaks us ON us.user_id = a.user_id
    WHERE e.date_available BETWEEN p_period_start AND p_period_end
      AND a.finished_at IS NOT NULL
      AND COALESCE(e.audience, 'general') = 'general'
      AND (
        NOT has_forfeited
        OR COALESCE(a.forfeited, false) = false
      )
    GROUP BY a.user_id, us.current_streak
    ORDER BY
      SUM(a.score) DESC,
      SUM(a.total_correct) DESC,
      SUM(a.duration_seconds) ASC,
      COALESCE(us.current_streak, 0) DESC
  LOOP
    INSERT INTO rankings (
      user_id, period_type, period_start, period_end,
      total_score, total_correct, total_questions,
      average_percentage, total_time_seconds, streak_days, position
    ) VALUES (
      r.user_id, p_period_type, p_period_start, p_period_end,
      r.total_score, r.total_correct, r.total_questions,
      r.average_percentage, r.total_time_seconds, r.streak_days, pos
    );
    pos := pos + 1;
  END LOOP;

  IF p_period_type IN ('daily', 'weekly') THEN
    DELETE FROM user_badges
    WHERE period_start = p_period_start
      AND period_end = p_period_end
      AND badge_type IN ('gold', 'silver', 'bronze');

    INSERT INTO user_badges (user_id, badge_type, period_start, period_end)
    SELECT user_id,
      CASE position WHEN 1 THEN 'gold' WHEN 2 THEN 'silver' WHEN 3 THEN 'bronze' END,
      p_period_start, p_period_end
    FROM rankings
    WHERE period_type = p_period_type
      AND period_start = p_period_start
      AND position <= 3;
  END IF;
END;
$$;

-- Ranking do grupo: só conta provas da mesma audience da liga
CREATE OR REPLACE FUNCTION public.recalculate_group_period_ranking(
  p_group_id UUID,
  p_period_type TEXT,
  p_period_start DATE,
  p_period_end DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
  pos INTEGER := 1;
  has_forfeited BOOLEAN;
  v_audience TEXT;
BEGIN
  SELECT COALESCE(exam_audience, 'general') INTO v_audience
  FROM public.study_groups
  WHERE id = p_group_id;

  IF v_audience IS NULL THEN
    v_audience := 'general';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'attempts' AND column_name = 'forfeited'
  ) INTO has_forfeited;

  DELETE FROM public.study_group_rankings
  WHERE group_id = p_group_id
    AND period_type = p_period_type
    AND period_start = p_period_start;

  FOR r IN
    SELECT
      gm.user_id,
      COALESCE(SUM(sc.score), 0) AS total_score,
      COALESCE(SUM(sc.total_correct), 0) AS total_correct,
      COALESCE(SUM(sc.total_questions), 0) AS total_questions,
      COALESCE(ROUND(AVG(sc.percentage), 2), 0) AS average_percentage,
      COALESCE(SUM(sc.duration_seconds), 0) AS total_time_seconds
    FROM public.study_group_members gm
    LEFT JOIN LATERAL (
      SELECT
        a.score,
        a.total_correct,
        a.total_questions,
        a.percentage,
        a.duration_seconds
      FROM public.attempts a
      JOIN public.exams e ON e.id = a.exam_id
      WHERE a.user_id = gm.user_id
        AND a.finished_at IS NOT NULL
        AND e.date_available BETWEEN p_period_start AND p_period_end
        AND COALESCE(e.audience, 'general') = v_audience
        AND (
          NOT has_forfeited
          OR COALESCE(a.forfeited, false) = false
        )
    ) sc ON true
    WHERE gm.group_id = p_group_id
    GROUP BY gm.user_id
    ORDER BY
      COALESCE(SUM(sc.score), 0) DESC,
      COALESCE(SUM(sc.total_correct), 0) DESC,
      COALESCE(SUM(sc.duration_seconds), 0) ASC
  LOOP
    INSERT INTO public.study_group_rankings (
      group_id, user_id, period_type, period_start, period_end,
      total_score, total_correct, total_questions,
      average_percentage, total_time_seconds, position
    ) VALUES (
      p_group_id, r.user_id, p_period_type, p_period_start, p_period_end,
      r.total_score, r.total_correct, r.total_questions,
      r.average_percentage, r.total_time_seconds, pos
    );
    pos := pos + 1;
  END LOOP;
END;
$$;
