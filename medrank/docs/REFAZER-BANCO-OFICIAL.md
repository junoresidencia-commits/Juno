# Refazer o banco: só provas oficiais públicas

## Objetivo

Backup do banco antigo → limpar o **ativo** → deixar exclusivamente questões reais de
residência (2020–2026) com gabarito oficial e licença clara.

## O que entra agora (legal)

| Fonte | Licença | Anos | Arquivo |
|-------|---------|------|---------|
| ENARE (Zenodo + HealthQA-BR) | CC-BY-4.0 | 2020–2025 | `data/official-residency-questions.json` |
| Revalida (HealthQA-BR) | CC-BY-4.0 | 2020–2025 | idem |

USP, UNIFESP, UNICAMP, SUS-SP, SES-PE, SES-DF etc. **não** entram automaticamente:
não há dataset aberto com autorização clara. Use **Importar prova** só quando a
instituição liberar prova + gabarito para uso.

## Ops (ordem)

1. Merge deste PR + deploy
2. Supabase SQL: **031**, **032**, **033** (se ainda não rodou)
3. Admin → Questões → **Backup + apagar ativo + só oficiais**
4. Admin → Provas → **Forçar regenerar (banco)**
5. Conferir no aluno o rodapé: `Questão original — Instituição — Ano`

## SQL 033 (arquivo)

`supabase/migrations/033_questions_archive_rebuild.sql`

Cria `questions_archive` + coluna `exam_track`.

## Admin

- Backup + rebuild oficial
- Auditoria (suspender / anular / corrigir gabarito / rescore)
- Importar prova (quando houver autorização institucional)
- Fonte original visível na ficha da questão

## Validação automática

Antes de publicar: enunciado, A–E, gabarito, instituição, ano 2020–2026, fonte,
`reproduction_allowed`. Questões com figura obrigatória sem imagem são rejeitadas.

## Sem IA

Nenhuma geração OpenAI neste fluxo. Disputa = sorteio do banco oficial aprovado.
