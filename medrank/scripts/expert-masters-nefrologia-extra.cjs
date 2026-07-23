/**
 * Casos-mestres — Nefrologia adulta (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const ADV_MASTERS_EXTRA = [
  {
    id: "NA-X001",
    tema: "Mieloma",
    subtema: "Cast nephropathy",
    dificuldade: "avancado",
    age: 68,
    vars: {
      cr: 5.8,
      ca: 11.2
    },
    statement: "{{sexWord}} de {{age}} com lombalgia, anemia, creatinina {{cr}} mg/dL, cálcio {{ca}} mg/dL, gap aniônico urinário elevado e proteinúria de dipstick fraca com proteinúria de 24 h 2,8 g (discrepância). Eletroforese com pico monoclonal IgG kappa. Qual é o diagnóstico renal mais provável e a melhor conduta imediata?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      E: "Nefropatia do cilindro (cast nephropathy) por cadeia leve: hidratação vigorosa, tratar hipercalcemia, evitar contraste/AINE/IECA na fase aguda de LRA, biópsia se dúvida, e tratamento…"
    },
    correct: "E",
    explanation: "Discrepância dipstick vs proteinúria de 24 h + pico monoclonal + LRA sugere cast nephropathy. Prioridade: volume, correção da hipercalcemia e terapia antimieloma rápida. A não explica pico monoclonal. C/D exigem sedimento/imunologia típicos. Pearl: dipstick fraco + proteinúria medida = pense cadeia leve. Gabarito detalhado: Nefropatia do cilindro (cast nephropathy) por cadeia leve: hidratação vigorosa, tratar hipercalcemia, evitar contraste/AINE/IECA na fase aguda de LRA, biópsia se dúvida, e tratamento hematológico urgente (bortezomibe ± dexametasona) com avaliação de plasmaférese em casos selecionados de LRA grave por cast",
    bibliography: "IMWG myeloma kidney; KDIGO AKI; UpToDate cast nephropathy."
  },
  {
    id: "NA-X002",
    tema: "Onconefrologia",
    subtema: "Síndrome de lise tumoral",
    dificuldade: "avancado",
    age: 45,
    vars: {
      k: 6.1,
      p: 8.4,
      ua: 14
    },
    statement: "{{sexWord}} de {{age}} com LLA de alta carga inicia quimioterapia. Em 24 h: K {{k}}, fósforo {{p}}, ácido úrico {{ua}}, LDH em rampa e creatinina em elevação. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Síndrome de lise tumoral: hidratação isotônica agressiva, rasburicase (se disponível) ou alopurinol, monitorização eletrolítica intensiva, tratar hipercalemia/hiperfosfatemia, e preparar…"
    },
    correct: "E",
    explanation: "Cairo-Bishop: hiperuricemia + hiperfosfatemia + hipercalemia + LRA. Volume + redução do ácido úrico são pilares. Rasburicase é preferível em alto risco. Pearl: com rasburicase, alcalinizar urina não é rotina. Gabarito detalhado: Síndrome de lise tumoral: hidratação isotônica agressiva, rasburicase (se disponível) ou alopurinol, monitorização eletrolítica intensiva, tratar hipercalemia/hiperfosfatemia, e preparar TSR precoce se LRA oligúrica ou sobrecarga — evitar alcalinização urinária rotineira com rasburicase",
    bibliography: "Cairo-Bishop criteria; ASCO TLS guidelines."
  },
  {
    id: "NA-X003",
    tema: "Onconefrologia",
    subtema: "Inibidor de checkpoint",
    dificuldade: "avancado",
    age: 58,
    vars: {
      cr: 2.9
    },
    statement: "{{sexWord}} de {{age}} em pembrolizumabe por melanoma apresenta creatinina {{cr}} (basal 0,9), piúria estéril e eosinofilúria discreta, sem rash. Qual é a hipótese e conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Nefrite intersticial aguda imune-mediada por ICI: suspender o checkpoint, avaliar biópsia se dúvida, iniciar corticoide sistêmico (ex. prednisona 0,5–1 mg/kg) e discutir rechallenge só…",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "ICI-AIN é a lesão renal mais comum desses fármacos. Corticoide precoce melhora recuperação. Pearl: piúria estéril + LRA em ICI = pense AIN até prova em contrário.",
    bibliography: "ASCO/NCCN irAE; KDIGO AKI notes on ICI."
  },
  {
    id: "NA-X004",
    tema: "Hepatorrenal",
    subtema: "Síndrome hepatorrenal tipo 1",
    dificuldade: "avancado",
    age: 54,
    vars: {
      cr: 2.8
    },
    statement: "{{sexWord}} de {{age}} com cirrose Child C, ascite tensa, creatinina sobe para {{cr}} em 48 h. Sem choque, sem nefrotóxicos, US sem hidronefrose. Após 48 h de albumina 1 g/kg/dia e retirada de diuréticos, sem melhora. Qual é a melhor conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Síndrome hepatorrenal (AKI-HRS): vasoconstritor esplâncnico (terlipressina preferencial quando disponível, ou noradrenalina em UTI) + albumina; avaliar Tx hepático",
      C: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Após exclusão de outras causas e prova de albumina, AKI-HRS exige vasoconstritor + albumina. Terlipressina tem evidência mais forte. Pearl: diurético e AINE pioram HRS.",
    bibliography: "ICA-AKI 2015/2021; CONFIRM trial (terlipressina)."
  },
  {
    id: "NA-X005",
    tema: "Cardio-renal",
    subtema: "CRS tipo 1 congestivo",
    dificuldade: "intermediario",
    age: 72,
    vars: {
      cr: 2.1
    },
    statement: "{{sexWord}} de {{age}} com IC FE reduzida, edema ++, estertores, PVC elevada, creatinina {{cr}} sob diurético de alça. Qual a melhor estratégia renal/cardíaca inicial?",
    options: {
      A: "Síndrome cardiorrenal congestiva: descongestão guiada (diurético de alça IV ± tiazídico sequencial), avaliar VExUS/PVC, manter IECA/ARNI/SGLT2 se hemodinâmica permitir, evitar AINE",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Na CRS congestiva, o rim melhora com descongestão, não com volume cego. Dopamina renal não tem benefício comprovado. Pearl: congestão venosa renal é tão nociva quanto hipoperfusão. Gabarito detalhado: Síndrome cardiorrenal congestiva: descongestão guiada (diurético de alça IV ± tiazídico sequencial), avaliar VExUS/PVC, manter IECA/ARNI/SGLT2 se hemodinâmica permitir, evitar AINE; ultrafiltração se falha diurética refratária",
    bibliography: "AHA cardiorenal; ESC HF; KDIGO AKI."
  },
  {
    id: "NA-X006",
    tema: "Distúrbios",
    subtema: "Hiponatremia SIADH",
    dificuldade: "intermediario",
    age: 66,
    vars: {
      na: 118,
      osm: 250
    },
    statement: "{{sexWord}} de {{age}} com pneumonia, Na {{na}} mEq/L, osmolaridade plasmática {{osm}}, urina concentrada (UOsm 520), sódio urinário 55, euvolemia clínica, TSH e cortisol normais. Qual é a melhor conduta inicial?",
    options: {
      A: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "SIADH: restrição hídrica, tratar causa (pneumonia); se sintomático grave (convulsão/coma) usar SF 3% em bolus controlado (meta correção ≤8–10 mEq/L/24 h)",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Critérios de SIADH + euvolemia. SF 0,9% pode piorar. Correção excessiva → mielinólise. Pearl: sintomas neurológicos ditam uso de salina hipertônica.",
    bibliography: "European Hyponatraemia 2014; American Expert Panel."
  },
  {
    id: "NA-X007",
    tema: "Distúrbios",
    subtema: "Hipernatremia hipovolêmica",
    dificuldade: "intermediario",
    age: 81,
    vars: {
      na: 158
    },
    statement: "Idoso(a) de {{age}} em ILPI com febre, diarreia e Na {{na}}, mucosas secas, hipotensão postural. Qual a sequência correta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "Primeiro restaurar volemia com SF 0,9% até estabilidade hemodinâmica; depois corrigir água livre (D5W ou água enteral) com meta de queda de Na ≈8–10 mEq/L/24 h"
    },
    correct: "E",
    explanation: "Hipovolêmico: volume primeiro, depois água livre. Correção lenta evita edema cerebral. Pearl: “ABC antes do Na”.",
    bibliography: "Adrogué-Madias hyponatremia/hypernatremia NEJM."
  },
  {
    id: "NA-X008",
    tema: "Distúrbios",
    subtema: "Hipocalemia com hipertensão",
    dificuldade: "avancado",
    age: 42,
    vars: {
      k: 2.7
    },
    statement: "{{sexWord}} de {{age}} com HAS resistente, K {{k}} espontâneo, alcalose metabólica, aldosterona alta e renina baixa (ARR elevado). Qual o próximo passo?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Hiperaldosteronismo primário: confirmar ARR (idealmente com K corrigido), teste confirmatório quando indicado, TC de adrenais e/ou cateterismo de veias adrenais",
      C: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "ARR alto + HAS + hipocalemia = rastrear aldosteronismo primário. Pearl: não tratar só o K — tratar a causa. Gabarito detalhado: Hiperaldosteronismo primário: confirmar ARR (idealmente com K corrigido), teste confirmatório quando indicado, TC de adrenais e/ou cateterismo de veias adrenais; tratamento com espironolactona/eplerenona ou adrenalectomia se adenoma unilateral",
    bibliography: "Endocrine Society PA guideline 2016/updates."
  },
  {
    id: "NA-X009",
    tema: "Distúrbios",
    subtema: "ATR distal",
    dificuldade: "avancado",
    age: 35,
    vars: {
      hco3: 14,
      k: 3
    },
    statement: "{{sexWord}} de {{age}} com fadiga, HCO₃ {{hco3}}, gap aniônico normal, K {{k}}, pH urinário 6,8 apesar de acidemia, e nefrocalcinose. Qual o diagnóstico e tratamento?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "ATR distal (tipo I): incapacidade de acidificar urina; tratar com álcali (bicarbonato ou citrato de potássio), corrigir K, investigar causas (Sjögren, lupus, drugs) e acompanhar…",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Acidose hiperclorêmica + urina inapropriadamente alcalina + hipocalemia = ATR I. Tipo IV tem hipercalemia. Pearl: pH urinário alto na acidemia aponta distal.",
    bibliography: "KDIGO acid-base reviews; Palmer BF RTA."
  },
  {
    id: "NA-X010",
    tema: "Distúrbios",
    subtema: "ATR tipo IV",
    dificuldade: "intermediario",
    age: 70,
    vars: {
      k: 5.9,
      hco3: 18
    },
    statement: "Diabético(a) de {{age}} em IECA + espironolactona, K {{k}}, HCO₃ {{hco3}}, gap normal, TFG 45. Qual a interpretação e conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Hiporreninemia/hipoaldosteronismo (ATR IV): revisar IECA/BRA/espironolactona/trimetoprim, restrição de K dietético, considerar fludrocortisona em casos selecionados e bicarbonato se…",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "ATR IV é comum no diabético com DRC e fármacos que bloqueiam o eixo RAA. Pearl: hipercalemia + acidose leve = pense tipo IV.",
    bibliography: "KDIGO CKD; reviews hipoaldosteronismo."
  },
  {
    id: "NA-X011",
    tema: "Vasculite ANCA",
    subtema: "Indução GPA",
    dificuldade: "avancado",
    age: 55,
    vars: {
      cr: 3.4
    },
    statement: "{{sexWord}} de {{age}} com sinusite crônica, nódulos pulmonares, hematúria dismórfica, creatinina {{cr}}, PR3-ANCA positivo. Biópsia com crescentes pauci-imunes. Qual indução atual?",
    options: {
      A: "Indução com rituximabe (ou ciclofosfamida) + glicocorticoide; considerar avacopan para poupar esteroide",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese."
    },
    correct: "A",
    explanation: "RAVE mostrou rituximabe não inferior à ciclofosfamida. Avacopan (ADVOCATE) reduz exposição a esteroides. PEXIVAS limitou PLEX de rotina. Pearl: pauci-imune + ANCA = indução imunossupressora imediata. Gabarito detalhado: Indução com rituximabe (ou ciclofosfamida) + glicocorticoide; considerar avacopan para poupar esteroide; plasmaférese em indicações selecionadas (hemorragia alveolar grave / anti-GBM sobreposto), conforme evidências recentes",
    bibliography: "KDIGO Glomerular 2021; RAVE; PEXIVAS; ADVOCATE."
  },
  {
    id: "NA-X012",
    tema: "Anti-MBG",
    subtema: "Doença de Goodpasture",
    dificuldade: "avancado",
    age: 28,
    vars: {
      cr: 6.2
    },
    statement: "Jovem de {{age}} com hemoptise, infiltrados alveolares, creatinina {{cr}}, anti-MBG positivo e crescentes lineares IgG na biópsia. Qual o esquema?",
    options: {
      A: "Plasmaférese diária + ciclofosfamida + corticoide em altas doses; início urgente; prognóstico renal pior se anúria/creatinina muito alta ao diagnóstico",
      B: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Iniciar betabloqueador não seletivo para controle da taquicardia da crise, sem broncodilatação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Anti-MBG exige PLEX + imunossupressão imediata. Pearl: tempo é rim e pulmão. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDIGO Glomerular Diseases 2021."
  },
  {
    id: "NA-X013",
    tema: "Nefropatia por IgA",
    subtema: "Sparsentan / SGLT2",
    dificuldade: "avancado",
    age: 34,
    vars: {
      upcr: 1.8,
      tfg: 62
    },
    statement: "{{sexWord}} de {{age}} com IgA confirmada, UPCR {{upcr}} g/g apesar de IECA otimizado 3 meses, TFG {{tfg}}, PA controlada. Qual alternativa está alinhada às evidências recentes?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      E: "Manter IECA/BRA maximizado, adicionar SGLT2i (DAPA-CKD/EMPA-KIDNEY aplicáveis a proteinúria), considerar sparsentan (PROTECT) ou budesonida alvo-intestinal (Nefecon/NefIgArd) em…"
    },
    correct: "E",
    explanation: "Era atual da IgA: nefroproteção + SGLT2 ± terapias alvo (sparsentan/Nefecon). Esteroides sistêmicos de rotina caíram (TESTING). Pearl: proteinúria residual após IECA = intensificar. Gabarito detalhado: Manter IECA/BRA maximizado, adicionar SGLT2i (DAPA-CKD/EMPA-KIDNEY aplicáveis a proteinúria), considerar sparsentan (PROTECT) ou budesonida alvo-intestinal (Nefecon/NefIgArd) em elegíveis, e imunossupressão sistêmica só em casos selecionados de alto risco",
    bibliography: "KDIGO IgA 2021/updates; PROTECT; NefIgArd; DAPA-CKD."
  },
  {
    id: "NA-X014",
    tema: "Membranosa",
    subtema: "Anti-PLA2R guiado",
    dificuldade: "avancado",
    age: 52,
    vars: {
      prot: 8.5
    },
    statement: "{{sexWord}} de {{age}} com SN, anti-PLA2R alto, proteinúria {{prot}} g/dia, TFG preservada, rastreio de neoplasia negativo. Qual a melhor estratégia?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Membranosa primária PLA2R+: suporte (IECA/BRA, diurético, estatina, anticoagulação se risco) e imunossupressão (rituximabe preferencial; MENTOR) se não remissão ou alto risco",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "PLA2R alto pode diagnosticar sem biópsia em cenários selecionados (KDIGO). Rituximabe é primeira linha em muitos centros. Pearl: título PLA2R cai antes da proteinúria.",
    bibliography: "KDIGO GN 2021; MENTOR trial."
  },
  {
    id: "NA-X015",
    tema: "FSGS",
    subtema: "APOL1 / colapsante",
    dificuldade: "avancado",
    age: 38,
    vars: {
      prot: 9
    },
    statement: "{{sexWord}} negro(a) de {{age}} com SN grave ({{prot}} g/dia), HIV negativo, biópsia com FSGS colapsante. Qual conduta priorizar?",
    options: {
      A: "Investigar causas secundárias (infecção, drogas, APOL1), nefroproteção máxima (IECA/BRA + SGLT2), imunossupressão se primária genética-negativa/idiopática selecionada",
      B: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "FSGS colapsante exige caça a secundárias. APOL1 é fator de risco importante. Pearl: colapsante ≠ lesão mínima. Gabarito detalhado: Investigar causas secundárias (infecção, drogas, APOL1), nefroproteção máxima (IECA/BRA + SGLT2), imunossupressão se primária genética-negativa/idiopática selecionada; discutir ensaios APOL1-alvo quando disponível",
    bibliography: "KDIGO GN; APOL1 literature."
  },
  {
    id: "NA-X016",
    tema: "Nefrite lúpica",
    subtema: "Classe III/IV indução",
    dificuldade: "avancado",
    age: 27,
    vars: {
      prot: 4.2,
      cr: 1.6
    },
    statement: "Mulher de {{age}} com LES, proteinúria {{prot}}, creatinina {{cr}}, biópsia classe IV. Qual indução preferencial hoje?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indução com MMF (ou ciclofosfamida Euro-Lupus) + glicocorticoide; belimumabe (BLISS-LN) ou voclosporina (AURORA) como add-on em elegíveis; manter HCQ; IECA/BRA e controle de PA",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "MMF e Euro-Lupus CYC são padrões; belimumabe/voclosporina melhoram resposta em estudos. Pearl: HCQ permanece base do LES.",
    bibliography: "KDIGO Lupus Nephritis 2024; EULAR/KDIGO; BLISS-LN; AURORA."
  },
  {
    id: "NA-X017",
    tema: "Transplante renal",
    subtema: "Rejeição humoral",
    dificuldade: "avancado",
    age: 48,
    vars: {

    },
    statement: "Receptor de Tx renal há 2 anos com creatinina em elevação, DSA de novo anti-HLA classe II, biópsia com C4d+ e glomerulite. Qual a linha terapêutica?",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Rejeição mediada por anticorpo: otimizar imunossupressão basal, plasmaférese ± IVIG, considerar anti-CD20/outras estratégias conforme centro; tratar infecções oportunistas concomitantes",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "AMR ativa exige remoção de anticorpo + imunomodulação. Pearl: DSA de novo + C4d = pensar AMR. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "Banff classification; AST AMR guidance."
  },
  {
    id: "NA-X018",
    tema: "Transplante renal",
    subtema: "BK vírus",
    dificuldade: "intermediario",
    age: 50,
    vars: {

    },
    statement: "Receptor há 5 meses com creatinina lenta em alta e viremia BK >10.000 cópias/mL confirmada. Qual a conduta principal?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Reduzir imunossupressão (primeiro passo), monitorar viremia e função; antivirais específicos têm evidência limitada; biópsia se não distinguir de rejeição",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "BK nephropathy: reduzir imunossupressão é a base. Pearl: tratar BK ≠ tratar rejeição — o equilíbrio é o desafio.",
    bibliography: "AST BK guidelines."
  },
  {
    id: "NA-X019",
    tema: "Hemodiálise",
    subtema: "Peritonite em DP — diferencial",
    dificuldade: "intermediario",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP apresenta efluente turvo, dor abdominal e 180 células/µL com 80% PMN. Qual a conduta ISPD?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      B: "Coletar cultura do efluente e iniciar antibiótico empírico intraperitoneal cobrindo Gram+ e Gram− imediatamente; ajustar por cultura; avaliar remoção de cateter se refratária/fungica",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "ISPD: tratar peritonite sem atrasar. Pearl: efluente turvo = peritonite até prova em contrário. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "ISPD Peritonitis 2022."
  },
  {
    id: "NA-X020",
    tema: "Hemodiálise",
    subtema: "Infecção de cateter",
    dificuldade: "intermediario",
    age: 59,
    vars: {

    },
    statement: "Paciente em HD por cateter tunelizado com febre no início da sessão e hemoculturas com S. aureus. Qual a melhor conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Antibiótico IV adequado + fortemente considerar remoção do cateter em S. aureus; lock antibiotic se salvamento tentado em germes selecionados; avaliar endocardite se indicado",
      D: "Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "CRBSI por S. aureus tem alta morbimortalidade — remoção é frequentemente necessária. Pearl: febre “só na sessão” = pense cateter.",
    bibliography: "KDOQI Vascular Access; IDSA CRBSI."
  },
  {
    id: "NA-X021",
    tema: "Acesso vascular",
    subtema: "Fístula preferencial",
    dificuldade: "basico",
    age: 55,
    vars: {
      tfg: 18
    },
    statement: "{{sexWord}} de {{age}} com DRC 5 (TFG {{tfg}}), previsto início de HD em 3–6 meses. Qual acesso preferível a longo prazo?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Fístula arteriovenosa nativa (quando anatomia permite), com planejamento precoce; enxerto se FAV inviável; cateter como ponte",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "D",
    explanation: "KDOQI: FAV primeiro quando possível. Pearl: planejar acesso antes da urgência. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDOQI Vascular Access 2019."
  },
  {
    id: "NA-X022",
    tema: "CKD-MBD",
    subtema: "Calcifilaxia",
    dificuldade: "avancado",
    age: 63,
    vars: {

    },
    statement: "Paciente em HD com placas cutâneas dolorosas violáceas em coxas, produto Ca×P alto e uso de warfarina. Qual a conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspeita de calcifilaxia: cuidados de ferida, suspender warfarina se possível (avaliar anticoagulação alternativa), otimizar dialisado, quelantes não-cálcicos, tiosulfato de sódio IV,…"
    },
    correct: "E",
    explanation: "Calcifilaxia é emergência dermatológica/nefrológica. Warfarina é fator de risco. Pearl: dor cutânea violácea em dialítico = emergência. Gabarito detalhado: Suspeita de calcifilaxia: cuidados de ferida, suspender warfarina se possível (avaliar anticoagulação alternativa), otimizar dialisado, quelantes não-cálcicos, tiosulfato de sódio IV, controle agressivo de PTH/Ca/P e suporte multidisciplinar",
    bibliography: "KDIGO CKD-MBD; calciphylaxis reviews."
  },
  {
    id: "NA-X023",
    tema: "Anemia",
    subtema: "AEE e ferro na DRC",
    dificuldade: "intermediario",
    age: 67,
    vars: {
      hb: 8.9,
      tsat: 12,
      ferritina: 45
    },
    statement: "DRC 4, Hb {{hb}}, TSAT {{tsat}}%, ferritina {{ferritina}}, sintomático. Qual a sequência correta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Repor ferro (IV preferível se oral intolerável/ineficaz) até repor estoques; depois iniciar/ajustar AEE com meta individualizada (geralmente evitar Hb >11,5–13); investigar perdas",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "KDIGO: ferro antes/junto do AEE. Metas de Hb não devem ser normalizadas agressivamente. Pearl: TSAT baixo = ferro primeiro.",
    bibliography: "KDIGO Anemia 2012; updates práticos."
  },
  {
    id: "NA-X024",
    tema: "Nefropatia diabética",
    subtema: "SGLT2 + finerenona",
    dificuldade: "intermediario",
    age: 58,
    vars: {
      tfg: 48,
      uacr: 650
    },
    statement: "DM2, TFG {{tfg}}, UACR {{uacr}} mg/g, PA 138/84 em IECA. Qual adição traz maior impacto renal/CV baseado em evidência?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Adicionar SGLT2i (se elegível) e considerar finerenona (se K e TFG permitirem) sobre IECA/BRA, otimizar PA e glicemia",
      D: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor.",
      E: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com."
    },
    correct: "C",
    explanation: "DAPA-CKD/EMPA-KIDNEY e FIDELIO/FIGARO mudaram o padrão. Pearl: IECA + SGLT2 ± finerenona = tríade moderna.",
    bibliography: "KDIGO Diabetes 2022/2024; DAPA-CKD; FIDELIO-DKD."
  },
  {
    id: "NA-X025",
    tema: "HAS",
    subtema: "Meta KDIGO DRC",
    dificuldade: "basico",
    age: 60,
    vars: {
      tfg: 42
    },
    statement: "DRC TFG {{tfg}}, proteinúria, PA consultório 148/92. Qual meta e primeiro passo farmacológico tipicamente preferido?",
    options: {
      A: "IECA ou BRA como base na DRC proteinúrica, meta individualizada (frequentemente PAS <120 se tolerado por evidência SPRINT/KDIGO, com cautela), associar outros anti-hipertensivos conforme…",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "KDIGO BP 2021 favorece metas mais baixas com medição padronizada. IECA/BRA são base na proteinúria. Pearl: medir PA direito muda a meta.",
    bibliography: "KDIGO BP 2021; SPRINT."
  },
  {
    id: "NA-X026",
    tema: "Litíase",
    subtema: "Cálcio-oxalato recorrente",
    dificuldade: "intermediario",
    age: 41,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com 3 episódios de cálculo de oxalato de cálcio em 2 anos, urina 24 h com hiperoxalúria e volume 1,1 L/dia. Qual a melhor estratégia?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Aumentar ingestão hídrica (meta diurese ≥2–2,5 L), cálcio dietético adequado nas refeições (liga oxalato), reduzir oxalato/sal, citrato se hipocitratúria, e avaliar causas de hiperoxalúria",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Restringir cálcio dietético aumenta oxalato absorvido. Volume urinário é a intervenção nº 1. Pearl: cálcio nas refeições protege.",
    bibliography: "AUA kidney stone; EAU urolithiasis."
  },
  {
    id: "NA-X027",
    tema: "ADPKD",
    subtema: "Tolvaptano",
    dificuldade: "avancado",
    age: 36,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com ADPKD, Mayo 1C/1D, TFG 65, progressão rápida documentada. Qual alternativa está de acordo com evidência?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      B: "Considerar tolvaptano (TEMPO/REPRISE) em progressores de alto risco, com monitorização rigorosa de hepatotoxicidade e poliúria; controle rigoroso de PA (preferência IECA/BRA)",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Tolvaptano retarda queda de TFG em selecionados. Hepatotoxicidade exige ALT monitorado. Pearl: selecionar progressor rápido.",
    bibliography: "TEMPO 3:4; REPRISE; KDIGO ADPKD draft/guidance."
  },
  {
    id: "NA-X028",
    tema: "UTI",
    subtema: "CRRT com citrato",
    dificuldade: "avancado",
    age: 57,
    vars: {

    },
    statement: "Paciente séptico em VNI com LRA anúrica inicia CVVHDF. Qual anticoagulante é geralmente preferido na ausência de contraindicação?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Citrato regional (quando protocolo disponível) como preferência ISPD/KDIGO-pratical em muitos centros, com monitorização de gap de cálcio total/ionizado e metabolismo hepático",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Citrato regional prolonga filtro e reduz sangramento vs heparina sistêmica. Pearl: monitorar cálcio ionizado pós-filtro e sistêmico.",
    bibliography: "KDIGO AKI; CRRT citrate protocols."
  },
  {
    id: "NA-X029",
    tema: "Ajuste de dose",
    subtema: "Metformina e TFG",
    dificuldade: "basico",
    age: 64,
    vars: {
      tfg: 28
    },
    statement: "{{sexWord}} de {{age}} com DM2, TFG {{tfg}} mL/min/1,73m², em metformina 1 g 2×/dia, sem acidose atual. Qual é a conduta correta quanto ao antidiabético neste estágio de DRC?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Ajustar/suspender metformina conforme TFG (em geral não iniciar se TFG <30; reduzir entre 30–45); educar sobre risco de acidose láctica em LRA/hipóxia",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Label e guidelines limitam metformina em TFG baixa. Pearl: TFG <30 → tipicamente suspender. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "FDA/ANVISA metformina; KDIGO Diabetes."
  },
  {
    id: "NA-X030",
    tema: "Nefrotoxicidade",
    subtema: "Lítio crônico",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "Paciente em lítio há 15 anos com poliúria, nictúria, TFG 48 e cistos renais adquiridos. Qual a conduta nefrológica?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspeitar NDI e DRC por lítio: medir nível sérico, discutir com psiquiatria redução/alternativa, amilorida pode ajudar NDI, monitorar TFG/proteinúria e evitar desidratação"
    },
    correct: "E",
    explanation: "Lítio causa NDI e DRC intersticial. Amilorida é opção clássica para NDI. Pearl: poliúria em usuário de lítio não é “psicogênica” até prova.",
    bibliography: "Lithium nephrotoxicity reviews."
  },
  {
    id: "NA-X031",
    tema: "Nefrite intersticial",
    subtema: "Sjögren",
    dificuldade: "avancado",
    age: 49,
    vars: {
      hco3: 15
    },
    statement: "Mulher de {{age}} com xerostomia, Anti-Ro+, acidose com HCO₃ {{hco3}}, hipocalemia e pH urinário alto. Qual associação renal clássica?",
    options: {
      A: "ATR distal (± nefrite tubulointersticial) associada à Sjögren: álcali, repor K, tratar doença de base e avaliar litíase/nefrocalcinose",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada Esta abordagem atrasa a terapia com melhor evidência para.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "A",
    explanation: "Sjögren + ATR I é clássico. Pearl: olho seco + acidose = peça Anti-Ro e pH urinário. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "Sjögren renal involvement reviews."
  },
  {
    id: "NA-X032",
    tema: "Embolia de colesterol",
    subtema: "Pós-cateterismo",
    dificuldade: "avancado",
    age: 74,
    vars: {
      cr: 3.1
    },
    statement: "Idoso vasculopata 1 semana após coronariografia: livedo, dedo azul, eosinofilia e creatinina {{cr}}. Qual o diagnóstico e conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Embolia de colesterol: suporte, evitar novo instrumental aórtico, estatina, controle de PA; corticoides controversos; prognóstico variável",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "LRA tardia pós-cateter + livedo/eosinofilia = colesterol. Contraste costuma ser mais precoce. Pearl: “blue toe” após cateter.",
    bibliography: "Cholesterol emboli reviews; KDIGO AKI."
  },
  {
    id: "NA-X033",
    tema: "Intoxicações",
    subtema: "Etilenoglicol",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "Adulto com ingestão suspeita de anticongelante, acidose metabólica com ânion gap e osmolar gap elevados, cristais de oxalato na urina. Qual a terapêutica específica?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Fomepizol (ou etanol se indisponível) + suporte; hemodiálise se acidose grave, LRA ou níveis elevados — remove parent e metabólitos",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor.",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "B",
    explanation: "Fomepizol bloqueia álcool desidrogenase. HD em casos graves. Pearl: gap osmolar + gap aniônico + oxalato = etilenoglicol.",
    bibliography: "EXTRIP; AACT toxic alcohol."
  },
  {
    id: "NA-X034",
    tema: "Gravidez",
    subtema: "Pré-eclâmpsia vs LRA",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "Gestante 32 semanas com PA 160/110, proteinúria nova, cefaleia e creatinina 1,4 (basal 0,6). Qual a prioridade?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Pré-eclâmpsia com acometimento renal: anti-hipertensivo seguro na gestação, sulfato de magnésio se risco de eclâmpsia, avaliação obstétrica para resolução (definitiva), e suporte de LRA",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Resolução obstétrica trata a doença. IECA é teratogênico/contraindicado. Pearl: creatinina “normal” de não gestante pode ser LRA na grávida.",
    bibliography: "ACOG preeclampsia; KDIGO pregnancy chapters."
  },
  {
    id: "NA-X035",
    tema: "Glomerulopatia",
    subtema: "C3 glomerulopatia",
    dificuldade: "avancado",
    age: 24,
    vars: {

    },
    statement: "Jovem com hematúria, proteinúria, C3 baixo persistente, C4 normal, biópsia com depósitos C3 dominantes. Qual a linha?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "C3 glomerulopatia: investigar via alternativa do complemento (incluindo C3Nef), nefroproteção, e terapia direcionada ao complemento/imunossupressão em centros especializados",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "C3G é doença da via alternativa. Pearl: C3 baixo + C4 normal + depósito C3 = não é lúpus clássico. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDIGO C3G; expert consensus."
  },
  {
    id: "NA-X036",
    tema: "DRC",
    subtema: "Referência e progressão",
    dificuldade: "basico",
    age: 50,
    vars: {
      tfg: 38,
      uacr: 420
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}} mL/min/1,73m², UACR {{uacr}} mg/g, hipertensão e DM2. Qual conjunto melhor define a conduta de base nefroprotetora neste paciente?",
    options: {
      A: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "IECA/BRA, SGLT2i, controle de PA/glicemia/lipídeos, evitar nefrotóxicos, vacinação, encaminhar à nefrologia por TFG <45 e albuminúria A3, e planejar acesso/Tx se progressão",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor."
    },
    correct: "C",
    explanation: "Pacote KDIGO de nefroproteção moderna. Pearl: albuminúria guia risco tanto quanto TFG. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDIGO CKD 2024."
  },
  {
    id: "NA-X037",
    tema: "Hemodiálise",
    subtema: "Indicações AEIOU",
    dificuldade: "basico",
    age: 70,
    vars: {
      k: 6.8
    },
    statement: "LRA com K {{k}} refratário a medidas médicas, acidose grave e edema agudo de pulmão. Qual a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      B: "Indicação de terapia renal substitutiva por AEIOU (Acidose, Eletrolitos, Intoxicação, Overload, Uremia) — iniciar dialise sem atrasar",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "B",
    explanation: "AEIOU continua válido. Pearl: hipercalemia refratária + EAP = dialise agora. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDIGO AKI."
  },
  {
    id: "NA-X038",
    tema: "Distúrbios",
    subtema: "Hipercalemia ECG",
    dificuldade: "basico",
    age: 68,
    vars: {
      k: 7.1
    },
    statement: "{{sexWord}} de {{age}} com DRC, potássio sérico {{k}} mEq/L, ECG com QRS alargado e ondas T apiculadas. Qual é a sequência correta de manejo da hipercalemia ameaçadora?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Gluconato/cloreto de cálcio IV para estabilizar membrana → shift (insulina+glicose ± beta-agonista) → remoção (resina/patiromer/diurético/diálise)",
      D: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "C",
    explanation: "Membrana → shift → remoção. Pearl: cálcio IV não baixa K, mas salva vida. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "Emergency hyperkalemia protocols."
  },
  {
    id: "NA-X039",
    tema: "Pulmão-rim",
    subtema: "Diagnóstico diferencial",
    dificuldade: "avancado",
    age: 46,
    vars: {
      cr: 4
    },
    statement: "{{sexWord}} de {{age}} com hemoptise, creatinina {{cr}}, sedimento ativo. ANCA e anti-MBG pendentes. Qual a melhor conduta enquanto aguarda sorologias?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Tratar como emergência pulmão-rim: estabilizar via aérea, coletar ANCA/anti-MBG/anti-GBM, biópsia quando segura, e iniciar imunossupressão ± PLEX conforme probabilidade e gravidade"
    },
    correct: "E",
    explanation: "Síndrome pulmão-rim é emergência. Pearl: trate o doente, não espere o laboratório eterno. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher. Gabarito detalhado: Tratar como emergência pulmão-rim: estabilizar via aérea, coletar ANCA/anti-MBG/anti-GBM, biópsia quando segura, e iniciar imunossupressão ± PLEX conforme probabilidade e gravidade — não atrasar por resultado demorado se vida em risco",
    bibliography: "KDIGO vasculitis/anti-GBM."
  },
  {
    id: "NA-X040",
    tema: "Biópsia renal",
    subtema: "Indicações",
    dificuldade: "intermediario",
    age: 44,
    vars: {

    },
    statement: "Adulto com proteinúria 2,5 g/dia, hematúria dismórfica, C3 baixo e creatinina em elevação. Qual a melhor afirmação?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Biópsia renal está indicada para definir padrão histológico e terapia (após coagulação/PA adequadas e exclusão de obstrução); contraindicações relativas devem ser pesadas",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Sedimento ativo + hipocomplementemia + LRA = alto rendimento da biópsia. Pearl: biópsia é exame terapêutico, não só diagnóstico.",
    bibliography: "KDIGO GN; biopsy safety reviews."
  },
  {
    id: "NA-X041",
    tema: "Nefropatia",
    subtema: "Oxalato entérico",
    dificuldade: "avancado",
    age: 51,
    vars: {

    },
    statement: "Paciente com bypass bariátrico há 2 anos apresenta LRA, hiperoxalúria e cristais de oxalato na biópsia. Qual a conduta?",
    options: {
      A: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Nefropatia por oxalato entérico: hidratação, cálcio dietético com refeições, reduzir oxalato/gordura, citrato, tratar esteatorreia e evitar vitamina C alta; dialise se necessário",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Bypass → esteatorreia → hiperoxalúria entérica. Pearl: cálcio nas refeições liga oxalato no lúmen. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "Enteric hyperoxaluria reviews."
  },
  {
    id: "NA-X042",
    tema: "Uremia",
    subtema: "Pericardite urêmica",
    dificuldade: "intermediario",
    age: 62,
    vars: {

    },
    statement: "Paciente com DRC 5 sem dialise regular apresenta dor precordial pleurítica, atrito e derrame pericárdico. Qual a prioridade?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Iniciar/intensificar dialise (pericardite urêmica/dialítica); evitar anticoagulação agressiva; avaliar tamponamento",
      C: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "Pericardite urêmica é indicação clássica de dialise. Pearl: atrito + DRC 5 = dialise, não só AINE. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "KDOQI; dialytic indications."
  },
  {
    id: "NA-X043",
    tema: "Anticoagulação",
    subtema: "FA e DRC avançada",
    dificuldade: "avancado",
    age: 78,
    vars: {
      tfg: 18
    },
    statement: "Idoso com FA, CHA₂DS₂-VASc 4, TFG {{tfg}}, HAS. Qual abordagem anticoagulante é mais criteriosa?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Individualizar: warfarina ou DOAC com dose ajustada à TFG (ex. apixabana frequentemente preferida em TFG baixa), reavaliar sangramento, evitar nefrotóxicos e monitorar",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "DRC eleva risco trombótico e hemorrágico. Apixabana tem dados mais favoráveis em TFG baixa. Pearl: ajuste de dose não é opcional.",
    bibliography: "KDIGO/EHRA practical guides; apixaban CKD data."
  },
  {
    id: "NA-X044",
    tema: "Plasmaférese",
    subtema: "Indicações renais",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "Em nefrologia clínica, qual cenário entre as opções tem indicação mais clara de plasmaférese terapêutica como parte do tratamento inicial?",
    options: {
      A: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "PTT com ADAMTS13 muito baixo / anti-MBG com hemorragia alveolar / algumas rejeições humorais hiperagudas — PLEX é terapêutica de resgate",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica"
    },
    correct: "D",
    explanation: "PLEX tem indicações ASFA específicas. Pearl: PTT e anti-MBG são paradigmas. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "ASFA guidelines."
  },
  {
    id: "NA-X045",
    tema: "Diálise peritoneal",
    subtema: "Adequação e ultrafiltração",
    dificuldade: "avancado",
    age: 56,
    vars: {

    },
    statement: "Paciente em DP com Kt/V residual+peritoneal borderline, ultrafiltração baixa e edema. PET mostra alto transportador. Qual estratégia?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Ajustar prescrição (icodextrina no dwell longo, volumes/ciclos), otimizar residual, restringir sal/água e considerar transferência para HD se falência de UF refratária",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Alto transportador perde UF no dwell longo — icodextrina ajuda. Pearl: adequação ≠ só Kt/V; volume importa.",
    bibliography: "ISPD adequacy; PET interpretation."
  },
  {
    id: "NA-X046",
    tema: "Fabry",
    subtema: "Doença de depósito",
    dificuldade: "avancado",
    age: 32,
    vars: {

    },
    statement: "Homem de {{age}} com proteinúria, TFG caindo, angioqueratomas, hipo-hidrose e história familiar materna de “doença renal”. Qual investigação?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Doença de Fabry: dosar atividade de α-galactosidase A (homens), Lyso-Gb3, genética GLA; biópsia com corpos de inclusão; terapia de reposição enzimática/chaperona conforme elegibilidade",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Fabry é X-ligada; homens index são clássicos. Pearl: angioqueratoma + rim + história materna. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "Fabry registry; ERT guidelines."
  },
  {
    id: "NA-X047",
    tema: "Alport",
    subtema: "Adulto jovem",
    dificuldade: "intermediario",
    age: 22,
    vars: {

    },
    statement: "Homem de {{age}} com hematúria persistente desde infância, hipoacusia neurossensorial e tia em diálise. Qual a hipótese e conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Síndrome de Alport: genética (COL4A5/A3/A4), IECA precoce mesmo com proteinúria leve, aconselhamento familiar e evitar biópsia desnecessária se genética diagnóstica"
    },
    correct: "E",
    explanation: "IECA precoce retarda progressão no Alport. Pearl: surdez + hematúria familiar = Alport até prova em contrário.",
    bibliography: "Alport Syndrome Expert Consensus; KDIGO."
  },
  {
    id: "NA-X048",
    tema: "Pós-infecciosa",
    subtema: "GN pós-estreptocócica adulta",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "Adulto 10 dias após faringite com edema, oligúria, HAS, hematúria e C3 baixo. Qual a melhor conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "GN pós-estreptocócica: suporte (sal, diurético, anti-hipertensivo), antibiótico se infecção ativa, diálise se AEIOU; biópsia se atípico/persistente (adulto tem mais diferencial)"
    },
    correct: "E",
    explanation: "Em adulto, biópsia é mais frequente porque C3 baixo tem diferenciais (C3G, lúpus, endocardite). Pearl: C3 baixo pós-faringite ≠ automaticamente só suporte sem pensar diferencial.",
    bibliography: "KDIGO infection-related GN."
  },
  {
    id: "NA-X049",
    tema: "HIV",
    subtema: "HIVAN",
    dificuldade: "avancado",
    age: 36,
    vars: {
      prot: 7
    },
    statement: "{{sexWord}} com HIV não tratado, CV alta, proteinúria {{prot}} g/dia e rins grandes ecogênicos. Qual a pedra angular do tratamento?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "TARV imediata (tratamento da HIVAN), IECA/BRA, suporte; biópsia para confirmar FSGS colapsante e excluir outras glomerulopatias",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)"
    },
    correct: "D",
    explanation: "HIVAN melhora com TARV. Pearl: rins grandes + SN + HIV avançado = HIVAN. Distratores descartados por não explicarem o quadro clínico completo ou por atrasarem terapia com benefício comprovado. Pearl: correlacione vinheta, labs e diretriz antes de escolher.",
    bibliography: "IDSA/HIV medicine nephrology reviews."
  },
  {
    id: "NA-X050",
    tema: "DRC",
    subtema: "Vacinação",
    dificuldade: "basico",
    age: 57,
    vars: {
      tfg: 22
    },
    statement: "{{sexWord}} de {{age}} com DRC TFG {{tfg}} mL/min/1,73m², pré-diálise, encaminhado para preparação de TSR. Qual estratégia vacinal é mais adequada neste momento?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Atualizar hepatite B (esquema reforçado se necessário), influenza anual, pneumococo e COVID conforme calendário; preferir vacinar antes da imunossupressão/dialise quando possível",
      C: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "DRC é estado de alto risco infeccioso; hepatite B pré-dialise é clássica. Pearl: vacine cedo — resposta cai com TFG.",
    bibliography: "CDC/SBN immunization in CKD."
  }
];

module.exports = { ADV_MASTERS_EXTRA };
