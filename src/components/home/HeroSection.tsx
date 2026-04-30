import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

export default async function HeroSection({ locale }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative min-h-screen flex flex-col justify-center text-white">
      <Image
        src="https://images.unsplash.com/photo-1627846556059-6273c6c60991?w=1920&q=85"
        alt="Green hills in Barroso"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      /> */}

      <div className="relative z-10 text-left px-4 md:px-6 max-w-7xl mx-auto pt-20 w-full">
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
          <span className="font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("titleLine1")}
          </span>
          <br />
          <span className="font-stack tracking-tight text-fog drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("titleLine2")}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-fog/80 max-w-xl mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center justify-center px-8 py-2 rounded-2xl text-md font-medium bg-amber border border-amber text-white hover:text-granite hover:border-granite/10 hover:bg-amber/60 transition-colors min-w-[9rem]"
          >
            {t("heroCtaPrimary")}
          </Link>
          <Link
            href={`/${locale}/region`}
            className="px-8 py-3.5 border border-white/40 text-white rounded-2xl font-medium hover:bg-white/10 transition-colors text-center"
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/60" />
      </div>
    </section>
  );
}
