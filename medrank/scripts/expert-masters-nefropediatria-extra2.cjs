/**
 * Casos-mestres — Nefrologia Pediátrica (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const PED_MASTERS_EXTRA2 = [
  {
    id: "NP-X046",
    tema: "Síndrome nefrótica",
    subtema: "Trombose na SN",
    dificuldade: "avancado",
    age: 5,
    vars: {
      alb: 1.4
    },
    statement: "{{sexWord}} de {{age}} ({{weight}} kg) com SN ativa (alb {{alb}} g/dL) apresenta dor lombar súbita e hematúria macroscópica. Qual complicação e conduta inicial?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Suspeitar trombose de veia renal/outros: imagem vascular urgente, anticoagulação conforme protocolo e tratamento da SN"
    },
    correct: "D",
    explanation: "SN nefrótica grave é pró-trombótica; TVR é clássica. Pearl: dor + hematúria na SN = pense trombose. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA NS complications; pediatric thrombosis."
  },
  {
    id: "NP-X047",
    tema: "Síndrome nefrótica",
    subtema: "Peritonite pneumocócica",
    dificuldade: "intermediario",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN em atividade, febre, dor abdominal e ascite. Qual infecção é clássica e qual prevenção vacinal importa?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Peritonite espontânea (pneumococo clássico): ATB empírico + culturas; garantir vacinas pneumocócicas/influenza no calendário da SN"
    },
    correct: "D",
    explanation: "Crianças com SN têm risco de infecções encapsuladas; peritonite é emergência. Pearl: ascite + febre na SN = ATB hoje.",
    bibliography: "IPNA NS; SBP immunization."
  },
  {
    id: "NP-X048",
    tema: "Síndrome nefrótica",
    subtema: "WT1 / Denys-Drash",
    dificuldade: "avancado",
    age: 1.5,
    vars: {

    },
    statement: "Lactente de {{age}} com SN corticoresistente precoce, genitália ambígua e risco de tumor de Wilms. Qual gene e conduta de vigilância?",
    options: {
      A: "WT1 (Denys-Drash/Frasier spectrum): genética, US seriada para Wilms e manejo multidisciplinar; IS muitas vezes ineficaz",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "A",
    explanation: "WT1: SN + distúrbio sexual ± Wilms. Pearl: SN precoce + genitália atípica = WT1. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA genetics SRNS; Denys-Drash reviews."
  },
  {
    id: "NP-X049",
    tema: "Glomerulonefrite aguda",
    subtema: "RPGN pediátrica",
    dificuldade: "avancado",
    age: 10,
    vars: {
      cr: 3.8
    },
    statement: "{{sexWord}} de {{age}} com hematúria, oligúria, creatinina {{cr}}, crescentes na biópsia e ANCA positivo. Qual indução geral?",
    options: {
      A: "Metilprednisolona + rituximabe ou ciclofosfamida conforme protocolo; dialisar se indicação; plasmaférese se DAH/anti-MBG",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "A",
    explanation: "RPGN com crescentes/ANCA: indução agressiva. Pearl: creatinina em rampa + crescentes = não espere. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDIGO vasculitis; pediatric AAV."
  },
  {
    id: "NP-X050",
    tema: "SHU / MAT",
    subtema: "Pneumococcus-HUS",
    dificuldade: "avancado",
    age: 2,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pneumonia/empiema pneumocócico evolui com MAT e IRA. Qual cuidado transfusional clássico?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Evitar plasma/plaq não lavados quando possível (antígeno T exposto); tratar infecção + suporte/diálise; eculizumab não é primeira linha típica",
      C: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "HUS por pneumococo: risco de reação com plasma (T-activation). Pearl: pneumonia + HUS = cuidado com plasma. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA HUS; pneumococcal HUS reviews."
  },
  {
    id: "NP-X051",
    tema: "SHU / MAT",
    subtema: "Cobalamina C",
    dificuldade: "avancado",
    age: 0.2,
    vars: {

    },
    statement: "RN/lactente jovem com MAT, LRA, acidose e homocisteína/metilmalônico alterados. Qual causa metabólica tratar?",
    options: {
      A: "Defeito cobalamina C: hidroxicobalamina + betaina/folato conforme protocolo metabólico + suporte de MAT",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "A",
    explanation: "cblC pode mimetizar SHUa no lactente — tratamento metabólico específico. Pearl: MAT neonatal = peça homocisteína.",
    bibliography: "Metabolic HUS; cblC guidelines."
  },
  {
    id: "NP-X052",
    tema: "IRA pediátrica",
    subtema: "Síndrome de lise — indicações de diálise",
    dificuldade: "intermediario",
    age: 8,
    vars: {
      k: 6.9,
      p: 10
    },
    statement: "{{sexWord}} de {{age}} com TLS: K {{k}}, P {{p}}, oligúria e sobrecarga volêmica refratária. Qual conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Diálise/TSR precoce quando hiperK/hiperP/volume/uremia refratários — não atrasar por “esperar rasburicase agir sozinho”"
    },
    correct: "D",
    explanation: "TLS grave com oligúria: TSR é terapia. Pearl: K/P refratários = dialise. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Cairo-Bishop; pediatric oncology supportive care."
  },
  {
    id: "NP-X053",
    tema: "CAKUT / ITU",
    subtema: "Abscesso renal",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com pielonefrite, febre persistente >72 h sob ATB adequado. Qual próximo passo de imagem/conduta?",
    options: {
      A: "US/TC para coleção/abscesso/obstrução; drenagem se abscesso significativo + ATB prolongado",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
    explanation: "Febre persistente em PNA: exclua abscesso/obstrução. Pearl: >72 h febril = imagem. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "AAP UTI; pediatric urology."
  },
  {
    id: "NP-X054",
    tema: "CAKUT / ITU",
    subtema: "Megaureter / desobstrução",
    dificuldade: "intermediario",
    age: 0.3,
    vars: {

    },
    statement: "Lactente de {{age}} com megaureter obstrutivo, ITU febril e queda de função no rim afetado. Qual princípio?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Aliviar obstrução (stent/vesicostomia/cirurgia conforme equipe) + ATB; preservar néfrons",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora."
    },
    correct: "C",
    explanation: "Obstrução + infecção = desobstruir. Pearl: rim dilatando e infectando não espera. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EAU pediatric urology; CAKUT."
  },
  {
    id: "NP-X055",
    tema: "DRC",
    subtema: "Acidose metabólica e crescimento",
    dificuldade: "intermediario",
    age: 7,
    vars: {
      hco3: 16
    },
    statement: "{{sexWord}} de {{age}} com DRC, HCO₃ {{hco3}}, atraso estatural. Qual alvo e tratamento?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Alcalinizar (citrato/bicarbonato) visando HCO₃ no alvo pediátrico — acidose prejudica crescimento e osso"
    },
    correct: "D",
    explanation: "Acidose crônica piora crescimento/MBD; corrigir é básico. Pearl: HCO₃ baixo = cresce menos. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDOQI pediatric nutrition/CKD; IPNA."
  },
  {
    id: "NP-X056",
    tema: "DRC",
    subtema: "Hiperparatireoidismo secundário",
    dificuldade: "intermediario",
    age: 12,
    vars: {
      pth: 680,
      p: 6.8
    },
    statement: "{{sexWord}} de {{age}} em DRC 4 com P {{p}} e PTH {{pth}}. Qual sequência terapêutica faz mais sentido?",
    options: {
      A: "Dieta/quelante de fósforo, vitamina D nativa se deficiente, depois análogos ativos/calcimimético conforme idade/disponibilidade e alvos KDIGO pediátricos",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "CKD-MBD: controle P/Ca antes de forçar vitamina D ativa. Pearl: fósforo primeiro. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDIGO CKD-MBD; pediatric MBD."
  },
  {
    id: "NP-X057",
    tema: "Hipertensão",
    subtema: "Crise hipertensiva pediátrica",
    dificuldade: "avancado",
    age: 9,
    vars: {
      pa: "180/120"
    },
    statement: "{{sexWord}} de {{age}} com PA {{pa}}, cefaleia e papiledema. Qual princípio de redução pressórica?",
    options: {
      A: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão",
      D: "Redução gradual em ambiente monitorado com agentes IV tituláveis; investigar causa secundária"
    },
    correct: "D",
    explanation: "Emergência hipertensiva pediátrica: queda controlada evita isquemia. Pearl: papiledema = UTI e titulação. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "AAP hypertension; pediatric emergency."
  },
  {
    id: "NP-X058",
    tema: "Hipertensão",
    subtema: "Coarctação de aorta",
    dificuldade: "intermediario",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS em membros superiores, pulsos femorais fracos e sopro. Qual diagnóstico e exame?",
    options: {
      A: "Coarctação de aorta — ecocardiograma/angiorressonância e encaminhamento cardiológico",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que.",
      D: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo"
    },
    correct: "A",
    explanation: "Coarctação é causa clássica de HAS pediátrica. Pearl: PA alto no braço + femoral fraco = coarctação. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "AAP HTN; pediatric cardiology."
  },
  {
    id: "NP-X059",
    tema: "Tubulopatias",
    subtema: "Síndrome de Fanconi",
    dificuldade: "intermediario",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com poliúria, acidose, hipofosfatemia, glicosúria com glicemia normal e aminoacidúria. Qual síndrome e investigação?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Fanconi proximal: investigar cistinose e outras causas genéticas/tóxicas; repor bicarbonato/fosfato/K e tratar causa"
    },
    correct: "D",
    explanation: "Fanconi = disfunção proximal generalizada; cistinose é causa #1 em ped. Pearl: glicosúria normoglicêmica = túbulo.",
    bibliography: "Cystinosis guidelines; tubulopathy texts."
  },
  {
    id: "NP-X060",
    tema: "Tubulopatias",
    subtema: "Cistinose — cisteamina",
    dificuldade: "avancado",
    age: 3,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cistinose nefropática confirmada. Qual tratamento específico retarda progressão?",
    options: {
      A: "Cisteamina (e cisteamina oftálmica), além de reposição de perdas do Fanconi e suporte nutricional",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "A",
    explanation: "Cisteamina depletá cistina lisossomal e muda história natural. Pearl: cistinose = cisteamina cedo. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Cystinosis international guidelines."
  },
  {
    id: "NP-X061",
    tema: "Tubulopatias",
    subtema: "Bartter neonatal",
    dificuldade: "avancado",
    age: 0.1,
    vars: {

    },
    statement: "RN com poliúria fetal, prematuridade, hipocalemia, alcalose e hipercalciúria/nefrocalcinose. Qual diagnóstico mais provável?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Síndrome de Bartter neonatal/infantil — repor volume/eletrólitos, AINE/inibidores em protocolos especializados",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "B",
    explanation: "Bartter neonatal: perdas salinas graves + hipercalciúria. Pearl: poliúria fetal + alcalose hipoK = Bartter. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Bartter/Gitelman consensus."
  },
  {
    id: "NP-X062",
    tema: "Nefrolitíase",
    subtema: "Hiperoxalúria primária",
    dificuldade: "avancado",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com nefrocalcinose grave, IRA e oxalato urinário muito alto; irmão afetado. Qual avanço terapêutico específico para PH1?",
    options: {
      A: "Hidratação + piridoxina se responsivo + RNA-terapia (lumasiran) / opções hepato-renais conforme tipo; evitar vitamina C megadose",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "PH1: lumasiran (RNAi) reduziu oxalato; tipagem genética guia. Pearl: oxalato altíssimo na criança = PH até prova em contrário.",
    bibliography: "ILLUMINATE; PH guidelines."
  },
  {
    id: "NP-X063",
    tema: "Nefrolitíase",
    subtema: "Cálculo de estruvita",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculo coraliforme, pH urinário alto e Proteus na cultura. Qual pedra e princípio terapêutico?",
    options: {
      A: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Estruvita (infeccioso): remoção completa do cálculo + ATB direcionado; corrigir anomalias urológicas",
      D: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada"
    },
    correct: "C",
    explanation: "Estruvita exige pedra-livre + tratar urease-bacteria. Pearl: Proteus + coraliforme = estruvita. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "EAU pediatric stones; AUA."
  },
  {
    id: "NP-X064",
    tema: "Lúpus",
    subtema: "Adesão e flare",
    dificuldade: "intermediario",
    age: 16,
    vars: {

    },
    statement: "Adolescente de {{age}} com nefrite lúpica em manutenção (MMF) interrompe medicação e retorna com proteinúria e sedimento ativo. Qual prioridade?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Reavaliar atividade (labs/biópsia se mudou padrão), retomar indução/manutenção conforme gravidade e abordar adesão/saúde mental",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Flare por não adesão é comum no adolescente; retomar terapia e cuidar transição. Pearl: adolescente + LES = fale de adesão.",
    bibliography: "KDIGO LN; adolescent rheumatology."
  },
  {
    id: "NP-X065",
    tema: "Vasculites",
    subtema: "IgA vasculite — corticoide GI",
    dificuldade: "intermediario",
    age: 7,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com púrpura de Henoch-Schönlein e dor abdominal intensa sem intussuscepção cirúrgica. Qual papel do corticoide?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Pode aliviar dor abdominal grave; não previne nefrite de forma confiável — monitorar urina seriadamente"
    },
    correct: "D",
    explanation: "GC pode ajudar o abdômen; vigilância renal continua obrigatória. Pearl: HSP = olho na urina por meses. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "SHARE IgA vasculitis; Cochrane HSP."
  },
  {
    id: "NP-X066",
    tema: "Doenças císticas",
    subtema: "HNF1B",
    dificuldade: "avancado",
    age: 8,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com rins hiperecogênicos/cistos, hipomagnesemia, hiperuricemia e diabetes de início jovem na família. Qual gene pensar?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      D: "HNF1B (RCAD): aconselhar genética, acompanhar rim/Mg/glicemia e anomalias Müllerianas/urogenitais"
    },
    correct: "D",
    explanation: "HNF1B: rim + Mg baixo + MODY5 ± geniturinário. Pearl: cistos + hipoMg + diabetes = HNF1B. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "HNF1B disease reviews; IPNA genetics."
  },
  {
    id: "NP-X067",
    tema: "Alport",
    subtema: "Doadora materna",
    dificuldade: "avancado",
    age: 14,
    vars: {

    },
    statement: "Menino de {{age}} com Alport X-ligado próximo de TSR; mãe portadora assintomática quer doar rim. Qual aconselhamento?",
    options: {
      A: "Mães portadoras COL4A5 têm risco próprio de DRC — doação exige avaliação criteriosa; preferir doador não portador quando possível",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "A",
    explanation: "Portadoras podem evoluir; doar não é automático. Pearl: Alport X — cuide da mãe também. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Alport Workshop; living donor ethics."
  },
  {
    id: "NP-X068",
    tema: "Diálise",
    subtema: "Hiperidratação e hipertensão em HD",
    dificuldade: "intermediario",
    age: 13,
    vars: {

    },
    statement: "Adolescente de {{age}} em HD com ganho interdialítico enorme e HAS. Qual intervenção é mais importante?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Educação de sódio/líquidos, ajustar peso seco e tempo/UF; anti-hipertensivos como adjunto",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado"
    },
    correct: "B",
    explanation: "Volume é o motor da HAS dialítica. Pearl: peso seco primeiro, comprimido depois. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA dialysis; KDOQI BP."
  },
  {
    id: "NP-X069",
    tema: "Diálise",
    subtema: "DP e escolaridade",
    dificuldade: "basico",
    age: 10,
    vars: {

    },
    statement: "Criança de {{age}} inicia TSR. Por que DP domiciliar é frequentemente preferida em pediatria?",
    options: {
      A: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor.",
      D: "Preserva vida escolar/familiar, evita deslocamentos diários à HD e acesso vascular repetido — quando houver suporte domiciliar"
    },
    correct: "D",
    explanation: "DP pediátrica prioriza desenvolvimento e rotina. Pearl: escola conta como desfecho. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA dialysis modality choice."
  },
  {
    id: "NP-X070",
    tema: "Transplante",
    subtema: "Transplante preemptivo",
    dificuldade: "intermediario",
    age: 12,
    vars: {
      tfg: 14
    },
    statement: "{{sexWord}} de {{age}} com DRC TFG {{tfg}}, estável, doador vivo disponível. Qual vantagem do Tx preemptivo?",
    options: {
      A: "Evita diálise e suas complicações; melhor sobrevida do enxerto/paciente em muitas séries — preparar imunologia/urologia a tempo",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
    explanation: "Preemptivo é meta ouro quando possível. Pearl: planeje Tx antes da emergência dialítica. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA transplant; NAPRTCS data."
  },
  {
    id: "NP-X071",
    tema: "Transplante",
    subtema: "BK vírus",
    dificuldade: "avancado",
    age: 11,
    vars: {
      cr: 1.8
    },
    statement: "Criança transplantada de {{age}} com creatinina {{cr}} e carga BK plasmática alta. Qual conduta inicial típica?",
    options: {
      A: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado",
      B: "Reduzir imunossupressão (primeiro passo) ± agentes antivirais/imunomoduladores selecionados; biópsia se disfunção",
      C: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "BK nephropathy: reduza IS primeiro. Pearl: PCR BK alta + Cr sobe = corte imunossupressão. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "AST BK guidelines; pediatric transplant ID."
  },
  {
    id: "NP-X072",
    tema: "Eletrólitos",
    subtema: "Hipocalcemia neonata",
    dificuldade: "intermediario",
    age: 0.02,
    vars: {
      ca: 6.2
    },
    statement: "RN de {{age}} com tetania e Ca iônico baixo (total {{ca}}). Qual conduta aguda?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e.",
      B: "Gluconato de cálcio IV cuidadoso + investigar causa (hipopara, mãe diabética, DiGeorge etc.)",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
    },
    correct: "B",
    explanation: "Hipocalcemia sintomática: Ca IV e etologia. Pearl: tetania neonatal = Ca agora, causa depois. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Neonatal endocrinology/nephrology."
  },
  {
    id: "NP-X073",
    tema: "Eletrólitos",
    subtema: "Hipermagnesemia iatrogênica",
    dificuldade: "intermediario",
    age: 0.01,
    vars: {

    },
    statement: "RN de mãe que recebeu sulfato de magnésio para pré-eclâmpsia nasce hipotônico com apneia. Qual eletrólito e conduta?",
    options: {
      A: "Hipermagnesemia neonatal: suporte ventilatório, cálcio IV se necessário, hidratação; diálise rara/se grave",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "A",
    explanation: "Mg materno atravessa placenta — hipotonia/apneia. Pearl: mãe no MgSO₄ + RN flácido = Mg alto. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Neonatal toxicology; obstetric MgSO4."
  },
  {
    id: "NP-X074",
    tema: "Neonatologia",
    subtema: " indometacina / AINE e IRA",
    dificuldade: "intermediario",
    age: 0.01,
    vars: {

    },
    statement: "Prematuro recebe indometacina para PCA e oligúria com creatinina em ascensão. Qual mecanismo?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "IRA hemodinâmica por inibição de prostaglandinas (aferente); suporte, evitar outros nefrotóxicos, geralmente reversível"
    },
    correct: "D",
    explanation: "AINE/indometacina no RN: queda de TFG hemodinâmica. Pearl: PCA tratada + oligúria = pense AINE. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Neonatal AKI; PDA pharmacology."
  },
  {
    id: "NP-X075",
    tema: "Neonatologia",
    subtema: "Trombose de veia renal neonatal",
    dificuldade: "avancado",
    age: 0.05,
    vars: {

    },
    statement: "RN com massa lombar unilateral, hematúria e trombocitopenia; mãe com diabetes. Qual diagnóstico e abordagem?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Trombose de veia renal: US/Doppler, suporte, anticoagulação selecionada em centro experiente",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "B",
    explanation: "TVR neonatal: massa + hematúria ± mãe diabética. Pearl: triade clássica — não perca o Doppler. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Neonatal RVT reviews; hematology consensus."
  },
  {
    id: "NP-X076",
    tema: "Farmacologia",
    subtema: "IECA no RN",
    dificuldade: "intermediario",
    age: 0.08,
    vars: {

    },
    statement: "RN recebe captopril e desenvolve IRA oligúrica com hipercalemia. Qual lição?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a.",
      C: "RN/prematuros são hipersensíveis a IECA — evitar ou usar com extremo cuidado; suspender e suportar",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "C",
    explanation: "Eixo RAA é crítico no RN — IECA pode causar IRA grave. Pearl: IECA no neonato = perigo. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Neonatal ACEI toxicity; pediatric formulary."
  },
  {
    id: "NP-X077",
    tema: "Farmacologia",
    subtema: "Tacrolimus — toxicidade",
    dificuldade: "intermediario",
    age: 12,
    vars: {
      cr: 1.7
    },
    statement: "Transplantado de {{age}} com tremor, HAS e creatinina {{cr}}; nível de tacrolimus supra-terapêutico. Qual conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Reduzir/ajustar dose, excluir interações (azole, macrolídeo), hidratar e reavaliar; biópsia se não explicar"
    },
    correct: "D",
    explanation: "Toxicidade de CNI é dose/interação-dependente. Pearl: azole + tacrolimus = nivele e corte. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDIGO transplant; drug interactions."
  },
  {
    id: "NP-X078",
    tema: "Genética sindrômica",
    subtema: "Lowe (OCRL)",
    dificuldade: "avancado",
    age: 2,
    vars: {

    },
    statement: "Menino de {{age}} com catarata congênita, hipotonia, Fanconi e DRC progressiva. Qual diagnóstico?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a.",
      D: "Síndrome de Lowe (OCRL) — manejo de tubulopatia + oftalmo/neuro e genética. conduta preferencial neste contexto"
    },
    correct: "D",
    explanation: "Lowe: olho + cérebro + Fanconi no menino. Pearl: catarata + Fanconi = OCRL. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Lowe syndrome reviews; genetics nephrology."
  },
  {
    id: "NP-X079",
    tema: "Genética sindrômica",
    subtema: "Nail-patella",
    dificuldade: "intermediario",
    age: 11,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com unhas displásicas, patelas hipoplásicas e proteinúria. Qual gene e cuidado renal?",
    options: {
      A: "LMX1B (nail-patella): seguimento de proteinúria/DRC e IECA quando indicado. conduta preferencial neste contexto",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na."
    },
    correct: "A",
    explanation: "Nail-patella: LMX1B com nefropatia variável. Pearl: unha + joelho + proteína = LMX1B. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Nail-patella nephropathy reviews."
  },
  {
    id: "NP-X080",
    tema: "Obesidade / metabólico",
    subtema: "Proteinúria ortostática",
    dificuldade: "basico",
    age: 14,
    vars: {

    },
    statement: "Adolescente de {{age}} magro com proteinúria em amostra diurna e urina noturna negativa, função normal. Qual interpretação?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Proteinúria ortostática benigna na maioria — confirmar com split day/night e seguir; investigar se outros achados",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
    explanation: "Ortostática é comum em adolescentes longilíneos. Pearl: noite negativa = ortostática até prova em contrário. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Pediatric proteinuria evaluation; AAP."
  },
  {
    id: "NP-X081",
    tema: "Infecção e rim",
    subtema: "COVID e SN",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN em remissão sob MMF pergunta sobre vacina COVID inativada/mRNA. Conduta geral?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a.",
      C: "Vacinas inativadas/mRNA são geralmente recomendadas; vivas continuam restritas sob IS",
      D: "Suspender MMF 3 meses obrigatoriamente antes de qualquer vacina inativada. estratégia que não aborda o."
    },
    correct: "C",
    explanation: "Imunossuprimidos devem receber vacinas inativadas/mRNA indicadas; evitar vivas. Pearl: proteja a criança e a casa.",
    bibliography: "SBP/IPNA immunization; COVID vaccine guidance."
  },
  {
    id: "NP-X082",
    tema: "ITU",
    subtema: "Amostra urinária no lactente",
    dificuldade: "basico",
    age: 0.5,
    vars: {

    },
    statement: "Lactente de {{age}} febril; saco coletor com leucócitos. Qual é a melhor prática para diagnóstico de ITU?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Confirmar com método fiável (cateterismo/punção) antes de fechar diagnóstico/ATB prolongado, salvo sepse",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "C",
    explanation: "Saco coletor tem falso positivo alto. Pearl: febril + saco+ = confirme com cateter/punção. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "AAP UTI 2011/reaffirm; SBP."
  },
  {
    id: "NP-X083",
    tema: "DRC",
    subtema: "Vacinas pré-Tx",
    dificuldade: "intermediario",
    age: 9,
    vars: {

    },
    statement: "Criança de {{age}} com DRC avançada em avaliação para transplante renal. Qual princípio vacinal é o mais adequado neste momento?",
    options: {
      A: "Atualizar calendário antes do Tx (incluindo vivas quando ainda possível/seguro); pós-Tx evitar vivas",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "Janela pré-Tx é ouro para imunizar. Pearl: vacine antes de imunossuprimir. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA/AST immunization transplant."
  },
  {
    id: "NP-X084",
    tema: "Ética / social",
    subtema: "Não adesão adolescente",
    dificuldade: "intermediario",
    age: 17,
    vars: {

    },
    statement: "Adolescente transplantado de {{age}} com rejeição celular e níveis zerados de tacrolimus admite não adesão. Além de tratar rejeição, o que é essencial?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Abordagem multidisciplinar (psicologia, simplificar esquema, transição estruturada, rede familiar) para prevenir nova perda do enxerto",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "Não adesão é a causa #1 de perda tardia no jovem — trate o sistema, não só a biópsia. Pearl: rejeição + nível zero = adesão.",
    bibliography: "Adolescent transplant adherence; Got Transition."
  },
  {
    id: "NP-X085",
    tema: "Nutrição",
    subtema: "Sal e HAS na DRC",
    dificuldade: "basico",
    age: 10,
    vars: {

    },
    statement: "Criança de {{age}} com DRC e HAS. Qual orientação dietética tem impacto pressórico claro?",
    options: {
      A: "Restrição de sódio adequada à idade + IECA/BRA conforme indicação; educar a família",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas."
    },
    correct: "A",
    explanation: "Sódio impulsiona HAS na DRC pediátrica. Pearl: menos sal, menos comprimido. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "KDOQI nutrition; AAP HTN."
  },
  {
    id: "NP-X086",
    tema: "Síndrome nefrótica",
    subtema: "Levamisole",
    dificuldade: "intermediario",
    age: 6,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN corticodependente frequente em país/contexto com levamisole disponível. Qual papel e monitoramento?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Poupador de corticoide em SDNS/FRNS selecionados; monitorar neutropenia/ANCA e hepatotoxicidade",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
    explanation: "Levamisole ainda é opção poupadora em muitos centros; exige hemograma. Pearl: levamisole = conte neutrófilos. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "IPNA SSNS; levamisole trials."
  },
  {
    id: "NP-X087",
    tema: "Glomerulopatia",
    subtema: "Membranosa pediátrica",
    dificuldade: "avancado",
    age: 12,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com SN, biópsia membranosa. Além de PLA2R, o que investigar em pediatria?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Causas secundárias (lúpus, hep B/C, fármacos, malignidade rara) e anticorpos (PLA2R/THSD7A/extensões); tratar causa + antiproteinúrico/IS conforme gravidade"
    },
    correct: "D",
    explanation: "Membranosa pediátrica é mais secundária que no adulto. Pearl: membranosa na criança = caçe causa. Distratores atrasam terapia eficaz, ignoram o mecanismo principal ou aplicam conduta sem suporte de diretriz. Pearl: una vinheta, exame e guia antes de marcar.",
    bibliography: "Pediatric membranous reviews; KDIGO GN."
  },
  {
    id: "NP-X088",
    tema: "IRA pediátrica",
    subtema: "Síndrome cardiorrenal",
    dificuldade: "avancado",
    age: 4,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cardiopatia congestiva, creatinina em ascensão e congestão refratária a diurético. Qual opção de suporte renal pode ajudar?",
    options: {
      A: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Otimizar débito cardíaco/congestão; BRT/UF ou diálise peritoneal em falência diurética — decisão cardio-nefro",
      D: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos"
    },
    correct: "C",
    explanation: "Cardiorrenal pediátrico: trate congestão e perfusão; TSR como suporte. Pearl: coração falhando + rim subindo = time conjunto.",
    bibliography: "Pediatric cardiorenal reviews; ICU nephrology."
  },
  {
    id: "NP-X089",
    tema: "DRC",
    subtema: "Puberdade e adesão",
    dificuldade: "basico",
    age: 15,
    vars: {

    },
    statement: "Adolescente de {{age}} em DRC pergunta por que o seguimento ficou mais frequente. Qual mensagem é correta?",
    options: {
      A: "Crescimento, sexualidade, adesão e preparação para transição aumentam risco e demanda de cuidado estruturado",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
    explanation: "Adolescência é janela de risco (adesão/crescimento/transição). Pearl: adolescente não é adulto pequeno nem criança grande.",
    bibliography: "IPNA transition; adolescent nephrology."
  },
  {
    id: "NP-X090",
    tema: "SHU / MAT",
    subtema: "Recorrência pós-Tx na SHUa",
    dificuldade: "avancado",
    age: 10,
    vars: {

    },
    statement: "Criança de {{age}} com SHUa por mutação em CFH será transplantada. Qual estratégia reduz recorrência no enxerto?",
    options: {
      A: "Profilaxia/tratamento com inibidor de C5 no peri-Tx conforme genética/risco, além de imunologia padrão",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "A",
    explanation: "Mutações de fatores circulantes (CFH) recidivam alto — C5i mudou o Tx. Pearl: CFH + Tx = planeje eculizumab/ravulizumab.",
    bibliography: "KDIGO aHUS transplant; IPNA."
  }
];

module.exports = { PED_MASTERS_EXTRA2 };
