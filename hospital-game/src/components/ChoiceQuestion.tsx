import type { ChoiceOption } from '../types';

interface Props {
  prompt: string;
  options: ChoiceOption[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  selectedId?: string | null;
}

export function ChoiceQuestion({ prompt, options, onSelect, disabled, selectedId }: Props) {
  return (
    <div className="question-card">
      <h3>{prompt}</h3>
      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`option-btn ${selectedId === opt.id ? 'selected' : ''}`}
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
