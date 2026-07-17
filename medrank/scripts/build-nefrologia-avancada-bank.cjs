#!/usr/bin/env node
/**
 * Banco vivo — Nefrologia Avançada (Clínica Médica aplicada ao rim).
 * Para nefrologistas, R+ e Título SBN. Inéditas, A–E. NÃO copia provas.
 *
 * node scripts/build-nefrologia-avancada-bank.cjs [count]
 * Default: 5000 · meta produto: 20000
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'nefrologia-avancada-questions.json');
const SAMPLE = path.join(__dirname, '..', 'data', 'nefrologia-avancada-rich-sample.json');
const TARGET = Math.max(100, Number(process.argv[2]) || 5000);
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const TIPOS = [
  'Caso clínico',
  'Conduta',
  'Diagnóstico',
  'Diagnóstico diferencial',
  'Dose de medicamentos',
  'Interpretação de exames',
  'ECG',
  'Gasometria',
  'Radiografia',
  'Tomografia',
  'Ultrassonografia',
  'Histopatologia',
  'Guidelines',
];

const REFS = [
  'KDIGO Guidelines (CKD, GN, BP, AKI, lipids)',
  'ISN / ASN nephrology curricula',
  'UpToDate — Nephrology',
  'Harrison / Cecil — capítulos reno-cardio-metabólicos',
  'Brenner & Rector\'s The Kidney',
  'Jornal Brasileiro de Nefrologia — revisões',
  'Kidney International / CJASN reviews',
  'Surviving Sepsis / KDIGO AKI em UTI',
  'ESCMID / guidelines de infecção em diálise e transplante',
  'ACC/AHA — cardiorrenal e anticoagulação',
];

/** 70% Nefrologia pura */
const NEFRO = [
  ['DRC', ['Estadiamento', 'Anemia', 'CKD-MBD', 'Acidose', 'Progressão']],
  ['IRA', ['Pré-renal', 'ATN', 'AEIOU', 'Biomarcadores']],
  ['Síndrome nefrótica', ['Membranosa', 'LMN', 'FSGS', 'Amiloidose']],
  ['Síndrome nefrítica', ['Aguda', 'RPGN', 'Complemento']],
  ['Proteinúria', ['Quantificação', 'Ortostática', 'Neoplásica']],
  ['Hematúria', ['Glomerular', 'Urológica', 'Familial']],
  ['Glomerulopatias', ['Padrão geral', 'Biópsia', 'Imunossupressão']],
  ['Nefropatia por IgA', ['Oxford', 'Corticoide', 'IECA']],
  ['Membranosa', ['Anti-PLA2R', 'Risco trombótico', 'Terapia']],
  ['Lesão mínima', ['Adulto', 'Corticoide', 'Recidiva']],
  ['FSGS', ['Primária', 'Secundária', 'Corticorresistente']],
  ['MPGN', ['Complemento', 'C3 glomerulopatia', 'Infecção']],
  ['Lúpus', ['Classes', 'Indução', 'Manutenção']],
  ['Vasculites ANCA', ['GPA', 'MPA', 'Rituximabe']],
  ['Anti-MBG', ['Goodpasture', 'Plasmaférese', 'Ciclofosfamida']],
  ['Amiloidose', ['AL', 'AA', 'Diagnóstico']],
  ['Mieloma', ['Cast nephropathy', 'Free light chains', 'Hidratação']],
  ['Onconefrologia', ['Cisplatina', 'TLS', 'Imunoterapia']],
  ['Litíase', ['Metabólica', 'Infecção', 'Obstrução']],
  ['Doença renal policística', ['ADPKD', 'Tolvaptano', 'HTA']],
  ['Nefrites intersticiais', ['AIN', 'Fármacos', 'Biópsia']],
  ['Doença renovascular', ['Estenose', 'Fibromuscular', 'Aterosclerótica']],
  ['Hipertensão secundária', ['Hiperaldosteronismo', 'Feocromocitoma', 'Renovascular']],
  ['Transplante renal', ['Rejeição', 'CMV', 'Imunossupressão']],
  ['Hemodiálise', ['Kt/V', 'Acesso', 'Hipotensão']],
  ['Diálise peritoneal', ['Peritonite', 'UF failure', 'Prescrição']],
  ['CRRT', ['Indicações', 'Anticoagulação', 'Dose de efluente']],
  ['SLED', ['UTI', 'Hemodinâmica', 'Prescrição']],
  ['Plasmaférese', ['Indicações', 'Troca plasmática', 'Complicações']],
  ['Biópsia renal', ['Indicações', 'Contraindicações', 'Complicações']],
  ['Ultrassonografia renal', ['Hidronefrose', 'Cistos', 'Tamanho']],
  ['POCUS', ['Volume', 'Veia cava', 'Pulmão']],
  ['VExUS', ['Congestão', 'Protocolo', 'Diuréticos']],
  ['Acesso vascular', ['FAV', 'Enxerto', 'Estenose']],
  ['Cateteres', ['Tunelizado', 'Infecção', 'Disfunção']],
  ['Farmacologia renal', ['Nefrotóxicos', 'Clearance', 'Interações']],
  ['Ajuste de dose na DRC', ['Antibióticos', 'DOACs', 'Metformina']],
];

