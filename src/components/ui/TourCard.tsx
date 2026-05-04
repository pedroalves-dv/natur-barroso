import Image from "next/image";
import Link from "next/link";
import type { Tour, Season } from "@/types/tour";
import CategoryBadge from "./CategoryBadge";
import DifficultyPill from "./DifficultyPill";

interface Props {
  tour: Tour;
  locale: string;
  featured?: boolean;
}

const SEASON_ORDER: Record<Season, number> = {
  spring: 0,
  summer: 1,
  autumn: 2,
  winter: 3,
};

const SEASON_MONTHS: Record<
  Season,
  { firstPt: string; lastPt: string; firstEn: string; lastEn: string }
> = {
  spring: { firstPt: "Mar", lastPt: "Mai", firstEn: "Mar", lastEn: "May" },
  summer: { firstPt: "Jun", lastPt: "Ago", firstEn: "Jun", lastEn: "Aug" },
  autumn: { firstPt: "Set", lastPt: "Nov", firstEn: "Sep", lastEn: "Nov" },
  winter: { firstPt: "Dez", lastPt: "Fev", firstEn: "Dec", lastEn: "Feb" },
};

function SeasonPill({ seasons, isPt }: { seasons: Season[]; isPt: boolean }) {
  if (seasons.length === 4) {
    return (
      <span className="text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-granite/85 backdrop-blur text-fog/70">
        {isPt ? "Todo o ano" : "Year-round"}
      </span>
    );
  }
  const sorted = [...seasons].sort((a, b) => SEASON_ORDER[a] - SEASON_ORDER[b]);
  const first = SEASON_MONTHS[sorted[0]!];
  const last = SEASON_MONTHS[sorted[sorted.length - 1]!];
  const start = isPt ? first.firstPt : first.firstEn;
  const end = isPt ? last.lastPt : last.lastEn;
  return (
    <span className="text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-granite/85 backdrop-blur text-fog/70">
      {start} – {end}
    </span>
  );
}

export default function TourCard({ tour, locale, featured }: Props) {
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const isPt = locale === "pt";

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}`}
      className={`group relative flex h-full bg-white overflow-hidden hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)] hover:-translate-y-1 transition-all duration-200 ease-out ${featured ? "flex-col lg:flex-row" : "flex-col"}`}
    >

      {/* cover image */}
      <div
        className={`relative overflow-hidden shrink-0 ${featured ? "h-56 lg:w-3/5 lg:h-full lg:min-h-72" : "h-56"}`}
      >
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-granite/55 pointer-events-none" />

        {/* category badge pill — top left */}
        {/* <div className="absolute top-3 left-3 z-20">
          <CategoryBadge category={tour.category} locale={locale} />
        </div> */}

        {/* season pill — top right */}
        <div className="absolute top-3 right-3 z-20">
          <SeasonPill seasons={tour.seasonAvailability} isPt={isPt} />
        </div>

        {/* price — bottom right of image (hidden on featured desktop) */}
        <div
          className={`absolute bottom-3 right-3 z-20 text-right ${featured ? "lg:hidden" : ""}`}
        >
          <span className="block text-[9px] font-medium tracking-widest uppercase text-fog/70 leading-none mb-0.5">
            {isPt ? "A partir de" : "From"}
          </span>
          <span className="block font-serif text-4xl text-fog leading-none">
            €{minPrice}
          </span>
        </div>
      </div>

      {/* card body */}
      <div className="flex flex-col flex-1 p-4">
        {/* card title */}
        <h3 className="font-serif text-3xl text-granite mb-2 leading-snug">
          {isPt ? tour.title : (tour.title_en ?? tour.title)}
        </h3>

        {/* short description */}
        <p className="text-sm text-granite/60 mb-4 leading-relaxed line-clamp-2">
          {isPt
            ? tour.shortDescription
            : (tour.shortDescription_en ?? tour.shortDescription)}
        </p>

        {/* meta pills row */}
        <div className="mb-4 flex items-center gap-1 flex-wrap">
          {/* difficulty pill */}
          {/* <DifficultyPill difficulty={tour.difficulty} locale={locale} /> */}

          {/* duration pill */}
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-fog text-granite/65">
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 opacity-50 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <circle cx="6" cy="6" r="5" />
              <line x1="6" y1="6" x2="6" y2="3" />
              <line x1="6" y1="6" x2="9" y2="6" />
            </svg>
            {isPt ? tour.duration : (tour.duration_en ?? tour.duration)}
          </span>

          {/* group size pill */}
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-fog text-granite/65">
            <svg
              viewBox="0 0 12 12"
              className="w-3 h-3 opacity-50 mr-1"
              fill="currentColor"
            >
              <circle cx="6" cy="3" r="1.8" />
              <path d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4" />
            </svg>
            {tour.groupSize.min}–{tour.groupSize.max}{" "}
            {isPt ? "pessoas" : "people"}
          </span>
        </div>

        {/* featured-only large price (desktop) */}
        {featured && (
          <div className="hidden lg:block mt-auto text-right mb-12">
            <span className="block text-[10px] font-medium tracking-widest uppercase text-granite/40 leading-none mb-1">
              {isPt ? "A partir de" : "From"}
            </span>
            <span className="block font-serif text-6xl text-granite leading-none">
              €{minPrice}
            </span>
          </div>
        )}

        {/* CTA button */}
        <div className="mt-auto md:mt-0 flex justify-end">
          <span className="btn-sm btn-granite-ghost group-hover:bg-fog">
            {isPt ? "Ver" : "View"}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
