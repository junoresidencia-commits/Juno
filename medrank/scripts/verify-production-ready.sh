#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== MedRank — verificação pré-deploy ==="
echo ""

ok=0
warn=0

check() {
  local label="$1"
  local status="$2"
  if [ "$status" = "ok" ]; then
    echo "✓ $label"
    ok=$((ok + 1))
  else
    echo "⚠ $label"
    warn=$((warn + 1))
  fi
}

# Build
if npm run build >/dev/null 2>&1; then
  check "Build passa (npm run build)" ok
else
  check "Build passa (npm run build)" warn
fi

# Migrations
migration_count=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
if [ "$migration_count" -ge 14 ]; then
  check "Migrations presentes ($migration_count arquivos, esperado 14+)" ok
else
  check "Migrations presentes ($migration_count arquivos, esperado 14+)" warn
fi

# Env example
if [ -f .env.example ]; then
  check ".env.example existe" ok
else
  check ".env.example existe" warn
fi

# Production env vars (if .env.local exists)
if [ -f .env.local ]; then
  source_env() {
    grep -E "^${1}=" .env.local 2>/dev/null | cut -d= -f2- | tr -d '"' || true
  }
  demo_mode=$(source_env DEMO_MODE)
  supabase_url=$(source_env NEXT_PUBLIC_SUPABASE_URL)

  if [ "$demo_mode" = "false" ]; then
    check "DEMO_MODE=false (produção)" ok
  else
    check "DEMO_MODE=false — atual: ${demo_mode:-não definido} (ok para dev)" warn
  fi

  if [[ "$supabase_url" == *"supabase.co"* ]] && [[ "$supabase_url" != *"seu-projeto"* ]]; then
    check "NEXT_PUBLIC_SUPABASE_URL configurada" ok
  else
    check "NEXT_PUBLIC_SUPABASE_URL real (não placeholder)" warn
  fi
else
  check ".env.local — use .env.example como base na Vercel" warn
fi

echo ""
echo "Resultado: $ok ok, $warn avisos"
echo ""
echo "Próximo passo: siga medrank/DEPLOY.md"
echo "  1. Supabase → migrations 001–014"
echo "  2. Criar professor (setup-production.sql)"
echo "  3. Vercel → Root Directory = medrank"
echo "  4. Env vars: DEMO_MODE=false, SKIP_AUTH=false, chaves Supabase"