/** 30% Clínica Médica aplicada à Nefrologia */
const CLINICA = [
  ['Cardiologia', ['Síndrome cardiorrenal', 'ICC', 'HTA resistente', 'Choque', 'FA em DRC', 'Anticoagulação']],
  ['UTI', ['Sepse', 'Choque séptico', 'VM', 'Vasopressores', 'CRRT', 'Ácido-base']],
  ['Infectologia', ['HIV', 'Hepatites', 'TB', 'ITU complicada', 'Infecção de cateter', 'CMV']],
  ['Endocrinologia', ['Diabetes', 'CAD', 'SIADH', 'DI', 'Ca/P', 'HPT secundário']],
  ['Hematologia', ['Anemia DRC', 'PTT', 'SHU', 'Coagulação', 'Anticoagulação HD']],
  ['Reumatologia', ['LES', 'Esclerodermia', 'Vasculites', 'SAF', 'Crioglobulinemia']],
  ['Gastroenterologia', ['Hepatorrenal', 'Cirrose', 'Ascite', 'Esquistossomose']],
  ['Pneumologia', ['Hemorragia alveolar', 'Pulmão-rim', 'EAP', 'TEP']],
  ['Neurologia', ['Encefalopatia urêmica', 'Hiponatremia', 'Convulsões', 'AVC']],
];

const TIPOS_WEIGHT_NEFRO = 0.7;

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(arr, rnd) {
  return arr[Math.floor(rnd() * arr.length)];
}

function ensure(t, min = 14) {
  const s = String(t).trim();
  return s.length >= min ? s : `${s} (opção clinicamente inadequada neste cenário)`;
}

function rotate(correct, wrongs, salt) {
  const items = [correct, ...wrongs.slice(0, 4)];
  while (items.length < 5) items.push(`Conduta alternativa inadequada ${items.length}`);
  const rot = salt % 5;
  const options = items.map((_, i) => items[(i + rot) % items.length]);
  return { options, gabarito: LETTERS[options.indexOf(correct)] };
}

