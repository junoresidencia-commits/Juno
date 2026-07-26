-- MedRank Lote Autoral 04 — 50 questões (aprovadas no banco)
-- Cole no Supabase SQL Editor. Idempotente por external_id / fingerprint.

-- Desativa versão antiga do mesmo lote (se existir)
UPDATE public.questions
SET bank_status = 'disabled',
    quality_notes = COALESCE(quality_notes,'') || ' | substituído por novo LOTE_04'
WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04'
  AND bank_status IN ('approved','draft','pending_review');

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'bf950f17-cdf9-4fab-a251-4424bebef51c'::uuid, 'MR26-L4-001', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 68 anos apresenta fadiga, perda de 9 kg em cinco meses e dor lombar. Hemoglobina: 8,7 g/dL; creatinina: 2,8 mg/dL; cálcio total: 11,8 mg/dL; albumina: 4,0 g/dL; PTH: 6 pg/mL (VR: 15–65). EAS com proteína 2+, sem hematúria; imunofixação urinária demonstra cadeia leve kappa monoclonal; eletroforese sérica não mostra pico monoclonal. Ultrassonografia revela rins de tamanho preservado e a tomografia de baixa dose do esqueleto não evidencia lesões líticas. Qual é a melhor próxima etapa diagnóstica?', 'Solicitar cadeias leves livres séricas e realizar aspirado/biópsia de medula óssea com imunofenotipagem.', 'Iniciar dexametasona 40 mg VO por quatro dias e avaliar resposta clínica antes da confirmação.', 'Realizar apenas biópsia de gordura abdominal para pesquisar amiloide.', 'Realizar biópsia renal como primeiro exame, sem investigação hematológica adicional.', 'Repetir eletroforese sérica e urinária em 90 dias antes de prosseguir.',
  'A', 'A associação de anemia, lesão renal, hipercalcemia com PTH suprimido e proteína monoclonal urinária torna muito provável uma neoplasia de plasmócitos, inclusive mieloma de cadeia leve, que pode não produzir pico sérico evidente nem lesões líticas. A investigação hematológica com cadeias leves livres e medula óssea deve ser priorizada. Se a medula não confirmar neoplasia e persistir suspeita de lesão renal mediada por imunoglobulina monoclonal, a biópsia renal passa a ser importante para caracterizar MGRS, amiloidose ou outra nefropatia monoclonal.',
  'Correta. Integra a pesquisa da proteína monoclonal com o exame confirmatório da população clonal medular.', 'Corticoide antes da confirmação pode modificar achados, mascarar a doença e não substitui o diagnóstico histológico.', 'A pesquisa de amiloide pode integrar a investigação, mas isoladamente não avalia adequadamente mieloma de cadeia leve.', 'A biópsia renal pode ser necessária depois, mas não deve atrasar a confirmação de uma discrasia de plasmócitos fortemente sugerida pelo conjunto clínico.', 'Aguardar três meses pode atrasar o diagnóstico e o tratamento de uma doença potencialmente rapidamente progressiva.',
  'Clínica Médica', 'Hematologia/Nefrologia', 'Discrasia de plasmócitos', 'Mieloma de cadeia leve versus MGRS', 'dificil', 'International Myeloma Working Group criteria and recommendations for myeloma-related renal impairment.',
  'International Myeloma Working Group criteria and recommendations for myeloma-related renal impairment.', 'IMWG', 2023, 2023, 'IMWG', 'IMWG',
  '1', '{"mieloma múltiplo","cadeia leve","MGRS","biópsia de medula","hipercalcemia","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Hematologia/Nefrologia","Clinica Medica","residencia-geral"}'::text[], '1316ad041a9a0854dafa88bf8ed5aa7da57913bf', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '2c819011-92f9-4d14-a6cc-d6d27bb3758d'::uuid, 'MR26-L4-002', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 72 anos apresenta edema progressivo, hipotensão postural, síndrome nefrótica e dispneia. Albumina: 2,1 g/dL; relação proteína/creatinina urinária: 7,2 g/g; troponina e NT-proBNP elevados; ecocardiograma com espessamento ventricular concêntrico e strain com preservação apical; eletrocardiograma com baixa voltagem. Imunofixação sérica e urinária identifica cadeia leve lambda monoclonal. Qual estratégia diagnóstica inicial é mais adequada?', 'Realizar biópsia endomiocárdica obrigatoriamente como primeiro exame em todos os casos.', 'Realizar aspirado/biópsia de medula óssea associado a aspirado de gordura abdominal com coloração pelo vermelho Congo e tipagem do depósito.', 'Iniciar melfalano imediatamente, sem comprovação tecidual.', 'Solicitar somente cintilografia com pirofosfato; se positiva, considerar excluída amiloidose AL.', 'Diagnosticar amiloidose cardíaca por transtirretina apenas pelo ecocardiograma.',
  'B', 'O quadro sugere amiloidose sistêmica por cadeia leve, com acometimento renal, cardíaco e autonômico. A combinação de medula óssea e gordura abdominal oferece confirmação relativamente pouco invasiva e permite demonstrar depósito amiloide e clone plasmocitário. A tipagem do amiloide é indispensável. Se os sítios menos invasivos forem negativos e a suspeita continuar alta, deve-se biopsiar o órgão acometido, como rim ou coração.',
  'Biópsia cardíaca é altamente diagnóstica, porém não é obrigatoriamente o primeiro sítio quando há alternativas menos invasivas.', 'Correta. Pesquisa simultaneamente o clone e o depósito com menor invasividade.', 'Terapia antiplasmocitária não deve ser iniciada sem confirmação e tipagem adequadas, salvo situação excepcional discutida por equipe especializada.', 'Cintilografia positiva não exclui AL quando há gamopatia monoclonal; nessa situação é necessária confirmação tecidual.', 'A presença de proteína monoclonal e síndrome nefrótica exige excluir AL; ecocardiograma isolado não define o tipo de amiloide.',
  'Clínica Médica', 'Hematologia/Cardiologia/Nefrologia', 'Amiloidose AL', 'Estratégia de confirmação tecidual', 'dificil', 'International Society of Amyloidosis recommendations for diagnosis and typing of systemic amyloidosis.',
  'International Society of Amyloidosis recommendations for diagnosis and typing of systemic amyloidosis.', 'ISA/ESC', 2023, 2023, 'ISA/ESC', 'ISA/ESC',
  '1', '{"amiloidose AL","síndrome nefrótica","cardiomiopatia","vermelho Congo","cadeia leve","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Hematologia/Cardiologia/Nefrologia","Clinica Medica","residencia-geral"}'::text[], '3040db5ca61c853232ff3b656c1042871fc42eda', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '20142349-aa9e-4f2d-a810-d85df342ecaf'::uuid, 'MR26-L4-003', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 74 anos com DRC apresenta fraqueza, potássio sérico de 7,6 mEq/L, ondas T apiculadas difusas e alargamento do QRS. Qual intervenção deve ser realizada primeiro?', 'Insulina regular 10 unidades IV associada a 25 g de glicose, sem cálcio.', 'Furosemida 40 mg IV e observação por 60 minutos.', 'Gluconato de cálcio a 10%, 10 mL IV em 2–5 minutos, com repetição se as alterações eletrocardiográficas persistirem.', 'Hemodiálise antes de qualquer estabilização farmacológica.', 'Poliestirenossulfonato de cálcio 30 g VO como medida isolada.',
  'C', 'Na hipercalemia com alteração eletrocardiográfica, a prioridade é estabilizar a membrana miocárdica. O gluconato de cálcio não reduz o potássio, mas diminui imediatamente o risco de arritmia fatal. Em seguida devem ser aplicadas medidas de deslocamento intracelular, como insulina com glicose, e de remoção do potássio, incluindo diálise quando indicada.',
  'Insulina e glicose reduzem temporariamente o potássio, mas não substituem o cálcio quando há toxicidade elétrica.', 'Diurético pode contribuir para eliminação em pacientes responsivos, porém tem início lento e não protege o miocárdio.', 'Correta. É a intervenção inicial diante de alterações no ECG.', 'A diálise pode ser definitiva, mas o paciente deve ser estabilizado enquanto ela é preparada.', 'Resinas têm ação tardia e não tratam a emergência elétrica.',
  'Clínica Médica', 'Emergência/Nefrologia', 'Hipercalemia', 'Estabilização elétrica e dose', 'dificil', 'UK Kidney Association Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults.',
  'UK Kidney Association Clinical Practice Guideline: Treatment of Acute Hyperkalaemia in Adults.', 'UKKA', 2023, 2023, 'UKKA', 'UKKA',
  '1', '{"hipercalemia","gluconato de cálcio","ECG","emergência","DRC","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Emergência/Nefrologia","Clinica Medica","residencia-geral"}'::text[], '00e8444bd37cad494ea5023489cbd958284c8aba', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '77cb9c14-7858-42a7-a2c9-f8a028c12420'::uuid, 'MR26-L4-004', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 79 anos, em uso de hidroclorotiazida e sertralina, chega com crise convulsiva. Sódio: 116 mEq/L; glicemia: 102 mg/dL; osmolaridade sérica baixa. Qual é a melhor conduta imediata?', 'Tolvaptana 30 mg VO como primeira medida durante a convulsão.', 'Corrigir o sódio para 140 mEq/L nas primeiras seis horas.', 'Solução salina 0,9%, 2 litros em bolus para todas as causas de hiponatremia.', 'Solução salina hipertônica a 3%, 100 mL IV em cerca de 10 minutos, podendo repetir até duas vezes conforme sintomas e sódio.', 'Restrição hídrica isolada e dosagem de sódio em 24 horas.',
  'D', 'Convulsão em contexto de hiponatremia hipotônica é emergência neurológica. A salina hipertônica em bolus busca elevar inicialmente o sódio em aproximadamente 4–6 mEq/L e controlar sintomas, evitando correção excessiva. Devem-se suspender drogas precipitantes e monitorar o sódio frequentemente; em pacientes de alto risco, geralmente se limita a correção total a cerca de 8 mEq/L em 24 horas.',
  'Vaptanas não são terapia de resgate para convulsão hiponatrêmica.', 'Correção rápida e ampla aumenta o risco de síndrome de desmielinização osmótica.', 'Soro fisiológico pode piorar SIADH e não é tratamento universal.', 'Correta. O bolus de salina hipertônica é recomendado para sintomas graves.', 'Restrição hídrica é lenta e inadequada diante de sintomas neurológicos graves.',
  'Clínica Médica', 'Emergência', 'Hiponatremia', 'Sintomas neurológicos graves', 'dificil', 'European Clinical Practice Guideline on Diagnosis and Treatment of Hyponatraemia; U.S. expert guidance.',
  'European Clinical Practice Guideline on Diagnosis and Treatment of Hyponatraemia; U.S. expert guidance.', 'ESICM/ESE/ERA', 2014, 2014, 'ESICM/ESE/ERA', 'ESICM/ESE/ERA',
  '1', '{"hiponatremia","salina hipertônica","convulsão","tiazídico","idoso","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Emergência","Clinica Medica","residencia-geral"}'::text[], '7c9c94d1d6981a18ecb823dc14d5e70d54c8f526', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '8e23fe11-c83f-47c6-a16e-39235e24524c'::uuid, 'MR26-L4-005', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 81 anos iniciou amitriptilina 25 mg à noite para dor neuropática. Três dias depois apresenta confusão aguda, boca seca, midríase, constipação e retenção urinária; temperatura 37,8 °C, frequência cardíaca 112 bpm e QRS de 92 ms. Qual conduta é mais adequada?', 'Prescrever difenidramina 50 mg para controlar a agitação.', 'Iniciar levodopa por suspeita de demência com corpos de Lewy.', 'Administrar fisostigmina rotineiramente em qualquer paciente, independentemente do ECG.', 'Manter amitriptilina e acrescentar clonazepam 2 mg à noite.', 'Suspender a amitriptilina, realizar suporte clínico, tratar retenção urinária e revisar toda a prescrição anticolinérgica.',
  'E', 'O conjunto é típico de toxíndrome anticolinérgica precipitada por antidepressivo tricíclico em idoso. A primeira abordagem é retirar o agente, oferecer suporte e corrigir complicações. Fisostigmina pode ser considerada apenas em intoxicação anticolinérgica grave e bem caracterizada, com monitorização e apoio toxicológico, sendo evitada quando há suspeita de toxicidade por tricíclicos com distúrbio de condução.',
  'Difenidramina também é fortemente anticolinérgica e tende a piorar o quadro.', 'O início abrupto e temporalmente associado ao fármaco favorece delirium tóxico, não doença neurodegenerativa.', 'Fisostigmina não é rotineira e pode ser perigosa em bloqueio de canais de sódio ou QRS alargado.', 'Benzodiazepínico em dose alta pode agravar delirium, quedas e depressão respiratória.', 'Correta. Remove a causa e trata as complicações imediatas.',
  'Clínica Médica', 'Geriatria/Farmacologia', 'Toxíndrome anticolinérgica', 'Amitriptilina em idoso', 'dificil', '2023 American Geriatrics Society Beers Criteria; toxicology guidance for anticholinergic poisoning.',
  '2023 American Geriatrics Society Beers Criteria; toxicology guidance for anticholinergic poisoning.', 'AGS/ACMT', 2023, 2023, 'AGS/ACMT', 'AGS/ACMT',
  '1', '{"idoso","amitriptilina","anticolinérgico","delirium","efeito adverso","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Geriatria/Farmacologia","Clinica Medica","residencia-geral"}'::text[], '267ae66c3060b14c510b511ad42ed82f6a8fa7b9', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'b8835aa1-ba57-4d80-aa0d-eaed37d6d419'::uuid, 'MR26-L4-006', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 83 anos com insuficiência cardíaca e DRC usa digoxina 0,25 mg/dia. Após episódio de desidratação, evolui com náuseas, visão amarelada, bradicardia, bloqueio atrioventricular e potássio de 5,8 mEq/L. Nível de digoxina: 4,6 ng/mL, colhido mais de seis horas após a última dose. Qual tratamento é mais apropriado?', 'Suspender digoxina, corrigir distúrbios e administrar fragmentos Fab antidigoxina diante da toxicidade grave.', 'Realizar hemodiálise para remover rapidamente a digoxina.', 'Prescrever amiodarona em bolus como tratamento universal da bradicardia digitálica.', 'Administrar gluconato de cálcio e liberar após normalização do potássio.', 'Aumentar a dose de digoxina porque a frequência está baixa.',
  'A', 'A paciente apresenta toxicidade digitálica grave, com sintomas típicos, distúrbio de condução e hipercalemia. Fragmentos Fab antidigoxina são indicados em arritmias ameaçadoras, instabilidade ou hipercalemia relevante. Quando a quantidade corporal não pode ser calculada com segurança, protocolos usam dose empírica, frequentemente 3–6 frascos na toxicidade crônica grave, ajustada ao contexto e à resposta.',
  'Correta. O antídoto é indicado pelo risco arrítmico e metabólico.', 'Digoxina tem grande volume de distribuição e não é removida de forma eficaz por hemodiálise.', 'Amiodarona pode aumentar níveis de digoxina e não é tratamento universal para bloqueio/bradicardia.', 'O cálcio pode ser usado em hipercalemia conforme julgamento, mas não neutraliza a digoxina nem substitui o antídoto.', 'A bradicardia é manifestação de toxicidade, não de subdose.',
  'Clínica Médica', 'Cardiologia/Geriatria', 'Intoxicação digitálica', 'DRC e arritmia', 'dificil', 'American Heart Association scientific guidance and clinical toxicology recommendations for digoxin poisoning.',
  'American Heart Association scientific guidance and clinical toxicology recommendations for digoxin poisoning.', 'AHA/ACMT', 2023, 2023, 'AHA/ACMT', 'AHA/ACMT',
  '1', '{"digoxina","idoso","DRC","Fab antidigoxina","hipercalemia","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Cardiologia/Geriatria","Clinica Medica","residencia-geral"}'::text[], '97aa02e4e2a751872b3f207d9a5462837a6f2b82', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '070e133a-8eb3-454b-a40b-b8f10c76ba20'::uuid, 'MR26-L4-007', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 58 anos, sem diabetes ou DRC, apresenta média de pressão arterial domiciliar de 168/102 mmHg em sete dias. Não há sinais de emergência hipertensiva. Qual esquema inicial é mais apropriado, além de mudanças de estilo de vida?', 'Aguardar seis meses apenas com dieta e exercício.', 'Iniciar combinação em comprimido único, por exemplo losartana 50 mg + amlodipino 5 mg VO uma vez ao dia, com reavaliação em cerca de quatro semanas.', 'Usar clonidina 0,2 mg sempre que a pressão ultrapassar 160/100 mmHg.', 'Iniciar propranolol 40 mg 8/8 h como monoterapia obrigatória.', 'Administrar nitroprussiato IV em unidade ambulatorial.',
  'B', 'Pressão persistentemente muito acima da meta geralmente requer início com dois fármacos de classes complementares, preferencialmente em combinação fixa, desde que não haja contraindicação. Um bloqueador do sistema renina-angiotensina associado a antagonista de cálcio ou diurético tiazídico/tiazídico-like é estratégia usual. A dose deve ser titulada conforme resposta, tolerância, função renal e potássio.',
  'A magnitude da elevação torna improvável o controle apenas com medidas não farmacológicas.', 'Correta. Combinação inicial melhora a chance de controle e adesão.', 'Clonidina sob demanda favorece oscilação pressórica e efeitos adversos.', 'Betabloqueador não é primeira escolha universal sem indicação específica.', 'Não há emergência hipertensiva nem indicação de vasodilatador IV.',
  'Clínica Médica', 'Cardiologia', 'Hipertensão arterial', 'Tratamento inicial combinado', 'dificil', '2024 ESC Guidelines for the Management of Elevated Blood Pressure and Hypertension.',
  '2024 ESC Guidelines for the Management of Elevated Blood Pressure and Hypertension.', 'ESC', 2024, 2024, 'ESC', 'ESC',
  '1', '{"hipertensão","combinação inicial","losartana","amlodipino","tratamento","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Cardiologia","Clinica Medica","residencia-geral"}'::text[], 'c6aad5e65f3c2071a18d563d21d6038c4c556f4a', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '46c40401-15cf-4afe-a469-8a052e4ae87d'::uuid, 'MR26-L4-008', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 46 anos usa losartana 100 mg/dia, amlodipino 10 mg/dia e clortalidona 25 mg/dia, mas mantém pressão de 158/96 mmHg. Potássio: 3,0 mEq/L; bicarbonato: 31 mEq/L. Tomografia prévia mostrou nódulo adrenal de 1,5 cm. Qual é o próximo passo mais adequado?', 'Iniciar espironolactona antes de qualquer coleta e dosar aldosterona após três meses.', 'Diagnosticar adenoma produtor apenas pela tomografia e indicar adrenalectomia.', 'Corrigir a hipocalemia, revisar fármacos interferentes quando possível e rastrear com relação aldosterona/renina.', 'Considerar a hipertensão essencial, pois hiperaldosteronismo sempre causa potássio abaixo de 2,0 mEq/L.', 'Solicitar metanefrinas apenas e encerrar investigação se negativas.',
  'C', 'Hipertensão resistente, hipocalemia e alcalose metabólica são fortes indicações para rastrear hiperaldosteronismo primário. A relação aldosterona/renina deve ser interpretada com potássio corrigido e considerando interferências medicamentosas. A imagem não diferencia adequadamente incidentaloma de produção unilateral; após confirmação bioquímica, pode ser necessário teste confirmatório e amostragem venosa adrenal antes da cirurgia.',
  'Antagonistas do receptor mineralocorticoide interferem fortemente na avaliação e, se possível, a coleta deve precedê-los.', 'Nódulos incidentais são comuns e a lateralização não deve se basear apenas na tomografia.', 'Correta. É o rastreamento inicial apropriado.', 'Muitos pacientes com hiperaldosteronismo são normocalêmicos; hipocalemia intensa não é obrigatória.', 'Feocromocitoma é outro diferencial, mas não explica isoladamente o padrão clássico apresentado.',
  'Clínica Médica', 'Endocrinologia/Cardiologia', 'Hipertensão resistente', 'Hiperaldosteronismo primário', 'dificil', 'Endocrine Society Clinical Practice Guideline for Primary Aldosteronism.',
  'Endocrine Society Clinical Practice Guideline for Primary Aldosteronism.', 'Endocrine Society', 2016, 2016, 'Endocrine Society', 'Endocrine Society',
  '1', '{"hipertensão resistente","aldosterona","renina","hipocalemia","adrenal","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Endocrinologia/Cardiologia","Clinica Medica","residencia-geral"}'::text[], 'fe0356bfce220dfab194fdb83c6e5727ce4f78cd', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'd6559709-3d99-4c45-a21d-76e3b5c80526'::uuid, 'MR26-L4-009', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 63 anos com diabetes tipo 2 usa metformina e losartana. HbA1c: 6,8%; TFGe: 38 mL/min/1,73 m²; relação albumina/creatinina urinária: 620 mg/g; potássio: 4,6 mEq/L. Não há história de cetoacidose ou infecção genital recorrente. Qual ajuste oferece maior proteção renal e cardiovascular?', 'Suspender losartana para evitar queda inicial da TFGe com o SGLT2.', 'Iniciar metformina em dose maior, apesar da TFGe reduzida, como única intervenção.', 'Adicionar glibenclamida 5 mg 12/12 h como principal estratégia nefroprotetora.', 'Adicionar empagliflozina 10 mg/dia ou dapagliflozina 10 mg/dia, mantendo o bloqueio do SRAA se tolerado.', 'Não modificar o tratamento porque a HbA1c já está abaixo de 7%.',
  'D', 'Em diabetes tipo 2 com DRC e albuminúria, um inibidor de SGLT2 com benefício comprovado deve ser usado para reduzir progressão renal e eventos cardiovasculares, independentemente da HbA1c. A discreta queda hemodinâmica inicial da TFGe pode ocorrer e não implica, por si só, suspensão. É necessário orientar sobre hidratação, infecções genitais e interrupção temporária em jejum prolongado, cirurgia ou doença aguda com risco de cetoacidose.',
  'SGLT2 e bloqueio do SRAA costumam ser complementares, com monitorização.', 'Metformina não substitui a nefroproteção específica e sua dose exige cautela na DRC.', 'Sulfonilureia aumenta risco de hipoglicemia e não oferece proteção renal comparável.', 'Correta. É terapia modificadora de risco renal e cardiovascular.', 'O benefício cardiorrenal é independente do controle glicêmico atual.',
  'Clínica Médica', 'Endocrinologia/Nefrologia', 'Diabetes tipo 2 e DRC', 'Inibidor de SGLT2', 'dificil', 'American Diabetes Association Standards of Care in Diabetes—2026; KDIGO 2024 CKD Guideline.',
  'American Diabetes Association Standards of Care in Diabetes—2026; KDIGO 2024 CKD Guideline.', 'ADA/KDIGO', 2026, 2026, 'ADA/KDIGO', 'ADA/KDIGO',
  '1', '{"diabetes","DRC","albuminúria","SGLT2","nefroproteção","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Endocrinologia/Nefrologia","Clinica Medica","residencia-geral"}'::text[], '6d091009b55bcdac61c61922aca02d4f045c003f', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '21db0765-5ece-4f1f-a328-3f7ba3d69e57'::uuid, 'MR26-L4-010', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 24 anos com diabetes tipo 1 apresenta glicemia de 520 mg/dL, pH 7,12, bicarbonato 9 mEq/L, cetonemia elevada e potássio de 3,0 mEq/L. Após início de reposição volêmica, qual é a próxima conduta?', 'Iniciar insulina regular IV a 0,1 unidade/kg/h imediatamente, sem potássio.', 'Administrar furosemida para prevenir edema cerebral.', 'Administrar bicarbonato 100 mEq IV como rotina porque o pH é menor que 7,20.', 'Suspender fluidos e iniciar hemodiálise.', 'Repor potássio, geralmente 20–30 mEq/h com monitorização, e adiar a insulina até o potássio ultrapassar aproximadamente 3,5 mEq/L.',
  'E', 'A insulina desloca potássio para o intracelular e pode provocar arritmia fatal quando o potássio já está baixo. Por isso, a reposição de potássio deve preceder a insulina até alcançar nível seguro, com monitorização frequente. Bicarbonato não é rotineiramente indicado nesse pH; costuma ser reservado a acidemia extrema.',
  'Pode agravar rapidamente a hipocalemia e causar arritmia.', 'Diurético não previne edema cerebral e pode piorar a depleção volêmica.', 'Bicarbonato não melhora desfechos na maioria dos casos e pode causar complicações; é reservado a pH muito baixo.', 'O tratamento padrão é clínico, salvo indicação renal específica independente.', 'Correta. A segurança do potássio tem prioridade antes da insulinoterapia.',
  'Clínica Médica', 'Endocrinologia/Emergência', 'Cetoacidose diabética', 'Hipocalemia antes da insulina', 'dificil', '2024 Consensus Report on Hyperglycemic Crises in Adults With Diabetes.',
  '2024 Consensus Report on Hyperglycemic Crises in Adults With Diabetes.', 'ADA/EASD/JBDS/AACE/DTS', 2024, 2024, 'ADA/EASD/JBDS/AACE/DTS', 'ADA/EASD/JBDS/AACE/DTS',
  '1', '{"cetoacidose diabética","potássio","insulina","emergência","diabetes tipo 1","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Endocrinologia/Emergência","Clinica Medica","residencia-geral"}'::text[], 'c0083c15882a8dd2a0c28e03d40ed8c2fd575478', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '5f676972-8ab5-44e7-ac0c-871b71ed35fb'::uuid, 'MR26-L4-011', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 69 anos com DPOC apresenta piora de dispneia e aumento do volume do escarro, sem choque ou necessidade de ventilação invasiva. Após broncodilatadores de curta ação, qual esquema de corticoide é mais apropriado?', 'Prednisona 40 mg VO uma vez ao dia por 5 dias.', 'Não usar corticoide sistêmico em nenhuma exacerbação.', 'Prednisona 5 mg VO por 30 dias.', 'Dexametasona 40 mg VO por 10 dias.', 'Metilprednisolona 1 g IV por 3 dias em toda exacerbação.',
  'A', 'Cursos curtos de corticoide sistêmico reduzem tempo de recuperação e risco de falha terapêutica na exacerbação de DPOC. Prednisona 40 mg/dia por cinco dias é um regime amplamente recomendado. Antibiótico é reservado a pacientes com aumento de purulência associado a maior dispneia/volume de escarro ou necessidade de ventilação, conforme o contexto.',
  'Correta. Oferece benefício com menor exposição cumulativa.', 'Corticoide sistêmico tem benefício em exacerbações moderadas ou graves.', 'Dose baixa e duração prolongada não correspondem ao esquema de exacerbação.', 'Dose excessiva e duração desnecessária.', 'Pulsoterapia não é rotina e aumenta toxicidade.',
  'Clínica Médica', 'Pneumologia', 'Exacerbação de DPOC', 'Corticoide sistêmico', 'dificil', 'GOLD 2026 Global Strategy for Prevention, Diagnosis and Management of COPD.',
  'GOLD 2026 Global Strategy for Prevention, Diagnosis and Management of COPD.', 'GOLD', 2026, 2026, 'GOLD', 'GOLD',
  '1', '{"DPOC","exacerbação","prednisona","dose","corticoide","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Pneumologia","Clinica Medica","residencia-geral"}'::text[], '38a60a22933337034126cf19e042df73a0ad82d0', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'b6bb8eae-7e74-4f94-a98b-fd3acca35c9c'::uuid, 'MR26-L4-012', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 57 anos é internada em enfermaria por pneumonia adquirida na comunidade. Não há fatores de risco para MRSA ou Pseudomonas, nem alergia a betalactâmicos. Qual esquema empírico é adequado?', 'Amoxicilina 500 mg VO uma vez ao dia isoladamente.', 'Ceftriaxona 1–2 g IV a cada 24 horas associada a azitromicina 500 mg VO ou IV uma vez ao dia.', 'Vancomicina e meropenem para todos os pacientes internados.', 'Metronidazol 500 mg 8/8 h como monoterapia.', 'Aguardar cultura de escarro por 72 horas antes de iniciar antibiótico.',
  'B', 'Para paciente hospitalizado fora da UTI sem risco específico de MRSA ou Pseudomonas, a associação de betalactâmico com macrolídeo é um esquema recomendado. A escolha final deve considerar epidemiologia local, alergias, função renal, gravidade e resultados microbiológicos, com descalonamento quando possível.',
  'Dose e espectro são inadequados para o cenário hospitalar descrito.', 'Correta. Cobre pneumococo, outros patógenos típicos e agentes atípicos.', 'Cobertura excessivamente ampla favorece toxicidade e resistência sem indicação.', 'Não cobre adequadamente os principais agentes de pneumonia comunitária.', 'O tratamento não deve ser atrasado em paciente com diagnóstico clínico e radiológico.',
  'Clínica Médica', 'Infectologia/Pneumologia', 'Pneumonia adquirida na comunidade', 'Tratamento hospitalar', 'dificil', 'ATS/IDSA Clinical Practice Guideline for Community-Acquired Pneumonia in Adults.',
  'ATS/IDSA Clinical Practice Guideline for Community-Acquired Pneumonia in Adults.', 'ATS/IDSA', 2019, 2019, 'ATS/IDSA', 'ATS/IDSA',
  '1', '{"pneumonia","ceftriaxona","azitromicina","antibiótico","enfermaria","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Infectologia/Pneumologia","Clinica Medica","residencia-geral"}'::text[], 'a34ea1952efbd01337f10c5bb7433cbd6e98b9ce', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '0dcde54c-ccc1-4c30-a359-43974ca02c43'::uuid, 'MR26-L4-013', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 62 anos apresenta dispneia súbita, síncope, pressão de 78/46 mmHg e hipoxemia. Angiotomografia mostra embolia pulmonar bilateral extensa e ecocardiograma evidencia disfunção grave de ventrículo direito. Não há contraindicação conhecida à trombólise. Qual é a melhor estratégia?', 'Inserir filtro de veia cava como terapia definitiva, sem anticoagulação ou reperfusão.', 'Administrar diurético em altas doses para reduzir a pressão do ventrículo direito.', 'Trombólise sistêmica, por exemplo alteplase 100 mg IV em 2 horas, associada ao suporte hemodinâmico e planejamento de anticoagulação.', 'Aguardar 24 horas para repetir troponina antes de tratar.', 'Apenas apixabana VO e alta após seis horas.',
  'C', 'Embolia pulmonar com choque ou hipotensão persistente é de alto risco e exige estratégia de reperfusão, geralmente trombólise sistêmica quando não há contraindicação. Se a trombólise for contraindicada ou falhar, devem ser considerados tratamento por cateter ou embolectomia cirúrgica, conforme disponibilidade e equipe multidisciplinar.',
  'Filtro não remove o trombo atual e é reservado principalmente a contraindicação absoluta à anticoagulação.', 'Diurese excessiva pode reduzir pré-carga e piorar o choque obstrutivo.', 'Correta. A instabilidade hemodinâmica define necessidade de reperfusão urgente.', 'Atrasar reperfusão aumenta risco de morte.', 'Paciente instável não é candidata a tratamento ambulatorial.',
  'Clínica Médica', 'Cardiologia/Emergência', 'Embolia pulmonar', 'Reperfusão no choque', 'dificil', '2026 AHA/ACC Multisociety Guideline for Evaluation and Management of Acute Pulmonary Embolism in Adults.',
  '2026 AHA/ACC Multisociety Guideline for Evaluation and Management of Acute Pulmonary Embolism in Adults.', 'AHA/ACC', 2026, 2026, 'AHA/ACC', 'AHA/ACC',
  '1', '{"embolia pulmonar","choque","alteplase","trombólise","ventrículo direito","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Cardiologia/Emergência","Clinica Medica","residencia-geral"}'::text[], '232e1ae64ecb071b7a114f6b1bda8f5e21f512c3', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '4d37fb68-580b-4310-ac0f-770e70a58eb7'::uuid, 'MR26-L4-014', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 65 anos com pielonefrite recebe antibiótico e reposição inicial de cristaloide, mas mantém pressão arterial média de 55 mmHg, extremidades frias e lactato de 4,2 mmol/L. Qual é o vasopressor de primeira escolha?', 'Nitroprussiato de sódio para reduzir pós-carga.', 'Fenilefrina como agente universal de primeira linha.', 'Dopamina em alta dose para todos os pacientes.', 'Noradrenalina IV, iniciada em dose baixa como 0,05–0,1 mcg/kg/min e titulada para pressão arterial média em torno de 65 mmHg.', 'Dobutamina isolada, sem vasopressor.',
  'D', 'A noradrenalina é o vasopressor inicial preferido no choque séptico. Pode ser iniciada precocemente, inclusive por acesso periférico proximal bem monitorado enquanto se organiza acesso definitivo. A reposição volêmica deve ser individualizada e reavaliada por perfusão, responsividade a fluidos e risco de sobrecarga.',
  'Vasodilatador pioraria a hipotensão.', 'Fenilefrina pode reduzir débito cardíaco e não é agente universal.', 'Dopamina causa mais arritmias e fica reservada a situações selecionadas.', 'Correta. Tem melhor perfil de eficácia e segurança como primeira linha.', 'Dobutamina é inotrópico e pode ser adicionada em disfunção miocárdica, mas não corrige sozinha a vasoplegia.',
  'Clínica Médica', 'Emergência/Terapia Intensiva', 'Choque séptico', 'Vasopressor inicial', 'dificil', 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026.',
  'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2026.', 'SCCM/ESICM', 2026, 2026, 'SCCM/ESICM', 'SCCM/ESICM',
  '1', '{"sepse","choque séptico","noradrenalina","vasopressor","PAM","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Emergência/Terapia Intensiva","Clinica Medica","residencia-geral"}'::text[], 'bdb171e8cd6cfa92fc7fee7750c728227657fd10', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '66fb12a6-8efa-41df-ac09-13f62f0014b4'::uuid, 'MR26-L4-015', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 73 anos apresenta cefaleia temporal nova, claudicação de mandíbula, VHS de 96 mm/h e perda visual monocular transitória. Fundoscopia sugere neuropatia óptica isquêmica. Qual é a conduta imediata mais apropriada?', 'Usar apenas ácido acetilsalicílico 100 mg/dia.', 'Aguardar biópsia de artéria temporal antes de iniciar qualquer tratamento.', 'Iniciar metotrexato isoladamente como terapia de resgate visual.', 'Iniciar prednisona 5 mg/dia e reavaliar em 30 dias.', 'Iniciar metilprednisolona 500–1.000 mg IV ao dia por 3 dias, seguida de glicocorticoide oral, e providenciar confirmação diagnóstica sem atrasar o tratamento.',
  'E', 'Sintomas visuais indicam risco de cegueira irreversível e exigem glicocorticoide imediato. A biópsia ou ultrassonografia vascular deve ser organizada, mas o tratamento não deve aguardar. Em doença sem ameaça visual, glicocorticoide oral em alta dose costuma ser suficiente; com perda visual ou amaurose fugaz, pulsoterapia IV é frequentemente recomendada.',
  'Antiagregação não substitui imunossupressão.', 'O atraso pode resultar em perda visual bilateral permanente.', 'Metotrexato pode ter papel poupador de corticoide, mas não age rápido o suficiente isoladamente.', 'Dose insuficiente para doença ativa com ameaça visual.', 'Correta. Prioriza prevenção de dano isquêmico irreversível.',
  'Clínica Médica', 'Reumatologia/Oftalmologia', 'Arterite de células gigantes', 'Ameaça visual', 'dificil', '2021 ACR/Vasculitis Foundation Guideline for Giant Cell Arteritis and Takayasu Arteritis.',
  '2021 ACR/Vasculitis Foundation Guideline for Giant Cell Arteritis and Takayasu Arteritis.', 'ACR/VF', 2021, 2021, 'ACR/VF', 'ACR/VF',
  '1', '{"arterite temporal","perda visual","metilprednisolona","biópsia","idoso","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Reumatologia/Oftalmologia","Clinica Medica","residencia-geral"}'::text[], '81d10f5dc1ed32bb932ef369059da474fcfe1604', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'edef7e5f-046a-4f73-a9bf-1b2fc4137d76'::uuid, 'MR26-L4-016', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Paciente com ascite realiza paracentese. Albumina sérica: 3,2 g/dL; albumina do líquido ascítico: 1,8 g/dL; proteínas totais do líquido: 1,1 g/dL. Como interpretar o gradiente de albumina soro-ascite (GASA)?', 'GASA de 1,4 g/dL, compatível com hipertensão portal.', 'O GASA depende da contagem de neutrófilos e não pode ser calculado.', 'GASA de 1,4 g/dL, que exclui hipertensão portal.', 'GASA de 3,0 g/dL, diagnóstico de peritonite bacteriana espontânea.', 'GASA de 0,6 g/dL, compatível com carcinomatose.',
  'A', 'O GASA é calculado subtraindo a albumina do líquido ascítico da albumina sérica: 3,2 − 1,8 = 1,4 g/dL. Valor igual ou superior a 1,1 g/dL sugere ascite relacionada à hipertensão portal. A proteína total do líquido ajuda no refinamento etiológico, mas não altera o cálculo do gradiente.',
  'Correta. O gradiente é 1,4 g/dL e favorece hipertensão portal.', 'A contagem celular é importante para infecção, mas não para calcular o GASA.', 'A interpretação está invertida.', 'PBE é definida principalmente por neutrófilos no líquido ascítico, não pelo GASA.', 'O cálculo está errado.',
  'Clínica Médica', 'Hepatologia', 'Ascite', 'Gradiente albumina soro-ascite', 'facil', 'AASLD Practice Guidance on Ascites and Cirrhosis.',
  'AASLD Practice Guidance on Ascites and Cirrhosis.', 'AASLD', 2021, 2021, 'AASLD', 'AASLD',
  '1', '{"GASA","ascite","hipertensão portal","paracentese","cirrose","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Hepatologia","Clinica Medica","residencia-geral"}'::text[], 'af7cd54a179a6a6c02069afa9061a3c814965041', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '45f3e4a1-bbe8-4661-a4a8-c7a5c96bfd34'::uuid, 'MR26-L4-017', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Paciente apresenta derrame pleural. Proteína pleural: 3,6 g/dL; proteína sérica: 6,0 g/dL; LDH pleural: 210 U/L; LDH sérica: 300 U/L; limite superior normal da LDH sérica: 240 U/L. Qual é a classificação pelo critério de Light?', 'Transudato, porque o LDH pleural é menor que o sérico.', 'Exsudato, pois a relação proteína pleural/sérica é 0,60 e a relação LDH pleural/sérica é 0,70.', 'Exsudato apenas se a cultura for positiva.', 'Transudato, porque o pH não foi informado.', 'Não pode ser classificado sem dosagem de glicose pleural.',
  'B', 'Basta um dos critérios de Light para classificar como exsudato. Neste caso, a relação de proteínas é 0,60, acima de 0,5, e a relação de LDH é 0,70, acima de 0,6. O diagnóstico etiológico exige integração clínica e outros exames.',
  'Comparar valores absolutos de LDH não é o método do critério de Light.', 'Correta. A relação de proteínas já define exsudato.', 'Cultura positiva define infecção, não a classificação bioquímica.', 'pH auxilia na decisão de drenagem em derrame parapneumônico, não na classificação inicial de Light.', 'Glicose pode ajudar no diagnóstico diferencial, mas não é necessária para Light.',
  'Clínica Médica', 'Pneumologia', 'Derrame pleural', 'Critérios de Light', 'facil', 'British Thoracic Society Guideline for Pleural Disease; Light criteria.',
  'British Thoracic Society Guideline for Pleural Disease; Light criteria.', 'BTS', 2023, 2023, 'BTS', 'BTS',
  '1', '{"derrame pleural","Light","exsudato","proteína","LDH","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Pneumologia","Clinica Medica","residencia-geral"}'::text[], '60c7be3fafbb0835786a6987bf91e00be9a9532c', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '9e9e30e6-97c5-4fe2-aff7-69ed6ef7209f'::uuid, 'MR26-L4-018', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 49 anos com prótese valvar apresenta febre há duas semanas, novo sopro e fenômenos embólicos periféricos. Está hemodinamicamente estável e não recebeu antibióticos. Qual é a melhor conduta inicial?', 'Iniciar antibiótico e coletar uma hemocultura após 48 horas.', 'Coletar cultura apenas da ponta de um cateter periférico.', 'Coletar três conjuntos de hemoculturas de punções separadas antes do antibiótico e iniciar terapia empírica após a coleta.', 'Prescrever amoxicilina VO e acompanhar ambulatorialmente.', 'Aguardar ecocardiograma transesofágico por uma semana antes de coletar culturas.',
  'C', 'Em paciente estável com suspeita de endocardite, múltiplos conjuntos de hemoculturas devem ser obtidos antes do antibiótico para maximizar o diagnóstico microbiológico. Em instabilidade ou sepse, a coleta deve ser rápida e não pode atrasar o tratamento. Prótese valvar aumenta a necessidade de ecocardiografia transesofágica e abordagem especializada.',
  'Antibiótico prévio reduz a positividade das culturas.', 'Cultura de ponta de cateter não substitui hemoculturas periféricas.', 'Correta. Preserva o rendimento microbiológico e permite direcionar o tratamento.', 'O cenário é de alto risco e exige avaliação hospitalar.', 'Ecocardiografia é essencial, mas não deve atrasar a coleta microbiológica.',
  'Clínica Médica', 'Infectologia/Cardiologia', 'Endocardite infecciosa', 'Hemoculturas antes do antibiótico', 'dificil', '2023 ESC Guidelines for the Management of Endocarditis.',
  '2023 ESC Guidelines for the Management of Endocarditis.', 'ESC', 2023, 2023, 'ESC', 'ESC',
  '1', '{"endocardite","hemocultura","prótese valvar","antibiótico","ecocardiograma","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Infectologia/Cardiologia","Clinica Medica","residencia-geral"}'::text[], 'd36b4bccb141f1aae47ced88f7c8e66a3893d551', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '85d23223-67ee-4d7c-ae19-67138c32049f'::uuid, 'MR26-L4-019', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 86 anos internada por fratura de fêmur desenvolve desatenção flutuante, inversão do ciclo sono-vigília e agitação após receber difenidramina, tramadol e diazepam. Qual abordagem é mais adequada?', 'Administrar diazepam 10 mg 6/6 h para qualquer delirium.', 'Diagnosticar demência irreversível e iniciar donepezila.', 'Manter todas as medicações e conter fisicamente de forma contínua.', 'Suspender ou reduzir fármacos precipitantes, tratar dor e causas orgânicas, promover orientação, mobilização e sono; evitar benzodiazepínicos salvo abstinência.', 'Solicitar ressonância de crânio antes de corrigir fatores clínicos evidentes.',
  'D', 'Delirium é agudo, flutuante e frequentemente multifatorial. Em idosos, anticolinérgicos, opioides e benzodiazepínicos são precipitantes comuns. O tratamento prioritário é identificar e corrigir causas, revisar medicamentos e aplicar medidas não farmacológicas. Antipsicótico em baixa dose pode ser considerado apenas quando há risco grave e após avaliação individual.',
  'Benzodiazepínicos podem piorar delirium, exceto em abstinência de álcool ou sedativos.', 'Demência não costuma surgir de forma abrupta e flutuante.', 'Contenção contínua piora agitação, imobilidade e complicações.', 'Correta. Atua nas causas e reduz iatrogenia.', 'Imagem pode ser indicada em casos selecionados, mas não deve atrasar correções imediatas.',
  'Clínica Médica', 'Geriatria', 'Delirium', 'Medicamentos precipitantes', 'dificil', '2023 AGS Beers Criteria and NICE guideline on delirium.',
  '2023 AGS Beers Criteria and NICE guideline on delirium.', 'AGS/NICE', 2023, 2023, 'AGS/NICE', 'AGS/NICE',
  '1', '{"delirium","idoso","difenidramina","benzodiazepínico","iatrogenia","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Geriatria","Clinica Medica","residencia-geral"}'::text[], '1179897232b7cab4bbad77cd7e5c9363bfc0d5d4', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '5ed5cd1b-7d4a-4d88-a7b4-48c3e7e4c603'::uuid, 'MR26-L4-020', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 76 anos com DRC, em uso de morfina, é encontrado sonolento, com pupilas puntiformes, frequência respiratória de 6 irpm e saturação de 82%. Há pulso presente. Qual é a melhor intervenção farmacológica inicial, além de ventilação e suporte de via aérea?', 'Atropina 1 mg IV como antídoto específico.', 'Carvão ativado por via oral durante o rebaixamento.', 'Haloperidol 5 mg IM para despertar o paciente.', 'Flumazenil 0,2 mg IV.', 'Naloxona 0,04–0,4 mg IV, titulada para restaurar ventilação adequada, repetindo e escalonando conforme resposta.',
  'E', 'O objetivo da naloxona é reverter depressão respiratória, não necessariamente produzir despertar completo. Em usuários crônicos, doses iniciais menores reduzem precipitação de abstinência intensa; podem ser repetidas e aumentadas. Como a duração da naloxona pode ser menor que a do opioide, é necessária observação e, em alguns casos, infusão contínua.',
  'Atropina não reverte depressão respiratória por opioide.', 'Há risco de aspiração e benefício improvável nesse cenário.', 'Não trata a causa e pode aumentar complicações.', 'Flumazenil antagoniza benzodiazepínicos e pode provocar convulsões em situações selecionadas.', 'Correta. É o antídoto específico e deve ser titulado à ventilação.',
  'Clínica Médica', 'Emergência/Toxicologia', 'Intoxicação por opioide', 'Naloxona titulada', 'dificil', 'American Heart Association Guidelines for Opioid-Associated Emergency; toxicology guidance.',
  'American Heart Association Guidelines for Opioid-Associated Emergency; toxicology guidance.', 'AHA/ACMT', 2025, 2025, 'AHA/ACMT', 'AHA/ACMT',
  '1', '{"opioide","naloxona","depressão respiratória","idoso","DRC","authorial-batch","authorial-published","authorial_prediction","Clínica Médica","Emergência/Toxicologia","Clinica Medica","residencia-geral"}'::text[], '18504f35d0d149fd2f91ee9a4845c7713fe45198', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '2ff61f21-8b33-40ed-a103-56b15d58c620'::uuid, 'MR26-L4-021', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 71 anos apresenta febre, icterícia, dor em hipocôndrio direito, pressão de 86/54 mmHg e confusão. Bilirrubina total: 8,2 mg/dL; ultrassonografia mostra colédoco dilatado com cálculo distal. Qual é a conduta prioritária após estabilização inicial?', 'Antibiótico de amplo espectro e drenagem biliar urgente, preferencialmente por CPRE.', 'Prescrever ácido ursodesoxicólico e alta.', 'Colecistectomia eletiva em seis meses, sem antibiótico.', 'Aguardar resolução espontânea do cálculo por 72 horas.', 'Realizar apenas ressonância de vias biliares, mesmo com choque.',
  'A', 'O caso representa colangite grave com disfunção orgânica. Além de ressuscitação e antibiótico, o controle de fonte por drenagem biliar urgente é determinante, geralmente por CPRE. Quando CPRE não está disponível ou falha, devem ser consideradas drenagem percutânea ou cirurgia conforme o cenário.',
  'Correta. Combina tratamento da sepse com descompressão da via biliar.', 'Não trata infecção nem obstrução aguda.', 'A cirurgia definitiva pode ser planejada depois, mas não resolve a obstrução séptica imediata.', 'Atraso na drenagem aumenta mortalidade.', 'Imagem adicional não deve postergar o controle de fonte em paciente instável com diagnóstico provável.',
  'Cirurgia', 'Cirurgia Geral/Gastroenterologia', 'Colangite aguda', 'Drenagem biliar', 'dificil', 'Tokyo Guidelines 2018 for Acute Cholangitis and Cholecystitis.',
  'Tokyo Guidelines 2018 for Acute Cholangitis and Cholecystitis.', 'Tokyo Guidelines', 2018, 2018, 'Tokyo Guidelines', 'Tokyo Guidelines',
  '1', '{"colangite","CPRE","choque séptico","drenagem biliar","coledocolitíase","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Geral/Gastroenterologia","residencia-geral"}'::text[], '644ff36f250a7eda8418c710810edc692b9cb266', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '4706e7cf-44a7-42e3-aed2-a8e0828cf430'::uuid, 'MR26-L4-022', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 45 anos apresenta dor em hipocôndrio direito há 24 horas, febre baixa, leucocitose, sinal de Murphy e ultrassonografia com cálculos, espessamento da parede e líquido pericolecístico. Está estável e tem baixo risco operatório. Qual estratégia é preferida?', 'Antibiótico por 14 dias e colecistectomia obrigatoriamente após três meses.', 'Colecistectomia laparoscópica precoce durante a mesma internação.', 'Colecistostomia percutânea como primeira escolha em paciente jovem e estável.', 'CPRE de rotina antes da cirurgia, mesmo sem sinais de coledocolitíase.', 'Alta apenas com analgésico.',
  'B', 'Em colecistite aguda não complicada e paciente operável, a colecistectomia laparoscópica precoce na internação reduz recorrência e novas internações, sem necessidade de esperar a inflamação desaparecer. Antibiótico e suporte são complementares, não substitutos da cirurgia definitiva.',
  'A abordagem tardia expõe a recorrência e não é obrigatória.', 'Correta. É a estratégia padrão em paciente estável e com risco cirúrgico aceitável.', 'Colecistostomia é opção para pacientes graves ou sem condição cirúrgica.', 'CPRE é indicada quando há probabilidade de cálculo no colédoco, não de rotina.', 'Há inflamação vesicular objetiva e necessidade de tratamento definitivo.',
  'Cirurgia', 'Cirurgia Geral', 'Colecistite aguda', 'Colecistectomia precoce', 'dificil', 'WSES 2020 Guidelines for Acute Calculous Cholecystitis.',
  'WSES 2020 Guidelines for Acute Calculous Cholecystitis.', 'WSES', 2020, 2020, 'WSES', 'WSES',
  '1', '{"colecistite","laparoscopia","cirurgia precoce","vesícula","Murphy","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Geral","residencia-geral"}'::text[], '5d747f9dc2483b124c6b4afdb5afbd4b249cd2bf', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'aeb09bca-382a-4a27-a8e4-1ed227ca04a7'::uuid, 'MR26-L4-023', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 78 anos com fibrilação atrial sem anticoagulação apresenta dor abdominal súbita e intensa, desproporcional ao exame físico, lactato de 3,8 mmol/L e discreta distensão. Está hemodinamicamente estável. Qual é o próximo exame?', 'Colonoscopia eletiva após preparo intestinal.', 'Radiografia de abdome normal exclui isquemia.', 'Angiotomografia de abdome com contraste arterial sem atraso.', 'Ultrassonografia abdominal simples como exame definitivo.', 'Aguardar peritonite para indicar imagem.',
  'C', 'A isquemia mesentérica deve ser reconhecida antes do desenvolvimento de necrose e peritonite. A angiotomografia é o exame de escolha em paciente estável, permitindo identificar oclusão arterial, trombose venosa ou sinais de hipoperfusão. A suspeita clínica também justifica ressuscitação, antibiótico e avaliação cirúrgica/vascular imediata.',
  'Colonoscopia pode atrasar o diagnóstico e não avalia adequadamente artérias mesentéricas.', 'Radiografia pode ser normal nas fases iniciais.', 'Correta. É rápida e define anatomia e estratégia de reperfusão.', 'Ultrassom tem limitações importantes na emergência.', 'Esperar peritonite significa permitir progressão para necrose intestinal.',
  'Cirurgia', 'Cirurgia Vascular/Emergência', 'Isquemia mesentérica aguda', 'Angiotomografia', 'dificil', 'World Society of Emergency Surgery Guidelines for Acute Mesenteric Ischemia.',
  'World Society of Emergency Surgery Guidelines for Acute Mesenteric Ischemia.', 'WSES', 2022, 2022, 'WSES', 'WSES',
  '1', '{"isquemia mesentérica","dor desproporcional","angio-TC","fibrilação atrial","emergência","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Vascular/Emergência","residencia-geral"}'::text[], 'b1aa4e2a2198b28e73a1d53bf11b2f9945486263', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '5edefb13-1bd4-44ce-aae6-e0f3e5ac4f71'::uuid, 'MR26-L4-024', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 64 anos com cirurgia abdominal prévia apresenta vômitos, distensão e parada de eliminação de gases. Tomografia mostra alça fechada, redução do realce da parede, líquido mesentérico e pneumatoses. Qual é a melhor conduta?', 'Sonda nasogástrica e observação por cinco dias obrigatoriamente.', 'Realizar colonoscopia descompressiva como primeira medida.', 'Administrar laxativo osmótico.', 'Laparotomia ou laparoscopia urgente, com ressuscitação e antibiótico, por suspeita de isquemia/estrangulamento.', 'Alta com dieta líquida.',
  'D', 'Alça fechada com hipo realce, líquido mesentérico e pneumatoses sugere comprometimento vascular. Nessa situação, o tratamento conservador pode atrasar a ressecção de intestino inviável. A exploração cirúrgica urgente deve ocorrer após medidas simultâneas de estabilização.',
  'Observação é aceitável apenas quando não há sinais de isquemia, peritonite ou deterioração.', 'Colonoscopia é usada em cenários específicos, como vólvulo de sigmoide sem isquemia, não em alça delgada estrangulada.', 'Pode agravar distensão e não resolve obstrução mecânica.', 'Correta. Há sinais radiológicos de estrangulamento e possível necrose.', 'Conduta insegura.',
  'Cirurgia', 'Cirurgia Geral', 'Obstrução intestinal', 'Sinais de estrangulamento', 'dificil', 'Bologna Guidelines for Adhesive Small Bowel Obstruction; WSES.',
  'Bologna Guidelines for Adhesive Small Bowel Obstruction; WSES.', 'WSES', 2018, 2018, 'WSES', 'WSES',
  '1', '{"obstrução intestinal","estrangulamento","alça fechada","pneumatose","cirurgia urgente","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Geral","residencia-geral"}'::text[], '946c60b9ac68ba4099ad4742c3b0241defff3f3e', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'c8ea2ef6-b10e-45a7-aba1-338a7ddd6549'::uuid, 'MR26-L4-025', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 56 anos apresenta pancreatite aguda biliar, febre, icterícia crescente e colédoco de 12 mm com cálculo impactado. Bilirrubina: 7,4 mg/dL. Qual é a conduta?', 'Iniciar nutrição parenteral total e evitar alimentação enteral.', 'Aguardar quatro semanas para qualquer intervenção.', 'CPRE de rotina em toda pancreatite biliar, mesmo sem obstrução ou colangite.', 'Colecistectomia isolada imediata sem tratar a obstrução do colédoco.', 'CPRE urgente, idealmente nas primeiras 24 horas, devido à colangite/obstrução biliar persistente.',
  'E', 'Na pancreatite biliar com colangite ou obstrução persistente, a CPRE precoce é indicada para descompressão. Na ausência desses achados, CPRE urgente de rotina não melhora desfechos. Após resolução do episódio leve, a colecistectomia deve ocorrer na mesma internação para prevenir recorrência.',
  'Alimentação enteral precoce é preferível quando tolerada.', 'Atraso prolonga a sepse e a obstrução.', 'Sem colangite ou obstrução, a CPRE rotineira é desnecessária e pode causar complicações.', 'A obstrução infectada deve ser abordada antes ou em coordenação com o tratamento definitivo.', 'Correta. Há indicação clínica e radiológica de drenagem urgente.',
  'Cirurgia', 'Gastroenterologia/Cirurgia', 'Pancreatite aguda biliar', 'Indicação de CPRE', 'dificil', 'ACG Guideline for Management of Acute Pancreatitis; WSES guidance.',
  'ACG Guideline for Management of Acute Pancreatitis; WSES guidance.', 'ACG/WSES', 2024, 2024, 'ACG/WSES', 'ACG/WSES',
  '1', '{"pancreatite biliar","CPRE","colangite","coledocolitíase","obstrução","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Gastroenterologia/Cirurgia","residencia-geral"}'::text[], '0fa6ec7a6d34e11649ee54c88e8d3916135e4038', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'cb2e4055-de96-4b80-a955-310ac90d8fae'::uuid, 'MR26-L4-026', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Após trauma torácico, homem de 32 anos apresenta dispneia extrema, hipotensão, turgência jugular, ausência de murmúrio vesicular à direita e desvio traqueal. Qual é a conduta imediata?', 'Descompressão torácica imediata, preferencialmente toracostomia digital ou agulha em local recomendado, seguida de drenagem torácica.', 'Administrar apenas 2 litros de cristaloide.', 'Aguardar radiografia de tórax para confirmar.', 'Realizar tomografia antes de intervir.', 'Iniciar ventilação não invasiva sem descompressão.',
  'A', 'Pneumotórax hipertensivo é diagnóstico clínico e causa choque obstrutivo. A descompressão não pode esperar imagem. Em muitos protocolos, a toracostomia digital no 4º ou 5º espaço intercostal em linha axilar é preferida em trauma grave; quando se usa agulha, deve-se escolher dispositivo longo e local adequado, seguido de dreno definitivo.',
  'Correta. Trata imediatamente a causa do choque.', 'Fluido não resolve a pressão intratorácica elevada.', 'Imagem atrasaria uma intervenção salvadora.', 'Tomografia é incompatível com a instabilidade.', 'Pressão positiva pode piorar rapidamente o choque.',
  'Cirurgia', 'Trauma', 'Pneumotórax hipertensivo', 'Descompressão imediata', 'dificil', 'Advanced Trauma Life Support, 11th edition.',
  'Advanced Trauma Life Support, 11th edition.', 'ACS', 2023, 2023, 'ACS', 'ACS',
  '1', '{"pneumotórax hipertensivo","trauma","toracostomia","choque obstrutivo","dreno","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Trauma","residencia-geral"}'::text[], 'd6515c54dc324782c5f5fdc25dac51d15dfae139', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '4d8a65f1-9dad-4112-a59d-c64705f84023'::uuid, 'MR26-L4-027', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 29 anos sofre fratura exposta de tíbia com extensa contaminação e lesão de partes moles. Qual pacote inicial é mais adequado?', 'Administrar corticoide para reduzir edema.', 'Antibiótico IV o mais cedo possível, cobertura para gram-positivos e ampliação conforme grau/contaminação, profilaxia antitetânica, irrigação, estabilização e desbridamento cirúrgico.', 'Aguardar cultura da ferida antes de administrar antibiótico.', 'Prescrever cefalexina VO e liberar.', 'Fechar a pele na emergência sem desbridamento.',
  'B', 'Na fratura exposta, antibiótico precoce reduz infecção e deve ser iniciado idealmente na primeira hora. Cefazolina é base frequente para cobertura gram-positiva; lesões graves ou contaminadas exigem ampliação conforme protocolo local, ambiente e alergias. O tratamento inclui profilaxia do tétano, estabilização e desbridamento adequado.',
  'Corticoide não trata a contaminação e pode prejudicar resposta imune.', 'Correta. Integra prevenção de infecção e controle cirúrgico da contaminação.', 'Culturas superficiais iniciais não devem atrasar antibiótico.', 'Tratamento oral isolado é insuficiente para lesão grave.', 'Fechamento sem desbridamento retém tecido desvitalizado e contaminação.',
  'Cirurgia', 'Ortopedia/Trauma', 'Fratura exposta', 'Antibiótico precoce', 'dificil', 'AAOS Clinical Practice Guideline: Prevention of Surgical Site Infections After Major Extremity Trauma.',
  'AAOS Clinical Practice Guideline: Prevention of Surgical Site Infections After Major Extremity Trauma.', 'AAOS', 2022, 2022, 'AAOS', 'AAOS',
  '1', '{"fratura exposta","antibiótico","desbridamento","tétano","trauma","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Ortopedia/Trauma","residencia-geral"}'::text[], '4e9a6db905950bee58232a32630f151d21c743a2', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'afd98bc1-4862-4c78-a69e-418637a7fe45'::uuid, 'MR26-L4-028', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Adolescente de 15 anos apresenta dor testicular súbita há três horas, náuseas, testículo elevado e reflexo cremastérico ausente. A ultrassonografia não está imediatamente disponível. Qual é a conduta?', 'Prescrever anti-inflamatório e reavaliar em uma semana.', 'Tratar como epididimite com ciprofloxacino e observar.', 'Exploração escrotal urgente com destorção e orquidopexia bilateral.', 'Realizar punção testicular.', 'Aguardar ultrassonografia no dia seguinte.',
  'C', 'A apresentação é altamente sugestiva de torção testicular, emergência tempo-dependente. Quando a suspeita clínica é alta, a imagem não deve atrasar a exploração. O testículo contralateral também é fixado devido à predisposição anatômica bilateral.',
  'Conduta expectante é inadequada.', 'Epididimite costuma ter início mais gradual e reflexo preservado.', 'Correta. Maximiza a chance de salvamento testicular.', 'Punção não trata a torção.', 'Atraso reduz drasticamente a viabilidade.',
  'Cirurgia', 'Urologia', 'Torção testicular', 'Exploração sem atraso', 'facil', 'European Association of Urology Guidelines on Paediatric Urology.',
  'European Association of Urology Guidelines on Paediatric Urology.', 'EAU', 2025, 2025, 'EAU', 'EAU',
  '1', '{"torção testicular","orquidopexia","dor escrotal","adolescente","emergência","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Urologia","residencia-geral"}'::text[], '0da7e67d605d942e17f9850b8c88685c4e28884b', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '522e2002-6673-4701-ae49-f10dbf7cec60'::uuid, 'MR26-L4-029', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Homem de 75 anos com aneurisma conhecido apresenta dor abdominal e lombar, massa pulsátil e pressão de 78/50 mmHg. Ultrassom à beira leito confirma aneurisma com líquido livre. Qual abordagem é mais adequada?', 'Infundir cristaloide até pressão sistólica de 180 mmHg antes de chamar a cirurgia.', 'Solicitar colonoscopia.', 'Observar por seis horas para confirmar estabilidade.', 'Ativar reparo emergencial aberto ou endovascular, usar ressuscitação hemostática e evitar elevar excessivamente a pressão antes do controle do sangramento.', 'Administrar trombolítico sistêmico.',
  'D', 'A ruptura de aneurisma exige controle hemorrágico imediato. A ressuscitação deve equilibrar perfusão e risco de aumentar o sangramento, com estratégia de hipotensão permissiva em pacientes conscientes sem trauma craniano, hemoderivados quando necessários e encaminhamento direto para reparo.',
  'Pressão excessiva antes do clampeamento pode aumentar hemorragia.', 'Não tem papel no diagnóstico ou tratamento imediato.', 'A mortalidade aumenta com atraso.', 'Correta. Prioriza controle de fonte e ressuscitação hemostática.', 'Trombólise agravaria a hemorragia.',
  'Cirurgia', 'Cirurgia Vascular', 'Aneurisma de aorta abdominal roto', 'Controle de hemorragia', 'dificil', 'European Society for Vascular Surgery Clinical Practice Guidelines on Abdominal Aorto-iliac Aneurysms.',
  'European Society for Vascular Surgery Clinical Practice Guidelines on Abdominal Aorto-iliac Aneurysms.', 'ESVS', 2024, 2024, 'ESVS', 'ESVS',
  '1', '{"aneurisma roto","aorta abdominal","choque hemorrágico","reparo endovascular","hipotensão permissiva","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Vascular","residencia-geral"}'::text[], 'a87e1c0bd2bd1c094c2d0ef98d1d902671301f02', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '876f827c-d537-47f6-a99a-243aaf1ae865'::uuid, 'MR26-L4-030', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'No quinto dia após colectomia, paciente apresenta febre, taquicardia, dor abdominal difusa e oligúria. Tomografia mostra coleção de 9 cm com extravasamento de contraste junto à anastomose. Qual é a melhor conduta?', 'Realizar colonoscopia com preparo completo antes de tratar a sepse.', 'Iniciar corticoide em alta dose.', 'Apenas ampliar analgesia e repetir tomografia em sete dias.', 'Prescrever antibiótico oral e alta.', 'Ressuscitação, antibiótico de amplo espectro e controle urgente de fonte por drenagem e/ou reoperação conforme estabilidade e anatomia.',
  'E', 'Deiscência anastomótica com sepse e extravasamento exige controle de fonte. Paciente instável ou com peritonite geralmente necessita reoperação; coleções bem delimitadas em pacientes estáveis podem ser drenadas percutaneamente, associadas a antibiótico e vigilância estreita. A decisão é anatômica e fisiológica, não apenas radiológica.',
  'Preparo e colonoscopia podem piorar o quadro e não substituem o controle de fonte.', 'Imunossupressão pode agravar infecção.', 'Atraso permite progressão para choque e falência orgânica.', 'O quadro requer tratamento hospitalar e intervenção.', 'Correta. Trata simultaneamente sepse e origem intra-abdominal.',
  'Cirurgia', 'Cirurgia Geral/Terapia Intensiva', 'Deiscência anastomótica', 'Controle de fonte', 'dificil', 'Surviving Sepsis Campaign 2026; WSES guidance on intra-abdominal infections.',
  'Surviving Sepsis Campaign 2026; WSES guidance on intra-abdominal infections.', 'SCCM/WSES', 2026, 2026, 'SCCM/WSES', 'SCCM/WSES',
  '1', '{"deiscência","anastomose","sepse","controle de fonte","coleção","authorial-batch","authorial-published","authorial_prediction","Cirurgia","Cirurgia Geral/Terapia Intensiva","residencia-geral"}'::text[], '632586f1ce2cb7354df87f320e1fc3b6210b8ac1', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '4caeb26c-3c83-4fd6-a6dd-46a471e40c94'::uuid, 'MR26-L4-031', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Lactente de 5 meses, previamente saudável, apresenta coriza, tosse, sibilância e tiragem leve há dois dias. Saturação: 94% em ar ambiente; mantém boa aceitação de líquidos. Qual conduta é mais adequada?', 'Higiene nasal, hidratação, orientação de sinais de alarme e acompanhamento, sem salbutamol ou corticoide de rotina.', 'Radiografia de tórax e hemograma obrigatórios em todo caso.', 'Salbutamol nebulizado de horário por sete dias para todos os lactentes.', 'Azitromicina por suspeita de infecção bacteriana.', 'Prednisolona 2 mg/kg/dia por cinco dias.',
  'A', 'Bronquiolite típica é diagnóstico clínico e o tratamento é principalmente suporte. Broncodilatadores, corticoides, antibióticos, radiografia e exames laboratoriais não são recomendados de rotina. Oxigênio e internação dependem de hipoxemia, esforço respiratório, apneia, incapacidade de hidratação e fatores de risco.',
  'Correta. Evita intervenções sem benefício comprovado.', 'Exames são reservados a apresentação atípica, gravidade ou dúvida diagnóstica.', 'Salbutamol não melhora consistentemente internação ou duração da doença na bronquiolite típica.', 'A etiologia é geralmente viral e antibiótico só é usado se houver infecção bacteriana concomitante.', 'Corticoide sistêmico não é tratamento rotineiro.',
  'Pediatria', 'Pneumologia Pediátrica', 'Bronquiolite viral', 'Tratamento de suporte', 'facil', 'WHO Consolidated Guidelines for Management of Common Childhood Illness 2026; AAP Bronchiolitis Guideline.',
  'WHO Consolidated Guidelines for Management of Common Childhood Illness 2026; AAP Bronchiolitis Guideline.', 'WHO/AAP', 2026, 2026, 'WHO/AAP', 'WHO/AAP',
  '1', '{"bronquiolite","lactente","salbutamol","suporte","sibilância","authorial-batch","authorial-published","authorial_prediction","Pediatria","Pneumologia Pediátrica","residencia-geral"}'::text[], '1bb340ad7f1a53605343e44a662bcaa2a561df1a', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '8c6d8d9e-3169-48fc-a6ae-ab1dc4a62c1e'::uuid, 'MR26-L4-032', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Criança de 2 anos apresenta tosse metálica, rouquidão, estridor em repouso e retrações moderadas, sem sialorreia. Qual tratamento inicial é mais adequado?', 'Amoxicilina 50 mg/kg/dia por dez dias.', 'Dexametasona 0,6 mg/kg VO, IM ou IV em dose única, associada a adrenalina nebulizada e observação.', 'Salbutamol inalatório isolado.', 'Difenidramina e alta imediata.', 'Inspeção forçada da orofaringe com abaixador de língua.',
  'B', 'Estridor em repouso caracteriza crupe pelo menos moderado. Dexametasona em dose única reduz sintomas e retorno; adrenalina nebulizada produz melhora rápida, mas transitória, exigindo observação para recorrência. A ausência de sialorreia, toxemia e posição em tripé torna epiglotite menos provável.',
  'Crupe é geralmente viral e não responde a antibiótico.', 'Correta. Combina anti-inflamatório e terapia de resgate para obstrução de via aérea superior.', 'Salbutamol atua em brônquios, não no edema subglótico.', 'Anti-histamínico não trata a obstrução e alta imediata é insegura após adrenalina.', 'Manipulação de via aérea deve ser evitada quando há suspeita de epiglotite e não é necessária no crupe típico.',
  'Pediatria', 'Emergência Pediátrica', 'Crupe viral', 'Estridor em repouso', 'dificil', 'Canadian Paediatric Society Practice Point on Acute Management of Croup; WHO child care guidance.',
  'Canadian Paediatric Society Practice Point on Acute Management of Croup; WHO child care guidance.', 'CPS/WHO', 2023, 2023, 'CPS/WHO', 'CPS/WHO',
  '1', '{"crupe","dexametasona","adrenalina nebulizada","estridor","via aérea","authorial-batch","authorial-published","authorial_prediction","Pediatria","Emergência Pediátrica","residencia-geral"}'::text[], '38ae94851b99b2da570331da15b947216ee39955', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '96990d91-246c-48dc-a11c-dde62e2ad6c9'::uuid, 'MR26-L4-033', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Criança de 18 kg desenvolve urticária difusa, estridor, sibilância e hipotensão minutos após ingerir amendoim. Qual é a primeira medicação?', 'Hidrocortisona 10 mg/kg IV como única medida.', 'Adrenalina 1 mg IV em bolus.', 'Adrenalina 0,01 mg/kg IM da solução 1 mg/mL na face anterolateral da coxa; neste caso, 0,18 mg, repetível a cada 5–15 minutos.', 'Difenidramina VO e observação.', 'Salbutamol isolado.',
  'C', 'Adrenalina intramuscular é o tratamento de primeira linha da anafilaxia e não deve ser atrasada por anti-histamínicos ou corticoides. A dose pediátrica é 0,01 mg/kg da solução 1 mg/mL, usualmente até 0,3 mg em crianças e 0,5 mg em adolescentes/adultos, conforme protocolo. Via IV em bolus aumenta muito o risco de arritmia e erro de dose.',
  'Corticoide tem início tardio e não substitui adrenalina.', 'Bolus IV de 1 mg é dose de parada cardiorrespiratória e pode ser fatal em paciente com pulso.', 'Correta. Trata rapidamente edema de via aérea, broncoespasmo e choque.', 'Anti-histamínico melhora pele, mas não reverte obstrução ou choque.', 'Broncodilatador é adjuvante para broncoespasmo persistente.',
  'Pediatria', 'Alergia/Emergência Pediátrica', 'Anafilaxia', 'Adrenalina intramuscular', 'facil', 'World Allergy Organization Anaphylaxis Guidance; AHA Pediatric Advanced Life Support.',
  'World Allergy Organization Anaphylaxis Guidance; AHA Pediatric Advanced Life Support.', 'WAO/AHA', 2023, 2023, 'WAO/AHA', 'WAO/AHA',
  '1', '{"anafilaxia","adrenalina IM","dose pediátrica","amendoim","choque","authorial-batch","authorial-published","authorial_prediction","Pediatria","Alergia/Emergência Pediátrica","residencia-geral"}'::text[], 'b01e07d567b044af7d3f1e23aaf633f485e06e2b', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '96cd2a2e-1c5a-4b40-a86f-718765511dbb'::uuid, 'MR26-L4-034', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Menino de 4 anos apresenta febre há seis dias, conjuntivite bilateral não purulenta, alterações orais, exantema, edema de mãos e linfonodo cervical. Ecocardiograma inicial não mostra aneurisma. Qual tratamento reduz o risco de lesão coronariana?', 'Prednisona 1 mg/kg isoladamente para todos os casos.', 'Penicilina benzatina IM.', 'Ibuprofeno e alta.', 'Imunoglobulina humana IV 2 g/kg em infusão única associada a ácido acetilsalicílico conforme fase e protocolo.', 'Aguardar aneurisma aparecer para iniciar tratamento.',
  'D', 'A doença de Kawasaki deve ser tratada idealmente nos primeiros dez dias, mesmo com ecocardiograma inicial normal. IVIG 2 g/kg reduz de forma marcante aneurismas coronarianos. Aspirina é usada na fase aguda e depois em dose antiagregante; pacientes de alto risco ou refratários podem necessitar terapias adicionais.',
  'Corticoide pode ser adjuvante em grupos selecionados, não substituto universal da IVIG.', 'Não há evidência de infecção estreptocócica como causa.', 'Anti-inflamatório comum não previne vasculite coronariana.', 'Correta. É o tratamento padrão para prevenir complicação coronariana.', 'O objetivo é prevenir aneurisma, não esperar seu surgimento.',
  'Pediatria', 'Cardiologia Pediátrica/Reumatologia', 'Doença de Kawasaki', 'Imunoglobulina intravenosa', 'dificil', 'American Heart Association Scientific Statement on Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease.',
  'American Heart Association Scientific Statement on Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease.', 'AHA', 2017, 2017, 'AHA', 'AHA',
  '1', '{"Kawasaki","IVIG","aspirina","coronária","febre","authorial-batch","authorial-published","authorial_prediction","Pediatria","Cardiologia Pediátrica/Reumatologia","residencia-geral"}'::text[], '4ddfbb459ff0ebe6a17d159f209c34bd652a1ed8', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'c733229d-7b07-438c-a604-7e081c3a1f72'::uuid, 'MR26-L4-035', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Criança de 9 anos em tratamento de cetoacidose diabética apresenta cefaleia súbita, bradicardia, queda do nível de consciência e hipertensão. Qual é a conduta imediata?', 'Administrar bicarbonato em bolus e aguardar resposta.', 'Aumentar a velocidade de insulina para 0,2 unidade/kg/h.', 'Levar primeiro à tomografia, sem tratamento empírico.', 'Suspender monitorização neurológica e oferecer líquidos por via oral.', 'Administrar manitol 0,5–1 g/kg IV em 10–15 minutos ou salina hipertônica a 3% 2,5–5 mL/kg, sem aguardar tomografia.',
  'E', 'Sinais de hipertensão intracraniana durante tratamento de CAD sugerem lesão cerebral relacionada à CAD. O tratamento osmótico deve ser iniciado imediatamente, sem esperar imagem. Também se ajusta a reposição hídrica, eleva-se a cabeceira e garante-se suporte ventilatório cuidadoso; intubação, se necessária, deve evitar hiperventilação excessiva.',
  'Bicarbonato não é tratamento e pode estar associado a maior risco em CAD pediátrica.', 'Insulina mais rápida não trata edema cerebral e pode acelerar alterações osmóticas.', 'Tomografia não deve atrasar terapia de emergência.', 'O quadro exige terapia intensiva e monitorização contínua.', 'Correta. O atraso aumenta risco de herniação e morte.',
  'Pediatria', 'Endocrinologia/Emergência Pediátrica', 'Cetoacidose diabética', 'Edema cerebral', 'dificil', 'ISPAD Clinical Practice Consensus Guidelines: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State.',
  'ISPAD Clinical Practice Consensus Guidelines: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State.', 'ISPAD', 2022, 2022, 'ISPAD', 'ISPAD',
  '1', '{"CAD pediátrica","edema cerebral","manitol","salina hipertônica","diabetes","authorial-batch","authorial-published","authorial_prediction","Pediatria","Endocrinologia/Emergência Pediátrica","residencia-geral"}'::text[], 'a7d8eaa28436f9fd5d63bf362a800a4d5eb60ac1', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '50291dc4-4b34-49a1-a5cd-fbb0105b6a95'::uuid, 'MR26-L4-036', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Lactente de 18 dias, nascido a termo, apresenta temperatura retal de 38,2 °C e está aparentemente bem. Qual é a abordagem mais adequada?', 'Coletar urina, sangue e líquor, internar e iniciar antimicrobianos parenterais após culturas.', 'Prescrever amoxicilina VO por três dias.', 'Solicitar apenas radiografia de tórax.', 'Dar antitérmico e liberar sem exames porque a criança está bem.', 'Realizar somente teste viral; se positivo, excluir infecção bacteriana invasiva.',
  'A', 'Lactentes febris de 8 a 21 dias têm risco suficiente de infecção bacteriana invasiva para avaliação completa, incluindo líquor, hospitalização e antibiótico parenteral enquanto se aguardam culturas. Um teste viral positivo reduz, mas não elimina, o risco de infecção bacteriana nesse grupo etário.',
  'Correta. A idade define estratégia de maior segurança.', 'Terapia oral é inadequada para possível infecção invasiva neonatal.', 'Radiografia depende de sinais respiratórios e não substitui culturas.', 'Aparência inicial normal não exclui bacteremia ou meningite.', 'Coinfecção bacteriana permanece possível.',
  'Pediatria', 'Infectologia Pediátrica', 'Febre no lactente jovem', 'Lactente de 8–21 dias', 'dificil', 'AAP Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old.',
  'AAP Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old.', 'AAP', 2021, 2021, 'AAP', 'AAP',
  '1', '{"lactente febril","meningite","hemocultura","punção lombar","antibiótico","authorial-batch","authorial-published","authorial_prediction","Pediatria","Infectologia Pediátrica","residencia-geral"}'::text[], 'e015907982da2a8aefb86e0e561d15faa007767d', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '8b041049-9e54-4d8e-a79b-0fad0a97d76b'::uuid, 'MR26-L4-037', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Adolescente de 13 anos apresenta febre alta, púrpura rapidamente progressiva, rigidez de nuca e choque. Qual pacote inicial é mais adequado?', 'Aguardar punção lombar antes de qualquer antibiótico, mesmo com choque.', 'Ceftriaxona IV imediatamente, ressuscitação do choque, precaução por gotículas e quimioprofilaxia dos contatos próximos.', 'Aciclovir isolado.', 'Vacinar os contatos como única medida após a exposição.', 'Penicilina benzatina IM e alta.',
  'B', 'Doença meningocócica invasiva exige antibiótico imediato e tratamento intensivo; a punção lombar pode ser adiada quando há instabilidade. Ceftriaxona é opção empírica apropriada. Contatos próximos necessitam quimioprofilaxia, como rifampicina, ciprofloxacino ou ceftriaxona, conforme idade, gestação e resistência local; vacinação não substitui profilaxia imediata.',
  'A coleta de líquor não deve atrasar antibiótico em paciente instável.', 'Correta. Aborda infecção, choque, transmissão e contatos.', 'Não cobre meningococo.', 'A vacina pode ser indicada em surtos ou conforme sorogrupo, mas não substitui quimioprofilaxia.', 'Via e regime são inadequados para sepse meningocócica.',
  'Pediatria', 'Infectologia/Emergência Pediátrica', 'Meningococcemia', 'Antibiótico e profilaxia de contatos', 'dificil', 'CDC Manual for Surveillance of Vaccine-Preventable Diseases: Meningococcal Disease; Red Book.',
  'CDC Manual for Surveillance of Vaccine-Preventable Diseases: Meningococcal Disease; Red Book.', 'CDC/AAP', 2024, 2024, 'CDC/AAP', 'CDC/AAP',
  '1', '{"meningococcemia","ceftriaxona","púrpura","choque","profilaxia","authorial-batch","authorial-published","authorial_prediction","Pediatria","Infectologia/Emergência Pediátrica","residencia-geral"}'::text[], 'e26a279370604031c3263a9193a3afe20dc7fb33', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'be9ecf20-40a8-4527-aa22-10b468b7ec9e'::uuid, 'MR26-L4-038', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Menino de 5 anos apresenta edema, albumina de 1,7 g/dL, relação proteína/creatinina urinária de 6 g/g, função renal normal, complemento normal e ausência de hematúria macroscópica. Qual é o tratamento inicial usual?', 'Losartana isolada como tratamento da atividade.', 'Ciclofosfamida IV antes de testar resposta ao corticoide.', 'Prednisona ou prednisolona 60 mg/m²/dia, ou 2 mg/kg/dia, máximo 60 mg, seguida de esquema em dias alternados conforme protocolo.', 'Rituximabe no primeiro episódio para todas as crianças.', 'Biópsia renal obrigatória antes de qualquer tratamento em toda criança típica.',
  'C', 'A apresentação é típica de síndrome nefrótica idiopática sensível a corticoide. O tratamento inicial é glicocorticoide em regime padronizado. Biópsia e testes genéticos são reservados a características atípicas, resistência ao corticoide ou situações específicas. A família deve receber orientação para monitorar proteinúria, infecção, trombose e efeitos adversos.',
  'Bloqueio do SRAA pode reduzir proteinúria em cenários selecionados, mas não induz remissão da doença típica.', 'Agentes poupadores são considerados em recaídas frequentes, dependência ou resistência, não inicialmente.', 'Correta. É a terapia de indução padrão no primeiro episódio típico.', 'Rituximabe não é primeira linha universal.', 'A maioria das crianças típicas não precisa de biópsia antes do teste terapêutico.',
  'Pediatria', 'Nefrologia Pediátrica', 'Síndrome nefrótica', 'Primeiro episódio', 'dificil', 'KDIGO 2025 Clinical Practice Guideline for Management of Nephrotic Syndrome in Children.',
  'KDIGO 2025 Clinical Practice Guideline for Management of Nephrotic Syndrome in Children.', 'KDIGO', 2025, 2025, 'KDIGO', 'KDIGO',
  '1', '{"síndrome nefrótica","prednisona","criança","proteinúria","edema","authorial-batch","authorial-published","authorial_prediction","Pediatria","Nefrologia Pediátrica","residencia-geral"}'::text[], '36cf36570d85c1eb3d619d5bf42b5ede41b6e948', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '3207e3df-2b81-4108-a7d2-b4fe123cf261'::uuid, 'MR26-L4-039', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Criança de 2 anos com diarreia aquosa apresenta sede, olhos discretamente fundos e prega cutânea que retorna lentamente, mas está alerta e sem choque. Qual plano inicial é mais adequado?', 'Antibiótico de amplo espectro em todos os casos.', 'Jejum absoluto por 24 horas.', 'Soro glicosado IV 20 mL/kg para toda criança com diarreia.', 'Solução de reidratação oral 75 mL/kg ao longo de 4 horas, com reavaliação e reposição das perdas.', 'Loperamida 2 mg após cada evacuação.',
  'D', 'O quadro corresponde a alguma desidratação, sem choque. A reidratação oral é segura e eficaz: 75 mL/kg em quatro horas, mantendo aleitamento e alimentação apropriada e repondo perdas contínuas. A via IV é reservada a choque, falha da via oral, alteração de consciência ou outras contraindicações.',
  'A maioria das diarreias aquosas é autolimitada; antibiótico depende da etiologia e gravidade.', 'Jejum piora nutrição e não reduz duração da diarreia.', 'Bolus IV é indicado para choque, não rotineiramente.', 'Correta. É o plano de reidratação oral recomendado.', 'Antimotilidade pode causar eventos adversos e não é indicada em crianças pequenas.',
  'Pediatria', 'Gastroenterologia Pediátrica', 'Diarreia aguda', 'Reidratação oral', 'facil', 'WHO Pocket Book of Hospital Care for Children and IMCI guidance.',
  'WHO Pocket Book of Hospital Care for Children and IMCI guidance.', 'WHO', 2013, 2013, 'WHO', 'WHO',
  '1', '{"diarreia","reidratação oral","75 mL/kg","desidratação","criança","authorial-batch","authorial-published","authorial_prediction","Pediatria","Gastroenterologia Pediátrica","residencia-geral"}'::text[], '78b5184a418baa048beff324c17b0abf672638c5', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '76219c2e-96cb-437c-a9e6-ef81653f8680'::uuid, 'MR26-L4-040', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Criança de 6 anos, 20 kg, apresenta crise tônico-clônica contínua há seis minutos. Não há acesso venoso. Qual é a melhor medicação inicial?', 'Carbamazepina sublingual.', 'Haloperidol IM.', 'Fenitoína VO 100 mg.', 'Aguardar 30 minutos para definir estado de mal.', 'Midazolam intranasal ou bucal 0,2 mg/kg, aproximadamente 4 mg, com suporte de via aérea.',
  'E', 'Crise convulsiva com cinco minutos ou mais deve ser tratada como estado de mal. Benzodiazepínico é primeira linha; sem acesso IV, midazolam intranasal, bucal ou IM é eficaz e rápido. Se a crise persistir, segue-se terapia de segunda linha, como levetiracetam, fosfenitoína/fenitoína ou valproato, conforme protocolo e contraindicações.',
  'Não é terapia de resgate.', 'Não é anticonvulsivante.', 'Via oral é lenta e insegura durante convulsão.', 'O tratamento deve começar aos cinco minutos para reduzir refratariedade e dano.', 'Correta. Oferece absorção rápida sem necessidade de acesso venoso.',
  'Pediatria', 'Neurologia/Emergência Pediátrica', 'Estado de mal epiléptico', 'Benzodiazepínico sem acesso venoso', 'dificil', 'American Heart Association Pediatric Advanced Life Support Guidelines; Neurocritical Care status epilepticus guidance.',
  'American Heart Association Pediatric Advanced Life Support Guidelines; Neurocritical Care status epilepticus guidance.', 'AHA/NCS', 2025, 2025, 'AHA/NCS', 'AHA/NCS',
  '1', '{"estado de mal","midazolam intranasal","convulsão","dose pediátrica","PALS","authorial-batch","authorial-published","authorial_prediction","Pediatria","Neurologia/Emergência Pediátrica","residencia-geral"}'::text[], '7e9ee6aa1d1928f9ac601b0845d465e0d905b3b1', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'c0478032-3904-438b-a042-f6cbc49eaaca'::uuid, 'MR26-L4-041', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Gestante de 35 semanas apresenta pressão de 172/114 mmHg persistente, cefaleia, escotomas e proteinúria. Plaquetas: 118.000/mm³; creatinina: 1,0 mg/dL; feto sem sinais de sofrimento. Qual é a melhor conduta?', 'Sulfato de magnésio, por exemplo 4–6 g IV de ataque seguido de 1–2 g/h, tratamento urgente da hipertensão grave e interrupção da gestação após estabilização materna.', 'Administrar diazepam profilático no lugar do magnésio.', 'Usar apenas metildopa VO e dar alta.', 'Aguardar espontaneamente até 40 semanas.', 'Realizar cesariana imediata sem estabilizar pressão ou prevenir convulsão.',
  'A', 'Pré-eclâmpsia com sinais de gravidade em gestação de 35 semanas é indicação de parto após estabilização materna. Sulfato de magnésio previne e trata convulsões; hipertensão aguda grave deve ser tratada rapidamente com opções como labetalol IV, hidralazina IV ou nifedipino de liberação imediata, conforme protocolo. A via de parto depende de condições obstétricas.',
  'Correta. Prioriza segurança materna e resolução da doença.', 'Magnésio é superior para prevenção de eclâmpsia.', 'Metildopa tem início lento e não trata adequadamente uma crise hipertensiva grave.', 'Conduta expectante após 34 semanas com sinais graves aumenta risco materno.', 'Quando possível, estabilização antecede o parto e reduz complicações anestésicas e neurológicas.',
  'Ginecologia e Obstetrícia', 'Obstetrícia', 'Pré-eclâmpsia com sinais de gravidade', 'Estabilização e parto', 'dificil', 'ACOG Practice Bulletin: Gestational Hypertension and Preeclampsia; reaffirmed updates.',
  'ACOG Practice Bulletin: Gestational Hypertension and Preeclampsia; reaffirmed updates.', 'ACOG', 2024, 2024, 'ACOG', 'ACOG',
  '1', '{"pré-eclâmpsia","sulfato de magnésio","hipertensão grave","35 semanas","parto","authorial-batch","authorial-published","authorial_prediction","Ginecologia e Obstetrícia","Obstetrícia","residencia-geral"}'::text[], '5c689fa7ee17296843c96a2f7f8fff3ebe91c9c5', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'f58dbea7-bbc8-4a27-a5b8-4830a9c86561'::uuid, 'MR26-L4-042', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Após parto vaginal, puérpera apresenta sangramento de 1.200 mL, útero amolecido e taquicardia. Não há retenção placentária evidente. Qual pacote inicial é mais adequado?', 'Aguardar uma hora para confirmar se o sangramento persiste.', 'Massagem uterina, oxitocina (por exemplo 10 UI IM ou infusão IV conforme protocolo), acesso venoso, ressuscitação e ácido tranexâmico 1 g IV o mais cedo possível, dentro de 3 horas do parto.', 'Metilergometrina como primeira escolha mesmo se a paciente tiver hipertensão grave.', 'Misoprostol isolado e alta.', 'Heparina IV para prevenir coagulação intravascular.',
  'B', 'Atonia uterina é a causa mais comum de hemorragia pós-parto. O manejo deve ser simultâneo: massagem, uterotônico, ressuscitação, quantificação da perda, investigação dos 4 Ts e escalonamento rápido. Ácido tranexâmico 1 g IV reduz morte por sangramento quando administrado precocemente; uma segunda dose de 1 g pode ser usada se o sangramento continuar ou reiniciar, conforme protocolo.',
  'Atraso aumenta choque, coagulopatia e mortalidade.', 'Correta. Trata atonia e coagulopatia precoce enquanto se avaliam outras causas.', 'Metilergometrina é contraindicada ou evitada em hipertensão/preeclâmpsia.', 'Misoprostol pode ser adjuvante, mas não substitui ressuscitação e manejo escalonado.', 'Anticoagulação agravaria a hemorragia.',
  'Ginecologia e Obstetrícia', 'Obstetrícia', 'Hemorragia pós-parto', 'Atonia uterina e ácido tranexâmico', 'dificil', 'ACOG Practice Bulletin on Postpartum Hemorrhage; WHO recommendation on tranexamic acid.',
  'ACOG Practice Bulletin on Postpartum Hemorrhage; WHO recommendation on tranexamic acid.', 'ACOG/WHO', 2025, 2025, 'ACOG/WHO', 'ACOG/WHO',
  '1', '{"hemorragia pós-parto","atonia","oxitocina","tranexâmico","puerpério","authorial-batch","authorial-published","authorial_prediction","Ginecologia e Obstetrícia","Obstetrícia","residencia-geral"}'::text[], '2eac21fd0d1023a03ccf6c1a96845cccdb1d7730', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'ba159421-6a36-4488-a646-672dacca7f5e'::uuid, 'MR26-L4-043', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 29 anos, hemodinamicamente estável, apresenta gestação tubária íntegra de 2,4 cm, sem atividade cardíaca embrionária, beta-hCG de 1.800 mUI/mL, hemograma e função hepatorrenal normais e possibilidade de seguimento rigoroso. Qual é uma opção apropriada?', 'Metotrexato em paciente com ruptura e choque.', 'Alta sem seguimento porque o beta-hCG é menor que 2.000.', 'Metotrexato 50 mg/m² IM em dose única, com beta-hCG nos dias 4 e 7 e seguimento até negativação.', 'Histerectomia obrigatória.', 'Misoprostol vaginal como tratamento da gestação tubária.',
  'C', 'Paciente estável, massa pequena, ausência de atividade cardíaca e capacidade de acompanhamento favorecem tratamento medicamentoso com metotrexato. No protocolo de dose única, espera-se queda adequada do beta-hCG entre os dias 4 e 7; se não ocorrer, pode ser necessária nova dose ou cirurgia. Instabilidade, ruptura, contraindicações ao fármaco ou seguimento inviável indicam manejo cirúrgico.',
  'Ruptura e choque exigem cirurgia imediata.', 'Mesmo níveis baixos podem evoluir com ruptura; acompanhamento é obrigatório.', 'Correta. A paciente atende critérios usuais para tratamento médico.', 'Cirurgia conservadora ou salpingectomia, não histerectomia, é usada quando necessário.', 'Misoprostol não trata adequadamente implantação tubária.',
  'Ginecologia e Obstetrícia', 'Ginecologia/Obstetrícia', 'Gestação ectópica', 'Metotrexato', 'dificil', 'ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy, reaffirmed 2025.',
  'ACOG Practice Bulletin No. 193: Tubal Ectopic Pregnancy, reaffirmed 2025.', 'ACOG', 2025, 2025, 'ACOG', 'ACOG',
  '1', '{"ectópica","metotrexato","beta-hCG","tuba","seguimento","authorial-batch","authorial-published","authorial_prediction","Ginecologia e Obstetrícia","Ginecologia/Obstetrícia","residencia-geral"}'::text[], 'a1986f57e8988a0c9023b8e942d25f8eeb1f1dac', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '372a9d94-fbc0-476c-a1f0-abeabe690321'::uuid, 'MR26-L4-044', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 23 anos apresenta dor pélvica, dor à mobilização do colo e corrimento mucopurulento. Está estável, tolera via oral, não está grávida e não há abscesso. Qual esquema ambulatorial é recomendado?', 'Azitromicina 1 g VO isolada.', 'Ciprofloxacino isolado por três dias.', 'Aguardar resultado de todos os testes antes de tratar.', 'Ceftriaxona 500 mg IM em dose única + doxiciclina 100 mg VO 12/12 h por 14 dias + metronidazol 500 mg VO 12/12 h por 14 dias.', 'Fluconazol 150 mg VO em dose única.',
  'D', 'O diagnóstico de DIP é clínico e o tratamento empírico precoce reduz infertilidade e dor pélvica crônica. O regime deve cobrir gonococo, clamídia e anaeróbios. Parceiros devem ser avaliados e tratados para infecções sexualmente transmissíveis relevantes, e a paciente deve ser reavaliada se não melhorar em até 72 horas.',
  'Não oferece cobertura adequada isoladamente.', 'Resistência do gonococo limita quinolona e a duração é inadequada.', 'A terapia não deve ser adiada quando o diagnóstico presuntivo está presente.', 'Correta. É o esquema ambulatorial recomendado para doença leve a moderada.', 'Trata candidíase, não infecção do trato genital superior.',
  'Ginecologia e Obstetrícia', 'Ginecologia/Infectologia', 'Doença inflamatória pélvica', 'Tratamento ambulatorial', 'dificil', 'CDC Sexually Transmitted Infections Treatment Guidelines: Pelvic Inflammatory Disease.',
  'CDC Sexually Transmitted Infections Treatment Guidelines: Pelvic Inflammatory Disease.', 'CDC', 2021, 2021, 'CDC', 'CDC',
  '1', '{"DIP","ceftriaxona","doxiciclina","metronidazol","IST","authorial-batch","authorial-published","authorial_prediction","Ginecologia e Obstetrícia","Ginecologia/Infectologia","residencia-geral"}'::text[], '4afbc891747872792f7912d340d712f0a9cc7b8c', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'faeb1b72-5a5a-4fa0-ada1-89fe72a2080f'::uuid, 'MR26-L4-045', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Mulher de 62 anos, menopausada há 11 anos, apresenta primeiro episódio de sangramento vaginal. Ultrassonografia transvaginal mostra endométrio de 8 mm, sem massa anexial. Qual é o próximo passo?', 'Iniciar estrogênio sistêmico para interromper o sangramento.', 'Solicitar apenas marcador CA-125.', 'Considerar o achado normal e não investigar.', 'Repetir ultrassom em dois anos.', 'Obter amostra endometrial por biópsia; histeroscopia é indicada se amostra inadequada ou sangramento persistente.',
  'E', 'Sangramento pós-menopausa exige exclusão de hiperplasia ou câncer endometrial. Espessura endometrial acima do limiar de baixo risco, geralmente 4 mm, indica amostragem. Mesmo com endométrio fino, sangramento persistente ou recorrente pode exigir investigação adicional.',
  'Estrogênio pode estimular o endométrio e atrasar o diagnóstico.', 'CA-125 não é teste de triagem para câncer endometrial.', 'O sangramento e a espessura de 8 mm não são achados para simples observação.', 'O prazo é incompatível com a necessidade de excluir neoplasia.', 'Correta. A biópsia avalia diretamente hiperplasia e malignidade.',
  'Ginecologia e Obstetrícia', 'Ginecologia', 'Sangramento pós-menopausa', 'Investigação endometrial', 'dificil', 'ACOG Committee Opinion on Transvaginal Ultrasonography in Evaluating Postmenopausal Bleeding.',
  'ACOG Committee Opinion on Transvaginal Ultrasonography in Evaluating Postmenopausal Bleeding.', 'ACOG', 2023, 2023, 'ACOG', 'ACOG',
  '1', '{"sangramento pós-menopausa","endométrio","biópsia","câncer endometrial","ultrassom","authorial-batch","authorial-published","authorial_prediction","Ginecologia e Obstetrícia","Ginecologia","residencia-geral"}'::text[], '0e2e3ee5ee2958032845fb4f9520f477518b382d', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'b3567a10-ba3e-4e4e-a0c6-f65437acf698'::uuid, 'MR26-L4-046', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Um novo teste foi aplicado a 200 pessoas. Entre 90 pacientes com a doença, 81 tiveram teste positivo. Entre 110 sem a doença, 10 tiveram teste positivo. Qual é a sensibilidade?', '81/90 = 90%.', '81/200 = 40,5%.', '81/91 = 89,0%.', '100/110 = 90,9%.', '10/110 = 9,1%.',
  'A', 'Sensibilidade é a proporção de verdadeiros positivos entre todos os doentes: 81/(81+9) = 81/90 = 90%. A especificidade seria 100/110 = 90,9%. Sensibilidade é útil para avaliar a capacidade do teste de detectar a doença quando ela está presente.',
  'Correta. Usa verdadeiros positivos no numerador e todos os doentes no denominador.', 'Essa é a proporção de positivos verdadeiros na amostra total, não sensibilidade.', 'Esse é o valor preditivo positivo.', 'Esse cálculo corresponde à especificidade.', 'Essa é a taxa de falso-positivo.',
  'Medicina Preventiva', 'Epidemiologia', 'Teste diagnóstico', 'Sensibilidade', 'facil', 'Principles of Epidemiology and Diagnostic Test Evaluation.',
  'Principles of Epidemiology and Diagnostic Test Evaluation.', 'CDC', 2024, 2024, 'CDC', 'CDC',
  '1', '{"sensibilidade","teste diagnóstico","verdadeiro positivo","epidemiologia","cálculo","authorial-batch","authorial-published","authorial_prediction","Medicina Preventiva","Epidemiologia","residencia-geral"}'::text[], '0eec6ab16384f47d40febb89371b91c2e7e69198', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'A'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'ec337888-09cf-4621-aa93-d0c7eca256a7'::uuid, 'MR26-L4-047', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Em um ensaio clínico, o desfecho ocorreu em 20% do grupo controle e 12% do grupo tratado. Qual é o número necessário para tratar (NNT)?', '0,20−0,12 = 0,08; NNT = 8.', '1/(0,20−0,12) = 12,5; arredondando para cima, NNT = 13.', '20/12 = 1,67.', 'Não pode ser calculado sem o valor de p.', '12/20 = 0,60; NNT = 60.',
  'B', 'A redução absoluta de risco é 8 pontos percentuais, ou 0,08. O NNT é o inverso da redução absoluta: 1/0,08 = 12,5, arredondado para cima para 13. Isso significa tratar 13 pessoas pelo período do estudo para prevenir um evento adicional.',
  'Confunde redução absoluta de risco com NNT.', 'Correta. Usa a redução absoluta, não a relativa.', 'É uma razão simples que não representa NNT.', 'O valor de p ajuda na inferência, mas não é necessário para o cálculo pontual.', 'Não corresponde a uma fórmula válida.',
  'Medicina Preventiva', 'Epidemiologia', 'Medidas de efeito', 'Número necessário para tratar', 'facil', 'CONSORT and evidence-based medicine methods for absolute effects.',
  'CONSORT and evidence-based medicine methods for absolute effects.', 'CONSORT/CEBM', 2022, 2022, 'CONSORT/CEBM', 'CONSORT/CEBM',
  '1', '{"NNT","redução absoluta de risco","ensaio clínico","cálculo","tratamento","authorial-batch","authorial-published","authorial_prediction","Medicina Preventiva","Epidemiologia","residencia-geral"}'::text[], 'b4296b0832ba438aee8a227f3a8d5cda0a5adc46', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'B'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  '67a300a2-665c-409c-a5fb-e9569c838902'::uuid, 'MR26-L4-048', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Um teste possui sensibilidade de 90% e especificidade de 80%. Qual é a razão de verossimilhança positiva (RV+)?', '0,90×0,80 = 0,72.', '1−0,90 = 0,10.', '0,90/(1−0,80) = 4,5.', '0,80/(1−0,90) = 8.', '0,90/0,80 = 1,125.',
  'C', 'A RV+ é sensibilidade dividida pela taxa de falso-positivo: 0,90/0,20 = 4,5. Ela indica quanto um resultado positivo é mais provável em um doente do que em um não doente e pode ser usada para converter chance pré-teste em chance pós-teste.',
  'Produto de sensibilidade e especificidade não é uma medida usual de verossimilhança.', 'Representa a taxa de falso-negativo.', 'Correta. Aplica a fórmula da RV+.', 'A expressão se aproxima da fórmula da RV negativa invertida, não da RV+.', 'Dividir sensibilidade por especificidade não produz RV+.',
  'Medicina Preventiva', 'Epidemiologia', 'Teste diagnóstico', 'Razão de verossimilhança positiva', 'dificil', 'Users’ Guides to the Medical Literature: Diagnostic Tests.',
  'Users’ Guides to the Medical Literature: Diagnostic Tests.', 'JAMA Evidence', 2023, 2023, 'JAMA Evidence', 'JAMA Evidence',
  '1', '{"razão de verossimilhança","RV positiva","sensibilidade","especificidade","Bayes","authorial-batch","authorial-published","authorial_prediction","Medicina Preventiva","Epidemiologia","residencia-geral"}'::text[], 'fafd88608d05281393d9acede8b22321a9fc5125', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'C'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'd1f797ee-266d-4f79-a5bc-9a8db5db4c35'::uuid, 'MR26-L4-049', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Em estudo caso-controle, 60 dos 100 casos foram expostos e 30 dos 100 controles foram expostos. Qual é a odds ratio da associação?', '(60+30)/(40+70) = 0,82.', '60/100 = 0,60.', '30/100 = 0,30.', '(60×70)/(40×30) = 3,5.', '0,60−0,30 = 0,30.',
  'D', 'Em tabela 2×2, a odds ratio é ad/bc: (60×70)/(40×30) = 3,5. Assim, a chance de exposição entre os casos foi 3,5 vezes a chance entre os controles. Em doenças raras, a OR pode aproximar o risco relativo.',
  'Não corresponde à fórmula da OR.', 'É apenas a proporção de expostos entre casos.', 'É a proporção de expostos entre controles.', 'Correta. Usa o produto cruzado.', 'Diferença de proporções não é a medida principal do caso-controle.',
  'Medicina Preventiva', 'Epidemiologia', 'Estudo caso-controle', 'Odds ratio', 'dificil', 'STREGA/STROBE guidance and epidemiologic methods for case-control studies.',
  'STREGA/STROBE guidance and epidemiologic methods for case-control studies.', 'STROBE', 2023, 2023, 'STROBE', 'STROBE',
  '1', '{"odds ratio","caso-controle","exposição","epidemiologia","cálculo","authorial-batch","authorial-published","authorial_prediction","Medicina Preventiva","Epidemiologia","residencia-geral"}'::text[], '355d5340ee7456f7b402b7e5d740ad346630ddf1', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'D'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

