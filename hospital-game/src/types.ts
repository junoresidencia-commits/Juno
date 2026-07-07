export type Character = 'doctor' | 'nurse' | 'patient' | 'system';

export interface DialogueStep {
  kind: 'dialogue';
  character: Character;
  text: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface ChoiceStep {
  kind: 'choice';
  character: Character;
  prompt: string;
  options: ChoiceOption[];
  correctId: string;
  explanation: string;
  timerSeconds?: number;
  healthPenalty?: number;
}

export interface MedicationStep {
  kind: 'medication';
  character: Character;
  prompt: string;
  drugOptions: ChoiceOption[];
  doseOptions: ChoiceOption[];
  correctDrugId: string;
  correctDoseId: string;
  explanation: string;
  timerSeconds?: number;
  healthPenalty?: number;
}

export interface ExamStep {
  kind: 'exam';
  character: Character;
  prompt: string;
  hospitalNote?: string;
  options: ChoiceOption[];
  correctId: string;
  explanation: string;
  timerSeconds?: number;
  healthPenalty?: number;
}

export type Step = DialogueStep | ChoiceStep | MedicationStep | ExamStep;

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

export type GamePhase = 'welcome' | 'intro' | 'playing' | 'feedback' | 'scenario-complete' | 'victory' | 'gameover';

export interface GameState {
  phase: GamePhase;
  scenarioIndex: number;
  stepIndex: number;
  patientHealth: number;
  xp: number;
  streak: number;
  maxStreak: number;
  lastAnswerCorrect: boolean | null;
  lastExplanation: string;
  selectedDrug: string | null;
  selectedDose: string | null;
  dialogueVisible: boolean;
}
