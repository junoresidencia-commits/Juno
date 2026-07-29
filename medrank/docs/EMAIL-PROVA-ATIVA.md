# E-mail: prova ativa + empurrões do dia

## 1) Quando a prova é gerada
Cron `/api/cron/daily-exam` ou Admin → Provas → Gerar.

Alunos ativos recebem e-mail + aviso no sino: **prova já está ativa — faz hoje**.

## 2) Lembretes ao longo do dia (quem ainda não fez)
Cron `/api/cron/exam-nudge` nos horários (Brasília):

| BRT | UTC (cron) | Tom |
|-----|------------|-----|
| 9h  | 12:00 | Prova no ar — bora |
| 13h | 16:00 | Ainda dá tempo |
| 17h | 20:00 | Tarde passando + toque de placar |
| 19h | 22:00 | Última chamada (fecha 21h) + placar |

Só para quem:
- está **ativo** e tem **e-mail**
- ainda **não finalizou** a disputa do dia (geral / nefro liberada)

Quem já fez não recebe.

### Toque de ranking (sem humilhar)
À tarde/noite (e às vezes de manhã se o placar já andou):

- “Faltam X pts para o 1º da semana…”
- “O 1º já soma Y pts — a de hoje ainda conta”
- Se for o 1º: “liderança sob pressão — mantém o ritmo”

## Configurar (Vercel)

```
RESEND_API_KEY=re_...
EMAIL_FROM=MedRank <prova@seudominio.com>
NEXT_PUBLIC_SITE_URL=https://seu-app.vercel.app
CRON_SECRET=...   # mesmo dos outros crons
```

Sem `RESEND_API_KEY`, o e-mail é pulado e a notificação no app continua.

Teste manual (com secret):

```
GET /api/cron/exam-nudge?phase=evening
Authorization: Bearer $CRON_SECRET
```
