import Image from 'next/image';
import type { Guide } from '@/types/guide';

interface Props {
  guide: Guide;
  locale: string;
}

export default function GuideCard({ guide, locale }: Props) {
  const specialtiesLabel = locale === 'pt' ? 'Especialidades' : 'Specialties';
  const languagesLabel = locale === 'pt' ? 'Línguas' : 'Languages';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={guide.photo}
          alt={guide.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/60 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-fog font-serif text-xl leading-tight">{guide.name}</p>
          <p className="text-amber text-xs font-medium mt-0.5">{guide.role}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <p className="text-granite/70 text-sm leading-relaxed">{guide.bio}</p>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-granite/40 mb-2">
            {specialtiesLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {guide.specialties.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded-full bg-forest/8 text-forest font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-granite/40 mb-2">
            {languagesLabel}
          </p>
          <p className="text-sm text-granite/60">{guide.languages.join(' · ')}</p>
        </div>
      </div>
    </article>
  );
}
