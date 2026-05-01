import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { reviews, featuredReviews } from "@/data/reviews";
import ReviewCard from "@/components/reviews/ReviewCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "pt" ? "Testemunhos" : "Reviews",
    description:
      locale === "pt"
        ? "O que dizem os nossos clientes — avaliações reais do TripAdvisor e Google. Natur Barroso, 4,8★."
        : "What our guests say — real reviews from TripAdvisor and Google. Natur Barroso, 4.8★.",
  };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ReviewsPage");
  const isPt = locale === "pt";

  return (
    <>
      {/* Hero aggregate */}
      <section className="pt-32 pb-16 bg-granite text-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-4">
            {t("sources")}
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ffb547"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-5xl font-serif mb-2">{t("aggregateRating")}</p>
          <p className="text-fog/60 text-sm">{t("reviewCount")}</p>
          <h1 className="text-3xl md:text-4xl font-serif mt-8">{t("title")}</h1>
        </div>
      </section>

      {/* Featured pull-quotes */}
      <section className="py-16 bg-moss">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          {featuredReviews.map((review) => (
            <blockquote
              key={review.id}
              className="bg-forest rounded-xl p-6 text-fog flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#ffb547"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-fog/80 text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>
              <footer>
                <p className="text-fog text-sm font-semibold">
                  {review.author}
                </p>
                <p className="text-fog/50 text-xs">
                  {review.country} · {review.tour}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Full reviews grid */}
      <section className="py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-2xl text-granite mb-4">
            {t("leaveReviewTitle")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-6 py-3 bg-granite text-fog rounded-full text-sm font-medium hover:bg-moss transition-colors"
            >
              {t("googleBtn")}
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-granite/20 text-granite rounded-full text-sm font-medium hover:border-granite/40 transition-colors"
            >
              {t("tripAdvisorBtn")}
            </a>
          </div>
          <p className="mt-4 text-xs text-granite/40">
            {isPt
              ? "Obrigado pela sua avaliação — faz uma diferença enorme."
              : "Thank you for reviewing — it makes a huge difference."}
          </p>
        </div>
      </section>
    </>
  );
}
