# Treino — Nefrologia Pediátrica (Certificado SBN/SBP)

## O que é
Banco **original MedRank** para preparação do Certificado de Área de Atuação em Nefrologia Pediátrica.
Não copia provas oficiais. Estilo alinhado ao programa/bibliografia do edital (casos clínicos, condutas, A–D).

## Banco
- Arquivo: `data/nefropediatria-questions.json`
- Gerar/expandir: `node scripts/build-nefropediatria-bank.cjs [count]` (default 3000)
- Tags: `nefropediatria`, `estilo-SBN`, `estilo-SBNPed`, `titulo-nefropediatria`
- Importar: Admin → Questões → **Importar banco completo**

## App do aluno
Rota: `/aluno/treino/nefropediatria`

- Modos: 20 / 30 / **60 (simula prova teórica)**
- Por tema (programa)
- Revisão espaçada (1 · 7 · 30 · 90 dias)
- Stats: acerto, piores temas, tempo médio, heurística de chance

## Produção
1. Merge + deploy
2. Rodar SQL: `supabase/migrations/020_practice_sessions.sql`
3. Admin → Importar banco completo

## Expansão futura (“banco vivo”)
Reexecutar o gerador com mais templates / count maior (meta 10.000+) e reimportar.
Atualizações de guideline (KDIGO/IPNA) → novos templates no script → novo lote.
