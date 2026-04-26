import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/types/tour';
import CategoryBadge from './CategoryBadge';
import DifficultyPill from './DifficultyPill';

interface Props {
  tour: Tour;
  locale: string;
}

export default function TourCard({ tour, locale }: Props) {
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));
  const isPt = locale === 'pt';

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={tour.category} locale={locale} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg text-granite mb-1 leading-snug">
          {isPt ? tour.title : (tour.title_en ?? tour.title)}
        </h3>
        <p className="text-sm text-granite/60 mb-4 leading-relaxed line-clamp-2">
          {isPt ? tour.shortDescription : (tour.shortDescription_en ?? tour.shortDescription)}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <DifficultyPill difficulty={tour.difficulty} locale={locale} />
          <span className="text-xs text-granite/50">
            {isPt ? tour.duration : (tour.duration_en ?? tour.duration)}
          </span>
          <span className="text-xs text-granite/50">
            {tour.groupSize.min}–{tour.groupSize.max} {isPt ? 'pessoas' : 'people'}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-fog">
          <span className="text-sm font-medium text-granite">
            <span className="text-xs font-normal text-granite/50">
              {isPt ? 'A partir de ' : 'From '}
            </span>
            €{minPrice}
          </span>
          <Link
            href={`/${locale}/tours/${tour.slug}`}
            className="text-sm font-medium text-amber hover:text-forest transition-colors"
          >
            {isPt ? 'Ver tour' : 'View tour'} →
          </Link>
        </div>
      </div>
    </article>
  );
}
