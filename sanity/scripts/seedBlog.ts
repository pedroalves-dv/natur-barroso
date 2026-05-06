/**
 * Blog seed script — creates BlogPost documents in Sanity from static post data.
 * Safe to re-run: uses createOrReplace with stable _id values.
 *
 * Run with:
 *   npx tsx --env-file=.env.local sanity/scripts/seedBlog.ts
 *
 * Requires SANITY_API_TOKEN with Editor permissions in .env.local.
 * coverImage is left unpopulated — add via Studio.
 * Guides must already be seeded (run seed.ts first).
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

function toBlocks(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `para-${i}`,
    style: "normal",
    children: [{ _type: "span", _key: `span-${i}`, text: text.trim(), marks: [] }],
    markDefs: [] as never[],
  }));
}

function ref(id: string) {
  return { _type: "reference" as const, _ref: id };
}

// ---------------------------------------------------------------------------
// Blog post documents
// ---------------------------------------------------------------------------

const blogPosts = [
  {
    _id: "blog-lobo-iberico-barroso",
    _type: "blogPost",
    title:
      "O Lobo-Ibérico no Barroso: Como (e Onde) Observar o Maior Predador da Península",
    slug: { _type: "slug", current: "lobo-iberico-barroso" },
    author: ref("guide-ana-teixeira"),
    category: "wildlife",
    publishedAt: "2026-03-14T00:00:00Z",
    readTime: "7 min",
    excerpt:
      "O planalto barrosano abriga uma das últimas alcateias selvagens de Portugal. Falámos com os nossos guias sobre os melhores locais, as épocas certas e o que fazer se um dia se cruzar com um.",
    body: toBlocks([
      "Há poucos lugares em Portugal onde a presença do lobo-ibérico (Canis lupus signatus) é tão concreta e documentada como no planalto barrosano. Não se trata de uma raridade estatística — aqui, o lobo é vizinho. As marcas no solo, os berros noturnos, as histórias que os pastores mais velhos contam com mistura de respeito e resignação: tudo isso faz parte do quotidiano do Barroso há séculos.",
      "O território da alcateia principal abrange as zonas mais remotas entre Montalegre, Tourém e Pitões das Júnias. É um corredor de altitude onde os lameiros de pastagem se alternam com matagal denso — o habitat ideal para um predador que prefere espaços amplos com cobertura vegetal nas margens. As vacas barrosãs que pastam nestas terras são, involuntariamente, o principal elo de ligação entre o lobo e o ser humano.",
      "Observar um lobo selvagem não é garantido — seria desonesto dizer o contrário. Mas há condições que aumentam muito a probabilidade: o amanhecer e o entardecer são as horas de maior atividade; os meses de outubro a março, quando a vegetação está mais baixa, permitem melhor visibilidade; e as zonas de pastagem junto a bordas de floresta são os pontos de passagem mais frequentes.",
      "Nas nossas expedições de 4x4 ao Barroso Profundo, guiamos os grupos pelos territórios documentados da alcateia sem interferir nos seus padrões de movimento. O equipamento recomendado inclui binóculos de pelo menos 8x42 e uma câmara com teleobjetiva de 400mm ou mais — os avistamentos acontecem, na maioria das vezes, a distâncias superiores a 300 metros.",
      "Uma nota importante: qualquer encontro com lobo deve ser reportado ao ICNF (Instituto da Conservação da Natureza e das Florestas). A espécie está protegida e a monitorização das alcateias depende de dados colhidos no campo. Ser testemunha de um avistamento não é apenas uma experiência memorável — é também uma contribuição para a conservação de um dos maiores patrimónios naturais da Península Ibérica.",
    ]),
  },
  {
    _id: "blog-cascata-pitoes-junias-guia",
    _type: "blogPost",
    title:
      "Cascata de Pitões das Júnias: Guia Completo para a Maior Queda de Água do Gerês",
    slug: { _type: "slug", current: "cascata-pitoes-junias-guia" },
    author: ref("guide-ana-teixeira"),
    category: "trail-reports",
    publishedAt: "2026-02-28T00:00:00Z",
    readTime: "9 min",
    excerpt:
      "Tudo o que precisa saber antes de visitar: como chegar, qual a melhor época, o que encontrar no caminho e os segredos que só os locais conhecem.",
    body: toBlocks([
      "A Cascata de Pitões das Júnias não aparece em nenhum guia turístico de Portugal. Está demasiado fora de mão, demasiado escondida no fundo de um baranco que exige esforço para chegar. É exactamente por isso que continua a ser um dos lugares mais extraordinários do Parque Nacional Peneda-Gerês — e um dos bem guardados segredos que os nossos guias partilham com os grupos.",
      "A queda de água principal tem cerca de 80 metros. Não é a mais alta do país, mas a combinação de fatores é única: o enquadramento no baranco granítico, o ruído ensurdecedor da água no inverno, a piscina natural que se forma na base e a vegetação ripícola quase intacta que ladeiam o percurso até lá. De inverno, o caudal é impressionante. De verão, a temperatura da piscina é perfeita para um mergulho.",
      "O acesso faz-se a partir da aldeia de Pitões das Júnias, a cerca de 30 minutos de carro de Montalegre. O percurso mais comum começa na aldeia, desce pelas ruínas do Mosteiro de Santa Maria das Júnias — fundado no século XII, hoje parcialmente preservado — e continua pelo baranco do rio Cávado nascente até à cascata. São cerca de 7 km no total, com um desnível de 400 metros na descida. Dificuldade moderada.",
      "Há algumas coisas que a maioria dos visitantes desconhece. Primeira: a melhor luz para fotografar a cascata é a manhã, quando o sol ainda não entrou no baranco e a névoa matinal cria uma atmosfera quase irreal. Segunda: as ruínas do mosteiro têm um portal românico quase intacto que passa despercebido se não souber onde olhar. Terceira: o trilho de regresso pela cumeada tem panorâmicas sobre a Serra do Gerês que valem tanto quanto a própria cascata.",
      "Recomendamos sempre fazer este percurso com guia — não porque seja perigoso em condições normais, mas porque o baranco tem bifurcações que não estão sinalizadas e porque a riqueza do percurso multiplica-se quando alguém consegue identificar as espécies de flora, contar a história do mosteiro ou apontar o ninho de uma aguia-de-Bonelli a 200 metros de distância. É a diferença entre ver e verdadeiramente descobrir.",
    ]),
  },
  {
    _id: "blog-vinho-dos-mortos-historia",
    _type: "blogPost",
    title:
      "Vinho dos Mortos: A Estranha e Deliciosa História do Vinho Enterrado do Barroso",
    slug: { _type: "slug", current: "vinho-dos-mortos-historia" },
    author: ref("guide-rui-ferreira"),
    category: "culture",
    publishedAt: "2026-02-10T00:00:00Z",
    readTime: "5 min",
    excerpt:
      "Durante a ocupação napoleónica, os habitantes de Boticas enterraram o vinho para o esconder dos invasores. Quando o desenterraram, tinham descoberto um tesouro. Uma história que ainda hoje se bebe.",
    body: toBlocks([
      "A história do Vinho dos Mortos começa com uma invasão. Em 1809, as tropas napoleónicas de Soult atravessaram o Minho e desceram pelo interior de Trás-os-Montes, saqueando tudo o que encontravam pelo caminho. Nos campos de Boticas, as famílias esconderam o que tinham de mais valioso — e naquela zona, o mais valioso era o vinho.",
      "Enterraram as pipas no chão, nas adegas e nas caves. Algumas ficaram sob os quintais, outras sob os estábulos. A ideia era simples: o que não se vê, não se rouba. Os soldados passaram, saquearam o que conseguiram ver, e partiram. Meses depois, quando a paz voltou e os habitantes começaram a desenterrar as suas reservas, descobriram que o vinho tinha mudado. Era diferente. Mais encorpado, com uma cor mais escura e um sabor que ninguém conseguia explicar bem. Melhor, definitivamente melhor.",
      "O nome que lhe deram foi directo e pouco poético: \"Vinho dos Mortos.\" Morto porque estava enterrado. Vivo porque ressuscitou transformado. A tradição pegou. Ainda hoje, em Boticas, algumas adegas mantêm a prática de enterrar pipas de vinho durante meses ou anos antes de as abrir — um método de envelhecimento único no mundo.",
      "O Vinho dos Mortos de Boticas não é classificado como DOC nem tem a notoriedade de um Alentejo ou um Douro. É um vinho de lugar, de história, de gente específica. Quando o provamos no final dos nossos tours de Rota das Aldeias Graníticas, a reação dos visitantes é quase sempre a mesma: uma surpresa genuína, seguida de uma segunda taça, seguida de um pedido para saber onde comprar mais.",
      "Há uma metáfora fácil aqui — a de que algumas coisas só ganham com o tempo passado no escuro, longe do ruído. Mas preferimos deixar a moralização para outros e concentrar-nos no que interessa: o sabor. Vale a pena uma visita a Boticas só para o provar. E se vier connosco, prometemos o contexto que faz a diferença entre beber e perceber.",
    ]),
  },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  console.log(`Seeding ${blogPosts.length} blog posts…`);

  for (const post of blogPosts) {
    await client.createOrReplace(post);
    console.log(`  ✓ ${post._id}`);
  }

  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
