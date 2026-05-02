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
      <div className="max-w-[90rem] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-16">
          <div>
            <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-moss mb-3">
              {t("featuredToursEyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
              {t("featuredToursTitle")}
            </h2>
          </div>
          <div className="hidden md:block">
            <Link
              href={`/${locale}/tours`}
              className="btn-lg btn-granite-ghost"
            >
              {t("viewAllTours")}&nbsp; →
            </Link>
          </div>
        </div>

        <FeaturedToursTrack tours={featured} locale={locale} />

        <div className="mt-8 md:hidden">
          <Link
            href={`/${locale}/tours`}
            className="btn-lg btn-granite-ghost w-full"
          >
            {t("viewAllTours")}&nbsp; →
          </Link>
        </div>
      </div>
    </section>
  );
}
