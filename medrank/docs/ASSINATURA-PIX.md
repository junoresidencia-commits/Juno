# Assinatura MedRank — R$ 10/mês via PIX

## Fluxo (MVP sem gateway)

1. Admin → **Pagamentos PIX** → gera link com o e-mail do aluno.
2. Aluno abre o link → cria login (e-mail/senha) → vê PIX (chave CPF).
3. Aluno paga **R$ 10** e coloca nome/e-mail na descrição do PIX.
4. Admin confere o extrato → **Alunos** → **Liberar após PIX** (libera 30 dias).
5. Todo mês: confirmar PIX → **Renovar mês (+30d)**.

Conta fica `active: false` até a liberação. Login mostra “Aguardando liberação…”.

## SQL (Supabase)

Rode `supabase/migrations/039_paid_subscriptions.sql`.

## Config

- Preço: `MONTHLY_PRICE_CENTS = 1000` em `src/lib/billing/pix.ts`
- Chave PIX: `NEXT_PUBLIC_MEDRANK_PIX_KEY` (padrão `01695189574`)

## Depois (opcional)

Integrar Mercado Pago / Asaas com webhook para liberar sozinho após o PIX.
