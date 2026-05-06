import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "label", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colour",
      title: "Colour (hex)",
      type: "string",
      description: "e.g. #2d6a4f",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon name or SVG string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
  ],
});