INSERT INTO public.questions (
  id, external_id, lote_importacao, question_kind, question_origin,
  reproduction_allowed, statement, option_a, option_b, option_c, option_d, option_e,
  correct_option, explanation,
  option_a_rationale, option_b_rationale, option_c_rationale, option_d_rationale, option_e_rationale,
  specialty, area, topic, subtopic, difficulty, bibliography,
  guideline_name, guideline_institution, guideline_year, year, institution, source,
  question_version, tags, statement_fingerprint, bank_status, quality_label, quality_notes, official_answer
) VALUES (
  'f0335d07-c7d8-464f-ae26-a1afc9039367'::uuid, 'MR26-L4-050', 'MEDRANK_AUTORAL_2026_LOTE_04', 'authorial_prediction', 'original',
  false, 'Após introdução de rastreamento, a sobrevida média medida a partir do diagnóstico aumenta de 3 para 6 anos, mas a idade média de morte e a mortalidade populacional pela doença permanecem inalteradas. Qual fenômeno explica o achado?', 'Falácia ecológica.', 'Viés de memória.', 'Confusão por indicação.', 'Viés de seleção do trabalhador saudável.', 'Viés de tempo de antecipação (lead-time bias).',
  'E', 'O rastreamento pode antecipar a data do diagnóstico sem adiar a morte. A sobrevida desde o diagnóstico aparenta aumentar, embora a mortalidade não mude. Por isso, programas de rastreamento devem ser avaliados por desfechos como mortalidade específica, danos, sobrediagnóstico e qualidade de vida, e não apenas por sobrevida após o diagnóstico.',
  'Falácia ecológica é inferir relações individuais a partir de dados agregados.', 'Viés de memória afeta a recordação diferencial de exposições.', 'Confusão por indicação ocorre quando prognóstico influencia a escolha do tratamento.', 'O efeito trabalhador saudável ocorre em estudos ocupacionais.', 'Correta. O relógio da sobrevida começa mais cedo sem mudança no desfecho final.',
  'Medicina Preventiva', 'Epidemiologia', 'Rastreamento', 'Viés de tempo de antecipação', 'dificil', 'WHO principles for screening programmes and epidemiologic methods.',
  'WHO principles for screening programmes and epidemiologic methods.', 'WHO', 2020, 2020, 'WHO', 'WHO',
  '1', '{"rastreamento","lead-time bias","sobrevida","mortalidade","viés","authorial-batch","authorial-published","authorial_prediction","Medicina Preventiva","Epidemiologia","residencia-geral"}'::text[], 'a18518c3533248de8c7e46792e1ba38facaa1c3e', 'approved', 'aprovada', 'Lote 04 importado — aprovado', 'E'
)
ON CONFLICT (id) DO UPDATE SET
  statement = EXCLUDED.statement,
  option_a = EXCLUDED.option_a,
  option_b = EXCLUDED.option_b,
  option_c = EXCLUDED.option_c,
  option_d = EXCLUDED.option_d,
  option_e = EXCLUDED.option_e,
  correct_option = EXCLUDED.correct_option,
  explanation = EXCLUDED.explanation,
  specialty = EXCLUDED.specialty,
  area = EXCLUDED.area,
  topic = EXCLUDED.topic,
  subtopic = EXCLUDED.subtopic,
  difficulty = EXCLUDED.difficulty,
  tags = EXCLUDED.tags,
  bank_status = 'approved',
  quality_label = 'aprovada',
  lote_importacao = EXCLUDED.lote_importacao,
  question_kind = EXCLUDED.question_kind;

SELECT count(*) AS lote_04_aprovadas FROM public.questions WHERE lote_importacao = 'MEDRANK_AUTORAL_2026_LOTE_04' AND bank_status = 'approved';
