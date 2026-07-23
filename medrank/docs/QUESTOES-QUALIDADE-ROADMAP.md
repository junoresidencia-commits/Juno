# MedRank — Roadmap de qualidade de questões

Especificação completa do produto (USP/ENARE/título, importação de provas reais, admin avançado).

## Fase 1 — AGORA (este PR)

- [x] Corrigir 4/20: import não descarta Residência por stem curto; busca por tag + paginação
- [x] Remover “Esta abordagem atrasa…” e distratores absurdos no polish
- [x] Gate local `QuestionQualityReview` + limiar IA ≥85
- [x] Prompts de revisão exigindo raciocínio clínico e distratores plausíveis
- [x] Distribuição de dificuldade ~10/40/35/15
- [x] Publicar só com 20 questões; fallback controlado do banco; progresso no erro
- [x] Forçar regenerar (PR #39)

**Ops após merge:** Importar banco completo → Forçar regenerar.

## Fase 2 — Banco oficial + inéditas

- Metadados: `type` official | original_based_on_exam | original
- Status: draft → pending_review → approved → rejected/disabled/annulled
- Importação admin: PDF/texto/planilha/JSON → sempre `pending_review`
- Proporção configurável: 40% reais / 40% inéditas padrão prova / 20% avançadas
- Nunca apresentar inédita como oficial

## Fase 3 — Admin completo

- CRUD + histórico + quem editou
- Anulação com rescore/ranking (já há remediação parcial)
- Troca de gabarito com recalculo
- Duplicatas e anti-repetição por aluno/grupo
- Progresso ao vivo na geração (12/20, reprovadas, etc.)
- Temas configuráveis da Liga de Nefrologia

## Princípio

A IA gera → revisa → reprova → substitui. **Não publicar** lote incompleto ou óbvio pelo formato.
