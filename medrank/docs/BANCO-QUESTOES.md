# Política de conteúdo do banco de questões

## O que pode entrar
- Datasets **abertos / licenciados** (ex.: ENARE Zenodo, HealthQA-BR / Revalida).
- Questões **originais MedRank**, com gabarito comentado, tags de “estilo de cobrança”
  (USP, UNICAMP, SUS-SP etc.) — **não são cópias** de provas oficiais.

## O que não fazemos
- Não raspamos nem republicamos PDFs oficiais protegidos (USP, UNIFESP, etc.) sem autorização.
- Não fingimos que uma questão original é “da prova USP 2024”.

## Como o aluno vê
- A disputa evita branding de banca no enunciado/comentário quando aplicável.
- Filtros por `source`, `specialty`, `topic`, `difficulty` e tags `estilo-*`.

## Como atualizar
1. Novas provas oficiais **públicas/licenciadas** → script de import / Admin → Importar.
2. Originais MedRank (estilo USP/UNICAMP/…) → `data/original-style-questions.json` (≥45 por estilo).
3. Admin → **Questões** → **Importar banco completo**.
4. Ampliar estilos localmente: `node scripts/expand-style-bank.cjs`
