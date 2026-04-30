import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { tours } from "@/data/tours";
import FeaturedToursTrack from "@/components/home/FeaturedToursTrack";

interface Props {
  locale: string;
}

export default async function FeaturedTours({ locale }: Props) {
  const t = await getTranslations("HomePage");
  const featured = tours.slice(0, 4);

  return (
    <section className="py-20 bg-fog">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6 md:mb-8">
          <div>
            <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-moss md:mb-2">
              {t("featuredToursEyebrow")}
            </p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight tracking-[-0.01em] text-granite">
              {t("featuredToursTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="text-fog bg-granite border border-granite/10 hover:bg-moss/50 hover:text-granite transition-colors inline-flex items-center justify-center pl-6 pr-5 py-2.5 rounded-2xl text-md"
          >
            {t("viewAllTours") + "\u00A0 →"}
          </Link>
        </div>

        <FeaturedToursTrack tours={featured} locale={locale} />
      </div>
    </section>
  );
}
