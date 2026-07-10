export type UserRole = 'admin' | 'student';

export type ExamStatus = 'draft' | 'published' | 'closed';

export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'general';

export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';

export type Difficulty = 'facil' | 'medio' | 'dificil';

export type BadgeType = 'gold' | 'silver' | 'bronze' | 'streak' | 'weekly_best';

export type ChallengeType = 'min_exams' | 'min_accuracy' | 'topic_accuracy';

export type SelectionMode = 'auto' | 'manual';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  statement: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  correct_option: OptionLetter;
  explanation: string | null;
  source: string | null;
  year: number | null;
  specialty: string | null;
  topic: string | null;
  subtopic: string | null;
  difficulty: Difficulty | null;
  tags: string[];
  image_url: string | null;
  bibliography: string | null;
  created_at: string;
}

export interface Exam {
  id: string;
  title: string;
  date_available: string;
  /** Último dia (inclusivo) para iniciar a prova */
  date_closes: string;
  /** Quantidade de dias liberados (1 ou 2) */
  release_days: 1 | 2;
  duration_minutes: number;
  total_questions: number;
  show_answers_after_submit: boolean;
  show_answers_when_all_done: boolean;
  /** Se false, ranking da prova fica só no painel do professor */
  ranking_visible_to_students: boolean;
  /** Quando o ranking da prova é consolidado para o professor */
  ranking_release: 'after_all_done' | 'after_window' | 'immediate' | 'next_day';
  status: ExamStatus;
  selection_mode?: SelectionMode;
  created_at: string;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_id: string;
  order_number: number;
}

export interface Attempt {
  id: string;
  exam_id: string;
  user_id: string;
  started_at: string;
  finished_at: string | null;
  duration_seconds: number | null;
  score: number | null;
  total_correct: number;
  total_questions: number | null;
  percentage: number | null;
  submitted_automatically: boolean;
  created_at: string;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option: OptionLetter | null;
  is_correct: boolean | null;
  answered_at: string | null;
}

export interface Ranking {
  id: string;
  user_id: string;
  period_type: PeriodType;
  period_start: string;
  period_end: string;
  total_score: number;
  total_correct: number;
  total_questions: number;
  average_percentage: number;
  total_time_seconds: number;
  streak_days: number;
  position: number | null;
}

export interface ImportQuestionRow {
  enunciado: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  alternativa_e: string;
  correta: string;
  comentario?: string;
  origem?: string;
  ano?: number;
  especialidade?: string;
  tema?: string;
  subtema?: string;
  dificuldade?: string;
  tags?: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string | null;
  week_start: string;
  week_end: string;
  challenge_type: ChallengeType;
  target_value: number;
  topic: string | null;
  bonus_points: number;
  active: boolean;
  created_at: string;
}

export interface WeeklyChallengeCompletion {
  id: string;
  challenge_id: string;
  user_id: string;
  completed_at: string;
}
