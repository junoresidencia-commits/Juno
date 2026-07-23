/**
 * Casos-mestres — Nefrologia Pediátrica (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Sugere podocitopatia autoimune e apoia estratégias que incluem terapia anti-linfocítica B em casos selecionados refratários; ainda complementa; não substitui",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Anti-nefrina é biomarcador emergente de SN por lesão mínima/imune. Não exclui investigação genética em atípicos. Pearl: fator circulante voltou à SN pediátrica — mas biópsia/genética ainda mandam no SRNS. Gabarito detalhado: Sugere podocitopatia autoimune e apoia estratégias que incluem terapia anti-linfocítica B em casos selecionados refratários; ainda complementa — não substitui — a clínica e a genética quando indicada",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Ofatumumabe ou outro anti-CD20 humano em protocolo experiente, com monitorização de células B e hipogamaglobulinemia",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor.",
      C: "Pode haver hipovolemia intravascular: repor albumina iso-oncótica criteriosa + diurético cauteloso sob monitorização; evitar choque hipovolêmico",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "IgA sincroniza com a infecção e C3 costuma ser normal; PSGN é latente (1–3 sem) e C3 baixo — o tempo e o complemento orientam",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
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
      A: "Vacinação meningocócica (e profilaxia antibiótica quando a vacina ainda não cobre / início urgente) + educação da família sobre febre",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "DGKE pode responder mal ao bloqueio de C5; tratamento é individualizado (suporte ± outras estratégias) em centro de referência",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Lesão renal aguda (KDIGO), estágio conforme magnitude da Cr/oligúria — exige revisão de volume, nefrotóxicos e causa",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "C",
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
      A: "Pode causar hemólise em G6PD deficiente — rastrear risco, monitorar e preferir alternativas/cuidado se alta suspeita",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Circuncisão pode reduzir risco de ITU em meninos selecionados de alto risco — decisão compartilhada com urologia"
    },
    correct: "D",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Tratar disfunção vesical e intestinal (uroterapia, horários, constipação) — reduz ITU tanto quanto imaginar só “rim anômalo”"
    },
    correct: "D",
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
      A: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      B: "Alvo mais baixo (cerca do percentil 50 da PAM no ESCAPE) com IECA, reduzindo progressão vs alvo mais alto",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com.",
      D: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV"
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
      A: "Pode iniciar na fase conservadora quando fatores corrigíveis foram tratados e o déficit persiste — não esperar TSR",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "MAPA (monitorização ambulatorial de 24 h) — diagnostica HAS mascarada/jaleco branco e guia tratamento",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
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
      A: "Cisteamina colírio (além da sistêmica) para depósitos corneanos, com oftalmologia",
      B: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada",
      C: "Acidificar a urina e restringir água para “concentrar” o tratamento litolítico, com AINE contínuo",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício."
    },
    correct: "A",
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
      A: "Suspeitar tubulopatia por TDF: discutir troca (ex. TAF/outro esquema) com infectologia e repor perdas",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica"
    },
    correct: "A",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      B: "Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição",
      C: "Citrato de potássio (alcalinização/citraturia) + hidratação alta + sódio controlado",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver."
    },
    correct: "C",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      B: "Acidificar a urina e restringir água para “concentrar” o tratamento litolítico, com AINE contínuo",
      C: "Alopurinol/febuxostate + hidratação vigorosa; litíase pode recidivar no enxerto se não tratar",
      D: "Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição"
    },
    correct: "C",
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Mofetil micofenolato + corticoide (equivalência a CYC em muitos cenários) preservando fertilidade"
    },
    correct: "D",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Nefrite moderada/grave (proteinúria nefrótica, HAS, queda de TFG ou persistência) — biópsia guia IS",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão"
    },
    correct: "C",
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
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor.",
      B: "Uso altamente selecionado/especializado (dados pediátricos limitados vs adulto TEMPO/REPRISE); priorizar PA, hidratação e evitar nefrotóxicos",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor."
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Everolimus (mTOR) conforme critérios; embolização se hemorragia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
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
      A: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Evidência pediátrica ainda limitada; decisão individual em centro experiente após otimizar IECA — extrapolar adultos com cautela"
    },
    correct: "D",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Inflamação/infecção (acesso, periodonto), deficiência funcional de ferro, hiperpara, deficiência B12/folato, hemólise oculta",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor."
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      C: "Avaliar correção cirúrgica; temporariamente volumes menores/hemodiálise ponte se necessário",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de."
    },
    correct: "C",
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
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Indução com agente depletor ou timoglobulina/alternativas conforme protocolo de alto risco + manutenção tripla",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Risco de PTLD: reduzir imunossupressão e investigar linfoproliferação com oncologia/transplante",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão"
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      B: "Reposição de K (IV se grave/sintomático) sob monitorização, corrigir Mg se baixo, tratar causa",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      B: "Refeeding: repor P/K/Mg, iniciar calorias gradualmente e monitorar eletrólitos",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir."
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
      A: "Trombose aórtica/renal relacionada a cateter — Doppler e remover/ajustar dispositivo + anti-hipertensivo",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão"
    },
    correct: "A",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      C: "Nascidos muito prematuros têm risco de DRC/HAS — seguimento nefrológico, PA e crescimento",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e."
    },
    correct: "C",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Associação ligada a maior incidência de IRA (e possível pseudotoxicidade por inibição de secreção de Cr) — reavaliar ATB e volume",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Bardet-Biedl — seguimento renal/sensorial multidisciplinar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      C: "Síndrome de Frasier (WT1) — gonadectomia profilática e manejo da nefropatia. conduta preferencial neste contexto",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem."
    },
    correct: "C",
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
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      D: "Esquistossomose (S. haematobium) — antiparasitário + avaliação urológica/renal"
    },
    correct: "D",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Tratar ataque agudo adequadamente e considerar hipouricemiante crônico se gota/tófos, ajustando à TFG",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Individualizar: preferir porções controladas, técnicas de remolho/fervura quando preciso, não destruir o padrão alimentar sem necessidade"
    },
    correct: "D",
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Educar sobre risco infeccioso, oferecer calendário adaptado, documentar recusa informada e manter vínculo — sem vacinas vivas sob IS",
      C: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Checklist de autocuidado (medicações, labs, sintomas de rejeição, sexualidade/contracepção, seguros/acesso) e visitas conjuntas ped-adulto",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo",
      D: "Biópsia precoce — idade/atipias (HAS, C3 baixo, macroscópica) fogem da LM clássica do pré-escolar"
    },
    correct: "D",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar suporte e etiologia (STEC); C5i se forte suspeita de atípica/gravidade selecionada e após discussão especializada — não atrasar diálise se indicada",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
    explanation: "STEC-HUS = suporte; aHUS = C5i. Enquanto pendura, suporte/TSR não espera. Pearl: não atrase diálise por PCR. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "IPNA HUS algorithm; ESPGHAN."
  }
];

module.exports = { PED_MASTERS_EXTRA3 };
