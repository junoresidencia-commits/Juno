import * as XLSX from 'xlsx';
import type {
  QuestionErrorRow,
  RankingReportRow,
  StudentPerformanceRow,
  TopicStatRow,
} from './data';

export interface ReportData {
  students: StudentPerformanceRow[];
  topics: TopicStatRow[];
  questions: QuestionErrorRow[];
  ranking: RankingReportRow[];
  generatedAt: string;
  periodLabel: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m${s}s`;
}

export function generateExcelBuffer(data: ReportData): Buffer {
  const wb = XLSX.utils.book_new();

  const studentsSheet = XLSX.utils.json_to_sheet(
    data.students.map((s) => ({
      Nome: s.name,
      Email: s.email,
      Provas: s.provas,
      Acertos: s.acertos,
      Questões: s.questoes,
      'Média %': s.mediaPercentual,
      'Tempo médio': formatTime(s.tempoMedioSeg),
      Pontuação: s.pontuacao,
    }))
  );
  XLSX.utils.book_append_sheet(wb, studentsSheet, 'Desempenho alunos');

  const rankingSheet = XLSX.utils.json_to_sheet(
    data.ranking.map((r) => ({
      Posição: r.posicao,
      Nome: r.nome,
      Acertos: r.acertos,
      Questões: r.questoes,
      'Média %': r.mediaPercentual,
      'Tempo total': formatTime(r.tempoTotalSeg),
      Pontuação: r.pontuacao,
      Streak: r.streak,
    }))
  );
  XLSX.utils.book_append_sheet(wb, rankingSheet, `Ranking ${data.periodLabel}`);

  const topicsSheet = XLSX.utils.json_to_sheet(
    data.topics.map((t) => ({
      Tema: t.tema,
      Total: t.total,
      Acertos: t.acertos,
      Erros: t.erros,
      'Taxa erro %': t.taxaErro,
    }))
  );
  XLSX.utils.book_append_sheet(wb, topicsSheet, 'Estatísticas temas');

  const questionsSheet = XLSX.utils.json_to_sheet(
    data.questions.map((q) => ({
      Enunciado: q.enunciado,
      Tema: q.tema,
      Origem: q.origem,
      Respostas: q.totalRespostas,
      Erros: q.erros,
      'Taxa erro %': q.taxaErro,
    }))
  );
  XLSX.utils.book_append_sheet(wb, questionsSheet, 'Questões com erro');

  const metaSheet = XLSX.utils.aoa_to_sheet([
    ['MedRank — Relatório'],
    ['Gerado em', data.generatedAt],
    ['Período ranking', data.periodLabel],
  ]);
  XLSX.utils.book_append_sheet(wb, metaSheet, 'Info');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}
