# MedRank — pronto para jogar

## Opção rápida (demo, sem Supabase)

No [vercel.com/new](https://vercel.com/new):

1. Importar repo **junoresidencia-commits/Juno**
2. **Root Directory:** `medrank`
3. Environment Variables (Production + Preview):

| Nome | Valor |
|------|--------|
| `DEMO_MODE` | `true` |
| `SKIP_AUTH` | `false` |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-APP.vercel.app` (ajuste após o 1º deploy) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://placeholder.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `placeholder` |

4. Deploy → abra `/login`
5. **Entrar como aluno** (ou `aluno` / `aluno`)
6. **Começar a disputa!** — 20 questões, ranking, gabarito

Horário da disputa: **7h–23h59** (Brasília), uma por dia.

---

## Produção com Supabase (depois)

1. Criar projeto no Supabase
2. Rodar migrations em `supabase/migrations/` (001→014)
3. Na Vercel trocar:
   - `DEMO_MODE=false`
   - `NEXT_PUBLIC_SUPABASE_URL` = URL real
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon real
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role
4. Auth URLs no Supabase = domínio Vercel
5. Detalhes: `DEPLOY.md`

---

## Logs de erro que este setup evita

- `@supabase/ssr: Your project's URL and API key are required` → env vazio/placeholder não cria client
- Crash do middleware sem Supabase → cai em modo demo automaticamente
