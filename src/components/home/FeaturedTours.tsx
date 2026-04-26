import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { tours } from "@/data/tours";
import TourCard from "@/components/ui/TourCard";

interface Props {
  locale: string;
}

export default async function FeaturedTours({ locale }: Props) {
  const t = await getTranslations("HomePage");
  const featured = tours.slice(0, 4);

  return (
    <section className="py-20 bg-fog">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
              {t("featuredToursEyebrow")}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-granite">
              {t("featuredToursTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="shrink-0 text-sm font-medium text-forest hover:text-amber transition-colors"
          >
            {t("viewAllTours")} →
          </Link>
        </div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
          {featured.map((tour) => (
            <div key={tour.slug} className="snap-start shrink-0 w-72 md:w-auto">
              <TourCard tour={tour} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
