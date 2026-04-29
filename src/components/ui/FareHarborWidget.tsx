import Link from 'next/link';
import type { Tour } from '@/types/tour';

interface Props {
  tour: Tour;
  locale: string;
}

export default function FareHarborWidget({ tour, locale }: Props) {
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const isPt = locale === 'pt';

  return (
    <div className="bg-white rounded-xl border border-granite/10 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-granite/40 mb-3">
        {isPt ? 'Reservar' : 'Book now'}
      </p>

      <p className="text-3xl font-serif text-granite mb-0.5">
        {isPt ? 'A partir de' : 'From'}{' '}
        <span className="text-amber">€{minPrice}</span>
      </p>
      <p className="text-xs text-granite/50 mb-5">{isPt ? 'por pessoa' : 'per person'}</p>

      <div className="space-y-2.5 mb-6 py-4 border-y border-fog">
        {tour.pricing.map((tier) => (
          <div key={tier.label} className="flex justify-between text-sm">
            <span className="text-granite/60">
              {isPt ? tier.label : (tier.label_en ?? tier.label)}
            </span>
            <span className="font-medium text-granite">€{tier.price}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/${locale}/contact`}
        className="block w-full text-center px-6 py-3.5 bg-amber text-white rounded-full font-medium hover:bg-amber/90 transition-colors text-sm"
      >
        {isPt ? 'Solicitar este tour' : 'Request this tour'}
      </Link>

      <p className="text-xs text-center text-granite/40 mt-4 leading-relaxed">
        {isPt
          ? 'Reserva segura via FareHarbor — em breve. Respondemos em menos de 24 horas.'
          : 'Secure booking via FareHarbor — coming soon. We reply within 24 hours.'}
      </p>
    </div>
  );
}
