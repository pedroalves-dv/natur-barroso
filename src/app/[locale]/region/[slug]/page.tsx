import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { regionPlaces, getRegionPlaceBySlug } from '@/data/region';
import { tours } from '@/data/tours';
import TourCard from '@/components/ui/TourCard';

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

  const t = await getTranslations('RegionPage');
  const isPt = locale === 'pt';

  const relatedTours = tours.filter((tour) => place.relatedTourSlugs.includes(tour.slug));

  const backLabel = isPt ? '← A Região' : '← The Region';
  const howToGetThereLabel = isPt ? 'Como chegar' : 'How to get there';
  const mapPlaceholder = isPt ? 'Mapa interativo disponível em breve' : 'Interactive map coming soon';

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end">
        <Image
          src={place.coverImage}
          alt={place.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-14 w-full">
          <Link
            href={`/${locale}/region`}
            className="inline-block text-fog/70 text-sm mb-6 hover:text-fog transition-colors"
          >
            {backLabel}
          </Link>
          <h1 className="font-serif text-fog text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            {place.name}
          </h1>
          <p className="text-fog/70 text-lg max-w-2xl">{place.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl flex flex-col gap-6">
            {place.description.map((para, i) => (
              <p key={i} className="text-granite/80 leading-relaxed text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-3">
            {place.gallery.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img}
                  alt={`${place.name} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to get there + map */}
      <section className="py-16 bg-granite text-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl mb-4">{howToGetThereLabel}</h2>
              <p className="text-fog/70 leading-relaxed text-sm">{place.howToGetThere}</p>
            </div>
            <div className="w-full h-52 rounded-xl bg-fog/5 border border-fog/10 flex items-center justify-center">
              <p className="text-fog/30 text-sm">{mapPlaceholder}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="py-20 bg-fog">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
              {t('toursEyebrow')}
            </p>
            <h2 className="text-3xl font-serif text-granite mb-10">{t('toursTitle')}</h2>
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
