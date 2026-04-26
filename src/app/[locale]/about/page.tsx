import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { guides } from '@/data/guides';
import GuideCard from '@/components/about/GuideCard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'pt' ? 'A Nossa Equipa' : 'About Us',
    description:
      locale === 'pt'
        ? 'Conheça os guias locais da Natur Barroso — a equipa que vive e respira o Barroso desde sempre.'
        : 'Meet the local guides of Natur Barroso — the team that lives and breathes Barroso.',
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('AboutPage');
  const isPt = locale === 'pt';

  const storyParagraphs = isPt
    ? [
        'A Natur Barroso nasceu de uma convicção simples: o Barroso é um dos territórios mais extraordinários da Europa, e merecia quem o apresentasse ao mundo com honestidade e paixão. Não como um produto turístico genérico, mas como o que realmente é — um planalto de granito e silêncio, onde a natureza e a cultura humana coexistem há milénios.',
        'Os nossos guias não são apenas profissionais formados — são pessoas que cresceram neste território, que conhecem os seus segredos e que acreditam genuinamente que uma manhã no Barroso pode mudar a forma como alguém olha para o mundo.',
        'Operamos em pequenos grupos porque acreditamos que a qualidade da experiência depende da atenção individual. Trabalhamos com produtores locais, alojamentos familiares e restaurantes de aldeia porque acreditamos que o turismo deve beneficiar as comunidades que o tornam possível.',
      ]
    : [
        'Natur Barroso was born from a simple conviction: Barroso is one of the most extraordinary territories in Europe, and it deserved someone to present it to the world with honesty and passion. Not as a generic tourism product, but as what it truly is — a granite plateau of silence, where nature and human culture have coexisted for millennia.',
        'Our guides are not just trained professionals — they are people who grew up in this territory, who know its secrets and genuinely believe that a morning in Barroso can change the way someone sees the world.',
        'We operate in small groups because we believe the quality of experience depends on individual attention. We work with local producers, family-run accommodation and village restaurants because we believe tourism should benefit the communities that make it possible.',
      ];

  const values = isPt
    ? [
        {
          icon: '🌿',
          title: 'Local de raiz',
          body: 'Somos da região e conhecemos cada trilho, aldeia e história. Nenhum detalhe é genérico.',
        },
        {
          icon: '👥',
          title: 'Grupos pequenos',
          body: 'Máximo 8–12 pessoas por tour. Atenção individual, ritmo do grupo, experiência personalizada.',
        },
        {
          icon: '🌱',
          title: 'Impacto responsável',
          body: 'Colaboramos com produtores, alojamentos e restaurantes locais. O turismo que praticamos fica na região.',
        },
      ]
    : [
        {
          icon: '🌿',
          title: 'Locally rooted',
          body: 'We are from the region and know every trail, village and story. Nothing is generic.',
        },
        {
          icon: '👥',
          title: 'Small groups',
          body: 'Maximum 8–12 people per tour. Individual attention, group pace, personalised experience.',
        },
        {
          icon: '🌱',
          title: 'Responsible impact',
          body: 'We collaborate with local producers, accommodation and restaurants. The tourism we practice stays in the region.',
        },
      ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-granite text-fog overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[60vh]">
          <div className="flex flex-col justify-center px-8 py-20 md:px-12 lg:px-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
              {t('eyebrow')}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">{t('title')}</h1>
            <p className="text-fog/70 leading-relaxed max-w-md">{t('subtitle')}</p>
          </div>
          <div className="relative h-72 md:h-auto min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1000&q=85"
              alt={isPt ? 'Guias Natur Barroso no trilho' : 'Natur Barroso guides on trail'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-granite/30 to-transparent md:bg-none" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
              {t('storyEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-granite mb-8">{t('storyTitle')}</h2>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t('guidesEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-granite mb-12">{t('guidesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-moss text-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t('valuesEyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">{t('valuesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="font-serif text-xl">{v.title}</h3>
                <p className="text-fog/70 leading-relaxed text-sm">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-fog border-t border-granite/8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-granite/40 mb-6 text-center">
            {t('certTitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-granite/60">
            <span>✓ IPDJ — Guias de Montanha Certificados</span>
            <span>✓ Seguro de Atividade na Natureza</span>
            <span>✓ Primeiros Socorros em Ambiente Remoto</span>
            <span>✓ 4,8★ {t('ratingLabel')}</span>
          </div>
        </div>
      </section>
    </>
  );
}
