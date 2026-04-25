"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("CookieBanner");
  const locale = useLocale();

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-granite text-fog px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
      <p className="text-sm max-w-2xl">
        {t("message")}{" "}
        <Link
          href={`/${locale}/legal/cookies`}
          className="underline underline-offset-2 hover:text-amber"
        >
          {t("learnMore")}
        </Link>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={handleDecline}
          className="text-sm px-4 py-2 rounded border border-fog/30 hover:bg-fog/10 transition-colors cursor-pointer"
        >
          {t("decline")}
        </button>
        <button
          onClick={handleAccept}
          className="text-sm px-4 py-2 rounded bg-amber text-white hover:bg-amber/90 transition-colors cursor-pointer"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
