import type { Character } from '../types';

const labels: Record<Character, string> = {
  doctor: 'Doutor(a)',
  nurse: 'Enfermeira',
  patient: 'Paciente',
  system: 'Hospital',
};

const icons: Record<Character, string> = {
  doctor: '👨‍⚕️',
  nurse: '👩‍⚕️',
  patient: '🧑‍🦳',
  system: '🏥',
};

const colors: Record<Character, string> = {
  doctor: 'character-doctor',
  nurse: 'character-nurse',
  patient: 'character-patient',
  system: 'character-system',
};

interface Props {
  character: Character;
  text: string;
  animate?: boolean;
}

export function DialogueBubble({ character, text, animate = true }: Props) {
  return (
    <div className={`dialogue-row ${colors[character]} ${animate ? 'fade-in' : ''}`}>
      <div className="character-avatar" aria-hidden>
        {icons[character]}
      </div>
      <div className="dialogue-content">
        <span className="character-name">{labels[character]}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}
