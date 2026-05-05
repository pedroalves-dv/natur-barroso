import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import NaturBarrosoLogo from "@/components/ui/NaturBarrosoLogo";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fog px-4 pt-20 pb-16">
      <Link href={`/${locale}`} className="mb-12">
        <NaturBarrosoLogo variant="dark" className="h-10 w-auto" />
      </Link>

      <p
        className="font-serif text-8xl md:text-9xl text-forest/15 select-none mb-2"
        aria-hidden="true"
      >
        404
      </p>

      <h1 className="font-serif text-2xl md:text-3xl text-granite text-center max-w-lg leading-snug">
        {t("heading")}
      </h1>
      <p className="mt-4 text-granite/50 text-center max-w-md text-sm leading-relaxed">
        {t("body")}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-10">
        <Link
          href={`/${locale}`}
          className="px-6 py-3 bg-forest text-white rounded-sm font-medium hover:bg-moss transition-colors text-center text-sm"
        >
          {t("backHome")}
        </Link>
        <Link
          href={`/${locale}/tours`}
          className="px-6 py-3 border border-granite/20 text-granite rounded-sm font-medium hover:bg-granite/5 transition-colors text-center text-sm"
        >
          {t("viewTours")}
        </Link>
      </div>
    </div>
  );
}
