import { DIFFICULTY_CONFIG, type Difficulty } from '@/types/tour';

interface Props {
  difficulty: Difficulty;
  locale?: string;
}

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy:        'bg-[#eaf3de] text-[#3b6d11]',
  moderate:    'bg-[#faeeda] text-[#854f0b]',
  challenging: 'bg-[#fcebeb] text-[#a32d2d]',
  expert:      'bg-[#f7c1c1] text-[#791f1f]',
};

export default function DifficultyPill({ difficulty, locale = 'pt' }: Props) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const label = locale === 'pt' ? config.labelPt : config.label;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md ${DIFFICULTY_STYLES[difficulty]}`}>
      <svg viewBox="0 0 12 12" className="w-3 h-3 opacity-60 mr-1" fill="currentColor">
        <polygon points="1,11 6,2 11,11" />
      </svg>
      {label}
    </span>
  );
}
