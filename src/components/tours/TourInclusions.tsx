interface Props {
  included: string[];
  notIncluded: string[];
  includedTitle: string;
  notIncludedTitle: string;
}

function CheckIcon({ positive }: { positive: boolean }) {
  return positive ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      className="shrink-0 mt-0.5 text-forest"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      className="shrink-0 mt-0.5 text-error"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function TourInclusions({
  included,
  notIncluded,
  includedTitle,
  notIncludedTitle,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-serif font-medium text-granite mb-4">{includedTitle}</h3>
        <ul className="flex flex-col gap-3">
          {included.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-granite/80"
            >
              <CheckIcon positive={true} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-serif font-medium text-granite mb-4">{notIncludedTitle}</h3>
        <ul className="flex flex-col gap-3">
          {notIncluded.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-granite/80"
            >
              <CheckIcon positive={false} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
