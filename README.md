# MedRank

Web app de competição de questões médicas para grupo fechado (até 10 alunos + 1 professor).

## Funcionalidades

- **Prova diária** cronometrada (20 questões · 30 min · auto-envio)
- **Banco de questões** com cadastro manual e importação CSV/Excel
- **Ranking** diário, semanal, mensal e geral
- **Gamificação** com medalhas, streak e desafios semanais
- **Painel do professor** — criar logins de alunos, provas, relatórios
- **Área do aluno** — prova, ranking, histórico, simulados

## Pontuação

| Por questão | Prova (20 questões) |
|-------------|---------------------|
| 0–100 pts | máx. **2.000 pts** |

- Acerto: **85 pts** + até **15** de bônus por velocidade
- Resposta em menos de 8 s: sem bônus (anti-chute)
- Erro ou em branco: **0**

## Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth

## Deploy em produção

👉 **Guia completo:** [`DEPLOY.md`](./DEPLOY.md)

Resumo:

1. Supabase → rodar migrations `001`–`014`
2. Criar professor no Auth + `supabase/setup-production.sql`
3. Vercel → importar repo, **Root Directory = `medrank`**
4. Env vars: `DEMO_MODE=false`, chaves Supabase, `NEXT_PUBLIC_SITE_URL`
5. Importar questões → criar prova → criar alunos

```bash
./scripts/verify-production-ready.sh   # checagem pré-deploy
```

## Setup local (demo)

```bash
cd medrank
cp .env.example .env.local
# DEMO_MODE=true (padrão no .env.example)
npm install
npm run dev
```

**Logins demo:**

| Papel | Usuário | Senha |
|-------|---------|-------|
| Professor | `professor` | `professor` |
| Aluno | `aluno` | `aluno` |

## Banco de dados

Migrations em `supabase/migrations/` (14 arquivos, executar em ordem).

Setup do professor: `supabase/setup-production.sql`

## Importação de questões

Colunas do CSV/Excel:

`enunciado`, `alternativa_a`, `alternativa_b`, `alternativa_c`, `alternativa_d`, `alternativa_e`, `correta`, `comentario`, `origem`, `ano`, `especialidade`, `tema`, `subtema`, `dificuldade`, `tags`

## Documentação

Especificação completa: [`../docs/ESPECIFICACAO.md`](../docs/ESPECIFICACAO.md)

## Direitos autorais

Questões de ENARE, USP e outras instituições devem ser usadas apenas como material de estudo interno, sem distribuição pública.
