-- MedRank: schema completo (começo do zero)
-- Cole no Supabase → SQL Editor → Run
-- Ordem: 001 → 014


-- =====================================================================
-- FILE: migrations/001_initial_schema.sql
-- =====================================================================

-- MedRank: schema inicial
-- Grupo fechado de até 10 alunos + 1 admin

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Perfis de usuário (complementa auth.users do Supabase)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Limite de 10 alunos ativos
CREATE OR REPLACE FUNCTION check_student_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'student' AND NEW.active = true THEN
    IF (SELECT COUNT(*) FROM public.profiles WHERE role = 'student' AND active = true AND id != NEW.id) >= 10 THEN
      RAISE EXCEPTION 'Limite de 10 alunos ativos atingido';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_student_limit
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION check_student_limit();

-- Banco de questões
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  statement TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  option_e TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A','B','C','D','E')),
  explanation TEXT,
  source TEXT,
  year INTEGER,
  specialty TEXT,
  topic TEXT,
  subtopic TEXT,
  difficulty TEXT CHECK (difficulty IN ('facil', 'medio', 'dificil')),
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  bibliography TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_questions_source ON public.questions(source);
CREATE INDEX idx_questions_topic ON public.questions(topic);
CREATE INDEX idx_questions_specialty ON public.questions(specialty);

-- Provas
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date_available DATE NOT NULL UNIQUE,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  total_questions INTEGER NOT NULL,
  show_answers_after_submit BOOLEAN NOT NULL DEFAULT false,
  show_answers_when_all_done BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'closed')) DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Questões da prova
CREATE TABLE public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  order_number INTEGER NOT NULL,
  UNIQUE(exam_id, question_id),
  UNIQUE(exam_id, order_number)
);

-- Tentativas (uma por aluno por prova)
CREATE TABLE public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  score NUMERIC(10,2),
  total_correct INTEGER DEFAULT 0,
  total_questions INTEGER,
  percentage NUMERIC(5,2),
  submitted_automatically BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(exam_id, user_id)
);

-- Respostas da tentativa
CREATE TABLE public.attempt_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  selected_option CHAR(1) CHECK (selected_option IN ('A','B','C','D','E')),
  is_correct BOOLEAN,
  answered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(attempt_id, question_id)
);

-- Rankings
CREATE TABLE public.rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly', 'general')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_score NUMERIC(10,2) DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  average_percentage NUMERIC(5,2) DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  position INTEGER,
  UNIQUE(user_id, period_type, period_start)
);

-- Streak de dias estudados
CREATE TABLE public.user_streaks (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE
);

-- Medalhas / badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL CHECK (badge_type IN ('gold', 'silver', 'bronze', 'streak', 'weekly_best')),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  period_start DATE,
  period_end DATE
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Helper: verificar se é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Policies: profiles
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Admin manages profiles" ON public.profiles
  FOR ALL USING (public.is_admin());

-- Policies: questions (admin CRUD, students read during exam)
CREATE POLICY "Admin manages questions" ON public.questions
  FOR ALL USING (public.is_admin());

CREATE POLICY "Students read questions in active attempt" ON public.questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.attempts a
      JOIN public.exam_questions eq ON eq.exam_id = a.exam_id
      WHERE a.user_id = auth.uid()
        AND a.finished_at IS NULL
        AND eq.question_id = questions.id
    )
  );

-- Policies: exams
CREATE POLICY "Admin manages exams" ON public.exams
  FOR ALL USING (public.is_admin());

CREATE POLICY "Students see published exams" ON public.exams
  FOR SELECT USING (
    status = 'published'
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.active = true
    )
  );

-- Policies: attempts
CREATE POLICY "Users manage own attempts" ON public.attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admin reads all attempts" ON public.attempts
  FOR SELECT USING (public.is_admin());

-- Policies: rankings (todos leem, sistema escreve)
CREATE POLICY "Everyone reads rankings" ON public.rankings
  FOR SELECT USING (true);

CREATE POLICY "Admin manages rankings" ON public.rankings
  FOR ALL USING (public.is_admin());


-- =====================================================================
-- FILE: migrations/002_rls_and_submit.sql
-- =====================================================================

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


-- =====================================================================
-- FILE: migrations/003_period_rankings.sql
-- =====================================================================

-- Rankings semanal, mensal e geral + recálculo unificado

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
      r.user_id, p_period_type, p_period_start, p_period_end,
      r.total_score, r.total_correct, r.total_questions,
      r.average_percentage, r.total_time_seconds, r.streak_days, pos
    );
    pos := pos + 1;
  END LOOP;

  -- Medalhas para top 3 (diário e semanal)
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
BEGIN
  PERFORM public.recalculate_period_ranking('daily', p_date, p_date);

  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  PERFORM public.recalculate_period_ranking('weekly', v_week_start, v_week_end);

  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;
  PERFORM public.recalculate_period_ranking('monthly', v_month_start, v_month_end);

  PERFORM public.recalculate_period_ranking('general', '2000-01-01'::date, p_date);
