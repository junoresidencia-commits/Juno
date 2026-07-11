#!/usr/bin/env bash
# Mantém o túnel Cloudflare ativo — reinicia se a sessão morrer ou URL parar de responder
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"
URL_FILE="/tmp/medrank-public-url.txt"
LOG_FILE="/tmp/cf-tunnel-watchdog.log"

log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $*" | tee -a "$LOG_FILE"; }

tunnel_healthy() {
  local url="${1:-}"
  [ -n "$url" ] || return 1
  tmux -f "$TMUX_CONF" has-session -t "=medrank-tunnel-live" 2>/dev/null || return 1
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 8 "${url}/login" 2>/dev/null || echo 000)
  [ "$code" = "200" ]
}

while true; do
  URL=$(cat "$URL_FILE" 2>/dev/null || true)

  if ! tunnel_healthy "$URL"; then
    log "Túnel indisponível ($URL). Reiniciando..."
    "$ROOT/scripts/start-public.sh" tunnel >> "$LOG_FILE" 2>&1 || log "Falha ao reiniciar túnel"
  fi

  sleep 45
done
