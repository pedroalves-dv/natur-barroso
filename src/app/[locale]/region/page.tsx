import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { regionPlaces } from "@/data/region";
import RegionCardsTrack from "@/components/region/RegionCardsTrack";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "A Região Barroso" : "Barroso Region Guide",
    description:
      locale === "pt"
        ? "Descubra as Terras de Barroso — cascatas, aldeias medievais, castelos e o Parque Nacional Peneda-Gerês."
        : "Discover the Terras de Barroso — waterfalls, medieval villages, castles and Peneda-Gerês National Park.",
  };
}

const SEASONS = [
  {
    season: "Primavera",
    months: "Mar – Mai",
    note: "Cascatas em pleno. Flores silvestres. Ideal para caminhadas.",
    image: "/images/waterfall.jpg",
  },
  {
    season: "Verão",
    months: "Jun – Ago",
    note: "Banhos nas cascatas e rios. Dias longos. Reservar com antecedência.",
    image: "/images/summer.jpg",
  },
  {
    season: "Outono",
    months: "Set – Nov",
    note: "Melhor para fauna e fotografia. Menos turistas. Castanhas e vindimas.",
    image: "/images/autumn.jpg",
  },
  {
    season: "Inverno",
    months: "Dez – Fev",
    note: "Planalto nevado. Caudais máximos. Expedições 4×4 especiais.",
    image: "/images/winter.jpg",
  },
];

const WHY_CARDS = [
  {
    image: "/images/wildlife.jpg",
    titlePt: "Fauna singular",
    titleEn: "Singular wildlife",
    bodyPt:
      "Uma das últimas alcateias de lobo-ibérico de Portugal. Corços, javalis e mais de 200 espécies de aves.",
    bodyEn:
      "One of Portugal's last Iberian wolf packs. Roe deer, wild boar and over 200 bird species.",
  },
  {
    image: "/images/hotel.jpg",
    titlePt: "Cultura e história",
    titleEn: "Culture & history",
    bodyPt:
      "Castelos medievais, mosteiros em ruínas e aldeias graníticas onde o tempo ainda manda.",
    bodyEn:
      "Medieval castles, ruined monasteries and granite villages where time still rules.",
  },
  {
    image: "/images/restaurant.jpg",
    titlePt: "Gastronomia de excelência",
    titleEn: "Fine gastronomy",
    bodyPt:
      "Vinho do Douro, carne barrosã, mel de urze, queijo de cabra. O berço de uma cozinha de renome mundial.",
    bodyEn:
      "Vinho do Douro, Barrosã beef, heather honey, goat cheese. The home of a world reknown cuisine.",
  },
  // {
  //   image: "/images/hotel-1.jpg",
  //   titlePt: "Alojamento único",
  //   titleEn: "Unique accommodation",
  //   bodyPt:
  //     "Vinho dos Mortos, carne barrosã, mel de urze, queijo de cabra. Uma cozinha que é puro território.",
  //   bodyEn:
  //     "Vinho dos Mortos, Barrosã beef, heather honey, goat cheese. A cuisine that is pure territory.",
  // },
];

export default async function RegionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("RegionPage");
  const isPt = locale === "pt";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="/images/view.jpg"
          alt={
            isPt
              ? "Paisagem do planalto barrosano"
              : "Barroso plateau landscape"
          }
          fill
          className="object-cover object-[center_70%]"
          priority
          sizes="100vw"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        {/* Hero content  */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-16 w-full">
          <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-fog/50 mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-fog text-5xl md:text-7xl leading-[0.8] tracking-[-0.01em] max-w-2xl mb-6">
            {t("title")}
          </h1>
          <p className="text-sm text-fog/70 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-16">
            <div>
              <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-granite/30 mb-3">
                {t("whyEyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
                {t("whyTitle")}
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {WHY_CARDS.map((card) => (
              <div key={card.titleEn} className="flex flex-col">
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
                  {isPt ? card.titlePt : card.titleEn}
                </h3>
                <p className="text-granite/60 text-sm leading-relaxed tracking-wide mb-4 max-w-lg">
                  {isPt ? card.bodyPt : card.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the region / Places Grid */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-16">
            <div>
              <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-granite/30 mb-3">
                {t("placesEyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
                {t("placesTitle")}
              </h2>
            </div>
          </div>
          <RegionCardsTrack
            places={regionPlaces}
            locale={locale}
            exploreLabel={isPt ? "Explorar" : "Explore"}
          />
        </div>
      </section>

      {/* Seasonal guide */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-16">
            <div>
              <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-granite/30 mb-3">
                {t("seasonEyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
                {t("seasonTitle")}
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SEASONS.map((s) => (
              <div key={s.season} className="flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden mb-4">
                  <Image
                    src={s.image}
                    alt={s.season}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-3 left-3 text-xs font-medium tracking-wide px-2 py-1 rounded-full bg-fog/85 backdrop-blur text-granite/70">
                    {s.months}
                  </span>
                </div>
                <h3 className="font-serif text-granite text-3xl leading-[0.8] mb-2">
                  {s.season}
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
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
              {t("gettingHereTitle")}
            </h2>
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
              <p className="text-amber mb-2">
                {isPt ? "Aeroporto mais próximo" : "Nearest airport"}
              </p>
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
