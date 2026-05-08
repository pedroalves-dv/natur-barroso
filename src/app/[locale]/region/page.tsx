import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { regionPlaces } from "@/data/region";
import RegionCardsTrack from "@/components/region/RegionCardsTrack";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RegionPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function RegionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("RegionPage");

  const seasons = [
    { name: t("season1Name"), months: t("season1Months"), note: t("season1Note"), image: "/images/waterfall.jpg" },
    { name: t("season2Name"), months: t("season2Months"), note: t("season2Note"), image: "/images/summer.jpg" },
    { name: t("season3Name"), months: t("season3Months"), note: t("season3Note"), image: "/images/autumn.jpg" },
    { name: t("season4Name"), months: t("season4Months"), note: t("season4Note"), image: "/images/winter.jpg" },
  ];

  const whyCards = [
    { image: "/images/wildlife.jpg", title: t("why1Title"), body: t("why1Body") },
    { image: "/images/hotel.jpg", title: t("why2Title"), body: t("why2Body") },
    { image: "/images/restaurant.jpg", title: t("why3Title"), body: t("why3Body") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="/images/view.jpg"
          alt={t("heroAlt")}
          fill
          className="object-cover object-[center_70%]"
          priority
          sizes="100vw"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        {/* Hero content  */}
        <div className="hero-content">
          <p className="eyebrow text-fog/50">{t("eyebrow")}</p>
          <h1 className="page-hero-title">{t("title")}</h1>
          <p className="hero-body">{t("subtitle")}</p>
        </div>
        {/* Scroll chevron indicator  */}
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

      {/* Why Barroso */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/30">{t("whyEyebrow")}</p>
              <h2 className="section-title">{t("whyTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {whyCards.map((card) => (
              <div key={card.title} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover object-[center_30%]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-granite text-3xl leading-[0.8] mb-2">
                  {card.title}
                </h3>
                <p className="text-granite/60 text-sm leading-relaxed tracking-wide mb-4 max-w-lg">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the region / Places Grid */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/30">{t("placesEyebrow")}</p>
              <h2 className="section-title">{t("placesTitle")}</h2>
            </div>
          </div>
          <RegionCardsTrack
            places={regionPlaces}
            locale={locale}
            exploreLabel={t("exploreLabel")}
          />
        </div>
      </section>

      {/* Seasonal guide */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/30">{t("seasonEyebrow")}</p>
              <h2 className="section-title">{t("seasonTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {seasons.map((s) => (
              <div key={s.name} className="flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden mb-4">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-fog/85 backdrop-blur text-granite/70">
                    {s.months}
                  </span>
                </div>
                <h3 className="font-serif text-granite text-3xl leading-[0.8] mb-2">
                  {s.name}
                </h3>
                <p className="text-granite/60 text-sm leading-relaxed tracking-wide max-w-lg">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="py-20 bg-fog text-granite">
        <div className="container-wide">
          <div className="mb-8 md:mb-12">
            <h2 className="section-title">{t("gettingHereTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-amber mb-2">Porto → Montalegre</p>
              <p className="text-granite/70">A24 / IP3 · 100 km · 1h30</p>
            </div>
            <div>
              <p className="text-amber mb-2">Lisboa → Montalegre</p>
              <p className="text-granite/70">A23 / IP3 · 420 km · 3h45</p>
            </div>
            <div>
              <p className="text-amber mb-2">{t("nearestAirport")}</p>
              <p className="text-granite/70">Porto OPO · 90 km · 1h10</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-10 w-full h-64 rounded-2xl bg-granite/5 border border-fog/10 flex items-center justify-center">
            <p className="text-fog/30 text-sm">{t("mapPlaceholder")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
