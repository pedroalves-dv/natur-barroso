import { getTranslations } from "next-intl/server";
import type { PricingTier } from "@/types/tour";

interface Props {
  pricing: PricingTier[];
  title: string;
  locale: string;
}

export default async function TourPricingTable({ pricing, title, locale }: Props) {
  const t = await getTranslations("TourDetail");
  const isPt = locale === "pt";

  return (
    <div>
      <h2 className="text-2xl font-serif text-granite mb-6">{title}</h2>
      <div className="border border-fog rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-forest/5 border-b border-fog">
              <th className="text-left text-xs  uppercase tracking-wider text-granite/50 px-5 py-3">
                {t("pricingTypeHeader")}
              </th>
              <th className="text-right text-xs  uppercase tracking-wider text-granite/50 px-5 py-3">
                {t("pricingPriceHeader")}
              </th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((tier, i) => (
              <tr
                key={tier.label}
                className={`${i < pricing.length - 1 ? "border-b border-fog" : ""}`}
              >
                <td className="px-5 py-4 text-sm text-granite">
                  {isPt ? tier.label : (tier.label_en ?? tier.label)}
                </td>
                <td className="px-5 py-4 text-right  text-granite">
                  €{tier.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-granite/40 mt-3">
        {t("pricingNote")}
      </p>
    </div>
  );
}
