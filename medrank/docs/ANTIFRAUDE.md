# Antifraude — Modo Prova (tolerância zero)

## Regra
Qualquer tentativa de sair da disputa diária ou de interação não permitida **encerra na hora**.
Sem aviso, sem segunda chance, sem retomada.

## Infrações detectáveis no navegador
- Troca de aba / segundo plano (`visibilitychange`)
- Perda de foco da janela (`blur` — Alt+Tab, outro app)
- Saída da página (`pagehide`)
- Sessão abandonada (retomada ou retorno ao home com prova aberta)
- DevTools (F12 / atalhos + heurística de viewport)
- Copiar / recortar / selecionar texto
- Botão direito
- Atalho de PrintScreen (quando o SO entrega o evento)

**Limite do browser:** captura/gravação de tela nativa muitas vezes **não** é detectável de forma confiável. Nesses casos usamos os sinais acima + bloqueio de cópia/seleção.

## Penalidade
- `attempts.forfeited = true`, score/acertos/% = 0
- Sem streak, sem ranking desta tentativa
- Sem nova tentativa até o próximo dia
- Registro em `attempt_violations` (data/hora, usuário, questão, tempo, tipo, IP, device, browser, OS, UA)

## Aplicar no Supabase
Rodar a migration:

`medrank/supabase/migrations/018_antifraud_zero_tolerance.sql`

## API
`POST /api/attempts/:attemptId/forfeit` com body JSON (`violationType`, `questionId`, device info…).

## UI
Overlay **PROVA ENCERRADA** + home/resultado com a mesma mensagem.
Simulados: `antiFraud={false}` (prática sem tolerância zero).
