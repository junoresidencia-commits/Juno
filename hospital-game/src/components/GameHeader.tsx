interface Props {
  xp: number;
  streak: number;
  scenarioIndex: number;
  totalScenarios: number;
}

export function GameHeader({ xp, streak, scenarioIndex, totalScenarios }: Props) {
  return (
    <header className="game-header">
      <div className="brand">
        <span className="brand-icon">🫀</span>
        <div>
          <strong>Meu Rim — Plantão</strong>
          <small>Simulador clínico</small>
        </div>
      </div>
      <div className="stats">
        <div className="stat-pill xp">
          <span>⭐</span> {xp} XP
        </div>
        <div className="stat-pill streak">
          <span>🔥</span> {streak}
        </div>
        <div className="stat-pill progress">
          Cenário {scenarioIndex + 1}/{totalScenarios}
        </div>
      </div>
    </header>
  );
}
