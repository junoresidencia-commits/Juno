-- Remediação admin de questões já aplicadas em provas:
-- anular / zerar / mudar gabarito → rescore tentativas → ranking → notificar.

-- Override por prova (não muda o banco global a menos que peçam bank_wide)
CREATE TABLE IF NOT EXISTS public.exam_question_overrides (
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'annulled')),
  correct_option_override CHAR(1)
    CHECK (correct_option_override IS NULL OR correct_option_override IN ('A','B','C','D','E')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (exam_id, question_id)
);

ALTER TABLE public.exam_question_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages exam_question_overrides" ON public.exam_question_overrides;
CREATE POLICY "Admin manages exam_question_overrides" ON public.exam_question_overrides
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Authenticated read exam_question_overrides" ON public.exam_question_overrides;
CREATE POLICY "Authenticated read exam_question_overrides" ON public.exam_question_overrides
  FOR SELECT USING (auth.role() = 'authenticated');

-- Auditoria de ações do professor
CREATE TABLE IF NOT EXISTS public.question_remediations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
  action TEXT NOT NULL CHECK (action IN (
    'annul',
    'zero_score',
    'change_gabarito',
    'recalculate_only',
    'restore'
  )),
  old_correct_option CHAR(1),
  new_correct_option CHAR(1),
  bank_wide BOOLEAN NOT NULL DEFAULT false,
  notify_users BOOLEAN NOT NULL DEFAULT true,
  reason TEXT NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  attempts_updated INTEGER NOT NULL DEFAULT 0,
  rankings_recalculated BOOLEAN NOT NULL DEFAULT false,
  notified_count INTEGER NOT NULL DEFAULT 0,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS question_remediations_exam_idx
  ON public.question_remediations (exam_id, created_at DESC);
CREATE INDEX IF NOT EXISTS question_remediations_question_idx
  ON public.question_remediations (question_id, created_at DESC);

ALTER TABLE public.question_remediations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin manages question_remediations" ON public.question_remediations;
CREATE POLICY "Admin manages question_remediations" ON public.question_remediations
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Marca resposta excluída da pontuação (questão anulada)
ALTER TABLE public.attempt_answers
  ADD COLUMN IF NOT EXISTS excluded_from_score BOOLEAN NOT NULL DEFAULT false;

-- Notificações in-app para alunos
CREATE TABLE IF NOT EXISTS public.user_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'remediation'
    CHECK (kind IN ('remediation', 'system', 'ranking')),
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_notifications_user_unread_idx
  ON public.user_notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own notifications" ON public.user_notifications;
CREATE POLICY "Users read own notifications" ON public.user_notifications
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users update own notifications" ON public.user_notifications;
CREATE POLICY "Users update own notifications" ON public.user_notifications
  FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert notifications" ON public.user_notifications;
CREATE POLICY "Admin insert notifications" ON public.user_notifications
  FOR INSERT WITH CHECK (public.is_admin());

GRANT SELECT, UPDATE ON public.user_notifications TO authenticated;
GRANT SELECT ON public.exam_question_overrides TO authenticated;
GRANT SELECT ON public.question_remediations TO authenticated;

-- Gabarito efetivo na prova (override > banco)
CREATE OR REPLACE FUNCTION public.effective_correct_option(
  p_exam_id UUID,
  p_question_id UUID
)
RETURNS CHAR(1)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT o.correct_option_override
      FROM public.exam_question_overrides o
      WHERE o.exam_id = p_exam_id
        AND o.question_id = p_question_id
        AND o.status = 'active'
        AND o.correct_option_override IS NOT NULL
    ),
    (SELECT q.correct_option FROM public.questions q WHERE q.id = p_question_id)
  );
$$;

-- Questão anulada nesta prova?
CREATE OR REPLACE FUNCTION public.is_exam_question_annulled(
  p_exam_id UUID,
  p_question_id UUID
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.exam_question_overrides o
    WHERE o.exam_id = p_exam_id
      AND o.question_id = p_question_id
      AND o.status = 'annulled'
  );
$$;

