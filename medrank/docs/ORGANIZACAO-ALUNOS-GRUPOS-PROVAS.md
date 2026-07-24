# Organização definitiva dos alunos, grupos e provas

Documento oficial do produto MedRank. Banco de questões **não** é prioridade agora — primeiro finalizar este fluxo para o app ficar rápido, organizado e pronto para os alunos.

---

## 1. Residência Geral é o acesso padrão

Todo aluno cadastrado na plataforma deve entrar automaticamente na modalidade **Residência Geral**.

Assim que o administrador criar o cadastro do aluno, com e-mail e senha, ele já deverá ter acesso à prova diária de Residência Geral, mesmo que não participe de nenhum grupo específico.

A prova de Residência Geral será:

* 20 questões;
* 30 minutos;
* questões aleatórias do banco aprovado;
* assuntos variados de todas as áreas da residência médica;
* questões diferentes entre os alunos e entre os dias, evitando repetições excessivas.

## 2. Nefrologia é um acesso exclusivo

A prova de Nefrologia **não** deve aparecer para todos.

Somente poderá fazer essa prova quem estiver autorizado dentro do grupo de Nefrologia. A entrada nesse grupo **não** será automática.

Apenas o administrador principal poderá:

* adicionar diretamente o aluno;
* aceitar a solicitação de entrada;
* remover o aluno;
* definir outro administrador autorizado, quando necessário.

Quem não estiver no grupo de Nefrologia não deve visualizar a prova, o ranking, o resultado ou qualquer conteúdo exclusivo desse grupo.

> **Implementação:** a autorização exclusiva é o módulo `nephrology` em `profiles.enabled_tracks` (ligado pelo admin). Entrar em um grupo social cujo nome contenha “Nefrologia” **não** libera a prova.

## 3. Prova de Nefrologia

A prova de Nefrologia também deve ser uma prova completa e **separada** da Residência Geral.

Formato padrão:

* 20 questões;
* 30 minutos;
* questões aleatórias do banco aprovado;
* 10 questões de Nefrologia de adultos;
* 10 questões de Nefropediatria.

Em determinados dias, a prova também poderá ser temática, por exemplo:

* somente Nefrologia;
* somente Nefropediatria;
* glomerulopatias;
* diálise;
* transplante;
* distúrbios hidroeletrolíticos;
* hipertensão;
* injúria renal aguda.

O aluno que estiver no grupo de Nefrologia poderá fazer **duas provas separadas** no mesmo dia:

1. Residência Geral;
2. Nefrologia/Nefropediatria.

## 4. Grupos sociais ou equipes

Além das modalidades de prova, poderão existir grupos como:

* Resenha;
* Liga Acadêmica;
* Turma de residência;
* Hospital;
* Faculdade;
* Grupo de amigos.

O aluno poderá visualizar os grupos disponíveis e clicar em **Solicitar entrada**.

Depois disso:

* o administrador do grupo recebe a solicitação;
* o administrador aceita ou recusa;
* o aluno somente entra após aprovação;
* o administrador também pode adicionar diretamente uma pessoa.

É importante diferenciar:

* **grupo social/equipe**, usado para ranking e competição;
* **permissão de Nefrologia**, que libera a prova exclusiva.

Entrar em um grupo chamado “Resenha”, por exemplo, **não** deve liberar automaticamente a prova de Nefrologia. A pessoa só terá essa prova se também possuir a autorização específica de Nefrologia.

## 5. Tela do aluno

Ao entrar, o aluno deve encontrar de forma simples:

* Prova diária de Residência Geral;
* Prova de Nefrologia, somente quando autorizado;
* grupos dos quais participa;
* solicitações pendentes;
* ranking geral;
* ranking do grupo;
* número de acertos;
* histórico de provas;
* PDF das provas já liberadas.

## 6. Prioridades de desenvolvimento (históricas)

1. Finalizar o sistema de entrada e aprovação nos grupos;
2. Criar a permissão exclusiva para Nefrologia;
3. Garantir as duas provas independentes;
4. Tornar todas as provas aleatórias;
5. Melhorar a velocidade do aplicativo;
6. Diminuir consultas pesadas e carregamentos desnecessários;
7. Finalizar o layout para celular;
8. Finalizar as funções de anular, excluir ou zerar questões e provas;
9. Deixar ranking, acertos e acesso às provas mais claros.

---

## 7. Disputa entre grupos, turmas e faculdades

Além do ranking individual, deve existir uma competição entre grupos.

Exemplo: uma faculdade pode criar o grupo Faculdade de Medicina AGE, com 100 alunos. Dentro desse grupo, os 100 alunos terão um ranking individual próprio, mostrando quem teve o melhor desempenho.

Ao mesmo tempo, o resultado coletivo da AGE poderá ser comparado com outras faculdades, ligas, hospitais ou grupos cadastrados na plataforma.

O sistema deverá ter:

* Ranking individual dentro do grupo;
* Ranking geral entre todos os alunos da plataforma;
* Ranking coletivo entre grupos;
* Classificação semanal, considerando os últimos sete dias;
* Classificação mensal, reiniciada no começo de cada mês;
* Histórico dos vencedores das semanas e dos meses.

Na disputa entre grupos, não deve vencer apenas quem tem mais integrantes. Um grupo com 100 alunos não pode ter vantagem automática sobre outro com 20. A pontuação coletiva deve considerar critérios justos, como:

* média de acertos dos participantes;
* percentual de provas realizadas;
* média de pontos por aluno;
* regularidade;
* tempo médio de resposta, apenas como critério de desempate.

Também deve existir uma quantidade mínima de participantes ativos para o grupo aparecer no ranking coletivo. Assim, evita-se que um grupo com apenas uma ou duas pessoas tenha vantagem por possuir uma média artificialmente alta.

Exemplo da tela:

**Ranking semanal entre grupos**

1. Faculdade AGE — média de 82%
2. Liga Acadêmica de Nefrologia — média de 79%
3. Turma Hospital Central — média de 76%

Ao clicar em um grupo, o usuário poderá visualizar:

* posição coletiva;
* média de acertos;
* quantidade de participantes ativos;
* número de provas concluídas;
* evolução semanal e mensal;
* ranking interno dos integrantes, respeitando as configurações de privacidade.

Os grupos poderão representar:

* faculdades;
* turmas;
* ligas acadêmicas;
* hospitais;
* residências médicas;
* grupos de estudo;
* grupos de amigos.

A entrada continuará dependendo de solicitação e aprovação do administrador do grupo. Essa competição entre grupos é **separada** da permissão para a prova de Nefrologia. Portanto, participar de um grupo de faculdade ou de amigos **não** libera automaticamente o conteúdo exclusivo de Nefrologia.

---

## Ordem atualizada das prioridades

1. Finalizar o cadastro e o acesso padrão à Residência Geral;
2. Criar a autorização exclusiva para a prova de Nefrologia;
3. Permitir solicitação, aprovação e entrada nos grupos;
4. Garantir as duas provas diárias independentes e aleatórias;
5. Criar o ranking individual dentro de cada grupo;
6. Criar a disputa semanal e mensal entre grupos;
7. Aplicar uma fórmula justa, que não favoreça grupos maiores;
8. Melhorar a velocidade e o layout para celular;
9. Finalizar as funções administrativas de anular, excluir ou zerar provas e questões;
10. Somente depois ampliar novamente o banco de questões.

**Não reconstruir o banco de questões agora.** Primeiro finalize este fluxo.
