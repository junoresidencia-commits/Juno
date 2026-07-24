import type {
  StudyTemplate,
  WorkBlueprint,
  WorkKind,
} from '../types'
import { createId } from './id'

export interface BlueprintInput {
  title: string
  idea: string
  kind: WorkKind
  region: string
}

export function templateForKind(kind: WorkKind): StudyTemplate {
  if (kind === 'ckd_epidemiology') return 'ckd_epidemiology'
  if (kind === 'literature_review') return 'none'
  if (kind === 'case_series') return 'general'
  return 'general'
}

export function generateBlueprint(input: BlueprintInput): WorkBlueprint {
  const title = input.title.trim()
  const idea = input.idea.trim() || title
  const region = input.region.trim() || 'IRC'
  const topic = shortenTopic(idea, title)

  const pico = buildPico(input.kind, topic, region)
  const researchQuestion = buildQuestion(input.kind, topic, region)
  const specificObjectives = buildObjectives(input.kind, topic, region)
  const requiredVariables = buildVariables(input.kind)
  const methodsOutline = buildMethods(input.kind, region)
  const articleSections = buildSections(input.kind)
  const literaturePlan = buildLiterature(input.kind, topic)
  const deliverables = buildDeliverables(input.kind)
  const chatGptPrompt = buildChatGptPrompt({
    title,
    idea,
    kind: input.kind,
    region,
    researchQuestion,
    pico,
    specificObjectives,
    requiredVariables,
  })

  return {
    researchQuestion,
    pico,
    specificObjectives,
    requiredVariables,
    methodsOutline,
    articleSections,
    literaturePlan,
    deliverables,
    chatGptPrompt,
    generatedAt: new Date().toISOString(),
  }
}

function shortenTopic(idea: string, title: string): string {
  const base = idea || title
  return base.length > 120 ? `${base.slice(0, 117)}…` : base
}

function buildQuestion(kind: WorkKind, topic: string, region: string): string {
  switch (kind) {
    case 'literature_review':
      return `O que a literatura atual descreve sobre “${topic}”, e quais lacunas permanecem relevantes para a prática na região ${region}?`
    case 'case_series':
      return `Quais características clínicas e desfechos aparecem em uma série de casos relacionados a “${topic}” na região ${region}?`
    case 'ckd_epidemiology':
      return `Qual a prevalência e o perfil clínico de doença renal crônica associados a “${topic}” na região ${region}?`
    default:
      return `Qual a magnitude e o perfil de “${topic}” na população estudada na região ${region}?`
  }
}

function buildPico(kind: WorkKind, topic: string, region: string) {
  if (kind === 'literature_review') {
    return {
      population: `Estudos e revisões sobre ${topic}`,
      interventionOrExposure: 'Exposição/fenômeno descrito nos artigos',
      comparison: 'Comparadores relatados pelos estudos (quando houver)',
      outcome: 'Síntese de achados, qualidade e lacunas',
    }
  }
  if (kind === 'ckd_epidemiology') {
    return {
      population: `Adultos atendidos / avaliados na região ${region}`,
      interventionOrExposure: 'Creatinina, TFG (CKD-EPI 2021), doença de base, estatina',
      comparison: 'Com vs sem DRC (TFG < 60); estratos por idade/sexo/doença de base',
      outcome: 'Prevalência de DRC, estágios G1–G5 e perfil clínico',
    }
  }
  return {
    population: `População-alvo na região ${region} relacionada a “${topic}”`,
    interventionOrExposure: `Exposição ou característica principal: ${topic}`,
    comparison: 'Grupo de comparação ou estratos definidos no protocolo',
    outcome: 'Desfechos clínicos e epidemiológicos principais do estudo',
  }
}

