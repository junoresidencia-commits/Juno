# Auditoria e limpeza do banco

## Objetivo

Parar de alimentar disputas com questões sintéticas curtas/óbvias. Prioridade: provas
oficiais reais. Qualidade > quantidade.

## Migration 032

Arquivo: `supabase/migrations/032_question_quality_audit.sql`

- Coluna `quality_label` (aprovada, precisa_de_correcao, muito_facil, …, anulada)
- Tabela `question_bank_audit_log` (motivo de cada alteração)
- UPDATE inicial: suspende sintéticas `banco-expert` / MedRank Expert

## Painel

Admin → Questões → **Auditoria**

- Simular / classificar em lote
- Aprovar · Suspender · Excluir
- Abrir questão → editar · corrigir gabarito · anular oficial · rescore em provas

## Fluxo recomendado

1. Rodar SQL 032
2. Importar banco completo (ENARE/Revalida oficiais)
3. Classificar e suspender ruins
4. Revisar fila na auditoria
5. Gerar disputa do banco (grátis)
