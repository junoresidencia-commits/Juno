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
