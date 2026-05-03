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
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-fog">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <p className="eyebrow text-amber">
            {t('eyebrow')}
          </p>
          <h1 className="section-title">{t('title')}</h1>
          <p className="text-granite/60 leading-relaxed">{t('subtitle')}</p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 bg-fog">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <FAQAccordion items={faqItems} locale={locale} />

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <p className="text-granite/60 text-sm mb-4">{t('contactCta')}</p>
            <Link
              href={`/${locale}/contact`}
              className="btn-lg btn-granite-ghost"
            >
              {locale === 'pt' ? 'Ir para contacto' : 'Go to contact'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
