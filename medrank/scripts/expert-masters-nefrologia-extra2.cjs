/**
 * Casos-mestres — Nefrologia adulta (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
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
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "MGRS: o clone pequeno causa lesão renal — tratar o clone com base na lesão histológica (em conjunto com hematologia), não só pelos critérios de mieloma",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Tipar amiloide (imuno-histoquímica/espectrometria), staging cardíaco e terapia clonodirigida urgente com hematologia; suporte edemigênico",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação"
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
      A: "Tratar como MGRS/PGNMID: terapia clonodirigida (ex. regimes baseados em bortezomibe/rituximabe conforme clone) + suporte antiproteinúrico, em centro experiente",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Glomerulonefrite fibrilar (DNAJB9+): avaliar clone/associações e tratar conforme gravidade (imunossupressão/clonodirigido quando indicado)",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "D",
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
      A: "Antivirais de ação direta para HCV + imunossupressão/rituximabe se doença organo-ameaçadora; plasmaférese em crises graves selecionadas",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "A",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Suspender AINE, iniciar corticoide (ou alternativa se contraindicação), investigar causas secundárias (linfoma, fármacos) e tromboprofilaxia se risco alto",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "D",
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
      A: "IECA em dose agressiva (captopril clássico) mesmo com creatinina em ascensão, suporte de MAT/HAS maligna; dialisar se preciso mantendo IECA",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Controle gradual da PA em ambiente monitorado, investigar TMA secundária vs primária, suporte renal; evitar queda abrupta que cause isquemia",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão",
      E: "Anticoagulação adequada + controle rigoroso da PA; imunossupressão se LES/atividade imune coexistente"
    },
    correct: "E",
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
      A: "Glicocorticoides (indução) com redução gradual; avaliar imunossupressor poupador se recidiva; excluir malignidade/infecção",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "A",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Produção extrarrenal de 1,25(OH)₂D por macrófagos: hidratação, corticoide (trata sarcoide e hiperCa), evitar sol/vit D excessiva"
    },
    correct: "E",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Síndrome TINU: corticoides sistêmicos (e oftalmológicos conforme olho), suporte renal e exclusão de fármacos/infecção",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
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
      A: "NTA/toxicidade tubular por cisplatina (com hipomagnesemia): hidratação vigorosa peri-quimio, evitar dose empilhada/nefrotóxicos; repor Mg",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "A",
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
      A: "Alcalinização urinária + leucovorin; glucarpidase se níveis tóxicos com LRA; hidratação; evitar ácidos orgânicos que desloquem MTX",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "A",
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
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Oxalúria entérica: hidratação, cálcio dietético nas refeições, reduzir gordura/oxalato, tratar esteatorreia; dialisar se necessário; evitar vitamina C megadose",
      C: "Acidificar a urina e restringir água para “concentrar” o tratamento litolítico, com AINE contínuo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor.",
      D: "Hidratação isotônica agressiva precoce, monitorar K/Ca/P, alcalinização controversa/selecionada; diálise se indicações clássicas",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "D",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência.",
      B: "IRA por síndrome compartimental abdominal: otimizar volume/ventilação, descomprimir (clínicocirúrgico) quando indicado, evitar fluidos excessivos",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência."
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
      A: "Hidratação isotônica peri-procedimento, usar menor volume de contraste possível, suspender nefrotóxicos evitáveis; NAC sem benefício consistente",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor."
    },
    correct: "A",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "CSW: volume deplecionado (PVC baixa, hemoconcentração) → repor volume/Na; SIADH: euvolêmico → restrição hídrica ou vaptano/salina hipertônica conforme gravidade",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Limitar correção tipicamente a ~8–10 mEq/L/24 h (menos se alto risco de ODS), com monitoramento seriado",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
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
      A: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Confirmar hiperaldosteronismo (teste de confirmação se preciso), mapear (TC/cateterismo adrenal) e tratar com espironolactona/eplerenona ou adrenalectomia se adenoma unilateral",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
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
      A: "Tratamento clínico otimizado é padrão na maioria; revascularizar em cenários selecionados (edema flash, IRA com IECA em estenose bilateral, HAS refratária verdadeira)",
      B: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "ADTKD (ex. UMOD/MUC1/REN): aconselhamento genético, controle de PA/ácido úrico, evitar biópsias inúteis repetidas",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Rim medular em esponja: hidratação, tratar hipercalciúria/ITU, seguimento; geralmente TFG preservada",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a."
    },
    correct: "C",
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
      A: "Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Alcalinização urinária (citrato/bicarbonato) + hidratação + alopurinol se hiperuricosúria/gota; perda de peso",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "D",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Hungry bone: repor cálcio (IV se sintomático) + calcitriol/análogos e fósforo conforme labs; monitorização intensiva",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "D",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Podem elevar Hb via estabilização de HIF; uso conforme aprovação local, com vigilância de risco CV/trombose e ferro",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      D: "Aumento de FGF23 → fosfatúria e queda de 1,25(OH)₂D com certos ferros IV (mais com FCM)",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou."
    },
    correct: "D",
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
      A: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Esclerose peritoneal encapsulante: suspender DP frequentemente, nutrição, tamoxifeno/cirurgia em centros experientes conforme gravidade",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "D",
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
      A: "Síndrome do desequilíbrio: reduzir eficiência/tempo da primeira sessão, dialisato adequado, considerar manitol em alto risco",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "A",
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
      A: "Síndrome de roubo (steal): avaliação vascular; revisão cirúrgica/ banding/DRIL conforme gravidade; não ignorar risco de isquemia",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "A",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Antibiótico IV adequado + remoção do cateter na maioria das bacteremias por S. aureus; avaliar endocardite/metástases sépticas",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "D",
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
      A: "Recorrência de FSGS: plasmaférese precoce ± rituximabe/outros em centros experientes; biópsia para excluir outros",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina",
      E: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido"
    },
    correct: "A",
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
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Bloqueio de coestimulação (CTLA4-Ig): evita CNI, mas contraindicado em EBV-seronegativos pelo risco de PTLD; vigilância de rejeição",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor evidência para.",
      D: "Discutir testagem APOL1 em populações de risco: alto risco genético pode aumentar chance futura de DRC no doador — decisão compartilhada",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "D",
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
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Parto é terapia da pré-eclâmpsia/HELLP; se TMA persiste após parto ou ADAMTS13 <10%, tratar como PTT/aHUS (PLEX/C5i)",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência.",
      D: "Risco aumentado de progressão da DRC, pré-eclâmpsia e prematuridade; otimizar PA/proteinúria, suspender teratogênicos (IECA/MRA/SGLT2), seguimento alto risco",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "D",
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
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Tratar como anti-MBG grave: plasmaférese + imunossupressão (CYC/RTX) + corticoide; ANCA influencia risco de recidiva a longo prazo",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "C",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      D: "Indução agressiva (metilprednisolona + RTX/CYC) e considerar plasmaférese em hemorragia alveolar grave conforme protocolos locais/ensaios",
      E: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
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
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Medidas para K (dieta, diurético, resinas/patiromer/SZC se preciso), ajustar doses e tentar manter terapia antiproteinúrica"
    },
    correct: "E",
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
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Fibrose nefrogênica sistêmica com agentes grupo I; preferir agentes de baixo risco, dose mínima ou alternativas de imagem"
    },
    correct: "E",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Doença renal cística adquirida eleva risco de carcinoma de células renais — investigar hematúria/massa com imagem e urologia",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica"
    },
    correct: "C",
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
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade.",
      C: "Inibidor mTOR (everolimus) conforme critérios; embolização/cirurgia se sangramento",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício.",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir."
    },
    correct: "C",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      B: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana",
      C: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      D: "Leptospirose: IRA + perda urinária de K/Mg frequente; antibiótico + suporte/diálise se preciso",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "D",
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
      A: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Hemólise intravascular grave (blackwater fever/malária grave): antimalárico urgente + suporte de IRA/diálise; hidratação criteriosa",
      C: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica Esta abordagem atrasa a terapia com melhor.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
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
      A: "HD está indicada em intoxicação grave (alteração neurológica, falência renal, níveis muito altos, falha de alcalinização) — remove salicilato e corrige acidose",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
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
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      C: "Fomepizol (ou etanol) + folínico/folato + hemodiálise em casos graves/ácidos/visuais",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que."
    },
    correct: "C",
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
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor.",
      D: "Corrigir riscos modificáveis (PA, coagulopatia/plaquetas) e pesar rim único — considerar alternativas/centro experiente; biópsia não é “sempre já”",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "D",
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
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      E: "Iniciar diálise intensificada (pericardite urêmica é indicação); evitar anticoagulação agressiva se derrame"
    },
    correct: "E",
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
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      C: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para.",
      D: "Pode reduzir eventos renais, mas aumenta infecções graves — usar esquemas cuidadosos, profilaxia infecciosa e seleção de pacientes",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "D",
    explanation: "TESTING: benefício renal vs infecção — dose/profilaxia importam. Pearl: IgAN + corticoide = profilaxia e seleção.",
    bibliography: "TESTING trial; KDIGO IgAN 2025 updates / sparsentan era."
  }
];

module.exports = { ADV_MASTERS_EXTRA2 };
