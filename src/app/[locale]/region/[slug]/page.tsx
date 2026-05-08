import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { regionPlaces, getRegionPlaceBySlug } from "@/data/region";
import { tours } from "@/data/tours";
import TourCard from "@/components/ui/TourCard";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return regionPlaces.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = getRegionPlaceBySlug(slug);
  if (!place) return {};
  return {
    title: place.seo.title,
    description: place.seo.description,
  };
}

export default async function RegionSubPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const place = getRegionPlaceBySlug(slug);
  if (!place) notFound();

  const t = await getTranslations("RegionPage");

  const relatedTours = tours.filter((tour) =>
    place.relatedTourSlugs.includes(tour.slug),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src={place.coverImage}
          alt={place.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-6 pb-16 w-full">
          {/* Back Link */}
          <Link
            href={`/${locale}/region`}
            className="btn-lg btn-ghost inline-flex items-center gap-2 text-md text-fog/70 hover:text-fog transition-colors mb-6"
          >
            {t("back")}
          </Link>
          {/* Hero Text */}
          <h1 className="font-serif text-fog text-4xl md:text-7xl leading-[0.8] tracking-[-0.01em] max-w-2xl mb-6">
            {place.name}
          </h1>
          <p className="text-sm text-fog/70 max-w-lg leading-relaxed">
            {place.tagline}
          </p>
        </div>
        {/* Scroll chevron */}
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

      {/* Description + Gallery */}
      <section className="py-20 bg-fog">
        <div className="max-w-[90rem] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {place.description
              .reduce<string[][]>((acc, _, i) => {
                if (i % 2 === 0) acc.push(place.description.slice(i, i + 2));
                return acc;
              }, [])
              .map((pair, i) => {
                const img = place.gallery[i];
                const textCell = (
                  <div className="flex flex-col gap-8 justify-start">
                    {i === 0 && (
                      <h2 className="font-serif text-granite text-4xl md:text-4xl leading-[0.8] tracking-[-0.01em] mb-8">
                        {place.sectionTitle}
                      </h2>
                    )}
                    {pair.map((para, j) => (
                      <p
                        key={j}
                        className="text-granite/80 tracking-wide leading-relaxed text-base max-w-lg"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                );
                const imgCell = img ? (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${place.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div />
                );
                return (
                  <Fragment key={i}>
                    {imgCell}
                    {textCell}
                  </Fragment>
                );
              })}
          </div>
        </div>
      </section>

      {/* Key highlights */}
      <section className="py-20 bg-fog border-t border-granite/10">
        <div className="max-w-[90rem] mx-auto px-4 md:px-6">
          <div className="mb-10 md:mb-16">
            <p className="text-[10px] md:text-base uppercase tracking-wide text-granite/30 mb-3">
              {t("highlightsEyebrow")}
            </p>
            <h2 className="font-serif text-granite text-4xl md:text-4xl leading-[0.8] tracking-[-0.01em]">
              {t("highlightsTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {place.highlights.map((item) => (
              <div key={item.name}>
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="font-medium text-granite mb-2">{item.name}</p>
                <p className="text-sm text-granite/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get there + map */}
      <section className="py-20 bg-fog">
        <div className="max-w-[90rem] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-granite text-4xl md:text-4xl leading-[0.8] tracking-[-0.01em] mb-8">
                {t("gettingHereTitle")}
              </h2>
              <p className="text-granite/70 leading-relaxed text-sm">
                {place.howToGetThere}
              </p>
            </div>
            <div className="w-full h-52 rounded-xl bg-granite/5 border border-granite/10 flex items-center justify-center">
              <p className="text-granite/30 text-sm">{t("mapPlaceholder")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="py-20 bg-fog">
          <div className="max-w-[90rem] mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-amber mb-3">
                  {t("toursEyebrow")}
                </p>
                <h2 className="text-4xl md:text-4xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
                  {t("toursTitle")}
                </h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
