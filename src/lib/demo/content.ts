import type {
  Attempt,
  AttemptAnswer,
  Difficulty,
  Exam,
  OptionLetter,
  Question,
  Ranking,
  WeeklyChallenge,
} from '@/types/database';
import { calculateRankingScore } from '@/lib/utils';
import { getMonthEnd, getMonthStart, getWeekEnd, getWeekStart } from '@/lib/periods';
import { getQuestionBank } from '@/lib/question-bank/pool';
import { defaultExamReleaseFields } from '@/lib/exams/release';
import { todayDateStringBrazil } from '@/lib/exams/window';

const LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D', 'E'];
const SOURCES = ['ENARE', 'USP', 'SUS-SP', 'Unicamp', 'AMRIGS'] as const;
const DIFFICULTIES: Difficulty[] = ['facil', 'medio', 'dificil'];

const TOPICS = [
  {
    specialty: 'Clínica Médica',
    topic: 'Nefrologia',
    subtopics: ['IRA', 'DRC', 'Hipercalemia', 'Acidose metabólica', 'Glomerulopatias'],
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Cardiologia',
    subtopics: ['Síndrome coronariana', 'Insuficiência cardíaca', 'Arritmias', 'Valvopatias'],
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Pneumologia',
    subtopics: ['Asma', 'DPOC', 'Pneumonia', 'TEP'],
  },
  {
    specialty: 'Clínica Médica',
    topic: 'Infectologia',
    subtopics: ['Sepse', 'Antibioticoterapia', 'HIV', 'Tuberculose'],
  },
  {
    specialty: 'Cirurgia',
    topic: 'Cirurgia Geral',
    subtopics: ['Abdome agudo', 'Hérnias', 'Trauma', 'Pós-operatório'],
  },
  {
    specialty: 'Ginecologia e Obstetrícia',
    topic: 'Obstetrícia',
    subtopics: ['Pré-eclâmpsia', 'Hemorragia', 'Trabalho de parto', 'Diabetes gestacional'],
  },
  {
    specialty: 'Pediatria',
    topic: 'Pediatria Geral',
    subtopics: ['Neonatologia', 'Desidratação', 'Infecções', 'Puericultura'],
  },
];

function dateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

function shiftDays(base: Date, amount: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + amount);
  return next;
}

function sourceFor(index: number) {
  return SOURCES[index % SOURCES.length];
}

function difficultyFor(index: number): Difficulty {
  return DIFFICULTIES[index % DIFFICULTIES.length];
}

function letterAt(index: number): OptionLetter {
  return LETTERS[index % LETTERS.length];
}

export function getDemoQuestions(): Question[] {
  const bank = getQuestionBank();
  if (bank.length > 0) {
    return bank;
  }

  const questions: Question[] = [];
  let idCounter = 1;

  for (let cycle = 0; cycle < 12; cycle++) {
    for (const area of TOPICS) {
      for (const subtopic of area.subtopics) {
        const questionIndex = idCounter;
        const correct = letterAt(questionIndex);
        const wrongs = LETTERS.filter((l) => l !== correct);
        questions.push({
          id: `demo-q-${questionIndex}`,
          statement: `Paciente em cenário típico de ${subtopic.toLowerCase()} durante revisão para ${sourceFor(questionIndex)}. Qual é a conduta inicial mais adequada segundo o raciocínio clínico prioritário?`,
          option_a: correct === 'A' ? `Confirmar ${subtopic.toLowerCase()} e iniciar a conduta prioritária.` : `Aguardar evolução clínica sem reavaliar risco imediato.`,
          option_b: correct === 'B' ? `Confirmar ${subtopic.toLowerCase()} e iniciar a conduta prioritária.` : `Solicitar exames irrelevantes antes de estabilizar o paciente.`,
          option_c: correct === 'C' ? `Confirmar ${subtopic.toLowerCase()} e iniciar a conduta prioritária.` : `Ignorar sinais de gravidade e marcar retorno ambulatorial.`,
          option_d: correct === 'D' ? `Confirmar ${subtopic.toLowerCase()} e iniciar a conduta prioritária.` : `Escolher tratamento definitivo sem estabilização prévia.`,
          option_e: correct === 'E' ? `Confirmar ${subtopic.toLowerCase()} e iniciar a conduta prioritária.` : `Adiar a decisão até surgir complicação evidente.`,
          correct_option: correct,
          explanation: `Questão autoral em estilo ${sourceFor(questionIndex)}. O foco é reconhecer o contexto de ${subtopic.toLowerCase()} e priorizar a medida inicial com maior impacto clínico.`,
          source: sourceFor(questionIndex),
          year: 2020 + (questionIndex % 6),
          specialty: area.specialty,
          topic: area.topic,
          subtopic,
          difficulty: difficultyFor(questionIndex),
          tags: [area.topic, subtopic, sourceFor(questionIndex), 'autoral'],
          image_url: null,
          bibliography: 'Material autoral de revisão clínica',
          created_at: new Date(2026, 0, 1).toISOString(),
        });
        idCounter += 1;
      }
    }
  }

  return questions;
}

