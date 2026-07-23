/**
 * Casos-mestres — Nefrologia Pediátrica (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const PED_MASTERS_EXTRA4 = [
  {
    id: "NP-X131",
    tema: "SN",
    subtema: "Primeiro episódio típico",
    dificuldade: "basico",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} ({{weight}} kg) com edema, albúmina baixa, C3 normal. Conduta inicial?",
    options: {
      A: "Corticoide oral em esquema padronizado se quadro típico; orientar edema, sódio e vacinas",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Biópsia imediata obrigatória em todo pré-escolar típico antes de qualquer corticoide"
    },
    correct: "A",
    explanation: "Corticoide oral em esquema padronizado se quadro típico; orientar edema, sódio e vacinas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA SSNS"
  },
  {
    id: "NP-X132",
    tema: "SN",
    subtema: "Atípico — biópsia",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} no 1º episódio com HAS, hematúria macroscópica e C3 baixo. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Biópsia precoce — atipias fogem da lesão mínima clássica do pré-escolar. conduta preferencial neste contexto",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a."
    },
    correct: "B",
    explanation: "Biópsia precoce — atipias fogem da lesão mínima clássica do pré-escolar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA SSNS"
  },
  {
    id: "NP-X133",
    tema: "SN",
    subtema: "Genética NPHS2",
    dificuldade: "avancado",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} corticoresistente com variante patogênica em NPHS2. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      C: "Evitar IS intensiva inútil; genética familiar, IECA e suporte; discutir prognóstico",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Evitar IS intensiva inútil; genética familiar, IECA e suporte; discutir prognóstico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA SRNS"
  },
  {
    id: "NP-X134",
    tema: "SN",
    subtema: "Rituximabe",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} corticodependente após falha de MMF/CYC. Próximo passo?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Rituximabe em centro experiente com monitorização de linfócitos B e infecções",
      D: "Manter prednisona plena contínua por 2 anos sem nova estratégia. estratégia que não aborda o mecanismo."
    },
    correct: "C",
    explanation: "Rituximabe em centro experiente com monitorização de linfócitos B e infecções Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA FRNS"
  },
  {
    id: "NP-X135",
    tema: "SN",
    subtema: "Trombose",
    dificuldade: "avancado",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN ativa, dor lombar súbita e hematúria. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Tratar só como ITU com antibiótico, sem qualquer imagem vascular. estratégia que não aborda o mecanismo.",
      B: "Suspeitar trombose de veia renal: imagem urgente, anticoagulação e tratar a SN",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Suspeitar trombose de veia renal: imagem urgente, anticoagulação e tratar a SN Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA complications"
  },
  {
    id: "NP-X136",
    tema: "PSGN",
    subtema: "Suporte",
    dificuldade: "basico",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} 2 semanas pós-faringite, cola-de-coca, C3 baixo, PA alta. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Metilprednisolona pulsada imediata sem suporte pressórico/volêmico. estratégia que não aborda o mecanismo.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suporte com restrição de sal, diurético e anti-hipertensivo; dialisar se indicação"
    },
    correct: "D",
    explanation: "Suporte com restrição de sal, diurético e anti-hipertensivo; dialisar se indicação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO GN"
  },
  {
    id: "NP-X137",
    tema: "PSGN",
    subtema: "C3 persistente",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com C3 ainda baixo após 12 semanas e proteinúria nefrótica. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Biópsia e investigação de glomerulopatias C3-persistentes / outras GN. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Biópsia e investigação de glomerulopatias C3-persistentes / outras GN Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO C3G"
  },
  {
    id: "NP-X138",
    tema: "SHU",
    subtema: "STEC suporte",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com diarreia sanguinolenta e depois MAT/IRA. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Suporte intensivo (volume/eletrólitos/diálise); evitar ATB/antimotilidade de rotina na fase STEC"
    },
    correct: "D",
    explanation: "Suporte intensivo (volume/eletrólitos/diálise); evitar ATB/antimotilidade de rotina na fase STEC Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA HUS"
  },
  {
    id: "NP-X139",
    tema: "SHU",
    subtema: "aHUS CFH",
    dificuldade: "avancado",
    age: 1,
    vars: {

    },
    statement: "Lactente sem diarreia, MAT recorrente, variante CFH. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Inibidor de C5 (eculizumab/ravulizumab) + suporte e vacinação meningocócica. conduta preferencial neste contexto",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Inibidor de C5 (eculizumab/ravulizumab) + suporte e vacinação meningocócica Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO aHUS"
  },
  {
    id: "NP-X140",
    tema: "SHU",
    subtema: "Pneumococo",
    dificuldade: "avancado",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pneumonia pneumocócica e MAT. Cuidado transfusional?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Evitar plasma/plaq não lavados quando possível (T-ativação); tratar infecção + suporte",
      D: "Infundir plasma fresco abundante de rotina em todos esses casos. estratégia que não aborda o mecanismo."
    },
    correct: "C",
    explanation: "Evitar plasma/plaq não lavados quando possível (T-ativação); tratar infecção + suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pneumococcal HUS"
  },
  {
    id: "NP-X141",
    tema: "CAKUT",
    subtema: "RVU alto grau",
    dificuldade: "intermediario",
    age: 0.5,
    vars: {

    },
    statement: "Lactente com RVU IV bilateral e ITU febril. Além do ATB agudo. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Profilaxia selecionada + seguimento urológico; cirurgia se breakthroughs/piora",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Profilaxia selecionada + seguimento urológico; cirurgia se breakthroughs/piora Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP UTI"
  },
  {
    id: "NP-X142",
    tema: "CAKUT",
    subtema: "VUP",
    dificuldade: "intermediario",
    age: 0.02,
    vars: {

    },
    statement: "RN menino com jato fraco e hidronefrose bilateral grave. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Suspeitar válvula de uretra posterior e desobstruir com urgência + suporte renal",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Suspeitar válvula de uretra posterior e desobstruir com urgência + suporte renal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU pediatric urology"
  },
  {
    id: "NP-X143",
    tema: "ITU",
    subtema: "DMSA",
    dificuldade: "basico",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} após ITU febril grave. Melhor exame de cicatriz. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Cintilografia DMSA para avaliar cicatriz parenquimatosa. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Cintilografia DMSA para avaliar cicatriz parenquimatosa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EANM DMSA"
  },
  {
    id: "NP-X144",
    tema: "ITU",
    subtema: "Amostra lactente",
    dificuldade: "basico",
    age: 0.6,
    vars: {

    },
    statement: "Lactente febril com saco coletor positivo. Conduta diagnóstica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Tratar definitivamente só com base no saco coletor sem confirmação. estratégia que não aborda o mecanismo.",
      D: "Confirmar com cateterismo ou punção antes de fechar ITU/ATB prolongado, salvo sepse"
    },
    correct: "D",
    explanation: "Confirmar com cateterismo ou punção antes de fechar ITU/ATB prolongado, salvo sepse Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP UTI"
  },
  {
    id: "NP-X145",
    tema: "ITU",
    subtema: "BBD escolar",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ITU de repetição e constipação/adiamento miccional. Conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Tratar disfunção vesical e intestinal (uroterapia) — reduz ITU tanto quanto só imaginar anomalia",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Tratar disfunção vesical e intestinal (uroterapia) — reduz ITU tanto quanto só imaginar anomalia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ICCS BBD"
  },
  {
    id: "NP-X146",
    tema: "DRC",
    subtema: "EPO",
    dificuldade: "intermediario",
    age: 10,
    vars: {
      hb: 8.3
    },
    statement: "{{sexWord}} de {{age}} DRC 4, Hb {{hb}}, ferro ok. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Iniciar AEE (EPO/darbepoetina) com alvo individualizado, evitando Hb excessiva",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Iniciar AEE (EPO/darbepoetina) com alvo individualizado, evitando Hb excessiva Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO anemia"
  },
  {
    id: "NP-X147",
    tema: "DRC",
    subtema: "rhGH",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC e altura <P3 após otimizar nutrição/acidose/PTH. Conduta?",
    options: {
      A: "Iniciar rhGH sob protocolo nefropediátrico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "A",
    explanation: "Iniciar rhGH sob protocolo nefropediátrico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA growth"
  },
  {
    id: "NP-X148",
    tema: "DRC",
    subtema: "Acidose crescimento",
    dificuldade: "intermediario",
    age: 6,
    vars: {
      hco3: 16
    },
    statement: "{{sexWord}} de {{age}} com DRC, HCO3 {{hco3}} e atraso estatural. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Alcalinizar visando alvo pediátrico — acidose prejudica crescimento e osso. conduta preferencial neste contexto",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de."
    },
    correct: "C",
    explanation: "Alcalinizar visando alvo pediátrico — acidose prejudica crescimento e osso Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDOQI pediatric"
  },
  {
    id: "NP-X149",
    tema: "DRC",
    subtema: "ESCAPE PA",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC proteinúrica. Meta pressórica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Alvo mais baixo (cerca do percentil 50 da PAM no ESCAPE) com IECA, se tolerado",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Alvo mais baixo (cerca do percentil 50 da PAM no ESCAPE) com IECA, se tolerado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ESCAPE trial"
  },
  {
    id: "NP-X150",
    tema: "HAS",
    subtema: "Renovascular",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS estágio 2 e sopro abdominal. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Fechar como HAS essencial sem investigação em criança com HAS grave. estratégia que não aborda o mecanismo.",
      D: "Investigar renovascular com Doppler/angio especializado e tratar causa. conduta preferencial neste contexto"
    },
    correct: "D",
    explanation: "Investigar renovascular com Doppler/angio especializado e tratar causa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP hypertension"
  },
  {
    id: "NP-X151",
    tema: "HAS",
    subtema: "Coarctação",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS em MMSS e pulsos femorais fracos. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Suspeitar coarctação — ecocardiograma/angiorressonância e cardiologia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
    explanation: "Suspeitar coarctação — ecocardiograma/angiorressonância e cardiologia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP HTN"
  },
  {
    id: "NP-X152",
    tema: "HAS",
    subtema: "Crise",
    dificuldade: "avancado",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PA 180/120 e papiledema. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Redução gradual em ambiente monitorado com agentes IV tituláveis; investigar causa",
      C: "Normalizar a PA em 5 minutos com nifedipina sublingual de rotina. estratégia que não aborda o mecanismo.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Redução gradual em ambiente monitorado com agentes IV tituláveis; investigar causa Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric hypertensive emergency"
  },
  {
    id: "NP-X153",
    tema: "Tubulopatia",
    subtema: "ATR distal",
    dificuldade: "intermediario",
    age: 5,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com falha ponderal, acidose hiperclorêmica e nefrocalcinose. Diagnóstico/conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento.",
      B: "ATR distal: alcalinizar e repor K; investigar causa genética/adquirida. conduta preferencial neste contexto",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "ATR distal: alcalinizar e repor K; investigar causa genética/adquirida Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric tubulopathies"
  },
  {
    id: "NP-X154",
    tema: "Tubulopatia",
    subtema: "Gitelman",
    dificuldade: "intermediario",
    age: 14,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hipoK, hipoMg, hipocalciúria e PA baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para.",
      B: "Diagnosticar Gitelman e repor Mg/K; orientar gatilhos de descompensação. conduta preferencial neste contexto",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Diagnosticar Gitelman e repor Mg/K; orientar gatilhos de descompensação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Gitelman consensus"
  },
  {
    id: "NP-X155",
    tema: "Tubulopatia",
    subtema: "Fanconi/cistinose",
    dificuldade: "avancado",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com Fanconi e fotofobia. Conduta específica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Cisteamina sistêmica + colírio, repor perdas do Fanconi e suporte nutricional",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Cisteamina sistêmica + colírio, repor perdas do Fanconi e suporte nutricional Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Cystinosis guidelines"
  },
  {
    id: "NP-X156",
    tema: "Tubulopatia",
    subtema: "Bartter neonatal",
    dificuldade: "avancado",
    age: 0.1,
    vars: {

    },
    statement: "RN com poliúria fetal, hipoK e hipercalciúria. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Repor volume/eletrólitos e manejo especializado de Bartter neonatal. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor."
    },
    correct: "A",
    explanation: "Repor volume/eletrólitos e manejo especializado de Bartter neonatal Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Bartter consensus"
  },
  {
    id: "NP-X157",
    tema: "Tubulopatia",
    subtema: "DI nefrogênico",
    dificuldade: "intermediario",
    age: 0.4,
    vars: {

    },
    statement: "Lactente menino com poliúria e hipernatremia; DDAVP não concentra urina. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "Diagnosticar DI nefrogênico; manejo de água/eletrólitos e genética (AVPR2/AQP2)"
    },
    correct: "D",
    explanation: "Diagnosticar DI nefrogênico; manejo de água/eletrólitos e genética (AVPR2/AQP2) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric DI"
  },
  {
    id: "NP-X158",
    tema: "Litíase",
    subtema: "Cistinúria",
    dificuldade: "avancado",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cristais hexagonais e cálculos recorrentes. Conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou.",
      B: "Hiperidratação + alcalinização + tiol se preciso; orientar dieta com nutricionista",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Hiperidratação + alcalinização + tiol se preciso; orientar dieta com nutricionista Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "EAU pediatric stones"
  },
  {
    id: "NP-X159",
    tema: "Litíase",
    subtema: "Hipercalciúria",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hematúria e hipercalciúria idiopática. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Alta ingestão hídrica + baixo sódio; tiazídico se sintomática/cálculos persistentes",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Usar apenas analgésico e observação, sem metafiilaxia nem ajuste do pH urinário quando indicado",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Alta ingestão hídrica + baixo sódio; tiazídico se sintomática/cálculos persistentes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric stone disease"
  },
  {
    id: "NP-X160",
    tema: "Litíase",
    subtema: "PH1 lumasiran",
    dificuldade: "avancado",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com nefrocalcinose grave e oxalato muito alto. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Hidratação + piridoxina se responsivo + RNAi (lumasiran) conforme tipo; evitar vit C megadose"
    },
    correct: "D",
    explanation: "Hidratação + piridoxina se responsivo + RNAi (lumasiran) conforme tipo; evitar vit C megadose Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ILLUMINATE"
  },
  {
    id: "NP-X161",
    tema: "LES",
    subtema: "Classe IV",
    dificuldade: "intermediario",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com LN classe IV. Indução. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "MMF ou CYC + corticoide; preferir MMF se fertilidade for preocupação. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "A",
    explanation: "MMF ou CYC + corticoide; preferir MMF se fertilidade for preocupação Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO LN"
  },
  {
    id: "NP-X162",
    tema: "LES",
    subtema: "Classe V",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} com classe V nefrótica e função estável. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "MMF/CNI/CYC conforme protocolo + antiproteinúrico; esteroides como indicado. conduta preferencial neste contexto",
      C: "Só IECA, sem imunossupressão, em nefrótica sintomática por classe V. estratégia que não aborda o mecanismo.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "MMF/CNI/CYC conforme protocolo + antiproteinúrico; esteroides como indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO LN"
  },
  {
    id: "NP-X163",
    tema: "Vasculite",
    subtema: "HSP biópsia",
    dificuldade: "intermediario",
    age: 7,
    vars: {
      upcr: 2.4
    },
    statement: "{{sexWord}} de {{age}} com púrpura típica e UPCR {{upcr}} + HAS. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Biópsia renal se nefrite moderada/grave para guiar imunossupressão. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Biópsia renal se nefrite moderada/grave para guiar imunossupressão Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "SHARE IgAV"
  },
  {
    id: "NP-X164",
    tema: "Vasculite",
    subtema: "GPA ped",
    dificuldade: "avancado",
    age: 13,
    vars: {

    },
    statement: "Adolescente de {{age}} com sinusite, nódulos pulmonares e PR3+. Conduta?",
    options: {
      A: "Indução com RTX ou CYC + corticoides; PLEX em indicações selecionadas. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Indução com RTX ou CYC + corticoides; PLEX em indicações selecionadas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO vasculitis"
  },
  {
    id: "NP-X165",
    tema: "Císticos",
    subtema: "ARPKD fígado",
    dificuldade: "intermediario",
    age: 0.05,
    vars: {

    },
    statement: "RN com rins grandes hiperecogênicos e consanguinidade. Associação hepática?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      B: "Fibrose hepática congênita / ectasia de ductos biliares — manejar rim+fígado",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Fibrose hepática congênita / ectasia de ductos biliares — manejar rim+fígado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA ARPKD"
  },
  {
    id: "NP-X166",
    tema: "Císticos",
    subtema: "HNF1B",
    dificuldade: "avancado",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com rins hiperecogênicos, hipoMg e diabetes familiar jovem. Conduta?",
    options: {
      A: "Suspeitar HNF1B: genética e seguir rim/Mg/glicemia/geniturinário. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Suspeitar HNF1B: genética e seguir rim/Mg/glicemia/geniturinário Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "HNF1B disease"
  },
  {
    id: "NP-X167",
    tema: "Císticos",
    subtema: "Nefronoptise",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com poliúria, anemia precoce e rins pequenos; irmão com DRC. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Suspeitar nefroftise; genética, suporte e planejamento de TSR/Tx. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
    explanation: "Suspeitar nefroftise; genética, suporte e planejamento de TSR/Tx Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NPHP reviews"
  },
  {
    id: "NP-X168",
    tema: "Alport",
    subtema: "COL4A5",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "Menino de {{age}} com hematúria, surdez e tia materna com DRC. Gene típico?",
    options: {
      A: "COL4A5 (Alport ligado ao X); iniciar IECA se proteinúria e aconselhar família",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "COL4A5 (Alport ligado ao X); iniciar IECA se proteinúria e aconselhar família Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Alport Workshop"
  },
  {
    id: "NP-X169",
    tema: "Alport",
    subtema: "Doadora materna",
    dificuldade: "avancado",
    age: 14,
    vars: {

    },
    statement: "Menino com Alport próximo de TSR; mãe portadora quer doar. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Avaliar criteriosa a mãe — portadoras têm risco próprio; preferir doador não portador se possível",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Avaliar criteriosa a mãe — portadoras têm risco próprio; preferir doador não portador se possível Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Living donor Alport"
  },
  {
    id: "NP-X170",
    tema: "Diálise",
    subtema: "Peritonite ped",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com efluente turvo. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Cultura + ATB IP empírico cobrindo gram+/gram− conforme protocolo pediátrico",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Cultura + ATB IP empírico cobrindo gram+/gram− conforme protocolo pediátrico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ISPD; IPNA dialysis"
  },
  {
    id: "NP-X171",
    tema: "Diálise",
    subtema: "FAV adolescente",
    dificuldade: "basico",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} em HD crônica. Acesso preferencial. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Fístula arteriovenosa autógena quando anatomicamente viável. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
    explanation: "Fístula arteriovenosa autógena quando anatomicamente viável Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDOQI access"
  },
  {
    id: "NP-X172",
    tema: "Diálise",
    subtema: "Volume HAS",
    dificuldade: "intermediario",
    age: 13,
    vars: {

    },
    statement: "Adolescente de {{age}} em HD com grande ganho interdialítico e HAS. Conduta?",
    options: {
      A: "Educar sódio/líquidos, ajustar peso seco e tempo/UF; anti-hipertensivos como adjunto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Educar sódio/líquidos, ajustar peso seco e tempo/UF; anti-hipertensivos como adjunto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA dialysis"
  },
  {
    id: "NP-X173",
    tema: "Tx",
    subtema: "Preemptivo",
    dificuldade: "intermediario",
    age: 11,
    vars: {
      tfg: 14
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}} e doador vivo disponível. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Planejar transplante preemptivo quando possível — evita diálise e suas complicações",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Planejar transplante preemptivo quando possível — evita diálise e suas complicações Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA transplant"
  },
  {
    id: "NP-X174",
    tema: "Tx",
    subtema: "BK ped",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "Criança de {{age}} Tx com Cr ↑ e BK plasmático alto. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Reduzir imunossupressão primeiro ± outras medidas; biópsia se disfunção. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Reduzir imunossupressão primeiro ± outras medidas; biópsia se disfunção Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST BK"
  },
  {
    id: "NP-X175",
    tema: "Tx",
    subtema: "PTLD",
    dificuldade: "avancado",
    age: 6,
    vars: {

    },
    statement: "Criança de {{age}} D+/R− EBV com febre e adenomegalia 8 meses pós-Tx. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      C: "Reduzir IS e investigar PTLD com equipe de transplante/oncologia. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "C",
    explanation: "Reduzir IS e investigar PTLD com equipe de transplante/oncologia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST PTLD"
  },
  {
    id: "NP-X176",
    tema: "Tx",
    subtema: "CMV ped",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "Criança de {{age}} D+/R− CMV pós-Tx. Prevenção. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Profilaxia com valganciclovir por período protocolar + monitoramento. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "B",
    explanation: "Profilaxia com valganciclovir por período protocolar + monitoramento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AST CMV"
  },
  {
    id: "NP-X177",
    tema: "Eletrólitos",
    subtema: "HiperK ECG",
    dificuldade: "basico",
    age: 5,
    vars: {
      k: 7.7
    },
    statement: "{{sexWord}} de {{age}} com K {{k}} e T apiculadas. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Gluconato de cálcio IV sob monitorização, depois shift e remoção de K. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso"
    },
    correct: "D",
    explanation: "Gluconato de cálcio IV sob monitorização, depois shift e remoção de K Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "PALS electrolytes"
  },
  {
    id: "NP-X178",
    tema: "Eletrólitos",
    subtema: "HipoNa convulsão",
    dificuldade: "intermediario",
    age: 1.2,
    vars: {
      na: 118
    },
    statement: "Lactente de {{age}} com convulsão e Na {{na}}. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      D: "Bolus de salina hipertônica para interromper sintomas, depois correção controlada"
    },
    correct: "D",
    explanation: "Bolus de salina hipertônica para interromper sintomas, depois correção controlada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric hyponatremia"
  },
  {
    id: "NP-X179",
    tema: "Eletrólitos",
    subtema: "Refeeding",
    dificuldade: "avancado",
    age: 14,
    vars: {
      p: 1.3
    },
    statement: "Adolescente de {{age}} desnutrido grave inicia nutrição e P cai a {{p}}. Conduta?",
    options: {
      A: "Reconhecer refeeding: repor P/K/Mg e avançar calorias gradualmente. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "A",
    explanation: "Reconhecer refeeding: repor P/K/Mg e avançar calorias gradualmente Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "NICE refeeding"
  },
  {
    id: "NP-X180",
    tema: "Neonatal",
    subtema: "AKI asfixia",
    dificuldade: "intermediario",
    age: 0.03,
    vars: {

    },
    statement: "RN asfixiado oligúrico com Cr em ascensão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Monitorar balanço/eletrólitos, evitar nefrotóxicos e dialisar se critérios clássicos"
    },
    correct: "D",
    explanation: "Monitorar balanço/eletrólitos, evitar nefrotóxicos e dialisar se critérios clássicos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Neonatal AKI"
  },
  {
    id: "NP-X181",
    tema: "Neonatal",
    subtema: "TVR",
    dificuldade: "avancado",
    age: 0.05,
    vars: {

    },
    statement: "RN filho de mãe diabética com massa lombar, hematúria e plaquetopenia. Conduta?",
    options: {
      A: "Suspeitar trombose de veia renal: Doppler, suporte e anticoagulação selecionada",
      B: "Diagnosticar tumor de Wilms típico da primeira semana e operar sem Doppler. estratégia que não aborda o.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "A",
    explanation: "Suspeitar trombose de veia renal: Doppler, suporte e anticoagulação selecionada Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Neonatal RVT"
  },
  {
    id: "NP-X182",
    tema: "Neonatal",
    subtema: "Indometacina AKI",
    dificuldade: "intermediario",
    age: 0.01,
    vars: {

    },
    statement: "Prematuro recebe indometacina para PCA e fica oligúrico. Mecanismo/conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "IRA hemodinâmica por inibição de prostaglandinas; suporte e evitar outros nefrotóxicos",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "IRA hemodinâmica por inibição de prostaglandinas; suporte e evitar outros nefrotóxicos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Neonatal NSAID AKI"
  },
  {
    id: "NP-X183",
    tema: "Farmaco",
    subtema: "IECA no RN",
    dificuldade: "intermediario",
    age: 0.08,
    vars: {

    },
    statement: "RN recebe captopril e evolui com IRA e hiperK. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Indicar exame invasivo de rotina em quadro típico autolimitado, adiando o tratamento de suporte adequado Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Suspender IECA — RN é hipersensível; suporte de IRA/eletrólitos. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Suspender IECA — RN é hipersensível; suporte de IRA/eletrólitos Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Neonatal ACEI toxicity"
  },
  {
    id: "NP-X184",
    tema: "Farmaco",
    subtema: "Vanco+PipTazo",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em vancomicina + pip/tazo com Cr em ascensão. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Reavaliar antibióticos e volume — associação ligada a mais AKI (e possível artefato de Cr)",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Reavaliar antibióticos e volume — associação ligada a mais AKI (e possível artefato de Cr) Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Vanco-PipTazo AKI"
  },
  {
    id: "NP-X185",
    tema: "Farmaco",
    subtema: "TDF Fanconi",
    dificuldade: "avancado",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} com HIV em TDF e fosfatúria/acidose. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Suspeitar tubulopatia por TDF; discutir troca (ex. TAF) com infectologia e repor perdas",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Suspeitar tubulopatia por TDF; discutir troca (ex. TAF) com infectologia e repor perdas Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "TDF nephrotoxicity"
  },
  {
    id: "NP-X186",
    tema: "Genética",
    subtema: "WT1 Denys-Drash",
    dificuldade: "avancado",
    age: 1.5,
    vars: {

    },
    statement: "Lactente com SN precoce e genitália ambígua. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Investigar WT1, US para Wilms e manejo multidisciplinar; IS clássica costuma falhar",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Investigar WT1, US para Wilms e manejo multidisciplinar; IS clássica costuma falhar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "WT1 disorders"
  },
  {
    id: "NP-X187",
    tema: "Genética",
    subtema: "Frasier",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "Adolescente 46,XY feminino com FSGS. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Suspeitar Frasier (WT1): gonadectomia profilática e manejo da nefropatia. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Suspeitar Frasier (WT1): gonadectomia profilática e manejo da nefropatia Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Frasier syndrome"
  },
  {
    id: "NP-X188",
    tema: "Genética",
    subtema: "Lowe",
    dificuldade: "avancado",
    age: 2,
    vars: {

    },
    statement: "Menino de {{age}} com catarata, Fanconi e hipotonia. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Diagnosticar Lowe (OCRL): manejar tubulopatia + oftalmo/neuro e genética. conduta preferencial neste contexto",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo."
    },
    correct: "C",
    explanation: "Diagnosticar Lowe (OCRL): manejar tubulopatia + oftalmo/neuro e genética Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Lowe syndrome"
  },
  {
    id: "NP-X189",
    tema: "Genética",
    subtema: "Bardet-Biedl",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com obesidade, polidactilia, retinopatia e DRC. Conduta?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Reconhecer Bardet-Biedl e seguir rim/sensorial de forma multidisciplinar. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para."
    },
    correct: "C",
    explanation: "Reconhecer Bardet-Biedl e seguir rim/sensorial de forma multidisciplinar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Ciliopathy reviews"
  },
  {
    id: "NP-X190",
    tema: "Genética",
    subtema: "Nail-patella",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com unhas displásicas, patelas hipoplásicas e proteinúria. Conduta?",
    options: {
      A: "Suspeitar LMX1B; seguir proteinúria/DRC e iniciar IECA quando indicado. conduta preferencial neste contexto",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente."
    },
    correct: "A",
    explanation: "Suspeitar LMX1B; seguir proteinúria/DRC e iniciar IECA quando indicado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Nail-patella nephropathy"
  },
  {
    id: "NP-X191",
    tema: "Metabólico",
    subtema: "Ortostática",
    dificuldade: "basico",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} com proteinúria diurna e urina noturna negativa. Conduta?",
    options: {
      A: "Confirmar ortostática com split; se típica, prognóstico benigno e seguimento",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico."
    },
    correct: "A",
    explanation: "Confirmar ortostática com split; se típica, prognóstico benigno e seguimento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Orthostatic proteinuria"
  },
  {
    id: "NP-X192",
    tema: "Metabólico",
    subtema: "Obesidade",
    dificuldade: "intermediario",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} obeso com proteinúria leve e HAS. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Perda de peso + IECA/BRA se proteinúria/HAS e manejo metabólico. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Perda de peso + IECA/BRA se proteinúria/HAS e manejo metabólico Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric obesity kidney"
  },
  {
    id: "NP-X193",
    tema: "Nutrição",
    subtema: "Proteína DRC",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "Pré-escolar de {{age}} com DRC e baixo peso. Sobre proteína. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      B: "Evitar restrição severa que prejudique crescimento; priorizar calorias e controlar P/K",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Evitar restrição severa que prejudique crescimento; priorizar calorias e controlar P/K Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDOQI pediatric nutrition"
  },
  {
    id: "NP-X194",
    tema: "Nutrição",
    subtema: "Potássio",
    dificuldade: "basico",
    age: 8,
    vars: {
      k: 5.6
    },
    statement: "{{sexWord}} de {{age}} com DRC e K {{k}}. Orientação dietética. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Individualizar porções e técnicas culinárias; não destruir o padrão alimentar sem necessidade",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "B",
    explanation: "Individualizar porções e técnicas culinárias; não destruir o padrão alimentar sem necessidade Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Renal dietetics"
  },
  {
    id: "NP-X195",
    tema: "Vacinas",
    subtema: "SN imunossuprimido",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN em MMF; pais pedem varicela viva. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Vacinas vivas contraindicadas sob IS significativa; priorizar inativadas e imunizar conviventes",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Vacinas vivas contraindicadas sob IS significativa; priorizar inativadas e imunizar conviventes Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA immunization"
  },
  {
    id: "NP-X196",
    tema: "Vacinas",
    subtema: "Pré-Tx ped",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "Criança de {{age}} pré-transplante. Princípio vacinal. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora.",
      C: "Atualizar calendário antes do Tx (incluindo vivas quando possível); evitar vivas depois",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "C",
    explanation: "Atualizar calendário antes do Tx (incluindo vivas quando possível); evitar vivas depois Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA/AST vaccines"
  },
  {
    id: "NP-X197",
    tema: "Transição",
    subtema: "Prontidão",
    dificuldade: "basico",
    age: 17,
    vars: {

    },
    statement: "Adolescente de {{age}} transplantado será transferido. O que avaliar. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Checklist de autocuidado, adesão, sintomas de rejeição e visitas conjuntas ped-adulto",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Alta abrupta só pela idade cronológica, sem sumário nem prontidão. estratégia que não aborda o mecanismo."
    },
    correct: "A",
    explanation: "Checklist de autocuidado, adesão, sintomas de rejeição e visitas conjuntas ped-adulto Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Got Transition"
  },
  {
    id: "NP-X198",
    tema: "Ética",
    subtema: "Não adesão",
    dificuldade: "intermediario",
    age: 16,
    vars: {

    },
    statement: "Adolescente Tx de {{age}} com rejeição e nível zero de tacrolimus. Conduta além de tratar rejeição?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Abordagem multidisciplinar de adesão, simplificar esquema e reforçar transição",
      C: "Punir com alta compulsória sem abordar causas sociais/psicológicas. estratégia que não aborda o mecanismo.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "B",
    explanation: "Abordagem multidisciplinar de adesão, simplificar esquema e reforçar transição Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Adolescent adherence"
  },
  {
    id: "NP-X199",
    tema: "SHU",
    subtema: "DGKE",
    dificuldade: "avancado",
    age: 0.7,
    vars: {

    },
    statement: "Lactente com SHUa precoce e variante DGKE. Nuance terapêutica. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      C: "DGKE pode responder mal ao C5i; individualizar em centro de referência com suporte",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "DGKE pode responder mal ao C5i; individualizar em centro de referência com suporte Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "DGKE nephropathy"
  },
  {
    id: "NP-X200",
    tema: "SHU",
    subtema: "C5i vacina",
    dificuldade: "intermediario",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} iniciará eculizumab na SHUa. Medida obrigatória. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Vacinação meningocócica + profilaxia quando indicado e educação sobre febre. conduta preferencial neste contexto",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável"
    },
    correct: "B",
    explanation: "Vacinação meningocócica + profilaxia quando indicado e educação sobre febre Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "C5i safety"
  },
  {
    id: "NP-X201",
    tema: "IRA",
    subtema: "TLS rasburicase",
    dificuldade: "intermediario",
    age: 8,
    vars: {
      ua: 13
    },
    statement: "{{sexWord}} de {{age}} com Burkitt e AU {{ua}}; G6PD desconhecido. Cuidado. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      B: "Rasburicase pode causar hemólise em G6PD deficiente — rastrear risco e monitorar",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem.",
      D: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Rasburicase pode causar hemólise em G6PD deficiente — rastrear risco e monitorar Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "ASCO TLS"
  },
  {
    id: "NP-X202",
    tema: "IRA",
    subtema: "Pré-renal GECA",
    dificuldade: "basico",
    age: 0.8,
    vars: {

    },
    statement: "Lactente com GECA, má perfusão, FENa baixa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Reposição volêmica isotônica criteriosa antes de diurético. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "A",
    explanation: "Reposição volêmica isotônica criteriosa antes de diurético Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO AKI; SBP"
  },
  {
    id: "NP-X203",
    tema: "Cardiorrenal",
    subtema: "Ped",
    dificuldade: "avancado",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cardiopatia congestiva e Cr ↑ refratária a diurético. Conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar.",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Otimizar débito/congestão; BRT/UF ou DP se falência — decisão cardio-nefro. conduta preferencial neste contexto"
    },
    correct: "D",
    explanation: "Otimizar débito/congestão; BRT/UF ou DP se falência — decisão cardio-nefro Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric cardiorenal"
  },
  {
    id: "NP-X204",
    tema: "Membranosa ped",
    subtema: "Secundária",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN e biópsia membranosa. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Assumir sempre primária idêntica ao adulto e ignorar secundárias. estratégia que não aborda o mecanismo.",
      C: "Caçar causas secundárias (LES, vírus, fármacos) e tratar causa + nefroproteção/IS",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "Caçar causas secundárias (LES, vírus, fármacos) e tratar causa + nefroproteção/IS Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric membranous"
  },
  {
    id: "NP-X205",
    tema: "Levamisole",
    subtema: "SDNS",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} corticodependente com levamisole disponível. Papel. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos. estratégia que não aborda o mecanismo principal deste caso",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Poupador em SDNS/FRNS selecionados; monitorar neutropenia/ANCA/fígado. Esta é a conduta alinhada à vinheta e às diretrizes aplicáveis ao caso",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente. estratégia que não aborda o mecanismo principal deste caso"
    },
    correct: "C",
    explanation: "Poupador em SDNS/FRNS selecionados; monitorar neutropenia/ANCA/fígado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "IPNA; levamisole trials"
  },
  {
    id: "NP-X206",
    tema: "Abscesso",
    subtema: "PNA febril",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PNA e febre >72 h sob ATB adequado. Conduta. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      D: "Imagem para abscesso/obstrução; drenar se coleção significativa + ATB prolongado"
    },
    correct: "D",
    explanation: "Imagem para abscesso/obstrução; drenar se coleção significativa + ATB prolongado Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Pediatric urology"
  },
  {
    id: "NP-X207",
    tema: "Circuncisão",
    subtema: "ITU menino",
    dificuldade: "intermediario",
    age: 0.4,
    vars: {

    },
    statement: "Lactente masculino com ITU febril recorrente e fimose. Conduta adicional?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      D: "Discutir circuncisão com urologia em meninos de alto risco — pode reduzir ITU"
    },
    correct: "D",
    explanation: "Discutir circuncisão com urologia em meninos de alto risco — pode reduzir ITU Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP circumcision/UTI"
  },
  {
    id: "NP-X208",
    tema: "MAPA",
    subtema: "Jaleco branco",
    dificuldade: "intermediario",
    age: 13,
    vars: {

    },
    statement: "Adolescente de {{age}} com PA alta no consultório. Melhor exame. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "MAPA de 24 h para confirmar HAS mascarada/jaleco branco e guiar tratamento. conduta preferencial neste contexto",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "C",
    explanation: "MAPA de 24 h para confirmar HAS mascarada/jaleco branco e guiar tratamento Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "AAP hypertension"
  },
  {
    id: "NP-X209",
    tema: "SGLT2 Alport",
    subtema: "Adolescente",
    dificuldade: "avancado",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} com Alport em IECA pergunta sobre dapagliflozina. Conduta?",
    options: {
      A: "Evidência pediátrica limitada; decisão individual após otimizar IECA — extrapolar com cautela",
      B: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      C: "Substituir o IECA pelo SGLT2 como padrão-ouro pediátrico há décadas. estratégia que não aborda o mecanismo.",
      D: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente"
    },
    correct: "A",
    explanation: "Evidência pediátrica limitada; decisão individual após otimizar IECA — extrapolar com cautela Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "Emerging pediatric SGLT2"
  },
  {
    id: "NP-X210",
    tema: "SHUa Tx",
    subtema: "CFH",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "Criança de {{age}} com SHUa por CFH será transplantada. Estratégia. Qual a melhor conduta imediata alinhada às diretrizes?",
    options: {
      A: "Indicar procedimento invasivo imediato antes de estabilizar o paciente e confirmar a hipótese com exames dirigidos",
      B: "Negar qualquer risco de recorrência e transplantar sem plano de complemento. estratégia que não aborda o.",
      C: "Manter a terapia atual sem mudança e reavaliar só em consulta daqui a três meses, apesar do risco já evidente",
      D: "Planejar profilaxia/tratamento com inibidor de C5 no peri-Tx conforme risco genético"
    },
    correct: "D",
    explanation: "Planejar profilaxia/tratamento com inibidor de C5 no peri-Tx conforme risco genético Pearl: compare mecanismos, não o tamanho da opção. Distratores = erros clínicos comuns.",
    bibliography: "KDIGO aHUS transplant"
  }
];

module.exports = { PED_MASTERS_EXTRA4 };
