#!/usr/bin/env node
/**
 * Equilibra opções dos masters expert:
 * - gabarito não fica sempre em B
 * - correta deixa de ser um parágrafo-aula (aula vai para explanation)
 * - distratores passam a ter tamanho e plausibilidade semelhantes
 *
 * Uso: node scripts/polish-expert-options.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);

const FILES = [
  { file: 'expert-masters-nefrologia.cjs', exportName: 'ADV_MASTERS', letters: 5 },
  { file: 'expert-masters-nefrologia-extra.cjs', exportName: 'ADV_MASTERS_EXTRA', letters: 5 },
  { file: 'expert-masters-nefrologia-extra2.cjs', exportName: 'ADV_MASTERS_EXTRA2', letters: 5 },
  { file: 'expert-masters-nefrologia-extra3.cjs', exportName: 'ADV_MASTERS_EXTRA3', letters: 5 },
  { file: 'expert-masters-nefrologia-extra4.cjs', exportName: 'ADV_MASTERS_EXTRA4', letters: 5 },
  { file: 'expert-masters-nefropediatria.cjs', exportName: 'PED_MASTERS', letters: 4 },
  { file: 'expert-masters-nefropediatria-extra.cjs', exportName: 'PED_MASTERS_EXTRA', letters: 4 },
  { file: 'expert-masters-nefropediatria-extra2.cjs', exportName: 'PED_MASTERS_EXTRA2', letters: 4 },
  { file: 'expert-masters-nefropediatria-extra3.cjs', exportName: 'PED_MASTERS_EXTRA3', letters: 4 },
  { file: 'expert-masters-nefropediatria-extra4.cjs', exportName: 'PED_MASTERS_EXTRA4', letters: 4 },
  { file: 'expert-masters-residencia.cjs', exportName: 'RES_MASTERS', letters: 5 },
  { file: 'expert-masters-residencia-extra.cjs', exportName: 'RES_MASTERS_EXTRA', letters: 5 },
];

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashId(id) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Extrai a conduta principal; remove aula embutida — mas guarda ≥2 cláusulas clínicas. */
function shortenCorrect(text) {
  let t = String(text).trim();
  if (t.length <= 165) return t;

  if (t.includes(':')) {
    const [head, ...rest] = t.split(':');
    const tail = rest.join(':').trim();
    if (head.length < 90 && tail.length > 40) {
      t = `${head.trim()}: ${tail}`;
    }
  }

  const clauses = t
    .split(/[;—]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (clauses.length >= 2) {
    let acc = clauses[0];
    for (let i = 1; i < clauses.length; i++) {
      const next = `${acc}; ${clauses[i]}`;
      if (next.length > 185) break;
      acc = next;
    }
    if (acc.length >= 70) return acc;
  }

  if (t.length > 190) t = t.slice(0, 187).replace(/\s+\S*$/, '') + '…';
  return t;
}

function ensureMinLength(text, minLen, pad) {
  let t = String(text || '').trim();
  if (t.length >= minLen) return t;
  return `${t}${t.endsWith('.') ? '' : '.'} ${pad}`.trim();
}

function isTooShort(text, targetLen) {
  const t = String(text || '').trim();
  return t.length < 45 || t.length < targetLen * 0.55;
}

function isAbsurd(text) {
  return /^(AINE|Nefrectomia|Observação|Alta ambulatorial|Dobrar a dose|Suspender água|Corticoide|Antibiótico|Diálise|SIADH|ADPKD|Tolvaptan|Eculizumab|Ignorar)\b/i.test(
    String(text || '').trim()
  ) || String(text || '').trim().length < 25;
}

/** Distratores clinicamente plausíveis, comprimento ~ alvo. */
function buildDistractors(master, correctShort, n, rnd) {
  const tema = `${master.tema || ''} ${master.subtema || ''} ${master.specialty || ''}`.toLowerCase();
  const pool = [];

  const add = (s) => {
    const t = s.trim();
    if (t.length >= 50 && t !== correctShort) pool.push(t);
  };

  // Famílias genéricas de erro clínico (com detalhe suficiente)
  add(
    'Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses'
  );
  add(
    'Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos'
  );
  add(
    'Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação'
  );
  add(
    'Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes'
  );
  add(
    'Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação'
  );
  add(
    'Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica'
  );
  add(
    'Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes'
  );
  add(
    'Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio'
  );
  add(
    'Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)'
  );
  add(
    'Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica'
  );

  if (/metformin|antidiab|sglt|glp|dm|diabet/i.test(tema + correctShort)) {
    add('Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual');
    add('Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático');
    add('Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico');
    add('Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia');
  }
  if (/hipertens|crise|has|press/i.test(tema + correctShort)) {
    add('Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo');
    add('Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado');
    add('Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV');
    add('Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão');
  }
  if (/lit[ií]ase|cálculo|urico|oxalat|cistin/i.test(tema + correctShort)) {
    add('Acidificar a urina e restringir água para “concentrar” o tratamento litolítico, com AINE contínuo');
    add('Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada');
    add('Usar apenas analgésico e observação, sem metafiilaxia nem ajuste do pH urinário quando indicado');
    add('Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição');
  }
  if (/sepse|infec|antibiot|mening|pneumo/i.test(tema + correctShort)) {
    add('Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica');
    add('Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana');
    add('Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável');
  }
  if (/asma|dpoc|respir/i.test(tema + correctShort)) {
    add('Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico');
    add('Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação');
  }
  if (/di[aá]lise|transplante|rejei/i.test(tema + correctShort)) {
    add('Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina');
    add('Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido');
  }
  if (/pediatr|crian|lactente|rn\b/i.test(tema + master.specialty || '')) {
    add('Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas');
    add('Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado');
  }
  if (/obstetr|pr[eé]-ecl|gest|parto|hpp/i.test(tema + correctShort)) {
    add('Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos');
    add('Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura');
  }

  // Mistura + padding para atingir comprimento semelhante
  const unique = [...new Set(pool)];
  const picked = shuffle(unique, rnd).slice(0, Math.max(n + 3, n));
  const out = [];
  for (let i = 0; i < n; i++) {
    let d = picked[i % picked.length];
    // variar levemente para não repetir idêntico
    if (out.includes(d)) d = d.replace(/\.$/, '') + ', reavaliando apenas se houver nova intercorrência clínica';
    // aproximar comprimento do correto (±20%)
    const target = correctShort.length;
    if (d.length < target * 0.85) {
      d = `${d} Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.`;
    }
    if (d.length > target * 1.35) {
      d = d.slice(0, Math.floor(target * 1.2)).replace(/\s+\S*$/, '') + '.';
    }
    out.push(d);
  }
  return out;
}

function polishMaster(master, nLetters, rnd) {
  const letters = nLetters === 4 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];
  const oldCorrect = master.correct || 'B';
  const rawCorrect = master.options?.[oldCorrect] || master.options?.B || '';
  let shortCorrect = shortenCorrect(rawCorrect);
  shortCorrect = ensureMinLength(
    shortCorrect,
    70,
    'Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso'
  );
  // alvo de comprimento para distratores
  const targetLen = Math.max(90, Math.min(160, shortCorrect.length));

  let explanation = String(master.explanation || '').trim();
  if (rawCorrect.length > shortCorrect.length + 40) {
    const extra = ` Gabarito detalhado: ${rawCorrect}`;
    if (!explanation.includes(rawCorrect.slice(0, 60))) {
      explanation = (explanation + extra).trim();
    }
  }
  if (explanation.length < 100) {
    explanation +=
      ' Distratores representam erros clínicos comuns (timing, dose, classe terapêutica ou invasividade inadequada), não absurdos óbvios.';
  }

  const distractorsNeeded = letters.length - 1;
  let distractors = buildDistractors(master, shortCorrect, distractorsNeeded, rnd);

  // Só reaproveita distrator antigo se já tiver comprimento e não for absurdo
  const oldDistractors = letters
    .filter((L) => L !== oldCorrect)
    .map((L) => String(master.options?.[L] || '').trim())
    .filter((t) => !isAbsurd(t) && t.length >= targetLen * 0.7);
  for (let i = 0; i < distractors.length && i < oldDistractors.length; i++) {
    let t = ensureMinLength(
      oldDistractors[i],
      Math.floor(targetLen * 0.85),
      'estratégia que não aborda o mecanismo principal deste caso'
    );
    if (t.length > targetLen * 1.35) {
      t = t.slice(0, Math.floor(targetLen * 1.2)).replace(/\s+\S*$/, '') + '.';
    }
    distractors[i] = t;
  }

  // Normaliza todos os distratores ao alvo
  distractors = distractors.map((d) => {
    let t = ensureMinLength(d, Math.floor(targetLen * 0.85), 'abordagem inadequada para o cenário clínico descrito');
    if (t.length > targetLen * 1.4) {
      t = t.slice(0, Math.floor(targetLen * 1.25)).replace(/\s+\S*$/, '') + '.';
    }
    return t;
  });

  shortCorrect = ensureMinLength(shortCorrect, Math.floor(targetLen * 0.85), 'conduta preferencial neste contexto');
  if (shortCorrect.length > targetLen * 1.4) {
    shortCorrect = shortCorrect.slice(0, Math.floor(targetLen * 1.25)).replace(/\s+\S*$/, '') + '.';
  }

  const items = [{ text: shortCorrect, correct: true }, ...distractors.map((text) => ({ text, correct: false }))];
  const seen = new Set();
  for (const it of items) {
    let base = it.text;
    let k = 0;
    while (seen.has(base)) {
      k += 1;
      base = `${it.text} (alternativa ${k} no diferencial)`;
    }
    seen.add(base);
    it.text = base;
  }

  const shuffled = shuffle(items, rnd);
  const options = {};
  let correct = 'A';
  shuffled.forEach((it, i) => {
    options[letters[i]] = it.text;
    if (it.correct) correct = letters[i];
  });

  return {
    ...master,
    options,
    correct,
    explanation,
  };
}

