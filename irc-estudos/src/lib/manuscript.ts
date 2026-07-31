import type {
  LiteratureRecord,
  Manuscript,
  ManuscriptSection,
  Study,
  StudyStats,
  WorkBlueprint,
  WorkKind,
} from '../types'
import { CKD_STAGE_LABELS, UNDERLYING_DISEASE_LABELS } from '../types'
import { createId } from './id'

export function createManuscriptFromBlueprint(
  study: Pick<Study, 'title' | 'objective' | 'idea' | 'kind' | 'region'>,
  blueprint: WorkBlueprint,
): Manuscript {
  const now = new Date().toISOString()
  const sections: ManuscriptSection[] = blueprint.articleSections.map((s) => ({
    id: s.id,
    title: s.title,
    content: seedSectionContent(s.title, study, blueprint),
    done: false,
  }))

  return {
    authors: '',
    affiliations: `Serviço / unidade na região ${study.region}`,
    keywords: blueprint.literaturePlan.keywords.slice(0, 5).join('; '),
    abstractPt: seedAbstract(study, blueprint, 'pt'),
    abstractEn: seedAbstract(study, blueprint, 'en'),
    sections,
    updatedAt: now,
  }
}

export function ensureManuscript(study: Study): Manuscript {
  if (study.manuscript?.sections?.length) return study.manuscript
  if (!study.blueprint) {
    return {
      authors: '',
      affiliations: '',
      keywords: '',
      abstractPt: '',
      abstractEn: '',
      sections: defaultSections(study.kind),
      updatedAt: new Date().toISOString(),
    }
  }
  return createManuscriptFromBlueprint(study, study.blueprint)
}

function defaultSections(kind: WorkKind): ManuscriptSection[] {
  const titles =
    kind === 'literature_review'
      ? [
          'Introdução',
          'Métodos da busca',
          'Resultados da busca / síntese',
          'Discussão',
          'Conclusão',
          'Referências',
        ]
      : [
          'Introdução',
          'Métodos',
          'Resultados',
          'Discussão',
          'Conclusão',
          'Referências',
        ]
  return titles.map((title) => ({
    id: createId('sec'),
    title,
    content: '',
    done: false,
  }))
}

function seedAbstract(
  study: Pick<Study, 'title' | 'objective' | 'region'>,
  blueprint: WorkBlueprint,
  lang: 'pt' | 'en',
): string {
  if (lang === 'en') {
    return [
      `Objective: ${blueprint.researchQuestion}`,
      `Methods: study conducted in the ${study.region} region; see protocol for design and variables.`,
      'Results: [fill after data collection or literature extraction].',
      'Conclusion: [main message aligned with objectives].',
    ].join(' ')
  }
  return [
    `Objetivo: ${study.objective || blueprint.researchQuestion}`,
    `Métodos: trabalho desenvolvido na região ${study.region}; variáveis e desenho conforme o protocolo gerado neste app.`,
    'Resultados: [preencher após a coleta de dados ou extração da literatura].',
    'Conclusão: [mensagem principal alinhada aos objetivos].',
  ].join(' ')
}

function seedSectionContent(
  title: string,
  study: Pick<Study, 'title' | 'objective' | 'idea' | 'kind' | 'region'>,
  blueprint: WorkBlueprint,
): string {
  const t = title.toLowerCase()
  if (t.includes('introdu')) {
    return [
      `A região ${study.region} apresenta demanda crescente por evidências locais em saúde renal e afins.`,
      `Este trabalho parte da ideia: ${study.idea || study.objective}`,
      `Pergunta de pesquisa: ${blueprint.researchQuestion}`,
      '',
      'Objetivos específicos:',
      ...blueprint.specificObjectives.map((o, i) => `${i + 1}. ${o}`),
    ].join('\n')
  }
  if (t.includes('método')) {
    return [
      ...blueprint.methodsOutline.map((m, i) => `${i + 1}. ${m}`),
      '',
      'Variáveis:',
      ...blueprint.requiredVariables.map((v) => `- ${v}`),
      '',
      `PICO — P: ${blueprint.pico.population}`,
      `I/E: ${blueprint.pico.interventionOrExposure}`,
      `C: ${blueprint.pico.comparison}`,
      `O: ${blueprint.pico.outcome}`,
    ].join('\n')
  }
  if (t.includes('resultado')) {
    return '[Clique em “Preencher com dados” no manuscrito após cadastrar pacientes ou artigos da revisão.]'
  }
  if (t.includes('discuss')) {
    return [
      'Compare os achados com a literatura (use a aba Literatura).',
      'Discuta implicações para a prática na região ' + study.region + '.',
      'Liste limitações (amostra, desenho, dados faltantes, generalização).',
      'Sugira próximos trabalhos e políticas locais.',
    ].join('\n')
  }
  if (t.includes('conclus')) {
    return 'Em síntese, [mensagem final objetiva alinhada à pergunta e aos resultados].'
  }
  if (t.includes('refer')) {
    return [
      'Inclua diretrizes e artigos-chave (Vancouver/ABNT conforme o veículo).',
      'Descritores sugeridos: ' + blueprint.literaturePlan.keywords.join('; '),
    ].join('\n')
  }
  if (t.includes('título') || t.includes('autor')) {
    return `${study.title}\n\nAutores: [preencher]\nAfiliação: região ${study.region}`
  }
  if (t.includes('resumo') || t.includes('abstract')) {
    return 'Use os campos de resumo PT/EN no topo do manuscrito.'
  }
  return ''
}

