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
