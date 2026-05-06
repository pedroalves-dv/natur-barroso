import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";
import { SEASON_LABELS } from "@/types/tour";
import ConditionsNotice from "@/components/layout/ConditionsNotice";

interface Props {
  tour: Tour;
  locale: string;
  backLabel: string;
  conditionsMessage?: string;
}

export default function TourHero({ tour, locale, backLabel, conditionsMessage }: Props) {
  const isPt = locale === "pt";
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const seasons = tour.seasonAvailability
    .map((s) => (isPt ? SEASON_LABELS[s].pt : SEASON_LABELS[s].en))
    .join(" · ");

  return (
    <section className="relative min-h-[100vh] flex items-center md:items-end">
      <Image
        src={tour.coverImage}
        alt={tour.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-6 pb-16 w-full">
        {/* Back link */}
        <Link
          href={`/${locale}/tours`}
          className="btn-lg btn-ghost inline-flex items-center gap-2 text-md text-fog/70 hover:text-fog transition-colors mb-6"
        >
          ← {backLabel}
        </Link>

        {/* category + difficulty pill */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
          <CategoryBadge category={tour.category} locale={locale} />
          <DifficultyPill difficulty={tour.difficulty} locale={locale} />
        </div> */}

        <h1 className="page-hero-title max-w-2xl mb-6">
          {isPt ? tour.title : (tour.title_en ?? tour.title)}
        </h1>

        <p className="text-sm text-fog/70 max-w-lg leading-relaxed mb-6">
          {isPt
            ? tour.shortDescription
            : (tour.shortDescription_en ?? tour.shortDescription)}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fog/60">
          <span>
            {isPt ? tour.duration : (tour.duration_en ?? tour.duration)}
          </span>
          <span>
            {tour.groupSize.min}–{tour.groupSize.max}{" "}
            {isPt ? "pessoas" : "people"}
          </span>
          <span>{seasons}</span>
          <span className="text-fog">
            {isPt ? "A partir de" : "From"} €{minPrice}
          </span>
        </div>
      </div>

      {conditionsMessage && <ConditionsNotice message={conditionsMessage} />}
      {/* Scroll chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 animate-nudge-down">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
