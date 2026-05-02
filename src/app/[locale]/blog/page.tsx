import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { posts } from "@/data/posts";
import BlogFilter from "@/components/blog/BlogFilter";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "Diário" : "Journal",
    description:
      locale === "pt"
        ? "Histórias, guias de trilhos, fauna e cultura das Terras de Barroso e do Parque Nacional Peneda-Gerês."
        : "Stories, trail guides, wildlife and culture from the Terras de Barroso and Peneda-Gerês National Park.",
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BlogPage");

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-fog">
        <div className="max-w-[90rem] mx-auto px-4 md:px-6">
          <p className="text-[10px] md:text-base uppercase tracking-wide md:tracking-wide text-amber mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif leading-[0.8] tracking-[-0.01em] text-granite">
            {t("title")}
          </h1>
          <p className="text-granite/60 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="py-12 bg-fog">
        <BlogFilter
          posts={posts}
          locale={locale}
          labels={{
            allCategories: t("allCategories"),
            readPost: t("readPost"),
            noResults: t("noResults"),
          }}
        />
      </section>
    </>
  );
}
