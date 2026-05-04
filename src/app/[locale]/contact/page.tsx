import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import CustomEnquiryForm from "@/components/contact/CustomEnquiryForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "Contacto" : "Contact",
    description:
      locale === "pt"
        ? "Contacte a Natur Barroso — reservas, informações, grupos e experiências personalizadas."
        : "Contact Natur Barroso — bookings, information, groups and custom experiences.",
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const isPt = locale === "pt";

  const formLabels = {
    nameLabel: t("nameLabel"),
    emailLabel: t("emailLabel"),
    submitBtn: t("submitBtn"),
    submitting: t("submitting"),
    successTitle: t("successTitle"),
    successBody: t("successBody"),
    errorMsg: t("errorMsg"),
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pb-20 bg-fog">
        <div className="container-wide">
          <p className="eyebrow text-granite/30">{t("eyebrow")}</p>
          <h1 className="section-title mb-8 md:mb-12">{t("title")}</h1>
          <p className="text-sm text-granite/60 max-w-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Forms */}
      <section className="pb-16 md:pb-24 bg-fog">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* General contact form */}
            <ContactForm
              locale={locale}
              labels={{
                ...formLabels,
                title: t("generalTitle"),
                subtitle: t("generalSubtitle"),
                subjectLabel: t("subjectLabel"),
                messageLabel: t("messageLabel"),
              }}
            />

            {/* Custom enquiry form */}
            <CustomEnquiryForm
              locale={locale}
              labels={{
                ...formLabels,
                title: t("customTitle"),
                subtitle: t("customSubtitle"),
                activityLabel: t("activityLabel"),
                groupSizeLabel: t("groupSizeLabel"),
                datesLabel: t("datesLabel"),
                budgetLabel: t("budgetLabel"),
                requirementsLabel: t("requirementsLabel"),
              }}
            />
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="pt-8 bg-fog">
        <div className="container-wide">
          <h2 className="section-title mb-8 md:mb-12">{t("whatsappTitle")}</h2>
          <p className="text-sm text-granite/60 mb-6 leading-relaxed">
            {t("whatsappBody")}
          </p>
          <a
            href="https://wa.me/351960000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lg bg-whatsapp border border-whatsapp text-white gap-3 hover:bg-whatsapp/50 hover:text-granite"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("whatsappBtn")}
          </a>
        </div>
      </section>

      {/* Contact info */}
      <section className="pt-10 pb-20 bg-fog">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-granite/40 mb-3">
                {isPt ? "Telefone" : "Phone"}
              </p>
              <a
                href="tel:+351960000000"
                className="text-granite font-medium hover:text-amber transition-colors"
              >
                +351 960 000 000
              </a>
            </div>
            <div>
              <p className="text-xs  uppercase tracking-widest text-granite/40 mb-3">
                Email
              </p>
              <a
                href="mailto:info@naturbarroso.pt"
                className="text-granite font-medium hover:text-amber transition-colors"
              >
                info@naturbarroso.pt
              </a>
            </div>
            <div>
              <p className="text-xs  uppercase tracking-widest text-granite/40 mb-3">
                {isPt ? "Morada" : "Address"}
              </p>
              <p className="text-granite/70 text-sm leading-relaxed">
                Montalegre, Terras de Barroso
                <br />
                5470 · Trás-os-Montes, Portugal
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-10 w-full h-64 rounded-2xl bg-granite/5 border border-granite/10 flex items-center justify-center">
            <p className="text-granite/30 text-sm">
              {isPt
                ? "Mapa interativo disponível em breve"
                : "Interactive map coming soon"}
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-granite/50">
            {t("responseTime")}
          </p>
        </div>
      </section>
    </>
  );
}
