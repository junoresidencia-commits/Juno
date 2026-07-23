# Banco oficial de residência (2020–2026)

## O que entrou neste release

Dataset **aberto CC-BY-4.0** com enunciados **originais** (sem reescrita):

| Fonte | Questões (aprox.) | Anos | Licença |
|-------|-------------------|------|---------|
| ENARE (Zenodo + HealthQA-BR) | ~2.500 | 2020–2025 | CC-BY-4.0 |
| Revalida (HealthQA-BR) | ~800 | 2020–2025 | CC-BY-4.0 |
| **Total** | **~3.345** | | |

Arquivo gerado: `data/official-residency-questions.json`  
Script: `scripts/build-official-residency-bank.py`

Cada questão traz: enunciado completo, alternativas, instituição, ano, área, gabarito oficial,
`source_url`, `question_origin=official`, `reproduction_allowed=true`.

## O que NÃO entrou (de propósito)

Provas de USP, USP-RP, UNIFESP, UNICAMP, UERJ, UFRJ, UFMG, UFPR, UFRGS, SUS-SP, SES-PE, PSU-MG, AMP
**não** têm dataset aberto reutilizável com licença clara para republicação no app.

Para essas instituições:
1. Baixe prova + gabarito **só do site oficial**
2. Confirme permissão de uso
3. Admin → **Importar prova** → marque reprodução permitida → **Revisão** → aprovar

## Como regenerar o JSON

```bash
curl -L -o data/source/enare-zenodo.json \
  'https://zenodo.org/api/records/17571003/files/dataset_enare_oficial%20(1).json/content'
curl -L -o /tmp/healthqa-br.parquet \
  https://huggingface.co/datasets/Larxel/healthqa-br/resolve/main/healthqa-br.parquet
python3 scripts/build-official-residency-bank.py /tmp/healthqa-br.parquet
```

## Como publicar no app

1. Deploy com este PR
2. Admin → Questões → **Importar banco completo (ENARE/Revalida oficiais)**
3. Admin → Provas → **Gerar do banco (grátis)** (ou Forçar regenerar banco)

A disputa geral **prioriza** `question_origin=official` e evita questões sintéticas curtas/óbvias.

## Atribuição

- Zenodo: Lima et al. — DOI [10.5281/zenodo.17571003](https://doi.org/10.5281/zenodo.17571003)
- HealthQA-BR: D'addario — [Larxel/healthqa-br](https://huggingface.co/datasets/Larxel/healthqa-br) (CC-BY-4.0)
