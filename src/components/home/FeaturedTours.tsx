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
      <div className="container-wide">
        <div className="section-header">
          <div>
            <p className="eyebrow text-granite/40">
              {t("featuredToursEyebrow")}
            </p>
            <h2 className="section-title">
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
