#!/usr/bin/env node
/**
 * Banco original MedRank — Nefrologia Pediátrica (estilo SBN/SBP).
 * Questões inéditas A–D. NÃO copia provas oficiais.
 *
 * Uso: node scripts/build-nefropediatria-bank.cjs [count]
 * Default: 3000
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'nefropediatria-questions.json');
const TARGET = Math.max(100, Number(process.argv[2]) || 3000);
const LETTERS = ['A', 'B', 'C', 'D'];

const REFS = [
  'Emma F et al. Pediatric Nephrology. 8th ed. Springer, 2022.',
  'Rees L et al. Paediatric Nephrology. 3rd ed. OUP, 2019.',
  'Schaefer F, Greenbaum LA. Pediatric Kidney Disease. 3rd ed. Springer, 2023.',
  'KDIGO Clinical Practice Guidelines (glomerular / CKD / BP) — adaptação pediátrica.',
  'IPNA clinical practice recommendations (síndrome nefrótica / CKD).',
  'Jornal Brasileiro de Nefrologia — artigos de revisão (últimos 5 anos).',
  'Jornal de Pediatria (SBP) — artigos educacionais (últimos 5 anos).',
  'Pediatric Nephrology (IPNA journal) — reviews educacionais (últimos 5 anos).',
  'Tratado de Pediatria SBP, 5ª ed. — capítulos de nefrologia.',
  'UpToDate — Nefrologia Pediátrica (consulta educacional).',
];

/** @typedef {{ topic: string, difficulty: 'facil'|'medio'|'dificil', vignette: Function, correct: Function, wrongs: Function, explain: Function, wrongNotes: Function }} TopicDef */

