"use client";

import { useState } from "react";

const ACTIVITY_OPTIONS_PT = [
  "Trilhos de caminhada",
  "Tour 4×4 off-road",
  "Escalada",
  "Kayak / canoagem",
  "Cultural e gastronomia",
  "Fotografia de natureza",
  "Expedição multi-dia",
  "Escola / educação ambiental",
  "Outro / combinar",
];

const ACTIVITY_OPTIONS_EN = [
  "Guided hiking",
  "4×4 off-road tour",
  "Rock climbing",
  "Kayak / canoeing",
  "Cultural & gastronomy",
  "Nature photography",
  "Multi-day expedition",
  "School / environmental education",
  "Other / to discuss",
];

const BUDGET_OPTIONS_PT = [
  "Menos de €200 total",
  "€200–€500 total",
  "€500–€1.000 total",
  "Mais de €1.000 total",
  "Por determinar",
];

const BUDGET_OPTIONS_EN = [
  "Under €200 total",
  "€200–€500 total",
  "€500–€1,000 total",
  "Over €1,000 total",
  "To be determined",
];

interface Props {
  locale: string;
  labels: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    activityLabel: string;
    groupSizeLabel: string;
    datesLabel: string;
    budgetLabel: string;
    requirementsLabel: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorMsg: string;
  };
}

export default function CustomEnquiryForm({ locale, labels }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const isPt = locale === "pt";
  const activityOptions = isPt ? ACTIVITY_OPTIONS_PT : ACTIVITY_OPTIONS_EN;
  const budgetOptions = isPt ? BUDGET_OPTIONS_PT : BUDGET_OPTIONS_EN;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "custom-enquiry",
      name: fd.get("name"),
      email: fd.get("email"),
      activity: fd.get("activity"),
      groupSize: fd.get("groupSize"),
      dates: fd.get("dates"),
      budget: fd.get("budget"),
      requirements: fd.get("requirements"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffb547"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-serif text-xl text-granite">{labels.successTitle}</p>
        <p className="text-granite/60 text-sm max-w-xs">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <div className="bg-granite text-fog rounded-2xl p-6 md:p-8">
      <h2 className="font-serif text-xl mb-1">{labels.title}</h2>
      <p className="text-fog/60 text-sm mb-6">{labels.subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
              {labels.nameLabel} *
            </label>
            <input
              name="name"
              required
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
              {labels.emailLabel} *
            </label>
            <input
              name="email"
              type="email"
              required
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
            {labels.activityLabel}
          </label>
          <select
            name="activity"
            className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-granite text-fog focus:outline-none focus:border-amber transition-colors"
          >
            {activityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
              {labels.groupSizeLabel}
            </label>
            <input
              name="groupSize"
              type="number"
              min={1}
              max={100}
              placeholder="Ex: 4"
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
              {labels.datesLabel}
            </label>
            <input
              name="dates"
              placeholder={isPt ? "Ex: Maio 2026" : "E.g. May 2026"}
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
            {labels.budgetLabel}
          </label>
          <select
            name="budget"
            className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-granite text-fog focus:outline-none focus:border-amber transition-colors"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-fog/50">
            {labels.requirementsLabel}
          </label>
          <textarea
            name="requirements"
            rows={4}
            placeholder={
              isPt
                ? "Alergias, mobilidade reduzida, crianças, pedidos especiais..."
                : "Allergies, reduced mobility, children, special requests..."
            }
            className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">{labels.errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-3 bg-amber text-white rounded-full text-sm font-medium hover:bg-amber/90 transition-colors disabled:opacity-60 self-start"
        >
          {status === "loading" ? labels.submitting : labels.submitBtn}
        </button>
      </form>
    </div>
  );
}
