'use client';

import { useState } from 'react';
import type { FAQItem, FAQCategory } from '@/types/faq';
import { FAQ_CATEGORY_LABELS } from '@/types/faq';

interface Props {
  items: FAQItem[];
  locale: string;
}

export default function FAQAccordion({ items, locale }: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const categories = [...new Set(items.map((i) => i.category))] as FAQCategory[];

  return (
    <div className="flex flex-col gap-10">
      {categories.map((cat) => {
        const catLabel = locale === 'pt' ? FAQ_CATEGORY_LABELS[cat].pt : FAQ_CATEGORY_LABELS[cat].en;
        const catItems = items
          .filter((i) => i.category === cat)
          .sort((a, b) => a.order - b.order);

        return (
          <div key={cat}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
              {catLabel}
            </h2>
            <div className="border border-granite/10 rounded-xl overflow-hidden divide-y divide-granite/10">
              {catItems.map((item) => {
                const id = `${cat}-${item.order}`;
                const isOpen = openIds.has(id);
                return (
                  <div key={id}>
                    <button
                      onClick={() => toggle(id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-forest/3 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-granite text-sm pr-4">{item.question}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`shrink-0 text-granite/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-granite/70 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
