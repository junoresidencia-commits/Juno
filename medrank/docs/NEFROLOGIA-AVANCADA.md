# Nefrologia Avançada — Clínica Médica aplicada ao rim

## Ideia
Treinar o raciocínio do nefrologista (consultório, enfermaria, UTI, diálise) com
**70% Nefrologia** + **30% Clínica Médica relacionada**, sem banco genérico de CM.

## Banco
- Arquivo: `data/nefrologia-avancada-questions.json`
- Amostra rica: `data/nefrologia-avancada-rich-sample.json`
- Gerar: `node scripts/build-nefrologia-avancada-bank.cjs [count]`
  - Default/ship: **5.000**
  - Meta produto: **20.000** (`node ... 20000`)
- Formato: A–E, pearls, tempo esperado, referências
- Tags: `nefrologia-avancada`, `estilo-SBN`, `titulo-nefrologia`

## App
- Hub: `/aluno/treino`
- Track: `/aluno/treino/nefrologia`
- Simulados: **20 / 30 / 60 / 100**
- Ligas: Liga dos Nefrologistas · Plantão · R+ · Prova de Título · Hospital
- SRS + confiança + ranking (mesmo motor do treino pediátrico)

## Produção — o que falta para liberar
O código do treino já está no app. Em produção, confirme:

1. Rodar no Supabase o SQL da migration `020_practice_sessions.sql` (tabelas `practice_sessions` + `practice_progress`, coluna `liga`).
2. Admin → Questões → **Importar banco completo** (carrega `nefrologia-avancada-questions.json` e o banco pediátrico).
3. Deploy do `main` no Vercel (Root Directory = `medrank`).

Sem o passo 1 ou 2, o treino pode falhar com “banco insuficiente” ou erro ao criar sessão.
