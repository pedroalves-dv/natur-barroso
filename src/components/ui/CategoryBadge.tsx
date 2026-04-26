import { CATEGORY_CONFIG, type CategorySlug } from "@/types/tour";

interface Props {
  category: CategorySlug;
  locale?: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({
  category,
  locale = "pt",
  size = "md",
}: Props) {
  const config = CATEGORY_CONFIG[category];
  const label = locale === "pt" ? config.labelPt : config.label;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"
      }`}
      style={{ backgroundColor: config.color + "EE", color: "#ffffff" }}
    >
      {label}
    </span>
  );
}
