#!/usr/bin/env bash
# Verifica se o MedRank está pronto para disputar hoje (modo demo).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== MedRank play-ready =="

node <<'NODE'
const fs = require('fs');
const path = require('path');

function brazilToday() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const g = (t) => parts.find((p) => p.type === t)?.value;
  return {
    date: `${g('year')}-${g('month')}-${g('day')}`,
    hour: Number(g('hour')),
    minute: Number(g('minute')),
  };
}

const clock = brazilToday();
const open = clock.hour >= 7;
console.log(`Brasilia: ${clock.date} ${String(clock.hour).padStart(2,'0')}:${String(clock.minute).padStart(2,'0')}`);
console.log(`Janela aberta agora: ${open ? 'SIM' : 'NÃO (abre às 7h)'}`);

const bank = JSON.parse(fs.readFileSync(path.join('data', 'imported-questions.json'), 'utf8'));
console.log(`Banco importado: ${bank.questions?.length ?? 0} questões`);

const envPath = path.join('.env.local');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  const demo = /DEMO_MODE=true/.test(env);
  console.log(`DEMO_MODE local: ${demo ? 'true' : 'false/ausente'}`);
} else {
  console.log('Sem .env.local (ok se usar Vercel)');
}

if ((bank.questions?.length ?? 0) < 20) {
  console.error('ERRO: banco com menos de 20 questões');
  process.exit(1);
}
console.log('OK — pronto para disputa (modo demo).');
NODE
