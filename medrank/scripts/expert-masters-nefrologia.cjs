/**
 * Casos-mestres — Nefrologia adulta (opções equilibradas).
 * Gerado/polido por polish-expert-options.cjs — distratores equilibrados.
 */
const ADV_MASTERS = [
  {
    id: "NA-T001",
    tema: "LRA",
    subtema: "Pré-renal em sepse",
    dificuldade: "basico",
    age: 68,
    vars: {
      cr: 2.4,
      ureia: 98,
      fena: 0.3
    },
    statement: "{{sexWord}} de {{age}} anos, {{weight}} kg, admitido com sepse de foco urinário e PAM 65 mmHg após reposição inicial de 30 mL/kg de cristaloide balanceado. Creatinina basal 1,0; atual {{cr}} mg/dL; ureia {{ureia}}; FENa {{fena}}%, urina concentrada, sem cilindros pigmentados; US sem hidronefrose. Qual é a interpretação correta e a conduta prioritária?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar antifúngico de amplo espectro isolado, sem cobertura bacteriana adequada ao foco provável Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "LRA pré-renal por hipoperfusão: otimizar perfusão (fluidoterapia guiada por reavaliação clínica/POCUS/VExUS, noradrenalina se hipotensão persistente), tratar a sepse com antimicrobiano…"
    },
    correct: "E",
    explanation: "FENa <1% e urina concentrada + contexto séptico sugerem pré-renal. Terapia é restaurar perfusão + tratar a causa; diálise segue AEIOU. A rotula NTA cedo demais. C não se sustenta sem eosinofilia/exantema/exposição. D exige hidronefrose ausente. E ignora a hipovolemia. Pearl: contexto hemodinâmico manda mais que um número isolado; POCUS/VExUS integram a decisão. Gabarito detalhado: LRA pré-renal por hipoperfusão: otimizar perfusão (fluidoterapia guiada por reavaliação clínica/POCUS/VExUS, noradrenalina se hipotensão persistente), tratar a sepse com antimicrobiano adequado, evitar nefrotóxicos e reavaliar TFG",
    bibliography: "KDIGO AKI 2012; Surviving Sepsis 2021."
  },
  {
    id: "NA-T002",
    tema: "LRA",
    subtema: "NTA isquêmica x nefrotóxica",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      cr: 3.2,
      fena: 3
    },
    statement: "{{sexWord}} de {{age}} internado por infarto complicado com choque cardiogênico, recebeu contraste iodado e aminoglicosídeo. Creatinina {{cr}}, FENa {{fena}}%, sedimento com cilindros granulosos pigmentados, U/P creatinina baixa. Sem obstrução. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Necrose tubular aguda (isquêmica somada a nefrotóxica): suspender aminoglicosídeo, otimizar hemodinâmica evitando congestão, evitar novo contraste, dose ajustada de fármacos, monitorizar…"
    },
    correct: "E",
    explanation: "FENa >2%, cilindros granulosos e contexto de isquemia+nefrotóxico caracterizam NTA. Recuperação leva dias-semanas. C é raríssimo bilateral agudo. D exige clínica reumática. E teria CK elevada. Pearl: \"granuloso pigmentado\" no sedimento é sinal clássico de NTA.",
    bibliography: "KDIGO AKI 2012; NEJM AKI reviews."
  },
  {
    id: "NA-T003",
    tema: "LRA",
    subtema: "Nefropatia por contraste — prevenção",
    dificuldade: "basico",
    age: 77,
    vars: {
      tfg: 28
    },
    statement: "{{sexWord}} de {{age}} com DRC (TFG {{tfg}}) precisa realizar angioTC para investigar embolia. Qual é a melhor estratégia preventiva de LRA associada a contraste?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Hidratação com SF 0,9% (ou bicarbonato isotônico em casos selecionados) periprocedimento, menor volume possível de contraste iso/hipo-osmolar, suspender AINE e outros nefrotóxicos,…",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Volume é a evidência mais robusta; NAC não substitui hidratação (PRESERVE trial). Menor volume + iso-osmolar reduz risco. Metformina não causa LRA, mas exige suspensão em risco de LRA para evitar acidose. Pearl: hidratação > \"milagres\".",
    bibliography: "PRESERVE trial (NEJM 2018); ACR contrast manual; KDIGO."
  },
  {
    id: "NA-T004",
    tema: "LRA",
    subtema: "Nefrite intersticial aguda",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      cr: 2.6
    },
    statement: "{{sexWord}} de {{age}} em uso de omeprazol e amoxicilina/clavulanato há 3 semanas apresenta creatinina {{cr}}, exantema, febre baixa e eosinofilia periférica. Sedimento urinário com leucócitos e cilindros leucocitários; US sem obstrução. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender fármacos suspeitos (IBP, antibiótico), considerar corticoide (prednisona 0,5–1 mg/kg/dia com desmame por 4–8 semanas) se creatinina persistentemente elevada"
    },
    correct: "E",
    explanation: "NIA medicamentosa: IBP, ATB, AINE, PPI, checkpoint inhibitors são gatilhos. Corticoide precoce (2–3 semanas de sintomas) preserva TFG. Pearl: eosinofilúria não é específica. Gabarito detalhado: Suspender fármacos suspeitos (IBP, antibiótico), considerar corticoide (prednisona 0,5–1 mg/kg/dia com desmame por 4–8 semanas) se creatinina persistentemente elevada; biópsia renal quando dúvida diagnóstica ou falha em melhorar",
    bibliography: "Praga M, Perazella MA — AIN reviews; KDIGO AKI."
  },
  {
    id: "NA-T005",
    tema: "LRA",
    subtema: "Indicação de TSR (AEIOU)",
    dificuldade: "basico",
    age: 55,
    vars: {
      k: 7.2
    },
    statement: "{{sexWord}} de {{age}} com LRA anúrica, K {{k}} mEq/L refratário a medidas conservadoras, acidose (pH 7,05, HCO₃ 10) e edema agudo de pulmão em ventilação mecânica. Qual é a melhor conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar terapia de substituição renal (HD intermitente, SLED ou CRRT conforme estabilidade); indicações AEIOU: Acidose, Eletrólitos, Intoxicação, Overload, Uremia sintomática",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "AEIOU é o mnemônico das indicações. Estudos STARRT-AKI e AKIKI mostram que início precoce demais (sem AEIOU) não melhora desfechos. Pearl: hiperK refratária + congestão = dialisar.",
    bibliography: "KDIGO AKI; STARRT-AKI trial."
  },
  {
    id: "NA-T006",
    tema: "LRA",
    subtema: "CRRT — dose e ajustes",
    dificuldade: "intermediario",
    age: 49,
    vars: {
      k: 6.6
    },
    statement: "{{sexWord}} de {{age}} em choque séptico sob noradrenalina alta, anúrico, K {{k}}, acidose. Qual é a melhor modalidade e a prescrição inicial de diálise?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "CRRT (CVVHDF) com dose de efluente 20–25 mL/kg/h (prescrever 25–30 para atingir o alvo, contando pausas), controle de anticoagulação (regional com citrato de preferência), ajuste de…",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "ATN/RENAL/IVOIRE mostraram que ≥25 mL/kg/h efetivo é adequado; prescrever maior devido a pausas. Citrato regional é preferido por diretriz KDIGO. Ajustar antibióticos (nem sub, nem toxicidade). Pearl: clearance de antibióticos na CRRT é crítico.",
    bibliography: "KDIGO AKI; ATN, RENAL, IVOIRE trials."
  },
  {
    id: "NA-T007",
    tema: "LRA",
    subtema: "Rabdomiólise",
    dificuldade: "basico",
    age: 35,
    vars: {
      ck: 85000,
      cr: 3,
      k: 6
    },
    statement: "{{sexWord}} de {{age}} após esmagamento em acidente, CK {{ck}} U/L, mioglobinúria, K {{k}}, creatinina {{cr}}. Qual é a conduta inicial mais adequada?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Hidratação isotônica precoce e generosa para diurese ≥200–300 mL/h, monitorar e tratar hipercalemia e hipocalcemia (cuidado com Ca"
    },
    correct: "E",
    explanation: "Fluido é a intervenção salvadora — precoce, isotônico, generoso, guiado por diurese. Alcalinização e manitol são discutíveis. Cuidado: hipoCa aguda, hiperCa tardia. Pearl: CK altíssima + urina em \"chá\" = hidratar já. Gabarito detalhado: Hidratação isotônica precoce e generosa para diurese ≥200–300 mL/h, monitorar e tratar hipercalemia e hipocalcemia (cuidado com Ca — pode reprecipitar), alcalinização em selecionados (evidência controversa), evitar AINE, indicar TSR se AEIOU",
    bibliography: "Bosch X et al., NEJM Rhabdomyolysis."
  },
  {
    id: "NA-T008",
    tema: "LRA",
    subtema: "Síndrome hepatorrenal (AKI-HRS)",
    dificuldade: "avancado",
    age: 58,
    vars: {
      cr: 2.8
    },
    statement: "{{sexWord}} de {{age}} com cirrose Child C e ascite, creatinina sobe para {{cr}} mg/dL, urinálise sem cilindros, US sem obstrução; sem nefrotóxicos, sem choque; sem melhora após 48 h de albumina 1 g/kg/dia e retirada de diuréticos. Qual é a melhor conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Diagnóstico de HRS-AKI (novos critérios ICA): terlipressina + albumina (padrão-ouro) ou noradrenalina em UTI se terlipressina indisponível/contraindicada",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "HRS-AKI: LRA na cirrose sem outra causa após teste de albumina + retirada de diuréticos. CONFIRM/REVERSE trials mostraram benefício de terlipressina + albumina. Diálise apenas como ponte para transplante. Pearl: creatinina na cirrose subestima; use estimativa de TFG com cautela.",
    bibliography: "International Club of Ascites HRS 2015/2019; CONFIRM trial; EASL/AASLD."
  },
  {
    id: "NA-T009",
    tema: "LRA",
    subtema: "Síndrome cardiorrenal 1",
    dificuldade: "intermediario",
    age: 74,
    vars: {
      fe: 30,
      cr: 2.1
    },
    statement: "{{sexWord}} de {{age}} com IC de FE reduzida (FE {{fe}}%), congestão pulmonar e edema periférico, creatinina {{cr}} após aumento de diurético de alça. Qual é a melhor estratégia terapêutica?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Manter descongestão adequada: aumentar dose ou associar diuréticos (bloqueio sequencial com tiazídico ou acetazolamida",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos"
    },
    correct: "B",
    explanation: "Cardiorrenal tipo 1: descongestionar é essencial; queda modesta de TFG durante descongestão adequada não deve fazer parar diurético. ADVOR mostrou benefício da acetazolamida. SGLT2i reduzem hospitalização e melhoram TFG a longo prazo. Pearl: congestão residual = piora renal. Gabarito detalhado: Manter descongestão adequada: aumentar dose ou associar diuréticos (bloqueio sequencial com tiazídico ou acetazolamida — ADVOR mostrou benefício), ultrafiltração isolada em selecionados, evitar nefrotóxicos, otimizar terapia da IC (β-bloqueador, IECA/BRA, SGLT2i, ARNI, MRA) — leve alta de creatinina durante descongestão pode ser aceitável",
    bibliography: "ADVOR trial (NEJM 2022); Cardiorenal syndrome reviews; ESC HF."
  },
  {
    id: "NA-T010",
    tema: "LRA",
    subtema: "AINE + IECA + diurético (tríade)",
    dificuldade: "intermediario",
    age: 70,
    vars: {
      cr: 1.9
    },
    statement: "{{sexWord}} de {{age}} com HAS e osteoartrose usa losartana, hidroclorotiazida e ibuprofeno diário. Após episódio de gastroenterite, creatinina sobe para {{cr}} (basal 1,0). Qual é a interpretação correta e a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "LRA pré-renal/hemodinâmica pela \"tríade\" AINE + IECA/BRA + diurético em contexto de hipovolemia: suspender AINE, avaliar suspensão temporária de IECA/diurético, reidratar",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "AINE reduz PG dilatadoras da aferente; IECA dilata a eferente; diurético reduz pré-carga → colapso de TFG na hipovolemia. Pearl: educar todo idoso sobre AINE. Gabarito detalhado: LRA pré-renal/hemodinâmica pela \"tríade\" AINE + IECA/BRA + diurético em contexto de hipovolemia: suspender AINE, avaliar suspensão temporária de IECA/diurético, reidratar; reintroduzir IECA/BRA quando estável (é nefroprotetor a longo prazo)",
    bibliography: "KDIGO AKI drug-induced."
  },
  {
    id: "NA-T011",
    tema: "DRC",
    subtema: "Nefroproteção diabética",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      tfg: 42,
      uacr: 480
    },
    statement: "{{sexWord}} de {{age}} com DM2, DRC (TFG {{tfg}} mL/min/1,73 m²), UACR {{uacr}} mg/g, PA 138/82 em uso de IECA dose máxima tolerada; K 4,6; HbA1c 8,0%. Qual medicamento deve ser iniciado para maior impacto renal e cardiovascular?",
    options: {
      A: "Trocar metformina por sulfonilureia de alta dose sem ajustar à função renal nem risco de hipoglicemia",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      D: "Adicionar iSGLT2 (dapagliflozina/empagliflozina); benefício robusto de DAPA-CKD, EMPA-KIDNEY e CREDENCE",
      E: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual"
    },
    correct: "D",
    explanation: "iSGLT2 reduz progressão de DRC e desfechos CV mesmo sem DM (DAPA-CKD, EMPA-KIDNEY). Finerenona (FIDELIO/FIGARO) reduz albuminúria e MACE em DRC diabética albuminúrica. Manter IECA se K/creatinina toleráveis. Pearl: TFG cai um pouco no início do iSGLT2 e depois estabiliza — não é toxicidade. Gabarito detalhado: Adicionar iSGLT2 (dapagliflozina/empagliflozina) — benefício robusto de DAPA-CKD, EMPA-KIDNEY e CREDENCE; considerar finerenona (bloqueador não esteroidal do MR) para redução adicional de albuminúria e desfechos CV/renais",
    bibliography: "KDIGO Diabetes in CKD 2022; DAPA-CKD, EMPA-KIDNEY, FIDELIO-DKD, CREDENCE."
  },
  {
    id: "NA-T012",
    tema: "DRC",
    subtema: "Nefroproteção não diabética",
    dificuldade: "intermediario",
    age: 58,
    vars: {
      tfg: 40,
      upcr: 1.2
    },
    statement: "{{sexWord}} de {{age}} com DRC não-diabética (TFG {{tfg}}, UPCR {{upcr}}), PA 132/80 em IECA dose plena. Qual alternativa está de acordo com a diretriz mais atual?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Reduzir metformina pela metade e manter indefinidamente mesmo com TFG <30, desde que assintomático Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adicionar iSGLT2 mesmo sem diabetes (DAPA-CKD e EMPA-KIDNEY mostraram benefício em DRC albuminúrica não-diabética), otimizar PA (alvo SBP <120 mmHg em muitos guidelines, guiado por…"
    },
    correct: "E",
    explanation: "iSGLT2 é hoje pilar de nefroproteção mesmo sem DM. Pearl: DRC albuminúrica = SGLT2i, seja diabética ou não.",
    bibliography: "KDIGO CKD 2024 update; EMPA-KIDNEY."
  },
  {
    id: "NA-T013",
    tema: "DRC",
    subtema: "Preparo para TRS",
    dificuldade: "intermediario",
    age: 60,
    vars: {
      tfg: 15
    },
    statement: "{{sexWord}} de {{age}} com DRC estágio 5 (TFG {{tfg}} mL/min/1,73 m²), PA e volemia adequadas, sem asterixe, pericardite, anorexia significativa ou distúrbios eletrolíticos refratários. Está em acompanhamento nefrológico regular. Qual é a melhor conduta neste momento?",
    options: {
      A: "Preparo antecipado: educação multidisciplinar sobre modalidades (HD/DP/Tx), planejamento de acesso (fístula com antecedência ≥3–6 meses), avaliação para Tx preemptivo, controle de PA/anemia/CKD-MBD/nutrição/vacinação",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "IDEAL trial (NEJM 2010): iniciar diálise por sintomas, não por número. FAV precisa maturar. Tx preemptivo tem melhor sobrevida. Pearl: DRC 5 estável e assintomática = otimizar, não dialisar automaticamente. Gabarito detalhado: Preparo antecipado: educação multidisciplinar sobre modalidades (HD/DP/Tx), planejamento de acesso (fístula com antecedência ≥3–6 meses), avaliação para Tx preemptivo, controle de PA/anemia/CKD-MBD/nutrição/vacinação; iniciar TSR guiado por sintomas + AEIOU, não somente por TFG",
    bibliography: "IDEAL trial; KDIGO CKD; KDOQI vascular access."
  },
  {
    id: "NA-T014",
    tema: "DRC",
    subtema: "Estimativa de TFG",
    dificuldade: "basico",
    age: 65,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} negro, obeso, com massa muscular reduzida, deseja estimar TFG. Qual alternativa está de acordo com a diretriz mais atual?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para.",
      B: "Usar equação CKD-EPI 2021 (sem coeficiente racial) baseada em creatinina. conduta preferencial neste contexto",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo."
    },
    correct: "B",
    explanation: "CKD-EPI 2021 removeu variável racial e é padrão. Cistatina C melhora acurácia em extremos de massa muscular, edema e obesidade. Pearl: creatinina isoladamente engana em sarcopênicos. Gabarito detalhado: Usar equação CKD-EPI 2021 (sem coeficiente racial) baseada em creatinina; em casos com massa muscular reduzida ou discrepância clínica, dosar cistatina C e usar a equação CKD-EPI creatinina+cistatina, que aumenta acurácia",
    bibliography: "CKD-EPI 2021 (Inker LA et al., NEJM); NKF-ASN task force."
  },
  {
    id: "NA-T015",
    tema: "DRC",
    subtema: "Acidose metabólica crônica",
    dificuldade: "intermediario",
    age: 60,
    vars: {
      hco3: 18
    },
    statement: "{{sexWord}} de {{age}} com DRC estágio 4, HCO₃ {{hco3}} mEq/L persistente em duas dosagens, ânion gap normal, sem hipernatremia. Sem sintomas de sobrecarga volêmica. Qual é o tratamento mais indicado para a acidose metabólica crônica?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Corrigir com bicarbonato de sódio oral (0,5–1 mEq/kg/dia titulado) para HCO₃ alvo ≥22 mEq/L, com o objetivo de retardar progressão da DRC, preservar massa muscular e melhorar CKD-MBD",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "de Brito-Ashurst RCT e outros mostraram que correção da acidose crônica atrasa a progressão da DRC. Alvo ≥22. Pearl: acidose crônica come músculo e néfron.",
    bibliography: "KDIGO CKD; de Brito-Ashurst et al., JASN."
  },
  {
    id: "NA-T016",
    tema: "Membranosa",
    subtema: "Anti-PLA2R+",
    dificuldade: "intermediario",
    age: 54,
    vars: {
      alb: 2.1,
      prot: 7.5
    },
    statement: "{{sexWord}} de {{age}} com edema, albumina {{alb}} g/dL, proteinúria {{prot}} g/24 h, FAN/ANCA negativos, anti-PLA2R sérico positivo em títulos altos, rastreio de neoplasia negativo, TFG preservada. Qual é a melhor conduta?",
    options: {
      A: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Nefropatia membranosa primária (PLA2R+): nefroproteção máxima (IECA/BRA, restrição salina, anticoagulação profilática se albumina <2,5 g/dL e risco alto), estratificar (KDIGO baixo/médio/alto risco).",
      D: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Membranosa primária: KDIGO 2021 permite dispensar biópsia em PLA2R+ típico. Rituximabe (MENTOR trial) é hoje preferido sobre ciclofosfamida+corticoide em muitos cenários. Título de PLA2R prediz e monitora. Pearl: PLA2R é diagnóstico + prognóstico + resposta terapêutica. Gabarito detalhado: Nefropatia membranosa primária (PLA2R+): nefroproteção máxima (IECA/BRA, restrição salina, anticoagulação profilática se albumina <2,5 g/dL e risco alto), estratificar (KDIGO baixo/médio/alto risco) e iniciar imunossupressão em risco intermediário/alto (rituximabe é a primeira linha preferida hoje) — biópsia se atipia ou ausência de PLA2R",
    bibliography: "KDIGO Glomerular Diseases 2021; MENTOR (NEJM 2019)."
  },
  {
    id: "NA-T017",
    tema: "Nefrite lúpica",
    subtema: "Classe IV",
    dificuldade: "avancado",
    age: 28,
    vars: {
      upcr: 4,
      cr: 1.6
    },
    statement: "Mulher de {{age}} com LES ativo, UPCR {{upcr}} g/g, hematúria dismórfica, hipocomplementemia, anti-dsDNA alto, creatinina {{cr}}. Biópsia: classe IV. Qual é o esquema de indução mais indicado segundo as diretrizes atuais?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Indução com corticoide (pulso metilprednisolona 250–1000 mg × 3 dias seguidos de prednisona baixa dose, priorizando redução mais rápida) + MMF 2–3 g/dia OU ciclofosfamida IV (regime NIH clássico ou Euro-lupus baixa dose)"
    },
    correct: "E",
    explanation: "KDIGO Lupus 2024 e ACR/EULAR incorporaram belimumabe e voclosporina como terapias combinadas para maior taxa de resposta renal. Redução mais rápida do corticoide para menor toxicidade. HCQ para TODOS. Pearl: classe IV nunca é \"só observar\". Gabarito detalhado: Indução com corticoide (pulso metilprednisolona 250–1000 mg × 3 dias seguidos de prednisona baixa dose, priorizando redução mais rápida) + MMF 2–3 g/dia OU ciclofosfamida IV (regime NIH clássico ou Euro-lupus baixa dose); considerar acréscimo de belimumabe (BLISS-LN) ou voclosporina (AURORA) para maior remissão renal; HCQ para todos",
    bibliography: "KDIGO Lupus Nephritis 2024; ACR/EULAR 2019; BLISS-LN; AURORA."
  },
  {
    id: "NA-T018",
    tema: "Nefrite lúpica",
    subtema: "Classe V pura",
    dificuldade: "intermediario",
    age: 31,
    vars: {
      alb: 2,
      prot: 6.5
    },
    statement: "Mulher de {{age}} com LES e SN (albumina {{alb}}, proteinúria {{prot}}); creatinina normal; biópsia mostra classe V pura (nefrite membranosa lúpica). Qual é a melhor conduta?",
    options: {
      A: "HCQ + nefroproteção (IECA/BRA), estatina se dislipidemia, considerar anticoagulação se albumina muito baixa",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "A",
    explanation: "Classe V pura pode ter curso indolente; nefroproteção + HCQ é base. Imunossupressão se SN persistir. Classe V frequentemente coexiste com III/IV — leia laudo completo. Pearl: sempre olhe se há componente proliferativo associado. Gabarito detalhado: HCQ + nefroproteção (IECA/BRA), estatina se dislipidemia, considerar anticoagulação se albumina muito baixa; imunossupressão (MMF ± ICN ou rituximabe) se SN persistente apesar de otimização",
    bibliography: "KDIGO LN; ACR/EULAR."
  },
  {
    id: "NA-T019",
    tema: "Vasculite ANCA",
    subtema: "Indução em renal grave",
    dificuldade: "avancado",
    age: 67,
    vars: {
      cr: 4.2
    },
    statement: "{{sexWord}} de {{age}} com hemoptise, IRA (creatinina {{cr}}), sedimento com hematúria dismórfica e cilindros hemáticos, ANCA-MPO positivo. Qual é a melhor conduta?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência.",
      E: "Emergência renal-pulmonar (síndrome pulmão-rim): pulso de metilprednisolona seguido de prednisona (esquema com redução rápida; PEXIVAS reduced-dose)"
    },
    correct: "E",
    explanation: "ANCA + LRA rápida + pulmão exige tratar hoje. Rituximabe é preferido a ciclofosfamida em muitos cenários. PLEX seletiva. Corticoide reduzido reduz infecção sem perder eficácia. Pearl: ANCA + pulmão-rim = corrida contra o tempo. Gabarito detalhado: Emergência renal-pulmonar (síndrome pulmão-rim): pulso de metilprednisolona seguido de prednisona (esquema com redução rápida — PEXIVAS reduced-dose); indução com rituximabe (RITUXVAS/RAVE) OU ciclofosfamida; plasmaférese em casos selecionados (hemorragia alveolar difusa grave, creatinina muito alta com necessidade de diálise) — PEXIVAS mostrou que rotineiramente não reduz mortalidade/DRC terminal; profilaxia de PJP",
    bibliography: "KDIGO Vasculitis 2024; PEXIVAS (NEJM 2020); RAVE; RITUXVAS."
  },
  {
    id: "NA-T020",
    tema: "Anti-MBG",
    subtema: "Goodpasture",
    dificuldade: "avancado",
    age: 34,
    vars: {
      cr: 5.5
    },
    statement: "{{sexWord}} de {{age}} com hemorragia alveolar, creatinina {{cr}} em 5 dias e anti-MBG positivo. Qual é o tratamento clássico mais indicado?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Plasmaférese diária/em dias alternados até anti-MBG negativar + ciclofosfamida + corticoide (pulso seguido de manutenção); Tx renal apenas com anti-MBG indetectável há ≥6 meses",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Doença anti-MBG: PLEX remove anticorpos; imunossupressão bloqueia produção. Início precoce salva rim; creatinina >5,7 mg/dL ao diagnóstico com dependência de diálise tem chance baixa de recuperar rim, mas ainda vale por hemorragia. Pearl: PLEX + IS + corticoide = tripé.",
    bibliography: "KDIGO Anti-GBM; Levy JB et al."
  },
  {
    id: "NA-T021",
    tema: "Nefropatia por IgA",
    subtema: "Estratificação e novas drogas",
    dificuldade: "intermediario",
    age: 29,
    vars: {
      upcr: 1.2
    },
    statement: "{{sexWord}} de {{age}} com biópsia confirmando nefropatia por IgA, UPCR {{upcr}} g/g apesar de IECA otimizado por 3 meses, TFG estável. Qual é a melhor conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Estratificar risco (proteinúria persistente >0,75–1 g/dia, MEST-C na biópsia, TFG em declínio): otimizar RASi + SGLT2i + considerar terapias mais recentes",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência.",
      D: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "B",
    explanation: "IgA moderna: base = nefroproteção + iSGLT2 + budesonida entérica (target-release para placas de Peyer) + sparsentan. Corticoide sistêmico rotineiro caiu em desuso após TESTING/STOP-IgAN. Pearl: proteinúria persistente >0,75 g/dia = intensificar terapia. Gabarito detalhado: Estratificar risco (proteinúria persistente >0,75–1 g/dia, MEST-C na biópsia, TFG em declínio): otimizar RASi + SGLT2i + considerar terapias mais recentes — budesonida entérica (NEFIGARD/TARPEYON) para IgA de alto risco; sparsentan (bloqueador dual ET/A + AT1) em selecionados; corticoide sistêmico controverso (STOP-IgAN, TESTING); manter nefroproteção",
    bibliography: "KDIGO IgA 2024 update; NEFIGARD; PROTECT (sparsentan)."
  },
  {
    id: "NA-T022",
    tema: "FSGS",
    subtema: "Primária x secundária",
    dificuldade: "intermediario",
    age: 32,
    vars: {
      prot: 6
    },
    statement: "{{sexWord}} de {{age}} com SN completa (proteinúria {{prot}} g/dia), biópsia com FSGS variante \"tip\" ou clássica; ausência de obesidade extrema, HIV, refluxo, medicações e doenças genéticas rastreadas negativas. Qual é a melhor abordagem terapêutica?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "FSGS primária: nefroproteção com IECA/BRA + iSGLT2 e imunossupressão com corticoide em dose plena (1 mg/kg/dia, máx 80 mg) por 4–16 semanas seguido de desmame",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "FSGS primária responde parcialmente a corticoide e ICN; secundária foca causa + nefroproteção sem imunossupressão. Pearl: descartar secundárias antes de imunossuprimir. Gabarito detalhado: FSGS primária: nefroproteção com IECA/BRA + iSGLT2 e imunossupressão com corticoide em dose plena (1 mg/kg/dia, máx 80 mg) por 4–16 semanas seguido de desmame; ICN em corticorresistência/dependência; rituximabe em selecionados; investigar genética se falha ou familiar",
    bibliography: "KDIGO FSGS 2021."
  },
  {
    id: "NA-T023",
    tema: "Lesão mínima",
    subtema: "Adulto",
    dificuldade: "basico",
    age: 42,
    vars: {
      alb: 1.6,
      prot: 8
    },
    statement: "{{sexWord}} de {{age}} com SN aguda, albumina {{alb}}, proteinúria {{prot}} g/dia. Biópsia: doença de lesão mínima (podocitopatia com fusão de processos podocitários difusa). Qual é o esquema terapêutico mais indicado?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Prednisona 1 mg/kg/dia (máx 80 mg) por 4–16 semanas com desmame lento; controle rápido de proteinúria é esperado em >80% dos casos",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "B",
    explanation: "Lesão mínima do adulto responde bem a corticoide mas com maior recidiva que em criança. Rituximabe/ICN em recidivas frequentes. Pearl: sempre pesquise fármacos (AINE) e neoplasias como causa secundária de LM em adultos. Gabarito detalhado: Prednisona 1 mg/kg/dia (máx 80 mg) por 4–16 semanas com desmame lento; controle rápido de proteinúria é esperado em >80% dos casos; nefroproteção + anticoagulação profilática se albumina <2,5 g/dL com risco",
    bibliography: "KDIGO Glomerular 2021."
  },
  {
    id: "NA-T024",
    tema: "C3 glomerulopatia",
    subtema: "Diagnóstico",
    dificuldade: "avancado",
    age: 45,
    vars: {
      c3: 30,
      c4: 20
    },
    statement: "{{sexWord}} de {{age}} com síndrome nefrótica/nefrítica persistente, C3 {{c3}} baixo por >6 meses, C4 {{c4}} normal; biópsia com depósitos exclusivos de C3 sem imunoglobulinas. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "C3 glomerulopatia (GN por C3 ou doença de depósitos densos): investigar fator nefrítico C3, mutações no complemento, disproteinemia; nefroproteção; MMF em selecionados",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "C3 baixo persistente + IF só C3 = C3G. Rastrear gamopatia monoclonal em >50 anos. Pearl: C3 baixo por >12 semanas depois de \"GNPE\" não é GNPE. Gabarito detalhado: C3 glomerulopatia (GN por C3 ou doença de depósitos densos): investigar fator nefrítico C3, mutações no complemento, disproteinemia; nefroproteção; MMF em selecionados; ensaios com inibidores do complemento (iptacopan — APPEAR trial)",
    bibliography: "Smith RJH et al., C3G consensus; APPEAR trial."
  },
  {
    id: "NA-T025",
    tema: "Glomerulopatia",
    subtema: "Mieloma / cast nephropathy",
    dificuldade: "avancado",
    age: 71,
    vars: {
      cr: 4.8,
      ca: 12.2
    },
    statement: "{{sexWord}} de {{age}} com anemia, dor óssea, hipercalcemia (Ca {{ca}}) e LRA (creatinina {{cr}}); gap protéico aumentado, imunofixação com pico monoclonal IgG kappa. Qual é a melhor conduta nefrológica?",
    options: {
      A: "Nefropatia por cadeias leves (cast nephropathy): hidratação, corrigir hipercalcemia (SF + calcitonina + bisfosfonado ou denosumabe se DRC grave, cuidado), evitar nefrotóxicos e contraste, iniciar.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Mieloma: cast nephropathy é a nefropatia mais comum; MIDD e amiloidose AL também. Diagnóstico rápido + terapia do clone salvam néfrons. Pearl: LRA + hiperCa + gap protéico = pense mieloma. Gabarito detalhado: Nefropatia por cadeias leves (cast nephropathy): hidratação, corrigir hipercalcemia (SF + calcitonina + bisfosfonado ou denosumabe se DRC grave, cuidado), evitar nefrotóxicos e contraste, iniciar terapia do clone (bortezomibe + dexametasona) — HD com filtros de alto cut-off é opção em casos selecionados; considerar plasmaférese pouco efetiva isoladamente",
    bibliography: "IMWG; Onco-nephrology reviews."
  },
  {
    id: "NA-T026",
    tema: "Amiloidose renal",
    subtema: "AL",
    dificuldade: "avancado",
    age: 65,
    vars: {
      prot: 6.5
    },
    statement: "{{sexWord}} de {{age}} com SN, macroglossia, síndrome do túnel do carpo bilateral, cardiomiopatia com padrão restritivo e proteinúria {{prot}}. Cadeia leve livre lambda elevada. Qual é a melhor conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Amiloidose AL: confirmar com biópsia (gordura ou órgão-alvo) com Vermelho Congo e tipagem por imunofluorescência/espectrometria",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação"
    },
    correct: "C",
    explanation: "Amiloidose AL: tratar o clone com regime bortezomibe + daratumumabe + ciclofosfamida + dexametasona (VCd + Dara) — ANDROMEDA aumentou resposta hematológica e cardíaca. Pearl: cadeia leve livre + órgãos = biópsia com Congo. Gabarito detalhado: Amiloidose AL: confirmar com biópsia (gordura ou órgão-alvo) com Vermelho Congo e tipagem por imunofluorescência/espectrometria; encaminhar à hematologia para terapia do clone (CyBorD ± daratumumabe — ANDROMEDA trial); nefroproteção e cuidados de suporte",
    bibliography: "ANDROMEDA (NEJM 2021); Mayo AL staging."
  },
  {
    id: "NA-T027",
    tema: "Diálise peritoneal",
    subtema: "Peritonite",
    dificuldade: "basico",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em CAPD há 3 anos chega com dor abdominal e efluente peritoneal turvo há 8 h. Qual é a conduta imediata mais indicada?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      B: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Coletar efluente para contagem celular (leucócitos >100/µL com >50% PMN define peritonite), Gram e cultura em frasco de hemocultura",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "D",
    explanation: "ISPD guideline: diagnóstico + ATB IP precoce. Peritonite fúngica exige remoção. Manter efluente rico em nutrientes (perde proteína — reponha albumina/dieta). Pearl: ATB IP tem farmacocinética diferente do EV. Gabarito detalhado: Coletar efluente para contagem celular (leucócitos >100/µL com >50% PMN define peritonite), Gram e cultura em frasco de hemocultura; iniciar antibiótico intraperitoneal empírico cobrindo Gram+/Gram– (cefazolina + ceftazidima ou vancomicina + ceftazidima) por 14–21 dias; considerar remoção do cateter em falha, infecção fúngica, S. aureus grave ou refratária",
    bibliography: "ISPD peritonitis recommendations 2022."
  },
  {
    id: "NA-T028",
    tema: "Diálise peritoneal",
    subtema: "UF failure",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP há 5 anos apresenta congestão persistente, UF diminuindo em bolsas de longa permanência com icodextrina. Qual exame deve ser solicitado a seguir?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "Investigar falência da UF por PET (peritoneal equilibrium test); pode mostrar padrão hiper-transportador (transporte rápido de soluto/edema)"
    },
    correct: "E",
    explanation: "UF loss em DP: causa mais comum é hiper-transportador; icodextrina ajuda; PET direciona represcrição. Pearl: peritonite encapsulante é rara mas letal. Gabarito detalhado: Investigar falência da UF por PET (peritoneal equilibrium test) — pode mostrar padrão hiper-transportador (transporte rápido de soluto/edema); considerar peritonite prévia com peritônio esclerosante, hérnias/leaks, e reajustar prescrição (icodextrina, trocas mais curtas, adicionar HD); considerar peritonite encapsulante em quadros extremos",
    bibliography: "ISPD adequacy 2020."
  },
  {
    id: "NA-T029",
    tema: "Hemodiálise",
    subtema: "FAV como acesso preferido",
    dificuldade: "basico",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} pré-dialítico(a) com TFG em queda progressiva. Qual é o acesso vascular preferível a longo prazo?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Fístula arteriovenosa nativa (radiocefálica se anatomia permitir; braquiocefálica ou braquiobasílica alternativas) planejada com maturação prévia; cateter tunelizado apenas como ponte",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "FAV tem menor infecção, trombose e mortalidade que cateter. Planejar cedo com mapeamento venoso. Pearl: \"fistula-first\" continua válido; life-plan personalizada moderna (ESKD Life-Plan).",
    bibliography: "KDOQI Vascular Access 2019."
  },
  {
    id: "NA-T030",
    tema: "Hemodiálise",
    subtema: "Adequação (Kt/V)",
    dificuldade: "intermediario",
    age: 66,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD 3×/semana com Kt/V spKt/V 1,1 e sintomas urêmicos residuais. Qual é a melhor conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Aumentar imunossupressão empiricamente sem biópsia nem níveis, diante de qualquer elevação de creatinina Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Aumentar dose de diálise (Kt/V spKt/V alvo ≥1,4 por sessão em HD 3×/semana; ajustar tempo de sessão, fluxo de dialisado/sangue e superfície do dialisador)"
    },
    correct: "E",
    explanation: "Kt/V baixo → tempo, fluxo, superfície, acesso. HDF online reduz mortalidade em CONVINCE. Pearl: subdialisar mata. Gabarito detalhado: Aumentar dose de diálise (Kt/V spKt/V alvo ≥1,4 por sessão em HD 3×/semana; ajustar tempo de sessão, fluxo de dialisado/sangue e superfície do dialisador); investigar recirculação de acesso, mau posicionamento de cateter, tempo real de tratamento; considerar HD mais frequente ou hemodiafiltração online (CONVINCE)",
    bibliography: "KDOQI HD adequacy; CONVINCE trial 2023."
  },
  {
    id: "NA-T031",
    tema: "Hemodiálise",
    subtema: "Bacteremia por cateter",
    dificuldade: "intermediario",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD com cateter tunelizado apresenta febre e calafrios em sessão; hemoculturas positivas para S. aureus. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na.",
      E: "Iniciar vancomicina + gentamicina (ajustada) empírica, adequar conforme cultura"
    },
    correct: "E",
    explanation: "S. aureus em cateter: remoção geralmente indicada, tempo prolongado, ecocardio; Gram– pode tentar salvar com lock. Pearl: S. aureus + cateter tunelizado + febre = remover. Gabarito detalhado: Iniciar vancomicina + gentamicina (ajustada) empírica, adequar conforme cultura; para S. aureus, geralmente REMOVER o cateter (biofilme + risco de endocardite/spondilodiscite), fazer ecocardiograma, considerar duração prolongada de ATB (4–6 semanas); reintrodução do acesso planejada",
    bibliography: "IDSA catheter-related infections; KDOQI."
  },
  {
    id: "NA-T032",
    tema: "Modalidade de TSR em UTI",
    subtema: "CRRT x SLED x HD",
    dificuldade: "intermediario",
    age: 61,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em UTI com LRA, instabilidade hemodinâmica moderada, hospital sem CRRT disponível. Qual é a melhor estratégia terapêutica?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "SLED/PIRRT (sessão prolongada 6–12 h, fluxos menores); melhor tolerância hemodinâmica que HD curta e desfechos equivalentes à CRRT em vários estudos, útil quando CRRT indisponível"
    },
    correct: "E",
    explanation: "SLED/PIRRT é híbrido excelente em UTI. Pearl: quanto maior o tempo, menor o shift osmótico e hemodinâmico.",
    bibliography: "PIRRT/SLED reviews."
  },
  {
    id: "NA-T033",
    tema: "HAS",
    subtema: "Estenose de artéria renal",
    dificuldade: "intermediario",
    age: 72,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS resistente, edema agudo de pulmão \"flash\" recorrente e piora da TFG após início de IECA; US Doppler sugere estenose aterosclerótica bilateral. Qual é a melhor conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Otimização clínica agressiva (múltiplos anti-hipertensivos, estatina, AAS), reservar revascularização (angioplastia com stent) apenas para casos selecionados",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "CORAL/ASTRAL desmistificaram angioplastia rotineira. Reservar para \"flash EAP\", HAS refratária, perda de função. Pearl: azotemia com IECA em bilateral = pensar estenose. Gabarito detalhado: Otimização clínica agressiva (múltiplos anti-hipertensivos, estatina, AAS), reservar revascularização (angioplastia com stent) apenas para casos selecionados — EAP flash recorrente, HAS incontrolável apesar de terapia máxima, perda progressiva de função renal — pois CORAL e ASTRAL mostraram que revascularização rotineira não supera clínica",
    bibliography: "CORAL (NEJM 2014); ASTRAL."
  },
  {
    id: "NA-T034",
    tema: "HAS",
    subtema: "Aldosteronismo primário",
    dificuldade: "intermediario",
    age: 36,
    vars: {
      k: 2.9
    },
    statement: "{{sexWord}} de {{age}} com HAS de início recente, K {{k}} espontaneamente baixo, alcalose leve, aldosterona plasmática elevada e renina plasmática suprimida (relação aldo/renina alta). Qual é o diagnóstico mais provável e o próximo passo?",
    options: {
      A: "Hiperaldosteronismo primário: confirmar com teste de supressão (sobrecarga salina, captopril ou fludrocortisona), depois localizar (TC de adrenais e/ou cateterismo de veias adrenais em >35 anos ou lesão duvidosa)",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "HAS + hipoK + relação aldo/renina alta = rastreio positivo; confirmar antes de imagem/tratamento. Cateterismo de adrenais é padrão-ouro para lateralizar. Pearl: rastreie PA hyperaldo em toda HAS resistente/precoce/hipoK. Gabarito detalhado: Hiperaldosteronismo primário: confirmar com teste de supressão (sobrecarga salina, captopril ou fludrocortisona), depois localizar (TC de adrenais e/ou cateterismo de veias adrenais em >35 anos ou lesão duvidosa); adrenalectomia se lateralizado ou espironolactona/eplerenona se bilateral",
    bibliography: "Endocrine Society PA guideline 2016."
  },
  {
    id: "NA-T035",
    tema: "HAS",
    subtema: "Resistente / MAPA",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com HAS em uso de 3 anti-hipertensivos (IECA, tiazídico e BCC) em doses adequadas, sem controle no consultório. Qual exame ou conduta deve ser solicitado a seguir?",
    options: {
      A: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Confirmar HAS resistente com MAPA (excluir \"do jaleco\" e não-adesão), avaliar causas secundárias (aldosteronismo, SAOS, doença renal, drogas",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor.",
      E: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses"
    },
    correct: "B",
    explanation: "PATHWAY-2 mostrou espironolactona 25–50 mg como 4º fármaco superior. MAPA reduz sobretratamento. Pearl: pseudo-resistência (não-adesão, técnica errada) é a mais comum. Gabarito detalhado: Confirmar HAS resistente com MAPA (excluir \"do jaleco\" e não-adesão), avaliar causas secundárias (aldosteronismo, SAOS, doença renal, drogas — AINE, corticoide, simpaticomiméticos), reforçar aderência, reduzir sal e adicionar antagonista mineralocorticoide (espironolactona) — evidência PATHWAY-2 mostra ser o 4º fármaco mais eficaz",
    bibliography: "PATHWAY-2; ESC/ESH 2023; ACC/AHA 2017."
  },
  {
    id: "NA-T036",
    tema: "HAS",
    subtema: "Alvos em DRC",
    dificuldade: "basico",
    age: 60,
    vars: {
      tfg: 45
    },
    statement: "{{sexWord}} de {{age}} com DRC (TFG {{tfg}}), UACR 60 mg/g, sem diabetes. Qual alvo pressórico?",
    options: {
      A: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "SBP <120 mmHg em medida padronizada quando tolerado (KDIGO 2021 baseada em SPRINT), com individualização em idosos frágeis e monitorização de hipotensão ortostática/eventos adversos",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "KDIGO 2021 adotou alvo SBP <120 mmHg baseado em SPRINT (com medida padronizada, atenção — não é a mesma coisa que consultório normal). Individualizar. Pearl: a medida importa tanto quanto o número.",
    bibliography: "KDIGO CKD BP 2021; SPRINT."
  },
  {
    id: "NA-T037",
    tema: "HAS",
    subtema: "Crise hipertensiva",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      sbp: 220,
      dbp: 130
    },
    statement: "{{sexWord}} de {{age}} com PA {{sbp}}×{{dbp}}, cefaleia intensa, borramento visual, edema de papila e LRA aguda (creatinina 2,5, basal 1,0). Qual é a melhor conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Emergência hipertensiva (lesão de órgão-alvo): internar em UTI, reduzir PA em 20–25% na primeira hora, então gradualmente (fármacos parenterais; nitroprussiato, labetalol, nicardipina)",
      C: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Redução súbita causa isquemia (cérebro, rim, retina). Sublingual de nifedipina é obsoleto. Pearl: PA lentamente + monitor. Gabarito detalhado: Emergência hipertensiva (lesão de órgão-alvo): internar em UTI, reduzir PA em 20–25% na primeira hora, então gradualmente (fármacos parenterais — nitroprussiato, labetalol, nicardipina); investigar causas secundárias, monitorar TFG, retina, neurologia",
    bibliography: "ESC/ESH; ACC/AHA."
  },
  {
    id: "NA-T038",
    tema: "Distúrbios",
    subtema: "Hipercalemia grave",
    dificuldade: "basico",
    age: 70,
    vars: {
      k: 7
    },
    statement: "{{sexWord}} de {{age}} com DRC avançada, K {{k}} mEq/L e ECG com ondas T apiculadas + alargamento QRS. Qual sequência?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "ANTAGONIZAR o efeito de membrana com gluconato de cálcio 10% 10–20 mL IV lento (repetir se necessário) → DESLOCAR K para intracelular (insulina + glicose, β2-agonista nebulizado,…",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Cálcio estabiliza membrana, não reduz K sérico. Patiromer/ZS-9 são novas resinas melhor toleradas. Pearl: cálcio protege coração, insulina abaixa K, diálise resolve refratária. Gabarito detalhado: ANTAGONIZAR o efeito de membrana com gluconato de cálcio 10% 10–20 mL IV lento (repetir se necessário) → DESLOCAR K para intracelular (insulina + glicose, β2-agonista nebulizado, bicarbonato se acidose) → REMOVER K (resina como patiromer/ciclossilicato de zircônio + furosemida ou diálise se refratária)",
    bibliography: "Kidney Int hyperkalemia; UpToDate."
  },
  {
    id: "NA-T039",
    tema: "Distúrbios",
    subtema: "Acidose metabólica de alto gap",
    dificuldade: "intermediario",
    age: 40,
    vars: {
      ph: 7.18,
      hco3: 10,
      gap: 28
    },
    statement: "{{sexWord}} de {{age}} inconsciente, pH {{ph}}, HCO₃ {{hco3}}, ânion gap {{gap}}, osmolar gap elevado, hálito peculiar. Qual hipótese e conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Intoxicação por álcool tóxico (metanol/etilenoglicol): antídoto com fomepizol (ou etanol em falta), corrigir acidose com bicarbonato, considerar cofatores (folato para metanol,…",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Alto gap + osmolar gap elevado = álcool tóxico. Metanol → oftálmico (cegueira); etilenoglicol → renal (oxalato) + cardio. Fomepizol e HD são pilares. Pearl: sempre calcule ambos os gaps. Gabarito detalhado: Intoxicação por álcool tóxico (metanol/etilenoglicol): antídoto com fomepizol (ou etanol em falta), corrigir acidose com bicarbonato, considerar cofatores (folato para metanol, tiamina/piridoxina para etilenoglicol) e hemodiálise para remoção do álcool + metabólitos tóxicos + correção de acidose",
    bibliography: "AACT/EAPCCT recommendations; UpToDate."
  },
  {
    id: "NA-T040",
    tema: "Distúrbios",
    subtema: "Acidose gap normal",
    dificuldade: "intermediario",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com acidose metabólica hiperclorêmica gap normal. Diferencie ATR distal, proximal e IV.",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "ATR distal (tipo 1): pH urinário >5,5 com acidemia, hipoK, nefrocalcinose. ATR proximal (tipo 2): perda de HCO₃ (bicarbonatúria), síndrome de Fanconi comum, pH urinário ácido ao chegar a…"
    },
    correct: "E",
    explanation: "Cada tipo tem sua \"assinatura\" bioquímica: distal (tipo 1) — pH urinário >5,5 na acidemia, hipoK, nefrocalcinose e litíase; proximal (tipo 2) — bicarbonatúria e síndrome de Fanconi (glicosúria, aminoacidúria, fosfatúria); tipo 4 (hipoaldosteronismo hiporreninêmico) — acidose leve com hipercalemia, ligada a DM, nefropatia obstrutiva, IECA/BRA, antagonistas mineralocorticoides. A é errado porque a distal cursa com hipoK. D é errado porque a tipo 4 tem hiperK. E não faz sentido bioquímico. Pearl: em adulto com DRC/DM, ATR tipo 4 é a mais frequente. Gabarito detalhado: ATR distal (tipo 1): pH urinário >5,5 com acidemia, hipoK, nefrocalcinose. ATR proximal (tipo 2): perda de HCO₃ (bicarbonatúria), síndrome de Fanconi comum, pH urinário ácido ao chegar a limiar baixo. ATR tipo 4: hipercalemia + acidose leve por hipoaldosteronismo (DM, IECA, obstrução, HIV, doença tubulointersticial)",
    bibliography: "Rose & Post."
  },
  {
    id: "NA-T041",
    tema: "Distúrbios",
    subtema: "Alcalose metabólica",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      hco3: 38,
      k: 3
    },
    statement: "{{sexWord}} de {{age}} em uso de furosemida, HCO₃ {{hco3}}, K {{k}}, Cl 92. Qual mecanismo e conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Alcalose metabólica salino-responsiva (perda de volume + hipoK por diurético): repor NaCl + KCl, ajustar diurético; medir Cl urinário; Cl urinário baixo (<20) sugere responsiva a NaCl",
      C: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Diurético clássico gera alcalose por perda de Cl e contração; hipoK piora. Cl urinário diferencia salino-responsiva (baixa) de resistente (alta — hiperaldosteronismo, Bartter/Gitelman). Pearl: dose Cl urinário sempre.",
    bibliography: "UpToDate; Rose & Post."
  },
  {
    id: "NA-T042",
    tema: "Distúrbios",
    subtema: "Hiponatremia — SIADH",
    dificuldade: "intermediario",
    age: 66,
    vars: {
      na: 122
    },
    statement: "{{sexWord}} de {{age}} com Ca de pulmão, euvolêmico(a), Na {{na}}, osmolaridade sérica baixa, osmolaridade urinária inapropriadamente alta, sódio urinário >30, TSH e cortisol normais. Qual é o diagnóstico mais provável e o tratamento mais indicado?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "SIADH paraneoplásico: tratar causa; restrição hídrica primária (500–1000 mL/dia); NaCl 3% se sintomas neurológicos graves (correção não superior a 8–10 mEq/L nas primeiras 24 h)",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "SF pode piorar SIADH (paradoxo da osmolaridade urinária alta). Corrigir cuidadosamente. Pearl: correção >10 mEq/L/24 h = risco de mielinólise pontina. Gabarito detalhado: SIADH paraneoplásico: tratar causa; restrição hídrica primária (500–1000 mL/dia); NaCl 3% se sintomas neurológicos graves (correção não superior a 8–10 mEq/L nas primeiras 24 h); tolvaptano (vaptanos) em selecionados; monitorar cuidadosamente para evitar desmielinização osmótica",
    bibliography: "European hyponatremia guideline 2014."
  },
  {
    id: "NA-T043",
    tema: "Distúrbios",
    subtema: "Hipernatremia por DI",
    dificuldade: "avancado",
    age: 55,
    vars: {
      na: 156
    },
    statement: "{{sexWord}} de {{age}} em uso crônico de lítio apresenta poliúria, polidipsia, Na {{na}}, osmolaridade urinária baixa; após desmopressina, sem concentração urinária. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "DI nefrogênico induzido por lítio: reduzir/suspender lítio se possível em conjunto com psiquiatria, hidratação livre, dieta baixa em soluto, tiazídico + amilorida (reduz volume urinário.",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Lítio é a causa mais comum de DI nefrogênico adquirido. Amilorida bloqueia o ENaC — reduz entrada de Li no tubo coletor. Pearl: DDAVP não funciona no nefrogênico.",
    bibliography: "UpToDate; NDI reviews."
  },
  {
    id: "NA-T044",
    tema: "Distúrbios",
    subtema: "Hipercalcemia",
    dificuldade: "intermediario",
    age: 68,
    vars: {
      ca: 14
    },
    statement: "{{sexWord}} de {{age}} com Ca {{ca}} mg/dL, PTH suprimido, PTHrp alto, imagem pulmonar suspeita. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Hipercalcemia da malignidade: hidratação vigorosa com SF 200–300 mL/h (ajuste conforme função cardíaca), bisfosfonado IV (zoledronato) ou denosumabe (preferido em DRC grave, cuidado com hipoCa."
    },
    correct: "E",
    explanation: "Ordem: hidratar → bisfosfonado/denosumabe → calcitonina → diálise se refratário. Pearl: em DRC avançada, denosumabe é preferido, mas atenção à hipoCa.",
    bibliography: "Endocrine Society."
  },
  {
    id: "NA-T045",
    tema: "Distúrbios",
    subtema: "Hipomagnesemia por IBP/diurético",
    dificuldade: "basico",
    age: 60,
    vars: {
      mg: 1,
      k: 3
    },
    statement: "{{sexWord}} de {{age}} em uso crônico de omeprazol e furosemida apresenta hipoK {{k}} refratária a reposição, Mg {{mg}}. Qual é a melhor conduta?",
    options: {
      A: "Corrigir Mg primeiro (via oral se leve, IV em sintomático — reposição lenta), rever necessidade do IBP; sem Mg adequado, hipoK persiste (Mg controla ROMK)",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "IBP crônico (por bloqueio do transporte intestinal de magnésio) somado a diurético de alça (que aumenta perdas urinárias de Mg) resulta em hipomagnesemia clinicamente relevante. Sem magnésio suficiente, o canal ROMK do néfron distal permanece aberto e a excreção de potássio se perpetua — daí a hipocalemia refratária à reposição de KCl. A conduta é repor magnésio (via oral em quadros leves ou IV lento em sintomáticos), revisar necessidade do IBP e outros fármacos, e reintroduzir K depois. Pearl: hipoK refratária sempre exige dosagem de Mg.",
    bibliography: "Rose & Post."
  },
  {
    id: "NA-T046",
    tema: "Litíase",
    subtema: "Metabólica — oxalato de cálcio",
    dificuldade: "intermediario",
    age: 38,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com cálculos recorrentes de oxalato de cálcio; investigação urinária de 24 h: hipocitratúria e volume urinário 1,2 L/dia, sem hipercalciúria, PTH normal. Qual é a melhor conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Aumentar volume urinário para ≥2,5–3 L/dia (aumentar ingesta hídrica), citrato de potássio para corrigir hipocitratúria, manter cálcio dietético normal (restringir aumenta absorção de…",
      C: "Indicar nefrectomia eletiva como primeira linha em cálculo único não obstrutivo com função preservada Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Hidratação + citrato + moderar sal e proteína. Restrição de cálcio ↑ oxalato (paradoxo). Pearl: cortar sal, não cálcio. Gabarito detalhado: Aumentar volume urinário para ≥2,5–3 L/dia (aumentar ingesta hídrica), citrato de potássio para corrigir hipocitratúria, manter cálcio dietético normal (restringir aumenta absorção de oxalato), reduzir sódio (<2,3 g/dia) e proteína animal",
    bibliography: "AUA/EAU urolithiasis."
  },
  {
    id: "NA-T047",
    tema: "Litíase",
    subtema: "Ácido úrico",
    dificuldade: "basico",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} obeso com síndrome metabólica, cálculo de ácido úrico rádio-transparente; pH urinário 5,2. Qual é a melhor conduta?",
    options: {
      A: "Alcalinização urinária com citrato de potássio (alvo pH urinário 6,5–7,0) para dissolver e prevenir; hidratação; considerar alopurinol se hiperuricemia/hiperuricosúria",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar tiopronina empiricamente em todo cálculo radiotransparente, sem caracterizar a composição Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Ácido úrico se cristaliza em pH baixo. Alcalinizar dissolve. Pearl: cálculo radiotransparente com pH ácido = ácido úrico.",
    bibliography: "AUA/EAU."
  },
  {
    id: "NA-T048",
    tema: "Litíase",
    subtema: "Cálculo obstrutivo infectado",
    dificuldade: "intermediario",
    age: 57,
    vars: {

    },
    statement: "Homem com febre, dor no flanco, urocultura positiva, TC com cálculo ureteral obstrutivo com hidronefrose. Qual é a melhor conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Emergência urológica: ATB EV empírico de amplo espectro + desobstrução urgente (cateter duplo J ou nefrostomia percutânea), controle da sepse antes de qualquer litotripsia",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar apenas analgésico e observação, sem metafiilaxia nem ajuste do pH urinário quando indicado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Pielonefrite obstrutiva = urgência: fonte fechada → drenar. Cirurgia definitiva depois. Pearl: infecção + obstrução = drenar já.",
    bibliography: "IDSA urosepsis; AUA."
  },
  {
    id: "NA-T049",
    tema: "ADPKD",
    subtema: "Tolvaptano",
    dificuldade: "intermediario",
    age: 42,
    vars: {
      tfg: 55
    },
    statement: "{{sexWord}} de {{age}} com ADPKD, TFG {{tfg}}, rins muito aumentados (volume renal total mais elevado que Mayo classe 1D), progressão rápida documentada. Qual terapia específica?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência.",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor.",
      D: "Tolvaptano (antagonista V2) em pacientes ADPKD elegíveis (TFG >25 e classificação de risco alta); reduz taxa de queda de TFG (TEMPO 3:4, REPRISE)",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "D",
    explanation: "TEMPO 3:4 e REPRISE demonstraram benefício. Hepatotoxicidade exige monitor. Pearl: HALT-PKD1 mostrou PA <110/75 melhor em jovens ADPKD com TFG preservada. Gabarito detalhado: Tolvaptano (antagonista V2) em pacientes ADPKD elegíveis (TFG >25 e classificação de risco alta) — reduz taxa de queda de TFG (TEMPO 3:4, REPRISE); monitorar hepatotoxicidade e manejar sede/poliúria; associar controle rigoroso de PA (<110/75 em jovens), hidratação, dieta baixa em sódio e cafeína moderada",
    bibliography: "KDIGO ADPKD 2024; TEMPO 3:4; REPRISE; HALT-PKD."
  },
  {
    id: "NA-T050",
    tema: "Transplante renal",
    subtema: "Rejeição x infecção",
    dificuldade: "avancado",
    age: 45,
    vars: {
      cr0: 1.2,
      cr1: 2.3
    },
    statement: "Receptor de transplante renal há 6 meses, creatinina de {{cr0}} para {{cr1}}, febre baixa e leucopenia. Qual é a melhor conduta?",
    options: {
      A: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Dosar níveis dos imunossupressores, PCR quantitativa para CMV e BK, urinálise, US Doppler do enxerto, biópsia do enxerto quando rejeição é diferencial",
      E: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Disfunção do enxerto tem diferencial amplo. Biópsia é fundamental. Pearl: BK pode mimetizar rejeição — só biópsia diferencia. Gabarito detalhado: Dosar níveis dos imunossupressores, PCR quantitativa para CMV e BK, urinálise, US Doppler do enxerto, biópsia do enxerto quando rejeição é diferencial — biópsia é padrão-ouro para diferenciar rejeição celular (Banff), humoral (DSA + histologia), toxicidade por ICN e nefropatia por BK",
    bibliography: "KDIGO Transplant Recipients; AST/ISN."
  },
  {
    id: "NA-T051",
    tema: "Transplante renal",
    subtema: "Rejeição humoral (AMR)",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "Transplantada com creatinina em alta, DSA positivo, biópsia com Banff mostrando C4d+ e capilarite peritubular. Qual é a melhor conduta?",
    options: {
      A: "Rejeição mediada por anticorpo (AMR): pulso de corticoide, plasmaférese + imunoglobulina EV, rituximabe (evidência variável), bortezomibe/eculizumabe em casos selecionados/refratários",
      B: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "AMR: PLEX + IVIG são pilares. Rituximabe, bortezomibe e eculizumabe (contra C5) em falha. Pearl: DSA de novo com C4d+ e MVI = AMR ativa. Gabarito detalhado: Rejeição mediada por anticorpo (AMR): pulso de corticoide, plasmaférese + imunoglobulina EV, rituximabe (evidência variável), bortezomibe/eculizumabe em casos selecionados/refratários; otimizar imunossupressão de manutenção e monitorar DSA",
    bibliography: "KDIGO Transplant; Banff classification."
  },
  {
    id: "NA-T052",
    tema: "Transplante renal",
    subtema: "BK vírus",
    dificuldade: "avancado",
    age: 50,
    vars: {

    },
    statement: "Receptor de transplante renal há 4 meses com creatinina em elevação lenta (de 1,3 para 1,7 mg/dL), sem febre; BK viremia >10 000 cópias/mL em amostra confirmatória, urinálise com decoy cells positivas. Qual é a melhor conduta?",
    options: {
      A: "Reduzir imunossupressão em passos (MPA primeiro, depois inibidor de calcineurina, mantendo mínimo seguro); monitorar viremia e função do enxerto; biópsia se dúvida",
      B: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "A base do manejo da nefropatia por BK é reduzir a imunossupressão de forma escalonada (primeiro MPA, depois inibidor de calcineurina, mantendo alvo mínimo seguro para evitar rejeição), acompanhando viremia semanal/quinzenal e função do enxerto. Aumentar tacrolimus ou nefrectomia é conduta contrária à evidência. Antivirais específicos (leflunomida, cidofovir, brincidofovir) têm evidência fraca e toxicidade — não substituem a redução da IS. Biópsia é indicada quando a creatinina não melhora ou há dúvida com rejeição (SV40+ na imuno-histoquímica confirma BK). Pearl: BK imita rejeição — apenas a biópsia diferencia. Gabarito detalhado: Reduzir imunossupressão em passos (MPA primeiro, depois inibidor de calcineurina, mantendo mínimo seguro); monitorar viremia e função do enxerto; biópsia se dúvida; agentes antivirais têm evidência limitada (leflunomida, cidofovir em desuso)",
    bibliography: "AST BK; KDIGO Transplant."
  },
  {
    id: "NA-T053",
    tema: "Transplante renal",
    subtema: "Toxicidade por calcineurina",
    dificuldade: "intermediario",
    age: 48,
    vars: {

    },
    statement: "Receptor com tremor, cefaleia, HAS, hiperK, hipomagnesemia e creatinina em alta; nível de tacrolimus 18 ng/mL (alvo 5–8). Qual é a melhor conduta?",
    options: {
      A: "Reduzir dose de tacrolimus, investigar interação medicamentosa (azólicos, macrolídeos, diltiazem, suco de toranja), reajustar em alvo e reavaliar função renal e clínica",
      B: "Remover o acesso/cateter em todo episódio febril antes de coletar culturas e iniciar antibiótico dirigido Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Toxicidade típica de tacrolimus é neurotoxicidade + HAS + hipoMg + IRA. Pearl: sempre revisar CYP3A4 (azólicos etc.).",
    bibliography: "KDIGO Transplant."
  },
  {
    id: "NA-T054",
    tema: "Transplante renal",
    subtema: "CMV",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "Receptor D+/R– há 3 meses (fim da profilaxia) com febre, leucopenia, elevação de transaminases e creatinina; PCR CMV alto. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "CMV doença: iniciar valganciclovir/ganciclovir EV em dose ajustada por função renal, reduzir imunossupressão selecionada (dose de MMF), monitorar PCR até negativação, considerar…",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "D+/R– é o cenário de maior risco. Profilaxia por 6 meses. Vigilância pós-profilaxia. Pearl: CMV pode desencadear rejeição — cuidado ao reduzir IS. Gabarito detalhado: CMV doença: iniciar valganciclovir/ganciclovir EV em dose ajustada por função renal, reduzir imunossupressão selecionada (dose de MMF), monitorar PCR até negativação, considerar letermovir/maribavir em falência/resistência (UL97/UL54 mutações)",
    bibliography: "AST CMV consensus; KDIGO Transplant."
  },
  {
    id: "NA-T055",
    tema: "Transplante renal",
    subtema: "Recorrência FSGS",
    dificuldade: "avancado",
    age: 32,
    vars: {

    },
    statement: "Recém-transplantado por FSGS primária apresenta proteinúria maciça 48 h após transplante. Qual é a melhor conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Recorrência de FSGS: plasmaférese diária/em dias alternados + otimização de imunossupressão + rituximabe em selecionados; buscar remissão para preservar o enxerto",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Recorrência ocorre horas–dias pós-Tx em FSGS primária. Plasmaférese remove \"fator circulante\" (suPAR entre outros). Pearl: proteinúria dia 1 pós-Tx em FSGS primária = tratar rápido.",
    bibliography: "AST FSGS recurrence."
  },
  {
    id: "NA-T056",
    tema: "Transplante renal",
    subtema: "Complicações metabólicas (NODAT)",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "Transplantado há 6 meses em uso de tacrolimus e prednisona apresenta hiperglicemia persistente (HbA1c 7,5%). Qual é a melhor conduta?",
    options: {
      A: "NODAT (diabetes pós-transplante): individualizar imunossupressão (reduzir/switch tacrolimus para ciclosporina, reduzir corticoide se possível), iniciar tratamento anti-hiperglicemiante (metformina se.",
      B: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Tacrolimus e corticoides são diabetogênicos. Manejo é multidisciplinar. Pearl: NODAT aumenta mortalidade CV do enxerto.",
    bibliography: "AST NODAT."
  },
  {
    id: "NA-T057",
    tema: "Transplante renal",
    subtema: "Gravidez",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Transplantada renal deseja engravidar há 18 meses do Tx, creatinina 1,0, proteinúria mínima, PA controlada com nifedipina. Qual orientação?",
    options: {
      A: "Aguardar ≥1–2 anos pós-Tx com função estável, ajustar imunossupressão (evitar MMF/MPA; teratogênicos; substituir por azatioprina) antes da concepção",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Planejamento pré-concepcional é essencial. Recomenda-se aguardar ≥1–2 anos após transplante com função estável, proteinúria <0,5 g/dia, PA controlada e sem rejeição recente. Substituir MMF/MPA (embriotóxico e teratogênico — malformações craniofaciais e de membros) por azatioprina antes da concepção; tacrolimus e ciclosporina podem ser mantidos com ajuste de nível (níveis costumam cair durante a gestação por hemodiluição). IECA/BRA e SGLT2i devem ser suspensos; usar metildopa, labetalol ou nifedipina. Pré-natal em centro de alto risco. Pearl: azatioprina é considerada segura; MMF nunca. Gabarito detalhado: Aguardar ≥1–2 anos pós-Tx com função estável, ajustar imunossupressão (evitar MMF/MPA — teratogênicos; substituir por azatioprina) antes da concepção; tacrolimus e ciclosporina podem ser mantidos com ajuste de nível; suspender IECA/BRA e ajustar anti-hipertensivos seguros (metildopa, labetalol, nifedipina); pré-natal em centro de alto risco",
    bibliography: "AST pregnancy in transplant."
  },
  {
    id: "NA-T058",
    tema: "Onconefrologia",
    subtema: "Nefrotoxicidade por cisplatina",
    dificuldade: "basico",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com câncer em quimioterapia com cisplatina apresenta LRA e hipomagnesemia com wasting salino. Qual medida preventiva chave?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Hidratação vigorosa (isotônica pré e pós-cisplatina), reposição de Mg, evitar nefrotóxicos concomitantes (AINE, aminoglicosídeo, contraste), ajustar dose por TFG",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Hidratação é a prevenção mais efetiva. HipoMg pode durar semanas. Pearl: hipomagnesemia tardia é a marca da cisplatina.",
    bibliography: "Onco-nephrology (Perazella MA); ASCO."
  },
  {
    id: "NA-T059",
    tema: "Onconefrologia",
    subtema: "Checkpoint inhibitors",
    dificuldade: "avancado",
    age: 65,
    vars: {
      cr: 2.3
    },
    statement: "{{sexWord}} de {{age}} em uso de pembrolizumabe há 3 meses apresenta LRA (creatinina {{cr}}), sedimento com leucócitos, eosinofilia leve. Sem infecção ativa. Qual é a melhor conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Nefrite intersticial aguda relacionada a ICI (irAE renal): considerar biópsia se dúvida, suspender o ICI, iniciar prednisona 0,5–1 mg/kg/dia com desmame de semanas"
    },
    correct: "E",
    explanation: "ICI nephritis: forma clássica é NIA. Corticoide precoce recupera função em maioria. Pearl: sempre suspeitar em LRA + oncologia recente. Gabarito detalhado: Nefrite intersticial aguda relacionada a ICI (irAE renal): considerar biópsia se dúvida, suspender o ICI, iniciar prednisona 0,5–1 mg/kg/dia com desmame de semanas; reintrodução do ICI em casos selecionados com controle da toxicidade",
    bibliography: "Onco-nephrology consensus; ESMO irAE."
  },
  {
    id: "NA-T060",
    tema: "Onconefrologia",
    subtema: "Síndrome de lise tumoral",
    dificuldade: "avancado",
    age: 60,
    vars: {
      k: 6.5,
      p: 8.5,
      ua: 15
    },
    statement: "{{sexWord}} de {{age}} com linfoma iniciando QT apresenta K {{k}}, P {{p}}, ácido úrico {{ua}}, LDH em rampa e LRA. Qual é a melhor conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      E: "Síndrome de lise tumoral: hidratação vigorosa isotônica (3 L/m²/dia), rasburicase (em risco alto; reduz ácido úrico rapidamente"
    },
    correct: "E",
    explanation: "Cairo-Bishop define SLT. Rasburicase melhor em risco alto; NÃO deve ser usada em G6PD. Pearl: hiperK + hiperP + hiperúrico = SLT até prova em contrário. Gabarito detalhado: Síndrome de lise tumoral: hidratação vigorosa isotônica (3 L/m²/dia), rasburicase (em risco alto — reduz ácido úrico rapidamente; contraindicada em G6PD), NÃO alcalinizar rotineiramente (piora precipitação de fosfato de cálcio); TSR precoce (CRRT) se hiperK refratária, hiperP grave ou sobrecarga",
    bibliography: "Cairo–Bishop; onco-nephrology."
  },
  {
    id: "NA-T061",
    tema: "Rim e gravidez",
    subtema: "Pré-eclâmpsia",
    dificuldade: "intermediario",
    age: 30,
    vars: {
      sbp: 160,
      dbp: 110
    },
    statement: "Gestante de 30 semanas com PA {{sbp}}×{{dbp}}, proteinúria 3+, cefaleia intensa e reflexos vivos. Qual é a melhor conduta?",
    options: {
      A: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Pré-eclâmpsia grave: internar, controle pressórico com anti-hipertensivos seguros na gravidez (labetalol, hidralazina, nifedipina), sulfato de magnésio para profilaxia/tratamento de…"
    },
    correct: "E",
    explanation: "IECA/BRA/SGLT2i são contraindicados na gravidez. MgSO₄ previne eclâmpsia. Pearl: proteinúria + HAS + gravidez = pensa PE. Gabarito detalhado: Pré-eclâmpsia grave: internar, controle pressórico com anti-hipertensivos seguros na gravidez (labetalol, hidralazina, nifedipina), sulfato de magnésio para profilaxia/tratamento de eclâmpsia, avaliar bem-estar fetal e programar interrupção da gestação conforme idade gestacional e critérios de gravidade",
    bibliography: "ACOG; ISSHP."
  },
  {
    id: "NA-T062",
    tema: "Cardio-renal",
    subtema: "Congestão POCUS/VExUS",
    dificuldade: "intermediario",
    age: 70,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} internado(a) com IC descompensada e LRA (creatinina 2,1 mg/dL, basal 1,2). Você deseja diferenciar hipovolemia real de congestão venosa antes de decidir entre volume e diurético. Como POCUS renal + pulmonar + VExUS auxiliam nessa decisão à beira-leito?",
    options: {
      A: "US pulmonar (linhas B), US renal (excluir obstrução), veia cava inferior e VExUS (fluxo hepático, portal, renal) auxiliam a diferenciar hipovolemia real de congestão venosa",
      B: "Priorizar apenas analgesia e observação, postergando o controle pressórico parenteral apesar de dano de órgão Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Manter conduta expectante ambulatorial apesar de critérios de gravidade materno-fetal já estabelecidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "POCUS mudou o cardiorrenal moderno. VExUS gradua congestão venosa. Pearl: dilatação de VCI + fluxo hepático S-menor-que-D + veia portal pulsátil + fluxo renal bifásico = congestão severa. Gabarito detalhado: US pulmonar (linhas B), US renal (excluir obstrução), veia cava inferior e VExUS (fluxo hepático, portal, renal) auxiliam a diferenciar hipovolemia real de congestão venosa; guiar diurético vs volume; VExUS gradua congestão em escores 0–3",
    bibliography: "Beaubien-Souligny W et al.; Nephrology POCUS reviews."
  },
  {
    id: "NA-T063",
    tema: "Cardio-renal",
    subtema: "IECA/BRA em disfunção sistólica",
    dificuldade: "basico",
    age: 68,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com IC-FER e DRC 3 apresenta discreta elevação de creatinina (30% do basal) e K 5,2 após início de IECA. Qual é a melhor conduta?",
    options: {
      A: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      B: "Elevação de creatinina ≤30% e K ≤5,5 mEq/L é ACEITÁVEL após início de IECA/BRA e não é motivo para suspensão; persistir com nefroproteção CV/renal",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência.",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência."
    },
    correct: "B",
    explanation: "A queda inicial da TFG reflete redução da pressão intraglomerular — é proteção. Pearl: não suspenda IECA em pequeno aumento de creatinina; verifique volemia e outros nefrotóxicos. Gabarito detalhado: Elevação de creatinina ≤30% e K ≤5,5 mEq/L é ACEITÁVEL após início de IECA/BRA e não é motivo para suspensão — persistir com nefroproteção CV/renal; se K persistir alto, revisar dieta, considerar patiromer/ZS-9 e adicionar iSGLT2",
    bibliography: "ESC/ACC HF; KDIGO CKD."
  },
  {
    id: "NA-T064",
    tema: "Onconefrologia",
    subtema: "Bisfosfonato",
    dificuldade: "intermediario",
    age: 63,
    vars: {

    },
    statement: "Paciente com metástases ósseas em uso repetido de zoledronato apresenta LRA subaguda com sedimento urinário blando; biópsia mostra GESF colapsante. Qual é a melhor conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender zoledronato; nefroproteção com IECA/BRA, controle de PA; considerar mudança para denosumabe (com cautela de hipoCa em DRC); monitorar TFG e proteinúria",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Zoledronato/pamidronato → GESF colapsante e NTA em altas doses/repetidas. Pearl: LRA em oncologia com bisfosfonato = pensar toxicidade.",
    bibliography: "Perazella MA."
  },
  {
    id: "NA-T065",
    tema: "Nefropatia",
    subtema: "Hepatite C",
    dificuldade: "avancado",
    age: 55,
    vars: {
      c3: 45,
      prot: 3.5
    },
    statement: "{{sexWord}} de {{age}} com HCV crônico apresenta síndrome nefrítica/nefrótica mista, C3 {{c3}}, C4 muito baixo, crioglobulinas positivas, artralgias e púrpura. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      E: "GN membranoproliferativa por crioglobulinemia associada à HCV: terapia antiviral direta (DAA; sofosbuvir/velpatasvir) para HCV é pilar"
    },
    correct: "E",
    explanation: "DAAs revolucionaram: cura viral resolve muitas manifestações. Rituximabe para crioglobulinemia sintomática. Pearl: C4 muito baixo com C3 pouco alterado sugere via clássica ativada — crio/lúpus. Gabarito detalhado: GN membranoproliferativa por crioglobulinemia associada à HCV: terapia antiviral direta (DAA — sofosbuvir/velpatasvir) para HCV é pilar; imunossupressão (rituximabe) em manifestações extra-hepáticas graves e vasculite; plasmaférese em casos com hiperviscosidade/vasculite grave",
    bibliography: "KDIGO HCV; AASLD."
  },
  {
    id: "NA-T066",
    tema: "Nefropatia",
    subtema: "HIV (HIVAN)",
    dificuldade: "intermediario",
    age: 42,
    vars: {
      upcr: 4
    },
    statement: "{{sexWord}} de {{age}} com HIV mal tratado, CD4 baixo, proteinúria UPCR {{upcr}} e biópsia com GESF colapsante clássica. Qual é a melhor conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar IECA em dose máxima na primeira hora da emergência hipertensiva com LRA, sem titulação IV Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Otimizar TARV com supressão viral, IECA/BRA para nefroproteção, corticoide em casos selecionados (baixa evidência), tratar comorbidades; vigilância de progressão",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "TARV é o pilar da HIVAN. IECA reduz progressão. Pearl: HIVAN é doença de \"supressão viral inadequada\".",
    bibliography: "KDIGO HIV."
  },
  {
    id: "NA-T067",
    tema: "Nefropatia",
    subtema: "Nefropatia por lítio crônica",
    dificuldade: "avancado",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em uso de lítio há 20 anos apresenta poliúria/polidipsia, DRC lentamente progressiva com rins pequenos multicísticos à US e proteinúria discreta. Qual é a melhor conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação",
      C: "Nefropatia crônica por lítio: em conjunto com psiquiatria, avaliar substituição (valproato, lamotrigina, quetiapina)",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio"
    },
    correct: "C",
    explanation: "Nefropatia crônica por lítio: nefropatia tubulointersticial e DI nefrogênico. Pearl: rim pequeno multicístico em usuário crônico de lítio = clássico. Gabarito detalhado: Nefropatia crônica por lítio: em conjunto com psiquiatria, avaliar substituição (valproato, lamotrigina, quetiapina) — o lítio pode ser mantido em benefício psiquiátrico dominante com nível mais baixo e monitorização; controle da poliúria com dieta, amilorida/tiazídico; nefroproteção geral, evitar desidratação/AINE",
    bibliography: "Grunfeld JP, Rossert J."
  },
  {
    id: "NA-T068",
    tema: "Nefropatia",
    subtema: "Nefroangiosclerose hipertensiva",
    dificuldade: "basico",
    age: 66,
    vars: {
      tfg: 45,
      uacr: 100
    },
    statement: "{{sexWord}} de {{age}} com HAS de longa data, TFG {{tfg}}, UACR {{uacr}}, sedimento urinário blando, sem outra causa. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Nefroangiosclerose hipertensiva (nefroesclerose): controle rigoroso de PA (KDIGO <120), nefroproteção com IECA/BRA em albuminúria, iSGLT2 em DRC albuminúrica, controle metabólico e CV"
    },
    correct: "E",
    explanation: "Nefroesclerose é diagnóstico de exclusão em HAS de longa data. Tratamento é nefroproteção. Pearl: albuminúria em HAS é fator prognóstico.",
    bibliography: "KDIGO CKD."
  },
  {
    id: "NA-T069",
    tema: "Vasculites",
    subtema: "Esclerodermia — crise renal",
    dificuldade: "avancado",
    age: 47,
    vars: {
      sbp: 210,
      cr: 3.5
    },
    statement: "{{sexWord}} de {{age}} com esclerodermia, PA {{sbp}}, LRA (creatinina {{cr}}), anemia hemolítica microangiopática. Qual é a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Crise renal esclerodérmica: IECA (captopril titulado agressivamente para controle da PA, MESMO com creatinina subindo); é salvamento em síndrome com prognóstico historicamente ruim",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "IECA em SRC muda o desfecho — não pare mesmo com creatinina subindo. Pearl: dose crescente até controlar a PA, aceitar elevação de creatinina.",
    bibliography: "ACR/EULAR scleroderma; Steen VD reviews."
  },
  {
    id: "NA-T070",
    tema: "Vasculites",
    subtema: "Púrpura de IgA no adulto",
    dificuldade: "intermediario",
    age: 35,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com púrpura palpável, artralgia, dor abdominal, sedimento com hematúria dismórfica e proteinúria. Qual é a melhor conduta?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Vasculite IgA (Henoch-Schönlein no adulto; muitas vezes mais grave que em criança): nefroproteção com IECA/BRA, controle de PA"
    },
    correct: "E",
    explanation: "IgA vasculite no adulto exige seguimento renal ativo — pode evoluir a DRC. Pearl: no adulto é geralmente mais agressiva. Gabarito detalhado: Vasculite IgA (Henoch-Schönlein no adulto — muitas vezes mais grave que em criança): nefroproteção com IECA/BRA, controle de PA; imunossupressão (corticoide ± ciclofosfamida/MMF) em nefrite moderada/grave (proteinúria maciça, queda de TFG); biópsia guia terapia",
    bibliography: "KDIGO Glomerular."
  },
  {
    id: "NA-T071",
    tema: "UTI",
    subtema: "Fluidoterapia balanceada",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em UTI com choque séptico de origem abdominal, lactato 5,0 mmol/L, PAM 60 mmHg após noradrenalina em ajuste. Não há contraindicações específicas de eletrólitos. Qual cristaloide de escolha para a ressuscitação inicial na luz das evidências atuais?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Cristaloide balanceado (Ringer lactato, Plasma-Lyte); SMART/BaSICS/PLUS mostraram redução ou tendência a menos LRA/AKI progression comparado a SF 0,9% (que é hiperclorêmico)",
      D: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "SMART, BASICS, PLUS: cristaloides balanceados são preferidos. Amidos aumentam LRA (VISEP, 6S). Pearl: SF 0,9% causa acidose hiperclorêmica. Gabarito detalhado: Cristaloide balanceado (Ringer lactato, Plasma-Lyte) — SMART/BaSICS/PLUS mostraram redução ou tendência a menos LRA/AKI progression comparado a SF 0,9% (que é hiperclorêmico); usar como padrão exceto em contraindicações específicas",
    bibliography: "SMART/BaSICS/PLUS; Surviving Sepsis."
  },
  {
    id: "NA-T072",
    tema: "UTI",
    subtema: "Ajuste de dose por TFG e diálise",
    dificuldade: "intermediario",
    age: 60,
    vars: {
      tfg: 25
    },
    statement: "{{sexWord}} com DRC (TFG {{tfg}}) e sepse por Gram- multirresistente em UTI recebe meropenem. Qual é a melhor conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Ajustar dose ao TFG (dose menor ou intervalo maior conforme referência); em CRRT, doses geralmente MAIORES que em HD (efluente alto); monitorar níveis quando disponível"
    },
    correct: "E",
    explanation: "Sub-dose = falha terapêutica + resistência; overdose = toxicidade (neurotoxicidade do meropenem). Pearl: em CRRT, atenção ao clearance de β-lactâmicos. Gabarito detalhado: Ajustar dose ao TFG (dose menor ou intervalo maior conforme referência); em CRRT, doses geralmente MAIORES que em HD (efluente alto); monitorar níveis quando disponível; considerar infusão prolongada/contínua para maximizar T>MIC",
    bibliography: "KDIGO drug dosing; UpToDate."
  },
  {
    id: "NA-T073",
    tema: "UTI",
    subtema: "Vancomicina AUC-alvo",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "Paciente em UTI com sepse por S. aureus e função renal em alteração recebe vancomicina. Qual estratégia farmacocinética moderna?",
    options: {
      A: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Alvo AUC 400–600 mg·h/L (guia ASHP/IDSA 2020) — mais acurado que \"trough\" para eficácia e menor toxicidade renal; ajustar por função renal e monitorar creatinina",
      C: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "AUC-alvo é padrão-ouro moderno; trough isolado subestima toxicidade. Pearl: vancomicina + piperacilina/tazobactam aumenta risco de LRA (associação clássica).",
    bibliography: "ASHP/IDSA vancomycin 2020."
  },
  {
    id: "NA-T074",
    tema: "CKD-MBD",
    subtema: "Hiperfosfatemia em HD",
    dificuldade: "intermediario",
    age: 59,
    vars: {
      p: 7.2,
      pth: 780
    },
    statement: "{{sexWord}} de {{age}} em HD 3×/semana com fósforo {{p}} mg/dL e PTH {{pth}} pg/mL, sem calcifilaxia. Qual é a melhor estratégia terapêutica?",
    options: {
      A: "Restringir P dietético (>800 mg/dia para <1000), quelantes tomados com refeições (não-cálcicos como sevelamer ou lantânio em risco de calcificação vascular), vitamina D ativa e/ou calcimimético.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Estratégia é multi-fatorial. Sevelamer/lantânio preferíveis quando risco de calcificação. Calcimiméticos reduzem PTH sem elevar Ca. Pearl: quelante só funciona se tomado durante a refeição.",
    bibliography: "KDIGO CKD-MBD 2017/2024 update."
  },
  {
    id: "NA-T075",
    tema: "CKD-MBD",
    subtema: "Calcifilaxia",
    dificuldade: "avancado",
    age: 65,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD com lesões cutâneas necróticas dolorosas em coxas e abdome, produto Ca×P elevado, uso crônico de varfarina. Qual é a melhor conduta?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Calcifilaxia (arteriolopatia calcificante urêmica): multidisciplinar — tiossulfato de sódio IV, otimizar CKD-MBD (baixo Ca, quelantes não-cálcicos, cinacalcete), substituir varfarina por…",
      D: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Calcifilaxia tem alta mortalidade. Tiossulfato + otimização MBD + suspensão de varfarina + cuidado de ferida. Pearl: dor cutânea desproporcional em dialítico + úlceras = calcifilaxia. Gabarito detalhado: Calcifilaxia (arteriolopatia calcificante urêmica): multidisciplinar — tiossulfato de sódio IV, otimizar CKD-MBD (baixo Ca, quelantes não-cálcicos, cinacalcete), substituir varfarina por outro anticoagulante quando possível (a varfarina inibe proteínas dependentes de vitamina K envolvidas na proteção contra calcificação), cuidado com feridas, analgesia adequada e paratireoidectomia em selecionados",
    bibliography: "KDIGO CKD-MBD; Nigwekar SU reviews."
  },
  {
    id: "NA-T076",
    tema: "Anemia",
    subtema: "ESA e ferro em DRC",
    dificuldade: "basico",
    age: 64,
    vars: {
      hb: 8.7,
      ferritina: 300,
      tsat: 18
    },
    statement: "{{sexWord}} de {{age}} em HD, Hb {{hb}}, ferritina {{ferritina}}, TSAT {{tsat}}%. Qual é a melhor conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Otimizar ferro (TSAT alvo ≥20–30% e ferritina 200–500 em HD conforme KDIGO), preferencialmente ferro EV em HD; iniciar/ajustar ESA com alvo Hb 10–11,5 g/dL (evitar >13 pelo risco CV",
      D: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Corrigir ferro antes/junto com ESA. Alvo Hb moderado (10–11,5). Novos agentes: HIF-PHi (daprodustate, roxadustate) — orais, resposta em inflamação. Pearl: transfusão sensibiliza para Tx futuro. Gabarito detalhado: Otimizar ferro (TSAT alvo ≥20–30% e ferritina 200–500 em HD conforme KDIGO), preferencialmente ferro EV em HD; iniciar/ajustar ESA com alvo Hb 10–11,5 g/dL (evitar >13 pelo risco CV — CHOIR/TREAT); avaliar deficiências (folato, B12), inflamação, causas de perda",
    bibliography: "KDIGO anemia; CHOIR/TREAT."
  },
  {
    id: "NA-T077",
    tema: "Plasmaférese",
    subtema: "Indicações renais",
    dificuldade: "intermediario",
    age: 40,
    vars: {

    },
    statement: "Qual cenário nefrológico tem forte indicação (categoria I ASFA) para plasmaférese terapêutica?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Doença anti-MBG com hemorragia alveolar ou creatinina moderadamente elevada; PTT com ADAMTS13 <10%; síndrome hepatorrenal; não indicado",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "C",
    explanation: "ASFA classifica indicações. Anti-MBG é I; ANCA seletiva (PEXIVAS mudou); PTT/aHUS variantes; FSGS recorrente pós-Tx. Pearl: PLEX não é para \"toda glomerulopatia\". Gabarito detalhado: Doença anti-MBG com hemorragia alveolar ou creatinina moderadamente elevada; PTT com ADAMTS13 <10%; síndrome hepatorrenal — não indicado; alguns cenários de vasculite ANCA grave (creatinina muito alta com diálise ou hemorragia alveolar difusa, revisado após PEXIVAS); recorrência precoce de FSGS pós-transplante",
    bibliography: "ASFA guidelines 2023; PEXIVAS."
  },
  {
    id: "NA-T078",
    tema: "Anticoagulação",
    subtema: "DOAC em DRC",
    dificuldade: "intermediario",
    age: 72,
    vars: {
      tfg: 30
    },
    statement: "{{sexWord}} de {{age}} com FA e DRC 3b (TFG {{tfg}}), sem AVC prévio, sem alto sangramento; considerando anticoagulação. Qual é a melhor conduta?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação",
      B: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor.",
      D: "DOACs são preferidos em DRC 3b (apixabana ou edoxabana com ajuste; melhor perfil sangramento/eficácia); dose ajustada e monitor de função renal",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Apixabana tem melhor perfil renal em vários subgrupos. Varfarina aumenta risco de calcifilaxia. Pearl: em HD, evidência crescente favorece apixabana ajustada; individualizar. Gabarito detalhado: DOACs são preferidos em DRC 3b (apixabana ou edoxabana com ajuste — melhor perfil sangramento/eficácia); dose ajustada e monitor de função renal; varfarina em DRC muito avançada/HD ainda debatida (crescente uso cauteloso de apixabana em HD após ARISTOTLE + estudos observacionais)",
    bibliography: "ESC AF; KDIGO cardiorenal."
  },
  {
    id: "NA-T079",
    tema: "Ajuste de dose",
    subtema: "Metformina em DRC",
    dificuldade: "basico",
    age: 66,
    vars: {
      tfg: 25
    },
    statement: "{{sexWord}} de {{age}} com DM2 (HbA1c 7,4%) e DRC estabelecida (TFG {{tfg}} mL/min/1,73 m²) em uso de metformina 1000 mg 2× ao dia há anos. Sem episódios prévios de acidose láctica. Qual conduta correta em relação à metformina considerando o TFG atual?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência.",
      B: "Suspender todos os antidiabéticos e iniciar apenas dieta, sem alternativa farmacológica para o controle glicêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Metformina: TFG 30–45 → reduzir dose (≤1000 mg/dia); TFG <30 → contraindicada pelo risco de acidose láctica, especialmente com desidratação/hipoxia"
    },
    correct: "E",
    explanation: "Metformina é excretada renalmente; acúmulo → acidose láctica (especialmente com desidratação/contraste/hipoxia). Pearl: sempre reveja em LRA. Gabarito detalhado: Metformina: TFG 30–45 → reduzir dose (≤1000 mg/dia); TFG <30 → contraindicada pelo risco de acidose láctica, especialmente com desidratação/hipoxia; considerar outros anti-hiperglicemiantes (iSGLT2 se TFG >20, análogos de GLP-1, insulina)",
    bibliography: "FDA/KDIGO metformin."
  },
  {
    id: "NA-T080",
    tema: "Biópsia renal",
    subtema: "Indicações",
    dificuldade: "basico",
    age: 45,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} chega ao ambulatório de nefrologia com múltiplos quadros clínicos. Considerando o cenário atual e as diretrizes vigentes, qual das seguintes é uma indicação clássica de biópsia renal percutânea no adulto?",
    options: {
      A: "Síndrome nefrótica do adulto (exceto contexto de nefropatia diabética típica com anos de evolução, retinopatia, sem hematúria), IRA intrínseca sem causa clara, HAS+ hematúria +…",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "Biópsia é ferramenta diagnóstica poderosa mas com risco (sangramento). Risco/benefício claros. Pearl: nunca biopsiar sem checar coagulação, PA e imagem. Gabarito detalhado: Síndrome nefrótica do adulto (exceto contexto de nefropatia diabética típica com anos de evolução, retinopatia, sem hematúria), IRA intrínseca sem causa clara, HAS+ hematúria + proteinúria (glomerulopatia), disfunção do enxerto e recorrência de doença primária",
    bibliography: "KDIGO Glomerular Diseases."
  },
  {
    id: "NA-T081",
    tema: "Anticoagulação",
    subtema: "Heparina em HD",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "Paciente com alto risco de sangramento (recém pós-operatório) precisa dialisar. Qual é a melhor estratégia terapêutica?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "HD sem anticoagulação (lavagens salinas periódicas de circuito) ou anticoagulação regional com citrato (preferido); ajustar tempo e fluxo para evitar coagulação",
      C: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "Sem anticoagulação e citrato regional são estratégias de risco reduzido de sangramento. Pearl: cuidado com toxicidade de citrato (hipocalcemia iônica + acúmulo em insuficiência hepática).",
    bibliography: "KDIGO AKI CRRT anticoagulation."
  },
  {
    id: "NA-T082",
    tema: "Nefropatia diabética",
    subtema: "Rastreio e escalonamento",
    dificuldade: "basico",
    age: 55,
    vars: {
      uacr: 320,
      tfg: 62
    },
    statement: "{{sexWord}} de {{age}} com DM2 há 12 anos, UACR {{uacr}}, TFG {{tfg}}, PA 130/78 em IECA. Qual exame ou conduta deve ser solicitado a seguir?",
    options: {
      A: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Manter IECA + adicionar iSGLT2 (empa/dapa) e considerar finerenona (bloqueador MR não esteroidal) para reduzir progressão e MACE em DRC diabética albuminúrica",
      C: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "B",
    explanation: "DRC diabética albuminúrica moderna: IECA/BRA + iSGLT2 + finerenona + GLP-1 análogo. Pearl: albuminúria é o alvo terapêutico. Gabarito detalhado: Manter IECA + adicionar iSGLT2 (empa/dapa) e considerar finerenona (bloqueador MR não esteroidal) para reduzir progressão e MACE em DRC diabética albuminúrica; controle glicêmico com foco em GLP-1 análogo se elegível; controle lipídico com estatina; controle de PA <130/80 (ou <120 em SBP padronizada)",
    bibliography: "KDIGO Diabetes in CKD 2022."
  },
  {
    id: "NA-T083",
    tema: "Uremia",
    subtema: "Indicação de TSR",
    dificuldade: "basico",
    age: 69,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC 5 não-dialítica apresenta asterixe, confusão, atrito pericárdico e sobrecarga de volume. Qual é a melhor conduta?",
    options: {
      A: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Iniciar terapia de substituição renal por uremia sintomática (encefalopatia, pericardite urêmica), sobrecarga refratária e/ou distúrbios ácido-base/eletrolíticos não tratáveis clinicamente",
      E: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "Pericardite urêmica, encefalopatia urêmica com asterixe e confusão, além de sobrecarga volêmica refratária, são indicações clássicas e absolutas para início de terapia de substituição renal — independentemente do valor exato da TFG. Neste cenário, adiar diálise expõe a tamponamento cardíaco e piora neurológica potencialmente irreversíveis. Iniciar HD (com heparinização mínima para reduzir hemorragia intra-pericárdica) ou DP conforme cenário; drenar derrame se hemodinamicamente significativo. Pearl: sinais/sintomas urêmicos, e não a TFG isolada, guiam o início de TSR (IDEAL trial).",
    bibliography: "KDIGO AKI/CKD; IDEAL trial contexto."
  },
  {
    id: "NA-T084",
    tema: "Gravidez",
    subtema: "DRC",
    dificuldade: "intermediario",
    age: 32,
    vars: {

    },
    statement: "Mulher de {{age}} com DRC estágio 3 (TFG 45), HAS controlada em enalapril + hidroclorotiazida, proteinúria de 400 mg/dia, sem outras comorbidades. Deseja engravidar nos próximos 6–12 meses. Qual orientação pré-concepcional é a mais adequada?",
    options: {
      A: "Usar IECA/ARA como anti-hipertensivo de primeira linha na gestação, sem alternativa segura Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Aconselhamento pré-concepcional: risco de progressão da DRC, pré-eclâmpsia e prematuridade; suspender IECA/BRA e SGLT2i antes de conceber, substituir por metildopa/labetalol/nifedipina",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Manter metformina na dose plena e acrescentar AINE para proteção renal, sem revisar a TFG atual Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "IECA/BRA são teratogênicos. AAS baixa dose reduz pré-eclâmpsia em risco alto. Pearl: planejamento é 90% do sucesso. Gabarito detalhado: Aconselhamento pré-concepcional: risco de progressão da DRC, pré-eclâmpsia e prematuridade; suspender IECA/BRA e SGLT2i antes de conceber, substituir por metildopa/labetalol/nifedipina; controle rigoroso de PA (<140/90); considerar AAS profilático para pré-eclâmpsia; seguimento em centro de gravidez de alto risco",
    bibliography: "ISSHP; ACOG."
  },
  {
    id: "NA-T085",
    tema: "Nefropatia por analgésicos",
    subtema: "AINE crônico",
    dificuldade: "basico",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com uso crônico de AINE por dor lombar apresenta hiperkalemia, HAS e queda de TFG. Qual mecanismo?",
    options: {
      A: "AINE inibem síntese de prostaglandinas vasodilatadoras da arteríola aferente, causando redução hemodinâmica da TFG",
      B: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio",
      D: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes"
    },
    correct: "A",
    explanation: "AINE são multi-efeitos renais deletérios, ainda mais em idosos, DRC e IC. Pearl: revise sempre a caixinha \"azul\" do paciente. Gabarito detalhado: AINE inibem síntese de prostaglandinas vasodilatadoras da arteríola aferente, causando redução hemodinâmica da TFG; também associados a NIA, sódio-retenção (piora PA e IC), hipercalemia (hipoaldosteronismo hiporreninêmico) e podem induzir SN por lesão mínima ou membranosa",
    bibliography: "KDIGO AKI drug-induced."
  },
  {
    id: "NA-T086",
    tema: "Distúrbios",
    subtema: "Análise sistemática ácido-base",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      ph: 7.32,
      hco3: 16,
      pco2: 30,
      gap: 20
    },
    statement: "{{sexWord}} de {{age}} com pH {{ph}}, HCO₃ {{hco3}}, PaCO₂ {{pco2}}, ânion gap {{gap}}, sódio 140, cloreto 100. Interpretação?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Acidose metabólica com gap aumentado, compensação respiratória adequada (Winter: 1,5×16+8 = 32 ± 2 ≈ 30); avaliar delta-delta para distúrbio adicional",
      E: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos"
    },
    correct: "D",
    explanation: "Sistemática: distúrbio primário → compensação (Winter) → ΔAG/ΔHCO₃ → causas. Pearl: sempre calcular delta-delta em acidose gap alto para detectar distúrbio metabólico coexistente. Gabarito detalhado: Acidose metabólica com gap aumentado, compensação respiratória adequada (Winter: 1,5×16+8 = 32 ± 2 ≈ 30); avaliar delta-delta para distúrbio adicional; investigar causas: lactato, cetoacidose, uremia, intoxicação",
    bibliography: "Rose & Post."
  },
  {
    id: "NA-T087",
    tema: "Nefropatia",
    subtema: "Doença de Fabry",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com angioqueratomas, dor neuropática nas extremidades, hipohidrose, proteinúria, cornea verticillata; história familiar de \"problema no rim/coração\" precoce. Qual é o diagnóstico mais provável?",
    options: {
      A: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Doença de Fabry (deficiência de α-galactosidase A, ligada ao X): dosar atividade da α-Gal A (homens) e genética (mulheres heterozigotas podem ser sintomáticas)",
      D: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "C",
    explanation: "Fabry: doença sistêmica; nefropatia progressiva. Terapia enzimática ou chaperona muda curso. Pearl: cornea verticillata + dor neuropática = pensar Fabry. Gabarito detalhado: Doença de Fabry (deficiência de α-galactosidase A, ligada ao X): dosar atividade da α-Gal A (homens) e genética (mulheres heterozigotas podem ser sintomáticas); terapia de reposição enzimática (agalsidase) ou chaperona (migalastate em mutações amenáveis); nefroproteção com IECA/BRA",
    bibliography: "Fabry consortium; ERT trials."
  },
  {
    id: "NA-T088",
    tema: "Pulmão-rim",
    subtema: "Diferencial",
    dificuldade: "avancado",
    age: 44,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com hemoptise, LRA e sedimento urinário ativo. Quais diagnósticos considerar de imediato?",
    options: {
      A: "Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos",
      B: "Síndromes pulmão-rim: vasculite ANCA (mais comum), doença anti-MBG (Goodpasture), LES; investigar ANCA, anti-MBG, anti-dsDNA, C3/C4",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes",
      E: "Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes"
    },
    correct: "B",
    explanation: "Pulmão-rim é emergência imunológica. Diferencial rápido salva rim/pulmão. Pearl: pedir ANCA, anti-MBG, anti-dsDNA, C3/C4 no mesmo tubo. Gabarito detalhado: Síndromes pulmão-rim: vasculite ANCA (mais comum), doença anti-MBG (Goodpasture), LES; investigar ANCA, anti-MBG, anti-dsDNA, C3/C4; iniciar imunossupressão precoce assim que possível, PLEX em selecionados; considerar biópsia renal",
    bibliography: "KDIGO Vasculitis; UpToDate."
  },
  {
    id: "NA-T089",
    tema: "PTT",
    subtema: "Diagnóstico e tratamento",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com anemia hemolítica microangiopática + plaquetopenia + alteração neurológica flutuante, sem diarreia. ADAMTS13 <10%. Qual é o diagnóstico mais provável e a melhor conduta?",
    options: {
      A: "Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      B: "Indicar apenas oxigênio a 100% sem titulação e sem broncodilatador, adiando corticoide sistêmico Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica",
      D: "PTT (Púrpura Trombocitopênica Trombótica) adquirida (auto-anticorpo anti-ADAMTS13): plasmaférese urgente diariamente até resolução, corticoide + rituximabe",
      E: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "D",
    explanation: "PTT: iniciar PLEX imediatamente, mesmo antes da confirmação de ADAMTS13. Caplacizumabe reduz recorrência precoce. Pearl: TTP mata em horas — não espere confirmação para iniciar. Gabarito detalhado: PTT (Púrpura Trombocitopênica Trombótica) adquirida (auto-anticorpo anti-ADAMTS13): plasmaférese urgente diariamente até resolução, corticoide + rituximabe; caplacizumabe (anti-vWF nanobody) acelera resposta (HERCULES trial); evitar transfusão de plaquetas exceto sangramento grave",
    bibliography: "ISTH TTP 2020; HERCULES trial."
  },
  {
    id: "NA-T090",
    tema: "aHUS",
    subtema: "Adulto",
    dificuldade: "avancado",
    age: 40,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MAHA + plaquetopenia + LRA sem diarreia, ADAMTS13 normal. Qual é a melhor conduta?",
    options: {
      A: "SHU atípica adulta: dosar complemento, painel de mutações (CFH, CFI, MCP, C3, DGKE), tratar com eculizumabe/ravulizumabe (bloqueio de C5) precocemente",
      B: "Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      C: "Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal) Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      D: "Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.",
      E: "Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado."
    },
    correct: "A",
    explanation: "aHUS: bloqueio precoce de C5 mudou prognóstico. Vacinar contra meningococo é obrigatório. Pearl: HUS sem diarreia = pense complemento. Gabarito detalhado: SHU atípica adulta: dosar complemento, painel de mutações (CFH, CFI, MCP, C3, DGKE), tratar com eculizumabe/ravulizumabe (bloqueio de C5) precocemente; vacinar contra meningococo antes ou concomitante com profilaxia antibiótica; avaliar Tx renal com risco de recorrência conforme genética",
    bibliography: "KDIGO aHUS; Fakhouri F., Loirat C."
  }
];

module.exports = { ADV_MASTERS };
