# Meu Rim · Estudos IRC

Fábrica de **artigos e revisões** para a região IRC: ideia → dados/literatura → manuscrito → Excel/Supabase.

## Fluxo pronto

1. **Nova ideia** — título + ideia (ou texto do ChatGPT) → estrutura + rascunho do artigo
2. **Dados** — pacientes + CKD-EPI 2021 (quando for estudo com coleta)
3. **Literatura** — tabela de extração (incluir/excluir artigos)
4. **Artigo** — escreva seções; botão **Preencher Resultados com dados**; exporte `.md`
5. **Excel** — pacientes (com anonimização), modelo e literatura
6. **Integrações** — backup JSON + Supabase

## Início rápido

```bash
cd irc-estudos
npm install
npm run dev
```

## O que ainda é opcional / produção

- Conta Supabase + `.env` (veja `docs/SUPABASE.md` e migrations `001` + `002`)
- Autenticação multi-usuário e RLS restrita
- Hospedagem (Vercel) com root `irc-estudos`
- Revisão humana do texto gerado / preenchido automaticamente

## Aviso

Apoio à pesquisa. Não substitui consulta clínica nem revisão editorial.
