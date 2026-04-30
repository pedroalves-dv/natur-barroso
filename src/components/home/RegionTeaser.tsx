import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface Props {
  locale: string;
}

const MARKERS = [
  { name: "Pitões das Júnias", x: 42, y: 48 },
  { name: "Tourém", x: 10, y: 80 },
  { name: "Montalegre", x: 60, y: 60 },
  { name: "Boticas", x: 74, y: 78 },
];

export default async function RegionTeaser({ locale }: Props) {
  const t = await getTranslations("HomePage");

  const facts = [
    { num: "1525m", label: t("regionFact1Label"), desc: t("regionFact1Desc") },
    { num: "2018", label: t("regionFact2Label"), desc: t("regionFact2Desc") },
    { num: "12+", label: t("regionFact3Label"), desc: t("regionFact3Desc") },
    { num: "200+", label: t("regionFact4Label"), desc: t("regionFact4Desc") },
  ];

  return (
    <section className="bg-moss/10 text-granite overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[640px]">
        {/* Text + facts */}
        <div className="flex flex-col justify-center px-6 py-16 lg:py-20 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16">
          <p className="text-md font-semibold uppercase tracking-wider text-amber mb-2">
            {t("regionTeaserEyebrow")}
          </p>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight tracking-[-0.01em] mb-4">
            {t("regionTeaserTitle")}
          </h2>
          <p className="text-granite/65 leading-relaxed max-w-md text-sm md:text-base">
            {t("regionTeaserSubtitle")}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-10 mb-16">
            {facts.map((f) => (
              <div className=" pr-8 pb-4 pt-4" key={f.num}>
                <div className="text-4xl font-stack text-amber leading-none mb-2">
                  {f.num}
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

          <Link
            href={`/${locale}/region`}
            className="inline-flex w-fit items-center gap-2 px-6 py-2.5 rounded-full border border-granite text-granite font-medium hover:border-amber/60 hover:text-amber transition-colors text-md"
          >
            {t("regionTeaserCta")}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Photo + map markers */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <Image
            src="/images/region-teaser.jpg"
            alt="Barroso highland landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55 pointer-events-none" />

          {MARKERS.map((m, i) => (
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
              <span className="absolute top-1/2 left-1/2 w-[6px] h-[6px] rounded-full bg-fog -translate-x-1/2 -translate-y-1/2" />
              {/* Waypoint label */}
              <div className="absolute top-1/2 left-[calc(100%+8px)] -translate-y-1/2 flex flex-col leading-none gap-0.5 bg-fog px-2 py-1.5 pt-2 rounded-lg pointer-events-auto">
                {/* <span className="text-[8px] font-mono text-granite/65 tracking-[0.18em] uppercase">
                  WP{String(i + 1).padStart(2, "0")}
                </span> */}
                <span className="text-[10px] font-mono text-granite/85 tracking-wide whitespace-nowrap">
                  {m.name}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute bottom-5 left-5 font-mono text-[10px] text-white/55 uppercase tracking-[0.12em]">
            41°49′N 7°47′W · Trás-os-Montes
          </div>
        </div>
      </div>
    </section>
  );
}
