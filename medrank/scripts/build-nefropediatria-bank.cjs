#!/usr/bin/env node
/**
 * Gera data/nefropediatria-questions.json — questões originais MedRank
 * para treino estilo SBN / Sociedade Brasileira de Nefropediatria.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'nefropediatria-questions.json');
const COUNT = 80;
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const TEMPLATES = [
  {
    subtopic: 'Síndrome nefrótica pediátrica',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos com edema periorbitário, proteinúria ${(3 + (i % 3))}+ e albumina ${(1.8 + (i % 5) / 10).toFixed(1)} g/dL. Sem hematúria importante. Conduta inicial mais adequada?`,
    correct: 'Iniciar corticosteroide conforme protocolo de síndrome nefrótica idiopática e orientar restrição de sal',
    wrong: [
      'Biópsia renal imediata em toda criança de 3–8 anos antes de qualquer tratamento',
      'Antibiótico de amplo espectro de rotina sem infecção',
      'Diálise de urgência só pela proteinúria',
      'Suspender toda ingestão proteica',
    ],
    explanation:
      'Na faixa típica de síndrome nefrótica idiopática, o tratamento empírico com corticoide é padrão; biópsia reserva-se a atípicos/falha.',
  },
  {
    subtopic: 'Glomerulonefrite aguda',
    difficulty: 'medio',
    stem: (i, age) =>
      `Escolar de ${age} anos com hematúria, edema, hipertensão e história de faringite há ${2 + (i % 3)} semanas. C3 baixo. Conduta?`,
    correct: 'Suporte (restrição hidrossalina, anti-hipertensivo se necessário) e acompanhamento da GNPE',
    wrong: [
      'Corticosteroide em dose imunossupressora de rotina em toda GNPE típica',
      'Nefrectomia bilateral',
      'Quimioterapia',
      'Suspender antibiótico se ainda em curso sem reavaliar foco',
    ],
    explanation:
      'GN pós-estreptocócica: suporte e controle pressórico/volume; imunossupressão não é rotina na forma típica.',
  },
  {
    subtopic: 'ITU pediátrica',
    difficulty: 'facil',
    stem: (i, age) =>
      `Lactente de ${age} meses febril sem foco aparente; urocultura positiva para E. coli. Qual a conduta diagnóstica adicional frequente após o primeiro episódio febril?`,
    correct: 'Avaliar imagem do trato urinário conforme idade/protocolo (ex.: ultrassom) após ITU febril',
    wrong: [
      'Nunca solicitar imagem após ITU febril',
      'Cistoscopia de rotina em todo lactente',
      'Nefrectomia profilática',
      'Apenas observação sem antibiótico na ITU febril',
    ],
    explanation:
      'ITU febril no lactente indica investigação de anomalias; US é frequentemente o primeiro exame.',
  },
  {
    subtopic: 'Refluxo vesicoureteral',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos com ITU febril de repetição e uretrocistografia mostrando RVU grau ${2 + (i % 3)}. Conduta inicial usual?`,
    correct: 'Antibiótico profilático e/ou acompanhamento conforme grau, com avaliação urológica quando indicado',
    wrong: [
      'Cirurgia imediata em todo grau I–II sem falha clínica',
      'Suspender acompanhamento',
      'Corticosteroide prolongado de rotina',
      'Diálise profilática',
    ],
    explanation:
      'RVU de baixo/moderado grau: muitas vezes manejo conservador/profilaxia; cirurgia conforme indicação.',
  },
  {
    subtopic: 'Doença renal policística',
    difficulty: 'dificil',
    stem: (i, age) =>
      `RN com rins aumentados hiperecogênicos e história familiar de doença renal policística autossômica recessiva. Achado esperado / conduta?`,
    correct: 'Suporte clínico, acompanhar função renal/hipertensão e aconselhamento genético familiar',
    wrong: [
      'Nefrectomia neonatal de rotina em todos os casos',
      'Alta sem seguimento',
      'Corticosteroide como cura',
      'Transplante obrigatório na primeira semana de vida em todo caso',
    ],
    explanation:
      'DRPAR: manejo suporte, vigilância de função/HTA e aconselhamento; timing de dialise/transplante é individualizado.',
  },
  {
    subtopic: 'Acidose tubular renal',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Criança de ${age} anos com falha de crescimento, polidipsia, pH urinário inapropriadamente alto e hiperclorêmia com ânion gap normal. Suspeita e conduta?`,
    correct: 'Investigar acidose tubular renal e iniciar alcalinização / correção eletrolítica conforme tipo',
    wrong: [
      'Apenas restrição hídrica rigorosa',
      'Antibiótico empírico prolongado',
      'Esplenectomia',
      'Ignorar gasometria e eletrólitos',
    ],
    explanation:
      'ATR: acidose hiperclorêmica com gap normal; tratamento inclui álcali e manejo do tipo específico.',
  },
  {
    subtopic: 'Hipertensão pediátrica',
    difficulty: 'medio',
    stem: (i, age) =>
      `Adolescente de ${age} anos com PA persistentemente acima do percentil 95, sem obesidade grave. Próximo passo?`,
    correct: 'Confirmar com medidas adequadas / MAPA se preciso e investigar causas secundárias quando indicado',
    wrong: [
      'Ignorar PA elevada em pediatria',
      'Iniciar 4 anti-hipertensivos sem confirmar diagnóstico',
      'Radioterapia',
      'Restrição absoluta de exercício em todo adolescente hipertenso controlado',
    ],
    explanation:
      'HAS pediátrica: confirmar técnica/percentis e estratificar investigação secundária.',
  },
  {
    subtopic: 'Injúria renal aguda',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos desidratada por gastroenterite, creatinina elevada, FENa baixo, urina concentrada. Tipo mais provável e conduta?`,
    correct: 'IRA pré-renal: reposição volêmica cuidadosa e monitorar função renal',
    wrong: [
      'Diálise imediata em toda elevação de creatinina',
      'Restrição hídrica absoluta na pré-renal',
      'Corticosteroide de rotina',
      'Biópsia imediata sem suporte',
    ],
    explanation:
      'Pré-renal: restaurar volume; diálise conforme indicações clássicas, não só pela creatinina.',
  },
  {
    subtopic: 'Doença renal crônica pediátrica',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos com TFG estimada ${25 + (i % 20)} mL/min/1,73m², anemia e HTA. Manejo multiprofissional inclui?`,
    correct: 'Controle pressórico, anemia, mineral ósseo, nutrição e planejamento de terapia substitutiva quando necessário',
    wrong: [
      'Apenas observação sem controle de HTA/anemia',
      'Suspender vacinas',
      'Evitar qualquer acompanhamento nefrológico',
      'Transfusão semanal de rotina sem avaliar eritropoetina/ferro',
    ],
    explanation:
      'DRC pediátrica exige cuidado integrado (HTA, anemia, CKD-MBD, crescimento/nutrição).',
  },
  {
    subtopic: 'Síndrome hemolítico-urêmica',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Criança de ${age} anos após diarreia sanguinolenta evolui com anemia hemolítica, plaquetopenia e IRA. Conduta?`,
    correct: 'Suporte (fluidos, dialise se indicado); evitar antibiótico rotineiro na fase diarréica típica de SHU D+',
    wrong: [
      'Plasmaférese de rotina em toda SHU típica D+',
      'AAS em alta dose como primeira linha',
      'Nefrectomia imediata',
      'Corticosteroide como tratamento curativo isolado',
    ],
    explanation:
      'SHU D+ (típica): suporte; antibiótico na diarreia pode piorar; atípica exige abordagem diferente.',
  },
  {
    subtopic: 'Enurese',
    difficulty: 'facil',
    stem: (i, age) =>
      `Criança de ${age} anos com enurese noturna monossintomática, sem ITU. Conduta inicial?`,
    correct: 'Medidas comportamentais / alarme e avaliar fatores; desmopressina em casos selecionados',
    wrong: [
      'Cirurgia urológica de rotina sem investigação',
      'Antibiótico contínuo sem ITU documentada',
      'Indicar diálise apenas pela enurese',
      'Ignorar impacto psicossocial e familiar',
    ],
    explanation:
      'Enurese monossintomática: educação, alarme e farmacoterapia selecionada.',
  },
  {
    subtopic: 'Litíase pediátrica',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos com cólica e cálculo urinário. Além da analgesia e urologia quando preciso, o que investigar?`,
    correct: 'Avaliar fatores metabólicos (cálcio, oxalato, citrato, ácido úrico, etc.) e hidratação',
    wrong: [
      'Nunca investigar metabolismo em pediatria',
      'Restrição hídrica',
      'Corticosteroide de rotina',
      'Antibiótico em todo cálculo sem infecção',
    ],
    explanation:
      'Litíase pediátrica: alta taxa de anormalidade metabólica — investigar e hidratar.',
  },
  {
    subtopic: 'Hiponatremia',
    difficulty: 'medio',
    stem: (i, age) =>
      `Lactente com Na ${120 + (i % 5)} mEq/L, convulsão. Conduta emergencial?`,
    correct: 'Correção cuidadosa com solução hipertônica conforme protocolo de hiponatremia sintomática grave',
    wrong: [
      'Corrigir +20 mEq em 1 h em todo caso',
      'Restrição hídrica apenas sem tratar convulsão/grave',
      'Diálise de rotina em Na 125 assintomático',
      'Soro hipotônico livre',
    ],
    explanation:
      'Hiponatremia sintomática grave: bolo de NaCl 3% e correção controlada.',
  },
  {
    subtopic: 'Hipercalemia',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Criança com K ${(6.5 + (i % 5) / 10).toFixed(1)}, alterações no ECG. Conduta imediata?`,
    correct: 'Estabilizar membrana (cálcio EV se ECG alterado) + medidas para reduzir K e tratar causa',
    wrong: [
      'Apenas observação sem ECG',
      'Soro com K adicional',
      'Espiroolactona de urgência',
      'Ignorar alterações eletrocardiográficas',
    ],
    explanation:
      'Hipercalemia com ECG: cálcio para estabilizar; depois insulina/glicose, beta-agonista, etc.',
  },
  {
    subtopic: 'Síndrome nefrítica x nefrótica',
    difficulty: 'facil',
    stem: (i, age) =>
      `Quadro com hematúria, HTA e oligúria em criança de ${age} anos sugere predominantemente?`,
    correct: 'Síndrome nefrítica aguda',
    wrong: [
      'Apenas síndrome nefrótica pura sem inflamação',
      'Diabetes insipidus',
      'Hipotireoidismo isolado',
      'Anemia ferropriva isolada',
    ],
    explanation:
      'Nefrítica: hematúria, HTA, oligúria/edema; nefrótica: proteinúria maciça, hipoalbuminemia, edema.',
  },
  {
    subtopic: 'Vacinação e imunossupressão',
    difficulty: 'medio',
    stem: (i, age) =>
      `Criança de ${age} anos com síndrome nefrótica em corticoterapia alta. Orientação vacinal?`,
    correct: 'Evitar vacinas vivas durante imunossupressão significativa; manter inativadas conforme PNI/orientações',
    wrong: [
      'Aplicar tríplice viral viva no pico de imunossupressão sem avaliar',
      'Suspender todas as vacinas para sempre',
      'BCG de reforço mensal',
      'Nenhuma restrição nunca',
    ],
    explanation:
      'Imunossuprimidos: cautela com vacinas vivas; planejar com infectologia/PNI.',
  },
  {
    subtopic: 'Dialise pediátrica',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Criança de ${age} anos com IRA e hipercapnia refratária / hipercalemia refratária / anasarca. Indicação?`,
    correct: 'Considerar terapia renal substitutiva (diálise) conforme indicações AEIOU adaptadas à pediatria',
    wrong: [
      'Diálise apenas se creatinina > 10 em qualquer idade',
      'Nunca dialisar menores de 10 anos',
      'Só transplante como única opção aguda',
      'Furosemida em dose única resolve toda indicação',
    ],
    explanation:
      'Indicações de diálise são clínicas (AEIOU), não um número fixo de creatinina.',
  },
  {
    subtopic: 'Proteinúria ortostática',
    difficulty: 'facil',
    stem: (i, age) =>
      `Adolescente de ${age} anos com proteinúria intermitente, amostra matinal negativa e após ortostatismo positiva, função renal normal. Conduta?`,
    correct: 'Provável proteinúria ortostática: acompanhar; evitar biópsia de rotina',
    wrong: [
      'Iniciar imunossupressão imediata sem confirmação',
      'Indicar diálise pela proteinúria ortostática',
      'Propor nefrectomia sem indicação clínica',
      'Internação em UTI de rotina neste padrão',
    ],
    explanation:
      'Proteinúria ortostática é benigna na maioria; confirmar padrão e seguir.',
  },
  {
    subtopic: 'HUS atípica',
    difficulty: 'dificil',
    stem: (i, age) =>
      `Criança sem diarreia prévia com microangiopatia, IRA e complemento alterado — pensar em?`,
    correct: 'SHU atípica: suporte e avaliação de complemento / genética; terapia específica conforme protocolo',
    wrong: [
      'Tratar sempre como GNPE sem investigação',
      'Antibiotico isolado cura sempre',
      'Ignorar microangiopatia',
      'Alta domiciliar imediata',
    ],
    explanation:
      'SHU atípica difere da D+; exige abordagem especializada (complemento/eculizumabe etc. conforme caso).',
  },
  {
    subtopic: 'CAKUT',
    difficulty: 'medio',
    stem: (i, age) =>
      `RN com dilatação pielocalicial pré-natal bilateral. Conduta pós-natal inicial?`,
    correct: 'Ultrassom pós-natal e seguimento urológico/nefrológico conforme gravidade',
    wrong: [
      'Cirurgia na sala de parto em toda dilatação leve',
      'Nenhum exame de imagem nunca',
      'Corticosteroide neonatal de rotina',
      'Suspender aleitamento',
    ],
    explanation:
      'CAKUT: confirmar com US pós-natal e estratificar risco de infecção/função.',
  },
];

function rotate(correct, wrongs, salt) {
  const items = [correct, ...wrongs.slice(0, 4)];
  const rot = salt % items.length;
  const options = items.map((_, i) => items[(i + rot) % items.length]);
  return {
    options,
    correct_option: LETTERS[options.indexOf(correct)],
  };
}

function main() {
  const now = new Date().toISOString();
  const questions = [];
  for (let i = 0; i < COUNT; i++) {
    const t = TEMPLATES[i % TEMPLATES.length];
    const age =
      t.subtopic.includes('Lactente') || t.subtopic.includes('RN')
        ? 1 + (i % 11)
        : 2 + ((i * 3) % 15);
    const { options, correct_option } = rotate(t.correct, t.wrong, i + 17);
    questions.push({
      id: `nefroped-${String(i + 1).padStart(3, '0')}`,
      statement: t.stem(i, age),
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      option_e: options[4],
      correct_option,
      explanation: `${t.explanation} Questão inédita MedRank para treino de nefropediatria (estilo SBN / SBNPed).`,
      source: 'MedRank',
      year: 2026,
      specialty: 'Nefropediatria',
      topic: 'Nefropediatria',
      subtopic: t.subtopic,
      difficulty: t.difficulty,
      tags: [
        'MedRank',
        'original',
        'nefropediatria',
        'estilo-SBN',
        'estilo-SBNPed',
        'treino-sbn',
        t.subtopic,
      ],
      image_url: null,
      bibliography:
        'Conteúdo original MedRank. Estilo pedagógico inspirado em cobrança de nefrologia pediátrica (SBN / Sociedade Brasileira de Nefropediatria) — não é cópia de prova oficial.',
      created_at: now,
    });
  }

  const out = {
    meta: {
      total: questions.length,
      track: 'nefropediatria',
      style_tags: ['estilo-SBN', 'estilo-SBNPed'],
      generated_at: now,
      license_note:
        'Originais MedRank para treino. Não reproduz provas oficiais da SBN ou Sociedade Brasileira de Nefropediatria.',
    },
    questions,
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${questions.length} questions → ${OUT}`);
}

main();
