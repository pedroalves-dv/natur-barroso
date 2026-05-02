"use client";

import { useState } from "react";
import type { ItineraryStep } from "@/types/tour";

interface Props {
  steps: ItineraryStep[];
  title: string;
}

export default function TourItinerary({ steps, title }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="text-2xl font-serif text-granite mb-6">{title}</h2>
      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <li key={i} className="border border-fog rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-fog/60 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-forest/10 text-forest text-xs  flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-medium text-granite text-sm">
                  {step.title}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 transition-transform duration-200 text-granite/40 ${open === i ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-granite/70 leading-relaxed border-t border-fog">
                <div className="pt-3">{step.description}</div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
