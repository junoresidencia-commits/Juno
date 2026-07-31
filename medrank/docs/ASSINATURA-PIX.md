# Assinatura MedRank — R$ 10/mês via PIX

## Regra

- **Pagou** → admin libera / renova → acesso por **30 dias**
- **Não pagou / venceu** → conta **bloqueada** automaticamente (login + cron diário)

## Fluxo (cadastro pelo próprio aluno)

1. Aluno em **/login** → **Criar minha conta** → `/cadastro`
2. Cria login (fica **aguardando PIX**)
3. Paga **R$ 10** no PIX (chave CPF)
4. Envia o **comprovante no WhatsApp 739-9905-2933**
5. Você recebe e-mail/aviso no app → **Alunos** → **Liberar após PIX** (+30 dias)
6. Todo mês: novo PIX → comprovante no WhatsApp → **Renovar mês (+30d)**

## Fluxo alternativo (convite)

1. Admin → **Pagamentos PIX** → gera link com o e-mail do aluno
2. Aluno abre o link → cria login → PIX → WhatsApp comprovante → liberar

## Config

- Preço: `MONTHLY_PRICE_CENTS = 1000` em `src/lib/billing/pix.ts`
- Chave PIX: `NEXT_PUBLIC_MEDRANK_PIX_KEY` (padrão `01695189574`)
- WhatsApp: `NEXT_PUBLIC_MEDRANK_WHATSAPP` (padrão `73999052933`)
- Aviso por e-mail: `RESEND_API_KEY` + `ADMIN_NOTIFY_EMAIL`
- Cron: `vercel.json` → `/api/cron/subscriptions` (diário)

## SQL (Supabase)

Rode `supabase/migrations/039_paid_subscriptions.sql`.