export function getDemoExams(): Exam[] {
  const start = new Date(`${todayDateStringBrazil()}T12:00:00`);
  const exams: Exam[] = [];

  for (let day = 0; day < 150; day++) {
    const date = shiftDays(start, day);
    const dateStr = dateString(date);
    exams.push({
      id: `demo-exam-${day + 1}`,
      title: `Prova Diária ${day + 1} — ENARE/USP`,
      date_available: dateStr,
      ...defaultExamReleaseFields(dateStr),
      duration_minutes: 30,
      total_questions: 20 + (day % 3) * 5,
      show_answers_after_submit: false,
      show_answers_when_all_done: false,
      status: 'published',
      selection_mode: day % 5 === 0 ? 'manual' : 'auto',
      created_at: date.toISOString(),
    });
  }

  return exams;
}

export function getDemoExamQuestions(examId: string): (Question & { order_number: number })[] {
  const exam = getDemoExams().find((item) => item.id === examId);
  if (!exam) return [];

  const questions = getDemoQuestions();
  const examNumber = Number(examId.replace('demo-exam-', '')) || 1;
  const startIndex = ((examNumber - 1) * 11) % questions.length;

  return Array.from({ length: exam.total_questions }, (_, index) => ({
    ...questions[(startIndex + index) % questions.length],
    order_number: index + 1,
  }));
}

export function getDemoWeeklyChallenges(): WeeklyChallenge[] {
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();
  const now = new Date().toISOString();

  return [
    {
      id: 'demo-ch-1',
      title: 'Ritmo ENARE',
      description: 'Complete pelo menos 5 provas nesta semana.',
      week_start: weekStart,
      week_end: weekEnd,
      challenge_type: 'min_exams',
      target_value: 5,
      topic: null,
      bonus_points: 50,
      active: true,
      created_at: now,
    },
    {
      id: 'demo-ch-2',
      title: 'Precisão USP',
      description: 'Mantenha média de 80% ou mais.',
      week_start: weekStart,
      week_end: weekEnd,
      challenge_type: 'min_accuracy',
      target_value: 80,
      topic: null,
      bonus_points: 80,
      active: true,
      created_at: now,
    },
    {
      id: 'demo-ch-3',
      title: 'Foco em Nefrologia',
      description: 'Acerte 75% das questões de nefrologia.',
      week_start: weekStart,
      week_end: weekEnd,
      challenge_type: 'topic_accuracy',
      target_value: 75,
      topic: 'Nefrologia',
      bonus_points: 70,
      active: true,
      created_at: now,
    },
  ];
}

export interface DemoSeedAttempt extends Attempt {
  exam_title: string;
}

