import Image from "next/image";
import Link from "next/link";
import type { RegionPlace } from "@/types/region";

interface Props {
  place: RegionPlace;
  locale: string;
  exploreLabel: string;
}

export default function RegionCard({ place, locale, exploreLabel }: Props) {
  return (
    <article className="group relative flex h-full overflow-hidden border border-granite/10 hover:border-granite/40 hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)] hover:-translate-y-1 transition-all duration-300 ease-out aspect-[3/4] md:aspect-auto md:h-[460px]">
      <Link
        href={`/${locale}/region/${place.slug}`}
        className="absolute inset-0 z-10"
        aria-label={place.name}
      />
      <Image
        src={place.coverImage}
        alt={place.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-fog text-3xl leading-tight mb-1">
          {place.name}
        </h3>
        <p className="text-fog/70 text-sm mb-4 line-clamp-2">{place.tagline}</p>
        <span className="btn-sm btn-ghost group-hover:bg-fog/20 group-hover:text-fog">
          {exploreLabel} →
        </span>
      </div>
    </article>
  );
}