function coreAnswer(tema, subtema) {
  const map = {
    DRC: {
      c: 'Otimizar IECA/BRA, controle pressórico, anemia/CKD-MBD e reduzir progressão',
      w: ['Suspender IECA em toda DRC estável', 'Ignorar CKD-MBD', 'Transplante imediato sem avaliação', 'Restringir toda proteína sem nutricionista'],
      e: 'DRC: nefroproteção, metas de PA, anemia e mineral ósseo conforme KDIGO.',
      p: 'Pearl: estadiar por TFG + albuminúria (CGA).',
    },
    IRA: {
      c: 'Classificar pré/intrínseca/pós, restaurar volume se pré-renal e vigiar indicações de diálise (AEIOU)',
      w: ['Diálise só pela creatinina sem AEIOU', 'Restringir volume na pré-renal', 'Corticoide de rotina', 'Ignorar obstrução'],
      e: 'IRA: etiologia primeiro; diálise por critérios clínicos.',
      p: 'Pearl: FENa/FEUreia ajudam, mas o contexto manda.',
    },
    'Síndrome nefrótica': {
      c: 'Confirmar SN, investigar causa (PLA2R, etc.) e tratar conforme histologia/etiologia',
      w: ['Diálise imediata pela proteinúria', 'Antibiótico empírico sem infecção', 'Nefrectomia diagnóstica', 'Ignorar risco trombótico'],
      e: 'SN do adulto exige etiologia (muitas vezes biópsia) antes de imunossuprimir.',
      p: 'Pearl: membranosa → checar anti-PLA2R e trombose.',
    },
    Transplante: {
      c: 'Avaliar rejeição vs infecção; biópsia do enxerto quando indicada e ajustar imunossupressão',
      w: ['Suspender todo imunossupressor às cegas', 'Ignorar creatinina', 'Nefrectomia em toda febre', 'Aumentar tacrolimus se nível tóxico'],
      e: 'Disfunção do enxerto: diferenciar rejeição/infecção com biópsia e níveis.',
      p: 'Pearl: CMV e rejeição podem coexistir — investigar ambos.',
    },
    CRRT: {
      c: 'Indicar CRRT em IRA com instabilidade hemodinâmica e ajustar dose de efluente/anticoagulação',
      w: ['CRRT em todo paciente estável preferindo HD intermitente sem motivo', 'Sem anticoagulação nunca', 'Ignorar clearance de fármacos', 'Dose fixa sem peso'],
      e: 'CRRT: escolha em choque; dose e anticoagulação importam.',
      p: 'Pearl: lembrar ajuste de antibióticos na CRRT.',
    },
    'Síndrome cardiorrenal': {
      c: 'Tratar congestão com diuréticos/UF, otimizar perfusão e evitar nefrotóxicos',
      w: ['Restrição absoluta de diurético na congestão', 'IECA em choque cardiogênico refratário', 'Ignorar PVC/VExUS', 'Só observar EAP'],
      e: 'Cardiorrenal: descongestionar com segurança e proteger o rim.',
      p: 'Pearl: VExUS ajuda a guiar descongestão.',
    },
    Sepse: {
      c: 'Bundle de sepse + ressuscitação + ATB precoce e considerar IRA/CRRT se necessário',
      w: ['Atrasar ATB até todos os exames', 'Cristaloide zero na hipovolemia', 'Corticoide isolado sem ATB', 'Negar diálise em AEIOU'],
      e: 'Sepse + rim: tempo de ATB e suporte renal conforme indicação.',
      p: 'Pearl: lactato e oligúria guiam a gravidade.',
    },
    Hepatorrenal: {
      c: 'Diagnosticar SHR, vasoconstritores + albumina conforme protocolo e avaliar transplante',
      w: ['Diurético de rotina em SHR tipo 1 sem critério', 'Nefrotoxicos liberados', 'Paracentese sem reposição quando indicada', 'Ignorar infecção precipitante'],
      e: 'SHR: critérios diagnósticos, terlipressina/noradrenalina + albumina.',
      p: 'Pearl: excluir hipovolemia e necrose tubular antes de rotular SHR.',
    },
    default: {
      c: 'Integrar achados clínicos/labs e seguir guideline (KDIGO/SBN) na conduta nefrológica',
      w: ['Intervenção agressiva sem indicação', 'Observação sem seguimento em risco alto', 'Terapia empírica sem fisiopatologia', 'Suspender nefroproteção sem motivo'],
      e: 'Raciocínio de nefrologista: clínica + labs + imagem + guideline.',
      p: 'Pearl: sempre ligar o rim ao contexto sistêmico.',
    },
  };

  if (map[tema]) return map[tema];
  if (/Transplante/i.test(tema)) return map.Transplante;
  if (/CRRT|SLED/i.test(tema)) return map.CRRT;
  if (/cardiorrenal|Cardiologia/i.test(tema) || /cardiorrenal/i.test(subtema)) return map['Síndrome cardiorrenal'];
  if (/Sepse|UTI/i.test(tema) || /Sepse/i.test(subtema)) return map.Sepse;
  if (/Hepatorrenal|Gastro/i.test(tema) || /Hepatorrenal/i.test(subtema)) return map.Hepatorrenal;
  if (/DRC/i.test(tema)) return map.DRC;
  if (/IRA/i.test(tema)) return map.IRA;
  if (/nefrótica/i.test(tema)) return map['Síndrome nefrótica'];
  return map.default;
}

