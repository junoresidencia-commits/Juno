#!/usr/bin/env bash
# Mantém o túnel Cloudflare ativo (reinicia se cair)
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMUX_CONF="${TMUX_CONF:-/exec-daemon/tmux.portal.conf}"
URL_FILE="/tmp/medrank-public-url.txt"

while true; do
  if ! tmux -f "$TMUX_CONF" has-session -t "=medrank-tunnel-live" 2>/dev/null; then
    "$ROOT/scripts/start-public.sh" tunnel >> /tmp/medrank-tunnel-watchdog.log 2>&1
  fi
  sleep 30
done
