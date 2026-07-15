#!/usr/bin/env node
/**
 * Amplia data/original-style-questions.json para ≥ TARGET por estilo-*
 * Conteúdo inédito MedRank (não copia provas oficiais).
 */
const fs = require('fs');
const path = require('path');

const TARGET = 45;
const OUT = path.join(__dirname, '..', 'data', 'original-style-questions.json');

const STYLES = [
  'USP',
  'USP-RP',
  'UNIFESP',
  'UNICAMP',
  'SUS-SP',
  'PSU-MG',
  'AMP',
  'SES-PE',
  'HCPA',
  'UFRGS',
  'UFMG',
  'UFPR',
  'ENARE',
];

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/** Banco de cenários clínicos (templates). Variam por índice. */
const SCENARIOS = [
  {
    specialty: 'Clínica Médica',
    topic: 'Cardiologia',
    subtopic: 'IAMCSST',
    difficulty: 'medio',
    stem: (i, age) =>
      `Homem de ${age} anos com dor torácica opressiva há ${35 + (i % 40)} minutos, sudorese e náuseas. ECG com supradesnível de ST em DII, DIII e aVF. PA ${85 + (i % 20)}x${50 + (i % 15)} mmHg. Conduta prioritária?`,
    correct: 'Angioplastia primária o mais precoce possível quando centro com ICP disponível em janela adequada',
    wrong: [
      'Observação por 6 h antes de decidir reperfusão',
      'Teste ergométrico imediato na emergência',
      'Alta com AAS se a dor ceder com nitrato',
      'Ressonância cardíaca como próximo passo isolado',
    ],
    explanation:
      'IAMCSST exige reperfusão urgente. Com ICP disponível em tempo adequado, angioplastia primária é preferencial à trombólise.',
    bibliography: 'Diretriz SBC IAMCSST; AHA/ACC STEMI',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Infectologia',
    subtopic: 'Sepse',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Mulher de ${age} anos com febre, confusão e PA ${80 + (i % 10)}x${45 + (i % 10)} após ITU. Lactato ${(3.2 + (i % 10) / 10).toFixed(1)} mmol/L, creatinina ${(1.8 + (i % 5) / 10).toFixed(1)} mg/dL. Conduta inicial correta?`,
    correct: 'Cristaloides ~30 mL/kg nas primeiras 3 h + antibiótico empírico precoce após culturas',
    wrong: [
      'Restringir volume até creatinina normalizar',
      'Aguardar hemoculturas 24 h antes de antibiótico',
      'Furosemida de rotina na primeira hora',
      'Noradrenalina antes de qualquer volume em todos os casos',
    ],
    explanation:
      'Choque séptico: ressuscitação volêmica inicial e antibiótico precoce após coleta de culturas (Surviving Sepsis).',
    bibliography: 'Surviving Sepsis Campaign',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Neurologia',
    subtopic: 'AVCi',
    difficulty: 'medio',
    stem: (i, age) =>
      `Homem de ${age} anos com hemiparesia direita e afasia há ${50 + (i % 40)} minutos. TC sem hemorragia; PA ${160 + (i % 20)}/${90 + (i % 10)}; glicemia ${100 + (i % 30)} mg/dL. Próximo passo?`,
    correct: 'Avaliar trombólise IV dentro da janela e critérios de inclusão/exclusão',
    wrong: [
      'AAS 300 mg e observação sem avaliar reperfusão',
      'Anticoagulação plena imediata com heparina',
      'Reduzir PAS agressivamente para <120 antes de decidir',
      'Alta se NIHSS < 8 sem avaliação de reperfusão',
    ],
    explanation:
      'AVCi em janela com TC sem sangramento: candidata a trombólise IV conforme critérios.',
    bibliography: 'AHA/ASA stroke; Diretriz AVCi Brasil',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Endocrinologia',
    subtopic: 'CAD',
    difficulty: 'medio',
    stem: (i, age) =>
      `Paciente de ${age} anos com polidipsia, vômitos e taquipneia. Glicemia ${380 + i * 3} mg/dL, pH ${(7.05 + (i % 10) / 100).toFixed(2)}, HCO3 ${6 + (i % 5)}, K ${(2.8 + (i % 8) / 10).toFixed(1)}. Conduta?`,
    correct: 'Hidratação EV + insulina EV com reposição cuidadosa de potássio conforme protocolo de CAD',
    wrong: [
      'Insulina subcutânea ambulatorial apenas',
      'Bicarbonato de rotina em todo pH < 7,20',
      'Restrição hídrica rigorosa nas primeiras 24 h',
      'Alta após glicemia < 200 sem corrigir acidose',
    ],
    explanation:
      'CAD: fluidos, insulina e manejo de K; bicarbonato não é rotina na maioria dos casos.',
    bibliography: 'ADA DKA; SBD',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Pneumologia',
    subtopic: 'TEP',
    difficulty: 'medio',
    stem: (i, age) =>
      `Mulher de ${age} anos no 3º dia pós-op de joelho com dispneia súbita e SpO2 ${86 + (i % 6)}%. AngioTC com trombo em artéria pulmonar. Conduta?`,
    correct: 'Anticoagulação; trombólise se instabilidade hemodinâmica',
    wrong: [
      'AAS isolado',
      'Antibiótico de amplo espectro sem evidência de infecção',
      'Alta sem anticoagulação',
      'Broncoscopia diagnóstica de primeira linha',
    ],
    explanation: 'TEP confirmado: anticoagular; trombólise reservada a choque/instabilidade.',
    bibliography: 'ESC PE; Diretriz SBC TEP',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Pneumologia',
    subtopic: 'Asma',
    difficulty: 'facil',
    stem: (i, age) =>
      `Mulher de ${age} anos com chiado intenso há 2 h, FR ${28 + (i % 8)}, SpO2 ${90 + (i % 4)}% AA, fala entrecortada. Conduta imediata?`,
    correct: 'Salbutamol nebulizado + corticosteroide sistêmico precoce',
    wrong: [
      'Apenas antitussígeno e observação',
      'Antibiótico empírico de rotina',
      'Sedação profunda sem suporte ventilatório planejado',
      'Beta-bloqueador para reduzir taquicardia',
    ],
    explanation:
      'Exacerbação aguda: beta-agonista de curta ação + corticosteroide sistêmico; O2 se hipoxemia.',
    bibliography: 'GINA; SBPT',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Nefrologia',
    subtopic: 'IRA',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Homem de ${age} anos internado por pneumonia evolui com creatinina de 0,9 para ${(2.0 + (i % 10) / 10).toFixed(1)}, diurese baixa, FENa ${(2.2 + (i % 10) / 10).toFixed(1)}% e cilindros granulosos. Conduta?`,
    correct: 'Otimizar volume, revisar nefrotóxicos e tratar a causa precipitante',
    wrong: [
      'Furosemida em bomba para “proteger” o rim',
      'Biópsia renal urgente antes de qualquer ajuste',
      'Diálise imediata só pela creatinina',
      'Suspender todos os antibióticos sem reassessment',
    ],
    explanation:
      'IRA intrínseca: suporte, retirada de nefrotóxicos e tratamento da causa. Diurético não protege o rim.',
    bibliography: 'KDIGO AKI',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Cardiologia',
    subtopic: 'FA',
    difficulty: 'medio',
    stem: (i, age) =>
      `Mulher de ${age} anos com palpitações; ECG com FA e FC ${130 + (i % 20)}, estável, CHA2DS2-VASc = ${2 + (i % 3)}. Conduta?`,
    correct: 'Controle de frequência + anticoagulação conforme escore de risco',
    wrong: [
      'Cardioversão elétrica imediata sem avaliar estabilidade/trombo',
      'AAS isolado substitui anticoagulação em escore elevado',
      'Digoxina IM de rotina',
      'Antibiótico empírico',
    ],
    explanation:
      'FA estável: controle de FC e prevenção tromboembólica guiada por CHA2DS2-VASc.',
    bibliography: 'ESC AF; Diretriz SBC',
  },
  {
    specialty: 'Cirurgia Geral',
    topic: 'Cirurgia Geral',
    subtopic: 'Apendicite',
    difficulty: 'facil',
    stem: (i, age) =>
      `Jovem de ${age} anos com dor migratória para FID, anorexia e febre baixa. Leucócitos ${13000 + i * 50}, US sugestivo. Conduta?`,
    correct: 'Apendicectomia após preparo e antibiótico perioperatório',
    wrong: [
      'Observação domiciliar sem reassessment',
      'Colonoscopia de urgência',
      'Quimioterapia de rotina',
      'Anticoagulação plena',
    ],
    explanation: 'Apendicite aguda tipicamente cirúrgica com antibioticoterapia perioperatória.',
    bibliography: 'WSES appendicitis',
  },
  {
    specialty: 'Cirurgia Geral',
    topic: 'Cirurgia Geral',
    subtopic: 'Colecistite',
    difficulty: 'medio',
    stem: (i, age) =>
      `Mulher de ${age} anos com dor em HD contínua, Murphy positivo e febre. US com parede espessada. Conduta preferencial?`,
    correct: 'Colecistectomia precoce na internação índice + antibiótico',
    wrong: [
      'Esperar 6 meses obrigatoriamente em todos os casos',
      'CPRE de rotina sem dilatação de vias',
      'Apenas dieta e alta no mesmo dia',
      'Radioterapia abdominal',
    ],
    explanation: 'Colecistite aguda litiásica: colecistectomia precoce preferível em elegíveis.',
    bibliography: 'Tokyo Guidelines',
  },
  {
    specialty: 'Cirurgia Geral',
    topic: 'Trauma',
    subtopic: 'ABCDE',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Trauma toracoabdominal; PA ${75 + (i % 15)}x${40 + (i % 10)}, taquicardia, FAST positivo, via aérea patente. Conduta?`,
    correct: 'Ressuscitação e laparotomia de urgência (controle de danos)',
    wrong: [
      'TC de corpo total em paciente instável antes de volume/cirurgia',
      'Alta após analgésico',
      'Colonoscopia',
      'Antibiótico isolado sem cirurgia',
    ],
    explanation: 'Choque hemorrágico com FAST+: cirurgia; TC só se estável.',
    bibliography: 'ATLS',
  },
  {
    specialty: 'Ginecologia e Obstetrícia',
    topic: 'Obstetrícia',
    subtopic: 'Pré-eclâmpsia',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Gestante de ${32 + (i % 6)} semanas, ${age} anos, PA ${155 + (i % 20)}/${100 + (i % 10)}, cefaleia, proteinúria, plaquetas ${80000 + i * 100}. Conduta?`,
    correct: 'Sulfato de magnésio + anti-hipertensivo e definição do momento do parto',
    wrong: [
      'Diurético de alça de rotina sem edema pulmonar',
      'Observação sem anti-hipertensivo em crise',
      'Contraste iodado diagnóstico de primeira linha',
      'Apenas AAS sem manejo agudo',
    ],
    explanation:
      'Pré-eclâmpsia grave: MgSO4, controle pressórico e decisão obstétrica.',
    bibliography: 'FEBRASGO; ACOG',
  },
  {
    specialty: 'Ginecologia e Obstetrícia',
    topic: 'Obstetrícia',
    subtopic: 'Trabalho de parto',
    difficulty: 'facil',
    stem: (i, age) =>
      `Primigesta de ${age} anos a termo, contrações regulares, dilatação ${4 + (i % 4)} cm, BCF ${140 + (i % 10)}, progresso adequado. Conduta?`,
    correct: 'Conduta expectante com partograma e suporte ao trabalho de parto',
    wrong: [
      'Cesárea de rotina sem indicação',
      'Ocitocina em dose máxima sem distocia',
      'Antibiótico profilático sem fator de risco',
      'Fórceps obrigatório',
    ],
    explanation: 'Trabalho de parto ativo progressivo: acompanhar partograma.',
    bibliography: 'OMS; FEBRASGO',
  },
  {
    specialty: 'Pediatria',
    topic: 'Pediatria',
    subtopic: 'Desidratação',
    difficulty: 'medio',
    stem: (i, age) =>
      `Lactente de ${8 + (i % 8)} meses com diarreia há 2 dias, olhos fundos, perda ponderal ~${7 + (i % 4)}%, alerta. Conduta?`,
    correct: 'TRO (sais de reidratação) se desidratação sem choque; EV se grave/choque',
    wrong: [
      'Antidiarreico de rotina em lactente',
      'Antibiótico empírico em toda diarreia aquosa',
      'Restrição hídrica por 24 h',
      'Corticosteroide sistêmico',
    ],
    explanation: 'Plano B (TRO) sem choque; Planos A/C conforme gravidade (OMS/MS).',
    bibliography: 'MS diarreia; SBP',
  },
  {
    specialty: 'Pediatria',
    topic: 'Pediatria',
    subtopic: 'Bronquiolite',
    difficulty: 'medio',
    stem: (i, age) =>
      `Bebê de ${3 + (i % 5)} meses com coriza, chiado, SpO2 ${91 + (i % 3)}%, RX sem consolidação lobar. Conduta?`,
    correct: 'Suporte (O2, hidratação, aspiração nasal); sem broncodilatador de rotina',
    wrong: [
      'Salbutamol de rotina em todos os casos',
      'Corticosteroide sistêmico obrigatório',
      'Antibiótico empírico sem infecção bacteriana',
      'Intubação imediata se SpO2 92%',
    ],
    explanation: 'Bronquiolite: suporte; broncodilatadores não são rotina.',
    bibliography: 'AAP bronchiolitis; SBP',
  },
  {
    specialty: 'Medicina Preventiva',
    topic: 'Medicina Preventiva',
    subtopic: 'Vacinação',
    difficulty: 'facil',
    stem: (i, age) =>
      `Gestante de ${age} anos com ${18 + (i % 12)} semanas sem dTpa nesta gestação. Conduta conforme PNI?`,
    correct: 'dTpa a cada gestação (idealmente 20–36 semanas)',
    wrong: [
      'Contraindicação absoluta de todas as vacinas na gestação',
      'BCG na gestante',
      'Febre amarela de rotina sem indicação',
      'Adiar todas as vacinas pós-parto obrigatoriamente',
    ],
    explanation: 'PNI recomenda dTpa em cada gestação para proteção do RN.',
    bibliography: 'PNI / MS',
  },
  {
    specialty: 'Medicina Preventiva',
    topic: 'Medicina Preventiva',
    subtopic: 'HAS APS',
    difficulty: 'facil',
    stem: (i, age) =>
      `UBS com população adscrita de alta prevalência de obesidade. Homem de ${age} anos assintomático. Melhor estratégia inicial?`,
    correct: 'Medição periódica da PA e estratificação de risco cardiovascular na APS',
    wrong: [
      'TC de coronárias de rotina em assintomáticos jovens',
      'Internação profilática',
      'Antibiótico comunitário de amplo espectro',
      'Abandonar registro em e-SUS',
    ],
    explanation: 'Prevenção na APS: rastreio pressórico e fatores de risco.',
    bibliography: 'Diretrizes SBC HAS; PNAB',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Gastroenterologia',
    subtopic: 'HDA',
    difficulty: 'medio',
    stem: (i, age) =>
      `Homem de ${age} anos com hematêmese e PA ${90 + (i % 15)}x${55 + (i % 10)}. Conduta inicial?`,
    correct: 'Estabilização hemodinâmica / acesso venoso e endoscopia digestiva alta após reanimação',
    wrong: [
      'Colonoscopia como primeiro exame em hematêmese',
      'Alta imediata se sangramento parou por 10 min',
      'Anticoagulação plena',
      'Ressonância como primeiro passo',
    ],
    explanation: 'HDA: reanimação e EDA após estabilidade relativa.',
    bibliography: 'ASGE UGIB',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Hematologia',
    subtopic: 'Anemia',
    difficulty: 'medio',
    stem: (i, age) =>
      `Mulher de ${age} anos com fadiga, Hb ${(7.5 + (i % 10) / 10).toFixed(1)}, VCM ${68 + (i % 8)}, ferritina baixa. Conduta?`,
    correct: 'Investigar causa de ferropriva (perdas/absorção) e repor ferro',
    wrong: [
      'Transfusão de rotina em toda Hb < 10 assintomática estável',
      'Vitamina B12 isolada sem avaliar ferro',
      'Quimioterapia empírica',
      'Esplenectomia de primeira linha',
    ],
    explanation: 'Anemia ferropriva: investigar causa e repor ferro.',
    bibliography: 'SBP / guidelines anemia',
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Reumatologia',
    subtopic: 'AR',
    difficulty: 'medio',
    stem: (i, age) =>
      `Mulher de ${age} anos com poliartrite simétrica de mãos há ${3 + (i % 6)} meses, rigidez matinal >1 h, FR positivo. Conduta?`,
    correct: 'Iniciar DMARD (ex.: metotrexato) após avaliação, com acompanhamento',
    wrong: [
      'Apenas analgésico contínuo sem DMARD',
      'Antibiótico de amplo espectro de rotina',
      'Amputação',
      'Corticosteroide isolado sem plano de DMARD',
    ],
    explanation: 'AR: tratamento precoce com DMARD melhora desfecho.',
    bibliography: 'EULAR RA',
  },
];

