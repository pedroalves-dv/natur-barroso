import Image from 'next/image';
import Link from 'next/link';
import type { RegionPlace } from '@/types/region';

interface Props {
  place: RegionPlace;
  locale: string;
  exploreLabel: string;
}

export default function RegionCard({ place, locale, exploreLabel }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
      <Image
        src={place.coverImage}
        alt={place.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-fog text-xl leading-tight mb-1">{place.name}</h3>
        <p className="text-fog/70 text-sm mb-4 line-clamp-2">{place.tagline}</p>
        <Link
          href={`/${locale}/region/${place.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber hover:text-fog transition-colors"
        >
          {exploreLabel} →
        </Link>
      </div>
    </article>
  );
}
