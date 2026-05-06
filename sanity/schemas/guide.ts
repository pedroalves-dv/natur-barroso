import { defineArrayMember, defineField, defineType } from "sanity";

export const guide = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "languages",
      title: "Languages",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});
