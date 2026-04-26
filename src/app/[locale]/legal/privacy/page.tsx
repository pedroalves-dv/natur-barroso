import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'pt' ? 'Política de Privacidade' : 'Privacy Policy',
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === 'pt';

  return (
    <section className="pt-32 pb-24 bg-fog min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-granite mb-8">
          {isPt ? 'Política de Privacidade' : 'Privacy Policy'}
        </h1>
        <p className="text-granite/70 leading-relaxed">
          {isPt
            ? 'Esta página está em preparação. A política de privacidade completa da Natur Barroso será publicada antes do lançamento oficial do site, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).'
            : 'This page is under construction. The full Natur Barroso privacy policy will be published before the official site launch, in compliance with the General Data Protection Regulation (GDPR).'}
        </p>
      </div>
    </section>
  );
}
