import Link from "next/link";
import { getTranslations } from "next-intl/server";
import JournalTeaserTrack from "@/components/home/JournalTeaserTrack";

const POSTS = [
  {
    slug: "lobo-iberico-barroso",
    category: "Fauna & Flora",
    title:
      "O Lobo-Ibérico no Barroso: Como (e Onde) Observar o Maior Predador da Península",
    excerpt:
      "O planalto barrosano abriga uma das últimas alcateias selvagens de Portugal. Falámos com os nossos guias sobre os melhores locais, as épocas certas e o que fazer se um dia se cruzar com um.",
    date: "14 Mar 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80",
  },
  {
    slug: "cascata-pitoes-junias-guia",
    category: "Guias de Trilhos",
    title:
      "Cascata de Pitões das Júnias: Guia Completo para a Maior Queda de Água do Gerês",
    excerpt:
      "Tudo o que precisa saber antes de visitar: como chegar, qual a melhor época, o que encontrar no caminho e os segredos que só os locais conhecem.",
    date: "28 Fev 2026",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    slug: "vinho-dos-mortos-historia",
    category: "Cultura e Património",
    title:
      "Vinho dos Mortos: A Estranha e Deliciosa História do Vinho Enterrado do Barroso",
    excerpt:
      "Durante a ocupação napoleónica, os habitantes de Boticas enterraram o vinho para o esconder dos invasores. Quando o desenterraram, tinham descoberto um tesouro. Uma história que ainda hoje se bebe.",
    date: "10 Fev 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
  },
];

interface Props {
  locale: string;
}

export default async function JournalTeaser({ locale }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="py-20 bg-fog">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 mb-6 md:mb-8">
          <div>
            <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-moss md:mb-2">
              {t("journalEyebrow")}
            </p>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-granite tracking-[-0.01em]">
              {t("journalTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="btn-lg btn-granite shrink-0"
          >
            {t("journalCta")}&nbsp; →
          </Link>
        </div>

        <JournalTeaserTrack
          posts={POSTS}
          locale={locale}
          readLabel={locale === "pt" ? "Ler artigo" : "Read post"}
        />
      </div>
    </section>
  );
}
