# Ranking competitivo (mensal + anual)

Rode no SQL Editor do Supabase o arquivo:

`supabase/migrations/047_ranking_yearly_competitive.sql`

## O que passa a valer

1. **Mensal** — disputa principal; zera todo dia 1
2. **Anual** — acumula o ano civil (quem fez mais no ano)
3. **Hall da fama** — top 3 dos meses anteriores
4. **Hero** — sua posição + dias restantes no mês
5. **Participação** — quantas disputas você fez no mês

Medalhas gold/silver/bronze também no ranking **mensal**.
