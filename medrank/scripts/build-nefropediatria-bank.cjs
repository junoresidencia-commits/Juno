#!/usr/bin/env node
/**
 * Banco vivo MedRank — Nefrologia Pediátrica (Certificado SBN/SBP).
 * Objetos completos, inéditos, A–D. NÃO copia provas oficiais.
 *
 * node scripts/build-nefropediatria-bank.cjs [count]
 * Default: 5000
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'nefropediatria-questions.json');
const RICH_OUT = path.join(__dirname, '..', 'data', 'nefropediatria-rich-sample.json');
const TARGET = Math.max(100, Number(process.argv[2]) || 5000);
const LETTERS = ['A', 'B', 'C', 'D'];

const TIPOS = [
  'Caso clínico',
  'Diagnóstico',
  'Conduta',
  'Tratamento',
  'Dose medicamentosa',
  'Interpretação laboratorial',
  'Gasometria',
  'Eletrólitos',
  'ECG hidroeletrolítico',
  'Ultrassonografia',
  'Biópsia renal',
  'Guideline',
  'Revisão de artigo',
];

const REFS = [
  'KDIGO Clinical Practice Guidelines',
  'IPNA clinical practice recommendations',
  'Pediatric Nephrology (IPNA journal)',
  'Emma F et al. Pediatric Nephrology. 8th ed. Springer, 2022',
  'Rees L et al. Paediatric Nephrology. 3rd ed. OUP, 2019',
  'Schaefer F, Greenbaum LA. Pediatric Kidney Disease. 3rd ed. Springer, 2023',
  'Jornal Brasileiro de Nefrologia — revisões (últimos 5 anos)',
  'Jornal de Pediatria (SBP) — artigos educacionais',
  'Tratado de Pediatria SBP, 5ª ed.',
  'UpToDate — Nefrologia Pediátrica',
];

/** Temas do programa + subtemas e núcleos clínicos */
const THEMES = [
  { tema: 'Anatomia', subtemas: ['Córtex e medula', 'Nefron', 'Vascularização'] },
  { tema: 'Embriologia', subtemas: ['Metanefro', 'Broto ureteral', 'Malformação'] },
  { tema: 'Fisiologia renal', subtemas: ['TFG', 'Concentração urinária', 'Acidificação'] },
  { tema: 'Desenvolvimento renal', subtemas: ['RN', 'Prematuridade', 'Maturação tubular'] },
  { tema: 'IRA', subtemas: ['Pré-renal', 'Intrínseca', 'Pós-renal', 'AEIOU'] },
  { tema: 'DRC', subtemas: ['Estadiamento', 'Anemia', 'CKD-MBD', 'Crescimento'] },
  { tema: 'Proteinúria', subtemas: ['Ortostática', 'Persistente', 'Quantificação'] },
  { tema: 'Hematúria', subtemas: ['Macroscópica', 'Microscópica', 'Glomerular'] },
  { tema: 'Síndrome nefrótica', subtemas: ['Corticossensível', 'Corticorresistente', 'Recidiva', 'Lesão mínima'] },
  { tema: 'Glomerulonefrites', subtemas: ['Aguda', 'Rapidamente progressiva', 'Crônica'] },
  { tema: 'Nefropatia por IgA', subtemas: ['Hematúria sincrônica', 'Oxford', 'Conduta'] },
  { tema: 'GN pós-estreptocócica', subtemas: ['Latência', 'Hipocomplementemia', 'Suporte'] },
  { tema: 'Nefrite lúpica', subtemas: ['Classes ISN/RPS', 'Indução', 'Manutenção'] },
  { tema: 'SHU', subtemas: ['D+', 'Atípica', 'Suporte'] },
  { tema: 'Púrpura de Henoch-Schönlein', subtemas: ['Vasculite IgA', 'Nefrite', 'Seguimento'] },
  { tema: 'Hipertensão', subtemas: ['Percentis', 'Secundária', 'MAPA', 'Farmacoterapia'] },
  { tema: 'ITU', subtemas: ['Febril', 'Recorrente', 'Imagem', 'Profilaxia'] },
  { tema: 'Refluxo vesicoureteral', subtemas: ['Graus', 'Conservador', 'Cirurgia'] },
  { tema: 'Hidronefrose', subtemas: ['Antenatal', 'Pós-natal', 'Seguimento'] },
  { tema: 'Uropatias congênitas', subtemas: ['CAKUT', 'Megaureter', 'UPJ'] },
  { tema: 'Válvula de uretra posterior', subtemas: ['Diagnóstico', 'Desobstrução', 'DRC'] },
  { tema: 'Disfunção miccional', subtemas: ['Enurese', 'Constipação', 'Biofeedback'] },
  { tema: 'Bexiga neurogênica', subtemas: ['MMC', 'Cateterismo', 'Profilaxia'] },
  { tema: 'Litíase', subtemas: ['Cólica', 'Metabólica', 'Hidratação'] },
  { tema: 'Hipercalciúria', subtemas: ['Idiopática', 'Dieta', 'Tiazídico'] },
  { tema: 'Cistinúria', subtemas: ['Litíase', 'Alcalinização', 'Tiopronina'] },
  { tema: 'Hiperoxalúria', subtemas: ['Primária', 'Enterica', 'Oxalose'] },
  { tema: 'Acidose tubular', subtemas: ['Tipo 1', 'Tipo 2', 'Tipo 4'] },
  { tema: 'Bartter', subtemas: ['Neonatal', 'Clássico', 'Eletrólitos'] },
  { tema: 'Gitelman', subtemas: ['Hipomagnesemia', 'Adolescente', 'Reposição'] },
  { tema: 'Liddle', subtemas: ['HAS', 'ENaC', 'Amilorida'] },
  { tema: 'SIADH', subtemas: ['Hiponatremia', 'Restrição hídrica', 'Diagnóstico'] },
  { tema: 'Diabetes insipidus', subtemas: ['Central', 'Nefrogênico', 'Teste de privação'] },
  { tema: 'Hiponatremia', subtemas: ['Sintomática', 'Correção', 'NaCl 3%'] },
  { tema: 'Hipernatremia', subtemas: ['Desidratação', 'Correção lenta', 'Causas'] },
  { tema: 'Hipercalemia', subtemas: ['ECG', 'Cálcio EV', 'Shift'] },
  { tema: 'Hipocalemia', subtemas: ['Reposição', 'ECG', 'Causas'] },
  { tema: 'Distúrbios ácido-base', subtemas: ['Gap elevado', 'Gap normal', 'Mista'] },
  { tema: 'Hipercalcemia', subtemas: ['Hidratação', 'PTH', 'Vitamina D'] },
  { tema: 'Hipocalcemia', subtemas: ['Tetania', 'RN', 'Hipopara'] },
  { tema: 'Hipofosfatemia', subtemas: ['Reposição', 'Raquitismo', 'NPT'] },
  { tema: 'Raquitismo', subtemas: ['Vitamina D', 'Hipofosfatêmico', 'Renal'] },
  { tema: 'Cistinose', subtemas: ['Fanconi', 'Córnea', 'Cisteamina'] },
  { tema: 'Alport', subtemas: ['Colágeno IV', 'Surdez', 'Genética'] },
  { tema: 'Nefronoftise', subtemas: ['Ciliopatia', 'Anemia', 'DRC'] },
  { tema: 'Doença policística', subtemas: ['ADPKD', 'ARPKD', 'Seguimento'] },
  { tema: 'Fabry', subtemas: ['α-Gal A', 'Angioqueratoma', 'Proteinúria'] },
  { tema: 'Oxalose', subtemas: ['Litíase', 'DRC', 'Transplante'] },
  { tema: 'Transplante renal', subtemas: ['Rejeição', 'Infecção', 'Imunossupressão'] },
  { tema: 'Hemodiálise', subtemas: ['Indicações', 'Acesso', 'Complicações'] },
  { tema: 'Diálise peritoneal', subtemas: ['Peritonite', 'Prescrição', 'Cateter'] },
  { tema: 'Biópsia renal', subtemas: ['Indicações', 'SN atípica', 'Complicações'] },
  { tema: 'Patologia renal', subtemas: ['GESF', 'LMN', 'IgA'] },
  { tema: 'Ultrassonografia', subtemas: ['ITU', 'Hidronefrose', 'Primeiro exame'] },
  { tema: 'Farmacologia', subtemas: ['Ajuste TFG', 'Nefrotóxicos', 'Timing HD'] },
  { tema: 'Imunossupressores', subtemas: ['Tacrolimus', 'MMF', 'Corticoide'] },
  { tema: 'Medicina baseada em evidências', subtemas: ['Guidelines', 'Viés', 'Aplicabilidade'] },
];

