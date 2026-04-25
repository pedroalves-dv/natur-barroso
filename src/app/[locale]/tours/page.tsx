import { setRequestLocale, getTranslations } from 'next-intl/server';
import { tours } from '@/data/tours';
import ToursFilter from '@/components/tours/ToursFilter';

type Props = { params: Promise<{ locale: string }> };

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ToursPage');

  const labels = {
    filterTitle: t('filterTitle'),
    filterCategory: t('filterCategory'),
    filterDifficulty: t('filterDifficulty'),
    filterDuration: t('filterDuration'),
    filterSeason: t('filterSeason'),
    clearFilters: t('clearFilters'),
    noResults: t('noResults'),
    noResultsHint: t('noResultsHint'),
    allCategories: t('allCategories'),
    allDifficulties: t('allDifficulties'),
    allDurations: t('allDurations'),
    halfDay: t('halfDay'),
    fullDay: t('fullDay'),
    multiDay: t('multiDay'),
    filtersBtn: t('filtersBtn'),
    closeFilters: t('closeFilters'),
  };

  return (
    <>
      {/* Page header */}
      <div className="bg-granite text-fog pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-3">{t('title')}</h1>
          <p className="text-fog/60 max-w-lg">{t('subtitle')}</p>
        </div>
      </div>

      <ToursFilter tours={tours} locale={locale} labels={labels} />
    </>
  );
}
