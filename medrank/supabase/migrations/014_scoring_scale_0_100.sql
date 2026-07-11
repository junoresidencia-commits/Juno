-- Escala 0–100 por questão (máx. 2.000 pts em prova de 20 questões)

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
  v_speed_bonus := ROUND((1 - v_clamped::NUMERIC / GREATEST(p_limit, 1)) * 15);

  IF COALESCE(p_time_spent, p_limit) < 8 THEN
    v_speed_bonus := 0;
  END IF;

  RETURN 85 + v_speed_bonus;
END;
$$;
