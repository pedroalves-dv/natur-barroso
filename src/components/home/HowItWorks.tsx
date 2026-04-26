import { getTranslations } from "next-intl/server";

export default async function HowItWorks() {
  const t = await getTranslations("HomePage");

  const steps = [
    {
      number: "01",
      title: t("howStep1Title"),
      body: t("howStep1Body"),
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      number: "02",
      title: t("howStep2Title"),
      body: t("howStep2Body"),
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      number: "03",
      title: t("howStep3Title"),
      body: t("howStep3Body"),
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 17l4-8 4 4 4-6 4 10" />
          <path d="M3 20h18" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-fog">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
            {t("howItWorksEyebrow")}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-granite">
            {t("howItWorksTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-start"
            >
              {/* Connector line between steps */}

              <div className="relative z-10 flex items-center gap-4 mb-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 text-forest shrink-0">
                  {step.icon}
                </div>
                <span className="text-5xl font-serif text-granite/10 font-bold leading-none">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-medium text-granite mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-granite/60 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
