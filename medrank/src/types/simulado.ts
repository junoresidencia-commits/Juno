export type SimuladoMode =
  | 'geral'
  | 'enare'
  | 'usp'
  | 'area'
  | 'tema'
  | 'revisao_erros';

export interface SimuladoSession {
  id: string;
  user_id: string;
  mode: SimuladoMode;
  title: string;
  area_filter: string | null;
  theme_filter: string | null;
  question_ids: string[];
  duration_minutes: number;
  started_at: string;
  finished_at: string | null;
  duration_seconds: number | null;
  score: number | null;
  total_correct: number;
  total_questions: number;
  percentage: number | null;
  submitted_automatically: boolean;
  created_at: string;
}

export interface SimuladoAnswer {
  id: string;
  session_id: string;
  question_id: string;
  selected_option: string | null;
  is_correct: boolean | null;
  answered_at: string | null;
}

export interface QuestionBankStats {
  total: number;
  byArea: { area: string; count: number }[];
  sources: string[];
  yearRange: [number, number] | null;
}

export interface SimuladoModeOption {
  mode: SimuladoMode;
  title: string;
  description: string;
  icon: string;
}
