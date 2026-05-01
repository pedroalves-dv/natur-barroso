import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

export default async function HowItWorks({ locale }: Props) {
  const t = await getTranslations("HomePage");

  const steps = [
    {
      number: "01",
      title: t("howStep1Title"),
      body: t("howStep1Body"),
    },
    {
      number: "02",
      title: t("howStep2Title"),
      body: t("howStep2Body"),
    },
    {
      number: "03",
      title: t("howStep3Title"),
      body: t("howStep3Body"),
    },
  ];

  return (
    <section className="py-24 bg-granite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-fog/30 mb-3">
              {t("howItWorksEyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] text-fog tracking-[-0.01em]">
              {t("howItWorksTitle")}
            </h2>
          </div>
          <div className="hidden md:block">
            <Link
              href={`/${locale}/tours`}
              className="btn-lg btn-ghost"
            >
              {t("viewAllTours")}&nbsp; →
            </Link>
          </div>
        </div>

        {/* Steps */}
        <ol className="list-none p-0 m-0">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 pb-2 mb-4"
            >
              <span className="font-serif text-6xl md:text-9xl text-fog/30 leading-[0.8] shrink-0 md:w-28">
                {step.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl md:text-4xl font-serif text-fog leading-snug">
                  {step.title}
                </h3>
                <p className="text-base text-fog/55 leading-relaxed max-w-2xl">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 md:hidden">
          <Link href={`/${locale}/tours`} className="btn-lg btn-ghost w-full">
            {t("viewAllTours")}&nbsp; →
          </Link>
        </div>
      </div>
    </section>
  );
}
