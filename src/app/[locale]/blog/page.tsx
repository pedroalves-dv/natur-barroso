import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
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
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end">
        <Image
          src="/images/national-park.jpg"
          alt={t("title")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/20 to-transparent" />
        <div className="hero-content">
          <p className="eyebrow text-fog/50">{t("eyebrow")}</p>
          <h1 className="page-hero-title">{t("title")}</h1>
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

      {/* Filter + grid */}
      <section className="py-20 bg-fog">
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
