import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

const FACT_ICONS = [
  // 1525m — Larouco range
  <svg
    key="landplot"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 8 6-3-6-3v10" />
    <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
    <path d="m6.49 12.85 11.02 6.3" />
    <path d="M17.51 12.85 6.5 19.15" />
  </svg>,
  // 2018 — UNESCO designation
  <svg
    key="award"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>,
  // 12+ — villages
  <svg
    key="landmark"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 18v-7" />
    <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
    <path d="M14 18v-7" />
    <path d="M18 18v-7" />
    <path d="M3 22h18" />
    <path d="M6 18v-7" />
  </svg>,
  // 200+ — bird species
  <svg
    key="bird"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 7h.01" />
    <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
    <path d="m20 7 2 .5-2 .5" />
    <path d="M10 18v3" />
    <path d="M14 17.75V21" />
    <path d="M7 18a6 6 0 0 0 3.84-10.61" />
  </svg>,
];

const MARKERS = [
  { name: "Pitões das Júnias", x: 42, y: 48 },
  { name: "Tourém", x: 10, y: 80 },
  { name: "Montalegre", x: 60, y: 60 },
  { name: "Boticas", x: 74, y: 78 },
];

export default async function RegionTeaser({ locale }: Props) {
  const t = await getTranslations("HomePage");

  const facts = [
    {
      num: "1525m",
      label: t("regionFact1Label"),
      desc: t("regionFact1Desc"),
      icon: FACT_ICONS[0],
    },
    {
      num: "2018",
      label: t("regionFact2Label"),
      desc: t("regionFact2Desc"),
      icon: FACT_ICONS[1],
    },
    {
      num: "12+",
      label: t("regionFact3Label"),
      desc: t("regionFact3Desc"),
      icon: FACT_ICONS[2],
    },
    {
      num: "200+",
      label: t("regionFact4Label"),
      desc: t("regionFact4Desc"),
      icon: FACT_ICONS[3],
    },
  ];

  return (
    <section className="bg-fog text-granite overflow-hidden pt-24 pb-16 md:py-24 max-w-7xl mx-auto px-6 ">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-[640px]">
        {/* Text + facts */}
        <div className="flex flex-col justify-center mb-auto">
          <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-amber mb-3">
            {t("regionTeaserEyebrow")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite mb-8 md:mb-16">
            {t("regionTeaserTitle")}
          </h2>
          <p className="text-granite/65 leading-relaxed max-w-md text-sm md:text-base">
            {t("regionTeaserSubtitle")}
          </p>

          <div className="grid grid-cols-2 gap-y-4 mt-4 md:mt-8 md:mb-16">
            {facts.map((f) => (
              <div className="pr-8 pt-4" key={f.num}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber shrink-0">{f.icon}</span>
                  <span className="text-4xl font-stack text-amber leading-none">
                    {f.num}
                  </span>
                </div>
                <div className="text-sm font-medium text-granite/90 leading-snug mb-0.5">
                  {f.label}
                </div>
                <div className="text-xs text-granite/45 leading-snug">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href={`/${locale}/region`} className="btn-lg btn-amber">
              {t("regionTeaserCta")}&nbsp; →
            </Link>
          </div>
        </div>

        {/* Photo + map markers */}
        <div className="relative min-h-[400px] mb-4 overflow-hidden lg:mb-0 lg:min-h-0 ">
          <Image
            src="/images/region-teaser.jpg"
            alt="Barroso highland landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {MARKERS.map((m) => (
            <div
              key={m.name}
              className="absolute w-5 h-5"
              style={{
                left: `${m.x}%`,
                top: `${m.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Ping sweep */}
              <span className="absolute inset-0 rounded-full border border-fog/40 animate-ping" />
              {/* Outer ring */}
              <span className="absolute inset-0 rounded-full border border-fog/50" />
              {/* Center dot */}
              <span className="absolute top-1/2 left-1/2 w-[10px] h-[10px] rounded-full bg-fog -translate-x-1/2 -translate-y-1/2" />
              {/* Waypoint label */}
              <div className="absolute top-1/2 left-[calc(100%+8px)] -translate-y-1/2 flex flex-col leading-none gap-0.5 bg-fog px-2 py-1.5 pt-2 rounded-md pointer-events-auto">
                <span className="text-[10px] font-mono text-granite tracking-wide whitespace-nowrap">
                  {m.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden mt-4">
        <Link href={`/${locale}/region`} className="btn-lg btn-amber w-full">
          {t("regionTeaserCta")}&nbsp; →
        </Link>
      </div>
    </section>
  );
}
