import type { Review, ReviewSource } from "@/types/review";

interface Props {
  review: Review;
}

const SOURCE_LABELS: Record<ReviewSource, string> = {
  tripadvisor: "TripAdvisor",
  google: "Google",
  direct: "Direct",
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#ffb547" : "none"}
      stroke="#ffb547"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function ReviewCard({ review }: Props) {
  return (
    <article className="bg-white rounded-xl p-6 border border-granite/10 flex flex-col gap-4">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
      </div>

      <p className="text-granite/70 text-sm leading-relaxed flex-1">
        "{review.text}"
      </p>

      <div className="flex items-end justify-between gap-2 pt-2 border-t border-granite/8">
        <div>
          <p className="text-granite text-sm font-semibold">{review.author}</p>
          <p className="text-granite/50 text-xs">
            {review.country} · {review.tour}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-granite/40">{review.date}</span>
          <span className="text-xs font-medium text-amber">
            {SOURCE_LABELS[review.source]}
          </span>
        </div>
      </div>
    </article>
  );
}
