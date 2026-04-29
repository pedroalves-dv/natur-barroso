import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

export default async function RegionTeaser({ locale }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="bg-granite text-fog overflow-hidden ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col justify-center px-4 py-16 md:px-6">
          <p className="text-md font-semibold uppercase tracking-wider text-amber mb-4">
            {t("regionTeaserEyebrow")}
          </p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight tracking-[-0.015em] mb-6">
            {t("regionTeaserTitle")}
          </h2>
          <p className="text-fog/70 leading-relaxed mb-8 max-w-md">
            {t("regionTeaserSubtitle")}
          </p>
          <Link
            href={`/${locale}/region`}
            className="inline-flex w-fit items-center px-6 py-3 rounded-full border border-fog/30 text-fog font-medium hover:bg-fog/10 transition-colors text-sm"
          >
            {t("regionTeaserCta")}
          </Link>
        </div>

        {/* Image */}
        <div className="relative h-72 md:h-auto min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1000&q=85"
            alt="Gerês river and forest landscape"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-granite/30 to-transparent md:bg-none" />
        </div>
      </div>
    </section>
  );
}
