import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "../../../../../sanity/lib/client";
import {
  BLOG_POST_DETAIL_QUERY,
  RELATED_POSTS_QUERY,
  BLOG_SLUGS_QUERY,
  type SanityBlogPost,
  type SanityBlogPostSummary,
} from "../../../../../sanity/lib/queries";
import type { Post } from "@/types/post";
import { POST_CATEGORY_CONFIG } from "@/types/post";
import BlogCard from "@/components/blog/BlogCard";

type Props = { params: Promise<{ locale: string; slug: string }> };

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-granite/80 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-granite text-2xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-granite text-xl mt-8 mb-3">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-granite">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-amber hover:text-forest underline transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: BLOG_SLUGS_QUERY,
    tags: ["blogPost"],
  });
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityBlogPost | null>({
    query: BLOG_POST_DETAIL_QUERY,
    params: { slug },
    tags: ["blogPost"],
  });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await sanityFetch<SanityBlogPost | null>({
    query: BLOG_POST_DETAIL_QUERY,
    params: { slug },
    tags: ["blogPost"],
  });
  if (!post) notFound();

  const relatedRaw = await sanityFetch<SanityBlogPostSummary[]>({
    query: RELATED_POSTS_QUERY,
    params: { slug, category: post.category },
    tags: ["blogPost"],
  });

  const related: Post[] = relatedRaw.map((p: SanityBlogPostSummary) => ({
    ...p,
    category: p.category as Post["category"],
    body: [],
    authorSlug: "",
  }));

  const isPt = locale === "pt";

  const categoryConfig = POST_CATEGORY_CONFIG[post.category as Post["category"]];
  const categoryLabel = categoryConfig
    ? isPt
      ? categoryConfig.labelPt
      : categoryConfig.label
    : post.category;

  const tBlog = await getTranslations("BlogPage");
  const backLabel = tBlog("back");
  const authorLabel = tBlog("by");
  const relatedLabel = tBlog("relatedTitle");
  const readPostLabel = tBlog("readPost");

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center md:items-end bg-granite">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-granite/80 via-granite/30 to-transparent" />
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-6 pb-16 w-full">
          <Link
            href={`/${locale}/blog`}
            className="btn-lg btn-ghost inline-flex items-center gap-2 text-md text-fog/70 hover:text-fog transition-colors mb-6"
          >
            {backLabel}
          </Link>
          <p className="eyebrow text-amber/80 mb-3">{categoryLabel}</p>
          <h1 className="page-hero-title max-w-2xl mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fog/60">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
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

      {/* Body */}
      <section className="py-20 bg-fog">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <p className="text-granite/60 text-lg leading-relaxed mb-10 font-serif italic">
            {post.excerpt}
          </p>
          <div className="flex flex-col gap-6">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Author card */}
          {post.authorName && (
            <div className="mt-14 pt-8 border-t border-granite/10 flex gap-4 items-start">
              {post.authorPhoto && (
                <Image
                  src={post.authorPhoto}
                  alt={post.authorName}
                  width={56}
                  height={56}
                  className="rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="text-xs text-granite/40 mb-0.5">{authorLabel}</p>
                <p className=" text-granite">{post.authorName}</p>
                {post.authorRole && (
                  <p className="text-sm text-granite/60">{post.authorRole}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-fog border-t border-granite/10">
          <div className="container-wide">
            <div className="section-header">
              <div>
                <h2 className="section-title">{relatedLabel}</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((p) => (
                <BlogCard
                  key={p.slug}
                  post={p}
                  locale={locale}
                  readPostLabel={readPostLabel}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
