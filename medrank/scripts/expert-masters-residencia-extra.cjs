/**
 * Masters EXPERT — Residência (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const RES_MASTERS_EXTRA = [
  {
    id: "RES-X001",
    specialty: "Clínica Médica",
    tema: "Sepse",
    subtema: "Bundle 1h",
    dificuldade: "basico",
    age: 28,
    vars: {
      lactato: 4.1
    },
    statement: "{{sexWord}} de {{age}} com pneumonia, PA 85/50 e lactato {{lactato}}. Prioridade na 1ª hora?",
    options: {
      A: "Aguardar culturas negativas por 48 h antes de qualquer antibiótico. estratégia que não aborda o mecanismo.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Coletar culturas, antibiótico IV precoce e reposição volêmica com reavaliação de perfusão",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Coletar culturas, antibiótico IV precoce e reposição volêmica com reavaliação de perfusão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SSC 2021"
  },
  {
    id: "RES-X002",
    specialty: "Clínica Médica",
    tema: "Meningite",
    subtema: "ATB precoce",
    dificuldade: "intermediario",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, rigidez de nuca e petéquias. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Estabilizar e iniciar ATB empírico imediato — não atrasar se a punção demorar",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Esperar sempre a punção e a cultura antes de qualquer antibiótico. estratégia que não aborda o mecanismo."
    },
    correct: "B",
    explanation: "Estabilizar e iniciar ATB empírico imediato — não atrasar se a punção demorar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA meningitis"
  },
  {
    id: "RES-X003",
    specialty: "Clínica Médica",
    tema: "Pneumonia",
    subtema: "PAC grave",
    dificuldade: "intermediario",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PAC, FR 34 e PA baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      B: "Internar/UTI conforme escore, ATB precoce e suporte respiratório/hemodinâmico",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Internar/UTI conforme escore, ATB precoce e suporte respiratório/hemodinâmico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA CAP"
  },
  {
    id: "RES-X004",
    specialty: "Clínica Médica",
    tema: "Asma",
    subtema: "Crise grave",
    dificuldade: "intermediario",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} asmático, Sat 88%, fala entrecortada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "O2, SABA+ipratrópio, corticoide sistêmico precoce; MgSO4 se grave; IOT se falência",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "O2, SABA+ipratrópio, corticoide sistêmico precoce; MgSO4 se grave; IOT se falência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GINA"
  },
  {
    id: "RES-X005",
    specialty: "Clínica Médica",
    tema: "DPOC",
    subtema: "VNI",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DPOC, pH 7,28 e pCO2 68. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Broncodilatadores, corticoide, O2 com alvo 88–92% e VNI na acidose hipercápnica",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Broncodilatadores, corticoide, O2 com alvo 88–92% e VNI na acidose hipercápnica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GOLD"
  },
  {
    id: "RES-X006",
    specialty: "Clínica Médica",
    tema: "CAD",
    subtema: "Sequência K",
    dificuldade: "intermediario",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com CAD, pH 7,1 e K 3,1. Sequência. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Volume com SF, repor K agressivamente e só então insulina IV se K seguro. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Insulina IV antes de qualquer reposição de potássio com K já baixo. estratégia que não aborda o mecanismo."
    },
    correct: "A",
    explanation: "Volume com SF, repor K agressivamente e só então insulina IV se K seguro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA DKA"
  },
  {
    id: "RES-X007",
    specialty: "Clínica Médica",
    tema: "HHS",
    subtema: "Volume",
    dificuldade: "avancado",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com glicemia 900, osm alta, sem cetose. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      D: "Reposição volêmica cuidadosa (pilar) e insulina em doses menores que na CAD. conduta preferencial neste contexto",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Reposição volêmica cuidadosa (pilar) e insulina em doses menores que na CAD Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA HHS"
  },
  {
    id: "RES-X008",
    specialty: "Clínica Médica",
    tema: "SCA",
    subtema: "IAMCST",
    dificuldade: "basico",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor típica e supra de ST. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "AAS mastigável imediato e reperfusão urgente (ICP primária ou trombólise se sem ICP)",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "AAS mastigável imediato e reperfusão urgente (ICP primária ou trombólise se sem ICP) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC STEMI"
  },
  {
    id: "RES-X009",
    specialty: "Clínica Médica",
    tema: "SCA",
    subtema: "SSST alto risco",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com troponina+, sem supra, GRACE alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Antitrombótico/anti-isquêmico e estratégia invasiva precoce conforme risco. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de."
    },
    correct: "C",
    explanation: "Antitrombótico/anti-isquêmico e estratégia invasiva precoce conforme risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC NSTE-ACS"
  },
  {
    id: "RES-X010",
    specialty: "Clínica Médica",
    tema: "IC",
    subtema: "Quádrupla",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ICFER estável. Base medicamentosa. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "IECA/ARNI + betabloqueador + MRA + SGLT2, titulados conforme tolerância. conduta preferencial neste contexto",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Apenas digoxina e diurético como terapia modificadora de mortalidade. estratégia que não aborda o mecanismo.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "IECA/ARNI + betabloqueador + MRA + SGLT2, titulados conforme tolerância Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF"
  },
  {
    id: "RES-X011",
    specialty: "Clínica Médica",
    tema: "IC",
    subtema: "EAP VNI",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com EAP, FR 36, Sat 84%. Conduta respiratória. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "VNI precoce + tratamento da congestão; IOT se falência. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "VNI precoce + tratamento da congestão; IOT se falência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC acute HF"
  },
  {
    id: "RES-X012",
    specialty: "Clínica Médica",
    tema: "FA",
    subtema: "Anticoagulação",
    dificuldade: "basico",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA e CHA₂DS₂-VASc 4. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      C: "Anticoagulação oral (DOAC preferencial na maioria) ajustada à função renal. conduta preferencial neste contexto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Anticoagulação oral (DOAC preferencial na maioria) ajustada à função renal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-X013",
    specialty: "Clínica Médica",
    tema: "FA",
    subtema: "Cardioversão >48h",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA >48 h estável. Conduta sobre cardioversão. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Controlar frequência, anticoagular; cardioversão após anticoagulação adequada ou ecoTE sem trombo",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Controlar frequência, anticoagular; cardioversão após anticoagulação adequada ou ecoTE sem trombo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-X014",
    specialty: "Clínica Médica",
    tema: "TEP",
    subtema: "Intermediário",
    dificuldade: "intermediario",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TEP, PA estável, troponina+ e VD dilatado. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Anticoagular; trombólise sistêmica reservada a choque/deterioração. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "D",
    explanation: "Anticoagular; trombólise sistêmica reservada a choque/deterioração Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC PE"
  },
  {
    id: "RES-X015",
    specialty: "Clínica Médica",
    tema: "TVP",
    subtema: "Proximal",
    dificuldade: "basico",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TVP proximal sem câncer. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Anticoagulação por pelo menos 3 meses e investigar fator provocador. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Anticoagulação por pelo menos 3 meses e investigar fator provocador Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH VTE"
  },
  {
    id: "RES-X016",
    specialty: "Clínica Médica",
    tema: "AVC",
    subtema: "Trombólise",
    dificuldade: "avancado",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com déficit focal há 1h10, TC sem sangue. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Avaliar trombólise IV e trombectomia se oclusão de grande vaso. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Avaliar trombólise IV e trombectomia se oclusão de grande vaso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA/ASA stroke"
  },
  {
    id: "RES-X017",
    specialty: "Clínica Médica",
    tema: "Status",
    subtema: "Benzodiazepínico",
    dificuldade: "intermediario",
    age: 76,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em convulsão contínua há 10 min. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "ABC e benzodiazepínico precoce; depois ASE se persistir. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "ABC e benzodiazepínico precoce; depois ASE se persistir Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AES status"
  },
  {
    id: "RES-X018",
    specialty: "Clínica Médica",
    tema: "HDA",
    subtema: "Varizes",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com hematêmese e PA 90/60. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "ABC, volume criterioso, vasoativo, ATB profilático e endoscopia precoce. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "ABC, volume criterioso, vasoativo, ATB profilático e endoscopia precoce Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Baveno"
  },
  {
    id: "RES-X019",
    specialty: "Clínica Médica",
    tema: "Pancreatite",
    subtema: "Suporte",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com lipase 8× e TC sem necrose infectada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      C: "Suporte, hidratação, analgesia e realimentação precoce se tolerar; ATB só se infecção",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Suporte, hidratação, analgesia e realimentação precoce se tolerar; ATB só se infecção Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG pancreatitis"
  },
  {
    id: "RES-X020",
    specialty: "Clínica Médica",
    tema: "H. pylori",
    subtema: "Erradicação",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com úlcera e H. pylori positivo. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Terapia de erradicação (IBP + antibióticos conforme protocolo) e confirmar cura se indicado"
    },
    correct: "E",
    explanation: "Terapia de erradicação (IBP + antibióticos conforme protocolo) e confirmar cura se indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG H. pylori"
  },
  {
    id: "RES-X021",
    specialty: "Clínica Médica",
    tema: "Anemia",
    subtema: "Ferropriva",
    dificuldade: "basico",
    age: 38,
    vars: {
      hb: 8.1
    },
    statement: "Mulher de {{age}} com Hb {{hb}}, VCM baixo e ferritina baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      E: "Repor ferro e investigar a causa do sangramento/perdas; transfusão só se instável"
    },
    correct: "E",
    explanation: "Repor ferro e investigar a causa do sangramento/perdas; transfusão só se instável Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Iron deficiency guidelines"
  },
  {
    id: "RES-X022",
    specialty: "Clínica Médica",
    tema: "PTT",
    subtema: "PLEX",
    dificuldade: "avancado",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAHA, plaquetopenia e confusão; ADAMTS13 <10%. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Plasmaférese urgente + imunossupressão; caplacizumab em protocolos. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Plasmaférese urgente + imunossupressão; caplacizumab em protocolos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISTH TTP"
  },
  {
    id: "RES-X023",
    specialty: "Clínica Médica",
    tema: "Gota",
    subtema: "Ataque",
    dificuldade: "basico",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com podagra. Tratamento do ataque. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Anti-inflamatório (AINE/colchicina/corticoide) no ataque; hipouricemiante depois com cobertura",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Anti-inflamatório (AINE/colchicina/corticoide) no ataque; hipouricemiante depois com cobertura Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR gout"
  },
  {
    id: "RES-X024",
    specialty: "Clínica Médica",
    tema: "AR",
    subtema: "MTX",
    dificuldade: "intermediario",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com AR nova, atividade moderada. Primeira linha. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente.",
      D: "Metotrexato (salvo contraindicação) e treat-to-target; escalar se não atingir alvo",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Metotrexato (salvo contraindicação) e treat-to-target; escalar se não atingir alvo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR/EULAR RA"
  },
  {
    id: "RES-X025",
    specialty: "Clínica Médica",
    tema: "LES",
    subtema: "Nefrite suspeita",
    dificuldade: "intermediario",
    age: 50,
    vars: {

    },
    statement: "Mulher de {{age}} com LES, proteinúria e C3 baixo. Próximo passo. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Quantificar proteinúria/função e biópsia para classificar e induzir terapia. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Quantificar proteinúria/função e biópsia para classificar e induzir terapia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO LN"
  },
  {
    id: "RES-X026",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Tempestade",
    dificuldade: "avancado",
    age: 53,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Basedow, febre, taquicardia e alteração mental. Conduta?",
    options: {
      A: "UTI, betabloqueador, tionamida, iodo após tionamida e corticoide; tratar gatilho",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "UTI, betabloqueador, tionamida, iodo após tionamida e corticoide; tratar gatilho Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA thyrotoxicosis"
  },
  {
    id: "RES-X027",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Mixedema",
    dificuldade: "avancado",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} hipotireoidismo com hipotermia e sonolência. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "UTI, T4 IV (± T3), corticoide se risco adrenal e suporte. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "UTI, T4 IV (± T3), corticoide se risco adrenal e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA hypothyroidism"
  },
  {
    id: "RES-X028",
    specialty: "Clínica Médica",
    tema: "HIV",
    subtema: "Início TARV",
    dificuldade: "intermediario",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HIV novo e CD4 180. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar TARV o mais breve possível + profilaxia de PCP (CD4 <200). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Iniciar TARV o mais breve possível + profilaxia de PCP (CD4 <200) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "DHHS HIV"
  },
  {
    id: "RES-X029",
    specialty: "Clínica Médica",
    tema: "TB",
    subtema: "RIPE",
    dificuldade: "intermediario",
    age: 62,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cavernas e BAAR+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Esquema RIPE sob TDO/DOTS e isolamento respiratório inicial. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "B",
    explanation: "Esquema RIPE sob TDO/DOTS e isolamento respiratório inicial Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "OMS/MS TB"
  },
  {
    id: "RES-X030",
    specialty: "Clínica Médica",
    tema: "ITU",
    subtema: "Pielonefrite",
    dificuldade: "basico",
    age: 65,
    vars: {

    },
    statement: "Mulher de {{age}} com febre e PPL. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "ATB empírico adequado à gravidade, urocultura e reavaliação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "A",
    explanation: "ATB empírico adequado à gravidade, urocultura e reavaliação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA UTI"
  },
  {
    id: "RES-X031",
    specialty: "Clínica Médica",
    tema: "Celulite",
    subtema: "Erisipela",
    dificuldade: "basico",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com placa eritematosa bem delimitada e febre. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Antibiótico cobrindo estreptococo/staph conforme gravidade e elevar o membro",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Antibiótico cobrindo estreptococo/staph conforme gravidade e elevar o membro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA SSTI"
  },
  {
    id: "RES-X032",
    specialty: "Clínica Médica",
    tema: "Dengue",
    subtema: "APS",
    dificuldade: "intermediario",
    age: 71,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, prova do laço+ e plaquetas em queda. Conduta?",
    options: {
      A: "Hidratação conforme grupo, evitar AAS/AINE, orientar sinais de alarme e notificar",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente."
    },
    correct: "A",
    explanation: "Hidratação conforme grupo, evitar AAS/AINE, orientar sinais de alarme e notificar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS dengue"
  },
  {
    id: "RES-X033",
    specialty: "Clínica Médica",
    tema: "Cefaleia",
    subtema: "Thunderclap",
    dificuldade: "basico",
    age: 74,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com a pior cefaleia da vida, súbita. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      E: "TC imediata (± PL se TC normal) para HSA e estabilização neurocrítica. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "TC imediata (± PL se TC normal) para HSA e estabilização neurocrítica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA SAH"
  },
  {
    id: "RES-X034",
    specialty: "Clínica Médica",
    tema: "Miastenia",
    subtema: "Crise",
    dificuldade: "avancado",
    age: 77,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} miastênico com dispneia e fraqueza bulbar. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Avaliar via aérea/CV, UTI, IgIV ou plasmaférese; evitar fármacos agravantes. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Avaliar via aérea/CV, UTI, IgIV ou plasmaférese; evitar fármacos agravantes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MG guidance"
  },
  {
    id: "RES-X035",
    specialty: "Clínica Médica",
    tema: "Hipoglicemia",
    subtema: "Grave",
    dificuldade: "basico",
    age: 30,
    vars: {

    },
    statement: "{{sexWord}} diabético de {{age}} inconsciente, HGT 38. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Glicose IV (ou glucagon sem acesso) e revisar causa/doses de hipoglicemiantes",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "D",
    explanation: "Glicose IV (ou glucagon sem acesso) e revisar causa/doses de hipoglicemiantes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA standards"
  },
  {
    id: "RES-X036",
    specialty: "Clínica Médica",
    tema: "Diverticulite",
    subtema: "Abscesso",
    dificuldade: "intermediario",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com abscesso diverticular de 4 cm. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "ATB + drenagem percutânea se acessível; cirurgia se peritonite/falha. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "D",
    explanation: "ATB + drenagem percutânea se acessível; cirurgia se peritonite/falha Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WSES diverticulitis"
  },
  {
    id: "RES-X037",
    specialty: "Clínica Médica",
    tema: "Anemia",
    subtema: "B12",
    dificuldade: "intermediario",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anemia macrocítica, neuropatia e B12 baixa. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Reposição de B12 parenteral/oral conforme gravidade e investigar causa. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Reposição de B12 parenteral/oral conforme gravidade e investigar causa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "B12 deficiency"
  },
  {
    id: "RES-X038",
    specialty: "Clínica Médica",
    tema: "Hepatite B",
    subtema: "Crônica ativa",
    dificuldade: "intermediario",
    age: 39,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} HBsAg+, ALT alta e carga viral elevada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Antiviral (tenofovir/entecavir) conforme critérios e seguir fibrose/HCC. conduta preferencial neste contexto",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente.",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Antiviral (tenofovir/entecavir) conforme critérios e seguir fibrose/HCC Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AASLD HBV"
  },
  {
    id: "RES-X039",
    specialty: "Clínica Médica",
    tema: "Cirrose",
    subtema: "Ascite",
    dificuldade: "intermediario",
    age: 42,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com ascite tensa. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Restrição de sódio, espironolactona ± furosemida e paracentese se tensa/respiratória",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Restrição de sódio, espironolactona ± furosemida e paracentese se tensa/respiratória Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EASL ascites"
  },
  {
    id: "RES-X040",
    specialty: "Clínica Médica",
    tema: "Encefalopatia",
    subtema: "Hepática",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico confuso com flapping. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Lactulose (e rifaximina se recorrente), tratar gatilho e suporte. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Lactulose (e rifaximina se recorrente), tratar gatilho e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EASL HE"
  },
  {
    id: "RES-X041",
    specialty: "Clínica Médica",
    tema: "Has",
    subtema: "Emergência",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PA 220/130 e EAP. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Redução controlada com agente IV e tratar o dano de órgão — não nifedipina sublingual agressiva",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Redução controlada com agente IV e tratar o dano de órgão — não nifedipina sublingual agressiva Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA HTN"
  },
  {
    id: "RES-X042",
    specialty: "Clínica Médica",
    tema: "Bradicardia",
    subtema: "Sintomática",
    dificuldade: "intermediario",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FC 32 e hipotensão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Atropina e preparo de marcapasso se refratário. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Atropina e preparo de marcapasso se refratário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACLS"
  },
  {
    id: "RES-X043",
    specialty: "Clínica Médica",
    tema: "TV",
    subtema: "Instável",
    dificuldade: "avancado",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TV e hipotensão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Cardioversão elétrica sincronizada imediata. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Cardioversão elétrica sincronizada imediata Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACLS"
  },
  {
    id: "RES-X044",
    specialty: "Clínica Médica",
    tema: "EA",
    subtema: "Sintomática",
    dificuldade: "avancado",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com estenose aórtica grave e síncope de esforço. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Avaliar troca valvar/TAVI — sintoma + EA grave indica intervenção. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "D",
    explanation: "Avaliar troca valvar/TAVI — sintoma + EA grave indica intervenção Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC valvular"
  },
  {
    id: "RES-X045",
    specialty: "Clínica Médica",
    tema: "Endocardite",
    subtema: "Duke",
    dificuldade: "avancado",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, sopro novo e vegetação. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Hemoculturas + ATB IV e avaliar indicação cirúrgica. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "A",
    explanation: "Hemoculturas + ATB IV e avaliar indicação cirúrgica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC IE"
  },
  {
    id: "RES-X046",
    specialty: "Clínica Médica",
    tema: "Pericardite",
    subtema: "Aguda",
    dificuldade: "intermediario",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor que melhora sentado e supra difuso. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "AINE + colchicina (salvo contraindicação) e investigar derrame. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "AINE + colchicina (salvo contraindicação) e investigar derrame Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC pericardial"
  },
  {
    id: "RES-X047",
    specialty: "Clínica Médica",
    tema: "Miocardite",
    subtema: "Pós-viral",
    dificuldade: "avancado",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-viral com dor, troponina+ e coronárias limpas. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Repouso, tratar IC/arritmia e evitar exercício até liberação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Repouso, tratar IC/arritmia e evitar exercício até liberação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC myocarditis"
  },
  {
    id: "RES-X048",
    specialty: "Clínica Médica",
    tema: "Síncope",
    subtema: "Esforço",
    dificuldade: "intermediario",
    age: 69,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com síncope ao esforço e sopro de EA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Internação/avaliação cardiológica urgente — síncope de esforço é alarme. conduta preferencial neste contexto",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Internação/avaliação cardiológica urgente — síncope de esforço é alarme Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC syncope"
  },
  {
    id: "RES-X049",
    specialty: "Clínica Médica",
    tema: "Asma",
    subtema: "Controle",
    dificuldade: "basico",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com uso frequente de SABA. Manutenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Corticoide inalatório (± LABA) conforme GINA; educar técnica e plano de crise",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Corticoide inalatório (± LABA) conforme GINA; educar técnica e plano de crise Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GINA"
  },
  {
    id: "RES-X050",
    specialty: "Clínica Médica",
    tema: "Anafilaxia",
    subtema: "Adrenalina",
    dificuldade: "basico",
    age: 75,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com urticária, broncoespasmo e hipotensão pós-alimento. Conduta?",
    options: {
      A: "Adrenalina IM imediata na face anterolateral da coxa + O2/volume. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Adrenalina IM imediata na face anterolateral da coxa + O2/volume Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WAO anaphylaxis"
  },
  {
    id: "RES-X051",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Crise tireotóxica",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA, febre e Burch-Wartofsky alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Suporte, betabloqueador, tionamida, iodo após tionamida e corticoide; tratar gatilho",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Suporte, betabloqueador, tionamida, iodo após tionamida e corticoide; tratar gatilho Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA thyrotoxicosis"
  },
  {
    id: "RES-X052",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Mixedema",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hipotermia, bradicardia e coma. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "UTI, T4 IV (± T3), corticoide até excluir insuficiência adrenal e suporte. conduta preferencial neste contexto",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem."
    },
    correct: "C",
    explanation: "UTI, T4 IV (± T3), corticoide até excluir insuficiência adrenal e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA myxedema"
  },
  {
    id: "RES-X053",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Hipotireoidismo",
    dificuldade: "basico",
    age: 34,
    vars: {
      tsh: 28
    },
    statement: "{{sexWord}} de {{age}} com TSH {{tsh}} e T4 livre baixo. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Iniciar levotiroxina e reavaliar TSH em 6–8 semanas. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Iniciar levotiroxina e reavaliar TSH em 6–8 semanas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA hypothyroidism"
  },
  {
    id: "RES-X054",
    specialty: "Clínica Médica",
    tema: "Tireoide",
    subtema: "Nódulo",
    dificuldade: "intermediario",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com nódulo tireoidiano e Tirads alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "PAAF conforme risco ecográfico/tamanho; TSH e seguimento estruturado. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "B",
    explanation: "PAAF conforme risco ecográfico/tamanho; TSH e seguimento estruturado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA nodules"
  },
  {
    id: "RES-X055",
    specialty: "Clínica Médica",
    tema: "Adrenal",
    subtema: "Insuficiência aguda",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com choque, hiponatremia e hiperK sob estresse. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Hidrocortisona IV + volume imediatamente — não atrasar por cortisol basal. conduta preferencial neste contexto",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial,.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Hidrocortisona IV + volume imediatamente — não atrasar por cortisol basal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society AI"
  },
  {
    id: "RES-X056",
    specialty: "Clínica Médica",
    tema: "Adrenal",
    subtema: "Cushing",
    dificuldade: "avancado",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com obesidade central, pletora e cortisol livre urinário alto. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      D: "Confirmar hipercortisolismo e depois diferenciar ACTH-dependente vs independente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Confirmar hipercortisolismo e depois diferenciar ACTH-dependente vs independente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society Cushing"
  },
  {
    id: "RES-X057",
    specialty: "Clínica Médica",
    tema: "Adrenal",
    subtema: "Incidentaloma",
    dificuldade: "intermediario",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com massa adrenal de 2,5 cm em TC. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Avaliar funcionalidade (aldo/cortisol/metanefrinas) e características de imagem",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Avaliar funcionalidade (aldo/cortisol/metanefrinas) e características de imagem Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AACE adrenal"
  },
  {
    id: "RES-X058",
    specialty: "Clínica Médica",
    tema: "Paratireoide",
    subtema: "HiperPTH",
    dificuldade: "intermediario",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Ca alto, PTH alto e TFG estável. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Confirmar hiperparatireoidismo primário e avaliar critérios cirúrgicos/densidade óssea",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Confirmar hiperparatireoidismo primário e avaliar critérios cirúrgicos/densidade óssea Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAES PHPT"
  },
  {
    id: "RES-X059",
    specialty: "Clínica Médica",
    tema: "Paratireoide",
    subtema: "Hipocalcemia",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-tireoidectomia com formigamento e Ca baixo. Conduta?",
    options: {
      A: "Reposição de cálcio ± calcitriol e monitorar; IV se grave/sintomático. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Reposição de cálcio ± calcitriol e monitorar; IV se grave/sintomático Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATA hypocalcemia"
  },
  {
    id: "RES-X060",
    specialty: "Clínica Médica",
    tema: "Osteoporose",
    subtema: "Fratura",
    dificuldade: "basico",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com fratura de fêmur por fragilidade. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Tratar causa, cálcio/vit D e anti-reabsortivo/anabólico conforme risco. conduta preferencial neste contexto",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Tratar causa, cálcio/vit D e anti-reabsortivo/anabólico conforme risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AACE osteoporosis"
  },
  {
    id: "RES-X061",
    specialty: "Clínica Médica",
    tema: "DM",
    subtema: "Hipoglicemia grave",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} diabético inconsciente com glicemia 38. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem.",
      E: "Glicose IV (ou glucagon se sem acesso) e investigar causa; ajustar esquema. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Glicose IV (ou glucagon se sem acesso) e investigar causa; ajustar esquema Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA hypoglycemia"
  },
  {
    id: "RES-X062",
    specialty: "Clínica Médica",
    tema: "DM",
    subtema: "Pé diabético",
    dificuldade: "intermediario",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com úlcera plantar e sinais de infecção. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Desbridamento, ATB se infecção, alívio de pressão e avaliar vascular/osteomielite",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Desbridamento, ATB se infecção, alívio de pressão e avaliar vascular/osteomielite Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IWGDF"
  },
  {
    id: "RES-X063",
    specialty: "Clínica Médica",
    tema: "DM",
    subtema: "Retinopatia",
    dificuldade: "basico",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DM2 há 8 anos sem fundo de olho. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Rastrear retinopatia e otimizar glicemia/PA; referir se lesão. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Rastrear retinopatia e otimizar glicemia/PA; referir se lesão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA retinopathy"
  },
  {
    id: "RES-X064",
    specialty: "Clínica Médica",
    tema: "DM",
    subtema: "Neuropatia",
    dificuldade: "basico",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queimação nos pés e monofilamento alterado. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Otimizar glicemia, cuidar dos pés e tratar dor neuropática se presente. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem."
    },
    correct: "C",
    explanation: "Otimizar glicemia, cuidar dos pés e tratar dor neuropática se presente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA neuropathy"
  },
  {
    id: "RES-X065",
    specialty: "Clínica Médica",
    tema: "Obesidade",
    subtema: "Farmacoterapia",
    dificuldade: "intermediario",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IMC 34 e comorbidades após falha de estilo de vida. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Considerar farmacoterapia antiobesidade aprovada + manutenção de hábitos. conduta preferencial neste contexto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Cirurgia bariátrica obrigatória em todo IMC 30 sem tentativa clínica. estratégia que não aborda o mecanismo."
    },
    correct: "C",
    explanation: "Considerar farmacoterapia antiobesidade aprovada + manutenção de hábitos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AACE obesity"
  },
  {
    id: "RES-X066",
    specialty: "Clínica Médica",
    tema: "Obesidade",
    subtema: "Bariátrica",
    dificuldade: "avancado",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IMC 42 e DM2 mal controlado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Avaliar cirurgia metabólica em centro experiente após preparo multidisciplinar"
    },
    correct: "E",
    explanation: "Avaliar cirurgia metabólica em centro experiente após preparo multidisciplinar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASMBS"
  },
  {
    id: "RES-X067",
    specialty: "Clínica Médica",
    tema: "Lipídios",
    subtema: "Hipertrigliceridemia",
    dificuldade: "intermediario",
    age: 76,
    vars: {
      tg: 1800
    },
    statement: "{{sexWord}} de {{age}} com TG {{tg}} e dor abdominal. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Suspender triglicérides orais de risco, volume, insulina/heparina se indicado e fibrato após estabilizar",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Suspender triglicérides orais de risco, volume, insulina/heparina se indicado e fibrato após estabilizar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society lipids"
  },
  {
    id: "RES-X068",
    specialty: "Clínica Médica",
    tema: "Lipídios",
    subtema: "Risco alto",
    dificuldade: "basico",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com LDL 190 sem causa secundária. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Estatina de alta intensidade e investigar hipercolesterolemia familiar. conduta preferencial neste contexto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de."
    },
    correct: "C",
    explanation: "Estatina de alta intensidade e investigar hipercolesterolemia familiar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC lipids"
  },
  {
    id: "RES-X069",
    specialty: "Clínica Médica",
    tema: "Gota",
    subtema: "Crise",
    dificuldade: "basico",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com podagra e sem contraindicação. Conduta aguda. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "AINE, colchicina ou corticoide — escolher conforme comorbidades. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "AINE, colchicina ou corticoide — escolher conforme comorbidades Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR gout"
  },
  {
    id: "RES-X070",
    specialty: "Clínica Médica",
    tema: "Gota",
    subtema: "Profilaxia",
    dificuldade: "intermediario",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com gota tofácea recorrente. Conduta de fundo. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo",
      B: "Iniciar hipouricemiante com profilaxia anti-crise e titular ao alvo de ácido úrico",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Iniciar hipouricemiante com profilaxia anti-crise e titular ao alvo de ácido úrico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR gout"
  },
  {
    id: "RES-X071",
    specialty: "Clínica Médica",
    tema: "AR",
    subtema: "Diagnóstico",
    dificuldade: "intermediario",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com poliartrite simétrica >6 semanas e FR/ACPA+. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar DMARD precoce (ex. metotrexato) + avaliação reumatológica. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Iniciar DMARD precoce (ex. metotrexato) + avaliação reumatológica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR RA"
  },
  {
    id: "RES-X072",
    specialty: "Clínica Médica",
    tema: "LES",
    subtema: "Flare cutâneo-articular",
    dificuldade: "intermediario",
    age: 41,
    vars: {

    },
    statement: "Mulher de {{age}} com LES, rash e artrite sem nefrite. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Hidroxicloroquina base; ajustar imunossupressão conforme gravidade e evitar sol"
    },
    correct: "E",
    explanation: "Hidroxicloroquina base; ajustar imunossupressão conforme gravidade e evitar sol Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EULAR SLE"
  },
  {
    id: "RES-X073",
    specialty: "Clínica Médica",
    tema: "Esclerose",
    subtema: "Crise renal",
    dificuldade: "avancado",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com esclerodermia, PA alta e LRA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "IECA agressivo (mesmo com Cr alta) — crise renal esclerodérmica. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "C",
    explanation: "IECA agressivo (mesmo com Cr alta) — crise renal esclerodérmica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EULAR SSc"
  },
  {
    id: "RES-X074",
    specialty: "Clínica Médica",
    tema: "Vasculite",
    subtema: "Horton",
    dificuldade: "avancado",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cefaleia nova, claudicação mandibular e VHS alto. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Corticoide imediato para proteger visão e biópsia/imagem sem atrasar tratamento",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas."
    },
    correct: "D",
    explanation: "Corticoide imediato para proteger visão e biópsia/imagem sem atrasar tratamento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EULAR GCA"
  },
  {
    id: "RES-X075",
    specialty: "Clínica Médica",
    tema: "Miastenia",
    subtema: "Crise",
    dificuldade: "avancado",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com miastenia e insuficiência respiratória. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor.",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "UTI, suporte ventilatório, PLEX/IVIG e revisar gatilhos/medicamentos. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "UTI, suporte ventilatório, PLEX/IVIG e revisar gatilhos/medicamentos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MGFA"
  },
  {
    id: "RES-X076",
    specialty: "Clínica Médica",
    tema: "Parkinson",
    subtema: "Quedas",
    dificuldade: "intermediario",
    age: 53,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Parkinson e quedas. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Ajustar terapia dopaminérgica, fisioterapia e revisar fármacos que pioram equilíbrio",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Ajustar terapia dopaminérgica, fisioterapia e revisar fármacos que pioram equilíbrio Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MDS Parkinson"
  },
  {
    id: "RES-X077",
    specialty: "Clínica Médica",
    tema: "Demência",
    subtema: "Investigação",
    dificuldade: "basico",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com declínio cognitivo progressivo. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "História, exame, TSH/B12/imagem e rastrear depressão/delirium reversíveis. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "História, exame, TSH/B12/imagem e rastrear depressão/delirium reversíveis Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAN dementia"
  },
  {
    id: "RES-X078",
    specialty: "Clínica Médica",
    tema: "Delirium",
    subtema: "Hospitalar",
    dificuldade: "intermediario",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} confuso no 2º dia de internação. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Tratar causa (infecção/dor/retenção/meds), orientar e evitar contenção/benzo de rotina",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Tratar causa (infecção/dor/retenção/meds), orientar e evitar contenção/benzo de rotina Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NICE delirium"
  },
  {
    id: "RES-X079",
    specialty: "Clínica Médica",
    tema: "Enxaqueca",
    subtema: "Abortiva",
    dificuldade: "basico",
    age: 62,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com migrânea típica sem aura grave. Conduta aguda. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "AINE/triptano precoce conforme perfil; antiemético se náusea. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "AINE/triptano precoce conforme perfil; antiemético se náusea Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHS migraine"
  },
  {
    id: "RES-X080",
    specialty: "Clínica Médica",
    tema: "Enxaqueca",
    subtema: "Profilaxia",
    dificuldade: "intermediario",
    age: 65,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com >8 dias de migrânea/mês. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Profilaxia (beta/antiepiléptico/antidepressivo/anti-CGRP) + diário de crises"
    },
    correct: "E",
    explanation: "Profilaxia (beta/antiepiléptico/antidepressivo/anti-CGRP) + diário de crises Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHS prevention"
  },
  {
    id: "RES-X081",
    specialty: "Clínica Médica",
    tema: "Epilepsia",
    subtema: "1ª crise",
    dificuldade: "intermediario",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} após primeira crise não provocada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Investigar gatilho, EEG/imagem; ASE se alto risco de recorrência. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Investigar gatilho, EEG/imagem; ASE se alto risco de recorrência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ILAE"
  },
  {
    id: "RES-X082",
    specialty: "Clínica Médica",
    tema: "AVC",
    subtema: "Secundária",
    dificuldade: "basico",
    age: 71,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-AVC isquêmico estável. Prevenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Antiagregante (ou anticoag se FA), estatina, PA e estilo de vida. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "D",
    explanation: "Antiagregante (ou anticoag se FA), estatina, PA e estilo de vida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA secondary stroke"
  },
  {
    id: "RES-X083",
    specialty: "Clínica Médica",
    tema: "AIT",
    subtema: "Alto risco",
    dificuldade: "avancado",
    age: 74,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com AIT e ABCD2 alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Investigação urgente (imagem vascular/cardio) e antiagregante precoce. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Investigação urgente (imagem vascular/cardio) e antiagregante precoce Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA TIA"
  },
  {
    id: "RES-X084",
    specialty: "Clínica Médica",
    tema: "Parkinsonismo",
    subtema: "Fármaco",
    dificuldade: "intermediario",
    age: 77,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com rigidez após metoclopramida. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Suspender o fármaco ofensor e tratar sintomas se preciso. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Suspender o fármaco ofensor e tratar sintomas se preciso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Drug-induced parkinsonism"
  },
  {
    id: "RES-X085",
    specialty: "Clínica Médica",
    tema: "Esclerose múltipla",
    subtema: "Surto",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com déficit neurológico novo e lesões típicas. Conduta do surto?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Corticoide em altas doses se déficit funcional e avaliar DMT. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Corticoide em altas doses se déficit funcional e avaliar DMT Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAN MS"
  },
  {
    id: "RES-X086",
    specialty: "Clínica Médica",
    tema: "Meningite",
    subtema: "Listeria",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} >50 anos com meningite bacteriana. Empírico. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Cobrir Listeria (ampicilina) além de pneumococo/meningococo conforme protocolo",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Cobrir Listeria (ampicilina) além de pneumococo/meningococo conforme protocolo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA meningitis"
  },
  {
    id: "RES-X087",
    specialty: "Clínica Médica",
    tema: "Encefalite",
    subtema: "HSV",
    dificuldade: "avancado",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, confusão e temporal na RM. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Aciclovir IV precoce sem atrasar por PCR se alta suspeita. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Aciclovir IV precoce sem atrasar por PCR se alta suspeita Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA encephalitis"
  },
  {
    id: "RES-X088",
    specialty: "Clínica Médica",
    tema: "HIV",
    subtema: "Infecção aguda",
    dificuldade: "intermediario",
    age: 39,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com síndrome mono-like e risco sexual. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Teste Ag/Ab + carga viral se suspeita aguda; orientar PrEP/PEP conforme janela"
    },
    correct: "E",
    explanation: "Teste Ag/Ab + carga viral se suspeita aguda; orientar PrEP/PEP conforme janela Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC HIV"
  },
  {
    id: "RES-X089",
    specialty: "Clínica Médica",
    tema: "HIV",
    subtema: "Oportunista",
    dificuldade: "avancado",
    age: 42,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HIV, CD4 40 e pneumonia hipoxêmica. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      E: "Tratar Pneumocystis (TMP-SMX ± corticoide se hipoxemia) e iniciar TARV no tempo certo"
    },
    correct: "E",
    explanation: "Tratar Pneumocystis (TMP-SMX ± corticoide se hipoxemia) e iniciar TARV no tempo certo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "DHHS OI"
  },
  {
    id: "RES-X090",
    specialty: "Clínica Médica",
    tema: "TB",
    subtema: "Pulmonar",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com tosse >3 semanas, emagrecimento e BAAR+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Notificar e iniciar esquema RIPE supervisionado; isolar conforme protocolo. conduta preferencial neste contexto",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Notificar e iniciar esquema RIPE supervisionado; isolar conforme protocolo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS TB"
  },
  {
    id: "RES-X091",
    specialty: "Clínica Médica",
    tema: "TB",
    subtema: "Latente",
    dificuldade: "basico",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} contato de bacilífero com IGRA+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Tratar infecção latente após excluir doença ativa. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Tratar infecção latente após excluir doença ativa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC LTBI"
  },
  {
    id: "RES-X092",
    specialty: "Clínica Médica",
    tema: "COVID",
    subtema: "Grave",
    dificuldade: "intermediario",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com COVID, Sat 88% e necessidade de O2. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "O2, corticoide se hipoxêmico, tromboprofilaxia e cuidados de suporte. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "O2, corticoide se hipoxêmico, tromboprofilaxia e cuidados de suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NIH COVID"
  },
  {
    id: "RES-X093",
    specialty: "Clínica Médica",
    tema: "Influenza",
    subtema: "Risco",
    dificuldade: "basico",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com síndrome gripal e comorbidade. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Oseltamivir precoce se indicado + suporte; vacinar na prevenção. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Oseltamivir precoce se indicado + suporte; vacinar na prevenção Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC influenza"
  },
  {
    id: "RES-X094",
    specialty: "Clínica Médica",
    tema: "Dengue",
    subtema: "Alarme",
    dificuldade: "intermediario",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dengue, dor abdominal e hemoconcentração. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Hidratação criteriosa, vigilância de choque e evitar AINE. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Hidratação criteriosa, vigilância de choque e evitar AINE Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS dengue"
  },
  {
    id: "RES-X095",
    specialty: "Clínica Médica",
    tema: "Leptospirose",
    subtema: "Icterícia",
    dificuldade: "avancado",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, mialgia de panturrilha e icterícia pós-enchente. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "ATB precoce (penicilina/doxiciclina/ceftriaxona conforme gravidade) e suporte"
    },
    correct: "E",
    explanation: "ATB precoce (penicilina/doxiciclina/ceftriaxona conforme gravidade) e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS leptospirose"
  },
  {
    id: "RES-X096",
    specialty: "Clínica Médica",
    tema: "Malária",
    subtema: "Falciparum",
    dificuldade: "avancado",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} febril após área endêmica com gota espessa+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratamento antimalárico imediato conforme espécie/gravidade e suporte. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Tratamento antimalárico imediato conforme espécie/gravidade e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WHO malaria"
  },
  {
    id: "RES-X097",
    specialty: "Clínica Médica",
    tema: "Sífilis",
    subtema: "Secundária",
    dificuldade: "intermediario",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com rash palmoplantar e VDRL alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Penicilina benzatina conforme estágio; tratar parceiros e notificar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Penicilina benzatina conforme estágio; tratar parceiros e notificar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC syphilis"
  },
  {
    id: "RES-X098",
    specialty: "Clínica Médica",
    tema: "Gonorreia",
    subtema: "Uretrite",
    dificuldade: "basico",
    age: 69,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com secreção uretral purulenta. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Ceftriaxona (± cobertura de clamídia conforme protocolo) e tratar parceiro. conduta preferencial neste contexto",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Ceftriaxona (± cobertura de clamídia conforme protocolo) e tratar parceiro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC STI"
  },
  {
    id: "RES-X099",
    specialty: "Clínica Médica",
    tema: "Celulite",
    subtema: "Não purulenta",
    dificuldade: "basico",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com eritema quente em membro sem abscesso. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "ATB cobrindo estreptococo/MSSA e elevar membro; avaliar gravidade. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "ATB cobrindo estreptococo/MSSA e elevar membro; avaliar gravidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA SSTI"
  },
  {
    id: "RES-X100",
    specialty: "Clínica Médica",
    tema: "Abscesso",
    subtema: "Drenagem",
    dificuldade: "basico",
    age: 75,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com abscesso cutâneo flutuante. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Incisão e drenagem; ATB se celulite/sistema ou imunossupressão. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Incisão e drenagem; ATB se celulite/sistema ou imunossupressão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA SSTI"
  },
  {
    id: "RES-X101",
    specialty: "Clínica Médica",
    tema: "Osteomielite",
    subtema: "Crônica",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com úlcera profunda e osso exposto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Imagem, cultura óssea se possível, ATB prolongado e avaliação cirúrgica. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Imagem, cultura óssea se possível, ATB prolongado e avaliação cirúrgica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA osteomyelitis"
  },
  {
    id: "RES-X102",
    specialty: "Clínica Médica",
    tema: "Endocardite",
    subtema: "Profilaxia",
    dificuldade: "intermediario",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com prótese valvar antes de procedimento dental invasivo. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Profilaxia antibiótica conforme indicação de alto risco. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Profilaxia antibiótica conforme indicação de alto risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA IE prophylaxis"
  },
  {
    id: "RES-X103",
    specialty: "Clínica Médica",
    tema: "Pneumonia",
    subtema: "Aspiração",
    dificuldade: "intermediario",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com AVC e infiltrado em segmento dependente. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "ATB cobrindo anaeróbios se indicado, suporte e prevenção de nova aspiração. conduta preferencial neste contexto",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "ATB cobrindo anaeróbios se indicado, suporte e prevenção de nova aspiração Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA aspiration"
  },
  {
    id: "RES-X104",
    specialty: "Clínica Médica",
    tema: "Derrame",
    subtema: "Parapneumônico",
    dificuldade: "avancado",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pneumonia e derrame septado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Drenagem + ATB; avaliar fibrinolítico/cirurgia se loculado. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Drenagem + ATB; avaliar fibrinolítico/cirurgia se loculado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "BTS pleural"
  },
  {
    id: "RES-X105",
    specialty: "Clínica Médica",
    tema: "Asma",
    subtema: "Degrau",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com asma não controlada em CI baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Subir degrau (CI/LABA), revisar técnica/adesão e gatilhos. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Subir degrau (CI/LABA), revisar técnica/adesão e gatilhos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GINA"
  },
  {
    id: "RES-X106",
    specialty: "Clínica Médica",
    tema: "DPOC",
    subtema: "Oxigenoterapia",
    dificuldade: "avancado",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DPOC e PaO2 52 em ar ambiente estável. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Oxigenoterapia domiciliar contínua se critérios; alvo 88–92%. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Oxigenoterapia domiciliar contínua se critérios; alvo 88–92% Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GOLD"
  },
  {
    id: "RES-X107",
    specialty: "Clínica Médica",
    tema: "SAOS",
    subtema: "CPAP",
    dificuldade: "intermediario",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} obeso com sonolência e IAH alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "CPAP + perda de peso e avaliar risco cardiovascular. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "CPAP + perda de peso e avaliar risco cardiovascular Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AASM OSA"
  },
  {
    id: "RES-X108",
    specialty: "Clínica Médica",
    tema: "TEP",
    subtema: "Baixo risco",
    dificuldade: "basico",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TEP pequeno, estável, sem VD. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Anticoagulação e avaliar ambulatorização selecionada. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Anticoagulação e avaliar ambulatorização selecionada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC PE"
  },
  {
    id: "RES-X109",
    specialty: "Clínica Médica",
    tema: "TVP",
    subtema: "Câncer",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com câncer ativo e TVP. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Anticoagular (DOAC ou HBPM conforme cenário) por ≥3–6 meses. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Anticoagular (DOAC ou HBPM conforme cenário) por ≥3–6 meses Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH VTE cancer"
  },
  {
    id: "RES-X110",
    specialty: "Clínica Médica",
    tema: "IC",
    subtema: "Descompensação",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IC, ganho de peso e edema. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      E: "Intensificar diurético, revisar precipitantes e otimizar terapia de base. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Intensificar diurético, revisar precipitantes e otimizar terapia de base Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF"
  },
  {
    id: "RES-X111",
    specialty: "Clínica Médica",
    tema: "IC",
    subtema: "Ferro",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ICFER e deficiência de ferro. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      B: "Considerar ferro IV para sintomas/reduzir hospitalização conforme evidência. conduta preferencial neste contexto",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Considerar ferro IV para sintomas/reduzir hospitalização conforme evidência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF iron"
  },
  {
    id: "RES-X112",
    specialty: "Clínica Médica",
    tema: "IAM",
    subtema: "Complicação",
    dificuldade: "avancado",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-IAM com sopro novo e choque. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Suspeitar CIV/IM aguda: estabilizar e cirurgia/intervenção urgente. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Suspeitar CIV/IM aguda: estabilizar e cirurgia/intervenção urgente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC STEMI complications"
  },
  {
    id: "RES-X113",
    specialty: "Clínica Médica",
    tema: "Pericárdio",
    subtema: "Tamponamento",
    dificuldade: "avancado",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com turgência jugular, hipotensão e pulso paradoxal. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Ecocardiograma e pericardiocentese urgente se tamponamento. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Ecocardiograma e pericardiocentese urgente se tamponamento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC pericardial"
  },
  {
    id: "RES-X114",
    specialty: "Clínica Médica",
    tema: "Valva",
    subtema: "IM aguda",
    dificuldade: "avancado",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com EAP e sopro sistólico novo pós-IAM. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suporte, vasodilatação se PA permitir e avaliação cirúrgica urgente. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Suporte, vasodilatação se PA permitir e avaliação cirúrgica urgente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC valvular"
  },
  {
    id: "RES-X115",
    specialty: "Clínica Médica",
    tema: "Aorta",
    subtema: "Dissecção",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor torácica lacerante e assimetria de PA. Conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Controle de PA/FC e TC/TEE urgente; cirurgia se tipo A. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Controle de PA/FC e TC/TEE urgente; cirurgia se tipo A Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA aortic"
  },
  {
    id: "RES-X116",
    specialty: "Clínica Médica",
    tema: "HDA",
    subtema: "Úlcera",
    dificuldade: "intermediario",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com melena, PA 100/60. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "ABC, reposição, IBP IV e endoscopia precoce. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "ABC, reposição, IBP IV e endoscopia precoce Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG UGIB"
  },
  {
    id: "RES-X117",
    specialty: "Clínica Médica",
    tema: "HDB",
    subtema: "Instável",
    dificuldade: "avancado",
    age: 76,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com enterorragia maciça e choque. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Reanimação, localizar sangramento (angio/endoscopia) e hemostasia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Reanimação, localizar sangramento (angio/endoscopia) e hemostasia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG LGIB"
  },
  {
    id: "RES-X118",
    specialty: "Clínica Médica",
    tema: "DII",
    subtema: "Retocolite grave",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com RCU, >10 evacuações e taquicardia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      C: "Internar, corticoide IV, tromboprofilaxia e resgate/cirurgia se refratário. conduta preferencial neste contexto",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Internar, corticoide IV, tromboprofilaxia e resgate/cirurgia se refratário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ECCO UC"
  },
  {
    id: "RES-X119",
    specialty: "Clínica Médica",
    tema: "DII",
    subtema: "Crohn fistula",
    dificuldade: "avancado",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Crohn e fístula perianal. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "ATB, drenagem se abscesso e terapia biológica/cirurgia conforme extensão. conduta preferencial neste contexto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "ATB, drenagem se abscesso e terapia biológica/cirurgia conforme extensão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ECCO Crohn"
  },
  {
    id: "RES-X120",
    specialty: "Clínica Médica",
    tema: "Doença celíaca",
    subtema: "Diagnóstico",
    dificuldade: "intermediario",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com diarreia crônica e anti-tTG IgA alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Confirmar com biópsia (se indicado) e dieta sem glúten com nutricionista. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Confirmar com biópsia (se indicado) e dieta sem glúten com nutricionista Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG celiac"
  },
  {
    id: "RES-X121",
    specialty: "Clínica Médica",
    tema: "SII",
    subtema: "Diagnóstico",
    dificuldade: "basico",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor relacionada a evacuação sem alarmes. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Critérios de Roma, educar, fibra/soluble e tratar subtipo; investigar alarmes",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Critérios de Roma, educar, fibra/soluble e tratar subtipo; investigar alarmes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACG IBS"
  },
  {
    id: "RES-X122",
    specialty: "Clínica Médica",
    tema: "Hepatite",
    subtema: "B crônica",
    dificuldade: "avancado",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} HBsAg+ com ALT alta e carga viral elevada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor. abordagem inadequada para o cenário.",
      C: "Avaliar fibrose e tratar com análogo (tenofovir/entecavir) se indicado. conduta preferencial neste contexto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Avaliar fibrose e tratar com análogo (tenofovir/entecavir) se indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AASLD HBV"
  },
  {
    id: "RES-X123",
    specialty: "Clínica Médica",
    tema: "Hepatite",
    subtema: "C",
    dificuldade: "intermediario",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anti-HCV+ e RNA detectável. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Tratar com AAD pangenotípico conforme esquema e avaliar fígado. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Tratar com AAD pangenotípico conforme esquema e avaliar fígado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AASLD HCV"
  },
  {
    id: "RES-X124",
    specialty: "Clínica Médica",
    tema: "Cirrose",
    subtema: "Varizes",
    dificuldade: "intermediario",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com varizes grandes na EDA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Betabloqueador não seletivo ou ligadura conforme cenário. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "D",
    explanation: "Betabloqueador não seletivo ou ligadura conforme cenário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Baveno"
  },
  {
    id: "RES-X125",
    specialty: "Clínica Médica",
    tema: "Cirrose",
    subtema: "CHC rastreio",
    dificuldade: "basico",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cirrose compensada. Rastreio. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "US (± AFP) a cada 6 meses para carcinoma hepatocelular. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "US (± AFP) a cada 6 meses para carcinoma hepatocelular Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AASLD HCC"
  },
  {
    id: "RES-X126",
    specialty: "Clínica Médica",
    tema: "Pancreatite",
    subtema: "Necrose infectada",
    dificuldade: "avancado",
    age: 53,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pancreatite e piora tardia, gás na TC. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "ATB + abordagem step-up (dreno/necrosectomia) em centro experiente. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "ATB + abordagem step-up (dreno/necrosectomia) em centro experiente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IAP/APA"
  },
  {
    id: "RES-X127",
    specialty: "Clínica Médica",
    tema: "Colelitíase",
    subtema: "Cólica",
    dificuldade: "basico",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cólica biliar e US com cálculos. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Analgesia e colecistectomia eletiva se sintomática. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Analgesia e colecistectomia eletiva se sintomática Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Tokyo"
  },
  {
    id: "RES-X128",
    specialty: "Clínica Médica",
    tema: "Colangite",
    subtema: "Tokyo",
    dificuldade: "avancado",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, icterícia e dor em HD. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "ATB + descompressão biliar urgente (CPRE) na colangite. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "B",
    explanation: "ATB + descompressão biliar urgente (CPRE) na colangite Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Tokyo cholangitis"
  },
  {
    id: "RES-X129",
    specialty: "Clínica Médica",
    tema: "Anemia",
    subtema: "B12",
    dificuldade: "basico",
    age: 62,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com VCM alto, formigamento e B12 baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Reposição de B12 e investigar causa (IF, dieta, fármacos). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Reposição de B12 e investigar causa (IF, dieta, fármacos) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH B12"
  },
  {
    id: "RES-X130",
    specialty: "Clínica Médica",
    tema: "Anemia",
    subtema: "Hemolítica",
    dificuldade: "avancado",
    age: 65,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anemia, LDH alta, bilirrubina indireta e haptoglobina baixa. Conduta?",
    options: {
      A: "Confirmar hemolise, Coombs e tratar conforme etiologia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Confirmar hemolise, Coombs e tratar conforme etiologia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH hemolysis"
  },
  {
    id: "RES-X131",
    specialty: "Clínica Médica",
    tema: "PTT",
    subtema: "Suspeita",
    dificuldade: "avancado",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAHA, plaquetopenia e neurológico. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "PLEX urgente + corticoide; caplacizumab conforme protocolo — não esperar ADAMTS13",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício."
    },
    correct: "B",
    explanation: "PLEX urgente + corticoide; caplacizumab conforme protocolo — não esperar ADAMTS13 Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISTH TTP"
  },
  {
    id: "RES-X132",
    specialty: "Clínica Médica",
    tema: "PTI",
    subtema: "Sangramento",
    dificuldade: "intermediario",
    age: 71,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PTI e sangramento mucoso, plaq 8 mil. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Corticoide ± IgIV e avaliar necessidade de transfusão de plaqueta se grave. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Corticoide ± IgIV e avaliar necessidade de transfusão de plaqueta se grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH ITP"
  },
  {
    id: "RES-X133",
    specialty: "Clínica Médica",
    tema: "Neutropenia febril",
    subtema: "Urgência",
    dificuldade: "avancado",
    age: 74,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} oncológico com neutrófilos 200 e febre. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Hemoculturas e ATB de amplo espectro imediato. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Hemoculturas e ATB de amplo espectro imediato Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA FN"
  },
  {
    id: "RES-X134",
    specialty: "Clínica Médica",
    tema: "TEV",
    subtema: "Profilaxia hospitalar",
    dificuldade: "basico",
    age: 77,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} internado clínico de alto risco. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Profilaxia farmacológica (ou mecânica se sangramento) conforme risco. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Profilaxia farmacológica (ou mecânica se sangramento) conforme risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASH prophylaxis"
  },
  {
    id: "RES-X135",
    specialty: "Clínica Médica",
    tema: "Asma",
    subtema: "Gestação",
    dificuldade: "intermediario",
    age: 30,
    vars: {

    },
    statement: "Gestante de {{age}} com asma sintomática. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter CI (± LABA) — controlar asma protege o feto; evitar SABA isolado crônico",
      B: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Manter CI (± LABA) — controlar asma protege o feto; evitar SABA isolado crônico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GINA pregnancy"
  },
  {
    id: "RES-X136",
    specialty: "Clínica Médica",
    tema: "Trombo",
    subtema: "Gestação",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "Gestante de {{age}} com TVP confirmada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "HBPM na gestação; evitar DOAC/varfarina (exceto cenários específicos de valva)",
      D: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "HBPM na gestação; evitar DOAC/varfarina (exceto cenários específicos de valva) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG VTE"
  },
  {
    id: "RES-X137",
    specialty: "Clínica Médica",
    tema: "HAS",
    subtema: "Resistente",
    dificuldade: "avancado",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PA alta em 3 classes na dose máxima. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Confirmar adesão/MAPA, otimizar diurético e investigar secundárias. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Confirmar adesão/MAPA, otimizar diurético e investigar secundárias Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA resistant HTN"
  },
  {
    id: "RES-X138",
    specialty: "Clínica Médica",
    tema: "HAS",
    subtema: "Secundária",
    dificuldade: "intermediario",
    age: 39,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} jovem com HAS súbita e hipocalemia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Investigar hiperaldosteronismo e outras causas secundárias. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Investigar hiperaldosteronismo e outras causas secundárias Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society PA"
  },
  {
    id: "RES-X139",
    specialty: "Clínica Médica",
    tema: "Rinite",
    subtema: "Alérgica",
    dificuldade: "basico",
    age: 42,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com espirros sazonais e coriza. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Corticoide nasal ± anti-histamínico e controle ambiental. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Corticoide nasal ± anti-histamínico e controle ambiental Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ARIA"
  },
  {
    id: "RES-X140",
    specialty: "Clínica Médica",
    tema: "Sinusite",
    subtema: "Bacteriana",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sinusite >10 dias ou piora bipásica. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "ATB se critérios bacterianos; corticóide nasal e analgesia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "ATB se critérios bacterianos; corticóide nasal e analgesia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA sinusitis"
  },
  {
    id: "RES-X141",
    specialty: "Clínica Médica",
    tema: "Faringite",
    subtema: "Estrepto",
    dificuldade: "basico",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Centor alto e teste estrepto+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Penicilina/amoxicilina conforme protocolo e sintomáticos. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Penicilina/amoxicilina conforme protocolo e sintomáticos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA pharyngitis"
  },
  {
    id: "RES-X142",
    specialty: "Clínica Médica",
    tema: "Otite",
    subtema: "Externa",
    dificuldade: "basico",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor à tração do pavilhão e conduto edemaciado. Conduta?",
    options: {
      A: "Analgesia e gotas otológicas com cobertura adequada; evitar irrigação se perfuração",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Analgesia e gotas otológicas com cobertura adequada; evitar irrigação se perfuração Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAO-HNS"
  },
  {
    id: "RES-X143",
    specialty: "Clínica Médica",
    tema: "Glaucoma",
    subtema: "Agudo",
    dificuldade: "avancado",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com olho vermelho, dor e pupila média fixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Emergência oftalmológica — baixar PIO e avaliar iridotomia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Emergência oftalmológica — baixar PIO e avaliar iridotomia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAO glaucoma"
  },
  {
    id: "RES-X144",
    specialty: "Clínica Médica",
    tema: "Cefaleia",
    subtema: "Alarme",
    dificuldade: "avancado",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com “pior cefaleia da vida” súbita. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "TC ± punção para hemorragia subaracnóide — não tratar como enxaqueca. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "TC ± punção para hemorragia subaracnóide — não tratar como enxaqueca Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA SAH"
  },
  {
    id: "RES-X145",
    specialty: "Clínica Médica",
    tema: "Intoxicação",
    subtema: "Paracetamol",
    dificuldade: "avancado",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ingestão de paracetamol e ALT em ascensão. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "N-acetilcisteína conforme nomograma/risco e suporte hepático. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "N-acetilcisteína conforme nomograma/risco e suporte hepático Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Poison control APAP"
  },
  {
    id: "RES-X146",
    specialty: "Clínica Médica",
    tema: "Intoxicação",
    subtema: "Opioide",
    dificuldade: "basico",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com miose, bradipneia e coma. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "ABC e naloxona titulada; observar recidiva. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "ABC e naloxona titulada; observar recidiva Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACLS opioid"
  },
  {
    id: "RES-X147",
    specialty: "Clínica Médica",
    tema: "Intoxicação",
    subtema: "Benzodiazepínico",
    dificuldade: "intermediario",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} sedado por benzo, estável respiratório. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Suporte; flumazenil só em selecionados (risco de crise). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Suporte; flumazenil só em selecionados (risco de crise) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Poison benzo"
  },
  {
    id: "RES-X148",
    specialty: "Clínica Médica",
    tema: "Queimadura",
    subtema: "Fluido",
    dificuldade: "avancado",
    age: 69,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queimadura extensa. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "ABC, Parkland/ajuste por meta urinária e cobrir feridas; transferir se critério",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "ABC, Parkland/ajuste por meta urinária e cobrir feridas; transferir se critério Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ABA burn"
  },
  {
    id: "RES-X149",
    specialty: "Clínica Médica",
    tema: "Anafilaxia",
    subtema: "Observação",
    dificuldade: "intermediario",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} após adrenalina por anafilaxia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Observar risco bifásico, prescrever autoinjetor e investigar gatilho. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Observar risco bifásico, prescrever autoinjetor e investigar gatilho Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WAO"
  },
  {
    id: "RES-X150",
    specialty: "Clínica Médica",
    tema: "Urticária",
    subtema: "Aguda",
    dificuldade: "basico",
    age: 75,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com urticária sem anafilaxia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Anti-histamínico de 2ª geração; investigar gatilho; adrenalina se progressão sistêmica",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Anti-histamínico de 2ª geração; investigar gatilho; adrenalina se progressão sistêmica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAACI urticaria"
  },
  {
    id: "RES-X151",
    specialty: "Clínica Médica",
    tema: "Dermatite",
    subtema: "Contato",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com eczema em área de contato com níquel. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Evitar alérgeno, corticoide tópico e emolientes. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Evitar alérgeno, corticoide tópico e emolientes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAD dermatitis"
  },
  {
    id: "RES-X152",
    specialty: "Clínica Médica",
    tema: "Psoríase",
    subtema: "Placas",
    dificuldade: "intermediario",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com placas extensas refratárias ao tópico. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Avaliar fototerapia/sistêmico/biológico e rastrear artrite/metabólico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Avaliar fototerapia/sistêmico/biológico e rastrear artrite/metabólico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAD psoriasis"
  },
  {
    id: "RES-X153",
    specialty: "Clínica Médica",
    tema: "Lúpus cutâneo",
    subtema: "Fotoproteção",
    dificuldade: "basico",
    age: 34,
    vars: {

    },
    statement: "Mulher de {{age}} com LES e lesões fotossensíveis. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Fotoproteção + hidroxicloroquina e tratar lesões conforme extensão. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Fotoproteção + hidroxicloroquina e tratar lesões conforme extensão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EULAR SLE"
  },
  {
    id: "RES-X154",
    specialty: "Clínica Médica",
    tema: "Raiva",
    subtema: "Exposição",
    dificuldade: "avancado",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} mordido por cão suspeito sem vacina prévia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Lavar ferida, vacina antirrábica ± IGR e avaliar animal. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "Lavar ferida, vacina antirrábica ± IGR e avaliar animal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WHO rabies"
  },
  {
    id: "RES-X155",
    specialty: "Clínica Médica",
    tema: "Tétano",
    subtema: "Ferida",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ferida contaminada e vacina duvidosa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Limpeza, vacina (± soro) conforme status vacinal e ATB se indicado. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Limpeza, vacina (± soro) conforme status vacinal e ATB se indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC tetanus"
  },
  {
    id: "RES-X156",
    specialty: "Clínica Médica",
    tema: "Sepse",
    subtema: "Culturas",
    dificuldade: "basico",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sepse. Sobre culturas. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Coletar antes do ATB se não atrasar a 1ª dose; depois ATB imediato. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Coletar antes do ATB se não atrasar a 1ª dose; depois ATB imediato Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SSC"
  },
  {
    id: "RES-X157",
    specialty: "Clínica Médica",
    tema: "Choque",
    subtema: "Distributivo",
    dificuldade: "intermediario",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sepse, PAM baixa após volume. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Noradrenalina como vasopressor de primeira linha e reavaliar perfusão. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Noradrenalina como vasopressor de primeira linha e reavaliar perfusão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SSC"
  },
  {
    id: "RES-X158",
    specialty: "Clínica Médica",
    tema: "IRA",
    subtema: "Pré-renal",
    dificuldade: "basico",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com diarreia, ureia/Cr altas e FENa baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Reposição volêmica e suspender nefrotóxicos; reavaliar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Reposição volêmica e suspender nefrotóxicos; reavaliar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO AKI"
  },
  {
    id: "RES-X159",
    specialty: "Clínica Médica",
    tema: "Hiponatremia",
    subtema: "Grave sintomática",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Na 112 e convulsão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Bolus de SF 3% para interromper sintomas graves e depois correção controlada"
    },
    correct: "E",
    explanation: "Bolus de SF 3% para interromper sintomas graves e depois correção controlada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "European hyponatremia"
  },
  {
    id: "RES-X160",
    specialty: "Clínica Médica",
    tema: "Hipernatremia",
    subtema: "Hipovolêmica",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} desidratado com Na 158. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Restaurar volume com cristaloides e depois corrigir água livre lentamente. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Água livre isolada em choque hipovolêmico sem restaurar perfusão. estratégia que não aborda o mecanismo."
    },
    correct: "A",
    explanation: "Restaurar volume com cristaloides e depois corrigir água livre lentamente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Narrative electrolytes"
  },
  {
    id: "RES-X161",
    specialty: "Clínica Médica",
    tema: "Hipercalemia",
    subtema: "ECG",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com K 7,1 e QRS alargado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Cálcio IV para estabilizar membrana + shifts + remoção (diurético/binder/diálise)",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Cálcio IV para estabilizar membrana + shifts + remoção (diurético/binder/diálise) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA hyperK"
  },
  {
    id: "RES-X162",
    specialty: "Clínica Médica",
    tema: "Acidose",
    subtema: "Metabólica AG",
    dificuldade: "avancado",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pH 7,1, HCO3 6 e ânion gap alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratar causa (CAD/lactato/toxinas); bicarbonato só em cenários selecionados. conduta preferencial neste contexto",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Tratar causa (CAD/lactato/toxinas); bicarbonato só em cenários selecionados Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Acid-base reviews"
  },
  {
    id: "RES-X163",
    specialty: "Clínica Médica",
    tema: "Alcalose",
    subtema: "Metabólica",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com vômitos e HCO3 38. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Reposição de volume e cloreto (SF) + K; tratar a causa. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Reposição de volume e cloreto (SF) + K; tratar a causa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Acid-base"
  },
  {
    id: "RES-X164",
    specialty: "Clínica Médica",
    tema: "Distúrbio",
    subtema: "Misto",
    dificuldade: "avancado",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DPOC e sepse: pH 7,35, pCO2 60, HCO3 32, AG alto. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Reconhecer alcalose metabólica/compensação + acidose metabólica agregada; tratar ambos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Reconhecer alcalose metabólica/compensação + acidose metabólica agregada; tratar ambos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Acid-base"
  },
  {
    id: "RES-X165",
    specialty: "Clínica Médica",
    tema: "Nutrição",
    subtema: "Refeeding",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} desnutrido inicia dieta e P cai a 1,0. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Reconhecer refeeding: repor P/Mg/K, tiamina e avançar dieta com cautela. conduta preferencial neste contexto",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo."
    },
    correct: "B",
    explanation: "Reconhecer refeeding: repor P/Mg/K, tiamina e avançar dieta com cautela Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASPEN refeeding"
  },
  {
    id: "RES-X166",
    specialty: "Clínica Médica",
    tema: "Nutrição",
    subtema: "Hospitalar",
    dificuldade: "basico",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} internado com jejum prolongado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      D: "Avaliar risco nutricional e iniciar suporte enteral precoce se possível. conduta preferencial neste contexto",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Avaliar risco nutricional e iniciar suporte enteral precoce se possível Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESPEN"
  },
  {
    id: "RES-X167",
    specialty: "Clínica Médica",
    tema: "Cuidados",
    subtema: "Paliativos",
    dificuldade: "intermediario",
    age: 76,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com doença avançada e dispneia refratária. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Aliviar sintoma (opioide titulado), comunicar e alinhar metas de cuidado. conduta preferencial neste contexto",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Aliviar sintoma (opioide titulado), comunicar e alinhar metas de cuidado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NICE palliative"
  },
  {
    id: "RES-X168",
    specialty: "Clínica Médica",
    tema: "Ética",
    subtema: "Consentimento",
    dificuldade: "basico",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} recusa procedimento com capacidade preservada. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Respeitar recusa informada após explicar riscos/benefícios e alternativas. conduta preferencial neste contexto",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo."
    },
    correct: "D",
    explanation: "Respeitar recusa informada após explicar riscos/benefícios e alternativas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CFM ética"
  },
  {
    id: "RES-X169",
    specialty: "Clínica Médica",
    tema: "Prevenção",
    subtema: "Câncer colo",
    dificuldade: "basico",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} de 52 anos assintomático. Rastreio. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Colonoscopia ou método validado conforme diretriz/idade/risco. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Colonoscopia ou método validado conforme diretriz/idade/risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "USPSTF CRC"
  },
  {
    id: "RES-X170",
    specialty: "Clínica Médica",
    tema: "Prevenção",
    subtema: "Mama",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "Mulher de {{age}} na faixa de rastreio. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Mamografia conforme diretriz etária/risco e exame clínico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Mamografia conforme diretriz etária/risco e exame clínico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "USPSTF breast"
  },
  {
    id: "RES-X171",
    specialty: "Clínica Médica",
    tema: "Prevenção",
    subtema: "Próstata",
    dificuldade: "intermediario",
    age: 38,
    vars: {

    },
    statement: "Homem de {{age}} pergunta sobre PSA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Decisão compartilhada sobre riscos/benefícios do rastreio. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Decisão compartilhada sobre riscos/benefícios do rastreio Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "USPSTF PSA"
  },
  {
    id: "RES-X201",
    specialty: "Pediatria",
    tema: "Bronquiolite",
    subtema: "Suporte",
    dificuldade: "basico",
    age: 0.5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sibilância e Sat 91%. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suporte com O2 se hipoxemia, hidratação e aspiração nasal; evitar terapias inúteis de rotina",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Suporte com O2 se hipoxemia, hidratação e aspiração nasal; evitar terapias inúteis de rotina Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP bronchiolitis"
  },
  {
    id: "RES-X202",
    specialty: "Pediatria",
    tema: "Crupe",
    subtema: "Dexametasona",
    dificuldade: "basico",
    age: 1,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com tosse metálica e estridor em repouso. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar particularidades pediátricas Esta abordagem atrasa a terapia com melhor.",
      C: "Dexametasona ± adrenalina nebulizada se estridor em repouso. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Dexametasona ± adrenalina nebulizada se estridor em repouso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP croup"
  },
  {
    id: "RES-X203",
    specialty: "Pediatria",
    tema: "OMA",
    subtema: "Analgesia",
    dificuldade: "intermediario",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com otalgia e tímpano abaulado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      B: "Analgesia; ATB imediato se <6 meses/grave ou observação vigilante selecionada",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Analgesia; ATB imediato se <6 meses/grave ou observação vigilante selecionada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP AOM"
  },
  {
    id: "RES-X204",
    specialty: "Pediatria",
    tema: "GECA",
    subtema: "TRO",
    dificuldade: "basico",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} desidratado por diarreia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Reidratação oral se possível; IV se grave; evitar antimotilidade no lactente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Reidratação oral se possível; IV se grave; evitar antimotilidade no lactente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WHO diarrhea"
  },
  {
    id: "RES-X205",
    specialty: "Pediatria",
    tema: "Crise febril",
    subtema: "Simples",
    dificuldade: "basico",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com crise febril simples típica. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Anticonvulsivante crônico de rotina em toda crise febril simples. estratégia que não aborda o mecanismo.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Orientar, tratar o foco febril; sem anticonvulsivante crônico na simples típica",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Orientar, tratar o foco febril; sem anticonvulsivante crônico na simples típica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP febrile seizures"
  },
  {
    id: "RES-X206",
    specialty: "Pediatria",
    tema: "CAD ped",
    subtema: "K",
    dificuldade: "avancado",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com CAD e K 3,0. Risco. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Repor K e seguir protocolo pediátrico — insulina precoce com K baixo arrisca arritmia/edema cerebral",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Repor K e seguir protocolo pediátrico — insulina precoce com K baixo arrisca arritmia/edema cerebral Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPAD DKA"
  },
  {
    id: "RES-X207",
    specialty: "Pediatria",
    tema: "Icterícia",
    subtema: "Fototerapia",
    dificuldade: "intermediario",
    age: 10,
    vars: {

    },
    statement: "RN de {{age}} com bilirrubina em zona de fototerapia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Fototerapia conforme nomograma, garantir ingestão e investigar se precoce/grave",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Fototerapia conforme nomograma, garantir ingestão e investigar se precoce/grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP hyperbilirubinemia"
  },
  {
    id: "RES-X208",
    specialty: "Pediatria",
    tema: "Sepse neonatal",
    subtema: "ATB",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "RN de {{age}} com má perfusão e risco intraparto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável",
      E: "Culturas + ATB empírico precoce (ampicilina+gentamicina típico) e suporte. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Culturas + ATB empírico precoce (ampicilina+gentamicina típico) e suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP neonatal sepsis"
  },
  {
    id: "RES-X209",
    specialty: "Pediatria",
    tema: "Invaginação",
    subtema: "Urgência",
    dificuldade: "avancado",
    age: 14,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com choro intermitente e fezes em geleia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Estabilizar e redução radiológica/cirúrgica conforme gravidade. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Estabilizar e redução radiológica/cirúrgica conforme gravidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric surgery"
  },
  {
    id: "RES-X210",
    specialty: "Pediatria",
    tema: "Anafilaxia ped",
    subtema: "Adrenalina",
    dificuldade: "basico",
    age: 0.5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anafilaxia alimentar. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adrenalina IM imediata na coxa + suporte e observação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Adrenalina IM imediata na coxa + suporte e observação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WAO"
  },
  {
    id: "RES-X211",
    specialty: "Pediatria",
    tema: "Asma ped",
    subtema: "Crise",
    dificuldade: "intermediario",
    age: 1,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com crise asmática moderada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "SABA ± ipratrópio, corticoide sistêmico e O2 se hipoxemia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "SABA ± ipratrópio, corticoide sistêmico e O2 se hipoxemia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "GINA ped"
  },
  {
    id: "RES-X212",
    specialty: "Pediatria",
    tema: "Pneumonia ped",
    subtema: "Comunitária",
    dificuldade: "basico",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre, taquipneia e infiltrado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução,.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "ATB empírico conforme idade/gravidade e suporte; internar se critérios. conduta preferencial neste contexto",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "ATB empírico conforme idade/gravidade e suporte; internar se critérios Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SBP pneumonia"
  },
  {
    id: "RES-X213",
    specialty: "Pediatria",
    tema: "ITU ped",
    subtema: "Febril",
    dificuldade: "intermediario",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre sem foco e urinálise sugestiva. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Cultura + ATB; imagem conforme idade/recorrência (US ± DMSA/MCU). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "D",
    explanation: "Cultura + ATB; imagem conforme idade/recorrência (US ± DMSA/MCU) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP UTI"
  },
  {
    id: "RES-X214",
    specialty: "Pediatria",
    tema: "Desidratação",
    subtema: "Plano B",
    dificuldade: "basico",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com desidratação moderada por GECA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "TRO supervisionada (plano B) e reassessor; IV se falha/grave. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "TRO supervisionada (plano B) e reassessor; IV se falha/grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WHO"
  },
  {
    id: "RES-X215",
    specialty: "Pediatria",
    tema: "Kawasaki",
    subtema: "Completo",
    dificuldade: "avancado",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com febre ≥5 dias, exantema, conjuntivite e língua em framboesa. Conduta?",
    options: {
      A: "IgIV + AAS e ecocardiograma — tratar antes de complicação coronariana. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "IgIV + AAS e ecocardiograma — tratar antes de complicação coronariana Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA Kawasaki"
  },
  {
    id: "RES-X216",
    specialty: "Pediatria",
    tema: "Púrpura Henoch",
    subtema: "Renal",
    dificuldade: "intermediario",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com púrpura palpável e hematúria. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Suporte, monitorar PA/urina/função renal; IS se nefrite grave. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Suporte, monitorar PA/urina/função renal; IS se nefrite grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SHARE IgAV"
  },
  {
    id: "RES-X217",
    specialty: "Pediatria",
    tema: "Varicela",
    subtema: "Complicada",
    dificuldade: "intermediario",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} imunocompetente com varicela e celulite. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "ATB para infecção bacteriana secundária ± aciclovir se critério. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
    explanation: "ATB para infecção bacteriana secundária ± aciclovir se critério Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP Red Book"
  },
  {
    id: "RES-X218",
    specialty: "Pediatria",
    tema: "Cetoacidose",
    subtema: "Edema cerebral",
    dificuldade: "avancado",
    age: 14,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em CAD com cefaleia e queda do Glasgow. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manitol/salina hipertônica, UTI e reduzir ritmo de fluidos — suspeitar edema cerebral",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica."
    },
    correct: "A",
    explanation: "Manitol/salina hipertônica, UTI e reduzir ritmo de fluidos — suspeitar edema cerebral Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPAD"
  },
  {
    id: "RES-X219",
    specialty: "Pediatria",
    tema: "Obesidade ped",
    subtema: "Estilo",
    dificuldade: "basico",
    age: 0.5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IMC >p95. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Mudança intensiva de estilo de vida familiar; rastrear comorbidades. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Mudança intensiva de estilo de vida familiar; rastrear comorbidades Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP obesity"
  },
  {
    id: "RES-X301",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Via aérea",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} politrauma, Glasgow 7. Prioridade. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Via aérea com proteção cervical (IOT) — ABC do trauma. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "B",
    explanation: "Via aérea com proteção cervical (IOT) — ABC do trauma Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATLS"
  },
  {
    id: "RES-X302",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Choque hemorrágico",
    dificuldade: "intermediario",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com trauma abdominal e PA 80/40. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Controle de hemorragia e reposição sangue/produtos; cirurgia/angio conforme foco",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "A",
    explanation: "Controle de hemorragia e reposição sangue/produtos; cirurgia/angio conforme foco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATLS"
  },
  {
    id: "RES-X303",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Pneumotórax hipertensivo",
    dificuldade: "basico",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com desvio de traqueia e hipotensão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV",
      C: "Descompressão imediata sem atrasar por TC. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Descompressão imediata sem atrasar por TC Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATLS"
  },
  {
    id: "RES-X304",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Apendicite",
    dificuldade: "basico",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor migratória e Blumberg+. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Apendicectomia após avaliação/imagem se dúvida; ATB perioperatório. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Apendicectomia após avaliação/imagem se dúvida; ATB perioperatório Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WSES"
  },
  {
    id: "RES-X305",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Colecistite",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Murphy+ e US típico. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "ATB + colecistectomia precoce na mesma internação se apto. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "ATB + colecistectomia precoce na mesma internação se apto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Tokyo guidelines"
  },
  {
    id: "RES-X306",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Obstrução",
    dificuldade: "intermediario",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com vômitos fecoides e hérnia encarcerada. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Reanimação, SNG e cirurgia urgente pela encarcerada/estrangulamento. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "B",
    explanation: "Reanimação, SNG e cirurgia urgente pela encarcerada/estrangulamento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACS obstruction"
  },
  {
    id: "RES-X307",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Perfuração",
    dificuldade: "intermediario",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com defesa e ar sob diafragma. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Reanimação, ATB e cirurgia para perfuração. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Reanimação, ATB e cirurgia para perfuração Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WSES ulcer"
  },
  {
    id: "RES-X308",
    specialty: "Cirurgia",
    tema: "Pele",
    subtema: "Fasciíte",
    dificuldade: "avancado",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor desproporcional e toxemia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Cirurgia radical imediata + ATB amplo + UTI. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "B",
    explanation: "Cirurgia radical imediata + ATB amplo + UTI Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA SSTI"
  },
  {
    id: "RES-X309",
    specialty: "Cirurgia",
    tema: "Vascular",
    subtema: "Isquemia aguda",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com membro frio sem pulso e parestesia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Heparina e avaliação vascular urgente para revascularizar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Heparina e avaliação vascular urgente para revascularizar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC ALI"
  },
  {
    id: "RES-X310",
    specialty: "Cirurgia",
    tema: "Vascular",
    subtema: "AAA roto",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor, hipotensão e massa pulsátil. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Reanimação permissiva e reparo urgente (EVAR/aberto). Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Reanimação permissiva e reparo urgente (EVAR/aberto) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SVS AAA"
  },
  {
    id: "RES-X311",
    specialty: "Cirurgia",
    tema: "Trauma",
    subtema: "Queimadura vias",
    dificuldade: "avancado",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queimadura facial e fuligem em via aérea. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Via aérea precoce (IOT) por risco de edema — não esperar estridor pleno. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Via aérea precoce (IOT) por risco de edema — não esperar estridor pleno Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATLS/ABA"
  },
  {
    id: "RES-X312",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Diverticulite",
    dificuldade: "intermediario",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor em FID e TC com diverticulite não complicada. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Analgesia ± ATB selecionado e seguimento; cirurgia se complicação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Analgesia ± ATB selecionado e seguimento; cirurgia se complicação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WSES diverticulitis"
  },
  {
    id: "RES-X313",
    specialty: "Cirurgia",
    tema: "Abdômen",
    subtema: "Hérnia estrangulada",
    dificuldade: "avancado",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hérnia irredutível, dor intensa e sinais de isquemia. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Cirurgia urgente — não tentar redução forçada na estrangulada. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Cirurgia urgente — não tentar redução forçada na estrangulada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACS hernia"
  },
  {
    id: "RES-X314",
    specialty: "Cirurgia",
    tema: "Pele",
    subtema: "Abscesso",
    dificuldade: "basico",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com abscesso flutuante em região glútea. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Incisão e drenagem; ATB se celulite/sistema. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Incisão e drenagem; ATB se celulite/sistema Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA"
  },
  {
    id: "RES-X315",
    specialty: "Cirurgia",
    tema: "Torácica",
    subtema: "Hemotórax",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} trauma torácico com macicez e choque. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Dreno torácico grosso + reanimação; toracotomia se débito maciço. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Dreno torácico grosso + reanimação; toracotomia se débito maciço Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ATLS"
  },
  {
    id: "RES-X316",
    specialty: "Cirurgia",
    tema: "Ortopedia",
    subtema: "Síndrome compartimental",
    dificuldade: "avancado",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor desproporcional após fratura. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Fasceotomia urgente — clínica manda mais que pressão isolada. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Fasceotomia urgente — clínica manda mais que pressão isolada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAOS compartment"
  },
  {
    id: "RES-X317",
    specialty: "Cirurgia",
    tema: "Urologia",
    subtema: "Torção testicular",
    dificuldade: "avancado",
    age: 76,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor testicular súbita e reflexo cremastérico ausente. Conduta?",
    options: {
      A: "Exploração cirúrgica urgente — não atrasar por Doppler se alta suspeita. conduta preferencial neste contexto",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Exploração cirúrgica urgente — não atrasar por Doppler se alta suspeita Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AUA torsion"
  },
  {
    id: "RES-X318",
    specialty: "Cirurgia",
    tema: "Urologia",
    subtema: "Litíase infectada",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculo obstrutivo, febre e choque. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "ATB + descompressão urgente (nefrostomia/stent) — não só analgésico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "ATB + descompressão urgente (nefrostomia/stent) — não só analgésico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU urosepsis"
  },
  {
    id: "RES-X319",
    specialty: "Cirurgia",
    tema: "Plástica",
    subtema: "Mordedura",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com mordedura de cão em mão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Irrigação, ATB profilático selecionado, tétano/raiva e avaliação de tendão. conduta preferencial neste contexto",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem."
    },
    correct: "B",
    explanation: "Irrigação, ATB profilático selecionado, tétano/raiva e avaliação de tendão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA bites"
  },
  {
    id: "RES-X401",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Pré-eclâmpsia grave",
    dificuldade: "avancado",
    age: 28,
    vars: {

    },
    statement: "Gestante de {{age}} anos, 34 sem, PA 170/110 e cefaleia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "MgSO4, controle de PA e resolução da gestação após estabilizar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "MgSO4, controle de PA e resolução da gestação após estabilizar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG"
  },
  {
    id: "RES-X402",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Eclâmpsia",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "Gestante com convulsão e HAS. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Via aérea, MgSO4, controle de PA e plano de parto. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Via aérea, MgSO4, controle de PA e plano de parto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG"
  },
  {
    id: "RES-X403",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "HPP",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "Pós-parto com sangramento >1 L e útero atônico. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Compressão, ocitocina e uterotônicos; balão/cirurgia se refratário. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Compressão, ocitocina e uterotônicos; balão/cirurgia se refratário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "FIGO PPH"
  },
  {
    id: "RES-X404",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "TPP",
    dificuldade: "intermediario",
    age: 37,
    vars: {

    },
    statement: "Gestante 30 sem com contrações e colo modificado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Corticoide antenatal, tocolítico selecionado e MgSO4 neuroproteção se <32 sem",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "C",
    explanation: "Corticoide antenatal, tocolítico selecionado e MgSO4 neuroproteção se <32 sem Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG preterm"
  },
  {
    id: "RES-X405",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "RPM",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "Gestante 33 sem com perda de líquido claro. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Confirmar RPM, corticoide, ATB de latência e vigilância infecção/bem-estar fetal",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Confirmar RPM, corticoide, ATB de latência e vigilância infecção/bem-estar fetal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG PROM"
  },
  {
    id: "RES-X406",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "GDM",
    dificuldade: "basico",
    age: 43,
    vars: {

    },
    statement: "Gestante com TOTG alterado. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Dieta/educação e monitorar glicemias; insulina/metformina se não atingir alvos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem."
    },
    correct: "B",
    explanation: "Dieta/educação e monitorar glicemias; insulina/metformina se não atingir alvos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA/ACOG GDM"
  },
  {
    id: "RES-X407",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Ectópica",
    dificuldade: "avancado",
    age: 46,
    vars: {

    },
    statement: "Mulher de {{age}} com βhCG+ e US sem saco intrauterine, massa anexial. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Estabilizar; metotrexato se critérios ou cirurgia se instável. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Estabilizar; metotrexato se critérios ou cirurgia se instável Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG ectopic"
  },
  {
    id: "RES-X408",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "DIP",
    dificuldade: "intermediario",
    age: 49,
    vars: {

    },
    statement: "Mulher de {{age}} com dor à mobilização cervical, febre e corrimento. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "ATB cobrindo gonococo/clamídia/anaeróbios; tratar parceiro. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "ATB cobrindo gonococo/clamídia/anaeróbios; tratar parceiro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC STI"
  },
  {
    id: "RES-X409",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "SOP",
    dificuldade: "basico",
    age: 52,
    vars: {

    },
    statement: "Mulher de {{age}} com oligomenorreia e hirsutismo. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      D: "Estilo de vida, rastrear metabólico; ACOC/progestágeno; metformina/indução conforme desejo gestacional",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Estilo de vida, rastrear metabólico; ACOC/progestágeno; metformina/indução conforme desejo gestacional Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "International PCOS"
  },
  {
    id: "RES-X410",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Torção",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "Mulher de {{age}} com dor anexial súbita e Doppler alterado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "Cirurgia urgente (laparoscopia) — destorção ± preservação ovariana se viável",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Cirurgia urgente (laparoscopia) — destorção ± preservação ovariana se viável Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG torsion"
  },
  {
    id: "RES-X411",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Placenta prévia",
    dificuldade: "avancado",
    age: 58,
    vars: {

    },
    statement: "Gestante 32 sem com sangramento indolor e placenta baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Estabilizar, evitar toque digital, corticoide se preciso e cesárea planejada conforme idade gestacional/sangue",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Estabilizar, evitar toque digital, corticoide se preciso e cesárea planejada conforme idade gestacional/sangue Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG previa"
  },
  {
    id: "RES-X412",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "DPP",
    dificuldade: "avancado",
    age: 61,
    vars: {

    },
    statement: "Gestante com dor uterina contínua, sangramento e sofrimento fetal. Conduta?",
    options: {
      A: "Reanimação materna e resolução urgente da gestação — suspeitar DPP. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Reanimação materna e resolução urgente da gestação — suspeitar DPP Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG abruption"
  },
  {
    id: "RES-X413",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Isoimunização",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "Gestante Rh negativo sem sensibilização. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Imunoglobulina anti-D conforme protocolo (28 sem e pós-parto se RN Rh+). conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar."
    },
    correct: "A",
    explanation: "Imunoglobulina anti-D conforme protocolo (28 sem e pós-parto se RN Rh+) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG Rh"
  },
  {
    id: "RES-X414",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Mioma sangrante",
    dificuldade: "intermediario",
    age: 67,
    vars: {

    },
    statement: "Mulher de {{age}} com mioma e anemia sintomática. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Estabilizar anemia, opções clínicas (hormonal/Ácido tranexâmico) e cirúrgicas conforme desejo reprodutivo",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Estabilizar anemia, opções clínicas (hormonal/Ácido tranexâmico) e cirúrgicas conforme desejo reprodutivo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG fibroids"
  },
  {
    id: "RES-X415",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Menopausa",
    dificuldade: "basico",
    age: 70,
    vars: {

    },
    statement: "Mulher de {{age}} com fogachos e sem contraindicação. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Discutir THM individualizada ou alternativas não hormonais. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Discutir THM individualizada ou alternativas não hormonais Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NAMS"
  },
  {
    id: "RES-X416",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Câncer colo",
    dificuldade: "intermediario",
    age: 73,
    vars: {

    },
    statement: "Mulher de {{age}} com citologia ASC-H. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Colposcopia — ASC-H exige avaliação dirigida. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Colposcopia — ASC-H exige avaliação dirigida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASCCP"
  },
  {
    id: "RES-X417",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Diabetes gestacional",
    dificuldade: "intermediario",
    age: 76,
    vars: {

    },
    statement: "Gestante com GDM e glicemias altas após dieta. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar insulina (ou metformina conforme protocolo) e monitorar feto. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Iniciar insulina (ou metformina conforme protocolo) e monitorar feto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA/ACOG"
  },
  {
    id: "RES-X418",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Ginecologia",
    subtema: "Corrimento",
    dificuldade: "basico",
    age: 29,
    vars: {

    },
    statement: "Mulher de {{age}} com corrimento fétido e clue cells. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Metronidazol para vaginose bacteriana; orientar parceiro só se recorrente/específico",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Metronidazol para vaginose bacteriana; orientar parceiro só se recorrente/específico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CDC STI"
  },
  {
    id: "RES-X419",
    specialty: "Ginecologia e Obstetrícia",
    tema: "Obstetrícia",
    subtema: "Cesárea anterior",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "Gestante com 1 cesárea prévia deseja VBAC. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Aconselhar riscos/benefícios e tentar trabalho de parto em centro preparado se elegível",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou."
    },
    correct: "B",
    explanation: "Aconselhar riscos/benefícios e tentar trabalho de parto em centro preparado se elegível Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG TOLAC"
  },
  {
    id: "RES-X501",
    specialty: "Cardiologia",
    tema: "Estatina",
    subtema: "Pós-IAM",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-IAM. Conduta lipídica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Estatina de alta intensidade (± ezetimiba/PCSK9 se preciso) com metas agressivas",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "A",
    explanation: "Estatina de alta intensidade (± ezetimiba/PCSK9 se preciso) com metas agressivas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC prevention"
  },
  {
    id: "RES-X502",
    specialty: "Cardiologia",
    tema: "Choque",
    subtema: "Cardiogênico",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IAM e choque. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Revascularização urgente + suporte hemodinâmico em UTI. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Revascularização urgente + suporte hemodinâmico em UTI Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC shock"
  },
  {
    id: "RES-X503",
    specialty: "Cardiologia",
    tema: "FA",
    subtema: "Frequência",
    dificuldade: "intermediario",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA RVR estável. Conduta inicial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Controlar frequência (betabloqueador/não-DHP) e decidir anticoagulação pelo risco",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Controlar frequência (betabloqueador/não-DHP) e decidir anticoagulação pelo risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-X504",
    specialty: "Cardiologia",
    tema: "IC",
    subtema: "Congestão",
    dificuldade: "intermediario",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IC, ortopneia e crepitações. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Diurético IV, O2/VNI se preciso e investigar gatilho. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Diurético IV, O2/VNI se preciso e investigar gatilho Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF"
  },
  {
    id: "RES-X505",
    specialty: "Cardiologia",
    tema: "SCA",
    subtema: "AAS",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor tipica suspeita de SCA. Conduta imediata. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "AAS imediato, ECG em 10 min e via de SCA. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "AAS imediato, ECG em 10 min e via de SCA Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC ACS"
  },
  {
    id: "RES-X506",
    specialty: "Cardiologia",
    tema: "IC",
    subtema: "ARNI",
    dificuldade: "intermediario",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ICFER sintomática em IECA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Trocar para ARNI se tolerar e PA/TFG permitirem, mantendo o restante da quádrupla",
      E: "Suspender toda terapia modificadora por “pré-renal leve” sem congestionamento"
    },
    correct: "D",
    explanation: "Trocar para ARNI se tolerar e PA/TFG permitirem, mantendo o restante da quádrupla Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF"
  },
  {
    id: "RES-X507",
    specialty: "Cardiologia",
    tema: "FA",
    subtema: "Ablação",
    dificuldade: "avancado",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com FA paroxística sintomática refratária a fármacos. Conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Considerar ablação de isolamento de veias pulmonares em centro experiente. conduta preferencial neste contexto",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Considerar ablação de isolamento de veias pulmonares em centro experiente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC AF"
  },
  {
    id: "RES-X508",
    specialty: "Cardiologia",
    tema: "Síncope",
    subtema: "Cardiogênica",
    dificuldade: "avancado",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com síncope e BAV avançado no ECG. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Internar e indicar marcapasso — bradiarritmia sintomática. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Internar e indicar marcapasso — bradiarritmia sintomática Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC pacing"
  },
  {
    id: "RES-X509",
    specialty: "Cardiologia",
    tema: "HAS",
    subtema: "Emergência",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PA muito alta e encefalopatia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Redução controlada com anti-hipertensivo IV em UTI/ambiente monitorado. conduta preferencial neste contexto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Redução controlada com anti-hipertensivo IV em UTI/ambiente monitorado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA HTN"
  },
  {
    id: "RES-X510",
    specialty: "Cardiologia",
    tema: "Miocardite",
    subtema: "Esporte",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} recuperado de miocardite. Conduta esportiva. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Restringir exercício competitivo até liberação cardiológica/protocolo. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "D",
    explanation: "Restringir exercício competitivo até liberação cardiológica/protocolo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC myocarditis"
  },
  {
    id: "RES-X601",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "APS",
    subtema: "HAS rastreio",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} assintomático na UBS. Sobre HAS. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Medir PA periodicamente; confirmar com medidas repetidas/MAPA se elevado. conduta preferencial neste contexto",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Medir PA periodicamente; confirmar com medidas repetidas/MAPA se elevado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SBC HAS"
  },
  {
    id: "RES-X602",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "APS",
    subtema: "DM rastreio",
    dificuldade: "basico",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IMC 32. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Rastrear DM com glicemia/HbA1c/TOTG e educar estilo de vida. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Rastrear DM com glicemia/HbA1c/TOTG e educar estilo de vida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADA"
  },
  {
    id: "RES-X603",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Tabagismo",
    subtema: "Cessação",
    dificuldade: "basico",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} quer parar de fumar. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Aconselhamento breve + farmacoterapia se sem contraindicação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Aconselhamento breve + farmacoterapia se sem contraindicação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "USPSTF tobacco"
  },
  {
    id: "RES-X604",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Vacinas",
    subtema: "Idoso risco",
    dificuldade: "basico",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC. Vacinas. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Influenza anual e calendário do adulto/risco (pneumococo/COVID conforme PNI)",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se."
    },
    correct: "A",
    explanation: "Influenza anual e calendário do adulto/risco (pneumococo/COVID conforme PNI) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PNI"
  },
  {
    id: "RES-X605",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "TB",
    subtema: "Notificação",
    dificuldade: "basico",
    age: 40,
    vars: {

    },
    statement: "Médico diagnostica TB bacilífera. Obrigação. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Notificação compulsória e início de tratamento/TDO. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Notificação compulsória e início de tratamento/TDO Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS vigilância"
  },
  {
    id: "RES-X606",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Depressão",
    subtema: "APS",
    dificuldade: "basico",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anedonia >2 semanas. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Rastrear suicídio, oferecer apoio/psicoterapia e antidepressivo se moderada/grave",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Rastrear suicídio, oferecer apoio/psicoterapia e antidepressivo se moderada/grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NICE depression"
  },
  {
    id: "RES-X607",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Pré-natal",
    subtema: "Baixo risco",
    dificuldade: "basico",
    age: 46,
    vars: {

    },
    statement: "Gestante de baixo risco na UBS. Essencial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Consultas, vacinas, suplementos e rastreios (sífilis/HIV/hepatite) + sinais de alarme",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica."
    },
    correct: "A",
    explanation: "Consultas, vacinas, suplementos e rastreios (sífilis/HIV/hepatite) + sinais de alarme Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS pré-natal"
  },
  {
    id: "RES-X608",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Puericultura",
    subtema: "Básico",
    dificuldade: "basico",
    age: 49,
    vars: {

    },
    statement: "Lactente de {{age}} na UBS. O que não pode faltar. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Curva de crescimento, aleitamento, vacinas, desenvolvimento e sinais de alarme"
    },
    correct: "E",
    explanation: "Curva de crescimento, aleitamento, vacinas, desenvolvimento e sinais de alarme Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SBP/MS"
  },
  {
    id: "RES-X609",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Violência",
    subtema: "Acolhimento",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "Mulher de {{age}} relata violência doméstica. Postura. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Acolher, avaliar risco, orientar redes de proteção e quebrar sigilo se risco iminente conforme ética/lei"
    },
    correct: "E",
    explanation: "Acolher, avaliar risco, orientar redes de proteção e quebrar sigilo se risco iminente conforme ética/lei Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CFM; MS"
  },
  {
    id: "RES-X610",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Quaternária",
    subtema: "Exames",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "Paciente pede “check-up completo” sem indicação. Postura. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Prevenção quaternária: indicar só o útil e discutir riscos/benefícios do excesso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "A",
    explanation: "Prevenção quaternária: indicar só o útil e discutir riscos/benefícios do excesso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WONCA"
  },
  {
    id: "RES-X611",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Rastreio",
    subtema: "Ca colo",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "Mulher de {{age}} na UBS pergunta citologia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente.",
      D: "Seguir calendário de rastreio (citologia/HPV) conforme idade e história. conduta preferencial neste contexto",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Seguir calendário de rastreio (citologia/HPV) conforme idade e história Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS rastreio"
  },
  {
    id: "RES-X612",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Rastreio",
    subtema: "Ca mama",
    dificuldade: "basico",
    age: 61,
    vars: {

    },
    statement: "Mulher de {{age}} na faixa etária de mamografia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Oferecer mamografia conforme diretriz e avaliar risco familiar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Oferecer mamografia conforme diretriz e avaliar risco familiar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS/INCA"
  },
  {
    id: "RES-X613",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Hanseníase",
    subtema: "Suspeita",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com mancha hipoestésica. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Diagnosticar/tratar conforme classificação operacional e notificar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Diagnosticar/tratar conforme classificação operacional e notificar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS hanseníase"
  },
  {
    id: "RES-X614",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "DST",
    subtema: "Aconselhamento",
    dificuldade: "basico",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com parceria nova. Conduta preventiva. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Aconselhar preservativo, testagem e vacinas (HPV/hepatite) conforme elegibilidade",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Aconselhar preservativo, testagem e vacinas (HPV/hepatite) conforme elegibilidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS IST"
  },
  {
    id: "RES-X615",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Saúde mental",
    subtema: "Risco suicídio",
    dificuldade: "avancado",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com plano suicida concreto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Avaliar risco, garantir segurança, encaminhar urgência/psiquiatria e acionar rede"
    },
    correct: "E",
    explanation: "Avaliar risco, garantir segurança, encaminhar urgência/psiquiatria e acionar rede Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS suicídio"
  },
  {
    id: "RES-X616",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Idoso",
    subtema: "Quedas",
    dificuldade: "basico",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com queda recorrente. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Revisar fármacos, visão, força/equilíbrio e ambiente domiciliar. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Revisar fármacos, visão, força/equilíbrio e ambiente domiciliar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SBGG"
  },
  {
    id: "RES-X617",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Criança",
    subtema: "Vacina atraso",
    dificuldade: "basico",
    age: 76,
    vars: {

    },
    statement: "Criança de {{age}} com atraso vacinal na UBS. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Atualizar calendário (catch-up) sem reiniciar esquemas desnecessariamente. conduta preferencial neste contexto",
      D: "Aplicar o mesmo protocolo de adulto sem ajuste de dose/peso e sem considerar.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Atualizar calendário (catch-up) sem reiniciar esquemas desnecessariamente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PNI"
  },
  {
    id: "RES-X618",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Trabalho",
    subtema: "CAT",
    dificuldade: "intermediario",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com acidente típico de trabalho. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      E: "Atender, notificar/CAT conforme regra e orientar direitos/afastamento. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Atender, notificar/CAT conforme regra e orientar direitos/afastamento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "INSS/MTE"
  },
  {
    id: "RES-X619",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Ética APS",
    subtema: "Sigilo",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "Adolescente de {{age}} pede sigilo sobre IST. Postura. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Preservar sigilo quando possível; quebrar se risco grave a si/outrem conforme ética",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Preservar sigilo quando possível; quebrar se risco grave a si/outrem conforme ética Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "CFM"
  },
  {
    id: "RES-X620",
    specialty: "Medicina de Família, Preventiva e Saúde Coletiva",
    tema: "Epidemia",
    subtema: "Notificação",
    dificuldade: "basico",
    age: 35,
    vars: {

    },
    statement: "Caso suspeito de doença de notificação imediata. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Notificar a vigilância imediatamente e seguir protocolo local. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Notificar a vigilância imediatamente e seguir protocolo local Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MS vigilância"
  }
];

module.exports = { RES_MASTERS_EXTRA };
