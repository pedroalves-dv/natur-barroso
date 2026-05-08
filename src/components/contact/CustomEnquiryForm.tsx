"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ContactPage");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const activityOptions = t.raw("activityOptions") as string[];
  const budgetOptions = t.raw("budgetOptions") as string[];

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
        <div className="w-12 h-12 rounded-sm bg-amber/10 flex items-center justify-center">
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
    <div className="bg-granite text-fog rounded-sm p-6 md:p-8">
      <h2 className="font-serif text-3xl text-fog mb-1">{labels.title}</h2>
      <p className="text-fog/60 text-sm mb-6">{labels.subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs  uppercase tracking-wider text-fog/50">
              {labels.nameLabel} *
            </label>
            <input
              name="name"
              required
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs  uppercase tracking-wider text-fog/50">
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
          <label className="text-xs  uppercase tracking-wider text-fog/50">
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
            <label className="text-xs  uppercase tracking-wider text-fog/50">
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
            <label className="text-xs  uppercase tracking-wider text-fog/50">
              {labels.datesLabel}
            </label>
            <input
              name="dates"
              placeholder={t("datesPlaceholder")}
              className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs  uppercase tracking-wider text-fog/50">
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
          <label className="text-xs  uppercase tracking-wider text-fog/50">
            {labels.requirementsLabel}
          </label>
          <textarea
            name="requirements"
            rows={4}
            placeholder={t("requirementsPlaceholder")}
            className="px-4 py-2.5 rounded-lg border border-fog/20 text-sm bg-fog/5 text-fog placeholder-fog/30 focus:outline-none focus:border-amber transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">{labels.errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-lg bg-fog border border-fog/40 text-granite hover:bg-fog/10 hover:text-fog cursor-pointer transition-colors disabled:opacity-60 self-start"
        >
          {status === "loading" ? labels.submitting : labels.submitBtn}
        </button>
      </form>
    </div>
  );
}
