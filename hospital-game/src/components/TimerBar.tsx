interface Props {
  seconds: number;
  totalSeconds: number;
}

export function TimerBar({ seconds, totalSeconds }: Props) {
  const pct = totalSeconds > 0 ? (seconds / totalSeconds) * 100 : 0;
  const urgent = seconds <= 5;

  return (
    <div className={`timer-bar ${urgent ? 'urgent' : ''}`}>
      <div className="timer-label">
        <span>⏱️ Paciente piorando...</span>
        <span>{seconds}s</span>
      </div>
      <div className="timer-track">
        <div className="timer-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
