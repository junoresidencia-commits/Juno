-- Treino Nefropediatria: sessões e progresso (SRS/stats), sem afetar ranking diário

CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track TEXT NOT NULL DEFAULT 'nefropediatria',
  title TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'prova',
  topic_filter TEXT,
  liga TEXT,
  question_ids TEXT[] NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  answer_times JSONB NOT NULL DEFAULT '{}'::jsonb,
  confidences JSONB NOT NULL DEFAULT '{}'::jsonb,
  duration_minutes INT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  duration_seconds INT,
  score NUMERIC,
  total_correct INT DEFAULT 0,
  total_questions INT NOT NULL,
  percentage NUMERIC,
  submitted_automatically BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS practice_sessions_user_idx ON public.practice_sessions (user_id, started_at DESC);

CREATE TABLE IF NOT EXISTS public.practice_progress (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own practice_sessions" ON public.practice_sessions;
CREATE POLICY "Users manage own practice_sessions" ON public.practice_sessions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own practice_progress" ON public.practice_progress;
CREATE POLICY "Users manage own practice_progress" ON public.practice_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_progress TO authenticated;
