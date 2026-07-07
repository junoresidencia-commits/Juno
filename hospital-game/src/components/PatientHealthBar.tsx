interface Props {
  health: number;
}

export function PatientHealthBar({ health }: Props) {
  const clamped = Math.max(0, Math.min(100, health));
  const status =
    clamped > 60 ? 'Estável' : clamped > 30 ? 'Instável' : 'Crítico';
  const tone = clamped > 60 ? 'good' : clamped > 30 ? 'warn' : 'danger';

  return (
    <div className="health-panel">
      <div className="health-header">
        <span>Estado da paciente</span>
        <span className={`health-status ${tone}`}>{status}</span>
      </div>
      <div className="health-track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className={`health-fill ${tone}`} style={{ width: `${clamped}%` }} />
      </div>
      <span className="health-value">{clamped}%</span>
    </div>
  );
}
