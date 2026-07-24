-- 037: Residência Geral padrão + join requests + ranking coletivo entre grupos
-- Spec: docs/ORGANIZACAO-ALUNOS-GRUPOS-PROVAS.md

-- 1) Residência Geral sempre liberada por padrão
ALTER TABLE public.profiles
  ALTER COLUMN enabled_tracks SET DEFAULT ARRAY['general']::text[];

-- Backfill: todo aluno ativo/aprovado recebe 'general' se ainda não tiver
UPDATE public.profiles p
SET enabled_tracks = (
  SELECT ARRAY(
    SELECT DISTINCT x
    FROM unnest(
      COALESCE(p.enabled_tracks, '{}'::text[]) || ARRAY['general']::text[]
    ) AS x
  )
)
WHERE p.role = 'student'
  AND NOT ('general' = ANY (COALESCE(p.enabled_tracks, '{}'::text[])));

COMMENT ON COLUMN public.profiles.enabled_tracks IS
  'Trilhas liberadas: general (Residência Geral, padrão) + nephrology (exclusivo) + futuras. Grupo social NÃO libera Nefro.';

-- 2) Solicitações de entrada em grupos
CREATE TABLE IF NOT EXISTS public.study_group_join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  UNIQUE (group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_join_requests_pending
  ON public.study_group_join_requests(group_id, status)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_group_join_requests_user
  ON public.study_group_join_requests(user_id, status);

ALTER TABLE public.study_group_join_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins_manage_join_requests" ON public.study_group_join_requests;
CREATE POLICY "admins_manage_join_requests" ON public.study_group_join_requests
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "users_read_own_join_requests" ON public.study_group_join_requests;
CREATE POLICY "users_read_own_join_requests" ON public.study_group_join_requests
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "users_insert_own_join_requests" ON public.study_group_join_requests;
CREATE POLICY "users_insert_own_join_requests" ON public.study_group_join_requests
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "users_cancel_own_join_requests" ON public.study_group_join_requests;
CREATE POLICY "users_cancel_own_join_requests" ON public.study_group_join_requests
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "group_admins_read_join_requests" ON public.study_group_join_requests;
CREATE POLICY "group_admins_read_join_requests" ON public.study_group_join_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.study_groups g
      WHERE g.id = study_group_join_requests.group_id
        AND g.created_by = auth.uid()
    )
    OR public.is_admin()
  );

GRANT SELECT, INSERT, UPDATE ON public.study_group_join_requests TO authenticated;
GRANT ALL ON public.study_group_join_requests TO service_role;

-- 3) Ranking coletivo entre grupos (semanal / mensal)
CREATE TABLE IF NOT EXISTS public.study_group_collective_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  active_members INTEGER NOT NULL DEFAULT 0,
  exams_completed INTEGER NOT NULL DEFAULT 0,
  exams_expected INTEGER NOT NULL DEFAULT 0,
  average_percentage NUMERIC(6,2) NOT NULL DEFAULT 0,
  average_score_per_member NUMERIC(10,2) NOT NULL DEFAULT 0,
  participation_rate NUMERIC(6,2) NOT NULL DEFAULT 0,
  regularity_score NUMERIC(6,2) NOT NULL DEFAULT 0,
  collective_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  average_time_seconds NUMERIC(10,2) NOT NULL DEFAULT 0,
  position INTEGER,
  UNIQUE (group_id, period_type, period_start)
);

CREATE INDEX IF NOT EXISTS idx_collective_rankings_lookup
  ON public.study_group_collective_rankings(period_type, period_start, position);

CREATE TABLE IF NOT EXISTS public.study_group_collective_winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_type TEXT NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  collective_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  average_percentage NUMERIC(6,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (period_type, period_start)
);

ALTER TABLE public.study_group_collective_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_group_collective_winners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone_reads_collective_rankings" ON public.study_group_collective_rankings;
CREATE POLICY "anyone_reads_collective_rankings" ON public.study_group_collective_rankings
  FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "admins_manage_collective_rankings" ON public.study_group_collective_rankings;
CREATE POLICY "admins_manage_collective_rankings" ON public.study_group_collective_rankings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_reads_collective_winners" ON public.study_group_collective_winners;
CREATE POLICY "anyone_reads_collective_winners" ON public.study_group_collective_winners
  FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "admins_manage_collective_winners" ON public.study_group_collective_winners;
