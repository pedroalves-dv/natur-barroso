import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { sanityFetch } from "../../../../sanity/lib/client";
import {
  TOURS_LIST_QUERY,
  SITE_SETTINGS_QUERY,
  type SanityTourSummary,
  type SanitySiteSettings,
} from "../../../../sanity/lib/queries";
import ToursFilter from "@/components/tours/ToursFilter";
import ConditionsNotice from "@/components/layout/ConditionsNotice";
import type { Tour } from "@/types/tour";

type Props = { params: Promise<{ locale: string }> };

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ToursPage");

  const [tours, settings] = await Promise.all([
    sanityFetch<SanityTourSummary[]>({ query: TOURS_LIST_QUERY, tags: ["tour"] }),
    sanityFetch<SanitySiteSettings | null>({ query: SITE_SETTINGS_QUERY, tags: ["siteSettings"] }),
  ]);

  const conditionsMessage = settings?.conditionsBanner?.active
    ? settings.conditionsBanner.message
    : undefined;

  const labels = {
    filterTitle: t("filterTitle"),
    filterCategory: t("filterCategory"),
    filterDifficulty: t("filterDifficulty"),
    filterDuration: t("filterDuration"),
    filterSeason: t("filterSeason"),
    clearFilters: t("clearFilters"),
    noResults: t("noResults"),
    noResultsHint: t("noResultsHint"),
    allCategories: t("allCategories"),
    allDifficulties: t("allDifficulties"),
    allDurations: t("allDurations"),
    halfDay: t("halfDay"),
    fullDay: t("fullDay"),
    multiDay: t("multiDay"),
    filtersBtn: t("filtersBtn"),
    closeFilters: t("closeFilters"),
    toursLabel: t("toursLabel"),
  };

  return (
    <>
      {/* Page header */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="/images/all-tours.png"
          alt={t("title")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        <div className="hero-content">
          <p className="eyebrow text-fog/50">{t("eyebrow")}</p>
          <h1 className="page-hero-title">{t("title")}</h1>
          <p className="hero-body">{t("subtitle")}</p>
        </div>
        {conditionsMessage && <ConditionsNotice message={conditionsMessage} />}
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

      <ToursFilter tours={tours as unknown as Tour[]} locale={locale} labels={labels} />
    </>
  );
}
