import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'arrival',
    title: 'Chegada da Paciente',
    subtitle: 'Maria Silva, 58 anos — inchaço nas pernas',
    steps: [
      {
        kind: 'dialogue',
        character: 'nurse',
        text: 'Doutor, chegou a paciente Maria Silva, 58 anos. Diabética há 12 anos, hipertensa. Queixa de inchaço nas pernas há 2 semanas.',
      },
      {
        kind: 'dialogue',
        character: 'patient',
        text: 'Doutor, minhas pernas estão muito inchadas... estou cansada o tempo todo e a urina ficou espumosa.',
      },
      {
        kind: 'choice',
        character: 'doctor',
        prompt: 'Qual é a sua primeira conduta?',
        options: [
          { id: 'a', label: 'Anamnese completa e aferir sinais vitais' },
          { id: 'b', label: 'Prescrever furosemida imediatamente' },
          { id: 'c', label: 'Solicitar internação em UTI sem avaliar' },
        ],
        correctId: 'a',
        explanation:
          'Antes de qualquer conduta, é essencial avaliar o quadro: história clínica, exame físico e sinais vitais. Inchaço + urina espumosa sugerem proteinúria — possível comprometimento renal.',
        timerSeconds: 25,
        healthPenalty: 12,
      },
    ],
  },
  {
    id: 'vitals',
    title: 'Sinais Vitais',
    subtitle: 'A paciente está piorando',
    steps: [
      {
        kind: 'dialogue',
        character: 'system',
        text: 'Sinais vitais: PA 168/102 mmHg · FC 94 bpm · FR 20 irpm · Temp 37,2°C · SpO₂ 96%. Edema 2+/4+ em membros inferiores.',
      },
      {
        kind: 'dialogue',
        character: 'patient',
        text: 'Doutor, estou com mais dificuldade para respirar... o inchaço piorou.',
      },
      {
        kind: 'choice',
        character: 'nurse',
        prompt: 'Doutor, a pressão está difícil de controlar. O que priorizamos agora?',
        options: [
          { id: 'a', label: 'Iniciar anti-hipertensivo e monitorar diurese' },
          { id: 'b', label: 'Alta com orientação de repouso' },
          { id: 'c', label: 'Ignorar — focar só na diabetes' },
        ],
        correctId: 'a',
        explanation:
          'Pressão alta não controlada é uma das principais causas de doença renal crônica. Em paciente diabética com edema e proteinúria, controle pressórico e avaliação da função renal são urgentes.',
        timerSeconds: 20,
        healthPenalty: 15,
      },
    ],
  },
  {
    id: 'exams',
    title: 'Solicitação de Exames',
    subtitle: 'O que pedir neste hospital?',
    steps: [
      {
        kind: 'dialogue',
        character: 'nurse',
        text: 'Doutor, qual exame devo solicitar? Lembre que neste hospital não temos tomografia nem ressonância.',
      },
      {
        kind: 'exam',
        character: 'doctor',
        prompt: 'Qual painel de exames é mais adequado para avaliar função renal nesta paciente?',
        hospitalNote: 'Exames disponíveis: laboratório, EAS, ultrassom. Sem TC/RM.',
        options: [
          { id: 'a', label: 'Creatinina, ureia, potássio, EAS e relação albumina/creatinina' },
          { id: 'b', label: 'Tomografia de abdome com contraste' },
          { id: 'c', label: 'Apenas hemograma completo' },
          { id: 'd', label: 'Ressonância magnética dos rins' },
        ],
        correctId: 'a',
        explanation:
          'Creatinina sozinha não basta! Para avaliar função renal de verdade, precisamos de eGFR (a partir da creatinina), presença de proteína na urina (relação albumina/creatinina) e EAS. Tomografia e RM não estão disponíveis aqui.',
        timerSeconds: 30,
        healthPenalty: 10,
      },
    ],
  },
  {
    id: 'infection',
    title: 'Infecção de Pele',
    subtitle: 'Febre e ferida na perna',
    steps: [
      {
        kind: 'dialogue',
        character: 'nurse',
        text: 'Doutor, agora a paciente está com febre de 38,6°C. Tem ferida na perna direita, com rubor e calor local.',
      },
      {
        kind: 'dialogue',
        character: 'patient',
        text: 'Doutor, a perna está doendo muito... a ferida abriu sozinha.',
      },
      {
        kind: 'medication',
        character: 'nurse',
        prompt: 'Doutor, preciso da prescrição de antibiótico. Qual medicamento e qual dose?',
        drugOptions: [
          { id: 'oxa', label: 'Oxacilina' },
          { id: 'amox', label: 'Amoxicilina' },
          { id: 'metro', label: 'Metronidazol' },
        ],
        doseOptions: [
          { id: 'd1', label: '2 g IV de 6/6 horas' },
          { id: 'd2', label: '500 mg VO de 12/12 horas' },
          { id: 'd3', label: '1 g IM 1x ao dia' },
        ],
        correctDrugId: 'oxa',
        correctDoseId: 'd1',
        explanation:
          'Celulite por provável Staphylococcus → oxacilina é a escolha. Dose adequada: 2 g IV de 6/6h. Em paciente com função renal comprometida, sempre revisar dose e monitorar potássio.',
        timerSeconds: 35,
        healthPenalty: 18,
      },
    ],
  },
  {
    id: 'results',
    title: 'Resultados dos Exames',
    subtitle: 'Interpretando o quadro renal',
    steps: [
      {
        kind: 'dialogue',
        character: 'system',
        text: 'Resultados: Creatinina 2,4 mg/dL · Ureia 78 mg/dL · Potássio 5,6 mEq/L · eGFR estimado: 28 mL/min/1,73m² · Relação albumina/creatinina: 450 mg/g · EAS: proteinúria 2+.',
      },
      {
        kind: 'dialogue',
        character: 'nurse',
        text: 'Doutor, o potássio está alto e a função renal está bem reduzida. A paciente está sonolenta.',
      },
      {
        kind: 'choice',
        character: 'doctor',
        prompt: 'Qual é a interpretação mais adequada?',
        options: [
          { id: 'a', label: 'DRC estágio G4 com proteinúria significativa — risco cardiovascular alto' },
          { id: 'b', label: 'Rins normais — creatinina isolada não significa nada' },
          { id: 'c', label: 'Apenas desidratação — alta com orientação de água' },
        ],
        correctId: 'a',
        explanation:
          'eGFR de 28 coloca a paciente em estágio G4. Proteinúria significativa + diabetes + hipertensão = doença renal crônica avançada. Potássio de 5,6 exige atenção imediata.',
        timerSeconds: 25,
        healthPenalty: 15,
      },
    ],
  },
  {
    id: 'referral',
    title: 'Encaminhamento',
    subtitle: 'Quando chamar o nefrologista?',
    steps: [
      {
        kind: 'dialogue',
        character: 'patient',
        text: 'Doutor, vou precisar fazer diálise? Estou com medo...',
      },
      {
        kind: 'choice',
        character: 'nurse',
        prompt: 'Doutor, devo agendar nefrologista? Quando é indicado encaminhar?',
        options: [
          { id: 'a', label: 'eGFR < 30, proteinúria persistente ou potássio difícil de controlar' },
          { id: 'b', label: 'Somente quando a creatinina passar de 10' },
          { id: 'c', label: 'Nunca — o clínico resolve sozinho' },
          { id: 'd', label: 'Apenas se o paciente pedir' },
        ],
        correctId: 'a',
        explanation:
          'Encaminhar ao nefrologista quando: eGFR < 30, queda progressiva da função, proteinúria, hipercalemia refratária, diabetes com alteração renal ou histórico familiar. Prevenir é melhor que descobrir tarde.',
        timerSeconds: 25,
        healthPenalty: 10,
      },
      {
        kind: 'dialogue',
        character: 'doctor',
        text: 'Maria, vamos cuidar de você em equipe. Ajustamos medicamentos, tratamos a infecção e o nefrologista vai acompanhar de perto.',
      },
      {
        kind: 'dialogue',
        character: 'patient',
        text: 'Obrigada, doutor e enfermeira. Me sinto mais segura agora.',
      },
    ],
  },
];