CREATE POLICY "admins_manage_collective_winners" ON public.study_group_collective_winners
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT ON public.study_group_collective_rankings TO authenticated;
GRANT SELECT ON public.study_group_collective_winners TO authenticated;
GRANT ALL ON public.study_group_collective_rankings TO service_role;
GRANT ALL ON public.study_group_collective_winners TO service_role;

-- Mínimo de membros ativos para aparecer no ranking coletivo
CREATE OR REPLACE FUNCTION public.collective_ranking_min_active()
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
AS $$ SELECT 3 $$;

-- Fórmula justa: não favorece grupos maiores
-- collective_score =
--   0.45 * média% +
--   0.25 * participação% +
--   0.20 * regularidade +
--   0.10 * média pts/aluno (normalizada 0–100)
CREATE OR REPLACE FUNCTION public.recalculate_collective_group_ranking(
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
  min_active INTEGER := public.collective_ranking_min_active();
  has_forfeited BOOLEAN;
  v_days INTEGER;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'attempts' AND column_name = 'forfeited'
  ) INTO has_forfeited;

  v_days := GREATEST(1, (p_period_end - p_period_start) + 1);

  DELETE FROM public.study_group_collective_rankings
  WHERE period_type = p_period_type
    AND period_start = p_period_start;

  FOR r IN
    WITH member_stats AS (
      SELECT
        gm.group_id,
        gm.user_id,
        COUNT(a.id) FILTER (
          WHERE a.finished_at IS NOT NULL
            AND (NOT has_forfeited OR COALESCE(a.forfeited, false) = false)
        ) AS exams_done,
        COALESCE(AVG(a.percentage) FILTER (
          WHERE a.finished_at IS NOT NULL
            AND (NOT has_forfeited OR COALESCE(a.forfeited, false) = false)
        ), 0) AS avg_pct,
        COALESCE(AVG(a.score) FILTER (
          WHERE a.finished_at IS NOT NULL
            AND (NOT has_forfeited OR COALESCE(a.forfeited, false) = false)
        ), 0) AS avg_score,
        COALESCE(AVG(a.duration_seconds) FILTER (
          WHERE a.finished_at IS NOT NULL
            AND (NOT has_forfeited OR COALESCE(a.forfeited, false) = false)
        ), 0) AS avg_time,
        COUNT(DISTINCT e.date_available) FILTER (
          WHERE a.finished_at IS NOT NULL
            AND (NOT has_forfeited OR COALESCE(a.forfeited, false) = false)
        ) AS distinct_days
      FROM public.study_group_members gm
      JOIN public.study_groups g ON g.id = gm.group_id AND g.active = true
      LEFT JOIN public.attempts a ON a.user_id = gm.user_id
      LEFT JOIN public.exams e ON e.id = a.exam_id
        AND e.date_available BETWEEN p_period_start AND p_period_end
        AND e.exam_kind = 'daily'
      GROUP BY gm.group_id, gm.user_id
    ),
    group_stats AS (
      SELECT
        group_id,
        COUNT(*)::int AS member_count,
        COUNT(*) FILTER (WHERE exams_done > 0)::int AS active_members,
        COALESCE(SUM(exams_done), 0)::int AS exams_completed,
        COALESCE(AVG(avg_pct) FILTER (WHERE exams_done > 0), 0) AS average_percentage,
        COALESCE(AVG(avg_score) FILTER (WHERE exams_done > 0), 0) AS average_score_per_member,
        COALESCE(AVG(avg_time) FILTER (WHERE exams_done > 0), 0) AS average_time_seconds,
        COALESCE(AVG(LEAST(100.0, (distinct_days::numeric / v_days) * 100)) FILTER (WHERE exams_done > 0), 0) AS regularity_score
      FROM member_stats
      GROUP BY group_id
    )
    SELECT
      gs.*,
      g.name AS group_name,
      -- expected ≈ active_members * dias * 1 prova (aproximação justa por aluno ativo)
      GREATEST(gs.active_members * v_days, 1) AS exams_expected,
      CASE
        WHEN gs.active_members = 0 THEN 0
        ELSE LEAST(
          100.0,
          (gs.exams_completed::numeric / GREATEST(gs.active_members * v_days, 1)) * 100
        )
      END AS participation_rate,
      ROUND((
        0.45 * COALESCE(gs.average_percentage, 0) +
        0.25 * CASE
          WHEN gs.active_members = 0 THEN 0
          ELSE LEAST(100.0, (gs.exams_completed::numeric / GREATEST(gs.active_members * v_days, 1)) * 100)
        END +
        0.20 * COALESCE(gs.regularity_score, 0) +
        0.10 * LEAST(100.0, COALESCE(gs.average_score_per_member, 0))
      )::numeric, 2) AS collective_score
    FROM group_stats gs
    JOIN public.study_groups g ON g.id = gs.group_id
    WHERE gs.active_members >= min_active
    ORDER BY
      collective_score DESC,
      average_percentage DESC,
      average_time_seconds ASC NULLS LAST
  LOOP
    INSERT INTO public.study_group_collective_rankings (
      group_id, period_type, period_start, period_end,
      active_members, exams_completed, exams_expected,
      average_percentage, average_score_per_member,
      participation_rate, regularity_score, collective_score,
      average_time_seconds, position
    ) VALUES (
      r.group_id, p_period_type, p_period_start, p_period_end,
      r.active_members, r.exams_completed, r.exams_expected,
      ROUND(r.average_percentage::numeric, 2),
      ROUND(r.average_score_per_member::numeric, 2),
      ROUND(r.participation_rate::numeric, 2),
      ROUND(r.regularity_score::numeric, 2),
      r.collective_score,
      ROUND(r.average_time_seconds::numeric, 2),
      pos
    );
    pos := pos + 1;
  END LOOP;

  -- Histórico do vencedor (só fecha períodos já encerrados)
  IF p_period_end < CURRENT_DATE THEN
    INSERT INTO public.study_group_collective_winners (
      period_type, period_start, period_end,
      group_id, group_name, collective_score, average_percentage
    )
    SELECT
      period_type, period_start, period_end,
      group_id,
      (SELECT name FROM public.study_groups WHERE id = group_id),
      collective_score, average_percentage
    FROM public.study_group_collective_rankings
    WHERE period_type = p_period_type
      AND period_start = p_period_start
      AND position = 1
    ON CONFLICT (period_type, period_start) DO UPDATE SET
      group_id = EXCLUDED.group_id,
      group_name = EXCLUDED.group_name,
      collective_score = EXCLUDED.collective_score,
      average_percentage = EXCLUDED.average_percentage;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.recalculate_collective_rankings_for_date(p_date DATE)
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
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;

  PERFORM public.recalculate_collective_group_ranking('weekly', v_week_start, v_week_end);
  PERFORM public.recalculate_collective_group_ranking('monthly', v_month_start, v_month_end);
