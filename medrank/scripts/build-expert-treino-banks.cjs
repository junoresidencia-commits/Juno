#!/usr/bin/env node
/**
 * Bancos EXPERT MedRank — questões estilo prova de título (SBN/SBP-Nefroped).
 * Qualidade acima de quantidade. Variações mudam demografia + labs, mantendo
 * o raciocínio clínico e a resposta correta.
 *
 * Uso: node scripts/build-expert-treino-banks.cjs [VARIATIONS]
 *   VARIATIONS: 8–20 (default 12). Total ≈ masters × variations.
 */
const fs = require('fs');
const path = require('path');
const { PED_MASTERS: PED_BASE } = require('./expert-masters-nefropediatria.cjs');
const { ADV_MASTERS: ADV_BASE } = require('./expert-masters-nefrologia.cjs');
const { PED_MASTERS_EXTRA } = require('./expert-masters-nefropediatria-extra.cjs');
const { ADV_MASTERS_EXTRA } = require('./expert-masters-nefrologia-extra.cjs');
const { PED_MASTERS_EXTRA2 } = require('./expert-masters-nefropediatria-extra2.cjs');
const { ADV_MASTERS_EXTRA2 } = require('./expert-masters-nefrologia-extra2.cjs');
const { PED_MASTERS_EXTRA3 } = require('./expert-masters-nefropediatria-extra3.cjs');
const { ADV_MASTERS_EXTRA3 } = require('./expert-masters-nefrologia-extra3.cjs');
const { PED_MASTERS_EXTRA4 } = require('./expert-masters-nefropediatria-extra4.cjs');
const { ADV_MASTERS_EXTRA4 } = require('./expert-masters-nefrologia-extra4.cjs');

const PED_MASTERS = [
  ...PED_BASE,
  ...PED_MASTERS_EXTRA,
  ...PED_MASTERS_EXTRA2,
  ...PED_MASTERS_EXTRA3,
  ...PED_MASTERS_EXTRA4,
];
const ADV_MASTERS = [
  ...ADV_BASE,
  ...ADV_MASTERS_EXTRA,
  ...ADV_MASTERS_EXTRA2,
  ...ADV_MASTERS_EXTRA3,
  ...ADV_MASTERS_EXTRA4,
];

const ROOT = path.join(__dirname, '..');
const VARIATIONS = Math.max(6, Math.min(24, Number(process.argv[2]) || 20));

/** DB enum difficulty vs. label do banco expert. */
const DIFFICULTY_LABEL_TO_DB = {
  basico: 'facil',
  intermediario: 'medio',
  avancado: 'dificil',
  facil: 'facil',
  medio: 'medio',
  dificil: 'dificil',
};
const DIFFICULTY_TO_LABEL = {
  facil: 'basico',
  medio: 'intermediario',
  dificil: 'avancado',
  basico: 'basico',
  intermediario: 'intermediario',
  avancado: 'avancado',
};

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

/**
 * Corrige duplicações comuns quando o autor do master incluiu "anos" após
 * {{age}}, que já traz "anos" embutido — não deve haver "anos anos", nem
 * "meses meses", etc. Também aparência de espaços duplicados.
 */
