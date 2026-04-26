import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2">
              {t("journalEyebrow")}
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-granite">
              {t("journalTitle")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="shrink-0 text-sm font-medium text-forest hover:text-amber transition-colors"
          >
            {t("journalCta")} →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-amber">
                    {post.category}
                  </span>
                  <span className="text-xs text-granite/40">{post.date}</span>
                  <span className="text-xs text-granite/40">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-serif text-granite text-base leading-snug mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-granite/60 leading-relaxed line-clamp-3 flex-1 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-sm font-medium text-amber hover:text-forest transition-colors mt-auto"
                >
                  {locale === "pt" ? "Ler artigo" : "Read post"} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
