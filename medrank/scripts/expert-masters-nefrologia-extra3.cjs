/**
 * Expansão expert III — Nefrologia adulta.
 */
const ADV_MASTERS_EXTRA3 = [
  {
    id: "NA-X101",
    tema: "Nefropatia por IgA",
    subtema: "Budesonida Nefecon",
    dificuldade: "avancado",
    age: 36,
    vars: {
      tfg: 58,
      upcr: 1.3
    },
    statement: "{{sexWord}} de {{age}} com IgAN confirmada, TFG {{tfg}} mL/min/1,73m², UPCR {{upcr}} g/g após 90 dias de IECA na dose máxima tolerada, PA no alvo e sem infecção ativa. Qual terapia direcionada à mucosa intestinal tem evidência de reduzir proteinúria e preservar TFG neste perfil?",
    options: {
      A: "Ciclofosfamida oral contínua por 2 anos como primeira linha em toda IgAN",
      B: "Budesonida de liberação direcionada (Nefecon), por curso protocolar, além da terapia de suporte otimizada",
      C: "Eculizumab de rotina em IgAN sem MAT",
      D: "Suspender IECA e iniciar apenas corticoide sistêmico em megadose sem profilaxia",
      E: "Observação sem qualquer terapia adicional apesar de proteinúria persistente"
    },
    correct: "B",
    explanation: "Nefecon (budesonida targeted-release) atuou no eixo mucosa–IgA (NefIgArd) reduzindo proteinúria e atenuando perda de TFG. Não substitui RASSi. CYC não é primeira linha na IgAN típica. Pearl: suporte máximo 90 dias → então terapia IgAN-específica.",
    bibliography: "NefIgArd; KDIGO IgAN updates; Fellström et al."
  },
  {
    id: "NA-X102",
    tema: "Nefropatia por IgA",
    subtema: "Sparsentan",
    dificuldade: "avancado",
    age: 29,
    vars: {
      upcr: 1.8,
      tfg: 62
    },
    statement: "{{sexWord}} de {{age}} com IgAN, UPCR {{upcr}} g/g e TFG {{tfg}} apesar de IECA pleno. Sem hiperkalemia e sem gestação. Qual agente dual (endotelina A + angiotensina) reduziu proteinúria versus irbesartana no PROTECT?",
    options: {
      A: "Amlodipina em dose máxima isolada",
      B: "Sparsentan, com monitorização de PA, potássio, edema e função hepática, substituindo o BRA/IECA isolado conforme bula/protocolo",
      C: "Aliskireno + IECA + BRA em triplo bloqueio de rotina",
      D: "Minoxidil como antiproteinúrico de escolha",
      E: "Tolvaptan para IgAN — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "PROTECT: sparsentan > irbesartana na proteinúria da IgAN. Triplo bloqueio RAS aumenta risco sem benefício claro. Pearl: dual ET-A/ARB é opção quando proteinúria persiste no suporte.",
    bibliography: "PROTECT trial; sparsentan label; KDIGO IgAN."
  },
  {
    id: "NA-X103",
    tema: "Nefropatia por IgA",
    subtema: "Inibidor de fator B (iptacopan)",
    dificuldade: "avancado",
    age: 41,
    vars: {
      upcr: 1.6
    },
    statement: "{{sexWord}} de {{age}} com IgAN de alto risco proteinúrico (UPCR {{upcr}}) sob terapia de suporte otimizada. Sobre o bloqueio da via alternativa do complemento (iptacopan), qual afirmação é mais correta?",
    options: {
      A: "Não há qualquer papel biológico do complemento na IgAN",
      B: "Iptacopan (fator B) reduziu proteinúria em ensaios de IgAN; uso depende de aprovação/acesso e não dispensa RASSi/cuidado infeccioso",
      C: "Substitui vacinação e vigilância infecciosa",
      D: "É antídoto da hipercalemia do IECA",
      E: "Indicado apenas em SHUa, nunca em glomerulopatias"
    },
    correct: "B",
    explanation: "A via alternativa contribui na IgAN; iptacopan mostrou redução de proteinúria (APPLAUSE-IgAN). Ainda exige julgamento regulatório/clínico. Pearl: complemento na IgAN saiu do laboratório para o consultório.",
    bibliography: "APPLAUSE-IgAN; complement in IgAN reviews."
  },
  {
    id: "NA-X104",
    tema: "Nefrite lúpica",
    subtema: "Voclosporina",
    dificuldade: "avancado",
    age: 28,
    vars: {
      upcr: 3.2
    },
    statement: "Mulher de {{age}} com nefrite lúpica classe IV em indução com MMF + corticoide, UPCR {{upcr}} g/g após semanas, TFG estável e PA controlada. Qual CNI com evidência AURORA pode ser associado?",
    options: {
      A: "Ciclosporina empírica sem monitorização nem MMF",
      B: "Voclosporina associada a MMF + corticoide em esquema protocolar, com vigilância de TFG, PA e eletrólitos",
      C: "Eculizumab como padrão em toda classe IV",
      D: "Suspender MMF e deixar só hidroxicloroquina",
      E: "Plasmaférese mensal de manutenção"
    },
    correct: "B",
    explanation: "AURORA: voclosporina + MMF aumentou remissões renais. Monitorar nefrotoxicidade/PA. Pearl: multitarget moderno inclui voclosporina em LN selecionada.",
    bibliography: "AURORA 1; KDIGO LN 2024; EULAR."
  },
  {
    id: "NA-X105",
    tema: "Nefrite lúpica",
    subtema: "Belimumabe",
    dificuldade: "avancado",
    age: 32,
    vars: {

    },
    statement: "Mulher de {{age}} com LES/nefrite proliferativa em manutenção com MMF, ainda com atividade sorológica e proteinúria residual. Qual biológico anti-BAFF tem evidência renal (BLISS-LN)?",
    options: {
      A: "Infliximabe de rotina",
      B: "Belimumabe adjuvante à terapia padrão, reduzindo eventos renais em BLISS-LN",
      C: "Secuquinumabe como primeira linha da nefrite",
      D: "Omalizumabe — conduta/diagnóstico inadequado para o caso",
      E: "Nenhum biológico tem dados em nefrite lúpica"
    },
    correct: "B",
    explanation: "BLISS-LN suportou belimumabe na nefrite lúpica ativa. Pearl: anti-BAFF entra no algoritmo da LN, não só no LES extrarrenal.",
    bibliography: "BLISS-LN; KDIGO LN 2024."
  },
  {
    id: "NA-X106",
    tema: "Vasculite ANCA",
    subtema: "Avacopan",
    dificuldade: "avancado",
    age: 54,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com GPA, indução com rituximabe, deseja poupar corticoide. Qual antagonista de C5aR foi não-inferior a corticoide padrão no ADVOCATE para remissão?",
    options: {
      A: "Eculizumab em todo ANCA sem seleção",
      B: "Avacopan (anti-C5aR1) como estratégia poupadora de glicocorticoide, com vigilância hepática e infecciosa",
      C: "Montelucaste como indução",
      D: "Apenas anti-histamínico",
      E: "Plasmaférese mensal indefinida como manutenção"
    },
    correct: "B",
    explanation: "ADVOCATE: avacopan permitiu indução com menos corticoide. Não elimina necessidade de RTX/CYC. Pearl: bloqueie C5aR para poupar esteroide no AAV.",
    bibliography: "ADVOCATE; KDIGO vasculitis updates."
  },
  {
    id: "NA-X107",
    tema: "Vasculite ANCA",
    subtema: "Manutenção com rituximabe",
    dificuldade: "intermediario",
    age: 60,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MPA em remissão após indução com RTX. Qual estratégia de manutenção tem melhor evidência para prevenir recidiva?",
    options: {
      A: "Suspender toda imunossupressão no dia 90 em todos",
      B: "Rituximabe de manutenção (MAINRITSAN) ou alternativa (azatioprina) conforme risco; monitorar IgG e infecções",
      C: "Ciclofosfamida contínua por 5 anos de rotina",
      D: "Apenas TMP-SMX sem imunossupressão de manutenção em PR3 de alto risco",
      E: "Eculizumab de manutenção padrão"
    },
    correct: "B",
    explanation: "MAINRITSAN: RTX manutenção > AZA em muitos cenários. IgG baixo e infecção importam. Pearl: remissão ANCA ≠ alta — planeje manutenção.",
    bibliography: "MAINRITSAN; KDIGO AAV."
  },
  {
    id: "NA-X108",
    tema: "Anti-MBG",
    subtema: "Prognóstico e diálise",
    dificuldade: "avancado",
    age: 58,
    vars: {
      cr: 8.4
    },
    statement: "{{sexWord}} de {{age}} com anti-MBG, creatinina {{cr}} mg/dL, anúria e 100% de crescentes fibrosos na biópsia, sem hemorragia alveolar. Qual decisão terapêutica é mais racional?",
    options: {
      A: "Plasmaférese + CYC intensiva indefinida com alta chance de recuperação renal plena",
      B: "Discutir limitar imunossupressão agressiva focada no rim quando há anúria + biópsia sem salvável; tratar se houver DAH; preparar TSR",
      C: "Transplante imediato sem esperar negativação de anticorpos",
      D: "Apenas diurético de alça",
      E: "Observação sem TSR — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Anti-MBG dialítico com crescentes fibrosos tem baixa recuperação renal; DAH ainda exige terapia. Pearl: anúria + fibrose = não torture com IS só pelo rim.",
    bibliography: "KDIGO GN/vasculitis; anti-GBM prognosis series."
  },
  {
    id: "NA-X109",
    tema: "C3 glomerulopatia",
    subtema: "Abordagem atual",
    dificuldade: "avancado",
    age: 27,
    vars: {
      tfg: 45,
      upcr: 2.4
    },
    statement: "{{sexWord}} de {{age}} com C3G, C3 baixo persistente, TFG {{tfg}}, UPCR {{upcr}}, sem gamopatia. Qual estratégia geral está mais alinhada à prática atual?",
    options: {
      A: "Apenas antibiótico profilático vitalício",
      B: "Nefroproteção + considerar MMF/corticoide em selecionados; avaliar inibidores de complemento (ex. iptacopan) e rastrear C3NeF/genética em centro experiente",
      C: "Nefrectomia bilateral diagnóstica",
      D: "Tolvaptan — conduta/diagnóstico inadequado para o caso",
      E: "Ignorar complemento porque “não muda conduta”"
    },
    correct: "B",
    explanation: "C3G exige estratificação de complemento e terapia individualizada; novos inibidores mudam o cenário. Pearl: C3 baixo crônico + GN = não chame de PSGN eternamente.",
    bibliography: "KDIGO C3G; iptacopan C3G data; expert consensus."
  },
  {
    id: "NA-X110",
    tema: "Podocitopatia",
    subtema: "Anti-nefrina / fator circulante",
    dificuldade: "avancado",
    age: 22,
    vars: {
      alb: 1.6
    },
    statement: "{{sexWord}} de {{age}} com SN córtico-dependente, biópsia sem imunodepósitos, ME com apagamento de pedicelos. Há discussão sobre autoanticorpos anti-nefrina. Qual implicação clínica prática hoje?",
    options: {
      A: "Fecha diagnóstico de amiloide AL",
      B: "Sugere podocitopatia imune-mediada e reforça papel de terapias B-célula/IS em refratários; ainda é campo em evolução, não substitui biópsia/clínica",
      C: "Indica eculizumab imediato em todos",
      D: "Confirma mutação NPHS1 obrigatória",
      E: "Permite suspender toda investigação de linfoma/fármaco no adulto"
    },
    correct: "B",
    explanation: "Anti-nefrina emerge como biomarcador de MCD/podocitopatia; prática ainda integra clínica + biópsia. Pearl: fator circulante voltou ao centro da SN “primária”.",
    bibliography: "Watts/Weins anti-nephrin; pediatric/adult podocytopathy 2023–25."
  },
  {
    id: "NA-X111",
    tema: "FSGS",
    subtema: "Colapsante e interferon/APOL1",
    dificuldade: "avancado",
    age: 38,
    vars: {
      cr: 3.2,
      prot: 9
    },
    statement: "{{sexWord}} afrodescendente de {{age}} com proteinúria {{prot}} g, Cr {{cr}}, biópsia colapsante; em uso de interferon. Qual mecanismo e conduta prioritária?",
    options: {
      A: "Lesão mínima típica — só corticoide sem revisar fármaco",
      B: "FSGS colapsante (APOL1/interferon/vírus): suspender interferon se possível, tratar causa (HIV/CMV etc.), suporte/IS selecionada — prognóstico reservado",
      C: "Sempre curável só com IECA",
      D: "Tolvaptan — conduta/diagnóstico inadequado para o caso",
      E: "Diagnóstico de ATR distal"
    },
    correct: "B",
    explanation: "Colapsante associa-se a APOL1, vírus e interferon. Remover gatilho é chave. Pearl: interferon + colapso = pare o fármaco.",
    bibliography: "Collapsing glomerulopathy reviews; APOL1; KDIGO FSGS."
  },
  {
    id: "NA-X112",
    tema: "Membranosa",
    subtema: "Monitorização PLA2R",
    dificuldade: "intermediario",
    age: 52,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com MN PLA2R-positiva em remissão parcial sob rituximabe. Qual o melhor uso do título anti-PLA2R no seguimento?",
    options: {
      A: "Ignorar sorologia após a biópsia",
      B: "Usar a trajetória do anti-PLA2R para antecipar remissão/recidiva e guiar intensidade terapêutica, junto com proteinúria/TFG",
      C: "Repetir biópsia mensal obrigatória",
      D: "Só dosar PLA2R uma vez na vida",
      E: "PLA2R positivo exclui necessidade de nefroproteção"
    },
    correct: "B",
    explanation: "Sorologia PLA2R guia imunológica vs clínica (lag da proteinúria). Pearl: anticorpo cai antes da proteína. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "KDIGO MN; Beck/Salant PLA2R."
  },
  {
    id: "NA-X113",
    tema: "Nefropatia diabética",
    subtema: "GLP-1 / FLOW",
    dificuldade: "avancado",
    age: 61,
    vars: {
      tfg: 48,
      uacr: 620
    },
    statement: "{{sexWord}} de {{age}} com DM2, TFG {{tfg}}, UACR {{uacr}} mg/g, já em IECA + SGLT2. Qual classe teve desfecho renal duro positivo no ensaio FLOW e pode ser adicionada se disponível/indicada?",
    options: {
      A: "Sulfonilureia como nefroproteção primária",
      B: "Agonista de receptor GLP-1 (semaglutida no FLOW), além do padrão RASSi/SGLT2 quando apropriado",
      C: "Pioglitazona como substituto do SGLT2",
      D: "Acarbose no lugar do IECA",
      E: "Insulina NPH como único fator que reduz UACR"
    },
    correct: "B",
    explanation: "FLOW: semaglutida reduziu eventos renais em DM2 + DRC. Soma-se a RASSi/SGLT2. Pearl: triade moderna DM-DRC = RASSi + SGLT2 + GLP-1 (quando couber).",
    bibliography: "FLOW trial; KDIGO Diabetes in CKD."
  },
  {
    id: "NA-X114",
    tema: "DRC",
    subtema: "Tratamento conservador",
    dificuldade: "intermediario",
    age: 84,
    vars: {
      tfg: 11
    },
    statement: "{{sexWord}} de {{age}} com TFG {{tfg}}, fragilidade severa, demência avançada e meta de conforto. Família pergunta se “tem que dialisar”. Qual abordagem é mais adequada?",
    options: {
      A: "Diálise obrigatória em toda TFG <15 independentemente de metas",
      B: "Decisão compartilhada: manejo conservador da DRC (sintomas, anemia, volume, cuidados paliativos) é opção legítima frente à diálise",
      C: "Nefrectomia paliativa de rotina",
      D: "Transplante como única alternativa ética",
      E: "Suspender todo sintomático"
    },
    correct: "B",
    explanation: "Em idosos frágeis, diálise pode não alongar vida com qualidade. Conservative kidney management é padrão ético. Pearl: TFG baixa ≠ ordem automática de fístula.",
    bibliography: "KDIGO CKD; ISPD/ERA conservative care."
  },
  {
    id: "NA-X115",
    tema: "Hemodiálise",
    subtema: "Diálise incremental",
    dificuldade: "avancado",
    age: 57,
    vars: {
      tfg: 9
    },
    statement: "{{sexWord}} de {{age}} inicia HD com diurese residual ainda útil (TFG residual {{tfg}} em declínio lento), uremia controlável. Qual conceito de prescrição pode preservar residual?",
    options: {
      A: "Sempre 4 h × 3×/semana desde a primeira sessão, sem reavaliar residual",
      B: "HD incremental (menos sessões/tempo) com monitorização rigorosa de residual, volume e sintomas — individualizada",
      C: "Negar qualquer HD até anúria completa",
      D: "Só DP é capaz de preservar residual",
      E: "Ultrafiltração máxima diária sem dialisato"
    },
    correct: "B",
    explanation: "Incremental dialysis usa residual e pode melhorar qualidade de vida se bem monitorada. Pearl: residual é ouro — não a desperdice.",
    bibliography: "Incremental HD reviews; KDOQI."
  },
  {
    id: "NA-X116",
    tema: "Hemodiálise",
    subtema: "HDx / medium cut-off",
    dificuldade: "avancado",
    age: 63,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em HD convencional com prurido/agitação urêmica e moléculas médias persistentes. Sobre membranas medium cut-off (HDx), qual é a afirmação mais correta?",
    options: {
      A: "Eliminam necessidade de controle de fósforo",
      B: "Aumentam remoção de moléculas médias vs high-flux convencional; benefício clínico ainda em consolidação — considerar em centros com protocolo",
      C: "Substituem transplante",
      D: "São contraindicadas em qualquer diálise",
      E: "Funcionam sem máquina de HD"
    },
    correct: "B",
    explanation: "HDx amplia clearance de middle molecules; desfechos duros ainda sob estudo. Pearl: tecnologia nova ≠ abandonar peso seco e K.",
    bibliography: "HDx/MCO reviews; EUDIAL."
  },
  {
    id: "NA-X117",
    tema: "Diálise peritoneal",
    subtema: "Falência de ultrafiltração",
    dificuldade: "avancado",
    age: 51,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com sobrecarga volêmica; teste de equilíbrio peritoneal mostra transporte alto e UF pobre com glicose padrão. Qual ajuste típico?",
    options: {
      A: "Aumentar tempo de dwell longo com glicose baixa em transportador alto",
      B: "Encurtar dwells, considerar icodextrina no dwell longo e reavaliar peso seco/prescrição; investigar EPS se crônico/grave",
      C: "Suspender alarme de volume e liberar sal",
      D: "Trocar para contraste intraperitoneal",
      E: "Antibiótico antifúngico empírico sem cultura"
    },
    correct: "B",
    explanation: "Alto transportador: dwells curtos + icodextrina no longo. Pearl: edemaciado em DP = leia o PET antes de culpar só a “dieta”.",
    bibliography: "ISPD prescribing PD; PET interpretation."
  },
  {
    id: "NA-X118",
    tema: "Diálise peritoneal",
    subtema: "Peritonite fúngica",
    dificuldade: "avancado",
    age: 47,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em DP com efluente turvo; cultura cresce Candida. Qual conduta está alinhada à ISPD?",
    options: {
      A: "Manter cateter e só fluconazol oral por 48 h em todos",
      B: "Remover o cateter prontamente + antifúngico sistêmico; reavaliar modalidade depois",
      C: "Apenas aumentar glicose do dialisato",
      D: "Corticoide IP — conduta/diagnóstico inadequado para o caso",
      E: "Observação sem antifúngico"
    },
    correct: "B",
    explanation: "Peritonite fúngica: retire o cateter — tentar salvar costuma falhar e agrava. Pearl: fungo no efluente = cateter fora. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "ISPD peritonitis recommendations."
  },
  {
    id: "NA-X119",
    tema: "Acesso vascular",
    subtema: "Urgent-start PD",
    dificuldade: "intermediario",
    age: 55,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com DRC 5 “crash”, sem FAV, precisa iniciar TSR. Qual vantagem potencial do urgent-start PD bem selecionado?",
    options: {
      A: "Elimina risco de peritonite para sempre",
      B: "Evita cateter venoso central e suas infecções/tromboses, iniciando DP precoce com volumes baixos sob protocolo",
      C: "É sempre superior em Kt/V ao HD de urgência",
      D: "Não exige treinamento da equipe",
      E: "Contraindicado se houver qualquer uremia"
    },
    correct: "B",
    explanation: "Urgent-start PD reduz exposição a CVC quando anatomia/equipe permitem. Pearl: crash ≠ sentença de cateter jugular. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "ISPD urgent-start PD; modality education."
  },
  {
    id: "NA-X120",
    tema: "Transplante renal",
    subtema: "Rejeição humoral (AMR)",
    dificuldade: "avancado",
    age: 44,
    vars: {
      cr: 2.7
    },
    statement: "{{sexWord}} de {{age}} transplantado, Cr {{cr}} (basal 1,2), DSA de novo, biópsia com C4d e glomerulite. Qual pacote terapêutico é mais típico para AMR ativa?",
    options: {
      A: "Apenas aumentar tiazídico",
      B: "Plasmaférese ± IVIG + otimizar imunossupressão basal; rituximabe/outros em centros experientes conforme gravidade",
      C: "Suspender tacrolimus e MMF juntos sem substituto",
      D: "Antibiótico isolado — conduta/diagnóstico inadequado para o caso",
      E: "Observação por 6 meses sem biópsia/terapia"
    },
    correct: "B",
    explanation: "AMR: remover anticorpo (PLEX/IVIG) + controlar clone B/T. Pearl: DSA + C4d + Cr = trate como AMR, não “NTA inespecífica”.",
    bibliography: "Banff; KDIGO transplant; AMR reviews."
  },
  {
    id: "NA-X121",
    tema: "Transplante renal",
    subtema: "Gestação pós-Tx",
    dificuldade: "avancado",
    age: 30,
    vars: {

    },
    statement: "Mulher de {{age}} com Tx renal estável há 3 anos, Cr 1,0, sem proteinúria, em tacrolimus + azatioprina + prednisona. Deseja engravidar. Qual ajuste é essencial?",
    options: {
      A: "Manter MMF se estivesse em uso, pois é seguro na gestação",
      B: "Evitar MMF/mTOR (teratogênicos); manter tacrolimus/AZA/pred em esquema compatível; planejamento com obstetrícia de alto risco",
      C: "Suspender todo imunossupressor ao confirmar gravidez",
      D: "Trocar para ciclofosfamida",
      E: "Indicar eculizumab profilático em toda gestação pós-Tx"
    },
    correct: "B",
    explanation: "MMF é teratogênico — migrar para AZA antes de conceber. Pearl: gestação pós-Tx começa no consultório, 6–12 meses antes. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "Transplant pregnancy guidelines; TTS/ERA."
  },
  {
    id: "NA-X122",
    tema: "Transplante renal",
    subtema: "Doador HCV+/HIV+",
    dificuldade: "avancado",
    age: 49,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} em lista há anos recebe oferta de rim de doador HCV NAT-positivo. Receptor HCV-negativo. Qual postura moderna?",
    options: {
      A: "Recusar sempre qualquer órgão HCV+",
      B: "Pode aceitar com consentimento e antivirais DAA precoces no receptor — amplia pool de órgãos com boa sobrevida em protocolos",
      C: "Aceitar sem qualquer DAA ou serologia de seguimento",
      D: "Só válido se doador for HIV+ também",
      E: "Exige eculizumab perioperatório"
    },
    correct: "B",
    explanation: "Era DAA: rins HCV+ para HCV− são estratégia aceita com tratamento. Pearl: HCV do doador hoje é tratável — não desperdice órgão sem conversar.",
    bibliography: "HCV-positive donor kidney protocols; AASLD/IDSA; AST."
  },
  {
    id: "NA-X123",
    tema: "Hipertensão",
    subtema: "Displasia fibromuscular",
    dificuldade: "intermediario",
    age: 34,
    vars: {
      pa: "178/108"
    },
    statement: "Mulher de {{age}} com PA {{pa}}, sopro abdominal, hipocalemia leve e artérias renais com aspecto “colar de contas”. Qual diagnóstico e tratamento de escolha da lesão renal típica?",
    options: {
      A: "Estenose aterosclerótica do idoso — stent em todos (CORAL)",
      B: "Displasia fibromuscular: angioplastia com balão (sem stent de rotina) + terapia anti-hipertensiva",
      C: "Feocromocitoma bilateral obrigatório",
      D: "Só espironolactona sem imagem vascular",
      E: "Nefrectomia bilateral"
    },
    correct: "B",
    explanation: "FMD em mulher jovem: string-of-beads; angioplastia sem stent é padrão. Pearl: jovem + HAS + colar de contas = FMD, não CORAL.",
    bibliography: "AHA FMD statement; ESC hypertension."
  },
  {
    id: "NA-X124",
    tema: "Hipertensão",
    subtema: "Síndrome de Liddle",
    dificuldade: "avancado",
    age: 24,
    vars: {
      k: 2.9,
      pa: "170/100"
    },
    statement: "{{sexWord}} de {{age}} com HAS grave, K {{k}}, alcalose, renina e aldosterona baixas. Irmão afetado. Qual mecanismo e tratamento?",
    options: {
      A: "Hiperaldosteronismo primário — adrenalectomia bilateral empírica",
      B: "Ganho de função do ENaC (Liddle): amilorida/triantereno + restrição de sal; espironolactona pouco eficaz",
      C: "Bartter — liberar sal",
      D: "Feocromocitoma — só alfa-bloqueio",
      E: "SIADH — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Liddle: ENaC ativo, aldosterona baixa — bloqueie ENaC, não o receptor mineralocorticoide. Pearl: HAS + hipoK + aldo baixa = Liddle/AME/licorice.",
    bibliography: "Monogenic hypertension reviews; Lifton."
  },
  {
    id: "NA-X125",
    tema: "Hipertensão",
    subtema: "Síndrome de Gordon (PHA2)",
    dificuldade: "avancado",
    age: 26,
    vars: {
      k: 5.9,
      pa: "160/98"
    },
    statement: "{{sexWord}} de {{age}} com HAS, hipercalemia {{k}} e acidose hiperclorêmica, TFG normal, renina baixa. Qual entidade e tratamento típico?",
    options: {
      A: "ATR distal clássica com hipocalemia",
      B: "Pseudohipoaldosteronismo tipo 2 (Gordon, WNK/CUL3/KLHL3): tiazídico é altamente eficaz",
      C: "Liddle — amilorida como primeira escolha típica",
      D: "Hiperaldo primário — só espironolactona sem tiazídico",
      E: "Doença de Addison — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Gordon: “oposto do Gitelman” — HAS + hiperK; tiazídico responde dramaticamente. Pearl: HAS + K alto + TFG normal = pense Gordon.",
    bibliography: "PHAII/Gordon reviews; WNK pathway."
  },
  {
    id: "NA-X126",
    tema: "Distúrbios",
    subtema: "RTA tipo 4",
    dificuldade: "intermediario",
    age: 68,
    vars: {
      k: 5.8,
      hco3: 17,
      tfg: 55
    },
    statement: "{{sexWord}} de {{age}} diabético, TFG {{tfg}}, K {{k}}, HCO₃ {{hco3}}, ânion gap normal, em IECA + espironolactona. Qual distúrbio ácido-base tubular é típico?",
    options: {
      A: "ATR distal hipocalêmica pura",
      B: "Acidose tubular tipo 4 (hipoaldosteronismo hiporreninêmico): revisar fármacos, dietar K, fludrocortisona em selecionados",
      C: "Cetoacidose diabética com gap alto obrigatório",
      D: "Alcalose de contração",
      E: "Alcalose respiratória crônica"
    },
    correct: "B",
    explanation: "Tipo 4: hiperK + acidose hiperclorêmica no diabético/DRC leve + fármacos. Pearl: K alto com HCO₃ baixo e gap normal = tipo 4 até prova em contrário.",
    bibliography: "Acid-base primers; KDIGO diabetes notes."
  },
  {
    id: "NA-X127",
    tema: "Eletrólitos",
    subtema: "Pseudohiponatremia",
    dificuldade: "intermediario",
    age: 55,
    vars: {
      na: 124,
      tg: 4200
    },
    statement: "{{sexWord}} de {{age}} com Na {{na}} medido, triglicérides {{tg}} mg/dL, osmolaridade plasmática medida normal e sem sintomas. Qual interpretação?",
    options: {
      A: "Hiponatremia hipotônica grave — bolus de 3% imediato",
      B: "Pseudohiponatremia (fase separada por hiperlipidemia/paraproteína): confirmar com Na íon-seletivo/osmolaridade; tratar a causa, não restringir água como SIADH",
      C: "SIADH clássico — conduta/diagnóstico inadequado para o caso",
      D: "Diabetes insípido — conduta/diagnóstico inadequado para o caso",
      E: "Perda cerebral de sal"
    },
    correct: "B",
    explanation: "Pseudo-hipoNa: osm efetiva normal. Métodos modernos reduzem o artefato, mas o conceito cai em prova. Pearl: olhe a osmolaridade antes de “tratar o número”.",
    bibliography: "Hyponatremia guidelines; laboratory artifacts."
  },
  {
    id: "NA-X128",
    tema: "Eletrólitos",
    subtema: "Beer potomania",
    dificuldade: "avancado",
    age: 49,
    vars: {
      na: 118
    },
    statement: "{{sexWord}} de {{age}} etilista, dieta pobre em solutos, Na {{na}}, urina muito diluída e baixo sódio urinário. Qual fisiopatologia e risco da correção?",
    options: {
      A: "Excesso de ADH fixo como no SIADH clássico hospitalar",
      B: "Baixa oferta de soluto limita água livre eletrolítica: reidratar com soluto/alimentar com cuidado — alto risco de correção rápida e ODS",
      C: "Sempre desmopressina de primeira linha",
      D: "Diurético de alça como causa única",
      E: "Hipernatremia a tratar com água livre"
    },
    correct: "B",
    explanation: "Beer potomania: pouco soluto → retenção de água. Corrige rápido demais se der soro/comida abruptamente. Pearl: cerveja + Na baixo = freie a correção.",
    bibliography: "Beer potomania reviews; European hyponatremia."
  },
  {
    id: "NA-X129",
    tema: "Eletrólitos",
    subtema: "Correção de hipernatremia",
    dificuldade: "intermediario",
    age: 78,
    vars: {
      na: 168
    },
    statement: "{{sexWord}} de {{age}} institucionalizado com Na {{na}}, mucosas secas e déficit de água livre. Qual meta segura de correção se o distúrbio é crônico?",
    options: {
      A: "Cair 20 mEq/L nas primeiras 6 h em todos",
      B: "Corrigir lentamente (em geral ≤10 mEq/L/dia) com água enteral/D5W calculado, evitando edema cerebral por queda abrupta",
      C: "Só SF 0,9% hipertônico relativo sempre",
      D: "Desmopressina em hipovolemia pura sem DI",
      E: "Restrição hídrica — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Hipernatremia crônica: correção lenta. Aguda sintomática pode ser um pouco mais rápida no início. Pearl: idoso + Na 168 = calcule água livre, não “empurre SF”.",
    bibliography: "Adrogué-Madias; ICU electrolyte texts."
  },
  {
    id: "NA-X130",
    tema: "Eletrólitos",
    subtema: "Hipomagnesemia por PPI",
    dificuldade: "intermediario",
    age: 70,
    vars: {
      mg: 0.9,
      k: 2.8
    },
    statement: "{{sexWord}} de {{age}} em omeprazol há anos + diurético, com K {{k}} refratário e Mg {{mg}}. Qual conduta aborda a causa raiz?",
    options: {
      A: "Apenas repor K sem medir/tratar Mg",
      B: "Repor Mg (senão o K não corrige), revisar PPI/diurético e buscar outras perdas",
      C: "Espironolactona alta sem repor Mg em tetania",
      D: "Diagnóstico de SIADH",
      E: "Biópsia renal imediata obrigatória"
    },
    correct: "B",
    explanation: "PPI prolongado causa hipoMg; hipoK refratária é pista. Pearl: K que não sobe = meça o magnésio. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "FDA PPI hypomagnesemia; electrolyte reviews."
  },
  {
    id: "NA-X131",
    tema: "Nefrotoxicidade",
    subtema: "Nefropatia por anticoagulante",
    dificuldade: "avancado",
    age: 72,
    vars: {
      inr: 5.8,
      cr: 3.4
    },
    statement: "{{sexWord}} de {{age}} em warfarina com INR {{inr}}, hematúria e LRA (Cr {{cr}}); biópsia (se feita) mostra hemácias obstruindo túbulos. Qual entidade?",
    options: {
      A: "GN pós-estreptocócica típica",
      B: "Nefropatia relacionada a anticoagulante: reverter excesso de anticoagulação, suporte renal; considerar biópsia se dúvida",
      C: "Apenas infecção de urina sem LRA",
      D: "Estenose de artéria renal bilateral",
      E: "Amiloide atrial — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "ARN: sangramento glomerular → cilindros hemáticos e LRA em supra-anticoagulado. Pearl: INR disparado + LRA + hematúria = ARN.",
    bibliography: "Anticoagulant-related nephropathy reviews; Brodsky."
  },
  {
    id: "NA-X132",
    tema: "Nefrotoxicidade",
    subtema: "Fosfato de sódio / enema",
    dificuldade: "intermediario",
    age: 69,
    vars: {
      p: 9.5,
      ca: 6.9,
      cr: 3.6
    },
    statement: "{{sexWord}} de {{age}} com DRC recebe preparo intestinal com fosfato de sódio oral e evolui com P {{p}}, Ca {{ca}} e Cr {{cr}}. Qual lesão e propósito preventivo?",
    options: {
      A: "Hipofosfatemia isolada benigna",
      B: "Nefropatia por fosfato (depósitos Ca-P): evitar NaP em DRC/idosos; preferir PEG; suporte/diálise se preciso",
      C: "Sempre amiloide — conduta/diagnóstico inadequado para o caso",
      D: "Só hiperpara primário",
      E: "Efeito esperado desejável do preparo"
    },
    correct: "B",
    explanation: "Fosfato oral/enema em DRC → AKI com depósitos. Pearl: DRC não usa preparo de fosfato. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "FDA NaP warnings; phosphate nephropathy."
  },
  {
    id: "NA-X133",
    tema: "Nefrotoxicidade",
    subtema: "Carambola",
    dificuldade: "intermediario",
    age: 58,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} dialítico ingere carambola e apresenta soluços, confusão e crises convulsivas. Qual toxina alimentar clássica?",
    options: {
      A: "Intoxicação por potássio isolada da fruta — só resina",
      B: "Neurotoxina da Averrhoa carambola: dialisar/suporte intensivo; educar dialíticos a evitá-la",
      C: "Botulismo típico — conduta/diagnóstico inadequado para o caso",
      D: "Deficiência de B12 aguda",
      E: "Síndrome de desequilíbrio sem relação com a fruta"
    },
    correct: "B",
    explanation: "Carambola é neurotóxica em DRC/diálise. Pearl: soluço + convulsão no dialítico = pergunte se comeu carambola. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Star fruit intoxication nephrology reviews."
  },
  {
    id: "NA-X134",
    tema: "Onconefrologia",
    subtema: "Hipercalcemia da malignidade",
    dificuldade: "intermediario",
    age: 62,
    vars: {
      ca: 14.2,
      cr: 2.5
    },
    statement: "{{sexWord}} de {{age}} com câncer metastático, Ca {{ca}}, Cr {{cr}}, PTH suprimido. Qual sequência inicial correta?",
    options: {
      A: "Restrição hídrica e tiazídico",
      B: "Hidratação isotônica vigorosa + bifosfonato ou denosumabe (ajustar à TFG/risco) + tratar o tumor; calcitonina como ponte",
      C: "Apenas calcitriol — conduta/diagnóstico inadequado para o caso",
      D: "Espirolactona como hipocalcemiante principal",
      E: "Observação ambulatorial com Ca 14"
    },
    correct: "B",
    explanation: "HiperCa maligna: volume → antirreabsortivo → causa. Pearl: PTH baixo + Ca 14 = câncer até prova em contrário. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Endocrine society hypercalcemia; onconephrology."
  },
  {
    id: "NA-X135",
    tema: "Onconefrologia",
    subtema: "CAR-T e IRA",
    dificuldade: "avancado",
    age: 46,
    vars: {
      cr: 2.8
    },
    statement: "{{sexWord}} de {{age}} após CAR-T com síndrome de liberação de citocinas, hipotensão e creatinina {{cr}}. Qual abordagem renal faz sentido?",
    options: {
      A: "AINE liberados para febre",
      B: "Suporte hemodinâmico/volume criterioso, evitar nefrotóxicos, tratar CRS (ex. tocilizumabe/corticoide conforme protocolo) e dialisar se indicação",
      C: "Ciclofosfamida empírica renal",
      D: "Contraste diário de vigilância",
      E: "Eculizumab universal pós-CAR-T"
    },
    correct: "B",
    explanation: "AKI pós-CAR-T é sobretudo hemodinâmica/inflamatória — trate CRS e proteja o rim. Pearl: CRS + Cr = ICU, não “NTA inexplicada”.",
    bibliography: "CAR-T nephrology reviews; ASTCT CRS grading."
  },
  {
    id: "NA-X136",
    tema: "Genética",
    subtema: "Hiperoxalúria primária — Tx",
    dificuldade: "avancado",
    age: 33,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} com PH1 em diálise por nefrocalcinose terminal. Qual estratégia de transplante é clássica para reduzir recidiva de oxalato no rim?",
    options: {
      A: "Rim isolado sempre suficiente sem discutir fígado",
      B: "Considerar transplante hepático (± renal) porque a enzima deficitária é hepática; adjuvantes (lumasiran/piridoxina) conforme genótipo",
      C: "Apenas colecistectomia",
      D: "Eculizumab previne oxalato",
      E: "Nenhum Tx é possível na PH1"
    },
    correct: "B",
    explanation: "PH1: defeito hepático (AGT) — rim isolado recidiva oxalato. Pearl: PH1 terminal = pense fígado (+rim), não só rim. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "PH transplant consensus; ILLUMINATE era."
  },
  {
    id: "NA-X137",
    tema: "Genética",
    subtema: "Doença de Dent",
    dificuldade: "avancado",
    age: 19,
    vars: {

    },
    statement: "Homem de {{age}} com proteinúria LMW, hipercalciúria, nefrolitíase, fosfatúria e DRC insidiosa; história materna de portadora. Qual diagnóstico?",
    options: {
      A: "Doença de Dent (CLCN5/OCRL) — Fanconi incompleto ligado ao X",
      B: "ADPKD clássica com rins enormes obrigatórios",
      C: "Nefropatia por IgA sem hematúria",
      D: "Lesão mínima — conduta/diagnóstico inadequado para o caso",
      E: "Hiperaldosteronismo — conduta/diagnóstico inadequado para o caso"
    },
    correct: "A",
    explanation: "Dent: menino/jovem com LMW proteinuria + pedras + Fanconi parcial. Pearl: proteinúria “tubular” + cálculos no rapaz = Dent.",
    bibliography: "Dent disease reviews; genetics nephrology."
  },
  {
    id: "NA-X138",
    tema: "Doença túbulo-intersticial",
    subtema: "Ácido aristolóquico",
    dificuldade: "avancado",
    age: 50,
    vars: {
      tfg: 22
    },
    statement: "{{sexWord}} de {{age}} com DRC {{tfg}}, rins contraídos, anemia desproporcional, uso de “ervas chinesas” para emagrecer e urothelial cancer na família de pacientes semelhantes. Qual exposição?",
    options: {
      A: "Apenas AINE sem fibrose",
      B: "Nefropatia por ácido aristolóquico (Chinese herb/Balkan-like): suspender exposição, nefroproteção e vigilância urotelial",
      C: "ADPKD — conduta/diagnóstico inadequado para o caso",
      D: "Amiloide AL sem proteinúria",
      E: "Hiperoxalúria primária típica"
    },
    correct: "B",
    explanation: "Aristolochic acid: fibrose intersticial + risco de carcinoma urotelial. Pearl: erva para emagrecer + DRC + câncer urotelial = aristolochia.",
    bibliography: "AAN/CHN literature; WHO herb warnings."
  },
  {
    id: "NA-X139",
    tema: "Doença túbulo-intersticial",
    subtema: "Nefropatia mesoamericana",
    dificuldade: "avancado",
    age: 35,
    vars: {

    },
    statement: "Homem de {{age}} trabalhador rural em clima quente, DRC sem diabetes/HAS grave, rins pequenos e biópsia com fibrose túbulo-intersticial. Qual entidade epidemiológica?",
    options: {
      A: "Nefropatia diabética clássica",
      B: "Nefropatia mesoamericana / heat-stress nephropathy: prevenção com hidratação/repouso térmico e nefroproteção",
      C: "Policística ADPKD típica",
      D: "GN membrano-proliferativa imunocomplexo sempre",
      E: "Estenose bilateral operável em todos"
    },
    correct: "B",
    explanation: "CKDu/MeN: DRC epidêmica em trabalhadores do calor. Pearl: jovem rural + DRC “sem causa” = pergunte o trabalho sob o sol.",
    bibliography: "Mesoamerican nephropathy reviews; ISN CKDu."
  },
  {
    id: "NA-X140",
    tema: "Vascular renal",
    subtema: "Infarto renal",
    dificuldade: "intermediario",
    age: 45,
    vars: {
      ldh: 980,
      cr: 1.8
    },
    statement: "{{sexWord}} de {{age}} com dor lombar súbita, LDH {{ldh}}, hematúria e Cr {{cr}}; angio-TC com oclusão segmentar. Fibrilação atrial nova. Conduta geral?",
    options: {
      A: "Apenas antiespasmódico para “cólica” sem imagem",
      B: "Anticoagulação (se não contraindicada), analgesia, investigar embolia/dissecção/trombofilia; nefrologia/vascular conforme extensão",
      C: "Nefrectomia imediata em todo infarto",
      D: "Corticoide — conduta/diagnóstico inadequado para o caso",
      E: "Antibiótico isolado — conduta/diagnóstico inadequado para o caso"
    },
    correct: "B",
    explanation: "Infarto renal: LDH alta é pista; FA emboliza. Pearl: dor + LDH + hematúria = infarto, não só pedra. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Renal infarction reviews; vascular medicine."
  },
  {
    id: "NA-X141",
    tema: "Vascular renal",
    subtema: "Page kidney",
    dificuldade: "avancado",
    age: 28,
    vars: {
      pa: "190/120"
    },
    statement: "{{sexWord}} de {{age}} após biópsia renal ou trauma apresenta PA {{pa}} e hematoma subcapsular compressivo. Qual fisiopatologia?",
    options: {
      A: "Hiperaldosteronismo primário novo",
      B: "Page kidney: compressão → isquemia → ativação do eixo RAA; controlar PA, aliviar hematoma se preciso",
      C: "SIADH — conduta/diagnóstico inadequado para o caso",
      D: "Feocromocitoma intra-renal típico",
      E: "Efeito placebo da biópsia"
    },
    correct: "B",
    explanation: "Page kidney: compressão extrínseca gera HAS renovascular. Pearl: pós-biópsia + HAS súbita = veja hematoma. Distratores falham por atrasar terapia eficaz ou ignorar o mecanismo dominante. Pearl: una vinheta, exame e diretriz.",
    bibliography: "Page kidney case series; biopsy complications."
  },
  {
    id: "NA-X142",
    tema: "CKD-MBD",
    subtema: "Calcifilaxia — tiossulfato",
    dificuldade: "avancado",
    age: 56,
    vars: {

    },
    statement: "{{sexWord}} de {{age}} dialítico com placas cutâneas dolorosas necróticas, produto Ca×P alto e biópsia compatível com calcifilaxia. Além de otimizar dialisato/PTH/anticoagulação, qual adjuvante é usado com frequência?",
    options: {
      A: "Vitamina D ativa em megadose",
      B: "Tiossulfato de sódio IV (off-label/protocolos) + cuidado de ferida + revisar warfarina; equipe multidisciplinar",
      C: "Cálcio oral livre — conduta/diagnóstico inadequado para o caso",
      D: "Suspender diálise — conduta/diagnóstico inadequado para o caso",
      E: "Apenas tópica com álcool"
    },
    correct: "B",
    explanation: "Calcifilaxia: mortalidade alta — STS + controle mineral + feridas. Pearl: placa negra dolorosa no dialítico = calcifilaxia até prova em contrário.",
    bibliography: "KU calcification/calciphylaxis reviews; KDIGO MBD."
  },
  {
    id: "NA-X143",
    tema: "Anticoagulação",
    subtema: "DOAC na DRC",
    dificuldade: "intermediario",
    age: 74,
    vars: {
      tfg: 22
    },
    statement: "{{sexWord}} de {{age}} com FA e TFG {{tfg}}. Qual princípio para escolher anticoagulante?",
    options: {
      A: "Qualquer DOAC em dose plena sem ajustar à TFG",
      B: "Ajustar dose ou preferir agentes/estratégias conforme TFG e rótulo; em TFG muito baixa warfarina/estratégia individualizada ainda é comum",
      C: "Aspirina substitui anticoagulação na FA valvular reumática",
      D: "Anticoagular só se CHA₂DS₂-VASc = 0",
      E: "Heparina oral de uso domiciliar"
    },
    correct: "B",
    explanation: "DRC avançada muda dose/escolha de DOAC; leia TFG e bula. Pearl: TFG 22 não é “apixabana automática sem pensar”. Distratores atrasam terapia ou ignoram o mecanismo. Pearl: vinheta + diretriz.",
    bibliography: "EHRA/ESC AF; DOAC in CKD reviews; KDIGO."
  },
  {
    id: "NA-X144",
    tema: "Gravidez",
    subtema: "Lúpus e gestação",
    dificuldade: "avancado",
    age: 29,
    vars: {

    },
    statement: "Mulher de {{age}} com nefrite lúpica em remissão há 8 meses, anti-Ro positivo, deseja gestar. Qual pacote de cuidados é essencial?",
    options: {
      A: "Manter MMF e IECA até o parto",
      B: "Planejar gestação em remissão, trocar teratogênicos (MMF→AZA), manter HCQ, AAS em muitos casos, vigilância de anti-Ro (BAV fetal) e proteinúria/PA",
      C: "Suspender HCQ sempre na gestação",
      D: "Ciclofosfamida oral contínua na concepção",
      E: "Proibir gestação após qualquer LN"
    },
    correct: "B",
    explanation: "Gestação em LN exige remissão + troca de fármacos + HCQ + AAS ± monitoramento anti-Ro. Pearl: não engravide no flare nem no MMF.",
    bibliography: "EULAR/ACR reproductive health; KDIGO LN."
  },
  {
    id: "NA-X145",
    tema: "Infecção e rim",
    subtema: "Hantavírus",
    dificuldade: "avancado",
    age: 37,
    vars: {
      cr: 5.1
    },
    statement: "{{sexWord}} de {{age}} com febre, mialgia, trombocitopenia, miopia transitória e LRA oligúrica (Cr {{cr}}) após exposição a roedores em zona rural. Qual infecção e conduta?",
    options: {
      A: "PSGN pós-faringite típica sem trombocitopenia",
      B: "Febre hemorrágica com síndrome renal (hantavírus): suporte/diálise precoce; isolamento de precauções conforme protocolo",
      C: "Apenas dengue sem acometimento renal possível",
      D: "Amiloide AA hiperaguda",
      E: "Estenose de artéria renal febril"
    },
    correct: "B",
    explanation: "Hantavirus HFRS: febre + trombocitopenia + LRA; suporte é a base. Pearl: roedor + LRA + plaquetas baixas = hantavírus no diferencial.",
    bibliography: "CDC hantavirus; tropical nephrology."
  }
];

module.exports = { ADV_MASTERS_EXTRA3 };
