import type { Tour } from "@/types/tour";
import FareHarborWidget from "@/components/ui/FareHarborWidget";

interface Props {
  tour: Tour;
  locale: string;
  whatToBringTitle: string;
}

export default function BookingSidebar({
  tour,
  locale,
  whatToBringTitle,
}: Props) {
  const isPt = locale === "pt";

  return (
    <div className="flex flex-col gap-6">
      <FareHarborWidget tour={tour} locale={locale} />

      {/* What to bring */}
      <div className="bg-white rounded-xl border border-fog p-6">
        <h3 className="text-sm font-semibold text-granite mb-4">
          {whatToBringTitle}
        </h3>
        <ul className="flex flex-col gap-2">
          {tour.whatToBring.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-granite/70"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffb547"
                strokeWidth="2"
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Guide snapshot */}
      <div className="bg-white rounded-xl border border-fog p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-granite/40 mb-3">
          {isPt ? "O seu guia" : "Your guide"}
        </p>
        <div className="flex items-center gap-3 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tour.guide.photo}
            alt={tour.guide.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-granite">
              {tour.guide.name}
            </p>
            <p className="text-xs text-granite/50">
              {tour.guide.languages.join(" · ")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tour.guide.specialties.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 bg-fog rounded-full text-granite/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
