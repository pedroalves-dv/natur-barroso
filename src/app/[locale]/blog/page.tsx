import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Post } from "@/types/post";
import { sanityFetch } from "../../../../sanity/lib/client";
import {
  BLOG_POSTS_QUERY,
  type SanityBlogPostSummary,
} from "../../../../sanity/lib/queries";
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

  const raw = await sanityFetch<SanityBlogPostSummary[]>({
    query: BLOG_POSTS_QUERY,
    tags: ["blogPost"],
  });

  // Map to Post shape — body and authorSlug are not used by BlogFilter/BlogCard
  const posts: Post[] = raw.map((p) => ({
    ...p,
    category: p.category as Post["category"],
    body: [],
    authorSlug: "",
  }));

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-fog">
        <div className="container-wide">
          <p className="eyebrow text-amber">
            {t("eyebrow")}
          </p>
          <h1 className="section-title">
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
