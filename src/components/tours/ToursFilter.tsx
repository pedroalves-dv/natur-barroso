"use client";

import { useState, useMemo } from "react";
import type { Tour, CategorySlug, Difficulty } from "@/types/tour";
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from "@/types/tour";
import TourCard from "@/components/ui/TourCard";

interface Props {
  tours: Tour[];
  locale: string;
  labels: {
    filterTitle: string;
    filterCategory: string;
    filterDifficulty: string;
    filterDuration: string;
    filterSeason: string;
    clearFilters: string;
    noResults: string;
    noResultsHint: string;
    allCategories: string;
    allDifficulties: string;
    allDurations: string;
    halfDay: string;
    fullDay: string;
    multiDay: string;
    filtersBtn: string;
    closeFilters: string;
    toursLabel: string;
    viewBtn: string;
  };
}

type DurationFilter = "half-day" | "full-day" | "multi-day" | "";

export default function ToursFilter({ tours, locale, labels }: Props) {
  const [category, setCategory] = useState<CategorySlug | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [duration, setDuration] = useState<DurationFilter>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isPt = locale === "pt";

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      if (category && t.category !== category) return false;
      if (difficulty && t.difficulty !== difficulty) return false;
      if (duration) {
        const d = t.duration.toLowerCase();
        if (duration === "half-day" && !d.includes("meio")) return false;
        if (
          duration === "full-day" &&
          !(
            d.includes("dia completo") ||
            (d.includes("dia") && !d.includes("dias") && !d.includes("meio"))
          )
        )
          return false;
        if (duration === "multi-day" && !d.includes("dias")) return false;
      }
      return true;
    });
  }, [tours, category, difficulty, duration]);

  const hasActiveFilters =
    category !== "" || difficulty !== "" || duration !== "";

  function clearAll() {
    setCategory("");
    setDifficulty("");
    setDuration("");
  }

  const usedCategories = [...new Set(tours.map((t) => t.category))];

  const FilterPanel = (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm uppercase tracking-widest text-granite/50">
          {labels.filterTitle}
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-amber hover:text-forest transition-colors font-medium"
          >
            {labels.clearFilters}
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-xs uppercase tracking-wider text-granite/40 mb-2">
          {labels.filterCategory}
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setCategory("")}
            className={`text-left text-sm py-1.5 px-2 rounded transition-colors ${category === "" ? "bg-forest/10 text-forest font-medium" : "text-granite/70 hover:text-granite"}`}
          >
            {labels.allCategories}
          </button>
          {usedCategories.map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-left text-sm py-1.5 px-2 rounded transition-colors ${category === cat ? "font-medium" : "text-granite/70 hover:text-granite"}`}
                style={
                  category === cat
                    ? { backgroundColor: cfg.color + "15", color: cfg.color }
                    : {}
                }
              >
                {isPt ? cfg.labelPt : cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <p className="text-xs uppercase tracking-wider text-granite/40 mb-2">
          {labels.filterDifficulty}
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setDifficulty("")}
            className={`text-left text-sm py-1.5 px-2 rounded transition-colors ${difficulty === "" ? "bg-forest/10 text-forest font-medium" : "text-granite/70 hover:text-granite"}`}
          >
            {labels.allDifficulties}
          </button>
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
            const cfg = DIFFICULTY_CONFIG[d];
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`text-left text-sm py-1.5 px-2 rounded transition-colors ${difficulty === d ? "font-medium" : "text-granite/70 hover:text-granite"}`}
                style={
                  difficulty === d
                    ? { backgroundColor: cfg.color + "15", color: cfg.color }
                    : {}
                }
              >
                {isPt ? cfg.labelPt : cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-xs uppercase tracking-wider text-granite/40 mb-2">
          {labels.filterDuration}
        </p>
        <div className="flex flex-col gap-1">
          {[
            { value: "" as DurationFilter, label: labels.allDurations },
            { value: "half-day" as DurationFilter, label: labels.halfDay },
            { value: "full-day" as DurationFilter, label: labels.fullDay },
            { value: "multi-day" as DurationFilter, label: labels.multiDay },
          ].map((opt) => (
            <button
              key={opt.value || "all"}
              onClick={() => setDuration(opt.value)}
              className={`text-left text-sm py-1.5 px-2 rounded transition-colors ${duration === opt.value ? "bg-forest/10 text-forest font-medium" : "text-granite/70 hover:text-granite"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[90rem] mx-auto px-4 md:px-6 py-10">
      {/* Mobile: filter button */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <p className="text-sm text-granite/60">
          {filtered.length} {labels.toursLabel}
        </p>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-granite border border-granite/20 rounded-full px-4 py-2 hover:border-granite/40 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          {labels.filtersBtn}
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-amber" />
          )}
        </button>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-52 shrink-0 sticky top-24 self-start">
          {FilterPanel}
        </aside>

        {/* Tour grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-granite/50 mb-1">{labels.noResults}</p>
              <p className="text-sm text-granite/40">{labels.noResultsHint}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2">
              {filtered.map((tour) => (
                <TourCard key={tour.slug} tour={tour} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-granite/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-72 bg-fog h-full overflow-y-auto p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className=" text-granite">{labels.filterTitle}</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-granite/60 hover:text-granite"
                aria-label={labels.closeFilters}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full py-3 bg-forest text-white rounded-full text-sm font-medium hover:bg-moss transition-colors"
            >
              {labels.viewBtn} {filtered.length} {labels.toursLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
