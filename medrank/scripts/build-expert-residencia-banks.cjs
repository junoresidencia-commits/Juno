#!/usr/bin/env node
/**
 * Banco EXPERT — Residência médica (disputa geral / outras ligas).
 * Especialidades: Clínica Médica, Pediatria, Cirurgia, GO, Preventiva/MFC, Cardiologia.
 *
 * Uso: node scripts/build-expert-residencia-banks.cjs [VARIATIONS]
 */
const fs = require('fs');
const path = require('path');
const { RES_MASTERS } = require('./expert-masters-residencia.cjs');

const ROOT = path.join(__dirname, '..');
const VARIATIONS = Math.max(6, Math.min(20, Number(process.argv[2]) || 10));

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

function cleanText(text) {
  return String(text)
    .replace(/\banos\s+anos\b/gi, 'anos')
    .replace(/\bmeses\s+meses\b/gi, 'meses')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function expandMaster(master, index, variant, rnd) {
  const ped = master.specialty === 'Pediatria';
  const sex = variant % 2 === 0 ? 'M' : 'F';
  const sexWord = ped ? (sex === 'M' ? 'Menino' : 'Menina') : sex === 'M' ? 'Homem' : 'Mulher';
  const sexAdj = sex === 'M' ? 'masculino' : 'feminino';

  const baseAge = master.age ?? (ped ? 5 : 48);
  const age = ped
    ? Math.max(0.05, Math.round(jitter(baseAge, 0.18, rnd, baseAge < 2 ? 2 : 0) * (baseAge < 2 ? 100 : 1)) / (baseAge < 2 ? 100 : 1))
    : Math.min(82, Math.max(18, Math.round(jitter(baseAge, 0.1, rnd, 0))));

  let ageLabel;
  if (ped && age < 1) ageLabel = `${Math.max(1, Math.round(age * 12))} meses`;
  else ageLabel = `${Math.round(age)} anos`;

  const weight = ped
    ? age < 1
      ? Math.max(3, Math.round((4 + age * 5) * 10) / 10)
      : Math.round(10 + age * 2.3 + rnd() * 3)
    : Math.round(55 + rnd() * 35);

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
            if (/^(ph|gap|plaq|ck|pth|c3|c4|hco3|pco2|na|cl|k|fc|fr|pas|pad)$/i.test(k)) return [k, v];
            const digits = /^(alb|cr|hb|tfg|upcr|glic|inr|lactato|temp)$/i.test(k) ? 1 : String(v).includes('.') ? 1 : 0;
            return [k, jitter(v, 0.05, rnd, digits)];
          })
        )
      : {}),
  };

  const statement = cleanText(applyVars(master.statement, vars));
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const options = letters.map((L) => cleanText(applyVars(master.options[L] || '', vars)));

  const idNum = String(index * VARIATIONS + variant + 1).padStart(6, '0');
  const label = DIFFICULTY_TO_LABEL[master.dificuldade] || 'intermediario';
  const difficulty = DIFFICULTY_LABEL_TO_DB[master.dificuldade] || 'medio';

  const tags = [
    'MedRank',
    'original',
    'banco-expert',
    'residencia-expert',
    'estilo-residencia',
    `esp-${(master.specialty || 'geral').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`,
    `nivel-${label}`,
    master.tema,
    master.subtema,
  ].filter(Boolean);

  return {
    id: `resid-x-${idNum}`,
    statement,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    option_e: options[4],
    correct_option: master.correct,
    explanation: cleanText(applyVars(master.explanation, vars)),
    source: 'MedRank Expert Residência',
    year: 2026,
    specialty: master.specialty,
    topic: master.tema,
    subtopic: master.subtema,
    difficulty,
    tags,
    image_url: null,
    bibliography: master.bibliography || null,
  };
}

function assertQuality(qs) {
  const bad = [
    /em avaliação de .+ — foco:/i,
    /Labs e contexto compatíveis/i,
    /Conduta alinhada a guidelines/i,
    /\{\{[a-z0-9_]+\}\}/i,
    /\banos anos\b/i,
  ];
  for (const q of qs) {
    const blob = `${q.statement}\n${q.option_a}\n${q.option_b}\n${q.option_c}\n${q.option_d}\n${q.option_e}\n${q.explanation}`;
    for (const re of bad) {
      if (re.test(blob)) throw new Error(`bad pattern ${re} em ${q.id}`);
    }
    if ((q.statement || '').length < 70) throw new Error(`stem curto ${q.id}`);
    if (!q.option_a || !q.option_b || !q.option_c || !q.option_d || !q.option_e) {
      throw new Error(`opção vazia ${q.id}`);
    }
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_option)) throw new Error(`gabarito ${q.id}`);
    if ((q.explanation || '').length < 100) throw new Error(`explicação curta ${q.id}`);
    if (!q.tags.includes('residencia-expert')) throw new Error(`tag residencia-expert ausente ${q.id}`);
  }
}

if (RES_MASTERS.length < 100) {
  throw new Error(`Poucos masters de residência (${RES_MASTERS.length}); mínimo 100`);
}

const questions = [];
RES_MASTERS.forEach((m, i) => {
  for (let v = 0; v < VARIATIONS; v++) {
    const rnd = mulberry32(500000 + i * 991 + v * 17);
    questions.push(expandMaster(m, i, v, rnd));
  }
});
assertQuality(questions);

const dist = { facil: 0, medio: 0, dificil: 0 };
const bySpec = {};
for (const q of questions) {
  dist[q.difficulty] = (dist[q.difficulty] || 0) + 1;
  bySpec[q.specialty] = (bySpec[q.specialty] || 0) + 1;
}

const payload = {
  meta: {
    track: 'residencia-geral',
    masters: RES_MASTERS.length,
    variations: VARIATIONS,
    count: questions.length,
    difficultyDistribution: dist,
    bySpecialty: bySpec,
    generatedAt: new Date().toISOString(),
    note: 'Expert residência MedRank — disputa geral (não Liga de Nefrologia)',
  },
  questions,
};

fs.writeFileSync(path.join(ROOT, 'data', 'residencia-expert-questions.json'), JSON.stringify(payload));
console.log(JSON.stringify({ variations: VARIATIONS, masters: RES_MASTERS.length, questions: questions.length, difficulty: dist, bySpecialty: bySpec }, null, 2));
