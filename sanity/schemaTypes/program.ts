import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
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
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "degrees",
      title: "Degrees Offered",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Bachelor", value: "bachelor" },
          { title: "Master", value: "master" },
          { title: "PhD", value: "phd" },
          { title: "Language Course", value: "language" },
        ],
      },
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List the key benefits like scholarships, work visa, etc.",
    }),
    defineField({
      name: "rank",
      title: "Rank Badge",
      type: "string",
      description: "e.g. 'Top Choice', 'Best Value'",
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed content for the program page",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "country.name",
      media: "image",
    },
  },
});
