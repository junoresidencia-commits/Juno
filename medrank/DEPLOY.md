# MedRank — Deploy (Vercel + Supabase)

Guia passo a passo para sair do modo demo e colocar em produção.

**Tempo estimado:** ~30–45 min no primeiro deploy.

---

## Checklist rápido

- [ ] Projeto Supabase criado
- [ ] 14 migrations executadas (001 → 014)
- [ ] Professor criado no Auth + perfil `admin`
- [ ] Repo importado na Vercel (**Root Directory = `medrank`**)
- [ ] Variáveis de ambiente configuradas
- [ ] URLs de auth no Supabase apontando pro domínio Vercel
- [ ] Deploy feito e login do professor testado
- [ ] Questões importadas
- [ ] Primeira prova publicada
- [ ] Alunos criados em **Admin → Alunos**

---

## 1. Supabase

### 1.1 Criar projeto

1. Acesse [supabase.com](https://supabase.com) → **New project**
2. Anote:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (Settings → API) → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ secreta

### 1.2 Rodar migrations

No Supabase: **SQL Editor** → executar **em ordem**, uma por vez:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_and_submit.sql
supabase/migrations/003_period_rankings.sql
supabase/migrations/004_weekly_challenges.sql
supabase/migrations/005_invite_tokens.sql
supabase/migrations/006_simulados.sql
supabase/migrations/007_exam_release_window.sql
supabase/migrations/008_ranking_visible_to_students.sql
supabase/migrations/009_exam_daily_window.sql
supabase/migrations/010_ranking_next_day.sql
supabase/migrations/011_ranking_after_exam.sql
supabase/migrations/012_invite_email_unlimited_students.sql
supabase/migrations/013_question_timing_scoring.sql
supabase/migrations/014_scoring_scale_0_100.sql
```

Ou cole tudo de uma vez com:

```bash
cd medrank
cat supabase/migrations/*.sql
```

> A migration **014** define a escala atual: **0–100 pts/questão, máx. 2.000 por prova de 20 questões**.

### 1.3 Criar o professor (admin)

**Opção A — Dashboard Supabase (recomendado)**

1. **Authentication → Users → Add user**
   - E-mail: `seu@email.com`
   - Senha: (defina uma forte)
   - ✅ Auto Confirm User

2. Copie o **UUID** do usuário criado

3. **SQL Editor** → rode `supabase/setup-production.sql` (substitua o UUID e e-mail)

**Opção B — SQL direto**

```sql
-- Depois de criar o usuário no Auth, substitua os valores:
INSERT INTO public.profiles (id, name, email, role, active, approved_at)
VALUES (
  'COLE-UUID-DO-AUTH-AQUI',
  'Professor',
  'seu@email.com',
  'admin',
  true,
  now()
)
ON CONFLICT (id) DO UPDATE SET role = 'admin', active = true;
```

### 1.4 Configurar Auth (URLs)

**Authentication → URL Configuration**

| Campo | Valor |
|-------|-------|
| Site URL | `https://seu-app.vercel.app` |
| Redirect URLs | `https://seu-app.vercel.app/**` |

Se usar domínio próprio, adicione também `https://seudominio.com/**`.

---

## 2. Vercel

### 2.1 Importar o repositório

1. [vercel.com](https://vercel.com) → **Add New → Project**
2. Importe o repo `Juno`
3. **Root Directory:** `medrank` ← obrigatório
4. Framework: Next.js (detecta automaticamente)
5. **Não** faça deploy ainda — configure as env vars primeiro

### 2.2 Variáveis de ambiente

Em **Settings → Environment Variables** (Production):

| Variável | Valor | Observação |
|----------|-------|------------|
| `DEMO_MODE` | `false` | Desliga demo local |
| `SKIP_AUTH` | `false` | Exige login real |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Do Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Chave anon |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Só servidor — criar alunos |
| `NEXT_PUBLIC_SITE_URL` | `https://seu-app.vercel.app` | URL final do app |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` | Opcional |

> ⚠️ `DEMO_MODE=false` é **obrigatório** em produção. Se faltar, o app cai no modo demo.

### 2.3 Deploy

1. **Deploy** (ou push na branch `main`)
2. Após o deploy, confira se `NEXT_PUBLIC_SITE_URL` bate com a URL real
3. Atualize as URLs no Supabase Auth se o domínio Vercel mudou

### 2.4 Verificar

```bash
cd medrank
./scripts/verify-production-ready.sh
```

---

## 3. Primeiro uso em produção

### 3.1 Login professor

1. Acesse `https://seu-app.vercel.app/login`
2. Entre com o e-mail/senha criados no Supabase Auth
3. Deve ir para `/admin`

### 3.2 Importar questões

1. **Admin → Importar**
2. Envie CSV ou Excel com as colunas:

`enunciado`, `alternativa_a`, `alternativa_b`, `alternativa_c`, `alternativa_d`, `alternativa_e`, `correta`, `comentario`, `origem`, `ano`, `especialidade`, `tema`, `subtema`, `dificuldade`, `tags`

> O repo já tem `data/imported-questions.json` (500 questões ENARE) usado no demo. Em produção, importe via painel ou converta pra Excel.

### 3.3 Criar a primeira prova

1. **Admin → Provas → Nova**
2. Defina: **20 questões**, **30 minutos**, data de hoje
3. Selecione questões (manual ou automático)
4. **Publicar** a prova

### 3.4 Criar alunos

1. **Admin → Alunos → Criar login**
2. Preencha nome, e-mail e senha
3. O aluno entra em `/login` com esses dados

> Não usa mais link de convite — o professor cria login direto.

---

## 4. Pontuação (referência)

| Situação | Pontos |
|----------|--------|
| Erro / em branco | 0 |
| Acerto | 85 + até 15 de bônus (velocidade) |
| Resposta &lt; 8 s | 85 (sem bônus — anti-chute) |
| **Máximo por prova (20 questões)** | **2.000 pts** |

**Ranking diário:** mais acertos → menos tempo → mais pontos.

---

## 5. Problemas comuns

| Problema | Solução |
|----------|---------|
| Login não funciona | Confira URLs no Supabase Auth; `DEMO_MODE=false` |
| "Service role necessária" ao criar aluno | Adicione `SUPABASE_SERVICE_ROLE_KEY` na Vercel e redeploy |
| Professor cai em `/aluno` | Perfil sem `role = 'admin'` — rode o SQL do setup |
| Prova não aparece | Prova precisa estar `published` e na data de hoje |
| Ranking vazio | Alunos precisam terminar a prova; ranking libera conforme config da prova |
| Build falha na Vercel | Root Directory deve ser `medrank`, não a raiz do repo |
| Aluno não recebe e-mail da prova | Configure `RESEND_API_KEY` + `EMAIL_FROM` (ver `docs/EMAIL-PROVA-ATIVA.md`). Sem isso, só notificação no app. |

---

## 5.1 E-mail “prova ativa” + empurrões (opcional)

Quando a disputa do dia é gerada, alunos ativos recebem e-mail (Resend) + aviso no sino.

Ao longo do dia (9h / 13h / 17h / 19h BRT), quem **ainda não fez** recebe lembrete estimulando a fazer antes de 21h — com toques de placar da semana (“faltam X pts do 1º”).

Na Vercel:

```
RESEND_API_KEY=re_...
EMAIL_FROM=MedRank <prova@seudominio.com>
NEXT_PUBLIC_SITE_URL=https://seu-app.vercel.app
CRON_SECRET=...
```

Detalhes: `docs/EMAIL-PROVA-ATIVA.md`.

---

## 6. Domínio próprio (opcional)

1. Vercel → **Settings → Domains** → adicione seu domínio
2. Atualize `NEXT_PUBLIC_SITE_URL`
3. Atualize **Site URL** e **Redirect URLs** no Supabase
4. Redeploy

---

## 7. Comandos úteis

```bash
# Desenvolvimento local (demo)
cd medrank
cp .env.example .env.local
# DEMO_MODE=true no .env.local
npm install
npm run dev

# Build de produção local
npm run build && npm run start

# Verificar env antes do deploy
./scripts/verify-production-ready.sh
```

---

## Arquivos importantes

| Arquivo | Função |
|---------|--------|
| `DEPLOY.md` | Este guia |
| `.env.example` | Modelo de variáveis |
| `supabase/migrations/` | Schema completo (001–014) |
| `supabase/setup-production.sql` | Criar perfil admin |
| `scripts/verify-production-ready.sh` | Checagem pré-deploy |
| `scripts/start-public.sh` | Túnel demo (só testes temporários) |
