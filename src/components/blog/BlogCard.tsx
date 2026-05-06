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
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group relative flex flex-col bg-white overflow-hidden hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)] hover:-translate-y-1 transition-all duration-300 ease-out"
    >
      <div className="relative h-68 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-granite">{categoryLabel}</span>
          <span className="text-xs text-granite/40">{post.date}</span>
          <span className="text-xs text-granite/40">{post.readTime}</span>
        </div>
        <h3 className="font-serif text-granite text-2xl leading-snug mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-granite/60 leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>
        <div className="mt-auto flex justify-end pt-4 px-4 -mx-5">
          <span className="btn-sm btn-granite-ghost group-hover:bg-fog">
            {readPostLabel}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
