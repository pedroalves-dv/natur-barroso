/**
 * Seed script — creates Categories, Guides, and Tours in Sanity.
 * Safe to re-run: uses createOrReplace with stable _id values.
 *
 * Run with:
 *   npx tsx --env-file=.env.local sanity/scripts/seed.ts
 *
 * Requires SANITY_API_TOKEN with Editor permissions in .env.local.
 * Images (coverImage, guide photo) are left unpopulated — add via Studio.
 */

import { createClient } from "next-sanity";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_TOKEN (needs Editor role)");

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
  markDefs: never[];
};

/** Convert a plain string (paragraphs separated by \n\n) to Portable Text blocks. */
function toBlocks(text: string): PortableTextBlock[] {
  return text.split("\n\n").map((paragraph, i) => ({
    _type: "block",
    _key: `para-${i}`,
    style: "normal",
    children: [{ _type: "span", _key: `span-${i}`, text: paragraph.trim(), marks: [] }],
    markDefs: [] as never[],
  }));
}

function ref(id: string) {
  return { _type: "reference" as const, _ref: id };
}

// ---------------------------------------------------------------------------
// Category documents (all 10 from brief §6.2)
// Colours match CATEGORY_CONFIG in src/types/tour.ts
// ---------------------------------------------------------------------------

const categories = [
  {
    _id: "category-4x4",
    _type: "category",
    label: "4×4 Off-Road",
    slug: { _type: "slug", current: "4x4" },
    colour: "#ffb547",
    shortDescription: "Excursões em terreno acidentado com veículos 4WD.",
  },
  {
    _id: "category-hiking",
    _type: "category",
    label: "Trilhos Guiados",
    slug: { _type: "slug", current: "hiking" },
    colour: "#3a5c3d",
    shortDescription: "Caminhadas guiadas por trilhos de todos os níveis.",
  },
  {
    _id: "category-climbing",
    _type: "category",
    label: "Escalada",
    slug: { _type: "slug", current: "climbing" },
    colour: "#4A6B7C",
    shortDescription: "Rotas de escalada para todos os níveis no granito barrosão.",
  },
  {
    _id: "category-cultural",
    _type: "category",
    label: "Cultural e Património",
    slug: { _type: "slug", current: "cultural" },
    colour: "#7C6138",
    shortDescription: "Aldeias, castelos, Mosteiro das Júnias e Vinho dos Mortos.",
  },
  {
    _id: "category-gastronomy",
    _type: "category",
    label: "Sabores do Barroso",
    slug: { _type: "slug", current: "gastronomy" },
    colour: "#A0522D",
    shortDescription: "Gastronomia local, vinho e produtos regionais.",
  },
  {
    _id: "category-kayak",
    _type: "category",
    label: "Rios e Kayak",
    slug: { _type: "slug", current: "kayak" },
    colour: "#3A7CA5",
    shortDescription: "Kayak, canoa e SUP em rios e albufeiras.",
  },
  {
    _id: "category-photography",
    _type: "category",
    label: "Tours Fotográficos",
    slug: { _type: "slug", current: "photography" },
    colour: "#555550",
    shortDescription: "Saídas guiadas para fotógrafos de paisagem e fauna.",
  },
  {
    _id: "category-wildlife",
    _type: "category",
    label: "Fauna e Flora",
    slug: { _type: "slug", current: "wildlife" },
    colour: "#256b28",
    shortDescription: "Território do lobo-ibérico, flora endémica e avifauna.",
  },
  {
    _id: "category-groups",
    _type: "category",
    label: "Escolas e Grupos",
    slug: { _type: "slug", current: "groups" },
    colour: "#5B4B8A",
    shortDescription: "Programas educativos e team building.",
  },
  {
    _id: "category-multiday",
    _type: "category",
    label: "Expedições Multi-Dia",
    slug: { _type: "slug", current: "multiday" },
    colour: "#9B6914",
    shortDescription: "Acampamento e itinerário completo em plena natureza.",
  },
];

// ---------------------------------------------------------------------------
// Guide documents (3 guides from the seed tours)
// Photos left unpopulated — add via Studio.
// ---------------------------------------------------------------------------

