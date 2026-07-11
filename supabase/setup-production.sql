-- MedRank: configurar professor (admin) após criar usuário no Supabase Auth
--
-- PASSO 1: Authentication → Users → Add user (com Auto Confirm)
-- PASSO 2: Copie o UUID do usuário
-- PASSO 3: Substitua os valores abaixo e execute no SQL Editor

-- Substitua estes valores:
--   COLE-UUID-DO-AUTH-AQUI  → UUID do usuário no Auth
--   seu@email.com           → mesmo e-mail do Auth
--   Professor               → nome exibido no app

INSERT INTO public.profiles (id, name, email, role, active, approved_at)
VALUES (
  'COLE-UUID-DO-AUTH-AQUI',
  'Professor',
  'seu@email.com',
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

-- Verificar:
-- SELECT id, name, email, role, active FROM public.profiles WHERE role = 'admin';