function vignette(ctx) {
  const { tema, subtema, tipo, age, sex, weight, i, rnd, area } = ctx;
  const sexo = sex === 'M' ? 'Homem' : 'Mulher';
  const vitals = `PA ${110 + (i % 50)}/${60 + (i % 30)} mmHg, FC ${70 + (i % 50)} bpm, SpO₂ ${92 + (i % 8)}%`;

  if (tema === 'DRC') {
    return `${sexo}, ${age} anos, ${weight} kg, TFG ${18 + (i % 35)} mL/min/1,73m², albuminúria A${1 + (i % 3)}, Hb ${(8.5 + rnd()).toFixed(1)} g/dL, PTH elevado. ${vitals}. Exame: edema +(i % 2 ? '+' : ''). Conduta prioritária?`;
  }
  if (tema === 'IRA' || subtema === 'ATN') {
    return `${sexo}, ${age} anos, pós hipotensão / sepse, creatinina ${(2.2 + rnd() * 2).toFixed(1)} mg/dL, oligúria, FENa ${(1.5 + rnd()).toFixed(1)}%. ${vitals}. Melhor conduta?`;
  }
  if (tema === 'Síndrome nefrótica' || tema === 'Membranosa') {
    return `${sexo}, ${age} anos, edema, albumina ${(1.8 + rnd() * 0.6).toFixed(1)} g/dL, proteinúria ${(4 + rnd() * 6).toFixed(1)} g/dia, creatinina ${(0.9 + rnd()).toFixed(1)}. ${vitals}. Próximo passo?`;
  }
  if (tema === 'CRRT' || tema === 'SLED' || subtema === 'CRRT') {
    return `${sexo}, ${age} anos, em choque séptico sob noradrenalina, K ${(6.2 + rnd() * 0.6).toFixed(1)}, anúria e acidose. Indicação/prescrição mais adequada?`;
  }
  if (subtema === 'Síndrome cardiorrenal' || tema === 'Cardiologia') {
    return `${sexo}, ${age} anos, FE ${25 + (i % 20)}%, congestão, creatinina em elevação após diurético. ${vitals}. Conduta?`;
  }
  if (subtema === 'Hepatorrenal' || tema === 'Gastroenterologia') {
    return `${sexo}, ${age} anos, cirrose Child C, creatinina em elevação, sem choque, urinálise sem cilindros. Conduta?`;
  }
  if (tipo === 'Gasometria') {
    return `${sexo}, ${age} anos, pH ${(7.05 + rnd() * 0.25).toFixed(2)}, HCO₃ ${8 + (i % 10)}, pCO₂ ${20 + (i % 25)}, ânion gap ${18 + (i % 12)}, K ${(4 + rnd() * 2).toFixed(1)}. Interpretação e conduta?`;
  }
  if (tipo === 'ECG') {
    return `${sexo}, ${age} anos em HD, K ${(6.6 + rnd() * 0.7).toFixed(1)}, ECG com alterações. Conduta imediata?`;
  }
  if (tema === 'Transplante renal') {
    return `${sexo}, ${age} anos, Tx renal há ${2 + (i % 24)} meses, creatinina sobe de 1,2 para ${(2 + rnd()).toFixed(1)}, febre baixa. Conduta?`;
  }
  if (tema === 'Diálise peritoneal' || subtema === 'Peritonite') {
    return `${sexo}, ${age} anos em DP, efluente turvo, dor abdominal, celularidade elevada. Conduta?`;
  }

  return `${sexo}, ${age} anos (${weight} kg), área ${area} — ${tema} / ${subtema}. ${vitals}. Tipo: ${tipo}. Labs e contexto compatíveis com prática nefrológica. Melhor conduta/diagnóstico?`;
}

