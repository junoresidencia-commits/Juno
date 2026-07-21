#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
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
    'Síndrome nefrítica': {
      c: 'Reconhecer sedimento ativo, complemento/autoanticorpos e indicar biópsia se função renal piora ou RPGN',
      w: ['Tratar hematúria glomerular como cistite simples', 'Aguardar meses com creatinina em ascensão', 'Anticoagular por cilindros hemáticos', 'Ignorar hipertensão e edema'],
      e: 'Síndrome nefrítica combina hematúria glomerular, hipertensão, edema e queda de TFG; RPGN muda urgência.',
      p: 'Pearl: cilindro hemático é sinal glomerular até prova em contrário.',
    },
    Proteinúria: {
      c: 'Quantificar albuminúria/proteinúria, estratificar risco e indicar nefroproteção/biópsia conforme contexto',
      w: ['Concluir proteinúria ortostática em adulto idoso', 'Ignorar albuminúria A3 com TFG normal', 'Dar antibiótico para proteinúria isolada', 'Biopsiar sem repetir ou quantificar'],
      e: 'Proteinúria persistente é marcador prognóstico e direciona nefroproteção, sorologias e biópsia.',
      p: 'Pearl: albuminúria A3 pesa tanto quanto TFG no risco renal.',
    },
    Hematúria: {
      c: 'Diferenciar hematúria glomerular de urológica por sedimento, proteinúria, imagem e risco oncológico',
      w: ['Atribuir toda hematúria a cálculo sem imagem', 'Ignorar dismorfismo e cilindros', 'Tratar com quinolona sem sintomas/cultura', 'Dispensar avaliação urológica em tabagista'],
      e: 'Adulto com hematúria precisa separar origem glomerular e urológica; ambas podem coexistir.',
      p: 'Pearl: acantócitos sugerem origem glomerular.',
    },
    Glomerulopatias: {
      c: 'Integrar síndrome clínica, sorologias e biópsia renal para definir imunossupressão ou suporte',
      w: ['Imunossuprimir toda proteinúria antes da biópsia', 'Ignorar IF e microscopia eletrônica', 'Tratar GESF secundária como primária', 'Suspender nefroproteção sem motivo'],
      e: 'Glomerulopatias exigem diagnóstico sindrômico e histológico quando a conduta depende do padrão.',
      p: 'Pearl: padrão histológico não substitui a etiologia.',
    },
    'Nefropatia por IgA': {
      c: 'Otimizar suporte com IECA/BRA, meta pressórica e considerar imunossupressão apenas em alto risco selecionado',
      w: ['Corticoide para qualquer hematúria isolada', 'Tonsilectomia universal como primeira linha', 'Ignorar proteinúria persistente', 'Antibiótico crônico para hematúria pós-IVAS'],
      e: 'IgA no adulto é guiada por proteinúria, TFG, PA e escore de Oxford; suporte vem antes de corticoide.',
      p: 'Pearl: proteinúria persistente é o principal alvo modificável.',
    },
    Membranosa: {
      c: 'Dosar anti-PLA2R, estratificar risco e considerar rituximabe/ciclofosfamida conforme risco e função renal',
      w: ['Biopsiar nunca se anti-PLA2R positivo e quadro atípico', 'Dar corticoide isolado por 6 meses', 'Ignorar anticoagulação em albumina muito baixa', 'Tratar como lesão mínima sem investigação'],
      e: 'Membranosa primária é associada ao PLA2R; risco de progressão e trombose orienta tratamento.',
      p: 'Pearl: anti-PLA2R também monitora atividade imunológica.',
    },
    'Lesão mínima': {
      c: 'Tratar lesão mínima do adulto com corticoide, investigar causas secundárias e manejar recidivas',
      w: ['Dialise pela proteinúria isolada', 'Ignorar AINE/linfoma como gatilho', 'Usar ciclofosfamida antes de corticoide em todo caso', 'Dispensar profilaxia de complicações do corticoide'],
      e: 'Lesão mínima no adulto responde a corticoide, mas exige exclusão de gatilhos e vigilância de toxicidade.',
      p: 'Pearl: resposta no adulto costuma ser mais lenta que na criança.',
    },
    FSGS: {
      c: 'Diferenciar FSGS primária de secundária e tratar proteinúria com suporte ou imunossupressão seletiva',
      w: ['Corticoide para FSGS adaptativa por obesidade sem síndrome nefrótica', 'Ignorar redução de massa renal', 'Parar IECA/BRA se tolerado', 'Assumir que todo apagamento podocitário é primário'],
      e: 'FSGS é padrão de lesão; etiologia primária, genética ou adaptativa muda tratamento.',
      p: 'Pearl: síndrome nefrótica abrupta favorece forma primária.',
    },
    MPGN: {
      c: 'Investigar complemento, infecções e paraproteína antes de definir terapia de MPGN/C3 glomerulopatia',
      w: ['Chamar toda MPGN de idiopática sem sorologias', 'Corticoide isolado sem etiologia', 'Ignorar hepatite C e crioglobulinas', 'Dispensar eletroforese em adulto'],
      e: 'MPGN é padrão histológico com causas mediadas por imunocomplexo ou complemento.',
      p: 'Pearl: C3 persistentemente baixo sugere via alternativa.',
    },
    Lúpus: {
      c: 'Biopsiar nefrite ativa e tratar classe III/IV com indução imunossupressora seguida de manutenção',
      w: ['Tratar cilindros hemáticos apenas com hidroxicloroquina', 'Evitar biópsia apesar de proteinúria', 'Suspender manutenção ao normalizar C3', 'Usar AINE em DRC ativa'],
      e: 'Nefrite lúpica é classificada por biópsia; classe e cronicidade definem indução/manutenção.',
      p: 'Pearl: atividade sorológica não substitui biópsia quando rim muda conduta.',
    },
    'Vasculites ANCA': {
      c: 'Induzir remissão com rituximabe ou ciclofosfamida mais corticoide e considerar plasmaférese em situações selecionadas',
      w: ['Aguardar sorologia se RPGN e hemorragia alveolar graves', 'Tratar apenas com antibiótico', 'Ignorar profilaxia infecciosa', 'Manter corticoide alto indefinidamente sem plano'],
      e: 'ANCA renal/pulmão-rim é emergência; biópsia ajuda, mas terapia não deve atrasar se quadro crítico.',
      p: 'Pearl: creatinina e hemorragia alveolar definem risco imediato.',
    },
    'Anti-MBG': {
      c: 'Iniciar plasmaférese, corticoide e ciclofosfamida precocemente se doença anti-MBG com rim/pulmão viável',
      w: ['Usar IECA como terapia principal', 'Aguardar biópsia por semanas', 'Evitar plasmaférese na hemorragia alveolar', 'Tratar como IgA recorrente'],
      e: 'Anti-MBG tem anticorpo patogênico circulante; remoção rápida e imunossupressão preservam órgão quando viável.',
      p: 'Pearl: anúria prolongada com 100% crescentes fibrosos muda prognóstico renal.',
    },
    Amiloidose: {
      c: 'Confirmar depósito por biópsia/tipagem e tratar clone plasmocitário ou inflamação de base',
      w: ['Imunossuprimir como lesão mínima sem tipagem', 'Ignorar cardiomiopatia restritiva', 'Tratar AL e AA da mesma forma', 'Dispensar pesquisa de cadeias leves'],
      e: 'Amiloidose renal causa proteinúria; tipagem AL/AA é indispensável para terapia.',
      p: 'Pearl: vermelho Congo positivo precisa de tipagem.',
    },
    Mieloma: {
      c: 'Suspeitar nefropatia por cilindros, hidratar, evitar nefrotóxicos e iniciar terapia anti-plasmócito rapidamente',
      w: ['Dar contraste iodado desnecessário', 'Tratar hipercalcemia apenas com restrição hídrica', 'Aguardar biópsia para todo cast nephropathy clássico', 'Ignorar cadeias leves livres'],
      e: 'Rim do mieloma é tempo-dependente; reduzir cadeia leve circulante salva função.',
      p: 'Pearl: albuminúria baixa com proteinúria total alta sugere cadeia leve.',
    },
    Onconefrologia: {
      c: 'Identificar nefrotoxicidade, lise tumoral ou nefrite por imunoterapia e ajustar tratamento oncológico/renal',
      w: ['Manter cisplatina apesar de Mg baixo e IRA progressiva', 'Ignorar hiperfosfatemia na lise tumoral', 'Corticoide para toda IRA em câncer sem diagnóstico', 'Suspender quimioterapia curativa sem discutir risco'],
      e: 'Onconefrologia exige definir mecanismo: droga, TLS, obstrução, infiltração ou imunoterapia.',
      p: 'Pearl: hipomagnesemia é pista de toxicidade tubular por cisplatina.',
    },
    Litíase: {
      c: 'Controlar dor/infecção, desobstruir se sepse ou rim único e investigar metabólico em recorrência',
      w: ['Alta com febre e cálculo obstrutivo', 'Antibiótico isolado em pionefrose', 'Restringir cálcio dietético para todos', 'Ignorar citrato e volume urinário'],
      e: 'Litíase complicada por infecção ou obstrução é urgência urológica; recorrência pede prevenção.',
      p: 'Pearl: cálculo obstrutivo infectado drena primeiro, dissolve depois.',
    },
    'Doença renal policística': {
      c: 'Controlar PA, estratificar volume renal/risco e rastrear complicações familiares quando indicado',
      w: ['Drenar cistos assintomáticos de rotina', 'Ignorar aneurisma em história familiar', 'Usar tolvaptano sem risco de progressão', 'Dispensar aconselhamento genético'],
      e: 'ADPKD é sistêmica; PA, volume renal, história familiar e complicações orientam manejo.',
      p: 'Pearl: rim grande em jovem hipertenso sugere progressão rápida.',
    },
    'Nefrites intersticiais': {
      c: 'Suspender fármaco culpado, avaliar eosinofilia/piúria e considerar corticoide se AIN significativa sem melhora',
      w: ['Manter IBP/AINE suspeito', 'Tratar como GN proliferativa sem sedimento glomerular', 'Ignorar uveíte em TINU', 'Antibiótico sem infecção'],
      e: 'AIN é frequentemente medicamentosa; tempo de suspensão e fibrose influenciam resposta.',
      p: 'Pearl: eosinofilúria ausente não exclui AIN.',
    },
    'Doença renovascular': {
      c: 'Suspeitar em HAS resistente/assimetria renal/edema flash e confirmar por imagem adequada',
      w: ['Aumentar IECA em estenose bilateral com creatinina subindo', 'Ignorar sopro abdominal e hipocalemia', 'Revascularizar toda estenose incidental', 'Dispensar Doppler/angioTC quando alta suspeita'],
      e: 'Estenose renovascular pode ser aterosclerótica ou fibromuscular; benefício de intervenção depende do fenótipo.',
      p: 'Pearl: edema agudo de pulmão recorrente é pista forte.',
    },
    'Hipertensão secundária': {
      c: 'Investigar hiperaldosteronismo, renovascular, feocromocitoma e apneia conforme fenótipo/labs',
      w: ['Chamar de essencial sem revisar potássio e renina/aldosterona', 'Usar beta-bloqueador isolado antes de alfa-bloqueio em feocromocitoma', 'Ignorar DRC e albuminúria', 'Suspender todos anti-hipertensivos antes de crise'],
      e: 'HAS resistente ou com hipocalemia/idade precoce/lesão renal pede causa secundária.',
      p: 'Pearl: aldosterona/renina interpreta com medicações em mente.',
    },
    'Transplante renal': {
      c: 'Avaliar rejeição vs infecção; biópsia do enxerto quando indicada e ajustar imunossupressão',
      w: ['Suspender todo imunossupressor às cegas', 'Ignorar creatinina', 'Nefrectomia em toda febre', 'Aumentar tacrolimus se nível tóxico'],
      e: 'Disfunção do enxerto: diferenciar rejeição/infecção com biópsia e níveis.',
      p: 'Pearl: CMV e rejeição podem coexistir — investigar ambos.',
    },
    Hemodiálise: {
      c: 'Avaliar adequação, peso seco, acesso e intercorrências para ajustar prescrição de HD',
      w: ['Aumentar ultrafiltração apesar de câimbras e hipotensão', 'Ignorar Kt/V baixo', 'Usar cateter infectado sem culturas', 'Prescrever banho de K sem checar potássio'],
      e: 'HD crônica combina adequação, volume, eletrólitos, acesso e segurança hemodinâmica.',
      p: 'Pearl: hipotensão recorrente sugere peso seco agressivo ou disfunção cardíaca.',
    },
    'Diálise peritoneal': {
      c: 'Coletar efluente e iniciar antibiótico intraperitoneal em peritonite, ajustando prescrição de DP',
      w: ['Aguardar cultura por 72 h sem tratar efluente turvo', 'Retirar cateter em todo primeiro episódio', 'Ignorar ultrafiltração baixa persistente', 'Tratar dor abdominal com opioide isolado'],
      e: 'Peritonite em DP é diagnóstico clínico-laboratorial; tratamento precoce preserva membrana.',
      p: 'Pearl: efluente turvo é peritonite até prova em contrário.',
    },
    CRRT: {
      c: 'Indicar CRRT em IRA com instabilidade hemodinâmica e ajustar dose de efluente/anticoagulação',
      w: ['CRRT em todo paciente estável preferindo HD intermitente sem motivo', 'Sem anticoagulação nunca', 'Ignorar clearance de fármacos', 'Dose fixa sem peso'],
      e: 'CRRT: escolha em choque; dose e anticoagulação importam.',
      p: 'Pearl: lembrar ajuste de antibióticos na CRRT.',
    },
    SLED: {
      c: 'Usar SLED como terapia prolongada em UTI para soluto/volume com melhor tolerância hemodinâmica',
      w: ['Escolher SLED para hipercalemia com PCR em andamento sem monitorização', 'Prescrever como HD curta de ambulatório', 'Ignorar anticoagulação e dose de antibiótico', 'Contraindicar por uso de vasopressor baixo'],
      e: 'SLED é alternativa intermediária entre HD e CRRT em pacientes críticos selecionados.',
      p: 'Pearl: tempo maior permite ultrafiltração mais suave.',
    },
    Plasmaférese: {
      c: 'Indicar troca plasmática em doenças com mediador circulante, como anti-MBG ou TTP, conforme gravidade',
      w: ['Usar para toda proteinúria nefrótica', 'Dispensar reposição/monitorização de cálcio', 'Atrasar em TTP com plaquetopenia grave', 'Tratar sepse comum com plasmaférese de rotina'],
      e: 'Plasmaférese remove anticorpos/toxinas selecionados; indicação depende de mecanismo e urgência.',
      p: 'Pearl: TTP é emergência hematonefrológica.',
    },
    'Biópsia renal': {
      c: 'Indicar biópsia quando resultado muda terapia, corrigindo coagulopatia e controlando PA',
      w: ['Biopsiar com PA 190/110 sem controle', 'Evitar biópsia em RPGN por creatinina alta isolada', 'Usar biópsia para cólica renal simples', 'Ignorar rim único/anticoagulação'],
      e: 'Biópsia renal tem indicação, contraindicações e preparo para reduzir sangramento.',
      p: 'Pearl: hematoma pós-biópsia costuma ocorrer nas primeiras 24 h.',
    },
    'Ultrassonografia renal': {
      c: 'Interpretar tamanho, ecogenicidade, hidronefrose e Doppler conforme síndrome clínica',
      w: ['Excluir DRC por US normal', 'Usar contraste iodado antes de US em obstrução provável', 'Ignorar bexiga cheia/resíduo', 'Confundir cisto simples com ADPKD avançada'],
      e: 'US renal é porta de entrada para obstrução, DRC crônica, cistos e assimetria.',
      p: 'Pearl: rins pequenos e ecogênicos sugerem cronicidade.',
    },
    POCUS: {
      c: 'Usar POCUS para integrar veia cava, pulmão, coração e bexiga na decisão de volume/diurético',
      w: ['Dar volume apenas por creatinina alta', 'Ignorar B-lines em dispneia congestiva', 'Usar VCI isolada como verdade absoluta', 'Dispensar sondagem se bexiga distendida'],
      e: 'POCUS complementa exame físico em IRA e congestão, mas deve ser integrado ao contexto.',
      p: 'Pearl: bexiga cheia é causa reversível de IRA pós-renal.',
    },
    VExUS: {
      c: 'Graduar congestão venosa por VCI/Doppler hepático-portal-renal e orientar descongestão',
      w: ['Suspender diurético apesar de congestão venosa grave', 'Usar creatinina isolada para definir volemia', 'Ignorar Doppler portal pulsátil', 'Dar albumina sem avaliar congestão'],
      e: 'VExUS identifica congestão sistêmica que perpetua IRA cardiorrenal/hepatorrenal.',
      p: 'Pearl: Doppler renal venoso descontínuo sugere congestão importante.',
    },
    'Acesso vascular': {
      c: 'Priorizar FAV funcional, investigar estenose por exame/Doppler e preservar vasos',
      w: ['Puncionar veia subclávia para HD crônica sem necessidade', 'Ignorar redução de frêmito', 'Usar cateter temporário indefinidamente', 'Canular FAV imatura sem avaliação'],
      e: 'Acesso vascular determina morbimortalidade em HD; FAV e vigilância reduzem complicações.',
      p: 'Pearl: frêmito que vira pulso sugere estenose de saída.',
    },
    Cateteres: {
      c: 'Coletar culturas e tratar infecção/disfunção de cateter, removendo quando há indicação',
      w: ['Tratar bacteremia por S. aureus mantendo cateter sempre', 'Usar trombolítico se há choque séptico sem antibiótico', 'Ignorar túnel doloroso', 'Trocar fio-guia em candidemia'],
      e: 'Cateter de diálise envolve trombose, mal posicionamento e infecção; agente e gravidade orientam retirada.',
      p: 'Pearl: candidemia e S. aureus pesam para remoção.',
    },
    'Farmacologia renal': {
      c: 'Ajustar dose por TFG/modalidade dialítica, monitorar níveis e evitar combinações nefrotóxicas',
      w: ['Dose plena de aminoglicosídeo com TFG 15 sem nível', 'Suspender antibiótico necessário por DRC estável', 'Ignorar interação tacrolimo-macrólideo', 'Usar AINE em síndrome nefrótica com IRA'],
      e: 'Farmacologia renal exige dose, intervalo, nível sérico, diálise e nefrotoxicidade.',
      p: 'Pearl: CRRT pode exigir dose maior que DRC estável.',
    },
    'Ajuste de dose na DRC': {
      c: 'Calcular TFG, revisar fármaco ativo/metabólitos e ajustar dose/intervalo com monitorização',
      w: ['Usar eGFR do laudo sem considerar peso/extremos', 'Manter metformina em acidose/TFG muito baixa', 'Prescrever DOAC sem checar TFG', 'Reduzir todo antibiótico a ponto de subtratar sepse'],
      e: 'Ajuste em DRC evita toxicidade sem perder eficácia, especialmente antibióticos, DOACs e antidiabéticos.',
      p: 'Pearl: dose de ataque muitas vezes não muda; manutenção muda.',
    },
    'Síndrome cardiorrenal': {
      c: 'Tratar congestão com diuréticos/UF, otimizar perfusão e evitar nefrotóxicos',
      w: ['Restrição absoluta de diurético na congestão', 'IECA em choque cardiogênico refratário', 'Ignorar PVC/VExUS', 'Só observar EAP'],
      e: 'Cardiorrenal: descongestionar com segurança e proteger o rim.',
      p: 'Pearl: VExUS ajuda a guiar descongestão.',
    },
    Cardiologia: {
      c: 'Tratar congestão cardiorrenal, ajustar diurético/vasodilatador e anticoagular FA conforme TFG/risco',
      w: ['Suspender diurético em edema pulmonar por creatinina ter subido pouco', 'Usar DOAC sem ajuste em DRC avançada', 'Dar IECA em choque sem perfusão', 'Ignorar hipercalemia de bloqueio do SRAA'],
      e: 'Cardiologia aplicada ao rim envolve congestão, perfusão, anticoagulação e drogas moduladas por TFG.',
      p: 'Pearl: creatinina pode subir durante descongestão efetiva.',
    },
    Sepse: {
      c: 'Bundle de sepse + ressuscitação + ATB precoce e considerar IRA/CRRT se necessário',
      w: ['Atrasar ATB até todos os exames', 'Cristaloide zero na hipovolemia', 'Corticoide isolado sem ATB', 'Negar diálise em AEIOU'],
      e: 'Sepse + rim: tempo de ATB e suporte renal conforme indicação.',
      p: 'Pearl: lactato e oligúria guiam a gravidade.',
    },
    UTI: {
      c: 'Aplicar bundle de sepse/choque, ajustar antimicrobianos à TFG e indicar suporte renal se AEIOU',
      w: ['Esperar anúria por 48 h para reconhecer IRA', 'Usar dose renal baixa de ataque em sepse grave', 'Dar bicarbonato para todo lactato elevado', 'Ignorar balanço hídrico acumulado'],
      e: 'UTI renal combina hemodinâmica, nefrotoxicidade, dose de antibiótico e modalidade dialítica.',
      p: 'Pearl: balanço positivo persistente piora desfechos na IRA crítica.',
    },
    Infectologia: {
      c: 'Diagnosticar infecção renal/cateter/transplante e ajustar antimicrobianos por TFG e foco',
      w: ['Tratar candidemia de cateter sem remover quando indicado', 'Usar aminoglicosídeo prolongado sem nível', 'Ignorar BK/CMV no transplantado', 'Dar nitrofurantoína em pielonefrite com DRC avançada'],
      e: 'Infecção em nefrologia depende de foco, imunossupressão, acesso dialítico e farmacocinética renal.',
      p: 'Pearl: febre no transplantado é infecção até prova em contrário, mas rejeição pode coexistir.',
    },
    Endocrinologia: {
      c: 'Tratar diabetes/CAD/SIADH/DI ou HPT secundário protegendo rim e corrigindo eletrólitos com segurança',
      w: ['Corrigir sódio rapidamente em hiponatremia crônica', 'Manter SGLT2 em CAD ativa', 'Ignorar albuminúria diabética', 'Dar calcitriol sem fósforo/PTH na DRC'],
      e: 'Endocrinologia renal inclui diabetes, água/sódio e metabolismo mineral, sempre com TFG no centro.',
      p: 'Pearl: albuminúria muda risco cardiovascular e renal no diabetes.',
    },
    Hematologia: {
      c: 'Diferenciar anemia da DRC, TTP/SHU e anticoagulação, tratando urgências microangiopáticas rapidamente',
      w: ['Dar EPO sem corrigir ferro e inflamação', 'Aguardar ADAMTS13 para plasmaférese em TTP grave', 'Anticoagular HD sem avaliar sangramento', 'Ignorar esquizócitos com plaquetopenia'],
      e: 'Hematologia aplicada ao rim vai de anemia crônica a microangiopatia trombótica aguda.',
      p: 'Pearl: TTP não espera ADAMTS13 para iniciar plasmaférese.',
    },
    Reumatologia: {
      c: 'Reconhecer LES, vasculites, esclerodermia, SAF ou crioglobulinemia com rim e tratar mecanismo específico',
      w: ['Usar IECA isolado em crise renal esclerodérmica sem captopril agressivo', 'Ignorar complemento baixo em crioglobulinemia', 'Tratar SAF catastrófica sem anticoagulação', 'Dar AINE em GN ativa'],
      e: 'Doenças reumatológicas têm padrões renais distintos; sorologia e biópsia orientam terapia.',
      p: 'Pearl: crise renal esclerodérmica pede IECA mesmo com creatinina subindo.',
    },
    Hepatorrenal: {
      c: 'Diagnosticar SHR, vasoconstritores + albumina conforme protocolo e avaliar transplante',
      w: ['Diurético de rotina em SHR tipo 1 sem critério', 'Nefrotoxicos liberados', 'Paracentese sem reposição quando indicada', 'Ignorar infecção precipitante'],
      e: 'SHR: critérios diagnósticos, terlipressina/noradrenalina + albumina.',
      p: 'Pearl: excluir hipovolemia e necrose tubular antes de rotular SHR.',
    },
    Gastroenterologia: {
      c: 'Diferenciar hipovolemia, NTA e síndrome hepatorrenal; tratar infecção/ascite e usar albumina/vasoconstritor quando indicado',
      w: ['Diagnosticar SHR sem retirar diurético e expandir albumina quando indicado', 'Dar AINE para dor em cirrose com IRA', 'Ignorar PBE como precipitante', 'Fazer paracentese volumosa sem albumina quando indicada'],
      e: 'Rim na cirrose sofre por hipovolemia efetiva, infecção, congestão e vasodilatação sistêmica.',
      p: 'Pearl: urina sem cilindros não basta; resposta à albumina e contexto importam.',
    },
    Pneumologia: {
      c: 'Investigar síndrome pulmão-rim, edema pulmonar ou TEP com ajuste renal de contraste/anticoagulação',
      w: ['Tratar hemorragia alveolar com diurético apenas', 'Ignorar ANCA/anti-MBG', 'Usar contraste sem pesar TFG e urgência', 'Suspender diálise em edema pulmonar refratário'],
      e: 'Pulmão e rim se cruzam em vasculites, congestão, ventilação mecânica e anticoagulação.',
      p: 'Pearl: hemoptise + sedimento ativo é pulmão-rim até prova em contrário.',
    },
    Neurologia: {
      c: 'Tratar encefalopatia urêmica ou distúrbio de sódio com correção segura e suporte renal se indicado',
      w: ['Corrigir Na 115 para 140 em poucas horas', 'Ignorar uremia em confusão com asterixis', 'Dar contraste para AVC sem avaliar TFG quando há alternativa', 'Atribuir convulsão hiponatrêmica a epilepsia isolada'],
      e: 'Neurologia renal envolve uremia, sódio, osmolaridade e doses de fármacos neuroativos.',
      p: 'Pearl: sintoma neurológico define urgência na hiponatremia.',
    },
  };

  if (subtema === 'Síndrome cardiorrenal') return map['Síndrome cardiorrenal'];
  if (subtema === 'Sepse' || subtema === 'Choque séptico') return map.Sepse;
  if (subtema === 'Hepatorrenal') return map.Hepatorrenal;
  if (!map[tema]) {
    throw new Error(`Tema adulto sem núcleo de resposta específico: ${tema}/${subtema}`);
  }
  return map[tema];
}