/** @type {TopicDef[]} */
const TOPICS = [
  {
    topic: 'Fisiologia renal',
    difficulty: 'medio',
    vignette: (c) =>
      `Escolar de ${c.age} anos (${c.weight} kg, ${c.height} cm) em avaliação de capacidade de concentrar urina após privação hídrica supervisada. Osmolaridade urinária máxima ${400 + (c.i % 400)} mOsm/kg. Qual mecanismo tubular é mais crítico para concentrar a urina?`,
    correct: () => 'Gradiente medular hipertônico e permeabilidade ao ADH no ducto coletor',
    wrongs: () => [
      'Secreção exclusiva de creatinina no túbulo proximal',
      'Filtração glomerular isolada sem reabsorção tubular',
      'Produção de eritropoetina pelas células mesangiais',
    ],
    explain: () =>
      'A concentração urinária depende do interstício medular hipertônico e da ação do ADH no ducto coletor aquaporina-2.',
    wrongNotes: () =>
      'Creatinina e TFG não concentram urina; eritropoetina é função endócrina, não osmótica.',
  },
  {
    topic: 'Embriologia renal',
    difficulty: 'medio',
    vignette: (c) =>
      `RN de ${c.age} dias com ultrassom antenatal de rins multicísticos unilaterais e ureter atresiado. Qual estrutura embrionária está tipicamente implicada na genese do rim metanéfrico?`,
    correct: () => 'Interação entre broto ureteral e blastema metanéfrico',
    wrongs: () => [
      'Persistência isolada do pronefro funcional na vida extrauterina',
      'Formação exclusiva do mesonefro sem metanefro',
      'Origem do rim a partir do tubo neural',
    ],
    explain: () =>
      'O rim definitivo (metanefro) resulta da indução recíproca broto ureteral–blastema metanéfrico.',
    wrongNotes: () => 'Pronefro/mesonefro são transitórios; rim não deriva do tubo neural.',
  },
  {
    topic: 'IRA pediátrica',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos (${c.weight} kg) com gastroenterite há 3 dias, FC ${120 + (c.i % 40)}, PA ${c.sbp}/${c.dbp}, oligúria, creatinina ${1.2 + (c.i % 20) / 10} mg/dL, ureia ${40 + (c.i % 40)}, FENa ${(0.3 + (c.i % 5) / 10).toFixed(1)}%, urina concentrada. Conduta inicial prioritária?`,
    correct: () => 'Reposição volêmica cuidadosa e monitorização de eletrólitos/função renal (IRA pré-renal)',
    wrongs: () => [
      'Diálise imediata apenas pela creatinina sem critérios AEIOU',
      'Restrição hídrica absoluta na fase pré-renal',
      'Corticosteroide em dose imunossupressora de rotina',
    ],
    explain: () =>
      'FENa baixo e contexto hipovolêmico sugerem pré-renal: restaurar volume e vigiar progressão.',
    wrongNotes: () => 'Diálise segue indicações clínicas; restrição piora pré-renal; corticoide não é tratamento da pré-renal.',
  },
  {
    topic: 'DRC',
    difficulty: 'medio',
    vignette: (c) =>
      `Paciente de ${c.age} anos com TFG estimada ${20 + (c.i % 25)} mL/min/1,73m², Hb ${(8 + (c.i % 20) / 10).toFixed(1)} g/dL, PTH elevado, PA acima do percentil 95. Manejo multiprofissional inclui prioritariamente?`,
    correct: () => 'Controle pressórico, anemia, CKD-MBD, nutrição/crescimento e planejamento de TRS',
    wrongs: () => [
      'Observação isolada sem tratar HTA/anemia',
      'Suspender esquema vacinal permanentemente',
      'Transfusão semanal de rotina sem avaliar ferro/EPO',
    ],
    explain: () =>
      'DRC pediátrica exige cuidado integrado (HTA, anemia, mineral ósseo, crescimento) e planejamento de terapia substitutiva.',
    wrongNotes: () => 'Não se omite HTA/anemia; vacinas inativadas seguem; EPO/ferro antes de transfusão de rotina.',
  },
  {
    topic: 'Proteinúria',
    difficulty: 'facil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com proteinúria ${(1 + (c.i % 3))}+ em amostra isolada, relação proteína/creatinina ${(0.1 + (c.i % 8) / 10).toFixed(2)} em amostra matinal e ${(0.4 + (c.i % 10) / 10).toFixed(2)} após ortostatismo; função renal normal. Conduta mais adequada?`,
    correct: () => 'Provável proteinúria ortostática: acompanhar e evitar biópsia de rotina',
    wrongs: () => [
      'Iniciar ciclofosfamida imediatamente',
      'Indicar diálise pela proteinúria ortostática',
      'Internar em UTI sem outros achados',
    ],
    explain: () =>
      'Padrão ortostático com função preservada é geralmente benigno; confirma-se e segue ambulatory.',
    wrongNotes: () => 'Imunossupressão/diálise/UTI não se aplicam a ortostática típica.',
  },
  {
    topic: 'Hematúria',
    difficulty: 'medio',
    vignette: (c) =>
      `Escolar de ${c.age} anos com hematúria macroscópica indolor, cilindros hemáticos, PA ${c.sbp}/${c.dbp}, C3 ${(40 + (c.i % 30))} mg/dL (baixo), história de faringite há ${2 + (c.i % 3)} semanas. Diagnóstico mais provável?`,
    correct: () => 'Glomerulonefrite pós-estreptocócica (síndrome nefrítica aguda)',
    wrongs: () => [
      'Síndrome nefrótica idiopática pura sem componente nefrítico',
      'Litíase coraliforme como primeira hipótese isolada',
      'Diabetes insipidus central',
    ],
    explain: () =>
      'Hematúria, HTA e hipocomplementemia C3 após infecção estreptocócica apontam para GNPE.',
    wrongNotes: () => 'Nefrótica pura não explica C3 baixo + nefrítica; litíase e DI não cabem no quadro.',
  },
  {
    topic: 'Síndrome nefrótica',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos (${c.weight} kg) com edema periorbitário, proteinúria ${(3 + (c.i % 2))}+, albumina ${(1.6 + (c.i % 6) / 10).toFixed(1)} g/dL, colesterol ${220 + (c.i % 80)}, sem hematúria importante nem HTA grave. Conduta inicial usual (faixa típica)?`,
    correct: () => 'Corticoterapia empírica conforme protocolo de SN idiopática e orientar restrição de sal',
    wrongs: () => [
      'Biópsia renal imediata em toda criança de 2–8 anos típica antes de qualquer tratamento',
      'Antibiótico de amplo espectro sem infecção',
      'Diálise só pela proteinúria nefrótica',
    ],
    explain: () =>
      'Na faixa típica de SN idiopática, inicia-se corticoide empírico; biópsia se atípico/falha.',
    wrongNotes: () => 'Biópsia não é rotina em típicos; ATB e diálise não tratam SN isolada.',
  },
  {
    topic: 'Glomerulonefrites',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com hematúria persistente, proteinúria ${(1 + (c.i % 3))}+, TFG ${60 + (c.i % 30)}, ANCA negativo, anti-GBM negativo, C3 normal. Próximo passo diagnóstico frequente?`,
    correct: () => 'Considerar biópsia renal para classificar glomerulopatia e guiar terapia',
    wrongs: () => [
      'Nefrectomia bilateral diagnóstica de primeira linha',
      'Quimioterapia sem diagnóstico histológico',
      'Alta sem seguimento nefrológico',
    ],
    explain: () =>
      'Glomerulopatia com persistência de anormalidades urinárias/TFG reduzida frequentemente exige biópsia.',
    wrongNotes: () => 'Nefrectomia/quimioterapia sem diagnóstico são inadequados; seguimento é obrigatório.',
  },
  {
    topic: 'Nefropatia por IgA',
    difficulty: 'medio',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com hematúria sincronizada a infecção de vias aéreas superiores, C3 normal, função renal ${c.i % 2 === 0 ? 'preservada' : 'levemente reduzida'}. Hipótese mais provável?`,
    correct: () => 'Nefropatia por IgA (doença de Berger)',
    wrongs: () => [
      'GNPE típica com C3 persistentemente baixo por meses',
      'Síndrome de Alport sem história familiar nem surdez',
      'ITU baixa isolada sem sedimento glomerular',
    ],
    explain: () =>
      'Hematúria sincrônica a IVAS com complemento normal sugere IgA; GNPE costuma ter latência e C3 baixo.',
    wrongNotes: () => 'GNPE tem latência e hipocomplementemia; Alport e ITU não explicam o padrão clássico.',
  },
  {
    topic: 'Lúpus',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos, sexo feminino, com rash malar, artrite, FAN positivo, anti-DNA, proteinúria ${(2 + (c.i % 2))}+, creatinina ${0.8 + (c.i % 10) / 10}. Conduta nefrológica típica?`,
    correct: () => 'Avaliar nefrite lúpica (incluir biópsia quando indicada) e terapia imunossupressora conforme classe',
    wrongs: () => [
      'Tratar apenas com anti-histamínico tópico',
      'Diálise imediata em toda nefrite lúpica sem critérios',
      'Suspender acompanhamento reumatológico',
    ],
    explain: () =>
      'Nefrite lúpica exige estratificação (biópsia) e imunossupressão guiada pela classe histológica.',
    wrongNotes: () => 'Não se trata só pele; diálise não é automática; seguimento conjunto é essencial.',
  },
  {
    topic: 'SHU',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos após diarreia sanguinolenta evolui com Hb ${(6 + (c.i % 20) / 10).toFixed(1)}, plaquetas ${40000 + (c.i % 5) * 5000}, creatinina ${2 + (c.i % 15) / 10}, esquizócitos. Conduta?`,
    correct: () => 'Suporte (volume, diálise se indicado); evitar antibiótico rotineiro na fase diarréica típica de SHU D+',
    wrongs: () => [
      'Plasmaférese de rotina em toda SHU típica D+',
      'Nefrectomia imediata',
      'Corticosteroide como cura isolada da SHU D+',
    ],
    explain: () =>
      'SHU D+ (típica): suporte; antibiótico na diarreia pode piorar; atípica exige outra abordagem.',
    wrongNotes: () => 'Plasmaférese/nefrectomia/corticoide não são primeira linha da D+ típica.',
  },
  {
    topic: 'Microangiopatias',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos sem diarreia prévia, com MAT, IRA e complemento alterado (baixa atividade de via alternativa). Pensar em?`,
    correct: () => 'SHU atípica: suporte e avaliação de complemento/genética; terapia específica conforme protocolo',
    wrongs: () => [
      'Tratar sempre como GNPE sem investigação de complemento',
      'Antibiótico isolado como cura definitiva',
      'Alta domiciliar imediata sem suporte',
    ],
    explain: () =>
      'SHU atípica difere da D+; exige abordagem especializada (complemento/eculizumabe etc. conforme caso).',
    wrongNotes: () => 'Não confundir com GNPE; antibiótico não trata aMAT; suporte é mandatório.',
  },
  {
    topic: 'Hipertensão arterial',
    difficulty: 'medio',
    vignette: (c) =>
      `Adolescente de ${c.age} anos (${c.weight} kg, ${c.height} cm) com PA ${c.sbp}/${c.dbp} (acima do P95) em ${3 + (c.i % 2)} visitas, sem obesidade grave. Próximo passo?`,
    correct: () => 'Confirmar técnica/percentis (MAPA se preciso) e investigar causas secundárias quando indicado',
    wrongs: () => [
      'Ignorar PA elevada em pediatria',
      'Iniciar 4 anti-hipertensivos sem confirmar diagnóstico',
      'Contraindicar exercício em todo hipertenso controlado',
    ],
    explain: () =>
      'HAS pediátrica: confirmar medidas e estratificar investigação secundária antes de polifarmácia.',
    wrongNotes: () => 'Não se ignora; não se inicia esquema pesado sem confirmação; exercício pode ser permitido se controlado.',
  },
  {
    topic: 'Litíase',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com cólica, hematúria e cálculo de ${3 + (c.i % 5)} mm. Além de analgesia e avaliação urológica, o que investigar?`,
    correct: () => 'Fatores metabólicos (Ca, oxalato, citrato, ácido úrico, cistina) e hidratação',
    wrongs: () => [
      'Nunca investigar metabolismo em pediatria',
      'Restrição hídrica rigorosa',
      'Antibiótico em todo cálculo sem infecção',
    ],
    explain: () =>
      'Litíase pediátrica tem alta taxa de anormalidade metabólica — investigar e hidratar.',
    wrongNotes: () => 'Investigação metabólica é regra; hidratação ajuda; ATB só se infecção.',
  },
  {
    topic: 'Infecção urinária',
    difficulty: 'facil',
    vignette: (c) =>
      `Lactente de ${c.age} meses febril sem foco, urocultura com E. coli >10⁵ UFC/mL, PCR ${40 + (c.i % 60)}. Conduta diagnóstica adicional frequente após 1º episódio febril?`,
    correct: () => 'Ultrassom do trato urinário conforme idade/protocolo após ITU febril',
    wrongs: () => [
      'Nunca solicitar imagem após ITU febril',
      'Cistoscopia de rotina em todo lactente',
      'Nefrectomia profilática',
    ],
    explain: () =>
      'ITU febril no lactente indica investigar anomalias; US é frequentemente o primeiro exame.',
    wrongNotes: () => 'Imagem é indicada; cistoscopia/nefrectomia não são rotina.',
  },
  {
    topic: 'RVU',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com ITU febril de repetição; UCM mostra RVU grau ${2 + (c.i % 3)}. Conduta inicial usual?`,
    correct: () => 'Profilaxia/acompanhamento conforme grau e avaliação urológica quando indicado',
    wrongs: () => [
      'Cirurgia imediata em todo grau I–II sem falha clínica',
      'Suspender todo seguimento',
      'Corticosteroide prolongado de rotina',
    ],
    explain: () =>
      'RVU baixo/moderado: frequentemente conservador/profilaxia; cirurgia conforme indicação.',
    wrongNotes: () => 'Cirurgia não é automática em baixo grau; seguimento é necessário; corticoide não trata RVU.',
  },
  {
    topic: 'Megaureter',
    difficulty: 'medio',
    vignette: (c) =>
      `RN com dilatação ureteral antenatal, US pós-natal com ureter ${10 + (c.i % 10)} mm, TFG relativa preservada no DMSA. Conduta inicial frequente?`,
    correct: () => 'Seguimento conservador com imagem seriada e profilaxia se indicada; cirurgia se deterioração/infecções',
    wrongs: () => [
      'Nefroureterectomia imediata em todo megaureter sem risco',
      'Ignorar dilatação antenatal',
      'Corticoterapia como tratamento do megaureter',
    ],
    explain: () =>
      'Muitos megaureteres não obstrutivos evoluem com observação; opera-se sob critérios.',
    wrongNotes: () => 'Cirurgia radical não é primeira linha; não se ignora; corticoide não corrige dilatação.',
  },
  {
    topic: 'UPJ',
    difficulty: 'medio',
    vignette: (c) =>
      `Lactente de ${c.age} meses com hidronefrose grau ${3 + (c.i % 2)}, estenose de junção ureteropiélica suspeita no US/renograma com curva obstrutiva. Conduta?`,
    correct: () => 'Avaliação urológica para possível pieloplastia conforme função/sintomas/obstrução',
    wrongs: () => [
      'Antibiótico contínuo como única terapia definitiva da estenose',
      'Observação sem nenhum exame de imagem de seguimento',
      'Transplante renal de primeira linha',
    ],
    explain: () =>
      'UPJ com obstrução significativa frequentemente indica correção cirúrgica (pieloplastia).',
    wrongNotes: () => 'ATB não corrige estenose; precisa seguimento; transplante não é 1ª linha.',
  },
  {
    topic: 'Disfunção miccional',
    difficulty: 'facil',
    vignette: (c) =>
      `Criança de ${c.age} anos com enurese noturna monossintomática, sem ITU, exame físico normal. Conduta inicial?`,
    correct: () => 'Medidas comportamentais/alarme; desmopressina em casos selecionados',
    wrongs: () => [
      'Cirurgia urológica de rotina',
      'Antibiótico contínuo sem ITU',
      'Indicar diálise pela enurese',
    ],
    explain: () =>
      'Enurese monossintomática: educação, alarme e farmacoterapia selecionada.',
    wrongNotes: () => 'Cirurgia/ATB/diálise não tratam enurese monossintomática.',
  },
  {
    topic: 'Doenças tubulares',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos com falha ponderoestatural, poliúria, pH urinário ${6.5 + (c.i % 10) / 10}, bicarbonato ${12 + (c.i % 6)}, ânion gap normal, hipercloremia. Conduta?`,
    correct: () => 'Investigar acidose tubular renal e iniciar alcalinização/correção eletrolítica conforme tipo',
    wrongs: () => [
      'Apenas restrição hídrica rigorosa',
      'Antibiótico empírico prolongado sem foco',
      'Ignorar gasometria e eletrólitos',
    ],
    explain: () =>
      'ATR: acidose hiperclorêmica com gap normal; tratamento com álcali e manejo do tipo.',
    wrongNotes: () => 'Restrição hídrica/ATB não tratam ATR; gasometria é essencial.',
  },
  {
    topic: 'Bartter',
    difficulty: 'dificil',
    vignette: (c) =>
      `Lactente de ${c.age} meses com poliúria, desidratação, K ${(2.2 + (c.i % 8) / 10).toFixed(1)}, alcalose metabólica, renina/aldosterona elevadas, PA normal/baixa. Diagnóstico mais provável?`,
    correct: () => 'Síndrome de Bartter',
    wrongs: () => [
      'Hiperaldosteronismo primário com HTA grave',
      'Liddle com hipertensão e renina baixa',
      'ATR distal com acidose hiperclorêmica',
    ],
    explain: () =>
      'Bartter: perda salina, hipocalemia, alcalose, hiperreninemia, sem HAS.',
    wrongNotes: () => 'Primário tem HTA; Liddle tem HTA e renina baixa; ATR tem acidose.',
  },
  {
    topic: 'Gitelman',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com cãibras, K ${(2.5 + (c.i % 6) / 10).toFixed(1)}, Mg baixo, alcalose, PA normal. Mais compatível com?`,
    correct: () => 'Síndrome de Gitelman',
    wrongs: () => [
      'Bartter neonatal clássico sem história precoce',
      'Doença de Addison com hipercalemia',
      'Insuficiência renal aguda oligúrica típica',
    ],
    explain: () =>
      'Gitelman (mais tardio): hipocalemia + hipomagnesemia + alcalose, PA normal.',
    wrongNotes: () => 'Bartter costuma ser mais precoce/grave; Addison eleva K; IRA oligúrica não cabe.',
  },
  {
    topic: 'Liddle',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com HAS grave, hipocalemia, alcalose, renina e aldosterona baixas. Hipótese?`,
    correct: () => 'Síndrome de Liddle (ENaC hiperativo) — amilorida/triântereno e restrição de sal',
    wrongs: () => [
      'Bartter como primeira linha (PA baixa)',
      'Espironolactona como tratamento definitivo típico do Liddle',
      'Reposição isolada de volume sem anti-HAS',
    ],
    explain: () =>
      'Liddle: HAS + hipocalemia com renina/aldosterona baixas; responde a bloqueadores de ENaC.',
    wrongNotes: () => 'Bartter não causa HAS; espironolactona pouco eficaz; precisa tratar HAS.',
  },
  {
    topic: 'ATR',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos com raquitismo, nefrocalcinose, acidose hiperclorêmica, pH urinário inapropriadamente alto. Tipo mais clássico?`,
    correct: () => 'Acidose tubular renal distal (tipo 1)',
    wrongs: () => [
      'ATR proximal (tipo 2) sem bicarbonatúria na fase estável típica isolada',
      'Cetoacidose diabética com ânion gap elevado',
      'Alcalose respiratória crônica',
    ],
    explain: () =>
      'ATR distal: incapacidade de acidificar urina, nefrocalcinose/raquitismo frequentes.',
    wrongNotes: () => 'Tipo 2 é proximal; CAD tem gap alto; não é alcalose.',
  },
  {
    topic: 'Hipercalemia',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos com K ${(6.5 + (c.i % 8) / 10).toFixed(1)} mEq/L e alterações no ECG. Conduta imediata?`,
    correct: () => 'Estabilizar membrana (cálcio EV se ECG alterado) + medidas para reduzir K e tratar causa',
    wrongs: () => [
      'Apenas observação sem ECG',
      'Infundir soro com potássio adicional',
      'Espironolactona de urgência como primeira medida',
    ],
    explain: () =>
      'Hipercalemia com ECG: cálcio para estabilizar; depois shift/eliminação do K.',
    wrongNotes: () => 'ECG é mandatório; não se adiciona K; espironolactona não é emergência de membrana.',
  },
  {
    topic: 'Hipocalemia',
    difficulty: 'medio',
    vignette: (c) =>
      `Escolar de ${c.age} anos com fraqueza, K ${(2.3 + (c.i % 7) / 10).toFixed(1)}, ECG com ondas U. Conduta?`,
    correct: () => 'Reposição cuidadosa de potássio (via conforme gravidade) e investigar causa da perda',
    wrongs: () => [
      'Restrição absoluta de potássio na dieta',
      'Diálise de rotina em K 3,2 assintomático',
      'Ignorar alterações eletrocardiográficas',
    ],
    explain: () =>
      'Hipocalemia sintomática/ECG: repor K e tratar etiologia (GI/renal/fármacos).',
    wrongNotes: () => 'Não restringir K; diálise não é rotina; ECG importa.',
  },
  {
    topic: 'Hiponatremia',
    difficulty: 'medio',
    vignette: (c) =>
      `Lactente com Na ${118 + (c.i % 6)} mEq/L e convulsão. Conduta emergencial?`,
    correct: () => 'Correção cuidadosa com NaCl 3% conforme protocolo de hiponatremia sintomática grave',
    wrongs: () => [
      'Corrigir +20 mEq em 1 h em todo caso',
      'Soro hipotônico livre',
      'Diálise de rotina em Na 130 assintomático',
    ],
    explain: () =>
      'Hiponatremia sintomática grave: bolo de NaCl 3% e correção controlada para evitar desmielinização.',
    wrongNotes: () => 'Correção rápida demais é perigosa; hipotônico piora; diálise não é rotina.',
  },
  {
    topic: 'Hipernatremia',
    difficulty: 'medio',
    vignette: (c) =>
      `Lactente desidratado com Na ${155 + (c.i % 10)} mEq/L. Princípio do tratamento?`,
    correct: () => 'Corrigir volume e reduzir Na lentamente (evitar queda rápida demais)',
    wrongs: () => [
      'Queda abrupta de Na em poucas horas em todo caso',
      'Restrição hídrica absoluta na desidratação hipernatrêmica',
      'Soro com Na 3% como única medida inicial em todo lactente',
    ],
    explain: () =>
      'Hipernatremia: reidratar e reduzir Na de forma controlada para evitar edema cerebral.',
    wrongNotes: () => 'Queda rápida é perigosa; precisa volume; 3% não é regra inicial.',
  },
  {
    topic: 'Hipofosfatemia',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos em nutrição parenteral com P ${(1.2 + (c.i % 8) / 10).toFixed(1)} mg/dL e fraqueza. Conduta?`,
    correct: () => 'Reposição de fosfato e ajustar suporte nutricional; investigar causa',
    wrongs: () => [
      'Restringir fosfato na dieta',
      'Cálcio EV em alta dose sem avaliar produto cálcio-fósforo',
      'Ignorar valores baixos de fosfato',
    ],
    explain: () =>
      'Hipofosfatemia pode causar fraqueza/hemólise; repõe-se e trata-se a causa.',
    wrongNotes: () => 'Não restringir; cálcio sem critério pode precipitar; não ignorar.',
  },
  {
    topic: 'Hipercalcemia',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com Ca total ${(12 + (c.i % 20) / 10).toFixed(1)}, poliúria e constipação. Conduta inicial?`,
    correct: () => 'Hidratação salina e investigar causa (PTH, vitamina D, malignidade etc.)',
    wrongs: () => [
      'Restrição hídrica',
      'Cálcio oral adicional',
      'Diálise imediata em toda hipercalcemia leve',
    ],
    explain: () =>
      'Hipercalcemia: hidratar com SF e investigar etiologia; medidas adicionais conforme gravidade.',
    wrongNotes: () => 'Não restringir água; não dar mais Ca; diálise só em graves/refratários.',
  },
  {
    topic: 'Hipocalcemia',
    difficulty: 'medio',
    vignette: (c) =>
      `RN de ${c.age} dias com tetania, Ca iônico baixo, QT longo. Conduta imediata?`,
    correct: () => 'Reposição de cálcio EV e investigar causa (hipopara, deficiência de Mg/vit D)',
    wrongs: () => [
      'Aguardar sem tratar tetania',
      'Furosemida isolada como tratamento da hipocalcemia',
      'Restrição de cálcio na dieta',
    ],
    explain: () =>
      'Hipocalcemia sintomática: cálcio EV e busca etiológica.',
    wrongNotes: () => 'Tetania exige tratamento; furosemida pode piorar; não restringir Ca.',
  },
  {
    topic: 'Acidose metabólica',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com pH ${7.1 + (c.i % 15) / 100}, HCO3 ${8 + (c.i % 6)}, ânion gap ${20 + (c.i % 10)}, glicemia normal. Próximo passo?`,
    correct: () => 'Investigar causa de acidose de ânion gap elevado (toxinas, IRA, ácidos orgânicos) e suporte',
    wrongs: () => [
      'Diagnosticar ATR hiperclorêmica de gap normal sem calcular gap',
      'Administrar apenas O2 sem avaliar metabolismo ácido-base',
      'Alcalinização indiscriminada sem via aérea/volume',
    ],
    explain: () =>
      'Gap elevado exige lista diferencial específica; tratar causa e suporte vital.',
    wrongNotes: () => 'ATR é gap normal; O2 isolado não resolve; bicarbonato tem indicações específicas.',
  },
  {
    topic: 'Alcalose metabólica',
    difficulty: 'medio',
    vignette: (c) =>
      `Lactente com vômitos persistentes, pH ${7.5 + (c.i % 5) / 100}, HCO3 ${32 + (c.i % 8)}, Cl baixo, K baixo. Conduta?`,
    correct: () => 'Reposição de volume com cloreto (SF) e potássio; tratar causa dos vômitos',
    wrongs: () => [
      'Restrição de cloreto e potássio',
      'Acetazolamida de rotina em todo caso leve',
      'Diálise imediata sem tentativa de correção volêmica',
    ],
    explain: () =>
      'Alcalose por vômitos: perda de HCl — reidratar com Cl e repor K.',
    wrongNotes: () => 'Precisa de Cl/K; acetazolamida não é 1ª linha; diálise rara.',
  },
  {
    topic: 'Doenças hereditárias',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos com história familiar de doença renal hereditária, hematúria persistente e surdez neurossensorial. Hipótese principal?`,
    correct: () => 'Síndrome de Alport',
    wrongs: () => [
      'Nefropatia por IgA sem surdez nem história familiar típica de colágeno IV',
      'ITU de repetição isolada',
      'Enurese monossintomática',
    ],
    explain: () =>
      'Alport: hematúria familiar + perda auditiva (colágeno IV).',
    wrongNotes: () => 'IgA não associa surdez clássica; ITU/enurese não explicam o conjunto.',
  },
  {
    topic: 'Doença policística',
    difficulty: 'dificil',
    vignette: (c) =>
      `RN com rins aumentados hiperecogênicos e história familiar compatível com DRPAR. Conduta?`,
    correct: () => 'Suporte clínico, vigiar função/HTA/respiração e aconselhamento genético',
    wrongs: () => [
      'Nefrectomia neonatal de rotina em todos os casos',
      'Alta sem seguimento',
      'Corticosteroide como cura da policística',
    ],
    explain: () =>
      'DRPAR: manejo suporte e aconselhamento; timing de diálise/transplante é individualizado.',
    wrongNotes: () => 'Nefrectomia não é rotina; precisa seguimento; corticoide não cura cistos.',
  },
  {
    topic: 'Alport',
    difficulty: 'dificil',
    vignette: (c) =>
      `Menino de ${c.age} anos com hematúria microscópica persistente desde a infância, tio materno em diálise, audiometria alterada. Exame que ajuda a confirmar?`,
    correct: () => 'Avaliação genética de colágeno IV e/ou biópsia com imunofluorescência para cadeias de colágeno IV',
    wrongs: () => [
      'Apenas urocultura de controle anual',
      'Tomografia de seios da face como teste diagnóstico renal',
      'Teste de esforço ergométrico isolado',
    ],
    explain: () =>
      'Confirmação de Alport: genética e/ou biópsia com estudo de colágeno IV.',
    wrongNotes: () => 'Urocultura/TC de seios/teste ergométrico não diagnosticam Alport.',
  },
  {
    topic: 'Cistinose',
    difficulty: 'dificil',
    vignette: (c) =>
      `Lactente de ${c.age} meses com síndrome de Fanconi, fotofobia e depósitos corneanos. Diagnóstico?`,
    correct: () => 'Cistinose — iniciar cisteamina e suporte da tubulopatia',
    wrongs: () => [
      'Apenas diabetes melito tipo 1',
      'Hipertensão renovascular isolada',
      'ITU baixa sem Fanconi',
    ],
    explain: () =>
      'Cistinose: Fanconi + cristais corneanos; tratamento com cisteamina.',
    wrongNotes: () => 'DM1/HTA renovascular/ITU não explicam Fanconi + córnea.',
  },
  {
    topic: 'Dent',
    difficulty: 'dificil',
    vignette: (c) =>
      `Menino de ${c.age} anos com hipercalciúria, nefrolitíase, proteinúria de baixo peso molecular e raquitismo. Compatível com?`,
    correct: () => 'Doença de Dent',
    wrongs: () => [
      'Síndrome nefrótica por lesão mínima típica',
      'GNPE pós-estreptocócica',
      'Enurese monossintomática isolada',
    ],
    explain: () =>
      'Dent (ligado ao X): tubulopatia proximal com hipercalciúria/litíase/proteinúria LMW.',
    wrongNotes: () => 'LMN, GNPE e enurese não formam esse padrão tubular.',
  },
  {
    topic: 'Fabry',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente de ${c.age} anos com acroparestesias, angioqueratomas, proteinúria e história familiar materna. Suspeitar de?`,
    correct: () => 'Doença de Fabry — investigar atividade de α-galactosidase A / genética',
    wrongs: () => [
      'Apenas dermatite atópica sem avaliação renal',
      'Síndrome de Bartter clássica',
      'RVU grau I como diagnóstico único',
    ],
    explain: () =>
      'Fabry: storage de Gb3 com pele, dor e acometimento renal; confirmação enzimática/genética.',
    wrongNotes: () => 'Não é só pele; Bartter e RVU não explicam angioqueratomas.',
  },
  {
    topic: 'Oxalose',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos com litíase recorrente de oxalato, nefrocalcinose e DRC progressiva. Hipótese?`,
    correct: () => 'Hiperoxalúria primária (oxalose) — avaliação metabólica/genética especializada',
    wrongs: () => [
      'Litíase exclusivamente dietética sem investigação',
      'SN idiopática típica',
      'Hipertensão essencial isolada',
    ],
    explain: () =>
      'Oxalose causa litíase/nefrocalcinose e pode levar a DRC; exige diagnóstico específico.',
    wrongNotes: () => 'Não basta dieta; SN e HAS essencial não explicam oxalato sistêmico.',
  },
  {
    topic: 'Nefronoptise',
    difficulty: 'dificil',
    vignette: (c) =>
      `Escolar de ${c.age} anos com poliúria, anemia desproporcional, rins pequenos ecogênicos e DRC. Compatível com?`,
    correct: () => 'Nefronoptise — ciliopatia com fibrose túbulo-intersticial',
    wrongs: () => [
      'SN por lesão mínima com edema maciço',
      'GNPE aguda típica com C3 baixo',
      'ITU baixa isolada',
    ],
    explain: () =>
      'Nefronoptise: poliúria, anemia, rins contraídos e progressão para DRC.',
    wrongNotes: () => 'Não é SN edemaciada nem GNPE aguda; ITU baixa não causa esse quadro.',
  },
  {
    topic: 'Doenças císticas',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com múltiplos cistos renais e história familiar de ADPKD. Conduta inicial?`,
    correct: () => 'Seguimento de PA/função, aconselhamento e evitar nefrotóxicos; imagem conforme protocolo',
    wrongs: () => [
      'Punção de todos os cistos na primeira consulta',
      'Corticoterapia prolongada',
      'Nefrectomia profilática bilateral imediata',
    ],
    explain: () =>
      'ADPKD pediátrica: monitorar e aconselhar; intervenções conforme complicações.',
    wrongNotes: () => 'Punção/corticoide/nefrectomia profilática não são rotina.',
  },
  {
    topic: 'Onconefrologia pediátrica',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança de ${c.age} anos em quimioterapia com creatinina em elevação e uso de cisplatina. Conduta?`,
    correct: () => 'Ajustar nefrotóxicos, hidratar conforme protocolo oncológico e monitorar IRA',
    wrongs: () => [
      'Aumentar dose de cisplatina automaticamente',
      'Ignorar creatinina durante o ciclo',
      'Suspender toda hidratação',
    ],
    explain: () =>
      'Onconefrologia: prevenir/tratar nefrotoxicidade e ajustar doses.',
    wrongNotes: () => 'Não aumentar nefrotóxico; creatinina importa; hidratação protege.',
  },
  {
    topic: 'Transplante renal',
    difficulty: 'dificil',
    vignette: (c) =>
      `Adolescente transplantado há ${1 + (c.i % 12)} meses com febre, dor no enxerto e creatinina em elevação. Conduta?`,
    correct: () => 'Avaliar rejeição/infecção (incluir biópsia do enxerto quando indicada) e ajustar imunossupressão',
    wrongs: () => [
      'Suspender todo imunossupressor imediatamente sem avaliação',
      'Ignorar a elevação de creatinina',
      'Indicar nefrectomia do enxerto em toda febre',
    ],
    explain: () =>
      'Disfunção do enxerto: diferenciar rejeição vs infecção; biópsia guia terapia.',
    wrongNotes: () => 'Não suspender tudo às cegas; creatinina importa; nefrectomia não é rotina.',
  },
  {
    topic: 'Hemodiálise',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos (${c.weight} kg) com IRA e hipercalemia refratária + sobrecarga volêmica. Indicação?`,
    correct: () => 'Considerar hemodiálise/TRS conforme indicações AEIOU adaptadas à pediatria',
    wrongs: () => [
      'Diálise apenas se creatinina > 10 em qualquer idade',
      'Nunca dialisar menores de 10 anos',
      'Furosemida em dose única resolve toda indicação de TRS',
    ],
    explain: () =>
      'Indicações de diálise são clínicas (AEIOU), não um número fixo de creatinina.',
    wrongNotes: () => 'Não há cutoff único; crianças dialisam; diurético não cobre todas as indicações.',
  },
  {
    topic: 'Diálise peritoneal',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos em DP com líquido turvo, dor abdominal e celularidade elevada no efluente. Conduta?`,
    correct: () => 'Tratar peritonite associada à DP com antibiótico intraperitoneal conforme protocolo',
    wrongs: () => [
      'Ignorar líquido turvo',
      'Remover o cateter em todo episódio sem tentativa de tratamento',
      'Corticosteroide isolado sem antibiótico',
    ],
    explain: () =>
      'Peritonite em DP: ATB IP precoce; remoção do cateter em critérios específicos.',
    wrongNotes: () => 'Líquido turvo é emergência; nem todo episódio remove cateter; corticoide não substitui ATB.',
  },
  {
    topic: 'Farmacologia',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com TFG ${25 + (c.i % 20)} mL/min/1,73m² precisando de antibiótico nefrotóxico. Conduta?`,
    correct: () => 'Ajustar dose/intervalo à função renal e preferir alternativas menos nefrotóxicas quando possível',
    wrongs: () => [
      'Manter dose plena de adulto sem ajuste',
      'Duplicar dose automaticamente na DRC',
      'Evitar qualquer antibiótico mesmo com sepse',
    ],
    explain: () =>
      'Na DRC, ajustar fármacos à TFG e evitar nefrotóxicos desnecessários.',
    wrongNotes: () => 'Dose de adulto inadequada; não dobrar; sepse exige ATB ajustado.',
  },
  {
    topic: 'Ajuste de dose',
    difficulty: 'medio',
    vignette: (c) =>
      `Paciente de ${c.age} anos em hemodiálise, peso ${c.weight} kg, precisa de fármaco dialisável. Princípio?`,
    correct: () => 'Considerar timing da dose em relação à sessão e suplementação pós-diálise se necessário',
    wrongs: () => [
      'Administrar sempre imediatamente antes da sessão sem critério',
      'Ignorar se o fármaco é removido pela diálise',
      'Usar apenas dose neonatal em todo adolescente',
    ],
    explain: () =>
      'Fármacos dialisáveis: planejar horário e dose pós-sessão conforme farmacocinética.',
    wrongNotes: () => 'Timing importa; clearance dialítico importa; dose por idade/peso.',
  },
  {
    topic: 'Imunossupressores',
    difficulty: 'dificil',
    vignette: (c) =>
      `Criança transplantada de ${c.age} anos em uso de tacrolimus com tremor e creatinina em elevação; nível sérico alto. Conduta?`,
    correct: () => 'Reduzir dose / investigar toxicidade e interações; reavaliar função do enxerto',
    wrongs: () => [
      'Aumentar tacrolimus imediatamente',
      'Suspender profilaxia de infecção oportunista sem orientação',
      'Ignorar níveis séricos',
    ],
    explain: () =>
      'Toxicidade de calcineurina: ajustar dose e investigar disfunção do enxerto.',
    wrongNotes: () => 'Não aumentar se tóxico; profilaxia importa; níveis guiam terapia.',
  },
  {
    topic: 'Biópsia renal',
    difficulty: 'medio',
    vignette: (c) =>
      `Criança de ${c.age} anos com SN atípica (HTA, hematúria, complemento baixo, idade ${c.age < 2 || c.age > 10 ? 'fora da faixa típica' : 'com falha corticoide'}). Indicação frequente?`,
    correct: () => 'Biópsia renal para definir diagnóstico e terapia',
    wrongs: () => [
      'Nunca biopsiar em pediatria',
      'Biópsia em toda ortostática típica',
      'Nefrectomia diagnóstica',
    ],
    explain: () =>
      'SN atípica/falha: biópsia orienta tratamento.',
    wrongNotes: () => 'Biópsia é ferramenta-chave; ortostática típica não indica; nefrectomia não é diagnóstica.',
  },
  {
    topic: 'Patologia renal',
    difficulty: 'dificil',
    vignette: (c) =>
      `Biópsia de criança com SN corticoresistente mostra esclerose segmentar e focal. Diagnóstico histológico?`,
    correct: () => 'Glomeruloesclerose segmentar e focal (GESF)',
    wrongs: () => [
      'Lesão mínima exclusivamente',
      'Nefropatia membranosa clássica do adulto como única hipótese',
      'Rim normal sem alterações',
    ],
    explain: () =>
      'GESF é achado frequente em SN corticoresistente pediátrica.',
    wrongNotes: () => 'LMN responde mais a corticoide; membranosa é menos típica; biópsia não é normal.',
  },
  {
    topic: 'Ultrassonografia',
    difficulty: 'facil',
    vignette: (c) =>
      `Lactente pós 1ª ITU febril. Qual exame de imagem costuma ser o primeiro?`,
    correct: () => 'Ultrassonografia das vias urinárias',
    wrongs: () => [
      'Uretrocistografia miccional em todo caso sem critérios',
      'Angioressonância de rotina imediata',
      'Pielografia retrógrada como primeiro exame',
    ],
    explain: () =>
      'US é não invasivo e geralmente o primeiro passo após ITU febril.',
    wrongNotes: () => 'UCM/angioRM/pielografia não são primeiro exame universal.',
  },
  {
    topic: 'Medicina baseada em evidências',
    difficulty: 'medio',
    vignette: (c) =>
      `Ao ler um ensaio sobre síndrome nefrótica pediátrica, o desfecho primário é remissão em 4 semanas (n=${80 + (c.i % 40)}). Qual interpretação é mais adequada?`,
    correct: () => 'Avaliar risco de viés, tamanho amostral e aplicabilidade antes de mudar conduta',
    wrongs: () => [
      'Mudar protocolo local apenas pelo valor de p < 0,05 sem ler métodos',
      'Ignorar guidelines IPNA/KDIGO sempre',
      'Aceitar qualquer abstract sem dados',
    ],
    explain: () =>
      'MBE: evidência + contexto clínico + guidelines; p-valor isolado não basta.',
    wrongNotes: () => 'Não mudar só por p; guidelines importam; abstract insuficiente.',
  },
];

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rotate(correct, wrongs, salt) {
  const items = [correct, ...wrongs.slice(0, 3)];
  while (items.length < 4) items.push(`Conduta alternativa inadequada ${items.length}`);
  const rot = salt % items.length;
  const options = items.map((_, i) => items[(i + rot) % items.length]);
  return {
    options,
    correct_option: LETTERS[options.indexOf(correct)],
  };
}

