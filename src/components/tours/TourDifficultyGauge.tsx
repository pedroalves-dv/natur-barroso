import { getTranslations } from "next-intl/server";
import { DIFFICULTY_CONFIG, type Difficulty } from "@/types/tour";

interface Props {
  difficulty: Difficulty;
  locale: string;
  title: string;
}

const LEVELS: Difficulty[] = ["easy", "moderate", "challenging", "expert"];

const DIFFICULTY_DESC_KEYS = {
  easy: "difficultyFullEasy",
  moderate: "difficultyFullModerate",
  challenging: "difficultyFullChallenging",
  expert: "difficultyFullExpert",
} as const;

export default async function TourDifficultyGauge({
  difficulty,
  locale,
  title,
}: Props) {
  const t = await getTranslations("TourDetail");
  const isPt = locale === "pt";
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
                backgroundColor: active ? currentConfig.color : "#E8E4DC",
                opacity: active ? 0.4 + (cfg.level / 4) * 0.6 : 1,
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
              className={level === difficulty ? "" : ""}
              style={level === difficulty ? { color: cfg.color } : {}}
            >
              {isPt ? cfg.labelPt : cfg.label}
            </span>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-granite/60 leading-relaxed">
        {t(DIFFICULTY_DESC_KEYS[difficulty])}
      </p>
    </div>
  );
}
