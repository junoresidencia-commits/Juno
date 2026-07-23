-- Garante grants de treino (permission denied for table practice_sessions)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_progress TO authenticated;
GRANT ALL ON public.practice_sessions TO service_role;
GRANT ALL ON public.practice_progress TO service_role;

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own practice_sessions" ON public.practice_sessions;
CREATE POLICY "Users manage own practice_sessions" ON public.practice_sessions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own practice_progress" ON public.practice_progress;
CREATE POLICY "Users manage own practice_progress" ON public.practice_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- service_role já bypassa RLS; grants acima acima
