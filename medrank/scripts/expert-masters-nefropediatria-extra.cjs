/**
 * Expansão expert — Nefrologia Pediátrica (SBNPed / IPNA / residência).
 * Complementa expert-masters-nefropediatria.cjs. Mesmo schema do builder.
 */
const PED_MASTERS_EXTRA = [
  {
    id: "NP-X001",
    tema: "Síndrome nefrótica",
    subtema: "Corticoresistente genética NPHS2",
    dificuldade: "avancado",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} ({{weight}} kg) com síndrome nefrótica corticoresistente. Biópsia: LESFS. Painel genético: variante patogênica em NPHS2 (podocina). Qual é a conduta terapêutica mais adequada?",
    options: {
      A: "Ciclofosfamida + metilprednisolona pulsada por 6 meses independentemente do genótipo",
      B: "Evitar imunossupressão intensiva inútil; aconselhar genética familiar, suporte + IECA/BRA e considerar ensaios/terapia alvo conforme a variante; discutir prognóstico com a família",
      C: "Rituximabe de rotina como primeira linha em toda mutação NPHS2",
      D: "Nefrectomia bilateral imediata sem tentativa de nefroproteção"
    },
    correct: "B",
    explanation: "Formas monogênicas (NPHS1/NPHS2/WT1) respondem mal à imunossupressão clássica. Priorizar genética, nefroproteção e evitar toxicidade. A e C pressupõem resposta imune-mediada. D é extremo sem indicação. Pearl: corticoresistência + genética positiva muda o algoritmo.",
    bibliography: "IPNA SSNS/SRNS; Trautmann et al. Pediatr Nephrol."
  },
  {
    id: "NP-X002",
    tema: "Síndrome nefrótica",
    subtema: "Corticodependente — rituximabe",
    dificuldade: "intermediario",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN corticodependente frequente, já falhou ciclofosfamida e MMF. Remissão com prednisona, mas recai ao reduzir. Qual é o próximo passo com melhor evidência para poupar esteroide?",
    options: {
      A: "Manter prednisona em dose plena contínua por 2 anos",
      B: "Rituximabe (anti-CD20) em centro experiente, com monitoramento de linfócitos B e risco infeccioso",
      C: "Diálise preventiva apesar de TFG preservada",
      D: "Apenas espironolactona sem nova imunossupressão"
    },
    correct: "B",
    explanation: "Rituximabe é opção em corticodependência/frequente-relapse refratária a antimetabólitos/alquilantes. A aumenta toxicidade esteroide. C/D não tratam a doença de base. Pearl: RTX poupa corticoide em FR/SDNS selecionados.",
    bibliography: "IPNA; Iijima K. rituximab FRNS trials."
  },
  {
    id: "NP-X003",
    tema: "Síndrome nefrótica",
    subtema: "Vacinação sob imunossupressão",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN em remissão sob prednisona baixa + MMF. Os pais perguntam sobre vacina de varicela viva. Qual é a conduta correta?",
    options: {
      A: "Aplicar varicela viva imediatamente sob MMF",
      B: "Vacinas vivas contraindicadas sob imunossupressão significativa; priorizar inativadas (influenza, pneumococo) e imunizar conviventes",
      C: "Nunca vacinar contra influenza neste paciente",
      D: "Suspender todo tratamento por 1 dia e aplicar BCG"
    },
    correct: "B",
    explanation: "Vacinas vivas evitadas em imunossuprimidos; calendário adaptado e cocooning familiar. Influenza inativada é recomendada. Pearl: vacinar a casa protege a criança.",
    bibliography: "SBP/IPNA immunization in NS; CDC immunocompromised."
  },
  {
    id: "NP-X004",
    tema: "Glomerulonefrite aguda",
    subtema: "PSGN típica — suporte",
    dificuldade: "basico",
    age: 7,
    vars: {
      pa: "140/95",
      cr: 0.9
    },
    statement: "{{sexWord}} de {{age}}, 2 semanas após faringite, edema, hematúria cor de cola, PA {{pa}}, C3 baixo, ASO elevado, creatinina {{cr}} mg/dL. Qual é a conduta inicial prioritária?",
    options: {
      A: "Metilprednisolona pulsada imediata sem suporte volêmico/pressórico",
      B: "Suporte: restrição de sal/água, diurético, anti-hipertensivo; antibiótico se foco ativo; dialisar se indicação clássica",
      C: "Biópsia obrigatória em todos os casos típicos antes de qualquer medida",
      D: "Plasmaférese de rotina na primeira consulta"
    },
    correct: "B",
    explanation: "PSGN típica: suporte + controle pressórico/volume; biópsia se atípico ou não resolução. A não é primeira linha. C/D são excessivos no quadro clássico. Pearl: a maioria resolve com suporte.",
    bibliography: "KDIGO GN; Nelson/SBP nefrite aguda."
  },
  {
    id: "NP-X005",
    tema: "Glomerulonefrite aguda",
    subtema: "C3 persistente — biópsia",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com quadro inicial compatível com PSGN, porém C3 permanece baixo após 12 semanas e há proteinúria nefrótica persistente. Qual é o próximo passo?",
    options: {
      A: "Apenas observar mais 1 ano sem investigação",
      B: "Biópsia renal e investigação de glomerulopatias C3-persistentes / outras GN",
      C: "Antibiótico por 6 meses empiricamente",
      D: "Nefrectomia unilateral diagnóstica"
    },
    correct: "B",
    explanation: "Hipocomplementemia persistente >8–12 semanas é atípica para PSGN clássica e exige biópsia (C3G, LES, etc.). Pearl: C3 que não sobe = não feche como PSGN.",
    bibliography: "KDIGO C3G; pediatric GN reviews."
  },
  {
    id: "NP-X006",
    tema: "SHU / MAT",
    subtema: "SHU típica STEC",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com diarreia sanguinolenta, depois palidez, oligúria, plaquetopenia e esquizócitos. Suspeita SHU típica (STEC). Qual é a conduta inicial correta?",
    options: {
      A: "Eculizumab imediato em todo caso diarreico sem tipagem",
      B: "Suporte intensivo (volume/eletrólitos/diálise se preciso); evitar antibiótico/antimotilidade de rotina na fase diarreica STEC",
      C: "Transfusão plaquetária profilática agressiva sempre",
      D: "Corticoides em alta dose como primeira linha"
    },
    correct: "B",
    explanation: "SHU-STEC: suporte; eculizumab reservado a atípicas/selecionados; antibiótico pode piorar liberação de toxina em alguns contextos. Pearl: diarreia + MAT = suporte primeiro.",
    bibliography: "IPNA HUS; ESPGHAN STEC."
  },
  {
    id: "NP-X007",
    tema: "SHU / MAT",
    subtema: "SHUa — CFH / eculizumab",
    dificuldade: "avancado",
    age: 1,
    vars: {

    },
    statement: "Lactente de {{age}} ano(s) sem diarreia, MAT recorrente, C3 baixo, história familiar. Painel: variante em CFH. Qual é o tratamento de escolha para prevenir recorrência?",
    options: {
      A: "Apenas plasmaférese sem considerar inibidor de complemento",
      B: "Inibidor terminal do complemento (eculizumab/ravulizumab) + suporte, com vacinação meningocócica",
      C: "Ciclofosfamida como primeira linha",
      D: "Observação sem terapia específica após a primeira crise"
    },
    correct: "B",
    explanation: "SHUa por defeito de complemento: bloqueio C5 é padrão em muitos centros; vacinar contra meningococo. Pearl: HUS sem diarreia + CFH = pense C5i.",
    bibliography: "KDIGO aHUS; Fakhouri/Loirat."
  },
  {
    id: "NP-X008",
    tema: "SHU / MAT",
    subtema: "PNH como diferencial",
    dificuldade: "avancado",
    age: 15,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAT, citopenias e hemoglobinúria noturna. Citometria de fluxo: clone PNH. Qual é a implicação renal/terapêutica?",
    options: {
      A: "PNH nunca envolve o rim",
      B: "PNH pode causar MAT/IRA; eculizumab/ravulizumab trata hemólise e protege rim; anticoagular conforme risco trombótico",
      C: "Apenas transfusão sem inibidor de complemento",
      D: "Esplenectomia cura a MAT definitivamente"
    },
    correct: "B",
    explanation: "PNH é diferencial raro de MAT; bloqueio C5 é terapia chave e reduz trombose. Pearl: hemoglobinúria + MAT = pedir clone PNH.",
    bibliography: "ISTH/PNH guidelines; renal PNH reviews."
  },
  {
    id: "NP-X009",
    tema: "IRA pediátrica",
    subtema: "Pré-renal por desidratação",
    dificuldade: "basico",
    age: 0.8,
    vars: {

    },
    statement: "Lactente de {{age}} com GECA, taquicardia, enchimento capilar lento, creatinina elevada, ureia/creatinina alta, FENa baixa. Qual é a melhor conduta inicial?",
    options: {
      A: "Furosemida imediata em hipovolemia clara",
      B: "Reposição volêmica isotônica criteriosa e reavaliação; evitar diurético de alça antes de restaurar volume",
      C: "Diálise sem tentativa de reposição",
      D: "Dopamina “renal” de rotina"
    },
    correct: "B",
    explanation: "IRA pré-renal: volume primeiro; diurético só se congestão. Dopamina renal não tem papel. Pearl: FENa baixa + hipovolemia = reidratar.",
    bibliography: "KDIGO AKI; SBP desidratação."
  },
  {
    id: "NP-X010",
    tema: "IRA pediátrica",
    subtema: "Profilaxia de TLS",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com LLA de alta carga iniciando quimioterapia. Qual profilaxia de síndrome de lise tumoral é mais adequada em alto risco?",
    options: {
      A: "Restrição hídrica para evitar “sobrecarga”",
      B: "Hidratação vigorosa + hipouricêmico (alopurinol ou rasburicase conforme risco) e monitorização laboratorial seriada",
      C: "Diálise profilática em todos os pacientes oncológicos",
      D: "Suspensão definitiva de quimioterapia"
    },
    correct: "B",
    explanation: "TLS: hidratação + reduzir ácido úrico; rasburicase em alto risco/hiperuricemia grave. Pearl: volume + uricase salvam rim na indução.",
    bibliography: "Cairo-Bishop; ASCO TLS; COG supportive care."
  },
  {
    id: "NP-X011",
    tema: "CAKUT / ITU",
    subtema: "RVU grau IV — profilaxia",
    dificuldade: "intermediario",
    age: 0.5,
    vars: {

    },
    statement: "Lactente masculino de {{age}} com hidronefrose pré-natal bilateral, ITU febril, VCUG: RVU grau IV bilateral. Além do tratamento da ITU aguda, qual estratégia comum de prevenção?",
    options: {
      A: "Nunca usar profilaxia antibiótica em RVU de alto grau",
      B: "Profilaxia antibiótica contínua selecionada + seguimento urológico; considerar cirurgia se breakthroughs ou piora",
      C: "Nefrectomia bilateral imediata",
      D: "Corticoides como profilaxia de ITU"
    },
    correct: "B",
    explanation: "RVU alto grau + ITU: profilaxia e equipe multidisciplinar; cirurgia em falhas. Pearl: breakthrough sob profilaxia = reavaliar anatomia.",
    bibliography: "AAP UTI; EAU pediatric urology; RIVUR lessons."
  },
  {
    id: "NP-X012",
    tema: "DRC",
    subtema: "Anemia — AEE",
    dificuldade: "intermediario",
    age: 10,
    vars: {
      hb: 8.2
    },
    statement: "{{sexWord}} de {{age}} com DRC estágio 4, Hb {{hb}} g/dL, ferritina e saturação adequadas após reposição de ferro. Qual é o próximo passo para anemia?",
    options: {
      A: "Transfusão mensal de rotina como primeira linha crônica",
      B: "Iniciar agente estimulador de eritropoiese (EPO/darbepoetina) com alvo individualizado, evitando Hb excessiva",
      C: "Apenas vitamina B12 sem EPO",
      D: "Andrógenos orais em pré-escolares/escolares"
    },
    correct: "B",
    explanation: "Anemia da DRC: ferro adequado + AEE com alvos seguros pediátricos. Transfusão crônica traz aloimunização. Pearl: corrija ferro antes e com AEE.",
    bibliography: "KDIGO anemia; KDOQI pediatric."
  },
  {
    id: "NP-X013",
    tema: "DRC",
    subtema: "rhGH por falha de crescimento",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DRC, altura <P3 apesar de nutrição otimizada, acidose e hiperparatireoidismo controlados. Qual indicação é mais clara?",
    options: {
      A: "Apenas corticoides anabolizantes",
      B: "Hormônio de crescimento recombinante (rhGH) sob protocolo nefropediátrico",
      C: "Negar qualquer terapia de crescimento",
      D: "Tireoidectomia empírica"
    },
    correct: "B",
    explanation: "rhGH é indicado em falha de crescimento da DRC após otimizar fatores corrigíveis. Pearl: crescer também é desfecho renal pediátrico.",
    bibliography: "IPNA/KDOQI growth; rhGH in CKD trials."
  },
  {
    id: "NP-X014",
    tema: "Hipertensão",
    subtema: "Renovascular",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS estágio 2, sopro abdominal, assimetria de membros, creatinina normal. Qual é a suspeita principal e o exame?",
    options: {
      A: "HAS essencial sem investigação adicional",
      B: "Hipertensão renovascular (estenose); angiografia/angiorressonância ou Doppler especializado",
      C: "Feocromocitoma como única hipótese sem imagem renal",
      D: "Biópsia renal como primeiro exame"
    },
    correct: "B",
    explanation: "HAS grave em criança: investigar secundária; renovascular é clássica (sopro, assimetria). Pearl: sopro + HAS = imagem vascular.",
    bibliography: "AAP hypertension 2017; pediatric renovascular reviews."
  },
  {
    id: "NP-X015",
    tema: "Hipertensão",
    subtema: "IECA na DRC proteinúrica",
    dificuldade: "basico",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com DRC, proteinúria e HAS. Qual anti-hipertensivo é preferencial (sem contraindicação)?",
    options: {
      A: "Minoxidil como primeira linha em todos",
      B: "IECA ou BRA (nefroproteção) + otimização de estilo de vida",
      C: "Beta-bloqueador isolado sem antiproteinúrico",
      D: "Clonidina única sem IECA/BRA"
    },
    correct: "B",
    explanation: "IECA/BRA são pedra angular na DRC proteinúrica pediátrica, com monitorização de K e creatinina. Pearl: antiproteinúrico = anti-hipertensivo de escolha.",
    bibliography: "KDIGO CKD; AAP HTN."
  },
  {
    id: "NP-X016",
    tema: "Tubulopatias",
    subtema: "ATR distal",
    dificuldade: "intermediario",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com falha de crescimento, hipercloremia, bicarbonato baixo, ânion gap urinário positivo, hipocalemia e nefrocalcinose. Qual diagnóstico é mais provável?",
    options: {
      A: "ATR proximal isolada sem outros achados",
      B: "Acidose tubular renal distal (tipo 1)",
      C: "Cetoacidose diabética",
      D: "Alcalose metabólica por vômitos"
    },
    correct: "B",
    explanation: "ATR distal: acidose hiperclorêmica + incapacidade de acidificar urina + nefrocalcinose/cálculos. Pearl: nefrocalcinose + acidose = pense ATR 1.",
    bibliography: "Pediatric tubulopathy texts; ESC guidelines acid-base."
  },
  {
    id: "NP-X017",
    tema: "Tubulopatias",
    subtema: "Gitelman",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cãibras, hipocalemia, hipomagnesemia, hipocalciúria, PA normal/baixa. Qual diagnóstico é mais provável?",
    options: {
      A: "Bartter neonatal clássico (sempre com hipocalciúria)",
      B: "Síndrome de Gitelman",
      C: "Hiperaldosteronismo primário com HAS grave",
      D: "ATR distal com hipercalemia"
    },
    correct: "B",
    explanation: "Gitelman (NCC): hipocalemia, hipomagnesemia, hipocalciúria, PA baixa/normal. Bartter tende a hipercalciúria. Pearl: adolescente + Mg baixo + hipocalciúria = Gitelman.",
    bibliography: "Gitelman/Bartter consensus; Blanchard et al."
  },
  {
    id: "NP-X018",
    tema: "Tubulopatias",
    subtema: "DI nefrogênico",
    dificuldade: "intermediario",
    age: 0.4,
    vars: {

    },
    statement: "Lactente menino de {{age}} com poliúria, polidipsia, hipernatremia; osmolaridade urinária baixa que não sobe com desmopressina. Qual é o diagnóstico?",
    options: {
      A: "DI central — responderia à desmopressina",
      B: "Diabetes insípido nefrogênico (ex.: AVPR2/AQP2)",
      C: "SIADH (síndrome de secreção inapropriada de ADH)",
      D: "Síndrome nefrótica típica"
    },
    correct: "B",
    explanation: "Falha de resposta à DDAVP aponta DI nefrogênico (ligado ao X por AVPR2 com frequência). Pearl: DDAVP negativo = rim, não hipófise.",
    bibliography: "Pediatric endocrinology/nephrology DI reviews."
  },
  {
    id: "NP-X019",
    tema: "Nefrolitíase",
    subtema: "Cistinúria",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculos recorrentes pouco opacos, história familiar e cristais hexagonais na urina. Qual é a pedra angular do tratamento?",
    options: {
      A: "Apenas restrição extrema de água",
      B: "Hiperidratação + alcalinização urinária + tiopronina/D-penicilamina se preciso; orientar sódio/metionina com nutricionista",
      C: "Alopurinol como tratamento específico da cistina",
      D: "Corticoides prolongados"
    },
    correct: "B",
    explanation: "Cistinúria: volume + pH alcalino + quelantes tiólicos quando necessário. Alopurinol é para ácido úrico. Pearl: cristal hexagonal = cistina.",
    bibliography: "EAU urolithiasis; cystinuria guidelines."
  },
  {
    id: "NP-X020",
    tema: "Nefrolitíase",
    subtema: "Hipercalciúria idiopática",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hematúria microscópica e hipercalciúria idiopática, sem infecção. Qual é a primeira medida dietética/farmacológica usual?",
    options: {
      A: "Restrição severa de cálcio dietético em fase de crescimento",
      B: "Alta ingestão hídrica + restrição de sódio; tiazídico se persistir sintomática/cálculos",
      C: "Ciclofosfamida",
      D: "Indicação imediata de diálise sem outras medidas"
    },
    correct: "B",
    explanation: "Hipercalciúria: água + baixo Na; tiazida se necessário; não cortar cálcio dietético drasticamente (osso em crescimento). Pearl: corte sal, não cálcio da dieta.",
    bibliography: "Pediatric stone disease reviews; AAP."
  },
  {
    id: "NP-X021",
    tema: "ITU",
    subtema: "DMSA para cicatriz",
    dificuldade: "basico",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} após ITU febril grave. Qual exame melhor avalia cicatriz renal parenquimatosa?",
    options: {
      A: "Apenas urocultura de controle",
      B: "Cintilografia DMSA",
      C: "Radiografia simples de abdome",
      D: "Espirometria"
    },
    correct: "B",
    explanation: "DMSA é o padrão para cicatriz/pielonefrite parenquimatosa. Pearl: DMSA = parênquima; VCUG = refluxo. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "NICE/AAP UTI imaging; EANM DMSA."
  },
  {
    id: "NP-X022",
    tema: "ITU",
    subtema: "Antibiótico empírico febril",
    dificuldade: "basico",
    age: 0.6,
    vars: {

    },
    statement: "Lactente de {{age}} febril com ITU, toxicado. Antes da cultura, o antibiótico empírico deve cobrir principalmente:",
    options: {
      A: "Apenas fungos",
      B: "Enterobactérias (E. coli) com agente parenteral adequado à gravidade e epidemiologia local",
      C: "Vancomicina isolada sem gram-negativos",
      D: "Oseltamivir — conduta inadequada para o quadro"
    },
    correct: "B",
    explanation: "ITU febril pediátrica: cobrir gram-negativos entéricos; ajustar à cultura. Pearl: E. coli domina — pense beta-lactâmico/aminoglicosídeo local.",
    bibliography: "AAP UTI; SBP ITU."
  },
  {
    id: "NP-X023",
    tema: "Lúpus",
    subtema: "Nefrite classe IV — indução",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} com LES, biópsia classe IV, creatinina elevada e sedimento ativo. Qual indução está alinhada a guias?",
    options: {
      A: "Apenas hidroxicloroquina sem imunossupressão",
      B: "Mofetil micofenolato ou ciclofosfamida + glicocorticoide; considerar belimumabe/outros conforme contexto",
      C: "Plasmaférese de rotina em toda classe IV",
      D: "Observação expectante"
    },
    correct: "B",
    explanation: "Nefrite lúpica proliferativa: MMF ou CYC + esteroide; adjuvantes conforme gravidade. Pearl: classe III/IV = indução imunossupressora.",
    bibliography: "KDIGO LN 2024; ACR/EULAR."
  },
  {
    id: "NP-X024",
    tema: "Lúpus",
    subtema: "Classe V membranosa",
    dificuldade: "intermediario",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} com LES, biópsia classe V pura com proteinúria nefrótica e função estável. Qual tratamento é típico?",
    options: {
      A: "Apenas IECA sem imunossupressão em nefrótica sintomática",
      B: "MMF ou ciclofosfamida/CNI + antiproteinúrico; esteroides conforme protocolo",
      C: "Eculizumab de primeira linha",
      D: "Nefrectomia — conduta inadequada para o quadro"
    },
    correct: "B",
    explanation: "Classe V com proteinúria significativa: imunossupressão + nefroproteção. Pearl: V membranosa não é “só IECA” se nefrótica.",
    bibliography: "KDIGO LN; pediatric SLE nephritis."
  },
  {
    id: "NP-X025",
    tema: "Vasculites",
    subtema: "IgA vasculite (HSP)",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com púrpura palpável em membros inferiores, artralgia, dor abdominal e hematúria/proteinúria. Qual diagnóstico sindrômico e quando biópsiar o rim?",
    options: {
      A: "Sempre biópsia renal em toda púrpura leve",
      B: "Vasculite IgA (Schönlein-Henoch); biópsia se nefrite grave/persistente ou dúvida diagnóstica",
      C: "GPA como primeira hipótese sem ANCA",
      D: "PTI com plaquetas normais"
    },
    correct: "B",
    explanation: "IgA vasculite: clínica; biópsia renal se nefrite preocupante. Pearl: púrpura + dor abdominal + urina = HSP até prova em contrário.",
    bibliography: "SHARE/EULAR IgA vasculitis; KDIGO IgAN notes."
  },
  {
    id: "NP-X026",
    tema: "Vasculites",
    subtema: "GPA / ANCA pediátrico",
    dificuldade: "avancado",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com sinusite crônica, nódulos pulmonares, creatinina em ascensão, c-ANCA/PR3 positivo. Qual tratamento de indução em doença grave?",
    options: {
      A: "Apenas antibiótico nasal",
      B: "Rituximabe ou ciclofosfamida + corticoides; plasmaférese em indicações selecionadas (ex. hemorragia alveolar grave)",
      C: "Eculizumab como padrão ANCA",
      D: "Observação ambulatorial"
    },
    correct: "B",
    explanation: "GPA/MPA graves: RTX/CYC + GC; PLEX se selecionado. Pearl: PR3 + pulmão + rim = indução agressiva. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "KDIGO vasculitis; ACR/EULAR AAV."
  },
  {
    id: "NP-X027",
    tema: "Doenças císticas",
    subtema: "ARPKD — fígado",
    dificuldade: "intermediario",
    age: 0.05,
    vars: {

    },
    statement: "Recém-nascido com rins aumentados hiperecogênicos, hipertensão e insuficiência respiratória; pais consanguíneos. Qual associação hepática é esperada na ARPKD?",
    options: {
      A: "Cirrose por vírus C obrigatória",
      B: "Fibrose hepática congênita / ectasia de ductos biliares",
      C: "Ausência total de acometimento hepático",
      D: "Pancreatite autoimune típica"
    },
    correct: "B",
    explanation: "ARPKD (PKHD1): rim + fibrose hepática congênita. Pearl: rim cístico neonatal + fígado = ARPKD. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "IPNA ARPKD; Guay-Woodford."
  },
  {
    id: "NP-X028",
    tema: "Doenças císticas",
    subtema: "ADPKD adolescente",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} com história familiar de ADPKD, PA elevada e poucos cistos na US. Qual é a conduta inicial mais importante?",
    options: {
      A: "Tolvaptan em toda criança sem critérios",
      B: "Controle rigoroso da PA (IECA/BRA se proteinúria/HAS) + hidratação + evitar nefrotóxicos; aconselhar genética/imagem seriada",
      C: "Nefrectomia profilática",
      D: "Ignorar HAS por ser “leve”"
    },
    correct: "B",
    explanation: "ADPKD jovem: PA e nefroproteção; tolvaptan é decisão especializada/adultos selecionados. Pearl: trate a PA antes de discutir vaptans.",
    bibliography: "KDIGO ADPKD; pediatric ADPKD consensus."
  },
  {
    id: "NP-X029",
    tema: "Doenças císticas",
    subtema: "Nefronoptise",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com poliúria, anemia desproporcional à creatinina, rins pequenos ecogênicos e irmão com DRC. Qual é a suspeita?",
    options: {
      A: "SN por lesão mínima típica",
      B: "Nefronoptise (doença cística medular)",
      C: "PSGN aguda — conduta inadequada para o quadro",
      D: "Hiperplasia adrenal congênita isolada"
    },
    correct: "B",
    explanation: "Nefronoptise: poliúria, anemia precoce, DRC progressiva, rins pequenos, hereditária. Pearl: anemia “cedo demais” + poliúria = nefroftise.",
    bibliography: "Hildebrandt NPHP; IPNA ciliopathies."
  },
  {
    id: "NP-X030",
    tema: "Alport",
    subtema: "COL4A5",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "Menino de {{age}} com hematúria persistente desde a infância, perda auditiva neurossensorial e tia materna com DRC. Qual gene é mais frequentemente implicado (ligado ao X)?",
    options: {
      A: "NPHS1 (nefrina) como causa ligada ao X clássica",
      B: "COL4A5 (colágeno IV α5)",
      C: "PKD1 exclusivamente, sem relação com colágeno IV",
      D: "CFH (fator H do complemento) como gene do Alport"
    },
    correct: "B",
    explanation: "Alport clássico ligado ao X: COL4A5. Pearl: menino + hematúria + surdez + linhagem materna = COL4A5. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "Alport Syndrome Workshop; Kashtan."
  },
  {
    id: "NP-X031",
    tema: "Alport",
    subtema: "IECA precoce",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "Diagnóstico de Alport em menino de {{age}} com proteinúria. Qual medicação retarda progressão com melhor suporte de evidência?",
    options: {
      A: "Ciclofosfamida de rotina",
      B: "IECA (ou BRA) precocemente, mesmo com PA ainda normal-alta",
      C: "Rituximabe — conduta inadequada para o quadro",
      D: "Eculizumab — conduta inadequada para o quadro"
    },
    correct: "B",
    explanation: "IECA precoce é a base nefroprotetora no Alport (EARLY PRO-TECT Alport e prática). Pearl: não espere HAS para iniciar IECA no Alport proteinúrico.",
    bibliography: "EARLY PRO-TECT Alport; Kashtan recommendations."
  },
  {
    id: "NP-X032",
    tema: "Diálise",
    subtema: "Peritonite em DP",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com dor abdominal, efluente turvo, 120 leucócitos/µL com 80% PMN. Qual é a conduta?",
    options: {
      A: "Apenas antitérmico",
      B: "Cultura do efluente + antibiótico intraperitoneal empírico cobrindo gram+/gram− conforme protocolo pediátrico",
      C: "Remoção imediata do cateter em toda peritonite sem tentar ATB",
      D: "Corticoides intraperitoneais"
    },
    correct: "B",
    explanation: "Peritonite em DP: cultura + ATB IP precoce; remoção se refratária/fungo/túnel grave. Pearl: efluente turvo = ATB IP hoje.",
    bibliography: "ISPD peritonitis; IPNA dialysis."
  },
  {
    id: "NP-X033",
    tema: "Diálise",
    subtema: "Acesso HD — FAV",
    dificuldade: "basico",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} em HD crônica. Qual acesso vascular é preferencial a longo prazo quando viável?",
    options: {
      A: "Cateter tunelizado permanente como ideal eterno",
      B: "Fístula arteriovenosa autógena",
      C: "Acesso arterial direto sem fístula",
      D: "Port-a-cath de quimioterapia como padrão de HD"
    },
    correct: "B",
    explanation: "FAV permanece o acesso preferencial quando anatomia/tempo permitem; cateter eleva infecção. Pearl: “fístula first” também no adolescente.",
    bibliography: "KDOQI vascular access; pediatric HD access."
  },
  {
    id: "NP-X034",
    tema: "Transplante",
    subtema: "Profilaxia CMV D+/R−",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "Criança de {{age}} D+/R− para CMV após transplante renal. Qual estratégia correta de prevenção?",
    options: {
      A: "Nenhuma profilaxia porque criança “não pega CMV”",
      B: "Profilaxia antiviral (ex. valganciclovir) por período protocolar + monitoramento",
      C: "Interromper MMF e deixar sem imunossupressão",
      D: "Antibiótico antibacteriano substitui antiviral"
    },
    correct: "B",
    explanation: "Mismatch CMV D+/R−: alto risco — profilaxia ou preemptive therapy. Pearl: D+/R− = valganciclovir no protocolo.",
    bibliography: "TTS/AST CMV; pediatric transplant ID."
  },
  {
    id: "NP-X035",
    tema: "Transplante",
    subtema: "Disfunção do enxerto — biópsia",
    dificuldade: "intermediario",
    age: 13,
    vars: {

    },
    statement: "Criança de {{age}} transplantada com creatinina em ascensão, US sem obstrução, níveis de tacrolimus adequados. Qual é o próximo passo diagnóstico chave?",
    options: {
      A: "Aumentar tacrolimus empiricamente sem biópsia sempre",
      B: "Biópsia do enxerto para diferenciar rejeição, toxicidade, BK e recidiva",
      C: "Suspender todos os imunossupressores",
      D: "Nefrectomia do enxerto imediata"
    },
    correct: "B",
    explanation: "Disfunção do enxerto: biópsia guia terapia. Empirismo cego atrasa BK/rejeição. Pearl: creatinina sobe → biopsie (após excluir óbvio).",
    bibliography: "Banff; KDIGO transplant."
  },
  {
    id: "NP-X036",
    tema: "Eletrólitos",
    subtema: "Hipercalemia com ECG",
    dificuldade: "basico",
    age: 5,
    vars: {
      k: 7.8
    },
    statement: "{{sexWord}} de {{age}} com IRA, K {{k}} mEq/L e ondas T apiculadas. Qual é a primeira medida para estabilização de membrana?",
    options: {
      A: "Apenas resina sem estabilizar membrana em ECG alterado",
      B: "Gluconato de cálcio IV (com monitorização) enquanto prepara shift e remoção de K",
      C: "Esperar diálise sem medidas temporárias",
      D: "Insulina sem glicose em paciente já hipoglicêmico"
    },
    correct: "B",
    explanation: "ECG alterado: cálcio IV primeiro; depois insulina+glicose, beta-agonista e remoção (diurético/diálise/resina). Pearl: membrana antes do shift.",
    bibliography: "PALS electrolyte emergencies; KDIGO AKI."
  },
  {
    id: "NP-X037",
    tema: "Eletrólitos",
    subtema: "Hiponatremia sintomática",
    dificuldade: "intermediario",
    age: 1.2,
    vars: {
      na: 118
    },
    statement: "Lactente de {{age}} apresenta convulsão tônico-clônica, Na sérico {{na}} mEq/L e sem sinais de desidratação hipovolêmica grave. Qual é a conduta aguda correta para a hiponatremia sintomática?",
    options: {
      A: "Restrição hídrica isolada durante a convulsão",
      B: "Bolus de solução salina hipertônica para interromper sintomas graves, depois correção controlada",
      C: "Correção com soro hipotônico",
      D: "Desmopressina imediata"
    },
    correct: "B",
    explanation: "Hiponatremia sintomática grave: NaCl 3% em bolus titulado; depois correção lenta para evitar mielinólise. Pearl: convulsão + Na baixo = 3% agora.",
    bibliography: "European hyponatremia; pediatric emergency texts."
  },
  {
    id: "NP-X038",
    tema: "Neonatologia",
    subtema: "AKI por asfixia",
    dificuldade: "intermediario",
    age: 0.03,
    vars: {

    },
    statement: "RN termo com asfixia perinatal, oligúria nas primeiras 48 h e creatinina em ascensão. Além do suporte, qual medida é mais importante?",
    options: {
      A: "Furosemida de rotina em hipovolemia",
      B: "Monitorar balanço hídrico/eletrólitos, evitar nefrotóxicos e indicar diálise se critérios (hiperK refratária, sobrecarga, uremia)",
      C: "IECA neonatal precoce",
      D: "Contraste iodado para “proteger” o rim"
    },
    correct: "B",
    explanation: "AKI neonatal: suporte, nefrotóxicos off, diálise se indicação clássica. Pearl: asfixia + oligúria = cuide do balanço.",
    bibliography: "Neonatal AKI definitions (KDIGO-mod); jet neonatology."
  },
  {
    id: "NP-X039",
    tema: "Neonatologia",
    subtema: "Válvula de uretra posterior",
    dificuldade: "intermediario",
    age: 0.02,
    vars: {

    },
    statement: "RN menino com massa vesical, jato fraco e hidronefrose bilateral grave. Qual é a suspeita e a conduta?",
    options: {
      A: "Apenas antibiótico sem desobstruir",
      B: "Válvula de uretra posterior — desobstrução urgente (sonda/vesicostomia/ablação) + suporte renal",
      C: "Diagnóstico de SN por lesão mínima",
      D: "Observação ambulatorial sem imagem"
    },
    correct: "B",
    explanation: "VUP é emergência urológica neonatal: desobstruir primeiro. Pearl: menino + jato fraco + hidronefrose = VUP até prova em contrário.",
    bibliography: "EAU pediatric urology; CAKUT reviews."
  },
  {
    id: "NP-X040",
    tema: "Farmacologia",
    subtema: "NTA por aminoglicosídeo",
    dificuldade: "basico",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} recebe gentamicina prolongada e apresenta elevação de creatinina com urina diluída e cilindros granulosos. Qual mecanismo é mais típico?",
    options: {
      A: "Glomerulonefrite por imunocomplexos típica da gentamicina",
      B: "Necrose tubular aguda tóxica por aminoglicosídeo",
      C: "Estenose de artéria renal",
      D: "SHU típica — conduta inadequada para o quadro"
    },
    correct: "B",
    explanation: "Aminoglicosídeos → NTA tóxica dose/tempo-dependente. Pearl: gentamicina longa + LRA = NTA até prova em contrário.",
    bibliography: "Drug-induced AKI reviews; KDIGO AKI."
  },
  {
    id: "NP-X041",
    tema: "Farmacologia",
    subtema: "AINE em desidratação",
    dificuldade: "basico",
    age: 3,
    vars: {

    },
    statement: "Pré-escolar de {{age}} desidratado recebe ibuprofeno alto para febre e evolui com IRA. Qual é a fisiopatologia principal?",
    options: {
      A: "Obstrução ureteral por cristal de ibuprofeno",
      B: "Inibição de prostaglandinas → perda de vasodilatação aferente em estado de baixo volume efetivo",
      C: "Necrose cortical sempre",
      D: "Diabetes insípido nefrogênico típico"
    },
    correct: "B",
    explanation: "AINEs em hipovolemia: IRA hemodinâmica clássica. Pearl: febre + vômito + ibuprofeno = risco renal. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "NSAID nephrotoxicity; SBP fever guidance."
  },
  {
    id: "NP-X042",
    tema: "Metabólico",
    subtema: "Nefropatia da obesidade",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} obeso com proteinúria leve, TFG alta e HAS. Qual medida tem maior impacto renal a longo prazo?",
    options: {
      A: "Corticoides para “reduzir hiperfiltração”",
      B: "Perda de peso + IECA/BRA se proteinúria/HAS + manejo da síndrome metabólica",
      C: "Diálise precoce",
      D: "Imunossupressão empírica"
    },
    correct: "B",
    explanation: "Nefropatia da obesidade: peso + nefroproteção. Pearl: hiperfiltração do obeso responde a emagrecer + IECA. Distratores falham por não cobrir o mecanismo principal, atrasar terapia eficaz ou aplicar lógica de adulto sem ajuste pediátrico. Pearl: priorize vinheta + diretriz IPNA/KDIGO.",
    bibliography: "Obesity-related glomerulopathy; KDIGO CKD."
  },
  {
    id: "NP-X043",
    tema: "Infecção e rim",
    subtema: "COVID grave / colapso",
    dificuldade: "intermediario",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com COVID grave em UTI, proteinúria e IRA; biópsia (se feita) pode mostrar colapso glomerular. Qual é a conduta renal geral?",
    options: {
      A: "Ciclofosfamida de rotina em todo COVID",
      B: "Suporte da IRA, evitar nefrotóxicos, tratar doença de base; imunossupressão só se glomerulopatia específica indicada",
      C: "Eculizumab empírico universal",
      D: "Nefrectomia — conduta inadequada para o quadro"
    },
    correct: "B",
    explanation: "AKI/colapso associado a infecção grave: suporte; biópsia/IS se indicado. Pearl: não imunossuprimir “por COVID” sem alvo.",
    bibliography: "COVID-19 kidney injury reviews; collapsing glomerulopathy."
  },
  {
    id: "NP-X044",
    tema: "Transição",
    subtema: "Ped → adulto",
    dificuldade: "basico",
    age: 17,
    vars: {

    },
    statement: "Adolescente de {{age}} em DP há anos será transferido ao serviço adulto. Qual elemento é essencial no processo de transição?",
    options: {
      A: "Alta abrupta sem sumário",
      B: "Programa estruturado de educação em autocuidado, adesão e transferência planejada de dados clínicos",
      C: "Ocultar o diagnóstico ao paciente",
      D: "Suspender diálise na transição"
    },
    correct: "B",
    explanation: "Transição ped→adulto reduz perda de seguimento e não adesão/rejeição. Pearl: transição é protocolo, não “alta”.",
    bibliography: "IPNA/ISN transition; Got Transition framework."
  },
  {
    id: "NP-X045",
    tema: "Nutrição",
    subtema: "Proteína na DRC pediátrica",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "Pré-escolar de {{age}} em DRC conservadora com baixo peso. Sobre restrição proteica, qual afirmação é correta?",
    options: {
      A: "Dieta cetogênica obrigatória",
      B: "Evitar restrição proteica severa que prejudique crescimento; priorizar calorias adequadas e controlar fósforo/potássio conforme labs",
      C: "Proteína <0,3 g/kg em fase de crescimento",
      D: "Jejum intermitente agressivo"
    },
    correct: "B",
    explanation: "Em pediatria, crescimento supera restrição proteica agressiva estilo adulto. Pearl: criança com DRC precisa crescer — não “low protein” extremo.",
    bibliography: "KDOQI pediatric nutrition; IPNA CKD nutrition."
  }
];

module.exports = { PED_MASTERS_EXTRA };
