import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import FeaturedTours from '@/components/home/FeaturedTours';
import RegionTeaser from '@/components/home/RegionTeaser';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';
import JournalTeaser from '@/components/home/JournalTeaser';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  return (
    <>
      <HeroSection locale={locale} />
      <TrustStrip />
      <FeaturedTours locale={locale} />
      <RegionTeaser locale={locale} />
      <HowItWorks locale={locale} />
      <Testimonials title={t('testimonialsTitle')} locale={locale} />
      <WhatsAppCTA />
      <JournalTeaser locale={locale} />
    </>
  );
}
