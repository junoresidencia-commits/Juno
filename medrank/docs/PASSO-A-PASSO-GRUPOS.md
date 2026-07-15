# Grupos MedRank — passo a passo (no computador)

O código já está no PR: https://github.com/junoresidencia-commits/Juno/pull/18

Siga nesta ordem (~10 minutos).

---

## 1) Merge do PR

1. Abra: https://github.com/junoresidencia-commits/Juno/pull/18
2. Clique em **Ready for review** (se ainda estiver Draft)
3. Clique em **Merge pull request** → **Confirm merge**

Espere a Vercel terminar o deploy do `medrank-app` (1–3 min).

Site: https://medrank-app.vercel.app

---

## 2) SQL no Supabase

1. Abra o projeto **medrank** no Supabase
2. Menu **SQL** → **New query**
3. Cole **todo** o conteúdo deste arquivo do repositório:

`medrank/supabase/migrations/019_study_groups.sql`

(Ou abra no GitHub após o merge:  
https://github.com/junoresidencia-commits/Juno/blob/main/medrank/supabase/migrations/019_study_groups.sql  
→ Raw → copiar tudo)

4. Clique em **Run**
5. Confirme que rodou sem erro (verde / Success)

Isso cria as tabelas de grupos, membros, rankings e permite desafios por grupo.

---

## 3) Criar o primeiro grupo

1. Entre em https://medrank-app.vercel.app/login  
   (admin: `junoresidencia@gmail.com` + senha do Auth)
2. Vá em **Grupos** (menu do professor)
3. Preencha o nome, ex.: `Liga Acadêmica de Nefrologia`
4. Clique em **Criar grupo**
5. Abra o grupo → **Adicionar** alunos da lista
6. (Opcional) Crie um **desafio exclusivo** do grupo na mesma página

---

## 4) Ver do lado do aluno

1. Peça para o aluno entrar na conta
2. Menu **Grupos** → abrir o grupo
3. Ranking **Diário / Semanal / Mensal** entre os membros
4. Desafios do grupo aparecem ali

---

## Se algo falhar

| Sintoma | O que fazer |
|---------|-------------|
| Menu Grupos não aparece | Merge ainda não entrou ou redeploy não terminou → atualize a página / espere a Vercel |
| Erro ao criar grupo / “relation study_groups does not exist” | SQL do passo 2 não rodou → rode `019_study_groups.sql` |
| Aluno não aparece na lista | Cadastre/ative em Admin → Alunos primeiro |
| Ranking zerado | Normal até alguém do grupo terminar a disputa do dia |

---

## Lembrete

- Um aluno pode estar em **vários** grupos
- Cada grupo tem **seu** ranking e **seus** desafios
- O ranking geral da disputa diária continua existindo separado
