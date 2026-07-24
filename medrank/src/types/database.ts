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
  /** Aluno autorizado a criar ligas (grupos). Professores sempre podem. */
  league_admin?: boolean;
  /**
   * Módulos ligados pelo admin: nephrology | general | mri…
   * Controla disputas diárias e treinos livres.
   */
  enabled_tracks?: string[];
}

export type BankStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'disabled'
  | 'annulled';

export type QuestionOrigin =
  | 'official'
  | 'original_based_on_exam'
  | 'original'
  | 'guideline';

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
  /** Aprovação no banco permanente — só approved entra na disputa diária. */
  bank_status?: BankStatus | null;
  question_origin?: QuestionOrigin | null;
  institution?: string | null;
  exam_name?: string | null;
  source_url?: string | null;
  official_answer?: string | null;
  reproduction_allowed?: boolean | null;
  statement_fingerprint?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  import_batch_id?: string | null;
  appears_in_exams?: string[] | null;
  /** Classificação pedagógica (auditoria do banco). */
  quality_label?:
    | 'aprovada'
    | 'precisa_de_correcao'
    | 'muito_facil'
    | 'enunciado_mal_construido'
    | 'alternativa_ambigua'
    | 'gabarito_duvidoso'
    | 'questao_repetida'
    | 'deve_ser_excluida'
    | 'anulada'
    | null;
  quality_notes?: string | null;
  quality_reviewed_at?: string | null;
  quality_reviewed_by?: string | null;
  /** acesso_direto | pre_requisito | titulo | revalida | outro */
  exam_track?: string | null;
  external_id?: string | null;
  question_kind?:
    | 'official_residency'
    | 'authorial_guideline'
    | 'authorial_prediction'
    | 'in_review'
    | null;
  area?: string | null;
  option_a_rationale?: string | null;
  option_b_rationale?: string | null;
  option_c_rationale?: string | null;
  option_d_rationale?: string | null;
  option_e_rationale?: string | null;
  guideline_name?: string | null;
  guideline_institution?: string | null;
  guideline_year?: number | null;
  question_version?: string | null;
  lote_importacao?: string | null;
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
  /** general = outras ligas; nephrology = Liga de Nefrologia */
  audience?: 'general' | 'nephrology';
  exam_kind?: 'daily' | 'simulado';
  quality_status?: 'pending' | 'passed' | 'warning' | 'blocked' | 'approved_override';
  quality_summary?: string | null;
  quality_reviewed_at?: string | null;
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
  forfeited?: boolean;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option: OptionLetter | null;
  is_correct: boolean | null;
  answered_at: string | null;
  time_spent_seconds?: number | null;
  /** Questão anulada nesta prova — não entra na pontuação */
  excluded_from_score?: boolean;
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
  group_id?: string | null;
}

export interface WeeklyChallengeCompletion {
  id: string;
  challenge_id: string;
  user_id: string;
  completed_at: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_by: string | null;
  created_at: string;
  /** Qual disputa diária a liga usa */
  exam_audience?: 'general' | 'nephrology';
}

export interface StudyGroupMember {
  group_id: string;
  user_id: string;
  joined_at: string;
}

export interface StudyGroupRanking {
  id: string;
  group_id: string;
  user_id: string;
  period_type: PeriodType;
  period_start: string;
  period_end: string;
  total_score: number;
  total_correct: number;
  total_questions: number;
  average_percentage: number;
  total_time_seconds: number;
  position: number | null;
}

export interface StudyGroupJoinRequest {
  id: string;
  group_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  message?: string | null;
  created_at: string;
  resolved_at?: string | null;
  resolved_by?: string | null;
}

export interface StudyGroupCollectiveRanking {
  id: string;
  group_id: string;
  period_type: 'weekly' | 'monthly';
  period_start: string;
  period_end: string;
  active_members: number;
  exams_completed: number;
  exams_expected: number;
  average_percentage: number;
  average_score_per_member: number;
  participation_rate: number;
  regularity_score: number;
  collective_score: number;
  average_time_seconds: number;
  position: number | null;
}
