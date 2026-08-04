# Assinatura MedRank — planos via PIX

## Como funciona o preço

1. **Só 1 mês** → **R$ 30**
2. **Promo mensal** → **R$ 19,90** (1 mês na promo de 3)
3. **3 meses à vista** → de **R$ 60** por **R$ 50** (**−R$ 10**)
4. **Semestral** → **R$ 100**
5. **Anual** → **R$ 180** (paga o ano inteiro)

## Valores

| Plano | Valor do PIX | Acesso | Observação |
| --- | --- | --- | --- |
| **1 mês** | R$ 30,00 | 30 dias | Avulso |
| **Promo mensal** | R$ 19,90 | 30 dias | Na promo de 3 meses |
| **3 meses (à vista)** | R$ 50,00 | 90 dias | De R$ 60 (−R$ 10) |
| **Semestral** | R$ 100,00 | 180 dias | À vista |
| **Anual** | R$ 180,00 | 365 dias | Paga o ano inteiro |

## Fluxo do aluno

1. Cria a conta em `/cadastro` (**sem PIX ainda**)
2. Tela de sucesso mostra o card PIX + planos
3. Escolhe o plano → copia chave → paga
4. WhatsApp já leva **plano + valor** na mensagem
5. Recebe e-mail (se `RESEND_API_KEY`) com instruções
6. Admin libera no plano correspondente

## Config

- Planos: `SUBSCRIPTION_PLANS` em `src/lib/billing/pix.ts`
- Chave PIX: `NEXT_PUBLIC_MEDRANK_PIX_KEY`
- WhatsApp: `NEXT_PUBLIC_MEDRANK_WHATSAPP`
- E-mail aluno/professor: `RESEND_API_KEY` + `ADMIN_NOTIFY_EMAIL`
- Cron: `vercel.json` → `/api/cron/subscriptions`
