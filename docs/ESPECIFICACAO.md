# Especificação Técnica — Plataforma de Competição de Questões Médicas

**Nome provisório:** MedRank (ou NefroRank / Café com Questões / Arena Residência / Desafio ENARE / Ranking Médico)

**Tipo:** Web app responsivo (não app de loja) — funciona no celular e no computador.

**Público:** Grupo fechado de até 10 alunos + 1 professor administrador.

**Objetivo:** Aplicativo fechado com provas diárias cronometradas, banco de questões médicas, ranking competitivo e painel administrativo para o professor acompanhar desempenho, erros, evolução e temas fracos de cada aluno.

---

## 1. Acesso restrito

| Requisito | Detalhe |
|-----------|---------|
| Limite de usuários | Máximo 10 alunos cadastrados |
| Autenticação | Login individual com e-mail e senha (senha criptografada) |
| Perfis | `admin` (professor) e `student` (aluno) |
| Visibilidade | O aluno só enxerga as provas liberadas para ele |

---

## 2. Prova diária

- Todos os dias o sistema libera uma prova nova.
- Questões selecionadas do banco de dados.
- Configuração pelo administrador:
  - **20 a 30 questões por dia** (quantidade configurável)
  - Origens: ENARE, USP, SUS-SP, Unicamp, AMRIGS, etc.
  - Possibilidade de filtrar/separar por origem
- **Tempo:** 30 minutos (configurável pelo admin)
- Cronômetro **não pausa** após iniciar
- Ao acabar o tempo → envio automático
- Cada aluno só pode responder **uma vez** por prova

---

## 3. Banco de questões

Cada questão deve conter:

| Campo | Obrigatório |
|-------|-------------|
| Enunciado | Sim |
| Alternativas A, B, C, D, E | Sim |
| Alternativa correta | Sim |
| Comentário da resposta | Sim |
| Tema | Sim |
| Subtema | Sim |
| Especialidade | Sim |
| Instituição de origem | Sim |
| Ano | Sim |
| Nível de dificuldade | Sim |
| Tags | Sim |
| Imagem | Opcional |
| Referência bibliográfica | Opcional |

**Cadastro:**
- Manual pelo painel administrativo
- Importação por planilha Excel/CSV

---

## 4. Painel do professor (admin)

O administrador poderá:

- [ ] Cadastrar alunos
- [ ] Bloquear ou excluir alunos
- [ ] Cadastrar questões manualmente
- [ ] Importar questões por planilha
- [ ] Criar provas
- [ ] Definir quantidade de questões
- [ ] Definir tempo da prova
- [ ] Escolher questões manualmente ou sortear por tema/origem
- [ ] Ver desempenho individual
- [ ] Ver ranking geral, diário e semanal
- [ ] Ver estatísticas por tema
- [ ] Ver questões com maior índice de erro
- [ ] Baixar relatório em Excel ou PDF

---

## 5. Área do aluno

O aluno poderá:

- [ ] Fazer a prova diária
- [ ] Ver cronômetro em tempo real
- [ ] Marcar alternativas
- [ ] Navegar entre questões (anterior/próxima)
- [ ] Enviar prova manualmente
- [ ] Ver resultado após finalizar
- [ ] Ver gabarito comentado (se liberado pelo professor)
- [ ] Ver histórico de provas
- [ ] Ver desempenho por tema
- [ ] Ver posição no ranking

---

## 6. Ranking

Rankings automáticos por período:

| Período | Campos considerados |
|---------|---------------------|
| Diário | Pontuação, acertos, tempo |
| Semanal | Pontuação, acertos, tempo |
| Mensal | Pontuação, acertos, tempo |
| Geral | Pontuação acumulada |

**Critério de desempate (ordem):**
1. Maior número de acertos
2. Menor tempo de resposta
3. Maior sequência de dias respondidos (streak)

---

## 7. Gamificação