function rotateOptions(correct, wrongs, salt) {
  const items = [correct, ...wrongs.slice(0, 4)];
  const rot = salt % items.length;
  const options = items.map((_, i) => items[(i + rot) % items.length]);
  const correct_option = LETTERS[options.indexOf(correct)];
  return { options, correct_option };
}

function loadExisting() {
  if (!fs.existsSync(OUT)) return [];
  const raw = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  return raw.questions || [];
}

function countByStyle(questions) {
  const map = Object.fromEntries(STYLES.map((s) => [`estilo-${s}`, 0]));
  for (const q of questions) {
    for (const t of q.tags || []) {
      if (map[t] != null) map[t] += 1;
    }
  }
  return map;
}

function main() {
  const existing = loadExisting();
  const byStyle = countByStyle(existing);
  const now = new Date().toISOString();
  const added = [];
  let seq = existing.length + 1;

  for (const style of STYLES) {
    const tag = `estilo-${style}`;
    let have = byStyle[tag] || 0;
    let n = 0;
    while (have < TARGET) {
      const scenario = SCENARIOS[n % SCENARIOS.length];
      const variant = Math.floor(n / SCENARIOS.length);
      const age = 22 + ((n * 11 + style.length * 3) % 55);
      const salt = seq + style.charCodeAt(0) + n;
      const { options, correct_option } = rotateOptions(
        scenario.correct,
        scenario.wrong,
        salt
      );
      const id = `orig-exp-${style.toLowerCase()}-${String(n + 1).padStart(3, '0')}`;
      const q = {
        id,
        statement: `${scenario.stem(n + variant * 3, age)} (cenário ${style} #${n + 1})`,
        option_a: options[0],
        option_b: options[1],
        option_c: options[2],
        option_d: options[3],
        option_e: options[4],
        correct_option,
        explanation: `${scenario.explanation} Questão inédita MedRank; estilo pedagógico ${style}.`,
        source: 'MedRank',
        year: 2026,
        specialty: scenario.specialty,
        topic: scenario.topic,
        subtopic: scenario.subtopic,
        difficulty: scenario.difficulty,
        tags: [
          'MedRank',
          'original',
          'auto-expanded',
          tag,
          scenario.specialty,
          scenario.topic,
          'residencia-2024plus',
        ],
        image_url: null,
        bibliography: `${scenario.bibliography}. Estilo ${style} — não é cópia de prova oficial.`,
        created_at: now,
      };
      added.push(q);
      existing.push(q);
      have += 1;
      n += 1;
      seq += 1;
    }
  }

  const finalCounts = countByStyle(existing);
  const out = {
    meta: {
      total: existing.length,
      sources: ['MedRank'],
      style_banks: STYLES,
      generated_at: now,
      target_per_style: TARGET,
      style_counts: finalCounts,
      added_now: added.length,
      license_note:
        'Conteúdo original MedRank. Não reproduz enunciados de provas oficiais protegidas. Estilos (USP, ENARE etc.) são tags pedagógicas de cobrança.',
    },
    questions: existing,
  };

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(JSON.stringify({ total: existing.length, added: added.length, style_counts: finalCounts }, null, 2));
}

main();