function cleanText(text) {
  return String(text)
    .replace(/\banos\s+anos\b/gi, 'anos')
    .replace(/\bmeses\s+meses\b/gi, 'meses')
    .replace(/\bdias\s+dias\b/gi, 'dias')
    .replace(/\banos\s+de idade\b/gi, 'anos')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
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
      ? Math.max(0.03, Math.round(jitter(baseAge, 0.2, rnd, baseAge < 2 ? 2 : 0) * (baseAge < 2 ? 100 : 1)) / (baseAge < 2 ? 100 : 1))
      : Math.min(84, Math.max(20, Math.round(jitter(baseAge, 0.1, rnd, 0))));

  let ageLabel;
  if (track === 'nefropediatria' && age < (1 / 12)) {
    ageLabel = `${Math.max(1, Math.round(age * 365))} dias`;
  } else if (track === 'nefropediatria' && age < 1) {
    ageLabel = `${Math.max(1, Math.round(age * 12))} meses`;
  } else if (track === 'nefropediatria' && age < 2) {
    const meses = Math.round(age * 12);
    ageLabel = meses < 24 ? `${meses} meses` : `${Math.round(age)} anos`;
  } else {
    ageLabel = `${Math.round(age)} anos`;
  }

  const weight =
    track === 'nefropediatria'
      ? age < 1
        ? Math.max(3, Math.round((4 + age * 5) * 10) / 10)
        : age < 2
          ? Math.round(9 + age * 2)
          : Math.round(10 + age * 2.4 + rnd() * 3)
      : Math.round(56 + rnd() * 34);

  const vars = {
    sexWord,
    sexAdj,
    age: ageLabel,
    ageNum: Math.round(age),
    weight,
    ...(master.vars
      ? Object.fromEntries(
          Object.entries(master.vars).map(([k, v]) => {
            if (typeof v !== 'number') return [k, v];
            // Não distorcer pH / gaps / contagens críticas / PTH / plaquetas
            if (/^(ph|gap|plaq|ck|pth|c3|c4|hco3|pco2|na|cl|k)$/i.test(k)) return [k, v];
            const digits = /^(alb|cr|cr0|cr1|fena|mg|hb|tfg|upcr|uacr|prot|p|fe|ferritina|tsat|ca|ua)$/i.test(k)
              ? 1
              : String(v).includes('.')
                ? 1
                : 0;
            return [k, jitter(v, 0.05, rnd, digits)];
          })
        )
      : {}),
  };

  const statement = cleanText(applyVars(master.statement, vars));
  const letters = track === 'nefropediatria' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];
  const options = letters.map((L) => cleanText(applyVars(master.options[L] || '', vars)));
  while (options.length < 5) options.push('');

  const idNum = String(index * VARIATIONS + variant + 1).padStart(6, '0');
  const prefix = track === 'nefropediatria' ? 'nefroped' : 'nefroadv';
  const trackTag = track === 'nefropediatria' ? 'nefropediatria' : 'nefrologia-avancada';
  const specialty =
    track === 'nefropediatria' ? 'Nefrologia Pediátrica' : 'Nefrologia';

  const label = DIFFICULTY_TO_LABEL[master.dificuldade] || 'intermediario';
  const difficulty = DIFFICULTY_LABEL_TO_DB[master.dificuldade] || 'medio';

  const tags = [
    'MedRank',
    'original',
    'banco-expert',
    'estilo-SBN',
    track === 'nefropediatria' ? 'estilo-SBNPed' : 'titulo-nefrologia',
    trackTag,
    `nivel-${label}`,
    master.tema,
    master.subtema,
  ].filter(Boolean);

  return {
    id: `${prefix}-x-${idNum}`,
    statement,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    option_e: options[4] || '',
    correct_option: master.correct,
    explanation: cleanText(applyVars(master.explanation, vars)),
    source: 'MedRank Expert',
    year: 2026,
    specialty,
    topic: master.tema,
    subtopic: master.subtema,
    difficulty,
    tags,
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
    /\banos anos\b/i,
    /\{\{[a-z0-9_]+\}\}/i, // placeholder não resolvido
  ];
  for (const q of qs) {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c}\n${q.option_d}\n${q.option_e}\n${q.explanation}`;
    for (const re of bad) {
      if (re.test(blob)) throw new Error(`[${label}] bad pattern ${re} em ${q.id}: ${blob.slice(0, 200)}`);
    }
    if ((q.statement || '').length < 70) throw new Error(`[${label}] stem curto ${q.id}: ${q.statement}`);
    if (!q.option_a || !q.option_b || !q.option_c || !q.option_d) {
      throw new Error(`[${label}] opção vazia em ${q.id}`);
    }
    if (label === 'adv' && !q.option_e) {
      throw new Error(`[${label}] opção E vazia em ${q.id}`);
    }
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_option)) {
      throw new Error(`[${label}] gabarito inválido em ${q.id}: ${q.correct_option}`);
    }
    if (!['facil', 'medio', 'dificil'].includes(q.difficulty)) {
      throw new Error(`[${label}] difficulty inválida em ${q.id}: ${q.difficulty}`);
    }
    if ((q.explanation || '').length < 100) {
      throw new Error(`[${label}] explicação curta em ${q.id}`);
    }
    // Opções com tamanho semelhante — evita gabarito óbvio por ser o parágrafo maior
    const lens = [q.option_a, q.option_b, q.option_c, q.option_d, q.option_e]
      .filter((t) => t && String(t).trim())
      .map((t) => String(t).length);
    const mx = Math.max(...lens);
    const mn = Math.min(...lens);
    if (mn < 45 || mx > mn * 2.5) {
      throw new Error(`[${label}] opções desbalanceadas em ${q.id}: ${lens.join(',')}`);
    }
  }
}

function writeBank(file, questions, meta) {
  const dist = { facil: 0, medio: 0, dificil: 0 };
  for (const q of questions) dist[q.difficulty] = (dist[q.difficulty] || 0) + 1;
  const payload = {
    meta: {
      ...meta,
      count: questions.length,
      difficultyDistribution: dist,
      generatedAt: new Date().toISOString(),
      note: 'Casos clínicos expert MedRank — inéditos, não cópia de prova oficial',
    },
    questions,
  };
  fs.writeFileSync(path.join(ROOT, 'data', file), JSON.stringify(payload));
  return dist;
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

if (PED_MASTERS.length < 280) throw new Error(`Poucos masters pediátricos (${PED_MASTERS.length}); mínimo 280`);
if (ADV_MASTERS.length < 320) throw new Error(`Poucos masters adultos (${ADV_MASTERS.length}); mínimo 320`);

const ped = buildTrack(PED_MASTERS, 'nefropediatria');
const adv = buildTrack(ADV_MASTERS, 'nefrologia-avancada');
assertQuality(ped, 'ped');
assertQuality(adv, 'adv');

const pedDist = writeBank('nefropediatria-questions.json', ped, {
  track: 'nefropediatria',
  masters: PED_MASTERS.length,
  variations: VARIATIONS,
});
const advDist = writeBank('nefrologia-avancada-questions.json', adv, {
  track: 'nefrologia-avancada',
  masters: ADV_MASTERS.length,
  variations: VARIATIONS,
});
writeRich('nefropediatria-rich-sample.json', PED_MASTERS, 'nefropediatria');
writeRich('nefrologia-avancada-rich-sample.json', ADV_MASTERS, 'nefrologia-avancada');

console.log(
  JSON.stringify(
    {
      variations: VARIATIONS,
      ped: { masters: PED_MASTERS.length, questions: ped.length, difficulty: pedDist },
      adv: { masters: ADV_MASTERS.length, questions: adv.length, difficulty: advDist },
    },
    null,
    2
  )
);
