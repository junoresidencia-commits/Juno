# Começar do zero — MedRank

O erro vem de **configuração antiga**: URL de túnel Cloudflare que cai, ou
`NEXT_PUBLIC_SUPABASE_URL` vazia/"seu-projeto"/placeholder na Vercel, que
fazia o middleware crashar.

Este guia deixa tudo limpo. Você pode **apagar o projeto antigo** na Vercel
e criar um novo.

---

## 1. Apagar o antigo (recomendado)

### Vercel
1. Abra o projeto velho → **Settings → Delete Project**
2. (Opcional) apague também domínios/preview antigos

### Supabase (se o projeto estiver quebrado)
1. Dashboard → projeto antigo → **Settings → General → Delete project**
2. Ou só ignore o antigo e crie um **novo** depois

### No celular / PC
- Apague atalhos com links `*.trycloudflare.com` (eles **sempre** expiram)

---

## 2. Deploy NOVO na Vercel (hoje — para já funcionar)

1. [vercel.com/new](https://vercel.com/new)
2. Importar **junoresidencia-commits/Juno**
3. **Root Directory = `medrank`** ← obrigatório
4. Environment Variables (Production + Preview) — **só estas**:

| Nome | Valor |
|------|--------|
| `DEMO_MODE` | `true` |
| `SKIP_AUTH` | `false` |
| `NEXT_PUBLIC_APP_NAME` | `MedRank` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-APP.vercel.app` |

**Não adicione** `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` ainda.  
Sem elas, o app roda em **demo** e **não crasha**.

5. Deploy → abra `/login`
6. Atualize `NEXT_PUBLIC_SITE_URL` com a URL real → Redeploy

### Login demo
- Botão **Entrar como aluno**
- ou `aluno` / `aluno` · professor: `professor` / `professor`

Disputa: **7h–23h59** (Brasília) · 20 questões · ranking · gabarito

---

## 3. Depois (opcional): Supabase novo

1. Crie projeto **novo** no Supabase
2. Rode as migrations `medrank/supabase/migrations/` (001→014)
3. Na Vercel, adicione chaves **reais** e:
   - `DEMO_MODE=false`
4. Auth → URL Configuration = domínio Vercel
5. Detalhes: `DEPLOY.md`

---

## 4. Checklist "está certo?"

- [ ] Root Directory = `medrank`
- [ ] `DEMO_MODE=true` no 1º deploy
- [ ] Sem URL `trycloudflare` nas env vars
- [ ] Sem `seu-projeto.supabase.co` / `placeholder`
- [ ] Login abre com estilo (CSS)
- [ ] **Começar a disputa!** funciona

Código já inclui proteção: env vazia/placeholder → **não** cria client Supabase.
