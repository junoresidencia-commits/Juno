/**
 * Expansão expert II — Nefrologia adulta (título SBN / residência / hospitalar).
 */
const ADV_MASTERS_EXTRA2 = [
  {
    id: "NA-X051",
    tema: "MGRS",
    subtema: "Gamopatia monoclonal de significado renal",
    dificuldade: "avancado",
    age: 62,
    vars: {
      cr: 2.1,
      prot: 1.8
    },
    statement: "{{sexWord}} de {{age}} com creatinina {{cr}} mg/dL, proteinúria {{prot}} g/dia, cadeia leve kappa elevada no soro, biópsia com depósitos monoclonais sem critérios de mieloma tratável por hematologia “clássica”. Qual é o conceito e a implicação?",
    options: {
      A: "Ignorar o clone porque não há CRAB",
      B: "MGRS: o clone pequeno causa lesão renal — tratar o clone com base na lesão histológica (em conjunto com hematologia), não só pelos critérios de mieloma",
      C: "Apenas IECA resolve depósitos monoclonais",
      D: "Nefrectomia bilateral de rotina",
      E: "Diagnóstico impossível sem pico IgM enorme"
    },
    correct: "B",
    explanation: "MGRS reconhece que clones pequenos podem destruir o rim. A terapia é dirigida ao clone conforme o padrão histológico. Pearl: rim doente + clone pequeno = pense MGRS, não “MGUS inofensivo”.",
    bibliography: "IMWG/IKMG MGRS; Bridoux et al."
  },
  {
    id: "NA-X052",
    tema: "Amiloidose",
    subtema: "AL renal",
    dificuldade: "avancado",
    age: 59,
    vars: {
      alb: 2.1,
      prot: 6.5
    },
    statement: "{{sexWord}} de {{age}} com SN (alb {{alb}}, proteinúria {{prot}} g), macroglossia, hipotensão ortostática e cadeias leves livres alteradas. Vermelho-Congo positivo na biópsia. Qual conduta é prioritária?",
    options: {
      A: "Apenas diurético sem tipagem do amiloide",
      B: "Tipar amiloide (imuno-histoquímica/espectrometria), staging cardíaco e terapia clonodirigida urgente com hematologia; suporte edemigênico",
      C: "Corticoides isolados como cura da AL",
      D: "Antibiótico prolongado",
      E: "Observação por 2 anos antes de tratar"
    },
    correct: "B",
    explanation: "AL amiloide exige tipagem + avaliação cardíaca + tratamento do clone. Pearl: SN + órgãos-alvo + Congo vermelho = tipar e tratar rápido.",
    bibliography: "ISA amyloidosis; KDIGO GN notes on amyloid."
  },
  {
    id: "NA-X053",
    tema: "Glomerulopatia",
    subtema: "PGNMID",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com proteinúria, hematúria e LRA; biópsia: GN proliferativa com depósitos monoclonais IgG3-kappa; avaliação hematológica sem mieloma. Qual é a melhor abordagem?",
    options: {
      A: "Apenas observação vitalícia",
      B: "Tratar como MGRS/PGNMID: terapia clonodirigida (ex. regimes baseados em bortezomibe/rituximabe conforme clone) + suporte antiproteinúrico, em centro experiente",
      C: "Eculizumab de primeira linha em todos",
      D: "Nefrectomia diagnóstica",
      E: "Apenas alopurinol"
    },
    correct: "B",
    explanation: "PGNMID é MGRS; terapia mira o clone mesmo sem carga tumoral alta. Pearl: depósito monoclonal na biópsia manda no tratamento.",
    bibliography: "Nasr SH PGNMID; IKMG."
  },
  {
    id: "NA-X054",
    tema: "Glomerulopatia",
    subtema: "Fibrilar",
    dificuldade: "avancado",
    age: 50,
    vars: {
      prot: 4.2
    },
    statement: "{{sexWord}} de {{age}} com proteinúria {{prot}} g, hematúria; ME com fibrilas ~20 nm, DNAJB9 positivo, Congo negativo. Qual diagnóstico e implicação?",
    options: {
      A: "Amiloide AL típica",
      B: "Glomerulonefrite fibrilar (DNAJB9+): avaliar clone/associações e tratar conforme gravidade (imunossupressão/clonodirigido quando indicado)",
      C: "Lesão mínima pura sem biópsia necessária",
      D: "Apenas hipercalciúria",
      E: "Necrose papilar diabética"
    },
    correct: "B",
    explanation: "Fibrilar: fibrilas maiores que amiloide, Congo−, DNAJB9+. Pearl: DNAJB9 quase fecha fibrilar. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Nasr/DNAJB9 fibrillary GN reviews."
  },
  {
    id: "NA-X055",
    tema: "Crioglobulinemia",
    subtema: "HCV-relacionada",
    dificuldade: "avancado",
    age: 48,
    vars: {
      cr: 2.4
    },
    statement: "{{sexWord}} de {{age}} com púrpura, artralgias, fator reumatoide positivo, C4 muito baixo, creatinina {{cr}}, proteinúria e HCV ativo. Qual é o pilar terapêutico atual?",
    options: {
      A: "Apenas corticoide sem antivirais",
      B: "Antivirais de ação direta para HCV + imunossupressão/rituximabe se doença organo-ameaçadora; plasmaférese em crises graves selecionadas",
      C: "Interferon pegilado obrigatório em todos hoje",
      D: "Eculizumab como padrão",
      E: "Observação sem tratar HCV"
    },
    correct: "B",
    explanation: "Crioglobulinemia mista HCV: erradicar vírus com DAA; RTX/PLEX se grave. Pearl: C4 baixíssimo + púrpura + HCV = crioglobulina.",
    bibliography: "EASL HCV; KDIGO GN cryoglobulinemia."
  },
  {
    id: "NA-X056",
    tema: "Podocitopatia",
    subtema: "Lesão mínima do adulto",
    dificuldade: "intermediario",
    age: 42,
    vars: {
      alb: 1.8
    },
    statement: "{{sexWord}} de {{age}} com SN súbita (alb {{alb}}), sedimento pobre, biópsia com lesão mínima; usa AINE crônico. Qual conduta é mais adequada?",
    options: {
      A: "Ciclofosfamida imediata sem corticoide",
      B: "Suspender AINE, iniciar corticoide (ou alternativa se contraindicação), investigar causas secundárias (linfoma, fármacos) e tromboprofilaxia se risco alto",
      C: "Diálise de rotina",
      D: "Apenas restrição hídrica sem imunossupressão",
      E: "Eculizumab — hipótese inadequada para o quadro"
    },
    correct: "B",
    explanation: "MCD adulto: corticoide + remover gatilho (AINE); rastrear secundárias. Pearl: AINE + SN aguda = pense MCD. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDIGO GN 2021 MCD; adult MCD reviews."
  },
  {
    id: "NA-X057",
    tema: "Esclerodermia",
    subtema: "Crise renal esclerodérmica",
    dificuldade: "avancado",
    age: 46,
    vars: {
      pa: "210/120",
      cr: 3.5
    },
    statement: "{{sexWord}} de {{age}} com esclerose sistêmica difusa recente, PA {{pa}}, creatinina {{cr}}, anemia hemolítica microangiopática leve. Qual é a pedra angular do tratamento?",
    options: {
      A: "Suspender IECA imediatamente",
      B: "IECA em dose agressiva (captopril clássico) mesmo com creatinina em ascensão, suporte de MAT/HAS maligna; dialisar se preciso mantendo IECA",
      C: "Apenas nitroprussiato sem IECA",
      D: "Rituximabe como primeira linha isolada",
      E: "Plasmaférese obrigatória em todos os casos"
    },
    correct: "B",
    explanation: "Crise renal esclerodérmica: IECA é terapia salvadora; não suspender por azotemia isolada. Pearl: esclerodermia + HAS maligna = captopril/IECA já.",
    bibliography: "EULAR SSc; SRC reviews."
  },
  {
    id: "NA-X058",
    tema: "TMA",
    subtema: "HAS maligna",
    dificuldade: "avancado",
    age: 38,
    vars: {
      pa: "230/140"
    },
    statement: "{{sexWord}} de {{age}} com PA {{pa}}, papiledema, LRA, esquizócitos discretos e LDH elevada. ADAMTS13 e complemento em avaliação. Qual conduta inicial?",
    options: {
      A: "Reduzir PA a 90×60 em 10 minutos",
      B: "Controle gradual da PA em ambiente monitorado, investigar TMA secundária vs primária, suporte renal; evitar queda abrupta que cause isquemia",
      C: "Eculizumab empírico antes de qualquer medida pressórica",
      D: "Apenas aspirina",
      E: "Nefrectomia — hipótese inadequada para o quadro"
    },
    correct: "B",
    explanation: "HAS maligna com TMA: baixar PA com critério + diferenciar aHUS/PTT/secundária. Pearl: não derrube a PA em minutos.",
    bibliography: "AHA hypertensive emergency; TMA differentials."
  },
  {
    id: "NA-X059",
    tema: "SAF",
    subtema: "Nefropatia antifosfolípide",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "Mulher de {{age}} com SAF, HAS, proteinúria e biópsia com microtrombose arteriolar/glomerular sem GN imune plena. Qual é o foco terapêutico?",
    options: {
      A: "Apenas corticoide sem anticoagulação",
      B: "Anticoagulação adequada + controle rigoroso da PA; imunossupressão se LES/atividade imune coexistente",
      C: "Eculizumab de rotina em toda SAF",
      D: "Suspender warfarina para “proteger rim”",
      E: "Biópsia anual obrigatória sem tratar"
    },
    correct: "B",
    explanation: "Nefropatia APS: trombose microvascular — anticoagular e controlar PA. Pearl: trombos na biópsia + aPL = anticoagulação.",
    bibliography: "EULAR APS; APS nephropathy reviews."
  },
  {
    id: "NA-X060",
    tema: "IgG4",
    subtema: "Nefrite túbulo-intersticial IgG4",
    dificuldade: "avancado",
    age: 61,
    vars: {
      igg4: 320,
      cr: 2.6
    },
    statement: "{{sexWord}} de {{age}} com LRA, IgG4 sérico {{igg4}}, pancreatite autoimune prévia e biópsia com infiltrado linfoplasmocitário IgG4+ e fibrose “storiform”. Qual tratamento inicial?",
    options: {
      A: "Apenas antibiótico",
      B: "Glicocorticoides (indução) com redução gradual; avaliar imunossupressor poupador se recidiva; excluir malignidade/infecção",
      C: "Ciclofosfamida como única opção sem corticoide",
      D: "Eculizumab — hipótese inadequada para o quadro",
      E: "Observação sem terapia"
    },
    correct: "B",
    explanation: "Doença IgG4-related renal: corticoide é primeira linha; poupadores em recidiva. Pearl: pancreatite + LRA + IgG4 alto = NTI IgG4.",
    bibliography: "IgG4-RD international consensus; renal IgG4 reviews."
  },
  {
    id: "NA-X061",
    tema: "Sarcoidose",
    subtema: "Hipercalcemia e NTI",
    dificuldade: "intermediario",
    age: 45,
    vars: {
      ca: 12.8,
      cr: 2.2
    },
    statement: "{{sexWord}} de {{age}} com sarcoidose pulmonar, Ca {{ca}}, creatinina {{cr}}, 1,25-OH vitamina D elevada e PTH suprimido. Qual mecanismo e conduta?",
    options: {
      A: "Hiperpara primário típico — só paratireoidectomia",
      B: "Produção extrarrenal de 1,25(OH)₂D por macrófagos: hidratação, corticoide (trata sarcoide e hiperCa), evitar sol/vit D excessiva",
      C: "Apenas bisfosfonato sem tratar sarcoide",
      D: "Restrição hídrica",
      E: "IECA como tratamento da hipercalcemia"
    },
    correct: "B",
    explanation: "Sarcoide: 1α-hidroxilação extrarrenal → hiperCa/hipercalciúria/NTI. Corticoide é chave. Pearl: PTH baixo + 1,25 alto + LRA = granuloma.",
    bibliography: "Sarcoidosis calcium disorders; UpToDate."
  },
  {
    id: "NA-X062",
    tema: "TINU",
    subtema: "Nefrite e uveíte",
    dificuldade: "intermediario",
    age: 28,
    vars: {
      cr: 2
    },
    statement: "{{sexWord}} de {{age}} com uveíte bilateral, creatinina {{cr}}, leucocitúria estéril e biópsia com NTI. Qual diagnóstico sindrômico e tratamento usual?",
    options: {
      A: "ITU bacteriana crônica apenas",
      B: "Síndrome TINU: corticoides sistêmicos (e oftalmológicos conforme olho), suporte renal e exclusão de fármacos/infecção",
      C: "Plasmaférese de rotina",
      D: "Eculizumab — hipótese inadequada para o quadro",
      E: "Nefrectomia — hipótese inadequada para o quadro"
    },
    correct: "B",
    explanation: "TINU: NTI + uveíte, frequentemente em jovens; corticoide. Pearl: olho vermelho + LRA + piúria estéril = TINU. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "TINU syndrome reviews; pediatric/adult nephrology texts."
  },
  {
    id: "NA-X063",
    tema: "Nefrotoxicidade",
    subtema: "Cisplatina",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      mg: 1.1,
      cr: 2.3
    },
    statement: "{{sexWord}} de {{age}} após cisplatina apresenta creatinina {{cr}}, Mg {{mg}} e perda urinária de sal/magnésio. Qual lesão é típica e como prevenir?",
    options: {
      A: "Apenas glomerulonefrite rapidamente progressiva",
      B: "NTA/toxicidade tubular por cisplatina (com hipomagnesemia): hidratação vigorosa peri-quimio, evitar dose empilhada/nefrotóxicos; repor Mg",
      C: "Obstrução por cálculo de cisplatina",
      D: "Hiperplasia adrenal",
      E: "SHU típica por diarreia"
    },
    correct: "B",
    explanation: "Cisplatina: NTA + wasting de Mg/Mg baixo crônico. Hidratação é prevenção clássica. Pearl: Mg baixo pós-cisplatina é assinatura.",
    bibliography: "Onconephrology cisplatin; ASCO supportive."
  },
  {
    id: "NA-X064",
    tema: "Nefrotoxicidade",
    subtema: "Metotrexato em alta dose",
    dificuldade: "avancado",
    age: 40,
    vars: {
      cr: 3.1
    },
    statement: "{{sexWord}} de {{age}} recebe metotrexato em alta dose; uricemia/cristalúria, oligúria e creatinina {{cr}}. Qual conduta específica além de suporte?",
    options: {
      A: "AINE para dor",
      B: "Alcalinização urinária + leucovorin; glucarpidase se níveis tóxicos com LRA; hidratação; evitar ácidos orgânicos que desloquem MTX",
      C: "Restrição hídrica",
      D: "Apenas bicarbonato sem resgate de folato",
      E: "Ciclofosfamida"
    },
    correct: "B",
    explanation: "MTX HD: precipitação/cristal + LRA — alcalinizar, leucovorin, glucarpidase se grave. Pearl: MTX alto + LRA = glucarpidase na lista.",
    bibliography: "HD-MTX toxicity guidelines; onconephrology."
  },
  {
    id: "NA-X065",
    tema: "Nefrotoxicidade",
    subtema: "Oxalato entérico",
    dificuldade: "avancado",
    age: 52,
    vars: {
      cr: 4
    },
    statement: "{{sexWord}} de {{age}} com bypass bariátrico antigo, esteatorreia, LRA (Cr {{cr}}) e biópsia com cristais de oxalato. Qual é a melhor estratégia?",
    options: {
      A: "Aumentar oxalato dietético",
      B: "Oxalúria entérica: hidratação, cálcio dietético nas refeições, reduzir gordura/oxalato, tratar esteatorreia; dialisar se necessário; evitar vitamina C megadose",
      C: "Apenas alopurinol",
      D: "Corticoides — hipótese inadequada para o quadro",
      E: "Litíase de cistina — tiopronina"
    },
    correct: "B",
    explanation: "Bypass/esteatorreia → oxalato livre absorvido → nefropatia oxálica. Pearl: bariátrica + LRA + cristais = oxalato entérico.",
    bibliography: "Enteric hyperoxaluria reviews; KDIGO stone notes."
  },
  {
    id: "NA-X066",
    tema: "Rabdomiólise",
    subtema: "IRA por mioglobina",
    dificuldade: "intermediario",
    age: 30,
    vars: {
      ck: 85000,
      cr: 2.8
    },
    statement: "{{sexWord}} de {{age}} após crush injury: CK {{ck}}, dipstick “sangue” positivo sem hemácias, creatinina {{cr}}. Qual conduta inicial prioritária?",
    options: {
      A: "Restrição hídrica",
      B: "Hidratação isotônica agressiva precoce, monitorar K/Ca/P, alcalinização controversa/selecionada; diálise se indicações clássicas",
      C: "AINE para dor muscular",
      D: "Transfusão de hemácias de rotina",
      E: "Eculizumab — hipótese inadequada para o quadro"
    },
    correct: "B",
    explanation: "Rabdomiólise: volume precoce previne/atenua IRA; cuidado com hiperK. Pearl: dipstick + / campo − = mioglobina/hemoglobina.",
    bibliography: "KDIGO AKI; crush syndrome protocols."
  },
  {
    id: "NA-X067",
    tema: "UTI",
    subtema: "Síndrome compartimental abdominal",
    dificuldade: "avancado",
    age: 58,
    vars: {
      piv: 28,
      cr: 2.9
    },
    statement: "{{sexWord}} de {{age}} em UTI pós-laparotomia, pressão intra-abdominal {{piv}} mmHg, oligúria e creatinina {{cr}} apesar de PAM adequada. Qual mecanismo e conduta?",
    options: {
      A: "Apenas NTA tóxica por antibiótico — ignorar PIA",
      B: "IRA por síndrome compartimental abdominal: otimizar volume/ventilação, descomprimir (clínicocirúrgico) quando indicado, evitar fluidos excessivos",
      C: "Furosemida isolada resolve compartimento",
      D: "IECA precoce",
      E: "Contraste para diagnosticar"
    },
    correct: "B",
    explanation: "PIA alta reduz perfusão renal; descompressão pode ser salvadora. Pearl: oligúria + abdome tenso = meça PIA. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "WSACS ACS guidelines; critical care nephrology."
  },
  {
    id: "NA-X068",
    tema: "Contraste",
    subtema: "Prevenção de IA-AKI",
    dificuldade: "intermediario",
    age: 70,
    vars: {
      tfg: 28
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}}, internado, necessita coronariografia. Qual medida tem melhor respaldo para reduzir risco de IRA por contraste?",
    options: {
      A: "N-acetilcisteína isolada como única medida comprovada",
      B: "Hidratação isotônica peri-procedimento, usar menor volume de contraste possível, suspender nefrotóxicos evitáveis; NAC sem benefício consistente",
      C: "Diurético forçado de rotina",
      D: "Metformina na manhã do exame sempre",
      E: "Hemodiálise profilática em todos com TFG <60"
    },
    correct: "B",
    explanation: "Prevenção de CI-AKI: volume + menos contraste; NAC/dialise profilática não são rotina. Pearl: hidratação > “milagres” farmacológicos.",
    bibliography: "KDIGO AKI; ACR/ESUR contrast."
  },
  {
    id: "NA-X069",
    tema: "Eletrólitos",
    subtema: "SIADH vs cerebral salt wasting",
    dificuldade: "avancado",
    age: 44,
    vars: {
      na: 122
    },
    statement: "{{sexWord}} de {{age}} pós-hemorragia subaracnóidea, Na {{na}}, urina concentrada. Como diferenciar SIADH de wasting cerebral e qual implicação?",
    options: {
      A: "São idênticos — sempre restringir água",
      B: "CSW: volume deplecionado (PVC baixa, hemoconcentração) → repor volume/Na; SIADH: euvolêmico → restrição hídrica ou vaptano/salina hipertônica conforme gravidade",
      C: "Sempre desmopressina em ambos",
      D: "Diuréticos tiazídicos em CSW",
      E: "Ignorar volemia"
    },
    correct: "B",
    explanation: "Pós-HSA: distinguir volemia — restrição no SIADH pode matar em CSW. Pearl: HSA + hipoNa = examine o volume antes de restringir.",
    bibliography: "Neurocritical care Na disorders; European hyponatremia."
  },
  {
    id: "NA-X070",
    tema: "Eletrólitos",
    subtema: "Correção de hiponatremia crônica",
    dificuldade: "intermediario",
    age: 68,
    vars: {
      na: 112
    },
    statement: "{{sexWord}} de {{age}} etilista, Na {{na}} assintomático relativo (confusão leve), hipoNa presumivelmente crônica. Qual limite de correção nas primeiras 24 h é mais seguro?",
    options: {
      A: "Corrigir 20–25 mEq/L nas primeiras 12 h",
      B: "Limitar correção tipicamente a ~8–10 mEq/L/24 h (menos se alto risco de ODS), com monitoramento seriado",
      C: "Meta de Na 145 em 6 h",
      D: "Apenas água livre livremente",
      E: "Bolus repetidos de 3% até Na 140 imediatamente"
    },
    correct: "B",
    explanation: "HipoNa crônica: correção lenta evita ODS; sintomas graves merecem bolus, depois freio. Pearl: crônico = devagar; agudo sintomático = bolus depois freia.",
    bibliography: "European and US hyponatremia guidelines."
  },
  {
    id: "NA-X071",
    tema: "Hipertensão",
    subtema: "Hiperaldosteronismo primário",
    dificuldade: "intermediario",
    age: 41,
    vars: {
      k: 3,
      pa: "170/100"
    },
    statement: "{{sexWord}} de {{age}} com PA {{pa}}, K {{k}}, aldosterona alta e atividade de renina plasmática suprimida. Qual próximo passo típico?",
    options: {
      A: "Apenas tiazídico sem investigação",
      B: "Confirmar hiperaldosteronismo (teste de confirmação se preciso), mapear (TC/cateterismo adrenal) e tratar com espironolactona/eplerenona ou adrenalectomia se adenoma unilateral",
      C: "Feocromocitoma sem dosagens",
      D: "IECA contraindicado para sempre",
      E: "Dieta rica em sódio para “testar”"
    },
    correct: "B",
    explanation: "Primary aldo: ARR → confirmação → imagem/AVS → cirurgia ou MRA. Pearl: HAS + hipoK espontânea = pense hiperaldo.",
    bibliography: "Endocrine Society PA guideline."
  },
  {
    id: "NA-X072",
    tema: "Hipertensão",
    subtema: "Estenose de artéria renal aterosclerótica",
    dificuldade: "intermediario",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS resistente, DRC, sopro abdominal e assimetria renal. Angio: estenose aterosclerótica bilateral. Qual evidência guia revascularização?",
    options: {
      A: "Angioplastia em todos melhora mortalidade (ASTRAL/CORAL)",
      B: "Tratamento clínico otimizado é padrão na maioria; revascularizar em cenários selecionados (edema flash, IRA com IECA em estenose bilateral, HAS refratária verdadeira)",
      C: "Nefrectomia bilateral imediata",
      D: "Suspender todos anti-hipertensivos",
      E: "Apenas aspirina sem controle pressórico"
    },
    correct: "B",
    explanation: "ASTRAL/CORAL: angio rotina não supera clínico; selecione indicações clássicas. Pearl: nem toda estenose vai para stent.",
    bibliography: "ASTRAL; CORAL; AHA RAS."
  },
  {
    id: "NA-X073",
    tema: "Doenças císticas",
    subtema: "ADTKD",
    dificuldade: "avancado",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC insidiosa, história familiar autossômica dominante, hiperuricemia precoce/gota e rins sem grandes cistos. Qual entidade e gene típicos?",
    options: {
      A: "ADPKD por PKD1 obrigatoriamente",
      B: "ADTKD (ex. UMOD/MUC1/REN): aconselhamento genético, controle de PA/ácido úrico, evitar biópsias inúteis repetidas",
      C: "ARPKD do adulto",
      D: "Nefropatia por IgA familiar clássica",
      E: "Amiloide familiar ATTR renal pura"
    },
    correct: "B",
    explanation: "ADTKD-UMOD: gota jovem + DRC familiar sem rins policísticos enormes. Pearl: gota aos 20–30 + DRC familiar = UMOD.",
    bibliography: "KDIGO ADTKD consensus; Devuyst/Hart."
  },
  {
    id: "NA-X074",
    tema: "Doenças císticas",
    subtema: "Rim medular em esponja",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hematúria recorrente, ITU e nefrocalcinose/cálculos; uro-TC com ectasia de túbulos coletores (“paintbrush”). Qual diagnóstico e conduta?",
    options: {
      A: "ADPKD — tolvaptan imediato",
      B: "Rim medular em esponja: hidratação, tratar hipercalciúria/ITU, seguimento; geralmente TFG preservada",
      C: "Nefronoptise infantil típica",
      D: "Necrose papilar só por diabetes",
      E: "Obstrução crônica sem imagem"
    },
    correct: "B",
    explanation: "Medullary sponge kidney: ectasia pré-calicinal, litíase/ITU; suporte metabólico. Pearl: “paintbrush” na imagem = esponja.",
    bibliography: "MSK reviews; stone disease texts."
  },
  {
    id: "NA-X075",
    tema: "Litíase",
    subtema: "Cálculo de ácido úrico",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      ph: 5.2
    },
    statement: "{{sexWord}} de {{age}} com cálculos radiotransparentes, urina pH {{ph}}, gota e obesidade. Qual pedra angular do tratamento metafiilático?",
    options: {
      A: "Acidificar a urina",
      B: "Alcalinização urinária (citrato/bicarbonato) + hidratação + alopurinol se hiperuricosúria/gota; perda de peso",
      C: "Apenas tiazídico",
      D: "Tiopronina — hipótese inadequada para o quadro",
      E: "Restrição hídrica"
    },
    correct: "B",
    explanation: "Cálculo úrico: pH baixo é chave — alcalinizar dissolve/previne. Pearl: raio-X negativo + pH ácido = úrico. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EAU urolithiasis; AUA stone."
  },
  {
    id: "NA-X076",
    tema: "CKD-MBD",
    subtema: "Hungry bone pós-paratireoidectomia",
    dificuldade: "avancado",
    age: 48,
    vars: {
      ca: 6.8,
      pth: 1200
    },
    statement: "{{sexWord}} de {{age}} dialítico com PTH {{pth}} sofre paratireoidectomia e no pós-op Ca cai a {{ca}} com hipofosfatemia. Qual síndrome e conduta?",
    options: {
      A: "Hiperpara terciário não tratado",
      B: "Hungry bone: repor cálcio (IV se sintomático) + calcitriol/análogos e fósforo conforme labs; monitorização intensiva",
      C: "Apenas restrição de cálcio",
      D: "Cinacalcete imediato em hipocalcemia grave",
      E: "Ignorar tela iônica"
    },
    correct: "B",
    explanation: "Hungry bone: captação óssea intensa de Ca/P/Mg após PTX. Pearl: PTX + Ca despenca = repor agressivo. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDIGO CKD-MBD; hungry bone reviews."
  },
  {
    id: "NA-X077",
    tema: "Anemia",
    subtema: "HIF-PHI",
    dificuldade: "intermediario",
    age: 64,
    vars: {
      hb: 9
    },
    statement: "{{sexWord}} de {{age}} com DRC ND, Hb {{hb}}, ferro repleto, intolerância ou logística difícil para AEE injetável. Sobre inibidores de HIF-PH, qual afirmação é mais correta?",
    options: {
      A: "São ferro orais sem efeito na eritropoiese",
      B: "Podem elevar Hb via estabilização de HIF; uso conforme aprovação local, com vigilância de risco CV/trombose e ferro",
      C: "Substituem diálise",
      D: "Contraindicados em toda DRC",
      E: "Causam sempre hipocalemia grave"
    },
    correct: "B",
    explanation: "HIF-PHI (ex. roxadustat/daprodustat) são opção oral em alguns contextos regulatórios; risco CV exige seleção. Pearl: oral ≠ isento de risco.",
    bibliography: "KDIGO anemia updates; HIF-PHI trials."
  },
  {
    id: "NA-X078",
    tema: "Anemia",
    subtema: "Hipofosfatemia por ferro IV",
    dificuldade: "intermediario",
    age: 36,
    vars: {
      p: 1.4
    },
    statement: "Mulher de {{age}} recebe carboximaltose férrica e semanas depois apresenta P {{p}}, fraqueza e osteomalácia laboratorial. Qual mecanismo?",
    options: {
      A: "Hiperpara primário induzido por ferro",
      B: "Aumento de FGF23 → fosfatúria e queda de 1,25(OH)₂D com certos ferros IV (mais com FCM)",
      C: "Deficiência de potássio apenas",
      D: "Síndrome de lise",
      E: "Intoxicação por alumínio"
    },
    correct: "B",
    explanation: "FCM associa-se a hipofosfatemia mediada por FGF23. Pearl: ferro IV + P baixo = revise qual ferro usou. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "FCM hypophosphatemia literature; EMA warnings."
  },
  {
    id: "NA-X079",
    tema: "Diálise peritoneal",
    subtema: "EPS",
    dificuldade: "avancado",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP há 9 anos com suboclusão intestinal, caquexia e espessamento peritoneal na TC. Qual complicação e conduta geral?",
    options: {
      A: "Peritonite bacteriana simples — só ATB oral",
      B: "Esclerose peritoneal encapsulante: suspender DP frequentemente, nutrição, tamoxifeno/cirurgia em centros experientes conforme gravidade",
      C: "Aumentar glicose do dialisato indefinidamente",
      D: "Ignorar sintomas GI",
      E: "Transplante contraindicado para sempre"
    },
    correct: "B",
    explanation: "EPS é complicação rara/grave de DP prolongada. Pearl: DP longa + obstrução = pense EPS. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "ISPD EPS; Kawanishi."
  },
  {
    id: "NA-X080",
    tema: "Hemodiálise",
    subtema: "Síndrome do desequilíbrio",
    dificuldade: "intermediario",
    age: 45,
    vars: {
      ureia: 280
    },
    statement: "{{sexWord}} de {{age}} uremia grave (ureia {{ureia}}) na primeira HD apresenta cefaleia, confusão e convulsão perto do fim da sessão. Qual hipótese e prevenção?",
    options: {
      A: "Hipernatremia isolada",
      B: "Síndrome do desequilíbrio: reduzir eficiência/tempo da primeira sessão, dialisato adequado, considerar manitol em alto risco",
      C: "Aumentar ultrafiltração ao máximo",
      D: "Contraste iodado na sessão",
      E: "Suspender diálise definitivamente"
    },
    correct: "B",
    explanation: "Disequilibrium: queda rápida de osmoles → edema cerebral. Primeiras sessões devem ser “gentis”. Pearl: primeira HD = não zere a ureia.",
    bibliography: "Dialysis disequilibrium reviews; KDOQI."
  },
  {
    id: "NA-X081",
    tema: "Acesso vascular",
    subtema: "Roubo de fístula",
    dificuldade: "intermediario",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FAV braquiocefálica apresenta dor e palidez de mão durante HD, aliviada por compressão da FAV. Qual diagnóstico e conduta?",
    options: {
      A: "ITU da mão — só antibiótico",
      B: "Síndrome de roubo (steal): avaliação vascular; revisão cirúrgica/ banding/DRIL conforme gravidade; não ignorar risco de isquemia",
      C: "Aumentar fluxo da bomba sempre",
      D: "Anticoagulação isolada resolve",
      E: "Observação se houver necrose digital"
    },
    correct: "B",
    explanation: "Steal: fluxo da FAV “rouba” a mão. Pearl: dor isquêmica na mão + FAV = avaliação cirúrgica. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDOQI vascular access; steal syndrome."
  },
  {
    id: "NA-X082",
    tema: "Acesso vascular",
    subtema: "Bacteremia de cateter",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD por cateter tunelizado com febre no início da sessão, hemoculturas positivas para S. aureus. Qual conduta é mais adequada?",
    options: {
      A: "Só antitérmico e manter cateter sempre",
      B: "Antibiótico IV adequado + remoção do cateter na maioria das bacteremias por S. aureus; avaliar endocardite/metástases sépticas",
      C: "Antibiótico oral de 3 dias sem culturas",
      D: "Instilação de álcool no lumen como monoterapia",
      E: "Trocar para DP no mesmo dia sem ATB"
    },
    correct: "B",
    explanation: "CRBSI por S. aureus: ATB + remover cateter na maioria; vascula endocardite. Pearl: S. aureus no cateter = tire o cateter.",
    bibliography: "IDSA catheter infections; KDOQI."
  },
  {
    id: "NA-X083",
    tema: "Transplante renal",
    subtema: "FSGS recorrente",
    dificuldade: "avancado",
    age: 29,
    vars: {
      prot: 8
    },
    statement: "{{sexWord}} de {{age}} com FSGS primária recebe Tx e no dia 3 surge proteinúria {{prot}} g com albumina em queda. Qual hipótese e abordagem?",
    options: {
      A: "Rejeição celular tardia exclusiva",
      B: "Recorrência de FSGS: plasmaférese precoce ± rituximabe/outros em centros experientes; biópsia para excluir outros",
      C: "Apenas IECA sem aférese em nefrótica explosiva pós-Tx",
      D: "Nefrectomia do enxerto imediata sempre",
      E: "Infecção por BK como causa típica no dia 3"
    },
    correct: "B",
    explanation: "FSGS pode recidivar em horas/dias; PLEX precoce é prática comum. Pearl: nefrótica dia 2 pós-Tx = FSGS até prova em contrário.",
    bibliography: "Recurrent FSGS reviews; KDIGO transplant."
  },
  {
    id: "NA-X084",
    tema: "Transplante renal",
    subtema: "Belatacept",
    dificuldade: "avancado",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} transplantado com toxicidade por CNI e fibrose intersticial; EBV sorologia positiva. Sobre belatacept, qual ponto é crítico?",
    options: {
      A: "Pode ser usado livremente em EBV-seronegativos",
      B: "Bloqueio de coestimulação (CTLA4-Ig): evita CNI, mas contraindicado em EBV-seronegativos pelo risco de PTLD; vigilância de rejeição",
      C: "Não exige profilaxia/vigilância alguma",
      D: "É antibiótico antiviral",
      E: "Substitui biópsia em disfunção"
    },
    correct: "B",
    explanation: "Belatacept: benefício renal sem CNI; PTLD em EBV−. Pearl: EBV negativo = sem belatacept. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "BENEFIT trials; FDA belatacept label."
  },
  {
    id: "NA-X085",
    tema: "Transplante renal",
    subtema: "Doador vivo APOL1",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "Candidato a doador vivo afrodescendente, TFG normal, sem proteinúria. Sobre APOL1 no aconselhamento de doação, qual é a postura mais alinhada à evidência atual?",
    options: {
      A: "APOL1 irrelevante para doadores",
      B: "Discutir testagem APOL1 em populações de risco: alto risco genético pode aumentar chance futura de DRC no doador — decisão compartilhada",
      C: "Proibir toda doação de afrodescendentes",
      D: "APOL1 positivo no doador exige eculizumab no receptor",
      E: "Só importa HLA, nunca genética de risco"
    },
    correct: "B",
    explanation: "APOL1 high-risk no doador é fator de risco discutido na avaliação ética/clínica. Pearl: aconselhe, não ignore nem estigmatize.",
    bibliography: "Living donor guidelines; APOL1 donor literature; APOLLO."
  },
  {
    id: "NA-X086",
    tema: "Gravidez",
    subtema: "HELLP vs TMA",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "Gestante de {{age}} anos, 34 semanas, com HAS, hemólise, plaquetopenia e LRA. Como distinguir HELLP/pré-eclâmpsia de PTT/aHUS e qual prioridade?",
    options: {
      A: "Sempre eculizumab antes do parto",
      B: "Parto é terapia da pré-eclâmpsia/HELLP; se TMA persiste após parto ou ADAMTS13 <10%, tratar como PTT/aHUS (PLEX/C5i)",
      C: "Nunca indicar parto",
      D: "Apenas aspirina resolve HELLP estabelecido",
      E: "Diálise contraindicada na gestação sempre"
    },
    correct: "B",
    explanation: "HELLP melhora com parto; TMA que persiste exige algoritmo PTT/aHUS. Pearl: pós-parto TMA que não cede ≠ só HELLP.",
    bibliography: "Obstetric nephrology; ISTH TTP; aHUS pregnancy."
  },
  {
    id: "NA-X087",
    tema: "Gravidez",
    subtema: "DRC e aconselhamento",
    dificuldade: "intermediario",
    age: 30,
    vars: {
      tfg: 35,
      prot: 1.5
    },
    statement: "Mulher de {{age}} com DRC TFG {{tfg}} e proteinúria {{prot}} g deseja gestar. Qual aconselhamento é mais correto?",
    options: {
      A: "Risco nulo de progressão",
      B: "Risco aumentado de progressão da DRC, pré-eclâmpsia e prematuridade; otimizar PA/proteinúria, suspender teratogênicos (IECA/MRA/SGLT2), seguimento alto risco",
      C: "Manter IECA até o parto",
      D: "Contrajar diálise preemptiva em toda TFG <45",
      E: "Proibir gestação em qualquer DRC"
    },
    correct: "B",
    explanation: "DRC + gestação: risco materno-fetal proporcional à TFG/proteinúria; planejamento é essencial. Pearl: pare IECA antes de engravidar.",
    bibliography: "KDIGO CKD; obstetric nephrology guidelines."
  },
  {
    id: "NA-X088",
    tema: "Vasculite ANCA",
    subtema: "Duplo positivo ANCA + anti-MBG",
    dificuldade: "avancado",
    age: 57,
    vars: {
      cr: 6.5
    },
    statement: "{{sexWord}} de {{age}} com RPGN, Cr {{cr}}, MPO-ANCA e anti-MBG positivos. Qual tratamento combina estratégias?",
    options: {
      A: "Apenas corticoide oral",
      B: "Tratar como anti-MBG grave: plasmaférese + imunossupressão (CYC/RTX) + corticoide; ANCA influencia risco de recidiva a longo prazo",
      C: "Só antibiótico",
      D: "Observação — hipótese inadequada para o quadro",
      E: "Eculizumab isolado"
    },
    correct: "B",
    explanation: "Duplo positivo: maneja como anti-MBG na fase aguda (PLEX+IS); ANCA marca recidiva. Pearl: anti-MBG manda na emergência.",
    bibliography: "KDIGO vasculitis; McAdoo double-positive."
  },
  {
    id: "NA-X089",
    tema: "Pulmão-rim",
    subtema: "DAH em vasculite",
    dificuldade: "avancado",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ANCA, queda de Hb, infiltrados alveolares e LRA. Qual prioridade terapêutica?",
    options: {
      A: "Apenas oxigênio sem imunossupressão",
      B: "Indução agressiva (metilprednisolona + RTX/CYC) e considerar plasmaférese em hemorragia alveolar grave conforme protocolos locais/ensaios",
      C: "Anticoagulação plena empírica",
      D: "N-acetilcisteína como monoterapia",
      E: "Cirurgia de ressecção pulmonar imediata"
    },
    correct: "B",
    explanation: "DAH + ANCA é emergência: GC + RTX/CYC; PLEX em selecionados. Pearl: hemoptise + creatinina = trate como vasculite hoje.",
    bibliography: "KDIGO; PEXIVAS nuances on PLEX."
  },
  {
    id: "NA-X090",
    tema: "Nefropatia diabética",
    subtema: "Hipercalemia com MRA",
    dificuldade: "intermediario",
    age: 66,
    vars: {
      k: 5.6,
      tfg: 42
    },
    statement: "{{sexWord}} de {{age}} com DRC diabética em IECA + finerenona, K {{k}}. Qual estratégia moderna para manter nefroproteção?",
    options: {
      A: "Suspender definitivamente todo RASSi/MRA para sempre",
      B: "Medidas para K (dieta, diurético, resinas/patiromer/SZC se preciso), ajustar doses e tentar manter terapia antiproteinúrica",
      C: "Soro fisiológico hipertônico de rotina ambulatorial",
      D: "Antibiótico — hipótese inadequada para o quadro",
      E: "Biópsia imediata obrigatória"
    },
    correct: "B",
    explanation: "HiperK por MRA/IECA: manejar K para não abandonar nefroproteção. Pearl: trate o potássio, não desista do rim. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "FIDELIO/FIGARO; KDIGO diabetes; potassium binders."
  },
  {
    id: "NA-X091",
    tema: "DRC",
    subtema: "Gadolínio e NSF",
    dificuldade: "intermediario",
    age: 58,
    vars: {
      tfg: 12
    },
    statement: "{{sexWord}} de {{age}} em DRC avançada (TFG {{tfg}}) precisa de RM. Qual risco clássico de certos contrastes de gadolínio?",
    options: {
      A: "Apenas hipotireoidismo transitório",
      B: "Fibrose nefrogênica sistêmica com agentes grupo I; preferir agentes de baixo risco, dose mínima ou alternativas de imagem",
      C: "Amiloide AL induzida",
      D: "Diabetes insípido nefrogênico sempre",
      E: "Risco nulo em qualquer TFG"
    },
    correct: "B",
    explanation: "NSF: ligada a Gd lineares de alto risco em TFG muito baixa. Pearl: DRC 5 + Gd grupo I = evite. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "ACR manual on contrast; NSF literature."
  },
  {
    id: "NA-X092",
    tema: "DRC",
    subtema: "Doença renal cística adquirida",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD há 8 anos, hematúria e massa renal em rim nativo cístico. Qual associação é importante?",
    options: {
      A: "Risco reduzido de carcinoma renal",
      B: "Doença renal cística adquirida eleva risco de carcinoma de células renais — investigar hematúria/massa com imagem e urologia",
      C: "Sempre cistos benignos sem seguimento",
      D: "Indicação de tolvaptan",
      E: "Diagnóstico de ADPKD novo obrigatório"
    },
    correct: "B",
    explanation: "ACKD em dialíticos longos associa-se a RCC. Pearl: HD longa + hematúria = imagem dos nativos. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "ACKD/RCC reviews; KDOQI."
  },
  {
    id: "NA-X093",
    tema: "Genética",
    subtema: "Esclerose tuberosa — AML",
    dificuldade: "intermediario",
    age: 27,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TSC, angiomiolipomas renais bilaterais e crescimento de lesão >4 cm com risco de sangramento. Qual terapia alvo pode reduzir volume?",
    options: {
      A: "Apenas antibiótico",
      B: "Inibidor mTOR (everolimus) conforme critérios; embolização/cirurgia se sangramento",
      C: "Tolvaptan — hipótese inadequada para o quadro",
      D: "Eculizumab — hipótese inadequada para o quadro",
      E: "SGLT2 como redução de AML"
    },
    correct: "B",
    explanation: "AML em TSC responde a mTOR inhibitors. Pearl: TSC + AML crescendo = everolimus na conversa. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EXIST-2; TSC consensus."
  },
  {
    id: "NA-X094",
    tema: "Infecção e rim",
    subtema: "Leptospirose",
    dificuldade: "intermediario",
    age: 33,
    vars: {
      cr: 4.2,
      k: 2.8
    },
    statement: "{{sexWord}} de {{age}} após enchente: febre, icterícia, LRA (Cr {{cr}}), hipocalemia {{k}} e trombocitopenia. Qual infecção e peculiaridade eletrolítica?",
    options: {
      A: "PSGN clássica com hipoK típica",
      B: "Leptospirose: IRA + perda urinária de K/Mg frequente; antibiótico + suporte/diálise se preciso",
      C: "Apenas influenza",
      D: "Hiperplasia adrenal congênita",
      E: "Amiloide AA aguda"
    },
    correct: "B",
    explanation: "Lepto: IRA hipocalêmica é clássica (wasting tubular). Pearl: enchente + icterícia + LRA + K baixo = leptospira.",
    bibliography: "WHO leptospirosis; tropical nephrology."
  },
  {
    id: "NA-X095",
    tema: "Infecção e rim",
    subtema: "Malária / blackwater",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} retorna de área endêmica com P. falciparum, hemoglobinúria maciça e IRA. Qual mecanismo e conduta?",
    options: {
      A: "Obstrução ureteral por cálculo de hemácia",
      B: "Hemólise intravascular grave (blackwater fever/malária grave): antimalárico urgente + suporte de IRA/diálise; hidratação criteriosa",
      C: "Apenas IECA — hipótese inadequada para o quadro",
      D: "Corticoide como antimalárico",
      E: "Negar diálise por hemólise"
    },
    correct: "B",
    explanation: "Malária grave pode causar IRA hemolítica; tratar parasita + suporte. Pearl: viagem + febre + hemoglobinúria = falciparum até prova em contrário.",
    bibliography: "WHO severe malaria; tropical AKI."
  },
  {
    id: "NA-X096",
    tema: "Intoxicações",
    subtema: "Salicilato — HD",
    dificuldade: "avancado",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com intoxicação por salicilato, acidose, status mental alterado e níveis elevados. Qual papel da hemodiálise?",
    options: {
      A: "Nunca indicada",
      B: "HD está indicada em intoxicação grave (alteração neurológica, falência renal, níveis muito altos, falha de alcalinização) — remove salicilato e corrige acidose",
      C: "Apenas carvão após 24 h resolve sempre",
      D: "Diurético de alça é antídoto específico",
      E: "Plasmaférese superior à HD sempre"
    },
    correct: "B",
    explanation: "EXTRIP: HD no salicilato grave. Pearl: salicilato + neuro + acidose = dialise. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EXTRIP salicylate; toxicology."
  },
  {
    id: "NA-X097",
    tema: "Intoxicações",
    subtema: "Metanol",
    dificuldade: "avancado",
    age: 39,
    vars: {
      gap: 32
    },
    statement: "{{sexWord}} de {{age}} com gap aniônico {{gap}}, gap osmolar alto, borrachas visuais e suspeita de metanol. Qual tratamento específico?",
    options: {
      A: "Apenas soro glicosado",
      B: "Fomepizol (ou etanol) + folínico/folato + hemodiálise em casos graves/ácidos/visuais",
      C: "Naloxona — hipótese inadequada para o quadro",
      D: "N-acetilcisteína como antídoto único",
      E: "Bicarbonato isolado sem bloqueio da ADH"
    },
    correct: "B",
    explanation: "Metanol: bloquear ADH com fomepizol + dialisar ácido fórmico/álcool. Pearl: gap osmolar + visual = metanol. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EXTRIP methanol; AACT."
  },
  {
    id: "NA-X098",
    tema: "Biópsia renal",
    subtema: "Contraindicações relativas",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com rim único funcionante, HAS descontrolada e plaquetas 40 mil. Solicita-se biópsia percutânea eletiva. Qual postura?",
    options: {
      A: "Biópsia imediata sem otimizar",
      B: "Corrigir riscos modificáveis (PA, coagulopatia/plaquetas) e pesar rim único — considerar alternativas/centro experiente; biópsia não é “sempre já”",
      C: "Biópsia é risco zero",
      D: "Nefrectomia para diagnóstico",
      E: "Anticoagular antes da punção"
    },
    correct: "B",
    explanation: "Biópsia tem contraindicações relativas: otimize PA/coagulação; rim único exige cautela. Pearl: biópsia é procedimento — prepare o paciente.",
    bibliography: "KDIGO biopsy practice; ASN biopsy safety."
  },
  {
    id: "NA-X099",
    tema: "Uremia",
    subtema: "Pericardite urêmica",
    dificuldade: "intermediario",
    age: 51,
    vars: {
      ureia: 220
    },
    statement: "{{sexWord}} de {{age}} com DRC 5 não dialítico, dor precordial que melhora sentado, atrito e ureia {{ureia}}. Qual conduta?",
    options: {
      A: "Apenas AINE prolongado sem diálise",
      B: "Iniciar diálise intensificada (pericardite urêmica é indicação); evitar anticoagulação agressiva se derrame",
      C: "Colchicina como única terapia definitiva",
      D: "Observação ambulatorial",
      E: "Antibiótico empírico isolado"
    },
    correct: "B",
    explanation: "Pericardite urêmica → diálise. Pearl: atrito + uremia = dialise, não só AINE. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDOQI; dialysis indications AEIOU."
  },
  {
    id: "NA-X100",
    tema: "Nefropatia por IgA",
    subtema: "Corticoides e risco",
    dificuldade: "avancado",
    age: 34,
    vars: {
      tfg: 48,
      upcr: 1.4
    },
    statement: "{{sexWord}} de {{age}} com IgAN, TFG {{tfg}}, proteinúria {{upcr}} g/g apesar de IECA otimizado 90 dias. Sobre corticoide (TESTING), qual lição prática?",
    options: {
      A: "Corticoide em megadose sem profilaxia é sempre seguro",
      B: "Pode reduzir eventos renais, mas aumenta infecções graves — usar esquemas cuidadosos, profilaxia infecciosa e seleção de pacientes",
      C: "Corticoide é inútil em qualquer IgAN",
      D: "Substituir IECA por corticoide",
      E: "Indicar eculizumab de rotina"
    },
    correct: "B",
    explanation: "TESTING: benefício renal vs infecção — dose/profilaxia importam. Pearl: IgAN + corticoide = profilaxia e seleção.",
    bibliography: "TESTING trial; KDIGO IgAN 2025 updates / sparsentan era."
  }
];

module.exports = { ADV_MASTERS_EXTRA2 };
