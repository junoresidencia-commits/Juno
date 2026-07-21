/**
 * Casos-mestres — Nefrologia Pediátrica.
 * Estilo prova de título SBP-Nefroped / IPNA / residência.
 *
 * Regras:
 *  - Vinheta clínica realista (idade, peso, PA, labs)
 *  - Um "melhor" comportamento clínico (não múltiplas verdadeiras)
 *  - Distratores plausíveis (erros clínicos comuns), nunca absurdos
 *  - Explicação: por que a correta é correta + por que cada errada é errada,
 *    com referência a IPNA/KDIGO/KDOQI/SBP quando aplicável
 *  - `dificuldade`: basico | intermediario | avancado
 */

const PED_MASTERS = [
  // ============ SÍNDROMES NEFRÓTICAS ============
  {
    id: 'NP-T001',
    tema: 'Síndrome nefrótica',
    subtema: 'Corticossensível — primeiro episódio',
    dificuldade: 'basico',
    age: 4,
    vars: { alb: 1.9, col: 340, upcr: 5.2, cr: 0.4 },
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg), previamente hígido(a), apresenta edema palpebral matinal há 5 dias, evoluindo para edema de membros inferiores e ganho de 2 kg. PA no percentil 50 para idade/sexo/estatura. Sem hematúria macroscópica. Exames: albumina {{alb}} g/dL, colesterol total {{col}} mg/dL, creatinina {{cr}} mg/dL (adequada para idade), relação proteína/creatinina urinária {{upcr}} mg/mg, C3 normal, FAN negativo, sorologias virais negativas. Qual é a conduta inicial mais adequada?',
    options: {
      A: 'Biópsia renal imediata antes de qualquer terapia específica',
      B: 'Prednisona/prednisolona oral 60 mg/m²/dia (máx 60 mg) por 4–6 semanas, seguida de esquema em dias alternados, associada a orientações sobre edema, sódio e vacinação',
      C: 'Pulsoterapia com ciclofosfamida endovenosa como primeira linha',
      D: 'Antibiótico empírico prolongado e observação ambulatorial sem corticoide',
    },
    correct: 'B',
    explanation:
      'Trata-se de síndrome nefrótica idiopática típica na faixa etária clássica (1–12 anos), sem sinais de atipia (HAS grave, hipocomplementemia, IRA, FAN+, hematúria macroscópica persistente). A recomendação IPNA é iniciar corticoide oral em dose plena SEM biópsia inicial. A alternativa A está errada porque biópsia não é rotina no debut típico entre 1–12 anos. C está errada porque ciclofosfamida é 2ª/3ª linha em cortico-dependência ou recidivas frequentes selecionadas — nunca primeira. D está errada porque a doença primária é imunológica, não infecciosa, e postergar corticoide aumenta risco de trombose e infecções. Pearl: SN típica → corticoide primeiro; atipia (idade <1 ou >12, HAS grave, C3 baixo, LRA persistente) → pensar em biópsia/secundária.',
    bibliography: 'IPNA Clinical Practice Recommendations for the Diagnosis and Management of Steroid-Sensitive Nephrotic Syndrome (Trautmann et al., 2023); KDIGO Glomerular Diseases 2021.',
  },
  {
    id: 'NP-T002',
    tema: 'Síndrome nefrótica',
    subtema: 'Corticorresistência',
    dificuldade: 'avancado',
    age: 6,
    vars: { alb: 1.6, upcr: 6.1, cr: 0.6 },
    statement:
      '{{sexWord}} de {{age}} com SN idiopática em uso de prednisolona 60 mg/m²/dia há 6 semanas sem remissão (albumina {{alb}} g/dL, UPCR {{upcr}} mg/mg). Creatinina {{cr}} mg/dL, PA controlada, C3 normal, FAN negativo. Qual a conduta mais adequada neste momento?',
    options: {
      A: 'Manter prednisolona diária por mais 6 meses, sem reavaliação diagnóstica',
      B: 'Indicar biópsia renal, iniciar investigação genética (NPHS1/NPHS2/WT1 e painel de podocitopatias) e planejar 2ª linha com inibidor de calcineurina (tacrolimus ou ciclosporina)',
      C: 'Iniciar rituximabe como primeira droga, sem biópsia nem genética',
      D: 'Suspender toda imunossupressão e observar por 6 meses',
    },
    correct: 'B',
    explanation:
      'Ausência de remissão após ≥4 semanas de corticoide em dose plena caracteriza corticorresistência (SRNS). A recomendação IPNA 2020 é biópsia renal (para descartar GESF, esclerose mesangial difusa, outras) + investigação genética (que altera prognóstico e conduta — formas monogênicas não respondem a imunossupressão), com introdução de ICN como segunda linha. A está errada: manter corticoide diário sem reavaliação eleva toxicidade sem benefício. C está errada porque rituximabe entra tipicamente após falha de ICN ou em cortico-dependência; iniciar sem biópsia é conduta imprópria. D está errada porque a proteinúria maciça persistente leva a DRC, trombose e infecções. Pearl: SRNS = biópsia + genética; escolha do imunossupressor depende do achado.',
    bibliography: 'IPNA Clinical Practice Recommendations for the Diagnosis and Management of Steroid-Resistant Nephrotic Syndrome (Trautmann et al., Pediatr Nephrol 2020).',
  },
  {
    id: 'NP-T003',
    tema: 'Síndrome nefrótica',
    subtema: 'Recidiva pós-IVAS',
    dificuldade: 'basico',
    age: 5,
    vars: { upcr: 3.8, alb: 2.4 },
    statement:
      '{{sexWord}} de {{age}} com SN corticossensível, em remissão há 4 meses após tratamento inicial. Após IVAS, reaparece edema palpebral, ganho ponderal e UPCR {{upcr}} mg/mg (albumina {{alb}} g/dL). Sem dor abdominal, febre ou sinais neurológicos. Qual a conduta?',
    options: {
      A: 'Reiniciar prednisolona 60 mg/m²/dia até 3 dias após remissão da proteinúria, seguido de 40 mg/m²/dose em dias alternados por 4 semanas, tratando o gatilho infeccioso conforme necessário',
      B: 'Iniciar pulsoterapia com ciclofosfamida imediatamente',
      C: 'Internação para diálise preventiva pela recidiva',
      D: 'Ignorar a proteinúria pois a creatinina está normal',
    },
    correct: 'A',
    explanation:
      'Recidivas desencadeadas por IVAS são a regra no SSNS (∼2/3 das crianças). O manejo padrão é retomar corticoide no esquema de recidiva (curto), tratar a infecção e reavaliar. B: ciclofosfamida entra em SN cortico-dependente/recidivas frequentes documentadas, não na primeira recidiva. C: recidiva sem LRA/uremia/congestão não indica diálise. D: ignorar recidiva expõe a trombose, infecção e hipovolemia. Pearl: educar a família a testar fita urinária domiciliar durante IVAS.',
    bibliography: 'IPNA SSNS Recommendations 2023; SBP Diretrizes de Nefropediatria.',
  },
  {
    id: 'NP-T004',
    tema: 'Síndrome nefrótica',
    subtema: 'Cortico-dependência / poupador',
    dificuldade: 'intermediario',
    age: 7,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com SN idiopática apresenta 3 recidivas em 12 meses, sendo 2 delas durante a redução do corticoide (características de cortico-dependência). Peso está no percentil 97 e altura desacelerando; presença de fácies cushingoide e HAS incipiente. Qual a próxima estratégia?',
    options: {
      A: 'Aumentar prednisolona para 2 mg/kg/dia contínuo indefinidamente',
      B: 'Introduzir agente poupador de corticoide (levamisol, micofenolato de mofetila, inibidor de calcineurina ou rituximabe conforme perfil) e planejar desmame do corticoide',
      C: 'Suspender toda medicação e alta',
      D: 'Iniciar diurético de alça em uso crônico como único tratamento',
    },
    correct: 'B',
    explanation:
      'SN cortico-dependente com toxicidade esteroidal indica agente poupador: levamisol (formas leves), MMF, ICN (tacro/ciclo) e rituximabe. A escolha depende do perfil de toxicidade, idade, aderência e recursos. A está errada porque perpetua a toxicidade. C ignora o risco de recidiva grave. D não é doença-modificadora. Pearl: cortico-toxicidade + recidivas frequentes = poupador de corticoide, guiado por IPNA/experiência local.',
    bibliography: 'IPNA SSNS Recommendations 2023.',
  },
  {
    id: 'NP-T005',
    tema: 'Síndrome nefrótica',
    subtema: 'Complicação — peritonite',
    dificuldade: 'intermediario',
    age: 5,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com SN em atividade (ascite, albumina baixa) apresenta há 12 h dor abdominal difusa, febre 39 °C, defesa localizada em fossa ilíaca direita e leucocitose. Sem cirurgia prévia. Qual é a principal preocupação e conduta?',
    options: {
      A: 'Considerar constipação e alta domiciliar',
      B: 'Peritonite bacteriana espontânea (Streptococcus pneumoniae, gram-negativos): paracentese diagnóstica, hemocultura e antibiótico empírico endovenoso (cobertura para pneumococo e Gram-negativos), mantendo/otimizando corticoide',
      C: 'Suspender corticoide e observar por 48 h',
      D: 'Infarto agudo do miocárdio',
    },
    correct: 'B',
    explanation:
      'SN em atividade cursa com hipogamaglobulinemia, perda de opsoninas e ascite propícia à infecção; pneumococo é o agente clássico. Diagnóstico por análise do líquido ascítico (celularidade, Gram, cultura) e ATB empírico precoce salvam a criança. A: adiar diagnóstico é fatal. C: suspender corticoide não trata infecção. D: contexto errado. Pearl: em toda dor abdominal + SN ativa, PBE até prova em contrário.',
    bibliography: 'IPNA SSNS 2023 — Complications; SBP.',
  },
  {
    id: 'NP-T006',
    tema: 'Síndrome nefrótica',
    subtema: 'Trombose',
    dificuldade: 'avancado',
    age: 8,
    vars: { alb: 1.4 },
    statement:
      '{{sexWord}} de {{age}} com SN grave (albumina {{alb}} g/dL) queixa dor e edema assimétrico em membro inferior direito. Sem febre. Qual a conduta mais adequada?',
    options: {
      A: 'Massagem local e observação',
      B: 'Suspeitar trombose venosa profunda (perda urinária de antitrombina III, plasminogênio; hiperfibrinogenemia), solicitar Doppler venoso e iniciar anticoagulação plena (heparina de baixo peso molecular) se confirmada',
      C: 'Aumentar apenas dose de furosemida',
      D: 'Contraindicar qualquer imagem para não expor à radiação',
    },
    correct: 'B',
    explanation:
      'Estado pró-trombótico é característico da SN (albumina <2 g/dL, membranosa e amiloidose têm o maior risco). Edema assimétrico exige investigação. Após confirmação, HBPM é o padrão pediátrico. Duração ≥3 meses e enquanto durar nefrose grave. A negligencia o risco. C piora a hemoconcentração. D: ultrassom Doppler não usa radiação. Pearl: assimetria + SN ativa = TVP até prova em contrário.',
    bibliography: 'Kerlin BA et al., Thrombosis in nephrotic syndrome; IPNA.',
  },
  {
    id: 'NP-T007',
    tema: 'Síndrome nefrótica',
    subtema: 'Congênita',
    dificuldade: 'avancado',
    age: 0.1,
    vars: { alb: 1.2, upcr: 20 },
    statement:
      'RN de {{age}} ({{weight}} kg) com edema, ascite, albumina {{alb}} g/dL e proteinúria maciça (UPCR {{upcr}} mg/mg) desde o nascimento. Placenta grande à revisão do parto. Qual a conduta e hipótese principal?',
    options: {
      A: 'SN idiopática típica — iniciar prednisolona',
      B: 'SN congênita (tipo finlandês / NPHS1, NPHS2, WT1): suporte agressivo (albumina, nutrição hipercalórica, IECA, indometacina em protocolo, tromboprofilaxia), investigação genética e planejamento de nefrectomia/transplante em centros de referência',
      C: 'Antibiótico empírico e alta',
      D: 'Ignorar proteinúria, tratar apenas edema com furosemida',
    },
    correct: 'B',
    explanation:
      'SN de manifestação nos primeiros 3 meses de vida é quase sempre monogênica; a mais clássica é a tipo finlandês (mutações em NPHS1/nefrina). O manejo é totalmente diferente do SSNS — corticoide NÃO funciona e adiciona toxicidade. A abordagem inclui suporte proteico/lipídico, IECA, indometacina, tromboprofilaxia, controle de perdas e planejamento de TRS/Tx. Pearl: proteinúria maciça em <3 meses = doença genética, encaminhar já.',
    bibliography: 'IPNA Congenital NS reviews; Jalanko H., Pediatr Nephrol.',
  },
  {
    id: 'NP-T008',
    tema: 'Glomerulonefrite',
    subtema: 'Pós-estreptocócica (GNPE)',
    dificuldade: 'basico',
    age: 8,
    vars: { sbp: 142, dbp: 92, c3: 42, cr: 1.1 },
    statement:
      '{{sexWord}} de {{age}} apresenta há 3 dias hematúria macroscópica ("coca-cola"), edema periorbital e cefaleia. História de impetigo há 3 semanas. PA {{sbp}}×{{dbp}} mmHg (> P95 + 12 mmHg). C3 {{c3}} mg/dL (baixo), C4 normal, ASLO/anti-DNase B elevados, creatinina {{cr}} mg/dL. Qual a conduta mais adequada?',
    options: {
      A: 'Imunossupressão com ciclofosfamida de rotina',
      B: 'Suporte clínico: restrição hidrossalina, controle pressórico (diurético de alça ± vasodilatador se emergência), tratamento da infecção residual e vigilância; C3 deve normalizar em 8–12 semanas',
      C: 'Nefrectomia',
      D: 'Alta imediata sem controle de PA nem seguimento',
    },
    correct: 'B',
    explanation:
      'GNPE típica: latência 1–3 semanas pós-estreptocócica, sedimento nefrítico, C3 baixo com C4 normal (via alternativa) e curso autolimitado. Tratamento é suporte — volume, PA, ATB residual. A imunossupressão só entra em curso rapidamente progressivo com biópsia (raro). C, D são absurdos. Pearl: se C3 não normaliza em 12 semanas, reavaliar (C3 nefrítico? MPGN?).',
    bibliography: 'KDIGO Glomerular Diseases 2021; SBP Nefropediatria.',
  },
  {
    id: 'NP-T009',
    tema: 'Nefropatia por IgA',
    subtema: 'Hematúria sinfaringítica',
    dificuldade: 'intermediario',
    age: 12,
    vars: { c3: 110, cr: 0.7, upcr: 0.4 },
    statement:
      '{{sexWord}} de {{age}} inicia hematúria macroscópica no mesmo dia de faringite aguda, sem edema significativo. C3 {{c3}} mg/dL (normal), creatinina {{cr}} mg/dL, UPCR {{upcr}} mg/mg. Repete hematúria em outras IVAS. Qual a hipótese principal?',
    options: {
      A: 'GNPE (típica com C3 baixo e latência de semanas)',
      B: 'Nefropatia por IgA — hematúria macroscópica sincrônica com IVAS, C3 normal; conduta inicial com nefroproteção (IECA se proteinúria >0,5 g/dia), acompanhamento e biópsia se proteinúria persistente ou queda de TFG',
      C: 'ITU não complicada',
      D: 'Necrose tubular aguda isquêmica',
    },
    correct: 'B',
    explanation:
      'Padrão sinfaringítico (hematúria no mesmo dia da faringite) + C3 normal é a assinatura da IgA. GNPE tem latência de 1–3 semanas e C3 baixo. Cultura urinária/leucocitúria descartariam ITU. NTA é secundária. A conduta é nefroproteção e biópsia apenas se risco de progressão (proteinúria >0,5–1 g/dia, HAS, queda de TFG). Pearl: no exame, "hematúria no mesmo dia da dor de garganta" = IgA.',
    bibliography: 'KDIGO Glomerular Diseases 2021 (IgA); IPNA.',
  },
  {
    id: 'NP-T010',
    tema: 'Vasculite IgA (Henoch-Schönlein)',
    subtema: 'Nefrite',
    dificuldade: 'intermediario',
    age: 7,
    vars: { upcr: 1.8, cr: 0.6 },
    statement:
      '{{sexWord}} de {{age}} com púrpura palpável em membros inferiores há 10 dias, artralgia, dor abdominal cólica e evacuações com sangue. Urina I com hematúria dismórfica e UPCR {{upcr}} mg/mg; creatinina {{cr}} mg/dL. Sem HAS. Qual a conduta nefrológica inicial correta?',
    options: {
      A: 'Ignorar sedimento urinário pois "púrpura é só pele"',
      B: 'Vasculite por IgA (HSP) com nefrite — monitorar PA e função renal, IECA/BRA se proteinúria persistente >0,5 g/dia, e escalonar imunossupressão (corticoide ± ciclofosfamida/MMF) se nefrite moderada/grave (proteinúria maciça ou queda de TFG); biópsia guia terapia',
      C: 'Antibiótico prolongado como cura da nefrite',
      D: 'Diálise imediata em todos os casos',
    },
    correct: 'B',
    explanation:
      'Toda vasculite por IgA deve ter urina I e PA seriadas por ≥6 meses. Nefrite pode aparecer semanas após a púrpura. Casos leves → vigilância + IECA/BRA; moderados/graves → biópsia e imunossupressão. A é erro clássico e leva a subdiagnóstico de nefrite tardia. C não modifica curso. D é desproporcional. Pearl: pense IgA-vasculite = pele+ articulação+ intestino+ rim; siga rim por meses.',
    bibliography: 'SHARE/IPNA recommendations for IgA vasculitis nephritis.',
  },
  {
    id: 'NP-T011',
    tema: 'SHU',
    subtema: 'Típica (STEC-HUS, D+)',
    dificuldade: 'intermediario',
    age: 3,
    vars: { hb: 7.2, plaq: 42000, cr: 2.4, k: 5.8 },
    statement:
      '{{sexWord}} de {{age}} internado há 5 dias por diarreia sanguinolenta evolui com palidez intensa, oligúria e edema. Hb {{hb}} g/dL, plaquetas {{plaq}}/µL, esquizócitos ao esfregaço, LDH elevado, creatinina {{cr}} mg/dL e K {{k}} mEq/L. Qual a conduta inicial correta?',
    options: {
      A: 'Antibiótico empírico imediato para "eliminar a toxina"',
      B: 'Suporte cuidadoso: reposição isotônica ajustada, correção hidroeletrolítica, transfusão para Hb <7 g/dL, indicar diálise se AEIOU; NÃO usar ATB rotineiro na fase diarreica típica; evitar antimotilidade e AINE',
      C: 'Plasmaférese em toda SHU D+',
      D: 'Transfusão profilática de plaquetas em massa mesmo sem sangramento',
    },
    correct: 'B',
    explanation:
      'STEC-HUS: tríade MAHA + plaquetopenia + LRA após colite. Antibiótico na fase diarreica pode aumentar liberação de Shiga-toxina e piorar o quadro (Wong CS et al., NEJM 2000). Plaquetas profiláticas não são recomendadas sem sangramento (podem alimentar a MAT). Plasmaférese e eculizumabe NÃO são de rotina no D+ típico (diferentemente do aHUS). Pearl: SHU D+ = suporte de excelência; aHUS = pensar complemento.',
    bibliography: 'IPNA STEC-HUS/aHUS guidance; Loirat C., Frémeaux-Bacchi V.',
  },
  {
    id: 'NP-T012',
    tema: 'SHU',
    subtema: 'Atípica (aHUS)',
    dificuldade: 'avancado',
    age: 2,
    vars: { cr: 3.1, c3: 60 },
    statement:
      '{{sexWord}} de {{age}} apresenta MAHA + plaquetopenia + LRA (creatinina {{cr}} mg/dL) SEM diarreia prodrômica, com C3 {{c3}} mg/dL. Após suporte inicial, tem recidiva. Qual linha diagnóstica/terapêutica?',
    options: {
      A: 'Tratar como desidratação simples',
      B: 'Suspeitar SHU atípica (desregulação do complemento — mutações em CFH, CFI, C3, MCP): dosar ADAMTS13 (afastar PTT), painel de complemento e genética; iniciar eculizumabe (anti-C5) precocemente, vacinar contra meningococo e planejar transplante em centros de referência',
      C: 'Corticoide isolado resolve',
      D: 'Contraindicar diálise mesmo com hipercalemia refratária',
    },
    correct: 'B',
    explanation:
      'HUS sem diarreia, recorrente ou familiar sugere aHUS. Bloqueio do C5 com eculizumabe (ou ravulizumabe) mudou o prognóstico — quanto mais cedo, maior a preservação renal. Antes precisa-se afastar PTT (ADAMTS13 <10%). Vacinação anti-meningocócica é obrigatória por causa do bloqueio terminal do complemento. Pearl: HUS sem diarreia = bandeira vermelha para atípica.',
    bibliography: 'IPNA aHUS guideline (Loirat C., Fakhouri F., Ariceta G., 2016).',
  },
  {
    id: 'NP-T013',
    tema: 'Glomerulonefrite rapidamente progressiva',
    subtema: 'ANCA na adolescência',
    dificuldade: 'avancado',
    age: 14,
    vars: { cr: 3.8, upcr: 3.0 },
    statement:
      'Adolescente de {{age}} com hematúria, proteinúria UPCR {{upcr}}, oligúria, hemoptise leve e creatinina {{cr}} mg/dL em 10 dias. C3 normal, ANCA-MPO positivo. Qual a conduta?',
    options: {
      A: 'Observação clínica sem imunossupressão',
      B: 'Tratar como GN rapidamente progressiva/vasculite ANCA: biópsia urgente, indução com corticoide em pulso + rituximabe ou ciclofosfamida, considerar plasmaférese em pulmão-rim/creatinina muito alta, manutenção com rituximabe/azatioprina; profilaxia de pneumocistose',
      C: 'Amoxicilina isoladamente para "infecção"',
      D: 'Restrição proteica exclusiva',
    },
    correct: 'B',
    explanation:
      'Ascensão rápida da creatinina + sedimento ativo + ANCA+ é emergência renal. Indução com esteroide + rituximabe (preferido em jovens) ou ciclofosfamida (menor gonadotoxicidade → escolha depende); plasmaférese em pulmão-rim (PEXIVAS mostrou benefício em subgrupos). Adiar imunossupressão custa néfrons. Pearl: creatinina em foguete + sedimento ativo = agir agora.',
    bibliography: 'KDIGO Vasculitis 2024; PEXIVAS; SHARE.',
  },
  {
    id: 'NP-T014',
    tema: 'Nefrite lúpica',
    subtema: 'Classe IV',
    dificuldade: 'avancado',
    age: 15,
    vars: { upcr: 3.2, cr: 1.4, c3: 40 },
    statement:
      'Adolescente de {{age}} com LES (FAN 1:1280, anti-dsDNA alto, C3 {{c3}} mg/dL baixo, C4 baixo), UPCR {{upcr}}, hematúria e creatinina {{cr}} mg/dL. Biópsia: nefrite lúpica classe IV (proliferativa difusa). Qual o esquema de indução?',
    options: {
      A: 'Apenas hidroxicloroquina',
      B: 'Corticoide em pulso 30 mg/kg/dia (máx 1 g) por 3 dias seguido de 1 mg/kg/dia com desmame + micofenolato de mofetila 600 mg/m² 2× dia OU ciclofosfamida (regime NIH/Euro-lupus), associado a hidroxicloroquina e nefroproteção com IECA/BRA',
      C: 'Nefrectomia',
      D: 'Antibiótico prolongado',
    },
    correct: 'B',
    explanation:
      'NL classe III/IV (proliferativas) exige indução (corticoide + MMF ou ciclofosfamida) seguida de manutenção (MMF ou azatioprina). Hidroxicloroquina para TODOS. Rituximabe e voclosporina são opções emergentes. HCQ isolada não trata classe IV. Pearl: classe IV nunca é "observar"; adicionar voclosporina/belimumabe reduz proteinúria em selecionados.',
    bibliography: 'KDIGO Lupus Nephritis 2024; SHARE/CARRA pediatric LN.',
  },
  {
    id: 'NP-T015',
    tema: 'Alport',
    subtema: 'Diagnóstico',
    dificuldade: 'intermediario',
    age: 11,
    vars: { upcr: 0.6 },
    statement:
      'Menino de {{age}} com hematúria microscópica persistente desde os 3 anos, agora com proteinúria UPCR {{upcr}}; tio materno em diálise aos 30 anos. Audiometria: perda auditiva neurossensorial bilateral em altas frequências. Qual a hipótese e conduta?',
    options: {
      A: 'ITU de repetição',
      B: 'Síndrome de Alport (COL4A3/4/5): confirmar por genética (preferível a biópsia), iniciar IECA precoce assim que houver microalbuminúria/proteinúria, rastrear irmãos e mãe (portadora)',
      C: 'GNPE isolada',
      D: 'Hipercalciúria pura',
    },
    correct: 'B',
    explanation:
      'Herança ligada ao X (COL4A5) é a mais comum em meninos, com progressão à DRC e surdez. IECA precoce comprovadamente atrasa a diálise. Genética substituiu biópsia em muitos centros. Portadoras (mães) devem ser rastreadas — não são apenas "assintomáticas". Pearl: hematúria familiar + surdez = Alport.',
    bibliography: 'Expert Guidelines for Diagnosis of Alport Syndrome (Kashtan, Gross et al., Kidney Int 2018).',
  },
  {
    id: 'NP-T016',
    tema: 'ITU',
    subtema: 'Febril — primeiro episódio',
    dificuldade: 'basico',
    age: 0.6,
    vars: {},
    statement:
      'Lactente de {{age}} ({{weight}} kg), sexo {{sexAdj}}, com febre há 48 h sem foco. Urina coletada por cateterismo: >5 leucócitos/campo, nitrito positivo, cultura com E. coli >100 000 UFC/mL sensível a cefalosporinas. Boa resposta clínica. Qual o próximo passo mais indicado?',
    options: {
      A: 'Nenhuma imagem, alta',
      B: 'Ultrassonografia de rins e vias urinárias após o primeiro episódio de ITU febril em <2 anos; UCG e/ou DMSA conforme achados (US alterada, ITU atípica, recorrência)',
      C: 'Cistoscopia de rotina',
      D: 'Nefrectomia profilática',
    },
    correct: 'B',
    explanation:
      'Todo lactente <2 anos com ITU febril deve fazer US para triagem de anomalia estrutural. UCG e DMSA seguem critérios (US alterada, ITU recorrente, germe atípico). Adiar imagem posterga diagnóstico de RVU/uropatia obstrutiva. Pearl: US é 1º; UCG/DMSA conforme critério.',
    bibliography: 'AAP UTI Guideline (2011, reaffirmed); NICE; SBP.',
  },
  {
    id: 'NP-T017',
    tema: 'ITU',
    subtema: 'Recorrente',
    dificuldade: 'intermediario',
    age: 3,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com 3 ITU febris em 6 meses; US renal normal. Sem constipação. Qual a próxima investigação?',
    options: {
      A: 'Nenhuma',
      B: 'Investigar refluxo vesicoureteral (uretrocistografia miccional), disfunção miccional (histórico + diário miccional; urodinâmica em selecionados) e cintilografia com DMSA para cicatrizes',
      C: 'Nefrectomia bilateral',
      D: 'Corticoide sistêmico',
    },
    correct: 'B',
    explanation:
      'ITU febril recorrente requer investigação de anatomia (RVU, ureterocele, duplicidade) e da função miccional (bexiga hiperativa, dissinergia, constipação). DMSA identifica cicatrizes/PNA. Pearl: constipação é vilã silenciosa das ITU.',
    bibliography: 'AAP; ESPU; SBP.',
  },
  {
    id: 'NP-T018',
    tema: 'Refluxo vesicoureteral',
    subtema: 'Manejo conservador',
    dificuldade: 'intermediario',
    age: 2,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com ITU febril recorrente; UCG mostra RVU grau III unilateral com rim funcional e contralateral normal, sem disfunção miccional. Qual a conduta inicial?',
    options: {
      A: 'Cirurgia imediata em todo grau III',
      B: 'Conduta conservadora: profilaxia antibiótica em selecionados (crianças <1 ano, RVU alto grau com PNA ou disfunção miccional), tratamento vigoroso das ITU, controle de constipação, US e DMSA seriados; cirurgia se breakthrough ou cicatrizes progressivas',
      C: 'Suspender seguimento urológico',
      D: 'Diálise preventiva',
    },
    correct: 'B',
    explanation:
      'RVU baixos/intermediários resolvem espontaneamente em taxas altas. Cirurgia (endoscópica ou reimplante) reserva-se a falha do conservador. Estudos RIVUR mostraram redução de recorrência com profilaxia em subgrupos, mas não redução de cicatrizes. Pearl: RVU ≠ operar automático.',
    bibliography: 'AUA/ESPU VUR guideline; RIVUR trial.',
  },
  {
    id: 'NP-T019',
    tema: 'Válvula de uretra posterior',
    subtema: 'Descompressão',
    dificuldade: 'avancado',
    age: 0.03,
    vars: { cr: 1.8 },
    statement:
      'RN masculino de {{age}} com massa hipogástrica palpável, jato urinário fraco em gotas, ureterohidronefrose bilateral à US, bexiga espessada e creatinina {{cr}} mg/dL. Qual a prioridade imediata?',
    options: {
      A: 'Observação domiciliar até 6 meses',
      B: 'Descompressão urgente do trato urinário (sondagem vesical + estabilização hidroeletrolítica), confirmação com uretrocistografia e planejamento de ablação endoscópica das valvas; monitorar poliúria pós-obstrutiva',
      C: 'Nefrectomia bilateral',
      D: 'Diurético de alça sem aliviar obstrução',
    },
    correct: 'B',
    explanation:
      'PUV é a principal causa de uropatia obstrutiva no menino e a principal causa de DRC pediátrica cirurgicamente corrigível. Descompressão precoce (sonda), estabilização e ablação endoscópica das valvas em centro especializado. Poliúria pós-obstrutiva é armadilha. Pearl: RN masculino + bexiga cheia + jato fraco → pensar PUV.',
    bibliography: 'Pediatric urology consensus; IPNA.',
  },
  {
    id: 'NP-T020',
    tema: 'CAKUT',
    subtema: 'Hidronefrose antenatal',
    dificuldade: 'intermediario',
    age: 0.05,
    vars: {},
    statement:
      'RN de {{age}} nascido a termo com hidronefrose antenatal moderada unilateral (SFU 3); pós-natal estável, diurese normal, US confirma dilatação pielocalicial sem ureter dilatado. Qual a conduta inicial?',
    options: {
      A: 'Pieloplastia na primeira semana em todos os casos',
      B: 'Seguimento com US seriadas (primeira ao redor de 4–6 semanas de vida) e avaliação urológica; investigação adicional (renograma diurético, UCG) se progressão ou ITU',
      C: 'Alta sem controle',
      D: 'Diálise neonatal profilática',
    },
    correct: 'B',
    explanation:
      'Maioria das hidronefroses antenatais unilaterais moderadas regride ou estabiliza. US precoce (>48 h de vida para evitar falso negativo por oligúria fisiológica) e vigilância. Cirurgia se obstrução funcional/perda de função. Pearl: dilatação ≠ obstrução.',
    bibliography: 'SFU/UTD grading; ESPR.',
  },
  {
    id: 'NP-T021',
    tema: 'CAKUT',
    subtema: 'UPJO obstrutiva',
    dificuldade: 'intermediario',
    age: 0.4,
    vars: {},
    statement:
      'Lactente de {{age}} com hidronefrose progressiva, córtex renal adelgaçando e renograma com curva obstrutiva e função diferencial <40% na estenose da junção ureteropiélica. Qual a conduta?',
    options: {
      A: 'Observação indefinida mesmo com queda de função',
      B: 'Pieloplastia (Anderson-Hynes) por obstrução com repercussão funcional',
      C: 'ATB profilático substitui cirurgia',
      D: 'Nefrectomia contralateral',
    },
    correct: 'B',
    explanation:
      'Estenose de JUP com padrão obstrutivo (T½ >20 min) e perda de função exige pieloplastia. Renograma é o divisor de águas. Pearl: US mostra dilatação; renograma mostra obstrução.',
    bibliography: 'ESPU/AUA UPJO.',
  },
  {
    id: 'NP-T022',
    tema: 'Rim único / displasia',
    subtema: 'Seguimento',
    dificuldade: 'basico',
    age: 5,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com rim único congênito (agenesia contralateral) descoberta antenatal. Assintomático, PA normal, sem proteinúria. Qual seguimento?',
    options: {
      A: 'Nenhum seguimento necessário',
      B: 'Acompanhamento anual com PA, creatinina/TFGe, UACR/UPCR e US; contra-indicar AINE crônico; educar sobre proteção do rim único e evitar esportes de contato severo',
      C: 'Nefrectomia do rim único',
      D: 'Diálise preventiva aos 10 anos',
    },
    correct: 'B',
    explanation:
      'Rim único é considerado CAKUT e portador de risco de hiperfiltração, HAS e proteinúria a longo prazo. Seguimento anual e nefroproteção comportamental. Pearl: informar familiares que rim único é acompanhado a vida toda.',
    bibliography: 'IPNA/ESPN reviews on solitary functioning kidney.',
  },
  {
    id: 'NP-T023',
    tema: 'ADPKD/ARPKD',
    subtema: 'ARPKD',
    dificuldade: 'avancado',
    age: 0.05,
    vars: {},
    statement:
      'RN com rins muito aumentados hiperecogênicos, hipoplasia pulmonar, oligoâmnio antenatal e fibrose hepática à USG. História familiar de consanguinidade. Qual a hipótese e manejo inicial?',
    options: {
      A: 'ADPKD clássica de adulto — nada a fazer',
      B: 'ARPKD (mutação PKHD1): suporte ventilatório neonatal, controle de HAS, seguir função hepática (fibrose congênita/colangite), acompanhamento em centro terciário; considerar Tx renal-hepático em casos avançados',
      C: 'Nefropatia por contraste',
      D: 'Doença de Fabry',
    },
    correct: 'B',
    explanation:
      'ARPKD é doença neonatal grave — muitos morrem por hipoplasia pulmonar. Sobreviventes desenvolvem HAS e complicações hepáticas (colangite recorrente, hipertensão portal). Tx combinado renal-hepático em casos selecionados. Pearl: fibrose hepática + rins gigantes no RN = ARPKD.',
    bibliography: 'IPNA ARPKD consensus.',
  },
  {
    id: 'NP-T024',
    tema: 'Litíase',
    subtema: 'Hipercalciúria idiopática',
    dificuldade: 'intermediario',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com cólica ureteral e cálculo rádio-opaco de 5 mm; investigação metabólica: hipercalciúria (Ca/Cr urinário >0,2), Ca sérico e PTH normais, sem acidose. Qual a conduta?',
    options: {
      A: 'Restringir drasticamente cálcio dietético',
      B: 'Hidratação abundante (2–3 L/m²/dia), redução do sódio dietético (<2 g/dia), manter cálcio dietético normal, tratar constipação e considerar tiazídico em recorrentes; investigar oxalúria, citratúria e cistinúria',
      C: 'Ignorar prevenção',
      D: 'Alcalinização com bicarbonato para todo cálculo',
    },
    correct: 'B',
    explanation:
      'Restringir cálcio piora a oxalúria e aumenta risco. Sal é o vilão. Tiazídico reduz calciúria. Investigar hipocitratúria, hiperoxalúria e cistinúria (composição do cálculo!). Pearl: cortar sal, não cálcio.',
    bibliography: 'AUA nephrolithiasis; European guidelines pediatric urolithiasis.',
  },
  {
    id: 'NP-T025',
    tema: 'Litíase',
    subtema: 'Cistinúria',
    dificuldade: 'avancado',
    age: 10,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com litíase recorrente hexagonal ao microscópio urinário, história familiar de urolitíase. Qual a hipótese e tratamento?',
    options: {
      A: 'Litíase por ácido úrico',
      B: 'Cistinúria (defeito no transportador SLC3A1/SLC7A9): hidratação intensa (diurese >3 L/dia), alcalinização com citrato de potássio (pH urinário 7–7,5), redução de sódio e proteína animal; tioprononina/D-penicilamina se recorrência apesar disso',
      C: 'Nefropatia por contraste',
      D: 'Cálculo estruvita',
    },
    correct: 'B',
    explanation:
      'Cristais hexagonais são patognomônicos de cistina. Tratamento é solubilizar cistina (alcalinizar) e diluir. Pearl: cristais hexagonais na urina = cistina.',
    bibliography: 'European Association of Urology; AUA.',
  },
  {
    id: 'NP-T026',
    tema: 'Hiperoxalúria primária',
    subtema: 'Tipo 1',
    dificuldade: 'avancado',
    age: 6,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com litíase recorrente, nefrocalcinose difusa e progressão para DRC 3, oxalato urinário muito elevado. Qual a hipótese e conduta especializada?',
    options: {
      A: 'Restrição de água',
      B: 'Hiperoxalúria primária tipo 1 (AGXT): hidratação intensa, piridoxina (responsivos), citrato/citrato de potássio, terapia específica (lumasiran — RNAi contra HAO1); Tx combinado hepatorrenal em formas avançadas',
      C: 'Dieta rica em oxalato',
      D: 'AINE crônico',
    },
    correct: 'B',
    explanation:
      'PH1 é defeito hepático da enzima AGT; sobrecarga sistêmica de oxalato causa nefrocalcinose e oxalose. Tx isolado de rim falha rapidamente porque o fígado continua produzindo. Lumasiran mudou a história natural. Pearl: litíase infantil recorrente + nefrocalcinose = pense PH1.',
    bibliography: 'ILLUMINATE trials; European PH consortium.',
  },
  {
    id: 'NP-T027',
    tema: 'Acidose tubular renal',
    subtema: 'Distal (tipo 1)',
    dificuldade: 'avancado',
    age: 4,
    vars: { ph: 7.25, hco3: 12, k: 2.8, cl: 118 },
    statement:
      '{{sexWord}} de {{age}} com falha de crescimento, poliúria, litíase e nefrocalcinose medular. Gasometria: pH {{ph}}, HCO₃ {{hco3}} mEq/L, K {{k}} mEq/L, Cl {{cl}} mEq/L (ânion gap normal). pH urinário 6,5 na vigência da acidemia. Diagnóstico e tratamento?',
    options: {
      A: 'Cetoacidose diabética',
      B: 'ATR distal (tipo 1): hipocalemia, incapacidade de acidificar urina, hipercalciúria/nefrocalcinose e retardo estatural; reposição alcalina (bicarbonato ou citrato de potássio) e correção do K',
      C: 'Acidose láctica',
      D: 'Alcalose de contração',
    },
    correct: 'B',
    explanation:
      'ATR distal: gap normal, hipoK, pH urinário >5,5 na acidemia, nefrocalcinose. Correção com álcali (citrato de K permite corrigir álcali + K simultaneamente). Pearl: acidose com pH urinário alto = distal.',
    bibliography: 'Pediatric electrolyte disorders (Rodríguez-Soriano).',
  },
  {
    id: 'NP-T028',
    tema: 'Acidose tubular renal',
    subtema: 'Proximal / Síndrome de Fanconi',
    dificuldade: 'avancado',
    age: 3,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com raquitismo, baixa estatura, glicosúria com glicemia normal, aminoacidúria, fosfatúria, uricosúria, proteinúria de baixo peso molecular e acidose com gap normal. Qual a síndrome e principais causas?',
    options: {
      A: 'ATR distal isolada',
      B: 'Síndrome de Fanconi renal (ATR proximal): perda tubular proximal generalizada; investigar cistinose nefropática (cristais na córnea), doença de Wilson, galactosemia, intolerância à frutose, tirosinemia; tratamento com álcali generoso, fosfato e vitamina D',
      C: 'Diabetes mellitus tipo 1',
      D: 'Hiperaldosteronismo',
    },
    correct: 'B',
    explanation:
      'Fanconi = falência tubular proximal difusa. Em criança, principal causa hereditária é cistinose (procurar cristais corneanos com biomicroscopia). Álcali doses altas (10–15 mEq/kg/dia) frequentemente necessário. Pearl: glicosúria com glicemia normal = pensar Fanconi.',
    bibliography: 'Nephropathic cystinosis reviews (Emma F et al.).',
  },
  {
    id: 'NP-T029',
    tema: 'Cistinose nefropática',
    subtema: 'Cisteamina',
    dificuldade: 'avancado',
    age: 2,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com síndrome de Fanconi confirmada, fotofobia e depósitos corneanos em biomicroscopia. Qual o tratamento específico?',
    options: {
      A: 'Cisteamina oral (mercaptamina) para reduzir estoque intralisossomal de cistina, cisteamina em colírio para depósitos oculares, correção agressiva das perdas tubulares e planejamento de Tx renal',
      B: 'Vitamina C megadose',
      C: 'GNPE — antibiótico',
      D: 'Corticoide isolado',
    },
    correct: 'A',
    explanation:
      'Cisteamina retarda progressão da DRC e da doença extrarrenal (tireoide, olho, pâncreas, muscular). Início precoce é essencial. Pearl: quanto antes cisteamina, mais rim.',
    bibliography: 'Emma F et al., Pediatric Nephrology cystinosis.',
  },
  {
    id: 'NP-T030',
    tema: 'Bartter',
    subtema: 'Neonatal',
    dificuldade: 'avancado',
    age: 0.2,
    vars: { k: 2.1, cl: 85 },
    statement:
      'Lactente de {{age}} nascido pré-termo, com poli-hidrâmnio antenatal, poliúria pós-natal marcante, desidratação recorrente, K {{k}} mEq/L, Cl {{cl}} mEq/L, alcalose metabólica, PA normal/baixa e nefrocalcinose à US. Diagnóstico?',
    options: {
      A: 'Síndrome de Liddle',
      B: 'Síndrome de Bartter antenatal/neonatal (mutações SLC12A1, KCNJ1, BSND ou CLCNKB): manejo com reposição de KCl, indometacina (após 4–6 semanas), suplementação eletrolítica; espironolactona/amilorida em selecionados',
      C: 'Hiperaldosteronismo primário',
      D: 'SIADH',
    },
    correct: 'B',
    explanation:
      'Bartter neonatal mimetiza o bloqueio da alça de Henle → hipoK + alcalose + Ca urinário alto (diferente de Gitelman). Indometacina reduz PGE2 e melhora a poliúria. Pearl: alcalose + hipoK + PA normal + nefrocalcinose no RN = Bartter.',
    bibliography: 'Bartter/Gitelman consensus (Blanchard A et al., Kidney Int 2017).',
  },
  {
    id: 'NP-T031',
    tema: 'Gitelman',
    subtema: 'Adolescente',
    dificuldade: 'intermediario',
    age: 14,
    vars: { k: 2.6, mg: 1.2 },
    statement:
      'Adolescente de {{age}} com cãibras, fadiga e tetania leve; K {{k}} mEq/L, Mg {{mg}} mg/dL, alcalose metabólica, calciúria BAIXA e PA normal. Diagnóstico?',
    options: {
      A: 'Bartter neonatal',
      B: 'Síndrome de Gitelman (SLC12A3, mimetiza tiazídico): reposição oral de K e Mg, dieta rica em sal, IECA/BRA/espironolactona em selecionados; monitorar prolongamento QT',
      C: 'Doença de Addison',
      D: 'Hipertensão renovascular',
    },
    correct: 'B',
    explanation:
      'Gitelman: hipoMg importante + hipocalciúria (diferente de Bartter). Apresentação em adolescência/adulto jovem, PA normal. Pearl: Mg baixo + hipocalciúria = Gitelman.',
    bibliography: 'Blanchard A et al., Kidney Int 2017.',
  },
  {
    id: 'NP-T032',
    tema: 'ATR tipo IV',
    subtema: 'Hipoaldosteronismo',
    dificuldade: 'avancado',
    age: 1,
    vars: { k: 6.2, hco3: 15 },
    statement:
      'Lactente de {{age}} com perda salina, hipercalemia (K {{k}}), acidose gap normal (HCO₃ {{hco3}}) e HAS ausente. Aldosterona elevada, renina alta. Diagnóstico principal?',
    options: {
      A: 'ATR distal clássica',
      B: 'Pseudo-hipoaldosteronismo tipo 1 (mutações no ENaC ou no receptor mineralocorticoide) — ATR tipo IV em pediatria: reposição de NaCl, controle da hipercalemia (dieta baixa em K, resina, bicarbonato)',
      C: 'Hiperaldosteronismo primário',
      D: 'Bartter neonatal',
    },
    correct: 'B',
    explanation:
      'ATR tipo IV pediátrica = PHA1: resistência ao aldosterona → perda de sal + hipercalemia. A PHA1 sistêmica é mais grave que a renal. Pearl: hipercalemia + perda de sal no lactente = pense PHA1.',
    bibliography: 'Pediatric electrolyte and tubular disorders.',
  },
  {
    id: 'NP-T033',
    tema: 'Diabetes insipidus',
    subtema: 'Nefrogênico',
    dificuldade: 'intermediario',
    age: 3,
    vars: { na: 156 },
    statement:
      '{{sexWord}} de {{age}} com poliúria (>4 L/m²/dia) e polidipsia intensa; Na {{na}} mEq/L, osmolaridade urinária baixa; após desmopressina intranasal, osmolaridade urinária permanece <300 mOsm/kg. Diagnóstico?',
    options: {
      A: 'DI central',
      B: 'DI nefrogênico (mutações em AVPR2 ligada ao X ou AQP2): hidratação livre, dieta baixa em soluto (baixo sódio, proteína adequada), tiazídico + amilorida (paradoxal), indometacina em selecionados',
      C: 'SIADH',
      D: 'Síndrome nefrótica',
    },
    correct: 'B',
    explanation:
      'Falta de resposta a DDAVP diferencia nefrogênico do central. Manejo é reduzir carga de soluto para diminuir volume urinário obrigatório. Pearl: DDAVP funciona no central, não no nefrogênico.',
    bibliography: 'Pediatric DI reviews.',
  },
  {
    id: 'NP-T034',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'Hiponatremia sintomática',
    dificuldade: 'avancado',
    age: 1,
    vars: { na: 118 },
    statement:
      'Lactente de {{age}} ({{weight}} kg) chega em convulsão tônico-clônica; glicemia normal; Na {{na}} mEq/L. Qual a prioridade imediata?',
    options: {
      A: 'Restrição hídrica exclusiva na emergência convulsiva',
      B: 'Bolus de NaCl 3% 2–4 mL/kg em 10–15 min para cessar a crise, repetível 1–2 vezes até melhora neurológica; a seguir, correção gradual (não exceder 8 mEq/L nas primeiras 24 h) para evitar desmielinização osmótica',
      C: 'Furosemida isolada',
      D: 'Diálise sem correção específica',
    },
    correct: 'B',
    explanation:
      'Hiponatremia sintomática grave é emergência — 3% NaCl aborta crise. Depois, correção lenta. Pearl: convulsão + Na baixo = hipertônica agora.',
    bibliography: 'European hyponatremia guideline; SPS/SPP pediatric guidance.',
  },
  {
    id: 'NP-T035',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'SIADH',
    dificuldade: 'intermediario',
    age: 8,
    vars: { na: 124 },
    statement:
      '{{sexWord}} de {{age}} com pneumonia lobar, euvolêmico(a), Na {{na}} mEq/L, osmolaridade plasmática baixa, osmolaridade urinária inapropriadamente alta (>100 mOsm/kg), sódio urinário >30 mEq/L, TSH e cortisol normais. Diagnóstico?',
    options: {
      A: 'Desidratação hipernatrêmica',
      B: 'SIADH (secreção inapropriada de ADH) secundária à pneumonia: tratar causa + restrição hídrica; NaCl 3% em sintomas neurológicos graves',
      C: 'Hiperaldosteronismo',
      D: 'Bartter',
    },
    correct: 'B',
    explanation:
      'SIADH: hipoNa euvolêmica com urina concentrada + estímulo (pulmão, SNC, drogas). SF pode piorar. Pearl: identifique o gatilho e restrinja água.',
    bibliography: 'European hyponatremia guideline.',
  },
  {
    id: 'NP-T036',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'Hipercalemia com ECG alterado',
    dificuldade: 'intermediario',
    age: 8,
    vars: { k: 7.1 },
    statement:
      '{{sexWord}} de {{age}} com DRC e K sérico {{k}} mEq/L, ECG com ondas T apiculadas e alargamento do QRS. Qual a sequência correta de manejo?',
    options: {
      A: 'Apenas dieta hipocalêmica',
      B: 'ANTAGONIZAR efeito cardíaco (gluconato de cálcio 10% 0,5 mL/kg IV lento se alterações ECG) → DESLOCAR K para intracelular (insulina + glicose, β2-agonista nebulizado, bicarbonato em acidose) → REMOVER K (resina de troca, furosemida em pré-terminal, diálise se refratária)',
      C: 'Espironolactona isolada',
      D: 'Bolus de KCl',
    },
    correct: 'B',
    explanation:
      'Sequência clássica: proteger → deslocar → remover. Cálcio NÃO baixa K; estabiliza membrana miocárdica. Pearl: β2 (salbutamol) é subutilizado e efetivo.',
    bibliography: 'PALS/APLS; ERC.',
  },
  {
    id: 'NP-T037',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'Hipocalcemia neonatal',
    dificuldade: 'intermediario',
    age: 0.02,
    vars: {},
    statement:
      'RN de {{age}} com tetania, tremores e QT prolongado; Ca iônico baixo, P alto, PTH baixo, mãe com hipoparatireoidismo. Qual a hipótese e conduta?',
    options: {
      A: 'Hipercalcemia da malignidade',
      B: 'Hipocalcemia neonatal por hipoparatireoidismo materno / síndrome de DiGeorge (22q11): repor cálcio EV (gluconato) em bolus com monitor cardíaco e infusão de manutenção, corrigir Mg, investigar 22q11',
      C: 'ATR distal',
      D: 'Hiperaldosteronismo',
    },
    correct: 'B',
    explanation:
      'HipoCa neonatal tardia (>72 h) sugere DiGeorge, hipoPTH, prematuridade, hipoMg. Bolus lento com monitorização (bradicardia). Pearl: sempre checar Mg — hipoMg mantém hipoCa.',
    bibliography: 'Pediatric endocrinology guidelines.',
  },
  {
    id: 'NP-T038',
    tema: 'IRA',
    subtema: 'Pré-renal',
    dificuldade: 'basico',
    age: 2,
    vars: { cr: 1.3, fena: 0.3 },
    statement:
      '{{sexWord}} de {{age}} com gastroenterite há 3 dias, taquicardia, tempo de enchimento capilar 4 s, oligúria e urina concentrada. Creatinina {{cr}} mg/dL (basal 0,3), FENa {{fena}}%. Qual a conduta?',
    options: {
      A: 'Diálise imediata só pela creatinina',
      B: 'Reposição volêmica isotônica (RL ou SF 20 mL/kg em 30–60 min, reavaliar; até 40–60 mL/kg guiado por perfusão/US à beira-leito), evitar nefrotóxicos, monitorar diurese e função renal',
      C: 'Restrição hídrica absoluta',
      D: 'Corticoide de rotina',
    },
    correct: 'B',
    explanation:
      'IRA pré-renal por hipovolemia: restaurar perfusão. FENa baixo confirma. Cuidado com hipervolemia iatrogênica em IRA persistente — POCUS ajuda. Pearl: LRA em criança é hipovolêmica até prova em contrário.',
    bibliography: 'KDIGO AKI; SBP.',
  },
  {
    id: 'NP-T039',
    tema: 'IRA',
    subtema: 'Nefrotóxica (AINE + aminoglicosídeo)',
    dificuldade: 'intermediario',
    age: 6,
    vars: { cr: 1.5 },
    statement:
      '{{sexWord}} de {{age}} desidratado(a) por gastroenterite recebeu ibuprofeno + gentamicina; creatinina sobe para {{cr}} mg/dL, FENa 2,5%, cilindros granulosos, K normal, sem obstrução. Qual a interpretação e conduta?',
    options: {
      A: 'Nenhum risco — combinação sempre segura',
      B: 'NTA nefrotóxica: suspender AINE e aminoglicosídeo (revisar necessidade), otimizar volemia (evitando congestão), evitar demais nefrotóxicos (contraste), reajustar doses por TFG e monitorar; suporte dialítico se AEIOU',
      C: 'Apenas hepatite',
      D: 'Corticoide sistêmico obrigatório',
    },
    correct: 'B',
    explanation:
      'AINE (bloqueio de prostaglandinas) + aminoglicosídeo (NTA proximal) + volume baixo = tempestade renal. Pearl: sempre reveja "prescrição nefrotóxica em criança desidratada".',
    bibliography: 'KDIGO AKI drug-induced.',
  },
  {
    id: 'NP-T040',
    tema: 'IRA',
    subtema: 'Indicação de TSR (AEIOU)',
    dificuldade: 'intermediario',
    age: 6,
    vars: { k: 7.4 },
    statement:
      '{{sexWord}} de {{age}} internado(a) em UTI com LRA anúrica, K {{k}} mEq/L refratário a medidas conservadoras, edema pulmonar em ventilação mecânica e acidose grave (pH 7,05, HCO₃ 10). Qual a conduta?',
    options: {
      A: 'Alta hospitalar',
      B: 'Indicação clássica de terapia de substituição renal (mnemônico AEIOU: Acidose, Eletrólitos, Intoxicação, Overload, Uremia) — considerar CRRT/HD pediátrica; escolher modalidade conforme estabilidade e disponibilidade',
      C: 'Diurético osmótico',
      D: 'Apenas observação',
    },
    correct: 'B',
    explanation:
      'AEIOU orienta início de diálise. Em criança instável, CRRT/HD híbrida preferidas. Pearl: em pediatria, adiar diálise necessária tem custo neurológico e metabólico maior que iniciar.',
    bibliography: 'KDIGO AKI; pCRRT registry.',
  },
  {
    id: 'NP-T041',
    tema: 'DRC',
    subtema: 'Estadiamento pediátrico',
    dificuldade: 'basico',
    age: 12,
    vars: { tfg: 45 },
    statement:
      '{{sexWord}} de {{age}} com CAKUT e TFG estimada por Schwartz atualizado (creatinina + estatura) {{tfg}} mL/min/1,73 m². Qual o estadiamento e implicações?',
    options: {
      A: 'DRC estágio 5D',
      B: 'DRC estágio 3a (TFG 45–59): acompanhamento nefrológico periódico, controle rigoroso de PA (<P90 sem albuminúria; <P75 com albuminúria conforme diretrizes recentes), IECA/BRA em presença de albuminúria, controle metabólico (P, Ca, PTH, HCO₃), vacinação, nutrição, controle de crescimento',
      C: 'Função normal',
      D: 'Indicação imediata de Tx',
    },
    correct: 'B',
    explanation:
      'Estadiamento pediátrico segue KDIGO (com Schwartz atualizado). Pearl: PA baixa é neuroproteção renal — o KDIGO 2021 endureceu alvos para crianças com albuminúria.',
    bibliography: 'KDIGO CKD 2012/2024; KDOQI pediatric CKD; IPNA blood pressure recommendations.',
  },
  {
    id: 'NP-T042',
    tema: 'DRC',
    subtema: 'Crescimento e rhGH',
    dificuldade: 'intermediario',
    age: 10,
    vars: { tfg: 25, hb: 9.5 },
    statement:
      '{{sexWord}} de {{age}} com DRC 4 (TFG {{tfg}}), altura <P3, apresenta acidose leve (HCO₃ 18), Hb {{hb}} g/dL e PTH em rampa. Qual a estratégia para atrasar a perda estatural?',
    options: {
      A: 'Ignorar altura',
      B: 'Otimização multi-eixo: nutrição calórico-proteica adequada, correção da acidose com bicarbonato oral (alvo HCO₃ ≥22), tratamento da anemia (ferro + ESA), controle de CKD-MBD (P, vitamina D ativa, Ca), e considerar hormônio de crescimento recombinante em crianças pré-puberes com déficit persistente',
      C: 'Suspender todas as vitaminas',
      D: 'Transplante imediato sem preparo',
    },
    correct: 'B',
    explanation:
      'Crescimento na DRC depende de nutrição + acidose + eletrólitos + anemia + CKD-MBD + rhGH. Pearl: acidose crônica sozinha rouba centímetros.',
    bibliography: 'KDOQI pediatric CKD.',
  },
  {
    id: 'NP-T043',
    tema: 'DRC-MBD',
    subtema: 'Hiperfosfatemia + hiperPTH',
    dificuldade: 'intermediario',
    age: 12,
    vars: { p: 7.2, pth: 780 },
    statement:
      '{{sexWord}} de {{age}} em HD com fósforo {{p}} mg/dL e PTH {{pth}} pg/mL, Ca 8,4 mg/dL, sem sinais de calcifilaxia. Qual a conduta?',
    options: {
      A: 'Liberar refrigerante e alimentos processados',
      B: 'Restringir fósforo dietético, ajustar quelantes (à base de cálcio ou não-cálcicos como sevelamer, conforme risco de calcificação vascular), otimizar vitamina D ativa (calcitriol) e considerar calcimimético (cinacalcete) se PTH persistentemente alto com Ca adequado; ajustar dialisado',
      C: 'Paratireoidectomia na 1ª consulta',
      D: 'Cálcio EV contínuo',
    },
    correct: 'B',
    explanation:
      'Estratégia é multi-passos, começando por dieta e quelantes com refeições. Sevelamer/carbonato de cálcio conforme risco. Pearl: quelante só funciona se ingerido junto com a comida.',
    bibliography: 'KDIGO CKD-MBD 2017/2024 update.',
  },
  {
    id: 'NP-T044',
    tema: 'Anemia na DRC',
    subtema: 'ESA',
    dificuldade: 'basico',
    age: 11,
    vars: { hb: 8.8, ferritina: 60, tsat: 25 },
    statement:
      '{{sexWord}} de {{age}} em DRC 4 apresenta Hb {{hb}} g/dL, ferritina {{ferritina}} ng/mL, TSAT {{tsat}}%, sem inflamação ativa. Qual o próximo passo?',
    options: {
      A: 'Ignorar',
      B: 'Otimizar estoques de ferro (alvo ferritina >100 ng/mL e TSAT ≥20% em pediatria conforme KDIGO), depois iniciar agente estimulador da eritropoiese (epoetina/darbepoetina) com alvo Hb 11–12 g/dL, evitando >13 g/dL pelo risco CV',
      C: 'Transfusão semanal indefinida',
      D: 'Suspender diálise',
    },
    correct: 'B',
    explanation:
      'Corrigir ferro antes/junto com ESA. Transfusão crônica sensibiliza para futuro Tx. Pearl: transfusão só quando ESA/ferro falharem ou risco agudo.',
    bibliography: 'KDIGO anemia; KDOQI pediatric.',
  },
  {
    id: 'NP-T045',
    tema: 'Diálise peritoneal',
    subtema: 'Peritonite',
    dificuldade: 'intermediario',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em DP automatizada há 2 anos apresenta dor abdominal e efluente turvo há 12 h. Sem febre. Qual a conduta imediata?',
    options: {
      A: 'Esperar 5 dias sem coletar efluente',
      B: 'Coletar efluente para contagem celular (≥100 leucócitos/µL com >50% neutrófilos define peritonite), Gram e cultura; iniciar antibiótico intraperitoneal empírico (cefalosporina 1ª geração + cefepima ou vancomicina + ceftazidima conforme protocolo local), reavaliar em 48–72 h',
      C: 'Remover o cateter em 100% dos casos na primeira hora',
      D: 'Analgésico oral apenas',
    },
    correct: 'B',
    explanation:
      'Turvação do efluente = peritonite até prova em contrário. ATB IP precoce. Remoção do cateter em falha terapêutica, fungos, refratária, S. aureus grave. Pearl: bolsa turva = tratar rápido.',
    bibliography: 'ISPD peritonitis recommendations (pediatric adaptation, Warady BA et al.).',
  },
  {
    id: 'NP-T046',
    tema: 'Hemodiálise pediátrica',
    subtema: 'Acesso',
    dificuldade: 'intermediario',
    age: 13,
    vars: {},
    statement:
      'Adolescente de {{age}} em DRC 5 pré-dialítica com TFG caindo. Qual o acesso preferido para HD crônica?',
    options: {
      A: 'Cateter femoral permanente',
      B: 'Fístula arteriovenosa nativa (radiocefálica/braquiocefálica) planejada com maturação prévia, avaliação vascular; cateter tunelizado apenas como ponte quando FAV não é viável ou tempo insuficiente',
      C: 'Punções arteriais seriadas',
      D: 'Apenas DP é permitida',
    },
    correct: 'B',
    explanation:
      'FAV nativa: menor taxa de infecção, trombose e mortalidade que cateter, mesmo em adolescentes. Planejar cedo. Pearl: cateter = ponte, não destino.',
    bibliography: 'KDOQI vascular access 2019; pediatric adaptation.',
  },
  {
    id: 'NP-T047',
    tema: 'Transplante renal pediátrico',
    subtema: 'Rejeição x infecção',
    dificuldade: 'avancado',
    age: 13,
    vars: { cr0: 0.9, cr1: 1.7 },
    statement:
      'Adolescente de {{age}} transplantado renal há 8 meses, creatinina sobe de {{cr0}} para {{cr1}} mg/dL em 2 semanas; adesão à imunossupressão duvidosa, febre baixa. Qual a conduta?',
    options: {
      A: 'Suspender imunossupressão',
      B: 'Dosar nível de tacrolimus, PCR quantitativa para CMV e BK, urinálise, US Doppler do enxerto e realizar biópsia do enxerto quando rejeição está no diferencial (padrão-ouro para diferenciar rejeição celular, humoral, toxicidade e nefropatia por BK)',
      C: 'Nefrectomia imediata do enxerto',
      D: 'Aumentar tacrolimus cegamente',
    },
    correct: 'B',
    explanation:
      'A disfunção do enxerto tem múltiplas causas e a biópsia é o padrão-ouro. Adolescentes têm alto risco de má adesão. BK pode mimetizar rejeição. Pearl: biopsiar salva o enxerto.',
    bibliography: 'AST pediatric transplant guidelines; KDIGO Tx recipients.',
  },
  {
    id: 'NP-T048',
    tema: 'Transplante renal pediátrico',
    subtema: 'BK vírus',
    dificuldade: 'avancado',
    age: 12,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com Tx renal há 4 meses apresenta creatinina em elevação lenta e viremia BK >10 000 cópias/mL. Qual a conduta principal?',
    options: {
      A: 'Aumentar tacrolimus',
      B: 'Reduzir imunossupressão em passos (MPA primeiro, depois tacrolimus, mantendo alvo mínimo seguro) e monitorar viremia BK e função do enxerto; biopsiar se creatinina piorar ou padrão de rejeição não puder ser excluído; considerar leflunomida/cidofovir em casos refratários (baixa evidência)',
      C: 'Nefrectomia imediata',
      D: 'ATB de amplo espectro',
    },
    correct: 'B',
    explanation:
      'A pedra angular do manejo da nefropatia por BK é reduzir imunossupressão. Adjuvantes têm evidência fraca. Pearl: BK imita rejeição — biopsiar é essencial.',
    bibliography: 'AST BK virus guidelines.',
  },
  {
    id: 'NP-T049',
    tema: 'HAS pediátrica',
    subtema: 'Confirmação e investigação',
    dificuldade: 'basico',
    age: 9,
    vars: { sbp: 138, dbp: 90 },
    statement:
      '{{sexWord}} de {{age}} apresenta PA {{sbp}}×{{dbp}} mmHg em 3 medidas separadas (>P95+12 mmHg). Sopro abdominal, assimetria de pulsos femorais. Qual a conduta?',
    options: {
      A: 'Ignorar — "criança não tem HAS"',
      B: 'Confirmar HAS (MAPA de 24 h para excluir HAS do jaleco), investigar causas secundárias — que são maioria em crianças pequenas/hipertensão grave (renovascular, coarctação, doença parenquimatosa, endocrinopatias); iniciar tratamento após investigação estruturada',
      C: 'Iniciar 4 anti-hipertensivos sem investigação',
      D: 'Proibir atividade física para sempre',
    },
    correct: 'B',
    explanation:
      'Quanto mais grave/menor a idade, maior a chance de secundária. Sopro/assimetria sugere renovascular/coarctação. MAPA obrigatório se possível. Pearl: HAS em criança nunca é "essencial" sem confirmar e investigar.',
    bibliography: 'AAP Pediatric HTN 2017; ESH 2016.',
  },
  {
    id: 'NP-T050',
    tema: 'HAS pediátrica',
    subtema: 'Emergência hipertensiva',
    dificuldade: 'avancado',
    age: 6,
    vars: { sbp: 190, dbp: 130 },
    statement:
      '{{sexWord}} de {{age}} chega com cefaleia intensa, convulsão, PA {{sbp}}×{{dbp}} mmHg e edema de papila ao fundo de olho. Qual a conduta?',
    options: {
      A: 'Redução abrupta da PA para valores normais em 1 hora',
      B: 'Emergência hipertensiva com lesão de órgão-alvo — internar em UTI, iniciar anti-hipertensivo endovenoso titulável (nitroprussiato, labetalol ou nicardipina), reduzir PA em até 25% nas primeiras 8 h, chegar próximo do alvo em 24–48 h; monitorar TFG e neurologia',
      C: 'Apenas analgésico oral',
      D: 'Alta e reavaliação em 30 dias',
    },
    correct: 'B',
    explanation:
      'Redução brusca causa isquemia (retina, cérebro). Meta: 25% em 8 h, resto em 24–48 h. Pearl: se cair muito rápido, o cérebro sofre.',
    bibliography: 'AAP HTN; pediatric ICU guidelines.',
  },
  {
    id: 'NP-T051',
    tema: 'Farmacologia',
    subtema: 'Ajuste por TFG',
    dificuldade: 'intermediario',
    age: 8,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com DRC 3 (TFG 40) recebe prescrição de vancomicina 60 mg/kg/dia dividido a cada 6 h para pneumonia grave. Qual a conduta correta?',
    options: {
      A: 'Manter dose padrão',
      B: 'Ajustar dose e intervalo conforme função renal (aumentar intervalo entre doses ou reduzir dose) usando bulário/protocolo pediátrico; dosar nível sérico (vale) para individualizar; monitorar audição/função renal; considerar AUC-guiado',
      C: 'Substituir por AINE',
      D: 'Suspender antibiótico',
    },
    correct: 'B',
    explanation:
      'Fármacos com clearance renal precisam ajuste — nefrotoxicidade e ototoxicidade são risco. AUC-alvo (400–600 mg·h/L) é padrão-ouro moderno para vancomicina. Pearl: prescrever em DRC = revisar cada fármaco.',
    bibliography: 'ASHP/IDSA vancomycin dosing; KDIGO drug dosing.',
  },
  {
    id: 'NP-T052',
    tema: 'Nefrotoxicidade',
    subtema: 'Contraste iodado',
    dificuldade: 'intermediario',
    age: 10,
    vars: { tfg: 35 },
    statement:
      '{{sexWord}} de {{age}} com DRC (TFG {{tfg}}) precisa realizar angioTC. Qual a estratégia preventiva de nefropatia induzida por contraste?',
    options: {
      A: 'Nada',
      B: 'Hidratação com SF 0,9% (1–3 mL/kg/h pré e pós), utilizar contraste iso/hipo-osmolar em menor volume possível, suspender nefrotóxicos concomitantes (AINE, aminoglicosídeo), considerar alternativas de imagem (RM sem gadolínio ou US); NAC tem evidência fraca',
      C: 'AINE + diurético',
      D: 'Aumentar dose de contraste',
    },
    correct: 'B',
    explanation:
      'Hidratação é a base. Menor volume de contraste possível. NAC não substitui hidratação. Pearl: menos contraste + mais soro.',
    bibliography: 'KDIGO CI-AKI; ACR contrast manual.',
  },
  {
    id: 'NP-T053',
    tema: 'Proteinúria',
    subtema: 'Ortostática',
    dificuldade: 'basico',
    age: 13,
    vars: {},
    statement:
      'Adolescente de {{age}} assintomático(a) com proteinúria detectada em exame escolar. Coleta matinal (após decúbito noturno) sem proteinúria; coletas diurnas positivas. Função renal e sedimento urinário normais, sem HAS. Diagnóstico?',
    options: {
      A: 'SN corticorresistente',
      B: 'Proteinúria ortostática benigna: confirmar com amostra da primeira urina da manhã, orientar reavaliação anual, não requer tratamento; considerar biópsia apenas se surgir HAS, hematúria persistente ou proteinúria matinal',
      C: 'Nefrite lúpica classe IV',
      D: 'IRA intrínseca',
    },
    correct: 'B',
    explanation:
      'Ortostática é típica do adolescente e benigna. Matinal negativa selo diagnóstico. Pearl: sempre solicitar primeira urina da manhã em proteinúria descoberta em fita.',
    bibliography: 'Pediatric proteinuria approach reviews.',
  },
  {
    id: 'NP-T054',
    tema: 'Hematúria',
    subtema: 'Glomerular x urológica',
    dificuldade: 'basico',
    age: 10,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com urina escura, hemácias dismórficas em >40% e cilindros hemáticos ao sedimento. PA e creatinina normais. A origem da hematúria é:',
    options: {
      A: 'Cistite simples',
      B: 'Glomerular — dismorfismo eritrocitário e cilindros hemáticos são específicos; próximas etapas: albumina, C3/C4, ASLO, ANA/anti-dsDNA, urina de 24 h ou UPCR, US renal e considerar biópsia se glomerulopatia primária suspeita',
      C: 'Contaminação menstrual apenas',
      D: 'Litíase',
    },
    correct: 'B',
    explanation:
      'Cilindros hemáticos = glomerular (patognomônico). Investigar causa glomerular. Pearl: morfologia da hemácia importa.',
    bibliography: 'Sedimento urinário — Fogazzi.',
  },
  {
    id: 'NP-T055',
    tema: 'Hematúria',
    subtema: 'Familiar benigna',
    dificuldade: 'intermediario',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com hematúria microscópica persistente, sem proteinúria, PA e função renal normais; mãe com hematúria microscópica sem DRC. Biópsia (se realizada) mostraria adelgaçamento difuso da MBG. Diagnóstico?',
    options: {
      A: 'Alport clássico',
      B: 'Doença da membrana basal fina (nefropatia por membrana fina) — herança autossômica dominante em COL4A3/4 heterozigoto, curso geralmente benigno; seguir com PA, proteinúria, TFG anuais; investigar Alport se homens da família em diálise',
      C: 'GNPE',
      D: 'IgA vasculite',
    },
    correct: 'B',
    explanation:
      'Membrana fina: hematúria isolada familiar, prognóstico benigno; espectro com Alport na atualidade. Pearl: heterozigotos COL4A podem ter DRC — vigilância anual.',
    bibliography: 'Kashtan et al., Kidney Int.',
  },
  {
    id: 'NP-T056',
    tema: 'FSGS',
    subtema: 'Adolescente',
    dificuldade: 'avancado',
    age: 14,
    vars: { upcr: 4.5 },
    statement:
      'Adolescente de {{age}} com SN corticorresistente, biópsia confirma FSGS, painel genético negativo para principais podocitopatias. UPCR {{upcr}}. Qual estratégia?',
    options: {
      A: 'Apenas dieta hiperproteica',
      B: 'FSGS primária: inibidor de calcineurina (tacrolimus ou ciclosporina) por 6 meses com corticoide em baixa dose, associada a IECA/BRA para nefroproteção; rituximabe em falha; nefrectomia contraindicada; monitorar recorrência caso vá a Tx',
      C: 'Corticoide indefinido em altas doses',
      D: 'Antibiótico prolongado',
    },
    correct: 'B',
    explanation:
      'FSGS primária responde parcialmente a ICN; secundária foca causa e nefroproteção. Recorrência pós-Tx é grande medo. Pearl: painel genético muda tudo — evita imunossupressão inútil.',
    bibliography: 'KDIGO Glomerular Diseases 2021; IPNA SRNS.',
  },
  {
    id: 'NP-T057',
    tema: 'Complemento',
    subtema: 'C3 glomerulopatia',
    dificuldade: 'avancado',
    age: 13,
    vars: { c3: 25, c4: 22 },
    statement:
      'Adolescente com síndrome nefrítica/nefrótica persistente, C3 {{c3}} mg/dL (baixo persistente), C4 {{c4}} normal; ASLO negativo, biópsia com depósitos predominantes de C3 sem imunoglobulinas. Diagnóstico?',
    options: {
      A: 'GNPE',
      B: 'C3 glomerulopatia (glomerulonefrite C3 ou doença de depósitos densos): investigar fator nefrítico C3 (C3NeF), mutações no complemento e ganho-de-função; nefroproteção com IECA/BRA, MMF em selecionados, e ensaios com inibidores do complemento em progressão',
      C: 'Lesão mínima',
      D: 'Alport',
    },
    correct: 'B',
    explanation:
      'C3 persistentemente baixo com C4 normal + biópsia com IF apenas C3 = C3G. Diferente da GNPE (C3 se normaliza em 8–12 semanas). Pearl: C3 baixo por >3 meses = investigar via alternativa.',
    bibliography: 'C3G consensus (Smith RJH et al.).',
  },
  {
    id: 'NP-T058',
    tema: 'Distúrbios miccionais',
    subtema: 'Enurese monossintomática',
    dificuldade: 'basico',
    age: 7,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com enurese noturna monossintomática (sem sintomas diurnos ou constipação), 5 noites/semana, sem ITU. Qual a conduta inicial?',
    options: {
      A: 'Cirurgia imediata',
      B: 'Medidas comportamentais/educacionais: horário miccional regular, evitar líquidos à noite, tratar constipação associada, alarme de enurese como primeira linha efetiva; desmopressina em falhas ou necessidade pontual (viagem, acampamento)',
      C: 'ATB contínuo',
      D: 'Diálise',
    },
    correct: 'B',
    explanation:
      'Enurese monossintomática pediátrica se beneficia mais do alarme (cura duradoura) que da desmopressina (só suprime enquanto usar). Pearl: sempre tratar constipação — grande gatilho oculto.',
    bibliography: 'ICCS guidelines for enuresis.',
  },
  {
    id: 'NP-T059',
    tema: 'Distúrbios miccionais',
    subtema: 'Bexiga hiperativa',
    dificuldade: 'intermediario',
    age: 6,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com urgência miccional intensa, escapes diurnos, manobras de contenção (Vincent) e ITU recorrente. US normal, UCG sem RVU. Qual a conduta?',
    options: {
      A: 'Anticolinérgico sem qualquer intervenção comportamental',
      B: 'Uroterapia estruturada: educação, diário miccional, treinamento comportamental, tratamento agressivo da constipação; anticolinérgico (oxibutinina) ou β3-agonista em falha; fisioterapia do assoalho pélvico se dissinergia',
      C: 'Diálise',
      D: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'Uroterapia é a base; medicação é adjuvante. Constipação sempre associada em >60%. Pearl: tratar cocô é tratar xixi.',
    bibliography: 'ICCS bladder dysfunction.',
  },
  {
    id: 'NP-T060',
    tema: 'Bexiga neurogênica',
    subtema: 'Mielomeningocele',
    dificuldade: 'avancado',
    age: 4,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com mielomeningocele operada; urodinâmica com bexiga de alta pressão e resíduo pós-miccional alto; ITU febril recorrente e hidronefrose progressiva. Conduta?',
    options: {
      A: 'Ignorar resíduo',
      B: 'Cateterismo intermitente limpo (CIL) 4–6×/dia + anticolinérgico (oxibutinina) para reduzir pressões vesicais; profilaxia antibiótica em selecionados; ampliação vesical em falha; monitorar trato superior com US e função renal',
      C: 'Diálise como primeira linha',
      D: 'Suspender ATB em pielonefrite',
    },
    correct: 'B',
    explanation:
      'Objetivo: baixar pressão vesical + esvaziar → proteger o alto trato. Pearl: bexiga de alta pressão é a nefrotoxina.',
    bibliography: 'Pediatric neurogenic bladder consensus.',
  },
  {
    id: 'NP-T061',
    tema: 'Nefrite intersticial',
    subtema: 'Medicamentosa',
    dificuldade: 'intermediario',
    age: 12,
    vars: { cr: 1.9 },
    statement:
      '{{sexWord}} de {{age}} em uso de amoxicilina há 10 dias por sinusite apresenta febre, exantema, artralgia, eosinofilia periférica e IRA (creatinina {{cr}} mg/dL) com sedimento com leucócitos e eosinófilos urinários. Qual a hipótese e conduta?',
    options: {
      A: 'IRA pré-renal',
      B: 'Nefrite intersticial aguda alérgica: suspender fármaco causador, hidratação, considerar corticoide (prednisolona 1 mg/kg/dia com desmame) em casos com creatinina persistentemente elevada; biópsia se dúvida diagnóstica',
      C: 'GNPE',
      D: 'Bartter',
    },
    correct: 'B',
    explanation:
      'Tríade clássica (febre, exantema, eosinofilia) só em 10–30%. Suspender o gatilho é essencial. Corticoide em cursos curtos pode acelerar recuperação. Pearl: eosinofilúria não é específica, mas ajuda.',
    bibliography: 'Praga M., Perazella MA reviews on AIN.',
  },
  {
    id: 'NP-T062',
    tema: 'Nefrite tubulo-intersticial',
    subtema: 'TINU',
    dificuldade: 'avancado',
    age: 12,
    vars: {},
    statement:
      'Adolescente com uveíte anterior, febre baixa, perda de peso, glicosúria com glicemia normal, aminoacidúria e IRA moderada. Diagnóstico principal?',
    options: {
      A: 'Diabetes tipo 1',
      B: 'Síndrome TINU (nefrite tubulo-intersticial com uveíte): suspender nefrotóxicos, corticoide sistêmico e colaboração com oftalmologia; investigar causas secundárias (sarcoidose, Sjögren, LES) e infecciosas',
      C: 'ATR distal isolada',
      D: 'GNPE',
    },
    correct: 'B',
    explanation:
      'TINU: causa frequente em adolescentes, prognóstico renal geralmente bom com corticoide; uveíte pode recorrer. Pearl: uveíte + Fanconi = pensar TINU.',
    bibliography: 'Mandeville JT et al.',
  },
  {
    id: 'NP-T063',
    tema: 'ITU',
    subtema: 'Neonatal',
    dificuldade: 'intermediario',
    age: 0.05,
    vars: {},
    statement:
      'RN de {{age}} ({{weight}} kg), sexo {{sexAdj}}, com má aceitação alimentar, hipotermia e icterícia prolongada; urocultura por punção suprapúbica com E. coli. Qual a conduta?',
    options: {
      A: 'ATB oral ambulatorial',
      B: 'ITU neonatal — internar, coletar hemocultura e liquor (sepse é grande diferencial), iniciar ATB endovenoso empírico (ampicilina + aminoglicosídeo ou cefotaxima) por 10–14 dias, US e UCG posteriormente',
      C: 'Nefrectomia',
      D: 'Suspender aleitamento',
    },
    correct: 'B',
    explanation:
      'ITU em RN é sepse até prova em contrário. Investigação ampla e ATB EV. Pearl: RN + urocultura+ = investigar meningite associada.',
    bibliography: 'AAP UTI; SBP.',
  },
  {
    id: 'NP-T064',
    tema: 'Distúrbios ácido-base',
    subtema: 'Análise sistemática',
    dificuldade: 'intermediario',
    age: 5,
    vars: { ph: 7.2, hco3: 10, pco2: 24, gap: 22 },
    statement:
      '{{sexWord}} de {{age}} com pH {{ph}}, HCO₃ {{hco3}}, PaCO₂ {{pco2}} mmHg, ânion gap {{gap}}. Interpretação?',
    options: {
      A: 'Alcalose respiratória isolada',
      B: 'Acidose metabólica com gap aumentado, compensação respiratória parcial (fórmula de Winter: PaCO₂ esperada = 1,5×HCO₃ + 8 ± 2); investigar cetoacidose diabética, acidose láctica, intoxicações (metanol/etilenoglicol) e IRA',
      C: 'Alcalose metabólica de contração',
      D: 'DPOC',
    },
    correct: 'B',
    explanation:
      'Sequência: pH → distúrbio primário → compensação (Winter) → gap → delta-delta. Pearl: sempre calcule Winter para saber se há distúrbio adicional.',
    bibliography: 'Rose & Post — Clinical Physiology of Acid-Base.',
  },
  {
    id: 'NP-T065',
    tema: 'Nefropatia diabética juvenil',
    subtema: 'Screening',
    dificuldade: 'basico',
    age: 15,
    vars: { uacr: 40 },
    statement:
      'Adolescente com DM1 há 6 anos, HbA1c 8,5%, PA 122/78, UACR {{uacr}} mg/g (persistentemente elevado em 2 amostras). Qual a conduta?',
    options: {
      A: 'Ignorar',
      B: 'Microalbuminúria (moderadamente aumentada) na DM1 juvenil: intensificar controle glicêmico, PA no percentil <90, iniciar IECA/BRA, orientar cessação de tabagismo, rastrear retinopatia; SGLT2i em avaliação (não aprovado abaixo de idade, mas em ensaios)',
      C: 'Dieta hiperproteica livre',
      D: 'Suspender insulina',
    },
    correct: 'B',
    explanation:
      'Microalbuminúria persistente = alvo terapêutico, não apenas marcador. IECA reduz progressão. Pearl: albuminúria pediátrica em DM não é benigna.',
    bibliography: 'ISPAD 2022; ADA Diabetes in Youth.',
  },
  {
    id: 'NP-T066',
    tema: 'Nefropatia por refluxo',
    subtema: 'Cicatrizes',
    dificuldade: 'intermediario',
    age: 8,
    vars: { upcr: 0.8 },
    statement:
      '{{sexWord}} de {{age}} com RVU alto grau e cicatrizes renais bilaterais ao DMSA. UPCR {{upcr}}, TFG 70, PA no P90. Qual a conduta?',
    options: {
      A: 'Ignorar proteinúria e PA',
      B: 'Nefropatia por refluxo com dano estabelecido: iniciar IECA/BRA para nefroproteção, controlar PA (<P90 conforme KDIGO), orientar acompanhamento anual com PA, UACR/UPCR, TFG; DMSA em recorrência',
      C: 'Nefrectomia dos dois rins',
      D: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'RVU + cicatriz + proteinúria/HAS = risco progressivo. IECA/BRA são pilar. Pearl: rim cicatrizado não regenera — proteger o que sobrou.',
    bibliography: 'ESPU; SBP.',
  },
  {
    id: 'NP-T067',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'Hipernatremia por desidratação',
    dificuldade: 'intermediario',
    age: 0.5,
    vars: { na: 168 },
    statement:
      'Lactente de {{age}} ({{weight}} kg) com desidratação grave por gastroenterite; Na {{na}} mEq/L. Qual estratégia de reposição?',
    options: {
      A: 'Correção agressiva com água livre em 1 h',
      B: 'Restaurar volemia com salina isotônica (SF ou RL 20 mL/kg) e então corrigir hipernatremia lentamente ao longo de 48–72 h com solução hipotônica ajustada (queda máxima de Na de 0,5 mEq/L/h) para evitar edema cerebral',
      C: 'Restringir líquidos',
      D: 'Dar água pura no bolus',
    },
    correct: 'B',
    explanation:
      'Correção rápida da hipernatremia crônica causa edema cerebral e convulsões. 48–72 h é o mínimo seguro. Pearl: hipernatremia crônica = paciência.',
    bibliography: 'Pediatric fluid and electrolyte guidelines.',
  },
  {
    id: 'NP-T068',
    tema: 'Distúrbios hidroeletrolíticos',
    subtema: 'Hipomagnesemia',
    dificuldade: 'intermediario',
    age: 10,
    vars: { mg: 1.0, k: 3.0 },
    statement:
      '{{sexWord}} de {{age}} com hipoK {{k}} refratária à reposição de KCl, Mg {{mg}} mg/dL. Qual a conduta?',
    options: {
      A: 'Aumentar KCl indefinidamente',
      B: 'Corrigir a hipomagnesemia primeiro (MgSO₄ EV ou Mg oral, conforme gravidade); hipoMg mantém hipoK ao inibir reabsorção distal',
      C: 'Suspender potássio',
      D: 'Diálise',
    },
    correct: 'B',
    explanation:
      'Sem corrigir Mg, o K não sobe: a hipomagnesemia mantém canais ROMK abertos no néfron distal e perpetua a caliurese. Corrija o magnésio (oral se leve, IV lento se sintomas cardíacos ou tetania) antes/junto com a reposição de potássio; investigue diurético, cisplatina, aminoglicosídeo, IBP crônico, síndrome de Gitelman e enteropatia. Pearl: hipoK refratária = sempre dose Mg.',
    bibliography: 'Rose & Post; Fluids and Electrolytes.',
  },
  {
    id: 'NP-T069',
    tema: 'Doença renal cística',
    subtema: 'ADPKD',
    dificuldade: 'intermediario',
    age: 12,
    vars: {},
    statement:
      'Adolescente de {{age}} com PA elevada, hematúria discreta e US mostrando >4 cistos bilaterais; pai com diagnóstico de ADPKD. Qual a conduta?',
    options: {
      A: 'Nefrectomia dos cistos',
      B: 'Confirmar ADPKD pediátrica (critérios de Ravine ampliados para pediatria); controle rigoroso de PA (IECA), rastreio anual de PA/proteinúria/US, hidratação adequada, aconselhamento genético familiar; tolvaptano ainda restrito na pediatria mas em estudo',
      C: 'Corticoide',
      D: 'Suspender líquidos',
    },
    correct: 'B',
    explanation:
      'ADPKD pediátrica: controle precoce de PA é modificador de doença. Pearl: HAS na criança com ADPKD deve ser tratada agressivamente.',
    bibliography: 'KDIGO ADPKD; Cadnapaphornchai MA et al.',
  },
  {
    id: 'NP-T070',
    tema: 'Ciliopatias',
    subtema: 'Nefronoftise',
    dificuldade: 'avancado',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com poliúria/polidipsia, anemia desproporcional, DRC em progressão, rins de tamanho normal ou pequeno com cistos corticomedulares; retinite pigmentosa associada. Diagnóstico?',
    options: {
      A: 'ADPKD',
      B: 'Nefronoftise (ciliopatia recessiva, NPHP1 etc.), forma associada à síndrome de Senior-Løken (com retinite): não há terapia específica, preparo para TRS/Tx; investigar manifestações sindrômicas (fígado, ossos, retina, cerebelo)',
      C: 'GNPE',
      D: 'Doença de Alport',
    },
    correct: 'B',
    explanation:
      'Nefronoftise é principal causa monogênica de DRC em criança/adolescente. Rins pequenos, cistos corticomedulares, poliúria. Pearl: DRC + retinite = pensar Senior-Løken.',
    bibliography: 'Hildebrandt F., Nephronophthisis reviews.',
  },
  {
    id: 'NP-T071',
    tema: 'Sepse e rim',
    subtema: 'LRA associada à sepse',
    dificuldade: 'avancado',
    age: 5,
    vars: { cr: 1.6 },
    statement:
      '{{sexWord}} de {{age}} em choque séptico, noradrenalina em curso, oligúrico(a), creatinina {{cr}} mg/dL. Qual estratégia?',
    options: {
      A: 'Bolus infinitos de cristaloide sem reavaliar',
      B: 'Ressuscitação inicial com cristaloide balanceado 40–60 mL/kg guiada por reavaliação clínica/US (POCUS, VExUS), vasopressor precoce se hipotensão persistente, evitar nefrotóxicos, considerar CRRT se AEIOU ou disfunção múltipla; monitorização glicêmica e da acidose',
      C: 'AINE',
      D: 'Restrição hídrica absoluta desde o início',
    },
    correct: 'B',
    explanation:
      'Cristaloide balanceado, meta perfusional, vasopressor precoce (adrenalina/noradrenalina), CRRT em selecionados. Bolus repetidos sem meta podem piorar (FEAST). Pearl: fluido é droga; menos é mais quando congestionado.',
    bibliography: 'Surviving Sepsis in Children 2020; KDIGO AKI.',
  },
  {
    id: 'NP-T072',
    tema: 'Onconefrologia',
    subtema: 'Lise tumoral',
    dificuldade: 'avancado',
    age: 8,
    vars: { k: 6.8, p: 8.5, ua: 15 },
    statement:
      '{{sexWord}} de {{age}} com leucemia iniciando quimioterapia; K {{k}}, P {{p}}, ácido úrico {{ua}} mg/dL, LDH em rampa. Qual a conduta?',
    options: {
      A: 'Ignorar',
      B: 'Síndrome de lise tumoral: hidratação vigorosa isotônica (2–4 L/m²/dia), rasburicase (ou alopurinol em risco baixo), monitorização eletrolítica horária; diálise precoce (CRRT) se hiperK refratária, hiperP grave, sobrecarga ou uremia',
      C: 'Corticoide isolado',
      D: 'Restrição hídrica',
    },
    correct: 'B',
    explanation:
      'Rasburicase reduz ácido úrico rápido em risco alto; hidratação previne cristais. Não alcalinizar rotineiramente (piora precipitação de fosfato de cálcio). Pearl: hiperK + hiperP + hiperuricemia = SLT.',
    bibliography: 'Cairo–Bishop; pediatric onco-nephrology.',
  },
  {
    id: 'NP-T073',
    tema: 'Cateter urinário',
    subtema: 'Bacteriúria assintomática',
    dificuldade: 'basico',
    age: 8,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em uso de cateterismo intermitente por bexiga neurogênica apresenta urocultura com E. coli >10⁵ sem febre, dor ou piora clínica. Qual a conduta?',
    options: {
      A: 'ATB de longo prazo',
      B: 'Bacteriúria assintomática em portador de CIL — não tratar rotineiramente; tratar apenas quando sintomática, com pielonefrite, previamente a procedimento urológico ou em imunossuprimidos/transplantados',
      C: 'Nefrectomia',
      D: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'Tratar bacteriúria assintomática seleciona resistência. Pearl: crianças com CIL têm urocultura+ crônica — não persiga o resultado, persiga sintomas.',
    bibliography: 'IDSA asymptomatic bacteriuria; ESPU.',
  },
  {
    id: 'NP-T074',
    tema: 'Vacinação',
    subtema: 'DRC e imunossupressão',
    dificuldade: 'basico',
    age: 6,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg) com DRC estágio 4 secundária a CAKUT, ainda em preparo para TRS/transplante. Em consulta ambulatorial, a família pergunta sobre vacinação. Qual estratégia vacinal é a mais apropriada neste momento pré-imunossupressão?',
    options: {
      A: 'Não vacinar',
      B: 'Aplicar todas as vacinas do calendário nacional o mais precoce possível (INCLUSIVE vacinas vivas ANTES de imunossupressão pesada ou transplante), vacinar contra pneumococo (VPC + VPP23), influenza anual, hepatite B com esquema reforçado (dupla dose ou 4 doses), varicela quando possível, HPV, meningo',
      C: 'Vacinas vivas em pós-Tx sem restrição',
      D: 'Apenas hepatite B',
    },
    correct: 'B',
    explanation:
      'Vacinar cedo, antes de Tx e antes de imunossupressão pesada. HepB precisa dose reforçada em DRC. Vacinas vivas contraindicadas pós-Tx. Pearl: DRC = calendário reforçado.',
    bibliography: 'AST vaccination guidelines; SBP.',
  },
  {
    id: 'NP-T075',
    tema: 'Nutrição na DRC',
    subtema: 'Ingesta proteica',
    dificuldade: 'intermediario',
    age: 3,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com DRC 4, baixa ingesta calórica e desnutrição leve. Qual estratégia nutricional?',
    options: {
      A: 'Restrição proteica severa em toda criança com DRC',
      B: 'Manter ingesta proteica AO MENOS na RDA para idade (evitar déficit — crianças precisam de proteína para crescimento), calorias plenas para a idade, corrigir acidose com bicarbonato, ajustar sódio/K/P conforme labs; suplementação enteral se necessário',
      C: 'Dieta zero proteína',
      D: 'Dieta hiperproteica livre',
    },
    correct: 'B',
    explanation:
      'Adulto ≠ criança — restringir proteína em criança prejudica crescimento. Manter DRI. Pearl: nutrir para crescer; ajustar depois.',
    bibliography: 'KDOQI pediatric CKD nutrition 2020.',
  },
  {
    id: 'NP-T076',
    tema: 'Doenças infecciosas e rim',
    subtema: 'HIV pediátrico',
    dificuldade: 'avancado',
    age: 10,
    vars: { upcr: 3.0 },
    statement:
      '{{sexWord}} de {{age}} com HIV vertical e baixa aderência ao TARV apresenta proteinúria UPCR {{upcr}}, hematúria discreta, edema. Biópsia mostra GESF colapsante. Qual a conduta?',
    options: {
      A: 'Suspender TARV',
      B: 'Nefropatia associada ao HIV (HIVAN): otimizar TARV para supressão viral, IECA/BRA para nefroproteção, corticoide em situações selecionadas (evidência limitada em pediatria), tratar comorbidades e monitorar TFG',
      C: 'Nefrectomia',
      D: 'AINE',
    },
    correct: 'B',
    explanation:
      'Supressão viral é o pilar. IECA reduz progressão. HIVAN colapsante ainda ocorre em não aderentes. Pearl: HIV com má aderência + proteinúria = biópsia + TARV.',
    bibliography: 'KDIGO HIV.',
  },
  {
    id: 'NP-T077',
    tema: 'Doenças infecciosas e rim',
    subtema: 'Hepatite B',
    dificuldade: 'avancado',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com síndrome nefrótica, HBsAg+, biópsia com nefropatia membranosa. Qual a conduta?',
    options: {
      A: 'Imunossupressão pesada sem antiviral',
      B: 'Membranosa associada à hepatite B: iniciar terapia antiviral (entecavir/tenofovir), nefroproteção com IECA/BRA e restrição salina; imunossupressão apenas em não-remissão apesar do controle viral e sob cobertura antiviral',
      C: 'Corticoide isolado',
      D: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'Antiviral pode induzir remissão renal em pacientes replicantes. Pearl: nunca imunossuprima HBV sem antiviral — reativação letal.',
    bibliography: 'KDIGO HBV; APASL.',
  },
  {
    id: 'NP-T078',
    tema: 'Anticoagulação',
    subtema: 'HBPM em SN',
    dificuldade: 'intermediario',
    age: 7,
    vars: { alb: 1.5 },
    statement:
      '{{sexWord}} de {{age}} com SN grave (albumina {{alb}}), imobilização por internação prolongada. Qual a estratégia de tromboprofilaxia?',
    options: {
      A: 'Aspirina alta dose para todos',
      B: 'Considerar tromboprofilaxia com HBPM em SN com albumina <2 g/dL + fatores adicionais (imobilização, infecção, membranosa, história familiar de TEV, cateter central), balanceando risco/benefício individualmente',
      C: 'Warfarina em todos',
      D: 'Nenhuma medida',
    },
    correct: 'B',
    explanation:
      'Profilaxia rotineira em toda SN pediátrica não é consenso; estratificar risco. Pearl: albumina <2 + imobilização = considerar HBPM.',
    bibliography: 'Kerlin BA et al.; SPARK/pediatric consensus.',
  },
  {
    id: 'NP-T079',
    tema: 'Diálise peritoneal',
    subtema: 'Adequação',
    dificuldade: 'intermediario',
    age: 10,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg) em diálise peritoneal automatizada há 18 meses, cresceu 3 cm no último ano, PA controlada e boa aderência às trocas. Qual o conjunto de parâmetros necessário para avaliar adequação da diálise e reajustar a prescrição?',
    options: {
      A: 'Peso apenas',
      B: 'Kt/V urea semanal (alvo geralmente ≥1,8), depuração residual, controle volêmico (peso seco, PA), balanço eletrolítico, estado nutricional e crescimento; PET (peritoneal equilibrium test) para tipo de membrana e ajuste da prescrição',
      C: 'Apenas urocultura',
      D: 'Apenas urinálise',
    },
    correct: 'B',
    explanation:
      'Adequação em DP pediátrica: Kt/V, controle volêmico, crescimento, PA, nutrição. PET orienta escolha entre CAPD e APD e modo de trocas. Pearl: volume > pequeno Kt/V — congestionamento subestimado.',
    bibliography: 'ISPD pediatric adequacy.',
  },
  {
    id: 'NP-T080',
    tema: 'Transplante renal',
    subtema: 'Recorrência de FSGS',
    dificuldade: 'avancado',
    age: 13,
    vars: {},
    statement:
      'Adolescente de {{age}} ({{weight}} kg) com DRC 5 por FSGS primária confirmada por biópsia, painel genético negativo, agora encaminhado para transplante renal com doador vivo. Qual o cuidado específico e a orientação principal no manejo peritransplante deste paciente?',
    options: {
      A: 'Nenhum cuidado especial',
      B: 'Alto risco de recorrência da FSGS no enxerto (≈30–40% em primária, ainda maior em recidiva pós-Tx prévio): monitorar proteinúria diária no pós-Tx precoce, protocolo com plasmaférese ± rituximabe se recorrência, ICN e nefroproteção; discutir riscos antes do Tx',
      C: 'Não transplantar por definição',
      D: 'Corticoide isolado',
    },
    correct: 'B',
    explanation:
      'Recorrência ocorre em horas–dias. Plasmaférese + rituximabe são pilares. Pearl: proteinúria dia 1 pós-Tx = alarme.',
    bibliography: 'AST pediatric transplant.',
  },
  {
    id: 'NP-T081',
    tema: 'Nefroproteção',
    subtema: 'IECA/BRA em pediatria',
    dificuldade: 'basico',
    age: 12,
    vars: { upcr: 1.2, tfg: 65 },
    statement:
      '{{sexWord}} de {{age}} com sequela de nefropatia por refluxo, UPCR {{upcr}}, TFG {{tfg}}, PA no P90. Qual a conduta farmacológica de base?',
    options: {
      A: 'Corticoide contínuo',
      B: 'IECA (enalapril ou lisinopril) ou BRA (losartana) com alvo de UPCR <0,5 e PA <P90 (ou <P75 conforme ESCAPE trial e IPNA); monitorar K e creatinina após início; contracepção em adolescentes por teratogenicidade',
      C: 'AINE crônico',
      D: 'Diálise',
    },
    correct: 'B',
    explanation:
      'ESCAPE mostrou que PA <P75 atrasa DRC em criança com proteinúria. IECA/BRA são pilares. Educar adolescente sobre teratogenicidade. Pearl: alvo pediátrico de PA é mais baixo com proteinúria.',
    bibliography: 'ESCAPE trial; IPNA PA guidelines; KDIGO CKD.',
  },
  {
    id: 'NP-T082',
    tema: 'Distúrbios eletrolíticos',
    subtema: 'Hipofosfatemia por raquitismo',
    dificuldade: 'intermediario',
    age: 3,
    vars: { p: 2.2 },
    statement:
      '{{sexWord}} de {{age}} com baixa estatura, arqueamento dos membros inferiores, alargamento metafisário, P sérico {{p}} mg/dL, Ca normal, FA elevada, PTH levemente alto e fosfatúria elevada. Diagnóstico?',
    options: {
      A: 'Raquitismo carencial clássico apenas',
      B: 'Raquitismo hipofosfatêmico ligado ao X (PHEX) ou outras formas de perda renal de fósforo (FGF23 elevado): reposição oral de fosfato + calcitriol, ou burosumabe (anti-FGF23) nos aprovados; monitorar hipercalciúria e nefrocalcinose',
      C: 'ATR distal isolada',
      D: 'Diabetes insipidus',
    },
    correct: 'B',
    explanation:
      'Raquitismo hipofosfatêmico ligado ao X é a forma hereditária mais comum. Burosumabe substituiu em muitos centros o esquema fosfato+calcitriol clássico. Pearl: P baixo com fosfatúria alta = perda renal.',
    bibliography: 'International guidelines XLH (Carpenter TO et al.).',
  },
  {
    id: 'NP-T083',
    tema: 'Nefrolitíase infantil',
    subtema: 'Manejo agudo',
    dificuldade: 'intermediario',
    age: 8,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com cólica renal aguda e cálculo ureteral distal de 4 mm; sem obstrução alta grave, sem infecção. Qual a conduta?',
    options: {
      A: 'Cirurgia imediata sempre',
      B: 'Analgesia (AINE cauteloso se função renal e volemia normais, ou opioide fraco), hidratação, terapia médica expulsiva (α-bloqueador em selecionados), imagem para tamanho/local; intervenção urológica se cálculo grande, obstrução com dor persistente, infecção obstrutiva ou falha da expulsão',
      C: 'Antibiótico prolongado',
      D: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'Cálculos ureterais distais <5 mm têm alta chance de eliminação espontânea. AINE tem cuidado extra em criança desidratada. Pearl: obstrução + infecção = drenar já.',
    bibliography: 'AUA/ESU pediatric urolithiasis.',
  },
  {
    id: 'NP-T084',
    tema: 'Farmacologia',
    subtema: 'AINE em criança nefrológica',
    dificuldade: 'basico',
    age: 6,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg) com DRC estágio 3 secundária a uropatia obstrutiva, apresenta febre e coriza por IVAS há 24 h, sem sinais de alarme. A família procura orientação farmacológica para o controle sintomático da febre. Qual o antitérmico/analgésico preferido nesta criança nefropata?',
    options: {
      A: 'Ibuprofeno em dose plena',
      B: 'Paracetamol/dipirona em dose ajustada, evitando AINE (redução de prostaglandinas piora TFG em DRC/desidratação); tratar febre com medidas físicas e reidratação',
      C: 'Aspirina em altas doses',
      D: 'Indometacina',
    },
    correct: 'B',
    explanation:
      'AINE é nefrotóxico especialmente em criança desidratada ou com DRC. Preferir paracetamol/dipirona. Pearl: DRC + febre = paracetamol; evitar ibuprofeno.',
    bibliography: 'Drug-induced kidney injury in children.',
  },
  {
    id: 'NP-T085',
    tema: 'Emergências',
    subtema: 'Rabdomiólise pediátrica',
    dificuldade: 'intermediario',
    age: 13,
    vars: { ck: 28000, cr: 1.6 },
    statement:
      'Adolescente de {{age}} após exercício extenuante em calor, urina cor de "chá", mialgia intensa, CK {{ck}} U/L, creatinina {{cr}} mg/dL. Qual a conduta?',
    options: {
      A: 'Restrição de líquidos',
      B: 'Hidratação isotônica generosa (200–300 mL/h em adolescente, ajustar por peso e diurese) para diurese ≥2 mL/kg/h, monitorar K/Ca/P/CK, evitar AINE, alcalinização com bicarbonato em casos selecionados (evidência controversa) e diálise se AEIOU refratário',
      C: 'AINE',
      D: 'Ignorar CK',
    },
    correct: 'B',
    explanation:
      'Volume precoce reduz cast de mioglobina. Alcalinização não é obrigatória e requer monitorização. HipoCa/hiperK precoces, hiperCa tardia. Pearl: CK altíssima + urina "chá" = hidratar.',
    bibliography: 'Bosch X et al.',
  },
  {
    id: 'NP-T086',
    tema: 'Genética renal',
    subtema: 'Painel em SN/DRC',
    dificuldade: 'intermediario',
    age: 5,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg) com síndrome nefrótica corticorresistente, biópsia com padrão de GESF, aguardando definição de segunda linha. A família pergunta sobre a utilidade do painel genético para podocitopatias. Qual o papel do painel genético neste cenário?',
    options: {
      A: 'Nenhum',
      B: 'Painel genético (NPHS1, NPHS2, WT1, PLCE1, INF2, TRPC6, ACTN4 e ampliado) é indicado em SRNS pediátrica — muda prognóstico, evita imunossupressão desnecessária em formas monogênicas e orienta decisão sobre Tx (risco de recorrência menor em formas genéticas)',
      C: 'Substitui biópsia sempre',
      D: 'Contraindicado em pediatria',
    },
    correct: 'B',
    explanation:
      'Painel genético é rotina em SRNS pediátrica: até 30% em <18 anos têm forma monogênica. Não substitui biópsia, mas complementa. Pearl: genética + biópsia = par diagnóstico moderno.',
    bibliography: 'Sadowski CE et al., JASN 2015; IPNA SRNS.',
  },
  {
    id: 'NP-T087',
    tema: 'Nefropediatria — DRC 5',
    subtema: 'Início de TSR',
    dificuldade: 'avancado',
    age: 11,
    vars: { tfg: 10 },
    statement:
      '{{sexWord}} de {{age}} com DRC (TFG {{tfg}}), fadiga, anorexia, atraso escolar e albumina em queda. Qual a conduta?',
    options: {
      A: 'Nada',
      B: 'Início de TSR baseado em sinais/sintomas urêmicos, falência nutricional, sobrecarga de volume ou AEIOU (não somente pela TFG isolada); planejamento antecipado da modalidade (DP domiciliar geralmente preferida em pediatria), preparo psicossocial e transplante preemptivo quando possível',
      C: 'Corticoide isolado',
      D: 'AINE',
    },
    correct: 'B',
    explanation:
      'DP é frequentemente a primeira escolha pediátrica; Tx preemptivo é meta ideal. Pearl: quanto antes preparar, melhor o desfecho neurodesenvolvimental.',
    bibliography: 'IPNA pediatric dialysis.',
  },
  {
    id: 'NP-T088',
    tema: 'DRC-MBD',
    subtema: 'Calcificação vascular',
    dificuldade: 'avancado',
    age: 14,
    vars: {},
    statement:
      'Adolescente com DRC 5 em HD apresenta produto Ca×P persistentemente >70, exposição a altas doses de cálcio e calcitriol. Qual o principal risco a evitar?',
    options: {
      A: 'Bradicardia isolada',
      B: 'Calcificação vascular acelerada e calcifilaxia: preferir quelantes não-cálcicos (sevelamer, carbonato de lantânio), ajustar cálcio do dialisado, uso criterioso de vitamina D ativa, calcimimético para PTH; investigar calcifilaxia se lesões cutâneas dolorosas',
      C: 'Alopecia',
      D: 'Cárie',
    },
    correct: 'B',
    explanation:
      'Sobrecarga cálcica acelera doença vascular; a expectativa de vida em jovens dialíticos é muito reduzida. Pearl: em adolescente em HD, cuidar de artéria = cuidar de coração.',
    bibliography: 'KDIGO CKD-MBD 2024 update.',
  },
];

module.exports = { PED_MASTERS };
