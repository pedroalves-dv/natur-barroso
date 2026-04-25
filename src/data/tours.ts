import type { Tour } from '@/types/tour';

export const tours: Tour[] = [
  {
    slug: 'rota-aldeias-graniticas',
    title: 'Rota das Aldeias Graníticas',
    shortDescription: 'Um passeio entre aldeias esquecidas onde o granito conta séculos de história.',
    category: 'cultural',
    difficulty: 'easy',
    duration: 'Meio dia – 4 horas',
    groupSize: { min: 2, max: 12 },
    pricing: [{ label: 'Por pessoa', price: 45 }],
    seasonAvailability: ['spring', 'summer', 'autumn', 'winter'],
    coverImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    overview:
      'As Terras de Barroso guardam algumas das aldeias mais autênticas do interior de Portugal. Nesta rota a pé — adaptada para qualquer nível de condição física — percorremos dois ou três núcleos habitacionais de arquitetura granítica, onde o tempo parece ter parado.\n\nO guia local apresentará curiosidades sobre a vida rural, as tradições agropecuárias da região e a história das comunidades que resistiram séculos de isolamento. No final, há sempre uma paragem para provar produtos locais: pão de trigo, presunto barrosão e, claro, o famoso Vinho dos Mortos.',
    highlights: [
      'Visita a 2–3 aldeias de arquitetura granítica preservada',
      'Vistas sobre o castelo de Montalegre',
      'Contacto com tradições artesanais locais',
      'Prova de produtos regionais (incluída no preço)',
      'Guia local com profundo conhecimento da história barrosana',
      'Caminhada suave, adequada a todas as idades',
    ],
    itinerary: [
      {
        title: 'Ponto de encontro em Montalegre',
        description: 'Encontro no largo central de Montalegre. Breve apresentação do percurso e contexto histórico.',
      },
      {
        title: 'Aldeia de Cabril',
        description:
          'Primeira paragem na aldeia de Cabril, com casas de granito, palheiros e eiras típicas. O guia explica a arquitetura vernácula e os modos de vida tradicionais.',
      },
      {
        title: 'Percurso entre aldeias',
        description:
          'Caminhada por caminhos de terra batida entre campos de centeio e bouças de carvalhos nativos. Vista panorâmica sobre o planalto barrosano.',
      },
      {
        title: 'Paragem etnográfica',
        description:
          'Visita a um lagar de azeite ou moinho de água recuperado (conforme disponibilidade sazonal). O guia demonstra o funcionamento das ferramentas tradicionais.',
      },
      {
        title: 'Prova de produtos locais',
        description:
          'Mesa de petiscos com pão de trigo, queijo de cabra, presunto barrosão e Vinho dos Mortos. Regresso a Montalegre.',
      },
    ],
    included: [
      'Guia local certificado',
      'Prova de produtos regionais',
      'Seguro de atividade',
      'Transporte entre pontos (quando aplicável)',
    ],
    notIncluded: [
      'Transporte até ao ponto de encontro',
      'Refeições além da prova incluída',
      'Despesas pessoais',
    ],
    whatToBring: [
      'Calçado confortável de caminhada',
      'Roupa adequada à época',
      'Garrafa de água',
      'Protetor solar (primavera/verão)',
      'Câmara fotográfica',
    ],
    faqs: [
      {
        question: 'Este tour é adequado para crianças?',
        answer:
          'Sim. O percurso é suave e toda a família pode participar. Recomendamos calçado fechado para as crianças.',
      },
      {
        question: 'O que acontece se chover?',
        answer:
          'O tour realiza-se com chuva ligeira — a arquitetura granítica fica ainda mais fotogénica! Em caso de mau tempo severo, reagendamos sem custo.',
      },
      {
        question: 'As provas de produtos estão incluídas?',
        answer: 'Sim. A prova de produtos regionais faz parte do tour e está incluída no preço.',
      },
      {
        question: 'Posso fazer este tour sozinho?',
        answer:
          'Sim, o tour realiza-se com reservas individuais. Poderá partilhar o grupo com outros participantes (máximo 12 pessoas).',
      },
    ],
    guide: {
      name: 'Rui Ferreira',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Natural de Montalegre, Rui cresceu entre as aldeias do planalto barrosano. Licenciado em História e com formação em animação turística, combina rigor académico com a intimidade de quem conhece cada pedra deste território.',
      specialties: ['História local', 'Etnografia barrosana', 'Arquitetura vernácula'],
      languages: ['Português', 'Inglês', 'Espanhol'],
    },
  },
  {
    slug: 'trilho-pitoes-junias',
    title: 'Trilho de Pitões das Júnias',
    shortDescription: 'Das ruínas do mosteiro à cascata escondida — um dos dias mais épicos do Parque Nacional.',
    category: 'hiking',
    difficulty: 'moderate',
    duration: 'Dia completo – 7 horas',
    groupSize: { min: 2, max: 10 },
    pricing: [{ label: 'Por pessoa', price: 65 }],
    seasonAvailability: ['spring', 'summer', 'autumn'],
    coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
    overview:
      'Pitões das Júnias é um dos segredos mais bem guardados do Parque Nacional Peneda-Gerês. Esta caminhada guiada de dia completo começa na aldeia medieval, desce até às ruínas do Mosteiro de Santa Maria das Júnias — fundado no século XII — e continua pelos barrancos até à cascata mais impressionante de todo o Barroso.\n\nO percurso atravessa habitats variados: bosque de carvalhos e amieiros, lameiros de altitude, matagal de urze e zonas ripícolas ricas em flora e fauna. O guia identifica espécies de plantas medicinais, aponta ninhos de rapinas e explica a geologia dos afloramentos graníticos.',
    highlights: [
      'Ruínas do Mosteiro de Santa Maria das Júnias (século XII)',
      'Cascata de Pitões das Júnias — queda de 80 metros',
      'Fauna do Parque: corços, raposas e garças',
      'Bosque ripícola intacto ao longo do rio Cávado nascente',
      'Aldeia medieval de Pitões das Júnias',
      'Piquenique à beira da cascata (almoço incluído)',
    ],
    itinerary: [
      {
        title: 'Aldeia de Pitões das Júnias',
        description:
          'Encontro e partida da aldeia. Breve contexto histórico sobre os pastores barrosanos e a ocupação do planalto.',
      },
      {
        title: 'Descida ao Mosteiro',
        description:
          'Trilho de terra pela cumeada até às ruínas do mosteiro medieval. Paragem para explicação histórica e fotografia.',
      },
      {
        title: 'Baranco do rio Cávado',
        description:
          'Descida pelo baranco rochoso, atravessando pontes de madeira e seguindo o curso do rio entre amieiros e salgueiros.',
      },
      {
        title: 'Cascata de Pitões',
        description:
          'Chegada à base da cascata. Paragem alargada para almoço, banho (época quente) e contemplação.',
      },
      {
        title: 'Regresso pela cumeada',
        description:
          'Subida pelo trilho alternativo, com vistas sobre a Serra do Gerês e as lameiras de altitude. Regresso à aldeia.',
      },
    ],
    included: [
      'Guia de montanha certificado (IPDJ)',
      'Almoço piquenique com produtos locais',
      'Seguro de atividade na natureza',
      'Equipamento de primeiros socorros',
    ],
    notIncluded: [
      'Transporte até à aldeia de Pitões das Júnias',
      'Equipamento pessoal (botas, mochila)',
      'Despesas pessoais',
    ],
    whatToBring: [
      'Botas de caminhada com sola antiderrapante',
      'Roupa em camadas (a temperatura baixa no baranco)',
      'Impermeável leve',
      'Fato de banho e toalha (época quente)',
      'Mochila com 1,5–2 L de água',
      'Bastões de caminhada (opcional, recomendado)',
    ],
    faqs: [
      {
        question: 'Qual o nível de dificuldade real?',
        answer:
          'Moderado — o percurso tem cerca de 14 km com 550 m de desnível acumulado. Adequado a pessoas com hábito regular de caminhada. Não requer técnica de escalada.',
      },
      {
        question: 'É possível nadar na cascata?',
        answer:
          'Sim, entre junho e setembro a temperatura da água permite um mergulho refrescante. O guia avalia as condições de segurança no dia.',
      },
      {
        question: 'O tour realiza-se com mau tempo?',
        answer:
          'Realizamos com chuva ligeira a moderada (equipamento adequado recomendado). Em caso de trovoada ou chuva forte, cancelamos e reagendamos sem custo.',
      },
      {
        question: 'Posso ver lobos neste trilho?',
        answer:
          'O avistamento de lobo-ibérico é raro e requer muita sorte. É mais provável avistar corços, javalis (ao amanhecer) e diversas rapinas.',
      },
    ],
    guide: {
      name: 'Ana Teixeira',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Ana é guia de montanha certificada com mais de 10 anos de experiência no Peneda-Gerês. Especialista em flora e fauna do parque, conduziu mais de 400 grupos por estes trilhos. Fala com a paixão de alguém que conhece cada curva do rio.',
      specialties: ['Flora e fauna do Peneda-Gerês', 'Trilhos de montanha', 'Fotografia de natureza'],
      languages: ['Português', 'Inglês', 'Francês'],
    },
  },
  {
    slug: 'expedicao-4x4-barroso',
    title: 'Expedição 4×4 ao Barroso Profundo',
    shortDescription: 'Aos confins do território — pistas de terra, planaltos selvagens e aldeias sem asfalto.',
    category: '4x4',
    difficulty: 'moderate',
    duration: 'Dia completo – 8 horas',
    groupSize: { min: 2, max: 8 },
    pricing: [
      { label: 'Por pessoa', price: 85 },
      { label: 'Grupo privado', price: 480 },
    ],
    seasonAvailability: ['spring', 'summer', 'autumn', 'winter'],
    coverImage: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80',
    overview:
      'Há uma versão do Barroso que não chega pelos mapas normais. Esta expedição de todo-o-terreno leva-o pelos caminhos esquecidos do planalto — rotas de pastores, pistas florestais e antigas vias de contrabando até à fronteira com a Galiza.\n\nNuma Toyota Land Cruiser com guia-piloto experiente, exploramos zonas inacessíveis de carro comum: lameiros de altitude onde pastam as vacas barrosãs, aldeias sem asfalto onde vivem os últimos pastores nómadas, e miradouros que nunca aparecem nos guias turísticos.',
    highlights: [
      'Pistas de todo-o-terreno exclusivas no planalto barrosano',
      'Avistamento de vacas barrosãs no seu habitat natural',
      'Paragem em aldeia de pastores sem turistas',
      'Miradouro secreto sobre as serras da Galiza',
      'Almoço num restaurante familiar escondido',
      'Possível avistamento de lobo-ibérico (território de alcateia ativa)',
    ],
    itinerary: [
      {
        title: 'Partida de Montalegre',
        description:
          'Encontro e briefing de segurança. Apresentação do veículo e do itinerário. Saída em direção ao planalto.',
      },
      {
        title: 'Planalto de Tourém',
        description:
          'Acesso a uma das zonas mais remotas do Barroso, na fronteira com Espanha. Pistas de pastores, vistas para a Serra Seca.',
      },
      {
        title: 'Paragem em aldeia fronteiriça',
        description:
          'Visita breve a uma aldeia quase desabitada. O guia conta histórias de contrabandistas e da vida na fronteira durante o Estado Novo.',
      },
      {
        title: 'Almoço regional',
        description:
          'Paragem num restaurante familiar (selecionado sazonalmente) para almoço com cozinha barrosana tradicional.',
      },
      {
        title: 'Regresso pelo vale do Rabagão',
        description:
          'Descida pela margem do rio Rabagão, com paragem na albufeira. Regresso a Montalegre pela estrada nacional.',
      },
    ],
    included: [
      'Toyota Land Cruiser com guia-piloto certificado',
      'Combustível',
      'Seguro de atividade',
      'Água e lanches ligeiros a bordo',
    ],
    notIncluded: [
      'Transporte até Montalegre',
      'Almoço (aprox. €15–20 no restaurante local)',
      'Despesas pessoais',
    ],
    whatToBring: [
      'Calçado fechado e confortável',
      'Camadas de roupa (o planalto pode ser frio mesmo no verão)',
      'Câmara fotográfica (teleobjetiva para fauna)',
      'Documentos de identificação',
    ],
    faqs: [
      {
        question: 'É necessário saber conduzir off-road?',
        answer: 'Não. É o nosso guia-piloto quem conduz. Os participantes viajam como passageiros.',
      },
      {
        question: 'O tour realiza-se no inverno?',
        answer:
          'Sim, com condições meteorológicas adequadas. No inverno o planalto pode ter neve — uma experiência completamente diferente e igualmente impressionante.',
      },
      {
        question: 'Quantas pessoas cabem no veículo?',
        answer:
          'Máximo 8 pessoas por veículo. Grupos maiores podem ser acomodados com dois veículos.',
      },
      {
        question: 'Posso trazer crianças?',
        answer:
          'Sim, a partir dos 8 anos. O percurso inclui pistas acidentadas que podem ser desconfortáveis para crianças mais pequenas.',
      },
    ],
    guide: {
      name: 'Pedro Matos',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Pedro nasceu no Barroso e conhece cada pista e atalho como a palma da mão. Piloto de todo-o-terreno com 15 anos de experiência, é também apaixonado pela fauna local — especialmente pelo lobo-ibérico, cujos territórios conhece de cor.',
      specialties: ['Todo-o-terreno', 'Fauna do Barroso', 'História local'],
      languages: ['Português', 'Inglês'],
    },
  },
  {
    slug: 'fim-de-semana-geres',
    title: 'Fim de Semana no Coração do Gerês',
    shortDescription: 'Dois dias, uma noite, e a sensação de ter descoberto um Portugal que não sabia que existia.',
    category: 'multiday',
    difficulty: 'moderate',
    duration: '2 dias / 1 noite',
    groupSize: { min: 2, max: 8 },
    pricing: [{ label: 'Por pessoa', price: 195 }],
    seasonAvailability: ['spring', 'summer', 'autumn'],
    coverImage: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80',
    overview:
      'Este fim de semana no Gerês foi desenhado para quem quer verdadeiramente desligar. Dois dias completamente imersivos no Parque Nacional Peneda-Gerês — trilhos de montanha, banhos de rio, jantar com produtos da época e noite numa casa rural recuperada.\n\nNão há horários rígidos. O programa adapta-se ao ritmo do grupo, às condições climatéricas e às oportunidades que o território oferece — e no Gerês, cada dia traz surpresas diferentes.',
    highlights: [
      'Dois trilhos guiados (um por dia)',
      'Noite em casa rural com pequeno-almoço incluído',
      'Jantar com produtos regionais da época',
      'Banho em cascata ou rio (época quente)',
      'Avistamento de fauna (corços, javalis, aves de rapina)',
      'Pôr do sol num miradouro remoto',
    ],
    itinerary: [
      {
        title: 'Dia 1 — Chegada e trilho da tarde',
        description:
          'Chegada à casa rural, almoço livre na aldeia. Às 14h, trilho guiado de 3–4 horas pelos vales do Gerês, com paragem para banho. Jantar coletivo com produtos locais.',
      },
      {
        title: 'Dia 1 — Noite no Gerês',
        description:
          'Após o jantar, sessão de observação do céu noturno (ausência de poluição luminosa). Alojamento em quarto individual ou partilhado (conforme reserva).',
      },
      {
        title: 'Dia 2 — Pequeno-almoço e trilho principal',
        description:
          'Pequeno-almoço farto com produtos da casa. Trilho principal do dia: 5–6 horas pelos cumes mais altos da zona, com panorâmicas sobre Espanha e o vale do Lima.',
      },
      {
        title: 'Dia 2 — Regresso',
        description:
          'Almoço final na aldeia. Partida às 15h. Possibilidade de extensão de uma noite extra mediante disponibilidade.',
      },
    ],
    included: [
      'Guia certificado para os dois dias',
      'Alojamento (1 noite) em casa rural — quarto privativo',
      'Pequeno-almoço do dia 2',
      'Jantar do dia 1 com produtos regionais',
      'Seguro de atividade',
    ],
    notIncluded: [
      'Transporte até ao ponto de encontro',
      'Almoços (dias 1 e 2)',
      'Bebidas extra ao jantar',
      'Despesas pessoais',
    ],
    whatToBring: [
      'Botas de caminhada impermeáveis',
      'Muda de roupa completa para dois dias',
      'Impermeável e camadas quentes',
      'Fato de banho e toalha',
      'Mochila de 25–35 L',
      '2 L de água por dia',
    ],
    faqs: [
      {
        question: 'O alojamento é em quarto privativo?',
        answer:
          'Sim. O preço inclui quarto privativo com casa de banho. Se viajar a par, terá um quarto duplo. Se for sozinho, um quarto individual.',
      },
      {
        question: 'O tour é adequado para principiantes?',
        answer:
          'Sim, com condição física razoável. Os trilhos são de dificuldade moderada — longos mas sem técnica especial. Recomendamos que caminhe regularmente.',
      },
      {
        question: 'O que acontece se chover um dos dias?',
        answer:
          'Caminhamos com chuva ligeira a moderada — é parte da experiência. Em caso de mau tempo severo, adaptamos o programa ou adiamos o trilho mais exigente.',
      },
      {
        question: 'Posso reservar apenas 1 dia?',
        answer:
          'Sim, os trilhos individuais estão disponíveis como tours de dia completo. Consulte o Trilho de Pitões das Júnias ou a Expedição 4×4.',
      },
    ],
    guide: {
      name: 'Ana Teixeira',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Ana é guia de montanha certificada com mais de 10 anos de experiência no Peneda-Gerês. Especialista em flora e fauna do parque, conduziu mais de 400 grupos por estes trilhos. Fala com a paixão de alguém que conhece cada curva do rio.',
      specialties: ['Trilhos de montanha', 'Flora e fauna', 'Experiências de imersão'],
      languages: ['Português', 'Inglês', 'Francês'],
    },
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getSimilarTours(slug: string, limit = 3): Tour[] {
  const tour = getTourBySlug(slug);
  if (!tour) return [];
  return tours
    .filter((t) => t.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === tour.category ? 1 : 0;
      const bMatch = b.category === tour.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}
