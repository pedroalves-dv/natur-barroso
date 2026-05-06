import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "../../../sanity/lib/client";
import { SITE_SETTINGS_QUERY, type SanitySiteSettings } from "../../../sanity/lib/queries";
import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedTours from "@/components/home/FeaturedTours";
import RegionTeaser from "@/components/home/RegionTeaser";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import JournalTeaser from "@/components/home/JournalTeaser";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tReviews, settings] = await Promise.all([
    getTranslations("HomePage"),
    getTranslations("ReviewsPage"),
    sanityFetch<SanitySiteSettings | null>({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] }),
  ]);

  const conditionsMessage = settings?.conditionsBanner?.active
    ? settings.conditionsBanner.message
    : undefined;

  return (
    <>
      <HeroSection locale={locale} conditionsMessage={conditionsMessage} />
      {/* <TrustStrip /> */}
      <FeaturedTours locale={locale} />
      <RegionTeaser locale={locale} />
      <HowItWorks locale={locale} />
      <Testimonials
        title={t("testimonialsTitle")}
        locale={locale}
        sourcesLabel={tReviews("sources")}
        bookTourLabel={t("bookTourCta")}
      />
      <WhatsAppCTA />
      <JournalTeaser locale={locale} />
    </>
  );
}
