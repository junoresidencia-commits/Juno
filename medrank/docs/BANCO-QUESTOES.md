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
1. Novas provas oficiais **públicas/licenciadas** → Admin → **Importar prova** → **Revisão** (migration 031).
2. Ver fluxo completo em `docs/BANCO-PROVAS-PUBLICAS.md` (IA paga desligada por padrão).
3. Originais MedRank → `data/original-style-questions.json` + seed-bank.
4. Nefropediatria → `data/nefropediatria-questions.json` (~5.000) — ver `docs/NEFROPEDIATRIA.md`.
5. Nefrologia Avançada (CM aplicada ao rim) → `data/nefrologia-avancada-questions.json` (~5.000, meta 20.000) — ver `docs/NEFROLOGIA-AVANCADA.md`.
6. Admin → **Questões** → **Importar banco completo**.
7. Disputa do dia: Admin → **Provas** → **Gerar do banco (grátis)** (não usa OpenAI).
8. Treino: `/aluno/treino` (hub).
9. Produção: migration `020_practice_sessions.sql` + `031_question_bank_provenance.sql`.
