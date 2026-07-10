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
