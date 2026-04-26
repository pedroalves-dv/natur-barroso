export type ReviewSource = 'tripadvisor' | 'google' | 'direct';

export interface Review {
  id: number;
  author: string;
  country: string;
  rating: number;
  tour: string;
  text: string;
  source: ReviewSource;
  featured: boolean;
  date: string;
}
