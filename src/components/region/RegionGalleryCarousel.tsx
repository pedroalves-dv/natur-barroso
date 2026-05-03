"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  name: string;
}

export default function RegionGalleryCarousel({ images, name }: Props) {
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

  return (
    <div>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`flex overflow-x-auto snap-x snap-mandatory select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-full relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={img}
              alt={`${name} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={[
              "h-2 rounded-full transition-all duration-300 ease-out",
              i === activeIndex
                ? "w-6 bg-granite"
                : "w-2 bg-granite/25 hover:bg-granite/40",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
