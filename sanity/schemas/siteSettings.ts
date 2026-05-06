import { defineField, defineType } from "sanity";

// Singleton — create exactly one document with _id: 'siteSettings' during data migration.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "conditionsBanner",
      title: "Conditions Banner",
      type: "object",
      fields: [
        defineField({
          name: "active",
          title: "Active",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "message",
          title: "Message",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code, e.g. +351912345678",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({
          name: "tripadvisor",
          title: "TripAdvisor URL",
          type: "url",
        }),
      ],
    }),
  ],
});
