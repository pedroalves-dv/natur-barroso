export interface RegionPlace {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  coverImage: string;
  gallery: string[];
  howToGetThere: string;
  relatedTourSlugs: string[];
  seo: { title: string; description: string };
}
