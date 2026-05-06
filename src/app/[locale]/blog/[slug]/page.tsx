import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
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

  const backLabel = isPt ? "← Todos os artigos" : "← All articles";
  const authorLabel = isPt ? "Por" : "By";
  const relatedLabel = isPt ? "Outros artigos" : "More from the journal";
  const readPostLabel = isPt ? "Ler artigo" : "Read post";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pb-12 pt-32">
          <Link
            href={`/${locale}/blog`}
            className="inline-block text-fog/70 text-sm mb-6 hover:text-fog transition-colors"
          >
            {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs  uppercase tracking-wider text-amber">
              {categoryLabel}
            </span>
            <span className="text-fog/50 text-xs">{post.date}</span>
            <span className="text-fog/50 text-xs">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-fog text-3xl md:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-fog">
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
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="mb-8 md:mb-12">
              <h2 className="section-title">
                {relatedLabel}
              </h2>
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
