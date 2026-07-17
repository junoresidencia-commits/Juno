/** Grandes áreas cobradas em provas de residência médica (acesso direto e multidisciplinar). */
export const RESIDENCY_AREAS = [
  'Clínica Médica',
  'Cirurgia Geral',
  'Pediatria',
  'Ginecologia e Obstetrícia',
  'Medicina Preventiva e Saúde Coletiva',
  'Urgência e Emergência',
  'Psiquiatria',
  'Dermatologia',
  'Ortopedia',
  'Otorrinolaringologia',
  'Oftalmologia',
  'Radiologia',
  'Anestesiologia',
  'Infectologia',
  'Neurologia',
  'Cardiologia',
  'Pneumologia',
  'Gastroenterologia',
  'Nefrologia',
  'Endocrinologia',
  'Hematologia',
  'Reumatologia',
] as const;

export type ResidencyArea = (typeof RESIDENCY_AREAS)[number];

/** Distribuição ENARE acesso direto: 5 blocos × 4 questões em simulado de 20. */
export const ENARE_AREA_WEIGHTS: { area: ResidencyArea; slots: number }[] = [
  { area: 'Clínica Médica', slots: 4 },
  { area: 'Cirurgia Geral', slots: 4 },
  { area: 'Pediatria', slots: 4 },
  { area: 'Ginecologia e Obstetrícia', slots: 4 },
  { area: 'Medicina Preventiva e Saúde Coletiva', slots: 4 },
];

export const SIMULADO_QUESTION_COUNT = 20;
export const SIMULADO_DURATION_MINUTES = 30;

export const AREA_KEYWORDS: Record<ResidencyArea, string[]> = {
  'Clínica Médica': ['clínica médica', 'clinica medica', 'clínica', 'internação', 'ambulatorial'],
  'Cirurgia Geral': ['cirurgia geral', 'cirurgia', 'abdome agudo', 'trauma', 'pós-operatório', 'hérnia'],
  Pediatria: ['pediatria', 'criança', 'lactente', 'neonato', 'recém-nascido', 'adolescente'],
  'Ginecologia e Obstetrícia': ['ginecologia', 'obstetrícia', 'gestante', 'parto', 'pré-eclâmpsia', 'feto', 'go '],
  'Medicina Preventiva e Saúde Coletiva': ['preventiva', 'saúde coletiva', 'epidemiologia', 'vigilância', 'ubs', 'atenção primária'],
  'Urgência e Emergência': ['emergência', 'urgência', 'pronto-socorro', 'samu', 'trauma', 'choque', 'reanimação'],
  Psiquiatria: ['psiquiatria', 'depressão', 'ansiedade', 'psicose', 'bipolar', 'suicídio', 'transtorno'],
  Dermatologia: ['dermatologia', 'pele', 'lesão cutânea', 'melanoma', 'eczema', 'psoríase'],
  Ortopedia: ['ortopedia', 'fratura', 'luxação', 'osteoporose', 'articulação', 'menisco'],
  Otorrinolaringologia: ['otorrino', 'otite', 'sinusite', 'audição', 'rinossinusite', 'amígdala'],
  Oftalmologia: ['oftalmologia', 'olho', 'glaucoma', 'catarata', 'retina', 'visão'],
  Radiologia: ['radiologia', 'tomografia', 'ressonância', 'raio-x', 'imagem', 'contraste'],
  Anestesiologia: ['anestesia', 'anestesiologia', 'bloqueio', 'intubação', 'sedação'],
  Infectologia: ['infectologia', 'antibiótico', 'sepse', 'hiv', 'tuberculose', 'infecção', 'antimicrobiano'],
  Neurologia: ['neurologia', 'avc', 'epilepsia', 'cefaleia', 'meningite', 'demência', 'parkinson'],
  Cardiologia: ['cardiologia', 'infarto', 'insuficiência cardíaca', 'arritmia', 'angina', 'ecg', 'coronariana'],
  Pneumologia: ['pneumologia', 'asma', 'dpoc', 'pneumonia', 'tep', 'dispneia', 'pulmão'],
  Gastroenterologia: ['gastroenterologia', 'hepatite', 'cirrose', 'pancreatite', 'diarreia', 'endoscopia', 'fígado'],
  Nefrologia: [
    'nefrologia',
    'nefropediatria',
    'renal',
    'creatinina',
    'dialise',
    'diálise',
    'ira',
    'drc',
    'hipercalemia',
    'síndrome nefrótica',
    'glomerulonefrite',
  ],
  Endocrinologia: ['endocrinologia', 'diabetes', 'tireoide', 'hipoglicemia', 'cushing', 'insulina'],
  Hematologia: ['hematologia', 'anemia', 'leucemia', 'coagulação', 'plaquetas', 'hemoglobina'],
  Reumatologia: ['reumatologia', 'artrite', 'lúpus', 'vasculite', 'gota', 'espondilite'],
};
