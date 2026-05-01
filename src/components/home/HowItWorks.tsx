import Image from "next/image";
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
      image: "/images/how-step-1.png",
      imageAlt: "Browsing the tour catalogue outdoors",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
      image: "/images/how-step-2.jpg",
      imageAlt: "Booking a tour on a mobile phone",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      ),
    },
    {
      number: "03",
      title: t("howStep3Title"),
      body: t("howStep3Body"),
      image: "/images/how-step-3.jpg",
      imageAlt: "Hiker exploring the Barroso highland landscape",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 8c0-2.8-2.2-5-5-5S7 5.2 7 8c0 4.4-2 5.5-2 5.5h14s-2-1.1-2-5.5z" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-granite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <p className="text-xs md:text-base md:font-semibold uppercase tracking-wide md:tracking-wider text-fog/40 md:mb-2">
              {t("howItWorksEyebrow")}
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-fog tracking-[-0.01em]">
              {t("howItWorksTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/tours`}
            className="btn-lg btn-ghost self-start md:self-auto"
          >
            {t("viewAllTours")}&nbsp; →
          </Link>
        </div>

        {/* Steps */}
        <ol className="list-none p-0 m-0 flex flex-col md:grid md:grid-cols-3 gap-px bg-fog/10 overflow-hidden">
          {steps.map((step) => (
            <li key={step.number} className="bg-fog/5 flex flex-col group">
              {/* Image with floating step badge */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-granite/60 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-granite/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-amber uppercase leading-none">
                    {step.number}
                  </span>
                  <span className="text-amber/70 leading-none">
                    {step.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5 px-8 py-8 flex-1">
                <div aria-hidden="true" className="w-10 h-px bg-amber/40" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-serif text-fog leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-fog/50 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
