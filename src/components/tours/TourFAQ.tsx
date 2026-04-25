'use client';

import { useState } from 'react';
import type { TourFAQItem } from '@/types/tour';

interface Props {
  faqs: TourFAQItem[];
  title: string;
}

export default function TourFAQ({ faqs, title }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-serif text-granite mb-6">{title}</h2>
      <dl className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-fog rounded-lg overflow-hidden">
            <dt>
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-fog/60 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium text-granite text-sm">{faq.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`shrink-0 transition-transform duration-200 text-granite/40 ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </dt>
            {open === i && (
              <dd className="px-5 pb-4 text-sm text-granite/70 leading-relaxed border-t border-fog">
                <div className="pt-3">{faq.answer}</div>
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
