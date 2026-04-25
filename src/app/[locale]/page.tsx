import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-forest text-white px-4 pt-20">
      <h1 className="text-4xl md:text-7xl lg:text-9xl text-center max-w-4xl leading-[0.9]">
        <span className="font-serif italic text-white">{t("titleLine1")}</span>{" "}
        <br />
        <span className="font-stack tracking-tight text-amber">
          {t("titleLine2")}
        </span>
      </h1>
      <p className="mt-6 text-lg text-white/70 text-center max-w-xl">
        {t("subtitle")}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-20">
        <Link
          href={`/${locale}/tours`}
          className="px-8 py-3 bg-amber text-white rounded-full font-medium hover:bg-amber/90 transition-colors text-center"
        >
          {locale === "pt" ? "Explorar Tours" : "Explore Tours"}
        </Link>
        <Link
          href={`/${locale}/region`}
          className="px-8 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors text-center"
        >
          {locale === "pt" ? "Sobre a Região" : "About the Region"}
        </Link>
      </div>
    </section>
  );
}
