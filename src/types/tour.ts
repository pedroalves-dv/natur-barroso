export type Difficulty = 'easy' | 'moderate' | 'challenging' | 'expert';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type CategorySlug =
  | '4x4' | 'hiking' | 'climbing' | 'cultural' | 'gastronomy'
  | 'kayak' | 'photography' | 'wildlife' | 'groups' | 'multiday';

export interface PricingTier {
  label: string;
  label_en?: string;
  price: number;
}

export interface ItineraryStep {
  title: string;
  description: string;
}

export interface TourFAQItem {
  question: string;
  answer: string;
}

export interface TourGuide {
  name: string;
  photo: string;
  bio: string;
  specialties: string[];
  languages: string[];
}

export interface Tour {
  slug: string;
  title: string;
  title_en?: string;
  shortDescription: string;
  shortDescription_en?: string;
  category: CategorySlug;
  difficulty: Difficulty;
  duration: string;
  duration_en?: string;
  groupSize: { min: number; max: number };
  pricing: PricingTier[];
  seasonAvailability: Season[];
  coverImage: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryStep[];
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  faqs: TourFAQItem[];
  guide: TourGuide;
}

export const CATEGORY_CONFIG: Record<CategorySlug, { label: string; labelPt: string; color: string }> = {
  '4x4':       { label: '4×4 Off-Road',        labelPt: '4×4 Off-Road',          color: '#C8882A' },
  hiking:      { label: 'Guided Hikes',         labelPt: 'Trilhos Guiados',       color: '#2D4A2F' },
  climbing:    { label: 'Rock Climbing',        labelPt: 'Escalada',              color: '#4A6B7C' },
  cultural:    { label: 'Cultural & Heritage',  labelPt: 'Cultural e Património', color: '#7C6138' },
  gastronomy:  { label: 'Taste of Barroso',     labelPt: 'Sabores do Barroso',    color: '#A0522D' },
  kayak:       { label: 'Rivers & Kayak',       labelPt: 'Rios e Kayak',          color: '#3A7CA5' },
  photography: { label: 'Photography Tours',    labelPt: 'Tours Fotográficos',    color: '#555550' },
  wildlife:    { label: 'Wildlife & Nature',    labelPt: 'Fauna e Flora',         color: '#1A5C1C' },
  groups:      { label: 'Schools & Groups',     labelPt: 'Escolas e Grupos',      color: '#5B4B8A' },
  multiday:    { label: 'Multi-Day',            labelPt: 'Multi-Dia',             color: '#9B6914' },
};

export const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; labelPt: string; color: string; level: number }> = {
  easy:        { label: 'Easy',        labelPt: 'Fácil',        color: '#2D9B4F', level: 1 },
  moderate:    { label: 'Moderate',    labelPt: 'Moderado',     color: '#C8882A', level: 2 },
  challenging: { label: 'Challenging', labelPt: 'Desafiante',   color: '#D4581A', level: 3 },
  expert:      { label: 'Expert',      labelPt: 'Especialista', color: '#9B1A1A', level: 4 },
};

export const SEASON_LABELS: Record<Season, { pt: string; en: string }> = {
  spring: { pt: 'Primavera', en: 'Spring' },
  summer: { pt: 'Verão',     en: 'Summer' },
  autumn: { pt: 'Outono',    en: 'Autumn' },
  winter: { pt: 'Inverno',   en: 'Winter' },
};