function vignette(ctx) {
  const { tema, subtema, tipo, age, sex, weight, i, rnd, area } = ctx;
  const sexo = sex === 'M' ? 'Homem' : 'Mulher';
  const vitals = `PA ${110 + (i % 50)}/${60 + (i % 30)} mmHg, FC ${70 + (i % 50)} bpm, SpO₂ ${92 + (i % 8)}%`;
  const cr = (0.9 + rnd() * 4.2).toFixed(1);
  const base = `${sexo}, ${age} anos, ${weight} kg, ${vitals}`;
  const gas = `pH ${(7.08 + rnd() * 0.22).toFixed(2)}, HCO3 ${9 + (i % 12)} mEq/L, pCO2 ${22 + (i % 18)} mmHg`;

  const cases = {
    DRC: () => `${base}, diabetes e albuminúria A${1 + (i % 3)}. TFG ${18 + (i % 35)} mL/min/1,73m², Hb ${(8.5 + rnd()).toFixed(1)} g/dL, PTH ${180 + (i % 260)} pg/mL, bicarbonato ${16 + (i % 6)} mEq/L. Qual prioridade em ${subtema}?`,
    IRA: () => `${base}, internado(a) por pneumonia com hipotensão nas últimas 12 h. Diurese 0,3 mL/kg/h, creatinina subiu de 1,0 para ${cr} mg/dL, FENa ${(1.5 + rnd()).toFixed(1)}%, sedimento com cilindros granulosos. Qual conduta?`,
    'Síndrome nefrótica': () => `${base}, edema progressivo e espuma urinária. Albumina ${(1.8 + rnd() * 0.6).toFixed(1)} g/dL, proteinúria ${(4 + rnd() * 6).toFixed(1)} g/dia, colesterol ${280 + (i % 160)} mg/dL, creatinina ${cr} mg/dL. Qual próximo passo?`,
    'Síndrome nefrítica': () => `${base}, hematúria cor de coca-cola, edema e cilindros hemáticos. Creatinina ${cr} mg/dL, C3 ${i % 2 ? 'baixo' : 'normal'}, proteinúria ${(1 + rnd() * 2).toFixed(1)} g/dia. Como conduzir?`,
    Proteinúria: () => `${base}, achado de relação albumina/creatinina ${400 + (i % 900)} mg/g em duas amostras, sem hematúria. TFG ${35 + (i % 45)} mL/min/1,73m² e HbA1c ${(7.5 + rnd()).toFixed(1)}%. Qual abordagem?`,
    Hematúria: () => `${base}, tabagista, hematúria microscópica persistente. Sedimento tem ${i % 2 ? 'acantócitos e proteína 1+' : 'hemácias isomórficas sem proteinúria'}, creatinina ${cr} mg/dL. Qual diferenciação é necessária?`,
    Glomerulopatias: () => `${base}, síndrome nefrítica-nefrótica com ANA positivo, C3 baixo e proteinúria ${(2 + rnd() * 4).toFixed(1)} g/dia. Biópsia programada. Qual princípio guia a terapia?`,
    'Nefropatia por IgA': () => `${base}, hematúria macroscópica recorrente 24 h após IVAS. C3 normal, proteinúria ${(0.8 + rnd() * 1.8).toFixed(1)} g/dia e TFG ${45 + (i % 45)} mL/min/1,73m². Qual manejo inicial?`,
    Membranosa: () => `${base}, síndrome nefrótica, anti-PLA2R positivo em alto título, albumina ${(1.9 + rnd() * 0.5).toFixed(1)} g/dL e proteinúria ${(6 + rnd() * 5).toFixed(1)} g/dia. Qual estratégia?`,
    'Lesão mínima': () => `${base}, síndrome nefrótica abrupta após uso de AINE, creatinina ${cr} mg/dL e biópsia com apagamento difuso de pedicelos sem depósitos. Qual tratamento?`,
    FSGS: () => `${base}, obesidade e rim único funcional, proteinúria ${(1.5 + rnd() * 2).toFixed(1)} g/dia sem hipoalbuminemia importante. Biópsia: GESF perihilar. Qual interpretação?`,
    MPGN: () => `${base}, proteinúria, hematúria, C3 baixo persistente e antecedente de hepatite C. Biópsia mostra padrão membranoproliferativo. Qual investigação é prioritária?`,
    Lúpus: () => `${base}, LES com queda de C3/C4, anti-dsDNA alto, proteinúria ${(1.2 + rnd() * 3).toFixed(1)} g/dia e cilindros hemáticos. Qual conduta para ${subtema}?`,
    'Vasculites ANCA': () => `${base}, sinusite crônica, hemoptise, creatinina subindo para ${cr} mg/dL e sedimento nefrítico. ANCA PR3/MPO positivo. Qual tratamento inicial?`,
    'Anti-MBG': () => `${base}, hemoptise, anemia e IRA rapidamente progressiva. Anti-MBG positivo, urina com cilindros hemáticos e creatinina ${cr} mg/dL. Qual conduta urgente?`,
    Amiloidose: () => `${base}, macroglossia discreta, cardiomiopatia restritiva e proteinúria ${(5 + rnd() * 4).toFixed(1)} g/dia. Eletroforese sugere cadeia leve monoclonal. Qual confirmação/terapia?`,
    Mieloma: () => `${base}, dor óssea, cálcio ${(11.5 + rnd()).toFixed(1)} mg/dL, creatinina ${cr} mg/dL, proteinúria total alta com albuminúria modesta e cadeias leves livres elevadas. Qual conduta renal?`,
    Onconefrologia: () => `${base}, em quimioterapia com ${subtema}, creatinina subiu para ${cr} mg/dL, Mg ${(1.1 + rnd() * 0.4).toFixed(1)} mg/dL e EAS sem cilindros hemáticos. Qual diagnóstico/ajuste?`,
    Litíase: () => `${base}, cólica renal, febre 38,8 °C e TC com cálculo ureteral de ${6 + (i % 8)} mm com hidronefrose. Leucócitos ${14000 + (i % 5000)}/mm³, creatinina ${cr} mg/dL. Qual conduta?`,
    'Doença renal policística': () => `${base}, pai em diálise por ADPKD, rins aumentados com múltiplos cistos, HAS e eTFG ${45 + (i % 40)}. Refere cefaleia sentinela em familiar. Qual acompanhamento?`,
    'Nefrites intersticiais': () => `${base}, usou IBP e antibiótico beta-lactâmico por 3 semanas. Febre baixa, rash, eosinofilia, piúria estéril e creatinina ${cr} mg/dL. Qual manejo?`,
    'Doença renovascular': () => `${base}, HAS resistente, edema agudo de pulmão recorrente e creatinina sobe 35% após IECA. US mostra rim direito 8,2 cm e esquerdo 10,6 cm. Qual hipótese/conduta?`,
    'Hipertensão secundária': () => `${base}, HAS resistente com K ${(2.8 + rnd() * 0.5).toFixed(1)} mEq/L, aldosterona elevada e renina suprimida. TFG ${50 + (i % 35)} mL/min/1,73m². Qual investigação?`,
    'Transplante renal': () => `${base}, pessoa transplantada renal há ${2 + (i % 24)} meses, creatinina subiu de 1,2 para ${cr} mg/dL, febre baixa e nível de tacrolimo ${5 + (i % 12)} ng/mL. Qual próximo passo?`,
    Hemodiálise: () => `${base}, em HD crônica, chega com dispneia interdialítica, K ${(5.8 + rnd()).toFixed(1)} mEq/L e ganho de peso ${3 + (i % 4)} kg. FAV com frêmito reduzido. Qual ajuste?`,
    'Diálise peritoneal': () => `${base}, em DP, dor abdominal e efluente turvo. Líquido peritoneal: ${650 + (i % 700)} células/mm³, 82% neutrófilos; Gram pendente. Qual conduta?`,
    CRRT: () => `${base}, choque séptico sob noradrenalina, anúria, K ${(6.2 + rnd() * 0.6).toFixed(1)} mEq/L, lactato ${4 + (i % 5)} mmol/L e ${gas}. Qual prescrição?`,
    SLED: () => `${base}, UTI com IRA oligúrica, noradrenalina em baixa dose e congestão pulmonar. K ${(5.7 + rnd()).toFixed(1)} mEq/L, ureia ${120 + (i % 80)} mg/dL. Qual modalidade/prescrição?`,
    Plasmaférese: () => `${base}, plaquetas ${18000 + (i % 20000)}/mm³, esquizócitos, DHL elevada, confusão e creatinina ${cr} mg/dL; ADAMTS13 pendente. Qual decisão?`,
    'Biópsia renal': () => `${base}, proteinúria ${(3 + rnd() * 4).toFixed(1)} g/dia, hematúria dismórfica e creatinina ${cr} mg/dL. Plaquetas 220 mil, INR 1,0, PA ainda 178/104. Qual preparo/indicação?`,
    'Ultrassonografia renal': () => `${base}, IRA anúrica após cirurgia pélvica. US mostra bexiga distendida, hidronefrose bilateral e rins de tamanho preservado; creatinina ${cr} mg/dL. Qual interpretação?`,
    POCUS: () => `${base}, sepse em reanimação, crepitações novas e oligúria. POCUS: VCI 2,3 cm pouco colapsável, B-lines difusas e bexiga vazia. Qual decisão de volume?`,
    VExUS: () => `${base}, insuficiência cardíaca direita, ascite, creatinina ${cr} mg/dL. VExUS: VCI dilatada, Doppler portal pulsátil e fluxo venoso renal descontínuo. Qual conduta?`,
    'Acesso vascular': () => `${base}, em HD por FAV radiocefálica, relata sangramento prolongado pós-punção e queda de Kt/V. Exame: frêmito curto e pulsatilidade aumentada. Qual diagnóstico/conduta?`,
    Cateteres: () => `${base}, HD por cateter tunelizado, febre durante sessão e dor no túnel. Hemoculturas periférica/cateter positivas para S. aureus; creatinina basal de DRC 5. Qual conduta?`,
    'Farmacologia renal': () => `${base}, TFG ${18 + (i % 30)} mL/min/1,73m², sepse urinária em vancomicina e piperacilina-tazobactam. Vale de vancomicina alto e creatinina ${cr} mg/dL. Qual ajuste?`,
    'Ajuste de dose na DRC': () => `${base}, DRC G4, FA anticoagulada e pneumonia grave. TFG ${18 + (i % 15)} mL/min/1,73m², albumina 3,0 g/dL. Qual princípio de ajuste para ${subtema}?`,
    Cardiologia: () => `${base}, FE ${25 + (i % 20)}%, ortopneia, turgência jugular e creatinina subindo após diurético. BNP elevado e VExUS congestivo. Qual manejo cardiorrenal?`,
    UTI: () => `${base}, choque séptico abdominal, lactato ${4 + (i % 6)} mmol/L, oligúria e creatinina ${cr} mg/dL após ressuscitação inicial. K ${(5.6 + rnd()).toFixed(1)} mEq/L. Qual prioridade?`,
    Infectologia: () => `${base}, transplantado renal com febre, diarreia e leucopenia. Creatinina ${cr} mg/dL, PCR para CMV positiva e tacrolimo no limite alto. Qual conduta?`,
    Endocrinologia: () => `${base}, diabetes longa data, albuminúria ${500 + (i % 900)} mg/g, TFG ${35 + (i % 35)} e K ${(4.6 + rnd()).toFixed(1)} mEq/L. Em ${subtema}, qual medida renal muda prognóstico?`,
    Hematologia: () => `${base}, anemia Hb ${(8 + rnd()).toFixed(1)} g/dL, ferritina ${80 + (i % 500)} ng/mL, TSAT ${12 + (i % 18)}%, DRC G4 e sem sangramento. Qual manejo hematonefrológico?`,
    Reumatologia: () => `${base}, esclerose sistêmica difusa, PA 210/120, cefaleia, anemia hemolítica microangiopática e creatinina ${cr} mg/dL. Qual tratamento renal imediato?`,
    Gastroenterologia: () => `${base}, cirrose Child C com ascite tensa, creatinina subindo para ${cr} mg/dL, Na ${126 + (i % 8)} mEq/L, urina sem cilindros granulosos e sem choque. Qual abordagem hepatorrenal?`,
    Pneumologia: () => `${base}, hemoptise, infiltrado alveolar bilateral e sedimento urinário com cilindros hemáticos. Creatinina ${cr} mg/dL, Hb ${(7.8 + rnd()).toFixed(1)} g/dL. Qual hipótese/conduta?`,
    Neurologia: () => `${base}, confusão, asterixis e náuseas. Ureia ${180 + (i % 80)} mg/dL, creatinina ${cr} mg/dL, Na ${136 + (i % 4)} mEq/L; TC crânio sem sangramento. Qual conduta?`,
  };

  const builder = cases[tema];
  if (!builder) {
    throw new Error(`Tema adulto sem vinheta clínica específica: ${area}/${tema}/${subtema}/${tipo}`);
  }
  return builder();
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
