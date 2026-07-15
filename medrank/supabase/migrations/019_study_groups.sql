-- Grupos personalizados: membros, rankings internos e desafios por grupo.
-- Um aluno pode participar de vários grupos ao mesmo tempo.

CREATE TABLE IF NOT EXISTS public.study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.study_group_members (
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_study_group_members_user
  ON public.study_group_members(user_id);

CREATE TABLE IF NOT EXISTS public.study_group_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'general')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_score NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  average_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0,
  total_time_seconds INTEGER NOT NULL DEFAULT 0,
  position INTEGER,
  UNIQUE (group_id, user_id, period_type, period_start)
);

CREATE INDEX IF NOT EXISTS idx_study_group_rankings_lookup
  ON public.study_group_rankings(group_id, period_type, period_start, position);

ALTER TABLE public.weekly_challenges
  ADD COLUMN IF NOT EXISTS group_id UUID REFERENCES public.study_groups(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_weekly_challenges_group
  ON public.weekly_challenges(group_id);

ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_rankings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_manage_study_groups" ON public.study_groups;
CREATE POLICY "admins_manage_study_groups" ON public.study_groups
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "members_read_own_groups" ON public.study_groups;
CREATE POLICY "members_read_own_groups" ON public.study_groups
  FOR SELECT USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.study_group_members m
      WHERE m.group_id = study_groups.id AND m.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "admins_manage_group_members" ON public.study_group_members;
CREATE POLICY "admins_manage_group_members" ON public.study_group_members
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "members_read_peers" ON public.study_group_members;
CREATE POLICY "members_read_peers" ON public.study_group_members
  FOR SELECT USING (
    public.is_admin()
    OR user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.study_group_members me
      WHERE me.group_id = study_group_members.group_id AND me.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "admins_manage_group_rankings" ON public.study_group_rankings;
CREATE POLICY "admins_manage_group_rankings" ON public.study_group_rankings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "members_read_group_rankings" ON public.study_group_rankings;
CREATE POLICY "members_read_group_rankings" ON public.study_group_rankings
  FOR SELECT USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.study_group_members m
      WHERE m.group_id = study_group_rankings.group_id AND m.user_id = auth.uid()
    )
  );

GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_groups TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_group_members TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.study_group_rankings TO authenticated;
GRANT ALL ON public.study_groups TO service_role;
GRANT ALL ON public.study_group_members TO service_role;
GRANT ALL ON public.study_group_rankings TO service_role;

-- Ranking interno do grupo (só membros)
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
BEGIN
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
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;

  FOR g IN SELECT id FROM public.study_groups WHERE active = true LOOP
    PERFORM public.recalculate_group_period_ranking(g.id, 'daily', p_date, p_date);
    PERFORM public.recalculate_group_period_ranking(g.id, 'weekly', v_week_start, v_week_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'monthly', v_month_start, v_month_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'general', '2000-01-01'::date, p_date);
  END LOOP;
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
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;

  PERFORM public.recalculate_group_period_ranking(p_group_id, 'daily', p_date, p_date);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'weekly', v_week_start, v_week_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'monthly', v_month_start, v_month_end);
  PERFORM public.recalculate_group_period_ranking(p_group_id, 'general', '2000-01-01'::date, p_date);
END;
$$;

