import { defineField, defineType } from "sanity";

export default defineType({
  name: "manga",
  title: "Manga",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên truyện:",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Tác giả:",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Mô tả:",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Trạng thái:",
      type: "string",
      options: {
        list: [
          { title: "Đang tiến hành", value: "ongoing" },
          { title: "Hoàn thành", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
    }),
    defineField({
      name: "cover",
      title: "Ảnh bìa:",
      type: "cloudinary.asset",
    }),
    defineField({
      name: "chapters",
      title: "Danh sách chương:",
      type: "array",
      of: [{ type: "chapter" }], // sử dụng chapterType
      initialValue: [],
    }),
  ],
});
