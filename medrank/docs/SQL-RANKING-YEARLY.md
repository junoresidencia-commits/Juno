# Ranking competitivo — SQL

Cole no **SQL Editor** do Supabase o arquivo:

**`docs/SQL-RANKING-COMPETITIVO.sql`**

## O que libera

| Período | Pessoa no grupo | Entre ligas |
| --- | --- | --- |
| Semanal | sim | sim |
| Mensal | sim | sim |
| Trimestral (3 meses) | sim | sim |
| Anual | sim | sim |
| Diário / geral | sim | — |

- Mensal zera todo dia 1  
- Trimestral = jan–mar / abr–jun / jul–set / out–dez  
- Entre ligas: mínimo 3 ativos (já existia)  
- Medalhas gold/silver/bronze no mensal (hall da fama)

No final o script já roda o recálculo de hoje.
