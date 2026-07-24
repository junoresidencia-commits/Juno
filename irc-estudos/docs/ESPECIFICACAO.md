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

- **Excel** (`xlsx`): exportar pacientes, modelo, importar com recálculo de TFG
- **Supabase**: tabelas `irc_studies` e `irc_patients` — ver `docs/SUPABASE.md`
- **ChatGPT**: prompt copiável gerado no blueprint (sem API key no app)

## Persistência

Local-first (`localStorage`, versão 2 do schema). Migração automática a partir da v1.
