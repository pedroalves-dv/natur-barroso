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
  // { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

function NavWhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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

  const hasActiveLink = NAV_LINK_KEYS.some(({ href }) => isActive(href));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-fog border-b border-granite/30 text-granite">
        <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} aria-label="Natur Barroso — início">
            <NaturBarrosoLogo variant="dark" className="h-5 md:h-7 w-auto" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center md:gap-8 lg:gap-12 group">
            {NAV_LINK_KEYS.map(({ href, key }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={`/${locale}${href}`}
                    className={`text-md font-medium [transition:color_200ms] group-hover:[transition:color_1000ms] group-hover:text-granite/30 hover:!text-granite ${
                      !active && hasActiveLink
                        ? "text-granite/30"
                        : "[transition:color_1000ms] text-granite"
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
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
                    className="flex items-center px-3 py-2 rounded-full  bg-granite text-fog"
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

            <a
              href="https://wa.me/351960000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsapp")}
              className="hidden bg-whatsapp text-fog border border-whatsapp md:inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-whatsapp/50 hover:text-granite transition-colors"
            >
              <NavWhatsAppIcon />
            </a>

            <Link
              href={`/${locale}/tours`}
              className="hidden md:inline-flex btn-lg-nav btn-granite"
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
              <NaturBarrosoLogo variant="light" className="h-5 w-auto" />
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
                className={`text-3xl font-serif py-3 border-b border-fog/10 transition-colors ${
                  isActive(href) ? "text-amber" : "text-fog hover:text-amber"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Button group  */}
          <div className="px-6 py-8 flex items-center justify-between  gap-4 shrink-0">
            {/* Locale switcher  */}
            <div className="flex items-center rounded-full border border-fog/20 px-1 py-0.5">
              {(["pt", "en"] as const).map((loc) => {
                const isCurrentLocale = locale === loc;
                const switchPath =
                  `/${loc}${pathname.substring(`/${locale}`.length)}` ||
                  `/${loc}`;
                return isCurrentLocale ? (
                  <span
                    key={loc}
                    className="px-3 py-2.5 rounded-full text-xs  bg-fog/20 text-fog"
                    aria-current="true"
                  >
                    {loc.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    key={loc}
                    href={switchPath}
                    className="px-3 py-3 rounded-full text-xs text-fog/50 hover:text-fog transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {loc.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            {/* WhatsApp button  */}
            <a
              href="https://wa.me/351960000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("whatsapp")}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full shrink-0 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#25D366" }}
              onClick={() => setIsMobileOpen(false)}
            >
              <NavWhatsAppIcon />
            </a>
            {/* Book button  */}
            <Link
              href={`/${locale}/tours`}
              className="btn-lg-nav btn-fog"
              onClick={() => setIsMobileOpen(false)}
            >
              {t("bookTour")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
