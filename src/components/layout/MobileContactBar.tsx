"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { PHONE_NUMBER, PHONE_DISPLAY, EMAIL, waHref as buildWaHref } from "@/config/contact";

const TEL_HREF = `tel:+${PHONE_NUMBER}`;
const MAIL_HREF = `mailto:${EMAIL}`;

export default function MobileContactBar() {
  const t = useTranslations("ContactPage");
  const tNav = useTranslations("Nav");
  const WA_HREF = buildWaHref(t("waMessage"));
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = lastScrollY.current - currentY; // positive = scrolled up
        if (delta > 5 && currentY > 200) {
          setVisible(true);
        } else if (delta < 0) {
          setVisible(false);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    // When the Chrome address bar shows/hides, the visual viewport resizes and
    // the browser emits a compensating scroll event. Resetting lastScrollY here
    // (before that scroll event fires) prevents it from reading as an upward scroll.
    const handleViewportResize = () => {
      lastScrollY.current = window.scrollY;
    };

    // Defer listener attachment by one frame so lastScrollY is synced to the
    // real scroll position after browser scroll-restoration completes.
    const initFrame = requestAnimationFrame(() => {
      lastScrollY.current = window.scrollY;
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.visualViewport?.addEventListener("resize", handleViewportResize);
    });

    return () => {
      cancelAnimationFrame(initFrame);
      window.removeEventListener("scroll", handleScroll);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-granite/10 bg-fog shadow-[0_-4px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {/* Phone + email */}
        <div>
          <a
            href={TEL_HREF}
            className="block text-sm font-medium text-granite leading-snug"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={MAIL_HREF}
            className="block text-xs text-granite/50 mt-0.5 leading-snug"
          >
            {EMAIL}
          </a>
        </div>

        {/* WhatsApp round button */}
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tNav("whatsapp")}
          className="w-11 h-11 rounded-full bg-whatsapp flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.118 1.524 5.847L.057 23.786c-.078.31.196.584.506.506l5.939-1.467A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.878 0-3.636-.51-5.145-1.4l-.369-.217-3.527.871.885-3.427-.241-.386A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
