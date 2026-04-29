import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/post';
import { POST_CATEGORY_CONFIG } from '@/types/post';

interface Props {
  post: Post;
  locale: string;
  readPostLabel: string;
}

export default function BlogCard({ post, locale, readPostLabel }: Props) {
  const categoryLabel =
    locale === 'pt'
      ? POST_CATEGORY_CONFIG[post.category].labelPt
      : POST_CATEGORY_CONFIG[post.category].label;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-granite/10">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-amber">{categoryLabel}</span>
          <span className="text-xs text-granite/40">{post.date}</span>
          <span className="text-xs text-granite/40">{post.readTime}</span>
        </div>
        <h3 className="font-serif text-granite text-base leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-granite/60 leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>
        <span className="text-sm font-medium text-amber group-hover:text-forest transition-colors mt-auto">
          {readPostLabel} →
        </span>
      </div>
    </article>
  );
}
