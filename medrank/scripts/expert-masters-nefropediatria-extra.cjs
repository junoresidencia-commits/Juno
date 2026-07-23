/**
 * Casos-mestres — Nefrologia Pediátrica (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Evitar imunossupressão intensiva inútil; aconselhar genética familiar, suporte + IECA/BRA e considerar ensaios/terapia alvo conforme a variante; discutir prognóstico com a família",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
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
      A: "Rituximabe (anti-CD20) em centro experiente, com monitoramento de linfócitos B e risco infeccioso",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a."
    },
    correct: "A",
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
      A: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Vacinas vivas contraindicadas sob imunossupressão significativa; priorizar inativadas (influenza, pneumococo) e imunizar conviventes"
    },
    correct: "D",
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
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Suporte: restrição de sal/água, diurético, anti-hipertensivo; antibiótico se foco ativo; dialisar se indicação clássica",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
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
      A: "Biópsia renal e investigação de glomerulopatias C3-persistentes / outras GN. conduta preferencial neste contexto",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
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
      A: "Suporte intensivo (volume/eletrólitos/diálise se preciso); evitar antibiótico/antimotilidade de rotina na fase diarreica STEC",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
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
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      B: "Inibidor terminal do complemento (eculizumab/ravulizumab) + suporte, com vacinação meningocócica",
      C: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial."
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
      A: "PNH pode causar MAT/IRA; eculizumab/ravulizumab trata hemólise e protege rim; anticoagular conforme risco trombótico",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "A",
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
      A: "Reposição volêmica isotônica criteriosa e reavaliação; evitar diurético de alça antes de restaurar volume",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
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
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Hidratação vigorosa + hipouricêmico (alopurinol ou rasburicase conforme risco) e monitorização laboratorial seriada",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Profilaxia antibiótica contínua selecionada + seguimento urológico; considerar cirurgia se breakthroughs ou piora"
    },
    correct: "D",
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
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Iniciar agente estimulador de eritropoiese (EPO/darbepoetina) com alvo individualizado, evitando Hb excessiva",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "C",
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
      A: "Hormônio de crescimento recombinante (rhGH) sob protocolo nefropediátrico. conduta preferencial neste contexto",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se. estratégia que não aborda o mecanismo principal deste caso",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
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
      A: "Hipertensão renovascular (estenose); angiografia/angiorressonância ou Doppler especializado",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica."
    },
    correct: "A",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "IECA ou BRA (nefroproteção) + otimização de estilo de vida. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Acidose tubular renal distal (tipo 1). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Síndrome de Gitelman. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "C",
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
      A: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com melhor.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Diabetes insípido nefrogênico (ex.: AVPR2/AQP2). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor."
    },
    correct: "C",
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Hiperidratação + alcalinização urinária + tiopronina/D-penicilamina se preciso; orientar sódio/metionina com nutricionista",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
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
      A: "Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      C: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada",
      D: "Alta ingestão hídrica + restrição de sódio; tiazídico se persistir sintomática/cálculos"
    },
    correct: "D",
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
      A: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      C: "Cintilografia DMSA. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
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
      A: "Enterobactérias (E. coli) com agente parenteral adequado à gravidade e epidemiologia local",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica."
    },
    correct: "A",
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
      A: "Mofetil micofenolato ou ciclofosfamida + glicocorticoide; considerar belimumabe/outros conforme contexto",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico. estratégia que não aborda o mecanismo principal deste caso",
      B: "MMF ou ciclofosfamida/CNI + antiproteinúrico; esteroides conforme protocolo. conduta preferencial neste contexto",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de. estratégia que não aborda o mecanismo principal deste caso",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso"
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Vasculite IgA (Schönlein-Henoch); biópsia se nefrite grave/persistente ou dúvida diagnóstica",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica."
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com.",
      C: "Rituximabe ou ciclofosfamida + corticoides; plasmaférese em indicações selecionadas (ex. hemorragia alveolar grave)",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Fibrose hepática congênita / ectasia de ductos biliares. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
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
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Controle rigoroso da PA (IECA/BRA se proteinúria/HAS) + hidratação + evitar nefrotóxicos; aconselhar genética/imagem seriada",
      D: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor."
    },
    correct: "C",
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
      A: "Nefronoptise (doença cística medular). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      D: "COL4A5 (colágeno IV α5). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "IECA (ou BRA) precocemente, mesmo com PA ainda normal-alta. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "C",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Cultura do efluente + antibiótico intraperitoneal empírico cobrindo gram+/gram− conforme protocolo pediátrico",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido"
    },
    correct: "C",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Fístula arteriovenosa autógena. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese."
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
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      D: "Profilaxia antiviral (ex. valganciclovir) por período protocolar + monitoramento"
    },
    correct: "D",
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
      A: "Biópsia do enxerto para diferenciar rejeição, toxicidade, BK e recidiva. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar. estratégia que não aborda o mecanismo principal deste caso",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento. estratégia que não aborda o mecanismo principal deste caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
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
      A: "Gluconato de cálcio IV (com monitorização) enquanto prepara shift e remoção de K",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem."
    },
    correct: "A",
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
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Bolus de solução salina hipertônica para interromper sintomas graves, depois correção controlada",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Monitorar balanço hídrico/eletrólitos, evitar nefrotóxicos e indicar diálise se critérios (hiperK refratária, sobrecarga, uremia)",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "C",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      B: "Válvula de uretra posterior — desobstrução urgente (sonda/vesicostomia/ablação) + suporte renal",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Necrose tubular aguda tóxica por aminoglicosídeo. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
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
      A: "Inibição de prostaglandinas → perda de vasodilatação aferente em estado de baixo volume efetivo",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial."
    },
    correct: "A",
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
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      C: "Perda de peso + IECA/BRA se proteinúria/HAS + manejo da síndrome metabólica. conduta preferencial neste contexto",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      C: "Suporte da IRA, evitar nefrotóxicos, tratar doença de base; imunossupressão só se glomerulopatia específica indicada",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com."
    },
    correct: "C",
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
      A: "Programa estruturado de educação em autocuidado, adesão e transferência planejada de dados clínicos",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Evitar restrição proteica severa que prejudique crescimento; priorizar calorias adequadas e controlar fósforo/potássio conforme labs",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "B",
    explanation: "Em pediatria, crescimento supera restrição proteica agressiva estilo adulto. Pearl: criança com DRC precisa crescer — não “low protein” extremo.",
    bibliography: "KDOQI pediatric nutrition; IPNA CKD nutrition."
  }
];

module.exports = { PED_MASTERS_EXTRA };
