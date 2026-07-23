-- Ranking geral (tabela rankings) = só administrador.
-- Alunos veem apenas study_group_rankings do(s) grupo(s) em que participam.

DROP POLICY IF EXISTS "Everyone reads rankings" ON public.rankings;

CREATE POLICY "Admin reads rankings" ON public.rankings
  FOR SELECT USING (public.is_admin());

-- Admin manages já existe; garantir SELECT admin cobrindo o gap
DROP POLICY IF EXISTS "Admin manages rankings" ON public.rankings;
CREATE POLICY "Admin manages rankings" ON public.rankings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