function buildObjectives(kind: WorkKind, topic: string, region: string): string[] {
  if (kind === 'literature_review') {
    return [
      `Mapear a produção científica sobre “${topic}”.`,
      'Sintetizar achados, métodos e limitações dos estudos incluídos.',
      `Identificar lacunas úteis para novos trabalhos na região ${region}.`,
      'Propor recomendações práticas e agenda de pesquisa local.',
    ]
  }
  if (kind === 'ckd_epidemiology') {
    return [
      `Estimar a prevalência de DRC (TFG < 60) na amostra da região ${region}.`,
      'Descrever distribuição por estágio CKD-EPI (G1–G5).',
      'Caracterizar doença de base (DM, HAS e demais) e uso de estatina.',
      `Relacionar o tema “${topic}” ao perfil renal encontrado.`,
    ]
  }
  if (kind === 'case_series') {
    return [
      `Descrever a série de casos vinculados a “${topic}”.`,
      'Padronizar variáveis clínicas mínimas de cada caso.',
      'Discutir padrões, alertas clínicos e implicações locais.',
    ]
  }
  return [
    `Descrever a população e o contexto de “${topic}” na região ${region}.`,
    'Medir os desfechos principais definidos no protocolo.',
    'Explorar associações com variáveis clínicas e demográficas.',
    'Gerar base para manuscrito (introdução → discussão).',
  ]
}

function buildVariables(kind: WorkKind): string[] {
  if (kind === 'literature_review') {
    return [
      'Base de dados / ano / idioma',
      'Tipo de estudo',
      'População',
      'Intervenção ou exposição',
      'Desfechos',
      'Principais resultados',
      'Limitações',
      'Nível de evidência (opcional)',
    ]
  }
  if (kind === 'ckd_epidemiology') {
    return [
      'Nome (ou código)',
      'Idade',
      'Sexo',
      'Creatinina (mg/dL)',
      'TFG CKD-EPI 2021 (calculada)',
      'Estágio G1–G5',
      'Doença de base',
      'Uso de estatina',
      'Observações / data',
    ]
  }
  if (kind === 'case_series') {
    return [
      'Identificador do caso',
      'Idade e sexo',
      'Queixa / história',
      'Exames-chave',
      'Conduta',
      'Desfecho',
      'Aprendizado clínico',
    ]
  }
  return [
    'Identificador',
    'Idade',
    'Sexo',
    'Variáveis de exposição',
    'Comorbidades',
    'Desfechos',
    'Data da coleta',
    'Observações',
  ]
}

function buildMethods(kind: WorkKind, region: string): string[] {
  if (kind === 'literature_review') {
    return [
      'Definir pergunta e critérios PICO/PECO.',
      'Buscar em PubMed, SciELO, LILACS (e outras se necessário).',
      'Aplicar inclusão/exclusão com dupla checagem quando possível.',
      'Extrair dados em planilha padronizada (Excel).',
      'Sintetizar narrativamente (ou PRISMA se for sistemática).',
    ]
  }
  if (kind === 'ckd_epidemiology') {
    return [
      `Desenho transversal / amostra da região ${region}.`,
      'Coleta: nome, idade, sexo, creatinina, doença de base, estatina.',
      'Calcular TFG pela CKD-EPI 2021 (sem raça).',
      'Definir DRC operacionalmente por TFG < 60 mL/min/1.73 m².',
      'Análise descritiva: prevalência, estratos e exportação Excel/CSV.',
    ]
  }
  return [
    `Definir desenho e população na região ${region}.`,
    'Registrar variáveis mínimas em ficha padronizada.',
    'Garantar consentimento/ética conforme o tipo de estudo.',
    'Analisar dados e alimentar as seções do artigo.',
    'Exportar base (Excel) e backup (JSON / Supabase).',
  ]
}

function buildSections(kind: WorkKind) {
  const common = [
    {
      id: createId('sec'),
      title: 'Título e autores',
      guidance: 'Título claro, afiliação, correspondente.',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Resumo / Abstract',
      guidance: 'Objetivo, métodos, resultados-chave, conclusão (PT + EN se exigido).',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Introdução',
      guidance: 'Contexto, lacuna, pergunta e objetivo.',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Métodos',
      guidance: 'Desenho, amostra, variáveis, ética, análise.',
      done: false,
    },
    {
      id: createId('sec'),
      title: kind === 'literature_review' ? 'Resultados da busca / síntese' : 'Resultados',
      guidance:
        kind === 'literature_review'
          ? 'Fluxo de seleção, tabela de estudos, síntese dos achados.'
          : 'Tabelas, prevalências, estratos, achados principais.',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Discussão',
      guidance: 'Interpretação, comparação com literatura, limitações, implicações locais.',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Conclusão',
      guidance: 'Mensagem final alinhada aos objetivos.',
      done: false,
    },
    {
      id: createId('sec'),
      title: 'Referências',
      guidance: 'Padronizar (ABNT Vancouver/APA conforme o veículo).',
      done: false,
    },
  ]
  return common
}

