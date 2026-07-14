#!/usr/bin/env node
import bankFile from '../data/imported-questions.json' with { type: 'json' };
import supplementFile from '../data/supplement-questions.json' with { type: 'json' };

const bank = bankFile.questions;
const supplement = supplementFile.questions;
const all = [...bank, ...supplement];

const GENERIC = [
  'observação ambulatorial sem investigação',
  'conduta ou diagnóstico prioritário conforme diretriz',
];

function looksTruncated(text) {
  if (!text?.trim()) return true;
  const t = text.trim();
  if (t.length < 8) return true;
  if (/[,;]$/.test(t)) return true;
  return false;
}

function isExamReady(q) {
  if ((q.statement?.length ?? 0) < 40) return false;
  const opts = ['a', 'b', 'c', 'd', 'e'].map((l) => q[`option_${l}`]);
  if (opts.some(looksTruncated)) return false;
  const genericHits = opts.filter((t) =>
    GENERIC.some((p) => t.toLowerCase().includes(p))
  ).length;
  if (genericHits >= 2) return false;
  return true;
}

const ready = all.filter(isExamReady);
const thin = bank.filter((q) => /gabarito oficial/i.test(q.explanation || ''));

console.log('Total:', all.length);
console.log('ENARE:', bank.length);
console.log('Suplemento:', supplement.length);
console.log('Aptas para prova:', ready.length);
console.log('Excluídas:', all.length - ready.length);
console.log('Comentário só gabarito oficial:', thin.length);
console.log('Truncadas ENARE:', bank.filter((q) =>
  ['a', 'b', 'c', 'd', 'e'].some((l) => looksTruncated(q[`option_${l}`]))
).length);
