# Começar do zero — MedRank

O erro vem de **configuração antiga**: URL de túnel Cloudflare que cai, ou
`NEXT_PUBLIC_SUPABASE_URL` vazia/"seu-projeto"/placeholder na Vercel, que
fazia o middleware crashar.

## Roteiro principal (Vercel + Supabase)

→ **[`SETUP-VERCEL-SUPABASE.md`](./SETUP-VERCEL-SUPABASE.md)**

## Grupos (ligas / turmas)

→ **[`docs/PASSO-A-PASSO-GRUPOS.md`](./docs/PASSO-A-PASSO-GRUPOS.md)**  
PR: https://github.com/junoresidencia-commits/Juno/pull/18

## Só demo rápido (sem Supabase ainda)

Se quiser um link fixo hoje e plugar Supabase depois:

1. Apague o projeto velho na Vercel
2. Novo projeto → Root Directory = `medrank`
3. Env só:

| Nome | Valor |
|------|--------|
| `DEMO_MODE` | `true` |
| `SKIP_AUTH` | `false` |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-APP.vercel.app` |

4. Deploy → `/login` → **Entrar como aluno**

Depois siga `SETUP-VERCEL-SUPABASE.md` para produção real.