function buildLiterature(kind: WorkKind, topic: string) {
  const keywords = extractKeywords(topic)
  return {
    databases:
      kind === 'literature_review'
        ? ['PubMed/MEDLINE', 'SciELO', 'LILACS', 'Google Scholar (apoio)']
        : ['PubMed/MEDLINE', 'SciELO', 'LILACS'],
    keywords,
    inclusion:
      kind === 'literature_review'
        ? [
            'Estudos em humanos ou revisões sobre o tema',
            'Texto completo disponível ou resumo suficiente',
            'Idioma: português, inglês ou espanhol',
          ]
        : [
            'Artigos que embasam introdução e discussão',
            'Diretrizes e dados epidemiológicos recentes',
          ],
    exclusion:
      kind === 'literature_review'
        ? [
            'Duplicatas',
            'Sem relação com a pergunta',
            'Opinião sem base empírica (salvo se justificável)',
          ]
        : ['Fontes sem rastreabilidade', 'Dados desatualizados sem justificativa'],
  }
}

function buildDeliverables(kind: WorkKind): string[] {
  const base = [
    'Protocolo / ideia estruturada (este blueprint)',
    'Planilha Excel da coleta ou da extração',
    'Backup JSON (e sync Supabase quando configurado)',
    'Rascunho do manuscrito por seções',
  ]
  if (kind === 'literature_review') {
    return [
      ...base,
      'Tabela de extração de artigos',
      'Prompt ChatGPT para aprofundar a revisão (opcional)',
    ]
  }
  if (kind === 'ckd_epidemiology') {
    return [
      ...base,
      'Painel de prevalência e estágios CKD-EPI',
      'Tabelas prontas para Resultados',
    ]
  }
  return base
}

function extractKeywords(topic: string): string[] {
  const cleaned = topic
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)
  const unique = [...new Set(cleaned)].slice(0, 8)
  const base = unique.length ? unique : ['doença renal', 'epidemiologia', 'IRC']
  return [...base, 'chronic kidney disease', 'CKD-EPI', 'prevalência']
}

function buildChatGptPrompt(args: {
  title: string
  idea: string
  kind: WorkKind
  region: string
  researchQuestion: string
  pico: ReturnType<typeof buildPico>
  specificObjectives: string[]
  requiredVariables: string[]
}): string {
  return [
    'Você é um orientador de pesquisa clínica em português do Brasil.',
    `Ajude a transformar a ideia abaixo em um trabalho científico sólido para a região ${args.region}.`,
    '',
    `Título provisório: ${args.title}`,
    `Tipo: ${args.kind}`,
    `Ideia: ${args.idea}`,
    `Pergunta: ${args.researchQuestion}`,
    '',
    'PICO:',
    `- População: ${args.pico.population}`,
    `- Exposição/Intervenção: ${args.pico.interventionOrExposure}`,
    `- Comparação: ${args.pico.comparison}`,
    `- Desfecho: ${args.pico.outcome}`,
    '',
    'Objetivos específicos:',
    ...args.specificObjectives.map((o, i) => `${i + 1}. ${o}`),
    '',
    'Variáveis necessárias:',
    ...args.requiredVariables.map((v) => `- ${v}`),
    '',
    'Peço que você:',
    '1) Refine o título e a pergunta.',
    '2) Sugira desenho, amostra e análise viáveis para região com poucos recursos.',
    '3) Monte um outline de artigo (ou revisão) com tópicos por parágrafo.',
    '4) Liste 10–15 termos de busca (PT/EN) e uma estratégia PubMed.',
    '5) Aponte riscos éticos e limitações esperadas.',
    '6) Entregue um checklist do que falta para submissão.',
  ].join('\n')
}
