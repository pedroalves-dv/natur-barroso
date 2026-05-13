import { getTranslations } from "next-intl/server";
import { PHONE_DISPLAY, waHref as buildWaHref, PHONE_NUMBER } from "@/config/contact";

export default async function WhatsAppCTA() {
  const t = await getTranslations("HomePage");
  const tContact = await getTranslations("ContactPage");

  const waHref = buildWaHref(tContact("waMessage"));
  const telHref = `tel:+${PHONE_NUMBER}`;

  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="mb-10 md:mb-16">
          <p className="eyebrow text-whatsapp">{t("whatsappCtaCEyebrow")}</p>
          <h2 className="section-title mb-8 md:mb-12">
            {t("whatsappCtaTitle")}
          </h2>
          <p className="text-granite/60 text-sm md:text-base leading-relaxed max-w-lg">
            {t("whatsappCtaBody")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* WhatsApp */}
          <div>
            <h3 className="text-3xl md:text-4xl font-serif text-granite leading-[0.8] tracking-[-0.01em] mb-3">
              {t("whatsappCtaWhatsappHeading")}
            </h3>
            <p className="text-granite/60 text-sm leading-relaxed mb-6 max-w-lg">
              {t("whatsappCtaWhatsappDesc")}
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lg bg-whatsapp border border-whatsapp text-white hover:bg-whatsapp/50 hover:text-granite w-full md:w-auto gap-3"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.118 1.524 5.847L.057 23.786c-.078.31.196.584.506.506l5.939-1.467A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.878 0-3.636-.51-5.145-1.4l-.369-.217-3.527.871.885-3.427-.241-.386A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span className="hidden md:inline">{t("whatsappCtaButton")}</span>
            </a>
          </div>

          {/* Phone */}
          <div className="pt-10 border-t border-granite/10 md:pt-0 md:border-0">
            <h3 className="text-3xl md:text-4xl font-serif text-granite leading-[0.8] tracking-[-0.01em] mb-3">
              {t("whatsappCtaCallHeading")}
            </h3>
            <p className="text-granite/60 text-sm leading-relaxed mb-2 max-w-lg">
              {t("whatsappCtaCallDesc")}
            </p>
            <p className="text-granite text-2xl font-stack mb-6">
              {PHONE_DISPLAY}
            </p>
            <a
              href={telHref}
              className="btn-lg btn-granite-ghost w-full md:w-auto"
            >
              {t("whatsappCtaCallButton")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
