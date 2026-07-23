/**
 * Masters EXPERT — Residência (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const RES_MASTERS = [
  {
    id: "RES-CM001",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "Sepse — bundle 1h",
    dificuldade: "basico",
    age: 62,
    vars: {
      lactato: 4.2
    },
    statement: "{{sexWord}} de {{age}} com pneumonia, PA 85/50, lactato {{lactato}}, confusão. Qual prioridade na 1ª hora?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com.",
      C: "Coletar culturas, antibiótico IV precoce, reposição volêmica com cristaloide e reavaliar perfusão (bundle de sepse)",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica"
    },
    correct: "C",
    explanation: "Sepse/choque séptico: antibiótico precoce + volume + culturas. Atraso de ATB aumenta mortalidade. Pearl: hora 1 salva — não espere a cultura.",
    bibliography: "SSC Surviving Sepsis 2021"
  },
  {
    id: "RES-CM002",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "Meningite bacteriana",
    dificuldade: "intermediario",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, rigidez de nuca e petéquias. Qual conduta imediata?",
    options: {
      A: "Estabilizar, ATB empírico imediato (e corticoide se indicado) — não atrasar ATB se PL demorar; isolar gotículas conforme protocolo",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "TC de crânio em todo paciente antes de qualquer medida, mesmo sem sinais focais e com atraso de horas. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Meningite meningocócica/bacteriana: ATB não espera PL se houver atraso. Pearl: petéquia + nuca = ATB já. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "IDSA bacterial meningitis"
  },
  {
    id: "RES-CM003",
    specialty: "Clínica Médica",
    tema: "Pneumologia",
    subtema: "Asma — exacerbação grave",
    dificuldade: "intermediario",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com asma, FR 34, Sat 88% AA, fala entrecortada. Conduta inicial?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "O2, beta-agonista nebulizado + ipratrópio, corticoide sistêmico precoce; considerar MgSO4 IV se grave; IOT se falência",
      D: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação Esta abordagem atrasa a terapia com melhor.",
      E: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor."
    },
    correct: "C",
    explanation: "Exacerbação grave: broncodilatador + corticoide sistêmico são pilares. Pearl: corticoide cedo reduz internação.",
    bibliography: "GINA; BTS/SIGN asthma"
  },
  {
    id: "RES-CM004",
    specialty: "Clínica Médica",
    tema: "Pneumologia",
    subtema: "DPOC — exacerbação",
    dificuldade: "intermediario",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DPOC, aumento de dispneia/escarro purulento, pH 7,28, pCO2 68. Conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Broncodilatadores, corticoide sistêmico, ATB se indicação, O2 com alvo Sat 88–92% e VNI se acidose hipercápnica",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "GOLD: VNI na acidose hipercápnica; O2 titulado. Pearl: Sat 100% pode piorar o DPOC. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "GOLD report"
  },
  {
    id: "RES-CM005",
    specialty: "Clínica Médica",
    tema: "Endocrinologia",
    subtema: "CAD",
    dificuldade: "intermediario",
    age: 24,
    vars: {
      glic: 480
    },
    statement: "{{sexWord}} de {{age}} com DM1, glicemia {{glic}}, pH 7,12, cetonas altas, K 3,2. Sequência correta?",
    options: {
      A: "Volume com SF, repor K agressivamente (evitar insulina se K muito baixo), depois insulina IV e transição quando fechar gap/cetose",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "A",
    explanation: "CAD: volume → K → insulina. Insulina com K baixo precipita arritmia. Pearl: K 3,2 — reponha antes de bombear insulina.",
    bibliography: "ADA hyperglycemic crises"
  },
  {
    id: "RES-CM006",
    specialty: "Clínica Médica",
    tema: "Endocrinologia",
    subtema: "Estado hiperosmolar",
    dificuldade: "avancado",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DM2, glicemia 900, osmolaridade alta, sem cetose significativa, desidratação grave. Conduta?",
    options: {
      A: "Reposição volêmica cuidadosa (principal), insulina em doses menores que na CAD, vigiar Na corrigido e trombose",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "A",
    explanation: "HHS: volume é o protagonista; insulina após estabilizar. Pearl: HHS mata por desidratação/trombose, não por cetona.",
    bibliography: "ADA HHS"
  },
  {
    id: "RES-CM007",
    specialty: "Clínica Médica",
    tema: "Gastroenterologia",
    subtema: "HDA varicosa",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com hematêmese, PA 90/60. Conduta inicial? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "ABC, volume/hemoderivados criteriosos, vasoconstritor (terlipressina/octreotide), ATB profilático e endoscopia precoce"
    },
    correct: "E",
    explanation: "Varizes: vasoativo + ATB + endoscopia. Pearl: cirrótico que sangra — ATB reduz mortalidade. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "Baveno; AASLD portal hypertension"
  },
  {
    id: "RES-CM008",
    specialty: "Clínica Médica",
    tema: "Gastroenterologia",
    subtema: "Pancreatite aguda",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor em cinturão, lipase 8×, TC sem necrose infectada. Conduta?",
    options: {
      A: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Jejum relativo/suporte, hidratação, analgesia, realimentação precoce se tolerar; ATB só se infecção; CPRE se colangite/obstrução",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "Pancreatite: suporte + ATB seletivo. Pearl: ATB profilático não é rotina. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACG pancreatitis guidelines"
  },
  {
    id: "RES-CM009",
    specialty: "Clínica Médica",
    tema: "Hematologia",
    subtema: "TEP — estratificação",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TEP confirmado, PA estável, troponina elevada e VD dilatado no eco. Classificação e conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      E: "TEP de risco intermediário: anticoagular; trombólise sistêmica reservada a choque/deterioração"
    },
    correct: "E",
    explanation: "Intermediário: anticoagula; lise se instabilizar. Pearl: troponina+ ≠ lise automática. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC PE guidelines"
  },
  {
    id: "RES-CM010",
    specialty: "Clínica Médica",
    tema: "Hematologia",
    subtema: "Anemia ferropriva",
    dificuldade: "basico",
    age: 42,
    vars: {
      hb: 8.2
    },
    statement: "Mulher de {{age}} com Hb {{hb}}, VCM baixo, ferritina baixa, sem sangramento óbvio. Conduta?",
    options: {
      A: "Repor ferro e investigar causa (GI/genital); transfusão só se instável/sintomas graves",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "A",
    explanation: "Ferropriva: trate ferro + causa. Pearl: mulher em idade fértil — pergunte menstruação e pense GI se atípico. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "British guidelines iron deficiency"
  },
  {
    id: "RES-CM011",
    specialty: "Clínica Médica",
    tema: "Reumatologia",
    subtema: "Artrite gotosa aguda",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com podagra, ácido úrico alto. Ataque agudo — tratamento? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Iniciar alopurinol no pico da crise como monoterapia sem anti-inflamatório. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Anti-inflamatório (AINE/colchicina/corticoide) no ataque; hipouricemiante crônico após, com cobertura",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "D",
    explanation: "Ataque: anti-inflamatório; não comece alopurinol sozinho no pico. Pearl: sepse articular primeiro se dúvida. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACR gout"
  },
  {
    id: "RES-CM012",
    specialty: "Clínica Médica",
    tema: "Reumatologia",
    subtema: "AR — DMARD",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com AR recém-diagnosticada, atividade moderada. Primeira linha?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a.",
      B: "Metotrexato (salvo contraindicação) + medidas sintomáticas; escalar se não atingir alvo",
      C: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático",
      D: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e."
    },
    correct: "B",
    explanation: "Treat-to-target: MTX é âncora. Pearl: AINE não modifica doença. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACR/EULAR RA"
  },
  {
    id: "RES-CM013",
    specialty: "Clínica Médica",
    tema: "Neurologia",
    subtema: "AVC isquêmico — trombólise",
    dificuldade: "avancado",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com déficit focal há 1h20, TC sem sangue, NIHSS 12. Conduta?",
    options: {
      A: "Avaliar critérios de trombólise IV (alteplase/tenecteplase) e trombectomia se oclusão grande vaso",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "A",
    explanation: "Janela: trombólise/trombectomia mudam desfecho. Pearl: tempo é cérebro — protocolo stroke. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AHA/ASA stroke"
  },
  {
    id: "RES-CM014",
    specialty: "Clínica Médica",
    tema: "Neurologia",
    subtema: "Status epilepticus",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em convulsão há 10 min. Sequência? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "ABC, benzodiazepínico IV/IM precoce, depois ASE (fenitoína/fosfenitoína/valproato/levetiracetam) se persistir",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Status: benzo primeiro. Pearl: minutos importam — não “só observa”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AES status epilepticus"
  },
  {
    id: "RES-CM015",
    specialty: "Clínica Médica",
    tema: "Nefrologia clínica",
    subtema: "IRA pré-renal",
    dificuldade: "basico",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} desidratado, Cr sobe, FENa baixa, US sem dilatação. Conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      D: "Reposição volêmica, tratar causa, evitar nefrotóxicos; diálise se indicações clássicas",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade."
    },
    correct: "D",
    explanation: "Pré-renal: volume. Pearl: FENa baixa + sede = reidrate. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "KDIGO AKI"
  },
  {
    id: "RES-CM016",
    specialty: "Clínica Médica",
    tema: "Nefrologia clínica",
    subtema: "Hipercalemia ECG",
    dificuldade: "basico",
    age: 60,
    vars: {
      k: 7.6
    },
    statement: "{{sexWord}} de {{age}} com K {{k}}, QRS alargado. Primeira medida? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      D: "Gluconato de cálcio IV para estabilizar membrana, depois shift e remoção de K",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade."
    },
    correct: "D",
    explanation: "ECG alterado: cálcio IV primeiro. Pearl: membrana → shift → remove. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "Emergency electrolyte protocols"
  },
  {
    id: "RES-CM017",
    specialty: "Clínica Médica",
    tema: "Cardiologia clínica",
    subtema: "SCA — AAS",
    dificuldade: "basico",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor torácica tipica, ECG com supra de ST. Conduta imediata além de reperfusão?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "AAS mastigável imediato, anticoagulação conforme protocolo e reperfusão urgente (ICP/primária ou trombólise se sem ICP)"
    },
    correct: "E",
    explanation: "IAMCST: AAS + reperfusão. Pearl: não espere troponina para AAS e ativar sala. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC/AHA ACS"
  },
  {
    id: "RES-CM018",
    specialty: "Clínica Médica",
    tema: "Cardiologia clínica",
    subtema: "IC descompensada",
    dificuldade: "intermediario",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IC, ortopneia, crepitações, PA 150/90. Conduta inicial?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      E: "Diurético IV, O2/VNI se preciso, vasodilatador se PA permitir; investigar gatilho"
    },
    correct: "E",
    explanation: "Congestão: diurético ± VNI. Pearl: choque frio ≠ vasodilatador livre. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC HF"
  },
  {
    id: "RES-CM019",
    specialty: "Clínica Médica",
    tema: "Endocrinologia",
    subtema: "Tireotoxicose / tempestade",
    dificuldade: "avancado",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Basedow, febre, taquicardia, alteração mental. Conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "UTI, betabloqueador, tionamida, iodo após tionamida, corticoide; tratar gatilho",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver."
    },
    correct: "D",
    explanation: "Tempestade tireotóxica: bloqueio adrenérgico + síntese + liberação. Pearl: iodo depois da tionamida. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATA thyrotoxicosis"
  },
  {
    id: "RES-CM020",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "TB pulmonar",
    dificuldade: "intermediario",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com tosse >3 sem, sudorese, cavernas no ápice, BAAR+. Conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      B: "RIPE (esquema básico) sob estratégia DOTS/TDO, isolamento respiratório inicial",
      C: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      E: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana"
    },
    correct: "B",
    explanation: "TB: RIPE e tratamento supervisionado. Pearl: BAAR+ = isolar e tratar. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "OMS/MS Brasil TB"
  },
  {
    id: "RES-CM021",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "HIV — início TARV",
    dificuldade: "intermediario",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HIV novo, CD4 180, assintomático. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      C: "Iniciar TARV o mais breve possível + profilaxia de PCP (CD4 <200) e aconselhamento",
      D: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou."
    },
    correct: "C",
    explanation: "TARV para todos; PCP se CD4 <200. Pearl: não espere o CD4 despencar. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "DHHS/MS HIV"
  },
  {
    id: "RES-CM022",
    specialty: "Clínica Médica",
    tema: "Gastroenterologia",
    subtema: "H. pylori",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com úlcera péptica e teste positivo para H. pylori. Conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Terapia de erradicação (ex. IBP + antibióticos conforme protocolo local) e confirmação de cura em selecionados"
    },
    correct: "E",
    explanation: "Úlcera + H. pylori = erradicar. Pearl: IBP sozinho não basta. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACG H. pylori"
  },
  {
    id: "RES-CM023",
    specialty: "Clínica Médica",
    tema: "Pneumologia",
    subtema: "Derrame parapneumônico",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pneumonia e derrame loculado, pH do líquido 7,0, LDH alta. Conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      C: "Drenagem (tórax) + ATB; considerar fibrinolítico/cirurgia se loculado/empieza",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas."
    },
    correct: "C",
    explanation: "Parapneumônico complicado/empiema drena. Pearl: pH baixo no derrame = dreno. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "BTS pleural disease"
  },
  {
    id: "RES-CM024",
    specialty: "Clínica Médica",
    tema: "Hematologia",
    subtema: "PTT",
    dificuldade: "avancado",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAHA, plaquetopenia, confusão, ADAMTS13 <10%. Conduta?",
    options: {
      A: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Plasmaférese urgente + imunossupressão (corticoide ± rituximabe); caplacizumab em protocolos",
      E: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação"
    },
    correct: "D",
    explanation: "PTT: PLEX imediato. Pearl: não espere ADAMTS13 para começar se alta suspeita. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ISTH TTP"
  },
  {
    id: "RES-CM025",
    specialty: "Clínica Médica",
    tema: "Reumatologia",
    subtema: "LES — nefrite suspeita",
    dificuldade: "intermediario",
    age: 27,
    vars: {

    },
    statement: "Mulher de {{age}} com LES, proteinúria, hematúria dismórfica, C3 baixo. Próximo passo?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      E: "Quantificar proteinúria, função renal e biópsia para classificar/induzir terapia"
    },
    correct: "E",
    explanation: "Suspeita de LN → biópsia guia. Pearl: sedimento ativo no LES = rim na mesa. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "KDIGO LN; EULAR"
  },
  {
    id: "RES-CM026",
    specialty: "Clínica Médica",
    tema: "Neurologia",
    subtema: "Cefaleia — alarme",
    dificuldade: "basico",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com “pior cefaleia da vida” súbita, rigidez de nuca. Conduta?",
    options: {
      A: "TC imediata (± PL se TC normal) para HSA; estabilização neurocrítica. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "Thunderclap = HSA até prova em contrário. Pearl: a pior dor da vida não é sinusite. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AHA SAH"
  },
  {
    id: "RES-CM027",
    specialty: "Clínica Médica",
    tema: "Endocrinologia",
    subtema: "Hipotireoidismo / mixedema",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hipotireoidismo, hipotermia, sonolência, Na baixo. Conduta?",
    options: {
      A: "UTI, T4 IV (± T3 em protocolos), corticoide se risco de insuficiência adrenal, suporte",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de."
    },
    correct: "A",
    explanation: "Coma mixedematoso: hormônio IV + suporte. Pearl: pense adrenal junto. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATA hypothyroidism"
  },
  {
    id: "RES-CM028",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "Celulite vs erisipela",
    dificuldade: "basico",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com placa eritematosa dolorosa bem delimitada em membro, febre. Conduta?",
    options: {
      A: "Antibiótico cobrindo estreptococo/staph conforme gravidade; elevar membro e reavaliar",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no.",
      D: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios."
    },
    correct: "A",
    explanation: "Erisipela/celulite: ATB anti-gram+. Pearl: limite nítido + febre = estreptococo até prova. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "IDSA SSTI"
  },
  {
    id: "RES-CM029",
    specialty: "Clínica Médica",
    tema: "Pneumologia",
    subtema: "Asma — controle crônico",
    dificuldade: "basico",
    age: 22,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com asma persistente, uso frequente de SABA. Base do tratamento de manutenção?",
    options: {
      A: "Corticoide inalatório (± LABA) conforme GINA; educar técnica e adesão; plano de crise",
      B: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção.",
      E: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável"
    },
    correct: "A",
    explanation: "Manutenção = CSI. Pearl: SABA demais = asma mal controlada. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "GINA"
  },
  {
    id: "RES-CM030",
    specialty: "Clínica Médica",
    tema: "Gastroenterologia",
    subtema: "Doença diverticular complicada",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor em FID, febre, TC com abscesso diverticular de 4 cm. Conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "ATB + drenagem percutânea se acessível; cirurgia se peritonite/falha. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Abscesso: ATB ± drenagem. Pearl: não colonoscopa no abscesso agudo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WSES diverticulitis"
  },
  {
    id: "RES-CM031",
    specialty: "Clínica Médica",
    tema: "Hematologia",
    subtema: "TVP — anticoagulação",
    dificuldade: "basico",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TVP de MMII proximal sem câncer. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Anticoagulação (DOAC ou AVK/HBPM conforme contexto) por pelo menos 3 meses; investigar provocação",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "D",
    explanation: "TVP proximal: anticoagula ≥3 meses. Pearl: meia não substitui anticoagulante. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ASH/ESC VTE"
  },
  {
    id: "RES-CM032",
    specialty: "Clínica Médica",
    tema: "Neurologia",
    subtema: "Miastenia — crise",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com miastenia, dispneia e fraqueza bulbar. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Avaliar capacidade vital/via aérea, UTI, IgIV ou plasmaférese; corticoide com cuidado; evitar fármacos agravantes",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com."
    },
    correct: "C",
    explanation: "Crise miastênica = via aérea + imunoterapia. Pearl: CV caindo = UTI. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "International MG guidance"
  },
  {
    id: "RES-CM033",
    specialty: "Clínica Médica",
    tema: "Infectologia",
    subtema: "ITU complicada / pielonefrite",
    dificuldade: "basico",
    age: 45,
    vars: {

    },
    statement: "Mulher de {{age}} com febre, PPL, leucocitúria. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      B: "ATB empírico adequado à gravidade (oral se estável / IV se tóxico), urocultura e reavaliação",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "B",
    explanation: "Pielonefrite: ATB + cultura. Pearl: febre + PPL não é cistite simples. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "IDSA UTI"
  },
  {
    id: "RES-CM034",
    specialty: "Clínica Médica",
    tema: "Endocrinologia",
    subtema: "Hipoglicemia grave",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} diabético inconsciente, HGT 38. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      E: "Glicose IV (ou glucagon se sem acesso) e reavaliar causa/doses de hipoglicemiantes"
    },
    correct: "E",
    explanation: "Hipoglicemia grave: glicose/glucagon. Pearl: inconsciente ≠ suco oral. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ADA standards"
  },
  {
    id: "RES-CM035",
    specialty: "Clínica Médica",
    tema: "Cardiologia clínica",
    subtema: "Fibrilação atrial — ritmo vs frequência",
    dificuldade: "intermediario",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA há >48 h, estável, CHA₂DS₂-VASc alto. Conduta sobre cardioversão?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Controlar frequência, anticoagular; cardioversão eletiva após anticoagulação adequada ou ecoTE sem trombo"
    },
    correct: "E",
    explanation: "FA >48 h: trombo é risco — anticoagule/ecoTE. Pearl: não “choque” sem proteger cérebro. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-PD001",
    specialty: "Pediatria",
    tema: "Infectologia",
    subtema: "Bronquiolite",
    dificuldade: "basico",
    age: 0.6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sibilância, coriza, Sat 91%. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      B: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      D: "Suporte: O2 se hipoxemia, hidratação, aspiração nasal; evitar terapias inúteis de rotina",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de."
    },
    correct: "D",
    explanation: "Bronquiolite: suporte. Pearl: sibilância no lactente ≠ asma com CSI sistêmico. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP bronchiolitis"
  },
  {
    id: "RES-PD002",
    specialty: "Pediatria",
    tema: "Infectologia",
    subtema: "Laringite / crupe",
    dificuldade: "basico",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com tosse metálica, estridor em repouso leve. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      E: "Corticoide (dexametasona) ± adrenalina nebulizada se estridor em repouso; oxigênio se preciso"
    },
    correct: "E",
    explanation: "Crupe: dexametasona ± adrenalina. Pearl: estridor em repouso = trate e observe. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP/CPS croup"
  },
  {
    id: "RES-PD003",
    specialty: "Pediatria",
    tema: "Infectologia",
    subtema: "Otite média aguda",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com otalgia, timpano abaulado, febre. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Analgesia; ATB imediato em <6 meses/grave ou observação vigilante selecionada ≥6 meses conforme diretriz",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "OMA: dor primeiro; ATB conforme idade/gravidade. Pearl: abaulamento + dor = OMA, não “otite externa”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP AOM"
  },
  {
    id: "RES-PD004",
    specialty: "Pediatria",
    tema: "Infectologia",
    subtema: "Pneumonia comunitária",
    dificuldade: "intermediario",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, taquipneia, tiragem. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Oxigênio se preciso, ATB empírico (amoxicilina na maioria ambulatorial), sinais de gravidade para internar",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "PAC pediátrica: amoxicilina é rainha ambulatorial. Pearl: taquipneia manda mais que ausculta. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WHO/SBP pneumonia"
  },
  {
    id: "RES-PD005",
    specialty: "Pediatria",
    tema: "Gastroenterologia",
    subtema: "Diarreia aguda / desidratação",
    dificuldade: "basico",
    age: 1.5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com GECA, olhos fundos, turgor diminuído. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Trousseau/soro de reidratação oral se possível; IV se grave; zinco em contextos; evitar antimotilidade",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "C",
    explanation: "Desidratação: TRO/IV. Pearl: antimotilidade não é para lactente. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WHO diarrhea; SBP"
  },
  {
    id: "RES-PD006",
    specialty: "Pediatria",
    tema: "Endocrinologia",
    subtema: "CAD pediátrica",
    dificuldade: "avancado",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com CAD, K 3,0. Risco da insulina precoce? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Piora da hipocalemia e arritmia — repor K e seguir protocolo pediátrico de CAD (volume cuidadoso, evitar queda rápida de glicose/Na)",
      B: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
    explanation: "CAD ped: cuidado com K e edema cerebral. Pearl: K baixo — não comece insulina ainda. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ISPAD DKA"
  },
  {
    id: "RES-PD007",
    specialty: "Pediatria",
    tema: "Neurologia",
    subtema: "Crise febril",
    dificuldade: "basico",
    age: 1.8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com crise tônico-clônica <5 min no pico febril, exame normal depois. Conduta?",
    options: {
      A: "EEG e anticonvulsivante crônico de rotina em toda crise febril simples. estratégia que não aborda o mecanismo.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Orientação, investigar foco febril, sem anticonvulsivante crônico na crise febril simples típica"
    },
    correct: "E",
    explanation: "Crise febril simples: tranquilize e trate a febre/foco. Pearl: não medicalize o simples. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP febrile seizures"
  },
  {
    id: "RES-PD008",
    specialty: "Pediatria",
    tema: "Neonatologia",
    subtema: "Icterícia neonatal",
    dificuldade: "intermediario",
    age: 0.1,
    vars: {

    },
    statement: "RN de {{age}} com bilirrubina em zona de fototerapia. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Fototerapia conforme nomograma, garantir ingestão, investigar hemólise/incompatibilidade se precoce/grave"
    },
    correct: "E",
    explanation: "Icterícia: nomograma + fototerapia. Pearl: precoce/grave = pense hemólise. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP hyperbilirubinemia"
  },
  {
    id: "RES-PD009",
    specialty: "Pediatria",
    tema: "Nefrologia pediátrica",
    subtema: "ITU febril lactente",
    dificuldade: "intermediario",
    age: 0.5,
    vars: {

    },
    statement: "Lactente de {{age}} febril sem foco, urina alterada. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso",
      B: "Coleta fiável (cateter/punção), ATB, e imagem conforme risco (US ± outros). conduta preferencial neste contexto",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar. estratégia que não aborda o mecanismo principal deste caso",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "ITU febril: amostra boa + ATB. Pearl: saco coletor mente. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP UTI"
  },
  {
    id: "RES-PD010",
    specialty: "Pediatria",
    tema: "Imunização",
    subtema: "Calendário — atraso",
    dificuldade: "basico",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com vacinas atrasadas, saudável. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "Usar esquema de recuperação (catch-up) sem reiniciar doses válidas já aplicadas",
      E: "Aplicar todas as vacinas vivas no mesmo dia em imunodeprimido grave. estratégia que não aborda o mecanismo."
    },
    correct: "D",
    explanation: "Catch-up: não zere o cartão. Pearl: dose válida conta. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "SBP/PNI"
  },
  {
    id: "RES-PD011",
    specialty: "Pediatria",
    tema: "Cardiologia pediátrica",
    subtema: "Sopro inocente vs patológico",
    dificuldade: "intermediario",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sopro suave 1–2/6, vibratório, sem sintomas, crescimento normal. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Sopro inocente provável — exame clínico cuidadoso; eco se sinais de alarme (sintomas, sopro diastólico/alto grau, cianose, falha ponderal)"
    },
    correct: "E",
    explanation: "Inocente é comum; alarme manda ao eco. Pearl: diastólico nunca é “inocente”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AHA pediatric murmur"
  },
  {
    id: "RES-PD012",
    specialty: "Pediatria",
    tema: "Endocrinologia",
    subtema: "Puberdade precoce",
    dificuldade: "avancado",
    age: 7,
    vars: {

    },
    statement: "Menina de {{age}} com telarca progressiva e idade óssea avançada. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas",
      C: "Avaliar puberdade central vs periférica (LH/GnRH, imagem se indicada) e considerar análogo de GnRH se central progressiva",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "C",
    explanation: "Puberdade precoce: classifique e trate central quando progressiva. Pearl: idade óssea conta. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESPE puberty"
  },
  {
    id: "RES-PD013",
    specialty: "Pediatria",
    tema: "Pneumologia",
    subtema: "Asma pediátrica — crise",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com crise de asma, Sat 90%. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para. estratégia que não aborda o mecanismo principal deste caso",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao. estratégia que não aborda o mecanismo principal deste caso",
      E: "SABA ± ipratrópio, O2, corticoide sistêmico precoce; reavaliar resposta. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Crise: SABA + corticoide. Pearl: resposta em 1 h define destino. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "GINA children"
  },
  {
    id: "RES-PD014",
    specialty: "Pediatria",
    tema: "Infectologia",
    subtema: "Sarampo — suspeita",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, tosse, coriza, conjuntivite e exantema cefalocaudal. Conduta?",
    options: {
      A: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável",
      B: "Isolamento, notificação, vitamina A conforme protocolo, suporte e vacinação de contatos elegíveis",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial."
    },
    correct: "B",
    explanation: "Sarampo: isolamento + notificação + vitamina A. Pearl: 3C + exantema = pense sarampo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CDC/MS measles"
  },
  {
    id: "RES-PD015",
    specialty: "Pediatria",
    tema: "Gastroenterologia",
    subtema: "Invaginação",
    dificuldade: "avancado",
    age: 1.2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com choro intermitente, fezes em geleia de morango e massa palpável. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção.",
      B: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas",
      C: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado",
      D: "Estabilizar e enema/redução radiológica ou cirurgia conforme disponibilidade/gravidade",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e."
    },
    correct: "D",
    explanation: "Invaginação: emergência — reduzir. Pearl: geleia de morango = urgência. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "pediatric surgery texts"
  },
  {
    id: "RES-PD016",
    specialty: "Pediatria",
    tema: "Hematologia",
    subtema: "Púrpura de Henoch-Schönlein",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com púrpura palpável em MMII, artralgia e dor abdominal. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas",
      E: "Suporte; monitorar urina/PA; corticoide pode ajudar dor abdominal grave; biópsia renal se nefrite significativa"
    },
    correct: "E",
    explanation: "HSP: suporte + olho no rim. Pearl: púrpura em MMII = urina no retorno. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "SHARE IgA vasculitis"
  },
  {
    id: "RES-PD017",
    specialty: "Pediatria",
    tema: "Neonatologia",
    subtema: "Sepse neonatal precoce",
    dificuldade: "avancado",
    age: 0.05,
    vars: {

    },
    statement: "RN de {{age}} com taquipneia, má perfusão, fator de risco intraparto. Conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      B: "Culturas + ATB empírico precoce (ampicilina+gentamicina típico) e suporte. conduta preferencial neste contexto",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Sepse neonatal: ATB cedo. Pearl: RN “não parece bem” + risco = trate. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "COFN/AAP neonatal sepsis"
  },
  {
    id: "RES-PD018",
    specialty: "Pediatria",
    tema: "Nutrição",
    subtema: "Aleitamento / icterícia do leite",
    dificuldade: "basico",
    age: 0.4,
    vars: {

    },
    statement: "Lactente de {{age}} em aleitamento exclusivo, ganho ponderal bom, bilirrubina moderada tardia. Conduta?",
    options: {
      A: "Manter aleitamento, acompanhar bilirrubina/peso; fototerapia se critérios; investigar se atípico",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a."
    },
    correct: "A",
    explanation: "Icterícia do leite: raramente exige desmame. Pearl: peso subindo = peito continua. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AAP breastfeeding/jaundice"
  },
  {
    id: "RES-PD019",
    specialty: "Pediatria",
    tema: "Nefrologia pediátrica",
    subtema: "Síndrome nefrótica idiopática",
    dificuldade: "intermediario",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com edema, albúmina baixa, proteinúria nefrótica, C3 normal. Conduta inicial típica?",
    options: {
      A: "Corticoide oral em esquema padronizado se quadro típico; biópsia se atípico. conduta preferencial neste contexto",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso",
      C: "Biópsia imediata em todo pré-escolar típico antes de corticoide. estratégia que não aborda o mecanismo.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "SN típica 1–12 anos: corticoide empírico. Pearl: atípico → biopsie. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "IPNA SSNS"
  },
  {
    id: "RES-PD020",
    specialty: "Pediatria",
    tema: "Emergência",
    subtema: "Anafilaxia",
    dificuldade: "basico",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com urticária, broncoespasmo e hipotensão após alimento. Conduta?",
    options: {
      A: "Adrenalina IM imediata na face anterolateral da coxa, O2, volume; reavaliação e observação",
      B: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Anafilaxia: adrenalina IM primeiro. Pearl: anti-histamínico não salva via aérea. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WAO anaphylaxis"
  },
  {
    id: "RES-CG001",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "ATLS — vias aéreas",
    dificuldade: "basico",
    age: 30,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} politraumatizado, Glasgow 7, sangramento facial. Prioridade?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Via aérea com proteção cervical (IOT) e ventilação — ABC do trauma. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "ATLS: A vem primeiro. Pearl: Glasgow ≤8 — intube. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATLS"
  },
  {
    id: "RES-CG002",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Choque hemorrágico",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com trauma abdominal, PA 80/40, pele fria. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Controle de hemorragia, reposição sangue/produto (1:1:1) e cirurgia/angioembolização conforme foco"
    },
    correct: "E",
    explanation: "Choque hemorrágico: pare o sangramento + sangue. Pearl: pressórico sem sangue não é trauma care. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATLS; damage control"
  },
  {
    id: "RES-CG003",
    specialty: "Cirurgia",
    tema: "Abdômen agudo",
    subtema: "Apendicite",
    dificuldade: "basico",
    age: 22,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor migratória para FID, febre baixa, Blumberg+. Conduta?",
    options: {
      A: "Cirurgia (apendicectomia) após avaliação/imagem se dúvida; ATB perioperatório",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia."
    },
    correct: "A",
    explanation: "Apendicite: operar. Pearl: migração + FID = apêndice até prova. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WSES appendicitis"
  },
  {
    id: "RES-CG004",
    specialty: "Cirurgia",
    tema: "Abdômen agudo",
    subtema: "Colecistite aguda",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor em HD, Murphy+, US com vesícula espessada e cálculo. Conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "ATB + colecistectomia precoce (mesma internação) se apto. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "D",
    explanation: "Colecistite: ATB + cirurgia precoce. Pearl: não “esquenta” semanas sem plano. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "Tokyo guidelines"
  },
  {
    id: "RES-CG005",
    specialty: "Cirurgia",
    tema: "Abdômen agudo",
    subtema: "Obstrução intestinal",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com vômitos fecoides, distensão, níveis hidroaéreos, hérnia encarcerada. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na. estratégia que não aborda o mecanismo principal deste caso",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      D: "Reanimação, SNG, e cirurgia urgente pela hérnia encarcerada/estrangulamento. conduta preferencial neste contexto",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Encarcerada = cirurgia. Pearl: fecoides + hérnia = sala. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACS obstruction"
  },
  {
    id: "RES-CG006",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Pneumotórax hipertensivo",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} trauma torácico, desvio de traqueia, jugulares, hipotensão. Conduta imediata?",
    options: {
      A: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Descompressão imediata (agulha/toracostomia) sem atrasar por imagem. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Hipertensivo: descomprimir já. Pearl: não leve para TC o que vai morrer na porta. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATLS"
  },
  {
    id: "RES-CG007",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Tamponamento cardíaco",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ferimento penante em precórdio, hipotensão, jugulares, bulhas abafadas. Conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que.",
      B: "Janela pericárdica/toracotomia de reanimação conforme cenário — aliviar tamponamento",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas.",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade."
    },
    correct: "B",
    explanation: "Beck + trauma = tamponamento. Pearl: tríade de Beck no precórdio = sala/janela. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATLS cardiac trauma"
  },
  {
    id: "RES-CG008",
    specialty: "Cirurgia",
    tema: "Oncologia cirúrgica",
    subtema: "Nódulo tireoide",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com nódulo tireoidiano 2,5 cm, US suspeito. Próximo passo?",
    options: {
      A: "TSH + PAAF guiada por US conforme risco (TIRADS/Bethesda). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "A",
    explanation: "Nódulo: PAAF estratifica. Pearl: não opere sem citologia (salvo exceções). Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATA thyroid nodules"
  },
  {
    id: "RES-CG009",
    specialty: "Cirurgia",
    tema: "Vascular",
    subtema: "Isquemia aguda de membro",
    dificuldade: "avancado",
    age: 62,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor súbita em membro, palidez, sem pulso, parestesia. Conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Heparina, avaliação vascular urgente — trombembolectomia/trombólise/cirurgia conforme viabilidade",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      D: "Amputação imediata sem tentativa de revascularizar em membro ainda viável. estratégia que não aborda o mecanismo.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "B",
    explanation: "Isquemia aguda: tempo é membro. Pearl: 6 P — chame vascular. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "AHA/ESC ALI"
  },
  {
    id: "RES-CG010",
    specialty: "Cirurgia",
    tema: "Pele e partes moles",
    subtema: "Fasciíte necrosante",
    dificuldade: "avancado",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor desproporcional, crepitação, toxemia após trauma leve. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Cirurgia radical imediata + ATB amplo + suporte de UTI. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Necrosante: cirurgião na primeira hora. Pearl: dor >> sinais cutâneos = fascíte. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "IDSA SSTI; WSES"
  },
  {
    id: "RES-CG011",
    specialty: "Cirurgia",
    tema: "Hérnia",
    subtema: "Inguinal",
    dificuldade: "basico",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com abaulamento inguinal redutível, sem dor. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a.",
      E: "Correção eletiva (preferencial) — risco de encarceramento justifica planejar cirurgia"
    },
    correct: "E",
    explanation: "Redutível: eletiva. Pearl: encarcerada muda o jogo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "hernias guidelines"
  },
  {
    id: "RES-CG012",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Queimadura — fluido",
    dificuldade: "intermediario",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queimadura 30% SC, adultos. Conduta volêmica? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Reposição por Parkland/abordagens modernas, monitorar débito urinário, cuidar via aérea se queimadura inalatória",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "D",
    explanation: "Queimadura grande: volume + via aérea. Pearl: face/inalação = pense IOT cedo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ABA burn care"
  },
  {
    id: "RES-CG013",
    specialty: "Cirurgia",
    tema: "Abdômen agudo",
    subtema: "Úlcera perfurada",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor súbita em abdômen, defesa, ar sob diafragma. Conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor. abordagem inadequada para o cenário.",
      B: "Reanimação, ATB, e cirurgia (ou abordagem selecionada) para perfuração. conduta preferencial neste contexto",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução,. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Perfuração: ar livre + peritonite = opera. Pearl: RX em pé salva diagnóstico. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "perforated ulcer WSES"
  },
  {
    id: "RES-CG014",
    specialty: "Cirurgia",
    tema: "Proctologia",
    subtema: "Abscesso perianal",
    dificuldade: "basico",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor perianal intensa, flutuação. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      D: "Drenagem cirúrgica + ATB se celulite/imunossupressão; procurar fístula depois",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia."
    },
    correct: "D",
    explanation: "Abscesso: drena. Pearl: ATB sem dreno falha. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ASCRS abscess/fistula"
  },
  {
    id: "RES-CG015",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "TCE — hematoma epidural",
    dificuldade: "avancado",
    age: 27,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com trauma, intervalo lúcido, depois coma, anisocoria. Conduta?",
    options: {
      A: "TC e descompressão neurocirúrgica urgente (hematoma epidural típico). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "Epidural: intervalo lúcido clássico — opera. Pearl: lúcido → coma = sala de neuro. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "Brain Trauma Foundation"
  },
  {
    id: "RES-CG016",
    specialty: "Cirurgia",
    tema: "Vascular",
    subtema: "AAA roto",
    dificuldade: "avancado",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor lombar/abdominal, hipotensão, massa pulsátil. Conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Reanimação permissiva e reparo urgente (EVAR/cirurgia aberta) — não atrasar por exames longos",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "AAA roto: sala/endovascular. Pearl: tríade clássica — não demore na TC se instável. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "SVS AAA"
  },
  {
    id: "RES-CG017",
    specialty: "Cirurgia",
    tema: "Abdômen agudo",
    subtema: "Isquemia mesentérica",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor desproporcional, FA, lactato alto. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente.",
      C: "Suspeita alta → TC angiografia, anticoagulação/cirurgia/revascularização urgente",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "C",
    explanation: "Dor >> exame = mesentérica. Pearl: FA + dor = angioTC. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACG mesenteric ischemia"
  },
  {
    id: "RES-CG018",
    specialty: "Cirurgia",
    tema: "Tireoide",
    subtema: "Ca papilífero",
    dificuldade: "intermediario",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PAAF Bethesda VI (papilífero). Conduta geral? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Cirurgia tireoidiana (lobectomia/total conforme risco/tamanho) ± esvaziamento; TSH/iodo conforme staging",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "A",
    explanation: "Bethesda VI: opera. Pearl: citologia maligna ≠ só “seguir”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ATA thyroid cancer"
  },
  {
    id: "RES-CG019",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Trauma abdominal fechado",
    dificuldade: "intermediario",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} estável após trauma abdominal, FAST positivo leve. Conduta?",
    options: {
      A: "Se estável: TC para estratificar; manejo não-operatório selecionado de sólidos; opera se instável/peritonite",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "A",
    explanation: "Estável ≠ necessariamente opera. Pearl: instável + FAST+ = sala. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "EAST blunt trauma"
  },
  {
    id: "RES-CG020",
    specialty: "Cirurgia",
    tema: "Infecção cirúrgica",
    subtema: "Profilaxia ATB",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "Paciente de {{age}} vai a colecistectomia limpa-contaminada. Profilaxia? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Dose única pré-incisão (ex. cefazolina) e não prolongar sem indicação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Profilaxia: timing > duração. Pearl: 7 dias “por precaução” vira resistência. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ASHP surgical prophylaxis"
  },
  {
    id: "RES-GO001",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Pré-eclâmpsia grave",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "Gestante de {{age}} anos, 34 semanas, PA 170/110, cefaleia, proteinúria. Conduta?",
    options: {
      A: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "MgSO4 para prevenção de eclâmpsia, controle de PA, e resolução da gestação após estabilizar"
    },
    correct: "E",
    explanation: "Pré-eclâmpsia grave: MgSO4 + PA + parto. Pearl: o parto é a cura. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG hypertensive disorders"
  },
  {
    id: "RES-GO002",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Eclâmpsia",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Gestante com convulsão e HAS. Conduta imediata? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos Esta abordagem atrasa a terapia com melhor.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Via aérea, MgSO4 IV, controle de PA, e plano de parto. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Eclâmpsia: MgSO4 é o rei. Pearl: convulsão na gestante hipertensa = Mg. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG"
  },
  {
    id: "RES-GO003",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "HPP",
    dificuldade: "avancado",
    age: 32,
    vars: {

    },
    statement: "Pós-parto com sangramento >1 L, útero atônico. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      B: "Compressão, ocitocina, esvaziar bexiga, uterotônicos adicionais, balão/cirurgia se refratário — protocolo HPP",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "B",
    explanation: "HPP atônica: ocitocina + degraus do protocolo. Pearl: 4 T — atonia é a mais comum. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "FIGO/ACOG PPH"
  },
  {
    id: "RES-GO004",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Trabalho de parto prematuro",
    dificuldade: "intermediario",
    age: 27,
    vars: {

    },
    statement: "Gestante 30 semanas com contrações e colo modificado. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Corticoide antenatal, tocolítico selecionado para janela, MgSO4 neuroproteção se <32 sem, ATB se RPM/GBS",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "C",
    explanation: "Prematuridade: corticoide salva pulmão. Pearl: 24h de corticoide valem ouro. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG preterm labor"
  },
  {
    id: "RES-GO005",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "RPM",
    dificuldade: "intermediario",
    age: 29,
    vars: {

    },
    statement: "Gestante 33 semanas com perda de líquido claro, sem trabalho de parto. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos",
      D: "Confirmar RPM, corticoide, ATB de latência, vigilância infecção/bem-estar fetal; definir timing do parto",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "D",
    explanation: "PPROM: corticoide + ATB + vigilância. Pearl: menos toque = menos infecção. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG PROM"
  },
  {
    id: "RES-GO006",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Diabetes gestacional",
    dificuldade: "basico",
    age: 31,
    vars: {

    },
    statement: "Gestante com TOTG alterado. Conduta inicial? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      B: "Dieta/educação, monitorar glicemias; insulina/metformina se não atingir alvos",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      E: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura"
    },
    correct: "B",
    explanation: "GDM: estilo de vida primeiro. Pearl: alvo glicêmico protege ombro/feto. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ADA/ACOG GDM"
  },
  {
    id: "RES-GO007",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "DPI / gravidez ectópica",
    dificuldade: "avancado",
    age: 26,
    vars: {

    },
    statement: "Mulher de {{age}} com atraso menstrual, dor, βhCG+ e US sem saco intrauterine, massa anexial. Conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Estabilizar; metotrexato se critérios ou cirurgia se instável/contraindicação — ectópica",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "B",
    explanation: "Ectópica: MTX ou cirurgia. Pearl: βhCG+ sem saco = ectópica até prova. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG ectopic"
  },
  {
    id: "RES-GO008",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "AUB — sangramento uterino anormal",
    dificuldade: "intermediario",
    age: 42,
    vars: {

    },
    statement: "Mulher de {{age}} com sangramento intenso, Hb 7,5, estável. Conduta inicial?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos",
      C: "Estabilizar, ferro/transfusão se preciso, hormônio/antifibrinolítico conforme causa; investigar (PALM-COEIN)",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com."
    },
    correct: "C",
    explanation: "AUB: estabilize + classifique PALM-COEIN. Pearl: Hb 7,5 sintomática merece ação. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "FIGO PALM-COEIN; ACOG AUB"
  },
  {
    id: "RES-GO009",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "SOP",
    dificuldade: "basico",
    age: 24,
    vars: {

    },
    statement: "Mulher de {{age}} com oligomenorreia, hirsutismo, ovários micropoliquísticos. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Estilo de vida, rastrear metabólico; ACOC/progestágeno para ciclo; metformina/indução ovulatória conforme desejo gestacional",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia Esta abordagem atrasa a terapia com melhor.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "B",
    explanation: "SOP: metabólico + ciclo + fertilidade. Pearl: não opere ovário por SOP típica. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "International PCOS guideline"
  },
  {
    id: "RES-GO010",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Mioma sintomático",
    dificuldade: "intermediario",
    age: 38,
    vars: {

    },
    statement: "Mulher de {{age}} com mioma, menorragia, desejo reprodutivo. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Tratamento clínico (hormonal/antifibrinolítico) e opções preservadoras (miomectomia/outros) conforme desejo",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com."
    },
    correct: "A",
    explanation: "Mioma: alinha sintoma e fertilidade. Pearl: desejo de filho → preserve útero. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG fibroids"
  },
  {
    id: "RES-GO011",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "GBS intraparto",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "Gestante GBS+ em trabalho de parto. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "ATB intraparto (penicilina típica) para prevenir sepse neonatal precoce. conduta preferencial neste contexto",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento. estratégia que não aborda o mecanismo principal deste caso",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor. abordagem inadequada para o cenário.",
      D: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em. estratégia que não aborda o mecanismo principal deste caso",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "GBS+: penicilina no trabalho de parto. Pearl: protege o RN. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CDC/ACOG GBS"
  },
  {
    id: "RES-GO012",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Cesárea — profilaxia ATB",
    dificuldade: "basico",
    age: 30,
    vars: {

    },
    statement: "Cesárea eletiva. Profilaxia antibiótica? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "ATB IV antes da incisão (ex. cefazolina) reduz infecção de sítio. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Profilaxia antes da incisão. Pearl: timing na cesárea importa. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG antibiotic prophylaxis"
  },
  {
    id: "RES-GO013",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "PIA",
    dificuldade: "intermediario",
    age: 23,
    vars: {

    },
    statement: "Mulher de {{age}} com dor pélvica, febre, corrimento, dor à mobilização cervical. Conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "ATB cobrindo gonococo/clamídia/anaeróbios; internar se critérios de gravidade; tratar parceiro"
    },
    correct: "E",
    explanation: "DIP: ATB amplo + parceiro. Pearl: dor à mobilização = pense DIP. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CDC STI"
  },
  {
    id: "RES-GO014",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Câncer de colo — rastreio",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "Mulher de {{age}} com rastreio citológico. Qual princípio atual? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      B: "Citologia/HPV conforme faixa etária e protocolo local; colposcopia se alterado",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade."
    },
    correct: "B",
    explanation: "Rastreio organizado salva. Pearl: não colposcopa a população toda. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "MS/INCA; USPSTF cervical"
  },
  {
    id: "RES-GO015",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Placenta prévia",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "Gestante 32 semanas com sangramento indolor, US com placenta prévia. Conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Evitar toques, estabilizar, corticoide se risco de parto, cesárea planejada conforme idade gestacional/quadro",
      E: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos"
    },
    correct: "D",
    explanation: "Prévia: sem toque + cesárea. Pearl: sangramento indolor = US antes do dedo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG placenta previa"
  },
  {
    id: "RES-GO016",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "DPP",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "Gestante 36 semanas com dor uterina contínua, sangramento, hipertonia, sofrimento fetal. Conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "Reanimação materna e cesárea/parto urgente — descolamento prematuro. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "DPP: dor + hipertonia + sofrimento = extrair. Pearl: nem sempre sangra muito para fora. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG abruption"
  },
  {
    id: "RES-GO017",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Endometriose — dor",
    dificuldade: "intermediario",
    age: 29,
    vars: {

    },
    statement: "Mulher de {{age}} com dismenorreia intensa, dispareunia, US sem cisto grande. Conduta inicial?",
    options: {
      A: "AINE + hormônio (ACOC/progestágeno); laparoscopia se refratária/desejo diagnóstico-terapêutico",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar.",
      C: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada."
    },
    correct: "A",
    explanation: "Endometriose: clínico primeiro. Pearl: dismenorreia incapacitante merece hormônio. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESHRE endometriosis"
  },
  {
    id: "RES-GO018",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Isoimunização Rh",
    dificuldade: "intermediario",
    age: 28,
    vars: {

    },
    statement: "Gestante Rh negativo, pai Rh positivo, Coombs indireto negativo. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Imunoglobulina anti-D em situações de risco e no puerpério se RN Rh+; seguimento de anticorpos",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Anti-D previne isoimunização. Pearl: Coombs negativo ainda precisa de profilaxia. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG Rh"
  },
  {
    id: "RES-GO019",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Cisto ovariano torcido",
    dificuldade: "avancado",
    age: 25,
    vars: {

    },
    statement: "Mulher de {{age}} com dor anexial súbita, náuseas, Doppler alterado. Conduta?",
    options: {
      A: "Cirurgia urgente (laparoscopia) — destorção ± ooforoplastia; preservar ovário se viável",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      D: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e."
    },
    correct: "A",
    explanation: "Torção: emergência cirúrgica. Pearl: dor súbita anexial = Doppler e sala. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG adnexal torsion"
  },
  {
    id: "RES-GO020",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Ácido fólico pré-concepcional",
    dificuldade: "basico",
    age: 26,
    vars: {

    },
    statement: "Mulher de {{age}} planeja gestar. Orientação essencial? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "Ácido fólico pré-concepcional (dose padrão ou alta se risco) para prevenir defeitos do tubo neural",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "Fólico antes de engravidar. Pearl: começa antes do teste positivo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACOG/CDC folic acid"
  },
  {
    id: "RES-PV001",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "APS",
    subtema: "Rastreio hipertensão",
    dificuldade: "basico",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} assintomático na UBS. Sobre HAS, conduta de rastreio? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      B: "Medir PA periodicamente; confirmar com medidas repetidas/MAPA/MRPA se elevado; tratar conforme risco",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "B",
    explanation: "Rastreio de HAS é básico na APS. Pearl: uma medida não fecha diagnóstico. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "SBC HAS; USPSTF"
  },
  {
    id: "RES-PV002",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "APS",
    subtema: "Rastreio diabetes",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IMC 32, sedentente de DM. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de. estratégia que não aborda o mecanismo principal deste caso",
      B: "Rastrear com glicemia/HbA1c/TOTG conforme protocolo; educar estilo de vida. conduta preferencial neste contexto",
      C: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco. estratégia que não aborda o mecanismo principal deste caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Obeso/risco: rastreie DM. Pearl: prevenção começa na glicemia. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ADA; MS cadernos APS"
  },
  {
    id: "RES-PV003",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Imunização adulto",
    subtema: "Influenza / COVID",
    dificuldade: "basico",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC, pergunta vacinas. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor.",
      B: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Indicar influenza anual e demais do calendário do adulto/risco (incluindo COVID conforme PNI), além de pneumococo se elegível",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "D",
    explanation: "Grupo de risco vacina mais, não menos. Pearl: DRC = calendário reforçado. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "PNI; CDC adults"
  },
  {
    id: "RES-PV004",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Tabagismo",
    subtema: "Cessação",
    dificuldade: "basico",
    age: 42,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} quer parar de fumar. Abordagem com melhor evidência? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Aconselhamento breve + farmacoterapia (vareniclina/bupropiona/TRS) se sem contraindicação"
    },
    correct: "E",
    explanation: "Cessação: fale + medique. Pearl: perguntar todo contato. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "USPSTF tobacco"
  },
  {
    id: "RES-PV005",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde da mulher",
    subtema: "Rastreio mama",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "Mulher de {{age}} assintomática. Rastreio de mama (princípio)? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Mamografia conforme faixa/protocolo local (em geral 50–69 a cada 2 anos no SUS); individualizar risco alto",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "Rastreio organizado > autoexame isolado. Pearl: saiba o protocolo do seu sistema. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "INCA; USPSTF breast"
  },
  {
    id: "RES-PV006",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde do idoso",
    subtema: "Quedas",
    dificuldade: "basico",
    age: 78,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queda recorrente. Conduta na APS? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Avaliar causas (visão, medicações, força, ambiente), vitamina D/osteoporose se indicado, fisioterapia e ajuste de fármacos",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "C",
    explanation: "Queda é síndrome geriátrica. Pearl: revise os remédios que dão tontura. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CDC STEADI; SBCGG"
  },
  {
    id: "RES-PV007",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Epidemiologia",
    subtema: "Vigilância / notificação",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "Médico da UBS diagnostica tuberculose pulmonar bacilífera. Obrigação? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Notificação compulsória e início de tratamento/TDO conforme protocolo. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "C",
    explanation: "TB é compulsória. Pearl: notificar é parte do tratamento comunitário. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "MS vigilância"
  },
  {
    id: "RES-PV008",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde mental APS",
    subtema: "Depressão",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anedonia e humor deprimido >2 semanas. Conduta inicial APS?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Rastrear risco de suicídio, oferecer psicoterapia/apoio e antidepressivo se moderada/grave, com seguimento",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
    explanation: "Depressão na APS: risco + tratamento. Pearl: pergunte sobre suicídio. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "NICE depression; MS"
  },
  {
    id: "RES-PV009",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "DST",
    subtema: "Counseling + testagem",
    dificuldade: "basico",
    age: 27,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} sexualmente ativo na UBS. Oferta adequada? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Oferta de testagem, preservativos, vacinas (HPV/hep B) e tratamento de ISTs conforme protocolo",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "D",
    explanation: "APS é porta de IST/HIV. Pearl: ofereça o teste — não espere o pedido. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CDC/MS IST"
  },
  {
    id: "RES-PV010",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Pré-natal APS",
    subtema: "Baixo risco",
    dificuldade: "basico",
    age: 25,
    vars: {

    },
    statement: "Gestante de baixo risco na UBS. Elementos essenciais? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Consultas seriadas, vacinas, suplementos (férico/fólico), rastreios (sífilis/HIV/hepatite) e sinais de alarme"
    },
    correct: "E",
    explanation: "Pré-natal básico salva. Pearl: sífilis/HIV em toda gestante. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "MS pré-natal"
  },
  {
    id: "RES-PV011",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde da criança",
    subtema: "Puericultura",
    dificuldade: "basico",
    age: 1,
    vars: {

    },
    statement: "Lactente de {{age}} na UBS. O que não pode faltar? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese.",
      D: "Curva de crescimento, aleitamento/alimentação, vacinas, desenvolvimento e orientação de sinais de alarme",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Puericultura: crescer + vacinar + desenvolver. Pearl: a curva fala. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "SBP/MS"
  },
  {
    id: "RES-PV012",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Ética / APS",
    subtema: "Sigilo e violência",
    dificuldade: "intermediario",
    age: 30,
    vars: {

    },
    statement: "Mulher de {{age}} relata violência doméstica e pede sigilo. Postura? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Acolher, avaliar risco imediato, orientar redes de proteção; quebrar sigilo se risco iminente conforme ética/lei, com segurança da paciente",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "Violência: acolher + proteger. Pearl: segurança dela > burocracia. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "CFM; MS violência"
  },
  {
    id: "RES-PV013",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Controle de agravos",
    subtema: "Dengue na APS",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, dor retroocular, prova do laço+, plaquetas em queda. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso",
      E: "Hidratação conforme grupo, evitar AINE/AAS, sinais de alarme, notificação. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Dengue: hidratar e evitar AAS. Pearl: prova do laço+ = classifique o grupo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "MS dengue"
  },
  {
    id: "RES-PV014",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde do trabalhador",
    subtema: "LER/DORT",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor em punho relacionada ao trabalho repetitivo. Conduta APS?",
    options: {
      A: "Avaliar, tratar dor, adaptar trabalho/ergonomia, afastar se preciso e articular com saúde do trabalhador",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "A",
    explanation: "DORT: trate e mude a exposição. Pearl: remédio sem ergonomia falha. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "MS saúde trabalhador"
  },
  {
    id: "RES-PV015",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Prevenção quaternária",
    subtema: "Medicalização",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "Paciente solicita exame “completo anual” sem indicação. Postura? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Praticar prevenção quaternária: evitar excesso diagnóstico/terapêutico, discutir riscos/benefícios e indicar só o útil",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado"
    },
    correct: "B",
    explanation: "Menos pode ser mais. Pearl: exame sem indicação também adoece. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "WONCA; prevenção quaternária"
  },
  {
    id: "RES-CA001",
    specialty: "Cardiologia",
    tema: "SCA",
    subtema: "IAMCST — reperfusão",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com supra de ST há 40 min. Conduta ideal? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "ICP primária em centro capaz o mais rápido possível; trombólise se ICP não disponível na janela"
    },
    correct: "E",
    explanation: "IAMCST = reperfusão. Pearl: minutos = músculo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC/AHA STEMI"
  },
  {
    id: "RES-CA002",
    specialty: "Cardiologia",
    tema: "SCA",
    subtema: "IAMSSST — estratificação",
    dificuldade: "intermediario",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com troponina+, ECG sem supra, GRACE alto. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial,. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se. estratégia que não aborda o mecanismo principal deste caso",
      E: "Anti-isquêmico/antitrombótico e estratégia invasiva precoce conforme risco. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "SSST de alto risco: cateter cedo. Pearl: GRACE alto não vai para casa. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC NSTE-ACS"
  },
  {
    id: "RES-CA003",
    specialty: "Cardiologia",
    tema: "Insuficiência cardíaca",
    subtema: "Terapia quádrupla",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ICFER estável. Base medicamentosa moderna? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "IECA/ARNI + betabloqueador + Antagonista mineralocorticoide + SGLT2, titulados",
      B: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Bloqueador de canal de cálcio não dihidropiridínico como base da ICFER. estratégia que não aborda o.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia."
    },
    correct: "A",
    explanation: "Quádrupla salvadora na ICFER. Pearl: diurético trata congestão; a quádrupla trata mortalidade. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC/AHA HF"
  },
  {
    id: "RES-CA004",
    specialty: "Cardiologia",
    tema: "Arritmia",
    subtema: "TV sustentada instável",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TV e hipotensão. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Cardioversão elétrica sincronizada imediata (ACL S). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "B",
    explanation: "Instável = choque. Pearl: droga não substitui cardioversão no choque. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACLS"
  },
  {
    id: "RES-CA005",
    specialty: "Cardiologia",
    tema: "Arritmia",
    subtema: "Bradicardia sintomática",
    dificuldade: "intermediario",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FC 32, tontura, PA baixa. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para. estratégia que não aborda o mecanismo principal deste caso",
      B: "Atropina, suporte, e marcapasso transcutâneo/transvenoso se refratário. conduta preferencial neste contexto",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Bradi sintomática: atropina → MP. Pearl: FC 32 com baixo débito não espera laudo. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ACLS bradycardia"
  },
  {
    id: "RES-CA006",
    specialty: "Cardiologia",
    tema: "Valvopatia",
    subtema: "Estenose aórtica grave sintomática",
    dificuldade: "avancado",
    age: 74,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com EA grave, síncope de esforço. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Avaliar troca valvar/TAVI — sintoma + EA grave = intervenção. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "EA sintomática opera/TAVI. Pearl: síncope de esforço na EA = alto risco. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC/AHA valvular"
  },
  {
    id: "RES-CA007",
    specialty: "Cardiologia",
    tema: "Valvopatia",
    subtema: "Endocardite",
    dificuldade: "avancado",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, sopro novo, vegetação no eco. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Hemoculturas + ATB IV dirigido/empírico e avaliar indicação cirúrgica (IC, abscesso, germes difíceis)",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a."
    },
    correct: "C",
    explanation: "Endocardite: culturas + ATB IV ± cirurgia. Pearl: sopro novo + febre = eco. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC IE; AHA IE"
  },
  {
    id: "RES-CA008",
    specialty: "Cardiologia",
    tema: "Prevenção",
    subtema: "Estatina em alto risco",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IAM prévio. Conduta lipídica? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      C: "Estatina de alta intensidade (± ezetimiba/PCSK9 se preciso) com metas agressivas de LDL",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no."
    },
    correct: "C",
    explanation: "Pós-IAM: estatina forte. Pearl: prevenção secundária não é opcional. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC prevention; AHA cholesterol"
  },
  {
    id: "RES-CA009",
    specialty: "Cardiologia",
    tema: "Hipertensão",
    subtema: "Emergência hipertensiva",
    dificuldade: "intermediario",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PA 220/130 e edema agudo de pulmão. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão",
      B: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo",
      C: "Redução controlada com agente IV (ex. nitrato/nitroprussiato conforme cenário) + tratar o dano de órgão",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese."
    },
    correct: "C",
    explanation: "Emergência: dano de órgão + queda controlada. Pearl: sublingual “quebra-PA” é história. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC/AHA hypertension"
  },
  {
    id: "RES-CA010",
    specialty: "Cardiologia",
    tema: "IC",
    subtema: "VNI no EAP",
    dificuldade: "intermediario",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com EAP, FR 36, Sat 84%. Conduta respiratória? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "VNI (CPAP/BiPAP) precoce + tratamento da congestão, IOT se falência. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "EAP: VNI reduz IOT. Pearl: FR 36 = máscara de VNI, não “espera”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC HF acute"
  },
  {
    id: "RES-CA011",
    specialty: "Cardiologia",
    tema: "Arritmia",
    subtema: "FA — anticoagulação",
    dificuldade: "basico",
    age: 71,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA, CHA₂DS₂-VASc 4, sem contraindicação. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Anticoagulação oral (DOAC preferencial na maioria) com ajuste à função renal",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem."
    },
    correct: "B",
    explanation: "Score alto = anticoagula. Pearl: AAS não é “anticoagulação da pobre”. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-CA012",
    specialty: "Cardiologia",
    tema: "Síncope",
    subtema: "Estratificação",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com síncope durante exercício, sopro de EA. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor. abordagem inadequada para o cenário.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para. estratégia que não aborda o mecanismo principal deste caso",
      D: "Internação/avaliação cardiológica urgente — síncope de esforço é alarme. conduta preferencial neste contexto",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Esforço + sopro = cardíaca até prova. Pearl: síncope de esforço não vai para casa. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC syncope"
  },
  {
    id: "RES-CA013",
    specialty: "Cardiologia",
    tema: "Miocardite",
    subtema: "Suspeita clínica",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-viral com dor torácica, troponina+, coronárias limpas. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de. estratégia que não aborda o mecanismo principal deste caso",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico. estratégia que não aborda o mecanismo principal deste caso",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na. estratégia que não aborda o mecanismo principal deste caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem. estratégia que não aborda o mecanismo principal deste caso",
      E: "Repouso, tratar IC/arritmia, RNM/seguimento; evitar exercício até liberação. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Miocardite: repouso e suporte. Pearl: coronária normal + troponina ≠ alta para academia. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC myocarditis"
  },
  {
    id: "RES-CA014",
    specialty: "Cardiologia",
    tema: "Pericardite",
    subtema: "Aguda",
    dificuldade: "intermediario",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor pleurítica que melhora sentado, supra difuso, troponina normal. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      C: "AINE + colchicina (salvo contraindicação); investigar derrame/miopericardite",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem."
    },
    correct: "C",
    explanation: "Pericardite: AINE+colchicina. Pearl: sentar alivia — clássico. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC pericardial"
  },
  {
    id: "RES-CA015",
    specialty: "Cardiologia",
    tema: "Choque cardiogênico",
    subtema: "IAM",
    dificuldade: "avancado",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IAM e choque cardiogênico. Conduta? Escolha a melhor conduta segundo evidência.",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Revascularização urgente + suporte hemodinâmico (aminas/dispositivo conforme centro) em UTI",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Choque cardiogênico pós-IAM: revasc + suporte. Pearl: cateter e UTI, não enfermaria. Distratores atrasam terapia ou ignoram o mecanismo principal. Pearl: vinheta + diretriz de residência.",
    bibliography: "ESC shock/STEMI"
  }
];

module.exports = { RES_MASTERS };
