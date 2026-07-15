# Grupos MedRank

## O que é
Grupos personalizados (ligas, turmas, cohorts) com:
- membros (um aluno pode estar em vários grupos);
- ranking interno diário / semanal / mensal;
- desafios exclusivos do grupo.

## Tabelas
- `study_groups`
- `study_group_members`
- `study_group_rankings`
- `weekly_challenges.group_id` (null = desafio global)

## Aplicar no Supabase
Rodar: `medrank/supabase/migrations/019_study_groups.sql`

## Uso
**Professor:** Admin → Grupos → criar → adicionar alunos → ver ranking → criar desafio do grupo.

**Aluno:** Menu Grupos → abrir o grupo → ranking (Diário/Semanal/Mensal) e desafios.

Rankings de grupo são recalculados automaticamente ao finalizar uma disputa (`submit_attempt`) e ao adicionar/remover membros.
