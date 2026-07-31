# Especificação — Meu Rim · Estudos IRC

## Visão (Tulin)

Plataforma que **produz trabalhos científicos** na região IRC: artigos, revisões de literatura, estudos transversais e epidemiologia de DRC. A pessoa entra com uma **ideia / nome do trabalho** (ou texto gerado no ChatGPT) e o sistema monta o que falta para o trabalho ficar bom.

## Fluxo

1. Ideia + tipo de produto → **blueprint** (pergunta, PICO, objetivos, variáveis, métodos, seções, literatura, prompt ChatGPT)
2. Coleta de dados (quando aplicável) + CKD-EPI
3. Excel import/export
4. Checklist do manuscrito
5. Backup JSON e sync Supabase (opcional)

## Tipos de trabalho (`WorkKind`)

| Tipo | Coleta |
|------|--------|
| `ckd_epidemiology` | Ficha DRC + CKD-EPI |
| `cross_sectional` | Ficha geral |
| `original_article` | Ficha geral |
| `literature_review` | Sem pacientes |
| `case_series` | Ficha geral |

## Integrações

- **Excel** (`xlsx`): pacientes (com opção anônima), modelo, importação com recálculo de TFG, extração de literatura
- **Manuscrito**: seções editáveis, resumo PT/EN, preenchimento automático de Resultados, export `.md`
- **Literatura**: tabela de artigos incluídos/excluídos alimenta a síntese
- **Supabase**: `irc_studies`, `irc_patients`, `irc_literature` — migrations `001` e `002`
- **ChatGPT**: prompt copiável no blueprint

## Persistência

Local-first (`localStorage`, versão **3**). Migração automática a partir de v1/v2.
