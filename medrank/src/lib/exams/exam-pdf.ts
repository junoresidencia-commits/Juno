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

export type StudyPdfQuestion = ExamPdfQuestion & {
  correct_option: OptionLetter | string;
  selected_option: OptionLetter | string | null;
  is_correct: boolean;
  explanation?: string | null;
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

/**
 * PDF para estudar após a disputa: enunciado, alternativas, sua resposta,
 * gabarito e se acertou/errou (+ comentário quando houver).
 */
export function generateStudyPdfBuffer(input: {
  title: string;
  dateLabel: string;
  studentName?: string;
  scoreLabel?: string;
  questions: StudyPdfQuestion[];
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
  doc.text('MedRank — Estudo', margin, y);
  y += 7;

  doc.setFontSize(12);
  const titleLines = wrapLines(doc, input.title, maxWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 6 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80);
  const meta = [
    `Data: ${input.dateLabel}`,
    input.studentName ? `Aluno: ${input.studentName}` : null,
    input.scoreLabel || null,
    'Gabarito + suas respostas',
  ]
    .filter(Boolean)
    .join(' · ');
  doc.text(meta, margin, y);
  y += 8;
  doc.setTextColor(0);

  input.questions.forEach((q, index) => {
    ensureSpace(36);
    const status = !q.selected_option
      ? 'EM BRANCO'
      : q.is_correct
        ? 'ACERTO'
        : 'ERRO';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`Questão ${index + 1} — ${status}`, margin, y);
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
      const isCorrect = String(q.correct_option).toUpperCase() === letter;
      const isSelected = String(q.selected_option || '').toUpperCase() === letter;
      let mark = '';
      if (isCorrect) mark = ' [GABARITO]';
      if (isSelected && !isCorrect) mark = ' [SUA RESPOSTA]';
      if (isSelected && isCorrect) mark = ' [SUA RESPOSTA = GABARITO]';
      const optionLines = wrapLines(doc, `${letter}) ${text}${mark}`, maxWidth - 4);
      ensureSpace(optionLines.length * 4.2 + 2);
      if (isCorrect) doc.setFont('helvetica', 'bold');
      else doc.setFont('helvetica', 'normal');
      doc.text(optionLines, margin + 2, y);
      y += optionLines.length * 4.2 + 1.5;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60);
    const summary = `Sua resposta: ${q.selected_option || '—'} · Gabarito: ${q.correct_option}`;
    ensureSpace(6);
    doc.text(summary, margin, y);
    y += 5;

    const expl = (q.explanation || '').trim();
    if (expl) {
      doc.setFont('helvetica', 'italic');
      const explLines = wrapLines(doc, `Comentário: ${expl}`, maxWidth);
      ensureSpace(explLines.length * 3.8 + 4);
      doc.text(explLines, margin, y);
      y += explLines.length * 3.8 + 2;
    }

    doc.setTextColor(0);
    y += 5;
  });

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
