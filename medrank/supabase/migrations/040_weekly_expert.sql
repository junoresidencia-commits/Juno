-- Desafio Expert semanal: 5 casos clínicos difíceis (criados pelo professor),
-- um dia da semana (ex.: quarta) a partir das 20h BRT, pontuação com multiplicador.

DO $$
DECLARE
  cname TEXT;
BEGIN
  SELECT con.conname INTO cname
  FROM pg_constraint con
  JOIN pg_class rel ON rel.oid = con.conrelid
  JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
  WHERE nsp.nspname = 'public'
    AND rel.relname = 'exams'
    AND con.contype = 'c'
    AND pg_get_constraintdef(con.oid) ILIKE '%exam_kind%';
  IF cname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.exams DROP CONSTRAINT %I', cname);
  END IF;
END $$;

ALTER TABLE public.exams
  ADD CONSTRAINT exams_exam_kind_check
  CHECK (exam_kind IN ('daily', 'simulado', 'weekly_expert'));

COMMENT ON COLUMN public.exams.exam_kind IS
  'daily = disputa diária; simulado = prática; weekly_expert = 5 casos difíceis semanais';

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS score_multiplier NUMERIC(4,2) NOT NULL DEFAULT 1
  CHECK (score_multiplier > 0 AND score_multiplier <= 10);

COMMENT ON COLUMN public.exams.score_multiplier IS
  'Multiplica a pontuação da tentativa (ex.: 2 = dobro nos acertos do Expert).';

DROP INDEX IF EXISTS public.exams_date_available_audience_uidx;

CREATE UNIQUE INDEX IF NOT EXISTS exams_date_available_audience_kind_uidx
  ON public.exams (date_available, audience, exam_kind);

-- submit_attempt: aplica score_multiplier da prova
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
  v_annulled INTEGER := 0;
  v_duration INTEGER;
  v_expires_at TIMESTAMPTZ;
  v_percentage NUMERIC;
  v_score NUMERIC := 0;
  v_multiplier NUMERIC := 1;
  v_today DATE;
  v_question_limit INTEGER;
  v_row RECORD;
BEGIN
  SELECT
    a.*,
    e.duration_minutes,
    e.date_available,
    e.total_questions,
    e.id AS exam_uuid,
    COALESCE(e.score_multiplier, 1) AS score_multiplier
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

  v_question_limit := LEAST(
    90,
    GREATEST(60, FLOOR((v_attempt.duration_minutes * 60)::NUMERIC / GREATEST(v_attempt.total_questions, 1)))
  );

  SELECT COUNT(*)::INTEGER INTO v_annulled
  FROM public.exam_question_overrides o
  WHERE o.exam_id = v_attempt.exam_id AND o.status = 'annulled';

  UPDATE attempt_answers aa
  SET
    excluded_from_score = public.is_exam_question_annulled(v_attempt.exam_id, aa.question_id),
    is_correct = CASE
      WHEN public.is_exam_question_annulled(v_attempt.exam_id, aa.question_id) THEN false
      WHEN aa.selected_option IS NULL THEN false
      ELSE aa.selected_option = public.effective_correct_option(v_attempt.exam_id, aa.question_id)
    END
  WHERE aa.attempt_id = p_attempt_id;

  SELECT COUNT(*) FILTER (
    WHERE is_correct = true AND COALESCE(excluded_from_score, false) = false
  )
  INTO v_correct
  FROM attempt_answers
  WHERE attempt_id = p_attempt_id;

  v_total := GREATEST(v_attempt.total_questions - COALESCE(v_annulled, 0), 0);

  v_duration := EXTRACT(EPOCH FROM (LEAST(now(), v_expires_at) - v_attempt.started_at))::INTEGER;
  IF v_duration < 0 THEN v_duration := 0; END IF;

  v_percentage := CASE WHEN v_total > 0 THEN ROUND((v_correct::NUMERIC / v_total) * 100, 2) ELSE 0 END;

  FOR v_row IN
    SELECT
      aa.is_correct,
      COALESCE(aa.time_spent_seconds, v_question_limit) AS time_spent,
      COALESCE(aa.excluded_from_score, false) AS excluded
    FROM attempt_answers aa
    WHERE aa.attempt_id = p_attempt_id
  LOOP
    IF NOT v_row.excluded THEN
      v_score := v_score + public.score_question_answer(v_row.is_correct, v_row.time_spent, v_question_limit);
    END IF;
  END LOOP;

  v_multiplier := COALESCE(v_attempt.score_multiplier, 1);
  IF v_multiplier IS DISTINCT FROM 1 THEN
    v_score := ROUND(v_score * v_multiplier, 2);
  END IF;

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
    'submitted_automatically', p_auto,
    'score_multiplier', v_multiplier
  );
END;
$$;
