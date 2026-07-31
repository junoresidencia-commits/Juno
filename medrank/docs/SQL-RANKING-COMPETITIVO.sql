-- =============================================================================
-- MedRank — Ranking competitivo (cole no SQL Editor do Supabase)
-- Semanal · Mensal · Trimestral · Anual · Geral
-- Pessoa no grupo + entre ligas (time ≥ 3 ativos)
-- =============================================================================

-- 1) Períodos permitidos: pessoa (admin)
ALTER TABLE public.rankings DROP CONSTRAINT IF EXISTS rankings_period_type_check;
ALTER TABLE public.rankings
  ADD CONSTRAINT rankings_period_type_check
  CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'general'));

-- 2) Períodos permitidos: pessoa no grupo
ALTER TABLE public.study_group_rankings DROP CONSTRAINT IF EXISTS study_group_rankings_period_type_check;
ALTER TABLE public.study_group_rankings
  ADD CONSTRAINT study_group_rankings_period_type_check
  CHECK (period_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'general'));

-- 3) Períodos permitidos: entre ligas/grupos
ALTER TABLE public.study_group_collective_rankings
  DROP CONSTRAINT IF EXISTS study_group_collective_rankings_period_type_check;
ALTER TABLE public.study_group_collective_rankings
  ADD CONSTRAINT study_group_collective_rankings_period_type_check
  CHECK (period_type IN ('weekly', 'monthly', 'quarterly', 'yearly'));

ALTER TABLE public.study_group_collective_winners
  DROP CONSTRAINT IF EXISTS study_group_collective_winners_period_type_check;
ALTER TABLE public.study_group_collective_winners
  ADD CONSTRAINT study_group_collective_winners_period_type_check
  CHECK (period_type IN ('weekly', 'monthly', 'quarterly', 'yearly'));

-- 4) Recalcula ranking global (admin)
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
      AND (
        NOT has_forfeited
        OR COALESCE(a.forfeited, false) = false
      )
    GROUP BY a.user_id, us.current_streak
    ORDER BY
      SUM(a.score) DESC NULLS LAST,
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

  -- Medalhas: diário, semanal, mensal (hall da fama do mês)
  IF p_period_type IN ('daily', 'weekly', 'monthly') THEN
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

-- 5) Recalcula tudo no dia (pessoa + global)
CREATE OR REPLACE FUNCTION public.recalculate_rankings_for_date(p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week_start DATE;
  v_week_end DATE;
  v_month_start DATE;
  v_month_end DATE;
  v_quarter_start DATE;
  v_quarter_end DATE;
  v_year_start DATE;
  v_year_end DATE;
BEGIN
  PERFORM public.recalculate_period_ranking('daily', p_date, p_date);

  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  PERFORM public.recalculate_period_ranking('weekly', v_week_start, v_week_end);

  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;
  PERFORM public.recalculate_period_ranking('monthly', v_month_start, v_month_end);

  v_quarter_start := date_trunc('quarter', p_date::timestamp)::date;
  v_quarter_end := (date_trunc('quarter', p_date::timestamp) + interval '3 months - 1 day')::date;
  PERFORM public.recalculate_period_ranking('quarterly', v_quarter_start, v_quarter_end);

  v_year_start := date_trunc('year', p_date::timestamp)::date;
  v_year_end := (date_trunc('year', p_date::timestamp) + interval '1 year - 1 day')::date;
  PERFORM public.recalculate_period_ranking('yearly', v_year_start, v_year_end);

  PERFORM public.recalculate_period_ranking('general', '2000-01-01'::date, p_date);
END;
$$;

-- 6) Recalcula ranking de todos os grupos (pessoa no grupo)
CREATE OR REPLACE FUNCTION public.recalculate_group_rankings_for_date(p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  g RECORD;
  v_week_start DATE;
  v_week_end DATE;
  v_month_start DATE;
  v_month_end DATE;
  v_quarter_start DATE;
  v_quarter_end DATE;
  v_year_start DATE;
  v_year_end DATE;
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;
  v_quarter_start := date_trunc('quarter', p_date::timestamp)::date;
  v_quarter_end := (date_trunc('quarter', p_date::timestamp) + interval '3 months - 1 day')::date;
  v_year_start := date_trunc('year', p_date::timestamp)::date;
  v_year_end := (date_trunc('year', p_date::timestamp) + interval '1 year - 1 day')::date;

  FOR g IN SELECT id FROM public.study_groups WHERE active = true LOOP
    PERFORM public.recalculate_group_period_ranking(g.id, 'daily', p_date, p_date);
    PERFORM public.recalculate_group_period_ranking(g.id, 'weekly', v_week_start, v_week_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'monthly', v_month_start, v_month_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'quarterly', v_quarter_start, v_quarter_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'yearly', v_year_start, v_year_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'general', '2000-01-01'::date, p_date);
  END LOOP;

  -- Também atualiza ranking entre ligas
  PERFORM public.recalculate_collective_rankings_for_date(p_date);
END;
$$;

CREATE OR REPLACE FUNCTION public.recalculate_group_rankings_for_group(
  p_group_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week_start DATE;
  v_week_end DATE;
  v_month_start DATE;
  v_month_end DATE;
  v_quarter_start DATE;
  v_quarter_end DATE;
  v_year_start DATE;
  v_year_end DATE;
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;
  v_quarter_start := date_trunc('quarter', p_date::timestamp)::date;
  v_quarter_end := (date_trunc('quarter', p_date::timestamp) + interval '3 months - 1 day')::date;
  v_year_start := date_trunc('year', p_date::timestamp)::date;
  v_year_end := (date_trunc('year', p_date::timestamp) + interval '1 year - 1 day')::date;

  PERFORM public.recalculate_group_period_ranking(p_group_id, 'daily', p_date, p_date);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'weekly', v_week_start, v_week_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'monthly', v_month_start, v_month_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'quarterly', v_quarter_start, v_quarter_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'yearly', v_year_start, v_year_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'general', '2000-01-01'::date, p_date);
END;
$$;

-- 7) Entre ligas: semanal + mensal + trimestral + anual
CREATE OR REPLACE FUNCTION public.recalculate_collective_rankings_for_date(p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_week_start DATE;
  v_week_end DATE;
  v_month_start DATE;
  v_month_end DATE;
  v_quarter_start DATE;
  v_quarter_end DATE;
  v_year_start DATE;
  v_year_end DATE;
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;
  v_quarter_start := date_trunc('quarter', p_date::timestamp)::date;
  v_quarter_end := (date_trunc('quarter', p_date::timestamp) + interval '3 months - 1 day')::date;
  v_year_start := date_trunc('year', p_date::timestamp)::date;
  v_year_end := (date_trunc('year', p_date::timestamp) + interval '1 year - 1 day')::date;

  PERFORM public.recalculate_collective_group_ranking('weekly', v_week_start, v_week_end);
  PERFORM public.recalculate_collective_group_ranking('monthly', v_month_start, v_month_end);
  PERFORM public.recalculate_collective_group_ranking('quarterly', v_quarter_start, v_quarter_end);
  PERFORM public.recalculate_collective_group_ranking('yearly', v_year_start, v_year_end);
END;
$$;

-- 8) Rodar agora (hoje)
SELECT public.recalculate_rankings_for_date(CURRENT_DATE);
SELECT public.recalculate_group_rankings_for_date(CURRENT_DATE);
SELECT public.recalculate_collective_rankings_for_date(CURRENT_DATE);