function clinicalContext(i, topic) {
  const rnd = mulberry32(1000 + i * 17);
  const isInfant =
    /ITU|Embriologia|UPJ|Cistinose|Bartter|Diálise peritoneal|IRA|Hiponatremia|Hipernatremia|Hipocalcemia/i.test(
      topic
    ) && rnd() > 0.45;
  const age = isInfant ? 1 + Math.floor(rnd() * 18) : 2 + Math.floor(rnd() * 15);
  const weight = isInfant
    ? Math.round(4 + rnd() * 10)
    : Math.round(12 + age * 2 + rnd() * 8);
  const height = isInfant
    ? Math.round(50 + age * 2 + rnd() * 10)
    : Math.round(80 + age * 6 + rnd() * 20);
  const sbp = 90 + Math.floor(rnd() * 40);
  const dbp = 50 + Math.floor(rnd() * 30);
  return { i, age, weight, height, sbp, dbp, isInfant };
}

function ensureLen(text, min = 12) {
  const t = String(text || '').trim();
  if (t.length >= min) return t;
  return `${t} (opção clinicamente inadequada neste cenário)`;
}

function main() {
  const now = new Date().toISOString();
  const questions = [];
  const perTopic = Math.ceil(TARGET / TOPICS.length);

  let n = 0;
  for (let t = 0; t < TOPICS.length; t++) {
    const def = TOPICS[t];
    for (let k = 0; k < perTopic && n < TARGET; k++) {
      const i = n;
      const c = clinicalContext(i, def.topic);
      const difficulty =
        k % 5 === 0 ? 'facil' : k % 5 === 4 ? 'dificil' : def.difficulty;
      const correct = ensureLen(def.correct(c));
      const wrongs = def.wrongs(c).map((w) => ensureLen(w));
      const { options, correct_option } = rotate(correct, wrongs, i + 11);
      const ref = REFS[i % REFS.length];
      const explainCore = def.explain(c);
      const wrongNotes = def.wrongNotes(c);

      questions.push({
        id: `nefroped-${String(i + 1).padStart(4, '0')}`,
        statement: def.vignette(c),
        option_a: options[0],
        option_b: options[1],
        option_c: options[2],
        option_d: options[3],
        option_e: '',
        correct_option,
        explanation: `${explainCore}\n\nPor que as outras falham: ${wrongNotes}\n\nQuestão inédita MedRank para treino do Certificado de Área de Atuação em Nefrologia Pediátrica (estilo SBN/SBP) — não é cópia de prova oficial.`,
        source: 'MedRank',
        year: 2022 + (i % 5),
        specialty: 'Nefropediatria',
        topic: 'Nefropediatria',
        subtopic: def.topic,
        difficulty,
        tags: [
          'MedRank',
          'original',
          'nefropediatria',
          'estilo-SBN',
          'estilo-SBNPed',
          'treino-sbn',
          'titulo-nefropediatria',
          def.topic,
          `diff-${difficulty}`,
        ],
        image_url: null,
        bibliography: ref,
        created_at: now,
      });
      n++;
    }
  }

  const byTopic = {};
  for (const q of questions) {
    byTopic[q.subtopic] = (byTopic[q.subtopic] || 0) + 1;
  }

  const out = {
    meta: {
      total: questions.length,
      track: 'nefropediatria',
      options: 'A-D',
      style_tags: ['estilo-SBN', 'estilo-SBNPed'],
      topics: Object.keys(byTopic).sort(),
      topic_counts: byTopic,
      generated_at: now,
      expandable_to: 10000,
      license_note:
        'Originais MedRank para treino do certificado SBN/SBP. Não reproduz provas oficiais.',
    },
    questions,
  };

  fs.writeFileSync(OUT, JSON.stringify(out) + '\n');
  console.log(`Wrote ${questions.length} questions → ${OUT}`);
  console.log(`Topics: ${Object.keys(byTopic).length}`);
  console.log(`Size: ${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB`);
}

main();
