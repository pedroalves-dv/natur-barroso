import type { Tour } from '@/types/tour';
import TourCard from '@/components/ui/TourCard';

interface Props {
  tours: Tour[];
  locale: string;
  title: string;
}

export default function SimilarTours({ tours, locale, title }: Props) {
  if (tours.length === 0) return null;

  return (
    <section className="py-20 bg-fog border-t border-granite/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">{title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
