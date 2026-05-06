import { groq } from "next-sanity";
import type {
  Difficulty,
  Season,
  CategorySlug,
  PricingTier,
  ItineraryStep,
  TourFAQItem,
} from "@/types/tour";

// Shape returned by list/card queries (catalog + similar tours)
export type SanityTourSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  category: CategorySlug;
  difficulty: Difficulty;
  duration: string;
  groupSize: { min: number; max: number };
  pricing: Pick<PricingTier, "label" | "price">[];
  seasonAvailability: Season[];
  coverImage: string; // coalesced to "" when no image set
};

// Shape returned by the detail query (all fields)
export type SanityTour = SanityTourSummary & {
  overview: string;
  highlights: string[];
  itinerary: ItineraryStep[];
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  faqs: TourFAQItem[];
  guide: {
    name: string;
    photo: string; // coalesced to "" when no photo set
    bio: string;
    specialties: string[];
    languages: string[];
  } | null; // null when no guide is linked in Studio
};

// Shared card-level projection reused in list and similar-tours queries
const CARD_FIELDS = groq`
  "slug": slug.current,
  title,
  shortDescription,
  "category": category->slug.current,
  difficulty,
  duration,
  groupSize,
  pricing[] { label, price },
  seasonAvailability,
  "coverImage": coalesce(coverImage.asset->url, "")
`;

// All published tours, newest first — used by /tours catalog
export const TOURS_LIST_QUERY = groq`
  *[_type == "tour"] | order(_createdAt desc) {
    ${CARD_FIELDS}
  }
`;

// Single tour by slug with all detail fields — used by /tours/[slug]
export const TOUR_DETAIL_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    ${CARD_FIELDS},
    "overview": coalesce(pt::text(overview), ""),
    highlights,
    itinerary[] { title, description },
    included,
    notIncluded,
    whatToBring,
    faqs[] { question, answer },
    "guide": guide->{
      name,
      "photo": coalesce(photo.asset->url, ""),
      "bio": coalesce(pt::text(bio), ""),
      specialties,
      languages
    }
  }
`;

// Up to 3 tours in the same category, excluding current — used by Similar Tours row
export const SIMILAR_TOURS_QUERY = groq`
  *[
    _type == "tour"
    && slug.current != $slug
    && category->slug.current == $category
  ][0...3] {
    ${CARD_FIELDS}
  }
`;

// ---------------------------------------------------------------------------
// Blog queries
// ---------------------------------------------------------------------------

// Shape returned by list/card queries — structurally matches Post without body/authorSlug
export type SanityBlogPostSummary = {
  slug: string;
  title: string;
  category: string;
  date: string;       // ISO datetime projected from publishedAt
  readTime: string;
  excerpt: string;
  coverImage: string; // Sanity CDN URL, coalesced to "" when no image
};

// Shape returned by the detail query
export type SanityBlogPost = SanityBlogPostSummary & {
  body: Record<string, unknown>[];
  authorName: string | null;
  authorPhoto: string;
  authorRole: string;
};

const BLOG_CARD_FIELDS = groq`
  "slug": slug.current,
  title,
  category,
  "date": publishedAt,
  readTime,
  excerpt,
  "coverImage": coalesce(coverImage.asset->url, "")
`;

// All blog posts, newest first — used by /blog
export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    ${BLOG_CARD_FIELDS}
  }
`;

// Single post by slug with full body — used by /blog/[slug]
export const BLOG_POST_DETAIL_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_CARD_FIELDS},
    body,
    "authorName": author->name,
    "authorPhoto": coalesce(author->photo.asset->url, ""),
    "authorRole": coalesce(author->specialties[0], "")
  }
`;

// All posts in same category excluding current — used by /blog/[slug] related row
export const RELATED_POSTS_QUERY = groq`
  *[
    _type == "blogPost"
    && slug.current != $slug
    && category == $category
  ][0...2] {
    ${BLOG_CARD_FIELDS}
  }
`;

// Posts filtered by category — used by /blog category filtering (server-side alternative)
export const BLOG_POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    ${BLOG_CARD_FIELDS}
  }
`;

// Slugs only — used by generateStaticParams in /blog/[slug]
export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;
