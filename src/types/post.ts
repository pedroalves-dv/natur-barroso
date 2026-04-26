export type PostCategory =
  | 'trail-reports'
  | 'wildlife'
  | 'seasonal-guides'
  | 'culture'
  | 'photography';

export const POST_CATEGORY_CONFIG: Record<PostCategory, { labelPt: string; label: string }> = {
  'trail-reports':    { labelPt: 'Guias de Trilhos',   label: 'Trail Reports' },
  wildlife:           { labelPt: 'Fauna & Flora',       label: 'Wildlife & Nature' },
  'seasonal-guides':  { labelPt: 'Guias Sazonais',      label: 'Seasonal Guides' },
  culture:            { labelPt: 'Cultura e Património', label: 'Culture & Heritage' },
  photography:        { labelPt: 'Fotografia',           label: 'Photography Tips' },
};

export interface Post {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
  coverImage: string;
  authorSlug: string;
}
