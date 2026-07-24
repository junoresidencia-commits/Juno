# Importar lote de questões autorais (JSON/CSV)

## Fluxo

1. Gerar 50 questões (Cursor/ChatGPT externo) → arquivo JSON no schema MedRank  
2. Admin → **Importar lote de questões**  
3. Validar e prévia → Confirmar importação (**rascunho**)  
4. Revisar lote (aprovar/recusar individual ou publicar lote)  
5. Disputa usa só `bank_status=approved`

**Sem API paga** no app.

## Lotes no repositório (`data/batches/`)

| Arquivo | Qs | Notas |
|---------|----|-------|
| `MEDRANK_AUTORAL_2026_LOTE_01` … `_11` | 50×11 | Multiespecialidades |
| `MEDRANK_NEFRO_NEFROPED_2026_LOTE_12` … `_19` | 50×8 | Nefro / nefropediatria |
| `MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_20` … `_27` | 50×8 | Diretrizes atuais |

**Banco ativo = lotes MedRank 01–27 + oficiais ENARE/Revalida/USP com year ≥ 2024.**  
Oficiais &lt;2024 e sintéticas sem lote saem. Limpar: botão **Limpar antigas** ou SQL `docs/BANCO-SO-LOTES-MEDRANK.sql`.

Nota: o pacote CC-BY atual traz ENARE/Revalida; USP só entra via **Importar prova** com autorização.

Importar um a um ou **Confirmar e publicar TODOS** / **Publicar TODOS agora**.

## Tipos (`tipo_da_questao`)

| Valor | Uso |
|-------|-----|
| `official_residency` | **Não use neste fluxo** (vá em Importar prova / rebuild oficial) |
| `authorial_guideline` | Autoral baseada em diretriz (KDIGO, ADA, GINA, AHA…) |
| `authorial_prediction` | Autoral de alta probabilidade para residência |
| `in_review` | Ainda em revisão editorial |

Aluno **nunca** vê autoral como “USP/ENARE”. Rodapé:

> Questão autoral de treinamento, elaborada com base em diretrizes atuais. Referência: {instituição} ({ano}).

## Template

`/templates/lote-autorais-50.json` (exemplos + meta da distribuição 20/10/10/5/5).

## SQL

Migration `034_authorial_batch_import.sql`.

## Diretrizes

- KDIGO 2025 IgA — ok como referência definitiva daquele documento  
- ADA 2026, GINA 2026, AHA 2025 — citar ano corretamente  
- KDIGO 2026 diabetes+DRC em consulta pública → marcar como **rascunho** na `referencia_principal`
