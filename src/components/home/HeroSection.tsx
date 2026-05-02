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
    <section className="relative min-h-screen flex flex-col justify-center text-white">
      <Image
        src="/images/discover.jpg"
        alt="Green hills in Barroso"
        fill
        className="object-cover object-[center_60%]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

      <div className="flex flex-col items-center justify-center relative z-10 px-4 md:px-6 max-w-3xl mx-auto pt-20 w-full">
        {/* <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
          <span className="font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("titleLine1")}
          </span>
          <br />
          <span className="font-stack tracking-tight text-fog drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("titleLine2")}
          </span>
        </h1> */}
        <NaturBarrosoLogo className="invert-[0.9] mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]" />

        <p className="text-center text-lg md:text-xl text-fog/80 max-w-xl mb-24 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/tours`} className="btn-lg btn-amber-solid">
            {t("heroCtaPrimary")}
          </Link>
          <Link href={`/${locale}/region`} className="btn-lg btn-ghost ">
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>

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
