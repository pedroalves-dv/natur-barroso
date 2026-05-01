"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { featuredReviews } from "@/data/reviews";
import type { Review } from "@/types/review";

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#C8882A"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TestimonialCard({ review }: { review: Review }) {
  return (
    <article
      aria-roledescription="slide"
      className="bg-fog border border-granite/10 rounded-lg px-6 pt-6 pb-4 flex flex-col gap-4 snap-start shrink-0 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
    >
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, j) => (
          <StarIcon key={j} />
        ))}
      </div>
      <p className="text-granite/70 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div>
        <p className="text-granite text-sm font-semibold">{review.author}</p>
        <p className="text-granite/50 text-xs">
          {review.country} · {review.tour}
        </p>
      </div>
    </article>
  );
}

export default function Testimonials({
  title,
  locale,
}: {
  title: string;
  locale: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
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
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      scrollStart.current - (e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") scrollTo(Math.max(0, activeIndex - 1));
    if (e.key === "ArrowRight")
      scrollTo(Math.min(featuredReviews.length - 1, activeIndex + 1));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={title}
      className="py-20 bg-moss/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-4 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-amber md:mb-2">
              TripAdvisor · Google Reviews
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-granite tracking-[-0.01em]">
              {title}
            </h2>
          </div>
          <div className="hidden md:inline-flex">
            <Link href={`/${locale}/tours`} className="btn-lg btn-amber">
              {locale === "pt" ? "Reservar um tour" : "Book a tour"}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          ref={trackRef}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:cursor-default ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {featuredReviews.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
        {featuredReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to review ${i + 1}`}
            className={[
              "h-2 rounded-full transition-all duration-300 ease-out",
              i === activeIndex
                ? "w-6 bg-forest"
                : "w-2 bg-granite/25 hover:bg-granite/40",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
