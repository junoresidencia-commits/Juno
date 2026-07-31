# Assinatura MedRank — planos via PIX

## Como funciona o preço

1. **Só 1 mês** → **R$ 30**
2. **Promo 3 meses** → **R$ 19,90/mês** (pode pagar mês a mês nessa promo)
3. **3 meses à vista** → de **R$ 59,70** por **R$ 49,70** (**−R$ 10**)
4. **Semestral / anual** → paga o período de uma vez (anual **R$ 180**)

## Valores

| Plano | Valor do PIX | Acesso | Observação |
| --- | --- | --- | --- |
| **1 mês** | R$ 30,00 | 30 dias | Avulso |
| **3 meses (à vista)** | R$ 49,70 | 90 dias | De R$ 59,70 (−R$ 10) |
| **Semestral** | R$ 99,40 | 180 dias | À vista |
| **Anual** | R$ 180,00 | 365 dias | Paga o ano inteiro |

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
