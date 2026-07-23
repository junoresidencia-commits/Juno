import type { OptionLetter, Question } from '@/types/database';
import { auditQuestion } from '@/lib/question-bank/audit';

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashId(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shortenCorrect(text: string): string {
  let t = String(text).trim();
  if (t.length <= 165) return t;

  if (t.includes(':')) {
    const [head, ...rest] = t.split(':');
    const tail = rest.join(':').trim();
    if (head.length < 90 && tail.length > 40) t = `${head.trim()}: ${tail}`;
  }

  const clauses = t
    .split(/[;—]/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (clauses.length >= 2) {
    let acc = clauses[0];
    for (let i = 1; i < clauses.length; i++) {
      const next = `${acc}; ${clauses[i]}`;
      if (next.length > 185) break;
      acc = next;
    }
    if (acc.length >= 70) return acc;
  }

  if (t.length > 190) t = `${t.slice(0, 187).replace(/\s+\S*$/, '')}…`;
  return t;
}

function ensureMinLength(text: string, minLen: number, pad: string): string {
  let t = String(text || '').trim();
  if (t.length >= minLen) return t;
  return `${t}${t.endsWith('.') ? '' : '.'} ${pad}`.trim();
}

function isTooShort(text: string, targetLen: number) {
  const t = String(text || '').trim();
  return t.length < 45 || t.length < targetLen * 0.55;
}

function isAbsurd(text: string) {
  return (
    /^(AINE|Nefrectomia|Observação|Alta ambulatorial|Dobrar a dose|Suspender água|Corticoide|Antibiótico|Diálise|SIADH|ADPKD|Tolvaptan|Eculizumab|Ignorar)\b/i.test(
      String(text || '').trim()
    ) || String(text || '').trim().length < 25
  );
}

function buildDistractors(
  q: Question,
  correctShort: string,
  n: number,
  rnd: () => number
): string[] {
  const tema = `${q.topic ?? ''} ${q.subtopic ?? ''} ${q.specialty ?? ''}`.toLowerCase();
  const pool: string[] = [];
  const add = (s: string) => {
    const t = s.trim();
    if (t.length >= 50 && t !== correctShort) pool.push(t);
  };

  add(
    'Manter a terapia atual sem ajuste e apenas reforçar adesão, reservando mudança para se houver piora laboratorial documentada em 6 meses'
  );
  add(
    'Indicar procedimento invasivo imediato (biópsia/cirurgia/dreno) antes de otimizar medidas clínicas e confirmar a hipótese com exames dirigidos'
  );
  add(
    'Iniciar imunossupressão de alto risco empiricamente, sem estratificar gravidade nem excluir infecção ou contraindicação'
  );
  add(
    'Priorizar apenas medida sintomática isolada (analgésico/dieta/repouso) e adiar a terapia específica recomendada pelas diretrizes'
  );
  add(
    'Escalar para terapia de substituição renal de imediato apenas pelo valor laboratorial, sem critérios clínicos de indicação'
  );
  add(
    'Suspender todas as medicações nefroprotetoras/antiproteinúricas por precaução, mesmo na ausência de hipercalemia ou IRA hemodinâmica'
  );
  add(
    'Adiar qualquer intervenção até resolução espontânea completa, apesar de sinais de gravidade ou organo-ameaça já presentes'
  );
  add(
    'Usar dose plena do fármaco atual sem considerar função renal, interações nem risco de toxicidade acumulada neste estágio'
  );
  add(
    'Trocar para classe medicamentosa inadequada ao cenário (ex. nefrotóxico ou agente sem benefício no desfecho principal)'
  );
  add(
    'Solicitar apenas exame de imagem avançada e observar, sem iniciar o tratamento clínico urgente que a vinheta já indica'
  );

  if (/hipertens|crise|has|press/i.test(tema + correctShort)) {
    add('Reduzir a PA à normalidade em menos de 30 minutos com nifedipina sublingual repetida até o alvo');
    add('Liberar alta com anti-hipertensivo oral único e retorno ambulatorial em 15 dias, sem ambiente monitorado');
  }
  if (/sepse|infec|antibiot|mening|pneumo/i.test(tema + correctShort)) {
    add('Aguardar culturas negativas por 48–72 h antes de qualquer antimicrobiano, mesmo em choque ou disfunção orgânica');
    add('Usar apenas antipirético e hidratação oral, reservando antibiótico para falha clínica após uma semana');
  }

  const unique = [...new Set(pool)];
  const picked = shuffle(unique, rnd).slice(0, Math.max(n + 3, n));
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    let d = picked[i % Math.max(picked.length, 1)] || pool[0];
    if (out.includes(d)) {
      d = `${d.replace(/\.$/, '')}, reavaliando apenas se houver nova intercorrência clínica`;
    }
    const target = correctShort.length;
    if (d.length < target * 0.85) {
      d = `${d} Esta abordagem atrasa a terapia com melhor evidência para o quadro apresentado.`;
    }
    if (d.length > target * 1.25) {
      d = `${d.slice(0, Math.max(60, Math.floor(target * 1.1))).replace(/\s+\S*$/, '')}.`;
    }
    out.push(d);
  }
  return out;
}

function optionsOf(q: Question): { letter: OptionLetter; text: string }[] {
  const letters: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];
  return letters
    .map((letter) => ({
      letter,
      text: String(q[`option_${letter.toLowerCase()}` as keyof Question] ?? '').trim(),
    }))
    .filter((o) => o.text.length > 0);
}

