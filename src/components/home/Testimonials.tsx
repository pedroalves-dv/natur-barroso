'use client';

const REVIEWS = [
  {
    id: 1,
    author: 'Sophie van der Berg',
    country: 'Países Baixos',
    rating: 5,
    tour: 'Trilho de Pitões das Júnias',
    text: 'Simplesmente inesquecível. O mosteiro em ruínas, a descida pelo baranco e a cascata no final — nenhuma fotografia faz jus. O guia sabia tudo sobre as plantas e os animais que encontrámos. O dia mais bonito das nossas férias em Portugal.',
  },
  {
    id: 2,
    author: 'James & Clara Thornton',
    country: 'Reino Unido',
    rating: 5,
    tour: 'Fim de Semana no Coração do Gerês',
    text: 'Viemos sem grandes expectativas e saímos completamente rendidos ao Gerês. A Ana conseguiu equilibrar um fim de semana de aventura com momentos de pura contemplação. O jantar da primeira noite com produtos locais foi uma surpresa enorme. Já estamos a planear voltar.',
  },
  {
    id: 3,
    author: 'Carlos Mendieta',
    country: 'Espanha',
    rating: 5,
    tour: 'Expedição 4×4 ao Barroso Profundo',
    text: 'Conheci o Pedro numa expedição de grupo e foi uma experiência fora do comum. Chegámos a lugares que nunca encontraríamos sozinhos. As histórias sobre os contrabandistas e a vida na fronteira deram uma dimensão completamente diferente à paisagem. Altamente recomendado.',
  },
  {
    id: 4,
    author: 'Marieke Jansen',
    country: 'Bélgica',
    rating: 5,
    tour: 'Rota das Aldeias Graníticas',
    text: 'Perfeito para uma manhã de caminhada tranquila mas com muito conteúdo. O Rui tem uma forma de contar a história das aldeias que nos faz sentir privilegiados por estar ali. A prova de Vinho dos Mortos no final foi o toque perfeito. Recomendo a qualquer pessoa que queira conhecer o Barroso de verdade.',
  },
  {
    id: 5,
    author: 'Thomas Grünfeld',
    country: 'Alemanha',
    rating: 5,
    tour: 'Trilho de Pitões das Júnias',
    text: 'Já fiz muitas caminhadas guiadas na Europa, mas esta ficou no top 3. O equilíbrio entre história, natureza e esforço físico é excelente. O guia foi paciente, bem-humorado e extremamente competente. Voltei para casa com a memória de uma cascata que não consigo esquecer.',
  },
];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C8882A" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Testimonials({ title }: { title: string }) {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-20 bg-moss overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-2 text-center">
          TripAdvisor · Google Reviews
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-fog text-center">{title}</h2>
      </div>

      {/* Marquee track */}
      <div className="group">
        <div
          className="flex gap-5 [animation:marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] w-max"
        >
          {doubled.map((review, i) => (
            <article
              key={`${review.id}-${i}`}
              className="w-80 shrink-0 bg-forest rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="text-fog/80 text-sm leading-relaxed flex-1">"{review.text}"</p>
              <div>
                <p className="text-fog text-sm font-semibold">{review.author}</p>
                <p className="text-fog/50 text-xs">{review.country} · {review.tour}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
