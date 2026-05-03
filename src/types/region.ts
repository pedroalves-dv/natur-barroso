export interface RegionHighlight {
  name: string;
  description: string;
  image: string;
}

export interface RegionPlace {
  slug: string;
  name: string;
  tagline: string;
  sectionTitle: string;
  description: string[];
  highlights: RegionHighlight[];
  coverImage: string;
  gallery: string[];
  howToGetThere: string;
  relatedTourSlugs: string[];
  seo: { title: string; description: string };
}
