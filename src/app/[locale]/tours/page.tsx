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
      <section className="relative min-h-[50vh] flex items-end">
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
          <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-amber mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-fog">
            {t("title")}
          </h1>
          <p className="text-fog/60 max-w-lg">{t("subtitle")}</p>
        </div>
      </section>

      <ToursFilter tours={tours} locale={locale} labels={labels} />
    </>
  );
}
