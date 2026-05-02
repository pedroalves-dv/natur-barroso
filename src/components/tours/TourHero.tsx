import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";
import { SEASON_LABELS } from "@/types/tour";
import CategoryBadge from "@/components/ui/CategoryBadge";
import DifficultyPill from "@/components/ui/DifficultyPill";

interface Props {
  tour: Tour;
  locale: string;
  backLabel: string;
}

export default function TourHero({ tour, locale, backLabel }: Props) {
  const isPt = locale === "pt";
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const seasons = tour.seasonAvailability
    .map((s) => (isPt ? SEASON_LABELS[s].pt : SEASON_LABELS[s].en))
    .join(" · ");

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end text-white">
      <Image
        src={tour.coverImage}
        alt={tour.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/90 via-granite/30 to-granite/20" />

      {/* Back link */}
      <div className="absolute top-24 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-10 md:pb-14 w-full">
        <div className="flex flex-wrap gap-2 mb-4">
          <CategoryBadge category={tour.category} locale={locale} />
          <DifficultyPill difficulty={tour.difficulty} locale={locale} />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 max-w-3xl">
          {isPt ? tour.title : (tour.title_en ?? tour.title)}
        </h1>

        <p className="text-white/80 text-lg mb-6 max-w-xl leading-relaxed">
          {isPt
            ? tour.shortDescription
            : (tour.shortDescription_en ?? tour.shortDescription)}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span>
            ⏱ {isPt ? tour.duration : (tour.duration_en ?? tour.duration)}
          </span>
          <span>
            👥 {tour.groupSize.min}–{tour.groupSize.max}{" "}
            {isPt ? "pessoas" : "people"}
          </span>
          <span>🌿 {seasons}</span>
          <span className="text-white ">
            {isPt ? "A partir de" : "From"} €{minPrice}
          </span>
        </div>
      </div>
    </section>
  );
}