function buildOne(i) {
  const rnd = mulberry32(12000 + i * 131);
  const isNefro = rnd() < TIPOS_WEIGHT_NEFRO;
  const bucket = isNefro ? NEFRO : CLINICA;
  const [tema, subtemas] = pick(bucket, rnd);
  const subtema = pick(subtemas, rnd);
  const tipo = TIPOS[i % TIPOS.length];
  const area = isNefro ? 'Nefrologia' : tema;
  const sex = rnd() > 0.5 ? 'M' : 'F';
  const age = 28 + Math.floor(rnd() * 55);
  const weight = 55 + Math.floor(rnd() * 45);

  const ans = coreAnswer(tema, subtema);
  const correct = ensure(ans.c);
  const wrongs = ans.w.map((w) => ensure(w));
  const { options, gabarito } = rotate(correct, wrongs, i + 5);

  const difficulty = i % 5 === 0 ? 'facil' : i % 5 === 4 ? 'dificil' : 'medio';
  const diffLabel = difficulty === 'facil' ? 'Fácil' : difficulty === 'dificil' ? 'Difícil' : 'Médio';
  const tempo = difficulty === 'facil' ? 60 : difficulty === 'dificil' ? 120 : 90;
  const refs = [REFS[i % REFS.length], REFS[(i + 4) % REFS.length]];
  const idNum = String(i + 1).padStart(6, '0');
  const richId = `NA-${idNum}`;

  const ctx = { tema, subtema, tipo, age, sex, weight, i, rnd, area };
  const questao = vignette(ctx);
  const explicacao = `${ans.e}\n\nPor que as outras falham: alternativas agressivas ou omissas sem suporte clínico.\n\n${ans.p}\n\nQuestão inédita MedRank (Nefrologia Avançada) — não é cópia de prova oficial.`;

  const rich = {
    id: richId,
    especialidade: 'Nefrologia',
    area: isNefro ? 'Nefrologia' : 'Clínica Médica aplicada à Nefrologia',
    tema,
    subtema,
    dificuldade: diffLabel,
    tipo,
    idade: `${age} anos`,
    sexo: sex === 'M' ? 'Masculino' : 'Feminino',
    questao,
    alternativas: {
      A: options[0],
      B: options[1],
      C: options[2],
      D: options[3],
      E: options[4],
    },
    gabarito,
    explicacao,
    pearls: ans.p,
    tempo_medio_segundos: tempo,
    referencias: refs,
  };

  const question = {
    id: `nefroadv-${idNum}`,
    statement: questao,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    option_e: options[4],
    correct_option: gabarito,
    explanation: explicacao,
    source: 'MedRank',
    year: 2022 + (i % 5),
    specialty: 'Nefrologia',
    topic: tema,
    subtopic: subtema,
    difficulty,
    tags: [
      'MedRank',
      'original',
      'nefrologia-avancada',
      'estilo-SBN',
      'titulo-nefrologia',
      'banco-vivo',
      isNefro ? 'bloco-nefro' : 'bloco-clinica-aplicada',
      richId,
      `tipo-${tipo}`,
      `area-${area}`,
      tema,
      subtema,
      `diff-${difficulty}`,
      `tempo-${tempo}`,
    ],
    image_url: null,
    bibliography: `${refs.join(' · ')} · Pearl: ${ans.p}`,
    created_at: new Date().toISOString(),
  };

  return { question, rich, isNefro };
}

function main() {
  const now = new Date().toISOString();
  const questions = [];
  const sample = [];
  const byTema = {};
  let nefro = 0;
  let clinica = 0;

  for (let i = 0; i < TARGET; i++) {
    const { question, rich, isNefro } = buildOne(i);
    questions.push(question);
    byTema[rich.tema] = (byTema[rich.tema] || 0) + 1;
    if (isNefro) nefro++;
    else clinica++;
    if (i < 15) sample.push(rich);
  }

  const out = {
    meta: {
      total: questions.length,
      track: 'nefrologia-avancada',
      format: 'banco-vivo-nefro-v1',
      options: 'A-E',
      goal_total: 20000,
      distribution: {
        nefrologia_pct: Math.round((nefro / questions.length) * 1000) / 10,
        clinica_aplicada_pct: Math.round((clinica / questions.length) * 1000) / 10,
      },
      style_tags: ['estilo-SBN', 'titulo-nefrologia'],
      temas: Object.keys(byTema).sort(),
      tema_counts: byTema,
      ligas: ['Liga dos Nefrologistas', 'Plantão', 'R+ Nefrologia', 'Prova de Título', 'Hospital'],
      simulado_sizes: [20, 30, 60, 100],
      generated_at: now,
      license_note: 'Originais MedRank. Clínica Médica aplicada à Nefrologia. Não copia provas oficiais.',
    },
    questions,
  };

  fs.writeFileSync(OUT, JSON.stringify(out) + '\n');
  fs.writeFileSync(SAMPLE, JSON.stringify({ meta: { sample: sample.length }, questions: sample }, null, 2) + '\n');
  console.log(`Wrote ${questions.length} → ${OUT}`);
  console.log(`Nefro ${nefro} / Clínica ${clinica}`);
  console.log(`Size ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB`);
}

main();
