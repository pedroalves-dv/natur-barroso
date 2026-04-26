import type { FAQItem } from '@/types/faq';

export const faqItems: FAQItem[] = [
  // Booking & Payment
  {
    question: 'Como posso reservar um tour?',
    answer:
      'Pode reservar diretamente online através do botão "Reservar Tour" na página de cada tour, ou contactar-nos pelo WhatsApp ou email. Para grupos privados e experiências personalizadas, recomendamos o formulário de contacto ou o WhatsApp para discutir os detalhes antes de confirmar.',
    category: 'booking',
    order: 1,
  },
  {
    question: 'Quais os métodos de pagamento aceites?',
    answer:
      'Aceitamos cartão de crédito e débito (Visa, Mastercard, Amex), transferência bancária e MB Way. O pagamento online é processado de forma segura pelo FareHarbor. Para grupos privados, é possível pagar na totalidade no dia ou com depósito antecipado de 30%.',
    category: 'booking',
    order: 2,
  },
  {
    question: 'Existe um número mínimo de participantes para os tours partirem?',
    answer:
      'A maioria dos tours exige um mínimo de 2 participantes. Se reservar individualmente, poderá partilhar o grupo com outros participantes que reservaram o mesmo tour. Para garantir uma data específica com apenas 1 pessoa, consulte as opções de reserva privada.',
    category: 'booking',
    order: 3,
  },
  {
    question: 'Posso oferecer um tour como presente?',
    answer:
      'Sim! Temos vales presente disponíveis para todos os tours. Contacte-nos pelo WhatsApp ou email com o tour desejado e o valor, e enviamos um vale em PDF pronto a oferecer.',
    category: 'booking',
    order: 4,
  },

  // Activities
  {
    question: 'Os tours realizam-se com mau tempo?',
    answer:
      'Os tours de caminhada e cultural realizam-se com chuva ligeira a moderada — muitas vezes o tempo nublado valoriza a paisagem e a fotografia. Em caso de trovoada, neve intensa ou condições que coloquem em risco a segurança dos participantes, cancelamos e reagendamos sem qualquer custo adicional.',
    category: 'activities',
    order: 1,
  },
  {
    question: 'Os tours são adequados para crianças?',
    answer:
      'Depende do tour. A Rota das Aldeias Graníticas é adequada a todas as idades, incluindo crianças a partir dos 4 anos. O Trilho de Pitões das Júnias recomenda-se a partir dos 10 anos. A Expedição 4×4 é adequada a partir dos 8 anos. A informação de cada tour indica a idade mínima recomendada.',
    category: 'activities',
    order: 2,
  },
  {
    question: 'Que nível de condição física é necessário?',
    answer:
      'Cada tour tem uma classificação de dificuldade clara: Fácil (sem requisitos especiais), Moderado (caminhada regular recomendada), Desafiante (boa forma física necessária) e Especialista (experiência técnica requerida). Leia sempre a descrição de dificuldade antes de reservar, e contacte-nos em caso de dúvida.',
    category: 'activities',
    order: 3,
  },

  // What to Bring
  {
    question: 'O que devo trazer numa caminhada de dia completo?',
    answer:
      'Para uma caminhada de dia completo recomendamos: botas de caminhada impermeáveis, camadas de roupa (o Barroso é fresco mesmo no verão), impermeável leve, mochila com 1,5–2 L de água, protetor solar e chapéu, lanches ligeiros (o almoço está incluído nos tours que o especificam), câmara fotográfica e carregador portátil.',
    category: 'what-to-bring',
    order: 1,
  },
  {
    question: 'O material técnico (botas, mochila, bastões) é fornecido?',
    answer:
      'O equipamento pessoal (botas, mochila, roupa) não está incluído nos tours de caminhada e é da responsabilidade do participante. Nos tours de 4×4, não é necessário qualquer equipamento especial além de roupa confortável. Contacte-nos se tiver dúvidas sobre equipamento específico para o seu tour.',
    category: 'what-to-bring',
    order: 2,
  },
  {
    question: 'Preciso de trazer comida?',
    answer:
      'Nos tours que incluem almoço ou piquenique (indicado na descrição), a refeição é fornecida. Para os restantes tours, recomendamos trazer lanches. Água e lanches ligeiros estão incluídos na Expedição 4×4. Em caso de dúvida, a descrição de cada tour especifica o que está incluído.',
    category: 'what-to-bring',
    order: 3,
  },

  // Groups & Private Tours
  {
    question: 'Organizam tours privados para grupos?',
    answer:
      'Sim, e esta é uma das nossas principais ofertas. Os tours privados permitem personalizar o itinerário, o ritmo e a duração. Organizamos para grupos de família, grupos de amigos, eventos de empresa, team building e grupos escolares. Contacte-nos através do formulário de "Planear uma Experiência Personalizada" para um orçamento.',
    category: 'groups',
    order: 1,
  },
  {
    question: 'Têm programas para empresas e team building?',
    answer:
      'Sim. Desenhamos programas de team building e outdoor para empresas com base nas atividades disponíveis no território — expedições de 4×4, trilhos guiados, workshops de gastronomia local e experiências de imersão na natureza. Entre em contacto para discutir as necessidades específicas do seu grupo.',
    category: 'groups',
    order: 2,
  },
  {
    question: 'Qual o número máximo de participantes por tour?',
    answer:
      'Cada tour tem um limite de participantes indicado na respetiva página. Em regra: tours de caminhada (máx. 10–12 pessoas), tours culturais (máx. 12), expedição 4×4 (máx. 8 por veículo). Para grupos maiores, podemos organizar múltiplos veículos ou guias em simultâneo.',
    category: 'groups',
    order: 3,
  },

  // Accessibility
  {
    question: 'Os tours são acessíveis a pessoas com mobilidade reduzida?',
    answer:
      'A Rota das Aldeias Graníticas pode ser parcialmente adaptada para mobilidade reduzida — consulte-nos antes de reservar para discutir as suas necessidades. Os trilhos de montanha e a cascata de Pitões das Júnias não são acessíveis a cadeira de rodas. A Expedição 4×4 é acessível para pessoas que consigam entrar e sair do veículo de forma autónoma.',
    category: 'accessibility',
    order: 1,
  },
  {
    question: 'Existe acomodação acessível em Montalegre?',
    answer:
      'Podemos recomendar unidades de alojamento em Montalegre e arredores com quartos acessíveis. Contacte-nos e teremos todo o gosto em sugerir opções adequadas às suas necessidades.',
    category: 'accessibility',
    order: 2,
  },

  // Cancellation
  {
    question: 'Qual é a política de cancelamento?',
    answer:
      'Cancelamento com mais de 48 horas de antecedência: reembolso total. Cancelamento entre 24 e 48 horas: reembolso de 50%. Cancelamento com menos de 24 horas: sem reembolso (exceto em caso de doença documentada ou força maior). Cancelamentos por nossa iniciativa (mau tempo grave, etc.) são sempre reembolsados na totalidade ou reagendados.',
    category: 'cancellation',
    order: 1,
  },
  {
    question: 'O que acontece se o tempo obrigar a cancelar?',
    answer:
      'Se cancelarmos um tour por razões meteorológicas ou de segurança, contactamos todos os participantes com a maior antecedência possível e oferecemos: reembolso total, reagendamento para outra data ou crédito para uso noutro tour. Nunca cobramos por cancelamentos que sejam da nossa responsabilidade.',
    category: 'cancellation',
    order: 2,
  },
  {
    question: 'Posso alterar a data de um tour já reservado?',
    answer:
      'Sim, mediante disponibilidade. Alterações com mais de 48 horas de antecedência são gratuitas e sujeitas a disponibilidade. Para alterações com menos de 24 horas, contacte-nos pelo WhatsApp — fazemos sempre o possível para acomodar pedidos de reagendamento.',
    category: 'cancellation',
    order: 3,
  },
];