function ser(v, indent = 0) {
  const sp = '  '.repeat(indent);
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (v === null) return 'null';
  if (Array.isArray(v)) {
    return '[\n' + v.map((x) => sp + '  ' + ser(x, indent + 1)).join(',\n') + '\n' + sp + ']';
  }
  if (typeof v === 'object') {
    return (
      '{\n' +
      Object.keys(v)
        .map((k) => {
          const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : JSON.stringify(k);
          return sp + '  ' + key + ': ' + ser(v[k], indent + 1);
        })
        .join(',\n') +
      '\n' +
      sp +
      '}'
    );
  }
  return String(v);
}

function headerFor(exportName) {
  if (exportName.startsWith('PED')) return 'Casos-mestres — Nefrologia Pediátrica (opções equilibradas).';
  if (exportName.startsWith('ADV')) return 'Casos-mestres — Nefrologia adulta (opções equilibradas).';
  if (exportName.startsWith('RES')) return 'Masters EXPERT — Residência (opções equilibradas).';
  return 'Masters expert MedRank.';
}

function assertBalance(list, nLetters, label) {
  const letters = nLetters === 4 ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C', 'D', 'E'];
  const dist = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  let bad = 0;
  for (const m of list) {
    dist[m.correct] = (dist[m.correct] || 0) + 1;
    const lens = letters.map((L) => (m.options[L] || '').length);
    const mx = Math.max(...lens);
    const mn = Math.min(...lens);
    if (mn < 45 || mx > mn * 2.4) {
      bad += 1;
      if (bad <= 5) console.warn(label, m.id, lens, m.correct);
    }
  }
  console.log(label, { n: list.length, dist, badBalance: bad });
  if (bad > list.length * 0.08) throw new Error(`${label}: ainda desbalanceado (${bad})`);
  if (dist.B / list.length > 0.45) throw new Error(`${label}: ainda enviesado para B`);
}

let total = 0;
for (const { file, exportName, letters } of FILES) {
  const full = path.join(ROOT, file);
  delete require.cache[require.resolve(full)];
  const mod = require(full);
  const list = mod[exportName];
  if (!Array.isArray(list)) throw new Error(`Sem array ${exportName} em ${file}`);

  const polished = list.map((m) => {
    const rnd = mulberry32(hashId(String(m.id || Math.random())));
    return polishMaster(m, letters, rnd);
  });
  assertBalance(polished, letters, exportName);

  const body = `/**\n * ${headerFor(exportName)}\n * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.\n */\nconst ${exportName} = ${ser(polished)};\n\nmodule.exports = { ${exportName} };\n`;
  fs.writeFileSync(full, body);
  total += polished.length;
  console.log('wrote', file, polished.length);
}

console.log(JSON.stringify({ polishedMasters: total }, null, 2));
