"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

interface Props {
  posts: Post[];
  locale: string;
  readLabel: string;
}

export default function JournalTeaserTrack({
  posts,
  locale,
  readLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Array.from(track.children).indexOf(
              entry.target as HTMLElement,
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || track.scrollWidth <= track.clientWidth) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    scrollStart.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      scrollStart.current - (e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    const scrolled = Math.abs((trackRef.current?.scrollLeft ?? 0) - scrollStart.current);
    hasMoved.current = scrolled > 5;
    isDragging.current = false;
    setDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.stopPropagation();
      hasMoved.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") scrollTo(Math.max(0, activeIndex - 1));
    if (e.key === "ArrowRight")
      scrollTo(Math.min(posts.length - 1, activeIndex + 1));
  };

  return (
    <>
      <div
        ref={trackRef}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}
        className={`flex gap-8 overflow-x-auto snap-x snap-mandatory select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:cursor-default ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group relative flex flex-col bg-white overflow-hidden hover:shadow-[0_5px_10px_rgba(42,42,40,0.03)] hover:-translate-y-1 transition-all duration-300 ease-out snap-start shrink-0 w-full md:w-auto"
          >
            <div className="relative h-68 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover "
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-granite">
                  {post.category}
                </span>
                <span className="text-xs text-granite/40">{post.date}</span>
                <span className="text-xs text-granite/40">{post.readTime}</span>
              </div>
              <h3 className="text-granite font-serif text-2xl leading-snug mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-granite/60 leading-relaxed line-clamp-3 flex-1 mb-4">
                {post.excerpt}
              </p>
              <div className="mt-auto flex justify-end pt-4 px-4 -mx-5">
                <span className="btn-sm btn-granite-ghost group-hover:bg-fog">
                  {readLabel}
                  <span className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
        {posts.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to post ${i + 1}`}
            className={[
              "h-2 rounded-full transition-all duration-300 ease-out",
              i === activeIndex
                ? "w-6 bg-forest"
                : "w-2 bg-granite/25 hover:bg-granite/40",
            ].join(" ")}
          />
        ))}
      </div>
    </>
  );
}
