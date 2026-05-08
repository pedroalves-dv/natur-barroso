import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Footer' });
  return { title: t('cookies') };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFooter = await getTranslations('Footer');
  const tCookies = await getTranslations('CookieBanner');

  return (
    <section className="pt-32 pb-24 bg-fog min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-granite mb-8">
          {tFooter('cookies')}
        </h1>
        <p className="text-granite/70 leading-relaxed">
          {tCookies('message')}
        </p>
      </div>
    </section>
  );
}
