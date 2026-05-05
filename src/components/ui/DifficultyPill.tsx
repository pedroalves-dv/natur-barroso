import { DIFFICULTY_CONFIG, type Difficulty } from "@/types/tour";

interface Props {
  difficulty: Difficulty;
  locale?: string;
}

export default function DifficultyPill({ difficulty, locale = "pt" }: Props) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const label = locale === "pt" ? config.labelPt : config.label;

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full"
      style={{ backgroundColor: config.color + "26", color: config.color }}
    >
      <svg
        viewBox="0 0 12 12"
        className="w-3 h-3 opacity-60 mr-1"
        fill="currentColor"
      >
        <polygon points="1,11 6,2 11,11" />
      </svg>
      {label}
    </span>
  );
}