function generatedAttempt(dayOffset: number, exam: Exam): DemoSeedAttempt {
  const started = shiftDays(new Date(exam.date_available), 0);
  started.setHours(8, 0, 0, 0);
  const durationSeconds = 900 + (dayOffset % 10) * 63;
  const totalQuestions = exam.total_questions;
  const totalCorrect = Math.max(11, totalQuestions - (dayOffset % 7));
  const percentage = Math.round((totalCorrect / totalQuestions) * 1000) / 10;
  const score = calculateRankingScore(totalCorrect, totalQuestions, durationSeconds);
  const finished = new Date(started.getTime() + durationSeconds * 1000);

  return {
    id: `seed-attempt-${dayOffset + 1}`,
    exam_id: exam.id,
    user_id: 'guest-student',
    started_at: started.toISOString(),
    finished_at: finished.toISOString(),
    duration_seconds: durationSeconds,
    score,
    total_correct: totalCorrect,
    total_questions: totalQuestions,
    percentage,
    submitted_automatically: false,
    created_at: started.toISOString(),
    exam_title: exam.title,
  };
}

export function getSeededAttempts(): DemoSeedAttempt[] {
  const exams = getDemoExams();
  return exams.slice(0, 12).map((exam, index) => generatedAttempt(index, exam));
}

export function getSeededAttemptAnswers(attemptId: string): AttemptAnswer[] {
  const attempt = getSeededAttempts().find((item) => item.id === attemptId);
  if (!attempt) return [];
  const questions = getDemoExamQuestions(attempt.exam_id);

  return questions.map((question, index) => {
    const isCorrect = index < attempt.total_correct;
    const selected = isCorrect
      ? question.correct_option
      : LETTERS.find((l) => l !== question.correct_option) ?? 'A';
    return {
      id: `${attempt.id}-${question.id}`,
      attempt_id: attempt.id,
      question_id: question.id,
      selected_option: selected,
      is_correct: isCorrect,
      answered_at: attempt.finished_at,
    };
  });
}

export function getDemoRankings(period: 'daily' | 'weekly' | 'monthly' | 'general', date?: string): Ranking[] {
  const baseDate = date ?? dateString(new Date());
  const students = [
    { id: 'r1', name: 'Larissa', correct: 18, total: 20, time: 1180, streak: 11 },
    { id: 'r2', name: 'Mateus', correct: 17, total: 20, time: 1110, streak: 9 },
    { id: 'guest-student', name: 'Você', correct: 16, total: 20, time: 1240, streak: 7 },
    { id: 'r4', name: 'Helena', correct: 15, total: 20, time: 1160, streak: 6 },
    { id: 'r5', name: 'Daniel', correct: 14, total: 20, time: 1320, streak: 4 },
  ];

  const bounds = {
    daily: { start: baseDate, end: baseDate },
    weekly: { start: getWeekStart(new Date(baseDate)), end: getWeekEnd(new Date(baseDate)) },
    monthly: { start: getMonthStart(new Date(baseDate)), end: getMonthEnd(new Date(baseDate)) },
    general: { start: '2026-07-09', end: getMonthEnd(new Date(baseDate)) },
  }[period];

  return students.map((s, index) => ({
    id: `ranking-${period}-${s.id}`,
    user_id: s.id,
    period_type: period,
    period_start: bounds.start,
    period_end: bounds.end,
    total_score: calculateRankingScore(s.correct, s.total, s.time) * (period === 'daily' ? 1 : period === 'weekly' ? 4 : period === 'monthly' ? 12 : 20),
    total_correct: s.correct * (period === 'daily' ? 1 : period === 'weekly' ? 4 : period === 'monthly' ? 12 : 20),
    total_questions: s.total * (period === 'daily' ? 1 : period === 'weekly' ? 4 : period === 'monthly' ? 12 : 20),
    average_percentage: Math.round((s.correct / s.total) * 1000) / 10,
    total_time_seconds: s.time * (period === 'daily' ? 1 : period === 'weekly' ? 4 : period === 'monthly' ? 12 : 20),
    streak_days: s.streak,
    position: index + 1,
  }));
}

