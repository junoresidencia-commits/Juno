#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"
tmux_cmd() { tmux -f "$TMUX_CONF" "$@"; }

PROD_SESSION="medrank-prod-server"
TUNNEL_SESSION="medrank-tunnel-live"
WATCHDOG_SESSION="medrank-watchdog"
URL_FILE="/tmp/medrank-public-url.txt"
LOG_FILE="/tmp/cf-tunnel.log"

start_prod() {
  if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/login 2>/dev/null | grep -q 200; then
    echo "✓ Servidor respondendo em :3000"
    return
  fi

  tmux_cmd kill-session -t "$PROD_SESSION" 2>/dev/null || true
  tmux_cmd new-session -d -s "$PROD_SESSION" -c "$ROOT" -- "${SHELL:-bash}" -l
  tmux_cmd send-keys -t "$PROD_SESSION:0.0" 'npm run start' C-m
  echo "→ Iniciando servidor de produção..."

  for _ in $(seq 1 20); do
    sleep 1
    if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/login 2>/dev/null | grep -q 200; then
      echo "✓ Servidor pronto"
      return
    fi
  done
  echo "⚠ Servidor demorou — verifique: tmux attach -t $PROD_SESSION"
}

start_tunnel() {
  tmux_cmd kill-session -t "$TUNNEL_SESSION" 2>/dev/null || true
  rm -f "$LOG_FILE"
  tmux_cmd new-session -d -s "$TUNNEL_SESSION" -c "$ROOT" -- "${SHELL:-bash}" -l
  tmux_cmd send-keys -t "$TUNNEL_SESSION:0.0" "npx --yes cloudflared tunnel --url http://127.0.0.1:3000 2>&1 | tee '$LOG_FILE'" C-m
  echo "→ Iniciando túnel Cloudflare..."

  for _ in $(seq 1 30); do
    sleep 2
    URL=$(rg -o 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG_FILE" 2>/dev/null | head -1 || true)
    if [ -n "$URL" ]; then
      echo "$URL" > "$URL_FILE"
      if [ -f .env.local ]; then
        if grep -q '^NEXT_PUBLIC_SITE_URL=' .env.local; then
          sed -i "s|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=$URL|" .env.local
        else
          echo "NEXT_PUBLIC_SITE_URL=$URL" >> .env.local
        fi
      fi
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

start_watchdog() {
  if tmux_cmd has-session -t "=$WATCHDOG_SESSION" 2>/dev/null; then
    return
  fi
  tmux_cmd new-session -d -s "$WATCHDOG_SESSION" -c "$ROOT" -- "${SHELL:-bash}" -l
  tmux_cmd send-keys -t "$WATCHDOG_SESSION:0.0" './scripts/tunnel-watchdog.sh' C-m
  echo "✓ Watchdog do túnel ativo"
}

case "${1:-all}" in
  prod) start_prod ;;
  tunnel) start_tunnel ;;
  watchdog) start_watchdog ;;
  url)
    if [ -f "$URL_FILE" ]; then cat "$URL_FILE"; else echo "URL ainda não gerada. Rode: ./scripts/start-public.sh"; fi
    ;;
  all)
    start_prod
    start_tunnel
    start_watchdog
    ;;
  *)
    echo "Uso: $0 [all|prod|tunnel|watchdog|url]"
    exit 1
    ;;
esac
