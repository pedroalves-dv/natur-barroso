import { DIFFICULTY_CONFIG, type Difficulty } from '@/types/tour';

interface Props {
  difficulty: Difficulty;
  locale: string;
  title: string;
}

const LEVELS: Difficulty[] = ['easy', 'moderate', 'challenging', 'expert'];

export default function TourDifficultyGauge({ difficulty, locale, title }: Props) {
  const isPt = locale === 'pt';
  const currentLevel = DIFFICULTY_CONFIG[difficulty].level;
  const currentConfig = DIFFICULTY_CONFIG[difficulty];

  return (
    <div>
      <h2 className="text-2xl font-serif text-granite mb-6">{title}</h2>
      <div className="flex gap-2 mb-4">
        {LEVELS.map((level) => {
          const cfg = DIFFICULTY_CONFIG[level];
          const active = cfg.level <= currentLevel;
          return (
            <div
              key={level}
              className="flex-1 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: active ? currentConfig.color : '#E8E4DC',
                opacity: active ? (0.4 + (cfg.level / 4) * 0.6) : 1,
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-granite/40">
        {LEVELS.map((level) => {
          const cfg = DIFFICULTY_CONFIG[level];
          return (
            <span
              key={level}
              className={level === difficulty ? 'font-semibold' : ''}
              style={level === difficulty ? { color: cfg.color } : {}}
            >
              {isPt ? cfg.labelPt : cfg.label}
            </span>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-granite/60 leading-relaxed">
        {isPt
          ? `Este tour tem dificuldade ${currentConfig.labelPt.toLowerCase()}. ${getDifficultyDescription(difficulty, true)}`
          : `This tour is rated ${currentConfig.label.toLowerCase()}. ${getDifficultyDescription(difficulty, false)}`}
      </p>
    </div>
  );
}

function getDifficultyDescription(difficulty: Difficulty, isPt: boolean): string {
  const descriptions: Record<Difficulty, { pt: string; en: string }> = {
    easy: {
      pt: 'Adequado a todas as idades e condições físicas. Terreno plano ou com pequeno desnível.',
      en: 'Suitable for all ages and fitness levels. Flat or gently undulating terrain.',
    },
    moderate: {
      pt: 'Recomendamos praticar caminhada com alguma regularidade. Pode incluir subidas e troços rochosos.',
      en: 'We recommend regular walking. May include ascents and rocky sections.',
    },
    challenging: {
      pt: 'Para participantes com boa condição física e experiência em caminhada de montanha.',
      en: 'For participants with good fitness and mountain hiking experience.',
    },
    expert: {
      pt: 'Nível avançado. Requer excelente condição física e experiência técnica em montanha.',
      en: 'Advanced level. Requires excellent fitness and technical mountain experience.',
    },
  };
  return isPt ? descriptions[difficulty].pt : descriptions[difficulty].en;
}
