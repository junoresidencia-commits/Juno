# Política de conteúdo do banco de questões

## O que pode entrar
- Datasets **abertos / licenciados** (ex.: ENARE Zenodo, HealthQA-BR / Revalida).
- Questões **originais MedRank**, com gabarito comentado, tags de “estilo de cobrança”
  (USP, UNICAMP, SUS-SP etc.) — **não são cópias** de provas oficiais.
- **Metadados** de fontes oficiais (ENARE/Ebserh, hospitais universitários, organizadoras):
  URL do portal, editais públicos e links de PDF ≥ 2024 quando listados em páginas `.gov.br`
  — apenas o link/título/ano, **nunca** o texto do PDF protegido.

## O que não fazemos
- Não raspamos nem republicamos PDFs oficiais protegidos (USP, UNIFESP, etc.) sem autorização.
- Não fingimos que uma questão original é “da prova USP 2024”.
- Não armazenamos enunciados ou gabaritos copiados de materiais com direitos autorais.

## Pipeline de atualização contínua
Catálogo: `data/official-sources.json`.

1. **Discovery** (`src/lib/question-bank/source-discovery.ts`) — verifica portais e datasets;
   indexa links públicos relevantes (≥ 2024) sem baixar conteúdo protegido.
2. **Incidência** (`src/lib/question-bank/incidence.ts`) — estatísticas por especialidade, tema,
   fonte e tags `estilo-*` (cobrança / tendência).
3. **Geração** (`src/lib/question-bank/original-generator.ts`) — cria casos clínicos, labs e
   alternativas **novos**, alinhados aos temas quentes, com comentário e referências.
4. **Admin API** `POST /api/admin/questions/refresh-bank` — orquestra 1–3 + upsert no Supabase.
5. **Seed** `POST /api/admin/questions/seed-bank` — reimporta JSON empacotados (sem discovery).

## Como o aluno vê
- A disputa evita branding de banca no enunciado/comentário quando aplicável.
- Filtros por `source`, `specialty`, `topic`, `difficulty` e tags `estilo-*`.

## Como atualizar (professor/admin)
1. Admin → **Questões** → **Importar banco completo** (datasets + originais estáticos).
2. Admin → **Questões** → **Atualizar banco (busca fontes + gera originais)** para:
   - rechecar portais oficiais;
   - recalcular incidência;
   - inserir novas questões inéditas MedRank.
3. Novas fontes licenciadas → incluir em `data/official-sources.json` / JSON de import e redeploy.
