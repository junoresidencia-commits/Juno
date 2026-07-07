import { useCallback, useEffect, useState } from 'react';
import { scenarios } from './data/scenarios';
import { ChoiceQuestion } from './components/ChoiceQuestion';
import { DialogueBubble } from './components/DialogueBubble';
import { ExamQuestion } from './components/ExamQuestion';
import { GameHeader } from './components/GameHeader';
import { MedicationQuestion } from './components/MedicationQuestion';
import { PatientHealthBar } from './components/PatientHealthBar';
import { TimerBar } from './components/TimerBar';
import type { GamePhase, GameState, Step } from './types';
import './App.css';

const INITIAL_HEALTH = 85;
const XP_CORRECT = 20;
const XP_DIALOGUE = 5;

function isQuestion(step: Step): step is Extract<Step, { kind: 'choice' | 'medication' | 'exam' }> {
  return step.kind === 'choice' || step.kind === 'medication' || step.kind === 'exam';
}

function getTimerSeconds(step: Step): number | null {
  if (!isQuestion(step)) return null;
  return step.timerSeconds ?? null;
}

export default function App() {
  const [state, setState] = useState<GameState>({
    phase: 'welcome',
    scenarioIndex: 0,
    stepIndex: 0,
    patientHealth: INITIAL_HEALTH,
    xp: 0,
    streak: 0,
    maxStreak: 0,
    lastAnswerCorrect: null,
    lastExplanation: '',
    selectedDrug: null,
    selectedDose: null,
    dialogueVisible: false,
  });

  const [timer, setTimer] = useState<number | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const currentScenario = scenarios[state.scenarioIndex];
  const currentStep = currentScenario?.steps[state.stepIndex];

  const advanceStep = useCallback(() => {
    setSelectedChoice(null);
    setAnswered(false);
    setState((s) => {
      const scenario = scenarios[s.scenarioIndex];
      const nextStepIndex = s.stepIndex + 1;

      if (nextStepIndex >= scenario.steps.length) {
        const nextScenario = s.scenarioIndex + 1;
        if (nextScenario >= scenarios.length) {
          return { ...s, phase: 'victory' as GamePhase };
        }
        return {
          ...s,
          phase: 'scenario-complete' as GamePhase,
          scenarioIndex: nextScenario,
          stepIndex: 0,
          selectedDrug: null,
          selectedDose: null,
          dialogueVisible: false,
        };
      }

      const nextStep = scenario.steps[nextStepIndex];
      return {
        ...s,
        stepIndex: nextStepIndex,
        phase: nextStep.kind === 'dialogue' ? 'playing' : 'playing',
        selectedDrug: null,
        selectedDose: null,
        dialogueVisible: false,
        lastAnswerCorrect: null,
        lastExplanation: '',
      };
    });
  }, []);

  const handleWrongAnswer = useCallback(
    (penalty: number, explanation: string) => {
      setAnswered(true);
      setState((s) => {
        const newHealth = Math.max(0, s.patientHealth - penalty);
        return {
          ...s,
          patientHealth: newHealth,
          streak: 0,
          lastAnswerCorrect: false,
          lastExplanation: explanation,
          phase: newHealth <= 0 ? 'gameover' : 'feedback',
        };
      });
    },
    [],
  );

  const handleCorrectAnswer = useCallback((explanation: string) => {
    setAnswered(true);
    setState((s) => {
      const newStreak = s.streak + 1;
      return {
        ...s,
        xp: s.xp + XP_CORRECT + newStreak * 2,
        streak: newStreak,
        maxStreak: Math.max(s.maxStreak, newStreak),
        lastAnswerCorrect: true,
        lastExplanation: explanation,
        phase: 'feedback',
      };
    });
  }, []);

  const handleChoice = useCallback(
    (id: string) => {
      if (answered || !currentStep || currentStep.kind !== 'choice') return;
      setSelectedChoice(id);
      if (id === currentStep.correctId) {
        handleCorrectAnswer(currentStep.explanation);
      } else {
        handleWrongAnswer(currentStep.healthPenalty ?? 10, currentStep.explanation);
      }
    },
    [answered, currentStep, handleCorrectAnswer, handleWrongAnswer],
  );

  const handleExam = useCallback(
    (id: string) => {
      if (answered || !currentStep || currentStep.kind !== 'exam') return;
      setSelectedChoice(id);
      if (id === currentStep.correctId) {
        handleCorrectAnswer(currentStep.explanation);
      } else {
        handleWrongAnswer(currentStep.healthPenalty ?? 10, currentStep.explanation);
      }
    },
    [answered, currentStep, handleCorrectAnswer, handleWrongAnswer],
  );

  const handleMedicationConfirm = useCallback(() => {
    if (answered || !currentStep || currentStep.kind !== 'medication') return;
    const { selectedDrug, selectedDose } = state;
    if (!selectedDrug || !selectedDose) return;

    const correct =
      selectedDrug === currentStep.correctDrugId && selectedDose === currentStep.correctDoseId;

    if (correct) {
      handleCorrectAnswer(currentStep.explanation);
    } else {
      handleWrongAnswer(currentStep.healthPenalty ?? 15, currentStep.explanation);
    }
  }, [answered, currentStep, state, handleCorrectAnswer, handleWrongAnswer]);

  // Dialogue auto-advance
  useEffect(() => {
    if (state.phase !== 'playing' || !currentStep || currentStep.kind !== 'dialogue') return;

    setState((s) => ({ ...s, dialogueVisible: true }));

    const t = setTimeout(() => {
      setState((s) => ({ ...s, xp: s.xp + XP_DIALOGUE }));
      advanceStep();
    }, 2200);

    return () => clearTimeout(t);
  }, [state.phase, state.scenarioIndex, state.stepIndex, currentStep, advanceStep]);

  // Timer for questions
  useEffect(() => {
    if (!currentStep || !isQuestion(currentStep) || state.phase !== 'playing') {
      setTimer(null);
      return;
    }

    const total = getTimerSeconds(currentStep);
    if (!total) return;

    setTimer(total);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t === null || t <= 1) {
          clearInterval(interval);
          if (!answered) {
            const penalty = currentStep.healthPenalty ?? 10;
            handleWrongAnswer(
              penalty,
              'Tempo esgotado! ' + ('explanation' in currentStep ? currentStep.explanation : ''),
            );
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.scenarioIndex, state.stepIndex, state.phase, currentStep, answered, handleWrongAnswer]);

  // Passive health drain during questions
  useEffect(() => {
    if (!currentStep || !isQuestion(currentStep) || state.phase !== 'playing' || answered) return;

    const drain = setInterval(() => {
      setState((s) => {
        if (s.phase === 'gameover') return s;
        const newHealth = Math.max(0, s.patientHealth - 1);
        if (newHealth <= 0) {
          return { ...s, patientHealth: 0, phase: 'gameover' };
        }
        return { ...s, patientHealth: newHealth };
      });
    }, 3000);

    return () => clearInterval(drain);
  }, [state.scenarioIndex, state.stepIndex, state.phase, currentStep, answered]);

  const startGame = () => {
    setState({
      phase: 'playing',
      scenarioIndex: 0,
      stepIndex: 0,
      patientHealth: INITIAL_HEALTH,
      xp: 0,
      streak: 0,
      maxStreak: 0,
      lastAnswerCorrect: null,
      lastExplanation: '',
      selectedDrug: null,
      selectedDose: null,
      dialogueVisible: false,
    });
  };

  const continueAfterFeedback = () => {
    if (state.phase === 'gameover') return;
    advanceStep();
    setState((s) => ({ ...s, phase: 'playing' }));
  };

  const continueAfterScenario = () => {
    setState((s) => ({ ...s, phase: 'playing', patientHealth: Math.min(100, s.patientHealth + 10) }));
  };

  if (state.phase === 'welcome') {
    return (
      <div className="app">
        <WelcomeScreen onStart={startGame} />
      </div>
    );
  }

  if (state.phase === 'victory') {
    return (
      <div className="app">
        <VictoryScreen xp={state.xp} maxStreak={state.maxStreak} onRestart={startGame} />
      </div>
    );
  }

  if (state.phase === 'gameover') {
    return (
      <div className="app">
        <GameOverScreen
          xp={state.xp}
          scenarioTitle={currentScenario.title}
          onRestart={startGame}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <GameHeader
        xp={state.xp}
        streak={state.streak}
        scenarioIndex={state.scenarioIndex}
        totalScenarios={scenarios.length}
      />

      <main className="game-main">
        <aside className="scene-panel">
          <div className="hospital-room">
            <div className="room-bg" />
            <div className="room-characters">
              <span className="room-char doctor" title="Doutor">👨‍⚕️</span>
              <span className="room-char nurse" title="Enfermeira">👩‍⚕️</span>
              <span className="room-char patient" title="Paciente">🛏️</span>
            </div>
          </div>
          <PatientHealthBar health={state.patientHealth} />
        </aside>

        <section className="content-panel">
          <div className="scenario-title">
            <h2>{currentScenario.title}</h2>
            <p>{currentScenario.subtitle}</p>
          </div>

          {state.phase === 'scenario-complete' && (
            <div className="overlay-card success fade-in">
              <h3>✅ Cenário concluído!</h3>
              <p>Você conduziu bem este momento do plantão. A paciente está um pouco mais estável.</p>
              <button type="button" className="primary-btn" onClick={continueAfterScenario}>
                Próximo cenário →
              </button>
            </div>
          )}

          {state.phase === 'feedback' && (
            <div className={`overlay-card feedback ${state.lastAnswerCorrect ? 'correct' : 'wrong'} fade-in`}>
              <h3>{state.lastAnswerCorrect ? '✅ Correto!' : '❌ Não foi dessa vez'}</h3>
              <p>{state.lastExplanation}</p>
              <button type="button" className="primary-btn" onClick={continueAfterFeedback}>
                Continuar
              </button>
            </div>
          )}

          {state.phase === 'playing' && currentStep?.kind === 'dialogue' && state.dialogueVisible && (
            <DialogueBubble character={currentStep.character} text={currentStep.text} />
          )}

          {state.phase === 'playing' && currentStep && isQuestion(currentStep) && (
            <>
              {timer !== null && <TimerBar seconds={timer} totalSeconds={currentStep.timerSeconds ?? timer} />}
              {currentStep.kind === 'choice' && (
                <ChoiceQuestion
                  prompt={currentStep.prompt}
                  options={currentStep.options}
                  onSelect={handleChoice}
                  disabled={answered}
                  selectedId={selectedChoice}
                />
              )}
              {currentStep.kind === 'exam' && (
                <ExamQuestion
                  prompt={currentStep.prompt}
                  hospitalNote={currentStep.hospitalNote}
                  options={currentStep.options}
                  onSelect={handleExam}
                  disabled={answered}
                  selectedId={selectedChoice}
                />
              )}
              {currentStep.kind === 'medication' && (
                <MedicationQuestion
                  prompt={currentStep.prompt}
                  drugOptions={currentStep.drugOptions}
                  doseOptions={currentStep.doseOptions}
                  selectedDrug={state.selectedDrug}
                  selectedDose={state.selectedDose}
                  onDrugSelect={(id) => setState((s) => ({ ...s, selectedDrug: id }))}
                  onDoseSelect={(id) => setState((s) => ({ ...s, selectedDose: id }))}
                  onConfirm={handleMedicationConfirm}
                  disabled={answered}
                />
              )}
            </>
          )}
        </section>
      </main>

      <footer className="game-footer">
        <small>
          Finalidade educativa — não substitui consulta médica. Baseado em diretrizes de cuidado renal.
        </small>
      </footer>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-card fade-in">
        <div className="welcome-hero">🏥</div>
        <h1>Meu Rim — Plantão</h1>
        <p className="tagline">Aprenda cuidado renal jogando, como no Duolingo — mas no hospital.</p>
        <ul className="feature-list">
          <li>🧑‍⚕️ Atenda a paciente em sequência realista</li>
          <li>👩‍⚕️ Trabalhe em equipe com a enfermeira</li>
          <li>💊 Prescreva medicamentos com dose correta</li>
          <li>🔬 Solicite exames — respeitando o que o hospital tem</li>
          <li>⏱️ A paciente piora se você demorar</li>
        </ul>
        <button type="button" className="primary-btn start-btn" onClick={onStart}>
          Iniciar plantão
        </button>
      </div>
    </div>
  );
}

function VictoryScreen({
  xp,
  maxStreak,
  onRestart,
}: {
  xp: number;
  maxStreak: number;
  onRestart: () => void;
}) {
  return (
    <div className="welcome-screen">
      <div className="welcome-card victory fade-in">
        <div className="welcome-hero">🎉</div>
        <h1>Plantão concluído!</h1>
        <p>Você conduziu Maria com segurança: avaliou, tratou a infecção, interpretou os exames e encaminhou ao nefrologista.</p>
        <div className="final-stats">
          <div><strong>{xp}</strong><span>XP total</span></div>
          <div><strong>{maxStreak}</strong><span>Maior sequência</span></div>
        </div>
        <p className="tagline">Prevenir é melhor que descobrir tarde. 🫀</p>
        <button type="button" className="primary-btn" onClick={onRestart}>
          Jogar novamente
        </button>
      </div>
    </div>
  );
}

function GameOverScreen({
  xp,
  scenarioTitle,
  onRestart,
}: {
  xp: number;
  scenarioTitle: string;
  onRestart: () => void;
}) {
  return (
    <div className="welcome-screen">
      <div className="welcome-card gameover fade-in">
        <div className="welcome-hero">💔</div>
        <h1>Paciente em estado crítico</h1>
        <p>
          A condição de Maria piorou durante <strong>{scenarioTitle}</strong>. Revise as diretrizes e tente
          novamente — cada decisão conta no plantão.
        </p>
        <div className="final-stats">
          <div><strong>{xp}</strong><span>XP conquistado</span></div>
        </div>
        <button type="button" className="primary-btn" onClick={onRestart}>
          Tentar de novo
        </button>
      </div>
    </div>
  );
}
