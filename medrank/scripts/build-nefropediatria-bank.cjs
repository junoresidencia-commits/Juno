#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
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
  Anatomia: {
    correct: 'Relacionar o achado de imagem ao segmento cortical/medular acometido e acompanhar função renal',
    wrongs: ['Solicitar cistoscopia como primeiro exame', 'Tratar como pielonefrite sem piúria ou febre', 'Indicar nefrectomia pelo achado anatômico isolado'],
    explain: 'Questões de anatomia cobram correlação entre nefron, córtex/medula, vascularização e repercussão clínica, não memorização isolada.',
  },
  Embriologia: {
    correct: 'Reconhecer defeito broto ureteral/metanefro e programar US seriada com avaliação urológica',
    wrongs: ['Aguardar até a adolescência sem imagem', 'Iniciar corticoide para malformação congênita', 'Fazer biópsia renal neonatal de rotina'],
    explain: 'CAKUT decorre de interação broto ureteral-metanefro; a conduta inicial é estratificar anatomia, obstrução e função.',
  },
  'Fisiologia renal': {
    correct: 'Interpretar TFG, osmolaridade urinária e resposta tubular conforme idade e estado volêmico',
    wrongs: ['Usar creatinina isolada sem considerar idade', 'Concluir diabetes insipidus sem osmolaridades', 'Prescrever restrição hídrica sem avaliar volume'],
    explain: 'Fisiologia renal pediátrica exige integrar filtração, concentração urinária e acidificação com maturidade renal.',
  },
  'Desenvolvimento renal': {
    correct: 'Ajustar interpretação de creatinina, sódio e diurese à prematuridade/maturação tubular',
    wrongs: ['Usar metas de adulto no prematuro', 'Aumentar diurético por toda natriurese neonatal', 'Ignorar peso diário e balanço hídrico'],
    explain: 'Prematuros e RN têm TFG baixa e túbulos imaturos; decisões devem seguir idade gestacional, diurese e evolução.',
  },
  IRA: {
    correct: 'Reposição volêmica cuidadosa e monitorização, reservando diálise para critérios AEIOU',
    wrongs: ['Diálise imediata só pela creatinina', 'Restrição hídrica absoluta na IRA pré-renal', 'Corticosteroide de rotina sem suspeita inflamatória'],
    explain: 'IRA pré-renal pediátrica pede restauração de perfusão; diálise segue hipercalemia, acidose, intoxicação, overload ou uremia.',
  },
  DRC: {
    correct: 'Estadiar por TFG/albuminúria e tratar anemia, CKD-MBD, acidose, nutrição e crescimento',
    wrongs: ['Aguardar sintomas urêmicos para acompanhar', 'Suspender eritropoetina apesar de anemia sintomática', 'Ignorar baixa estatura e acidose crônica'],
    explain: 'DRC pediátrica afeta crescimento, osso, anemia e nutrição; o manejo é longitudinal e multidisciplinar.',
  },
  'Proteinúria': {
    correct: 'Quantificar relação proteína/creatinina em primeira urina e diferenciar ortostática de persistente',
    wrongs: ['Biopsiar toda proteinúria isolada no primeiro dia', 'Tratar com antibiótico sem leucocitúria', 'Ignorar proteinúria nefrótica persistente'],
    explain: 'A primeira urina da manhã diferencia proteinúria ortostática; persistência ou faixa nefrótica muda investigação.',
  },
  'Hematúria': {
    correct: 'Confirmar origem glomerular por dismorfismo/cilindros e associar complemento, proteinúria e PA',
    wrongs: ['Prescrever quinolona sem sintomas urinários', 'Descartar doença glomerular se a creatinina inicial é normal', 'Fazer tomografia em toda micro-hematúria isolada'],
    explain: 'Hematúria glomerular costuma vir com cilindros, dismorfismo, proteinúria ou hipertensão; a investigação muda conforme risco.',
  },
  'Síndrome nefrótica': {
    correct: 'Prednisona VO em dose plena conforme protocolo de síndrome nefrótica idiopática típica',
    wrongs: ['Pulsoterapia com metilprednisolona em todo caso típico', 'Ciclofosfamida como primeira droga antes de falha corticoide', 'Micofenolato como primeira linha sem tentativa de corticoide'],
    explain: 'Quadro típico entre 1 e 10 anos sugere lesão mínima corticossensível; corticoide oral é primeira linha.',
  },
  Glomerulonefrites: {
    correct: 'Investigar complemento, função renal e sedimento ativo; internar se hipertensão, oligúria ou crescentes suspeitos',
    wrongs: ['Apenas hidratar e liberar com creatinina subindo', 'Anticoagular por hematúria macroscópica isolada', 'Evitar biópsia mesmo com RPGN'],
    explain: 'GN pediátrica é estratificada por rapidez, complemento, função renal, PA e sedimento urinário.',
  },
  'Nefropatia por IgA': {
    correct: 'Controlar PA/proteinúria com IECA/BRA e considerar biópsia/estratificação se proteinúria persistente',
    wrongs: ['Tratar todo episódio com antibiótico prolongado', 'Indicar tonsilectomia como rotina universal', 'Ignorar proteinúria após hematúria sincrônica'],
    explain: 'IgA costuma causar hematúria sincrônica a IVAS; prognóstico depende de proteinúria, TFG, PA e achados de biópsia.',
  },
  'GN pós-estreptocócica': {
    correct: 'Suporte com restrição hidrossalina, controle pressórico e seguimento de C3/creatinina',
    wrongs: ['Imunossupressão pesada de rotina na GNPE típica', 'Alta sem controle de volume e PA', 'Biópsia imediata se C3 baixo na fase inicial típica'],
    explain: 'GNPE típica tem latência após infecção, C3 baixo e melhora com suporte; biópsia fica para evolução atípica.',
  },
  'Nefrite lúpica': {
    correct: 'Induzir nefrite proliferativa com corticoide mais micofenolato ou ciclofosfamida e planejar manutenção',
    wrongs: ['Tratar classe III/IV apenas com hidroxicloroquina', 'Suspender imunossupressão ao normalizar proteinúria em 1 semana', 'Evitar biópsia apesar de proteinúria e cilindros'],
    explain: 'Classe histológica orienta indução e manutenção; nefrite proliferativa exige imunossupressão estruturada.',
  },
  SHU: {
    correct: 'Suporte intensivo com controle hídrico, transfusão se indicada e diálise conforme necessidade',
    wrongs: ['Antibiótico e loperamida de rotina na fase diarréica', 'Plasmaférese em toda SHU D+ típica', 'Corticoide isolado como tratamento definitivo'],
    explain: 'SHU típica pós-diarréia é manejada com suporte; atípica exige investigação de complemento e terapia específica.',
  },
  'Púrpura de Henoch-Schönlein': {
    correct: 'Monitorar urina/PA seriadas e tratar nefrite conforme proteinúria, TFG e biópsia',
    wrongs: ['Dar alta sem seguimento renal após púrpura', 'Usar antibiótico para toda hematúria pós-vasculite', 'Indicar nefrectomia por proteinúria'],
    explain: 'Vasculite IgA pode ter nefrite tardia; seguimento de PA e urina é parte central da conduta.',
  },
  Hipertensão: {
    correct: 'Confirmar percentis por idade/sexo/altura, pesquisar causa secundária e tratar lesão de órgão-alvo',
    wrongs: ['Aplicar ponto de corte adulto em lactente', 'Ignorar PA elevada repetida', 'Iniciar quatro fármacos sem confirmar medida'],
    explain: 'HAS pediátrica é definida por percentis; causas renais e renovasculares são frequentes e devem ser buscadas.',
  },
  ITU: {
    correct: 'Tratar ITU febril com antibiótico adequado e solicitar ultrassonografia de vias urinárias conforme protocolo',
    wrongs: ['Nunca solicitar imagem após ITU febril', 'Cistoscopia de rotina em todo lactente', 'Aguardar urocultura sem tratar lactente tóxico'],
    explain: 'ITU febril em lactente exige cultura, antibiótico oportuno e investigação anatômica inicial com US.',
  },
  'Refluxo vesicoureteral': {
    correct: 'Estratificar grau, ITU recorrente e cicatriz renal para definir observação, profilaxia ou cirurgia',
    wrongs: ['Corrigir cirurgicamente todo refluxo grau I', 'Suspender seguimento após uma urocultura negativa', 'Tratar refluxo com corticoide'],
    explain: 'RVU é manejado por risco: grau, recorrência, disfunção miccional e dano renal orientam profilaxia/cirurgia.',
  },
  Hidronefrose: {
    correct: 'Repetir US pós-natal no tempo adequado e investigar obstrução se dilatação moderada/grave persiste',
    wrongs: ['Operar no primeiro dia de vida toda hidronefrose antenatal', 'Ignorar ureter dilatado e parênquima fino', 'Usar diurético para reduzir dilatação pielocalicial'],
    explain: 'Hidronefrose antenatal pede confirmação pós-natal e estratificação por APD, cálices, ureter e parênquima.',
  },
  'Uropatias congênitas': {
    correct: 'Avaliar CAKUT com US, função renal e encaminhamento urológico se obstrução ou rim único',
    wrongs: ['Fazer biópsia para diagnosticar megaureter', 'Aguardar DRC para investigar CAKUT', 'Usar antibiótico crônico sem indicação de risco'],
    explain: 'CAKUT é causa importante de DRC pediátrica; anatomia e função guiam seguimento.',
  },
  'Válvula de uretra posterior': {
    correct: 'Desobstruir a válvula, drenar bexiga e acompanhar bexiga/DRC no longo prazo',
    wrongs: ['Tratar apenas com alfa-bloqueador e liberar', 'Adiar drenagem apesar de azotemia e bexiga distendida', 'Fazer profilaxia sem corrigir obstrução'],
    explain: 'Válvula de uretra posterior é obstrução infravesical grave; alívio da obstrução e seguimento renal são essenciais.',
  },
  'Disfunção miccional': {
    correct: 'Instituir uroterapia, tratar constipação e considerar biofeedback/alarme conforme fenótipo',
    wrongs: ['Dar antibiótico contínuo sem ITU', 'Ignorar constipação associada', 'Indicar cirurgia vesical como primeira linha'],
    explain: 'Disfunção miccional pediátrica costuma melhorar com uroterapia, rotina miccional e controle intestinal.',
  },
  'Bexiga neurogênica': {
    correct: 'Iniciar cateterismo intermitente limpo e anticolinérgico se bexiga de alta pressão',
    wrongs: ['Esperar hidronefrose para cateterizar', 'Tratar resíduo pós-miccional com diurético', 'Evitar urodinâmica mesmo com mielomeningocele'],
    explain: 'Na bexiga neurogênica, proteger trato urinário superior depende de baixa pressão e esvaziamento adequado.',
  },
  'Litíase': {
    correct: 'Controlar dor, hidratar com meta realista e investigar composição/metabolismo após cálculo pediátrico',
    wrongs: ['Nefrectomia para cálculo pequeno não obstrutivo', 'Restringir cálcio dietético de rotina', 'Ignorar hipercalciúria e citrato urinário'],
    explain: 'Criança com cálculo tem alta chance de causa metabólica; analgesia, imagem e investigação previnem recorrência.',
  },
  Hipercalciúria: {
    correct: 'Aumentar líquidos, reduzir sódio e usar tiazídico se sintomática/persistente apesar de dieta',
    wrongs: ['Cortar todo cálcio da dieta', 'Prescrever vitamina D em megadose sem deficiência', 'Ignorar hematúria recorrente com Ca/Cr alto'],
    explain: 'Hipercalciúria idiopática causa hematúria/litíase; manejo começa por água e sódio, preservando cálcio normal.',
  },
  Cistinúria: {
    correct: 'Manter alto volume urinário, alcalinizar urina e considerar tiopronina se recorrência',
    wrongs: ['Acidificar urina para dissolver cistina', 'Usar antibiótico crônico como prevenção principal', 'Suspender hidratação quando assintomático'],
    explain: 'Cistina precipita em pH ácido e baixa diurese; alcalinização e volume são pilares.',
  },
  Hiperoxalúria: {
    correct: 'Investigar hiperoxalúria primária/entérica e tratar com hidratação, citrato e terapia específica quando indicada',
    wrongs: ['Dar vitamina C em alta dose', 'Aguardar DRC terminal para investigar oxalato', 'Restringir água para reduzir cristalúria'],
    explain: 'Hiperoxalúria em criança pode causar nefrocalcinose, litíase e oxalose; diagnóstico precoce muda prognóstico.',
  },
  'Acidose tubular': {
    correct: 'Identificar acidose metabólica hiperclorêmica e repor álcalis conforme tipo de ATR',
    wrongs: ['Tratar com restrição de bicarbonato', 'Diagnosticar cetoacidose com ânion gap normal e glicemia normal', 'Ignorar nefrocalcinose na ATR distal'],
    explain: 'ATR cursa com acidose de gap normal; potássio, pH urinário e Fanconi diferenciam tipos.',
  },
  Bartter: {
    correct: 'Repor K/Cl, tratar hipovolemia e considerar indometacina em Bartter neonatal/clássico',
    wrongs: ['Restringir sal em lactente perdedor de sal', 'Usar espironolactona isolada como cura', 'Tratar como vômitos ocultos sem avaliar cloro urinário'],
    explain: 'Bartter simula diurético de alça: alcalose hipocalêmica, renina/aldosterona altas e PA normal/baixa.',
  },
  Gitelman: {
    correct: 'Repor magnésio e potássio, orientar sal e monitorar sintomas/ECG',
    wrongs: ['Restringir magnésio por hipomagnesemia', 'Indicar diálise por alcalose isolada', 'Tratar como hiperaldosteronismo com hipertensão grave'],
    explain: 'Gitelman lembra tiazídico: hipocalemia, alcalose, hipomagnesemia e hipocalciúria em criança maior/adolescente.',
  },
  Liddle: {
    correct: 'Tratar hipertensão hipocalêmica com amilorida/triantereno e restrição de sódio',
    wrongs: ['Usar espironolactona como droga principal', 'Repor potássio sem bloquear ENaC', 'Investigar renina alta como padrão esperado'],
    explain: 'Liddle é ganho de função do ENaC: renina/aldosterona baixas e resposta a amilorida.',
  },
  SIADH: {
    correct: 'Confirmar euvolemia com urina concentrada/natriurese e restringir água se assintomático',
    wrongs: ['Corrigir rapidamente hiponatremia crônica assintomática', 'Dar soro hipotônico de manutenção', 'Diagnosticar SIADH em choque hipovolêmico'],
    explain: 'SIADH combina hiponatremia hipo-osmolar, euvolemia e urina inapropriadamente concentrada.',
  },
  'Diabetes insipidus': {
    correct: 'Diferenciar DI central/nefrógeno por osmolaridade e resposta ao desmopressina',
    wrongs: ['Restringir água livre em lactente hipernatrêmico', 'Tratar polidipsia com furosemida', 'Diagnosticar SIADH com urina diluída e Na alto'],
    explain: 'DI causa poliúria hipotônica e risco de hipernatremia; teste deve ser seguro e interpretado por osmolaridades.',
  },
  Hiponatremia: {
    correct: 'Administrar NaCl 3% em bolus na hiponatremia sintomática e evitar correção excessiva',
    wrongs: ['Usar água livre em convulsão hiponatrêmica', 'Corrigir 25 mEq/L nas primeiras horas', 'Aguardar apenas dieta se houver rebaixamento'],
    explain: 'Convulsão por hiponatremia é emergência; o alvo inicial é elevar poucos mEq/L com segurança.',
  },
  Hipernatremia: {
    correct: 'Corrigir déficit hídrico lentamente, monitorando sódio seriado e causa da perda de água',
    wrongs: ['Normalizar sódio em 2 horas', 'Usar solução hipertônica de rotina', 'Ignorar diabetes insipidus se poliúria persiste'],
    explain: 'Hipernatremia crônica deve ser corrigida devagar para evitar edema cerebral.',
  },
  Hipercalemia: {
    correct: 'Estabilizar membrana com cálcio EV se ECG alterado e associar medidas de shift/remoção de K',
    wrongs: ['Observação sem ECG', 'Infundir potássio adicional', 'Espironolactona como primeira medida de emergência'],
    explain: 'Hipercalemia com alteração de ECG mata por arritmia; cálcio estabiliza antes de remover potássio.',
  },
  Hipocalemia: {
    correct: 'Repor potássio com monitorização e corrigir causa, magnésio e perdas urinárias/digestivas',
    wrongs: ['Dar resina de troca para reduzir K', 'Ignorar fraqueza e alteração de ECG', 'Tratar alcalose hipocalêmica com restrição absoluta de potássio'],
    explain: 'Hipocalemia sintomática ou com ECG exige reposição cuidadosa e busca de perdas/redistribuição.',
  },
  'Distúrbios ácido-base': {
    correct: 'Calcular ânion gap, compensação esperada e tratar a causa do distúrbio dominante',
    wrongs: ['Interpretar pH sem HCO3/pCO2', 'Dar bicarbonato para toda acidose leve', 'Ignorar distúrbio misto se pH é quase normal'],
    explain: 'Gasometria em nefrologia pediátrica requer gap, compensação e contexto clínico.',
  },
  Hipercalcemia: {
    correct: 'Hidratar com soro fisiológico, suspender fontes de cálcio/vitamina D e investigar PTH',
    wrongs: ['Restringir volume em criança desidratada', 'Dar cálcio EV apesar de Ca alto', 'Ignorar nefrocalcinose e função renal'],
    explain: 'Hipercalcemia sintomática exige expansão volêmica e definição PTH-dependente ou independente.',
  },
  Hipocalcemia: {
    correct: 'Tratar tetania/convulsão com cálcio EV e investigar magnésio, PTH e vitamina D',
    wrongs: ['Aguardar consulta eletiva se há laringoespasmo', 'Dar furosemida como primeira medida', 'Ignorar hipomagnesemia associada'],
    explain: 'Hipocalcemia sintomática é emergência; Mg baixo pode impedir correção.',
  },
  Hipofosfatemia: {
    correct: 'Repor fosfato quando grave/sintomática e investigar perdas renais, realimentação ou NPT',
    wrongs: ['Restringir fósforo em raquitismo hipofosfatêmico', 'Ignorar fraqueza respiratória', 'Tratar com calcitonina'],
    explain: 'Hipofosfatemia importante causa fraqueza, rabdomiólise e raquitismo; causa renal muda manejo.',
  },
  Raquitismo: {
    correct: 'Diferenciar deficiência de vitamina D de perda renal de fosfato e tratar conforme mecanismo',
    wrongs: ['Dar só cálcio se há FGF23 alto e fosfatúria', 'Ignorar deformidades progressivas', 'Usar corticoide para raquitismo nutricional'],
    explain: 'Raquitismo renal/hipofosfatêmico tem fosfatúria e requer estratégia distinta do déficit nutricional simples.',
  },
  Cistinose: {
    correct: 'Reconhecer Fanconi com cristais corneanos e iniciar cisteamina sistêmica/ocular',
    wrongs: ['Tratar apenas com bicarbonato sem terapia específica', 'Esperar DRC terminal para confirmar', 'Restringir líquidos em poliúria por Fanconi'],
    explain: 'Cistinose causa síndrome de Fanconi, falha de crescimento e cristais; cisteamina altera evolução.',
  },
  Alport: {
    correct: 'Investigar colágeno IV, audição/olhos e iniciar nefroproteção se proteinúria',
    wrongs: ['Tratar hematúria familiar com antibiótico prolongado', 'Descartar se complemento é normal', 'Indicar corticoide como primeira linha'],
    explain: 'Alport combina hematúria familiar, proteinúria progressiva, surdez e alterações oculares.',
  },
  Nefronoftise: {
    correct: 'Suspeitar ciliopatia em poliúria, anemia precoce e rins corticomedulares alterados',
    wrongs: ['Diagnosticar como polidipsia psicogênica sem investigar DRC', 'Usar imunossupressão para fibrose tubulointersticial', 'Esperar hipertensão grave como sinal obrigatório'],
    explain: 'Nefronoftise causa DRC tubulointersticial com concentração urinária ruim, anemia e poucos achados urinários.',
  },
  'Doença policística': {
    correct: 'Diferenciar ADPKD/ARPKD, controlar PA e rastrear complicações conforme padrão familiar/imagem',
    wrongs: ['Drenar todos os cistos assintomáticos', 'Ignorar hipertensão em criança com cistos', 'Usar antibiótico crônico sem infecção'],
    explain: 'Padrão de herança, idade, fígado e tamanho renal separam ADPKD de ARPKD e orientam seguimento.',
  },
  Fabry: {
    correct: 'Suspeitar Fabry em dor neuropática/angioqueratomas com proteinúria e dosar alfa-galactosidase/genética',
    wrongs: ['Tratar como ITU recorrente sem cultura', 'Descartar em menina sintomática', 'Usar corticoide para zerar Gb3'],
    explain: 'Fabry pode aparecer na infância/adolescência; diagnóstico permite terapia específica e rastreio familiar.',
  },
  Oxalose: {
    correct: 'Investigar hiperoxalúria primária e planejar terapia metabólica/transplante combinado quando avançada',
    wrongs: ['Dar vitamina C alta para reduzir oxalato', 'Fazer transplante renal isolado sem controlar produção hepática em PH1 avançada', 'Ignorar nefrocalcinose difusa'],
    explain: 'Oxalose sistêmica por hiperoxalúria primária pode recidivar no enxerto se produção de oxalato não for tratada.',
  },
  'Transplante renal': {
    correct: 'Investigar rejeição, infecção e nível de imunossupressor; biopsiar enxerto quando indicado',
    wrongs: ['Suspender todo imunossupressor às cegas', 'Atribuir febre sempre a rejeição sem cultura/PCR viral', 'Aumentar tacrolimo se nível já está tóxico'],
    explain: 'Disfunção do enxerto pediátrico exige separar rejeição, infecção, obstrução e toxicidade medicamentosa.',
  },
  Hemodiálise: {
    correct: 'Indicar HD por critérios clínicos e cuidar de acesso, ultrafiltração e complicações intradialíticas',
    wrongs: ['Dialisar apenas por número de creatinina', 'Usar ultrafiltração agressiva em choque', 'Ignorar infecção de cateter'],
    explain: 'Hemodiálise pediátrica requer indicação correta, prescrição por peso e segurança hemodinâmica.',
  },
  'Diálise peritoneal': {
    correct: 'Tratar peritonite com coleta do efluente e antibiótico intraperitoneal conforme protocolo',
    wrongs: ['Retirar cateter em todo primeiro episódio leve', 'Aguardar cultura sem antibiótico se efluente turvo', 'Tratar dor abdominal com laxante apenas'],
    explain: 'Efluente turvo em DP é peritonite até prova em contrário; cultura e antibiótico precoce preservam membrana.',
  },
  'Biópsia renal': {
    correct: 'Indicar biópsia em SN atípica/resistente, GN grave ou proteinúria persistente com risco',
    wrongs: ['Biopsiar toda hematúria isolada com função normal', 'Evitar biópsia mesmo em RPGN', 'Usar biópsia para diagnosticar refluxo vesicoureteral'],
    explain: 'Biópsia pediátrica é guiada por risco e potencial de mudar terapia.',
  },
  'Patologia renal': {
    correct: 'Correlacionar LMN/GESF/IgA com clínica, imunofluorescência e microscopia eletrônica',
    wrongs: ['Definir lesão mínima por ultrassom', 'Ignorar imunofluorescência em hematúria glomerular', 'Tratar todo padrão histológico com a mesma droga'],
    explain: 'Patologia renal só faz sentido integrada ao fenótipo e aos compartimentos glomerular/tubulointersticial.',
  },
  Ultrassonografia: {
    correct: 'Usar US como exame inicial para ITU febril, hidronefrose ou tamanho/ecogenicidade renal',
    wrongs: ['Substituir toda avaliação funcional por US normal', 'Pedir tomografia contrastada como primeira imagem de todo lactente', 'Ignorar parênquima fino e ureter dilatado'],
    explain: 'US é seguro e inicial, mas deve ser interpretado com clínica e função renal.',
  },
  Farmacologia: {
    correct: 'Ajustar dose ao TFG/peso, evitar nefrotóxicos e sincronizar fármacos com diálise quando necessário',
    wrongs: ['Usar dose adulta fixa em lactente', 'Manter aminoglicosídeo apesar de IRA sem monitorar nível', 'Suspender todo antibiótico por DRC leve'],
    explain: 'Farmacologia renal pediátrica depende de peso, TFG, idade e modalidade dialítica.',
  },
  Imunossupressores: {
    correct: 'Monitorar níveis/efeitos adversos e balancear risco infeccioso com controle da doença renal',
    wrongs: ['Aumentar tacrolimo com nível de vale tóxico', 'Ignorar leucopenia por micofenolato', 'Suspender corticoide abruptamente após uso prolongado'],
    explain: 'Tacrolimo, MMF e corticoide exigem monitorização de toxicidade, infecção e resposta renal.',
  },
  'Medicina baseada em evidências': {
    correct: 'Aplicar recomendações ao risco individual, qualidade da evidência e desfechos relevantes para criança',
    wrongs: ['Seguir resumo de guideline sem checar população estudada', 'Trocar desfecho renal duro por marcador irrelevante', 'Ignorar viés e intervalo de confiança'],
    explain: 'Boa prática em nefropediatria combina evidência, aplicabilidade pediátrica e preferência familiar.',
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
  const core = CORE[tema];
  if (!core) {
    throw new Error(`Tema pediátrico sem núcleo de resposta específico: ${tema}`);
  }
  return core;
}

