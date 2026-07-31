# Assinatura MedRank — planos via PIX

## Valores (promo)

| Plano | Valor | Acesso |
| --- | --- | --- |
| **1 mês** | R$ 19,90 | 30 dias |
| **3 meses (à vista)** | R$ 50,00 | 90 dias |
| **Semestral** | R$ 90,00 | 180 dias |
| **Anual** | R$ 160,00 | 365 dias |

Destaque comercial: **R$ 19,90/mês por 3 meses** — ou **R$ 50** pagando de uma vez.

## Regra

- **Pagou** → admin libera / renova no plano correspondente
- **Não pagou / venceu** → conta **bloqueada** automaticamente (login + cron diário)

## Fluxo (cadastro pelo próprio aluno)

1. Aluno em **/login** → **Criar minha conta** → `/cadastro`
2. Cria login (fica **aguardando PIX**)
3. Escolhe o plano no card PIX e paga (chave CPF)
4. Envia o **comprovante no WhatsApp 739-9905-2933**
5. Você recebe e-mail/aviso no app → **Alunos** → escolhe o plano → **Liberar após PIX**
6. Renovação: novo PIX → comprovante → **Renovar** no plano pago

## Config

- Planos: `SUBSCRIPTION_PLANS` em `src/lib/billing/pix.ts`
- Chave PIX: `NEXT_PUBLIC_MEDRANK_PIX_KEY` (padrão `01695189574`)
- WhatsApp: `NEXT_PUBLIC_MEDRANK_WHATSAPP` (padrão `73999052933`)
- Aviso por e-mail: `RESEND_API_KEY` + `ADMIN_NOTIFY_EMAIL`
- Cron: `vercel.json` → `/api/cron/subscriptions` (diário)

## SQL (Supabase)

Rode `supabase/migrations/039_paid_subscriptions.sql`.
