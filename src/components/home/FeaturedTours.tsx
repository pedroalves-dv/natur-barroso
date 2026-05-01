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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 mb-4 md:mb-16">
          <div>
            <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-moss md:mb-2">
              {t("featuredToursEyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight md:leading-[0.8] tracking-[-0.01em] text-granite">
              {t("featuredToursTitle")}
            </h2>
          </div>
          <Link href={`/${locale}/tours`} className="btn-lg btn-granite-ghost ">
            {t("viewAllTours") + "\u00A0 →"}
          </Link>
        </div>

        <FeaturedToursTrack tours={featured} locale={locale} />
      </div>
    </section>
  );
}
