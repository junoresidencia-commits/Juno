# Assinatura MedRank — R$ 10/mês via PIX

## Regra

- **Pagou** → admin libera / renova → acesso por **30 dias**
- **Não pagou / venceu** → conta **bloqueada** automaticamente (login + cron diário)

## Fluxo

1. Admin → **Pagamentos PIX** → gera link com o e-mail do aluno.
2. Aluno abre o link → cria login → vê PIX (chave CPF).
3. Aluno paga **R$ 10** (descrição: nome + e-mail).
4. Admin confere extrato → **Alunos** → **Liberar após PIX** (30 dias).
5. Todo mês: novo PIX → **Renovar mês (+30d)**.
6. Se não renovar até a data: cron `/api/cron/subscriptions` e o login bloqueiam a conta.

## SQL (Supabase)

Rode `supabase/migrations/039_paid_subscriptions.sql`.

## Config

- Preço: `MONTHLY_PRICE_CENTS = 1000` em `src/lib/billing/pix.ts`
- Chave PIX: `NEXT_PUBLIC_MEDRANK_PIX_KEY` (padrão `01695189574`)
- Cron: `vercel.json` → `/api/cron/subscriptions` (diário)

## Depois (opcional)

Integrar Mercado Pago / Asaas com webhook para liberar/renovar sozinho após o PIX.
