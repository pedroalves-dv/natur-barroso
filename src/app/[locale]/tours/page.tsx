import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { tours } from "@/data/tours";
import ToursFilter from "@/components/tours/ToursFilter";

type Props = { params: Promise<{ locale: string }> };

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ToursPage");

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-16 w-full">
          <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-fog/50 mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-fog text-5xl md:text-7xl leading-[0.8] tracking-[-0.01em] max-w-2xl mb-6">
            {t("title")}
          </h1>
          <p className="text-sm text-fog/70 max-w-lg leading-relaxed">{t("subtitle")}</p>
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

      <ToursFilter tours={tours} locale={locale} labels={labels} />
    </>
  );
}