function buildVignette(ctx) {
  const { tema, subtema, age, sex, weight, height, sbp, dbp, i, rnd } = ctx;
  const sexoLabel = sex === 'M' ? 'Menino' : 'Menina';
  const ageLabel = age < 1 ? `${Math.max(1, Math.round(age * 30))} dias` : age < 2 ? `${Math.round(age * 12)} meses` : `${age} anos`;
  const cr = (0.25 + age * 0.04 + rnd() * 0.35).toFixed(1);
  const base = `${sexoLabel} de ${ageLabel} (${weight} kg, ${height} cm), PA ${sbp}×${dbp} mmHg`;

  const cases = {
    Anatomia: () => `${base}, após trauma abdominal leve, tem hematúria microscópica. US mostra contusão cortical no polo superior esquerdo; Doppler preserva fluxo segmentar e creatinina ${cr} mg/dL. Considerando córtex, medula e vascularização renal, qual interpretação orienta a conduta?`,
    Embriologia: () => `RN de ${ageLabel}, pré-natal com rim direito multicístico e ureter dilatado. Ao nascer, diurese 2 mL/kg/h, creatinina ${cr} mg/dL e US confirma alteração compatível com defeito de ${subtema.toLowerCase()}. Qual próximo passo?`,
    'Fisiologia renal': () => `${base}, poliúria após correção de desidratação. Osmolaridade sérica ${292 + (i % 12)} mOsm/kg, urina ${160 + (i % 90)} mOsm/kg e creatinina ${cr} mg/dL. O preceptor quer avaliar ${subtema.toLowerCase()} renal. Qual interpretação é mais adequada?`,
    'Desenvolvimento renal': () => `Prematuro de ${ageLabel}, 1,4 kg ao nascer, em UTI neonatal, apresenta Na ${132 + (i % 8)} mEq/L, diurese ${2 + (i % 3)} mL/kg/h e creatinina ${cr} mg/dL em queda. Frente à maturação tubular/${subtema}, qual conduta é correta?`,
    IRA: () => `${base}, gastroenterite há 3 dias, mucosas secas, enchimento capilar 4 s e diurese 0,4 mL/kg/h. Creatinina ${(1.1 + rnd()).toFixed(1)} mg/dL, ureia ${55 + (i % 45)} mg/dL, FENa ${(0.2 + rnd() * 0.5).toFixed(1)}%. Qual conduta inicial?`,
    DRC: () => `${base}, história de CAKUT, TFG estimada ${18 + (i % 35)} mL/min/1,73m², Hb ${(8.5 + rnd()).toFixed(1)} g/dL, PTH ${160 + (i % 180)} pg/mL e bicarbonato ${15 + (i % 5)} mEq/L. Qual plano para ${subtema.toLowerCase()}?`,
    'Proteinúria': () => `${base}, edema ausente, urina 1 com proteína 2+ em exame escolar. Relação proteína/creatinina ao acaso ${(0.4 + rnd()).toFixed(1)} mg/mg e primeira urina da manhã ${i % 2 ? '0,12' : '0,9'} mg/mg. Qual a melhor abordagem para ${subtema.toLowerCase()}?`,
    Hematúria: () => `${base}, urina cor de coca-cola após IVAS, hemácias dismórficas 70%, cilindros hemáticos e relação proteína/creatinina ${(0.5 + rnd()).toFixed(1)} mg/mg. C3 ${i % 2 ? 92 : 42} mg/dL. Qual interpretação para ${subtema.toLowerCase()}?`,
    'Síndrome nefrótica': () => `${base}, edema palpebral há ${3 + (i % 4)} dias e ganho de 2 kg. Albumina ${(1.5 + rnd() * 0.6).toFixed(1)} g/dL, colesterol ${280 + Math.floor(rnd() * 120)} mg/dL, creatinina ${cr} mg/dL, urina proteína 4+ e relação proteína/creatinina ${(4 + rnd() * 8).toFixed(1)} mg/mg. Qual a melhor conduta inicial?`,
    Glomerulonefrites: () => `${base}, edema, oligúria e sedimento com cilindros hemáticos. Creatinina ${(0.8 + rnd() * 1.6).toFixed(1)} mg/dL, C3 ${45 + (i % 30)} mg/dL e proteinúria ${(1 + rnd() * 2).toFixed(1)} mg/mg. Diante de ${subtema.toLowerCase()}, qual decisão é mais adequada?`,
    'Nefropatia por IgA': () => `${base}, hematúria macroscópica 24 horas após faringite, C3 normal, creatinina ${cr} mg/dL e proteinúria persistente ${(0.8 + rnd()).toFixed(1)} mg/mg após 3 meses. Qual conduta para ${subtema}?`,
    'GN pós-estreptocócica': () => `${base}, hematúria, edema e cefaleia. Teve impetigo há ${2 + (i % 3)} semanas; C3 ${35 + (i % 25)} mg/dL, ASLO elevado e creatinina ${(0.6 + rnd() * 0.8).toFixed(1)} mg/dL. Qual manejo inicial?`,
    'Nefrite lúpica': () => `${base}, LES juvenil com proteinúria ${(1.5 + rnd() * 2).toFixed(1)} g/g, hematúria dismórfica, C3 baixo e anti-dsDNA alto. Biópsia sugere classe ${i % 2 ? 'III' : 'IV'}. Qual estratégia para ${subtema.toLowerCase()}?`,
    SHU: () => `${base}, diarreia sanguinolenta há 5 dias, palidez e oligúria. Hb ${(7 + rnd()).toFixed(1)} g/dL, plaquetas ${45000 + (i % 30000)}/mm³, DHL elevada, esquizócitos e creatinina ${(1.4 + rnd()).toFixed(1)} mg/dL. Qual conduta?`,
    'Púrpura de Henoch-Schönlein': () => `${base}, púrpura palpável em pernas, dor abdominal e artralgia. Urina com hemácias dismórficas, relação proteína/creatinina ${(0.6 + rnd()).toFixed(1)} mg/mg e creatinina ${cr} mg/dL. Qual seguimento renal?`,
    Hipertensão: () => `${base}, cefaleia recorrente e PA acima do percentil 95 em três consultas. Urina 1 com proteína 1+, creatinina ${cr} mg/dL e US renal com assimetria de 1,8 cm. Qual abordagem para ${subtema}?`,
    ITU: () => `Lactente de ${ageLabel}, ${weight} kg, febre 39 °C sem foco, EAS com nitrito positivo e leucócitos >100/campo. Urocultura colhida por cateter cresce E. coli >10⁵ UFC/mL; creatinina ${cr} mg/dL. Após estabilização, qual próximo passo?`,
    'Refluxo vesicoureteral': () => `${base}, segunda pielonefrite febril em 8 meses. US mostra cicatriz polar e uretrocistografia evidencia refluxo grau ${2 + (i % 4)} à direita. Qual conduta para ${subtema.toLowerCase()}?`,
    Hidronefrose: () => `Lactente de ${ageLabel}, hidronefrose antenatal. US no 7º dia: APD ${10 + (i % 12)} mm, cálices dilatados, parênquima preservado e creatinina ${cr} mg/dL. Qual seguimento para ${subtema.toLowerCase()}?`,
    'Uropatias congênitas': () => `RN de ${ageLabel}, jato urinário fraco e US com rim esquerdo pequeno, megaureter e bexiga trabeculada. Creatinina ${cr} mg/dL e diurese preservada. Qual avaliação inicial para ${subtema}?`,
    'Válvula de uretra posterior': () => `Menino de ${ageLabel}, pré-natal com bexiga espessada e hidronefrose bilateral. No berçário tem jato fraco, creatinina ${(0.8 + rnd()).toFixed(1)} mg/dL e hipercalemia leve. Qual conduta imediata?`,
    'Disfunção miccional': () => `${base}, urgência miccional, escapes diurnos e constipação com Bristol 1-2. EAS sem leucocitúria, resíduo pós-miccional 35 mL e US renal normal. Qual manejo inicial?`,
    'Bexiga neurogênica': () => `${base}, mielomeningocele corrigida, ITU febril recorrente e urodinâmica com pressão de perda 45 cmH2O. US mostra hidronefrose leve e creatinina ${cr} mg/dL. Qual conduta protege o rim?`,
    'Litíase': () => `${base}, dor em flanco e hematúria. US mostra cálculo de ${4 + (i % 5)} mm em ureter distal sem sepse; Ca/Cr urinário elevado e creatinina ${cr} mg/dL. Qual plano?`,
    Hipercalciúria: () => `${base}, hematúria microscópica recorrente e dor abdominal. Relação Ca/Cr urinária ${(0.35 + rnd() * 0.2).toFixed(2)} mg/mg, citrato baixo e US sem obstrução. Qual intervenção inicial?`,
    Cistinúria: () => `${base}, litíase coraliforme recorrente. Cristais hexagonais no sedimento, cistina urinária elevada e pH urinário 5,5. Creatinina ${cr} mg/dL. Qual prevenção de recorrência?`,
    Hiperoxalúria: () => `${base}, nefrocalcinose bilateral e cálculos desde lactente. Oxalato urinário elevado, eTFG ${45 + (i % 30)} mL/min/1,73m² e história de consanguinidade. Qual investigação/conduta?`,
    'Acidose tubular': () => `${base}, baixa estatura, vômitos e nefrocalcinose. Gasometria: pH ${(7.22 + rnd() * 0.08).toFixed(2)}, HCO3 ${12 + (i % 5)} mEq/L, Cl ${110 + (i % 8)} mEq/L, K ${(2.8 + rnd()).toFixed(1)} mEq/L, pH urinário 6,5. Qual diagnóstico/conduta?`,
    Bartter: () => `Lactente de ${ageLabel}, poliúria, desidratação recorrente e falha de crescimento. K ${(2.2 + rnd() * 0.8).toFixed(1)} mEq/L, Cl ${86 + (i % 8)} mEq/L, bicarbonato ${30 + (i % 5)} mEq/L, renina alta e PA ${sbp}×${dbp}. Qual manejo?`,
    Gitelman: () => `${base}, cãibras e parestesias. K ${(2.5 + rnd() * 0.6).toFixed(1)} mEq/L, Mg ${(1.1 + rnd() * 0.3).toFixed(1)} mg/dL, bicarbonato ${29 + (i % 4)} mEq/L, Ca urinário baixo e PA normal. Qual conduta?`,
    Liddle: () => `${base}, hipertensão grave familiar e fraqueza. K ${(2.6 + rnd() * 0.5).toFixed(1)} mEq/L, bicarbonato ${30 + (i % 4)} mEq/L, renina e aldosterona suprimidas. Qual tratamento específico?`,
    SIADH: () => `${base}, pós-operatório de neurocirurgia, náuseas e sonolência leve. Na ${122 + (i % 6)} mEq/L, osm sérica 260 mOsm/kg, osm urinária 520 mOsm/kg, Na urinário 68 mEq/L, sem edema. Qual conduta?`,
    'Diabetes insipidus': () => `${base}, poliúria ${5 + (i % 4)} mL/kg/h e sede intensa após cirurgia de sela. Na ${150 + (i % 8)} mEq/L, osm sérica 310 mOsm/kg e osm urinária 110 mOsm/kg. Qual teste/intervenção diferencia o quadro?`,
    Hiponatremia: () => `Lactente de ${ageLabel}, convulsão generalizada após uso de solução hipotônica. Peso ${weight} kg, Na ${118 + (i % 6)} mEq/L, osm sérica baixa e glicemia normal. Qual conduta emergencial?`,
    Hipernatremia: () => `${base}, diarreia e febre há 4 dias, irritabilidade e perda de 9% do peso. Na ${158 + (i % 10)} mEq/L, ureia ${60 + (i % 30)} mg/dL e osm urinária alta. Como corrigir?`,
    Hipercalemia: () => `${base}, DRC e fraqueza súbita. K ${(6.4 + rnd() * 0.8).toFixed(1)} mEq/L, ECG com ondas T apiculadas, creatinina ${(1.5 + rnd()).toFixed(1)} mg/dL e bicarbonato ${15 + (i % 4)} mEq/L. Qual medida imediata?`,
    Hipocalemia: () => `${base}, diarréia prolongada, fraqueza proximal e extrassístoles. K ${(2.2 + rnd() * 0.6).toFixed(1)} mEq/L, Mg ${(1.4 + rnd() * 0.3).toFixed(1)} mg/dL e bicarbonato ${18 + (i % 5)} mEq/L. Qual conduta?`,
    'Distúrbios ácido-base': () => `${base}, respiração de Kussmaul e vômitos. Gasometria: pH ${(7.10 + rnd() * 0.18).toFixed(2)}, HCO3 ${8 + (i % 8)} mEq/L, pCO2 ${20 + (i % 12)} mmHg, Cl ${104 + (i % 12)} mEq/L, ânion gap ${12 + (i % 16)}. Qual interpretação?`,
    Hipercalcemia: () => `${base}, constipação, poliúria e sonolência. Cálcio total ${(12.2 + rnd()).toFixed(1)} mg/dL, fósforo ${(3 + rnd()).toFixed(1)} mg/dL, PTH ${i % 2 ? 'suprimido' : 'elevado'} e creatinina ${cr} mg/dL. Qual conduta inicial?`,
    Hipocalcemia: () => `RN de ${ageLabel}, tremores e estridor. Cálcio iônico ${(0.78 + rnd() * 0.12).toFixed(2)} mmol/L, Mg ${(1.2 + rnd() * 0.4).toFixed(1)} mg/dL, fósforo ${(6 + rnd()).toFixed(1)} mg/dL. Qual tratamento?`,
    Hipofosfatemia: () => `${base}, fraqueza, dor óssea e história de NPT prolongada. Fósforo ${(1.4 + rnd() * 0.6).toFixed(1)} mg/dL, FA elevada, cálcio normal e fração de excreção de fosfato alta. Qual conduta?`,
    Raquitismo: () => `${base}, genu varo progressivo e dor em pernas. Cálcio ${(9 + rnd()).toFixed(1)} mg/dL, fósforo ${(2.0 + rnd() * 0.7).toFixed(1)} mg/dL, FA elevada, 25-OH vitamina D ${i % 2 ? 9 : 32} ng/mL e fosfatúria. Qual diagnóstico/conduta?`,
    Cistinose: () => `Lactente de ${ageLabel}, falha de crescimento, poliúria e fotofobia. Glicosúria com glicemia normal, bicarbonato ${14 + (i % 4)} mEq/L, fósforo baixo e cristais corneanos. Qual tratamento específico?`,
    Alport: () => `${base}, hematúria microscópica desde a infância, tio materno em diálise aos 28 anos e perda auditiva neurossensorial leve. C3 normal, proteinúria ${(0.4 + rnd()).toFixed(1)} g/g. Qual investigação/conduta?`,
    Nefronoftise: () => `${base}, poliúria, anemia Hb ${(8.8 + rnd()).toFixed(1)} g/dL desproporcional e atraso de crescimento. US mostra rins de tamanho normal/pequeno com perda da diferenciação corticomedular e creatinina ${(1.3 + rnd()).toFixed(1)} mg/dL. Qual hipótese?`,
    'Doença policística': () => `${base}, hipertensão e história familiar de rins policísticos. US mostra múltiplos cistos bilaterais e rins aumentados; creatinina ${cr} mg/dL, proteinúria discreta. Qual acompanhamento?`,
    Fabry: () => `${base}, crises de dor em mãos/pés, hipohidrose e angioqueratomas. Urina com albuminúria ${(80 + i) % 200} mg/g e creatinina ${cr} mg/dL. Qual teste confirma a suspeita?`,
    Oxalose: () => `${base}, nefrocalcinose difusa, cálculos recorrentes e eTFG ${25 + (i % 25)} mL/min/1,73m². Oxalato plasmático alto e depósito sistêmico suspeito. Qual estratégia?`,
    'Transplante renal': () => `Adolescente de ${ageLabel}, transplantado renal há ${1 + (i % 10)} meses, febre baixa e creatinina subindo de 0,8 para ${(1.5 + rnd()).toFixed(1)} mg/dL. EAS com leucocitúria discreta, tacrolimo vale ${5 + (i % 10)} ng/mL. Qual investigação inicial?`,
    Hemodiálise: () => `${base}, DRC estágio 5, dispneia, edema e K ${(6.0 + rnd()).toFixed(1)} mEq/L apesar de medidas clínicas. Cateter tunelizado com fluxo baixo na sessão anterior. Qual decisão sobre diálise/acesso?`,
    'Diálise peritoneal': () => `${base}, em diálise peritoneal crônica, dor abdominal e efluente turvo. Contagem celular 850/mm³ com 82% neutrófilos; Gram pendente, afebril, PA estável. Qual conduta?`,
    'Biópsia renal': () => `${base}, síndrome nefrótica sem resposta após 6 semanas de prednisona, hematúria persistente e creatinina ${(0.8 + rnd()).toFixed(1)} mg/dL. Qual indicação para ${subtema.toLowerCase()}?`,
    'Patologia renal': () => `${base}, proteinúria nefrótica e biópsia com esclerose segmentar em alguns glomérulos, IF inespecífica e microscopia eletrônica com apagamento podocitário. Qual correlação clínico-patológica?`,
    Ultrassonografia: () => `Lactente de ${ageLabel}, primeira ITU febril confirmada. Após melhora, US mostra rim esquerdo 1,5 cm menor, ecogenicidade aumentada e leve dilatação pielocalicial; creatinina ${cr} mg/dL. Qual interpretação?`,
    Farmacologia: () => `${base}, pielonefrite e TFG estimada ${25 + (i % 35)} mL/min/1,73m². Recebe aminoglicosídeo e vancomicina; nível de vale vem alto e creatinina sobe para ${(1.0 + rnd()).toFixed(1)} mg/dL. Qual ajuste?`,
    Imunossupressores: () => `${base}, nefrite lúpica em micofenolato e tacrolimo, leucócitos ${2500 + (i % 1200)}/mm³ e nível de tacrolimo ${10 + (i % 8)} ng/mL. Qual monitorização/ajuste?`,
    'Medicina baseada em evidências': () => `${base}, família pergunta se estudo adulto com desfecho substituto deve mudar o tratamento da proteinúria infantil. O artigo tem IC amplo e excluiu crianças com TFG baixa. Qual análise crítica é mais adequada?`,
  };

  const builder = cases[tema];
  if (!builder) {
    throw new Error(`Tema pediátrico sem vinheta clínica específica: ${tema}`);
  }
  return builder();
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
