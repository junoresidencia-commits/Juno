import type { Difficulty, OptionLetter, Question } from '@/types/database';
import type { TopicIncidence } from '@/lib/question-bank/incidence';

type ScenarioSeed = {
  topic: string;
  specialty: string;
  styleTags: string[];
  clinicalHook: string;
  labsOrFind: string;
  correctFact: string;
  distractors: [string, string, string, string];
  explanation: string;
  references: string[];
  subtopic?: string;
};

/** Cenários clínicos inéditos — sem copiar enunciados de provas oficiais. */
const SCENARIO_BANK: ScenarioSeed[] = [
  {
    topic: 'Cardiologia',
    specialty: 'Clínica Médica',
    subtopic: 'IAMCSST',
    styleTags: ['estilo-ENARE', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Homem de 58 anos com dor torácica há 40 minutos, sudorese e náusea',
    labsOrFind: 'ECG com supradesnível de ST em DII, DIII e aVF, sem resposta a nitrato',
    correctFact: 'Angioplastia primária com meta porta-balão ≤ 90 min quando disponível',
    distractors: [
      'Trombólise imediata mesmo com centro de ICP a 20 minutos',
      'Observação por 6 h antes de decidir reperfusão',
      'Alta com AAS e retorno ambulatorial',
      'Ressonância cardíaca como próximo passo',
    ],
    explanation:
      'IAMCSST de parede inferior exige reperfusão urgente. Com ICP disponível em janela, angioplastia primária é preferível à trombólise.',
    references: ['Diretriz SBC IAMCSST', 'AHA/ACC STEMI'],
  },
  {
    topic: 'Infectologia',
    specialty: 'Clínica Médica',
    subtopic: 'Sepse',
    styleTags: ['estilo-ENARE', 'estilo-Einstein', 'incidência-alta'],
    clinicalHook: 'Mulher de 72 anos com febre, confusão e PA 85/50 após infecção urinária',
    labsOrFind: 'Lactato 4,2 mmol/L, creatinina 2,1 mg/dL, leucócitos 18.000',
    correctFact: 'Cristaloides 30 mL/kg nas primeiras 3 h + antibiótico empírico precoce após culturas',
    distractors: [
      'Restringir volume até normalizar creatinina',
      'Iniciar noradrenalina antes de qualquer volume',
      'Aguardar hemoculturas por 24 h antes de antibiótico',
      'Furosemida de rotina na primeira hora',
    ],
    explanation:
      'Choque séptico: ressuscitação volêmica inicial com cristaloides e antimicrobiano precoce após coleta de culturas, conforme Surviving Sepsis.',
    references: ['Surviving Sepsis Campaign', 'Diretrizes BR sepse'],
  },
  {
    topic: 'Neurologia',
    specialty: 'Clínica Médica',
    subtopic: 'AVCi',
    styleTags: ['estilo-UNIFESP', 'estilo-ENARE', 'incidência-alta'],
    clinicalHook: 'Homem de 64 anos com hemiparesia direita e afasia iniciadas há 70 minutos',
    labsOrFind: 'TC sem hemorragia; PA 168/92; glicemia 110 mg/dL; sem contraindicação conhecida',
    correctFact: 'Avaliar trombólise IV (rTPA) dentro da janela e critério de imagem',
    distractors: [
      'Anti-hipertensivo agressivo para PAS < 120 antes de decidir',
      'AAS 300 mg e observação sem reperfusão',
      'Anticoagulação plena imediata com heparina',
      'Alta se NIHSS < 8',
    ],
    explanation:
      'AVCi em janela temporal com TC sem sangramento: candidata a trombólise IV conforme critérios AHA/SBC.',
    references: ['AHA/ASA stroke', 'Diretriz AVCi Brasil'],
  },
  {
    topic: 'Endocrinologia',
    specialty: 'Clínica Médica',
    subtopic: 'Cetoacidose diabética',
    styleTags: ['estilo-ENARE', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Adolescente de 16 anos com polidipsia, vômitos e taquipneia',
    labsOrFind: 'Glicemia 420 mg/dL, pH 7,12, bicarbonato 8, cetonemia positiva, K 3,1',
    correctFact: 'Hidratação EV + insulina EV, reposição de potássio conforme protocolo de CAD',
    distractors: [
      'Insulina subcutânea ambulatorial apenas',
      'Bicarbonato de rotina em todo paciente com pH < 7,20',
      'Restrição hídrica rigorosa nas primeiras 24 h',
      'Alta após glicemia < 200 sem correção de acidose',
    ],
    explanation:
      'CAD: fluidos, insulina e manejo cuidadoso de K; bicarbonato não é rotina na maioria dos casos.',
    references: ['ADA DKA', 'SBD emergência hiperglicêmica'],
  },
  {
    topic: 'Pneumologia',
    specialty: 'Clínica Médica',
    subtopic: 'Asma',
    styleTags: ['estilo-USP', 'estilo-UNIFESP'],
    clinicalHook: 'Mulher de 28 anos com chiado intenso há 2 h, uso de bombinha sem alívio',
    labsOrFind: 'FR 32, SpO2 91% AA, sibilos difusos, fala entrecortada',
    correctFact: 'Salbutamol nebulizado + corticosteroide sistêmico precoce',
    distractors: [
      'Apenas antitussígeno e observação',
      'Antibiótico empírico de amplo espectro de rotina',
      'Sedação profunda imediata sem suporte',
      'Beta-bloqueador para reduzir taquicardia',
    ],
    explanation:
      'Exacerbação aguda grave: beta-agonista de curta ação + corticosteroide sistêmico; O2 se hipoxemia.',
    references: ['GINA', 'Diretriz SBPT asma'],
  },
  {
    topic: 'Cardiologia',
    specialty: 'Clínica Médica',
    subtopic: 'ICC aguda',
    styleTags: ['estilo-ENARE', 'estilo-Einstein'],
    clinicalHook: 'Idoso de 78 anos com dispneia noturna e edema de MMII',
    labsOrFind: 'B3, crepitações bibasais, BNP elevado, FE 32% prévia',
    correctFact: 'Diurético de alça EV + oxigênio conforme saturação e suporte hemodinâmico',
    distractors: [
      'Grande volume de cristaloides até PA > 140',
      'Betabloqueador em dose plena na fase congestiva aguda sem estabilização',
      'Antibiótico sem sinal de infecção',
      'Diálise de rotina em todo edema',
    ],
    explanation:
      'Descompensação congestiva: diurético de alça e manejo de congestão/hipoxemia; vasodilatadores se PA elevada.',
    references: ['Diretriz SBC IC', 'ESC HF'],
  },
  {
    topic: 'Cirurgia Geral',
    specialty: 'Cirurgia Geral',
    subtopic: 'Apendicite',
    styleTags: ['estilo-ENARE', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Jovem de 22 anos com dor migratória para FID, anorexia e febre baixa',
    labsOrFind: 'Leucócitos 14.200 com desvio, PCR elevada, ultrassom sugestivo',
    correctFact: 'Apendicectomia após preparo e antibiótico perioperatório',
    distractors: [
      'Observação domiciliar sem imagem nem reassessment',
      'Colonoscopia de urgência',
      'Quimioterapia de rotina',
      'Anticoagulação plena',
    ],
    explanation:
      'Apendicite aguda tipicamente cirúrgica; antibiótico perioperatório e intervenção conforme gravidade.',
    references: ['WSES appendicitis', 'Colégio Brasileiro de Cirurgiões'],
  },
  {
    topic: 'Cirurgia Geral',
    specialty: 'Cirurgia Geral',
    subtopic: 'Colecistite',
    styleTags: ['estilo-UNIFESP', 'estilo-ENARE'],
    clinicalHook: 'Mulher de 45 anos com dor em HD contínua, Murphy positivo e febre',
    labsOrFind: 'Leucocitose, US com parede espessada e líquido pericolecístico',
    correctFact: 'Colecistectomia precoce (idealmente na internação índice) + antibiótico',
    distractors: [
      'Esperar 6 meses obrigatoriamente em todos os casos',
      'CPRE de rotina sem dilatação de vias',
      'Apenas dieta e alta no mesmo dia',
      'Radioterapia abdominal',
    ],
    explanation:
      'Colecistite aguda litiásica: colecistectomia precoce preferível à espera prolongada em elegíveis.',
    references: ['Tokyo Guidelines', 'Colégio Brasileiro de Cirurgiões'],
  },
  {
    topic: 'Trauma',
    specialty: 'Cirurgia Geral',
    subtopic: 'ABCDE',
    styleTags: ['estilo-ENARE', 'estilo-USP'],
    clinicalHook: 'Vítima de colisão com taquicardia, PA 80/40 e abdome distendido',
    labsOrFind: 'FAST positivo; via aérea patente; sem sangramento externo óbvio',
    correctFact: 'Ressuscitação e laparotomia de urgência (controle de danos)',
    distractors: [
      'TC de corpo total antes de qualquer volume em instável',
      'Alta após analgésico',
      'Colonoscopia',
      'Antibioticoterapia isolada sem cirurgia',
    ],
    explanation:
      'Choque hemorrágico abdominal com FAST+: controle cirúrgico; TC só se hemodinamicamente estável.',
    references: ['ATLS', 'Diretrizes trauma'],
  },
  {
    topic: 'Pneumologia',
    specialty: 'Clínica Médica',
    subtopic: 'Pneumonia',
    styleTags: ['estilo-ENARE', 'estilo-UNIFESP'],
    clinicalHook: 'Homem de 55 anos com febre, tosse produtiva e dor pleurítica',
    labsOrFind: 'RX com consolidação lobar; CURB-65 = 1; SpO2 94%',
    correctFact: 'Antibiótico empírico ambulatorial ou hospitalar conforme gravidade (CURB/PSI)',
    distractors: [
      'Corticosteroide isolado sem antibiótico',
      'Antiviral para influenza de rotina sem critério',
      'Cirurgia torácica imediata',
      'Internação em UTI obrigatória em CURB-65 0–1',
    ],
    explanation:
      'PAC: estratificar gravidade e iniciar empírico cobrindo pneumococo/atípicos conforme protocolo local.',
    references: ['IDSA/ATS CAP', 'SBPT pneumonia'],
  },
  {
    topic: 'Pneumologia',
    specialty: 'Clínica Médica',
    subtopic: 'TEP',
    styleTags: ['estilo-Einstein', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Mulher pós-operatória de joelho com dispneia súbita e SpO2 88%',
    labsOrFind: 'D-dímero elevado; angiotomografia com trombo em artéria pulmonar',
    correctFact: 'Anticoagulação (ou trombólise se instabilidade hemodinâmica)',
    distractors: [
      'AAS isolado',
      'Antibiótico de amplo espectro sem evidência de infecção',
      'Alta sem anticoagulação',
      'Broncoscopia diagnóstica de primeira linha',
    ],
    explanation:
      'TEP confirmado: anticoagulação; trombólise reservada a choque/instabilidade.',
    references: ['ESC PE', 'Diretriz SBC TEP'],
  },
  {
    topic: 'Obstetrícia',
    specialty: 'Ginecologia e Obstetrícia',
    subtopic: 'Pré-eclâmpsia',
    styleTags: ['estilo-ENARE', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Gestante de 34 semanas com PA 160/105, cefaleia e edema',
    labsOrFind: 'Proteinúria significativa; plaquetas 95.000; AST elevada',
    correctFact: 'Sulfato de magnésio + anti-hipertensivo e definição do momento do parto',
    distractors: [
      'Diurético de alça de rotina sem edema pulmonar',
      'Indução apenas com AAS',
      'Observação sem anti-hipertensivo em crise',
      'Contraste iodado diagnóstico de primeira linha',
    ],
    explanation:
      'Pré-eclâmpsia grave: MgSO4 para prevenção de convulsão, controle pressórico e decisão obstétrica.',
    references: ['FEBRASGO', 'ACOG hypertension in pregnancy'],
  },
  {
    topic: 'Obstetrícia',
    specialty: 'Ginecologia e Obstetrícia',
    subtopic: 'Trabalho de parto',
    styleTags: ['estilo-UNIFESP', 'estilo-ENARE'],
    clinicalHook: 'Primigesta a termo com contrações regulares e dilatação 5 cm',
    labsOrFind: 'BCF 140; apresentação cefálica; bolsa íntegra; progresso adequado',
    correctFact: 'Conduta expectante com partograma e suporte ao trabalho de parto',
    distractors: [
      'Cesárea de rotina sem indicação',
      'Ocitocina em dose máxima sem indicação de distocia',
      'Antibiótico profilático sem fator de risco',
      'Interrupção obrigatória com fórceps',
    ],
    explanation:
      'Trabalho de parto ativo progressivo: acompanhar partograma; intervenções conforme indicações.',
    references: ['OMS trabalho de parto', 'FEBRASGO'],
  },
  {
    topic: 'Pediatria',
    specialty: 'Pediatria',
    subtopic: 'Desidratação',
    styleTags: ['estilo-ENARE', 'estilo-USP', 'incidência-alta'],
    clinicalHook: 'Lactente de 10 meses com diarreia há 2 dias, olhos fundos e diurese reduzida',
    labsOrFind: 'Peso caiu 8%; mucosas secas; alerta mas irritado',
    correctFact: 'Sais de reidratação oral se desidratação moderada sem choque; EV se grave/choque',
    distractors: [
      'Antidiarreico de rotina em lactente',
      'Antibiótico empírico em toda diarreia aquosa',
      'Restrição hídrica por 24 h',
      'Corticosteroide sistêmico',
    ],
    explanation:
      'Plano B (TRO) para desidratação sem choque; Planos A/C conforme OMS/Ministério da Saúde.',
    references: ['MS Manejo da diarreia', 'SBP emergência pediátrica'],
  },
  {
    topic: 'Pediatria',
    specialty: 'Pediatria',
    subtopic: 'Bronquiolite',
    styleTags: ['estilo-UNIFESP', 'estilo-ENARE'],
    clinicalHook: 'Bebê de 4 meses com coriza, chiado e dificuldade para mamar',
    labsOrFind: 'SpO2 92%, sibilos e crepitações finas, RX sem consolidação lobar',
    correctFact: 'Suporte (O2, hidratação, aspiração nasal); sem broncodilatador de rotina',
    distractors: [
      'Salbutamol de rotina em todos os casos',
      'Corticosteroide sistêmico obrigatório',
      'Antibiótico empírico sem infecção bacteriana',
      'Intubação imediata se SpO2 92%',
    ],
    explanation:
      'Bronquiolite viral: cuidados de suporte; broncodilatadores não são rotina.',
    references: ['AAP bronchiolitis', 'SBP infecções respiratórias'],
  },
  {
    topic: 'Medicina Preventiva',
    specialty: 'Medicina Preventiva',
    subtopic: 'HAS na APS',
    styleTags: ['estilo-ENARE', 'estilo-UNIFESP'],
    clinicalHook: 'Unidade de saúde planeja rastreio de HAS em adultos',
    labsOrFind: 'População adscrita com alta prevalência de obesidade e história familiar',
    correctFact: 'Medição periódica da PA e estratificação de risco cardiovascular na APS',
    distractors: [
      'TC de coronárias de rotina em assintomáticos jovens',
      'Internação profilática',
      'Antibiótico de amplo espectro comunitário',
      'Abandonar registro em e-SUS',
    ],
    explanation:
      'Prevenção na APS: rastreio pressórico e manejo de fatores de risco conforme diretrizes.',
    references: ['Diretrizes SBC HAS', 'PNAB / MS'],
  },
  {
    topic: 'Medicina Preventiva',
    specialty: 'Medicina Preventiva',
    subtopic: 'Vacinação',
    styleTags: ['estilo-ENARE', 'estilo-USP'],
    clinicalHook: 'Gestante de 22 semanas sem registro de dTpa na gestação atual',
    labsOrFind: 'Cartão vacinal incompleto; pré-natal de baixo risco',
    correctFact: 'dTpa a cada gestação (idealmente 20–36 semanas) conforme PNI',
    distractors: [
      'Contraindicação absoluta de todas as vacinas na gestação',
      'BCG na gestante',
      'Febre amarela de rotina sem indicação epidemiológica',
      'Adiar todas as vacinas pós-parto obrigatoriamente',
    ],
    explanation:
      'PNI recomenda dTpa em cada gestação para proteção do RN contra coqueluche.',
    references: ['PNI / MS', 'FEBRASGO imunização'],
  },
  {
    topic: 'Nefrologia',
    specialty: 'Clínica Médica',
    subtopic: 'Distúrbios hidroeletrolíticos',
    styleTags: ['estilo-USP', 'estilo-Einstein'],
    clinicalHook: 'Homem de 70 anos confuso, Na 118 mEq/L, clinicamente euvolêmico',
    labsOrFind: 'Osmolaridade plasmática baixa; urina inapropriadamente concentrada',
    correctFact: 'Suspeitar SIADH e corrigir sódio de forma controlada (evitar desmielinização)',
    distractors: [
      'Correção rápida com meta de +20 mEq em 4 h em sintomático leve',
      'Restrição hídrica nunca é opção',
      'Hipertônico em bolus contínuo sem monitoramento',
      'Diálise de rotina em Na 118 assintomático',
    ],
    explanation:
      'Hiponatremia: classificar volume/osmolaridade; correção cautelosa; SIADH é causa frequente euvolêmica.',
    references: ['European hyponatremia', 'SBN distúrbios hidroeletrolíticos'],
  },
  {
    topic: 'Infectologia',
    specialty: 'Clínica Médica',
    subtopic: 'Antibióticos',
    styleTags: ['estilo-ENARE', 'estilo-UNIFESP'],
    clinicalHook: 'Homem de 40 anos com celulite em MMII, sem sepse, alergia a penicilina documentada',
    labsOrFind: 'Eritema quente, sem abscessos drenáveis; hemoculturas negativas',
    correctFact: 'Antibiótico empírico cobrindo estreptococo/estafilococo com alternativa não-betalactâmica',
    distractors: [
      'Vancomicina EV de rotina em toda celulite leve',
      'Apenas compressa quente sem antibiótico',
      'Quinolona de 4ª geração sempre primeira linha',
      'Anfotericina B empírica',
    ],
    explanation:
      'Celulite não purulenta: cobrir estreptococos; ajustar se alergia ou MRSA de risco.',
    references: ['IDSA skin soft tissue', 'Infectologia BR'],
  },
  {
    topic: 'Cardiologia',
    specialty: 'Clínica Médica',
    subtopic: 'Fibrilação atrial',
    styleTags: ['estilo-Einstein', 'estilo-USP'],
    clinicalHook: 'Mulher de 68 anos com palpitações; ECG com FA e FC 140, estável',
    labsOrFind: 'PA 128/78; sem isquemia aguda; CHA2DS2-VASc = 3',
    correctFact: 'Controle de frequência + anticoagulação conforme escore de risco',
    distractors: [
      'Cardioversão elétrica imediata sem avaliação de estabilidade/trombo',
      'AAS isolado substitui anticoagulação em CHA2DS2-VASc 3',
      'Digoxina intramuscular de rotina',
      'Antibiótico empírico',
    ],
    explanation:
      'FA estável: controle de FC e prevenção tromboembólica guiada por CHA2DS2-VASc.',
    references: ['ESC AF', 'Diretriz SBC arritmias'],
  },
];

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];

function shuffleOptions(
  correct: string,
  distractors: string[],
  salt: number
): { options: [string, string, string, string, string]; correct_option: OptionLetter } {
  const items = [correct, ...distractors.slice(0, 4)];
  const rot = salt % items.length;
  const options = items.map((_, i) => items[(i + rot) % items.length]!) as [
    string,
    string,
    string,
    string,
    string,
  ];
  const correct_option = LETTERS[options.indexOf(correct)] ?? 'A';
  return { options, correct_option };
}

function difficultyForRank(rank: number): Difficulty {
  if (rank < 4) return 'dificil';
  if (rank < 10) return 'medio';
  return 'facil';
}

function topicScore(hotTopics: TopicIncidence[], seed: ScenarioSeed): number {
  let best = 0;
  for (const row of hotTopics) {
    const hay = `${row.topic} ${row.specialty}`.toLowerCase();
    const needles = [seed.topic, seed.subtopic ?? '', seed.specialty].map((s) => s.toLowerCase());
    if (needles.some((n) => n && hay.includes(n))) {
      best = Math.max(best, row.count);
    }
  }
  return best;
}

/**
 * Gera questões originais alinhadas aos temas de maior incidência.
 * Não copia enunciados — recria casos clínicos e alternativas.
 */
export function generateOriginalsFromIncidence(
  hotTopics: TopicIncidence[],
  opts?: { maxGenerate?: number; yearHint?: number }
): Omit<Question, 'created_at'>[] {
  const maxGenerate = opts?.maxGenerate ?? 120;
  const year = opts?.yearHint ?? new Date().getFullYear();

  const rankedSeeds = [...SCENARIO_BANK].sort(
    (a, b) => topicScore(hotTopics, b) - topicScore(hotTopics, a)
  );

  const out: Omit<Question, 'created_at'>[] = [];
  let i = 0;
  while (out.length < maxGenerate && rankedSeeds.length > 0) {
    const seed = rankedSeeds[i % rankedSeeds.length]!;
    const variant = Math.floor(i / rankedSeeds.length) + 1;
    const { options, correct_option } = shuffleOptions(
      seed.correctFact,
      seed.distractors,
      i + year
    );

    const ageTwist = 40 + ((i * 7) % 40);
    const statement = `${seed.clinicalHook.replace(/\d+ anos/, `${ageTwist} anos`)}. ${seed.labsOrFind} Qual a conduta mais adequada? (cenário ${variant})`;

    const score = topicScore(hotTopics, seed);
    const rankHint = hotTopics.findIndex(
      (t) =>
        t.topic.toLowerCase().includes(seed.topic.toLowerCase()) ||
        (seed.subtopic && t.topic.toLowerCase().includes(seed.subtopic.toLowerCase()))
    );
    const difficulty = difficultyForRank(rankHint >= 0 ? rankHint : score > 0 ? 5 : 20);

    const id = `auto-orig-${year}-${String(i + 1).padStart(4, '0')}`;

    out.push({
      id,
      statement,
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      option_e: options[4],
      correct_option,
      explanation: `${seed.explanation} Questão inédita MedRank (tendência: ${seed.subtopic ?? seed.topic}).`,
      source: 'MedRank',
      year,
      specialty: seed.specialty,
      topic: seed.topic,
      subtopic: seed.subtopic ?? null,
      difficulty,
      tags: [
        ...seed.styleTags,
        'original-medrank',
        'auto-generated',
        `ciclo-${year}`,
        (seed.subtopic ?? seed.topic).toLowerCase().replace(/\s+/g, '-'),
      ],
      image_url: null,
      bibliography: seed.references.join('; '),
    });
    i += 1;
    if (i > maxGenerate * 3) break;
  }

  return out;
}

export function listScenarioTopics(): string[] {
  return [...new Set(SCENARIO_BANK.map((s) => s.subtopic ?? s.topic))];
}
