# Setup do zero — Vercel + Supabase

Siga **nesta ordem**. Não misture projeto/URL antiga.

---

## Fase A — Supabase (novo)

### A1. Criar projeto
1. Abra https://supabase.com/dashboard
2. **New project**
3. Nome: `medrank` (ou outro)
4. Senha do banco: guarde em local seguro
5. Região: **South America (São Paulo)** se aparecer
6. Aguarde o projeto ficar **Ready**

### A2. Copiar as 3 chaves
Em **Project Settings → API**:

| No app / Vercel | No Supabase |
|-----------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **anon public** |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** (secreta) |

### A3. Rodar o banco
1. **SQL Editor → New query**
2. Abra o arquivo do repo: `medrank/supabase/setup-all-migrations.sql`
3. Cole **tudo** → **Run**
4. Se der erro, rode uma migration por vez em `medrank/supabase/migrations/` (001→014)

### A4. Criar o professor (admin)
1. **Authentication → Users → Add user**
   - Email: o seu
   - Senha: forte
   - ✅ Auto Confirm User
2. Copie o **UUID** do usuário
3. SQL Editor → abra `medrank/supabase/setup-production.sql`
4. Troque `COLE-UUID-DO-AUTH-AQUI` e `seu@email.com` → **Run**

### A5. URLs de Auth (depois do Vercel)
**Authentication → URL Configuration**

- Site URL: `https://SEU-APP.vercel.app`
- Redirect URLs: `https://SEU-APP.vercel.app/**`

(Volte aqui quando tiver a URL da Vercel.)

---

## Fase B — Vercel (novo)

### B1. Apagar o antigo (se existir)
Projeto velho → **Settings → Delete Project**

### B2. Criar projeto novo
1. https://vercel.com/new
2. Importar **junoresidencia-commits/Juno**
3. **Root Directory:** `medrank` ← obrigatório
4. Framework: Next.js (automático)

### B3. Environment Variables
Adicione em **Production** e **Preview**:

| Nome | Valor |
|------|--------|
| `DEMO_MODE` | `false` |
| `SKIP_AUTH` | `false` |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-APP.vercel.app` (ajuste após 1º deploy) |
| `NEXT_PUBLIC_SUPABASE_URL` | (do passo A2) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (do passo A2) |
| `SUPABASE_SERVICE_ROLE_KEY` | (do passo A2) |

> Se quiser testar **antes** do Supabase: use só `DEMO_MODE=true` e **não** coloque chaves Supabase. Depois volte e troca.

### B4. Deploy
1. **Deploy**
2. Copie a URL (`https://….vercel.app`)
3. Atualize `NEXT_PUBLIC_SITE_URL` → **Redeploy**
4. Volte ao Supabase (passo A5) com essa URL

### B5. Testar
1. Abra `https://seu-app.vercel.app/login`
2. Entre com o e-mail/senha do professor (Auth)
3. Deve ir para `/admin`
4. **Alunos** → criar aluno
5. Publicar prova do dia

---

## Checklist final

- [ ] Projeto Supabase novo
- [ ] `setup-all-migrations.sql` rodou sem erro
- [ ] Professor admin criado
- [ ] Vercel Root Directory = `medrank`
- [ ] Env vars reais (não placeholder)
- [ ] Auth URLs = domínio Vercel
- [ ] Login professor funciona
- [ ] Aluno consegue fazer a disputa

---

## Se der erro

| Erro | Causa | Fix |
|------|--------|-----|
| `500` / `MIDDLEWARE_INVOCATION_FAILED` | Production em `main` **antigo** (middleware cria Supabase com URL vazia) | Faça merge do PR MedRank com o fix de env, confira **Root Directory = `medrank`**, **Redeploy** |
| `URL and API key are required` | Env vazia/errada | Confira as 3 chaves na Vercel e redeploy — ou use só `DEMO_MODE=true` **sem** chaves Supabase |
| Login inválido | User sem confirm / sem profile | Auto Confirm + `setup-production.sql` |
| Página sem estilo | Deploy antigo | Redeploy no projeto **novo** |
| 404 em tudo | Root Directory errado | Tem que ser `medrank` |

### Env vars mínimas para demo (sem Supabase ainda)

| Nome | Valor |
|------|--------|
| `DEMO_MODE` | `true` |
| `SKIP_AUTH` | `false` |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` |
| `NEXT_PUBLIC_SITE_URL` | `https://medrank-app.vercel.app` |

Não precisa de `NEXT_PUBLIC_SUPABASE_*` nesse modo. O código **com o fix** entra em demo; o `main` antigo **quebra** sem as chaves.

Arquivos no repo:
- `supabase/setup-all-migrations.sql` — banco
- `supabase/setup-production.sql` — admin
- `COMECAR-DO-ZERO.md` — alternativa só demo
- `DEPLOY.md` — detalhes extras
