/**
 * Expansão expert III — Nefrologia Pediátrica.
 */
const PED_MASTERS_EXTRA3 = [
  {
    id: "NP-X091",
    tema: "Síndrome nefrótica",
    subtema: "Anti-nefrina na SN pediátrica",
    dificuldade: "avancado",
    age: 5,
    vars: {
      alb: 1.7
    },
    statement: "{{sexWord}} de {{age}} ({{weight}} kg) com SN córtico-sensível recidivante, albumina {{alb}} g/dL, biópsia com lesão mínima. Pesquisa de autoanticorpo anti-nefrina positiva em laboratório de referência. Qual é a melhor interpretação clínica atual?",
    options: {
      A: "Fecha diagnóstico de mutação NPHS2 e contraindicação absoluta a imunossupressão",
      B: "Sugere podocitopatia autoimune e apoia estratégias que incluem terapia anti-linfocítica B em casos selecionados refratários; ainda complementa — não substitui — a clínica e a genética quando indicada",
      C: "Indica eculizumab imediato em toda SN",
      D: "Permite alta sem calendário vacinal nem educação sobre infecção"
    },
    correct: "B",
    explanation: "Anti-nefrina é biomarcador emergente de SN por lesão mínima/imune. Não exclui investigação genética em atípicos. Pearl: fator circulante voltou à SN pediátrica — mas biópsia/genética ainda mandam no SRNS.",
    bibliography: "Anti-nephrin pediatric reports; IPNA SSNS/SRNS."
  },
  {
    id: "NP-X092",
    tema: "Síndrome nefrótica",
    subtema: "Ofatumumabe / anti-CD20 alternativo",
    dificuldade: "avancado",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN corticodependente grave, reação infusionais ou falha após rituximabe, centro com experiência. Qual alternativa anti-CD20 pode ser considerada?",
    options: {
      A: "Suspender toda terapia e aceitar edema refratário sem opções",
      B: "Ofatumumabe ou outro anti-CD20 humano em protocolo experiente, com monitorização de células B e hipogamaglobulinemia",
      C: "BCG intraperitoneal — conduta/diagnóstico inadequado para o caso",
      D: "Tolvaptan como poupador de esteroide na SN"
    },
    correct: "B",
    explanation: "Em falha/intolerância ao RTX, outros anti-CD20 têm relatos/séries em SDNS. Pearl: esgotou RTX → discuta anti-CD20 alternativo em centro terciário.",
    bibliography: "Pediatric anti-CD20 beyond rituximab; IPNA."
  },
  {
    id: "NP-X093",
    tema: "Síndrome nefrótica",
    subtema: "Hipovolemia vs hipervolemia no edema",
    dificuldade: "intermediario",
    age: 4,
    vars: {
      alb: 1.5
    },
    statement: "{{sexWord}} de {{age}} com SN (alb {{alb}}), edema ++, taquicardia, extremidades frias e hemoconcentração. Qual risco do diurético agressivo isolado e qual conduta mais segura?",
    options: {
      A: "Sempre está hipervolêmico — furosemida em alta dose sem albumina/avaliação",
      B: "Pode haver hipovolemia intravascular: repor albumina iso-oncótica criteriosa + diurético cauteloso sob monitorização; evitar choque hipovolêmico",
      C: "IECA em crise hipovolêmica como primeira medida",
      D: "Restrição absoluta de água sem avaliar perfusão"
    },
    correct: "B",
    explanation: "Na SN pediátrica o plasma pode estar “underfilled”. Diurético cego precipita trombose/choque. Pearl: pé frio na SN ≠ só “inchaço para diurético”.",
    bibliography: "IPNA edema management; pediatric nephrotic crisis."
  },
  {
    id: "NP-X094",
    tema: "Glomerulonefrite aguda",
    subtema: "IgA vs PSGN na primeira apresentação",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hematúria macroscópica sincrônica a infecção de vias aéreas superiores, C3 normal e PA limítrofe. Qual diferencial é mais importante com PSGN?",
    options: {
      A: "São indistinguíveis e ambas têm C3 baixo obrigatório",
      B: "IgA sincroniza com a infecção e C3 costuma ser normal; PSGN é latente (1–3 sem) e C3 baixo — o tempo e o complemento orientam",
      C: "PSGN nunca segue faringite",
      D: "IgA sempre exige eculizumab na primeira crise"
    },
    correct: "B",
    explanation: "Sincrônica + C3 normal favorece IgA; latente + C3 baixo favorece PSGN. Pearl: o calendário da infecção é a semiologia. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "KDIGO IgAN/PSGN; pediatric GN texts."
  },
  {
    id: "NP-X095",
    tema: "SHU / MAT",
    subtema: "Vacinação meningocócica e C5i",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SHUa iniciará eculizumab. Qual medida infecciosa é obrigatória?",
    options: {
      A: "Nenhuma — bloqueio de C5 não aumenta risco meningocócico",
      B: "Vacinação meningocócica (e profilaxia antibiótica quando a vacina ainda não cobre / início urgente) + educação da família sobre febre",
      C: "Apenas vacina varicela viva no dia do eculizumab",
      D: "Imunossupressão com MMF no lugar da vacina"
    },
    correct: "B",
    explanation: "C5i eleva risco de Neisseria — vacina + profilaxia conforme protocolo. Pearl: eculizumab sem meningococo pensado = erro grave.",
    bibliography: "Soliris/Ultomiris safety; IPNA aHUS."
  },
  {
    id: "NP-X096",
    tema: "SHU / MAT",
    subtema: "DGKE e eculizumab",
    dificuldade: "avancado",
    age: 0.7,
    vars: {

    },
    statement: "Lactente de {{age}} com SHUa precoce, complemento sérico pouco alterado e variante patogênica em DGKE. Qual nuance terapêutica?",
    options: {
      A: "Resposta sempre excelente e obrigatória ao eculizumab como nas mutações de CFH",
      B: "DGKE pode responder mal ao bloqueio de C5; tratamento é individualizado (suporte ± outras estratégias) em centro de referência",
      C: "É idêntico ao STEC-HUS e só precisa de antibiótico",
      D: "Indica nefrectomia bilateral preventiva"
    },
    correct: "B",
    explanation: "DGKE é MAT intracelular — C5i não é automaticamente eficaz. Pearl: SHUa do lactente ≠ “eculizumab automático” sem genética.",
    bibliography: "DGKE nephropathy; aHUS genetics reviews."
  },
  {
    id: "NP-X097",
    tema: "IRA pediátrica",
    subtema: "Critérios KDIGO pediátricos",
    dificuldade: "basico",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} internado tem creatinina que sobe ≥1,5× o basal em 48 h e débito urinário <0,5 mL/kg/h por 12 h. Qual classificação descreve esse quadro?",
    options: {
      A: "Apenas desidratação sem IRA possível",
      B: "Lesão renal aguda (KDIGO), estágio conforme magnitude da Cr/oligúria — exige revisão de volume, nefrotóxicos e causa",
      C: "DRC estágio 5 obrigatória",
      D: "Síndrome nefrótica sem proteinúria"
    },
    correct: "B",
    explanation: "KDIGO AKI aplica-se em pediatria com débitos por kg. Pearl: Cr ×1,5 ou oligúria = IRA, não “só laboratório”. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "KDIGO AKI; pediatric AKI definitions."
  },
  {
    id: "NP-X098",
    tema: "IRA pediátrica",
    subtema: "Síndrome de lise — rasburicase",
    dificuldade: "intermediario",
    age: 7,
    vars: {
      ua: 14
    },
    statement: "{{sexWord}} de {{age}} com Linfoma de Burkitt, ácido úrico {{ua}} mg/dL e início de quimioterapia. G6PD desconhecido. Qual cuidado com rasburicase?",
    options: {
      A: "Rasburicase é seguro em deficiência de G6PD sem qualquer risco",
      B: "Pode causar hemólise em G6PD deficiente — rastrear risco, monitorar e preferir alternativas/cuidado se alta suspeita",
      C: "Rasburicase substitui hidratação",
      D: "Usar apenas alopurinol IV em todo alto risco sem exceção mundial"
    },
    correct: "B",
    explanation: "Rasburicase gera H2O2 — hemólise em G6PD. Pearl: uricase potente, mas pergunte G6PD. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Cairo-Bishop; ASCO TLS; rasburicase label."
  },
  {
    id: "NP-X099",
    tema: "CAKUT / ITU",
    subtema: "Circuncisão e ITU no lactente",
    dificuldade: "intermediario",
    age: 0.4,
    vars: {

    },
    statement: "Lactente masculino de {{age}} com ITU febril recorrente e fimose fisiológica acentuada, RVU leve. Além de ATB/profilaxia conforme caso, qual medida urológica pode reduzir ITU?",
    options: {
      A: "Nunca discutir circuncisão",
      B: "Circuncisão pode reduzir risco de ITU em meninos selecionados de alto risco — decisão compartilhada com urologia",
      C: "Nefrectomia profilática",
      D: "Corticoide tópico como única terapia de RVU grau IV"
    },
    correct: "B",
    explanation: "Circuncisão reduz ITU em lactentes masculinos de risco. Pearl: menino + ITUs repetidas = urologia na mesa. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "AAP UTI/circumcision evidence; EAU ped urol."
  },
  {
    id: "NP-X100",
    tema: "CAKUT / ITU",
    subtema: "Disfunção miccional e ITU",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ITU de repetição, constipação e “adiamento” miccional na escola, US sem dilatação importante. Qual eixo terapêutico é central?",
    options: {
      A: "Profilaxia antibiótica isolada para sempre sem abordagem intestinal/vesical",
      B: "Tratar disfunção vesical e intestinal (uroterapia, horários, constipação) — reduz ITU tanto quanto imaginar só “rim anômalo”",
      C: "VCUG mensal obrigatório",
      D: "Diálise — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Bladder-bowel dysfunction impulsiona ITU escolar. Pearl: trate o intestino para curar a urina. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "ICCS BBD; AAP/EAU recurrent UTI."
  },
  {
    id: "NP-X101",
    tema: "DRC",
    subtema: "Alvo pressórico pediátrico",
    dificuldade: "intermediario",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC proteinúrica. Segundo evidências pediátricas (ESCAPE), qual meta de PA é preferível?",
    options: {
      A: "Permitir PA no percentil 95 sem tratamento se assintomático",
      B: "Alvo mais baixo (cerca do percentil 50 da PAM no ESCAPE) com IECA, reduzindo progressão vs alvo mais alto",
      C: "Só tratar se houver papiledema",
      D: "Beta-bloqueador obrigatório antes de IECA em proteinúria"
    },
    correct: "B",
    explanation: "ESCAPE: controle intensivo da PA com IECA atrasa progressão. Pearl: na DRC pediátrica, PA “normal alta” pode ser pouco. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "ESCAPE trial; KDIGO CKD; AAP HTN."
  },
  {
    id: "NP-X102",
    tema: "DRC",
    subtema: "Déficit de crescimento — timing rhGH",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC, altura <P3, acidose corrigida, nutrição otimizada, PTH aceitável. Família pergunta quando iniciar rhGH.",
    options: {
      A: "Só depois de entrar em diálise definitivamente",
      B: "Pode iniciar na fase conservadora quando fatores corrigíveis foram tratados e o déficit persiste — não esperar TSR",
      C: "rhGH é contraindicado em qualquer DRC",
      D: "Substituir rhGH por anabolizante androgênico oral de rotina"
    },
    correct: "B",
    explanation: "rhGH funciona antes da diálise se a base metabólica está otimizada. Pearl: não espere a máquina para crescer. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "IPNA/KDOQI growth; rhGH CKD trials."
  },
  {
    id: "NP-X103",
    tema: "Hipertensão",
    subtema: "MAPA pediátrico",
    dificuldade: "intermediario",
    age: 13,
    vars: {

    },
    statement: "Adolescente de {{age}} com leituras elevadas no consultório mas suspeita de “jaleco branco”. Qual exame melhor caracteriza o perfil pressórico?",
    options: {
      A: "Uma única medida no pronto-socorro",
      B: "MAPA (monitorização ambulatorial de 24 h) — diagnostica HAS mascarada/jaleco branco e guia tratamento",
      C: "Radiografia de tórax como padrão ouro de HAS",
      D: "Biópsia renal antes de qualquer medida de PA fora do consultório"
    },
    correct: "B",
    explanation: "MAPA é referência em pediatria para confirmar HAS. Pearl: consultório mente — MAPA decide. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "AAP hypertension 2017; ESCAPE/MAPA pediatrics."
  },
  {
    id: "NP-X104",
    tema: "Tubulopatias",
    subtema: "Cistinose — oftalmológico",
    dificuldade: "intermediario",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cistinose em cisteamina oral apresenta fotofobia. Qual tratamento local é específico?",
    options: {
      A: "Apenas óculos escuros sem cisteamina tópica",
      B: "Cisteamina colírio (além da sistêmica) para depósitos corneanos, com oftalmologia",
      C: "Corticoide tópico contínuo sem diagnóstico",
      D: "Antibiótico ocular mensal empírico"
    },
    correct: "B",
    explanation: "Cisteamina oral não atinge bem a córnea — colírio é necessário. Pearl: fotofobia na cistinose = colírio de cisteamina. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "Cystinosis guidelines; ophthalmic cysteamine."
  },
  {
    id: "NP-X105",
    tema: "Tubulopatias",
    subtema: "Síndrome de Fanconi por tenofovir (adolescente)",
    dificuldade: "avancado",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} com HIV em tenofovir DF apresenta fosfatúria, acidose e queda de TFG. Qual conduta?",
    options: {
      A: "Aumentar dose de tenofovir DF",
      B: "Suspeitar tubulopatia por TDF: discutir troca (ex. TAF/outro esquema) com infectologia e repor perdas",
      C: "Diagnóstico de Bartter clássico sem relação com fármaco",
      D: "Eculizumab — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "TDF causa Fanconi/NTA; TAF é mais seguro renal em muitos contextos. Pearl: HIV + fosfato baixo = olhe o tenofovir. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "TDF nephrotoxicity; pediatric HIV guidelines."
  },
  {
    id: "NP-X106",
    tema: "Nefrolitíase",
    subtema: "Hipocitratúria e citrato",
    dificuldade: "intermediario",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculos de oxalato de cálcio recorrentes e citratúria baixa, TFG normal. Qual medida metafiilática é central?",
    options: {
      A: "Restrição severa de cálcio dietético no crescimento",
      B: "Citrato de potássio (alcalinização/citraturia) + hidratação alta + sódio controlado",
      C: "Alopurinol em todo cálculo de cálcio",
      D: "Tiopronina sem cistina"
    },
    correct: "B",
    explanation: "Hipocitratúria responde a citrato; não corte cálcio da dieta da criança. Pearl: citrato baixo = reponha citrato. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "EAU pediatric urolithiasis; AUA."
  },
  {
    id: "NP-X107",
    tema: "Nefrolitíase",
    subtema: "2,8-diidroxiadenina",
    dificuldade: "avancado",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculos radiotransparentes, IRA obstrutiva e deficiência de APRT. Qual tratamento específico reduz produção da 2,8-DHA?",
    options: {
      A: "Apenas alcalinização como na cistina",
      B: "Alopurinol/febuxostate + hidratação vigorosa; litíase pode recidivar no enxerto se não tratar",
      C: "Cisteamina — conduta/diagnóstico inadequado para o caso",
      D: "Eculizumab — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "APRT deficiency: alopurinol reduz 2,8-DHA. Pearl: cálculo “úrico” que não é úrico — pense DHA/APRT. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "APRT deficiency reviews; rare stone diseases."
  },
  {
    id: "NP-X108",
    tema: "Lúpus",
    subtema: "Indução sem ciclofosfamida (MMF)",
    dificuldade: "intermediario",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com nefrite lúpica classe III, preocupação com fertilidade. Qual indução é frequentemente preferida?",
    options: {
      A: "Ciclofosfamida Euro-Lupus como única opção aceitável",
      B: "Mofetil micofenolato + corticoide (equivalência a CYC em muitos cenários) preservando fertilidade",
      C: "Apenas HCQ sem imunossupressão na classe III ativa",
      D: "Plasmaférese de rotina"
    },
    correct: "B",
    explanation: "MMF ≈ CYC na indução de muitas LN; fertilidade pesa no adolescente. Pearl: classe III/IV jovem = MMF primeiro em muitos centros.",
    bibliography: "KDIGO LN; ALMS; pediatric SLE."
  },
  {
    id: "NP-X109",
    tema: "Vasculites",
    subtema: "IgA vasculite — quando biópsia renal",
    dificuldade: "intermediario",
    age: 8,
    vars: {
      upcr: 2.5
    },
    statement: "{{sexWord}} de {{age}} com púrpura típica de HSP, UPCR {{upcr}} persistente e hipertensão. Qual indicação de biópsia está mais clara?",
    options: {
      A: "Biópsia nunca indicada em HSP",
      B: "Nefrite moderada/grave (proteinúria nefrótica, HAS, queda de TFG ou persistência) — biópsia guia IS",
      C: "Biópsia só após 5 anos de hematúria microscópica isolada leve",
      D: "Nefrectomia diagnóstica"
    },
    correct: "B",
    explanation: "HSP leve observa; nefrite significativa biopsia. Pearl: proteinúria que não cai = biopsie. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "SHARE IgA vasculitis; pediatric rheumatology."
  },
  {
    id: "NP-X110",
    tema: "Doenças císticas",
    subtema: "ADPKD — tolvaptan pediátrico",
    dificuldade: "avancado",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} com ADPKD rapidamente progressiva, PA controlada. Sobre tolvaptan, qual postura é mais correta?",
    options: {
      A: "Liberado livremente em qualquer criança com 1 cisto",
      B: "Uso altamente selecionado/especializado (dados pediátricos limitados vs adulto TEMPO/REPRISE); priorizar PA, hidratação e evitar nefrotóxicos",
      C: "Substitui controle pressórico",
      D: "É antibiótico profilático"
    },
    correct: "B",
    explanation: "Tolvaptan pediátrico não é rotina ampla — decisão terciária. Pearl: no adolescente, domine a PA antes de discutir vaptan.",
    bibliography: "Pediatric ADPKD consensus; TEMPO/REPRISE context."
  },
  {
    id: "NP-X111",
    tema: "Doenças císticas",
    subtema: "TSC — AML e everolimus",
    dificuldade: "avancado",
    age: 13,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com esclerose tuberosa e angiomiolipomas renais em crescimento (>3–4 cm) sem sangramento agudo. Qual terapia alvo pode reduzir volume?",
    options: {
      A: "Apenas observação sem imagem seriada",
      B: "Everolimus (mTOR) conforme critérios; embolização se hemorragia",
      C: "Tolvaptan — conduta/diagnóstico inadequado para o caso",
      D: "Ciclofosfamida — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "EXIST-2: everolimus reduz AML. Pearl: TSC + AML crescendo = mTOR, não só “espera estourar”. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "EXIST-2; TSC consensus."
  },
  {
    id: "NP-X112",
    tema: "Alport",
    subtema: "SGLT2 em adolescentes?",
    dificuldade: "avancado",
    age: 16,
    vars: {
      tfg: 55,
      upcr: 1.1
    },
    statement: "Adolescente de {{age}} com Alport, TFG {{tfg}}, UPCR {{upcr}} em IECA. Pergunta sobre dapagliflozina. Qual resposta é mais honesta/atual?",
    options: {
      A: "SGLT2 é padrão-ouro pediátrico há décadas em Alport",
      B: "Evidência pediátrica ainda limitada; decisão individual em centro experiente após otimizar IECA — extrapolar adultos com cautela",
      C: "SGLT2 substitui IECA no Alport",
      D: "Proibido discutir qualquer nefroproteção nova"
    },
    correct: "B",
    explanation: "SGLT2 mudou DRC adulta; pediatria/Alport ainda é extrapolação criteriosa. Pearl: IECA primeiro; SGLT2 só com olhos abertos.",
    bibliography: "DAPA-CKD adults; emerging pediatric SGLT2 reports; Alport recommendations."
  },
  {
    id: "NP-X113",
    tema: "Diálise",
    subtema: "Anemia e resistência à EPO",
    dificuldade: "intermediario",
    age: 11,
    vars: {
      hb: 8.4
    },
    statement: "{{sexWord}} de {{age}} em HD com Hb {{hb}} apesar de EPO alta. Ferritina alta, saturação baixa-normal, PCR elevada. Qual causa de resistência investigar primeiro?",
    options: {
      A: "Excesso de férias escolares",
      B: "Inflamação/infecção (acesso, periodonto), deficiência funcional de ferro, hiperpara, deficiência B12/folato, hemólise oculta",
      C: "Sempre aumentar EPO sem fim",
      D: "Suspender dialise para “recuperar medula”"
    },
    correct: "B",
    explanation: "Resistência a AEE: inflamação e ferro funcional são reis. Pearl: EPO alta + Hb baixa = caçe inflamação, não só “mais ampola”.",
    bibliography: "KDIGO anemia; pediatric dialysis anemia."
  },
  {
    id: "NP-X114",
    tema: "Diálise",
    subtema: "DP e hérnia",
    dificuldade: "intermediario",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DPA apresenta abaulamento inguinal redutível e desconforto no dwell. Qual conduta geral?",
    options: {
      A: "Ignorar — hérnia nunca complica DP",
      B: "Avaliar correção cirúrgica; temporariamente volumes menores/hemodiálise ponte se necessário",
      C: "Aumentar volume de dwell para “reduzir” a hérnia",
      D: "Antibiótico antifúngico empírico"
    },
    correct: "B",
    explanation: "Hérnia é complicação mecânica da DP — corrige-se. Pearl: abaulamento no dwell = chame o cirurgião. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "ISPD PD complications; IPNA dialysis."
  },
  {
    id: "NP-X115",
    tema: "Transplante",
    subtema: "Indução e risco imunológico",
    dificuldade: "avancado",
    age: 9,
    vars: {

    },
    statement: "Criança de {{age}} hipersensibilizada (PRA alto, DSA), doador falecido. Qual princípio de indução?",
    options: {
      A: "Sempre sem indução porque criança “tolera tudo”",
      B: "Indução com agente depletor ou timoglobulina/alternativas conforme protocolo de alto risco + manutenção tripla",
      C: "Apenas prednisona isolada",
      D: "Eculizumab substitui HLA matching"
    },
    correct: "B",
    explanation: "Alto risco imunológico pede indução potente. Pearl: PRA alto ≠ indução light. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "KDIGO transplant; pediatric induction reviews."
  },
  {
    id: "NP-X116",
    tema: "Transplante",
    subtema: "EBV e PTLD",
    dificuldade: "avancado",
    age: 6,
    vars: {

    },
    statement: "Criança de {{age}} D+/R− para EBV, 8 meses pós-Tx, apresenta febre, adenomegalia e carga EBV alta. Qual preocupação e primeira medida?",
    options: {
      A: "Ignorar EBV em pediatria",
      B: "Risco de PTLD: reduzir imunossupressão e investigar linfoproliferação com oncologia/transplante",
      C: "Aumentar tacrolimus — conduta/diagnóstico inadequado para o caso",
      D: "Antibiótico antibacteriano único resolve PTLD"
    },
    correct: "B",
    explanation: "PTLD liga-se a EBV em seronegativos. Reduzir IS é o primeiro passo. Pearl: EBV dispara + nodo = PTLD até prova em contrário.",
    bibliography: "AST PTLD; pediatric transplant ID."
  },
  {
    id: "NP-X117",
    tema: "Eletrólitos",
    subtema: "Hipocalemia ameaçadora",
    dificuldade: "intermediario",
    age: 8,
    vars: {
      k: 2.1
    },
    statement: "{{sexWord}} de {{age}} com diarreia grave, K {{k}}, fraqueza e ondas U no ECG. Qual prioridade?",
    options: {
      A: "Apenas dieta oral de banana ambulatorial",
      B: "Reposição de K (IV se grave/sintomático) sob monitorização, corrigir Mg se baixo, tratar causa",
      C: "Insulina + glicose como na hiperK",
      D: "Kayexalato — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "HipoK grave com ECG: repor com segurança e olhar Mg. Pearl: onda U + fraqueza = K IV monitorado. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "PALS electrolytes; pediatric emergency."
  },
  {
    id: "NP-X118",
    tema: "Eletrólitos",
    subtema: "Síndrome de realimentação",
    dificuldade: "avancado",
    age: 14,
    vars: {
      p: 1.2
    },
    statement: "Adolescente de {{age}} desnutrido grave inicia nutrição e em 24 h apresenta P {{p}}, fraqueza e arritmia. Qual síndrome e prevenção?",
    options: {
      A: "Hiperfosfatemia da DRC",
      B: "Refeeding: repor P/K/Mg, iniciar calorias gradualmente e monitorar eletrólitos",
      C: "TLS típico sem câncer",
      D: "Intoxicação por vitamina D"
    },
    correct: "B",
    explanation: "Realimentação consome fosfato — risco de morte. Pearl: magro que começa a comer = meça o P. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "NICE refeeding; nutrition nephrology."
  },
  {
    id: "NP-X119",
    tema: "Neonatologia",
    subtema: "Hipertensão neonatal",
    dificuldade: "avancado",
    age: 0.08,
    vars: {

    },
    statement: "RN pré-termo de {{age}} com cateter arterial umbilical e HAS. Qual causa iatrogênica clássica investigar?",
    options: {
      A: "Hiperaldosteronismo primário típico do RN a termo",
      B: "Trombose aórtica/renal relacionada a cateter — Doppler e remover/ajustar dispositivo + anti-hipertensivo",
      C: "Coarctação excluída só pela presença do cateter",
      D: "Apenas dor — sem medir PA"
    },
    correct: "B",
    explanation: "Cateter umbilical trombosa e causa HAS. Pearl: HAS no RN + UAC = Doppler vascular. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Neonatal hypertension reviews; NICU vascular."
  },
  {
    id: "NP-X120",
    tema: "Neonatologia",
    subtema: "DRC do prematuro extremo",
    dificuldade: "intermediario",
    age: 0.5,
    vars: {

    },
    statement: "Lactente de {{age}} ex-prematuro de 26 semanas com TFG baixa para idade e proteinúria leve. Qual mensagem de seguimento?",
    options: {
      A: "Prematuridade não afeta risco renal futuro",
      B: "Nascidos muito prematuros têm risco de DRC/HAS — seguimento nefrológico, PA e crescimento",
      C: "Alta definitiva sem controles",
      D: "Indicação automática de biópsia em todos"
    },
    correct: "B",
    explanation: "Oligonefrozia do prematuro é real. Pearl: 26 semanas = agenda renal para a vida. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Preterm kidney adult outcomes; IPNA."
  },
  {
    id: "NP-X121",
    tema: "Farmacologia",
    subtema: "Vancomicina + piperacilina-tazobactam",
    dificuldade: "intermediario",
    age: 9,
    vars: {
      cr: 1.4
    },
    statement: "{{sexWord}} de {{age}} em vancomicina + piperacilina-tazobactam apresenta creatinina {{cr}} (basal 0,5). Qual interpretação atual?",
    options: {
      A: "Combinação sem qualquer sinal de nefrotoxicidade na literatura",
      B: "Associação ligada a maior incidência de IRA (e possível pseudotoxicidade por inibição de secreção de Cr) — reavaliar ATB e volume",
      C: "Sempre amiloide por antibiótico",
      D: "Indicação de eculizumab"
    },
    correct: "B",
    explanation: "Vanco+Pip/Tazo preocupa por AKI; parte pode ser artefato de Cr. Pearl: Cr sobe nessa dupla = questione o regime. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "Vancomycin-piperacillin AKI literature; pediatric ASP."
  },
  {
    id: "NP-X122",
    tema: "Genética sindrômica",
    subtema: "Bardet-Biedl",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com obesidade, polidactilia, retinite pigmentar e DRC cística. Qual ciliopatia sindrômica?",
    options: {
      A: "Alport clássico — conduta/diagnóstico inadequado para o caso",
      B: "Bardet-Biedl — seguimento renal/sensorial multidisciplinar",
      C: "Doença de Dent — conduta/diagnóstico inadequado para o caso",
      D: "PSGN recorrente — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "BBS: ciliopatia com rim + olho + dígitos + peso. Pearl: polidactilia + retinopatia + rim = Bardet-Biedl. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Ciliopathy reviews; IPNA genetics."
  },
  {
    id: "NP-X123",
    tema: "Genética sindrômica",
    subtema: "Frasier vs Denys-Drash",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "Adolescente 46,XY com genitália feminina externa, SN por FSGS e risco de gonadoblastoma. Qual espectro WT1?",
    options: {
      A: "Apenas NPHS1 — conduta/diagnóstico inadequado para o caso",
      B: "Síndrome de Frasier (WT1) — gonadectomia profilática e manejo da nefropatia",
      C: "ADPKD — conduta/diagnóstico inadequado para o caso",
      D: "Gitelman — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Frasier: WT1 intron 9, FSGS + disgenesia gonadal. Pearl: FSGS + 46,XY feminino = WT1/Frasier. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "WT1 disorders; ISPAD/genetics nephrology."
  },
  {
    id: "NP-X124",
    tema: "Infecção e rim",
    subtema: "Esquistossomose / GN",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} de área endêmica com hematúria, eosinofilia e exposição a águas doces; US com alterações vesicais. Qual parasitose urogenital clássica?",
    options: {
      A: "Malária falciparum exclusivamente glomerular",
      B: "Esquistossomose (S. haematobium) — antiparasitário + avaliação urológica/renal",
      C: "Apenas ITU bacteriana sem parasitológico",
      D: "Amiloide familiar ATTR"
    },
    correct: "B",
    explanation: "S. haematobium: hematúria e fibrose urinária. Pearl: rio + hematúria + eosinofilia = esquistossoma. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "WHO schistosomiasis; tropical nephrology."
  },
  {
    id: "NP-X125",
    tema: "Metabólico",
    subtema: "Hiperuricemia no adolescente com DRC",
    dificuldade: "intermediario",
    age: 15,
    vars: {
      ua: 10.5
    },
    statement: "Adolescente de {{age}} com DRC, ácido úrico {{ua}} e artrite gotosa. Qual conduta faz sentido?",
    options: {
      A: "Ignorar ácido úrico em pediatria sempre",
      B: "Tratar ataque agudo adequadamente e considerar hipouricemiante crônico se gota/tófos, ajustando à TFG",
      C: "Alopurinol em megadose sem ajuste renal",
      D: "Corticoide intra-articular sem diagnóstico em toda dor"
    },
    correct: "B",
    explanation: "Gota pode ocorrer em DRC adolescente (ADTKD-UMOD também). Pearl: gota jovem = rim + genética na cabeça. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Pediatric gout/CKD; ADTKD notes."
  },
  {
    id: "NP-X126",
    tema: "Nutrição",
    subtema: "Potássio e alimentação familiar",
    dificuldade: "basico",
    age: 8,
    vars: {
      k: 5.7
    },
    statement: "{{sexWord}} de {{age}} em DRC com K {{k}}. A família quer “dieta zero fruta”. Qual orientação é mais adequada?",
    options: {
      A: "Proibir todas as frutas e vegetais indefinidamente",
      B: "Individualizar: preferir porções controladas, técnicas de remolho/fervura quando preciso, não destruir o padrão alimentar sem necessidade",
      C: "Salgadinhos processados são sempre mais seguros que fruta",
      D: "Resina de troca em todo K 5,0 assintomático sem revisar dieta/IECA"
    },
    correct: "B",
    explanation: "Dieta pediátrica deve preservar crescimento e qualidade. Pearl: eduque porções — não declare guerra à fruta. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "KDOQI pediatric nutrition; renal dietetics."
  },
  {
    id: "NP-X127",
    tema: "Ética / social",
    subtema: "Recusa vacinal e imunossupressão",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "Pais de criança de {{age}} com SN em MMF recusam vacinas inativadas indicadas. Qual postura ética/clínica?",
    options: {
      A: "Concordar em nunca vacinar e não documentar",
      B: "Educar sobre risco infeccioso, oferecer calendário adaptado, documentar recusa informada e manter vínculo — sem vacinas vivas sob IS",
      C: "Aplicar vacina viva à força no mesmo dia",
      D: "Suspender MMF secretamente"
    },
    correct: "B",
    explanation: "Autonomia dos pais com dever de informar riscos; nunca forçar viva sob IS. Pearl: documente, eduque, preserve o cuidado.",
    bibliography: "SBP immunization; ethics in pediatrics."
  },
  {
    id: "NP-X128",
    tema: "Transição",
    subtema: "Ferramentas de prontidão",
    dificuldade: "basico",
    age: 17,
    vars: {

    },
    statement: "Adolescente de {{age}} em Tx será transferido. Além do sumário médico, o que avalia prontidão?",
    options: {
      A: "Nada — idade cronológica basta",
      B: "Checklist de autocuidado (medicações, labs, sintomas de rejeição, sexualidade/contracepção, seguros/acesso) e visitas conjuntas ped-adulto",
      C: "Alta sem telefone do novo serviço",
      D: "Troca abrupta de todas as medicações no mesmo dia da transferência"
    },
    correct: "B",
    explanation: "Transição mede competências, não só aniversário de 18 anos. Pearl: se não sabe a dose do tacrolimus, não está pronto. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "Got Transition; IPNA/ISN transition."
  },
  {
    id: "NP-X129",
    tema: "Síndrome nefrótica",
    subtema: "Biopsia — indicações no primeiro episódio",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} no primeiro episódio de SN com hematúria macroscópica, HAS e C3 baixo. Qual conduta diagnóstica?",
    options: {
      A: "Corticoide empírico 6 meses sem biópsia apesar dos atípicos",
      B: "Biópsia precoce — idade/atipias (HAS, C3 baixo, macroscópica) fogem da LM clássica do pré-escolar",
      C: "Antibiótico isolado — conduta/diagnóstico inadequado para o caso",
      D: "Diálise sem investigação"
    },
    correct: "B",
    explanation: "Atipias = biopsie antes de rotular LM. Pearl: >12 anos ou C3 baixo no 1º episódio ≠ corticoide cego. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "IPNA SSNS/SRNS; KDIGO GN."
  },
  {
    id: "NP-X130",
    tema: "SHU / MAT",
    subtema: "Diferença STEC vs aHUS na decisão de C5i",
    dificuldade: "avancado",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAT e diarreia; PCR/STEC ainda pendente, gravidade neurológica flutuante. Qual raciocínio sobre eculizumab?",
    options: {
      A: "Eculizumab empírico em 100% das diarreias com MAT sem coletar STEC",
      B: "Priorizar suporte e etiologia (STEC); C5i se forte suspeita de atípica/gravidade selecionada e após discussão especializada — não atrasar diálise se indicada",
      C: "Corticoide substitui qualquer decisão",
      D: "Nunca dialisar antes do resultado do STEC"
    },
    correct: "B",
    explanation: "STEC-HUS = suporte; aHUS = C5i. Enquanto pendura, suporte/TSR não espera. Pearl: não atrase diálise por PCR. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "IPNA HUS algorithm; ESPGHAN."
  }
];

module.exports = { PED_MASTERS_EXTRA3 };
