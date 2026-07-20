import { jsPDF } from 'jspdf';
import type { OptionLetter } from '@/types/database';

export type ExamPdfQuestion = {
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
};

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];

function wrapLines(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

/** PDF da prova sem gabarito nem comentários — só enunciados e alternativas. */
export function generateExamPdfBuffer(input: {
  title: string;
  dateLabel: string;
  questions: ExamPdfQuestion[];
}): Buffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const maxWidth = pageWidth - margin * 2;
  let y = 18;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 16) {
      doc.addPage();
      y = 18;
    }
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MedRank', margin, y);
  y += 7;

  doc.setFontSize(12);
  const titleLines = wrapLines(doc, input.title, maxWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(`Data: ${input.dateLabel} · Prova (sem gabarito)`, margin, y);
  y += 8;
  doc.setTextColor(0);

  input.questions.forEach((q, index) => {
    ensureSpace(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Questão ${index + 1}`, margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const statementLines = wrapLines(doc, q.statement || '', maxWidth);
    ensureSpace(statementLines.length * 4.2 + 4);
    doc.text(statementLines, margin, y);
    y += statementLines.length * 4.2 + 3;

    for (const letter of LETTERS) {
      const key = `option_${letter.toLowerCase()}` as keyof ExamPdfQuestion;
      const text = (q[key] as string)?.trim();
      if (!text) continue;
      const optionLines = wrapLines(doc, `${letter}) ${text}`, maxWidth - 4);
      ensureSpace(optionLines.length * 4.2 + 2);
      doc.text(optionLines, margin + 2, y);
      y += optionLines.length * 4.2 + 1.5;
    }
    y += 4;
  });

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
