/** Casos mestres — Nefrologia Pediátrica (prova de título / certificado). */
const PED_MASTERS = [
  {
    id: 'NP-M001',
    tema: 'Síndrome nefrótica',
    subtema: 'Corticossensível',
    dificuldade: 'facil',
    age: 4,
    vars: { alb: 1.8, col: 340, upcr: 5.2, cr: 0.4 },
    statement:
      '{{sexWord}} de {{age}} ({{weight}} kg) apresenta edema palpebral e de membros inferiores há 5 dias, urina “espumosa” e ganho ponderal de 2 kg. PA no percentil 50. Exames: albumina {{alb}} g/dL, colesterol {{col}} mg/dL, creatinina {{cr}} mg/dL, C3 normal, FAN negativo. Relação proteína/creatinina urinária {{upcr}} mg/mg. Sem hematúria significativa. Qual a conduta inicial mais adequada?',
    options: {
      A: 'Biópsia renal imediata antes de qualquer tratamento',
      B: 'Prednisona oral em dose plena conforme protocolo de SN idiopática e orientações de edema',
      C: 'Ciclofosfamida como primeira linha',
      D: 'Antibiótico empírico e observação ambulatorial sem corticoide',
    },
    correct: 'B',
    explanation:
      'Quadro clássico de síndrome nefrótica idiopática em idade típica (1–12 anos), sem sinais de atipia (HAS grave, hipocomplementemia, falência renal, FAN+). A primeira linha é corticosteroide oral; biópsia não é rotina no debut típico. Ciclofosfamida reserva-se a corticorresistência/dependência selecionada.\n\nPearl: SN típica → corticoide primeiro; atipia → pensar biópsia/secundária.',
    bibliography: 'IPNA clinical practice recommendations for SSNS; Emma F et al. Pediatric Nephrology',
  },
  {
    id: 'NP-M002',
    tema: 'Síndrome nefrótica',
    subtema: 'Corticorresistente',
    dificuldade: 'dificil',
    age: 6,
    vars: { alb: 1.6, upcr: 6.1, cr: 0.5 },
    statement:
      '{{sexWord}} de {{age}} com SN idiopática em uso de prednisona plena há 6 semanas, sem remissão (albumina {{alb}} g/dL, UPCR {{upcr}}). Creatinina {{cr}} mg/dL, PA controlada, C3 normal. Qual a próxima etapa mais apropriada?',
    options: {
      A: 'Manter o mesmo esquema por mais 6 meses sem reavaliação',
      B: 'Indicar biópsia renal e planejar segunda linha (ex.: inibidor de calcineurina) conforme histologia/genética',
      C: 'Nefrectomia bilateral',
      D: 'Suspender todo tratamento e liberar sem seguimento',
    },
    correct: 'B',
    explanation:
      'Ausência de remissão após ~4–6 semanas de corticoide plenamente indicado configura corticorresistência. Indica-se biópsia (GESF vs outros) e, em muitos centros, painel genético; segunda linha frequentemente inclui ICN.\n\nPearl: SRNS ≠ “mais corticoide sem fim”.',
    bibliography: 'IPNA recommendations for SRNS',
  },
  {
    id: 'NP-M003',
    tema: 'Síndrome nefrótica',
    subtema: 'Recidiva',
    dificuldade: 'medio',
    age: 5,
    vars: { upcr: 3.8 },
    statement:
      '{{sexWord}} de {{age}} com SN corticossensível em remissão há 4 meses. Após IVAS, reaparece edema e UPCR {{upcr}}. Sem sinais de peritonite ou trombose. Conduta habitual da recidiva?',
    options: {
      A: 'Reiniciar prednisona conforme protocolo de recidiva e tratar o gatilho infeccioso',
      B: 'Pulsoterapia com ciclofosfamida de imediato',
      C: 'Internação para diálise',
      D: 'Ignorar proteinúria se a creatinina for normal',
    },
    correct: 'A',
    explanation:
      'Recidivas após infecção são comuns no SSNS. O manejo padrão é retomar corticoide no esquema de recidiva e tratar infecção. Imunossupressão poupadora de corticoide entra em recidivas frequentes/corticodependência.\n\nPearl: IVAS → checar urina; recidiva precoce é regra, não exceção.',
    bibliography: 'IPNA SSNS recommendations',
  },
  {
    id: 'NP-M004',
    tema: 'GN pós-estreptocócica',
    subtema: 'Suporte',
    dificuldade: 'facil',
    age: 8,
    vars: { sbp: 142, dbp: 92, c3: 42, cr: 1.1 },
    statement:
      '{{sexWord}} de {{age}} com hematúria macroscópica (“coca-cola”), edema e cefaleia. História de impetigo há 3 semanas. PA {{sbp}}×{{dbp}} mmHg. C3 {{c3}} mg/dL (baixo), C4 normal, ASLO elevado, creatinina {{cr}} mg/dL. Qual a conduta mais adequada?',
    options: {
      A: 'Imunossupressão com ciclofosfamida de rotina',
      B: 'Suporte: restrição hidrossalina, controle pressórico (ex.: diurético/anti-hipertensivo) e vigilância da função renal',
      C: 'Nefrectomia',
      D: 'Alta sem controle de volume/PA',
    },
    correct: 'B',
    explanation:
      'GNPE típica: latência pós-pele/faringe, hipocomplementemia C3, curso geralmente autolimitado. Tratamento é suporte (volume/PA). Imunossupressão não é rotina.\n\nPearl: C3 baixo + latência clássica → pensar GNPE; acompanhar resolução do C3 (~8–12 semanas).',
    bibliography: 'Pediatric Nephrology textbooks; JBN reviews',
  },
  {
    id: 'NP-M005',
    tema: 'Nefropatia por IgA',
    subtema: 'Hematúria sincrônica',
    dificuldade: 'medio',
    age: 12,
    vars: { c3: 110, cr: 0.7, upcr: 0.4 },
    statement:
      '{{sexWord}} de {{age}} com hematúria macroscópica iniciada no mesmo dia de faringite. C3 {{c3}} mg/dL (normal), creatinina {{cr}} mg/dL, UPCR {{upcr}}. Sem edema importante. Qual a interpretação mais provável?',
    options: {
      A: 'GNPE típica (sempre C3 baixo e latência de semanas)',
      B: 'Compatível com nefropatia por IgA (hematúria sincrônica com IVAS e complemento normal)',
      C: 'ITU não complicada apenas',
      D: 'Necrose tubular aguda isquêmica',
    },
    correct: 'B',
    explanation:
      'IgA: hematúria macroscópica sincrônica à IVAS e complemento habitualmente normal. GNPE tem latência e C3 baixo.\n\nPearl: “mesmo dia da dor de garganta” → IgA; “2–3 semanas depois” → GNPE.',
    bibliography: 'KDIGO Glomerular Diseases; IPNA',
  },
  {
    id: 'NP-M006',
    tema: 'Púrpura de Henoch-Schönlein',
    subtema: 'Nefrite',
    dificuldade: 'medio',
    age: 7,
    vars: { upcr: 1.8, cr: 0.6 },
    statement:
      '{{sexWord}} de {{age}} com púrpura palpável em membros inferiores, artralgia e dor abdominal. Urina com hematúria e UPCR {{upcr}}; creatinina {{cr}} mg/dL. Qual conduta nefrológica inicial é mais adequada?',
    options: {
      A: 'Ignorar o sedimento urinário porque a púrpura “é só pele”',
      B: 'Monitorar PA, função renal e proteinúria; escalonar imunossupressão/biópsia se nefrite moderada-grave',
      C: 'Antibiótico prolongado como cura da nefrite',
      D: 'Diálise imediata em todos os casos',
    },
    correct: 'B',
    explanation:
      'IgA vasculitis (HSP): nefrite exige estratificação. Casos leves → vigilância; proteinúria persistente/queda de TFG → biópsia e terapia conforme gravidade.\n\nPearl: toda HSP precisa de urina e PA seriadas.',
    bibliography: 'SHARE/IPNA recommendations for IgAV nephritis',
  },
  {
    id: 'NP-M007',
    tema: 'SHU',
    subtema: 'D+',
    dificuldade: 'medio',
    age: 3,
    vars: { hb: 7.2, plaq: 42000, cr: 2.4, k: 5.8 },
    statement:
      '{{sexWord}} de {{age}} após diarreia sanguinolenta há 5 dias evolui com palidez, oligúria e edema. Hb {{hb}} g/dL, plaquetas {{plaq}}/µL, esquizócitos, creatinina {{cr}} mg/dL, K {{k}} mEq/L. Qual a conduta inicial correta?',
    options: {
      A: 'Antibiótico empírico imediato para “acabar com a toxina”',
      B: 'Suporte (volume cuidadoso, corrigir eletrólitos, diálise se AEIOU); evitar ATB rotineiro na fase diarréica típica D+',
      C: 'Plasmaférese de rotina em toda SHU D+',
      D: 'Transfusão de plaquetas profilática em massa sem sangramento',
    },
    correct: 'B',
    explanation:
      'STEC-HUS (D+): tríade MAHA + plaquetopenia + IRA pós-diarreia. Pilar é suporte; antibiótico na fase diarréica pode aumentar liberação de toxina. Plasmaférese não é rotina no D+ típico (diferente da atípica selecionada).\n\nPearl: diarreia → HUS D+ → suporte; atípica → pensar complemento.',
    bibliography: 'IPNA aHUS/STEC-HUS guidance',
  },
  {
    id: 'NP-M008',
    tema: 'SHU',
    subtema: 'Atípica',
    dificuldade: 'dificil',
    age: 2,
    vars: { cr: 3.1 },
    statement:
      '{{sexWord}} de {{age}} com MAHA, plaquetopenia e IRA (creatinina {{cr}} mg/dL), SEM diarreia prodômica. Há recorrência após suporte inicial. Qual linha diagnóstica/terapêutica deve ser considerada?',
    options: {
      A: 'Tratar apenas como desidratação simples',
      B: 'Investigar SHU atípica (complemento/genética) e discutir terapia dirigida (ex.: eculizumabe) em centro especializado',
      C: 'Corticoide isolado resolve sempre',
      D: 'Proibir diálise mesmo com hiperkalemia refratária',
    },
    correct: 'B',
    explanation:
      'Sem diarreia e com recorrência, pensa-se aHUS (desregulação do complemento). Exige avaliação especializada e, em muitos protocolos, bloqueio de C5.\n\nPearl: HUS sem diarreia = bandeira vermelha para atípica.',
    bibliography: 'IPNA aHUS recommendations',
  },
  {
    id: 'NP-M009',
    tema: 'ITU',
    subtema: 'Febril',
    dificuldade: 'facil',
    age: 0.6,
    vars: {},
    statement:
      'Lactente de {{age}} ({{weight}} kg), sexo {{sexAdj}}, febre sem foco. Urocultura com E. coli >10⁵ UFC/mL. Resposta clínica boa ao antibiótico. Após o primeiro episódio febril, qual o próximo passo de imagem mais frequentemente indicado?',
    options: {
      A: 'Nenhuma imagem jamais',
      B: 'Ultrassonografia das vias urinárias',
      C: 'Cistoscopia de rotina imediata',
      D: 'Nefrectomia profilática',
    },
    correct: 'B',
    explanation:
      'Após ITU febril no lactente, a US é em geral o primeiro exame para rastrear malformação/hidronefrose. Uretrocistografia/DMSA seguem critérios (recorrência, US anormal, germes atípicos etc.).\n\nPearl: 1º episódio febril → US; não pular direto para procedimentos invasivos.',
    bibliography: 'AAP/SBP UTI guidelines; Pediatric Nephrology',
  },
  {
    id: 'NP-M010',
    tema: 'Refluxo vesicoureteral',
    subtema: 'Conservador',
    dificuldade: 'medio',
    age: 2,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com ITU febril recorrente. UCG mostra RVU grau III unilateral, rim com função preservada e rim contralateral normal. Sem falhas de esvaziamento. Conduta inicial mais razoável?',
    options: {
      A: 'Cirurgia imediata em todo grau III',
      B: 'Manejo conservador (profilaxia selecionada, tratamento precoce de ITU, acompanhamento) na maioria dos casos intermediários',
      C: 'Suspender seguimento urológico',
      D: 'Diálise preventiva',
    },
    correct: 'B',
    explanation:
      'Muitos RVU graus baixos/intermediários resolvem ou estabilizam com conduta conservadora. Cirurgia reserva-se a breakthrough infections, deterioração renal, graus altos persistentes.\n\nPearl: RVU ≠ indicação automática de reimplante.',
    bibliography: 'AUA/ESPU VUR guidelines',
  },
  {
    id: 'NP-M011',
    tema: 'Válvula de uretra posterior',
    subtema: 'Desobstrução',
    dificuldade: 'dificil',
    age: 0.05,
    vars: { cr: 1.8 },
    statement:
      'RN masculino com massa vesical palpável, jato fraco, creatinina {{cr}} mg/dL e US com bexiga espessada + hidronefrose bilateral. Qual a prioridade imediata?',
    options: {
      A: 'Observação domiciliar até 6 meses',
      B: 'Descompressão do trato urinário (sonda/vesicostomia conforme cenário) e planejamento de ablação valvular',
      C: 'Nefrectomia bilateral de urgência',
      D: 'Apenas diurético de alça sem aliviar obstrução',
    },
    correct: 'B',
    explanation:
      'PUV: emergência obstrutiva. Descomprimir, estabilizar eletrólitos/função e depois ablação endoscópica. Atraso piora DRC.\n\nPearl: RN menino + jato fraco + bexiga cheia → pensar PUV.',
    bibliography: 'Pediatric Urology / Nephrology texts',
  },
  {
    id: 'NP-M012',
    tema: 'Hidronefrose',
    subtema: 'Antenatal',
    dificuldade: 'medio',
    age: 0.1,
    vars: {},
    statement:
      'RN com hidronefrose antenatal grau moderada unilateral. Pós-natal: estável, diurese normal, creatinina adequada à idade, US confirma dilatação sem ureter dilatados. Conduta inicial típica?',
    options: {
      A: 'Cirurgia na primeira semana em todos os casos',
      B: 'Seguimento com US seriados e profilaxia/investigação conforme protocolo de risco',
      C: 'Alta sem nenhum controle de imagem',
      D: 'Diálise neonatal profilática',
    },
    correct: 'B',
    explanation:
      'A maioria das hidronefroses antenatais unilaterais leves/moderadas é seguida clinicamente; cirurgia se obstrução funcional/progressão.\n\nPearl: dilatação ≠ operar automaticamente.',
    bibliography: 'SFU hydronephrosis grading; pediatric protocols',
  },
  {
    id: 'NP-M013',
    tema: 'Acidose tubular',
    subtema: 'Tipo 1',
    dificuldade: 'dificil',
    age: 4,
    vars: { ph: 7.25, hco3: 12, k: 2.8, cl: 118 },
    statement:
      '{{sexWord}} de {{age}} com falha de crescimento, poliúria e pedras. Gasometria: pH {{ph}}, HCO₃ {{hco3}}, K {{k}}, Cl {{cl}}, ânion gap normal. Urina com pH inapropriadamente alto na acidemia. Diagnóstico mais provável?',
    options: {
      A: 'Acidose láctica de alto gap',
      B: 'Acidose tubular renal distal (tipo 1)',
      C: 'Cetoacidose diabética',
      D: 'Alcalose metabólica de contração',
    },
    correct: 'B',
    explanation:
      'ATR distal: acidose hiperclorêmica (gap normal), hipocalemia, incapacidade de acidificar a urina, nefrocalcinose/litíase e atraso estatural.\n\nPearl: acidemia + pH urinário alto → distal.',
    bibliography: 'Pediatric electrolyte disorders; Emma textbook',
  },
  {
    id: 'NP-M014',
    tema: 'Bartter',
    subtema: 'Neonatal',
    dificuldade: 'dificil',
    age: 0.2,
    vars: { k: 2.1, cl: 85 },
    statement:
      'Lactente com poliúria, desidratação, K {{k}} mEq/L, Cl {{cl}}, alcalose metabólica e PA baixa/normal. US às vezes com nefrocalcinose. Qual o diagnóstico sindrômico mais compatível?',
    options: {
      A: 'Liddle (HAS + alcalose)',
      B: 'Síndrome de Bartter',
      C: 'Hiperaldosteronismo primário típico do adolescente hipertenso',
      D: 'SIADH',
    },
    correct: 'B',
    explanation:
      'Bartter: perde-sal, hipocalemia, alcalose, PA normal/baixa — “como alça de Henle”. Liddle tem HAS.\n\nPearl: alcalose + K baixo + criança sem HAS → Bartter/Gitelman (idade/cálcio diferenciam).',
    bibliography: 'Pediatric tubular disorders',
  },
  {
    id: 'NP-M015',
    tema: 'Gitelman',
    subtema: 'Adolescente',
    dificuldade: 'medio',
    age: 14,
    vars: { k: 2.6, mg: 1.2 },
    statement:
      'Adolescente de {{age}} com cãibras, fadiga, K {{k}}, Mg {{mg}} mg/dL, alcalose e PA normal. Calciúria baixa. Diagnóstico mais provável?',
    options: {
      A: 'Bartter neonatal clássico',
      B: 'Síndrome de Gitelman',
      C: 'Doença de Addison',
      D: 'Hipertensão renovascular',
    },
    correct: 'B',
    explanation:
      'Gitelman (NCCT): adolescente/adulto jovem, hipomagnesemia marcada, hipocalciúria, PA normal.\n\nPearl: Mg baixo + hipocalciúria → Gitelman.',
    bibliography: 'Tubulopathies reviews',
  },
  {
    id: 'NP-M016',
    tema: 'Hipertensão',
    subtema: 'Secundária',
    dificuldade: 'medio',
    age: 9,
    vars: { sbp: 138, dbp: 90 },
    statement:
      '{{sexWord}} de {{age}} com PA {{sbp}}×{{dbp}} repetidamente acima do percentil 95 + 12 mmHg, sopro abdominal e assimetria de pulsos. Qual a conduta inicial correta?',
    options: {
      A: 'Ignorar porque “criança não tem HAS”',
      B: 'Confirmar técnica/percentis e investigar causa secundária (ex.: coarctação/renovascular) antes de polifarmácia às cegas',
      C: 'Iniciar 4 anti-hipertensivos sem investigação',
      D: 'Proibir exercício mesmo após controle',
    },
    correct: 'B',
    explanation:
      'HAS estágio elevado em criança exige confirmação e busca de secundária. Sopro/assimetria → coarctação/renovascular.\n\nPearl: quanto menor a criança e maior a PA, maior a chance de secundária.',
    bibliography: 'AAP Pediatric Hypertension guideline',
  },
  {
    id: 'NP-M017',
    tema: 'IRA',
    subtema: 'Pré-renal',
    dificuldade: 'facil',
    age: 2,
    vars: { cr: 1.3, fena: 0.3 },
    statement:
      '{{sexWord}} de {{age}} com gastroenterite há 3 dias, taquicardia, tempo de enchimento capilar prolongado, oligúria. Creatinina {{cr}} mg/dL, FENa {{fena}}%, urina concentrada. Conduta inicial?',
    options: {
      A: 'Diálise imediata só pela creatinina',
      B: 'Reposição volêmica isotônica cuidadosa e reavaliação da perfusão/diurese',
      C: 'Restrição hídrica absoluta na pré-renal',
      D: 'Corticoide de rotina',
    },
    correct: 'B',
    explanation:
      'IRA pré-renal: restaurar volume. Diálise segue AEIOU clínicos, não o número isolado da creatinina.\n\nPearl: FENa baixo + história de perdas → volume primeiro.',
    bibliography: 'KDIGO AKI; pediatric critical care nephrology',
  },
  {
    id: 'NP-M018',
    tema: 'DRC',
    subtema: 'Crescimento',
    dificuldade: 'medio',
    age: 10,
    vars: { tfg: 28, hb: 9.0 },
    statement:
      '{{sexWord}} de {{age}} com DRC estágio 4 (TFG {{tfg}}), Hb {{hb}}, atraso estatural e PTH elevado. Além do controle da doença de base, qual eixo terapêutico é essencial?',
    options: {
      A: 'Ignorar nutrição e mineral ósseo',
      B: 'Otimizar nutrição, tratar anemia/CKD-MBD e considerar hormônio de crescimento quando indicado',
      C: 'Transplante imediato sem preparo',
      D: 'Suspender todas as vitaminas',
    },
    correct: 'B',
    explanation:
      'DRC pediátrica: crescimento depende de nutrição, acidose, CKD-MBD, anemia e, em selecionados, rhGH.\n\nPearl: criança com DRC “não é adulto pequeno”.',
    bibliography: 'KDOQI/KDIGO pediatric CKD',
  },
  {
    id: 'NP-M019',
    tema: 'Diálise peritoneal',
    subtema: 'Peritonite',
    dificuldade: 'medio',
    age: 9,
    vars: {},
    statement:
      'Criança de {{age}} em DP apresenta dor abdominal e efluente turvo. Conduta imediata correta?',
    options: {
      A: 'Esperar 1 semana sem coletar efluente',
      B: 'Coletar efluente para celularidade/cultura e iniciar antibiótico intraperitoneal conforme protocolo',
      C: 'Remover o cateter em todos os casos na primeira hora',
      D: 'Apenas analgésico oral',
    },
    correct: 'B',
    explanation:
      'Peritonite em DP: diagnóstico por turvação/celularidade e ATB IP precoce. Remoção do cateter em falhas/selecionados.\n\nPearl: efluente turvo = peritonite até prova em contrário.',
    bibliography: 'ISPD peritonitis recommendations (ped adaptations)',
  },
  {
    id: 'NP-M020',
    tema: 'Transplante renal',
    subtema: 'Rejeição',
    dificuldade: 'dificil',
    age: 13,
    vars: { cr0: 0.9, cr1: 1.7 },
    statement:
      'Adolescente transplantado há 8 meses, creatinina sobe de {{cr0}} para {{cr1}} mg/dL, com adesão duvidosa à imunossupressão. Qual a conduta mais apropriada?',
    options: {
      A: 'Suspender todos os imunossupressores',
      B: 'Avaliar níveis, infecção e indicar biópsia do enxerto quando rejeição é possível',
      C: 'Nefrectomia imediata do enxerto',
      D: 'Aumentar tacrolimus mesmo com sinal de toxicidade',
    },
    correct: 'B',
    explanation:
      'Disfunção do enxerto: diferenciar rejeição, toxicidade e infecção (CMV/BK). Biópsia guia terapia; má adesão é comum na adolescência.\n\nPearl: creatinina sobe no Tx → não “chutar” sem biópsia/níveis.',
    bibliography: 'Pediatric transplant nephrology',
  },
  {
    id: 'NP-M021',
    tema: 'Hipercalemia',
    subtema: 'ECG',
    dificuldade: 'medio',
    age: 8,
    vars: { k: 7.1 },
    statement:
      'Criança de {{age}} com DRC e K {{k}} mEq/L, ondas T apiculadas no ECG. Conduta imediata?',
    options: {
      A: 'Apenas dieta, sem estabilizar membrana',
      B: 'Antagonizar efeito cardíaco (cálcio IV se alterações ECG), deslocar K (insulina+glicose/beta-agonista) e remover K (resina/diálise)',
      C: 'Dar apenas espironolactona',
      D: 'Ignorar o ECG',
    },
    correct: 'B',
    explanation:
      'HiperK com ECG alterado: proteger coração → redistribuir → eliminar.\n\nPearl: cálcio estabiliza membrana; não baixa o K sérico.',
    bibliography: 'Pediatric emergency electrolyte algorithms',
  },
  {
    id: 'NP-M022',
    tema: 'Hiponatremia',
    subtema: 'Convulsão',
    dificuldade: 'dificil',
    age: 1,
    vars: { na: 118 },
    statement:
      'Lactente de {{age}} ({{weight}} kg) chega à emergência com convulsão tônico-clônica. Glicemia normal. Sódio sérico {{na}} mEq/L. Qual a prioridade imediata no manejo da hiponatremia sintomática grave?',
    options: {
      A: 'Correção lenta demais deixando convulsão contínua',
      B: 'Bolus de solução hipertônica para cessar crise e depois correção controlada do déficit',
      C: 'Restrição hídrica exclusiva na emergência convulsiva',
      D: 'Diálise sem manejo da natremia',
    },
    correct: 'B',
    explanation:
      'Hiponatremia sintomática grave: 3% NaCl para abortar crise; depois correção gradual evitando mielinólise.\n\nPearl: convulsão + Na baixo → hipertônica agora.',
    bibliography: 'Pediatric hyponatremia guidelines',
  },
  {
    id: 'NP-M023',
    tema: 'Litíase',
    subtema: 'Hipercalciúria',
    dificuldade: 'medio',
    age: 9,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com cólica ureteral e cálculo rádio-opaco. Investigação metabólica mostra hipercalciúria idiopática, PTH normal, Ca sérico normal. Conduta nutricional/farmacológica inicial?',
    options: {
      A: 'Restringir drasticamente cálcio da dieta em toda criança',
      B: 'Hidratação abundante, sódio moderado e considerar tiazídico se recorrência/alta calciúria',
      C: 'Ignorar prevenção metabólica',
      D: 'Alcalinização com bicarbonato em todo cálculo de cálcio',
    },
    correct: 'B',
    explanation:
      'Hipercalciúria: hidratação e redução de sal; tiazídico em selecionados. Restrição severa de cálcio pode piorar oxalúria.\n\nPearl: não “cortar cálcio” às cegas.',
    bibliography: 'Pediatric nephrolithiasis reviews',
  },
  {
    id: 'NP-M024',
    tema: 'Alport',
    subtema: 'Diagnóstico',
    dificuldade: 'medio',
    age: 11,
    vars: {},
    statement:
      'Menino de {{age}} com hematúria persistente desde a infância, proteinúria crescente e tio materno em diálise. Audiometria com perda neurossensorial. Hipótese mais provável?',
    options: {
      A: 'ITU de repetição apenas',
      B: 'Síndrome de Alport',
      C: 'GNPE isolada autolimitada',
      D: 'Hipercalciúria idiopática pura',
    },
    correct: 'B',
    explanation:
      'Alport: hematúria familiar, progressão em homens, surdez neurossensorial ± ocular; COL4A.\n\nPearl: hematúria + história familiar de DRC + audição → Alport.',
    bibliography: 'Alport syndrome consensus',
  },
  {
    id: 'NP-M025',
    tema: 'Nefrite lúpica',
    subtema: 'Classe IV',
    dificuldade: 'dificil',
    age: 15,
    vars: { upcr: 3.2, cr: 1.4 },
    statement:
      'Adolescente com LES, UPCR {{upcr}}, hematúria, C3 baixo, anti-dsDNA alto e creatinina {{cr}}. Biópsia: classe IV. Indução típica?',
    options: {
      A: 'Apenas hidroxicloroquina sem imunossupressão adicional',
      B: 'Indução com corticoide + MMF ou ciclofosfamida (protocolo), depois manutenção',
      C: 'Nefrectomia',
      D: 'Antibiótico prolongado',
    },
    correct: 'B',
    explanation:
      'Classe III/IV exige indução imunossupressora agressiva e manutenção (MMF/Aza), além de HCQ e nefroproteção.\n\nPearl: classe IV ≠ “só observar”.',
    bibliography: 'KDIGO lupus nephritis; CARRA/SHARE ped',
  },
  {
    id: 'NP-M026',
    tema: 'Diabetes insipidus',
    subtema: 'Nefrogênico',
    dificuldade: 'medio',
    age: 3,
    vars: { na: 156 },
    statement:
      'Criança com poliúria intensa, polidipsia, Na {{na}} e urina diluída. Após desmopressina, não concentra. Diagnóstico?',
    options: {
      A: 'DI central',
      B: 'DI nefrogênico',
      C: 'SIADH',
      D: 'Síndrome nefrótica',
    },
    correct: 'B',
    explanation:
      'Falta de resposta à desmopressina define DI nefrogênico (aquaporina-2/V2).\n\nPearl: DDAVP funciona no central, não no nefrogênico.',
    bibliography: 'Pediatric DI reviews',
  },
  {
    id: 'NP-M027',
    tema: 'Disfunção miccional',
    subtema: 'Enurese',
    dificuldade: 'facil',
    age: 7,
    vars: {},
    statement:
      'Criança de {{age}} com enurese noturna monossintomática, sem ITU, exame normal e família angustiada. Conduta inicial?',
    options: {
      A: 'Cirurgia de imediato',
      B: 'Educação, calendário miccional, alarmes e considerar desmopressina em selecionados',
      C: 'Antibiótico contínuo sem avaliação',
      D: 'Diálise',
    },
    correct: 'B',
    explanation:
      'Enurese monossintomática: medidas comportamentais/alarme; DDAVP em contextos específicos.\n\nPearl: tratar constipação associada se houver.',
    bibliography: 'ICCS enuresis guidelines',
  },
  {
    id: 'NP-M028',
    tema: 'Proteinúria',
    subtema: 'Ortostática',
    dificuldade: 'facil',
    age: 13,
    vars: {},
    statement:
      'Adolescente assintomático com proteinúria intermitente em exames escolares. Amostra matinal negativa e amostra diurna positiva; função renal e sedimento normais. Hipótese?',
    options: {
      A: 'SN corticorresistente',
      B: 'Proteinúria ortostática',
      C: 'Nefrite lúpica classe IV',
      D: 'IRA intrínseca',
    },
    correct: 'B',
    explanation:
      'Ortostática: típica do adolescente, matinal limpa, diurna positiva, benigna se resto normal.\n\nPearl: sempre pedir amostra da primeira urina da manhã.',
    bibliography: 'Pediatric proteinuria approach',
  },
  {
    id: 'NP-M029',
    tema: 'Hematúria',
    subtema: 'Glomerular',
    dificuldade: 'facil',
    age: 10,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com urina escura, hemácias dismórficas >40% e cilindros hemáticos. PA e creatinina normais. O achado sugere principalmente origem:',
    options: {
      A: 'Urológica baixa (cistite simples)',
      B: 'Glomerular',
      C: 'Contaminação menstrual apenas, sem valor',
      D: 'Litíase obrigatória',
    },
    correct: 'B',
    explanation:
      'Dismorfismo + cilindros hemáticos = hematúria glomerular.\n\nPearl: morfologia da hemácia importa.',
    bibliography: 'Urinalysis in glomerular disease',
  },
  {
    id: 'NP-M030',
    tema: 'Uropatias congênitas',
    subtema: 'UPJ',
    dificuldade: 'medio',
    age: 0.4,
    vars: {},
    statement:
      'Lactente com hidronefrose progressiva, rim com adelgaçamento cortical e curva renográfica obstrutiva em junção ureteropiélica. Conduta?',
    options: {
      A: 'Observação indefinida mesmo com perda de função',
      B: 'Indicação cirúrgica (pieloplastia) perante obstrução com repercussão',
      C: 'Antibiótico substitui cirurgia',
      D: 'Nefrectomia do rim contralateral sadio',
    },
    correct: 'B',
    explanation:
      'Estenose de JUP com padrão obstrutivo e dano → pieloplastia.\n\nPearl: renograma ajuda a decidir operar.',
    bibliography: 'Pediatric UPJO management',
  },
  {
    id: 'NP-M031',
    tema: 'Cistinose',
    subtema: 'Fanconi',
    dificuldade: 'dificil',
    age: 2,
    vars: {},
    statement:
      'Criança com síndrome de Fanconi, fotofobia e depósitos corneanos. Qual doença lisossomal deve ser lembrada?',
    options: {
      A: 'Cistinose nefropática',
      B: 'Apenas deficiência dietética de vitamina C',
      C: 'GNPE',
      D: 'ITU simples',
    },
    correct: 'A',
    explanation:
      'Cistinose: Fanconi precoce + cristais corneanos; tratar com cisteamina.\n\nPearl: Fanconi + olhos → cistinose.',
    bibliography: 'Nephropathic cystinosis reviews',
  },
  {
    id: 'NP-M032',
    tema: 'Imunossupressores',
    subtema: 'Tacrolimus',
    dificuldade: 'medio',
    age: 12,
    vars: {},
    statement:
      'Paciente transplantado com tremor, cefaleia e creatinina em alta; nível de tacrolimus muito elevado. Conduta?',
    options: {
      A: 'Aumentar a dose',
      B: 'Reduzir/ajustar dose, investigar interação medicamentosa e reavaliar função do enxerto',
      C: 'Ignorar níveis',
      D: 'Trocar por AINEs',
    },
    correct: 'B',
    explanation:
      'Toxicidade de calcineurina: reduzir dose e checar interações (azoles, macrolídeos).\n\nPearl: nível alto + creatinina ↑ → toxicidade até prova em contrário.',
    bibliography: 'Transplant immunosuppression monitoring',
  },
  {
    id: 'NP-M033',
    tema: 'Farmacologia',
    subtema: 'Nefrotóxicos',
    dificuldade: 'facil',
    age: 6,
    vars: {},
    statement:
      'Criança desidratada recebe AINE + aminoglicosídeo. Qual risco renal aumenta?',
    options: {
      A: 'Nenhum, fármacos são sempre seguros juntos',
      B: 'IRA hemodinâmica/ATN — evitar combinação em hipovolemia',
      C: 'Apenas hepatite',
      D: 'Alcalose metabólica isolada',
    },
    correct: 'B',
    explanation:
      'AINEs (↓ prostaglandinas) + aminoglicosídeo em volume baixo = alto risco de IRA.\n\nPearl: hidratar e evitar nefrotóxicos empilhados.',
    bibliography: 'Drug-induced kidney injury in children',
  },
  {
    id: 'NP-M034',
    tema: 'SIADH',
    subtema: 'Diagnóstico',
    dificuldade: 'medio',
    age: 8,
    vars: { na: 124 },
    statement:
      'Criança com pneumonia, Na {{na}}, osmolaridade plasmática baixa, urina inapropriadamente concentrada e euvolemia clínica. Diagnóstico?',
    options: {
      A: 'Desidratação hipernatrêmica',
      B: 'SIADH',
      C: 'Hiperaldosteronismo primário',
      D: 'Bartter',
    },
    correct: 'B',
    explanation:
      'SIADH: hipoNa euvolêmica, urina concentrada, natriurese, estímulo (pulmão/SNC/fármacos).\n\nPearl: tratar causa + restrição hídrica; hipertônica se sintomática.',
    bibliography: 'Pediatric SIADH',
  },
  {
    id: 'NP-M035',
    tema: 'Glomerulonefrites',
    subtema: 'Rapidamente progressiva',
    dificuldade: 'dificil',
    age: 14,
    vars: { cr: 3.8 },
    statement:
      'Adolescente com hematúria, proteinúria, oligúria e creatinina {{cr}} em poucos dias, C3 normal, ANCA positivo. Conduta?',
    options: {
      A: 'Observação sem imunossupressão',
      B: 'Tratar como RPGN/vasculite: biópsia urgente e imunossupressão ± plasmaférese conforme protocolo',
      C: 'Apenas amoxicilina',
      D: 'Restrição proteica exclusiva',
    },
    correct: 'B',
    explanation:
      'RPGN/ANCA é emergência renal: biópsia e terapia indutora precoces salvam rim.\n\nPearl: creatinina em foguete + sedimento ativo → agir rápido.',
    bibliography: 'KDIGO vasculitis; pediatric ANCA',
  },
  {
    id: 'NP-M036',
    tema: 'Bexiga neurogênica',
    subtema: 'Cateterismo',
    dificuldade: 'medio',
    age: 5,
    vars: {},
    statement:
      'Criança com mielomeningocele, resíduo pós-miccional elevado e ITU de repetição. Pilar do manejo urológico?',
    options: {
      A: 'Ignorar o resíduo',
      B: 'Cateterismo intermitente limpo ± anticolinérgico e acompanhar trato superior',
      C: 'Diálise como primeira linha',
      D: 'Proibir antibiótico em pielonefrite',
    },
    correct: 'B',
    explanation:
      'Bexiga neurogênica: esvaziar com CIL, proteger rins, tratar constipação.\n\nPearl: resíduo alto alimenta ITU e hidronefrose.',
    bibliography: 'Neurogenic bladder pediatric guidelines',
  },
  {
    id: 'NP-M037',
    tema: 'Hiperoxalúria',
    subtema: 'Primária',
    dificuldade: 'dificil',
    age: 6,
    vars: {},
    statement:
      'Criança com litíase recorrente de oxalato, nefrocalcinose e evolução para DRC. Suspeita de hiperoxalúria primária. Conduta especializada inclui:',
    options: {
      A: 'Apenas reduzir água',
      B: 'Hidratação agressiva, cristalizadores, avaliação genética/terapias específicas e discussão de Tx hepatorrenal em formas graves',
      C: 'Dieta rica em oxalato',
      D: 'AINEs crônicos',
    },
    correct: 'B',
    explanation:
      'PH1 etc.: manejo complexo em centro; Tx isolado de rim pode falhar sem abordar produção hepática.\n\nPearl: litíase infantil recorrente grave → metabolismo.',
    bibliography: 'Primary hyperoxaluria consensus',
  },
  {
    id: 'NP-M038',
    tema: 'Anemia',
    subtema: 'DRC',
    dificuldade: 'facil',
    age: 11,
    vars: { hb: 8.8 },
    statement:
      'Paciente pediátrico com DRC e Hb {{hb}}, ferro adequado. Próximo passo típico?',
    options: {
      A: 'Ignorar anemia',
      B: 'Iniciar agente estimulador da eritropoiese conforme alvo pediátrico e corrigir carências',
      C: 'Transfusão semanal indefinida como primeira linha',
      D: 'Suspender dialise se em dialise',
    },
    correct: 'B',
    explanation:
      'Anemia da DRC: ferro + ESA com alvos pediátricos; evitar transfusão crônica.\n\nPearl: tratar ferro antes/alongside ESA.',
    bibliography: 'KDIGO anemia; pediatric targets',
  },
  {
    id: 'NP-M039',
    tema: 'CKD-MBD',
    subtema: 'PTH',
    dificuldade: 'medio',
    age: 10,
    vars: {},
    statement:
      'Criança em DRC com hipocalcemia, hiperfosfatemia e PTH muito alto. Conduta?',
    options: {
      A: 'Oferecer fósforo livre na dieta',
      B: 'Restringir fósforo, quelantes, vitamina D ativa conforme protocolo e monitorar PTH/Ca/P',
      C: 'Paratireoidectomia em todo caso na primeira consulta',
      D: 'Nada, PTH alto é desejável',
    },
    correct: 'B',
    explanation:
      'CKD-MBD pediátrico: controle de P/Ca e vitamina D; cirurgia em refratários.\n\nPearl: hiperPTH secundário mal tratado → osso e vasos.',
    bibliography: 'KDIGO CKD-MBD',
  },
  {
    id: 'NP-M040',
    tema: 'Síndrome nefrótica',
    subtema: 'Complicações',
    dificuldade: 'medio',
    age: 5,
    vars: {},
    statement:
      'Criança com SN em atividade, dor abdominal intensa, febre e sinais de irritação peritoneal. Principal preocupação?',
    options: {
      A: 'Peritonite espontânea — iniciar investigação e ATB empírico',
      B: 'Apenas constipação banal sem exames',
      C: 'Infarto do miocárdio típico do adulto',
      D: 'Ignorar porque SN não infecta',
    },
    correct: 'A',
    explanation:
      'SN aumenta risco de infecções encapsuladas e peritonite espontânea.\n\nPearl: dor abdominal + SN = infecção até prova em contrário.',
    bibliography: 'IPNA SSNS complications',
  },
  {
    id: 'NP-M041',
    tema: 'Síndrome nefrótica',
    subtema: 'Trombose',
    dificuldade: 'dificil',
    age: 7,
    vars: {},
    statement:
      'Criança com SN grave e edema assimétrico de membro inferior + dor. Conduta?',
    options: {
      A: 'Massagear o membro e liberar',
      B: 'Suspeitar trombose venosa, confirmar com imagem e anticoagular conforme protocolo',
      C: 'Aumentar apenas diurético',
      D: 'Proibir qualquer imagem',
    },
    correct: 'B',
    explanation:
      'Estado pró-trombótico do SN (perda de antitrombina etc.). TVP/TEP exigem diagnóstico e anticoagulação.\n\nPearl: assimetria + SN = TVP.',
    bibliography: 'Thrombosis in nephrotic syndrome',
  },
  {
    id: 'NP-M042',
    tema: 'IRA',
    subtema: 'AEIOU',
    dificuldade: 'medio',
    age: 6,
    vars: { k: 7.4 },
    statement:
      'Criança com IRA, K {{k}} refratário a medidas clínicas, edema pulmonar e acidose grave. Indicação?',
    options: {
      A: 'Alta hospitalar',
      B: 'Terapia de substituição renal (diálise)',
      C: 'Apenas observação',
      D: 'Soro fisiológico isolado resolve hiperkalemia refratária com edema agudo',
    },
    correct: 'B',
    explanation:
      'AEIOU: Acidose, Eletrólitos, Intoxicação, Overload, Uremia — indicações clássicas de diálise.\n\nPearl: K refratário + congestão = dialisar.',
    bibliography: 'KDIGO AKI',
  },
  {
    id: 'NP-M043',
    tema: 'Hidronefrose',
    subtema: 'Pós-natal',
    dificuldade: 'facil',
    age: 0.08,
    vars: {},
    statement:
      'RN com US pós-natal mostrando hidronefrose leve unilateral isolada, sem ureterectasia, função ok. Conduta?',
    options: {
      A: 'Cirurgia imediata',
      B: 'Controle ultrassonográfico e avaliação urológica conforme evolução',
      C: 'Nefrectomia',
      D: 'Diálise',
    },
    correct: 'B',
    explanation:
      'Leve e isolada: follow-up. Investigação adicional se piora/ITU.\n\nPearl: a maioria regride.',
    bibliography: 'SFU guidelines',
  },
  {
    id: 'NP-M044',
    tema: 'ITU',
    subtema: 'Recorrente',
    dificuldade: 'medio',
    age: 3,
    vars: {},
    statement:
      'Pré-escolar com 3 ITU febris em 6 meses, US normal. Próximo passo frequente?',
    options: {
      A: 'Nada mais a fazer',
      B: 'Investigar RVU/disfunção miccional (UCG/urodinâmica conforme protocolo) e fatores predisponentes',
      C: 'Nefrectomia bilateral',
      D: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'ITU febril recorrente → investigar anatomia/função miccional.\n\nPearl: constipação e disfunção miccional são vilãs.',
    bibliography: 'Pediatric UTI recurrence',
  },
  {
    id: 'NP-M045',
    tema: 'Embriologia',
    subtema: 'CAKUT',
    dificuldade: 'facil',
    age: 0.2,
    vars: {},
    statement:
      'RN com rim único funcional e ureter ectópico contralateral em investigação. Isso se enquadra em:',
    options: {
      A: 'CAKUT (congênito do rim e trato urinário)',
      B: 'GNPE',
      C: 'SN de lesão mínima',
      D: 'Nefropatia por contraste',
    },
    correct: 'A',
    explanation:
      'CAKUT abrange malformações de desenvolvimento renal/urinário — principal causa de DRC pediátrica.\n\nPearl: DRC na criança → pense CAKUT.',
    bibliography: 'CAKUT reviews',
  },
];

module.exports = { PED_MASTERS };