END;
$$;

-- Atualizar submit_attempt para recalcular todos os períodos
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

GRANT EXECUTE ON FUNCTION public.recalculate_period_ranking(TEXT, DATE, DATE) TO authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_rankings_for_date(DATE) TO authenticated;


-- =====================================================================
-- FILE: migrations/004_weekly_challenges.sql
-- =====================================================================

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


-- =====================================================================
-- FILE: migrations/005_invite_tokens.sql
-- =====================================================================

-- Convites para cadastro e fluxo de aprovação

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

CREATE TABLE public.invite_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  used_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invite_tokens_token ON public.invite_tokens(token);

ALTER TABLE public.invite_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages invites" ON public.invite_tokens
  FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone validates invite by token" ON public.invite_tokens
  FOR SELECT USING (true);

-- Cadastro público via convite: apenas insert em profiles com active=false
CREATE POLICY "Invite signup creates pending profile" ON public.profiles
  FOR INSERT WITH CHECK (
    role = 'student' AND active = false AND approved_at IS NULL
  );


-- =====================================================================
-- FILE: migrations/006_simulados.sql
-- =====================================================================

-- Simulados: metadados para provas on-demand (prática, não competitiva)

ALTER TABLE exams
  ADD COLUMN IF NOT EXISTS exam_kind TEXT NOT NULL DEFAULT 'daily'
    CHECK (exam_kind IN ('daily', 'simulado'));

ALTER TABLE exams
  ADD COLUMN IF NOT EXISTS simulado_mode TEXT,
  ADD COLUMN IF NOT EXISTS area_filter TEXT,
  ADD COLUMN IF NOT EXISTS theme_filter TEXT;

COMMENT ON COLUMN exams.exam_kind IS 'daily = prova diária competitiva; simulado = prática on-demand';
COMMENT ON COLUMN exams.simulado_mode IS 'geral, enare, usp, area, tema, revisao_erros';


-- =====================================================================
-- FILE: migrations/007_exam_release_window.sql
-- =====================================================================

-- MedRank: janela de liberação da prova, ranking só professor, limites ampliados

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS date_closes DATE,
  ADD COLUMN IF NOT EXISTS release_days SMALLINT NOT NULL DEFAULT 1 CHECK (release_days IN (1, 2)),
  ADD COLUMN IF NOT EXISTS ranking_visible_to_students BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ranking_release TEXT NOT NULL DEFAULT 'after_all_done'
    CHECK (ranking_release IN ('after_all_done', 'after_window', 'immediate'));

UPDATE public.exams
SET date_closes = date_available
WHERE date_closes IS NULL;

ALTER TABLE public.exams
  ALTER COLUMN date_closes SET NOT NULL;

-- Limite de 15 alunos ativos
CREATE OR REPLACE FUNCTION check_student_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'student' AND NEW.active = true THEN
    IF (SELECT COUNT(*) FROM public.profiles WHERE role = 'student' AND active = true AND id != NEW.id) >= 15 THEN
      RAISE EXCEPTION 'Limite de 15 alunos ativos atingido';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Limite de 7 professores (admins) ativos
CREATE OR REPLACE FUNCTION check_admin_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'admin' AND NEW.active = true THEN
    IF (SELECT COUNT(*) FROM public.profiles WHERE role = 'admin' AND active = true AND id != NEW.id) >= 7 THEN
      RAISE EXCEPTION 'Limite de 7 professores atingido';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_admin_limit ON public.profiles;
CREATE TRIGGER enforce_admin_limit
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION check_admin_limit();


-- =====================================================================
-- FILE: migrations/008_ranking_visible_to_students.sql
-- =====================================================================

-- Ranking diário visível para alunos (competição)

ALTER TABLE public.exams
  ALTER COLUMN ranking_visible_to_students SET DEFAULT true;

UPDATE public.exams
SET ranking_visible_to_students = true,
    ranking_release = 'immediate'
WHERE ranking_visible_to_students = false;


-- =====================================================================
-- FILE: migrations/009_exam_daily_window.sql
-- =====================================================================

-- Janela diária da prova: 7h às 22h (horário de Brasília)

ALTER TABLE public.exams
  ADD COLUMN IF NOT EXISTS window_start_hour SMALLINT NOT NULL DEFAULT 7,
  ADD COLUMN IF NOT EXISTS window_end_hour SMALLINT NOT NULL DEFAULT 22;

COMMENT ON COLUMN public.exams.window_start_hour IS 'Hora de abertura da prova (America/Sao_Paulo)';
COMMENT ON COLUMN public.exams.window_end_hour IS 'Hora de encerramento da prova (America/Sao_Paulo)';


