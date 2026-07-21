/**
 * Casos-mestres — Nefrologia Adulta (Título SBN + CM aplicada ao rim).
 * Casos clínicos formato residência/título: vinheta, dados objetivos,
 * pergunta objetiva, distratores plausíveis, resposta única, explicação
 * detalhada com referências (KDIGO, KDOQI, ISPD, SBN, KDIGO CKD, etc.).
 *
 * Distribuição alvo (aprox.): ~70% pura nefrologia, ~30% hospital/UTI/
 * cardio-renal/hepato-renal/onco-nefrologia claramente ancoradas no rim.
 * `dificuldade`: basico | intermediario | avancado.
 */

const ADV_MASTERS = [
  // ============ IRA / LRA ============
  {
    id: 'NA-T001',
    tema: 'LRA',
    subtema: 'Pré-renal em sepse',
    dificuldade: 'basico',
    age: 68,
    vars: { cr: 2.4, ureia: 98, fena: 0.3 },
    statement:
      '{{sexWord}} de {{age}} anos, {{weight}} kg, admitido com sepse de foco urinário e PAM 65 mmHg após reposição inicial de 30 mL/kg de cristaloide balanceado. Creatinina basal 1,0; atual {{cr}} mg/dL; ureia {{ureia}}; FENa {{fena}}%, urina concentrada, sem cilindros pigmentados; US sem hidronefrose. Qual a interpretação e a conduta prioritária?',
    options: {
      A: 'Necrose tubular aguda estabelecida — iniciar hemodiálise imediatamente apenas pela creatinina',
      B: 'LRA pré-renal por hipoperfusão: otimizar perfusão (fluidoterapia guiada por reavaliação clínica/POCUS/VExUS, noradrenalina se hipotensão persistente), tratar a sepse com antimicrobiano adequado, evitar nefrotóxicos e reavaliar TFG',
      C: 'Nefrite intersticial alérgica como primeira hipótese',
      D: 'Obstrução infravesical como diagnóstico principal',
      E: 'Suspender toda reposição volêmica pelo risco de congestão, independentemente da volemia',
    },
    correct: 'B',
    explanation:
      'FENa <1% e urina concentrada + contexto séptico sugerem pré-renal. Terapia é restaurar perfusão + tratar a causa; diálise segue AEIOU. A rotula NTA cedo demais. C não se sustenta sem eosinofilia/exantema/exposição. D exige hidronefrose ausente. E ignora a hipovolemia. Pearl: contexto hemodinâmico manda mais que um número isolado; POCUS/VExUS integram a decisão.',
    bibliography: 'KDIGO AKI 2012; Surviving Sepsis 2021.',
  },
  {
    id: 'NA-T002',
    tema: 'LRA',
    subtema: 'NTA isquêmica x nefrotóxica',
    dificuldade: 'intermediario',
    age: 62,
    vars: { cr: 3.2, fena: 3.0 },
    statement:
      '{{sexWord}} de {{age}} internado por infarto complicado com choque cardiogênico, recebeu contraste iodado e aminoglicosídeo. Creatinina {{cr}}, FENa {{fena}}%, sedimento com cilindros granulosos pigmentados, U/P creatinina baixa. Sem obstrução. Qual o diagnóstico e conduta?',
    options: {
      A: 'LRA pré-renal — apenas mais volume',
      B: 'Necrose tubular aguda (isquêmica somada a nefrotóxica): suspender aminoglicosídeo, otimizar hemodinâmica evitando congestão, evitar novo contraste, dose ajustada de fármacos, monitorizar AEIOU e considerar TSR se indicado',
      C: 'Estenose de artéria renal bilateral aguda',
      D: 'Nefrite lúpica classe IV',
      E: 'Rabdomiólise',
    },
    correct: 'B',
    explanation:
      'FENa >2%, cilindros granulosos e contexto de isquemia+nefrotóxico caracterizam NTA. Recuperação leva dias-semanas. C é raríssimo bilateral agudo. D exige clínica reumática. E teria CK elevada. Pearl: "granuloso pigmentado" no sedimento é sinal clássico de NTA.',
    bibliography: 'KDIGO AKI 2012; NEJM AKI reviews.',
  },
  {
    id: 'NA-T003',
    tema: 'LRA',
    subtema: 'Nefropatia por contraste — prevenção',
    dificuldade: 'basico',
    age: 77,
    vars: { tfg: 28 },
    statement:
      '{{sexWord}} de {{age}} com DRC (TFG {{tfg}}) precisa realizar angioTC para investigar embolia. Qual a melhor estratégia preventiva de LRA associada a contraste?',
    options: {
      A: 'Nenhuma medida específica',
      B: 'Hidratação com SF 0,9% (ou bicarbonato isotônico em casos selecionados) periprocedimento, menor volume possível de contraste iso/hipo-osmolar, suspender AINE e outros nefrotóxicos, revisar necessidade de metformina no dia',
      C: 'AINE + diurético em altas doses',
      D: 'N-acetilcisteína isolada em altas doses como única medida',
      E: 'Contraindicar todo exame com contraste em TFG <60',
    },
    correct: 'B',
    explanation:
      'Volume é a evidência mais robusta; NAC não substitui hidratação (PRESERVE trial). Menor volume + iso-osmolar reduz risco. Metformina não causa LRA, mas exige suspensão em risco de LRA para evitar acidose. Pearl: hidratação > "milagres".',
    bibliography: 'PRESERVE trial (NEJM 2018); ACR contrast manual; KDIGO.',
  },
  {
    id: 'NA-T004',
    tema: 'LRA',
    subtema: 'Nefrite intersticial aguda',
    dificuldade: 'intermediario',
    age: 55,
    vars: { cr: 2.6 },
    statement:
      '{{sexWord}} de {{age}} em uso de omeprazol e amoxicilina/clavulanato há 3 semanas apresenta creatinina {{cr}}, exantema, febre baixa e eosinofilia periférica. Sedimento urinário com leucócitos e cilindros leucocitários; US sem obstrução. Qual conduta é a melhor?',
    options: {
      A: 'Manter medicamentos e observar',
      B: 'Suspender fármacos suspeitos (IBP, antibiótico), considerar corticoide (prednisona 0,5–1 mg/kg/dia com desmame por 4–8 semanas) se creatinina persistentemente elevada; biópsia renal quando dúvida diagnóstica ou falha em melhorar',
      C: 'Diálise imediata pela creatinina isolada',
      D: 'Trombose de artéria renal',
      E: 'AINE em altas doses',
    },
    correct: 'B',
    explanation:
      'NIA medicamentosa: IBP, ATB, AINE, PPI, checkpoint inhibitors são gatilhos. Corticoide precoce (2–3 semanas de sintomas) preserva TFG. Pearl: eosinofilúria não é específica.',
    bibliography: 'Praga M, Perazella MA — AIN reviews; KDIGO AKI.',
  },
  {
    id: 'NA-T005',
    tema: 'LRA',
    subtema: 'Indicação de TSR (AEIOU)',
    dificuldade: 'basico',
    age: 55,
    vars: { k: 7.2 },
    statement:
      '{{sexWord}} de {{age}} com LRA anúrica, K {{k}} mEq/L refratário a medidas conservadoras, acidose (pH 7,05, HCO₃ 10) e edema agudo de pulmão em ventilação mecânica. Qual conduta?',
    options: {
      A: 'Alta com resina oral',
      B: 'Iniciar terapia de substituição renal (HD intermitente, SLED ou CRRT conforme estabilidade); indicações AEIOU: Acidose, Eletrólitos, Intoxicação, Overload, Uremia sintomática',
      C: 'Dieta rica em potássio',
      D: 'Corticoide como tratamento da hiperK',
      E: 'Observação sem monitorização',
    },
    correct: 'B',
    explanation:
      'AEIOU é o mnemônico das indicações. Estudos STARRT-AKI e AKIKI mostram que início precoce demais (sem AEIOU) não melhora desfechos. Pearl: hiperK refratária + congestão = dialisar.',
    bibliography: 'KDIGO AKI; STARRT-AKI trial.',
  },
  {
    id: 'NA-T006',
    tema: 'LRA',
    subtema: 'CRRT — dose e ajustes',
    dificuldade: 'intermediario',
    age: 49,
    vars: { k: 6.6 },
    statement:
      '{{sexWord}} de {{age}} em choque séptico sob noradrenalina alta, anúrico, K {{k}}, acidose. Qual a melhor modalidade e prescrição inicial?',
    options: {
      A: 'HD intermitente agressiva em paciente instável',
      B: 'CRRT (CVVHDF) com dose de efluente 20–25 mL/kg/h (prescrever 25–30 para atingir o alvo, contando pausas), controle de anticoagulação (regional com citrato de preferência), ajuste de fármacos e monitorização eletrolítica',
      C: 'Nenhuma terapia renal apesar do AEIOU',
      D: 'Bicarbonato oral apenas',
      E: 'Diurético osmótico',
    },
    correct: 'B',
    explanation:
      'ATN/RENAL/IVOIRE mostraram que ≥25 mL/kg/h efetivo é adequado; prescrever maior devido a pausas. Citrato regional é preferido por diretriz KDIGO. Ajustar antibióticos (nem sub, nem toxicidade). Pearl: clearance de antibióticos na CRRT é crítico.',
    bibliography: 'KDIGO AKI; ATN, RENAL, IVOIRE trials.',
  },
  {
    id: 'NA-T007',
    tema: 'LRA',
    subtema: 'Rabdomiólise',
    dificuldade: 'basico',
    age: 35,
    vars: { ck: 85000, cr: 3.0, k: 6.0 },
    statement:
      '{{sexWord}} de {{age}} após esmagamento em acidente, CK {{ck}} U/L, mioglobinúria, K {{k}}, creatinina {{cr}}. Qual a conduta inicial prioritária?',
    options: {
      A: 'Restringir volume',
      B: 'Hidratação isotônica precoce e generosa para diurese ≥200–300 mL/h, monitorar e tratar hipercalemia e hipocalcemia (cuidado com Ca — pode reprecipitar), alcalinização em selecionados (evidência controversa), evitar AINE, indicar TSR se AEIOU',
      C: 'AINE em altas doses',
      D: 'Ignorar CK',
      E: 'Restrição de sódio',
    },
    correct: 'B',
    explanation:
      'Fluido é a intervenção salvadora — precoce, isotônico, generoso, guiado por diurese. Alcalinização e manitol são discutíveis. Cuidado: hipoCa aguda, hiperCa tardia. Pearl: CK altíssima + urina em "chá" = hidratar já.',
    bibliography: 'Bosch X et al., NEJM Rhabdomyolysis.',
  },
  {
    id: 'NA-T008',
    tema: 'LRA',
    subtema: 'Síndrome hepatorrenal (AKI-HRS)',
    dificuldade: 'avancado',
    age: 58,
    vars: { cr: 2.8 },
    statement:
      '{{sexWord}} de {{age}} com cirrose Child C e ascite, creatinina sobe para {{cr}} mg/dL, urinálise sem cilindros, US sem obstrução; sem nefrotóxicos, sem choque; sem melhora após 48 h de albumina 1 g/kg/dia e retirada de diuréticos. Qual conduta?',
    options: {
      A: 'Diurético em dose máxima',
      B: 'Diagnóstico de HRS-AKI (novos critérios ICA): terlipressina + albumina (padrão-ouro) ou noradrenalina em UTI se terlipressina indisponível/contraindicada; listar para transplante hepático',
      C: 'AINE liberado',
      D: 'Paracentese de grande volume sem albumina',
      E: 'Negar suporte renal',
    },
    correct: 'B',
    explanation:
      'HRS-AKI: LRA na cirrose sem outra causa após teste de albumina + retirada de diuréticos. CONFIRM/REVERSE trials mostraram benefício de terlipressina + albumina. Diálise apenas como ponte para transplante. Pearl: creatinina na cirrose subestima; use estimativa de TFG com cautela.',
    bibliography: 'International Club of Ascites HRS 2015/2019; CONFIRM trial; EASL/AASLD.',
  },
  {
    id: 'NA-T009',
    tema: 'LRA',
    subtema: 'Síndrome cardiorrenal 1',
    dificuldade: 'intermediario',
    age: 74,
    vars: { fe: 30, cr: 2.1 },
    statement:
      '{{sexWord}} de {{age}} com IC de FE reduzida (FE {{fe}}%), congestão pulmonar e edema periférico, creatinina {{cr}} após aumento de diurético de alça. Qual estratégia?',
    options: {
      A: 'Suspender todo diurético',
      B: 'Manter descongestão adequada: aumentar dose ou associar diuréticos (bloqueio sequencial com tiazídico ou acetazolamida — ADVOR mostrou benefício), ultrafiltração isolada em selecionados, evitar nefrotóxicos, otimizar terapia da IC (β-bloqueador, IECA/BRA, SGLT2i, ARNI, MRA) — leve alta de creatinina durante descongestão pode ser aceitável',
      C: 'IECA em choque cardiogênico refratário sem estabilizar',
      D: 'Ignorar POCUS/VExUS sempre',
      E: 'Transplante renal de urgência sem avaliar coração',
    },
    correct: 'B',
    explanation:
      'Cardiorrenal tipo 1: descongestionar é essencial; queda modesta de TFG durante descongestão adequada não deve fazer parar diurético. ADVOR mostrou benefício da acetazolamida. SGLT2i reduzem hospitalização e melhoram TFG a longo prazo. Pearl: congestão residual = piora renal.',
    bibliography: 'ADVOR trial (NEJM 2022); Cardiorenal syndrome reviews; ESC HF.',
  },
  {
    id: 'NA-T010',
    tema: 'LRA',
    subtema: 'AINE + IECA + diurético (tríade)',
    dificuldade: 'intermediario',
    age: 70,
    vars: { cr: 1.9 },
    statement:
      '{{sexWord}} de {{age}} com HAS e osteoartrose usa losartana, hidroclorotiazida e ibuprofeno diário. Após episódio de gastroenterite, creatinina sobe para {{cr}} (basal 1,0). Qual a interpretação e conduta?',
    options: {
      A: 'LRA por causa infecciosa apenas',
      B: 'LRA pré-renal/hemodinâmica pela "tríade" AINE + IECA/BRA + diurético em contexto de hipovolemia: suspender AINE, avaliar suspensão temporária de IECA/diurético, reidratar; reintroduzir IECA/BRA quando estável (é nefroprotetor a longo prazo)',
      C: 'Necrose cortical bilateral',
      D: 'Glomerulopatia crônica descompensada',
      E: 'Nenhuma medida necessária',
    },
    correct: 'B',
    explanation:
      'AINE reduz PG dilatadoras da aferente; IECA dilata a eferente; diurético reduz pré-carga → colapso de TFG na hipovolemia. Pearl: educar todo idoso sobre AINE.',
    bibliography: 'KDIGO AKI drug-induced.',
  },

  // ============ DRC / NEFROPROTEÇÃO ============
  {
    id: 'NA-T011',
    tema: 'DRC',
    subtema: 'Nefroproteção diabética',
    dificuldade: 'intermediario',
    age: 62,
    vars: { tfg: 42, uacr: 480 },
    statement:
      '{{sexWord}} de {{age}} com DM2, DRC (TFG {{tfg}} mL/min/1,73 m²), UACR {{uacr}} mg/g, PA 138/82 em uso de IECA dose máxima tolerada; K 4,6; HbA1c 8,0%. Qual adição terapêutica traz maior impacto renal/CV?',
    options: {
      A: 'Suspender IECA porque TFG <45',
      B: 'Adicionar iSGLT2 (dapagliflozina/empagliflozina) — benefício robusto de DAPA-CKD, EMPA-KIDNEY e CREDENCE; considerar finerenona (bloqueador não esteroidal do MR) para redução adicional de albuminúria e desfechos CV/renais',
      C: 'AINE diário para "proteger o rim"',
      D: 'Restringir água a 500 mL/dia em todo diabético',
      E: 'Trocar IECA por AAS',
    },
    correct: 'B',
    explanation:
      'iSGLT2 reduz progressão de DRC e desfechos CV mesmo sem DM (DAPA-CKD, EMPA-KIDNEY). Finerenona (FIDELIO/FIGARO) reduz albuminúria e MACE em DRC diabética albuminúrica. Manter IECA se K/creatinina toleráveis. Pearl: TFG cai um pouco no início do iSGLT2 e depois estabiliza — não é toxicidade.',
    bibliography: 'KDIGO Diabetes in CKD 2022; DAPA-CKD, EMPA-KIDNEY, FIDELIO-DKD, CREDENCE.',
  },
  {
    id: 'NA-T012',
    tema: 'DRC',
    subtema: 'Nefroproteção não diabética',
    dificuldade: 'intermediario',
    age: 58,
    vars: { tfg: 40, upcr: 1.2 },
    statement:
      '{{sexWord}} de {{age}} com DRC não-diabética (TFG {{tfg}}, UPCR {{upcr}}), PA 132/80 em IECA dose plena. Qual a conduta baseada em evidência atual?',
    options: {
      A: 'Suspender IECA',
      B: 'Adicionar iSGLT2 mesmo sem diabetes (DAPA-CKD e EMPA-KIDNEY mostraram benefício em DRC albuminúrica não-diabética), otimizar PA (alvo SBP <120 mmHg em muitos guidelines, guiado por medida padronizada), manter IECA',
      C: 'AINE',
      D: 'Restrição hídrica severa',
      E: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'iSGLT2 é hoje pilar de nefroproteção mesmo sem DM. Pearl: DRC albuminúrica = SGLT2i, seja diabética ou não.',
    bibliography: 'KDIGO CKD 2024 update; EMPA-KIDNEY.',
  },
  {
    id: 'NA-T013',
    tema: 'DRC',
    subtema: 'Preparo para TRS',
    dificuldade: 'intermediario',
    age: 60,
    vars: { tfg: 15 },
    statement:
      '{{sexWord}} de {{age}} com DRC estágio 5 (TFG {{tfg}} mL/min/1,73 m²), PA e volemia adequadas, sem asterixe, pericardite, anorexia significativa ou distúrbios eletrolíticos refratários. Está em acompanhamento nefrológico regular. Qual a conduta mais apropriada neste momento?',
    options: {
      A: 'Iniciar diálise imediatamente pela TFG isolada',
      B: 'Preparo antecipado: educação multidisciplinar sobre modalidades (HD/DP/Tx), planejamento de acesso (fístula com antecedência ≥3–6 meses), avaliação para Tx preemptivo, controle de PA/anemia/CKD-MBD/nutrição/vacinação; iniciar TSR guiado por sintomas + AEIOU, não somente por TFG',
      C: 'Suspender consultas nefrológicas',
      D: 'Corticoide para "preservar néfrons"',
      E: 'AINE crônico',
    },
    correct: 'B',
    explanation:
      'IDEAL trial (NEJM 2010): iniciar diálise por sintomas, não por número. FAV precisa maturar. Tx preemptivo tem melhor sobrevida. Pearl: DRC 5 estável e assintomática = otimizar, não dialisar automaticamente.',
    bibliography: 'IDEAL trial; KDIGO CKD; KDOQI vascular access.',
  },
  {
    id: 'NA-T014',
    tema: 'DRC',
    subtema: 'Estimativa de TFG',
    dificuldade: 'basico',
    age: 65,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} negro, obeso, com massa muscular reduzida, deseja estimar TFG. Qual conduta é mais adequada em 2024–2026?',
    options: {
      A: 'Usar Cockcroft-Gault sem ajustes',
      B: 'Usar equação CKD-EPI 2021 (sem coeficiente racial) baseada em creatinina; em casos com massa muscular reduzida ou discrepância clínica, dosar cistatina C e usar a equação CKD-EPI creatinina+cistatina, que aumenta acurácia',
      C: 'Depuração de creatinina 24 h em todos',
      D: 'Ureia',
      E: 'Ácido úrico',
    },
    correct: 'B',
    explanation:
      'CKD-EPI 2021 removeu variável racial e é padrão. Cistatina C melhora acurácia em extremos de massa muscular, edema e obesidade. Pearl: creatinina isoladamente engana em sarcopênicos.',
    bibliography: 'CKD-EPI 2021 (Inker LA et al., NEJM); NKF-ASN task force.',
  },
  {
    id: 'NA-T015',
    tema: 'DRC',
    subtema: 'Acidose metabólica crônica',
    dificuldade: 'intermediario',
    age: 60,
    vars: { hco3: 18 },
    statement:
      '{{sexWord}} de {{age}} com DRC estágio 4, HCO₃ {{hco3}} mEq/L persistente em duas dosagens, ânion gap normal, sem hipernatremia. Sem sintomas de sobrecarga volêmica. Qual conduta em relação à acidose metabólica crônica?',
    options: {
      A: 'Ignorar acidose',
      B: 'Corrigir com bicarbonato de sódio oral (0,5–1 mEq/kg/dia titulado) para HCO₃ alvo ≥22 mEq/L, com o objetivo de retardar progressão da DRC, preservar massa muscular e melhorar CKD-MBD',
      C: 'Cloreto de amônio',
      D: 'AINE',
      E: 'Ácido acético diário',
    },
    correct: 'B',
    explanation:
      'de Brito-Ashurst RCT e outros mostraram que correção da acidose crônica atrasa a progressão da DRC. Alvo ≥22. Pearl: acidose crônica come músculo e néfron.',
    bibliography: 'KDIGO CKD; de Brito-Ashurst et al., JASN.',
  },

  // ============ GLOMERULOPATIAS ============
  {
    id: 'NA-T016',
    tema: 'Membranosa',
    subtema: 'Anti-PLA2R+',
    dificuldade: 'intermediario',
    age: 54,
    vars: { alb: 2.1, prot: 7.5 },
    statement:
      '{{sexWord}} de {{age}} com edema, albumina {{alb}} g/dL, proteinúria {{prot}} g/24 h, FAN/ANCA negativos, anti-PLA2R sérico positivo em títulos altos, rastreio de neoplasia negativo, TFG preservada. Qual conduta?',
    options: {
      A: 'Ignorar PLA2R e tratar como ITU',
      B: 'Nefropatia membranosa primária (PLA2R+): nefroproteção máxima (IECA/BRA, restrição salina, anticoagulação profilática se albumina <2,5 g/dL e risco alto), estratificar (KDIGO baixo/médio/alto risco) e iniciar imunossupressão em risco intermediário/alto (rituximabe é a primeira linha preferida hoje) — biópsia se atipia ou ausência de PLA2R',
      C: 'Nefrectomia diagnóstica',
      D: 'Antibiótico prolongado',
      E: 'Diálise imediata pela proteinúria isolada',
    },
    correct: 'B',
    explanation:
      'Membranosa primária: KDIGO 2021 permite dispensar biópsia em PLA2R+ típico. Rituximabe (MENTOR trial) é hoje preferido sobre ciclofosfamida+corticoide em muitos cenários. Título de PLA2R prediz e monitora. Pearl: PLA2R é diagnóstico + prognóstico + resposta terapêutica.',
    bibliography: 'KDIGO Glomerular Diseases 2021; MENTOR (NEJM 2019).',
  },
  {
    id: 'NA-T017',
    tema: 'Nefrite lúpica',
    subtema: 'Classe IV',
    dificuldade: 'avancado',
    age: 28,
    vars: { upcr: 4.0, cr: 1.6 },
    statement:
      'Mulher de {{age}} com LES ativo, UPCR {{upcr}} g/g, hematúria dismórfica, hipocomplementemia, anti-dsDNA alto, creatinina {{cr}}. Biópsia: classe IV. Qual esquema de indução recomendado hoje?',
    options: {
      A: 'Somente hidroxicloroquina',
      B: 'Indução com corticoide (pulso metilprednisolona 250–1000 mg × 3 dias seguidos de prednisona baixa dose, priorizando redução mais rápida) + MMF 2–3 g/dia OU ciclofosfamida IV (regime NIH clássico ou Euro-lupus baixa dose); considerar acréscimo de belimumabe (BLISS-LN) ou voclosporina (AURORA) para maior remissão renal; HCQ para todos',
      C: 'Nefrectomia',
      D: 'Colchicina isolada',
      E: 'Observação sem imunossupressão',
    },
    correct: 'B',
    explanation:
      'KDIGO Lupus 2024 e ACR/EULAR incorporaram belimumabe e voclosporina como terapias combinadas para maior taxa de resposta renal. Redução mais rápida do corticoide para menor toxicidade. HCQ para TODOS. Pearl: classe IV nunca é "só observar".',
    bibliography: 'KDIGO Lupus Nephritis 2024; ACR/EULAR 2019; BLISS-LN; AURORA.',
  },
  {
    id: 'NA-T018',
    tema: 'Nefrite lúpica',
    subtema: 'Classe V pura',
    dificuldade: 'intermediario',
    age: 31,
    vars: { alb: 2.0, prot: 6.5 },
    statement:
      'Mulher de {{age}} com LES e SN (albumina {{alb}}, proteinúria {{prot}}); creatinina normal; biópsia mostra classe V pura (nefrite membranosa lúpica). Qual conduta?',
    options: {
      A: 'Ignorar proteinúria',
      B: 'HCQ + nefroproteção (IECA/BRA), estatina se dislipidemia, considerar anticoagulação se albumina muito baixa; imunossupressão (MMF ± ICN ou rituximabe) se SN persistente apesar de otimização',
      C: 'Diálise imediata',
      D: 'ATB prolongado',
      E: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'Classe V pura pode ter curso indolente; nefroproteção + HCQ é base. Imunossupressão se SN persistir. Classe V frequentemente coexiste com III/IV — leia laudo completo. Pearl: sempre olhe se há componente proliferativo associado.',
    bibliography: 'KDIGO LN; ACR/EULAR.',
  },
  {
    id: 'NA-T019',
    tema: 'Vasculite ANCA',
    subtema: 'Indução em renal grave',
    dificuldade: 'avancado',
    age: 67,
    vars: { cr: 4.2 },
    statement:
      '{{sexWord}} de {{age}} com hemoptise, IRA (creatinina {{cr}}), sedimento com hematúria dismórfica e cilindros hemáticos, ANCA-MPO positivo. Qual conduta?',
    options: {
      A: 'Adiar tratamento',
      B: 'Emergência renal-pulmonar (síndrome pulmão-rim): pulso de metilprednisolona seguido de prednisona (esquema com redução rápida — PEXIVAS reduced-dose); indução com rituximabe (RITUXVAS/RAVE) OU ciclofosfamida; plasmaférese em casos selecionados (hemorragia alveolar difusa grave, creatinina muito alta com necessidade de diálise) — PEXIVAS mostrou que rotineiramente não reduz mortalidade/DRC terminal; profilaxia de PJP',
      C: 'Antibiótico apenas',
      D: 'IECA isolado',
      E: 'Aumentar diurético',
    },
    correct: 'B',
    explanation:
      'ANCA + LRA rápida + pulmão exige tratar hoje. Rituximabe é preferido a ciclofosfamida em muitos cenários. PLEX seletiva. Corticoide reduzido reduz infecção sem perder eficácia. Pearl: ANCA + pulmão-rim = corrida contra o tempo.',
    bibliography: 'KDIGO Vasculitis 2024; PEXIVAS (NEJM 2020); RAVE; RITUXVAS.',
  },
  {
    id: 'NA-T020',
    tema: 'Anti-MBG',
    subtema: 'Goodpasture',
    dificuldade: 'avancado',
    age: 34,
    vars: { cr: 5.5 },
    statement:
      '{{sexWord}} de {{age}} com hemorragia alveolar, creatinina {{cr}} em 5 dias e anti-MBG positivo. Qual terapêutica clássica?',
    options: {
      A: 'Observação',
      B: 'Plasmaférese diária/em dias alternados até anti-MBG negativar + ciclofosfamida + corticoide (pulso seguido de manutenção); Tx renal apenas com anti-MBG indetectável há ≥6 meses',
      C: 'iSGLT2 isolado',
      D: 'Litotripsia',
      E: 'Amoxicilina',
    },
    correct: 'B',
    explanation:
      'Doença anti-MBG: PLEX remove anticorpos; imunossupressão bloqueia produção. Início precoce salva rim; creatinina >5,7 mg/dL ao diagnóstico com dependência de diálise tem chance baixa de recuperar rim, mas ainda vale por hemorragia. Pearl: PLEX + IS + corticoide = tripé.',
    bibliography: 'KDIGO Anti-GBM; Levy JB et al.',
  },
  {
    id: 'NA-T021',
    tema: 'Nefropatia por IgA',
    subtema: 'Estratificação e novas drogas',
    dificuldade: 'intermediario',
    age: 29,
    vars: { upcr: 1.2 },
    statement:
      '{{sexWord}} de {{age}} com biópsia confirmando nefropatia por IgA, UPCR {{upcr}} g/g apesar de IECA otimizado por 3 meses, TFG estável. Qual conduta?',
    options: {
      A: 'Ciclofosfamida em todo IgA',
      B: 'Estratificar risco (proteinúria persistente >0,75–1 g/dia, MEST-C na biópsia, TFG em declínio): otimizar RASi + SGLT2i + considerar terapias mais recentes — budesonida entérica (NEFIGARD/TARPEYON) para IgA de alto risco; sparsentan (bloqueador dual ET/A + AT1) em selecionados; corticoide sistêmico controverso (STOP-IgAN, TESTING); manter nefroproteção',
      C: 'Antibiótico contínuo por 2 anos',
      D: 'Suspender IECA sempre',
      E: 'Nefrectomia profilática',
    },
    correct: 'B',
    explanation:
      'IgA moderna: base = nefroproteção + iSGLT2 + budesonida entérica (target-release para placas de Peyer) + sparsentan. Corticoide sistêmico rotineiro caiu em desuso após TESTING/STOP-IgAN. Pearl: proteinúria persistente >0,75 g/dia = intensificar terapia.',
    bibliography: 'KDIGO IgA 2024 update; NEFIGARD; PROTECT (sparsentan).',
  },
  {
    id: 'NA-T022',
    tema: 'FSGS',
    subtema: 'Primária x secundária',
    dificuldade: 'intermediario',
    age: 32,
    vars: { prot: 6.0 },
    statement:
      '{{sexWord}} de {{age}} com SN completa (proteinúria {{prot}} g/dia), biópsia com FSGS variante "tip" ou clássica; ausência de obesidade extrema, HIV, refluxo, medicações e doenças genéticas rastreadas negativas. Qual abordagem?',
    options: {
      A: 'Somente dieta hiperproteica',
      B: 'FSGS primária: nefroproteção com IECA/BRA + iSGLT2 e imunossupressão com corticoide em dose plena (1 mg/kg/dia, máx 80 mg) por 4–16 semanas seguido de desmame; ICN em corticorresistência/dependência; rituximabe em selecionados; investigar genética se falha ou familiar',
      C: 'Antibiótico crônico',
      D: 'Nefrectomia imediata',
      E: 'Observação sem seguimento de proteinúria',
    },
    correct: 'B',
    explanation:
      'FSGS primária responde parcialmente a corticoide e ICN; secundária foca causa + nefroproteção sem imunossupressão. Pearl: descartar secundárias antes de imunossuprimir.',
    bibliography: 'KDIGO FSGS 2021.',
  },
  {
    id: 'NA-T023',
    tema: 'Lesão mínima',
    subtema: 'Adulto',
    dificuldade: 'basico',
    age: 42,
    vars: { alb: 1.6, prot: 8.0 },
    statement:
      '{{sexWord}} de {{age}} com SN aguda, albumina {{alb}}, proteinúria {{prot}} g/dia. Biópsia: doença de lesão mínima (podocitopatia com fusão de processos podocitários difusa). Qual esquema?',
    options: {
      A: 'Nefrectomia',
      B: 'Prednisona 1 mg/kg/dia (máx 80 mg) por 4–16 semanas com desmame lento; controle rápido de proteinúria é esperado em >80% dos casos; nefroproteção + anticoagulação profilática se albumina <2,5 g/dL com risco',
      C: 'Antibiótico',
      D: 'Observação',
      E: 'Colchicina',
    },
    correct: 'B',
    explanation:
      'Lesão mínima do adulto responde bem a corticoide mas com maior recidiva que em criança. Rituximabe/ICN em recidivas frequentes. Pearl: sempre pesquise fármacos (AINE) e neoplasias como causa secundária de LM em adultos.',
    bibliography: 'KDIGO Glomerular 2021.',
  },
  {
    id: 'NA-T024',
    tema: 'C3 glomerulopatia',
    subtema: 'Diagnóstico',
    dificuldade: 'avancado',
    age: 45,
    vars: { c3: 30, c4: 20 },
    statement:
      '{{sexWord}} de {{age}} com síndrome nefrótica/nefrítica persistente, C3 {{c3}} baixo por >6 meses, C4 {{c4}} normal; biópsia com depósitos exclusivos de C3 sem imunoglobulinas. Diagnóstico e conduta?',
    options: {
      A: 'GNPE',
      B: 'C3 glomerulopatia (GN por C3 ou doença de depósitos densos): investigar fator nefrítico C3, mutações no complemento, disproteinemia; nefroproteção; MMF em selecionados; ensaios com inibidores do complemento (iptacopan — APPEAR trial)',
      C: 'Membranosa PLA2R',
      D: 'Nefropatia por lítio',
      E: 'Nefropatia diabética',
    },
    correct: 'B',
    explanation:
      'C3 baixo persistente + IF só C3 = C3G. Rastrear gamopatia monoclonal em >50 anos. Pearl: C3 baixo por >12 semanas depois de "GNPE" não é GNPE.',
    bibliography: 'Smith RJH et al., C3G consensus; APPEAR trial.',
  },
  {
    id: 'NA-T025',
    tema: 'Glomerulopatia',
    subtema: 'Mieloma / cast nephropathy',
    dificuldade: 'avancado',
    age: 71,
    vars: { cr: 4.8, ca: 12.2 },
    statement:
      '{{sexWord}} de {{age}} com anemia, dor óssea, hipercalcemia (Ca {{ca}}) e LRA (creatinina {{cr}}); gap protéico aumentado, imunofixação com pico monoclonal IgG kappa. Qual conduta renal?',
    options: {
      A: 'Restrição hídrica',
      B: 'Nefropatia por cadeias leves (cast nephropathy): hidratação, corrigir hipercalcemia (SF + calcitonina + bisfosfonado ou denosumabe se DRC grave, cuidado), evitar nefrotóxicos e contraste, iniciar terapia do clone (bortezomibe + dexametasona) — HD com filtros de alto cut-off é opção em casos selecionados; considerar plasmaférese pouco efetiva isoladamente',
      C: 'Corticoide tópico',
      D: 'Nefrectomia',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'Mieloma: cast nephropathy é a nefropatia mais comum; MIDD e amiloidose AL também. Diagnóstico rápido + terapia do clone salvam néfrons. Pearl: LRA + hiperCa + gap protéico = pense mieloma.',
    bibliography: 'IMWG; Onco-nephrology reviews.',
  },
  {
    id: 'NA-T026',
    tema: 'Amiloidose renal',
    subtema: 'AL',
    dificuldade: 'avancado',
    age: 65,
    vars: { prot: 6.5 },
    statement:
      '{{sexWord}} de {{age}} com SN, macroglossia, síndrome do túnel do carpo bilateral, cardiomiopatia com padrão restritivo e proteinúria {{prot}}. Cadeia leve livre lambda elevada. Qual conduta?',
    options: {
      A: 'Ciclofosfamida sozinha',
      B: 'Amiloidose AL: confirmar com biópsia (gordura ou órgão-alvo) com Vermelho Congo e tipagem por imunofluorescência/espectrometria; encaminhar à hematologia para terapia do clone (CyBorD ± daratumumabe — ANDROMEDA trial); nefroproteção e cuidados de suporte',
      C: 'Nefrectomia',
      D: 'ATB',
      E: 'Somente diálise',
    },
    correct: 'B',
    explanation:
      'Amiloidose AL: tratar o clone com regime bortezomibe + daratumumabe + ciclofosfamida + dexametasona (VCd + Dara) — ANDROMEDA aumentou resposta hematológica e cardíaca. Pearl: cadeia leve livre + órgãos = biópsia com Congo.',
    bibliography: 'ANDROMEDA (NEJM 2021); Mayo AL staging.',
  },

  // ============ DP / HD / TRS ============
  {
    id: 'NA-T027',
    tema: 'Diálise peritoneal',
    subtema: 'Peritonite',
    dificuldade: 'basico',
    age: 52,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em CAPD há 3 anos chega com dor abdominal e efluente peritoneal turvo há 8 h. Conduta imediata?',
    options: {
      A: 'Esperar cultura por 5 dias sem ATB',
      B: 'Coletar efluente para contagem celular (leucócitos >100/µL com >50% PMN define peritonite), Gram e cultura em frasco de hemocultura; iniciar antibiótico intraperitoneal empírico cobrindo Gram+/Gram– (cefazolina + ceftazidima ou vancomicina + ceftazidima) por 14–21 dias; considerar remoção do cateter em falha, infecção fúngica, S. aureus grave ou refratária',
      C: 'Remover cateter em 100% já na primeira hora',
      D: 'Antiespasmódico apenas',
      E: 'Trocar cateter por AINE tópico',
    },
    correct: 'B',
    explanation:
      'ISPD guideline: diagnóstico + ATB IP precoce. Peritonite fúngica exige remoção. Manter efluente rico em nutrientes (perde proteína — reponha albumina/dieta). Pearl: ATB IP tem farmacocinética diferente do EV.',
    bibliography: 'ISPD peritonitis recommendations 2022.',
  },
  {
    id: 'NA-T028',
    tema: 'Diálise peritoneal',
    subtema: 'UF failure',
    dificuldade: 'intermediario',
    age: 60,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em DP há 5 anos apresenta congestão persistente, UF diminuindo em bolsas de longa permanência com icodextrina. Qual investigação?',
    options: {
      A: 'Aumentar apenas quelantes',
      B: 'Investigar falência da UF por PET (peritoneal equilibrium test) — pode mostrar padrão hiper-transportador (transporte rápido de soluto/edema); considerar peritonite prévia com peritônio esclerosante, hérnias/leaks, e reajustar prescrição (icodextrina, trocas mais curtas, adicionar HD); considerar peritonite encapsulante em quadros extremos',
      C: 'Corticoide',
      D: 'Suspender DP sem plano',
      E: 'Ignorar',
    },
    correct: 'B',
    explanation:
      'UF loss em DP: causa mais comum é hiper-transportador; icodextrina ajuda; PET direciona represcrição. Pearl: peritonite encapsulante é rara mas letal.',
    bibliography: 'ISPD adequacy 2020.',
  },
  {
    id: 'NA-T029',
    tema: 'Hemodiálise',
    subtema: 'FAV como acesso preferido',
    dificuldade: 'basico',
    age: 60,
    vars: {},
    statement:
      '{{sexWord}} pré-dialítico(a) com TFG em queda progressiva. Qual acesso vascular é preferível a longo prazo?',
    options: {
      A: 'Cateter tunelizado como destino',
      B: 'Fístula arteriovenosa nativa (radiocefálica se anatomia permitir; braquiocefálica ou braquiobasílica alternativas) planejada com maturação prévia; cateter tunelizado apenas como ponte',
      C: 'Punções arteriais seriadas',
      D: 'Cateter femoral permanente',
      E: 'Nunca discutir acesso antes de dialisar',
    },
    correct: 'B',
    explanation:
      'FAV tem menor infecção, trombose e mortalidade que cateter. Planejar cedo com mapeamento venoso. Pearl: "fistula-first" continua válido; life-plan personalizada moderna (ESKD Life-Plan).',
    bibliography: 'KDOQI Vascular Access 2019.',
  },
  {
    id: 'NA-T030',
    tema: 'Hemodiálise',
    subtema: 'Adequação (Kt/V)',
    dificuldade: 'intermediario',
    age: 66,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em HD 3×/semana com Kt/V spKt/V 1,1 e sintomas urêmicos residuais. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'Aumentar dose de diálise (Kt/V spKt/V alvo ≥1,4 por sessão em HD 3×/semana; ajustar tempo de sessão, fluxo de dialisado/sangue e superfície do dialisador); investigar recirculação de acesso, mau posicionamento de cateter, tempo real de tratamento; considerar HD mais frequente ou hemodiafiltração online (CONVINCE)',
      C: 'Suspender HD',
      D: 'AINE',
      E: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'Kt/V baixo → tempo, fluxo, superfície, acesso. HDF online reduz mortalidade em CONVINCE. Pearl: subdialisar mata.',
    bibliography: 'KDOQI HD adequacy; CONVINCE trial 2023.',
  },
  {
    id: 'NA-T031',
    tema: 'Hemodiálise',
    subtema: 'Bacteremia por cateter',
    dificuldade: 'intermediario',
    age: 63,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em HD com cateter tunelizado apresenta febre e calafrios em sessão; hemoculturas positivas para S. aureus. Qual conduta?',
    options: {
      A: 'Manter cateter e ATB oral apenas',
      B: 'Iniciar vancomicina + gentamicina (ajustada) empírica, adequar conforme cultura; para S. aureus, geralmente REMOVER o cateter (biofilme + risco de endocardite/spondilodiscite), fazer ecocardiograma, considerar duração prolongada de ATB (4–6 semanas); reintrodução do acesso planejada',
      C: 'Só antipirético',
      D: 'Corticoide',
      E: 'AINE no cateter',
    },
    correct: 'B',
    explanation:
      'S. aureus em cateter: remoção geralmente indicada, tempo prolongado, ecocardio; Gram– pode tentar salvar com lock. Pearl: S. aureus + cateter tunelizado + febre = remover.',
    bibliography: 'IDSA catheter-related infections; KDOQI.',
  },
  {
    id: 'NA-T032',
    tema: 'Modalidade de TSR em UTI',
    subtema: 'CRRT x SLED x HD',
    dificuldade: 'intermediario',
    age: 61,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em UTI com LRA, instabilidade hemodinâmica moderada, hospital sem CRRT disponível. Qual estratégia?',
    options: {
      A: 'HD intermitente clássica agressiva independentemente de instabilidade',
      B: 'SLED/PIRRT (sessão prolongada 6–12 h, fluxos menores) — melhor tolerância hemodinâmica que HD curta e desfechos equivalentes à CRRT em vários estudos, útil quando CRRT indisponível',
      C: 'Nenhuma diálise',
      D: 'Diurético osmótico',
      E: 'Plasmaférese',
    },
    correct: 'B',
    explanation:
      'SLED/PIRRT é híbrido excelente em UTI. Pearl: quanto maior o tempo, menor o shift osmótico e hemodinâmico.',
    bibliography: 'PIRRT/SLED reviews.',
  },

  // ============ HAS E RENOVASCULAR ============
  {
    id: 'NA-T033',
    tema: 'HAS',
    subtema: 'Estenose de artéria renal',
    dificuldade: 'intermediario',
    age: 72,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com HAS resistente, edema agudo de pulmão "flash" recorrente e piora da TFG após início de IECA; US Doppler sugere estenose aterosclerótica bilateral. Qual conduta?',
    options: {
      A: 'Nenhuma medida',
      B: 'Otimização clínica agressiva (múltiplos anti-hipertensivos, estatina, AAS), reservar revascularização (angioplastia com stent) apenas para casos selecionados — EAP flash recorrente, HAS incontrolável apesar de terapia máxima, perda progressiva de função renal — pois CORAL e ASTRAL mostraram que revascularização rotineira não supera clínica',
      C: 'IECA em dose máxima',
      D: 'AINE',
      E: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'CORAL/ASTRAL desmistificaram angioplastia rotineira. Reservar para "flash EAP", HAS refratária, perda de função. Pearl: azotemia com IECA em bilateral = pensar estenose.',
    bibliography: 'CORAL (NEJM 2014); ASTRAL.',
  },
  {
    id: 'NA-T034',
    tema: 'HAS',
    subtema: 'Aldosteronismo primário',
    dificuldade: 'intermediario',
    age: 36,
    vars: { k: 2.9 },
    statement:
      '{{sexWord}} de {{age}} com HAS de início recente, K {{k}} espontaneamente baixo, alcalose leve, aldosterona plasmática elevada e renina plasmática suprimida (relação aldo/renina alta). Qual a hipótese e próximo passo?',
    options: {
      A: 'Feocromocitoma',
      B: 'Hiperaldosteronismo primário: confirmar com teste de supressão (sobrecarga salina, captopril ou fludrocortisona), depois localizar (TC de adrenais e/ou cateterismo de veias adrenais em >35 anos ou lesão duvidosa); adrenalectomia se lateralizado ou espironolactona/eplerenona se bilateral',
      C: 'Nefrite lúpica',
      D: 'Bartter',
      E: 'SIADH',
    },
    correct: 'B',
    explanation:
      'HAS + hipoK + relação aldo/renina alta = rastreio positivo; confirmar antes de imagem/tratamento. Cateterismo de adrenais é padrão-ouro para lateralizar. Pearl: rastreie PA hyperaldo em toda HAS resistente/precoce/hipoK.',
    bibliography: 'Endocrine Society PA guideline 2016.',
  },
  {
    id: 'NA-T035',
    tema: 'HAS',
    subtema: 'Resistente / MAPA',
    dificuldade: 'intermediario',
    age: 55,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com HAS em uso de 3 anti-hipertensivos (IECA, tiazídico e BCC) em doses adequadas, sem controle no consultório. Qual próximo passo?',
    options: {
      A: 'Adicionar 4º fármaco às cegas',
      B: 'Confirmar HAS resistente com MAPA (excluir "do jaleco" e não-adesão), avaliar causas secundárias (aldosteronismo, SAOS, doença renal, drogas — AINE, corticoide, simpaticomiméticos), reforçar aderência, reduzir sal e adicionar antagonista mineralocorticoide (espironolactona) — evidência PATHWAY-2 mostra ser o 4º fármaco mais eficaz',
      C: 'Suspender IECA sem substituto',
      D: 'AINE',
      E: 'Diurético osmótico',
    },
    correct: 'B',
    explanation:
      'PATHWAY-2 mostrou espironolactona 25–50 mg como 4º fármaco superior. MAPA reduz sobretratamento. Pearl: pseudo-resistência (não-adesão, técnica errada) é a mais comum.',
    bibliography: 'PATHWAY-2; ESC/ESH 2023; ACC/AHA 2017.',
  },
  {
    id: 'NA-T036',
    tema: 'HAS',
    subtema: 'Alvos em DRC',
    dificuldade: 'basico',
    age: 60,
    vars: { tfg: 45 },
    statement:
      '{{sexWord}} de {{age}} com DRC (TFG {{tfg}}), UACR 60 mg/g, sem diabetes. Qual alvo pressórico?',
    options: {
      A: 'PAS <160 mmHg',
      B: 'SBP <120 mmHg em medida padronizada quando tolerado (KDIGO 2021 baseada em SPRINT), com individualização em idosos frágeis e monitorização de hipotensão ortostática/eventos adversos',
      C: 'PAD >100 mmHg',
      D: 'Sem alvo',
      E: 'Apenas alvo com base em MAPA noturna',
    },
    correct: 'B',
    explanation:
      'KDIGO 2021 adotou alvo SBP <120 mmHg baseado em SPRINT (com medida padronizada, atenção — não é a mesma coisa que consultório normal). Individualizar. Pearl: a medida importa tanto quanto o número.',
    bibliography: 'KDIGO CKD BP 2021; SPRINT.',
  },
  {
    id: 'NA-T037',
    tema: 'HAS',
    subtema: 'Crise hipertensiva',
    dificuldade: 'intermediario',
    age: 62,
    vars: { sbp: 220, dbp: 130 },
    statement:
      '{{sexWord}} de {{age}} com PA {{sbp}}×{{dbp}}, cefaleia intensa, borramento visual, edema de papila e LRA aguda (creatinina 2,5, basal 1,0). Qual conduta?',
    options: {
      A: 'Redução rápida para PA normal em 30 minutos',
      B: 'Emergência hipertensiva (lesão de órgão-alvo): internar em UTI, reduzir PA em 20–25% na primeira hora, então gradualmente (fármacos parenterais — nitroprussiato, labetalol, nicardipina); investigar causas secundárias, monitorar TFG, retina, neurologia',
      C: 'Alta ambulatorial',
      D: 'Somente sublingual de nifedipina',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'Redução súbita causa isquemia (cérebro, rim, retina). Sublingual de nifedipina é obsoleto. Pearl: PA lentamente + monitor.',
    bibliography: 'ESC/ESH; ACC/AHA.',
  },

  // ============ DISTÚRBIOS ELETROLÍTICOS E ÁCIDO-BASE ============
  {
    id: 'NA-T038',
    tema: 'Distúrbios',
    subtema: 'Hipercalemia grave',
    dificuldade: 'basico',
    age: 70,
    vars: { k: 7.0 },
    statement:
      '{{sexWord}} de {{age}} com DRC avançada, K {{k}} mEq/L e ECG com ondas T apiculadas + alargamento QRS. Qual sequência?',
    options: {
      A: 'Apenas dieta',
      B: 'ANTAGONIZAR o efeito de membrana com gluconato de cálcio 10% 10–20 mL IV lento (repetir se necessário) → DESLOCAR K para intracelular (insulina + glicose, β2-agonista nebulizado, bicarbonato se acidose) → REMOVER K (resina como patiromer/ciclossilicato de zircônio + furosemida ou diálise se refratária)',
      C: 'Espironolactona imediata',
      D: 'Soro com KCl',
      E: 'Ignorar ECG',
    },
    correct: 'B',
    explanation:
      'Cálcio estabiliza membrana, não reduz K sérico. Patiromer/ZS-9 são novas resinas melhor toleradas. Pearl: cálcio protege coração, insulina abaixa K, diálise resolve refratária.',
    bibliography: 'Kidney Int hyperkalemia; UpToDate.',
  },
  {
    id: 'NA-T039',
    tema: 'Distúrbios',
    subtema: 'Acidose metabólica de alto gap',
    dificuldade: 'intermediario',
    age: 40,
    vars: { ph: 7.18, hco3: 10, gap: 28 },
    statement:
      '{{sexWord}} de {{age}} inconsciente, pH {{ph}}, HCO₃ {{hco3}}, ânion gap {{gap}}, osmolar gap elevado, hálito peculiar. Qual hipótese e conduta?',
    options: {
      A: 'ATR distal pura',
      B: 'Intoxicação por álcool tóxico (metanol/etilenoglicol): antídoto com fomepizol (ou etanol em falta), corrigir acidose com bicarbonato, considerar cofatores (folato para metanol, tiamina/piridoxina para etilenoglicol) e hemodiálise para remoção do álcool + metabólitos tóxicos + correção de acidose',
      C: 'Alcalose respiratória',
      D: 'Hiperaldosteronismo',
      E: 'Litíase de cistina',
    },
    correct: 'B',
    explanation:
      'Alto gap + osmolar gap elevado = álcool tóxico. Metanol → oftálmico (cegueira); etilenoglicol → renal (oxalato) + cardio. Fomepizol e HD são pilares. Pearl: sempre calcule ambos os gaps.',
    bibliography: 'AACT/EAPCCT recommendations; UpToDate.',
  },
  {
    id: 'NA-T040',
    tema: 'Distúrbios',
    subtema: 'Acidose gap normal',
    dificuldade: 'intermediario',
    age: 45,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com acidose metabólica hiperclorêmica gap normal. Diferencie ATR distal, proximal e IV.',
    options: {
      A: 'Todas são iguais',
      B: 'ATR distal (tipo 1): pH urinário >5,5 com acidemia, hipoK, nefrocalcinose. ATR proximal (tipo 2): perda de HCO₃ (bicarbonatúria), síndrome de Fanconi comum, pH urinário ácido ao chegar a limiar baixo. ATR tipo 4: hipercalemia + acidose leve por hipoaldosteronismo (DM, IECA, obstrução, HIV, doença tubulointersticial)',
      C: 'ATR distal tem hiperK',
      D: 'ATR tipo 4 tem hipoK',
      E: 'ATR proximal tem hiperCa',
    },
    correct: 'B',
    explanation:
      'Cada tipo tem sua "assinatura" bioquímica: distal (tipo 1) — pH urinário >5,5 na acidemia, hipoK, nefrocalcinose e litíase; proximal (tipo 2) — bicarbonatúria e síndrome de Fanconi (glicosúria, aminoacidúria, fosfatúria); tipo 4 (hipoaldosteronismo hiporreninêmico) — acidose leve com hipercalemia, ligada a DM, nefropatia obstrutiva, IECA/BRA, antagonistas mineralocorticoides. A é errado porque a distal cursa com hipoK. D é errado porque a tipo 4 tem hiperK. E não faz sentido bioquímico. Pearl: em adulto com DRC/DM, ATR tipo 4 é a mais frequente.',
    bibliography: 'Rose & Post.',
  },
  {
    id: 'NA-T041',
    tema: 'Distúrbios',
    subtema: 'Alcalose metabólica',
    dificuldade: 'intermediario',
    age: 62,
    vars: { hco3: 38, k: 3.0 },
    statement:
      '{{sexWord}} de {{age}} em uso de furosemida, HCO₃ {{hco3}}, K {{k}}, Cl 92. Qual mecanismo e conduta?',
    options: {
      A: 'Alcalose respiratória',
      B: 'Alcalose metabólica salino-responsiva (perda de volume + hipoK por diurético): repor NaCl + KCl, ajustar diurético; medir Cl urinário — Cl urinário baixo (<20) sugere responsiva a NaCl',
      C: 'Fanconi',
      D: 'CAD',
      E: 'Diarreia',
    },
    correct: 'B',
    explanation:
      'Diurético clássico gera alcalose por perda de Cl e contração; hipoK piora. Cl urinário diferencia salino-responsiva (baixa) de resistente (alta — hiperaldosteronismo, Bartter/Gitelman). Pearl: dose Cl urinário sempre.',
    bibliography: 'UpToDate; Rose & Post.',
  },
  {
    id: 'NA-T042',
    tema: 'Distúrbios',
    subtema: 'Hiponatremia — SIADH',
    dificuldade: 'intermediario',
    age: 66,
    vars: { na: 122 },
    statement:
      '{{sexWord}} de {{age}} com Ca de pulmão, euvolêmico(a), Na {{na}}, osmolaridade sérica baixa, osmolaridade urinária inapropriadamente alta, sódio urinário >30, TSH e cortisol normais. Diagnóstico e tratamento?',
    options: {
      A: 'Hipovolemia — infundir SF sem critério',
      B: 'SIADH paraneoplásico: tratar causa; restrição hídrica primária (500–1000 mL/dia); NaCl 3% se sintomas neurológicos graves (correção não superior a 8–10 mEq/L nas primeiras 24 h); tolvaptano (vaptanos) em selecionados; monitorar cuidadosamente para evitar desmielinização osmótica',
      C: 'Bartter',
      D: 'Diabetes insipidus',
      E: 'Hiperaldosteronismo',
    },
    correct: 'B',
    explanation:
      'SF pode piorar SIADH (paradoxo da osmolaridade urinária alta). Corrigir cuidadosamente. Pearl: correção >10 mEq/L/24 h = risco de mielinólise pontina.',
    bibliography: 'European hyponatremia guideline 2014.',
  },
  {
    id: 'NA-T043',
    tema: 'Distúrbios',
    subtema: 'Hipernatremia por DI',
    dificuldade: 'avancado',
    age: 55,
    vars: { na: 156 },
    statement:
      '{{sexWord}} de {{age}} em uso crônico de lítio apresenta poliúria, polidipsia, Na {{na}}, osmolaridade urinária baixa; após desmopressina, sem concentração urinária. Diagnóstico e conduta?',
    options: {
      A: 'DI central',
      B: 'DI nefrogênico induzido por lítio: reduzir/suspender lítio se possível em conjunto com psiquiatria, hidratação livre, dieta baixa em soluto, tiazídico + amilorida (reduz volume urinário paradoxalmente e antagoniza captação de lítio no tubo coletor); indometacina em selecionados',
      C: 'SIADH',
      D: 'Nefrite lúpica',
      E: 'Bartter',
    },
    correct: 'B',
    explanation:
      'Lítio é a causa mais comum de DI nefrogênico adquirido. Amilorida bloqueia o ENaC — reduz entrada de Li no tubo coletor. Pearl: DDAVP não funciona no nefrogênico.',
    bibliography: 'UpToDate; NDI reviews.',
  },
  {
    id: 'NA-T044',
    tema: 'Distúrbios',
    subtema: 'Hipercalcemia',
    dificuldade: 'intermediario',
    age: 68,
    vars: { ca: 14 },
    statement:
      '{{sexWord}} de {{age}} com Ca {{ca}} mg/dL, PTH suprimido, PTHrp alto, imagem pulmonar suspeita. Qual conduta?',
    options: {
      A: 'Restringir hidratação',
      B: 'Hipercalcemia da malignidade: hidratação vigorosa com SF 200–300 mL/h (ajuste conforme função cardíaca), bisfosfonado IV (zoledronato) ou denosumabe (preferido em DRC grave, cuidado com hipoCa rebound), calcitonina para efeito rápido, tratar neoplasia; diálise em refratárias ou DRC avançada',
      C: 'Vitamina D em altas doses',
      D: 'Furosemida sem hidratar',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'Ordem: hidratar → bisfosfonado/denosumabe → calcitonina → diálise se refratário. Pearl: em DRC avançada, denosumabe é preferido, mas atenção à hipoCa.',
    bibliography: 'Endocrine Society.',
  },
  {
    id: 'NA-T045',
    tema: 'Distúrbios',
    subtema: 'Hipomagnesemia por IBP/diurético',
    dificuldade: 'basico',
    age: 60,
    vars: { mg: 1.0, k: 3.0 },
    statement:
      '{{sexWord}} de {{age}} em uso crônico de omeprazol e furosemida apresenta hipoK {{k}} refratária a reposição, Mg {{mg}}. Qual conduta?',
    options: {
      A: 'Aumentar KCl',
      B: 'Corrigir Mg primeiro (via oral se leve, IV em sintomático — reposição lenta), rever necessidade do IBP; sem Mg adequado, hipoK persiste (Mg controla ROMK)',
      C: 'Suspender K',
      D: 'AINE',
      E: 'Diálise',
    },
    correct: 'B',
    explanation:
      'IBP crônico (por bloqueio do transporte intestinal de magnésio) somado a diurético de alça (que aumenta perdas urinárias de Mg) resulta em hipomagnesemia clinicamente relevante. Sem magnésio suficiente, o canal ROMK do néfron distal permanece aberto e a excreção de potássio se perpetua — daí a hipocalemia refratária à reposição de KCl. A conduta é repor magnésio (via oral em quadros leves ou IV lento em sintomáticos), revisar necessidade do IBP e outros fármacos, e reintroduzir K depois. Pearl: hipoK refratária sempre exige dosagem de Mg.',
    bibliography: 'Rose & Post.',
  },

  // ============ LITÍASE ============
  {
    id: 'NA-T046',
    tema: 'Litíase',
    subtema: 'Metabólica — oxalato de cálcio',
    dificuldade: 'intermediario',
    age: 38,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com cálculos recorrentes de oxalato de cálcio; investigação urinária de 24 h: hipocitratúria e volume urinário 1,2 L/dia, sem hipercalciúria, PTH normal. Qual conduta?',
    options: {
      A: 'Restringir cálcio',
      B: 'Aumentar volume urinário para ≥2,5–3 L/dia (aumentar ingesta hídrica), citrato de potássio para corrigir hipocitratúria, manter cálcio dietético normal (restringir aumenta absorção de oxalato), reduzir sódio (<2,3 g/dia) e proteína animal',
      C: 'AINE crônico',
      D: 'Dieta hiperproteica',
      E: 'Nenhuma medida',
    },
    correct: 'B',
    explanation:
      'Hidratação + citrato + moderar sal e proteína. Restrição de cálcio ↑ oxalato (paradoxo). Pearl: cortar sal, não cálcio.',
    bibliography: 'AUA/EAU urolithiasis.',
  },
  {
    id: 'NA-T047',
    tema: 'Litíase',
    subtema: 'Ácido úrico',
    dificuldade: 'basico',
    age: 55,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} obeso com síndrome metabólica, cálculo de ácido úrico rádio-transparente; pH urinário 5,2. Qual conduta?',
    options: {
      A: 'AINE',
      B: 'Alcalinização urinária com citrato de potássio (alvo pH urinário 6,5–7,0) para dissolver e prevenir; hidratação; considerar alopurinol se hiperuricemia/hiperuricosúria; controlar peso/DM/dislipidemia',
      C: 'Suspender água',
      D: 'AINE crônico',
      E: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'Ácido úrico se cristaliza em pH baixo. Alcalinizar dissolve. Pearl: cálculo radiotransparente com pH ácido = ácido úrico.',
    bibliography: 'AUA/EAU.',
  },
  {
    id: 'NA-T048',
    tema: 'Litíase',
    subtema: 'Cálculo obstrutivo infectado',
    dificuldade: 'intermediario',
    age: 57,
    vars: {},
    statement:
      'Homem com febre, dor no flanco, urocultura positiva, TC com cálculo ureteral obstrutivo com hidronefrose. Qual conduta?',
    options: {
      A: 'ATB oral ambulatorial sem drenagem',
      B: 'Emergência urológica: ATB EV empírico de amplo espectro + desobstrução urgente (cateter duplo J ou nefrostomia percutânea), controle da sepse antes de qualquer litotripsia',
      C: 'AINE só',
      D: 'Corticoide',
      E: 'Recusar internação',
    },
    correct: 'B',
    explanation:
      'Pielonefrite obstrutiva = urgência: fonte fechada → drenar. Cirurgia definitiva depois. Pearl: infecção + obstrução = drenar já.',
    bibliography: 'IDSA urosepsis; AUA.',
  },

  // ============ ADPKD / CÍSTICAS ============
  {
    id: 'NA-T049',
    tema: 'ADPKD',
    subtema: 'Tolvaptano',
    dificuldade: 'intermediario',
    age: 42,
    vars: { tfg: 55 },
    statement:
      '{{sexWord}} de {{age}} com ADPKD, TFG {{tfg}}, rins muito aumentados (volume renal total mais elevado que Mayo classe 1D), progressão rápida documentada. Qual terapia específica?',
    options: {
      A: 'Somente observação de cistos',
      B: 'Tolvaptano (antagonista V2) em pacientes ADPKD elegíveis (TFG >25 e classificação de risco alta) — reduz taxa de queda de TFG (TEMPO 3:4, REPRISE); monitorar hepatotoxicidade e manejar sede/poliúria; associar controle rigoroso de PA (<110/75 em jovens), hidratação, dieta baixa em sódio e cafeína moderada',
      C: 'Nefrectomia bilateral',
      D: 'Somatostatina obrigatória em todos',
      E: 'Suspender controle de PA',
    },
    correct: 'B',
    explanation:
      'TEMPO 3:4 e REPRISE demonstraram benefício. Hepatotoxicidade exige monitor. Pearl: HALT-PKD1 mostrou PA <110/75 melhor em jovens ADPKD com TFG preservada.',
    bibliography: 'KDIGO ADPKD 2024; TEMPO 3:4; REPRISE; HALT-PKD.',
  },

  // ============ TRANSPLANTE ============
  {
    id: 'NA-T050',
    tema: 'Transplante renal',
    subtema: 'Rejeição x infecção',
    dificuldade: 'avancado',
    age: 45,
    vars: { cr0: 1.2, cr1: 2.3 },
    statement:
      'Receptor de transplante renal há 6 meses, creatinina de {{cr0}} para {{cr1}}, febre baixa e leucopenia. Qual conduta?',
    options: {
      A: 'Suspender toda imunossupressão',
      B: 'Dosar níveis dos imunossupressores, PCR quantitativa para CMV e BK, urinálise, US Doppler do enxerto, biópsia do enxerto quando rejeição é diferencial — biópsia é padrão-ouro para diferenciar rejeição celular (Banff), humoral (DSA + histologia), toxicidade por ICN e nefropatia por BK',
      C: 'Nefrectomia automática',
      D: 'Aumentar tacrolimus cegamente',
      E: 'Ignorar',
    },
    correct: 'B',
    explanation:
      'Disfunção do enxerto tem diferencial amplo. Biópsia é fundamental. Pearl: BK pode mimetizar rejeição — só biópsia diferencia.',
    bibliography: 'KDIGO Transplant Recipients; AST/ISN.',
  },
  {
    id: 'NA-T051',
    tema: 'Transplante renal',
    subtema: 'Rejeição humoral (AMR)',
    dificuldade: 'avancado',
    age: 40,
    vars: {},
    statement:
      'Transplantada com creatinina em alta, DSA positivo, biópsia com Banff mostrando C4d+ e capilarite peritubular. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'Rejeição mediada por anticorpo (AMR): pulso de corticoide, plasmaférese + imunoglobulina EV, rituximabe (evidência variável), bortezomibe/eculizumabe em casos selecionados/refratários; otimizar imunossupressão de manutenção e monitorar DSA',
      C: 'Retirada de tudo',
      D: 'Ciclosporina em altas doses sem plasmaférese',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'AMR: PLEX + IVIG são pilares. Rituximabe, bortezomibe e eculizumabe (contra C5) em falha. Pearl: DSA de novo com C4d+ e MVI = AMR ativa.',
    bibliography: 'KDIGO Transplant; Banff classification.',
  },
  {
    id: 'NA-T052',
    tema: 'Transplante renal',
    subtema: 'BK vírus',
    dificuldade: 'avancado',
    age: 50,
    vars: {},
    statement:
      'Receptor de transplante renal há 4 meses com creatinina em elevação lenta (de 1,3 para 1,7 mg/dL), sem febre; BK viremia >10 000 cópias/mL em amostra confirmatória, urinálise com decoy cells positivas. Qual a conduta principal?',
    options: {
      A: 'Aumentar imunossupressão',
      B: 'Reduzir imunossupressão em passos (MPA primeiro, depois inibidor de calcineurina, mantendo mínimo seguro); monitorar viremia e função do enxerto; biópsia se dúvida; agentes antivirais têm evidência limitada (leflunomida, cidofovir em desuso)',
      C: 'Nefrectomia imediata',
      D: 'Aumentar tacrolimus',
      E: 'ATB',
    },
    correct: 'B',
    explanation:
      'A base do manejo da nefropatia por BK é reduzir a imunossupressão de forma escalonada (primeiro MPA, depois inibidor de calcineurina, mantendo alvo mínimo seguro para evitar rejeição), acompanhando viremia semanal/quinzenal e função do enxerto. Aumentar tacrolimus ou nefrectomia é conduta contrária à evidência. Antivirais específicos (leflunomida, cidofovir, brincidofovir) têm evidência fraca e toxicidade — não substituem a redução da IS. Biópsia é indicada quando a creatinina não melhora ou há dúvida com rejeição (SV40+ na imuno-histoquímica confirma BK). Pearl: BK imita rejeição — apenas a biópsia diferencia.',
    bibliography: 'AST BK; KDIGO Transplant.',
  },
  {
    id: 'NA-T053',
    tema: 'Transplante renal',
    subtema: 'Toxicidade por calcineurina',
    dificuldade: 'intermediario',
    age: 48,
    vars: {},
    statement:
      'Receptor com tremor, cefaleia, HAS, hiperK, hipomagnesemia e creatinina em alta; nível de tacrolimus 18 ng/mL (alvo 5–8). Conduta?',
    options: {
      A: 'Aumentar dose',
      B: 'Reduzir dose de tacrolimus, investigar interação medicamentosa (azólicos, macrolídeos, diltiazem, suco de toranja), reajustar em alvo e reavaliar função renal e clínica; biópsia se creatinina não recuperar',
      C: 'Nefrectomia',
      D: 'AINE',
      E: 'Suspender toda imunossupressão',
    },
    correct: 'B',
    explanation:
      'Toxicidade típica de tacrolimus é neurotoxicidade + HAS + hipoMg + IRA. Pearl: sempre revisar CYP3A4 (azólicos etc.).',
    bibliography: 'KDIGO Transplant.',
  },
  {
    id: 'NA-T054',
    tema: 'Transplante renal',
    subtema: 'CMV',
    dificuldade: 'avancado',
    age: 55,
    vars: {},
    statement:
      'Receptor D+/R– há 3 meses (fim da profilaxia) com febre, leucopenia, elevação de transaminases e creatinina; PCR CMV alto. Conduta?',
    options: {
      A: 'Ignorar',
      B: 'CMV doença: iniciar valganciclovir/ganciclovir EV em dose ajustada por função renal, reduzir imunossupressão selecionada (dose de MMF), monitorar PCR até negativação, considerar letermovir/maribavir em falência/resistência (UL97/UL54 mutações)',
      C: 'Aumentar imunossupressão',
      D: 'ATB de amplo espectro isolado',
      E: 'Corticoide isolado',
    },
    correct: 'B',
    explanation:
      'D+/R– é o cenário de maior risco. Profilaxia por 6 meses. Vigilância pós-profilaxia. Pearl: CMV pode desencadear rejeição — cuidado ao reduzir IS.',
    bibliography: 'AST CMV consensus; KDIGO Transplant.',
  },
  {
    id: 'NA-T055',
    tema: 'Transplante renal',
    subtema: 'Recorrência FSGS',
    dificuldade: 'avancado',
    age: 32,
    vars: {},
    statement:
      'Recém-transplantado por FSGS primária apresenta proteinúria maciça 48 h após transplante. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'Recorrência de FSGS: plasmaférese diária/em dias alternados + otimização de imunossupressão + rituximabe em selecionados; buscar remissão para preservar o enxerto',
      C: 'Explantar imediatamente',
      D: 'AINE',
      E: 'Corticoide isolado',
    },
    correct: 'B',
    explanation:
      'Recorrência ocorre horas–dias pós-Tx em FSGS primária. Plasmaférese remove "fator circulante" (suPAR entre outros). Pearl: proteinúria dia 1 pós-Tx em FSGS primária = tratar rápido.',
    bibliography: 'AST FSGS recurrence.',
  },
  {
    id: 'NA-T056',
    tema: 'Transplante renal',
    subtema: 'Complicações metabólicas (NODAT)',
    dificuldade: 'intermediario',
    age: 55,
    vars: {},
    statement:
      'Transplantado há 6 meses em uso de tacrolimus e prednisona apresenta hiperglicemia persistente (HbA1c 7,5%). Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'NODAT (diabetes pós-transplante): individualizar imunossupressão (reduzir/switch tacrolimus para ciclosporina, reduzir corticoide se possível), iniciar tratamento anti-hiperglicemiante (metformina se TFG permitir, iSGLT2 em selecionados com atenção à imunossupressão, insulina se descompensado); modificações de estilo de vida',
      C: 'Suspender tacrolimus abruptamente',
      D: 'AINE',
      E: 'Aumentar corticoide',
    },
    correct: 'B',
    explanation:
      'Tacrolimus e corticoides são diabetogênicos. Manejo é multidisciplinar. Pearl: NODAT aumenta mortalidade CV do enxerto.',
    bibliography: 'AST NODAT.',
  },
  {
    id: 'NA-T057',
    tema: 'Transplante renal',
    subtema: 'Gravidez',
    dificuldade: 'avancado',
    age: 30,
    vars: {},
    statement:
      'Transplantada renal deseja engravidar há 18 meses do Tx, creatinina 1,0, proteinúria mínima, PA controlada com nifedipina. Qual orientação?',
    options: {
      A: 'Contraindicar sempre',
      B: 'Aguardar ≥1–2 anos pós-Tx com função estável, ajustar imunossupressão (evitar MMF/MPA — teratogênicos; substituir por azatioprina) antes da concepção; tacrolimus e ciclosporina podem ser mantidos com ajuste de nível; suspender IECA/BRA e ajustar anti-hipertensivos seguros (metildopa, labetalol, nifedipina); pré-natal em centro de alto risco',
      C: 'Manter MMF',
      D: 'Suspender toda imunossupressão',
      E: 'AINE de rotina',
    },
    correct: 'B',
    explanation:
      'Planejamento pré-concepcional é essencial. Recomenda-se aguardar ≥1–2 anos após transplante com função estável, proteinúria <0,5 g/dia, PA controlada e sem rejeição recente. Substituir MMF/MPA (embriotóxico e teratogênico — malformações craniofaciais e de membros) por azatioprina antes da concepção; tacrolimus e ciclosporina podem ser mantidos com ajuste de nível (níveis costumam cair durante a gestação por hemodiluição). IECA/BRA e SGLT2i devem ser suspensos; usar metildopa, labetalol ou nifedipina. Pré-natal em centro de alto risco. Pearl: azatioprina é considerada segura; MMF nunca.',
    bibliography: 'AST pregnancy in transplant.',
  },

  // ============ ONCO-NEFROLOGIA ============
  {
    id: 'NA-T058',
    tema: 'Onconefrologia',
    subtema: 'Nefrotoxicidade por cisplatina',
    dificuldade: 'basico',
    age: 58,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com câncer em quimioterapia com cisplatina apresenta LRA e hipomagnesemia com wasting salino. Qual medida preventiva chave?',
    options: {
      A: 'Desidratar antes da dose',
      B: 'Hidratação vigorosa (isotônica pré e pós-cisplatina), reposição de Mg, evitar nefrotóxicos concomitantes (AINE, aminoglicosídeo, contraste), ajustar dose por TFG; monitorar Mg tardiamente (semanas)',
      C: 'AINE profilático',
      D: 'Restringir Mg',
      E: 'Contraindicar QT no futuro sempre',
    },
    correct: 'B',
    explanation:
      'Hidratação é a prevenção mais efetiva. HipoMg pode durar semanas. Pearl: hipomagnesemia tardia é a marca da cisplatina.',
    bibliography: 'Onco-nephrology (Perazella MA); ASCO.',
  },
  {
    id: 'NA-T059',
    tema: 'Onconefrologia',
    subtema: 'Checkpoint inhibitors',
    dificuldade: 'avancado',
    age: 65,
    vars: { cr: 2.3 },
    statement:
      '{{sexWord}} de {{age}} em uso de pembrolizumabe há 3 meses apresenta LRA (creatinina {{cr}}), sedimento com leucócitos, eosinofilia leve. Sem infecção ativa. Qual conduta?',
    options: {
      A: 'Manter fármaco',
      B: 'Nefrite intersticial aguda relacionada a ICI (irAE renal): considerar biópsia se dúvida, suspender o ICI, iniciar prednisona 0,5–1 mg/kg/dia com desmame de semanas; reintrodução do ICI em casos selecionados com controle da toxicidade',
      C: 'Aumentar dose do ICI',
      D: 'Corticoide tópico',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'ICI nephritis: forma clássica é NIA. Corticoide precoce recupera função em maioria. Pearl: sempre suspeitar em LRA + oncologia recente.',
    bibliography: 'Onco-nephrology consensus; ESMO irAE.',
  },
  {
    id: 'NA-T060',
    tema: 'Onconefrologia',
    subtema: 'Síndrome de lise tumoral',
    dificuldade: 'avancado',
    age: 60,
    vars: { k: 6.5, p: 8.5, ua: 15 },
    statement:
      '{{sexWord}} de {{age}} com linfoma iniciando QT apresenta K {{k}}, P {{p}}, ácido úrico {{ua}}, LDH em rampa e LRA. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'Síndrome de lise tumoral: hidratação vigorosa isotônica (3 L/m²/dia), rasburicase (em risco alto — reduz ácido úrico rapidamente; contraindicada em G6PD), NÃO alcalinizar rotineiramente (piora precipitação de fosfato de cálcio); TSR precoce (CRRT) se hiperK refratária, hiperP grave ou sobrecarga',
      C: 'Restringir hidratação',
      D: 'AINE',
      E: 'Corticoide isolado',
    },
    correct: 'B',
    explanation:
      'Cairo-Bishop define SLT. Rasburicase melhor em risco alto; NÃO deve ser usada em G6PD. Pearl: hiperK + hiperP + hiperúrico = SLT até prova em contrário.',
    bibliography: 'Cairo–Bishop; onco-nephrology.',
  },

  // ============ HEPATO-RENAL / GRAVIDEZ / OUTROS SISTÊMICOS ============
  {
    id: 'NA-T061',
    tema: 'Rim e gravidez',
    subtema: 'Pré-eclâmpsia',
    dificuldade: 'intermediario',
    age: 30,
    vars: { sbp: 160, dbp: 110 },
    statement:
      'Gestante de 30 semanas com PA {{sbp}}×{{dbp}}, proteinúria 3+, cefaleia intensa e reflexos vivos. Qual conduta?',
    options: {
      A: 'Alta ambulatorial',
      B: 'Pré-eclâmpsia grave: internar, controle pressórico com anti-hipertensivos seguros na gravidez (labetalol, hidralazina, nifedipina), sulfato de magnésio para profilaxia/tratamento de eclâmpsia, avaliar bem-estar fetal e programar interrupção da gestação conforme idade gestacional e critérios de gravidade',
      C: 'IECA imediato',
      D: 'AINE',
      E: 'Corticoide sistêmico como tratamento primário',
    },
    correct: 'B',
    explanation:
      'IECA/BRA/SGLT2i são contraindicados na gravidez. MgSO₄ previne eclâmpsia. Pearl: proteinúria + HAS + gravidez = pensa PE.',
    bibliography: 'ACOG; ISSHP.',
  },
  {
    id: 'NA-T062',
    tema: 'Cardio-renal',
    subtema: 'Congestão POCUS/VExUS',
    dificuldade: 'intermediario',
    age: 70,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} internado(a) com IC descompensada e LRA (creatinina 2,1 mg/dL, basal 1,2). Você deseja diferenciar hipovolemia real de congestão venosa antes de decidir entre volume e diurético. Como POCUS renal + pulmonar + VExUS auxiliam nessa decisão à beira-leito?',
    options: {
      A: 'Não ajuda',
      B: 'US pulmonar (linhas B), US renal (excluir obstrução), veia cava inferior e VExUS (fluxo hepático, portal, renal) auxiliam a diferenciar hipovolemia real de congestão venosa; guiar diurético vs volume; VExUS gradua congestão em escores 0–3',
      C: 'Substitui creatinina',
      D: 'Diagnostica membranosa',
      E: 'Mede PLA2R',
    },
    correct: 'B',
    explanation:
      'POCUS mudou o cardiorrenal moderno. VExUS gradua congestão venosa. Pearl: dilatação de VCI + fluxo hepático S-menor-que-D + veia portal pulsátil + fluxo renal bifásico = congestão severa.',
    bibliography: 'Beaubien-Souligny W et al.; Nephrology POCUS reviews.',
  },
  {
    id: 'NA-T063',
    tema: 'Cardio-renal',
    subtema: 'IECA/BRA em disfunção sistólica',
    dificuldade: 'basico',
    age: 68,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com IC-FER e DRC 3 apresenta discreta elevação de creatinina (30% do basal) e K 5,2 após início de IECA. Qual conduta?',
    options: {
      A: 'Suspender IECA',
      B: 'Elevação de creatinina ≤30% e K ≤5,5 mEq/L é ACEITÁVEL após início de IECA/BRA e não é motivo para suspensão — persistir com nefroproteção CV/renal; se K persistir alto, revisar dieta, considerar patiromer/ZS-9 e adicionar iSGLT2',
      C: 'AINE',
      D: 'Nefrectomia',
      E: 'Contraindicar IECA para sempre',
    },
    correct: 'B',
    explanation:
      'A queda inicial da TFG reflete redução da pressão intraglomerular — é proteção. Pearl: não suspenda IECA em pequeno aumento de creatinina; verifique volemia e outros nefrotóxicos.',
    bibliography: 'ESC/ACC HF; KDIGO CKD.',
  },
  {
    id: 'NA-T064',
    tema: 'Onconefrologia',
    subtema: 'Bisfosfonato',
    dificuldade: 'intermediario',
    age: 63,
    vars: {},
    statement:
      'Paciente com metástases ósseas em uso repetido de zoledronato apresenta LRA subaguda com sedimento urinário blando; biópsia mostra GESF colapsante. Conduta?',
    options: {
      A: 'Manter bisfosfonato',
      B: 'Suspender zoledronato; nefroproteção com IECA/BRA, controle de PA; considerar mudança para denosumabe (com cautela de hipoCa em DRC); monitorar TFG e proteinúria',
      C: 'AINE',
      D: 'Ciclofosfamida',
      E: 'Corticoide isolado',
    },
    correct: 'B',
    explanation:
      'Zoledronato/pamidronato → GESF colapsante e NTA em altas doses/repetidas. Pearl: LRA em oncologia com bisfosfonato = pensar toxicidade.',
    bibliography: 'Perazella MA.',
  },

  // ============ NEFROPATIAS ESPECÍFICAS ============
  {
    id: 'NA-T065',
    tema: 'Nefropatia',
    subtema: 'Hepatite C',
    dificuldade: 'avancado',
    age: 55,
    vars: { c3: 45, prot: 3.5 },
    statement:
      '{{sexWord}} de {{age}} com HCV crônico apresenta síndrome nefrítica/nefrótica mista, C3 {{c3}}, C4 muito baixo, crioglobulinas positivas, artralgias e púrpura. Diagnóstico e conduta?',
    options: {
      A: 'GNPE',
      B: 'GN membranoproliferativa por crioglobulinemia associada à HCV: terapia antiviral direta (DAA — sofosbuvir/velpatasvir) para HCV é pilar; imunossupressão (rituximabe) em manifestações extra-hepáticas graves e vasculite; plasmaférese em casos com hiperviscosidade/vasculite grave',
      C: 'Ciclofosfamida sem tratar HCV',
      D: 'ATB',
      E: 'Nefrectomia',
    },
    correct: 'B',
    explanation:
      'DAAs revolucionaram: cura viral resolve muitas manifestações. Rituximabe para crioglobulinemia sintomática. Pearl: C4 muito baixo com C3 pouco alterado sugere via clássica ativada — crio/lúpus.',
    bibliography: 'KDIGO HCV; AASLD.',
  },
  {
    id: 'NA-T066',
    tema: 'Nefropatia',
    subtema: 'HIV (HIVAN)',
    dificuldade: 'intermediario',
    age: 42,
    vars: { upcr: 4.0 },
    statement:
      '{{sexWord}} de {{age}} com HIV mal tratado, CD4 baixo, proteinúria UPCR {{upcr}} e biópsia com GESF colapsante clássica. Conduta?',
    options: {
      A: 'Ignorar HIV',
      B: 'Otimizar TARV com supressão viral, IECA/BRA para nefroproteção, corticoide em casos selecionados (baixa evidência), tratar comorbidades; vigilância de progressão',
      C: 'Corticoide isolado sem TARV',
      D: 'Nefrectomia',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'TARV é o pilar da HIVAN. IECA reduz progressão. Pearl: HIVAN é doença de "supressão viral inadequada".',
    bibliography: 'KDIGO HIV.',
  },
  {
    id: 'NA-T067',
    tema: 'Nefropatia',
    subtema: 'Nefropatia por lítio crônica',
    dificuldade: 'avancado',
    age: 55,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em uso de lítio há 20 anos apresenta poliúria/polidipsia, DRC lentamente progressiva com rins pequenos multicísticos à US e proteinúria discreta. Conduta?',
    options: {
      A: 'Manter lítio sem monitorar',
      B: 'Nefropatia crônica por lítio: em conjunto com psiquiatria, avaliar substituição (valproato, lamotrigina, quetiapina) — o lítio pode ser mantido em benefício psiquiátrico dominante com nível mais baixo e monitorização; controle da poliúria com dieta, amilorida/tiazídico; nefroproteção geral, evitar desidratação/AINE',
      C: 'Aumentar lítio',
      D: 'Nefrectomia',
      E: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'Nefropatia crônica por lítio: nefropatia tubulointersticial e DI nefrogênico. Pearl: rim pequeno multicístico em usuário crônico de lítio = clássico.',
    bibliography: 'Grunfeld JP, Rossert J.',
  },
  {
    id: 'NA-T068',
    tema: 'Nefropatia',
    subtema: 'Nefroangiosclerose hipertensiva',
    dificuldade: 'basico',
    age: 66,
    vars: { tfg: 45, uacr: 100 },
    statement:
      '{{sexWord}} de {{age}} com HAS de longa data, TFG {{tfg}}, UACR {{uacr}}, sedimento urinário blando, sem outra causa. Diagnóstico e conduta?',
    options: {
      A: 'Nefrite intersticial imediata',
      B: 'Nefroangiosclerose hipertensiva (nefroesclerose): controle rigoroso de PA (KDIGO <120), nefroproteção com IECA/BRA em albuminúria, iSGLT2 em DRC albuminúrica, controle metabólico e CV',
      C: 'Nefrectomia',
      D: 'AINE',
      E: 'Corticoide',
    },
    correct: 'B',
    explanation:
      'Nefroesclerose é diagnóstico de exclusão em HAS de longa data. Tratamento é nefroproteção. Pearl: albuminúria em HAS é fator prognóstico.',
    bibliography: 'KDIGO CKD.',
  },
  {
    id: 'NA-T069',
    tema: 'Vasculites',
    subtema: 'Esclerodermia — crise renal',
    dificuldade: 'avancado',
    age: 47,
    vars: { sbp: 210, cr: 3.5 },
    statement:
      '{{sexWord}} de {{age}} com esclerodermia, PA {{sbp}}, LRA (creatinina {{cr}}), anemia hemolítica microangiopática. Qual conduta?',
    options: {
      A: 'Suspender IECA',
      B: 'Crise renal esclerodérmica: IECA (captopril titulado agressivamente para controle da PA, MESMO com creatinina subindo) — é salvamento em síndrome com prognóstico historicamente ruim',
      C: 'AINE',
      D: 'Só hidralazina',
      E: 'Observação',
    },
    correct: 'B',
    explanation:
      'IECA em SRC muda o desfecho — não pare mesmo com creatinina subindo. Pearl: dose crescente até controlar a PA, aceitar elevação de creatinina.',
    bibliography: 'ACR/EULAR scleroderma; Steen VD reviews.',
  },
  {
    id: 'NA-T070',
    tema: 'Vasculites',
    subtema: 'Púrpura de IgA no adulto',
    dificuldade: 'intermediario',
    age: 35,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com púrpura palpável, artralgia, dor abdominal, sedimento com hematúria dismórfica e proteinúria. Qual conduta?',
    options: {
      A: 'ATB apenas',
      B: 'Vasculite IgA (Henoch-Schönlein no adulto — muitas vezes mais grave que em criança): nefroproteção com IECA/BRA, controle de PA; imunossupressão (corticoide ± ciclofosfamida/MMF) em nefrite moderada/grave (proteinúria maciça, queda de TFG); biópsia guia terapia',
      C: 'AINE',
      D: 'Nefrectomia',
      E: 'Observação',
    },
    correct: 'B',
    explanation:
      'IgA vasculite no adulto exige seguimento renal ativo — pode evoluir a DRC. Pearl: no adulto é geralmente mais agressiva.',
    bibliography: 'KDIGO Glomerular.',
  },

  // ============ UTI / DROGAS ============
  {
    id: 'NA-T071',
    tema: 'UTI',
    subtema: 'Fluidoterapia balanceada',
    dificuldade: 'intermediario',
    age: 60,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em UTI com choque séptico de origem abdominal, lactato 5,0 mmol/L, PAM 60 mmHg após noradrenalina em ajuste. Não há contraindicações específicas de eletrólitos. Qual cristaloide de escolha para a ressuscitação inicial na luz das evidências atuais?',
    options: {
      A: 'SF 0,9% em bolus indefinidos',
      B: 'Cristaloide balanceado (Ringer lactato, Plasma-Lyte) — SMART/BaSICS/PLUS mostraram redução ou tendência a menos LRA/AKI progression comparado a SF 0,9% (que é hiperclorêmico); usar como padrão exceto em contraindicações específicas',
      C: 'Coloide amido em altas doses (contraindicado em sepse por aumento de LRA)',
      D: 'Água destilada',
      E: 'Dieta zero-líquido',
    },
    correct: 'B',
    explanation:
      'SMART, BASICS, PLUS: cristaloides balanceados são preferidos. Amidos aumentam LRA (VISEP, 6S). Pearl: SF 0,9% causa acidose hiperclorêmica.',
    bibliography: 'SMART/BaSICS/PLUS; Surviving Sepsis.',
  },
  {
    id: 'NA-T072',
    tema: 'UTI',
    subtema: 'Ajuste de dose por TFG e diálise',
    dificuldade: 'intermediario',
    age: 60,
    vars: { tfg: 25 },
    statement:
      '{{sexWord}} com DRC (TFG {{tfg}}) e sepse por Gram- multirresistente em UTI recebe meropenem. Qual conduta?',
    options: {
      A: 'Manter dose padrão',
      B: 'Ajustar dose ao TFG (dose menor ou intervalo maior conforme referência); em CRRT, doses geralmente MAIORES que em HD (efluente alto); monitorar níveis quando disponível; considerar infusão prolongada/contínua para maximizar T>MIC',
      C: 'Suspender ATB',
      D: 'Trocar por AINE',
      E: 'Dobrar dose sempre',
    },
    correct: 'B',
    explanation:
      'Sub-dose = falha terapêutica + resistência; overdose = toxicidade (neurotoxicidade do meropenem). Pearl: em CRRT, atenção ao clearance de β-lactâmicos.',
    bibliography: 'KDIGO drug dosing; UpToDate.',
  },
  {
    id: 'NA-T073',
    tema: 'UTI',
    subtema: 'Vancomicina AUC-alvo',
    dificuldade: 'intermediario',
    age: 55,
    vars: {},
    statement:
      'Paciente em UTI com sepse por S. aureus e função renal em alteração recebe vancomicina. Qual estratégia farmacocinética moderna?',
    options: {
      A: 'Dose fixa sem monitorar',
      B: 'Alvo AUC 400–600 mg·h/L (guia ASHP/IDSA 2020) — mais acurado que "trough" para eficácia e menor toxicidade renal; ajustar por função renal e monitorar creatinina',
      C: 'Apenas medida cega',
      D: 'Suspender ATB',
      E: 'AINE em alta dose',
    },
    correct: 'B',
    explanation:
      'AUC-alvo é padrão-ouro moderno; trough isolado subestima toxicidade. Pearl: vancomicina + piperacilina/tazobactam aumenta risco de LRA (associação clássica).',
    bibliography: 'ASHP/IDSA vancomycin 2020.',
  },

  // ============ CKD-MBD, ANEMIA, UREMIA ============
  {
    id: 'NA-T074',
    tema: 'CKD-MBD',
    subtema: 'Hiperfosfatemia em HD',
    dificuldade: 'intermediario',
    age: 59,
    vars: { p: 7.2, pth: 780 },
    statement:
      '{{sexWord}} de {{age}} em HD 3×/semana com fósforo {{p}} mg/dL e PTH {{pth}} pg/mL, sem calcifilaxia. Qual a melhor estratégia?',
    options: {
      A: 'Liberar refrigerantes/processados',
      B: 'Restringir P dietético (>800 mg/dia para <1000), quelantes tomados com refeições (não-cálcicos como sevelamer ou lantânio em risco de calcificação vascular), vitamina D ativa e/ou calcimimético (cinacalcete/etelcalcetide) conforme PTH, ajustar cálcio do dialisado; paratireoidectomia se refratário',
      C: 'Paratireoidectomia em toda primeira consulta',
      D: 'Cálcio EV contínuo',
      E: 'Nada',
    },
    correct: 'B',
    explanation:
      'Estratégia é multi-fatorial. Sevelamer/lantânio preferíveis quando risco de calcificação. Calcimiméticos reduzem PTH sem elevar Ca. Pearl: quelante só funciona se tomado durante a refeição.',
    bibliography: 'KDIGO CKD-MBD 2017/2024 update.',
  },
  {
    id: 'NA-T075',
    tema: 'CKD-MBD',
    subtema: 'Calcifilaxia',
    dificuldade: 'avancado',
    age: 65,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} em HD com lesões cutâneas necróticas dolorosas em coxas e abdome, produto Ca×P elevado, uso crônico de varfarina. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'Calcifilaxia (arteriolopatia calcificante urêmica): multidisciplinar — tiossulfato de sódio IV, otimizar CKD-MBD (baixo Ca, quelantes não-cálcicos, cinacalcete), substituir varfarina por outro anticoagulante quando possível (a varfarina inibe proteínas dependentes de vitamina K envolvidas na proteção contra calcificação), cuidado com feridas, analgesia adequada e paratireoidectomia em selecionados',
      C: 'AINE',
      D: 'Nefrectomia',
      E: 'Aumentar cálcio do dialisado',
    },
    correct: 'B',
    explanation:
      'Calcifilaxia tem alta mortalidade. Tiossulfato + otimização MBD + suspensão de varfarina + cuidado de ferida. Pearl: dor cutânea desproporcional em dialítico + úlceras = calcifilaxia.',
    bibliography: 'KDIGO CKD-MBD; Nigwekar SU reviews.',
  },
  {
    id: 'NA-T076',
    tema: 'Anemia',
    subtema: 'ESA e ferro em DRC',
    dificuldade: 'basico',
    age: 64,
    vars: { hb: 8.7, ferritina: 300, tsat: 18 },
    statement:
      '{{sexWord}} de {{age}} em HD, Hb {{hb}}, ferritina {{ferritina}}, TSAT {{tsat}}%. Qual conduta?',
    options: {
      A: 'Transfusão semanal indefinida',
      B: 'Otimizar ferro (TSAT alvo ≥20–30% e ferritina 200–500 em HD conforme KDIGO), preferencialmente ferro EV em HD; iniciar/ajustar ESA com alvo Hb 10–11,5 g/dL (evitar >13 pelo risco CV — CHOIR/TREAT); avaliar deficiências (folato, B12), inflamação, causas de perda',
      C: 'Ignorar',
      D: 'Suspender diálise',
      E: 'Vitamina C megadose',
    },
    correct: 'B',
    explanation:
      'Corrigir ferro antes/junto com ESA. Alvo Hb moderado (10–11,5). Novos agentes: HIF-PHi (daprodustate, roxadustate) — orais, resposta em inflamação. Pearl: transfusão sensibiliza para Tx futuro.',
    bibliography: 'KDIGO anemia; CHOIR/TREAT.',
  },

  // ============ MISCELÂNEA / ESPECIALIDADES ============
  {
    id: 'NA-T077',
    tema: 'Plasmaférese',
    subtema: 'Indicações renais',
    dificuldade: 'intermediario',
    age: 40,
    vars: {},
    statement:
      'Qual cenário nefrológico tem forte indicação (categoria I ASFA) para plasmaférese terapêutica?',
    options: {
      A: 'ITU simples',
      B: 'Doença anti-MBG com hemorragia alveolar ou creatinina moderadamente elevada; PTT com ADAMTS13 <10%; síndrome hepatorrenal — não indicado; alguns cenários de vasculite ANCA grave (creatinina muito alta com diálise ou hemorragia alveolar difusa, revisado após PEXIVAS); recorrência precoce de FSGS pós-transplante',
      C: 'HAS essencial',
      D: 'Litíase única',
      E: 'Proteinúria ortostática',
    },
    correct: 'B',
    explanation:
      'ASFA classifica indicações. Anti-MBG é I; ANCA seletiva (PEXIVAS mudou); PTT/aHUS variantes; FSGS recorrente pós-Tx. Pearl: PLEX não é para "toda glomerulopatia".',
    bibliography: 'ASFA guidelines 2023; PEXIVAS.',
  },
  {
    id: 'NA-T078',
    tema: 'Anticoagulação',
    subtema: 'DOAC em DRC',
    dificuldade: 'intermediario',
    age: 72,
    vars: { tfg: 30 },
    statement:
      '{{sexWord}} de {{age}} com FA e DRC 3b (TFG {{tfg}}), sem AVC prévio, sem alto sangramento; considerando anticoagulação. Qual conduta?',
    options: {
      A: 'Varfarina em todos',
      B: 'DOACs são preferidos em DRC 3b (apixabana ou edoxabana com ajuste — melhor perfil sangramento/eficácia); dose ajustada e monitor de função renal; varfarina em DRC muito avançada/HD ainda debatida (crescente uso cauteloso de apixabana em HD após ARISTOTLE + estudos observacionais)',
      C: 'AINE',
      D: 'Nenhuma anticoagulação',
      E: 'Heparina crônica',
    },
    correct: 'B',
    explanation:
      'Apixabana tem melhor perfil renal em vários subgrupos. Varfarina aumenta risco de calcifilaxia. Pearl: em HD, evidência crescente favorece apixabana ajustada; individualizar.',
    bibliography: 'ESC AF; KDIGO cardiorenal.',
  },
  {
    id: 'NA-T079',
    tema: 'Ajuste de dose',
    subtema: 'Metformina em DRC',
    dificuldade: 'basico',
    age: 66,
    vars: { tfg: 25 },
    statement:
      '{{sexWord}} de {{age}} com DM2 (HbA1c 7,4%) e DRC estabelecida (TFG {{tfg}} mL/min/1,73 m²) em uso de metformina 1000 mg 2× ao dia há anos. Sem episódios prévios de acidose láctica. Qual conduta correta em relação à metformina considerando o TFG atual?',
    options: {
      A: 'Dose plena indiferente à TFG',
      B: 'Metformina: TFG 30–45 → reduzir dose (≤1000 mg/dia); TFG <30 → contraindicada pelo risco de acidose láctica, especialmente com desidratação/hipoxia; considerar outros anti-hiperglicemiantes (iSGLT2 se TFG >20, análogos de GLP-1, insulina)',
      C: 'Dobrar a dose',
      D: 'Trocar por AINE',
      E: 'Nada a ver com o rim',
    },
    correct: 'B',
    explanation:
      'Metformina é excretada renalmente; acúmulo → acidose láctica (especialmente com desidratação/contraste/hipoxia). Pearl: sempre reveja em LRA.',
    bibliography: 'FDA/KDIGO metformin.',
  },
  {
    id: 'NA-T080',
    tema: 'Biópsia renal',
    subtema: 'Indicações',
    dificuldade: 'basico',
    age: 45,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} chega ao ambulatório de nefrologia com múltiplos quadros clínicos. Considerando o cenário atual e as diretrizes vigentes, qual das seguintes é uma indicação clássica de biópsia renal percutânea no adulto?',
    options: {
      A: 'ITU cistite simples',
      B: 'Síndrome nefrótica do adulto (exceto contexto de nefropatia diabética típica com anos de evolução, retinopatia, sem hematúria), IRA intrínseca sem causa clara, HAS+ hematúria + proteinúria (glomerulopatia), disfunção do enxerto e recorrência de doença primária',
      C: 'Litíase única passada',
      D: 'Enurese remota',
      E: 'HAS essencial leve isolada',
    },
    correct: 'B',
    explanation:
      'Biópsia é ferramenta diagnóstica poderosa mas com risco (sangramento). Risco/benefício claros. Pearl: nunca biopsiar sem checar coagulação, PA e imagem.',
    bibliography: 'KDIGO Glomerular Diseases.',
  },
  {
    id: 'NA-T081',
    tema: 'Anticoagulação',
    subtema: 'Heparina em HD',
    dificuldade: 'intermediario',
    age: 58,
    vars: {},
    statement:
      'Paciente com alto risco de sangramento (recém pós-operatório) precisa dialisar. Qual estratégia?',
    options: {
      A: 'Heparina em dose plena',
      B: 'HD sem anticoagulação (lavagens salinas periódicas de circuito) ou anticoagulação regional com citrato (preferido); ajustar tempo e fluxo para evitar coagulação; monitorar cálcio ionizado se citrato',
      C: 'Warfarina',
      D: 'AINE',
      E: 'Nenhuma diálise',
    },
    correct: 'B',
    explanation:
      'Sem anticoagulação e citrato regional são estratégias de risco reduzido de sangramento. Pearl: cuidado com toxicidade de citrato (hipocalcemia iônica + acúmulo em insuficiência hepática).',
    bibliography: 'KDIGO AKI CRRT anticoagulation.',
  },
  {
    id: 'NA-T082',
    tema: 'Nefropatia diabética',
    subtema: 'Rastreio e escalonamento',
    dificuldade: 'basico',
    age: 55,
    vars: { uacr: 320, tfg: 62 },
    statement:
      '{{sexWord}} de {{age}} com DM2 há 12 anos, UACR {{uacr}}, TFG {{tfg}}, PA 130/78 em IECA. Qual próximo passo?',
    options: {
      A: 'Suspender IECA',
      B: 'Manter IECA + adicionar iSGLT2 (empa/dapa) e considerar finerenona (bloqueador MR não esteroidal) para reduzir progressão e MACE em DRC diabética albuminúrica; controle glicêmico com foco em GLP-1 análogo se elegível; controle lipídico com estatina; controle de PA <130/80 (ou <120 em SBP padronizada)',
      C: 'AINE',
      D: 'Restringir água',
      E: 'Parar controle glicêmico',
    },
    correct: 'B',
    explanation:
      'DRC diabética albuminúrica moderna: IECA/BRA + iSGLT2 + finerenona + GLP-1 análogo. Pearl: albuminúria é o alvo terapêutico.',
    bibliography: 'KDIGO Diabetes in CKD 2022.',
  },
  {
    id: 'NA-T083',
    tema: 'Uremia',
    subtema: 'Indicação de TSR',
    dificuldade: 'basico',
    age: 69,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com DRC 5 não-dialítica apresenta asterixe, confusão, atrito pericárdico e sobrecarga de volume. Conduta?',
    options: {
      A: 'Alta ambulatorial',
      B: 'Iniciar terapia de substituição renal por uremia sintomática (encefalopatia, pericardite urêmica), sobrecarga refratária e/ou distúrbios ácido-base/eletrolíticos não tratáveis clinicamente',
      C: 'Só lorazepam',
      D: 'Restringir HD',
      E: 'Aumentar proteína livre',
    },
    correct: 'B',
    explanation:
      'Pericardite urêmica, encefalopatia urêmica com asterixe e confusão, além de sobrecarga volêmica refratária, são indicações clássicas e absolutas para início de terapia de substituição renal — independentemente do valor exato da TFG. Neste cenário, adiar diálise expõe a tamponamento cardíaco e piora neurológica potencialmente irreversíveis. Iniciar HD (com heparinização mínima para reduzir hemorragia intra-pericárdica) ou DP conforme cenário; drenar derrame se hemodinamicamente significativo. Pearl: sinais/sintomas urêmicos, e não a TFG isolada, guiam o início de TSR (IDEAL trial).',
    bibliography: 'KDIGO AKI/CKD; IDEAL trial contexto.',
  },
  {
    id: 'NA-T084',
    tema: 'Gravidez',
    subtema: 'DRC',
    dificuldade: 'intermediario',
    age: 32,
    vars: {},
    statement:
      'Mulher de {{age}} com DRC estágio 3 (TFG 45), HAS controlada em enalapril + hidroclorotiazida, proteinúria de 400 mg/dia, sem outras comorbidades. Deseja engravidar nos próximos 6–12 meses. Qual orientação pré-concepcional é a mais adequada?',
    options: {
      A: 'Contraindicar sempre',
      B: 'Aconselhamento pré-concepcional: risco de progressão da DRC, pré-eclâmpsia e prematuridade; suspender IECA/BRA e SGLT2i antes de conceber, substituir por metildopa/labetalol/nifedipina; controle rigoroso de PA (<140/90); considerar AAS profilático para pré-eclâmpsia; seguimento em centro de gravidez de alto risco',
      C: 'Manter IECA',
      D: 'AINE liberado',
      E: 'Manter SGLT2i',
    },
    correct: 'B',
    explanation:
      'IECA/BRA são teratogênicos. AAS baixa dose reduz pré-eclâmpsia em risco alto. Pearl: planejamento é 90% do sucesso.',
    bibliography: 'ISSHP; ACOG.',
  },
  {
    id: 'NA-T085',
    tema: 'Nefropatia por analgésicos',
    subtema: 'AINE crônico',
    dificuldade: 'basico',
    age: 60,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com uso crônico de AINE por dor lombar apresenta hiperkalemia, HAS e queda de TFG. Qual mecanismo?',
    options: {
      A: 'Alcalose respiratória',
      B: 'AINE inibem síntese de prostaglandinas vasodilatadoras da arteríola aferente, causando redução hemodinâmica da TFG; também associados a NIA, sódio-retenção (piora PA e IC), hipercalemia (hipoaldosteronismo hiporreninêmico) e podem induzir SN por lesão mínima ou membranosa',
      C: 'Nefrite lúpica',
      D: 'DI central',
      E: 'CAD',
    },
    correct: 'B',
    explanation:
      'AINE são multi-efeitos renais deletérios, ainda mais em idosos, DRC e IC. Pearl: revise sempre a caixinha "azul" do paciente.',
    bibliography: 'KDIGO AKI drug-induced.',
  },
  {
    id: 'NA-T086',
    tema: 'Distúrbios',
    subtema: 'Análise sistemática ácido-base',
    dificuldade: 'intermediario',
    age: 55,
    vars: { ph: 7.32, hco3: 16, pco2: 30, gap: 20 },
    statement:
      '{{sexWord}} de {{age}} com pH {{ph}}, HCO₃ {{hco3}}, PaCO₂ {{pco2}}, ânion gap {{gap}}, sódio 140, cloreto 100. Interpretação?',
    options: {
      A: 'Alcalose metabólica pura',
      B: 'Acidose metabólica com gap aumentado, compensação respiratória adequada (Winter: 1,5×16+8 = 32 ± 2 ≈ 30); avaliar delta-delta para distúrbio adicional; investigar causas: lactato, cetoacidose, uremia, intoxicação',
      C: 'Alcalose respiratória',
      D: 'Distúrbio triplo com alcalose metabólica',
      E: 'Bartter',
    },
    correct: 'B',
    explanation:
      'Sistemática: distúrbio primário → compensação (Winter) → ΔAG/ΔHCO₃ → causas. Pearl: sempre calcular delta-delta em acidose gap alto para detectar distúrbio metabólico coexistente.',
    bibliography: 'Rose & Post.',
  },
  {
    id: 'NA-T087',
    tema: 'Nefropatia',
    subtema: 'Doença de Fabry',
    dificuldade: 'avancado',
    age: 40,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com angioqueratomas, dor neuropática nas extremidades, hipohidrose, proteinúria, cornea verticillata; história familiar de "problema no rim/coração" precoce. Diagnóstico?',
    options: {
      A: 'Alport',
      B: 'Doença de Fabry (deficiência de α-galactosidase A, ligada ao X): dosar atividade da α-Gal A (homens) e genética (mulheres heterozigotas podem ser sintomáticas); terapia de reposição enzimática (agalsidase) ou chaperona (migalastate em mutações amenáveis); nefroproteção com IECA/BRA',
      C: 'GNPE',
      D: 'ATR distal',
      E: 'PTT',
    },
    correct: 'B',
    explanation:
      'Fabry: doença sistêmica; nefropatia progressiva. Terapia enzimática ou chaperona muda curso. Pearl: cornea verticillata + dor neuropática = pensar Fabry.',
    bibliography: 'Fabry consortium; ERT trials.',
  },
  {
    id: 'NA-T088',
    tema: 'Pulmão-rim',
    subtema: 'Diferencial',
    dificuldade: 'avancado',
    age: 44,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com hemoptise, LRA e sedimento urinário ativo. Quais diagnósticos considerar de imediato?',
    options: {
      A: 'Apenas pneumonia viral',
      B: 'Síndromes pulmão-rim: vasculite ANCA (mais comum), doença anti-MBG (Goodpasture), LES; investigar ANCA, anti-MBG, anti-dsDNA, C3/C4; iniciar imunossupressão precoce assim que possível, PLEX em selecionados; considerar biópsia renal',
      C: 'Litíase',
      D: 'Enurese',
      E: 'Nefroesclerose',
    },
    correct: 'B',
    explanation:
      'Pulmão-rim é emergência imunológica. Diferencial rápido salva rim/pulmão. Pearl: pedir ANCA, anti-MBG, anti-dsDNA, C3/C4 no mesmo tubo.',
    bibliography: 'KDIGO Vasculitis; UpToDate.',
  },
  {
    id: 'NA-T089',
    tema: 'PTT',
    subtema: 'Diagnóstico e tratamento',
    dificuldade: 'avancado',
    age: 33,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com anemia hemolítica microangiopática + plaquetopenia + alteração neurológica flutuante, sem diarreia. ADAMTS13 <10%. Diagnóstico e conduta?',
    options: {
      A: 'STEC-HUS típico',
      B: 'PTT (Púrpura Trombocitopênica Trombótica) adquirida (auto-anticorpo anti-ADAMTS13): plasmaférese urgente diariamente até resolução, corticoide + rituximabe; caplacizumabe (anti-vWF nanobody) acelera resposta (HERCULES trial); evitar transfusão de plaquetas exceto sangramento grave',
      C: 'Apenas ferro oral',
      D: 'Esplenectomia sem PLEX',
      E: 'Ignorar hematologia',
    },
    correct: 'B',
    explanation:
      'PTT: iniciar PLEX imediatamente, mesmo antes da confirmação de ADAMTS13. Caplacizumabe reduz recorrência precoce. Pearl: TTP mata em horas — não espere confirmação para iniciar.',
    bibliography: 'ISTH TTP 2020; HERCULES trial.',
  },
  {
    id: 'NA-T090',
    tema: 'aHUS',
    subtema: 'Adulto',
    dificuldade: 'avancado',
    age: 40,
    vars: {},
    statement:
      '{{sexWord}} de {{age}} com MAHA + plaquetopenia + LRA sem diarreia, ADAMTS13 normal. Qual conduta?',
    options: {
      A: 'Ignorar',
      B: 'SHU atípica adulta: dosar complemento, painel de mutações (CFH, CFI, MCP, C3, DGKE), tratar com eculizumabe/ravulizumabe (bloqueio de C5) precocemente; vacinar contra meningococo antes ou concomitante com profilaxia antibiótica; avaliar Tx renal com risco de recorrência conforme genética',
      C: 'STEC-HUS típico — apenas suporte',
      D: 'Corticoide isolado resolve',
      E: 'AINE',
    },
    correct: 'B',
    explanation:
      'aHUS: bloqueio precoce de C5 mudou prognóstico. Vacinar contra meningococo é obrigatório. Pearl: HUS sem diarreia = pense complemento.',
    bibliography: 'KDIGO aHUS; Fakhouri F., Loirat C.',
  },
];

module.exports = { ADV_MASTERS };