/** Núcleos de resposta por tema (correct + wrongs + explain) */
const CORE = {
  'Síndrome nefrótica': {
    correct: 'Prednisona VO em dose plena conforme protocolo de SN idiopática',
    wrongs: [
      'Pulsoterapia com metilprednisolona de primeira linha em todo caso típico',
      'Ciclofosfamida como primeira droga em SN típica sem falha corticoide',
      'Micofenolato como primeira linha sem tentativa de corticoide',
    ],
    explain:
      'Quadro clássico de SN idiopática (provável corticossensível): primeira linha é corticosteroide oral, na ausência de sinais de doença secundária ou apresentação atípica.',
  },
  'GN pós-estreptocócica': {
    correct: 'Suporte (restrição hidrossalina, controle pressórico) e acompanhamento da GNPE',
    wrongs: [
      'Imunossupressão pesada de rotina na GNPE típica',
      'Nefrectomia bilateral',
      'Alta sem controle de volume/PA',
    ],
    explain: 'GNPE típica: suporte e vigilância; imunossupressão não é rotina.',
  },
  ITU: {
    correct: 'Ultrassonografia das vias urinárias após ITU febril conforme protocolo',
    wrongs: [
      'Nunca solicitar imagem após ITU febril',
      'Cistoscopia de rotina em todo lactente',
      'Nefrectomia profilática',
    ],
    explain: 'ITU febril no lactente: US é frequentemente o primeiro exame de imagem.',
  },
  IRA: {
    correct: 'Reposição volêmica cuidadosa e monitorização (IRA pré-renal)',
    wrongs: [
      'Diálise imediata só pela creatinina sem critérios AEIOU',
      'Restrição hídrica absoluta na pré-renal',
      'Corticosteroide de rotina',
    ],
    explain: 'Pré-renal: restaurar volume; diálise segue indicações clínicas.',
  },
  SHU: {
    correct: 'Suporte (volume/diálise se indicado); evitar ATB rotineiro na diarreia típica D+',
    wrongs: [
      'Plasmaférese de rotina em toda SHU D+',
      'Nefrectomia imediata',
      'Corticoide como cura isolada',
    ],
    explain: 'SHU D+: suporte; antibiótico na fase diarréica pode piorar.',
  },
  Hipertensão: {
    correct: 'Confirmar medidas/percentis (MAPA se preciso) e investigar causa secundária quando indicado',
    wrongs: [
      'Ignorar PA elevada',
      'Iniciar 4 fármacos sem confirmar',
      'Proibir exercício em todo hipertenso controlado',
    ],
    explain: 'HAS pediátrica: confirmar e estratificar antes da polifarmácia.',
  },
  default: {
    correct: 'Conduta alinhada a guidelines (KDIGO/IPNA/SBN) para o cenário clínico',
    wrongs: [
      'Intervenção agressiva sem indicação (cirurgia/diálise imediata)',
      'Observação sem seguimento diante de risco claro',
      'Terapia empírica sem suporte fisiopatológico',
    ],
    explain:
      'Raciocínio clínico pediátrico nefrológico: integrar história, exame, labs e guidelines antes da conduta.',
  },
};

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