-- =====================================================================
-- FILE: migrations/010_ranking_next_day.sql
-- =====================================================================

-- Ranking diário visível no dia seguinte

ALTER TABLE public.exams DROP CONSTRAINT IF EXISTS exams_ranking_release_check;

ALTER TABLE public.exams
  ADD CONSTRAINT exams_ranking_release_check
  CHECK (ranking_release IN ('after_all_done', 'after_window', 'immediate', 'next_day'));

UPDATE public.exams
SET ranking_release = 'next_day'
WHERE ranking_release = 'immediate';


-- =====================================================================
-- FILE: migrations/011_ranking_after_exam.sql
-- =====================================================================

-- Ranking visível após a prova (janela 7h–22h), não no dia seguinte

UPDATE public.exams
SET ranking_release = 'after_window'
WHERE ranking_release = 'next_day';


-- =====================================================================
-- FILE: migrations/012_invite_email_unlimited_students.sql
-- =====================================================================

-- Convite vinculado ao e-mail do aluno + turma sem limite fixo de alunos

ALTER TABLE public.invite_tokens
  ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS idx_invite_tokens_email ON public.invite_tokens(email);

-- Remove limite de 15 alunos ativos (convites por e-mail controlam quem entra)
DROP TRIGGER IF EXISTS enforce_student_limit ON public.profiles;
DROP FUNCTION IF EXISTS check_student_limit();


-- =====================================================================
-- FILE: migrations/013_question_timing_scoring.sql
-- =====================================================================

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


-- =====================================================================
-- FILE: migrations/014_scoring_scale_0_100.sql
-- =====================================================================

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


-- =====================================================================
-- FILE: migrations/015_fix_profiles_rls_recursion.sql
-- =====================================================================

-- Fix: infinite recursion in profiles RLS when is_admin() / peer policies
-- re-enter profiles under RLS.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
SET row_security = off
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_active_student()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
SET row_security = off
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'student'
      AND active = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_active_student() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_active_student() TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin manages profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Students read peers for ranking" ON public.profiles;
DROP POLICY IF EXISTS "Invite signup creates pending profile" ON public.profiles;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update profiles" ON public.profiles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE
  USING (public.is_admin());

CREATE POLICY "Students read peers for ranking" ON public.profiles
  FOR SELECT
  USING (
    role = 'student'
    AND active = true
    AND (auth.uid() = id OR public.is_active_student())
  );

CREATE POLICY "Invite signup creates pending profile" ON public.profiles
  FOR INSERT
  WITH CHECK (
    role = 'student'
    AND active = false
    AND approved_at IS NULL
  );


-- =====================================================================
-- FILE: migrations/016_reset_profiles_rls.sql
-- =====================================================================

-- MedRank: reset agressivo do RLS de profiles (acaba com infinite recursion)
-- Cole no SQL Editor → Run

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', pol.policyname);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ok boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND active = true
  ) INTO ok;
  RETURN COALESCE(ok, false);
END;
$$;

CREATE OR REPLACE FUNCTION public.is_active_student()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ok boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'student' AND active = true
  ) INTO ok;
  RETURN COALESCE(ok, false);
END;
$$;

ALTER FUNCTION public.is_admin() OWNER TO postgres;
ALTER FUNCTION public.is_active_student() OWNER TO postgres;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_active_student() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_active_student() TO anon, authenticated, service_role;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "profiles_insert_admin" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "profiles_delete_admin" ON public.profiles
  FOR DELETE USING (public.is_admin());

CREATE POLICY "profiles_select_student_peers" ON public.profiles
  FOR SELECT USING (
    role = 'student' AND active = true AND (auth.uid() = id OR public.is_active_student())
  );

CREATE POLICY "profiles_insert_invite" ON public.profiles
  FOR INSERT WITH CHECK (
    role = 'student' AND active = false AND approved_at IS NULL
  );

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Professor (UUID atual)
DELETE FROM public.profiles WHERE email = 'junoresidencia@gmail.com';

INSERT INTO public.profiles (id, name, email, role, active, approved_at)
VALUES (
  '502ff9ce-6472-49c3-8fd2-694f46207f39',
  'Professor',
  'junoresidencia@gmail.com',
  'admin',
  true,
  now()
);


-- =====================================================================
-- FILE: migrations/017_restore_table_grants.sql
-- =====================================================================

-- Restore table privileges (fixes: permission denied for table profiles)

GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.profiles TO postgres, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

-- Ensure professor row exists
INSERT INTO public.profiles (id, name, email, role, active, approved_at)
VALUES (
  '502ff9ce-6472-49c3-8fd2-694f46207f39',
  'Professor',
  'junoresidencia@gmail.com',
  'admin',
  true,
  now()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  role = 'admin',
  active = true,
  approved_at = COALESCE(public.profiles.approved_at, now());
