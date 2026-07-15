# Grupos MedRank

## Link do PR
https://github.com/junoresidencia-commits/Juno/pull/18

## Ativar em produção
Siga o checklist completo: **[PASSO-A-PASSO-GRUPOS.md](./PASSO-A-PASSO-GRUPOS.md)**

Resumo:
1. Merge do PR #18
2. Deploy Vercel
3. Rodar `supabase/migrations/019_study_groups.sql` no Supabase
4. Admin → Grupos → criar → adicionar membros

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

## Uso
**Professor:** Admin → Grupos → criar → adicionar alunos → ver ranking → criar desafio do grupo.

**Aluno:** Menu Grupos → abrir o grupo → ranking (Diário/Semanal/Mensal) e desafios.

Rankings de grupo são recalculados automaticamente ao finalizar uma disputa e ao adicionar/remover membros.
