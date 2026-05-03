import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import NaturBarrosoLogo from "../ui/NaturBarrosoLogo";

interface Props {
  locale: string;
}

export default async function HeroSection({ locale }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative min-h-screen flex items-center md:items-end text-white">
      {/* Hero */}
      <Image
        src="/images/all-tours.png"
        alt="Green hills in Barroso"
        fill
        className="object-cover object-[center_60%]"
        priority
        sizes="100vw"
      />
      {/* Image overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
      {/* Hero content  */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-6 md:pb-24 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 ">
        <div className="flex flex-col">
          {/* <NaturBarrosoLogo className="invert-[0.9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-w-[240px] mb-6" /> */}
          <h1 className="text-5xl md:text-7xl leading-[0.8] font-serif tracking-[-0.01em] text-fog drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] mb-6">
            {t("title")}
          </h1>
          <p className="text-sm text-fog/70 max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex flex-row gap-3 justify-between md:items-stretch shrink-0">
          <Link href={`/${locale}/tours`} className="btn-lg btn-fog">
            {t("heroCtaPrimary")}
          </Link>
          <Link href={`/${locale}/region`} className="btn-lg btn-ghost">
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>
      {/* Scroll chevron indicator  */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 animate-nudge-down">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
