import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { guides } from "@/data/guides";
import GuideCard from "@/components/about/GuideCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  const storyParagraphs = [t("storyP1"), t("storyP2"), t("storyP3")];

  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <>
      {/* Hero — full-bleed image, same pattern as TourHero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85"
          alt={t("heroAlt")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

        <div className="hero-content">
          <p className="eyebrow text-amber">{t("eyebrow")}</p>
          <h1 className="page-hero-title mb-6">{t("title")}</h1>
          <p className="hero-body">{t("subtitle")}</p>
        </div>

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

      {/* Story */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="section-header">
              <div>
                <p className="eyebrow text-granite/40">{t("storyEyebrow")}</p>
                <h2 className="section-title">{t("storyTitle")}</h2>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="text-granite/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/40">{t("guidesEyebrow")}</p>
              <h2 className="section-title">{t("guidesTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/40">{t("valuesEyebrow")}</p>
              <h2 className="section-title">{t("valuesTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <h3 className="font-serif text-xl text-granite">{v.title}</h3>
                <p className="text-granite/70 leading-relaxed text-sm">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-fog border-t border-granite/8">
        <div className="container-wide">
          <p className="eyebrow text-granite/40 text-center mb-6">
            {t("certTitle")}
          </p>
          <div className="flex flex-wrap justify-between gap-4 text-sm text-granite/60">
            <span>✓ {t("cert1")}</span>
            <span>✓ {t("cert2")}</span>
            <span>✓ {t("cert3")}</span>
            <span>✓ 4,8★ {t("ratingLabel")}</span>
          </div>
        </div>
      </section>
    </>
  );
}
