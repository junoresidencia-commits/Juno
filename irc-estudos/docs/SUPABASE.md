# Supabase — Meu Rim Estudos IRC

O app funciona **sem** Supabase (só navegador). Quando você quiser nuvem:

## 1. Criar projeto
1. https://supabase.com/dashboard → New project
2. Região: South America (São Paulo) se disponível

## 2. Rodar o SQL
SQL Editor → cole e execute:
`supabase/migrations/001_irc_estudos.sql`

## 3. Chaves no app
Em Project Settings → API, copie URL e `anon` key.

Crie `irc-estudos/.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Reinicie `npm run dev`.

## 4. Sincronizar
Abra **Integrações** no app:
- **Enviar para a nuvem** — sobe estudos e pacientes (upsert)
- **Puxar da nuvem** — substitui o local pelo remoto

> As políticas RLS do SQL inicial são abertas (protótipo). Em produção, restrinja com autenticação.