-- Recalcula todas as tentativas finalizadas (não confiscadas) de uma prova
CREATE OR REPLACE FUNCTION public.rescore_exam_attempts(p_exam_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_exam RECORD;
  v_attempt RECORD;
  v_question_limit INTEGER;
  v_annulled_count INTEGER;
  v_scored_total INTEGER;
  v_correct INTEGER;
  v_score NUMERIC;
  v_row RECORD;
  v_updated INTEGER := 0;
BEGIN
  SELECT e.*
  INTO v_exam
  FROM public.exams e
  WHERE e.id = p_exam_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Prova não encontrada';
  END IF;

  SELECT COUNT(*)::INTEGER
  INTO v_annulled_count
  FROM public.exam_question_overrides o
  WHERE o.exam_id = p_exam_id AND o.status = 'annulled';

  v_scored_total := GREATEST(v_exam.total_questions - COALESCE(v_annulled_count, 0), 0);
  v_question_limit := LEAST(
    90,
    GREATEST(60, FLOOR((v_exam.duration_minutes * 60)::NUMERIC / GREATEST(v_exam.total_questions, 1)))
  );

  FOR v_attempt IN
    SELECT a.id
    FROM public.attempts a
    WHERE a.exam_id = p_exam_id
      AND a.finished_at IS NOT NULL
      AND COALESCE(a.forfeited, false) = false
  LOOP
    -- Atualiza is_correct / exclusão conforme overrides atuais
    UPDATE public.attempt_answers aa
    SET
      excluded_from_score = public.is_exam_question_annulled(p_exam_id, aa.question_id),
      is_correct = CASE
        WHEN public.is_exam_question_annulled(p_exam_id, aa.question_id) THEN false
        WHEN aa.selected_option IS NULL THEN false
        ELSE aa.selected_option = public.effective_correct_option(p_exam_id, aa.question_id)
      END
    WHERE aa.attempt_id = v_attempt.id;

    SELECT COUNT(*) FILTER (
      WHERE is_correct = true AND COALESCE(excluded_from_score, false) = false
    )::INTEGER
    INTO v_correct
    FROM public.attempt_answers
    WHERE attempt_id = v_attempt.id;

    v_score := 0;
    FOR v_row IN
      SELECT
        aa.is_correct,
        COALESCE(aa.time_spent_seconds, v_question_limit) AS time_spent,
        COALESCE(aa.excluded_from_score, false) AS excluded
      FROM public.attempt_answers aa
      WHERE aa.attempt_id = v_attempt.id
    LOOP
      IF NOT v_row.excluded THEN
        v_score := v_score + public.score_question_answer(
          v_row.is_correct,
          v_row.time_spent,
          v_question_limit
        );
      END IF;
    END LOOP;

    UPDATE public.attempts
    SET
      score = v_score,
      total_correct = v_correct,
      total_questions = v_scored_total,
      percentage = CASE
        WHEN v_scored_total > 0 THEN ROUND((v_correct::NUMERIC / v_scored_total) * 100, 2)
        ELSE 0
      END
    WHERE id = v_attempt.id;

    v_updated := v_updated + 1;
  END LOOP;

  PERFORM public.recalculate_rankings_for_date(v_exam.date_available);
  PERFORM public.recalculate_group_rankings_for_date(v_exam.date_available);

  RETURN json_build_object(
    'exam_id', p_exam_id,
    'attempts_updated', v_updated,
    'scored_question_count', v_scored_total,
    'annulled_count', v_annulled_count,
    'rankings_recalculated', true
  );
END;
$$;

-- Ação principal do admin
CREATE OR REPLACE FUNCTION public.apply_question_remediation(
  p_exam_id UUID,
  p_question_id UUID,
  p_action TEXT,
  p_reason TEXT,
  p_new_correct_option CHAR(1) DEFAULT NULL,
  p_bank_wide BOOLEAN DEFAULT false,
  p_notify_users BOOLEAN DEFAULT true
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_exam RECORD;
  v_question RECORD;
  v_old CHAR(1);
  v_new CHAR(1);
  v_rescore JSON;
  v_attempts_updated INTEGER := 0;
  v_notified INTEGER := 0;
  v_title TEXT;
  v_body TEXT;
  v_remediation_id UUID;
  v_order INTEGER;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso negado: apenas administrador';
  END IF;

  IF p_reason IS NULL OR length(trim(p_reason)) < 8 THEN
    RAISE EXCEPTION 'Informe um motivo (mín. 8 caracteres)';
  END IF;

  IF p_action NOT IN ('annul', 'zero_score', 'change_gabarito', 'recalculate_only', 'restore') THEN
    RAISE EXCEPTION 'Ação inválida: %', p_action;
  END IF;

  SELECT e.* INTO v_exam FROM public.exams e WHERE e.id = p_exam_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Prova não encontrada';
  END IF;

  SELECT q.* INTO v_question FROM public.questions q WHERE q.id = p_question_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Questão não encontrada';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.exam_questions eq
    WHERE eq.exam_id = p_exam_id AND eq.question_id = p_question_id
  ) THEN
    RAISE EXCEPTION 'Questão não pertence a esta prova';
  END IF;

  SELECT eq.order_number INTO v_order
  FROM public.exam_questions eq
  WHERE eq.exam_id = p_exam_id AND eq.question_id = p_question_id;

  v_old := public.effective_correct_option(p_exam_id, p_question_id);
  v_new := v_old;

  IF p_action IN ('annul', 'zero_score') THEN
    INSERT INTO public.exam_question_overrides (exam_id, question_id, status, correct_option_override, updated_at)
    VALUES (p_exam_id, p_question_id, 'annulled', NULL, now())
    ON CONFLICT (exam_id, question_id) DO UPDATE
      SET status = 'annulled',
          correct_option_override = NULL,
          updated_at = now();

    v_title := 'Questão anulada na disputa';
    v_body := format(
      'A questão #%s da prova "%s" foi anulada pelo professor. Sua pontuação e o ranking foram recalculados automaticamente. Motivo: %s',
      COALESCE(v_order::TEXT, '?'),
      v_exam.title,
      trim(p_reason)
    );

  ELSIF p_action = 'change_gabarito' THEN
    IF p_new_correct_option IS NULL OR p_new_correct_option NOT IN ('A','B','C','D','E') THEN
      RAISE EXCEPTION 'Novo gabarito obrigatório (A–E)';
    END IF;
    v_new := p_new_correct_option;

    INSERT INTO public.exam_question_overrides (exam_id, question_id, status, correct_option_override, updated_at)
    VALUES (p_exam_id, p_question_id, 'active', v_new, now())
    ON CONFLICT (exam_id, question_id) DO UPDATE
      SET status = 'active',
          correct_option_override = EXCLUDED.correct_option_override,
          updated_at = now();

    IF p_bank_wide THEN
      UPDATE public.questions
      SET correct_option = v_new
      WHERE id = p_question_id;
    END IF;

    v_title := 'Gabarito corrigido';
    v_body := format(
      'O gabarito da questão #%s da prova "%s" foi alterado de %s para %s. Pontuações e ranking foram recalculados. Motivo: %s',
      COALESCE(v_order::TEXT, '?'),
      v_exam.title,
      COALESCE(v_old, '?'),
      v_new,
      trim(p_reason)
    );

  ELSIF p_action = 'restore' THEN
    DELETE FROM public.exam_question_overrides
    WHERE exam_id = p_exam_id AND question_id = p_question_id;

    v_new := (SELECT correct_option FROM public.questions WHERE id = p_question_id);
    v_title := 'Questão restaurada';
    v_body := format(
      'A questão #%s da prova "%s" voltou a valer com o gabarito original. Ranking recalculado. Motivo: %s',
      COALESCE(v_order::TEXT, '?'),
      v_exam.title,
      trim(p_reason)
    );

  ELSE
    -- recalculate_only
    v_title := 'Pontuação recalculada';
    v_body := format(
      'A pontuação da prova "%s" foi recalculada pelo professor. Motivo: %s',
      v_exam.title,
      trim(p_reason)
    );
  END IF;

  v_rescore := public.rescore_exam_attempts(p_exam_id);
  v_attempts_updated := COALESCE((v_rescore->>'attempts_updated')::INTEGER, 0);

  IF p_notify_users THEN
    INSERT INTO public.user_notifications (user_id, title, body, kind, meta)
    SELECT
      a.user_id,
      v_title,
      v_body,
      'remediation',
      jsonb_build_object(
        'exam_id', p_exam_id,
        'question_id', p_question_id,
        'action', p_action,
        'order_number', v_order
      )
    FROM public.attempts a
    WHERE a.exam_id = p_exam_id;

    GET DIAGNOSTICS v_notified = ROW_COUNT;
  END IF;

  INSERT INTO public.question_remediations (
    exam_id, question_id, action, old_correct_option, new_correct_option,
    bank_wide, notify_users, reason, admin_id,
    attempts_updated, rankings_recalculated, notified_count, meta
  ) VALUES (
    p_exam_id, p_question_id, p_action, v_old, v_new,
    p_bank_wide, p_notify_users, trim(p_reason), auth.uid(),
    v_attempts_updated, true, v_notified,
    jsonb_build_object('rescore', v_rescore, 'order_number', v_order)
  )
  RETURNING id INTO v_remediation_id;

  RETURN json_build_object(
    'remediation_id', v_remediation_id,
    'exam_id', p_exam_id,
    'question_id', p_question_id,
    'action', p_action,
    'old_correct_option', v_old,
    'new_correct_option', v_new,
    'attempts_updated', v_attempts_updated,
    'rankings_recalculated', true,
    'notified_count', v_notified,
    'rescore', v_rescore
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.effective_correct_option(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_exam_question_annulled(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.rescore_exam_attempts(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.apply_question_remediation(UUID, UUID, TEXT, TEXT, CHAR, BOOLEAN, BOOLEAN) TO authenticated;

-- submit_attempt respeita anulação e gabarito override
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
  v_today DATE;
  v_question_limit INTEGER;
  v_row RECORD;
BEGIN
  SELECT a.*, e.duration_minutes, e.date_available, e.total_questions, e.id AS exam_uuid
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
    'submitted_automatically', p_auto
  );
END;
$$;
