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
