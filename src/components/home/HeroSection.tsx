import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import NaturBarrosoLogo from "../ui/NaturBarrosoLogo";
import ConditionsNotice from "@/components/layout/ConditionsNotice";

interface Props {
  locale: string;
  conditionsMessage?: string;
}

export default async function HeroSection({ locale, conditionsMessage }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row md:items-end text-white">
      {/* Hero */}
      <Image
        src="/images/all-tours.png"
        alt="Green hills in Barroso"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      {/* Image overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
      {/* Hero content  */}
      <div className="hero-content flex flex-col flex-1 md:flex-row md:items-end justify-between gap-8">
        {/* Mobile: vertically centered. Desktop: sits at bottom left. */}
        <div className="flex flex-col flex-1 justify-center md:flex-none">
          <h1 className="hero-title drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("title")}
          </h1>
          <p className="hero-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("subtitle")}
          </p>
        </div>
        {/* Mobile buttons */}
        <div className="flex flex-row gap-8 justify-between md:items-stretch shrink-0 ">
          <Link href={`/${locale}/tours`} className="btn-lg btn-fog">
            {t("heroCtaPrimary")}
          </Link>
          <Link href={`/${locale}/region`} className="btn-lg btn-ghost">
            {t("heroCtaSecondary")}
          </Link>
        </div>
      </div>
      {conditionsMessage && <ConditionsNotice message={conditionsMessage} />}
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