function rotate(correct, wrongs, salt) {
  const items = [correct, ...wrongs.slice(0, 3)];
  while (items.length < 4) items.push(`Conduta inadequada neste cenário clínico (${items.length})`);
  const rot = salt % 4;
  const options = items.map((_, i) => items[(i + rot) % items.length]);
  return { options, gabarito: LETTERS[options.indexOf(correct)] };
}

function ensure(text, min = 12) {
  const t = String(text).trim();
  return t.length >= min ? t : `${t} — opção clinicamente inadequada neste contexto`;
}

function coreFor(tema) {
  return CORE[tema] || CORE.default;
}

function buildVignette(ctx) {
  const { tema, subtema, tipo, age, sex, weight, height, sbp, dbp, i, rnd } = ctx;
  const sexoLabel = sex === 'M' ? 'Menino' : 'Menina';
  const ageLabel = age < 1 ? `${Math.max(1, Math.round(age * 30))} dias` : age < 2 ? `${Math.round(age * 12)} meses` : `${age} anos`;

  if (tema === 'Síndrome nefrótica') {
    const alb = (1.5 + rnd() * 0.6).toFixed(1);
    const col = 280 + Math.floor(rnd() * 120);
    const pcr = (4 + rnd() * 8).toFixed(1);
    return `${sexoLabel} de ${ageLabel} é levado(a) ao ambulatório por edema palpebral há ${3 + (i % 4)} dias. Evoluiu com edema de membros inferiores. PA: ${sbp}×${dbp} mmHg. Peso ${weight} kg (habitual ${Math.max(8, weight - 2)} kg), altura ${height} cm.\n\nExames:\n• Albumina: ${alb} g/dL\n• Colesterol: ${col} mg/dL\n• Creatinina: ${(0.3 + rnd() * 0.3).toFixed(1)} mg/dL\n• Urina 1: proteína ${(3 + (i % 2))}+; hemácias ${i % 3 === 0 ? '0–2' : '2–5'}/campo\n• Relação proteína/creatinina urinária: ${pcr} mg/mg.\n\nQual a melhor conduta inicial?`;
  }

  if (tema === 'GN pós-estreptocócica') {
    return `${sexoLabel} de ${ageLabel} com hematúria macroscópica, edema e PA ${sbp}×${dbp} mmHg. História de faringite há ${2 + (i % 3)} semanas. C3 ${(35 + (i % 25))} mg/dL (baixo), creatinina ${(0.6 + rnd() * 0.8).toFixed(1)} mg/dL. Conduta mais adequada?`;
  }

  if (tema === 'ITU') {
    return `Lactente de ${ageLabel}, sexo ${sex === 'M' ? 'masculino' : 'feminino'}, febril sem foco aparente. Urocultura com E. coli >10⁵ UFC/mL. Peso ${weight} kg. Após o primeiro episódio febril, qual o próximo passo diagnóstico frequente?`;
  }

  if (tema === 'IRA') {
    return `Criança de ${ageLabel} (${weight} kg) com gastroenterite há 3 dias, taquicardia, oligúria, creatinina ${(1.1 + rnd()).toFixed(1)} mg/dL, FENa ${(0.2 + rnd() * 0.5).toFixed(1)}% e urina concentrada. Conduta inicial?`;
  }

  if (tema === 'Hipercalemia' || (tipo === 'ECG hidroeletrolítico' && /Hipercalemia|Hipocalemia|Eletrólitos/i.test(tema))) {
    return `Paciente de ${ageLabel} com K ${(6.4 + rnd() * 0.8).toFixed(1)} mEq/L e alterações eletrocardiográficas. Conduta imediata?`;
  }

  if (tema === 'Hiponatremia' || (tipo === 'Eletrólitos' && /Hiponatremia|Hipernatremia|SIADH/i.test(tema))) {
    return `Lactente com Na ${118 + (i % 6)} mEq/L e convulsão. Peso ${weight} kg. Conduta emergencial?`;
  }

  if (
    (tipo === 'Gasometria' || tema === 'Distúrbios ácido-base' || tema === 'Acidose tubular') &&
    !/Síndrome nefrótica|ITU|SHU/i.test(tema)
  ) {
    return `${sexoLabel} de ${ageLabel} com pH ${(7.1 + rnd() * 0.2).toFixed(2)}, HCO₃ ${8 + (i % 8)}, Cl ${110 + (i % 10)}, ânion gap ${tipo === 'Gasometria' && i % 2 === 0 ? 12 + (i % 4) : 22 + (i % 8)}. Interpretação e conduta prioritária?`;
  }

  if (tipo === 'Ultrassonografia' || tema === 'Ultrassonografia' || tema === 'Hidronefrose') {
    return `Lactente de ${ageLabel} com dilatação pielocalicial ${tema === 'Hidronefrose' ? 'antenatal' : 'pós ITU'}. US pós-natal mostra hidronefrose grau ${2 + (i % 3)}. Conduta inicial?`;
  }

  if (
    (tipo === 'Biópsia renal' || tema === 'Biópsia renal' || tema === 'Patologia renal') &&
    tema !== 'Síndrome nefrótica'
  ) {
    return `Criança de ${ageLabel} com SN ${i % 2 === 0 ? 'corticorresistente' : 'atípica (HTA + hematúria)'}. Qual indicação/interpretação mais adequada?`;
  }

  if (tema === 'Transplante renal') {
    return `Adolescente transplantado há ${1 + (i % 10)} meses, creatinina em elevação, febre e dor no enxerto. Conduta?`;
  }

  if (tema === 'Diálise peritoneal') {
    return `Criança de ${ageLabel} em DP com efluente turvo e dor abdominal. Conduta?`;
  }

  if (tipo === 'Guideline' || tema === 'Medicina baseada em evidências') {
    return `Ao aplicar recomendações IPNA/KDIGO em ${subtema.toLowerCase()} para paciente de ${ageLabel}, qual princípio é mais adequado?`;
  }

  if (tema === 'Bartter' || tema === 'Gitelman' || tema === 'Liddle') {
    return `${sexoLabel} de ${ageLabel} com distúrbio eletrolítico compatível com ${tema}: K ${(2.2 + rnd() * 0.8).toFixed(1)}, PA ${sbp}×${dbp}. Diagnóstico/conduta?`;
  }

  // Genérico rico
  return `${sexoLabel} de ${ageLabel} (${weight} kg, ${height} cm), PA ${sbp}×${dbp} mmHg, em avaliação de ${tema.toLowerCase()} — foco: ${subtema}. Tipo de cobrança: ${tipo}. Qual a melhor conduta/diagnóstico?`;
}

