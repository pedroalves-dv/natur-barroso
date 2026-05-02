"use client";

import { useState, useMemo } from "react";
import type { Post, PostCategory } from "@/types/post";
import { POST_CATEGORY_CONFIG } from "@/types/post";
import BlogCard from "./BlogCard";

interface Props {
  posts: Post[];
  locale: string;
  labels: {
    allCategories: string;
    readPost: string;
    noResults: string;
  };
}

export default function BlogFilter({ posts, locale, labels }: Props) {
  const [category, setCategory] = useState<PostCategory | "">("");
  const isPt = locale === "pt";

  const usedCategories = [...new Set(posts.map((p) => p.category))];

  const filtered = useMemo(() => {
    if (!category) return posts;
    return posts.filter((p) => p.category === category);
  }, [posts, category]);

  return (
    <div className="max-w-[90rem] mx-auto px-4 md:px-6 pb-20">
      {/* Category filter strip */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setCategory("")}
          className={`text-sm py-1.5 px-3 rounded transition-colors ${
            category === ""
              ? "bg-forest/10 text-forest font-medium"
              : "text-granite/70 hover:text-granite"
          }`}
        >
          {labels.allCategories}
        </button>
        {usedCategories.map((cat) => {
          const cfg = POST_CATEGORY_CONFIG[cat];
          const label = isPt ? cfg.labelPt : cfg.label;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-sm py-1.5 px-3 rounded transition-colors ${
                category === cat
                  ? "bg-forest/10 text-forest font-medium"
                  : "text-granite/70 hover:text-granite"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-granite/50 py-20">{labels.noResults}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readPostLabel={labels.readPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
