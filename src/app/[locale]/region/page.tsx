import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { regionPlaces } from '@/data/region';
import RegionCard from '@/components/region/RegionCard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'pt' ? 'A Região Barroso' : 'Barroso Region Guide',
    description:
      locale === 'pt'
        ? 'Descubra as Terras de Barroso — cascatas, aldeias medievais, castelos e o Parque Nacional Peneda-Gerês.'
        : 'Discover the Terras de Barroso — waterfalls, medieval villages, castles and Peneda-Gerês National Park.',
  };
}

const SEASONS = [
  {
    season: 'Primavera',
    months: 'Mar – Mai',
    note: 'Cascatas em pleno. Flores silvestres. Ideal para caminhadas.',
    color: '#2D9B4F',
  },
  {
    season: 'Verão',
    months: 'Jun – Ago',
    note: 'Banhos nas cascatas e rios. Dias longos. Reservar com antecedência.',
    color: '#C8882A',
  },
  {
    season: 'Outono',
    months: 'Set – Nov',
    note: 'Melhor para fauna e fotografia. Menos turistas. Castanhas e vindimas.',
    color: '#7C6138',
  },
  {
    season: 'Inverno',
    months: 'Dez – Fev',
    note: 'Planalto nevado. Caudais máximos. Expedições 4×4 especiais.',
    color: '#4A6B7C',
  },
];

const WHY_CARDS = [
  {
    icon: '🐺',
    titlePt: 'Fauna singular',
    titleEn: 'Singular wildlife',
    bodyPt: 'Uma das últimas alcateias de lobo-ibérico de Portugal. Corços, javalis e mais de 200 espécies de aves.',
    bodyEn: 'One of Portugal\'s last Iberian wolf packs. Roe deer, wild boar and over 200 bird species.',
  },
  {
    icon: '🏰',
    titlePt: 'Cultura e história',
    titleEn: 'Culture & history',
    bodyPt: 'Castelos medievais, mosteiros em ruínas e aldeias graníticas onde o tempo ainda manda.',
    bodyEn: 'Medieval castles, ruined monasteries and granite villages where time still rules.',
  },
  {
    icon: '🍷',
    titlePt: 'Gastronomia única',
    titleEn: 'Unique gastronomy',
    bodyPt: 'Vinho dos Mortos, carne barrosã, mel de urze, queijo de cabra. Uma cozinha que é puro território.',
    bodyEn: 'Vinho dos Mortos, Barrosã beef, heather honey, goat cheese. A cuisine that is pure territory.',
  },
];

export default async function RegionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('RegionPage');
  const isPt = locale === 'pt';

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1627846556059-6273c6c60991?w=1920&q=85"
          alt={isPt ? 'Paisagem do planalto barrosano' : 'Barroso plateau landscape'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-16 w-full">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
            {t('eyebrow')}
          </p>
          <h1 className="font-serif text-fog text-4xl md:text-6xl leading-tight max-w-2xl mb-6">
            {t('title')}
          </h1>
          <p className="text-fog/70 max-w-lg leading-relaxed">{t('subtitle')}</p>
        </div>
      </section>

      {/* Why Barroso */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t('whyEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-granite mb-12">{t('whyTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WHY_CARDS.map((card) => (
              <div key={card.icon} className="flex flex-col gap-3">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-serif text-granite text-xl">
                  {isPt ? card.titlePt : card.titleEn}
                </h3>
                <p className="text-granite/60 text-sm leading-relaxed">
                  {isPt ? card.bodyPt : card.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Places grid */}
      <section className="py-20 bg-granite">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t('placesEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-fog mb-12">{t('placesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {regionPlaces.map((place) => (
              <RegionCard
                key={place.slug}
                place={place}
                locale={locale}
                exploreLabel={isPt ? 'Explorar' : 'Explore'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal guide */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif text-granite mb-10">{t('seasonTitle')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEASONS.map((s) => (
              <div
                key={s.season}
                className="rounded-xl p-5 border border-granite/10 flex flex-col gap-2"
                style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}
              >
                <p className="font-semibold text-granite">{s.season}</p>
                <p className="text-xs text-granite/40 font-medium">{s.months}</p>
                <p className="text-sm text-granite/60 leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="py-20 bg-granite text-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif mb-10">{t('gettingHereTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-amber font-semibold mb-2">Porto → Montalegre</p>
              <p className="text-fog/70">A24 / IP3 · 100 km · 1h30</p>
            </div>
            <div>
              <p className="text-amber font-semibold mb-2">Lisboa → Montalegre</p>
              <p className="text-fog/70">A23 / IP3 · 420 km · 3h45</p>
            </div>
            <div>
              <p className="text-amber font-semibold mb-2">
                {isPt ? 'Aeroporto mais próximo' : 'Nearest airport'}
              </p>
              <p className="text-fog/70">Porto OPO · 90 km · 1h10</p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-10 w-full h-64 rounded-2xl bg-fog/5 border border-fog/10 flex items-center justify-center">
            <p className="text-fog/30 text-sm">{t('mapPlaceholder')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