function buildQuestion(i) {
  const rnd = mulberry32(9000 + i * 97);
  const theme = THEMES[i % THEMES.length];
  const subtema = pick(theme.subtemas, rnd);
  const tipo = TIPOS[i % TIPOS.length];
  const sex = rnd() > 0.5 ? 'M' : 'F';

  const infantHeavy = /ITU|Embriologia|Hidronefrose|Válvula|Desenvolvimento|Cistinose|Bartter/i.test(theme.tema);
  let age;
  if (infantHeavy && rnd() > 0.4) age = Math.max(0.1, Number((rnd() * 1.8).toFixed(1)));
  else age = 2 + Math.floor(rnd() * 15);

  const weight =
    age < 2 ? Math.round(4 + age * 4 + rnd() * 3) : Math.round(10 + age * 2.2 + rnd() * 6);
  const height =
    age < 2 ? Math.round(50 + age * 20 + rnd() * 8) : Math.round(80 + age * 5.5 + rnd() * 15);
  const sbp = 85 + Math.floor(rnd() * 45);
  const dbp = 50 + Math.floor(rnd() * 30);

  const ctx = {
    tema: theme.tema,
    subtema,
    tipo,
    age: age < 2 ? age : Math.round(age),
    sex,
    weight,
    height,
    sbp,
    dbp,
    i,
    rnd,
  };

  const core = coreFor(theme.tema);
  // Especializar SN corticossensível
  let correct = core.correct;
  let wrongs = [...core.wrongs];
  let explain = core.explain;

  if (theme.tema === 'Síndrome nefrótica' && subtema === 'Corticossensível') {
    correct = 'Prednisona VO em dose plena';
    wrongs = [
      'Pulsoterapia com metilprednisolona',
      'Ciclofosfamida',
      'Micofenolato',
    ];
    explain =
      'Trata-se do quadro clássico de síndrome nefrótica idiopática corticossensível, cuja primeira linha de tratamento é corticosteroide oral, desde que não haja sinais sugestivos de doença secundária ou resistência inicial.';
  }

  if (theme.tema === 'Hipercalemia') {
    correct = 'Estabilizar membrana (cálcio EV se ECG alterado) + medidas para reduzir K';
    wrongs = [
      'Observação sem ECG',
      'Infundir potássio adicional',
      'Espironolactona como primeira medida de emergência',
    ];
    explain = 'Hipercalemia com ECG alterado: cálcio EV para estabilizar; depois shift/eliminação.';
  }

  correct = ensure(correct);
  wrongs = wrongs.map((w) => ensure(w));
  const { options, gabarito } = rotate(correct, wrongs, i + 3);
  const refs = [REFS[i % REFS.length], REFS[(i + 3) % REFS.length], REFS[(i + 7) % REFS.length]];
  const difficulty = i % 5 === 0 ? 'facil' : i % 5 === 4 ? 'dificil' : 'medio';
  const diffLabel = difficulty === 'facil' ? 'Fácil' : difficulty === 'dificil' ? 'Difícil' : 'Média';
  const idNum = String(i + 1).padStart(6, '0');
  const richId = `NP-${idNum}`;
  const ageLabel =
    age < 1 ? `${Math.max(1, Math.round(age * 30))} dias` : age < 2 ? `${Math.round(age * 12)} meses` : `${Math.round(age)} anos`;

  const questao = buildVignette(ctx);

  const rich = {
    id: richId,
    especialidade: 'Nefrologia Pediátrica',
    tema: theme.tema,
    subtema,
    dificuldade: diffLabel,
    tipo,
    idade: ageLabel,
    sexo: sex === 'M' ? 'Masculino' : 'Feminino',
    questao,
    alternativas: { A: options[0], B: options[1], C: options[2], D: options[3] },
    gabarito,
    explicacao: `${explain}\n\nQuestão inédita MedRank (banco vivo) — não é cópia de prova oficial SBN/SBP.`,
    referencias: refs,
  };

  // Formato MedRank (DB)
  const question = {
    id: `nefroped-${idNum}`,
    statement: questao,
    option_a: options[0],
    option_b: options[1],
    option_c: options[2],
    option_d: options[3],
    option_e: '',
    correct_option: gabarito,
    explanation: rich.explicacao,
    source: 'MedRank',
    year: 2022 + (i % 5),
    specialty: 'Nefrologia Pediátrica',
    topic: theme.tema,
    subtopic: subtema,
    difficulty,
    tags: [
      'MedRank',
      'original',
      'nefropediatria',
      'estilo-SBN',
      'estilo-SBNPed',
      'treino-sbn',
      'titulo-nefropediatria',
      'banco-vivo',
      richId,
      `tipo-${tipo}`,
      theme.tema,
      subtema,
      `diff-${difficulty}`,
      `sexo-${sex}`,
    ],
    image_url: null,
    bibliography: refs.join(' · '),
    created_at: new Date().toISOString(),
  };

  return { question, rich };
}

