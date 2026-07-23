/**
 * Casos-mestres — Nefrologia adulta (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const ADV_MASTERS_EXTRA4 = [
  {
    id: "NA-X146",
    tema: "DRC",
    subtema: "Estadiamento KDIGO",
    dificuldade: "basico",
    age: 58,
    vars: {
      tfg: 47
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}} mL/min e UACR 120 mg/g há 4 meses. Como estadiar e conduzir?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Estadiar por causa, categoria de TFG e albuminúria (KDIGO); reforçar nefroproteção e controle de PA conforme o risco",
      C: "Estadiar só pela creatinina de um dia, ignorando albuminúria e a persistência ≥3 meses. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Estadiar por causa, categoria de TFG e albuminúria (KDIGO); reforçar nefroproteção e controle de PA conforme o risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO CKD"
  },
  {
    id: "NA-X147",
    tema: "DRC",
    subtema: "Encaminhamento",
    dificuldade: "basico",
    age: 55,
    vars: {
      tfg: 33
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}}, UACR 450 e anemia. Quando referir ao nefrologista?",
    options: {
      A: "Referir por TFG reduzida, albuminúria alta, progressão, hematúria ou complicações — não esperar a diálise",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Referir somente quando a TFG estiver abaixo de 10 com indicação imediata de diálise. estratégia que não aborda o mecanismo."
    },
    correct: "A",
    explanation: "Referir por TFG reduzida, albuminúria alta, progressão, hematúria ou complicações — não esperar a diálise Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO referral"
  },
  {
    id: "NA-X148",
    tema: "DM-CKD",
    subtema: "Biópsia",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DM2 há 15 anos, retinopatia, UACR 900, sedimento inativo. Biópsia?",
    options: {
      A: "Padrão típico pode dispensar biópsia; indicar se atipias (início abrupto, hematúria ativa, sem retinopatia, LRA)",
      B: "Biopsiar todo diabético com qualquer grau de albuminúria, mesmo típico e estável. estratégia que não aborda o mecanismo principal deste caso",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Padrão típico pode dispensar biópsia; indicar se atipias (início abrupto, hematúria ativa, sem retinopatia, LRA) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO diabetes"
  },
  {
    id: "NA-X149",
    tema: "DM-CKD",
    subtema: "SGLT2 após ΔCr",
    dificuldade: "intermediario",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} inicia dapagliflozina; Cr sobe 18% em 2 semanas, euvolêmico, K normal. Conduta?",
    options: {
      A: "Elevação hemodinâmica inicial esperada: manter se estável, orientar volume e pausar em doença aguda",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suspender definitivamente o SGLT2 diante de qualquer aumento de 10% na creatinina. estratégia que não aborda o.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Elevação hemodinâmica inicial esperada: manter se estável, orientar volume e pausar em doença aguda Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "DAPA-CKD"
  },
  {
    id: "NA-X150",
    tema: "DM-CKD",
    subtema: "Finerenona e K",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      k: 5.5
    },
    statement: "{{sexWord}} de {{age}} em IECA + finerenona com K {{k}}. Melhor estratégia. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratar a hipercalemia (dieta, diurético, binder se preciso) e tentar preservar a terapia nefroprotetora",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese."
    },
    correct: "A",
    explanation: "Tratar a hipercalemia (dieta, diurético, binder se preciso) e tentar preservar a terapia nefroprotetora Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "FIDELIO"
  },
  {
    id: "NA-X151",
    tema: "DM-CKD",
    subtema: "GLP-1 FLOW",
    dificuldade: "avancado",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DM2, DRC e obesidade, já em IECA+SGLT2. Papel do GLP-1?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Considerar agonista de GLP-1 com benefício cardiorrenal (ex. semaglutida no FLOW) se disponível e elegível",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Considerar agonista de GLP-1 com benefício cardiorrenal (ex. semaglutida no FLOW) se disponível e elegível Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "FLOW trial"
  },
  {
    id: "NA-X152",
    tema: "IgA",
    subtema: "Suporte 90 dias",
    dificuldade: "basico",
    age: 28,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IgAN, UPCR 1,2, PA alta, sem IS ainda. Primeiro passo?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Iniciar ciclofosfamida imediata em toda IgAN com hematúria microscópica isolada",
      D: "Otimizar RASSi e PA por cerca de 90 dias e estratificar risco antes de terapia específica",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Otimizar RASSi e PA por cerca de 90 dias e estratificar risco antes de terapia específica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO IgAN"
  },
  {
    id: "NA-X153",
    tema: "IgA",
    subtema: "Nefecon",
    dificuldade: "avancado",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IgAN de alto risco após suporte otimizado. Opção mucosa-dirigida?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Substituir o IECA por corticoide sistêmico em megadose sem profilaxia infecciosa. estratégia que não aborda o.",
      E: "Considerar budesonida de liberação direcionada (Nefecon) em curso protocolar, mantendo o suporte"
    },
    correct: "E",
    explanation: "Considerar budesonida de liberação direcionada (Nefecon) em curso protocolar, mantendo o suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NefIgArd"
  },
  {
    id: "NA-X154",
    tema: "IgA",
    subtema: "Sparsentan",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IgAN e proteinúria persistente sob IECA pleno. Dual ET-A/ARB?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      B: "Considerar sparsentan conforme elegibilidade, monitorando PA, K, edema e fígado",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Considerar sparsentan conforme elegibilidade, monitorando PA, K, edema e fígado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PROTECT"
  },
  {
    id: "NA-X155",
    tema: "Membranosa",
    subtema: "PLA2R follow-up",
    dificuldade: "intermediario",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MN PLA2R+ em tratamento. Como usar a sorologia. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Acompanhar a trajetória do anti-PLA2R junto com proteinúria/TFG para guiar intensidade terapêutica"
    },
    correct: "E",
    explanation: "Acompanhar a trajetória do anti-PLA2R junto com proteinúria/TFG para guiar intensidade terapêutica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO MN"
  },
  {
    id: "NA-X156",
    tema: "Membranosa",
    subtema: "Trombose",
    dificuldade: "avancado",
    age: 50,
    vars: {
      alb: 1.8
    },
    statement: "{{sexWord}} de {{age}} com MN e albumina {{alb}} g/dL. Sobre risco trombótico. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Hipoalbuminemia grave eleva risco; considerar anticoagulação profilática selecionada além do tratamento da MN",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Hipoalbuminemia grave eleva risco; considerar anticoagulação profilática selecionada além do tratamento da MN Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO MN"
  },
  {
    id: "NA-X157",
    tema: "FSGS",
    subtema: "Primária vs secundária",
    dificuldade: "avancado",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN, FSGS e apagamento difuso de pedicelos. Implicação?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Sugere podocitopatia primária: considerar imunossupressão se nefrótica; secundária trata a causa",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Sugere podocitopatia primária: considerar imunossupressão se nefrótica; secundária trata a causa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO FSGS"
  },
  {
    id: "NA-X158",
    tema: "MCD",
    subtema: "Adulto corticodependente",
    dificuldade: "intermediario",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MCD córtico-dependente frequente. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter prednisona em dose plena contínua por anos como única estratégia. estratégia que não aborda o mecanismo.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Introduzir poupador (CYC, antimetabólito, CNI ou RTX) conforme perfil, visando reduzir esteroide",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Introduzir poupador (CYC, antimetabólito, CNI ou RTX) conforme perfil, visando reduzir esteroide Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO MCD"
  },
  {
    id: "NA-X159",
    tema: "Lúpus",
    subtema: "Indução IV",
    dificuldade: "intermediario",
    age: 29,
    vars: {

    },
    statement: "Mulher de {{age}} com LES, biópsia classe IV, Cr em ascensão. Indução. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "MMF ou ciclofosfamida + glicocorticoide; considerar adjuvantes conforme gravidade e fertilidade",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "MMF ou ciclofosfamida + glicocorticoide; considerar adjuvantes conforme gravidade e fertilidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO LN 2024"
  },
  {
    id: "NA-X160",
    tema: "Lúpus",
    subtema: "Voclosporina",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Mulher de {{age}} em indução MMF+GC com proteinúria ainda alta, TFG estável. Adjunto?",
    options: {
      A: "Considerar voclosporina associada ao MMF em protocolo, com vigilância de TFG/PA/eletrólitos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Considerar voclosporina associada ao MMF em protocolo, com vigilância de TFG/PA/eletrólitos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AURORA"
  },
  {
    id: "NA-X161",
    tema: "ANCA",
    subtema: "Avacopan",
    dificuldade: "avancado",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com GPA em indução com RTX, desejo de poupar corticoide. Opção?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Considerar avacopan (anti-C5aR) como estratégia poupadora de glicocorticoide conforme protocolo",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "D",
    explanation: "Considerar avacopan (anti-C5aR) como estratégia poupadora de glicocorticoide conforme protocolo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADVOCATE"
  },
  {
    id: "NA-X162",
    tema: "ANCA",
    subtema: "Manutenção",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MPA em remissão após RTX. Manutenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      C: "Rituximabe de manutenção (ou AZA) por período prolongado individualizado; monitorar IgG/infecções",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Rituximabe de manutenção (ou AZA) por período prolongado individualizado; monitorar IgG/infecções Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "MAINRITSAN"
  },
  {
    id: "NA-X163",
    tema: "Anti-MBG",
    subtema: "Anúria fibrosa",
    dificuldade: "avancado",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} anti-MBG+, anúrico, 100% crescentes fibrosos, sem DAH. Conduta renal?",
    options: {
      A: "Manter PLEX+CYC indefinidos com alta expectativa de recuperação renal plena. estratégia que não aborda o.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Discutir limitar IS agressiva só pelo rim; preparar TSR; tratar se houver DAH",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Discutir limitar IS agressiva só pelo rim; preparar TSR; tratar se houver DAH Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO anti-GBM"
  },
  {
    id: "NA-X164",
    tema: "C3G",
    subtema: "C3 persistente",
    dificuldade: "avancado",
    age: 25,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com GN e C3 baixo há 4 meses após quadro “pós-infeccioso”. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Biópsia e investigação de C3G/complemento — hipocomplementemia prolongada não é PSGN clássica",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Biópsia e investigação de C3G/complemento — hipocomplementemia prolongada não é PSGN clássica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO C3G"
  },
  {
    id: "NA-X165",
    tema: "MAT",
    subtema: "Algoritmo inicial",
    dificuldade: "avancado",
    age: 39,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAHA, plaquetopenia e LRA. Primeiro raciocínio. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Separar STEC/PTT/aHUS; pedir ADAMTS13; PLEX se PTT provável; C5i se aHUS. conduta preferencial neste contexto",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Separar STEC/PTT/aHUS; pedir ADAMTS13; PLEX se PTT provável; C5i se aHUS Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISTH; KDIGO aHUS"
  },
  {
    id: "NA-X166",
    tema: "AKI",
    subtema: "Indicações AEIOU",
    dificuldade: "basico",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com AKI, K 6,8 refratário e edema pulmonar. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar diálise por critérios AEIOU (hiperK/sobrecarga/uremia/acidose/intoxicações)",
      B: "Esperar creatinina >10 para dialisar, independentemente da clínica. estratégia que não aborda o mecanismo.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Indicar diálise por critérios AEIOU (hiperK/sobrecarga/uremia/acidose/intoxicações) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO AKI"
  },
  {
    id: "NA-X167",
    tema: "AKI",
    subtema: "Vancomicina",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em vancomicina com LRA e nível supra. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Ajustar ou suspender conforme nível/função, hidratar e revisar outros nefrotóxicos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Ajustar ou suspender conforme nível/função, hidratar e revisar outros nefrotóxicos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Drug-induced AKI"
  },
  {
    id: "NA-X168",
    tema: "Cardiorrenal",
    subtema: "Congestão",
    dificuldade: "avancado",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IC congestiva e Cr em ascensão sob diurético. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Otimizar congestão/perfusão; considerar UF/diálise se falência diurética; evitar nefrotóxicos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suspender diuréticos e infundir 3 L de cristaloides na congestão franca. estratégia que não aborda o mecanismo.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Otimizar congestão/perfusão; considerar UF/diálise se falência diurética; evitar nefrotóxicos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Cardiorenal reviews"
  },
  {
    id: "NA-X169",
    tema: "HRS",
    subtema: "Terlipressina",
    dificuldade: "avancado",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com HRS-AKI após albumina. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Vasoconstritor (terlipressina/noradrenalina) + albumina; avaliar transplante hepático",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Vasoconstritor (terlipressina/noradrenalina) + albumina; avaliar transplante hepático Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ICA HRS"
  },
  {
    id: "NA-X170",
    tema: "Eletrólitos",
    subtema: "HipoNa convulsiva",
    dificuldade: "intermediario",
    age: 46,
    vars: {
      na: 113
    },
    statement: "{{sexWord}} de {{age}} com convulsão e Na {{na}}. Conduta aguda. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Apenas restrição hídrica durante a convulsão, sem corrigir o sódio. estratégia que não aborda o mecanismo.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Bolus de NaCl 3% para abortar sintomas graves, depois correção controlada evitando ODS",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Bolus de NaCl 3% para abortar sintomas graves, depois correção controlada evitando ODS Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "European hyponatremia"
  },
  {
    id: "NA-X171",
    tema: "Eletrólitos",
    subtema: "HiperK com ECG",
    dificuldade: "basico",
    age: 61,
    vars: {
      k: 7.4
    },
    statement: "{{sexWord}} de {{age}} com K {{k}} e QRS alargado. Primeira medida. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Gluconato de cálcio IV para estabilizar membrana, depois shift e remoção de potássio",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Administrar apenas resina e aguardar sem estabilizar a membrana. estratégia que não aborda o mecanismo."
    },
    correct: "C",
    explanation: "Gluconato de cálcio IV para estabilizar membrana, depois shift e remoção de potássio Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Emergency electrolytes"
  },
  {
    id: "NA-X172",
    tema: "HD",
    subtema: "Peso seco",
    dificuldade: "basico",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD com ganho de 4,5 kg e HAS interdialítica. Conduta?",
    options: {
      A: "Acrescentar apenas o quinto anti-hipertensivo sem discutir volume. estratégia que não aborda o mecanismo.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Reavaliar peso seco, restringir sal/líquidos e ajustar UF; anti-hipertensivos como adjunto",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Reavaliar peso seco, restringir sal/líquidos e ajustar UF; anti-hipertensivos como adjunto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDOQI HD"
  },
  {
    id: "NA-X173",
    tema: "HD",
    subtema: "Anemia alvo",
    dificuldade: "intermediario",
    age: 59,
    vars: {
      hb: 9
    },
    statement: "{{sexWord}} de {{age}} em HD, Hb {{hb}}, ferro repleto. Conduta com AEE. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Titular AEE para alvos individualizados, evitando Hb excessiva; manter ferro adequado",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Titular AEE para alvos individualizados, evitando Hb excessiva; manter ferro adequado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO anemia"
  },
  {
    id: "NA-X174",
    tema: "DP",
    subtema: "Peritonite",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com efluente turvo e dor. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Apenas antitérmico oral, sem cultura nem antibiótico intraperitoneal. estratégia que não aborda o mecanismo.",
      C: "Cultura do efluente e antibiótico intraperitoneal empírico precoce conforme ISPD",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Cultura do efluente e antibiótico intraperitoneal empírico precoce conforme ISPD Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPD peritonitis"
  },
  {
    id: "NA-X175",
    tema: "DP",
    subtema: "Peritonite fúngica",
    dificuldade: "avancado",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com Candida no efluente. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      D: "Remover o cateter prontamente e instituir antifúngico sistêmico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "D",
    explanation: "Remover o cateter prontamente e instituir antifúngico sistêmico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPD peritonitis"
  },
  {
    id: "NA-X176",
    tema: "Acesso",
    subtema: "Steal",
    dificuldade: "intermediario",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor e palidez na mão da FAV durante a sessão. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      D: "Avaliação vascular urgente; revisão/banding/DRIL conforme gravidade da isquemia",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Avaliação vascular urgente; revisão/banding/DRIL conforme gravidade da isquemia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDOQI access"
  },
  {
    id: "NA-X177",
    tema: "Acesso",
    subtema: "CRBSI S. aureus",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com bacteremia por S. aureus em cateter de HD. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Antibiótico IV adequado e remoção do cateter na maioria dos casos; afastar endocardite",
      C: "Manter o cateter e usar só antitérmico, sem antibiótico dirigido. estratégia que não aborda o mecanismo.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Antibiótico IV adequado e remoção do cateter na maioria dos casos; afastar endocardite Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IDSA CRBSI"
  },
  {
    id: "NA-X178",
    tema: "Tx",
    subtema: "AMR",
    dificuldade: "avancado",
    age: 43,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} Tx com Cr ↑, DSA de novo e C4d na biópsia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Apenas aumentar tiazídico, sem terapia dirigida à rejeição humoral. estratégia que não aborda o mecanismo.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Plasmaférese ± IVIG e otimizar imunossupressão basal; rituximabe em centros/selecionados"
    },
    correct: "E",
    explanation: "Plasmaférese ± IVIG e otimizar imunossupressão basal; rituximabe em centros/selecionados Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Banff; KDIGO Tx"
  },
  {
    id: "NA-X179",
    tema: "Tx",
    subtema: "BK",
    dificuldade: "avancado",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} transplantado com PCR BK alta e Cr em leve ascensão. Conduta?",
    options: {
      A: "Reduzir imunossupressão como primeiro passo e monitorar carga viral/função; biópsia se preciso",
      B: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Reduzir imunossupressão como primeiro passo e monitorar carga viral/função; biópsia se preciso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST BK"
  },
  {
    id: "NA-X180",
    tema: "Tx",
    subtema: "CMV D+/R−",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} D+/R− no pós-Tx. Prevenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Profilaxia antiviral (valganciclovir) por período protocolar ou estratégia preemptive com PCR",
      D: "Nenhuma profilaxia, pois CMV não ocorre em receptores soronegativos. estratégia que não aborda o mecanismo.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Profilaxia antiviral (valganciclovir) por período protocolar ou estratégia preemptive com PCR Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST CMV"
  },
  {
    id: "NA-X181",
    tema: "ADPKD",
    subtema: "Tolvaptan",
    dificuldade: "avancado",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ADPKD de progressão rápida. Conduta específica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Discutir tolvaptan em centro experiente com monitorização hepática, além de PA e hidratação",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Prescrever tolvaptan para qualquer pessoa com um cisto renal simples. estratégia que não aborda o mecanismo.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Discutir tolvaptan em centro experiente com monitorização hepática, além de PA e hidratação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "TEMPO/REPRISE"
  },
  {
    id: "NA-X182",
    tema: "ADPKD",
    subtema: "Infecção de cisto",
    dificuldade: "intermediario",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ADPKD, febre e dor em cisto; urocultura negativa. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Tratar infecção de cisto com antibiótico de boa penetração e imagem se houver complicação",
      D: "Tratar como cistite simples com nitrofurantoína curta e sem reavaliação. estratégia que não aborda o.",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Tratar infecção de cisto com antibiótico de boa penetração e imagem se houver complicação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ADPKD infections"
  },
  {
    id: "NA-X183",
    tema: "Alport",
    subtema: "IECA precoce",
    dificuldade: "intermediario",
    age: 19,
    vars: {

    },
    statement: "Homem de {{age}} com Alport e proteinúria, PA ainda normal-alta. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Iniciar IECA/BRA precocemente para retardar progressão, mesmo sem HAS estabelecida",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem."
    },
    correct: "D",
    explanation: "Iniciar IECA/BRA precocemente para retardar progressão, mesmo sem HAS estabelecida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EARLY PRO-TECT Alport"
  },
  {
    id: "NA-X184",
    tema: "Fabry",
    subtema: "ERT",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Fabry, proteinúria e acroparestesias. Conduta específica?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Usar apenas opioide crônico, sem qualquer terapia específica da doença. estratégia que não aborda o mecanismo principal deste caso",
      C: "Terapia de reposição enzimática ou chaperona se elegível, mais IECA e manejo da dor, em referência",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Terapia de reposição enzimática ou chaperona se elegível, mais IECA e manejo da dor, em referência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Fabry guidelines"
  },
  {
    id: "NA-X185",
    tema: "MGRS",
    subtema: "Clone pequeno",
    dificuldade: "avancado",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com depósitos monoclonais na biópsia e clone pequeno sem CRAB. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      E: "Tratar como MGRS com terapia clonodirigida junto à hematologia, guiada pela histologia"
    },
    correct: "E",
    explanation: "Tratar como MGRS com terapia clonodirigida junto à hematologia, guiada pela histologia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IKMG MGRS"
  },
  {
    id: "NA-X186",
    tema: "Amiloide",
    subtema: "Tipagem",
    dificuldade: "avancado",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN e vermelho-Congo positivo. Próximo passo crítico?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Tipar o amiloide (AL/ATTR/AA) e estadiar órgãos-alvo antes de escolher a terapia",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Tipar o amiloide (AL/ATTR/AA) e estadiar órgãos-alvo antes de escolher a terapia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISA amyloidosis"
  },
  {
    id: "NA-X187",
    tema: "Onconefro",
    subtema: "ICI-AIN",
    dificuldade: "avancado",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em pembrolizumabe com LRA e piúria estéril. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Suspender o checkpoint, considerar biópsia se dúvida e iniciar corticoide; discutir rechallenge depois",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Suspender o checkpoint, considerar biópsia se dúvida e iniciar corticoide; discutir rechallenge depois Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASCO irAE"
  },
  {
    id: "NA-X188",
    tema: "Onconefro",
    subtema: "TLS",
    dificuldade: "intermediario",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com LLA de alta carga, K/P/AU em rampa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Hidratação vigorosa + hipouricêmico (rasburicase/alopurinol) e preparar TSR se oligúria/refratariedade",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
    explanation: "Hidratação vigorosa + hipouricêmico (rasburicase/alopurinol) e preparar TSR se oligúria/refratariedade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Cairo-Bishop"
  },
  {
    id: "NA-X189",
    tema: "Gestação",
    subtema: "Pré-eclâmpsia grave",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "Gestante de {{age}} anos, 34 sem, PA 170/110, cefaleia e proteinúria. Conduta?",
    options: {
      A: "MgSO4, controle pressórico com agentes seguros e planejar resolução da gestação após estabilizar",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Iniciar IECA imediatamente como anti-hipertensivo de escolha na gestação. estratégia que não aborda o mecanismo."
    },
    correct: "A",
    explanation: "MgSO4, controle pressórico com agentes seguros e planejar resolução da gestação após estabilizar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACOG hypertension"
  },
  {
    id: "NA-X190",
    tema: "Gestação",
    subtema: "aHUS puerpério",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Puérpera de {{age}} com MAT persistente, ADAMTS13 normal, pós-parto. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Observar sem terapia específica porque “toda MAT puerperal é benigna”. estratégia que não aborda o mecanismo.",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Considerar aHUS e discutir inibidor de C5 precoce + suporte, após excluir PTT/HELLP residual",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Considerar aHUS e discutir inibidor de C5 precoce + suporte, após excluir PTT/HELLP residual Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "aHUS pregnancy"
  },
  {
    id: "NA-X191",
    tema: "Litíase",
    subtema: "Ácido úrico",
    dificuldade: "intermediario",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} obeso com cálculo radiotransparente e pH urinário 5,1. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Alcalinizar a urina (citrato/bicarbonato), hidratar e considerar alopurinol se hiperuricosúria/gota",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Alcalinizar a urina (citrato/bicarbonato), hidratar e considerar alopurinol se hiperuricosúria/gota Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU stones"
  },
  {
    id: "NA-X192",
    tema: "Litíase",
    subtema: "Estruvita",
    dificuldade: "intermediario",
    age: 53,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com coraliforme e Proteus na cultura. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter só antibiótico crônico sem remoção do cálculo coraliforme. estratégia que não aborda o mecanismo.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Remoção completa do cálculo + antibiótico dirigido + corrigir anomalia urológica se houver"
    },
    correct: "E",
    explanation: "Remoção completa do cálculo + antibiótico dirigido + corrigir anomalia urológica se houver Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU stones"
  },
  {
    id: "NA-X193",
    tema: "HAS",
    subtema: "Secundária",
    dificuldade: "basico",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS resistente e hipocalemia espontânea. Próximo passo?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Investigar hiperaldosteronismo (ARR) e outras causas secundárias antes de só empilhar fármacos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Investigar hiperaldosteronismo (ARR) e outras causas secundárias antes de só empilhar fármacos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society PA"
  },
  {
    id: "NA-X194",
    tema: "HAS",
    subtema: "FMD",
    dificuldade: "intermediario",
    age: 30,
    vars: {

    },
    statement: "Mulher de {{age}} com HAS e artérias em “colar de contas”. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Angioplastia com balão (sem stent de rotina) associada a terapia anti-hipertensiva",
      E: "Colocar stent farmacológico de rotina como na doença coronariana. estratégia que não aborda o mecanismo."
    },
    correct: "D",
    explanation: "Angioplastia com balão (sem stent de rotina) associada a terapia anti-hipertensiva Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AHA FMD"
  },
  {
    id: "NA-X195",
    tema: "HAS",
    subtema: "Liddle",
    dificuldade: "avancado",
    age: 24,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS, hipoK, renina e aldosterona baixas. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Usar espironolactona como se fosse hiperaldosteronismo primário com aldosterona alta",
      C: "Diagnosticar Liddle (ENaC) e tratar com amilorida/triantereno + restrição de sal",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "C",
    explanation: "Diagnosticar Liddle (ENaC) e tratar com amilorida/triantereno + restrição de sal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Monogenic HTN"
  },
  {
    id: "NA-X196",
    tema: "RTA",
    subtema: "Tipo 4",
    dificuldade: "intermediario",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} diabético de {{age}} com hiperK, HCO3 baixo e gap normal em IECA+MRA. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Reconhecer ATR tipo 4; revisar fármacos/dieta e considerar fludrocortisona em selecionados",
      C: "Tratar como ATR distal clássica hipocalêmica com alcalinização isolada. estratégia que não aborda o.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Reconhecer ATR tipo 4; revisar fármacos/dieta e considerar fludrocortisona em selecionados Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Acid-base primers"
  },
  {
    id: "NA-X197",
    tema: "Tóxicos",
    subtema: "Lítio",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em lítio com DI nefrogênico e TFG em queda. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Discutir com psiquiatria redução/troca, hidratação e amilorida; evitar desidratação/AINE",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Discutir com psiquiatria redução/troca, hidratação e amilorida; evitar desidratação/AINE Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Lithium nephrotoxicity"
  },
  {
    id: "NA-X198",
    tema: "Tóxicos",
    subtema: "AINE",
    dificuldade: "basico",
    age: 67,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC usando ibuprofeno diário. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender AINE, oferecer analgesia alternativa e reforçar nefroproteção. conduta preferencial neste contexto",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Suspender AINE, oferecer analgesia alternativa e reforçar nefroproteção Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NSAID nephrotoxicity"
  },
  {
    id: "NA-X199",
    tema: "Vascular",
    subtema: "Infarto renal",
    dificuldade: "intermediario",
    age: 46,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com dor lombar súbita, LDH alta e FA nova. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratar só com antiespasmódico, sem imagem vascular nem anticoagulação. estratégia que não aborda o.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Anticoagulação se não contraindicada, analgesia e investigação embólica/vascular",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Anticoagulação se não contraindicada, analgesia e investigação embólica/vascular Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Renal infarction"
  },
  {
    id: "NA-X200",
    tema: "Conservador",
    subtema: "Idoso frágil",
    dificuldade: "intermediario",
    age: 85,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} frágil, TFG 11, meta de conforto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Decisão compartilhada entre manejo conservador da uremia e diálise — ambas opções legítimas",
      B: "Indicar diálise compulsória em toda TFG <15 sem discutir metas de cuidado. estratégia que não aborda o.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Decisão compartilhada entre manejo conservador da uremia e diálise — ambas opções legítimas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Conservative kidney care"
  },
  {
    id: "NA-X201",
    tema: "Contraste",
    subtema: "CI-AKI prevenção",
    dificuldade: "basico",
    age: 71,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TFG 28 vai a coronariografia eletiva. Prevenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Hidratação isotônica peri-procedimento e menor volume de contraste possível; NAC sem benefício consistente",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Hidratação isotônica peri-procedimento e menor volume de contraste possível; NAC sem benefício consistente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO AKI; ESUR"
  },
  {
    id: "NA-X202",
    tema: "Gadolínio",
    subtema: "NSF",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com TFG 12 precisa de RM. Sobre gadolínio. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Evitar agentes grupo I; preferir baixo risco em dose mínima ou outra modalidade de imagem",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Liberar qualquer Gd linear antigo sem restrição quando a TFG está abaixo de 15"
    },
    correct: "B",
    explanation: "Evitar agentes grupo I; preferir baixo risco em dose mínima ou outra modalidade de imagem Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACR contrast"
  },
  {
    id: "NA-X203",
    tema: "SGLT2",
    subtema: "CAD euglicêmica",
    dificuldade: "avancado",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em SGLT2 com náuseas, gap alto e glicemia 190. Conduta?",
    options: {
      A: "Suspeitar CAD euglicêmica: suspender SGLT2, volume e insulina/cetonas — tratar como emergência",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Suspeitar CAD euglicêmica: suspender SGLT2, volume e insulina/cetonas — tratar como emergência Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SGLT2 DKA warnings"
  },
  {
    id: "NA-X204",
    tema: "IECA",
    subtema: "ΔCr 25%",
    dificuldade: "intermediario",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} inicia IECA; Cr sobe 25% e estabiliza, K normal. Conduta?",
    options: {
      A: "Suspender o IECA diante de qualquer elevação de 5% na creatinina. estratégia que não aborda o mecanismo.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Aceitável na maioria: manter e monitorar; investigar se continuar subindo ou houver hiperK",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Aceitável na maioria: manter e monitorar; investigar se continuar subindo ou houver hiperK Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO CKD"
  },
  {
    id: "NA-X205",
    tema: "CKD-MBD",
    subtema: "Fósforo",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      p: 6.1
    },
    statement: "{{sexWord}} de {{age}} DRC 4 com P {{p}} e PTH alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Dieta + quelante (preferir não cálcico se sobrecarga) e ajustar vitamina D/calcimimético conforme alvos",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "Dieta + quelante (preferir não cálcico se sobrecarga) e ajustar vitamina D/calcimimético conforme alvos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO MBD"
  },
  {
    id: "NA-X206",
    tema: "Anemia",
    subtema: "Resistência EPO",
    dificuldade: "avancado",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em AEE alta com Hb baixa, ferritina alta e TSAT baixa. Conduta?",
    options: {
      A: "Triplicar a EPO indefinidamente sem investigar causa de resistência. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Investigar inflamação/ferro funcional, adequação dialítica, hiperPTH e déficits; otimizar ferro"
    },
    correct: "E",
    explanation: "Investigar inflamação/ferro funcional, adequação dialítica, hiperPTH e déficits; otimizar ferro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO anemia"
  },
  {
    id: "NA-X207",
    tema: "DP",
    subtema: "Falência UF",
    dificuldade: "avancado",
    age: 50,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP edemaciado; PET mostra alto transportador. Conduta?",
    options: {
      A: "Encurtar dwells, usar icodextrina no dwell longo e reavaliar peso seco/prescrição",
      B: "Alongar dwells com glicose baixa em transportador alto e liberar sal. estratégia que não aborda o mecanismo.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Encurtar dwells, usar icodextrina no dwell longo e reavaliar peso seco/prescrição Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPD PD prescription"
  },
  {
    id: "NA-X208",
    tema: "Tx",
    subtema: "Gestação",
    dificuldade: "avancado",
    age: 31,
    vars: {

    },
    statement: "Mulher transplantada de {{age}} estável em tacrolimus+MMF deseja gestar. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Trocar MMF por azatioprina antes de conceber; manter tacrolimus/AZA/pred e obstetrícia de alto risco",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Trocar MMF por azatioprina antes de conceber; manter tacrolimus/AZA/pred e obstetrícia de alto risco Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "TTS pregnancy"
  },
  {
    id: "NA-X209",
    tema: "HCV",
    subtema: "Crioglobulinemia",
    dificuldade: "avancado",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HCV, púrpura, C4 baixo e GN. Conduta moderna. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Antivirais DAA para erradicar HCV; rituximabe/PLEX se doença organo-ameaçadora",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia."
    },
    correct: "A",
    explanation: "Antivirais DAA para erradicar HCV; rituximabe/PLEX se doença organo-ameaçadora Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EASL; KDIGO"
  },
  {
    id: "NA-X210",
    tema: "HIVAN",
    subtema: "TARV",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HIV, SN e colapso na biópsia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Imunossupressão pesada antes de qualquer terapia antirretroviral. estratégia que não aborda o mecanismo.",
      E: "Iniciar/otimizar TARV imediatamente + IECA/suporte — base do tratamento da HIVAN"
    },
    correct: "E",
    explanation: "Iniciar/otimizar TARV imediatamente + IECA/suporte — base do tratamento da HIVAN Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "HIVAN reviews"
  },
  {
    id: "NA-X211",
    tema: "Sarcoidose",
    subtema: "HiperCa",
    dificuldade: "intermediario",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com sarcoide, Ca alto, PTH baixo e 1,25 elevado. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Hidratar e tratar com corticoide (reduz 1,25 extrarrenal); evitar excesso de sol/vitamina D",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Hidratar e tratar com corticoide (reduz 1,25 extrarrenal); evitar excesso de sol/vitamina D Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Sarcoidosis calcium"
  },
  {
    id: "NA-X212",
    tema: "Sjögren",
    subtema: "ATR distal",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "Mulher de {{age}} com Sjögren, acidose hiperclorêmica e hipoK. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor. abordagem inadequada para o cenário.",
      D: "Diagnosticar ATR distal, alcalinizar, repor K e tratar a doença de base. conduta preferencial neste contexto",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Diagnosticar ATR distal, alcalinizar, repor K e tratar a doença de base Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Sjögren renal"
  },
  {
    id: "NA-X213",
    tema: "Obesidade",
    subtema: "ORG",
    dificuldade: "intermediario",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} obeso com proteinúria e hiperfiltração. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Perda de peso + IECA/BRA se proteinúria/HAS e manejo da síndrome metabólica. conduta preferencial neste contexto",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Perda de peso + IECA/BRA se proteinúria/HAS e manejo da síndrome metabólica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Obesity-related glomerulopathy"
  },
  {
    id: "NA-X214",
    tema: "Embolia colesterol",
    subtema: "Pós-cateter",
    dificuldade: "avancado",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-cateterismo com livedo, eosinofilia e LRA. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção.",
      E: "Suporte, controle pressórico e evitar novas agressões vasculares; prognóstico variável"
    },
    correct: "E",
    explanation: "Suporte, controle pressórico e evitar novas agressões vasculares; prognóstico variável Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Cholesterol emboli"
  },
  {
    id: "NA-X215",
    tema: "Calcifilaxia",
    subtema: "Manejo",
    dificuldade: "avancado",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} dialítico com placas necróticas dolorosas. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Otimizar mineral/PTH, cuidado de feridas, revisar warfarina e considerar tiossulfato em protocolo",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Otimizar mineral/PTH, cuidado de feridas, revisar warfarina e considerar tiossulfato em protocolo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Calciphylaxis reviews"
  },
  {
    id: "NA-X216",
    tema: "ACKD",
    subtema: "RCC",
    dificuldade: "intermediario",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD há 9 anos com hematúria. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Atribuir sempre a cisto benigno de dialítico sem qualquer imagem. estratégia que não aborda o mecanismo.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Investigar carcinoma em rins nativos com doença cística adquirida — imagem e urologia"
    },
    correct: "E",
    explanation: "Investigar carcinoma em rins nativos com doença cística adquirida — imagem e urologia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ACKD/RCC"
  },
  {
    id: "NA-X217",
    tema: "IgG4",
    subtema: "NTI",
    dificuldade: "avancado",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com LRA, IgG4 alto e NTI com fibrose storiform. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Corticoide de indução e poupador se recidiva; excluir infecção/malignidade. conduta preferencial neste contexto"
    },
    correct: "E",
    explanation: "Corticoide de indução e poupador se recidiva; excluir infecção/malignidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IgG4-RD consensus"
  },
  {
    id: "NA-X218",
    tema: "TINU",
    subtema: "Jovem",
    dificuldade: "intermediario",
    age: 27,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com uveíte e NTI. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Corticoides sistêmicos/oftalmológicos conforme gravidade e exclusão de outras causas",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "C",
    explanation: "Corticoides sistêmicos/oftalmológicos conforme gravidade e exclusão de outras causas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "TINU reviews"
  },
  {
    id: "NA-X219",
    tema: "Cisplatina",
    subtema: "HipoMg",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-cisplatina com LRA e Mg baixo. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suporte da NTA, repor magnésio e prevenir com hidratação nas próximas exposições",
      B: "Aumentar a dose de cisplatina na vigência de LRA para efeito antitumoral. estratégia que não aborda o.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Suporte da NTA, repor magnésio e prevenir com hidratação nas próximas exposições Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Onconephrology cisplatin"
  },
  {
    id: "NA-X220",
    tema: "Oxalato entérico",
    subtema: "Bypass",
    dificuldade: "avancado",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-bariátrica com LRA e cristais de oxalato. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Hidratação, cálcio nas refeições, reduzir gordura/oxalato e tratar esteatorreia; dialisar se preciso",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "D",
    explanation: "Hidratação, cálcio nas refeições, reduzir gordura/oxalato e tratar esteatorreia; dialisar se preciso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Enteric hyperoxaluria"
  },
  {
    id: "NA-X221",
    tema: "Rabdomiólise",
    subtema: "Volume",
    dificuldade: "intermediario",
    age: 29,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-crush com CK altíssima e dipstick + sem hemácias. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      E: "Hidratação isotônica agressiva precoce, monitorar eletrólitos e dialisar se indicações"
    },
    correct: "E",
    explanation: "Hidratação isotônica agressiva precoce, monitorar eletrólitos e dialisar se indicações Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Crush protocols"
  },
  {
    id: "NA-X222",
    tema: "Compartimental",
    subtema: "PIA",
    dificuldade: "avancado",
    age: 59,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} pós-laparotomia com PIA alta e oligúria. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratar síndrome compartimental abdominal: otimizar volume/ventilação e descomprimir se indicado",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Tratar síndrome compartimental abdominal: otimizar volume/ventilação e descomprimir se indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WSACS"
  },
  {
    id: "NA-X223",
    tema: "PBE",
    subtema: "Cirrose",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} cirrótico com ascite e 320 PMN no líquido. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Apenas diurético, sem antibiótico, na peritonite bacteriana espontânea. estratégia que não aborda o.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Antibiótico + albumina conforme protocolo e profilaxia secundária posteriormente"
    },
    correct: "E",
    explanation: "Antibiótico + albumina conforme protocolo e profilaxia secundária posteriormente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EASL ascites"
  },
  {
    id: "NA-X224",
    tema: "ICFER",
    subtema: "SGLT2",
    dificuldade: "basico",
    age: 64,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ICFER e TFG 40. Papel do SGLT2. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "SGLT2 é exclusivo de diabéticos e contraindicado na insuficiência cardíaca. estratégia que não aborda o mecanismo.",
      D: "SGLT2 integra a terapia quádrupla da IC e deve ser iniciado se elegível, com vigilância de volume",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "SGLT2 integra a terapia quádrupla da IC e deve ser iniciado se elegível, com vigilância de volume Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESC HF"
  },
  {
    id: "NA-X225",
    tema: "Diálise gestação",
    subtema: "Dose",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Gestante de {{age}} anos em HD. Princípio de prescrição. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      C: "Aumentar frequência/dose de diálise para melhorar desfecho fetal, com equipe multidisciplinar",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Aumentar frequência/dose de diálise para melhorar desfecho fetal, com equipe multidisciplinar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Dialysis in pregnancy"
  },
  {
    id: "NA-X226",
    tema: "Cistinúria",
    subtema: "Metafiilaxia",
    dificuldade: "avancado",
    age: 27,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cristais hexagonais e cálculos recorrentes. Conduta?",
    options: {
      A: "Hiperidratação, alcalinização urinária e tiol (tiopronina) se necessário. conduta preferencial neste contexto",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar."
    },
    correct: "A",
    explanation: "Hiperidratação, alcalinização urinária e tiol (tiopronina) se necessário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU cystinuria"
  },
  {
    id: "NA-X227",
    tema: "PH1",
    subtema: "Tx",
    dificuldade: "avancado",
    age: 34,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PH1 em diálise. Estratégia de transplante. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Considerar Tx hepático (± renal) porque o defeito enzimático é hepático; adjuvantes conforme genótipo",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Considerar Tx hepático (± renal) porque o defeito enzimático é hepático; adjuvantes conforme genótipo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PH transplant"
  },
  {
    id: "NA-X228",
    tema: "ADTKD",
    subtema: "UMOD",
    dificuldade: "avancado",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC familiar, gota precoce e rins não policísticos. Conduta?",
    options: {
      A: "Suspeitar ADTKD-UMOD, solicitar genética, controlar PA/ácido úrico e aconselhar a família",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "A",
    explanation: "Suspeitar ADTKD-UMOD, solicitar genética, controlar PA/ácido úrico e aconselhar a família Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO ADTKD"
  },
  {
    id: "NA-X229",
    tema: "Dent",
    subtema: "Jovem",
    dificuldade: "avancado",
    age: 20,
    vars: {

    },
    statement: "Homem de {{age}} com proteinúria LMW, hipercalciúria e DRC. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar corticoide empírico como se fosse síndrome nefrótica por lesão mínima",
      B: "Diagnosticar doença de Dent, tratar litíase/Fanconi parcial e seguir a função renal",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Diagnosticar doença de Dent, tratar litíase/Fanconi parcial e seguir a função renal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Dent disease"
  },
  {
    id: "NA-X230",
    tema: "Double+",
    subtema: "ANCA+MBG",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com RPGN, MPO-ANCA e anti-MBG positivos. Conduta aguda?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Tratar como anti-MBG grave (PLEX + IS); o ANCA informa risco de recidiva a longo prazo",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou."
    },
    correct: "D",
    explanation: "Tratar como anti-MBG grave (PLEX + IS); o ANCA informa risco de recidiva a longo prazo Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Double-positive vasculitis"
  },
  {
    id: "NA-X231",
    tema: "PEXIVAS",
    subtema: "PLEX no ANCA",
    dificuldade: "avancado",
    age: 57,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MPA renal grave sem DAH. Sobre plasmaférese. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "PEXIVAS questionou PLEX de rotina no AAV renal; individualizar (ainda em anti-MBG/DAH selecionada)",
      C: "Indicar plasmaférese mensal indefinida em todo paciente ANCA-positivo. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "PEXIVAS questionou PLEX de rotina no AAV renal; individualizar (ainda em anti-MBG/DAH selecionada) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PEXIVAS"
  },
  {
    id: "NA-X232",
    tema: "Beer potomania",
    subtema: "Correção",
    dificuldade: "avancado",
    age: 48,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} etilista, dieta pobre em solutos, Na 116. Risco principal?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Corrigir 20 mEq nas primeiras 6 horas como meta fixa em todo caso. estratégia que não aborda o mecanismo.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Baixa oferta de soluto: corrigir com cuidado — alto risco de correção rápida e ODS",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Baixa oferta de soluto: corrigir com cuidado — alto risco de correção rápida e ODS Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Beer potomania"
  },
  {
    id: "NA-X233",
    tema: "Pseudo-hipoNa",
    subtema: "Triglicérides",
    dificuldade: "intermediario",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Na 122, TG muito altos e osmolaridade normal. Interpretação?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Pseudohiponatremia: confirmar com método adequado e tratar a causa, não como SIADH",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Bolus imediato de NaCl 3% como se fosse hiponatremia hipotônica grave sintomática"
    },
    correct: "C",
    explanation: "Pseudohiponatremia: confirmar com método adequado e tratar a causa, não como SIADH Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Lab artifacts"
  },
  {
    id: "NA-X234",
    tema: "HiperNa",
    subtema: "Crônica idoso",
    dificuldade: "intermediario",
    age: 78,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} institucionalizado com Na 166 crônico. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      D: "Repor água livre lentamente (em geral ≤10 mEq/L/dia) por via enteral ou D5W calculado",
      E: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "D",
    explanation: "Repor água livre lentamente (em geral ≤10 mEq/L/dia) por via enteral ou D5W calculado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Adrogué-Madias"
  },
  {
    id: "NA-X235",
    tema: "PPI",
    subtema: "HipoMg",
    dificuldade: "intermediario",
    age: 69,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em omeprazol crônico com Mg baixo e K refratário. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação. estratégia que não aborda o mecanismo principal deste caso",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      E: "Repor magnésio (senão o K não corrige) e revisar a necessidade do PPI. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "E",
    explanation: "Repor magnésio (senão o K não corrige) e revisar a necessidade do PPI Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "FDA PPI warning"
  },
  {
    id: "NA-X236",
    tema: "ARN",
    subtema: "Warfarina",
    dificuldade: "avancado",
    age: 73,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com INR 5,9, hematúria e LRA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspeitar nefropatia por anticoagulante: reverter excesso, suporte renal e biópsia se dúvida",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Suspeitar nefropatia por anticoagulante: reverter excesso, suporte renal e biópsia se dúvida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Anticoagulant-related nephropathy"
  },
  {
    id: "NA-X237",
    tema: "Fosfato NaP",
    subtema: "Preparo intestinal",
    dificuldade: "intermediario",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC recebe preparo com fosfato de sódio e LRA. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Reconhecer nefropatia por fosfato; suporte/diálise se preciso e evitar NaP em DRC/idosos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios."
    },
    correct: "B",
    explanation: "Reconhecer nefropatia por fosfato; suporte/diálise se preciso e evitar NaP em DRC/idosos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "FDA NaP"
  },
  {
    id: "NA-X238",
    tema: "Carambola",
    subtema: "Dialítico",
    dificuldade: "intermediario",
    age: 57,
    vars: {

    },
    statement: "Dialítico de {{age}} com soluços e convulsão após carambola. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Suporte neurológico e diálise intensificada; educar a evitar Averrhoa carambola",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Suporte neurológico e diálise intensificada; educar a evitar Averrhoa carambola Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Star fruit intoxication"
  },
  {
    id: "NA-X239",
    tema: "Salicilato",
    subtema: "HD",
    dificuldade: "avancado",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com intoxicação grave por salicilato e alteração mental. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Alcalinização e hemodiálise conforme critérios EXTRIP na intoxicação grave. conduta preferencial neste contexto",
      D: "Apenas carvão ativado após 24 horas como única medida terapêutica. estratégia que não aborda o mecanismo.",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Alcalinização e hemodiálise conforme critérios EXTRIP na intoxicação grave Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EXTRIP salicylate"
  },
  {
    id: "NA-X240",
    tema: "Metanol",
    subtema: "Visual",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com gap osmolar alto e borramento visual. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Fomepizol (ou etanol) + folínico e hemodiálise nos casos graves/ácidos/visuais",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Fomepizol (ou etanol) + folínico e hemodiálise nos casos graves/ácidos/visuais Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EXTRIP methanol"
  },
  {
    id: "NA-X241",
    tema: "Etilenoglicol",
    subtema: "Oxalato",
    dificuldade: "avancado",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com gap alto e cristais de oxalato na urina. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Apenas bicarbonato, sem bloquear a álcool-desidrogenase nem dialisar. estratégia que não aborda o mecanismo.",
      D: "Fomepizol e hemodiálise se grave; tratar como intoxicação por etilenoglicol. conduta preferencial neste contexto",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Fomepizol e hemodiálise se grave; tratar como intoxicação por etilenoglicol Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EXTRIP ethylene glycol"
  },
  {
    id: "NA-X242",
    tema: "Feocromocitoma",
    subtema: "Preparo",
    dificuldade: "avancado",
    age: 37,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com feocromocitoma a operar. Preparo. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      B: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Bloqueio alfa antes do beta, expansão volêmica e cirurgia em centro experiente",
      E: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Bloqueio alfa antes do beta, expansão volêmica e cirurgia em centro experiente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society pheo"
  },
  {
    id: "NA-X243",
    tema: "AVS",
    subtema: "Hiperaldo",
    dificuldade: "avancado",
    age: 42,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com aldosteronismo confirmado e TC ambígua. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Adrenalectomia bilateral empírica sem cateterismo nem lateralização. estratégia que não aborda o mecanismo.",
      D: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Cateterismo de veias adrenais para lateralizar antes de decidir adrenalectomia"
    },
    correct: "E",
    explanation: "Cateterismo de veias adrenais para lateralizar antes de decidir adrenalectomia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Endocrine Society PA"
  },
  {
    id: "NA-X244",
    tema: "Nutcracker",
    subtema: "Hematúria",
    dificuldade: "avancado",
    age: 26,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hematúria e compressão da veia renal esquerda. Conduta?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Confirmar síndrome de nutcracker; manejo conservador na maioria, intervenção em selecionados",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      E: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Confirmar síndrome de nutcracker; manejo conservador na maioria, intervenção em selecionados Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Nutcracker syndrome"
  },
  {
    id: "NA-X245",
    tema: "Vacinas",
    subtema: "Pré-transplante",
    dificuldade: "basico",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DRC pré-Tx. Princípio vacinal. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar terapia agressiva empiricamente sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      E: "Atualizar o calendário antes do transplante (incluindo vivas quando ainda possível); evitar vivas depois"
    },
    correct: "E",
    explanation: "Atualizar o calendário antes do transplante (incluindo vivas quando ainda possível); evitar vivas depois Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST immunization"
  }
];

module.exports = { ADV_MASTERS_EXTRA4 };
