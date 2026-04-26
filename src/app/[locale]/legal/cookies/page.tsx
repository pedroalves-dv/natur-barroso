import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'pt' ? 'Política de Cookies' : 'Cookie Policy',
  };
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isPt = locale === 'pt';

  return (
    <section className="pt-32 pb-24 bg-fog min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-granite mb-8">
          {isPt ? 'Política de Cookies' : 'Cookie Policy'}
        </h1>
        <p className="text-granite/70 leading-relaxed">
          {isPt
            ? 'Esta página está em preparação. A política de cookies completa da Natur Barroso será publicada antes do lançamento oficial do site. O site utiliza cookies essenciais para o funcionamento e, com o seu consentimento, cookies de análise para melhorar a experiência.'
            : 'This page is under construction. The full Natur Barroso cookie policy will be published before the official site launch. The site uses essential cookies for operation and, with your consent, analytics cookies to improve the experience.'}
        </p>
      </div>
    </section>
  );
}
