# Treino — Nefrologia Pediátrica (banco vivo)

## Formato do objeto
Cada questão carrega tema, subtema, tipo, idade, sexo, enunciado, A–D, gabarito, explicação e referências (ids `NP-######` nas tags).

Amostra legível: `data/nefropediatria-rich-sample.json`  
Banco completo (seed): `data/nefropediatria-questions.json` (~5.000)

## Gerar / expandir
```bash
node scripts/build-nefropediatria-bank.cjs 5000
node scripts/build-nefropediatria-bank.cjs 10000
```

## App
`/aluno/treino/nefropediatria`
- Prova 20 / 30 / 60 (simula teórica SBN)
- Por tema
- SRS **1 · 7 · 15 · 30 · 90** dias
- Confiança 1–5 por questão
- Stats + ranking do treino (não mistura com disputa diária)

## Produção
1. Migration `020_practice_sessions.sql`
2. Admin → Importar banco completo

## Princípio
Questões **inéditas** MedRank no estilo do programa/bibliografia SBN/SBP — sem republicar cadernos oficiais.
