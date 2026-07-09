# MedRank

Web app de competição de questões médicas para grupo fechado de até 10 alunos.

## Funcionalidades

- **Prova diária** cronometrada (30 min, sem pausa, auto-envio)
- **Banco de questões** com cadastro manual e importação CSV/Excel
- **Ranking** diário, semanal, mensal e geral
- **Gamificação** com medalhas, streak e desafios semanais
- **Painel do professor** com relatórios e estatísticas
- **Área do aluno** com histórico e desempenho por tema

## Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Banco:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth

## Documentação

A especificação completa está em [`../docs/ESPECIFICACAO.md`](../docs/ESPECIFICACAO.md).

## Setup local

```bash
cd medrank
cp .env.example .env.local
# Preencher NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install
npm run dev
```

## Banco de dados

1. Criar projeto no [Supabase](https://supabase.com)
2. Executar a migration em `supabase/migrations/001_initial_schema.sql`
3. Criar usuário admin no Auth e inserir perfil:

```sql
INSERT INTO public.profiles (id, name, email, role)
VALUES ('<uuid-do-auth-user>', 'Professor', 'prof@email.com', 'admin');
```

## Deploy

- **Frontend:** Vercel
- **Banco/Auth:** Supabase (plano gratuito suficiente para 10 alunos)

## Importação de questões

Colunas do CSV/Excel:

`enunciado`, `alternativa_a`, `alternativa_b`, `alternativa_c`, `alternativa_d`, `alternativa_e`, `correta`, `comentario`, `origem`, `ano`, `especialidade`, `tema`, `subtema`, `dificuldade`, `tags`

## Fases de desenvolvimento

| Fase | Escopo | Status |
|------|--------|--------|
| 1 — MVP | Auth, CRUD questões, prova com cronômetro, ranking diário | ✅ Implementado |
| 2 | Importação, dashboard admin, relatórios, rankings completos | Parcial (importação e admin prontos; relatórios PDF/Excel pendente) |
| 3 | Gamificação, medalhas, streak, desafios semanais | Pendente |

## Direitos autorais

Questões de ENARE, USP e outras instituições devem ser usadas apenas como material de estudo interno, sem distribuição pública.
