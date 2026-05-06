import { defineArrayMember, defineField, defineType } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "guide",
      title: "Guide",
      type: "reference",
      to: [{ type: "guide" }],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "included",
      title: "Included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "notIncluded",
      title: "Not Included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "whatToBring",
      title: "What to Bring",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Challenging", value: "challenging" },
          { title: "Expert", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "Full day – 8 hours"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "groupSize",
      title: "Group Size",
      type: "object",
      fields: [
        defineField({
          name: "min",
          title: "Minimum",
          type: "number",
          validation: (Rule) => Rule.integer().min(1),
        }),
        defineField({
          name: "max",
          title: "Maximum",
          type: "number",
          validation: (Rule) => Rule.integer().min(1),
        }),
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "price", title: "Price (€)", type: "number" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "seasonAvailability",
      title: "Season Availability",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Autumn", value: "autumn" },
          { title: "Winter", value: "winter" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "fareharborWidgetId",
      title: "FareHarbor Widget ID",
      type: "string",
      description: "FareHarbor embed ID for this tour",
    }),
    defineField({
      name: "mapboxRouteGeoJSON",
      title: "Mapbox Route GeoJSON",
      type: "text",
      description: "Optional GeoJSON string for the route map",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
});
