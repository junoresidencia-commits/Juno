import type { ChoiceOption } from '../types';

interface Props {
  prompt: string;
  drugOptions: ChoiceOption[];
  doseOptions: ChoiceOption[];
  selectedDrug: string | null;
  selectedDose: string | null;
  onDrugSelect: (id: string) => void;
  onDoseSelect: (id: string) => void;
  onConfirm: () => void;
  disabled?: boolean;
}

export function MedicationQuestion({
  prompt,
  drugOptions,
  doseOptions,
  selectedDrug,
  selectedDose,
  onDrugSelect,
  onDoseSelect,
  onConfirm,
  disabled,
}: Props) {
  const canConfirm = selectedDrug && selectedDose && !disabled;

  return (
    <div className="question-card medication-card">
      <h3>{prompt}</h3>
      <div className="medication-grid">
        <div className="med-section">
          <label>Medicamento</label>
          <div className="options-grid compact">
            {drugOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`option-btn ${selectedDrug === opt.id ? 'selected' : ''}`}
                onClick={() => onDrugSelect(opt.id)}
                disabled={disabled}
              >
                💊 {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="med-section">
          <label>Dose e via</label>
          <div className="options-grid compact">
            {doseOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`option-btn ${selectedDose === opt.id ? 'selected' : ''}`}
                onClick={() => onDoseSelect(opt.id)}
                disabled={disabled}
              >
                💉 {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDrug && selectedDose && (
        <div className="prescription-preview fade-in">
          Prescrição: <strong>{drugOptions.find((d) => d.id === selectedDrug)?.label}</strong> —{' '}
          <strong>{doseOptions.find((d) => d.id === selectedDose)?.label}</strong>
        </div>
      )}
      <button type="button" className="primary-btn confirm-med" onClick={onConfirm} disabled={!canConfirm}>
        Confirmar prescrição
      </button>
    </div>
  );
}
