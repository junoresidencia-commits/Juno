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

## Produção
1. Migration `020_practice_sessions.sql` (inclui `liga`)
2. Admin → Importar banco completo
