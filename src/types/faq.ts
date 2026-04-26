export type FAQCategory =
  | 'booking'
  | 'activities'
  | 'what-to-bring'
  | 'groups'
  | 'accessibility'
  | 'cancellation';

export const FAQ_CATEGORY_LABELS: Record<FAQCategory, { pt: string; en: string }> = {
  booking:        { pt: 'Reserva e Pagamento',        en: 'Booking & Payment' },
  activities:     { pt: 'Atividades',                 en: 'Activities' },
  'what-to-bring':{ pt: 'O que Trazer',               en: 'What to Bring' },
  groups:         { pt: 'Grupos e Privados',          en: 'Groups & Private Tours' },
  accessibility:  { pt: 'Acessibilidade',             en: 'Accessibility' },
  cancellation:   { pt: 'Cancelamento',               en: 'Cancellation Policy' },
};

export interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}
