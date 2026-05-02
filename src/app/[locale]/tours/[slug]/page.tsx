import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getTourBySlug, getSimilarTours } from "@/data/tours";
import TourHero from "@/components/tours/TourHero";
import TourItinerary from "@/components/tours/TourItinerary";
import TourInclusions from "@/components/tours/TourInclusions";
import TourDifficultyGauge from "@/components/tours/TourDifficultyGauge";
import TourPricingTable from "@/components/tours/TourPricingTable";
import TourFAQ from "@/components/tours/TourFAQ";
import BookingSidebar from "@/components/tours/BookingSidebar";
import SimilarTours from "@/components/tours/SimilarTours";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const similar = getSimilarTours(slug);
  const t = await getTranslations("TourDetail");

  return (
    <>
      <TourHero tour={tour} locale={locale} backLabel={t("backToTours")} />

      <div className="max-w-[90rem] mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 flex flex-col gap-14">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-serif text-granite mb-5">
                {t("overview")}
              </h2>
              <div className="text-granite/70 leading-relaxed space-y-4">
                {tour.overview.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-2xl font-serif text-granite mb-5">
                {t("highlights")}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {tour.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-granite/80"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffb547"
                      strokeWidth="2.5"
                      className="shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section>
              <TourItinerary steps={tour.itinerary} title={t("itinerary")} />
            </section>

            {/* Included / Not included */}
            <section>
              <h2 className="text-2xl font-serif text-granite mb-6">
                {t("inclusions")}
              </h2>
              <TourInclusions
                included={tour.included}
                notIncluded={tour.notIncluded}
                includedTitle={t("included")}
                notIncludedTitle={t("notIncluded")}
              />
            </section>

            {/* Difficulty gauge */}
            <section>
              <TourDifficultyGauge
                difficulty={tour.difficulty}
                locale={locale}
                title={t("difficultyFitness")}
              />
            </section>

            {/* Pricing */}
            <section>
              <TourPricingTable
                pricing={tour.pricing}
                title={t("pricing")}
                locale={locale}
              />
            </section>

            {/* Meet your guide */}
            <section>
              <h2 className="text-2xl font-serif text-granite mb-6">
                {t("meetGuide")}
              </h2>
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl border border-fog">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tour.guide.photo}
                  alt={tour.guide.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className=" text-granite mb-0.5">{tour.guide.name}</p>
                  <p className="text-xs text-granite/50 mb-3">
                    {tour.guide.languages.join(" · ")}
                  </p>
                  <p className="text-sm text-granite/70 leading-relaxed mb-3">
                    {tour.guide.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tour.guide.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 bg-fog rounded-full text-granite/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <TourFAQ faqs={tour.faqs} title={t("faq")} />
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookingSidebar
                tour={tour}
                locale={locale}
                whatToBringTitle={t("whatToBring")}
              />
            </div>
          </aside>
        </div>
      </div>

      <SimilarTours tours={similar} locale={locale} title={t("similarTours")} />
    </>
  );
}
