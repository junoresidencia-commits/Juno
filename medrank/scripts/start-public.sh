#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"
tmux_cmd() { tmux -f "$TMUX_CONF" "$@"; }

PROD_SESSION="medrank-prod-server"
TUNNEL_SESSION="medrank-tunnel-live"
URL_FILE="/tmp/medrank-public-url.txt"
LOG_FILE="/tmp/cf-tunnel.log"

start_prod() {
  if tmux_cmd has-session -t "=$PROD_SESSION" 2>/dev/null; then
    echo "✓ Servidor já rodando ($PROD_SESSION)"
    return
  fi
  tmux_cmd new-session -d -s "$PROD_SESSION" -c "$ROOT" -- "${SHELL:-bash}" -l
  tmux_cmd send-keys -t "$PROD_SESSION:0.0" 'npm run build && npm run start' C-m
  echo "→ Iniciando servidor de produção..."
}

start_tunnel() {
  tmux_cmd kill-session -t "$TUNNEL_SESSION" 2>/dev/null || true
  tmux_cmd new-session -d -s "$TUNNEL_SESSION" -c "$ROOT" -- "${SHELL:-bash}" -l
  tmux_cmd send-keys -t "$TUNNEL_SESSION:0.0" "rm -f '$LOG_FILE'; npx --yes cloudflared tunnel --url http://127.0.0.1:3000 2>&1 | tee '$LOG_FILE'" C-m
  echo "→ Iniciando túnel Cloudflare..."

  for _ in $(seq 1 30); do
    sleep 2
    URL=$(rg -o 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG_FILE" 2>/dev/null | head -1 || true)
    if [ -n "$URL" ]; then
      echo "$URL" > "$URL_FILE"
      echo ""
      echo "============================================"
      echo "  MedRank público:"
      echo "  $URL/login"
      echo "============================================"
      return
    fi
  done
  echo "⚠ Túnel iniciado mas URL ainda não apareceu. Veja: $LOG_FILE"
}

case "${1:-all}" in
  prod) start_prod ;;
  tunnel) start_tunnel ;;
  url)
    if [ -f "$URL_FILE" ]; then cat "$URL_FILE"; else echo "URL ainda não gerada. Rode: ./scripts/start-public.sh tunnel"; fi
    ;;
  all)
    start_prod
    sleep 3
    start_tunnel
    ;;
  *)
    echo "Uso: $0 [all|prod|tunnel|url]"
    exit 1
    ;;
esac
