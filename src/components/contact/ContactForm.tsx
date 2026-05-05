"use client";

import { useState } from "react";

const SUBJECT_OPTIONS_PT = [
  "Informação geral",
  "Reserva de tour",
  "Grupos e empresas",
  "Escolas",
  "Imprensa",
  "Outro",
];

const SUBJECT_OPTIONS_EN = [
  "General information",
  "Tour booking",
  "Groups & corporate",
  "Schools",
  "Press",
  "Other",
];

interface Props {
  locale: string;
  labels: {
    title: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorMsg: string;
  };
}

export default function ContactForm({ locale, labels }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const subjectOptions =
    locale === "pt" ? SUBJECT_OPTIONS_PT : SUBJECT_OPTIONS_EN;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "general",
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
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
        <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-forest"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-serif text-3xl text-granite">
          {labels.successTitle}
        </p>
        <p className="text-granite/60 text-sm max-w-xs">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-granite mb-1">{labels.title}</h2>
      <p className="text-sm text-granite/60 mb-6">{labels.subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-granite/50">
              {labels.nameLabel} *
            </label>
            <input
              name="name"
              required
              className="px-4 py-2.5 rounded-lg border border-granite/20 text-sm bg-white focus:outline-none focus:border-forest transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider text-granite/50">
              {labels.emailLabel} *
            </label>
            <input
              name="email"
              type="email"
              required
              className="px-4 py-2.5 rounded-lg border border-granite/20 text-sm bg-white focus:outline-none focus:border-forest transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs  uppercase tracking-wider text-granite/50">
            {labels.subjectLabel}
          </label>
          <select
            name="subject"
            className="px-4 py-2.5 rounded-lg border border-granite/20 text-sm bg-white focus:outline-none focus:border-forest transition-colors"
          >
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs  uppercase tracking-wider text-granite/50">
            {labels.messageLabel} *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className="px-4 py-2.5 rounded-lg border border-granite/20 text-sm bg-white focus:outline-none focus:border-forest transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{labels.errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-lg bg-granite border border-granite text-white hover:bg-granite/20 hover:text-granite cursor-pointer transition-colors disabled:opacity-60 self-start"
        >
          {status === "loading" ? labels.submitting : labels.submitBtn}
        </button>
      </form>
    </div>
  );
}
