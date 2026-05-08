import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Tour } from "@/types/tour";

interface Props {
  tour: Tour;
  locale: string;
}

export default async function FareHarborWidget({ tour, locale }: Props) {
  const t = await getTranslations("TourDetail");
  const isPt = locale === "pt";
  const minPrice = Math.min(...tour.pricing.map((p) => p.price));

  return (
    <div className="bg-white rounded-xl border border-granite/10 p-6">
      <p className="text-xs  uppercase tracking-widest text-granite/40 mb-3">
        {t("bookBtn")}
      </p>

      <p className="text-3xl font-serif text-granite mb-0.5">
        {t("fromLabel")}{" "}
        <span className="text-amber">€{minPrice}</span>
      </p>
      <p className="text-xs text-granite/50 mb-5">
        {t("perPerson")}
      </p>

      <div className="space-y-2.5 mb-6 py-4 border-y border-fog">
        {tour.pricing.map((tier) => (
          <div key={tier.label} className="flex justify-between text-sm">
            <span className="text-granite/60">
              {isPt ? tier.label : (tier.label_en ?? tier.label)}
            </span>
            <span className="font-medium text-granite">€{tier.price}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/${locale}/contact`}
        className="block w-full text-center px-6 py-3.5 bg-amber text-white rounded-full font-medium hover:bg-amber/90 transition-colors text-sm"
      >
        {t("requestBtn")}
      </Link>

      <p className="text-xs text-center text-granite/40 mt-4 leading-relaxed">
        {t("bookingNote")}
      </p>
    </div>
  );
}
