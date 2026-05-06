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
