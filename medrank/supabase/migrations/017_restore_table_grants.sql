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
