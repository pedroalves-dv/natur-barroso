"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { RegionPlace } from "@/types/region";
import RegionCard from "@/components/region/RegionCard";

interface Props {
  places: RegionPlace[];
  locale: string;
  exploreLabel: string;
}

export default function RegionCardsTrack({ places, locale, exploreLabel }: Props) {
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
            const idx = Array.from(track.children).indexOf(entry.target as HTMLElement);
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
    hasMoved.current = false;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    if (Math.abs(e.clientX - startX.current) > 5) hasMoved.current = true;
    trackRef.current.scrollLeft = scrollStart.current - (e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) e.stopPropagation();
  };

  return (
    <>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:cursor-default ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {places.map((place, i) => (
          <div key={place.slug} className={`snap-start shrink-0 w-full md:w-auto ${i === 0 ? "lg:col-span-2" : ""}`}>
            <RegionCard place={place} locale={locale} exploreLabel={exploreLabel} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 md:hidden mt-6">
        {places.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to place ${i + 1}`}
            className={[
              "h-2 rounded-full transition-all duration-300 ease-out",
              i === activeIndex
                ? "w-6 bg-granite"
                : "w-2 bg-granite/25 hover:bg-granite/40",
            ].join(" ")}
          />
        ))}
      </div>
    </>
  );
}