const guides = [
  {
    _id: "guide-rui-ferreira",
    _type: "guide",
    name: "Rui Ferreira",
    slug: { _type: "slug", current: "rui-ferreira" },
    bio: toBlocks(
      "Natural de Montalegre, Rui cresceu entre as aldeias do planalto barrosano. Licenciado em História e com formação em animação turística, combina rigor académico com a intimidade de quem conhece cada pedra deste território."
    ),
    specialties: ["História local", "Etnografia barrosana", "Arquitetura vernácula"],
    languages: ["Português", "Inglês", "Espanhol"],
  },
  {
    _id: "guide-ana-teixeira",
    _type: "guide",
    name: "Ana Teixeira",
    slug: { _type: "slug", current: "ana-teixeira" },
    bio: toBlocks(
      "Ana é guia de montanha certificada com mais de 10 anos de experiência no Peneda-Gerês. Especialista em flora e fauna do parque, conduziu mais de 400 grupos por estes trilhos. Fala com a paixão de alguém que conhece cada curva do rio."
    ),
    specialties: [
      "Flora e fauna do Peneda-Gerês",
      "Trilhos de montanha",
      "Fotografia de natureza",
    ],
    languages: ["Português", "Inglês", "Francês"],
  },
  {
    _id: "guide-pedro-matos",
    _type: "guide",
    name: "Pedro Matos",
    slug: { _type: "slug", current: "pedro-matos" },
    bio: toBlocks(
      "Pedro nasceu no Barroso e conhece cada pista e atalho como a palma da mão. Piloto de todo-o-terreno com 15 anos de experiência, é também apaixonado pela fauna local — especialmente pelo lobo-ibérico, cujos territórios conhece de cor."
    ),
    specialties: ["Todo-o-terreno", "Fauna do Barroso", "História local"],
    languages: ["Português", "Inglês"],
  },
];

// ---------------------------------------------------------------------------
// Tour documents (4 seed tours)
// coverImage left unpopulated — add via Studio.
// ---------------------------------------------------------------------------

