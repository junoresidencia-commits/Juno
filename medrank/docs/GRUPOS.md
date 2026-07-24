# Grupos MedRank

## Organização definitiva
Ver **[ORGANIZACAO-ALUNOS-GRUPOS-PROVAS.md](./ORGANIZACAO-ALUNOS-GRUPOS-PROVAS.md)** — Residência Geral padrão, Nefrologia exclusiva, solicitação de entrada e disputa entre grupos.

## Ativar em produção
1. Deploy desta branch
2. Rodar no Supabase SQL: `supabase/migrations/037_organizacao_grupos_coletivo.sql`
3. Admin → Alunos: Residência Geral já vem ligada; Nefrologia só sob autorização
4. Admin → Grupos: aceitar solicitações ou adicionar direto

## O que é
- **Grupos sociais/equipes** (faculdade, turma, liga, hospital, amigos): ranking interno + disputa coletiva semanal/mensal
- **Permissão de Nefrologia**: módulo exclusivo — não é liberada por entrar em grupo social

## Tabelas
- `study_groups` / `study_group_members` / `study_group_rankings`
- `study_group_join_requests` (solicitação → aprovação)
- `study_group_collective_rankings` / `study_group_collective_winners`

## Fluxo do aluno
1. Já tem Residência Geral ao ser cadastrado
2. Grupos → Solicitar entrada → admin aceita
3. Ranking do grupo + Ranking entre grupos
4. Nefrologia só se o admin ligar o módulo
