import { defineField, defineType } from "sanity";

export default defineType({
  name: "wikiGallery",
  title: "Wiki Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục:",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Danh sách ảnh:",
      type: "array",
      of: [{ type: "galleryImage" }],
      initialValue: [],
    }),
  ],
});