const tours = [
  {
    _id: "tour-rota-aldeias-graniticas",
    _type: "tour",
    title: "Rota das Aldeias Graníticas",
    slug: { _type: "slug", current: "rota-aldeias-graniticas" },
    category: ref("category-cultural"),
    guide: ref("guide-rui-ferreira"),
    shortDescription:
      "Um passeio entre aldeias esquecidas onde o granito conta séculos de história.",
    overview: toBlocks(
      "As Terras de Barroso guardam algumas das aldeias mais autênticas do interior de Portugal. Nesta rota a pé — adaptada para qualquer nível de condição física — percorremos dois ou três núcleos habitacionais de arquitetura granítica, onde o tempo parece ter parado.\n\nO guia local apresentará curiosidades sobre a vida rural, as tradições agropecuárias da região e a história das comunidades que resistiram séculos de isolamento. No final, há sempre uma paragem para provar produtos locais: pão de trigo, presunto barrosão e, claro, o famoso Vinho dos Mortos."
    ),
    highlights: [
      "Visita a 2–3 aldeias de arquitetura granítica preservada",
      "Vistas sobre o castelo de Montalegre",
      "Contacto com tradições artesanais locais",
      "Prova de produtos regionais (incluída no preço)",
      "Guia local com profundo conhecimento da história barrosana",
      "Caminhada suave, adequada a todas as idades",
    ],
    itinerary: [
      {
        _key: "step-0",
        title: "Ponto de encontro em Montalegre",
        description:
          "Encontro no largo central de Montalegre. Breve apresentação do percurso e contexto histórico.",
      },
      {
        _key: "step-1",
        title: "Aldeia de Cabril",
        description:
          "Primeira paragem na aldeia de Cabril, com casas de granito, palheiros e eiras típicas. O guia explica a arquitetura vernácula e os modos de vida tradicionais.",
      },
      {
        _key: "step-2",
        title: "Percurso entre aldeias",
        description:
          "Caminhada por caminhos de terra batida entre campos de centeio e bouças de carvalhos nativos. Vista panorâmica sobre o planalto barrosano.",
      },
      {
        _key: "step-3",
        title: "Paragem etnográfica",
        description:
          "Visita a um lagar de azeite ou moinho de água recuperado (conforme disponibilidade sazonal). O guia demonstra o funcionamento das ferramentas tradicionais.",
      },
      {
        _key: "step-4",
        title: "Prova de produtos locais",
        description:
          "Mesa de petiscos com pão de trigo, queijo de cabra, presunto barrosão e Vinho dos Mortos. Regresso a Montalegre.",
      },
    ],
    included: [
      "Guia local certificado",
      "Prova de produtos regionais",
      "Seguro de atividade",
      "Transporte entre pontos (quando aplicável)",
    ],
    notIncluded: [
      "Transporte até ao ponto de encontro",
      "Refeições além da prova incluída",
      "Despesas pessoais",
    ],
    whatToBring: [
      "Calçado confortável de caminhada",
      "Roupa adequada à época",
      "Garrafa de água",
      "Protetor solar (primavera/verão)",
      "Câmara fotográfica",
    ],
    difficulty: "easy",
    duration: "Meio dia – 4 horas",
    groupSize: { min: 2, max: 12 },
    pricing: [
      { _key: "price-0", label: "Por pessoa", price: 45 },
    ],
    seasonAvailability: ["spring", "summer", "autumn", "winter"],
    faqs: [
      {
        _key: "faq-0",
        question: "Este tour é adequado para crianças?",
        answer:
          "Sim. O percurso é suave e toda a família pode participar. Recomendamos calçado fechado para as crianças.",
      },
      {
        _key: "faq-1",
        question: "O que acontece se chover?",
        answer:
          "O tour realiza-se com chuva ligeira — a arquitetura granítica fica ainda mais fotogénica! Em caso de mau tempo severo, reagendamos sem custo.",
      },
      {
        _key: "faq-2",
        question: "As provas de produtos estão incluídas?",
        answer:
          "Sim. A prova de produtos regionais faz parte do tour e está incluída no preço.",
      },
      {
        _key: "faq-3",
        question: "Posso fazer este tour sozinho?",
        answer:
          "Sim, o tour realiza-se com reservas individuais. Poderá partilhar o grupo com outros participantes (máximo 12 pessoas).",
      },
    ],
  },
  {
    _id: "tour-trilho-pitoes-junias",
    _type: "tour",
    title: "Trilho de Pitões das Júnias",
    slug: { _type: "slug", current: "trilho-pitoes-junias" },
    category: ref("category-hiking"),
    guide: ref("guide-ana-teixeira"),
    shortDescription:
      "Das ruínas do mosteiro à cascata escondida — um dos dias mais épicos do Parque Nacional.",
    overview: toBlocks(
      "Pitões das Júnias é um dos segredos mais bem guardados do Parque Nacional Peneda-Gerês. Esta caminhada guiada de dia completo começa na aldeia medieval, desce até às ruínas do Mosteiro de Santa Maria das Júnias — fundado no século XII — e continua pelos barrancos até à cascata mais impressionante de todo o Barroso.\n\nO percurso atravessa habitats variados: bosque de carvalhos e amieiros, lameiros de altitude, matagal de urze e zonas ripícolas ricas em flora e fauna. O guia identifica espécies de plantas medicinais, aponta ninhos de rapinas e explica a geologia dos afloramentos graníticos."
    ),
    highlights: [
      "Ruínas do Mosteiro de Santa Maria das Júnias (século XII)",
      "Cascata de Pitões das Júnias — queda de 80 metros",
      "Fauna do Parque: corços, raposas e garças",
      "Bosque ripícola intacto ao longo do rio Cávado nascente",
      "Aldeia medieval de Pitões das Júnias",
      "Piquenique à beira da cascata (almoço incluído)",
    ],
    itinerary: [
      {
        _key: "step-0",
        title: "Aldeia de Pitões das Júnias",
        description:
          "Encontro e partida da aldeia. Breve contexto histórico sobre os pastores barrosanos e a ocupação do planalto.",
      },
      {
        _key: "step-1",
        title: "Descida ao Mosteiro",
        description:
          "Trilho de terra pela cumeada até às ruínas do mosteiro medieval. Paragem para explicação histórica e fotografia.",
      },
      {
        _key: "step-2",
        title: "Baranco do rio Cávado",
        description:
          "Descida pelo baranco rochoso, atravessando pontes de madeira e seguindo o curso do rio entre amieiros e salgueiros.",
      },
      {
        _key: "step-3",
        title: "Cascata de Pitões",
        description:
          "Chegada à base da cascata. Paragem alargada para almoço, banho (época quente) e contemplação.",
      },
      {
        _key: "step-4",
        title: "Regresso pela cumeada",
        description:
          "Subida pelo trilho alternativo, com vistas sobre a Serra do Gerês e as lameiras de altitude. Regresso à aldeia.",
      },
    ],
    included: [
      "Guia de montanha certificado (IPDJ)",
      "Almoço piquenique com produtos locais",
      "Seguro de atividade na natureza",
      "Equipamento de primeiros socorros",
    ],
    notIncluded: [
      "Transporte até à aldeia de Pitões das Júnias",
      "Equipamento pessoal (botas, mochila)",
      "Despesas pessoais",
    ],
    whatToBring: [
      "Botas de caminhada com sola antiderrapante",
      "Roupa em camadas (a temperatura baixa no baranco)",
      "Impermeável leve",
      "Fato de banho e toalha (época quente)",
      "Mochila com 1,5–2 L de água",
      "Bastões de caminhada (opcional, recomendado)",
    ],
    difficulty: "moderate",
    duration: "Dia completo – 7 horas",
    groupSize: { min: 2, max: 10 },
    pricing: [
      { _key: "price-0", label: "Por pessoa", price: 65 },
    ],
    seasonAvailability: ["spring", "summer", "autumn"],
    faqs: [
      {
        _key: "faq-0",
        question: "Qual o nível de dificuldade real?",
        answer:
          "Moderado — o percurso tem cerca de 14 km com 550 m de desnível acumulado. Adequado a pessoas com hábito regular de caminhada. Não requer técnica de escalada.",
      },
      {
        _key: "faq-1",
        question: "É possível nadar na cascata?",
        answer:
          "Sim, entre junho e setembro a temperatura da água permite um mergulho refrescante. O guia avalia as condições de segurança no dia.",
      },
      {
        _key: "faq-2",
        question: "O tour realiza-se com mau tempo?",
        answer:
          "Realizamos com chuva ligeira a moderada (equipamento adequado recomendado). Em caso de trovoada ou chuva forte, cancelamos e reagendamos sem custo.",
      },
      {
        _key: "faq-3",
        question: "Posso ver lobos neste trilho?",
        answer:
          "O avistamento de lobo-ibérico é raro e requer muita sorte. É mais provável avistar corços, javalis (ao amanhecer) e diversas rapinas.",
      },
    ],
  },
  {
    _id: "tour-expedicao-4x4-barroso",
    _type: "tour",
    title: "Expedição 4×4",
    slug: { _type: "slug", current: "expedicao-4x4-barroso" },
    category: ref("category-4x4"),
    guide: ref("guide-pedro-matos"),
    shortDescription:
      "Aos confins do território — pistas de terra, planaltos selvagens e aldeias sem asfalto.",
    overview: toBlocks(
      "Há uma versão do Barroso que não chega pelos mapas normais. Esta expedição de todo-o-terreno leva-o pelos caminhos esquecidos do planalto — rotas de pastores, pistas florestais e antigas vias de contrabando até à fronteira com a Galiza.\n\nNuma Toyota Land Cruiser com guia-piloto experiente, exploramos zonas inacessíveis de carro comum: lameiros de altitude onde pastam as vacas barrosãs, aldeias sem asfalto onde vivem os últimos pastores nómadas, e miradouros que nunca aparecem nos guias turísticos."
    ),
    highlights: [
      "Pistas de todo-o-terreno exclusivas no planalto barrosano",
      "Avistamento de vacas barrosãs no seu habitat natural",
      "Paragem em aldeia de pastores sem turistas",
      "Miradouro secreto sobre as serras da Galiza",
      "Almoço num restaurante familiar escondido",
      "Possível avistamento de lobo-ibérico (território de alcateia ativa)",
    ],
    itinerary: [
      {
        _key: "step-0",
        title: "Partida de Montalegre",
        description:
          "Encontro e briefing de segurança. Apresentação do veículo e do itinerário. Saída em direção ao planalto.",
      },
      {
        _key: "step-1",
        title: "Planalto de Tourém",
        description:
          "Acesso a uma das zonas mais remotas do Barroso, na fronteira com Espanha. Pistas de pastores, vistas para a Serra Seca.",
      },
      {
        _key: "step-2",
        title: "Paragem em aldeia fronteiriça",
        description:
          "Visita breve a uma aldeia quase desabitada. O guia conta histórias de contrabandistas e da vida na fronteira durante o Estado Novo.",
      },
      {
        _key: "step-3",
        title: "Almoço regional",
        description:
          "Paragem num restaurante familiar (selecionado sazonalmente) para almoço com cozinha barrosana tradicional.",
      },
      {
        _key: "step-4",
        title: "Regresso pelo vale do Rabagão",
        description:
          "Descida pela margem do rio Rabagão, com paragem na albufeira. Regresso a Montalegre pela estrada nacional.",
      },
    ],
    included: [
      "Toyota Land Cruiser com guia-piloto certificado",
      "Combustível",
      "Seguro de atividade",
      "Água e lanches ligeiros a bordo",
    ],
    notIncluded: [
      "Transporte até Montalegre",
      "Almoço (aprox. €15–20 no restaurante local)",
      "Despesas pessoais",
    ],
    whatToBring: [
      "Calçado fechado e confortável",
      "Camadas de roupa (o planalto pode ser frio mesmo no verão)",
      "Câmara fotográfica (teleobjetiva para fauna)",
      "Documentos de identificação",
    ],
    difficulty: "moderate",
    duration: "Dia completo – 8 horas",
    groupSize: { min: 2, max: 8 },
    pricing: [
      { _key: "price-0", label: "Por pessoa", price: 85 },
      { _key: "price-1", label: "Grupo privado", price: 480 },
    ],
    seasonAvailability: ["spring", "summer", "autumn", "winter"],
    faqs: [
      {
        _key: "faq-0",
        question: "É necessário saber conduzir off-road?",
        answer:
          "Não. É o nosso guia-piloto quem conduz. Os participantes viajam como passageiros.",
      },
      {
        _key: "faq-1",
        question: "O tour realiza-se no inverno?",
        answer:
          "Sim, com condições meteorológicas adequadas. No inverno o planalto pode ter neve — uma experiência completamente diferente e igualmente impressionante.",
      },
      {
        _key: "faq-2",
        question: "Quantas pessoas cabem no veículo?",
        answer:
          "Máximo 8 pessoas por veículo. Grupos maiores podem ser acomodados com dois veículos.",
      },
      {
        _key: "faq-3",
        question: "Posso trazer crianças?",
        answer:
          "Sim, a partir dos 8 anos. O percurso inclui pistas acidentadas que podem ser desconfortáveis para crianças mais pequenas.",
      },
    ],
  },
  {
    _id: "tour-fim-de-semana-geres",
    _type: "tour",
    title: "Fim de Semana no Parque Nacional",
    slug: { _type: "slug", current: "fim-de-semana-geres" },
    category: ref("category-multiday"),
    guide: ref("guide-ana-teixeira"),
    shortDescription:
      "Dois dias, uma noite, e a sensação de ter descoberto um Portugal que não sabia que existia.",
    overview: toBlocks(
      "Este fim de semana no Gerês foi desenhado para quem quer verdadeiramente desligar. Dois dias completamente imersivos no Parque Nacional Peneda-Gerês — trilhos de montanha, banhos de rio, jantar com produtos da época e noite numa casa rural recuperada.\n\nNão há horários rígidos. O programa adapta-se ao ritmo do grupo, às condições climatéricas e às oportunidades que o território oferece — e no Gerês, cada dia traz surpresas diferentes."
    ),
    highlights: [
      "Dois trilhos guiados (um por dia)",
      "Noite em casa rural com pequeno-almoço incluído",
      "Jantar com produtos regionais da época",
      "Banho em cascata ou rio (época quente)",
      "Avistamento de fauna (corços, javalis, aves de rapina)",
      "Pôr do sol num miradouro remoto",
    ],
    itinerary: [
      {
        _key: "step-0",
        title: "Dia 1 — Chegada e trilho da tarde",
        description:
          "Chegada à casa rural, almoço livre na aldeia. Às 14h, trilho guiado de 3–4 horas pelos vales do Gerês, com paragem para banho. Jantar coletivo com produtos locais.",
      },
      {
        _key: "step-1",
        title: "Dia 1 — Noite no Gerês",
        description:
          "Após o jantar, sessão de observação do céu noturno (ausência de poluição luminosa). Alojamento em quarto individual ou partilhado (conforme reserva).",
      },
      {
        _key: "step-2",
        title: "Dia 2 — Pequeno-almoço e trilho principal",
        description:
          "Pequeno-almoço farto com produtos da casa. Trilho principal do dia: 5–6 horas pelos cumes mais altos da zona, com panorâmicas sobre Espanha e o vale do Lima.",
      },
      {
        _key: "step-3",
        title: "Dia 2 — Regresso",
        description:
          "Almoço final na aldeia. Partida às 15h. Possibilidade de extensão de uma noite extra mediante disponibilidade.",
      },
    ],
    included: [
      "Guia certificado para os dois dias",
      "Alojamento (1 noite) em casa rural — quarto privativo",
      "Pequeno-almoço do dia 2",
      "Jantar do dia 1 com produtos regionais",
      "Seguro de atividade",
    ],
    notIncluded: [
      "Transporte até ao ponto de encontro",
      "Almoços (dias 1 e 2)",
      "Bebidas extra ao jantar",
      "Despesas pessoais",
    ],
    whatToBring: [
      "Botas de caminhada impermeáveis",
      "Muda de roupa completa para dois dias",
      "Impermeável e camadas quentes",
      "Fato de banho e toalha",
      "Mochila de 25–35 L",
      "2 L de água por dia",
    ],
    difficulty: "moderate",
    duration: "2 dias / 1 noite",
    groupSize: { min: 2, max: 8 },
    pricing: [
      { _key: "price-0", label: "Por pessoa", price: 195 },
    ],
    seasonAvailability: ["spring", "summer", "autumn"],
    faqs: [
      {
        _key: "faq-0",
        question: "O alojamento é em quarto privativo?",
        answer:
          "Sim. O preço inclui quarto privativo com casa de banho. Se viajar a par, terá um quarto duplo. Se for sozinho, um quarto individual.",
      },
      {
        _key: "faq-1",
        question: "O tour é adequado para principiantes?",
        answer:
          "Sim, com condição física razoável. Os trilhos são de dificuldade moderada — longos mas sem técnica especial. Recomendamos que caminhe regularmente.",
      },
      {
        _key: "faq-2",
        question: "O que acontece se chover um dos dias?",
        answer:
          "Caminhamos com chuva ligeira a moderada — é parte da experiência. Em caso de mau tempo severo, adaptamos o programa ou adiamos o trilho mais exigente.",
      },
      {
        _key: "faq-3",
        question: "Posso reservar apenas 1 dia?",
        answer:
          "Sim, os trilhos individuais estão disponíveis como tours de dia completo. Consulte o Trilho de Pitões das Júnias ou a Expedição 4×4.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  console.log("Seeding Sanity dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production");

  // Categories
  for (const doc of categories) {
    await client.createOrReplace(doc);
    console.log("  category:", doc._id);
  }

  // Guides
  for (const doc of guides) {
    await client.createOrReplace(doc);
    console.log("  guide:", doc._id);
  }

  // Tours
  for (const doc of tours) {
    await client.createOrReplace(doc);
    console.log("  tour:", doc._id);
  }

  console.log("\nDone. Open Studio to add cover images and guide photos.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
