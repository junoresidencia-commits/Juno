# Meu Rim · Estudos IRC

Produtor de **trabalhos científicos** na região IRC: da ideia ao artigo, com dados, Excel e Supabase.

## O que faz

1. **Ideia → estrutura** — título + ideia (ou texto do ChatGPT) gera pergunta, PICO, variáveis, métodos, seções do manuscrito, plano de revisão e prompt pronto
2. **Tipos** — epidemiologia de DRC, transversal, artigo original, revisão de literatura, série de casos
3. **Dados DRC** — nome, idade, sexo, creatinina, doença de base, estatina + **CKD-EPI 2021**
4. **Excel** — exportar, modelo e importar (recalcula TFG)
5. **Supabase** — opcional; sync em Integrações
6. **Backup JSON** — sempre disponível

## Início rápido

```bash
cd irc-estudos
npm install
npm run dev
```

## Fluxo sugerido (Tulin)

1. **Nova ideia** → cole o nome do trabalho e a ideia
2. Escolha o tipo (artigo / revisão / DRC…) → **Gerar estrutura**
3. **Criar trabalho** → aba **Artigo / revisão** (checklist) e/ou **Dados**
4. Aba **Excel** para planilha; **Integrações** para Supabase

## Supabase

Veja [`docs/SUPABASE.md`](./docs/SUPABASE.md) e `.env.example`.

## Aviso

Ferramenta de apoio à pesquisa. Não substitui consulta clínica nem revisão editorial.
