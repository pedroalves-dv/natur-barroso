"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import NaturBarrosoLogo from "@/components/ui/NaturBarrosoLogo";

const NAV_LINK_KEYS = [
  { href: "/tours", key: "tours" },
  { href: "/region", key: "region" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`;
    return pathname === localePath || pathname.startsWith(`${localePath}/`);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-fog border-b border-granite/30 text-granite">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="Natur Barroso — início">
            <NaturBarrosoLogo variant="dark" className="h-8 md:h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center md:gap-8 lg:gap-12">
            {NAV_LINK_KEYS.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href}`}
                  className={`text-md font-medium transition-colors ${
                    isActive(href)
                      ? "text-amber"
                      : "text-granite hover:text-forest"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* PT/EN toggle */}
            <div className="hidden md:flex items-stretch rounded-full border border-granite/25 p-1 text-xs font-medium text-granite">
              {(["pt", "en"] as const).map((loc) => {
                const isCurrentLocale = locale === loc;
                const switchPath =
                  `/${loc}${pathname.substring(`/${locale}`.length)}` ||
                  `/${loc}`;
                return isCurrentLocale ? (
                  <span
                    key={loc}
                    className="flex items-center px-3 py-2 rounded-full font-semibold bg-granite text-fog"
                    aria-current="true"
                  >
                    {loc.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    key={loc}
                    href={switchPath}
                    className="flex items-center px-3 rounded-full text-granite/60 hover:text-granite transition-colors"
                    aria-label={`Switch to ${loc.toUpperCase()}`}
                  >
                    {loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <Link
              href={`/${locale}/tours`}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full text-md font-medium bg-amber text-white hover:text-granite hover:bg-amber/80 transition-colors min-w-[9rem]"
            >
              {t("bookTour")}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 -mr-1"
              aria-label={t("menu")}
              aria-expanded={isMobileOpen}
            >
              <span className="block w-5 h-0.5 mb-1.5 bg-granite" />
              <span className="block w-5 h-0.5 mb-1.5 bg-granite" />
              <span className="block w-5 h-0.5 bg-granite" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-granite flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 shrink-0">
            <Link href={`/${locale}`} onClick={() => setIsMobileOpen(false)}>
              <NaturBarrosoLogo variant="light" className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 text-fog"
              aria-label={t("close")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col flex-1 px-6 pt-8 gap-1 overflow-y-auto">
            {NAV_LINK_KEYS.map(({ href, key }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={`text-2xl font-serif py-3 border-b border-fog/10 transition-colors ${
                  isActive(href) ? "text-amber" : "text-fog hover:text-amber"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-8 flex items-center gap-4 shrink-0">
            <Link
              href={`/${locale}/tours`}
              className="flex-1 text-center px-6 py-3 rounded-full bg-amber text-white font-medium hover:bg-amber/90 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              {t("bookTour")}
            </Link>
            <div className="flex items-center rounded-full border border-fog/20 px-1 py-0.5">
              {(["pt", "en"] as const).map((loc) => {
                const isCurrentLocale = locale === loc;
                const switchPath =
                  `/${loc}${pathname.substring(`/${locale}`.length)}` ||
                  `/${loc}`;
                return isCurrentLocale ? (
                  <span
                    key={loc}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-fog/20 text-fog"
                    aria-current="true"
                  >
                    {loc.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    key={loc}
                    href={switchPath}
                    className="px-3 py-1 rounded-full text-xs text-fog/50 hover:text-fog transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