- Ranking dos 10 alunos
- Medalhas para 1º, 2º e 3º lugar
- Sequência de dias estudados (streak)
- Pontuação acumulada
- Desafios semanais
- Destaque: melhor desempenho da semana
- Identificação do tema mais fraco de cada aluno

---

## 8. Regras da prova

| Regra | Comportamento |
|-------|---------------|
| Início | Aluno clica "Iniciar prova" → cronômetro começa |
| Duração | 30 minutos (padrão, configurável) |
| Pausa | Não permitida |
| Refazer | Não permitido |
| Auto-submit | Ao expirar o tempo |

**Dados salvos ao finalizar:**
- Respostas escolhidas
- Número de acertos
- Tempo total
- Data e hora
- Pontuação
- Percentual de acerto
- Flag `submitted_automatically` (se foi por tempo)

**Gabarito:** O professor escolhe se aparece imediatamente ou só depois que todos responderem.

---

## 9. Modelo de dados (PostgreSQL)

### `users`
```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
email           TEXT UNIQUE NOT NULL
password_hash   TEXT NOT NULL
role            TEXT CHECK (role IN ('admin', 'student'))
active          BOOLEAN DEFAULT true
created_at      TIMESTAMPTZ DEFAULT now()
```

### `questions`
```sql
id              UUID PRIMARY KEY
statement       TEXT NOT NULL
option_a        TEXT NOT NULL
option_b        TEXT NOT NULL
option_c        TEXT NOT NULL
option_d        TEXT NOT NULL
option_e        TEXT NOT NULL
correct_option  CHAR(1) CHECK (correct_option IN ('A','B','C','D','E'))
explanation     TEXT
source          TEXT          -- ENARE, USP, SUS-SP, Unicamp, AMRIGS...
year            INTEGER
specialty       TEXT
topic           TEXT
subtopic        TEXT
difficulty      TEXT          -- fácil, médio, difícil
tags            TEXT[]
image_url       TEXT
bibliography    TEXT          -- referência opcional
created_at      TIMESTAMPTZ DEFAULT now()
```

### `exams`
```sql
id                          UUID PRIMARY KEY
title                       TEXT NOT NULL
date_available              DATE NOT NULL
duration_minutes            INTEGER DEFAULT 30
total_questions             INTEGER
show_answers_after_submit   BOOLEAN DEFAULT false
show_answers_when_all_done  BOOLEAN DEFAULT false
status                      TEXT CHECK (status IN ('draft', 'published', 'closed'))
created_at                  TIMESTAMPTZ DEFAULT now()
```

### `exam_questions`
```sql
id              UUID PRIMARY KEY
exam_id         UUID REFERENCES exams(id)
question_id     UUID REFERENCES questions(id)
order_number    INTEGER
UNIQUE(exam_id, question_id)
```

### `attempts`
```sql
id                      UUID PRIMARY KEY
exam_id                 UUID REFERENCES exams(id)
user_id                 UUID REFERENCES users(id)
started_at              TIMESTAMPTZ NOT NULL
finished_at             TIMESTAMPTZ
duration_seconds        INTEGER
score                   NUMERIC
total_correct           INTEGER
total_questions         INTEGER
percentage              NUMERIC
submitted_automatically BOOLEAN DEFAULT false
created_at              TIMESTAMPTZ DEFAULT now()
UNIQUE(exam_id, user_id)  -- uma tentativa por aluno por prova
```

### `attempt_answers`
```sql
id              UUID PRIMARY KEY
attempt_id      UUID REFERENCES attempts(id)
question_id     UUID REFERENCES questions(id)
selected_option CHAR(1)
is_correct      BOOLEAN
answered_at     TIMESTAMPTZ
```

### `rankings`
```sql
id                  UUID PRIMARY KEY
user_id             UUID REFERENCES users(id)
period_type         TEXT CHECK (period_type IN ('daily','weekly','monthly','general'))
period_start        DATE
period_end          DATE
total_score         NUMERIC
total_correct       INTEGER
total_questions     INTEGER
average_percentage  NUMERIC
total_time_seconds  INTEGER
streak_days         INTEGER DEFAULT 0
position            INTEGER
```

