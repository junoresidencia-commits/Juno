-- Desafios semanais e seleção manual de provas

CREATE TABLE public.weekly_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('min_exams', 'min_accuracy', 'topic_accuracy')),
  target_value NUMERIC NOT NULL,
  topic TEXT,
  bonus_points NUMERIC NOT NULL DEFAULT 50,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.weekly_challenge_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES public.weekly_challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

CREATE INDEX idx_weekly_challenges_week ON public.weekly_challenges(week_start, week_end);

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS selection_mode TEXT NOT NULL DEFAULT 'auto'
    CHECK (selection_mode IN ('auto', 'manual'));

ALTER TABLE public.weekly_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_challenge_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone reads active challenges" ON public.weekly_challenges
  FOR SELECT USING (active = true OR public.is_admin());

CREATE POLICY "Admin manages challenges" ON public.weekly_challenges
  FOR ALL USING (public.is_admin());

CREATE POLICY "Users read own completions" ON public.weekly_challenge_completions
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "System inserts completions" ON public.weekly_challenge_completions
  FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Verificar e registrar conclusão de desafios semanais
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

  -- Medalha para 1º lugar no ranking semanal
  IF NOT EXISTS (
    SELECT 1 FROM user_badges ub
    JOIN rankings r ON r.user_id = ub.user_id
      AND r.period_type = 'weekly'
      AND r.period_start = v_week_start
      AND r.position = 1
    WHERE ub.badge_type = 'weekly_best'
      AND ub.period_start = v_week_start
      AND ub.user_id = r.user_id
  ) THEN
    INSERT INTO user_badges (user_id, badge_type, period_start, period_end)
    SELECT r.user_id, 'weekly_best', v_week_start, v_week_end
    FROM rankings r
    WHERE r.period_type = 'weekly'
      AND r.period_start = v_week_start
      AND r.position = 1
    LIMIT 1;
  END IF;
END;
$$;

-- Atualizar submit_attempt para checar desafios
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
  v_score NUMERIC;
  v_today DATE;
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

  UPDATE attempt_answers aa
  SET is_correct = (aa.selected_option = q.correct_option)
  FROM questions q
  WHERE aa.attempt_id = p_attempt_id AND aa.question_id = q.id AND aa.selected_option IS NOT NULL;

  UPDATE attempt_answers aa SET is_correct = false
  WHERE aa.attempt_id = p_attempt_id AND aa.selected_option IS NULL;

  SELECT COUNT(*) FILTER (WHERE is_correct = true), COUNT(*)
  INTO v_correct, v_total FROM attempt_answers WHERE attempt_id = p_attempt_id;

  v_duration := EXTRACT(EPOCH FROM (LEAST(now(), v_expires_at) - v_attempt.started_at))::INTEGER;
  IF v_duration < 0 THEN v_duration := 0; END IF;

  v_percentage := CASE WHEN v_total > 0 THEN ROUND((v_correct::NUMERIC / v_total) * 100, 2) ELSE 0 END;
  v_score := ROUND((CASE WHEN v_total > 0 THEN v_correct::NUMERIC / v_total ELSE 0 END) * 1000
    + GREATEST(0, 1 - v_duration::NUMERIC / (v_attempt.duration_minutes * 60)) * 100, 2);

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

GRANT EXECUTE ON FUNCTION public.check_weekly_challenges(UUID, DATE) TO authenticated;
