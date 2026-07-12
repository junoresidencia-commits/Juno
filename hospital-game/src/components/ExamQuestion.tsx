import type { ChoiceOption } from '../types';

interface Props {
  prompt: string;
  hospitalNote?: string;
  options: ChoiceOption[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  selectedId?: string | null;
}

export function ExamQuestion({ prompt, hospitalNote, options, onSelect, disabled, selectedId }: Props) {
  return (
    <div className="question-card exam-card">
      <h3>{prompt}</h3>
      {hospitalNote && (
        <div className="hospital-note">
          <span>⚠️</span>
          <p>{hospitalNote}</p>
        </div>
      )}
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`option-btn ${selectedId === opt.id ? 'selected' : ''} ${opt.label.includes('Tomografia') || opt.label.includes('Ressonância') ? 'unavailable' : ''}`}
            onClick={() => onSelect(opt.id)}
            disabled={disabled}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