### Tabelas auxiliares sugeridas

**`user_streaks`** — controle de sequência de dias estudados  
**`weekly_challenges`** — desafios semanais de gamificação  
**`user_badges`** — medalhas conquistadas  

---

## 10. Telas

### 10.1 Tela inicial (aluno, pós-login)
- Nome do aluno
- Card "Prova do dia"
- Botão **"Iniciar prova"**
- Ranking atual (top 10)
- Desempenho acumulado
- Aviso: *"Ao iniciar, você terá 30 minutos. A prova não poderá ser pausada."*

### 10.2 Tela da prova
- Questão atual com enunciado e imagem (se houver)
- Alternativas A–E
- Botões anterior / próxima
- Cronômetro visível (countdown)
- Mapa de questões (respondidas vs. não respondidas)
- Botão **Finalizar**
- Auto-envio ao zerar o tempo

### 10.3 Tela de resultado
- Acertos e erros
- Percentual
- Tempo usado
- Posição no ranking
- Gabarito comentado (se liberado)

### 10.4 Painel do professor
- Dashboard geral
- Gestão de alunos
- Provas criadas
- Banco de questões
- Rankings
- Relatórios (export Excel/PDF)
- Importação de questões

---

## 11. Importação por planilha

Colunas obrigatórias do CSV/Excel:

| Coluna | Tipo |
|--------|------|
| enunciado | texto |
| alternativa_a | texto |
| alternativa_b | texto |
| alternativa_c | texto |
| alternativa_d | texto |
| alternativa_e | texto |
| correta | A/B/C/D/E |
| comentario | texto |
| origem | texto |
| ano | número |
| especialidade | texto |
| tema | texto |
| subtema | texto |
| dificuldade | texto |
| tags | texto (separado por vírgula) |

---

## 12. Stack tecnológica sugerida

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14+ (React) — App Router |
| Backend | Next.js API Routes ou NestJS |
| Banco | PostgreSQL (Supabase) |
| Auth | Supabase Auth ou bcrypt + JWT |
| Hospedagem | Vercel (frontend) + Supabase (DB/Auth) |
| Relatórios | xlsx (Excel) + jsPDF ou Puppeteer (PDF) |
| UI | Tailwind CSS + shadcn/ui |

---

## 13. Direitos autorais

O sistema deve permitir cadastrar questões próprias ou autorizadas. Questões de ENARE, USP e outras instituições devem ser tratadas como **material de estudo interno**, sem venda ou distribuição pública sem autorização.

---

## 14. Fases de desenvolvimento sugeridas

### Fase 1 — MVP (2–3 semanas)
- Auth (login admin/aluno)
- CRUD de questões (manual)
- Criação de prova diária
- Tela de prova com cronômetro
- Resultado básico
- Ranking diário

### Fase 2 — Admin completo
- Importação CSV/Excel
- Dashboard do professor
- Rankings semanal/mensal/geral
- Relatórios PDF/Excel
- Estatísticas por tema

### Fase 3 — Gamificação
- Medalhas
- Streak de dias
- Desafios semanais
- Tema mais fraco por aluno

---

## 15. Regras de negócio críticas

1. **Limite de 10 alunos** — validar no cadastro
2. **Uma tentativa por prova** — constraint `UNIQUE(exam_id, user_id)` em `attempts`
3. **Cronômetro server-side** — calcular expiração com `started_at + duration_minutes` para evitar trapaça
4. **Auto-submit** — job/cron ou verificação no frontend que envia ao expirar
5. **RLS (Row Level Security)** — aluno só vê suas tentativas; admin vê tudo
6. **Gabarito condicional** — respeitar flags `show_answers_after_submit` e `show_answers_when_all_done`

---

*Documento gerado em julho/2026. Versão 1.0.*
