import { defineField, defineType } from "sanity";

export default defineType({
    name: "chapter",
    title: "Chapter",
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Tên chương",
        type: "string",
      }),
      defineField({
        name: "pages",
        title: "Upload các trang của chương:",
        type: "array",
        of: [
          {
            type: "cloudinary.asset",
          },
        ],
        validation: (Rule) => Rule.required().min(1),
      }),
    ],
  });