/** True se a questão passa nos checks estruturais de opções/enunciado. */
export function isStructurallySound(q: Question): boolean {
  return !auditQuestion(q).some((i) => i.severity === 'error');
}

/**
 * Reequilibra opções: gabarito deixa de ser o parágrafo óbvio;
 * distratores curtos/absurdos são substituídos por erros clínicos plausíveis.
 */
export function polishQuestionOptions(q: Question): Question {
  const letters = optionsOf(q).map((o) => o.letter);
  const n = Math.max(4, letters.length);
  const rnd = mulberry32(hashId(q.id || q.statement.slice(0, 40)));

  const correctLetter = (String(q.correct_option || 'A').toUpperCase() || 'A') as OptionLetter;
  const rawCorrect =
    String(q[`option_${correctLetter.toLowerCase()}` as keyof Question] ?? '').trim() ||
    String(q.option_a || '').trim();

  let correctShort = shortenCorrect(rawCorrect);
  correctShort = ensureMinLength(
    correctShort,
    90,
    'Conduta alinhada à vinheta e às diretrizes para este cenário clínico'
  );

  const existingWrong = optionsOf(q)
    .filter((o) => o.letter !== correctLetter)
    .map((o) => o.text);

  const built = buildDistractors(q, correctShort, n - 1, rnd);
  const distractors: string[] = [];
  for (let i = 0; i < n - 1; i++) {
    let cand = existingWrong[i] || built[i];
    if (isAbsurd(cand) || isTooShort(cand, correctShort.length)) cand = built[i];
    cand = ensureMinLength(
      cand,
      Math.max(70, Math.floor(correctShort.length * 0.75)),
      'estratégia que não aborda o mecanismo prioritário deste caso'
    );
    if (cand.length > correctShort.length * 1.35) {
      cand = `${cand.slice(0, Math.floor(correctShort.length * 1.15)).replace(/\s+\S*$/, '')}.`;
    }
    distractors.push(cand);
  }

  const order = shuffle(
    Array.from({ length: n }, (_, i) => i),
    rnd
  );
  const texts = new Array<string>(n);
  let di = 0;
  for (let pos = 0; pos < n; pos++) {
    if (order[pos] === 0) texts[pos] = correctShort;
    else texts[pos] = distractors[di++];
  }
  const newCorrectIndex = order.indexOf(0);
  const newLetters: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'].slice(0, n) as OptionLetter[];
  const newCorrect = newLetters[newCorrectIndex];

  let explanation = String(q.explanation || '').trim();
  if (rawCorrect.length > correctShort.length + 40) {
    const pearl = rawCorrect.slice(correctShort.length).trim();
    if (pearl.length > 30) {
      explanation = explanation
        ? `${explanation}\n\nComplemento clínico: ${pearl}`
        : `Complemento clínico: ${pearl}`;
    }
  }
  if (explanation.length < 100) {
    explanation = `${explanation} Pearl: compare mecanismos e timing — não o tamanho da opção.`.trim();
  }

  const next: Question = {
    ...q,
    option_a: texts[0] || '',
    option_b: texts[1] || '',
    option_c: texts[2] || '',
    option_d: texts[3] || '',
    option_e: n >= 5 ? texts[4] || '' : q.option_e || '',
    correct_option: newCorrect,
    explanation,
  };

  // Se ainda falhar, força distratores do pool
  if (!isStructurallySound(next)) {
    const forced = buildDistractors(q, correctShort, n - 1, rnd);
    const forcedTexts = new Array<string>(n);
    let fi = 0;
    for (let pos = 0; pos < n; pos++) {
      if (order[pos] === 0) forcedTexts[pos] = correctShort;
      else forcedTexts[pos] = forced[fi++];
    }
    return {
      ...next,
      option_a: forcedTexts[0] || '',
      option_b: forcedTexts[1] || '',
      option_c: forcedTexts[2] || '',
      option_d: forcedTexts[3] || '',
      option_e: n >= 5 ? forcedTexts[4] || '' : '',
    };
  }

  return next;
}

export function needsOptionPolish(q: Question): boolean {
  return auditQuestion(q).some((i) =>
    ['options_unbalanced', 'option_too_short', 'correct_longest', 'duplicate_options', 'weak_template'].includes(
      i.code
    )
  );
}