function main() {
  const now = new Date().toISOString();
  const questions = [];
  const richSample = [];
  const byTema = {};
  const byTipo = {};

  for (let i = 0; i < TARGET; i++) {
    const { question, rich } = buildQuestion(i);
    questions.push(question);
    byTema[rich.tema] = (byTema[rich.tema] || 0) + 1;
    byTipo[rich.tipo] = (byTipo[rich.tipo] || 0) + 1;
    if (i < 20) richSample.push(rich);
  }

  const out = {
    meta: {
      total: questions.length,
      track: 'nefropediatria',
      format: 'banco-vivo-v2',
      options: 'A-D',
      style_tags: ['estilo-SBN', 'estilo-SBNPed'],
      especialidade: 'Nefrologia Pediátrica',
      temas: Object.keys(byTema).sort(),
      tema_counts: byTema,
      tipos: Object.keys(byTipo).sort(),
      tipo_counts: byTipo,
      srs_intervals_days: [1, 7, 15, 30, 90],
      generated_at: now,
      expandable_to: 10000,
      license_note:
        'Originais MedRank (banco vivo). Não reproduz provas oficiais SBN/SBP.',
      object_shape:
        'id, especialidade, tema, subtema, dificuldade, tipo, idade, sexo, questao, alternativas A-D, gabarito, explicacao, referencias',
    },
    questions,
  };

  fs.writeFileSync(OUT, JSON.stringify(out) + '\n');
  fs.writeFileSync(
    RICH_OUT,
    JSON.stringify({ meta: { sample: richSample.length, note: 'Amostra do formato objeto completo' }, questions: richSample }, null, 2) +
      '\n'
  );
  console.log(`Wrote ${questions.length} → ${OUT}`);
  console.log(`Rich sample ${richSample.length} → ${RICH_OUT}`);
  console.log(`Temas: ${Object.keys(byTema).length} · Tipos: ${Object.keys(byTipo).length}`);
  console.log(`Size: ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB`);
}

main();
