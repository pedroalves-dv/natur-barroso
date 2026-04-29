import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/types/tour";
import CategoryBadge from "./CategoryBadge";
import DifficultyPill from "./DifficultyPill";

interface Props {
  tour: Tour;
  locale: string;
}

export default function TourCard({ tour, locale }: Props) {
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const isPt = locale === "pt";

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-granite/10 hover:border-granite/70 hover:shadow-lg/3 transition-colors">
      <Link
        href={`/${locale}/tours/${tour.slug}`}
        className="absolute inset-0 z-10"
        aria-label={isPt ? tour.title : (tour.title_en ?? tour.title)}
      />
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={tour.category} locale={locale} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg text-granite mb-1 leading-snug">
          {isPt ? tour.title : (tour.title_en ?? tour.title)}
        </h3>
        <p className="text-sm text-granite/60 mb-4 leading-relaxed line-clamp-2">
          {isPt
            ? tour.shortDescription
            : (tour.shortDescription_en ?? tour.shortDescription)}
        </p>

        <div className="mb-4 space-y-1.5">
          {/* Row 1: difficulty + duration */}
          <div className="flex items-center justify-between">
            <DifficultyPill difficulty={tour.difficulty} locale={locale} />
            <span className="text-xs text-granite/50">
              {isPt ? tour.duration : (tour.duration_en ?? tour.duration)}
            </span>
          </div>

          {/* Row 2: group size */}
          <div className="flex justify-end">
            <span className="text-xs text-granite/50">
              {tour.groupSize.min}–{tour.groupSize.max}{" "}
              {isPt ? "pessoas" : "people"}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-fog">
          <span className="text-sm font-medium text-granite">
            <span className="text-xs font-normal text-granite/50">
              {isPt ? "A partir de " : "From "}
            </span>
            €{minPrice}
          </span>
          <span className="text-sm font-medium text-amber group-hover:text-forest transition-colors">
            {isPt ? "Ver" : "View"} →
          </span>
        </div>
      </div>
    </article>
  );
}
