# Banco permanente a partir de provas públicas

## Objetivo

Abastecer o MedRank com questões reais e permanentes (2020 → prova mais recente disponível),
**sem chamar OpenAI todo dia**. A IA só entra em casos excepcionais, com toggle desligado por
padrão e confirmação de custo.

## Prioridade de uso na disputa

1. Questões **oficiais** de provas públicas (com gabarito), `question_origin=official`, `bank_status=approved`
2. Questões já existentes / seed MedRank (`original`)
3. Questões revisadas por administradores
4. Questões baseadas em diretrizes (`guideline`)
5. OpenAI — **somente** se o toggle “IA paga” estiver ativo e o banco for insuficiente

## Fluxo administrativo (fase 1 — estrutura)

1. Aplicar migration `031_question_bank_provenance.sql` no Supabase
2. Admin → **Importar prova** (`/admin/importar/prova`): texto ou JSON
3. Confirmar fonte pública + `reproduction_allowed` quando for prova oficial
4. Questões entram como `pending_review`
5. Admin → **Revisão** (`/admin/questoes/revisao`): aprovar / reprovar
6. Admin → **Provas** → **Gerar do banco (grátis)**

Nenhuma importação publica sozinha.

## O que pode entrar

Somente conteúdo:

- publicado em páginas **oficiais**;
- gratuito ao público;
- com gabarito oficial quando possível;
- permitido para consulta/download/uso;
- sem violar direitos autorais, termos de uso ou restrições da instituição.

**Não** usar: provas vazadas, materiais pagos de cursinhos, scrapes ilegais.

## Instituições prioritárias (pesquisa manual)

Quando a instituição disponibilizar prova + gabarito em site oficial:

- USP, USP-RP, ENARE, ENARI, UNIFESP, UNICAMP, UERJ, UFRJ, UFMG, UFPR, UFRGS
- demais federais / instituições com material oficial liberado
- provas de título legalmente disponíveis

Cada questão importada deve registrar: ano, instituição, área, enunciado, alternativas,
gabarito, `source_url`, dificuldade, tema/subtema.

## Sociedade Brasileira de Nefrologia (SBN)

1. Verificar se há provas/simulados/documentos educacionais **públicos** no site da SBN
2. Se houver e a reprodução for permitida → importar com origem `official`
3. Se não houver → usar banco Nefrologia já existente + originais MedRank + diretrizes
4. IA só como último recurso (toggle off por padrão)

## Deduplicação

- Fingerprint MD5 do enunciado normalizado (`statement_fingerprint`)
- Se já existir: não duplica; acrescenta o nome da prova em `appears_in_exams`
- Conferir gabarito / anulações na tela de revisão

## IA paga

Configuração em `app_settings` chave `ai_paid` (padrão `enabled: false`):

- Admin → Provas → card “Inteligência artificial paga”
- Ativar exige confirmação com estimativa de custo
- `POST /api/admin/exams/ensure-daily` com `mode=ai` retorna 403 se desativada

Uso excepcional permitido (quando toggle on): revisar questão sinalizada, gerar explicação
faltante, classificar temas, corrigir formatação, criar questões só se o banco for insuficiente.

## Fase 2 — banco oficial (parcialmente concluída)

- [x] ENARE + Revalida via Zenodo + HealthQA-BR (CC-BY) → `data/official-residency-questions.json`
- [x] Seed marca `question_origin=official` e disputa prioriza oficiais
- [ ] Importação manual de USP/UNIFESP/etc. quando houver liberação oficial
- Ver `docs/BANCO-OFICIAL-RESIDENCIA.md`

Não automatizar download de PDFs protegidos.

## Referências internas

- `docs/BANCO-QUESTOES.md` — política geral
- `docs/QUESTOES-QUALIDADE-ROADMAP.md` — qualidade
- Migration `031_question_bank_provenance.sql`
