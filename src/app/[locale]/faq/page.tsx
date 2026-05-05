import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { faqItems } from '@/data/faq';
import FAQAccordion from '@/components/faq/FAQAccordion';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'FAQ',
    description:
      locale === 'pt'
        ? 'Perguntas frequentes sobre os tours Natur Barroso — reservas, atividades, cancelamentos e muito mais.'
        : 'Frequently asked questions about Natur Barroso tours — bookings, activities, cancellations and more.',
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('FAQPage');

  return (
    <section className="pt-32 pb-20 bg-fog">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: page header + accordion */}
          <div>
            <div className="mb-16">
              <p className="eyebrow text-amber">{t('eyebrow')}</p>
              <h1 className="section-title mb-8 md:mb-12">{t('title')}</h1>
              <p className="text-granite/60 leading-relaxed">{t('subtitle')}</p>
            </div>
            <FAQAccordion items={faqItems} locale={locale} />
          </div>

          {/* Right: sticky contact section */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">
            <div>
              <p className="eyebrow text-amber">{t('contactEyebrow')}</p>
              <h2 className="section-title mb-8 md:mb-12">{t('contactSidebarTitle')}</h2>
              <p className="text-granite/60 leading-relaxed">{t('contactCta')}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-lg btn-granite self-start"
            >
              {t('contactBtn')}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
