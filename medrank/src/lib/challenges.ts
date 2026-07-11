export const CHALLENGE_TYPE_LABELS: Record<string, string> = {
  min_exams: 'Completar provas na semana',
  min_accuracy: 'Média de acerto na semana (%)',
  topic_accuracy: 'Acerto em tema específico (%)',
};

export function getChallengeDescription(
  type: string,
  target: number,
  topic?: string | null
): string {
  switch (type) {
    case 'min_exams':
      return `Complete ${target} prova(s) esta semana`;
    case 'min_accuracy':
      return `Mantenha média de ${target}% de acerto na semana`;
    case 'topic_accuracy':
      return `Atinga ${target}% de acerto em ${topic ?? 'tema definido'}`;
    default:
      return '';
  }
}
