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
    <section className="py-16 bg-fog border-t border-fog">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-serif text-granite mb-8">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
