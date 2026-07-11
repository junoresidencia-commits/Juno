-- Correções de RLS e função de submissão de prova

DROP POLICY IF EXISTS "Students see published exams" ON public.exams;

CREATE POLICY "Students see published exams" ON public.exams
  FOR SELECT USING (
    status = 'published' AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.active = true
    )
  );

-- exam_questions
CREATE POLICY "Admin manages exam_questions" ON public.exam_questions
  FOR ALL USING (public.is_admin());

CREATE POLICY "Students read exam_questions" ON public.exam_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.attempts a
      WHERE a.exam_id = exam_questions.exam_id
        AND a.user_id = auth.uid()
    )
  );

-- attempt_answers
CREATE POLICY "Users manage own attempt_answers" ON public.attempt_answers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.attempts a
      WHERE a.id = attempt_answers.attempt_id
        AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin reads attempt_answers" ON public.attempt_answers
  FOR SELECT USING (public.is_admin());

-- user_streaks
CREATE POLICY "Users read own streak" ON public.user_streaks
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "System manages streaks" ON public.user_streaks
  FOR ALL USING (public.is_admin());

-- user_badges
CREATE POLICY "Everyone reads badges" ON public.user_badges
  FOR SELECT USING (true);

CREATE POLICY "Admin manages badges" ON public.user_badges
  FOR ALL USING (public.is_admin());

-- Alunos podem ver perfis de outros (para ranking)
CREATE POLICY "Students read peers for ranking" ON public.profiles
  FOR SELECT USING (
    role = 'student' AND active = true AND (
      auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles me
        WHERE me.id = auth.uid() AND me.role = 'student'
      )
    )
  );

-- Função para submeter prova e atualizar ranking
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
  v_exam RECORD;
  v_correct INTEGER := 0;
  v_total INTEGER;
  v_duration INTEGER;
  v_expires_at TIMESTAMPTZ;
  v_percentage NUMERIC;
  v_score NUMERIC;
  v_today DATE;
BEGIN
  SELECT a.*, e.duration_minutes, e.date_available, e.total_questions,
         e.show_answers_after_submit, e.show_answers_when_all_done
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
    RETURN json_build_object(
      'attempt_id', p_attempt_id,
      'already_finished', true
    );
  END IF;

  v_expires_at := v_attempt.started_at + (v_attempt.duration_minutes || ' minutes')::interval;

  IF NOT p_auto AND now() > v_expires_at THEN
    p_auto := true;
  END IF;

  -- Corrigir respostas
  UPDATE attempt_answers aa
  SET is_correct = (aa.selected_option = q.correct_option)
  FROM questions q
  WHERE aa.attempt_id = p_attempt_id
    AND aa.question_id = q.id
    AND aa.selected_option IS NOT NULL;

  UPDATE attempt_answers aa
  SET is_correct = false
  WHERE aa.attempt_id = p_attempt_id
    AND aa.selected_option IS NULL;

  SELECT COUNT(*) FILTER (WHERE is_correct = true),
         COUNT(*)
  INTO v_correct, v_total
  FROM attempt_answers
  WHERE attempt_id = p_attempt_id;

  v_duration := EXTRACT(EPOCH FROM (LEAST(now(), v_expires_at) - v_attempt.started_at))::INTEGER;
  IF v_duration < 0 THEN v_duration := 0; END IF;

  v_percentage := CASE WHEN v_total > 0 THEN ROUND((v_correct::NUMERIC / v_total) * 100, 2) ELSE 0 END;
  v_score := ROUND((CASE WHEN v_total > 0 THEN v_correct::NUMERIC / v_total ELSE 0 END) * 1000
    + GREATEST(0, 1 - v_duration::NUMERIC / (v_attempt.duration_minutes * 60)) * 100, 2);

  UPDATE attempts
  SET finished_at = LEAST(now(), v_expires_at),
      duration_seconds = v_duration,
      total_correct = v_correct,
      total_questions = v_total,
      percentage = v_percentage,
      score = v_score,
      submitted_automatically = p_auto
  WHERE id = p_attempt_id;

  -- Atualizar streak
  v_today := v_attempt.date_available;
  INSERT INTO user_streaks (user_id, current_streak, longest_streak, last_activity_date)
  VALUES (v_attempt.user_id, 1, 1, v_today)
  ON CONFLICT (user_id) DO UPDATE SET
    current_streak = CASE
      WHEN user_streaks.last_activity_date = v_today THEN user_streaks.current_streak
      WHEN user_streaks.last_activity_date = v_today - 1 THEN user_streaks.current_streak + 1
      ELSE 1
    END,
    longest_streak = GREATEST(
      user_streaks.longest_streak,
      CASE
        WHEN user_streaks.last_activity_date = v_today THEN user_streaks.current_streak
        WHEN user_streaks.last_activity_date = v_today - 1 THEN user_streaks.current_streak + 1
        ELSE 1
      END
    ),
    last_activity_date = v_today;

  -- Recalcular ranking diário
  PERFORM public.recalculate_daily_ranking(v_attempt.date_available);

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

CREATE OR REPLACE FUNCTION public.recalculate_daily_ranking(p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
  pos INTEGER := 1;
BEGIN
  DELETE FROM rankings
  WHERE period_type = 'daily' AND period_start = p_date;

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
    WHERE e.date_available = p_date
      AND a.finished_at IS NOT NULL
    GROUP BY a.user_id, us.current_streak
    ORDER BY
      SUM(a.total_correct) DESC,
      SUM(a.duration_seconds) ASC,
      COALESCE(us.current_streak, 0) DESC
  LOOP
    INSERT INTO rankings (
      user_id, period_type, period_start, period_end,
      total_score, total_correct, total_questions,
      average_percentage, total_time_seconds, streak_days, position
    ) VALUES (
      r.user_id, 'daily', p_date, p_date,
      r.total_score, r.total_correct, r.total_questions,
      r.average_percentage, r.total_time_seconds, r.streak_days, pos
    );
    pos := pos + 1;
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_attempt(UUID, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_daily_ranking(DATE) TO authenticated;
