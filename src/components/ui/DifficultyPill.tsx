import { DIFFICULTY_CONFIG, type Difficulty } from '@/types/tour';

interface Props {
  difficulty: Difficulty;
  locale?: string;
}

export default function DifficultyPill({ difficulty, locale = 'pt' }: Props) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const label = locale === 'pt' ? config.labelPt : config.label;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded"
      style={{ backgroundColor: config.color + '18', color: config.color }}
    >
      {label}
    </span>
  );
}
