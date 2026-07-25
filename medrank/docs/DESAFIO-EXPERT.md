# Desafio Expert (5 casos por semana)

## Regra

- O professor cria **5 questões difíceis** (casos clínicos reais: dose, medicação, conduta…).
- Escolhe **um dia da semana** (ex.: quarta).
- Alunos só podem fazer a partir das **20h** (Brasília) desse dia.
- Cada acerto vale **2×** no ranking (multiplicador da prova).
- Se às 17h ainda não estiver pronto: salva **rascunho** e **publica no dia**.

## Onde

Admin → **Desafio Expert** (`/admin/desafio-expert`)

## SQL

Rode `supabase/migrations/040_weekly_expert.sql` (exam_kind `weekly_expert` + `score_multiplier` + índice único por kind).

## Aluno

Na home, card **Desafio Expert** aparece no dia publicado. Antes das 20h: “Abre às 20h”.