END;
$$;

GRANT EXECUTE ON FUNCTION public.recalculate_collective_group_ranking(TEXT, DATE, DATE) TO service_role;
GRANT EXECUTE ON FUNCTION public.recalculate_collective_rankings_for_date(DATE) TO service_role;
GRANT EXECUTE ON FUNCTION public.recalculate_collective_rankings_for_date(DATE) TO authenticated;

-- Encadear no recalculo de rankings de grupo já existente
CREATE OR REPLACE FUNCTION public.recalculate_group_rankings_for_date(p_date DATE)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  g RECORD;
  v_week_start DATE;
  v_week_end DATE;
  v_month_start DATE;
  v_month_end DATE;
BEGIN
  v_week_start := date_trunc('week', p_date::timestamp)::date;
  v_week_end := v_week_start + 6;
  v_month_start := date_trunc('month', p_date::timestamp)::date;
  v_month_end := (date_trunc('month', p_date::timestamp) + interval '1 month - 1 day')::date;

  FOR g IN SELECT id FROM public.study_groups WHERE active = true LOOP
    PERFORM public.recalculate_group_period_ranking(g.id, 'daily', p_date, p_date);
    PERFORM public.recalculate_group_period_ranking(g.id, 'weekly', v_week_start, v_week_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'monthly', v_month_start, v_month_end);
    PERFORM public.recalculate_group_period_ranking(g.id, 'general', '2000-01-01'::date, p_date);
  END LOOP;

  PERFORM public.recalculate_collective_rankings_for_date(p_date);
END;
$$;
