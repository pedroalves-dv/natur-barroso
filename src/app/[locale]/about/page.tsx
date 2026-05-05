import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { guides } from "@/data/guides";
import GuideCard from "@/components/about/GuideCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "A Nossa Equipa" : "About Us",
    description:
      locale === "pt"
        ? "Conheça os guias locais da Natur Barroso — a equipa que vive e respira o Barroso desde sempre."
        : "Meet the local guides of Natur Barroso — the team that lives and breathes Barroso.",
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const isPt = locale === "pt";

  const storyParagraphs = isPt
    ? [
        "A Natur Barroso nasceu de uma convicção simples: o Barroso é um dos territórios mais extraordinários da Europa, e merecia quem o apresentasse ao mundo com honestidade e paixão. Não como um produto turístico genérico, mas como o que realmente é — um planalto de granito e silêncio, onde a natureza e a cultura humana coexistem há milénios.",
        "Os nossos guias não são apenas profissionais formados — são pessoas que cresceram neste território, que conhecem os seus segredos e que acreditam genuinamente que uma manhã no Barroso pode mudar a forma como alguém olha para o mundo.",
        "Operamos em pequenos grupos porque acreditamos que a qualidade da experiência depende da atenção individual. Trabalhamos com produtores locais, alojamentos familiares e restaurantes de aldeia porque acreditamos que o turismo deve beneficiar as comunidades que o tornam possível.",
      ]
    : [
        "Natur Barroso was born from a simple conviction: Barroso is one of the most extraordinary territories in Europe, and it deserved someone to present it to the world with honesty and passion. Not as a generic tourism product, but as what it truly is — a granite plateau of silence, where nature and human culture have coexisted for millennia.",
        "Our guides are not just trained professionals — they are people who grew up in this territory, who know its secrets and genuinely believe that a morning in Barroso can change the way someone sees the world.",
        "We operate in small groups because we believe the quality of experience depends on individual attention. We work with local producers, family-run accommodation and village restaurants because we believe tourism should benefit the communities that make it possible.",
      ];

  const values = isPt
    ? [
        {
          title: "Local de raiz",
          body: "Somos da região e conhecemos cada trilho, aldeia e história. Nenhum detalhe é genérico.",
        },
        {
          title: "Grupos pequenos",
          body: "Máximo 8–12 pessoas por tour. Atenção individual, ritmo do grupo, experiência personalizada.",
        },
        {
          title: "Impacto responsável",
          body: "Colaboramos com produtores, alojamentos e restaurantes locais. O turismo que praticamos fica na região.",
        },
      ]
    : [
        {
          title: "Locally rooted",
          body: "We are from the region and know every trail, village and story. Nothing is generic.",
        },
        {
          title: "Small groups",
          body: "Maximum 8–12 people per tour. Individual attention, group pace, personalised experience.",
        },
        {
          title: "Responsible impact",
          body: "We collaborate with local producers, accommodation and restaurants. The tourism we practice stays in the region.",
        },
      ];

  return (
    <>
      {/* Hero — full-bleed image, same pattern as TourHero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85"
          alt={
            isPt
              ? "Guias Natur Barroso no trilho"
              : "Natur Barroso guides on trail"
          }
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />

        <div className="hero-content">
          <p className="eyebrow text-amber">{t("eyebrow")}</p>
          <h1 className="page-hero-title mb-6">{t("title")}</h1>
          <p className="hero-body">{t("subtitle")}</p>
        </div>

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

      {/* Story */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="section-header">
              <div>
                <p className="eyebrow text-granite/40">{t("storyEyebrow")}</p>
                <h2 className="section-title">{t("storyTitle")}</h2>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="text-granite/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/40">{t("guidesEyebrow")}</p>
              <h2 className="section-title">{t("guidesTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-fog">
        <div className="container-wide">
          <div className="section-header">
            <div>
              <p className="eyebrow text-granite/40">{t("valuesEyebrow")}</p>
              <h2 className="section-title">{t("valuesTitle")}</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-3">
                <h3 className="font-serif text-xl text-granite">{v.title}</h3>
                <p className="text-granite/70 leading-relaxed text-sm">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-fog border-t border-granite/8">
        <div className="container-wide">
          <p className="eyebrow text-granite/40 text-center mb-6">
            {t("certTitle")}
          </p>
          <div className="flex flex-wrap justify-between gap-4 text-sm text-granite/60">
            <span>✓ IPDJ — Guias de Montanha Certificados</span>
            <span>✓ Seguro de Atividade na Natureza</span>
            <span>✓ Primeiros Socorros em Ambiente Remoto</span>
            <span>✓ 4,8★ {t("ratingLabel")}</span>
          </div>
        </div>
      </section>
    </>
  );
}
