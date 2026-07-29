# E-mail: prova do dia ativa

Quando a disputa diária é **gerada e publicada** (cron ou Admin → Provas → Gerar), o MedRank avisa os alunos ativos:

1. **E-mail** (Resend) — “sua prova já está ativa”
2. **Notificação no app** (sino) — mesmo aviso

Não reenvia se a prova do dia **já existia** (só na criação/regeneração).

## Configurar na Vercel

1. Conta em [resend.com](https://resend.com)
2. **API Key** → variável `RESEND_API_KEY`
3. Domínio verificado → `EMAIL_FROM=MedRank <prova@seudominio.com>`
4. Sem domínio (teste): `EMAIL_FROM=MedRank <onboarding@resend.dev>` (só envia para o e-mail da conta Resend)
5. `NEXT_PUBLIC_SITE_URL=https://seu-app.vercel.app` (link “Abrir a prova”)

Sem `RESEND_API_KEY`, a notificação **no app** continua; o e-mail é pulado.

## Quem recebe

- Alunos com `active = true`
- Prova geral → todos os ativos
- Prova de Nefrologia → só quem tem o módulo Nefrologia ligado
