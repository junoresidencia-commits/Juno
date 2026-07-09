import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ReportData } from './excel';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function generatePdfBuffer(data: ReportData): Buffer {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(18);
  doc.text('MedRank — Relatório', pageWidth / 2, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Gerado em: ${data.generatedAt}`, pageWidth / 2, 28, { align: 'center' });
  doc.text(`Ranking: ${data.periodLabel}`, pageWidth / 2, 34, { align: 'center' });

  let startY = 42;

  doc.setFontSize(14);
  doc.text('Desempenho por aluno', 14, startY);
  startY += 4;

  autoTable(doc, {
    startY,
    head: [['Nome', 'Provas', 'Acertos', 'Média %', 'Pontuação']],
    body: data.students.map((s) => [
      s.name,
      String(s.provas),
      `${s.acertos}/${s.questoes}`,
      `${s.mediaPercentual}%`,
      String(s.pontuacao),
    ]),
    styles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
  });

  startY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

  doc.setFontSize(14);
  doc.text(`Ranking — ${data.periodLabel}`, 14, startY);
  startY += 4;

  autoTable(doc, {
    startY,
    head: [['#', 'Nome', 'Acertos', 'Média %', 'Tempo', 'Pts']],
    body: data.ranking.map((r) => [
      String(r.posicao),
      r.nome,
      `${r.acertos}/${r.questoes}`,
      `${r.mediaPercentual}%`,
      formatTime(r.tempoTotalSeg),
      String(r.pontuacao),
    ]),
    styles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
  });

  doc.addPage();
  startY = 20;

  doc.setFontSize(14);
  doc.text('Estatísticas por tema', 14, startY);
  startY += 4;

  autoTable(doc, {
    startY,
    head: [['Tema', 'Total', 'Acertos', 'Erros', 'Taxa erro']],
    body: data.topics.slice(0, 25).map((t) => [
      t.tema,
      String(t.total),
      String(t.acertos),
      String(t.erros),
      `${t.taxaErro}%`,
    ]),
    styles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
  });

  startY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;

  doc.setFontSize(14);
  doc.text('Questões com maior índice de erro', 14, startY);
  startY += 4;

  autoTable(doc, {
    startY,
    head: [['Enunciado', 'Tema', 'Erros', 'Taxa']],
    body: data.questions.slice(0, 15).map((q) => [
      q.enunciado.slice(0, 60),
      q.tema,
      String(q.erros),
      `${q.taxaErro}%`,
    ]),
    styles: { fontSize: 7 },
    margin: { left: 14, right: 14 },
  });

  return Buffer.from(doc.output('arraybuffer'));
}
