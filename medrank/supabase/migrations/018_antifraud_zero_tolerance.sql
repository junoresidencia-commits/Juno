-- Antifraude: tolerância zero no Modo Prova (disputa diária)
-- Infração → encerra, zera pontuação, sem streak, sem nova tentativa no dia.

ALTER TABLE public.attempts
  ADD COLUMN IF NOT EXISTS forfeited BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS forfeit_reason TEXT,
  ADD COLUMN IF NOT EXISTS forfeited_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS public.attempt_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES public.exams(id) ON DELETE SET NULL,
  question_id UUID REFERENCES public.questions(id) ON DELETE SET NULL,
  violation_type TEXT NOT NULL,
  elapsed_seconds INTEGER,
  ip_address TEXT,
  device TEXT,
  browser TEXT,
  os TEXT,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attempt_violations_attempt
  ON public.attempt_violations(attempt_id);

CREATE INDEX IF NOT EXISTS idx_attempt_violations_user_created
  ON public.attempt_violations(user_id, created_at DESC);

ALTER TABLE public.attempt_violations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "students_read_own_violations" ON public.attempt_violations;
CREATE POLICY "students_read_own_violations"
  ON public.attempt_violations FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "admins_all_violations" ON public.attempt_violations;
CREATE POLICY "admins_all_violations"
  ON public.attempt_violations FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT SELECT ON public.attempt_violations TO authenticated;
GRANT ALL ON public.attempt_violations TO service_role;

-- Rankings ignoram tentativas anuladas por fraude
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
BEGIN
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
      AND COALESCE(a.forfeited, false) = false
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

-- Encerra prova por infração: zera score/acertos, registra violação, sem streak
CREATE OR REPLACE FUNCTION public.forfeit_attempt(
  p_attempt_id UUID,
  p_violation_type TEXT,
  p_question_id UUID DEFAULT NULL,
  p_elapsed_seconds INTEGER DEFAULT NULL,
  p_ip TEXT DEFAULT NULL,
  p_device TEXT DEFAULT NULL,
  p_browser TEXT DEFAULT NULL,
  p_os TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt RECORD;
  v_duration INTEGER;
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

  -- service_role: auth.uid() nulo — ownership validado na API antes do RPC
  IF auth.uid() IS NOT NULL
     AND v_attempt.user_id != auth.uid()
     AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado';
  END IF;

  -- Já finalizada: não anula submit legítimo nem registra infração tardia
  IF v_attempt.finished_at IS NOT NULL THEN
    RETURN json_build_object(
      'attempt_id', p_attempt_id,
      'already_finished', true,
      'forfeited', COALESCE(v_attempt.forfeited, false)
    );
  END IF;

  v_duration := COALESCE(
    p_elapsed_seconds,
    EXTRACT(EPOCH FROM (now() - v_attempt.started_at))::INTEGER
  );
  IF v_duration < 0 THEN v_duration := 0; END IF;

  UPDATE attempt_answers
  SET is_correct = false
  WHERE attempt_id = p_attempt_id;

  UPDATE attempts SET
    finished_at = now(),
    duration_seconds = v_duration,
    total_correct = 0,
    total_questions = v_attempt.total_questions,
    percentage = 0,
    score = 0,
    submitted_automatically = true,
    forfeited = true,
    forfeit_reason = p_violation_type,
    forfeited_at = now()
  WHERE id = p_attempt_id;

  INSERT INTO public.attempt_violations (
    attempt_id, user_id, exam_id, question_id, violation_type,
    elapsed_seconds, ip_address, device, browser, os, user_agent, metadata
  ) VALUES (
    p_attempt_id, v_attempt.user_id, v_attempt.exam_id, p_question_id, p_violation_type,
    v_duration, p_ip, p_device, p_browser, p_os, p_user_agent,
    COALESCE(p_metadata, '{}'::jsonb)
  );

  v_today := v_attempt.date_available;
  -- Sem streak / desafios / XP: apenas recalcula rankings (excluindo forfeited)
  PERFORM public.recalculate_rankings_for_date(v_today);

  RETURN json_build_object(
    'attempt_id', p_attempt_id,
    'forfeited', true,
    'violation_type', p_violation_type,
    'score', 0,
    'total_correct', 0,
    'percentage', 0,
    'duration_seconds', v_duration
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.forfeit_attempt(
  UUID, TEXT, UUID, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB
) TO authenticated;

GRANT EXECUTE ON FUNCTION public.forfeit_attempt(
  UUID, TEXT, UUID, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB
) TO service_role;
