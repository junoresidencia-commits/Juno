-- Tempo por questão + pontuação justa (acerto + velocidade, anti-chute)

ALTER TABLE public.attempt_answers
  ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER;

CREATE OR REPLACE FUNCTION public.score_question_answer(
  p_is_correct BOOLEAN,
  p_time_spent INTEGER,
  p_limit INTEGER
)
RETURNS NUMERIC
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  v_clamped INTEGER;
  v_speed_bonus NUMERIC;
BEGIN
  IF NOT p_is_correct THEN
    RETURN 0;
  END IF;

  v_clamped := LEAST(GREATEST(COALESCE(p_time_spent, p_limit), 1), GREATEST(p_limit, 1));
  v_speed_bonus := ROUND((1 - v_clamped::NUMERIC / GREATEST(p_limit, 1)) * 150);

  IF COALESCE(p_time_spent, p_limit) < 8 THEN
    v_speed_bonus := 0;
  END IF;

  RETURN 1000 + v_speed_bonus;
END;
$$;

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
