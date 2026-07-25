# Desafio Expert (5 casos por semana)

## Regra

- O professor cria **5 questões difíceis** (casos clínicos: dose, medicação, conduta…).
- **Escolhe o dia** no calendário — não é dia fixo da semana (pode variar).
- Alunos só podem fazer nesse dia, das **20h às 22h** (Brasília) — **2 horas**.
- Cada acerto vale **2×** no ranking.
- Se ainda não estiver pronto: salva **rascunho** e **publica no dia**.

## Onde

Admin → **Desafio Expert** (`/admin/desafio-expert`)

## SQL

Rode `supabase/migrations/040_weekly_expert.sql`.

## Aluno

Na home, card **Desafio Expert** no dia publicado. Antes das 20h: “Abre às 20h”. Depois das 22h: prazo encerrado.