/** Gera parágrafo de Resultados a partir da estatística dos pacientes. */
export function buildResultsFromStats(
  study: Pick<Study, 'title' | 'region'>,
  stats: StudyStats,
): string {
  if (!stats.totalPatients) {
    return 'Ainda não há pacientes cadastrados. Inclua a amostra e gere novamente esta seção.'
  }

  const diseaseLines = (
    Object.entries(stats.byDisease) as [keyof typeof UNDERLYING_DISEASE_LABELS, number][]
  )
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([k, n]) =>
        `${UNDERLYING_DISEASE_LABELS[k]}: ${n} (${pct(n, stats.totalPatients)}%)`,
    )

  const stageLines = (
    Object.entries(stats.byStage) as [keyof typeof CKD_STAGE_LABELS, number][]
  )
    .filter(([, n]) => n > 0)
    .map(
      ([k, n]) =>
        `${CKD_STAGE_LABELS[k]}: ${n} (${pct(n, stats.totalPatients)}%)`,
    )

  const ageLines = stats.ageBands
    .filter((b) => b.total > 0)
    .map(
      (b) =>
        `${b.label} anos: ${b.total} pacientes; DRC em ${b.ckd} (${pct(b.ckd, b.total)}%)`,
    )

  return [
    `Foram incluídos ${stats.totalPatients} pacientes na região ${study.region}.`,
    `A idade média foi ${stats.meanAge.toFixed(1)} anos; ${stats.bySex.F} do sexo feminino (${pct(stats.bySex.F, stats.totalPatients)}%) e ${stats.bySex.M} do masculino (${pct(stats.bySex.M, stats.totalPatients)}%).`,
    `A creatinina média foi ${stats.meanCreatinine.toFixed(2)} mg/dL e a TFG média (CKD-EPI 2021) foi ${stats.meanEgfr.toFixed(1)} mL/min/1.73 m².`,
    `A prevalência de DRC definida por TFG < 60 foi ${stats.ckdPrevalence.toFixed(1)}% (${stats.ckdCount}/${stats.totalPatients}).`,
    `Uso de estatina: ${stats.statinCount} pacientes (${stats.statinRate.toFixed(1)}%).`,
    '',
    'Distribuição por estágio:',
    ...stageLines.map((l) => `- ${l}`),
    '',
    'Doença de base:',
    ...diseaseLines.map((l) => `- ${l}`),
    '',
    'DRC por faixa etária:',
    ...ageLines.map((l) => `- ${l}`),
  ].join('\n')
}

/** Síntese da extração bibliográfica para a seção de resultados da revisão. */
export function buildResultsFromLiterature(
  study: Pick<Study, 'region'>,
  records: LiteratureRecord[],
): string {
  const included = records.filter((r) => r.included)
  if (!included.length) {
    return 'Nenhum artigo marcado como incluído. Cadastre a extração na aba Literatura.'
  }
  const years = included
    .map((r) => r.year)
    .filter((y): y is number => typeof y === 'number')
  const yearSpan =
    years.length > 0
      ? `${Math.min(...years)}–${Math.max(...years)}`
      : 'anos não informados'

  const lines = included.map(
    (r, i) =>
      `${i + 1}. ${r.authors || 's/aut.'} (${r.year ?? 's/d'}). ${r.title}. ${r.journal || 's/periódico'}. Achados: ${r.mainFindings || '—'}.`,
  )

  return [
    `Foram incluídos ${included.length} estudos na síntese (período aproximado: ${yearSpan}), com foco aplicável à região ${study.region}.`,
    `Total cadastrado na extração: ${records.length}; excluídos ou não incluídos: ${records.length - included.length}.`,
    '',
    'Síntese dos estudos incluídos:',
    ...lines,
  ].join('\n')
}

export function manuscriptToMarkdown(study: Study, manuscript: Manuscript): string {
  const parts = [
    `# ${study.title}`,
    '',
    manuscript.authors ? `**Autores:** ${manuscript.authors}` : '',
    manuscript.affiliations ? `**Afiliação:** ${manuscript.affiliations}` : '',
    manuscript.keywords ? `**Palavras-chave:** ${manuscript.keywords}` : '',
    '',
    '## Resumo',
    manuscript.abstractPt || '_Preencher resumo em português._',
    '',
    '## Abstract',
    manuscript.abstractEn || '_Fill English abstract._',
    '',
    ...manuscript.sections.flatMap((s) => [
      `## ${s.title}`,
      s.content || '_Seção em branco._',
      '',
    ]),
  ]
  return parts.filter((line, i, arr) => !(line === '' && arr[i - 1] === '')).join('\n')
}

export function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function manuscriptProgress(manuscript?: Manuscript): {
  done: number
  total: number
  pct: number
} {
  if (!manuscript) return { done: 0, total: 0, pct: 0 }
  const items = [
    Boolean(manuscript.authors.trim()),
    Boolean(manuscript.abstractPt.trim()),
    ...manuscript.sections.map((s) => s.done || s.content.trim().length > 40),
  ]
  const done = items.filter(Boolean).length
  const total = items.length
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}

function pct(n: number, total: number): string {
  if (!total) return '0.0'
  return ((n / total) * 100).toFixed(1)
}