GRANT EXECUTE ON FUNCTION public.recalculate_group_period_ranking(UUID, TEXT, DATE, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_group_rankings_for_date(DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_group_rankings_for_group(UUID, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_group_period_ranking(UUID, TEXT, DATE, DATE) TO service_role;
GRANT EXECUTE ON FUNCTION public.recalculate_group_rankings_for_date(DATE) TO service_role;
GRANT EXECUTE ON FUNCTION public.recalculate_group_rankings_for_group(UUID, DATE) TO service_role;

-- Visibilidade de desafios: global OU do grupo do aluno
DROP POLICY IF EXISTS "Everyone reads active challenges" ON public.weekly_challenges;
CREATE POLICY "Members read eligible challenges" ON public.weekly_challenges
  FOR SELECT USING (
    public.is_admin()
    OR (
      active = true
      AND (
        group_id IS NULL
        OR EXISTS (
          SELECT 1 FROM public.study_group_members m
          WHERE m.group_id = weekly_challenges.group_id
            AND m.user_id = auth.uid()
        )
      )
    )
  );

-- Desafios de grupo: só membros elegíveis
CREATE OR REPLACE FUNCTION public.check_weekly_challenges(p_user_id UUID, p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ch RECORD;
  v_value NUMERIC;
  v_week_start DATE;
  v_week_end DATE;
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;

  FOR ch IN
    SELECT * FROM weekly_challenges
    WHERE active = true
      AND week_start = v_week_start
      AND week_end = v_week_end
  LOOP
    IF ch.group_id IS NOT NULL THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.study_group_members
        WHERE group_id = ch.group_id AND user_id = p_user_id
      ) THEN
        CONTINUE;
      END IF;
    END IF;

    IF EXISTS (
      SELECT 1 FROM weekly_challenge_completions
      WHERE challenge_id = ch.id AND user_id = p_user_id
    ) THEN
      CONTINUE;
    END IF;

    v_value := NULL;

    IF ch.challenge_type = 'min_exams' THEN
      SELECT COUNT(*)::NUMERIC INTO v_value
      FROM attempts a
      JOIN exams e ON e.id = a.exam_id
      WHERE a.user_id = p_user_id
        AND a.finished_at IS NOT NULL
        AND e.date_available BETWEEN v_week_start AND v_week_end;

    ELSIF ch.challenge_type = 'min_accuracy' THEN
      SELECT ROUND(AVG(a.percentage), 2) INTO v_value
      FROM attempts a
      JOIN exams e ON e.id = a.exam_id
      WHERE a.user_id = p_user_id
        AND a.finished_at IS NOT NULL
        AND e.date_available BETWEEN v_week_start AND v_week_end;

    ELSIF ch.challenge_type = 'topic_accuracy' AND ch.topic IS NOT NULL THEN
      SELECT ROUND(
        COUNT(*) FILTER (WHERE aa.is_correct = true)::NUMERIC
        / NULLIF(COUNT(*), 0) * 100, 2
      ) INTO v_value
      FROM attempt_answers aa
      JOIN attempts a ON a.id = aa.attempt_id
      JOIN exams e ON e.id = a.exam_id
      JOIN questions q ON q.id = aa.question_id
      WHERE a.user_id = p_user_id
        AND a.finished_at IS NOT NULL
        AND e.date_available BETWEEN v_week_start AND v_week_end
        AND q.topic = ch.topic;
    END IF;

    IF v_value IS NOT NULL AND v_value >= ch.target_value THEN
      INSERT INTO weekly_challenge_completions (challenge_id, user_id)
      VALUES (ch.id, p_user_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END;
$$;

-- Hook no submit_attempt: recálculo de rankings de grupo após cada prova
CREATE OR REPLACE FUNCTION public.submit_attempt(
  p_attempt_id UUID,
  p_auto BOOLEAN DEFAULT false
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt RECORD;
  v_correct INTEGER := 0;
  v_total INTEGER;
  v_duration INTEGER;
  v_expires_at TIMESTAMPTZ;
  v_percentage NUMERIC;
  v_score NUMERIC := 0;
  v_today DATE;
  v_question_limit INTEGER;
  v_row RECORD;
BEGIN
  SELECT a.*, e.duration_minutes, e.date_available, e.total_questions
  INTO v_attempt
  FROM attempts a
  JOIN exams e ON e.id = a.exam_id
  WHERE a.id = p_attempt_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Tentativa não encontrada';
  END IF;

  IF v_attempt.user_id != auth.uid() AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado';
  END IF;

  IF v_attempt.finished_at IS NOT NULL THEN
    RETURN json_build_object('attempt_id', p_attempt_id, 'already_finished', true);
  END IF;

  v_expires_at := v_attempt.started_at + (v_attempt.duration_minutes || ' minutes')::interval;
  IF NOT p_auto AND now() > v_expires_at THEN
    p_auto := true;
  END IF;

  v_question_limit := LEAST(90, GREATEST(60, FLOOR((v_attempt.duration_minutes * 60)::NUMERIC / GREATEST(v_attempt.total_questions, 1))));

  UPDATE attempt_answers aa
  SET is_correct = (aa.selected_option = q.correct_option)
  FROM questions q
  WHERE aa.attempt_id = p_attempt_id AND aa.question_id = q.id AND aa.selected_option IS NOT NULL;

  UPDATE attempt_answers aa SET is_correct = false
  WHERE aa.attempt_id = p_attempt_id AND aa.selected_option IS NULL;

  SELECT COUNT(*) FILTER (WHERE is_correct = true)
  INTO v_correct
  FROM attempt_answers
  WHERE attempt_id = p_attempt_id;

  v_total := v_attempt.total_questions;

  v_duration := EXTRACT(EPOCH FROM (LEAST(now(), v_expires_at) - v_attempt.started_at))::INTEGER;
  IF v_duration < 0 THEN v_duration := 0; END IF;

  v_percentage := CASE WHEN v_total > 0 THEN ROUND((v_correct::NUMERIC / v_total) * 100, 2) ELSE 0 END;

  FOR v_row IN
    SELECT aa.is_correct, COALESCE(aa.time_spent_seconds, v_question_limit) AS time_spent
    FROM attempt_answers aa
    WHERE aa.attempt_id = p_attempt_id
  LOOP
    v_score := v_score + public.score_question_answer(v_row.is_correct, v_row.time_spent, v_question_limit);
  END LOOP;

  UPDATE attempts SET
    finished_at = LEAST(now(), v_expires_at),
    duration_seconds = v_duration,
    total_correct = v_correct,
    total_questions = v_total,
    percentage = v_percentage,
    score = v_score,
    submitted_automatically = p_auto
  WHERE id = p_attempt_id;

  v_today := v_attempt.date_available;

  INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
  VALUES (v_attempt.user_id, 1, 1, v_today)
  ON CONFLICT (user_id) DO UPDATE SET
    current_streak = CASE
      WHEN user_streaks.last_activity_date = v_today THEN user_streaks.current_streak
      WHEN user_streaks.last_activity_date = v_today - 1 THEN user_streaks.current_streak + 1
      ELSE 1
    END,
    longest_streak = GREATEST(user_streaks.longest_streak, CASE
      WHEN user_streaks.last_activity_date = v_today THEN user_streaks.current_streak
      WHEN user_streaks.last_activity_date = v_today - 1 THEN user_streaks.current_streak + 1
      ELSE 1
    END),
    last_activity_date = v_today;

  PERFORM public.recalculate_rankings_for_date(v_today);
  PERFORM public.check_weekly_challenges(v_attempt.user_id, v_today);
  PERFORM public.recalculate_group_rankings_for_date(v_today);

  RETURN json_build_object(
    'attempt_id', p_attempt_id,
    'total_correct', v_correct,
    'total_questions', v_total,
    'percentage', v_percentage,
    'score', v_score,
    'duration_seconds', v_duration,
    'submitted_automatically', p_auto
  );
END;
$$;
