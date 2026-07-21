#!/usr/bin/env node
/**
 * Bancos EXPERT MedRank — casos clínicos escritos como prova de título.
 * Qualidade > quantidade. Variações só em demografia/labs, mantendo o raciocínio.
 *
 * node scripts/build-expert-treino-banks.cjs
 */
const fs = require('fs');
const path = require('path');
const { PED_MASTERS } = require('./expert-masters-nefropediatria.cjs');
const { ADV_MASTERS } = require('./expert-masters-nefrologia.cjs');

const ROOT = path.join(__dirname, '..');
const VARIATIONS = Math.max(8, Number(process.argv[2]) || 15);

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function jitter(n, pct, rnd, digits = 1) {
  const v = n * (1 + (rnd() * 2 - 1) * pct);
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

function applyVars(text, vars) {
  let out = String(text);
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{{${k}}}`).join(String(v));
  }
  return out;
}

function expandMaster(master, track, index, variant, rnd) {
  const sex = variant % 2 === 0 ? 'M' : 'F';
  const sexWord =
    track === 'nefropediatria'
      ? sex === 'M'
        ? 'Menino'
        : 'Menina'
      : sex === 'M'
        ? 'Homem'
        : 'Mulher';
  const sexAdj = sex === 'M' ? 'masculino' : 'feminino';

  const baseAge = master.age ?? (track === 'nefropediatria' ? 7 : 52);
  const age =
    track === 'nefropediatria'
      ? Math.max(0.3, Math.round(jitter(baseAge, 0.25, rnd, baseAge < 2 ? 1 : 0) * (baseAge < 2 ? 10 : 1)) / (baseAge < 2 ? 10 : 1))
      : Math.min(82, Math.max(22, Math.round(jitter(baseAge, 0.12, rnd, 0))));

  const ageLabel =
    track === 'nefropediatria' && age < 1
      ? `${Math.max(7, Math.round(age * 30))} dias`
      : track === 'nefropediatria' && age < 2
        ? `${Math.round(age * 12)} meses`
        : `${Math.round(age)}`;

  const ageWithUnit =
    /\b(dias|meses)\b/.test(ageLabel) ? ageLabel : `${ageLabel} anos`;

  const weight =
    track === 'nefropediatria'
      ? age < 2
        ? Math.round(4 + age * 5 + rnd() * 2)
        : Math.round(10 + age * 2.4 + rnd() * 4)
      : Math.round(58 + rnd() * 35);

  const vars = {
    sexWord,
    sexAdj,
    age: ageWithUnit,
    ageNum: Math.round(age),
    weight,
    ...(master.vars
      ? Object.fromEntries(
          Object.entries(master.vars).map(([k, v]) => {
            if (typeof v !== 'number') return [k, v];
            // Não distorcer pH / gaps / contagens críticas
            if (/^(ph|gap|plaq|ck|pth|c3|c4)$/i.test(k)) return [k, v];
            const digits = /^(alb|cr|cr0|cr1|fena|mg|na|k|hb|tfg|upcr|uacr|prot|p|fe)$/i.test(k)
              ? 1
              : String(v).includes('.')
                ? 1
                : 0;
            return [k, jitter(v, 0.06, rnd, digits)];
          })
        )
      : {}),
  };

  const statement = applyVars(master.statement, vars);
  const letters = track === 'nefropediatria' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];
  const options = letters.map((L) => applyVars(master.options[L] || '', vars));
  while (options.length < 5) options.push('');

  const idNum = String(index * VARIATIONS + variant + 1).padStart(6, '0');
  const prefix = track === 'nefropediatria' ? 'nefroped' : 'nefroadv';
  const tag = track === 'nefropediatria' ? 'nefropediatria' : 'nefrologia-avancada';
  const specialty =
    track === 'nefropediatria' ? 'Nefrologia Pediátrica' : 'Nefrologia';

  return {
    id: `${prefix}-x-${idNum}`,
    statement,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    option_e: options[4] || '',
    correct_option: master.correct,
    explanation: applyVars(master.explanation, vars),
    source: 'MedRank Expert',
    year: 2026,
    specialty,
    topic: master.tema,
    subtopic: master.subtema,
    difficulty: master.dificuldade || 'medio',
    tags: [
      'MedRank',
      'original',
      tag,
      'estilo-SBN',
      track === 'nefropediatria' ? 'estilo-SBNPed' : 'titulo-nefrologia',
      'banco-expert',
      master.tema,
      master.subtema,
    ],
    image_url: null,
    bibliography: master.bibliography || null,
  };
}

function buildTrack(masters, track) {
  const out = [];
  masters.forEach((m, i) => {
    for (let v = 0; v < VARIATIONS; v++) {
      const rnd = mulberry32(100000 + i * 997 + v * 13 + (track === 'nefropediatria' ? 3 : 7));
      out.push(expandMaster(m, track, i, v, rnd));
    }
  });
  return out;
}

function assertQuality(qs, label) {
  const bad = [
    /em avaliação de .+ — foco:/i,
    /Labs e contexto compatíveis/i,
    /Conduta alinhada a guidelines/i,
    /Tipo de cobrança/i,
    /\(i % \d+/,
  ];
  for (const q of qs) {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c}\n${q.option_d}\n${q.option_e}`;
    for (const re of bad) {
      if (re.test(blob)) throw new Error(`[${label}] bad pattern ${re} in ${q.id}`);
    }
    if ((q.statement || '').length < 45) throw new Error(`[${label}] short stem ${q.id}: ${q.statement}`);
  }
}

function writeBank(file, questions, meta) {
  const payload = {
    meta: {
      ...meta,
      count: questions.length,
      generatedAt: new Date().toISOString(),
      note: 'Casos clínicos expert MedRank — inéditos, não cópia de prova oficial',
    },
    questions,
  };
  fs.writeFileSync(path.join(ROOT, 'data', file), JSON.stringify(payload));
}

function writeRich(file, masters, track) {
  const sample = masters.slice(0, 20).map((m, i) => {
    const rnd = mulberry32(42 + i);
    return expandMaster(m, track, i, 0, rnd);
  });
  fs.writeFileSync(
    path.join(ROOT, 'data', file),
    JSON.stringify({ meta: { sample: sample.length }, questions: sample }, null, 2)
  );
}

if (PED_MASTERS.length < 40) throw new Error('Poucos masters pediátricos');
if (ADV_MASTERS.length < 40) throw new Error('Poucos masters adultos');

const ped = buildTrack(PED_MASTERS, 'nefropediatria');
const adv = buildTrack(ADV_MASTERS, 'nefrologia-avancada');
assertQuality(ped, 'ped');
assertQuality(adv, 'adv');

writeBank('nefropediatria-questions.json', ped, {
  track: 'nefropediatria',
  masters: PED_MASTERS.length,
  variations: VARIATIONS,
});
writeBank('nefrologia-avancada-questions.json', adv, {
  track: 'nefrologia-avancada',
  masters: ADV_MASTERS.length,
  variations: VARIATIONS,
});
writeRich('nefropediatria-rich-sample.json', PED_MASTERS, 'nefropediatria');
writeRich('nefrologia-avancada-rich-sample.json', ADV_MASTERS, 'nefrologia-avancada');

console.log(
  JSON.stringify(
    {
      ped: { masters: PED_MASTERS.length, questions: ped.length },
      adv: { masters: ADV_MASTERS.length, questions: adv.length },
    },
    null,
    2
  )
);
